"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ChevronRight, AlertCircle, Loader2, User, Crown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

import { signIn } from "next-auth/react";

export default function AdminLogin() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false
            });

            if (result?.error) {
                if (result.error === "PENDING_APPROVAL") {
                    setError("Your account is pending approval from the Super User.");
                } else {
                    setError("Invalid email or password.");
                }
                setIsLoading(false);
            } else {
                router.push("/admin/dashboard");
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 relative overflow-hidden font-sans">
            {/* Background decorations */}
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.05),transparent_50%)]" />
            <div className="absolute -top-32 -right-32 w-96 h-96 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md relative z-10"
            >
                <div className="mb-10 text-center">
                    {/* Profile Photo */}
                    <div className="flex justify-center mb-6">
                        <div className="relative">
                            <div className="w-20 h-20 rounded-full border-4 border-emerald-500/60 overflow-hidden relative shadow-2xl shadow-emerald-500/20">
                                <Image
                                    src="/asif-profile.jpg"
                                    alt="Asif Mohtadi Ahmed"
                                    fill
                                    sizes="80px"
                                    className="object-cover object-top"
                                    priority
                                />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-950 shadow-[0_0_10px_rgba(16,185,129,0.9)]" />
                            <span className="absolute inset-0 rounded-full border-2 border-emerald-500/30 animate-ping" />
                        </div>
                    </div>

                    <Link href="/" className="inline-block mb-2">
                        <span className="font-heading font-bold text-2xl tracking-tight text-white">
                            Mohtadi&apos;s <span className="text-emerald-400">Portal</span>
                        </span>
                    </Link>
                    <h1 className="text-3xl font-bold font-heading text-white mb-3">Admin Portal</h1>
                    <p className="text-slate-400 text-sm mb-5">Secure access to the management system.</p>

                    {/* Role Badges */}
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300">
                            <User size={11} /> Normal User
                        </span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-xs font-bold text-emerald-400">
                            <Crown size={11} /> Super Admin
                        </span>
                    </div>
                </div>

                <div className="glass p-8 md:p-10 rounded-[2.5rem] border-slate-800 shadow-2xl relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                    <form onSubmit={handleLogin} className="space-y-6 relative">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <div className="relative">
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all focus:outline-none text-white placeholder-slate-500"
                                    placeholder="name@example.com"
                                    required
                                />
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm font-medium text-slate-300" htmlFor="password">
                                    Password
                                </label>
                                <Link href="/admin/forgot-password" title="Forgot Password" className="text-xs font-bold text-emerald-400 hover:text-emerald-300">
                                    Forgot Password?
                                </Link>
                            </div>
                            <div className="relative">
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-900/50 border border-slate-800 focus:border-emerald-500 transition-all focus:outline-none text-white placeholder-slate-500"
                                    placeholder="••••••••"
                                    required
                                />
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                            </div>
                        </div>

                        {error && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3"
                            >
                                <AlertCircle size={18} /> {error}
                            </motion.div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black transition-all flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(16,185,129,0.3)] disabled:opacity-70 uppercase tracking-widest"
                        >
                            {isLoading ? <Loader2 className="animate-spin" size={22} /> : (
                                <>
                                    Enter Dashboard <ChevronRight size={20} />
                                </>
                            )}
                        </button>
                    </form>
                    
                    <div className="mt-8 pt-8 border-t border-slate-800/50 text-center">
                        <p className="text-slate-500 text-xs font-bold mb-4">Don&apos;t have an account?</p>
                        <Link href="/admin/register" className="inline-block px-6 py-2 rounded-xl bg-slate-900 border border-slate-800 text-emerald-400 text-xs font-black hover:bg-slate-800 transition-all uppercase tracking-widest">
                            Apply for Access
                        </Link>
                    </div>
                </div>


                <div className="mt-8 text-center">
                    <Link href="/" className="text-slate-500 hover:text-white text-sm transition-colors">
                        ← Return to Homepage
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
