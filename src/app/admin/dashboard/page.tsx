"use client";

import Link from "next/link";
import {
    Briefcase,
    PenTool,
    MessageSquare,
    TrendingUp,
    ArrowUpRight,
    Users,
    BarChart3,
    Calendar,
    ExternalLink
} from "lucide-react";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function AdminDashboardPage() {
    const { data: session } = useSession();
    const [realStats, setRealStats] = useState({
        projects: "0",
        blogs: "0",
        inquiries: "0",
        users: "0"
    });

    useEffect(() => {
        fetch("/api/admin/stats")
            .then(res => res.json())
            .then(data => {
                setRealStats({
                    projects: data.projects.toString(),
                    blogs: data.blogs.toString(),
                    inquiries: data.inquiries.toString(),
                    users: data.users.toString()
                });
            })
            .catch(console.error);
    }, []);

    const stats = [
        { title: "Total Projects", value: realStats.projects, icon: <Briefcase size={22} />, color: "emerald", trend: "+2 this month" },
        { title: "Blog Posts", value: realStats.blogs, icon: <PenTool size={22} />, color: "sky", trend: "+4 this month" },
        { title: "Client Inquiries", value: realStats.inquiries, icon: <MessageSquare size={22} />, color: "indigo", trend: "+12 this week" },
        { title: "Total Users", value: realStats.users, icon: <Users size={22} />, color: "violet", trend: "Growth" },
    ];

    return (
        <div className="space-y-6 lg:space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 lg:mb-8">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold font-heading mb-2">Welcome Back, {session?.user?.name || "Asif"}!</h1>
                    <p className="text-slate-400 text-sm lg:text-base">Here&apos;s a summary of your portal activity.</p>
                </div>
                <div className="px-5 py-3 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-sm font-bold text-slate-300 self-start">
                    <Calendar size={18} className="text-emerald-400" />
                    <span suppressHydrationWarning>
                        {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
                {stats.map((stat) => (
                    <div key={stat.title} className="glass p-6 lg:p-8 rounded-[1.5rem] lg:rounded-[2rem] border-slate-800 hover:border-emerald-500/30 transition-all group">
                        <div className="flex items-center justify-between mb-4 lg:mb-6">
                            <div className={`p-3 lg:p-4 rounded-xl lg:rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-400 group-hover:scale-110 transition-transform`}>
                                {stat.icon}
                            </div>
                            <div className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 flex items-center gap-1">
                                <TrendingUp size={12} /> {stat.trend}
                            </div>
                        </div>
                        <h3 className="text-2xl lg:text-3xl font-bold mb-1">{stat.value}</h3>
                        <p className="text-slate-500 text-xs lg:text-sm font-medium">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Main Content Layout */}
            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Recent Inquiries List */}
                <div className="lg:col-span-2 glass rounded-[1.5rem] lg:rounded-[2.5rem] border-slate-800 p-6 lg:p-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 lg:mb-10">
                        <h3 className="text-xl lg:text-2xl font-bold font-heading">Recent Inquiries</h3>
                        <button className="text-sm font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-500/10 transition-colors self-start">
                            View All <ExternalLink size={14} />
                        </button>
                    </div>

                    <div className="space-y-4 lg:space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 lg:p-6 rounded-2xl lg:rounded-3xl bg-slate-900/50 border border-slate-800/30 hover:bg-slate-800/50 transition-colors group">
                                <div className="flex items-center gap-4 lg:gap-5">
                                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-gradient-to-br from-indigo-500/20 to-sky-500/20 flex items-center justify-center font-bold text-lg lg:text-xl text-white flex-shrink-0">
                                        {["JD", "SA", "TK"][i - 1]}
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-base lg:text-lg mb-0.5 truncate">Project Inquiry - Site Build</h4>
                                        <p className="text-slate-500 text-xs lg:text-sm">by {["John Doe", "Sarah Ahmed", "Tom K."][i - 1]} • 2h ago</p>
                                    </div>
                                </div>
                                <div className="px-4 py-2 rounded-xl bg-slate-900 text-slate-400 text-xs font-bold border border-slate-800 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-all cursor-pointer text-center sm:text-left self-start sm:self-center">
                                    View Message
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Action Center */}
                <div className="glass rounded-[1.5rem] lg:rounded-[2.5rem] border-slate-800 p-6 lg:p-10 flex flex-col gap-8">
                    <div>
                        <h3 className="text-xl lg:text-2xl font-bold font-heading mb-6 lg:mb-8">Action Center</h3>
                        <div className="space-y-4">
                            <Link href="/admin/dashboard/projects/new" className="w-full flex items-center justify-between p-4 lg:p-5 rounded-xl lg:rounded-2xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20">
                                <span className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base">
                                    <Briefcase size={20} /> New Project
                                </span>
                                <ArrowUpRight size={18} />
                            </Link>
                            <Link href="/admin/dashboard/blog/new" className="w-full flex items-center justify-between p-4 lg:p-5 rounded-xl lg:rounded-2xl bg-sky-500 text-slate-950 font-bold hover:bg-sky-400 transition-all shadow-lg shadow-sky-500/20">
                                <span className="flex items-center gap-3 lg:gap-4 text-sm lg:text-base">
                                    <PenTool size={20} /> Create Blog Post
                                </span>
                                <ArrowUpRight size={18} />
                            </Link>
                        </div>
                    </div>

                    <div className="p-6 lg:p-8 rounded-2xl lg:rounded-3xl bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 shadow-inner mt-auto">
                        <h4 className="font-bold mb-3 flex items-center gap-2 text-sm lg:text-base">
                            <BarChart3 size={18} className="text-emerald-400" />
                            SEO Performance
                        </h4>
                        <p className="text-xs lg:text-sm text-slate-500 leading-relaxed mb-6">Your recent &quot;Next.js&quot; article has 240% more reach than previous posts.</p>
                        <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                            <div className="w-[85%] h-full bg-emerald-500 animate-[pulse_2s_infinite]" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
