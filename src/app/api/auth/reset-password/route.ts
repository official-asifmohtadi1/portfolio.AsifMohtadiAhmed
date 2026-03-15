import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { identifier, token, code, backupCode, newPassword } = body;

        if (!newPassword) {
            return NextResponse.json({ error: "New password is required" }, { status: 400 });
        }

        let userToReset = null;

        // Route 1: Using an Offline Backup Code
        if (backupCode && identifier) {
            const user = await prisma.user.findFirst({
                where: { OR: [{ email: identifier }, { phone: identifier }] },
                include: { backupCodes: { where: { isUsed: false } } }
            });
            if (!user) return NextResponse.json({ error: "Invalid identity or backup code fails" }, { status: 400 });
            
            let matchedCodeId = null;
            for (const bc of user.backupCodes) {
                const isMatch = await bcrypt.compare(backupCode, bc.code);
                if (isMatch) {
                    matchedCodeId = bc.id;
                    break;
                }
            }

            if (!matchedCodeId) {
                return NextResponse.json({ error: "Invalid or already used backup code" }, { status: 400 });
            }

            // Mark as used
            await prisma.backupCode.update({
                where: { id: matchedCodeId },
                data: { isUsed: true }
            });

            userToReset = user;
        } 
        
        // Route 2: Using the emailed Token Link OR 6-Digit Code
        else if ((token || code) && identifier) {
            // Find token specifically for this email/identifier
            // If they provided 'identifier' as phone, we need to map to user's email since tokens are saved by email
            const user = await prisma.user.findFirst({
                where: { OR: [{ email: identifier }, { phone: identifier }] }
            });
            if (!user || (!user.email && !user.phone)) {
                return NextResponse.json({ error: "Invalid request" }, { status: 400 });
            }

            const activeToken = await prisma.passwordResetToken.findFirst({
                where: {
                    email: user.email || identifier,   // fallback gracefully
                    ...(token && { token }),
                    ...(code && { code })
                }
            });

            if (!activeToken) {
                return NextResponse.json({ error: "Invalid recovery token or code." }, { status: 400 });
            }

            if (new Date() > new Date(activeToken.expires)) {
                // Cleanup expired
                await prisma.passwordResetToken.delete({ where: { id: activeToken.id } });
                return NextResponse.json({ error: "Recovery window has expired." }, { status: 400 });
            }

            userToReset = user;

            // Delete the token so it can't be used again
            await prisma.passwordResetToken.delete({ where: { id: activeToken.id } });
        } else {
            return NextResponse.json({ error: "Recovery code, link token, or backup code is required." }, { status: 400 });
        }

        // Apply new password
        if (userToReset) {
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await prisma.user.update({
                where: { id: userToReset.id },
                data: { password: hashedPassword }
            });
            return NextResponse.json({ success: true, message: "Password updated successfully" });
        }

        return NextResponse.json({ error: "Operation failed" }, { status: 400 });
    } catch (error) {
        console.error("Reset Password Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
