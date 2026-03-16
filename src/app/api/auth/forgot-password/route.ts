import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { identifier } = await req.json(); // can be email or phone

        if (!identifier) {
            return NextResponse.json({ error: "Missing email or phone number" }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: identifier },
                    { phone: identifier }
                ]
            }
        });

        if (!user || (!user.email && !user.phone)) {
            // Return 200 even if not found to prevent user enumeration
            return NextResponse.json({ success: true, message: "If the account exists, recovery instructions have been sent." });
        }

        const token = crypto.randomUUID();
        const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit code
        const expires = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

        // Delete existing reset tokens
        await prisma.passwordResetToken.deleteMany({
            where: { email: user.email || "" }
        });

        await prisma.passwordResetToken.create({
            data: {
                email: user.email || identifier,
                token,
                code,
                expires
            }
        });

        // The URL for the reset link
        const resetLink = `${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/admin/reset-password?token=${token}`;

        // Send Email if the user has an email
        if (user.email) {
            await sendEmail(
                user.email,
                "Password Recovery Instructions",
                `You requested a password reset. 
                
Please use this code: ${code}
Or click this link: ${resetLink}
                
If you did not request this, please ignore this email. Note that the code expires in 15 minutes.`
            );
        }

        // Technically we would use an SMS provider like Twilio here for phone numbers
        // but typically the code is just logged or we pretend it succeeded.
        console.log(`[SMS Pretend to ${user.phone}] Recovery Code: ${code}, Link: ${resetLink}`);

        return NextResponse.json({ success: true, message: "If the account exists, recovery instructions have been sent." });
    } catch (error) {
        console.error("Forgot Password Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
