"use client";

import Link from "next/link";

import {
    Menu, X, Code2, PenTool, LayoutTemplate, MessageSquare, FileText
} from "lucide-react";
import { useState, useEffect } from "react";

import { useLanguage } from "./LanguageProvider";

export default function Navbar() {
    const { language, setLanguage, t } = useLanguage();
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
        { name: t("portfolio"), href: "/#portfolio", icon: <LayoutTemplate size={18} /> },
        { name: t("skills"), href: "/#skills", icon: <Code2 size={18} /> },
        { name: t("blog"), href: "/blog", icon: <PenTool size={18} /> },
        { name: t("gallery"), href: "/gallery", icon: <LayoutTemplate size={18} /> },
        { name: t("resume"), href: "/resume-builder", icon: <FileText size={18} /> },
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
                <Link href="/" className="flex items-center gap-2 group shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20">
                        A
                    </div>
                    <span className="font-heading font-bold text-sm sm:text-xl tracking-tight block truncate">
                        Mohtadi&apos;s <span className="text-emerald-400">Portal</span>
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

                    {/* Language Switcher */}
                    <div className="flex bg-slate-900/50 border border-slate-800 rounded-full p-1 gap-1">
                        {[
                            { code: "en", label: "Global" },
                            { code: "bn", label: "Bengali" },
                            { code: "ar", label: "Arabic" }
                        ].map((lang) => (
                            <button
                                key={lang.code}
                                onClick={() => setLanguage(lang.code as any)}
                                className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider transition-all ${language === lang.code ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20" : "text-slate-500 hover:text-slate-300"}`}
                            >
                                {lang.label}
                            </button>
                        ))}
                    </div>

                    <Link
                        href="#contact"
                        className="px-6 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center gap-2"
                    >
                        <MessageSquare size={18} />
                        {t("hireMe") || "Hire Me"}
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center md:hidden">
                    <button
                        className="p-2 text-slate-300 hover:text-white transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

            </div>

            {/* Mobile Nav */}
            <div
                className={`md:hidden absolute top-20 left-0 w-full bg-slate-900 border-b border-slate-800 transition-all duration-300 overflow-hidden ${isOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
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
                            {t("hireMe")}
                        </Link>
                    </li>
                    <li className="pt-4 mt-4 border-t border-slate-800 pb-10">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">Switch Language</p>
                        <div className="flex bg-slate-950 border border-slate-800 rounded-xl p-1 gap-1">
                            {["en", "bn", "ar"].map((lang) => (
                                <button
                                    key={lang}
                                    onClick={() => setLanguage(lang as any)}
                                    className={`flex-1 py-3 rounded-lg text-xs font-bold uppercase transition-all ${language === lang ? "bg-emerald-500 text-slate-950" : "text-slate-400 hover:bg-slate-800"}`}
                                >
                                    {lang === "en" ? "English" : lang === "bn" ? "Bangla" : "Arabic"}
                                </button>
                            ))}
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
