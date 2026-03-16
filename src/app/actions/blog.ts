"use server";

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export async function createBlogPost(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = (formData.get('slug') as string) || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const date = formData.get('date') as string || new Date().toISOString().split('T')[0];
    const category = formData.get('category') as string;
    const excerpt = formData.get('excerpt') as string;
    const image = formData.get('image') as string || "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop";
    const readTime = formData.get('readTime') as string || "5 min read";
    const content = formData.get('content') as string;

    const fileContent = `---
title: "${title}"
date: "${date}"
excerpt: "${excerpt}"
category: "${category}"
image: "${image}"
readTime: "${readTime}"
---

${content}
`;

    const filePath = path.join(postsDirectory, `${slug}.md`);

    try {
        // Ensure directory exists
        if (!fs.existsSync(postsDirectory)) {
            fs.mkdirSync(postsDirectory, { recursive: true });
        }

        fs.writeFileSync(filePath, fileContent);
        revalidatePath('/');
        revalidatePath('/blog');
        revalidatePath(`/blog/${slug}`);
        revalidatePath('/admin/dashboard/blog');
        return { success: true, slug };
    } catch (error) {
        console.error("Failed to write blog post:", error);
        return { success: false, error: "Failed to save the post." };
    }
}

export async function deleteBlogPost(slug: string) {
    const filePath = path.join(postsDirectory, `${slug}.md`);

    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            revalidatePath('/');
            revalidatePath('/blog');
            revalidatePath('/admin/dashboard/blog');
            return { success: true };
        }
        return { success: false, error: "Post not found" };
    } catch (error) {
        console.error("Failed to delete blog post:", error);
        return { success: false, error: "Deletion failed" };
    }
}

export async function updateBlogPost(oldSlug: string, formData: FormData) {
    const newTitle = formData.get('title') as string;
    const newSlug = (formData.get('slug') as string) || newTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const date = formData.get('date') as string || new Date().toISOString().split('T')[0];
    const category = formData.get('category') as string;
    const excerpt = formData.get('excerpt') as string;
    const image = formData.get('image') as string;
    const readTime = formData.get('readTime') as string;
    const content = formData.get('content') as string;

    const fileContent = `---
title: "${newTitle}"
date: "${date}"
excerpt: "${excerpt}"
category: "${category}"
image: "${image}"
readTime: "${readTime}"
---

${content}
`;

    const oldFilePath = path.join(postsDirectory, `${oldSlug}.md`);
    const newFilePath = path.join(postsDirectory, `${newSlug}.md`);

    try {
        // If slug changed, delete the old file
        if (oldSlug !== newSlug && fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
        }

        fs.writeFileSync(newFilePath, fileContent);
        revalidatePath('/');
        revalidatePath('/blog');
        revalidatePath(`/blog/${newSlug}`);
        revalidatePath('/admin/dashboard/blog');
        return { success: true, slug: newSlug };
    } catch (error) {
        console.error("Failed to update blog post:", error);
        return { success: false, error: "Update failed" };
    }
}

