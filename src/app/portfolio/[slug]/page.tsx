import { getProjectData } from "@/lib/projects";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import {
    ChevronLeft,
    ExternalLink,
    Github,
    CheckCircle2,
    Rocket,
    Lightbulb,
    Cpu
} from "lucide-react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Image from "next/image";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectData(slug);

    if (!project) return { title: "Project Not Found" };

    return {
        title: `${project.title} | Case Study | Mohtadi's Portal`,
        description: project.description,
        openGraph: {
            title: project.title,
            description: project.description,
            images: [{ url: project.image }],
        },
        twitter: {
            card: "summary_large_image",
            title: project.title,
            description: project.description,
            images: [project.image],
        }
    };
}

export default async function ProjectCaseStudy({ params }: { params: Params }) {
    const { slug } = await params;
    const project = getProjectData(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col pt-24">
            <Navbar />
            <main className="container mx-auto px-6 py-12 flex-grow">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "CreativeWork",
                            "name": project.title,
                            "description": project.description,
                            "image": project.image,
                            "author": {
                                "@type": "Person",
                                "name": "Asif Mohtadi Ahmed"
                            },
                            "keywords": project.tech.join(", "),
                            "url": `https://asifmohtadi.me/portfolio/${project.slug}`
                        })
                    }}
                />
                <div className="max-w-6xl mx-auto">
                    {/* Back Navigation */}
                    <Link href="/#portfolio" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-12 font-medium">
                        <ChevronLeft size={20} /> Back to Portfolio
                    </Link>

                    {/* Hero Section */}
                    <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                        <div>
                            <div className="inline-block px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold uppercase tracking-widest mb-6">
                                Case Study: {project.category}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-bold font-heading mb-8 leading-tight">
                                {project.title}
                            </h1>
                            <p className="text-xl text-slate-400 leading-relaxed mb-10">
                                {project.longDescription}
                            </p>

                            <div className="flex flex-wrap gap-4 mb-10">
                                <a
                                    href={project.live}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 rounded-2xl bg-emerald-500 text-slate-950 font-bold flex items-center gap-3 hover:bg-emerald-400 transition-all shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                                >
                                    Live Demo <ExternalLink size={20} />
                                </a>
                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 rounded-2xl bg-slate-800 text-white font-bold flex items-center gap-3 hover:bg-slate-700 transition-all border border-slate-700"
                                >
                                    View Source <Github size={20} />
                                </a>
                            </div>
                        </div>

                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/20 to-sky-500/20 rounded-[3rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div className="relative aspect-video rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl skew-y-1 group-hover:skew-y-0 transition-transform duration-700">
                                <Image src={project.image} alt={project.title} fill sizes="(max-width: 1024px) 100vw, 50vw" priority className="object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Tech Stack Matrix */}
                    <section className="py-20 border-y border-slate-800/50 mb-24">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold font-heading flex items-center justify-center gap-3">
                                <Cpu className="text-emerald-400" /> Technology Stack
                            </h2>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4">
                            {project.tech.map((t) => (
                                <div key={t} className="px-6 py-3 rounded-2xl bg-slate-900 border border-slate-800 font-bold text-slate-300 hover:border-emerald-500/50 hover:text-white transition-all">
                                    {t}
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Problem & Solution */}
                    <div className="grid md:grid-cols-2 gap-12 mb-24">
                        <div className="glass p-12 rounded-[3.5rem] border-red-500/10 hover:border-red-500/30 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400 mb-8">
                                <Lightbulb size={32} />
                            </div>
                            <h3 className="text-3xl font-bold font-heading mb-6">The Challenge</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                {project.problem}
                            </p>
                        </div>

                        <div className="glass p-12 rounded-[3.5rem] border-emerald-500/10 hover:border-emerald-500/30 transition-colors">
                            <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-8">
                                <CheckCircle2 size={32} />
                            </div>
                            <h3 className="text-3xl font-bold font-heading mb-6">Execution & Solution</h3>
                            <p className="text-slate-400 text-lg leading-relaxed">
                                {project.solution}
                            </p>
                        </div>
                    </div>

                    {/* Image Gallery */}
                    <section className="mb-24">
                        <h3 className="text-3xl font-bold font-heading mb-12 text-center">Development Preview</h3>
                        <div className="grid md:grid-cols-2 gap-8">
                            {project.images.map((img, i) => (
                                <div key={i} className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-xl group">
                                    <Image src={img} alt={`${project.title} Preview ${i + 1}`} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover group-hover:scale-105 transition-transform duration-700" />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Final CTA */}
                    <section className="bg-gradient-to-br from-emerald-500/10 to-sky-500/10 p-16 md:p-24 rounded-[4rem] text-center border border-slate-800 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 blur-3xl rounded-full" />
                        <div className="relative z-10">
                            <Rocket className="w-12 h-12 text-emerald-400 mx-auto mb-8 animate-bounce" />
                            <h2 className="text-4xl md:text-5xl font-bold font-heading mb-8">Ready to start your next big project?</h2>
                            <p className="text-slate-400 text-xl max-w-2xl mx-auto mb-12">
                                Join dozens of satisfied clients and let&apos;s build something exceptional together.
                            </p>
                            <Link href="/#contact" className="px-12 py-5 bg-emerald-500 text-slate-950 rounded-2xl font-bold text-xl hover:bg-emerald-400 transition-all shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                                Hire Me Now
                            </Link>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
