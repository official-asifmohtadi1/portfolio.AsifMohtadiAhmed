import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/mailer";

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const session = await getServerSession(authOptions);
    const { id } = await params;

    if (!session || session.user.role !== "SUPERUSER") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { status, role } = body;

        const updatedUser = await prisma.user.update({
            where: { id },
            data: {
                ...(status && { status }),
                ...(role && { role }),
            }
        });

        if (status && updatedUser.email) {
            try {
                const subject = status === "APPROVED" ? "Your Account is Approved!" : "Account Update";
                const message = status === "APPROVED" 
                    ? `Good news! Your account has been approved and you can now log in to the admin dashboard with the role of ${updatedUser.role}.`
                    : `Your account status has been updated to: ${status}.`;
                
                await sendEmail(updatedUser.email, subject, message);
            } catch (error) {
                console.error("Failed to send status update email:", error);
            }
        }

        return NextResponse.json({ success: true, user: updatedUser });
    } catch (error) {
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}
