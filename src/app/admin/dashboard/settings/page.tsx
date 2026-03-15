"use client";

import Image from "next/image";
import { useState } from "react";
import { User, Lock, Globe, ShieldCheck, Bell, Palette, Save, Camera, Crown } from "lucide-react";
import SecuritySettings from "./SecuritySettings";

export default function AdminSettingsPage() {
    const [activeTab, setActiveTab] = useState("Public Profile");

    const tabs = [
        { name: "Public Profile", icon: <User size={18} /> },
        { name: "Security", icon: <Lock size={18} /> },
        { name: "SEO & Social", icon: <Globe size={18} /> },
        { name: "Notifications", icon: <Bell size={18} /> },
        { name: "Theme & Styling", icon: <Palette size={18} /> },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold font-heading mb-2">Settings</h1>
                <p className="text-slate-400">Manage your profile, account security, and site preferences.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Navigation Tabs */}
                <div className="lg:col-span-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${tab.name === activeTab
                                    ? "bg-slate-900 border border-emerald-500/30 text-emerald-400"
                                    : "text-slate-500 hover:text-white hover:bg-slate-900/50"
                                }`}
                        >
                            {tab.icon}
                            {tab.name}
                        </button>
                    ))}
                </div>

                {/* Settings Content */}
                <div className="lg:col-span-2 space-y-8">

                    {activeTab === "Public Profile" && (
                        <>
                            {/* Profile Identity Cards */}
                    <div className="glass p-8 rounded-[2rem] border-slate-800">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                            <User className="text-emerald-400" size={20} /> Account Identity
                        </h3>

                        {/* Avatar + Upload */}
                        <div className="flex flex-col sm:flex-row items-center gap-8 mb-8">
                            <div className="relative flex-shrink-0">
                                <div className="w-28 h-28 rounded-full border-4 border-emerald-500/60 overflow-hidden relative shadow-xl shadow-emerald-500/10">
                                    <Image
                                        src="/asif-profile.jpg"
                                        alt="Asif Mohtadi Ahmed"
                                        fill
                                        sizes="112px"
                                        className="object-cover object-top"
                                    />
                                </div>
                                <button className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-emerald-500 hover:bg-emerald-400 flex items-center justify-center text-slate-950 shadow-lg transition-all hover:scale-110">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <div className="text-center sm:text-left">
                                <h2 className="text-2xl font-bold text-white mb-1">Asif Mohtadi Ahmed</h2>
                                <p className="text-slate-400 text-sm mb-4">Head of IT Dept. · Softs Studio</p>
                                <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-sm font-bold text-slate-300">
                                        <User size={13} /> Normal User
                                    </span>
                                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-sm font-bold text-emerald-400">
                                        <Crown size={13} /> Super Admin
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Role Details Row */}
                        <div className="grid sm:grid-cols-2 gap-4">
                            {/* Normal User Card */}
                            <div className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800 group hover:border-slate-600 transition-all">
                                <div className="w-12 h-12 rounded-full border-2 border-slate-600 overflow-hidden relative flex-shrink-0">
                                    <Image
                                        src="/asif-profile.jpg"
                                        alt="Normal User"
                                        fill
                                        sizes="48px"
                                        className="object-cover object-top"
                                    />
                                </div>
                                <div>
                                    <p className="font-bold text-white text-sm">Asif Mohtadi</p>
                                    <p className="text-xs text-slate-500 mb-1">asif@example.com</p>
                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-800 text-slate-400">
                                        <User size={10} /> Normal User
                                    </span>
                                </div>
                            </div>

                            {/* Super Admin Card */}
                            <div className="flex items-center gap-4 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20 group hover:border-emerald-500/50 transition-all">
                                <div className="relative flex-shrink-0">
                                    <div className="w-12 h-12 rounded-full border-2 border-emerald-500/60 overflow-hidden relative">
                                        <Image
                                            src="/asif-profile.jpg"
                                            alt="Super Admin"
                                            fill
                                            sizes="48px"
                                            className="object-cover object-top"
                                        />
                                    </div>
                                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                                </div>
                                <div>
                                    <p className="font-bold text-white text-sm">Asif Admin</p>
                                    <p className="text-xs text-slate-500 mb-1">asif@dev.com</p>
                                    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400">
                                        <Crown size={10} /> Super Admin
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-10 rounded-[2.5rem] border-slate-800">
                        <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
                            <User className="text-emerald-400" /> General Profile
                        </h3>

                        <div className="space-y-8">
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-400">First Name</label>
                                    <input type="text" defaultValue="Asif Mohtadi" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-3.5 focus:border-emerald-500 outline-none transition-all" />
                                </div>
                                <div className="space-y-3">
                                    <label className="text-sm font-bold text-slate-400">Last Name</label>
                                    <input type="text" defaultValue="Ahmed" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-3.5 focus:border-emerald-500 outline-none transition-all" />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-400">Professional Bio</label>
                                <textarea rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-5 py-4 focus:border-emerald-500 outline-none transition-all resize-none">I am a passionate Full-Stack Developer specializing in high-performance React applications and custom WordPress solutions.</textarea>
                            </div>

                            <div className="space-y-3">
                                <label className="text-sm font-bold text-slate-400">Public Email</label>
                                <input type="email" defaultValue="asif@example.com" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-3.5 focus:border-emerald-500 outline-none transition-all" />
                            </div>

                            <div className="pt-6 border-t border-slate-800">
                                <button className="px-10 py-4 rounded-2xl bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 flex items-center gap-3">
                                    <Save size={20} /> Save Changes
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-10 rounded-[2.5rem] border-red-500/10 hover:border-red-500/30 transition-all">
                        <h3 className="text-xl font-bold text-red-400 mb-4 flex items-center gap-3">
                            <ShieldCheck size={20} /> Danger Zone
                        </h3>
                        <p className="text-slate-500 text-sm mb-6 leading-relaxed">Deactivating your account will hide your portfolio and admin dashboard. This action is not reversible via the UI.</p>
                        <button className="px-6 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-sm font-bold hover:bg-red-500 hover:text-white transition-all">
                            Delete Account Permanently
                        </button>
                    </div>
                        </>
                    )}
                    {activeTab === "Security" && (
                        <SecuritySettings />
                    )}
                </div>
            </div>
        </div>
    );
}
