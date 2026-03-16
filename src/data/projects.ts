export interface Project {
    slug: string;
    title: string;
    category: "React" | "WordPress";
    description: string;
    longDescription: string;
    tech: string[];
    problem: string;
    solution: string;
    github: string;
    live: string;
    image: string;
    images: string[];
}

export const projects: Project[] = [
    {
        slug: "ecommerce-dashboard",
        title: "E-Commerce Dashboard",
        category: "React",
        description: "A feature-rich admin dashboard for managing products, built with Next.js, Tailwind, and Supabase.",
        longDescription: "This enterprise-level dashboard was designed to handle high-traffic sales data with sub-second response times. It integrates real-time inventory tracking, multi-region tax calculations, and a complete analytics suite.",
        tech: ["Next.js", "Tailwind CSS", "Supabase", "Framer Motion", "Recharts"],
        problem: "The client was struggling with a legacy system that was slow and didn't support real-time data synchronization across multiple storefronts.",
        solution: "I implemented a modern tech stack using Next.js for SSR and Supabase for real-time database capabilities, reducing dashboard load times by 75%.",
        github: "https://github.com",
        live: "https://example.com",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f", "https://images.unsplash.com/photo-1555066931-4365d14bab8c"]
    },
    {
        slug: "enterprise-corporate-site",
        title: "Enterprise Corporate Site",
        category: "WordPress",
        description: "A comprehensive company portal with custom post types and dynamic content management.",
        longDescription: "A high-performance WordPress site built for a Fortune 500 company. The project involved custom theme development from scratch to ensure maximum speed and SEO optimization.",
        tech: ["WordPress", "Elementor Pro", "PHP", "Custom Post Types", "ACF"],
        problem: "The previous site was difficult for non-technical staff to update, leading to outdated content and security vulnerabilities.",
        solution: "I developed a highly flexible system using Advanced Custom Fields (ACF) and a custom theme, allowing the marketing team to build complex pages in minutes without touching code.",
        github: "#",
        live: "https://example.com",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop",
        images: ["https://images.unsplash.com/photo-1560518883-ce09059eeffa"]
    },
];
