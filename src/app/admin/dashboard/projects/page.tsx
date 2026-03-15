import { getProjectsData } from "@/lib/projects";
import Link from "next/link";
import { Plus } from "lucide-react";
import ProjectList from "@/components/admin/ProjectList";

export default async function AdminProjectsPage() {
    const projects = getProjectsData();

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold font-heading mb-2">Projects</h1>
                    <p className="text-slate-400">Manage your development showcase and case studies.</p>
                </div>
                <Link
                    href="/admin/dashboard/projects/new"
                    className="px-6 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold flex items-center gap-2 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10 self-start"
                >
                    <Plus size={20} /> Add New Project
                </Link>
            </div>

            <ProjectList projects={projects} />

            {projects.length === 0 && (
                <div className="py-20 text-center glass rounded-[3rem] border-dashed border-slate-800">
                    <p className="text-slate-500 font-medium">No projects found. Start by adding your first one!</p>
                </div>
            )}
        </div>
    );
}
