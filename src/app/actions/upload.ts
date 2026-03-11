"use server";

import fs from 'fs';
import path from 'path';

export async function uploadImage(formData: FormData) {
    const file = formData.get('file') as File;
    if (!file) return { success: false, error: "No file provided" };

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filename = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
    const uploadDir = path.join(process.cwd(), 'public/uploads');

    try {
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        const filePath = path.join(uploadDir, filename);
        fs.writeFileSync(filePath, buffer);

        return { success: true, url: `/uploads/${filename}` };
    } catch (error) {
        console.error("Image upload failed:", error);
        return { success: false, error: "Failed to upload image." };
    }
}
