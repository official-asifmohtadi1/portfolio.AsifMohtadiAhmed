"use client";

import { useState } from "react";
import Link from "next/link";
import { Loader2, ArrowRight, ShieldCheck, Mail, Phone, Lock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ForgotPasswordPage() {
    const [identifier, setIdentifier] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ identifier })
            });

            const data = await res.json();
            
            if (!res.ok) {
                setMessage(data.error || "Failed to initiate recovery request.");
                setLoading(false);
                return;
            }

            // Route to reset-password with identifier passed minimally
            // We can instruct them to check their email/sms
            setMessage(data.message || "Recovery code sent!");
            setTimeout(() => {
                router.push(`/admin/reset-password?uid=${encodeURIComponent(identifier)}`);
            }, 2000);

        } catch (error) {
            setMessage("An error occurred. Please try again later.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('/grid.svg')] bg-center bg-fixed">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <ShieldCheck size={48} className="text-emerald-500" />
                </div>
                <h2 className="text-center text-3xl font-extrabold font-heading text-white">
                    Recover Password
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    We'll send a 6-digit code or link to your email / registered phone.
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="glass py-8 px-4 shadow-2xl sm:rounded-[2rem] border border-slate-800 sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="identifier" className="block text-sm font-bold text-slate-300 mb-2">
                                Email Address or Phone Number
                            </label>
                            <div className="mt-1 relative rounded-xl shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-500" />
                                </div>
                                <input
                                    id="identifier"
                                    name="identifier"
                                    type="text"
                                    required
                                    value={identifier}
                                    onChange={(e) => setIdentifier(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all"
                                    placeholder="admin@example.com or +123456789"
                                />
                            </div>
                        </div>

                        {message && (
                            <div className={`p-4 rounded-xl text-sm font-bold ${message.includes('sent') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>
                                {message}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-500/20 text-sm font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin h-5 w-5" />
                                ) : (
                                    <>
                                        Send Recovery Code <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 flex justify-between items-center text-sm">
                        <Link href="/admin/login" className="text-emerald-500 hover:text-emerald-400 font-bold transition-all">
                            Remember your password?
                        </Link>
                        <Link href="/admin/reset-password" className="text-slate-400 hover:text-white transition-all">
                            Have a backup code?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
