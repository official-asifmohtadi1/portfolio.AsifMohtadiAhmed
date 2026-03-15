"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download, Github, Linkedin, Twitter, Code2, PenTool } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
            {/* Background decorations */}
            <div className="absolute top-1/4 -left-64 w-96 h-96 bg-emerald-500/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-sky-500/20 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Text Content */}
                <div className="space-y-8 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-sm font-medium mb-6">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                            </span>
                            Available for Freelance & Strategic Roles
                        </div>
                        <h1 className="text-5xl lg:text-8xl font-bold font-heading leading-[1.1] mb-6">
                            Architecting <br />
                            <span className="text-gradient">Digital Success.</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-xl leading-relaxed">
                            I&apos;m <strong className="text-white">Asif Mohtadi Ahmed</strong>, Head of IT Dept. at <span className="text-emerald-400 font-bold">Softs Studio</span>. Specialized in building high-performance React ecosystems and premium WordPress implementations.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="flex flex-wrap items-center gap-4"
                    >
                        <Link
                            href="#portfolio"
                            className="px-8 py-3.5 rounded-full bg-white text-slate-950 font-bold hover:bg-slate-200 transition-colors flex items-center gap-2 group"
                        >
                            View My Work
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <a
                            href="/Asif_Mohtadi_Ahmed_CV.pdf"
                            download
                            className="px-8 py-3.5 rounded-full bg-slate-800 text-white font-medium hover:bg-slate-700 border border-slate-700 transition-all flex items-center gap-2"
                        >
                            <Download size={18} />
                            Download CV
                        </a>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex items-center gap-6 pt-4"
                    >
                        <a href="https://github.com/asifmohtadi1" target="_blank" className="text-slate-400 hover:text-emerald-400 transition-colors">
                            <Github size={24} />
                            <span className="sr-only">GitHub</span>
                        </a>
                        <a href="https://linkedin.com/in/asifmohtadi" target="_blank" className="text-slate-400 hover:text-emerald-400 transition-colors">
                            <Linkedin size={24} />
                            <span className="sr-only">LinkedIn</span>
                        </a>
                        <a href="https://twitter.com/asifmohtadi" target="_blank" className="text-slate-400 hover:text-emerald-400 transition-colors">
                            <Twitter size={24} />
                            <span className="sr-only">Twitter</span>
                        </a>
                    </motion.div>
                </div>

                {/* Image/Visual Content */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.7 }}
                    className="relative lg:h-[600px] flex items-center justify-center"
                >
                    {/* Decorative Card 1 */}
                    <div className="absolute top-1/4 right-0 glass p-6 rounded-2xl w-64 z-20 animate-[bounce_6s_infinite] hidden xl:block">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 rounded-full bg-sky-500/20 flex items-center justify-center">
                                <Code2 className="text-sky-400" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">React Specialist</h4>
                                <p className="text-xs text-slate-400">Next.js & Vite</p>
                            </div>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div className="bg-sky-400 h-1.5 rounded-full w-[90%]"></div>
                        </div>
                    </div>

                    {/* Decorative Card 2 */}
                    <div className="absolute bottom-1/4 left-0 glass p-6 rounded-2xl w-64 z-20 animate-[bounce_7s_infinite_reverse] hidden xl:block">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <PenTool className="text-emerald-400" size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-sm">Content Engine</h4>
                                <p className="text-xs text-slate-400">Dynamic Blogs</p>
                            </div>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-1.5">
                            <div className="bg-emerald-400 h-1.5 rounded-full w-[85%]"></div>
                        </div>
                    </div>

                    {/* Main Visual */}
                    <div className="relative w-80 h-80 md:w-96 md:h-96 rounded-full p-1 z-10"
                        style={{ background: "linear-gradient(135deg, #10b981, #0ea5e9, #6366f1)" }}>
                        {/* Spinning ring accent */}
                        <div className="absolute inset-0 rounded-full border-2 border-dashed border-emerald-500/30 animate-spin" style={{ animationDuration: "20s" }} />
                        <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden relative shadow-2xl border-2 border-slate-800">
                            <Image
                                src="/asif-profile.jpg"
                                alt="Asif Mohtadi Ahmed"
                                fill
                                sizes="(max-width: 768px) 320px, 384px"
                                priority
                                className="object-cover object-top"
                            />
                            {/* Subtle bottom fade */}
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent z-10" />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
