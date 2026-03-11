"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createBlogPost } from "@/app/actions/blog";
import { uploadImage } from "@/app/actions/upload";
import {
    Plus,
    Tag,
    Image as ImageIcon,
    Clock,
    Calendar,
    Save,
    ChevronLeft,
    Loader2,
    FileEdit,
    AlignLeft,
    Pen,
    Upload,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";

export default function NewBlogPostPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
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
        // Explicitly set the imageUrl if it was uploaded
        if (imageUrl) {
            formData.set("image", imageUrl);
        }

        const result = await createBlogPost(formData);

        if (result.success) {
            router.push("/blog");
        } else {
            setError(result.error || "Something went wrong.");
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto py-10 px-6">
            <Link href="/admin/dashboard" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-10 font-bold">
                <ChevronLeft size={20} /> Back to Dashboard
            </Link>

            <div className="mb-12">
                <h1 className="text-4xl font-bold font-heading mb-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-400">
                        <Plus size={28} />
                    </div>
                    Create New <span className="text-gradient">Blog Post</span>
                </h1>
                <p className="text-slate-400 text-lg">Draft your next insight and publish it to your portfolio instantly.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10 glass p-10 md:p-14 rounded-[3.5rem] border-slate-800 shadow-2xl relative overflow-hidden group">
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Post Title */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="title">
                            <FileEdit size={16} className="text-emerald-400" /> Title
                        </label>
                        <input
                            id="title"
                            name="title"
                            type="text"
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none text-xl font-bold text-white"
                            placeholder="e.g., The Future of React 19"
                        />
                    </div>

                    {/* Excerpt */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="excerpt">
                            <AlignLeft size={16} className="text-emerald-400" /> Excerpt
                        </label>
                        <textarea
                            id="excerpt"
                            name="excerpt"
                            rows={3}
                            required
                            className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none resize-none text-slate-300"
                            placeholder="A brief summary for the preview card..."
                        />
                    </div>

                    {/* Metadata Grid */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3" htmlFor="slug">
                                URL Slug (Optional)
                            </label>
                            <input
                                id="slug"
                                name="slug"
                                className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none text-white"
                                placeholder="react-19-guide"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="category">
                                <Tag size={16} className="text-emerald-400" /> Category
                            </label>
                            <select
                                id="category"
                                name="category"
                                className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none appearance-none text-white cursor-pointer"
                            >
                                <option value="React" className="bg-slate-900">React</option>
                                <option value="WordPress" className="bg-slate-900">WordPress</option>
                                <option value="Content" className="bg-slate-900">Content Strategy</option>
                                <option value="UI/UX" className="bg-slate-900">UI/UX Design</option>
                            </select>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center justify-between" htmlFor="image">
                                <span className="flex items-center gap-2"><ImageIcon size={16} className="text-emerald-400" /> Header Image</span>
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current?.click()}
                                    className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 flex items-center gap-1 hover:text-white transition-colors"
                                >
                                    <Upload size={12} /> Upload File
                                </button>
                            </label>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleImageUpload}
                                className="hidden"
                                accept="image/*"
                            />
                            <div className="relative">
                                <input
                                    id="image"
                                    name="image"
                                    value={imageUrl}
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none text-white pr-12"
                                    placeholder="https://images.unsplash... or upload above"
                                />
                                {isUploading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 animate-spin text-emerald-500" size={20} />}
                                {!isUploading && imageUrl && <CheckCircle2 className="absolute right-4 top-1/2 -translate-y-1/2 text-emerald-500" size={20} />}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="date">
                                    <Calendar size={16} className="text-emerald-400" /> Date
                                </label>
                                <input
                                    id="date"
                                    name="date"
                                    type="date"
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none text-sm text-white"
                                    defaultValue={new Date().toISOString().split('T')[0]}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center gap-2" htmlFor="readTime">
                                    <Clock size={16} className="text-emerald-400" /> Read
                                </label>
                                <input
                                    id="readTime"
                                    name="readTime"
                                    className="w-full px-6 py-4 rounded-2xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all outline-none text-sm text-white"
                                    placeholder="5 min read"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Markdown Content Area */}
                    <div className="md:col-span-2">
                        <label className="block text-sm font-bold text-slate-300 mb-3 flex items-center justify-between" htmlFor="content">
                            <span className="flex items-center gap-2"><Pen size={16} className="text-emerald-400" /> Markdown Content</span>
                            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500">Supports Github Flavored Markdown</span>
                        </label>
                        <textarea
                            id="content"
                            name="content"
                            rows={15}
                            required
                            className="w-full px-8 py-8 rounded-[2rem] bg-slate-950 border border-slate-800 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/5 transition-all outline-none font-mono text-emerald-100 placeholder-slate-700 leading-relaxed"
                            placeholder="# Your Content Here... \n\nStarting your post..."
                        />
                    </div>
                </div>

                {error && (
                    <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                        {error}
                    </div>
                )}

                <div className="pt-8 border-t border-slate-800/50">
                    <button
                        type="submit"
                        disabled={isLoading || isUploading}
                        className="px-12 py-5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all shadow-[0_0_40px_rgba(16,185,129,0.3)] hover:shadow-[0_0_50px_rgba(16,185,129,0.5)] flex items-center gap-4 disabled:opacity-70 group"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={24} /> : (
                            <>
                                Save Post & Publish <Save size={24} className="group-hover:rotate-12 transition-transform" />
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
}
