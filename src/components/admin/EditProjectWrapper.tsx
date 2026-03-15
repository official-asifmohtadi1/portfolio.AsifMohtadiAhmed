"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { updateProject } from "@/app/actions/projects";
import { uploadImage } from "@/app/actions/upload";
import {
    Save,
    ChevronLeft,
    Loader2,
    FileEdit,
    AlignLeft,
    Pen,
    Upload,
    CheckCircle2,
    Tag,
    ImageIcon,
    Github,
    MonitorPlay,
    Lightbulb,
    CheckCircle,
    Cpu
} from "lucide-react";
import Link from "next/link";
import { Project } from "@/lib/projects";

export default function EditProjectWrapper({ project }: { project: Project }) {
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState(project.image || "");
    const router = useRouter();
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", file);

        const result = await uploadImage(formData);
        if (result.success && result.url) {
            setImageUrl(result.url);
        } else {
            setError(result.error || "Image upload failed");
        }
        setIsUploading(false);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const formData = new FormData(e.currentTarget);
        if (imageUrl) {
            formData.set("image", imageUrl);
        }

        const result = await updateProject(project.slug, formData);

        if (result.success) {
            router.push("/admin/dashboard/projects");
            router.refresh();
        } else {
            setError(result.error || "Something went wrong.");
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-5xl mx-auto py-10 px-6">
            <Link href="/admin/dashboard/projects" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-10 font-bold">
                <ChevronLeft size={20} /> Back to Projects
            </Link>

            <div className="mb-12">
                <h1 className="text-4xl font-bold font-heading mb-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 flex items-center justify-center text-sky-400">
                        <FileEdit size={28} />
                    </div>
                    Edit <span className="text-gradient">Portfolio Project</span>
                </h1>
                <p className="text-slate-400 text-lg">Update your project details and case studies.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10 glass p-10 md:p-14 rounded-[3.5rem] border-slate-800 shadow-2xl relative overflow-hidden group">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Project Title */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="title">
                            <FileEdit size={16} className="text-emerald-400" /> Project Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            defaultValue={project.title}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none text-xl font-bold text-white"
                        />
                    </div>

                    {/* Short Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="description">
                            <AlignLeft size={16} className="text-emerald-400" /> Short Excerpt
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            rows={2}
                            required
                            defaultValue={project.description}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none resize-none text-slate-300"
                        />
                    </div>

                    {/* Long Description */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="longDescription">
                            Full Narrative
                        </label>
                        <textarea
                            id="longDescription"
                            name="longDescription"
                            rows={4}
                            required
                            defaultValue={project.longDescription}
                            className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none resize-none text-slate-300"
                        />
                    </div>

                    {/* Metadata Grid */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3" htmlFor="slug">
                                Project Slug
                            </label>
                            <input
                                id="slug"
                                name="slug"
                                defaultValue={project.slug}
                                className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none text-white font-mono text-sm"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="category">
                                <Tag size={16} className="text-emerald-400" /> Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                defaultValue={project.category}
                                className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none appearance-none text-white cursor-pointer"
                            >
                                <option value="React" className="bg-slate-900">React JS</option>
                                <option value="WordPress" className="bg-slate-900">WordPress</option>
                                <option value="FullStack" className="bg-slate-900">Full Stack</option>
                                <option value="Other" className="bg-slate-900">Other</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="tech">
                                <Cpu size={16} className="text-emerald-400" /> Tech Stack (comma separated)
                            </label>
                            <input
                                id="tech"
                                name="tech"
                                defaultValue={project.tech?.join(', ')}
                                className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none text-white"
                            />
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* Main Image */}
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center justify-between" htmlFor="image">
                                <span className="flex items-center gap-2"><ImageIcon size={16} className="text-emerald-400" /> Featured Image URL</span>
                                <button type="button" onClick={() => fileInputRef.current?.click()} className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 flex items-center gap-1 hover:text-white transition-colors">
                                    <Upload size={12} /> Replace
                                </button>
                            </label>
                            <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                            <div className="relative">
                                <input
                                    id="image"
                                    name="image"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none text-white pr-12"
                                />
                                {isUploading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-emerald-500" size={20} />}
                                {!isUploading && imageUrl && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="github">
                                    <Github size={16} className="text-emerald-400" /> GitHub Repo
                                </label>
                                <input id="github" name="github" defaultValue={project.github} className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none text-sm text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="live">
                                    <MonitorPlay size={16} className="text-emerald-400" /> Live Demo
                                </label>
                                <input id="live" name="live" defaultValue={project.live} className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none text-sm text-white" />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3" htmlFor="images">
                                Gallery Images (URLs, comma separated)
                            </label>
                            <input id="images" name="images" defaultValue={project.images?.join(', ')} className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none text-white text-sm" />
                        </div>
                    </div>

                    {/* Problem & Solution */}
                    <div className="md:col-span-2 grid md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="problem">
                                <Lightbulb size={16} className="text-red-400" /> The Challenge
                            </label>
                            <textarea id="problem" name="problem" rows={4} defaultValue={project.problem} className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-red-500 transition-all outline-none text-sm text-slate-300" />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="solution">
                                <CheckCircle size={16} className="text-emerald-400" /> The Solution
                            </label>
                            <textarea id="solution" name="solution" rows={4} defaultValue={project.solution} className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none text-sm text-slate-300" />
                        </div>
                    </div>

                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="content">
                            <Pen size={16} className="text-emerald-400" /> Additional Notes (Markdown)
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            rows={6}
                            defaultValue={project.content}
                            className="w-full px-8 py-6 rounded-[2rem] bg-slate-950 border border-slate-800 focus:border-emerald-500 outline-none font-mono text-sm text-emerald-100"
                        />
                    </div>
                </div>

                {error && <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">{error}</div>}

                <div className="pt-8 border-t border-slate-800/50">
                    <button
                        type="submit"
                        disabled={isLoading || isUploading}
                        className="px-12 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] flex items-center gap-4 disabled:opacity-70"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={24} /> : (
                            <>Update Project <Save size={24} /></>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
