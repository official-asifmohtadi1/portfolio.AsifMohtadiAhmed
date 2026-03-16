"use client";

import { useState } from "react";
import { Lock, Key, ShieldCheck, Loader2 } from "lucide-react";

export default function SecuritySettings() {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    
    const [backupCodes, setBackupCodes] = useState<string[]>([]);
    const [codesLoading, setCodesLoading] = useState(false);

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        if (newPassword !== confirmPassword) {
            setMessage("New passwords do not match.");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/change-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldPassword, newPassword })
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to change password");
            setMessage("Password successfully changed.");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateBackupCodes = async () => {
        setCodesLoading(true);
        try {
            const res = await fetch("/api/auth/backup-codes", { method: "POST" });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error);
            setBackupCodes(data.codes);
        } catch (error: any) {
            alert(error.message || "Failed to generate backup codes");
        } finally {
            setCodesLoading(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="glass p-8 rounded-[2rem] border-slate-800">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-3">
                    <Lock className="text-emerald-400" size={20} /> Change Password
                </h3>
                
                <form onSubmit={handleChangePassword} className="space-y-6 max-w-xl">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Old Password</label>
                        <input 
                            type="password" 
                            required 
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">New Password</label>
                        <input 
                            type="password" 
                            required 
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all" 
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Confirm New Password</label>
                        <input 
                            type="password" 
                            required 
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all" 
                        />
                    </div>
                    
                    {message && (
                        <div className={`p-4 rounded-xl text-sm font-bold ${message.includes('successfully') ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                            {message}
                        </div>
                    )}

                    <button disabled={loading} type="submit" className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all flex items-center gap-2">
                        {loading ? <Loader2 className="animate-spin" size={18} /> : <Key size={18} />} Update Password
                    </button>
                </form>
            </div>

            <div className="glass p-8 rounded-[2rem] border-slate-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
                    <ShieldCheck className="text-sky-400" size={20} /> Offline Backup Codes
                </h3>
                <p className="text-slate-500 text-sm mb-6 max-w-2xl">
                    Generate one-time use backup codes. If you ever lose access to your email or phone, you can use these codes to reset your password and recover your account. Keep them in a safe place.
                </p>
                
                {backupCodes.length > 0 ? (
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                        <p className="text-emerald-400 text-sm font-bold mb-4 flex items-center gap-2">
                            <ShieldCheck size={16} /> Save these codes securely!
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            {backupCodes.map((code, idx) => (
                                <div key={idx} className="font-mono text-center p-3 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 font-bold tracking-widest">
                                    {code}
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <button 
                        disabled={codesLoading} 
                        onClick={handleGenerateBackupCodes} 
                        className="px-6 py-3 bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:bg-sky-500/20 font-bold rounded-xl transition-all flex items-center gap-2"
                    >
                        {codesLoading ? <Loader2 className="animate-spin" size={18} /> : <Key size={18} />} Generate Backup Codes
                    </button>
                )}
            </div>
        </div>
    );
}
