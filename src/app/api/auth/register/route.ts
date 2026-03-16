import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, phone, password } = body;

        if (!email || !password) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Check if user exists
        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return NextResponse.json({ error: "Email already registered" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user with PENDING status and EDITOR role by default
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone,
                password: hashedPassword,
                role: "EDITOR",
                status: "PENDING"
            }
        });

        // Notify Super User
        try {
            const superUsers = await prisma.user.findMany({ where: { role: 'SUPERUSER' } });
            for(const su of superUsers) {
                if(su.email) {
                    await sendEmail(
                        su.email, 
                        "New User Application", 
                        `A new user (${email}) has applied for access. Review at the User Management dashboard.`
                    );
                }
            }
        } catch(e) {
            console.error("Notify super admin error", e);
        }

        return NextResponse.json({ success: true, userId: user.id });
    } catch (error) {
        console.error("Registration error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
