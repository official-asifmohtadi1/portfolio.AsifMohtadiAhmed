"use client";

import { motion } from "framer-motion";
import { Code, Layout, PenTool } from "lucide-react";

export default function Skills() {
    const categories = [
        {
            title: "Frontend Development",
            icon: <Code size={24} className="text-emerald-400" />,
            skills: [
                { name: "React / Next.js", level: 95 },
                { name: "Tailwind CSS", level: 90 },
                { name: "TypeScript", level: 85 },
                { name: "Framer Motion", level: 80 },
            ],
        },
        {
            title: "WordPress ecosystem",
            icon: <Layout size={24} className="text-sky-400" />,
            skills: [
                { name: "Custom Themes", level: 90 },
                { name: "Elementor Pro", level: 95 },
                { name: "PHP", level: 80 },
                { name: "Plugin Integration", level: 88 },
            ],
        },
        {
            title: "Content & Strategy",
            icon: <PenTool size={24} className="text-indigo-400" />,
            skills: [
                { name: "Technical Writing", level: 92 },
                { name: "SEO Optimization", level: 85 },
                { name: "Content Strategy", level: 88 },
                { name: "Copywriting", level: 90 },
            ],
        },
    ];

    return (
        <section id="skills" className="py-24 relative overflow-hidden bg-slate-900/30 border-y border-slate-800/50">
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400 inline-block">
                        Professional Proficiency
                    </h2>
                    <p className="text-slate-400 text-lg">
                        A comprehensive overview of my technical capabilities and creative skill set. Bridging the gap between engineering and communication.
                    </p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {categories.map((category, idx) => (
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: idx * 0.2 }}
                            key={category.title}
                            className="glass p-8 rounded-3xl group hover:border-emerald-500/30 transition-colors"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-4 bg-slate-800 rounded-2xl shadow-inner group-hover:scale-110 transition-transform">
                                    {category.icon}
                                </div>
                                <h3 className="text-2xl font-bold">{category.title}</h3>
                            </div>
                            <div className="space-y-6">
                                {category.skills.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between items-center mb-2 font-medium text-sm">
                                            <span className="text-slate-200">{skill.name}</span>
                                            <span className="text-slate-400">{skill.level}%</span>
                                        </div>
                                        <div className="w-full bg-slate-800/50 rounded-full h-2.5 overflow-hidden shadow-inner">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.3 }}
                                                className="bg-gradient-to-r from-emerald-400 to-sky-400 h-2.5 rounded-full relative"
                                            >
                                                <div className="absolute top-0 right-0 bottom-0 w-8 bg-white/20 -skew-x-12 blur-[2px] animate-[pulse_2s_infinite]"></div>
                                            </motion.div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
