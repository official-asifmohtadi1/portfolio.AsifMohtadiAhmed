import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        let settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
        
        // If it doesn't exist, create default
        if (!settings) {
            settings = await prisma.siteSettings.create({
                data: { id: "global" }
            });
        }
        
        return NextResponse.json({ settings });
    } catch (error) {
        console.error("Fetch Settings Error:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "SUPERUSER") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const body = await req.json();
        
        // Allowed fields to update
        const data: Record<string, string | boolean> = {};
        if (body.seoTitle !== undefined) data.seoTitle = body.seoTitle;
        if (body.seoDescription !== undefined) data.seoDescription = body.seoDescription;
        if (body.seoKeywords !== undefined) data.seoKeywords = body.seoKeywords;
        if (body.primaryColor !== undefined) data.primaryColor = body.primaryColor;
        if (body.notifyOnInquiry !== undefined) data.notifyOnInquiry = body.notifyOnInquiry;
        if (body.notifyOnNewUser !== undefined) data.notifyOnNewUser = body.notifyOnNewUser;

        const updatedSettings = await prisma.siteSettings.upsert({
            where: { id: "global" },
            update: data,
            create: {
                id: "global",
                ...data
            }
        });

        return NextResponse.json({ success: true, settings: updatedSettings });
    } catch (error) {
        console.error("Update Settings Error:", error);
        return NextResponse.json({ error: "Update failed" }, { status: 500 });
    }
}
