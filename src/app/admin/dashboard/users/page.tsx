"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { 
    Users as UsersIcon, 
    UserCheck, 
    UserX, 
    Shield, 
    ShieldAlert, 
    Loader2,
    Mail,
    Phone
} from "lucide-react";
import { motion } from "framer-motion";

export default function UserManagementPage() {
    const { data: session, status } = useSession();
    const [users, setUsers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (status === "unauthenticated") redirect("/admin/login");
        if (session?.user?.role !== "SUPERUSER") redirect("/admin/dashboard");
        
        fetchUsers();
    }, [status, session]);

    const fetchUsers = async () => {
        setIsLoading(true);
        try {
            const res = await fetch("/api/admin/users");
            const data = await res.json();
            setUsers(data.users || []);
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdateStatus = async (userId: string, newStatus: string) => {
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus })
            });
            if (res.ok) fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    const handleUpdateRole = async (userId: string, newRole: string) => {
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ role: newRole })
            });
            if (res.ok) fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-emerald-500" size={48} />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-bold font-heading mb-2">User Management</h1>
                    <p className="text-slate-400">Approve or manage moderators and editors.</p>
                </div>
                <div className="px-6 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-bold flex items-center gap-2">
                    <UsersIcon size={20} /> Total Users: {users.length}
                </div>
            </div>

            <div className="glass rounded-[2rem] border-slate-800 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-900/50 border-b border-slate-800">
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">User</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Role</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500">Status</th>
                                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-slate-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800/50">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-slate-800/20 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-800 flex items-center justify-center text-lg font-bold text-white uppercase">
                                                {user.name?.[0] || user.email?.[0]}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-slate-200">{user.name || "Anonymous"}</h4>
                                                <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                                                    <span className="flex items-center gap-1"><Mail size={12} /> {user.email}</span>
                                                    {user.phone && <span className="flex items-center gap-1"><Phone size={12} /> {user.phone}</span>}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <select 
                                            value={user.role} 
                                            onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                                            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-300 focus:border-emerald-500 outline-none"
                                        >
                                            <option value="EDITOR">EDITOR</option>
                                            <option value="MODERATOR">MODERATOR</option>
                                            <option value="SUPERUSER">SUPERUSER</option>
                                        </select>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                                            user.status === "APPROVED" 
                                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                                            : user.status === "PENDING"
                                            ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                            : "bg-red-500/10 text-red-400 border-red-500/20"
                                        }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            {user.status !== "APPROVED" && (
                                                <button 
                                                    onClick={() => handleUpdateStatus(user.id, "APPROVED")}
                                                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-all"
                                                    title="Approve User"
                                                >
                                                    <UserCheck size={18} />
                                                </button>
                                            )}
                                            {user.status !== "REJECTED" && (
                                                <button 
                                                    onClick={() => handleUpdateStatus(user.id, "REJECTED")}
                                                    className="p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 hover:border-red-500/30 transition-all"
                                                    title="Reject/Disable User"
                                                >
                                                    <UserX size={18} />
                                                </button>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
