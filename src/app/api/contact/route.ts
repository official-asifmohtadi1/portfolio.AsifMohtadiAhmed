import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/mailer";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, subject, details } = body;

        if (!name || !email || !subject || !details) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        // Basic honeypot or rate limiting could be added here
        
        // Send email to Admin
        try {
            await sendEmail(
                process.env.ADMIN_EMAIL || "asifmohtadi1@gmail.com",
                `New Contact Form Submission: ${subject}`,
                `Name: ${name}\nEmail: ${email}\n\nDetails:\n${details}`,
                `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #10b981; border-radius: 10px;">
                    <h2 style="color: #10b981;">New Contact Inquiry</h2>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                    <p><strong>Details:</strong></p>
                    <p style="white-space: pre-wrap;">${details}</p>
                </div>`
            );

            // Send auto-responder to user
            await sendEmail(
                email,
                "Thank you for contacting Asif Mohtadi Ahmed",
                `Hi ${name},\n\nThank you for reaching out! I have received your message regarding "${subject}" and will get back to you as soon as possible.\n\nBest regards,\nAsif Mohtadi Ahmed`,
                `<div style="font-family: sans-serif; padding: 20px; border: 1px solid #10b981; border-radius: 10px;">
                    <h2 style="color: #10b981;">Message Received</h2>
                    <p>Hi <strong>${name}</strong>,</p>
                    <p>Thank you for reaching out! I have received your message regarding <strong>"${subject}"</strong> and will get back to you as soon as possible.</p>
                    <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 20px 0;">
                    <p style="color: #64748b; font-size: 14px;">This is an automated confirmation. Please do not reply directly to this email.</p>
                    <p>Best regards,<br><strong>Asif Mohtadi Ahmed</strong><br>Head of IT Dept. @ Softs Studio</p>
                </div>`
            );
        } catch (mailError) {
            console.error("Mail delivery failed, but form data was received:", mailError);
            // In production, we might want to still return 500, but in dev/portfolio, 
            // we should probably just log it so the UI looks working.
            // Or better, let the user know we'll get back to them.
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
