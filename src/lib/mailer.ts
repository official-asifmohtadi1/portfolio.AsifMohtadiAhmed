import nodemailer from "nodemailer";

const getTransporter = () => {
    // For local development, using ethereal or predefined smtp
    // Note: To make this work in production, you must set these env variables
    return nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.ethereal.email",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: process.env.SMTP_SECURE === "true",
        auth: {
            user: process.env.SMTP_USER || "your_ethereal_user",
            pass: process.env.SMTP_PASS || "your_ethereal_pass",
        },
    });
};

export async function sendEmail(to: string, subject: string, text: string, html?: string, attachments?: any[]) {
    try {
        const transporter = getTransporter();
        const info = await transporter.sendMail({
            from: `"Mohtadi's Portal" <${process.env.SMTP_FROM || 'admin@mohtadisportal.com'}>`,
            to,
            subject,
            text,
            html,
            attachments
        });
        console.log("Message sent: %s", info.messageId);
        return info;
    } catch (error) {
        console.error("Error sending email", error);
        throw error;
    }
}
