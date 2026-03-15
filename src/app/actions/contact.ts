"use client";

// This is a dummy action to simulate a backend process
export async function submitContactForm(formData: Record<string, string>) {
    // Simulate delay
    await new Promise((res) => setTimeout(res, 2000));

    console.log("Form data received on server:", formData);

    // In a real app, you would use Resend, SendGrid, etc.
    return {
        success: true,
        message: "Thank you for your message! An auto-responder has been sent to your email.",
    };
}
