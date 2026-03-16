"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex items-center gap-3 w-full px-4 py-3 text-sm font-medium text-slate-300 rounded-xl hover:bg-red-500/10 hover:text-red-400 transition-all"
        >
            <LogOut size={18} />
            Sign Out
        </button>
    );
}
