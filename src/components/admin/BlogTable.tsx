"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Eye,
    Edit,
    Trash2,
    Calendar,
    Tag,
    Clock,
    Loader2
} from "lucide-react";
import { deleteBlogPost } from "@/app/actions/blog";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";

export default function BlogTable({ posts }: { posts: BlogPost[] }) {
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async (slug: string) => {
        if (!confirm("Are you sure you want to delete this post?")) return;

        setIsDeleting(slug);
        const result = await deleteBlogPost(slug);

        if (result.success) {
            router.refresh();
        } else {
            alert(result.error);
        }
        setIsDeleting(null);
    };

    return (
        <div className="glass rounded-[2rem] border-slate-800 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-slate-900/50 border-b border-slate-800">
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Article</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Category</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Date Published</th>
                            <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/50">
                        {posts.map((post) => (
                            <tr key={post.slug} className="hover:bg-slate-800/20 transition-colors group">
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="relative w-16 h-12 rounded-lg overflow-hidden border border-slate-800 flex-shrink-0">
                                            <Image src={post.image} alt={post.title} fill sizes="64px" className="object-cover" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-slate-200 group-hover:text-emerald-400 transition-colors">{post.title}</h4>
                                            <div className="flex items-center gap-3 text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-bold">
                                                <span className="flex items-center gap-1"><Clock size={10} /> {post.readTime}</span>
                                                <span>•</span>
                                                <span>{post.slug}</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] font-bold text-emerald-400 flex items-center gap-1 w-fit">
                                        <Tag size={10} /> {post.category}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-sm text-slate-400 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} className="text-slate-600" />
                                        {post.date}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex items-center justify-end gap-2">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            target="_blank"
                                            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                                            title="View Live"
                                        >
                                            <Eye size={18} />
                                        </Link>
                                        <Link
                                            href={`/admin/dashboard/blog/edit/${post.slug}`}
                                            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all"
                                            title="Edit Post"
                                        >
                                            <Edit size={18} />
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(post.slug)}
                                            disabled={isDeleting === post.slug}
                                            className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all disabled:opacity-50"
                                            title="Delete Post"
                                        >
                                            {isDeleting === post.slug ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
