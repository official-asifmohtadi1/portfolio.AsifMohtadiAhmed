"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2, ArrowRight, ShieldCheck, Mail, Lock, Key } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

function ResetPasswordContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    
    // Auto-populated from URL
    const urlToken = searchParams.get("token") || "";
    const urlUid = searchParams.get("uid") || "";

    const [identifier, setIdentifier] = useState(urlUid);
    const [tokenString, setTokenString] = useState(urlToken);
    const [recoveryType, setRecoveryType] = useState<"code" | "backup">("code");
    
    // For "code" path, this is the 6 digit code. For "backup", this is the offline backup code.
    const [recoveryKey, setRecoveryKey] = useState("");
    const [newPassword, setNewPassword] = useState("");
    
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        // Build Payload
        const payload: any = {
            identifier: identifier,
            newPassword: newPassword,
        };

        if (tokenString) {
            payload.token = tokenString;
        } else if (recoveryType === "code") {
            payload.code = recoveryKey;
        } else {
            payload.backupCode = recoveryKey;
        }

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload)
            });

            const data = await res.json();
            
            if (!res.ok) {
                setMessage(data.error || "Failed to reset password.");
                setLoading(false);
                return;
            }

            setSuccess(true);
            setMessage("Password successfully reset! Redirecting to login...");
            setTimeout(() => {
                router.push(`/admin/login`);
            }, 3000);

        } catch (error) {
            setMessage("An error occurred. Please try again later.");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[url('/grid.svg')] bg-center bg-fixed">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center mb-6">
                    <Lock size={48} className="text-emerald-500" />
                </div>
                <h2 className="text-center text-3xl font-extrabold font-heading text-white">
                    Reset Password
                </h2>
                <p className="mt-2 text-center text-sm text-slate-400">
                    Securely retrieve your account access
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="glass py-8 px-4 shadow-2xl sm:rounded-[2rem] border border-slate-800 sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        
                        {!tokenString && (
                            <div className="flex bg-slate-900 border border-slate-800 rounded-xl p-1 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setRecoveryType("code")}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${recoveryType === "code" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-white"}`}
                                >
                                    6-Digit Code
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRecoveryType("backup")}
                                    className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${recoveryType === "backup" ? "bg-slate-800 text-white" : "text-slate-500 hover:text-white"}`}
                                >
                                    Offline Backup Code
                                </button>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">
                                Identity (Email / Phone)
                            </label>
                            <input
                                type="text"
                                required
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                className="block w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all"
                                placeholder="Your registered identity"
                            />
                        </div>

                        {!tokenString && (
                            <div>
                                <label className="block text-sm font-bold text-slate-300 mb-2">
                                    {recoveryType === "code" ? "6-Digit Recovery Code" : "Offline Backup Code"}
                                </label>
                                <input
                                    type="text"
                                    required
                                    value={recoveryKey}
                                    onChange={(e) => setRecoveryKey(e.target.value)}
                                    className="block w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all font-mono placeholder:font-sans uppercase"
                                    placeholder={recoveryType === "code" ? "123456" : "A1B2-C3D4"}
                                />
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-bold text-slate-300 mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                required
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                minLength={6}
                                className="block w-full px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 text-sm transition-all"
                                placeholder="Min 6 secure characters"
                            />
                        </div>

                        {message && (
                            <div className={`p-4 rounded-xl text-sm font-bold ${success ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-500'}`}>
                                {message}
                            </div>
                        )}

                        <div>
                            <button
                                type="submit"
                                disabled={loading || success}
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-500/20 text-sm font-bold text-slate-950 bg-emerald-500 hover:bg-emerald-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all disabled:opacity-50"
                            >
                                {loading ? (
                                    <Loader2 className="animate-spin h-5 w-5" />
                                ) : (
                                    <>
                                        Confirm Identity & Save <ArrowRight className="ml-2 h-5 w-5" />
                                    </>
                                )}
                            </button>
                        </div>
                    </form>

                    <div className="mt-8 text-center text-sm">
                        <Link href="/admin/login" className="text-emerald-500 hover:text-emerald-400 font-bold transition-all">
                            Back to Secure Login
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function ResetPasswordPage() {
    return (
        <React.Suspense fallback={<div className="min-h-screen bg-slate-950 flex items-center justify-center"><Loader2 className="animate-spin text-emerald-500" size={48} /></div>}>
            <ResetPasswordContent />
        </React.Suspense>
    );
}
