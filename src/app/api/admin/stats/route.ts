import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import fs from 'fs';
import path from 'path';

export async function GET() {
    const session = await getServerSession(authOptions);

    if (!session) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const projectsDir = path.join(process.cwd(), 'content/projects');
        const blogDir = path.join(process.cwd(), 'content/blog');
        
        let projectCount = 0;
        let blogCount = 0;

        if (fs.existsSync(projectsDir)) {
            projectCount = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md')).length;
        }

        if (fs.existsSync(blogDir)) {
            blogCount = fs.readdirSync(blogDir).filter(f => f.endsWith('.md')).length;
        }

        const inquiriesCount = 156; // Mock for now, or link to contact table if added
        const usersCount = await prisma.user.count();

        return NextResponse.json({
            projects: projectCount,
            blogs: blogCount,
            inquiries: inquiriesCount,
            users: usersCount
        });
    } catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}
