import { MetadataRoute } from 'next';
import { getProjectsData } from '@/lib/projects';
import { getSortedPostsData } from '@/lib/blog';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = 'https://asifmohtadi.me';

    // Static routes
    const routes = [
        '',
        '/blog',
        '/gallery',
        '/resume-builder',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: (route === '' ? 'daily' : 'weekly') as any,
        priority: route === '' ? 1.0 : 0.8,
    }));

    // Dynamic Portfolio Projects
    const projects = getProjectsData();
    const projectRoutes = projects.map((project) => ({
        url: `${baseUrl}/portfolio/${project.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    // Dynamic Blog Posts
    const posts = await getSortedPostsData();
    const blogRoutes = posts.map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.5,
    }));

    return [...routes, ...projectRoutes, ...blogRoutes];
}
