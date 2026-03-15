"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    LayoutDashboard,
    Briefcase,
    PenTool,
    MessageSquare,
    Settings,
    LogOut,
    Bell,
    Search,
    Menu,
    X,
    Users as UsersIcon,
    Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export default function AdminDashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: session } = useSession();
    const pathname = usePathname();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsMounted(true), 0);
        return () => clearTimeout(timer);
    }, []);

    // Close sidebar on navigation (mobile)
    useEffect(() => {
        if (isMounted && isSidebarOpen) {
            const timer = setTimeout(() => setIsSidebarOpen(false), 0);
            return () => clearTimeout(timer);
        }
    }, [pathname, isMounted, isSidebarOpen]);

    if (!isMounted) return <div className="min-h-screen bg-slate-950" />;

    const menuItems = [
        { name: "Overview", icon: <LayoutDashboard size={20} />, href: "/admin/dashboard" },
        { name: "Gallery", icon: <ImageIcon size={20} />, href: "/admin/dashboard/gallery" },
        { name: "Projects", icon: <Briefcase size={20} />, href: "/admin/dashboard/projects" },
        { name: "Blog Posts", icon: <PenTool size={20} />, href: "/admin/dashboard/blog" },
        { name: "Inquiries", icon: <MessageSquare size={20} />, href: "/admin/dashboard/inquiries" },
        { name: "Settings", icon: <Settings size={20} />, href: "/admin/dashboard/settings" },
    ];

    // Add Users management only for SUPERUSER
    if (session?.user?.role === "SUPERUSER") {
        menuItems.splice(5, 0, { name: "Users", icon: <UsersIcon size={20} />, href: "/admin/dashboard/users" });
    }


    return (
        <div className="flex min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
            {/* Mobile Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsSidebarOpen(false)}
                        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 w-72 bg-slate-900 border-r border-slate-800 flex flex-col z-50 transition-transform duration-300 lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="p-8 pb-12 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-sky-500 flex items-center justify-center text-white font-bold text-xl group-hover:scale-105 transition-transform shadow-lg shadow-emerald-500/10">
                            A
                        </div>
                        <span className="font-heading font-bold text-xl tracking-tight">Mohtadi&apos;s <span className="text-emerald-400">Admin</span></span>
                    </Link>
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="lg:hidden p-2 text-slate-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                <nav className="flex-grow px-6 space-y-2 overflow-y-auto">
                    {menuItems.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold transition-all ${pathname === item.href
                                ? "bg-emerald-500 text-slate-950 shadow-[0_0_20px_rgba(16,185,129,0.2)]"
                                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                                }`}
                        >
                            {item.icon}
                            {item.name}
                        </Link>
                    ))}
                </nav>

                <div className="p-6 border-t border-slate-800 mt-auto">
                    {/* Profile Card */}
                    <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-800/50 mb-4">
                        <div className="relative w-11 h-11 rounded-full border-2 border-emerald-500/60 flex-shrink-0 overflow-hidden">
                            <Image
                                src="/asif-profile.jpg"
                                alt="Asif Mohtadi Ahmed"
                                fill
                                sizes="44px"
                                className="object-cover object-top"
                            />
                        </div>
                        <div className="min-w-0">
                            <p className="text-sm font-bold text-white truncate">{session?.user?.name || "Admin"}</p>
                            <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{session?.user?.role || "User"}</p>
                        </div>
                        <div className="ml-auto w-2.5 h-2.5 rounded-full bg-emerald-500 flex-shrink-0 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    </div>
                    <Link
                        href="/api/auth/signout"
                        className="flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold text-slate-400 hover:text-red-400 transition-colors"
                    >
                        <LogOut size={20} />
                        Sign Out
                    </Link>
                </div>
            </aside>

            {/* Main Content Areas */}
            <div className="flex-grow lg:ml-72 flex flex-col min-h-screen">
                {/* Header */}
                <header className="h-20 lg:h-24 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-4 lg:px-10 sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <div className="relative hidden md:block w-64 lg:w-96">
                            <input
                                type="text"
                                placeholder="Search content..."
                                className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-2.5 text-sm focus:border-emerald-500 transition-all outline-none"
                            />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                        </div>
                    </div>

                    <div className="flex items-center gap-3 lg:gap-6">
                        <button className="relative w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-emerald-400 transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-emerald-500 rounded-full" />
                        </button>
                        <div className="h-8 w-px bg-slate-800 hidden sm:block" />
                        <div className="flex items-center gap-3 lg:gap-4">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold">{session?.user?.name || "Admin"}</p>
                                <p className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">{session?.user?.role || "User"}</p>
                            </div>
                            <div className="w-10 h-10 rounded-full border-2 border-emerald-500/50 p-0.5 relative flex-shrink-0">
                                <Image
                                    src={session?.user?.image || "/asif-profile.jpg"}
                                    className="w-full h-full rounded-full object-cover object-top"
                                    alt={session?.user?.name || "User"}
                                    fill
                                    sizes="40px"
                                />
                                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950" />
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dashboard Sub-header for Mobile Search */}
                <div className="md:hidden px-4 py-4 bg-slate-900/30 border-b border-slate-800">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search content..."
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-12 pr-4 py-2 text-sm focus:border-emerald-500 transition-all outline-none"
                        />
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
                    </div>
                </div>

                {/* Dynamic Content */}
                <main className="p-4 lg:p-10 flex-grow overflow-x-hidden">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {children}
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
