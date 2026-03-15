"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
    Download,
    Plus,
    Trash2,
    User,
    Briefcase,
    GraduationCap,
    Sparkles,
    Layout,
    Trophy,
    Github,
    Globe,
    Mail,
    Phone,
    MapPin,
    Loader2,
    FileText,
    Camera,
    ImagePlus,
    X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ResumeBuilder() {
    const [activeTab, setActiveTab] = useState("personal");
    const [isMounted, setIsMounted] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);
    const [photo, setPhoto] = useState<string>("");
    const previewRef = useRef<HTMLDivElement>(null);
    const photoInputRef = useRef<HTMLInputElement>(null);

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            if (ev.target?.result) setPhoto(ev.target.result as string);
        };
        reader.readAsDataURL(file);
    };

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    const [data, setData] = useState({
        personal: {
            fullName: "Asif Mohtadi Ahmed",
            title: "Head of IT Dept.",
            email: "asifmohtadi1@gmail.com",
            phone: "+8801687186854",
            location: "Dhaka, Bangladesh",
            summary: "Dynamic IT Leader with 8+ years of experience in architecting scalable React systems and leading high-performance engineering teams.",
            github: "https://github.com",
            website: "https://asifmohtadi.me"
        },
        experience: [
            {
                id: "1",
                company: "Softs Studio",
                role: "Head of IT Dept.",
                period: "2022 - Present",
                desc: "Leading architectural decisions and cross-functional engineering teams to deliver premium SaaS solutions."
            }
        ],
        education: [
            {
                id: "1",
                school: "Leading University",
                degree: "B.Sc. in Computer Science",
                year: "2018"
            }
        ],
        skills: ["React", "Next.js", "TypeScript", "Node.js", "WordPress", "System Design"]
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

    const downloadResume = () => {
        if (!previewRef.current) return;
        setIsDownloading(true);

        const resumeHTML = previewRef.current.innerHTML;
        const printWindow = window.open("", "_blank");
        if (!printWindow) {
            alert("Please allow popups to download the resume as PDF.");
            setIsDownloading(false);
            return;
        }

        printWindow.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>${data.personal.fullName || 'Resume'} - Resume</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Georgia&display=swap');
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: Georgia, 'Times New Roman', serif;
      color: #1e293b;
      background: white;
      padding: 40px;
      max-width: 860px;
      margin: 0 auto;
      font-size: 14px;
      line-height: 1.6;
    }
    @page {
      size: A4;
      margin: 0.6in;
    }
    @media print {
      body { padding: 0; }
      button { display: none !important; }
    }
  </style>
</head>
<body>${resumeHTML}</body>
</html>`);

        printWindow.document.close();
        printWindow.focus();

        // Give fonts & styles time to load, then print
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
            setIsDownloading(false);
        }, 800);
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col pt-24">
            <Navbar />

            <main className="container mx-auto px-6 py-12 flex-grow">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
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
                            Craft a high-impact, ATS-optimized technical resume in minutes. Designed specifically for IT professionals.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Editor Side */}
                        <div className="glass p-8 md:p-10 rounded-[2.5rem] border-slate-800 shadow-2xl">
                            <div className="flex gap-4 mb-10 overflow-x-auto pb-2 scrollbar-hide">
                                {[
                                    { id: "personal", label: "Personal", icon: User },
                                    { id: "experience", label: "Experience", icon: Briefcase },
                                    { id: "skills", label: "Skills", icon: Trophy },
                                    { id: "education", label: "Education", icon: GraduationCap },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm transition-all whitespace-nowrap ${activeTab === tab.id
                                            ? "bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20"
                                            : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                                            }`}
                                    >
                                        <tab.icon size={16} />
                                        {tab.label}
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
                                            {/* Photo Upload */}
                                            <div className="space-y-2 md:col-span-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Profile Photo</label>
                                                <div className="flex items-center gap-6">
                                                    {/* Preview circle */}
                                                    <div
                                                        onClick={() => photoInputRef.current?.click()}
                                                        className="relative w-24 h-24 rounded-full border-2 border-dashed border-slate-700 hover:border-emerald-500 bg-slate-900/50 flex items-center justify-center cursor-pointer transition-all group flex-shrink-0 overflow-hidden"
                                                    >
                                                        {photo ? (
                                                            <>
                                                                {/* eslint-disable-next-line @next/next/no-img-element */}
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
                                                    <div className="flex-1">
                                                        <p className="text-sm text-slate-400 mb-3">Upload a professional headshot. It will appear in the top-right of your resume.</p>
                                                        <div className="flex gap-3">
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
                                                                    <X size={14} /> Remove
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <input
                                                        ref={photoInputRef}
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={handlePhotoUpload}
                                                        className="hidden"
                                                    />
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                                                <input
                                                    name="fullName"
                                                    value={data.personal.fullName}
                                                    onChange={handlePersonalChange}
                                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Job Title</label>
                                                <input
                                                    name="title"
                                                    value={data.personal.title}
                                                    onChange={handlePersonalChange}
                                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                                                <input
                                                    name="email"
                                                    value={data.personal.email}
                                                    onChange={handlePersonalChange}
                                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Phone Number</label>
                                                <input
                                                    name="phone"
                                                    value={data.personal.phone}
                                                    onChange={handlePersonalChange}
                                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">GitHub URL</label>
                                                <input
                                                    name="github"
                                                    value={data.personal.github}
                                                    onChange={handlePersonalChange}
                                                    placeholder="https://github.com/yourusername"
                                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Website URL</label>
                                                <input
                                                    name="website"
                                                    value={data.personal.website}
                                                    onChange={handlePersonalChange}
                                                    placeholder="https://asifmohtadi.me"
                                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Professional Summary</label>
                                            <textarea
                                                name="summary"
                                                rows={4}
                                                value={data.personal.summary}
                                                onChange={handlePersonalChange}
                                                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all resize-none"
                                            />
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
                                            <div key={exp.id} className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 relative group/exp">
                                                <button
                                                    onClick={() => removeExperience(exp.id)}
                                                    className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover/exp:opacity-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Company</label>
                                                        <input
                                                            placeholder="e.g. Google"
                                                            value={exp.company}
                                                            onChange={(e) => handleExperienceChange(exp.id, "company", e.target.value)}
                                                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:border-emerald-500 outline-none"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Role</label>
                                                        <input
                                                            placeholder="e.g. Senior Developer"
                                                            value={exp.role}
                                                            onChange={(e) => handleExperienceChange(exp.id, "role", e.target.value)}
                                                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:border-emerald-500 outline-none"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1 mb-4">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Period</label>
                                                    <input
                                                        placeholder="e.g. 2020 - Jan 2023"
                                                        value={exp.period}
                                                        onChange={(e) => handleExperienceChange(exp.id, "period", e.target.value)}
                                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:border-emerald-500 outline-none"
                                                    />
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Description</label>
                                                    <textarea
                                                        placeholder="Describe your key responsibilities and impact..."
                                                        rows={3}
                                                        value={exp.desc}
                                                        onChange={(e) => handleExperienceChange(exp.id, "desc", e.target.value)}
                                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:border-emerald-500 outline-none resize-none font-sans"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            onClick={addExperience}
                                            className="w-full py-4 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all flex items-center justify-center gap-2 font-bold"
                                        >
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
                                            <textarea
                                                rows={4}
                                                value={data.skills.join(", ")}
                                                onChange={(e) => {
                                                    const skills = e.target.value.split(",").map(s => s.trim());
                                                    setData(prev => ({ ...prev, skills }));
                                                }}
                                                className="w-full bg-slate-900/50 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all resize-none"
                                                placeholder="React, Next.js, Node.js..."
                                            />
                                        </div>
                                        <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
                                            <p className="text-xs text-emerald-400 font-medium leading-relaxed">
                                                <Sparkles size={14} className="inline mr-2" />
                                                Tip: Group your skills by category (e.g., Frontend, Backend, Tools) for better ATS optimization.
                                            </p>
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
                                            <div key={edu.id} className="p-6 rounded-2xl bg-slate-900/30 border border-slate-800 relative group/edu">
                                                <button
                                                    onClick={() => {
                                                        setData(prev => ({
                                                            ...prev,
                                                            education: prev.education.filter(e => e.id !== edu.id)
                                                        }));
                                                    }}
                                                    className="absolute top-4 right-4 text-slate-600 hover:text-red-400 transition-colors opacity-0 group-hover/edu:opacity-100"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <div className="grid md:grid-cols-2 gap-4 mb-4">
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">School / University</label>
                                                        <input
                                                            placeholder="e.g. Harvard University"
                                                            value={edu.school}
                                                            onChange={(e) => {
                                                                setData(prev => ({
                                                                    ...prev,
                                                                    education: prev.education.map(ed => ed.id === edu.id ? { ...ed, school: e.target.value } : ed)
                                                                }));
                                                            }}
                                                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:border-emerald-500 outline-none"
                                                        />
                                                    </div>
                                                    <div className="space-y-1">
                                                        <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Degree</label>
                                                        <input
                                                            placeholder="e.g. B.Sc in CS"
                                                            value={edu.degree}
                                                            onChange={(e) => {
                                                                setData(prev => ({
                                                                    ...prev,
                                                                    education: prev.education.map(ed => ed.id === edu.id ? { ...ed, degree: e.target.value } : ed)
                                                                }));
                                                            }}
                                                            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:border-emerald-500 outline-none"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-1">
                                                    <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Year</label>
                                                    <input
                                                        placeholder="e.g. 2022"
                                                        value={edu.year}
                                                        onChange={(e) => {
                                                            setData(prev => ({
                                                                ...prev,
                                                                education: prev.education.map(ed => ed.id === edu.id ? { ...ed, year: e.target.value } : ed)
                                                            }));
                                                        }}
                                                        className="w-full bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:border-emerald-500 outline-none"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                        <button
                                            onClick={() => {
                                                setData(prev => ({
                                                    ...prev,
                                                    education: [...prev.education, { id: Date.now().toString(), school: "", degree: "", year: "" }]
                                                }));
                                            }}
                                            className="w-full py-4 border-2 border-dashed border-slate-800 rounded-2xl text-slate-500 hover:text-emerald-400 hover:border-emerald-500/30 transition-all flex items-center justify-center gap-2 font-bold"
                                        >
                                            <Plus size={18} /> Add Education
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Preview Side */}
                        <div className="relative sticky top-24">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-emerald-500/10 to-sky-500/10 rounded-[3rem] blur-3xl opacity-50" />

                            {/* ATS Badge */}
                            <div className="relative flex items-center justify-between mb-3 px-1">
                                <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse inline-block" />
                                    ATS-Optimized Layout
                                </span>
                                <span className="text-[10px] text-slate-500 font-medium">Single-column · No icons · Parser-safe</span>
                            </div>

                            <div ref={previewRef} id="resume-preview"
                                className="relative bg-white text-slate-900 rounded-sm shadow-2xl overflow-hidden"
                                style={{ fontFamily: "Arial, Helvetica, sans-serif", fontSize: "13px", lineHeight: "1.55", color: "#1a202c" }}
                            >
                                {/* Top accent bar */}
                                <div style={{ height: "6px", background: "linear-gradient(90deg, #10b981, #0ea5e9)" }} />

                                <div style={{ padding: "36px 44px 44px" }}>

                                    {/* ── HEADER ─────────────────────────────── */}
                                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "24px", marginBottom: "12px" }}>
                                        <div style={{ flex: 1 }}>
                                            <h1 style={{ fontSize: "28px", fontWeight: "800", letterSpacing: "-0.5px", color: "#0f172a", margin: "0 0 4px 0", textTransform: "uppercase" }}>
                                                {data.personal.fullName || "YOUR NAME"}
                                            </h1>
                                            <p style={{ fontSize: "13px", fontWeight: "700", color: "#059669", margin: "0 0 10px 0", textTransform: "uppercase", letterSpacing: "1px" }}>
                                                {data.personal.title || "Job Title"}
                                            </p>
                                        </div>
                                        {photo && (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img src={photo} alt={data.personal.fullName || "Profile"}
                                                style={{ width: "88px", height: "88px", borderRadius: "50%", objectFit: "cover", objectPosition: "top", border: "2px solid #e2e8f0", flexShrink: 0 }}
                                            />
                                        )}
                                    </div>

                                    {/* Contact info — plain text, ATS-parseable */}
                                    <div style={{ fontSize: "11px", color: "#475569", marginBottom: "20px", paddingBottom: "16px", borderBottom: "2px solid #0f172a", display: "flex", flexWrap: "wrap", gap: "6px 0", lineHeight: 1.8 }}>
                                        {[
                                            data.personal.email && `Email: ${data.personal.email}`,
                                            data.personal.phone && `Phone: ${data.personal.phone}`,
                                            data.personal.location && `Location: ${data.personal.location}`,
                                            data.personal.website && `Website: ${data.personal.website.replace(/^https?:\/\//, "")}`,
                                            data.personal.github && `GitHub: ${data.personal.github.replace(/^https?:\/\//, "")}`,
                                        ].filter(Boolean).map((item, i, arr) => (
                                            <span key={i} style={{ marginRight: i < arr.length - 1 ? "0" : "0" }}>
                                                {item}{i < arr.length - 1 && <span style={{ color: "#94a3b8", margin: "0 10px" }}>|</span>}
                                            </span>
                                        ))}
                                    </div>

                                    {/* ── PROFESSIONAL SUMMARY ──────────────── */}
                                    {data.personal.summary && (
                                        <div style={{ marginBottom: "20px" }}>
                                            <h2 style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "2px", color: "#0f172a", margin: "0 0 6px 0", paddingLeft: "10px", borderLeft: "4px solid #10b981" }}>
                                                Professional Summary
                                            </h2>
                                            <p style={{ fontSize: "12px", color: "#334155", lineHeight: "1.7", margin: 0 }}>
                                                {data.personal.summary}
                                            </p>
                                        </div>
                                    )}

                                    {/* ── WORK EXPERIENCE ───────────────────── */}
                                    {data.experience.length > 0 && (
                                        <div style={{ marginBottom: "20px" }}>
                                            <h2 style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "2px", color: "#0f172a", margin: "0 0 10px 0", paddingLeft: "10px", borderLeft: "4px solid #10b981" }}>
                                                Work Experience
                                            </h2>
                                            {data.experience.map((exp, idx) => (
                                                <div key={exp.id} style={{ marginBottom: idx < data.experience.length - 1 ? "14px" : 0 }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                        <span style={{ fontWeight: "700", fontSize: "13px", color: "#0f172a" }}>{exp.role || "Role Title"}</span>
                                                        <span style={{ fontSize: "11px", color: "#64748b", fontWeight: "600", flexShrink: 0, marginLeft: "12px" }}>{exp.period || "20XX – Present"}</span>
                                                    </div>
                                                    <p style={{ margin: "1px 0 5px", fontSize: "12px", color: "#059669", fontWeight: "700" }}>{exp.company || "Company Name"}</p>
                                                    {exp.desc && (
                                                        <ul style={{ margin: "0", paddingLeft: "16px", listStyleType: "disc" }}>
                                                            {exp.desc.split("\n").filter(Boolean).map((line, i) => (
                                                                <li key={i} style={{ fontSize: "12px", color: "#334155", lineHeight: "1.65", marginBottom: "2px" }}>{line}</li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* ── EDUCATION ─────────────────────────── */}
                                    {data.education.length > 0 && (
                                        <div style={{ marginBottom: "20px" }}>
                                            <h2 style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "2px", color: "#0f172a", margin: "0 0 10px 0", paddingLeft: "10px", borderLeft: "4px solid #10b981" }}>
                                                Education
                                            </h2>
                                            {data.education.map((edu, idx) => (
                                                <div key={edu.id} style={{ marginBottom: idx < data.education.length - 1 ? "10px" : 0 }}>
                                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                                                        <span style={{ fontWeight: "700", fontSize: "13px", color: "#0f172a" }}>{edu.degree || "Degree"}</span>
                                                        <span style={{ fontSize: "11px", color: "#64748b", fontWeight: "600", flexShrink: 0, marginLeft: "12px" }}>{edu.year}</span>
                                                    </div>
                                                    <p style={{ margin: "1px 0 0", fontSize: "12px", color: "#475569", fontWeight: "600" }}>{edu.school}</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}

                                    {/* ── SKILLS ────────────────────────────── */}
                                    {data.skills.filter(Boolean).length > 0 && (
                                        <div>
                                            <h2 style={{ fontSize: "11px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "2px", color: "#0f172a", margin: "0 0 8px 0", paddingLeft: "10px", borderLeft: "4px solid #10b981" }}>
                                                Technical Skills
                                            </h2>
                                            {/* Plain comma list — maximally ATS-friendly */}
                                            <p style={{ fontSize: "12px", color: "#334155", lineHeight: "1.7", margin: 0 }}>
                                                {data.skills.filter(Boolean).join(" · ")}
                                            </p>
                                        </div>
                                    )}

                                </div>

                                {/* Control Actions (hidden in print) */}
                                <div className="absolute top-4 right-4 flex gap-2 print:hidden">
                                    <button
                                        onClick={downloadResume}
                                        disabled={isDownloading}
                                        className="p-2.5 bg-emerald-500 text-slate-950 rounded-xl shadow-lg hover:scale-110 transition-transform flex items-center gap-1.5 font-bold text-[11px] disabled:opacity-70"
                                    >
                                        {isDownloading ? <Loader2 size={14} className="animate-spin" /> : <Download size={14} />}
                                        PDF
                                    </button>
                                    <button className="p-2.5 bg-slate-900 text-white rounded-xl shadow-lg hover:scale-110 transition-transform">
                                        <Layout size={16} />
                                    </button>
                                </div>
                            </div>


                            {/* Big Download Button below preview */}
                            <button
                                onClick={downloadResume}
                                disabled={isDownloading}
                                className="mt-6 w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-base flex items-center justify-center gap-3 shadow-xl shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all disabled:opacity-70 group"
                            >
                                {isDownloading ? (
                                    <><Loader2 size={20} className="animate-spin" /> Preparing PDF...</>
                                ) : (
                                    <><FileText size={20} className="group-hover:scale-110 transition-transform" /> Download as PDF</>
                                )}
                            </button>
                            <p className="text-center text-xs text-slate-500 mt-3">Opens print dialog → Save as PDF</p>
                        </div>
                    </div>
                </div>
            </main>


            <Footer />
        </div>
    );
}
