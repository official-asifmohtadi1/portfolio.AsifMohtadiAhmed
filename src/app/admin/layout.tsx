import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Image as ImageIcon, Briefcase, PenTool, LayoutTemplate, Settings, FileText, UserPlus, LogOut } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    // If not logged in, they should go to /admin/login. Since they're in /admin, we'll let page.tsx or next middleware handle specifics. 
    // However, if they are in /admin/dashboard, we MUST check:
    if (!session?.user) {
        // We shouldn't redirect from the root /admin layout if /admin/login is inside it. Let's assume login is /admin/login, so Layout wraps all. We should only redirect if the path is NOT /admin/login.
        // Doing this in server components is tricky because we don't have the pathname.
        // Let's use it as a simple shell that only renders the sidebar if session exists.
    }

    const navigation = [
        { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
        { name: "Gallery", href: "/admin/dashboard/gallery", icon: ImageIcon },
        { name: "Portfolio", href: "/admin/dashboard/portfolio", icon: Briefcase },
        { name: "Blog", href: "/admin/dashboard/blog", icon: PenTool },
        { name: "Skills", href: "/admin/dashboard/skills", icon: LayoutTemplate },
        { name: "Resumes", href: "/admin/dashboard/resumes", icon: FileText },
        { name: "Settings", href: "/admin/dashboard/settings", icon: Settings },
    ];

    if (!session) {
        return <>{children}</>;
    }

    return (
        <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-50">
            {/* Sidebar */}
            <div className="w-64 border-r border-slate-800 bg-slate-900/50 flex flex-col hidden md:flex">
                <div className="p-6">
                    <h2 className="text-xl font-bold font-heading text-white">Mohtadi&apos;s <span className="text-emerald-400">Portal</span></h2>
                    <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{session.user.role} Panel</p>
                </div>
                
                <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                    {navigation.map((item) => (
                        <Link key={item.name} href={item.href} className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                            <item.icon size={18} />
                            {item.name}
                        </Link>
                    ))}
                    {session.user.role === 'SUPERUSER' && (
                        <Link href="/admin/dashboard/users" className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-300 rounded-xl hover:bg-emerald-500/10 hover:text-emerald-400 transition-all">
                            <UserPlus size={18} />
                            Users
                        </Link>
                    )}
                </nav>

                <div className="p-4 border-t border-slate-800">
                    <LogoutButton />
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-4 md:p-8">
                {children}
            </div>
        </div>
    );
}
