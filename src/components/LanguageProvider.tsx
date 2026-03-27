"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import Script from "next/script";

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
        // Detect existing Google Translate cookie session
        const match = document.cookie.match(/(^|;) ?googtrans=([^;]*)(;|$)/);
        if (match) {
            const langPair = match[2].split('/');
            const lang = langPair[2] as Language;
            if (lang && ["en", "ar", "bn"].includes(lang)) {
                setLanguage(lang);
            }
        }
    }, []);

    const handleChangeLanguage = (lang: Language) => {
        setLanguage(lang);
        
        if (lang === "en") {
            document.cookie = 'googtrans=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
            document.cookie = `googtrans=; Path=/; domain=.${window.location.hostname}; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
            window.location.reload();
            return;
        }

        // 1. Set Google Translate Cookie manually to ensure cross-session persistence
        document.cookie = `googtrans=/en/${lang}; path=/;`;
        document.cookie = `googtrans=/en/${lang}; domain=.${window.location.hostname}; path=/;`;
        
        // 2. Smoothly trigger the Google Translate DOM engine without reloading the page
        const select = document.querySelector('.goog-te-combo') as HTMLSelectElement;
        if (select) {
            select.value = lang;
            select.dispatchEvent(new Event('change', { bubbles: true, cancelable: true }));
        } else {
            // Fallback for first-load or edge cases
            window.location.reload();
        }
    };

    const t = (key: string) => {
        return (translations[language] as any)[key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage: handleChangeLanguage, t }}>
            <div dir={language === "ar" ? "rtl" : "ltr"} className="min-h-screen transition-all duration-300">
                
                {/* Invisible Google Translate Widget Mount */}
                <div id="google_translate_element" style={{ position: 'absolute', opacity: 0, zIndex: -999, pointerEvents: 'none' }}></div>
                
                <Script id="google-translate-init" strategy="beforeInteractive">
                    {`
                        window.googleTranslateElementInit = function() {
                            new window.google.translate.TranslateElement({
                                pageLanguage: 'en',
                                includedLanguages: 'en,ar,bn',
                                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                                autoDisplay: false
                            }, 'google_translate_element');
                        };
                    `}
                </Script>
                
                <Script
                    src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
                    strategy="afterInteractive"
                />

                {/* Hide Google Topbar that injects itself on translated sites */}
                <style dangerouslySetInnerHTML={{ __html: `
                    /* Hide Top Banner */
                    .goog-te-banner-frame.skiptranslate { display: none !important; }
                    body { top: 0px !important; position: static !important; }
                    
                    /* Hide Tooltips & Popups */
                    #goog-gt-tt, .goog-te-balloon-frame { display: none !important; }
                    .goog-tooltip { display: none !important; }
                    .goog-tooltip:hover { display: none !important; }
                    .goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
                    
                    /* Hide New Modern G-Translate Suggestion Modals / Wrappers */
                    .VIpgJd-Zvi9od-aZ2wEe-wOHMyf { display: none !important; }
                    .VIpgJd-Zvi9od-aZ2wEe-wOHMyf-ti6hGc { display: none !important; }
                    .VIpgJd-Zvi9od-ORHb-OEVmcd { display: none !important; }
                    .VIpgJd-Zvi9od-SmV6nw { display: none !important; }
                    .VIpgJd-Zvi9od-l4eHX-hSRGPd { display: none !important; }
                    
                    /* Hide any generic iframes Google tries to spawn except AdSense */
                    iframe[name="c"] { display: none !important; }
                ` }} />

                {children}
            </div>
        </LanguageContext.Provider>
    );
};

export const useLanguage = () => useContext(LanguageContext);
