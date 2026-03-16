"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Download, Plus, Trash2, User, Briefcase, GraduationCap, Sparkles, Layout, Trophy, FileText, Camera, ImagePlus, X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumeBuilder() {
    const [activeTab, setActiveTab] = useState("personal");
    const [isMounted, setIsMounted] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [showPreviewMobile, setShowPreviewMobile] = useState(false);
    const [photo, setPhoto] = useState<string>("");

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            if (ev.target?.result) setPhoto(ev.target.result as string);
        };
        reader.readAsDataURL(file);
    };
    const [containerWidth, setContainerWidth] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const previewRef = useRef<HTMLDivElement>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!isMounted || !containerRef.current) return;

        const handleResize = () => {
            if (containerRef.current) {
                setContainerWidth(containerRef.current.clientWidth);
            }
        };

        const observer = new ResizeObserver(handleResize);
        observer.observe(containerRef.current);
        window.addEventListener('resize', handleResize);
        handleResize();

        return () => {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    }, [isMounted]);

    const calculateScale = () => {
        if (!isMounted) return 1;
        // Priority: Measured Container Width -> Window Width -> Default A4
        const width = containerWidth || (typeof window !== 'undefined' ? window.innerWidth : 800);
        const padding = width < 640 ? 32 : 64;
        const availableWidth = Math.max(280, width - padding);
        const s = Math.min(1, availableWidth / 800);
        return s;
    };

    const scale = calculateScale();

    // Initial state is blank as requested
    const [data, setData] = useState({
        personal: {
            fullName: "", title: "", email: "", phone: "", location: "", summary: "", github: "", website: ""
        },
        experience: [] as any[],
        education: [] as any[],
        skills: [] as string[]
    });

    const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            personal: { ...prev.personal, [name]: value }
        }));
    };

    const addExperience = () => {
        setData(prev => ({
            ...prev,
            experience: [...prev.experience, { id: Date.now().toString(), company: "", role: "", period: "", desc: "" }]
        }));
    };

    const removeExperience = (id: string) => {
        setData(prev => ({
            ...prev,
            experience: prev.experience.filter(exp => exp.id !== id)
        }));
    };

    const handleExperienceChange = (id: string, field: string, value: string) => {
        setData(prev => ({
            ...prev,
            experience: prev.experience.map(exp => exp.id === id ? { ...exp, [field]: value } : exp)
        }));
    };

    if (!isMounted) return null;

    const downloadResume = async () => {
        if (!previewRef.current) return;
        setIsDownloading(true);

        try {
            // Dinamically import html2pdf to prevent server-side errors
            const html2pdfModule = await import('html2pdf.js');
            const html2pdf = html2pdfModule.default || html2pdfModule;
            
            const element = previewRef.current;
            const opt = {
                margin:       [10, 10, 10, 10] as [number, number, number, number],
                filename:     `${data.personal.fullName || 'Resume'}.pdf`,
                image:        { type: 'jpeg' as const, quality: 0.98 },
                html2canvas:  { scale: 2, useCORS: true, letterRendering: true },
                jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' as const }
            };

            // Generate PDF Blob for backend
            const worker = html2pdf().from(element).set(opt);
            const pdfBlob = await worker.output('blob');
            
            const reader = new FileReader();
            reader.readAsDataURL(pdfBlob);
            reader.onloadend = async () => {
                const base64data = reader.result;

                // POST to save in db \u0026 send email
                try {
                    await fetch('/api/resume', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            personal: data.personal,
                            data: data,
                            pdfBase64: base64data
                        })
                    });
                } catch (apiErr) {
                    console.error("API saving failed:", apiErr);
                }

                // Finally trigger standard html2pdf download for the user
                await worker.save();
                setIsDownloading(false);
            }
        } catch(e) {
            console.error("Resume Generation Error:", e);
            setIsDownloading(false);
            alert("Failed to generate PDF. Please check your inputs and try again.");
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col pt-24">
            <Navbar />

            <main className="flex-grow w-full max-w-[100vw] overflow-x-hidden px-4 sm:px-6 py-8 md:py-12">
                <div className="max-w-7xl mx-auto w-full overflow-x-hidden">
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-widest mb-6"
                        >
                            <Sparkles size={14} /> Professional IT Tool
                        </motion.div>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                            IT Job <span className="text-gradient">Resume Builder</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            Craft a high-impact, ATS-optimized technical resume in minutes.
                        </p>
                    </div>

                    <div className="lg:hidden fixed bottom-8 right-8 z-[100]">
                        <button
                            onClick={() => {
                                const el = document.getElementById("resume-preview-container");
                                el?.scrollIntoView({ behavior: "smooth" });
                            }}
                            className="bg-emerald-500 text-slate-950 p-4 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all"
                            title="Jump to Preview"
                        >
                            <Layout size={24} />
                        </button>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-start relative pb-32 lg:pb-0 w-full overflow-hidden">
                        {/* Editor Side */}
                        <div className={`glass p-5 md:p-10 rounded-3xl md:rounded-[2.5rem] border-slate-800 shadow-2xl transition-all w-full min-w-0 ${showPreviewMobile ? "hidden lg:block" : "block"}`}>
                            <div className="flex gap-2 mb-8 overflow-x-auto pb-4 scrollbar-hide -mx-2 px-2 sm:mx-0 sm:px-0 sm:flex-wrap sm:overflow-visible">
                                {[
                                    { id: "personal", label: "Me", fullLabel: "Personal", icon: User },
                                    { id: "experience", label: "Job", fullLabel: "Experience", icon: Briefcase },
                                    { id: "skills", label: "Tech", fullLabel: "Skills", icon: Trophy },
                                    { id: "education", label: "Edu", fullLabel: "Education", icon: GraduationCap },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap active:scale-95 ${activeTab === tab.id
                                            ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                                            : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                                            }`}
                                    >
                                        <tab.icon size={14} className="sm:w-[16px] sm:h-[16px]" />
                                        <span className="hidden xs:inline">{tab.fullLabel}</span>
                                        <span className="xs:hidden">{tab.label}</span>
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                {activeTab === "personal" && (
                                    <motion.div
                                        key="personal"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-6"
                                    >
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Profile Photo</label>
                                                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                                                    <div
                                                        onClick={() => photoInputRef.current?.click()}
                                                        className="relative w-28 h-28 rounded-full border-2 border-dashed border-slate-700 hover:border-emerald-500 bg-slate-900/50 flex items-center justify-center cursor-pointer transition-all group flex-shrink-0 overflow-hidden"
                                                    >
                                                        {photo ? (
                                                            <>
                                                                <img src={photo} alt="Profile" className="w-full h-full object-cover object-top" />
                                                                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                                                    <Camera size={20} className="text-white" />
                                                                </div>
                                                            </>
                                                        ) : (
                                                            <div className="flex flex-col items-center gap-1 text-slate-500 group-hover:text-emerald-400 transition-colors">
                                                                <ImagePlus size={24} />
                                                                <span className="text-[10px] font-bold">UPLOAD</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 text-center sm:text-left">
                                                        <h4 className="text-sm font-bold text-slate-200 mb-1">Professional Portrait</h4>
                                                        <p className="text-xs text-slate-500 mb-4">Upload a high-quality professional photo for your technical resume.</p>
                                                        <div className="flex flex-wrap justify-center sm:justify-start gap-3">
                                                            <button
                                                                type="button"
                                                                onClick={() => photoInputRef.current?.click()}
                                                                className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold hover:bg-emerald-500/20 transition-all flex items-center gap-2"
                                                            >
                                                                <Camera size={14} /> {photo ? "Change Photo" : "Choose Photo"}
                                                            </button>
                                                            {photo && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setPhoto("")}
                                                                    className="px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-bold hover:bg-red-500/20 transition-all flex items-center gap-2"
                                                                >
                                                                    <Trash2 size={14} /> Remove
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <input ref={photoInputRef} type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                                                <input name="fullName" value={data.personal.fullName} onChange={handlePersonalChange} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Job Title</label>
                                                <input name="title" value={data.personal.title} onChange={handlePersonalChange} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all" />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                                                <input name="email" value={data.personal.email} onChange={handlePersonalChange} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                                                <input name="phone" value={data.personal.phone} onChange={handlePersonalChange} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all" />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">GitHub URL</label>
                                                <input name="github" value={data.personal.github} onChange={handlePersonalChange} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Website URL</label>
                                                <input name="website" value={data.personal.website} onChange={handlePersonalChange} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all" />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Location</label>
                                            <input name="location" value={data.personal.location} onChange={handlePersonalChange} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Professional Summary</label>
                                            <textarea name="summary" rows={4} value={data.personal.summary} onChange={handlePersonalChange} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all resize-none" />
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "experience" && (
                                    <motion.div
                                        key="experience"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-8"
                                    >
                                        {data.experience.map((exp) => (
                                            <div key={exp.id} className="p-5 md:p-6 rounded-2xl bg-slate-900/30 border border-slate-800 relative group/exp">
                                                <button 
                                                    onClick={() => removeExperience(exp.id)} 
                                                    className="absolute -top-3 -right-3 md:top-4 md:right-4 w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all z-10 md:opacity-0 md:group-hover/exp:opacity-100"
                                                    title="Remove Entry"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-bold text-slate-500">Company</label>
                                                        <input value={exp.company} onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 focus:border-emerald-500" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-bold text-slate-500">Role</label>
                                                        <input value={exp.role} onChange={(e) => handleExperienceChange(exp.id, "role", e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 focus:border-emerald-500" />
                                                    </div>
                                                </div>
                                                <div className="space-y-1 mb-4">
                                                    <label className="text-[10px] font-bold text-slate-500">Period</label>
                                                    <input value={exp.period} onChange={(e) => handleExperienceChange(exp.id, "period", e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 focus:border-emerald-500" />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-500">Description</label>
                                                    <textarea rows={3} value={exp.desc} onChange={(e) => handleExperienceChange(exp.id, "desc", e.target.value)} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 resize-none focus:border-emerald-500" />
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={addExperience} className="w-full py-4 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all flex items-center justify-center gap-2 font-bold">
                                            <Plus size={18} /> Add Experience
                                        </button>
                                    </motion.div>
                                )}

                                {activeTab === "skills" && (
                                    <motion.div
                                        key="skills"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Technical Skills (Comma separated)</label>
                                            <textarea rows={4} value={data.skills.join(", ")} onChange={(e) => {
                                                const skills = e.target.value.split(",").map(s => s.trim());
                                                setData(prev => ({ ...prev, skills }));
                                            }} className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all resize-none" />
                                        </div>
                                    </motion.div>
                                )}

                                {activeTab === "education" && (
                                    <motion.div
                                        key="education"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 20 }}
                                        className="space-y-8"
                                    >
                                        {data.education.map((edu) => (
                                            <div key={edu.id} className="p-5 md:p-6 rounded-2xl bg-slate-900/30 border border-slate-800 relative group/edu">
                                                <button 
                                                    onClick={() => setData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== edu.id) }))} 
                                                    className="absolute -top-3 -right-3 md:top-4 md:right-4 w-8 h-8 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all z-10 md:opacity-0 md:group-hover/edu:opacity-100"
                                                    title="Remove Entry"
                                                >
                                                    <Trash2 size={14} />
                                                </button>
                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-bold text-slate-500">School</label>
                                                        <input value={edu.school} onChange={(e) => setData(prev => ({ ...prev, education: prev.education.map(ed => ed.id === edu.id ? { ...ed, school: e.target.value } : ed) }))} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 focus:border-emerald-500" />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-bold text-slate-500">Degree</label>
                                                        <input value={edu.degree} onChange={(e) => setData(prev => ({ ...prev, education: prev.education.map(ed => ed.id === edu.id ? { ...ed, degree: e.target.value } : ed) }))} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 focus:border-emerald-500" />
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-500">Year</label>
                                                    <input value={edu.year} onChange={(e) => setData(prev => ({ ...prev, education: prev.education.map(ed => ed.id === edu.id ? { ...ed, year: e.target.value } : ed) }))} className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 focus:border-emerald-500" />
                                                </div>
                                            </div>
                                        ))}
                                        <button onClick={() => setData(prev => ({ ...prev, education: [...prev.education, { id: Date.now().toString(), school: "", degree: "", year: "" }] }))} className="w-full py-4 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all flex items-center justify-center gap-2 font-bold">
                                            <Plus size={18} /> Add Education
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Preview Side */}
                        <div 
                            id="resume-preview-container"
                            ref={containerRef}
                            className="relative transition-all w-full min-w-0 lg:sticky lg:top-24 overflow-hidden"
                        >
                            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/10 to-sky-500/10 rounded-[3rem] blur-3xl opacity-50 pointer-events-none" />

                            <div className="flex flex-col items-center w-full">
                                {/* Preview Container with precise dynamic scaling */}
                                <div 
                                    className="w-full flex justify-center bg-slate-950 rounded-3xl border border-slate-800 p-2 sm:p-4 overflow-hidden"
                                    style={{ minHeight: '300px' }}
                                >
                                    {/* The magic scaler: it has the visual size of the scaled child */}
                                    <div 
                                        className="transition-all duration-300 flex justify-center"
                                        style={{ 
                                            width: `${800 * scale}px`, 
                                            height: `${1100 * scale}px`,
                                            overflow: 'hidden'
                                        }}
                                    >
                                        <div 
                                            className="origin-top" 
                                            style={{ 
                                                transform: `scale(${scale})`, 
                                                width: '800px',
                                                height: '1100px',
                                                transition: 'transform 0.3s ease'
                                            }}
                                        >
                                            <div ref={previewRef} id="resume-preview" className="bg-white text-slate-900 shadow-2xl p-[40px] w-[800px] min-h-[1100px]" style={{ fontFamily: "Georgia, 'Times New Roman', serif", fontSize: "14px", lineHeight: "1.6" }}>
                                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", gap: "20px" }}>
                                                <div style={{ flex: 1 }}>
                                                    <h1 style={{ fontSize: "32px", fontWeight: "bold", textTransform: "uppercase", margin: "0 0 5px 0", letterSpacing: "-0.02em" }}>{data.personal.fullName || "YOUR NAME"}</h1>
                                                    <p style={{ fontSize: "16px", color: "#059669", textTransform: "uppercase", fontWeight: "600", margin: "0" }}>{data.personal.title || "Job Title"}</p>
                                                </div>
                                                {photo && (
                                                    <img src={photo} alt="" style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover", border: "4px solid #f8fafc" }} />
                                                )}
                                            </div>

                                            <div style={{ fontSize: "12px", color: "#475569", borderBottom: "2px solid #0f172a", paddingBottom: "12px", marginBottom: "24px", display: "flex", flexWrap: "wrap", gap: "15px" }}>
                                                {data.personal.email && <span>Email: {data.personal.email}</span>}
                                                {data.personal.phone && <span>Phone: {data.personal.phone}</span>}
                                                {data.personal.location && <span>Loc: {data.personal.location}</span>}
                                                {data.personal.website && <span>Site: {data.personal.website}</span>}
                                                {data.personal.github && <span>Git: {data.personal.github}</span>}
                                            </div>

                                            {data.personal.summary && (
                                                <div style={{ marginBottom: "24px" }}>
                                                    <h2 style={{ fontSize: "14px", textTransform: "uppercase", fontWeight: "bold", borderLeft: "4px solid #10b981", paddingLeft: "10px", margin: "0 0 10px 0", color: "#0f172a" }}>Executive Summary</h2>
                                                    <p style={{ margin: "0", fontSize: "14px", textAlign: "justify" }}>{data.personal.summary}</p>
                                                </div>
                                            )}

                                            {data.experience.length > 0 && (
                                                <div style={{ marginBottom: "24px" }}>
                                                    <h2 style={{ fontSize: "14px", textTransform: "uppercase", fontWeight: "bold", borderLeft: "4px solid #10b981", paddingLeft: "10px", margin: "0 0 12px 0", color: "#0f172a" }}>Professional Experience</h2>
                                                    {data.experience.map((exp: any) => (
                                                        <div key={exp.id} style={{ marginBottom: "16px" }}>
                                                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "15px" }}>
                                                                <span>{exp.role || "Role"}</span>
                                                                <span style={{ fontSize: "13px", color: "#64748b" }}>{exp.period || "Period"}</span>
                                                            </div>
                                                            <div style={{ fontSize: "14px", color: "#059669", fontWeight: "bold", marginBottom: "6px" }}>{exp.company || "Company"}</div>
                                                            <p style={{ margin: "0", fontSize: "14px", whiteSpace: "pre-line", color: "#334155" }}>{exp.desc}</p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {data.education.length > 0 && (
                                                <div style={{ marginBottom: "24px" }}>
                                                    <h2 style={{ fontSize: "14px", textTransform: "uppercase", fontWeight: "bold", borderLeft: "4px solid #10b981", paddingLeft: "10px", margin: "0 0 12px 0", color: "#0f172a" }}>Education</h2>
                                                    {data.education.map((edu: any) => (
                                                        <div key={edu.id} style={{ marginBottom: "12px" }}>
                                                            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", fontSize: "15px" }}>
                                                                <span>{edu.degree || "Degree"}</span>
                                                                <span style={{ fontSize: "13px", color: "#64748b" }}>{edu.year}</span>
                                                            </div>
                                                            <div style={{ fontSize: "14px", color: "#334155" }}>{edu.school}</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {data.skills.filter(s => s).length > 0 && (
                                                <div style={{ marginBottom: "24px" }}>
                                                    <h2 style={{ fontSize: "14px", textTransform: "uppercase", fontWeight: "bold", borderLeft: "4px solid #10b981", paddingLeft: "10px", margin: "0 0 12px 0", color: "#0f172a" }}>Technical Skills</h2>
                                                    <p style={{ margin: "0", fontSize: "14px", color: "#334155", lineHeight: "1.8" }}>{data.skills.filter(s => s).join(" • ")}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>

                                <button onClick={downloadResume} disabled={isDownloading} className="mt-8 w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(16,185,129,0.2)] hover:shadow-[0_20px_60px_rgba(16,185,129,0.3)] transition-all disabled:opacity-70 group overflow-hidden relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                    {isDownloading ? <><Loader2 size={20} className="animate-spin" /> Saving & Exporting...</> : <><Download size={20} /> Download & Save</>}
                                </button>
                                <p className="mt-4 text-[10px] text-slate-500 font-medium text-center uppercase tracking-widest">Captured as High-Quality A4 Document</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
