import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const projectsDirectory = path.join(process.cwd(), 'content/projects');

export interface Project {
    slug: string;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    tech: string[];
    github: string;
    live: string;
    image: string;
    images: string[];
    problem: string;
    solution: string;
    content?: string;
}

export function getProjectsData(): Project[] {
    if (!fs.existsSync(projectsDirectory)) {
        fs.mkdirSync(projectsDirectory, { recursive: true });
        return [];
    }
    const fileNames = fs.readdirSync(projectsDirectory);
    const allProjectsData = fileNames.map((fileName) => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(projectsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        const { data, content } = matter(fileContents);

        return {
            slug,
            content,
            ...(data as Omit<Project, 'slug' | 'content'>),
        };
    });

    return allProjectsData;
}

export function getProjectData(slug: string): Project | null {
    const fullPath = path.join(projectsDirectory, `${slug}.md`);
    if (!fs.existsSync(fullPath)) return null;
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
        slug,
        content,
        ...(data as Omit<Project, 'slug' | 'content'>),
    };
}
