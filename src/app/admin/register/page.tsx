"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { UserPlus, Mail, Lock, User, Phone, ArrowLeft, Loader2, CheckCircle } from "lucide-react";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: ""
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setIsLoading(true);

        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (res.ok) {
                setIsSuccess(true);
            } else {
                setError(data.error || "Registration failed");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
                <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="glass max-w-md w-full p-10 text-center rounded-[3rem]"
                >
                    <div className="w-20 h-20 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={40} />
                    </div>
                    <h2 className="text-3xl font-bold mb-4">Application Sent!</h2>
                    <p className="text-slate-400 mb-8">
                        Your account application has been submitted to the Super Admin. You will be able to log in once your status is set to <strong>APPROVED</strong>.
                    </p>
                    <Link 
                        href="/admin/login" 
                        className="inline-block px-8 py-3 bg-emerald-500 text-slate-950 font-bold rounded-2xl hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20"
                    >
                        Return to Login
                    </Link>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
            <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="glass max-w-xl w-full p-8 md:p-12 rounded-[3rem] border-slate-800 shadow-2xl relative overflow-hidden"
            >
                {/* Decorative gradients */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-emerald-500 opacity-10 blur-3xl rounded-full" />
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-sky-500 opacity-10 blur-3xl rounded-full" />

                <Link href="/admin/login" className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-400 text-sm font-bold mb-8 transition-colors">
                    <ArrowLeft size={16} /> Back to Login
                </Link>

                <div className="mb-10">
                    <h1 className="text-4xl font-bold font-heading mb-3">Join the <span className="text-gradient">Team</span></h1>
                    <p className="text-slate-400 text-sm">Apply for a moderator or editor account. Approval required.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input 
                                    required
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 focus:border-emerald-500 outline-none transition-all text-sm"
                                    placeholder="Enter your name"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Phone (Optional)</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input 
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 focus:border-emerald-500 outline-none transition-all text-sm"
                                    placeholder="+880..."
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                            <input 
                                required
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 focus:border-emerald-500 outline-none transition-all text-sm"
                                placeholder="name@example.com"
                            />
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input 
                                    required
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 focus:border-emerald-500 outline-none transition-all text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Confirm Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                <input 
                                    required
                                    type="password"
                                    value={formData.confirmPassword}
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl pl-12 pr-4 py-3.5 focus:border-emerald-500 outline-none transition-all text-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                    </div>

                    {error && <p className="text-red-400 text-xs font-bold text-center">{error}</p>}

                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 uppercase tracking-widest disabled:opacity-50"
                    >
                        {isLoading ? <Loader2 className="animate-spin" size={20} /> : <><UserPlus size={20} /> Apply Now</>}
                    </button>
                    
                    <p className="text-center text-slate-500 text-sm">
                        Already have an account? <Link href="/admin/login" className="text-emerald-400 font-bold hover:underline">Sign In</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
}
