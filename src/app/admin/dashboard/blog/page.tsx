import { getSortedPostsData } from "@/lib/blog";
import Link from "next/link";
import {
    Plus,
    Search,
    Filter
} from "lucide-react";
import BlogTable from "@/components/admin/BlogTable";

export default async function AdminBlogListPage() {
    const posts = await getSortedPostsData();

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold font-heading mb-2">Blog Posts</h1>
                    <p className="text-slate-400">Manage your articles, tutorials, and insights.</p>
                </div>
                <Link
                    href="/admin/dashboard/blog/new"
                    className="px-6 py-3 rounded-2xl bg-emerald-500 text-slate-950 font-bold flex items-center gap-2 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/10 self-start"
                >
                    <Plus size={20} /> Create New Post
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="glass p-4 rounded-2xl border-slate-800 flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-grow w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                        type="text"
                        placeholder="Search articles by title..."
                        className="w-full bg-slate-900/50 border border-slate-800 rounded-xl pl-12 pr-4 py-2.5 text-sm focus:border-emerald-500 outline-none transition-all"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex-grow md:flex-initial flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm font-bold text-slate-300 hover:text-white transition-colors">
                        <Filter size={18} /> Filter
                    </button>
                    <div className="h-10 w-px bg-slate-800 hidden md:block" />
                    <p className="text-sm text-slate-500 whitespace-nowrap">Showing {posts.length} posts</p>
                </div>
            </div>

            {/* Posts Table Component */}
            <BlogTable posts={posts} />
        </div>
    );
}
