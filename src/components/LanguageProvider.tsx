"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "en" | "ar" | "bn";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
}

const translations = {
    en: {
        welcome: "Welcome",
        dashboard: "Dashboard",
        gallery: "Gallery",
        portfolio: "Portfolio",
        blog: "Blog",
        skills: "Skills",
        resume: "Resume",
        admin: "Admin",
        hireMe: "Hire Me",
        backToBlog: "Back to Blog",
        backToPortfolio: "Back to Portfolio",
        readMore: "Read More",
        startProject: "Start a Project",
        contactTitle: "Let's Work Together",
    },
    ar: {
        welcome: "مرحباً",
        dashboard: "لوحة القيادة",
        gallery: "صالة عرض",
        portfolio: "مَلَفّ",
        blog: "مدونة",
        skills: "مهارات",
        resume: "سيرة ذاتية",
        admin: "مشرف",
        hireMe: "وظفني",
        backToBlog: "العودة إلى المدونة",
        backToPortfolio: "العودة إلى Portfolio",
        readMore: "اقرأ أكثر",
        startProject: "ابدأ مشروعاً",
        contactTitle: "دعونا نعمل معا",
    },
    bn: {
        welcome: "স্বাগতম",
        dashboard: "ড্যাশবোর্ড",
        gallery: "গ্যালারি",
        portfolio: "পোর্টফোলিও",
        blog: "ব্লগ",
        skills: "দক্ষতা",
        resume: "জীবনবৃত্তান্ত",
        admin: "এডমিন",
        hireMe: "আমাকে নিয়োগ দিন",
        backToBlog: "ব্লগে ফিরে যান",
        backToPortfolio: "পোর্টফোলিওতে ফিরে যান",
        readMore: "আরও পড়ুন",
        startProject: "একটি প্রকল্প শুরু করুন",
        contactTitle: "চলুন একসাথে কাজ করি",
    }
} as const;

const LanguageContext = createContext<LanguageContextType>({
    language: "en",
    setLanguage: () => {},
    t: (key) => key,
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
    const [language, setLanguage] = useState<Language>("en");

    useEffect(() => {
        const savedLang = localStorage.getItem("app_lang") as Language;
        if (savedLang && ["en", "ar", "bn"].includes(savedLang)) {
            setLanguage(savedLang);
        }
    }, []);

    const handleChangeLanguage = (lang: Language) => {
        setLanguage(lang);
        localStorage.setItem("app_lang", lang);
    };

    const t = (key: string) => {
        return (translations[language] as any)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleChangeLanguage, t }}>
            <div dir={language === "ar" ? "rtl" : "ltr"} className="min-h-screen transition-all duration-300">
                {children}
            </div>
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
