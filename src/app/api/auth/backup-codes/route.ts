import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session?.user?.id) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.id;

        // Optionally delete existing unused backup codes for this user
        await prisma.backupCode.deleteMany({
            where: { userId, isUsed: false }
        });

        const newCodesRaw: string[] = [];
        const backupCodesToInsert = [];

        for (let i = 0; i < 6; i++) {
            // Generate a readable but secure 8-character string (e.g. A1B2-C3D4)
            const randomCode = crypto.randomBytes(4).toString('hex').toUpperCase();
            const formattedCode = `${randomCode.slice(0, 4)}-${randomCode.slice(4)}`;
            newCodesRaw.push(formattedCode);
            
            // To be safe, we could hash them, but since user requested offline recovery 
            // and we rely on simple schema, let's store them hashed.
            const hashCode = await bcrypt.hash(formattedCode, 10);
            backupCodesToInsert.push({
                code: hashCode, // the schema says `code @unique`, hash is unique
                userId
            });
        }

        // We can't use createMany with SQLite for certain complex types sometimes, but it should work for standard fields
        // SQLite doesn't support createMany fully if it conflicts with PRAGMAs, but in Prisma 5 it's better.
        // Let's do a loop or Promise.all to ensure compatibility.
        await Promise.all(backupCodesToInsert.map(bc => prisma.backupCode.create({ data: bc })));

        return NextResponse.json({ codes: newCodesRaw });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
