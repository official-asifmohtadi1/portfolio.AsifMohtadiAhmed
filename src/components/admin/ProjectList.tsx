"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Edit,
    Trash2,
    Monitor,
    Loader2,
    Eye
} from "lucide-react";
import { deleteProject } from "@/app/actions/projects";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Project } from "@/lib/projects";

export default function ProjectList({ projects }: { projects: Project[] }) {
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const router = useRouter();

    const handleDelete = async (slug: string) => {
        if (!confirm("Delete this project from your portfolio?")) return;

        setIsDeleting(slug);
        const result = await deleteProject(slug);

        if (result.success) {
            router.refresh();
        } else {
            alert(result.error);
        }
        setIsDeleting(null);
    };

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
                <div key={project.slug} className="glass rounded-[2rem] border-slate-800 p-6 flex flex-col h-full group relative overflow-hidden">
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-emerald-500/10 backdrop-blur rounded-full text-[10px] font-black uppercase text-emerald-400 border border-emerald-500/20">
                        Live
                    </div>

                    <div className="relative h-44 rounded-2xl overflow-hidden mb-6 border border-slate-800 bg-slate-900 flex items-center justify-center">
                        {project.image ? (
                            <Image src={project.image} alt={project.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                            <Monitor size={48} className="text-slate-800" />
                        )}
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-sm">
                            <Link href={`/portfolio/${project.slug}`} target="_blank" className="p-3 rounded-xl bg-slate-800 text-white hover:bg-emerald-500 transition-colors">
                                <Eye size={20} />
                            </Link>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-400 transition-colors">{project.title}</h3>
                    <p className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-4">{project.category}</p>
                    <p className="text-slate-400 text-sm line-clamp-2 mb-8 flex-grow leading-relaxed">{project.description}</p>

                    <div className="flex items-center gap-2 pt-6 border-t border-slate-800/50 mt-auto">
                        <Link
                            href={`/admin/dashboard/projects/edit/${project.slug}`}
                            className="flex-grow py-3 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold text-slate-400 hover:text-sky-400 hover:border-sky-500/30 transition-all flex items-center justify-center gap-2"
                        >
                            <Edit size={14} /> Edit
                        </Link>
                        <button
                            onClick={() => handleDelete(project.slug)}
                            disabled={isDeleting === project.slug}
                            className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all disabled:opacity-50"
                        >
                            {isDeleting === project.slug ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}
