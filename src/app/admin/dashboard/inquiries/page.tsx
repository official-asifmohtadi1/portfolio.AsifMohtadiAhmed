import {
    Mail,
    User,
    Clock,
    XCircle
} from "lucide-react";

export default function AdminInquiriesPage() {
    const inquiries = [
        { id: 1, name: "John Doe", email: "john@example.com", subject: "Project Inquiry - Site Build", date: "2 hours ago", status: "unread" },
        { id: 2, name: "Sarah Ahmed", email: "sarah@digital.com", subject: "WordPress Consulting", date: "5 hours ago", status: "read" },
        { id: 3, name: "Tom K.", email: "tom@startup.io", subject: "React Native App Dev", date: "Yesterday", status: "read" },
    ];

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-4xl font-bold font-heading mb-2">Inquiries</h1>
                <p className="text-slate-400">Manage client messages and project leads.</p>
            </div>

            <div className="glass rounded-[2rem] border-slate-800 p-8">
                <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry.id} className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800/30 hover:border-emerald-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 group">
                            <div className="flex items-start gap-5">
                                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-bold text-xl text-white flex-shrink-0 ${inquiry.status === "unread" ? "bg-emerald-500 shadow-lg shadow-emerald-500/20" : "bg-slate-800"
                                    }`}>
                                    {inquiry.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h4 className="font-bold text-lg">{inquiry.subject}</h4>
                                        {inquiry.status === "unread" && (
                                            <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-black uppercase">New</span>
                                        )}
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                                        <span className="flex items-center gap-1.5"><User size={14} className="text-emerald-400" /> {inquiry.name}</span>
                                        <span className="flex items-center gap-1.5"><Mail size={14} className="text-sky-400" /> {inquiry.email}</span>
                                        <span className="flex items-center gap-1.5"><Clock size={14} className="text-slate-600" /> {inquiry.date}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 self-end md:self-center">
                                <button className="px-6 py-2.5 rounded-xl bg-slate-950 text-slate-300 text-sm font-bold border border-slate-800 hover:border-emerald-500/50 hover:text-emerald-400 transition-all">
                                    View Message
                                </button>
                                <button className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-500 hover:text-red-400 transition-colors">
                                    <XCircle size={18} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
