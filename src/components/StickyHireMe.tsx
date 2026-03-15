"use client";

import { MessageSquare } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

import { useLanguage } from "./LanguageProvider";

export default function StickyHireMe() {
    const { t } = useLanguage();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ scale: 0, opacity: 0, x: 50 }}
                    animate={{ scale: 1, opacity: 1, x: 0 }}
                    exit={{ scale: 0, opacity: 0, x: 50 }}
                    className="fixed bottom-8 right-8 z-[60]"
                >
                    <Link
                        href="#contact"
                        className="group relative flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500 text-slate-950 shadow-[0_0_30px_rgba(16,185,129,0.5)] hover:bg-emerald-400 transition-all hover:scale-110 active:scale-95"
                    >
                        <MessageSquare size={28} />

                        {/* Tooltip-style Label */}
                        <span className="absolute right-20 px-4 py-2 rounded-xl bg-slate-900 text-white text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-slate-800 shadow-2xl pointer-events-none">
                            {t("startProject")}
                        </span>

                        {/* Pulsing Ring */}
                        <span className="absolute inset-0 rounded-2xl border-2 border-emerald-500 animate-ping opacity-50 pointer-events-none" />
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
