"use client";

import Link from "next/link";

import {
    Menu, X, Code2, PenTool, LayoutTemplate, MessageSquare, FileText
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Portfolio", href: "/#portfolio", icon: <LayoutTemplate size={18} /> },
        { name: "Skills", href: "/#skills", icon: <Code2 size={18} /> },
        { name: "Blog", href: "/blog", icon: <PenTool size={18} /> },
        { name: "Resume Builder", href: "/resume-builder", icon: <FileText size={18} /> },
    ];

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${isScrolled
                ? "bg-slate-950/80 backdrop-blur-md border-slate-800 shadow-xl"
                : "bg-transparent border-transparent"
                }`}
        >
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20">
                        A
                    </div>
                    <span className="font-heading font-bold text-xl tracking-tight hidden sm:block">
                        Asif<span className="text-emerald-400">.</span>dev
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <ul className="flex items-center gap-6">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    href={link.href}
                                    className="flex items-center gap-2 text-sm font-medium text-slate-300 hover:text-white transition-colors py-2"
                                >
                                    {link.icon}
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                    <Link
                        href="#contact"
                        className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-2"
                    >
                        <MessageSquare size={18} />
                        Hire Me
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <div
                className={`md:hidden absolute top-20 left-0 w-full bg-slate-900 border-b border-slate-800 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <ul className="container mx-auto px-6 py-4 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <li key={link.name}>
                            <Link
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-3 text-lg font-medium text-slate-300 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        </li>
                    ))}
                    <li>
                        <Link
                            href="#contact"
                            onClick={() => setIsOpen(false)}
                            className="mt-2 w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold"
                        >
                            <MessageSquare size={20} />
                            Hire Me
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
