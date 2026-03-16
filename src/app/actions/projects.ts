"use server";

import fs from 'fs';
import path from 'path';
import { revalidatePath } from 'next/cache';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export async function createProject(formData: FormData) {
    const title = formData.get('title') as string;
    const slug = (formData.get('slug') as string) || title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const longDescription = formData.get('longDescription') as string;
    const tech = (formData.get('tech') as string || "").split(',').map(t => t.trim()).filter(Boolean);
    const github = formData.get('github') as string || "#";
    const live = formData.get('live') as string || "#";
    const image = formData.get('image') as string || "";
    const images = (formData.get('images') as string || "").split(',').map(i => i.trim()).filter(Boolean);
    const problem = formData.get('problem') as string;
    const solution = formData.get('solution') as string;
    const content = formData.get('content') as string || "";

    const fileContent = `---
title: "${title}"
category: "${category}"
description: "${description}"
longDescription: "${longDescription}"
tech: ${JSON.stringify(tech)}
github: "${github}"
live: "${live}"
image: "${image}"
images: ${JSON.stringify(images)}
problem: "${problem}"
solution: "${solution}"
---

${content}
`;

    const filePath = path.join(projectsDirectory, `${slug}.md`);

    try {
        if (!fs.existsSync(projectsDirectory)) {
            fs.mkdirSync(projectsDirectory, { recursive: true });
        }
        fs.writeFileSync(filePath, fileContent);
        revalidatePath('/');
        revalidatePath('/#portfolio');
        revalidatePath(`/portfolio/${slug}`);
        revalidatePath('/admin/dashboard/projects');
        return { success: true, slug };
    } catch (error) {
        console.error("Failed to create project:", error);
        return { success: false, error: "Failed to save project." };
    }
}

export async function deleteProject(slug: string) {
    const filePath = path.join(projectsDirectory, `${slug}.md`);
    try {
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
            revalidatePath('/');
            revalidatePath('/admin/dashboard/projects');
            return { success: true };
        }
        return { success: false, error: "Project not found" };
    } catch (error) {
        console.error("Failed to delete project:", error);
        return { success: false, error: "Deletion failed" };
    }
}

export async function updateProject(oldSlug: string, formData: FormData) {
    const newTitle = formData.get('title') as string;
    const newSlug = (formData.get('slug') as string) || newTitle.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');

    // Extract other fields (same as create)
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const longDescription = formData.get('longDescription') as string;
    const tech = (formData.get('tech') as string || "").split(',').map(t => t.trim()).filter(Boolean);
    const github = formData.get('github') as string;
    const live = formData.get('live') as string;
    const image = formData.get('image') as string;
    const images = (formData.get('images') as string || "").split(',').map(i => i.trim()).filter(Boolean);
    const problem = formData.get('problem') as string;
    const solution = formData.get('solution') as string;
    const content = formData.get('content') as string || "";

    const fileContent = `---
title: "${newTitle}"
category: "${category}"
description: "${description}"
longDescription: "${longDescription}"
tech: ${JSON.stringify(tech)}
github: "${github}"
live: "${live}"
image: "${image}"
images: ${JSON.stringify(images)}
problem: "${problem}"
solution: "${solution}"
---

${content}
`;

    const oldFilePath = path.join(projectsDirectory, `${oldSlug}.md`);
    const newFilePath = path.join(projectsDirectory, `${newSlug}.md`);

    try {
        if (oldSlug !== newSlug && fs.existsSync(oldFilePath)) {
            fs.unlinkSync(oldFilePath);
        }
        fs.writeFileSync(newFilePath, fileContent);
        revalidatePath('/');
        revalidatePath(`/portfolio/${newSlug}`);
        revalidatePath('/admin/dashboard/projects');
        return { success: true, slug: newSlug };
    } catch (error) {
        console.error("Failed to update project:", error);
        return { success: false, error: "Update failed" };
    }
}
