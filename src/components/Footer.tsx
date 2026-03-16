import { Github, Linkedin, Mail } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="border-t border-slate-800 bg-slate-950/80 backdrop-blur-md relative z-10 pt-16 pb-8">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="md:col-span-2 space-y-4">
                        <Link href="/" className="flex items-center gap-2 group mb-6 inline-flex">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20">
                                A
                            </div>
                            <span className="font-heading font-bold text-xl tracking-tight">
                                Mohtadi&apos;s <span className="text-emerald-400">Portal</span>
                            </span>
                        </Link>
                        <p className="text-slate-400 max-w-sm">
                            Crafting high-performance digital architectures with React and dynamic storytelling through exceptional content.
                        </p>
                        <div className="flex items-center gap-4 pt-4">
                            <a href="https://github.com/asifmohtadi1" target="_blank" className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors">
                                <Github size={20} />
                            </a>
                            <a href="https://linkedin.com/in/asifmohtadi" target="_blank" className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors">
                                <Linkedin size={20} />
                            </a>
                            <a href="mailto:asifmohtadi1@gmail.com" className="p-2 rounded-full bg-slate-900 border border-slate-800 hover:text-emerald-400 hover:border-emerald-500/50 transition-colors">
                                <Mail size={20} />
                            </a>
                        </div>
                        <div className="text-slate-500 text-sm font-medium pt-4 space-y-1">
                            <p>Phone: +8801687186854</p>
                            <p className="text-slate-400">asifmohtadi1@gmail.com</p>
                            <p className="text-slate-400">asif@softsstudio.com</p>
                            <p className="text-slate-300 font-bold">Softs Studio | Head of IT Dept.</p>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 font-heading tracking-wider text-emerald-400">Navigation</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/#portfolio" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Portfolio</Link>
                            </li>
                            <li>
                                <Link href="/#skills" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Skills</Link>
                            </li>
                            <li>
                                <Link href="/blog" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Blog Insights</Link>
                            </li>
                            <li>
                                <Link href="/gallery" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Gallery</Link>
                            </li>
                            <li>
                                <Link href="/#contact" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 font-heading tracking-wider text-sky-400">Special Tools</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/resume-builder" className="text-slate-400 hover:text-emerald-400 text-sm transition-colors flex items-center gap-2">
                                    IT Job Resume Builder <span className="text-[10px] bg-emerald-500/10 text-emerald-400 px-1.5 py-0.5 rounded border border-emerald-500/20">NEW</span>
                                </Link>
                            </li>
                            <li className="text-slate-400 text-sm">React Development</li>
                            <li className="text-slate-400 text-sm">WordPress Headless</li>
                            <li className="text-slate-400 text-sm">Technical Writing</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 flex flex-col md:flex-row items-center justify-between pt-8">
                    <p className="text-slate-500 text-xs mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} Asif Mohtadi Ahmed. All rights reserved.
                    </p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-slate-500 text-xs hover:text-slate-300">Privacy Policy</Link>
                        <Link href="#" className="text-slate-500 text-xs hover:text-slate-300">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
