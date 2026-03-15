"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, MonitorPlay } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/projects";

export default function Portfolio({ projects }: { projects: Project[] }) {
    const [filter, setFilter] = useState("All");

    const filteredProjects =
        filter === "All" ? projects : projects.filter((p) => p.category === filter);

    return (
        <section id="portfolio" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-12 border-b border-slate-800 pb-8 gap-8">
                    <div className="max-w-xl text-center lg:text-left">
                        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400 inline-block">
                            Selected Works
                        </h2>
                        <p className="text-slate-400 text-lg">
                            Explore my latest React applications and custom WordPress implementations.
                        </p>
                    </div>

                    <div className="flex gap-2 sm:gap-4 p-1 rounded-2xl bg-slate-900/50 border border-slate-800 self-center lg:self-end overflow-x-auto max-w-full">
                        {["All", "React", "WordPress"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setFilter(cat)}
                                className={`px-4 sm:px-8 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${filter === cat
                                    ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4 }}
                            key={project.slug}
                            className="group glass rounded-[2.5rem] overflow-hidden shadow-2xl hover:shadow-emerald-500/10 transition-all border border-slate-800/50 hover:border-emerald-500/50 flex flex-col"
                        >
                            <div className="relative h-64 sm:h-80 overflow-hidden">
                                <Image
                                    src={project.image}
                                    alt={project.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-6 backdrop-blur-sm">
                                    <a href={project.github} target="_blank" className="p-4 rounded-full bg-slate-900 border border-slate-800 hover:bg-emerald-500 hover:text-slate-950 text-white transition-all shadow-xl" aria-label="Github">
                                        <Github size={24} />
                                    </a>
                                    <a href={project.live} target="_blank" className="p-4 rounded-full bg-slate-900 border border-slate-800 hover:bg-sky-500 text-white transition-all shadow-xl" aria-label="Live Demo">
                                        <MonitorPlay size={24} />
                                    </a>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-2">
                                    {project.category}
                                </div>
                                <h3 className="text-2xl font-bold mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-emerald-400 group-hover:to-sky-400 transition-all cursor-pointer">
                                    <Link href={`/portfolio/${project.slug}`} className="flex items-center gap-2">
                                        {project.title}
                                        <ExternalLink size={18} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </Link>
                                </h3>
                                <p className="text-slate-400 mb-6">{project.description}</p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((tech: string) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 text-xs font-medium rounded-md bg-slate-800/80 text-slate-300 border border-slate-700/50"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
