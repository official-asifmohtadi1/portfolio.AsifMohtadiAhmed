"use client";

import { useState } from "react";
import { Plus, Trash2, Edit2, Camera, Upload, Loader2, Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function GalleryClient({ initialItems }: { initialItems: any[] }) {
    const [items, setItems] = useState(initialItems);
    const [isAdding, setIsAdding] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({ title: "", description: "", imageUrl: "" });
    const router = useRouter();

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (ev) => {
            if (ev.target?.result) setFormData(prev => ({ ...prev, imageUrl: ev.target!.result as string }));
        };
        reader.readAsDataURL(file);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.title || !formData.imageUrl) return alert("Title and Image are required.");
        
        setLoading(true);
        try {
            const res = await fetch("/api/gallery", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });
            const newItem = await res.json();
            if(newItem.error) throw new Error(newItem.error);
            setItems([newItem, ...items]);
            setIsAdding(false);
            setFormData({ title: "", description: "", imageUrl: "" });
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to save gallery item.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this item?")) return;
        try {
            await fetch(`/api/gallery?id=${id}`, { method: "DELETE" });
            setItems(items.filter(item => item.id !== id));
            router.refresh();
        } catch (error) {
            console.error(error);
            alert("Failed to delete item.");
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h3 className="text-xl font-bold">Uploaded Assets</h3>
                <button
                    onClick={() => setIsAdding(!isAdding)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all"
                >
                    {isAdding ? "Cancel" : <><Plus size={18} /> Add New Asset</>}
                </button>
            </div>

            {isAdding && (
                <form onSubmit={handleSave} className="mb-10 bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Title</label>
                                <input
                                    required
                                    value={formData.title}
                                    onChange={e => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all"
                                    placeholder="Project Screenshot 1"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Description</label>
                                <textarea
                                    value={formData.description}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:border-emerald-500 outline-none transition-all resize-none"
                                    rows={3}
                                    placeholder="Optional description"
                                />
                            </div>
                        </div>

                        <div className="space-y-2 flex flex-col items-center justify-center">
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-widest w-full text-left">Upload Image</label>
                            <label className="w-full flex-1 border-2 border-dashed border-slate-700 hover:border-emerald-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer overflow-hidden relative group transition-all">
                                {formData.imageUrl ? (
                                    <>
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={formData.imageUrl} alt="preview" className="w-full h-full object-cover" />
                                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-all">
                                            <Upload className="text-white mb-2" />
                                            <span className="text-white font-bold text-sm">Change Image</span>
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center p-6 flex flex-col items-center text-slate-500 group-hover:text-emerald-400">
                                        <Upload size={32} className="mb-4" />
                                        <span className="font-bold">Click to Upload</span>
                                    </div>
                                )}
                                <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                            </label>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto px-8 py-3 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-all ml-auto disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="animate-spin inline" /> : "Save Asset"}
                    </button>
                </form>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.length === 0 && !isAdding && (
                    <div className="col-span-full py-12 text-center text-slate-500 border border-dashed border-slate-800 rounded-2xl">
                        <ImageIcon size={48} className="mx-auto mb-4 opacity-50" />
                        <p>No gallery assets found. Click "Add New Asset" to upload.</p>
                    </div>
                )}
                {items.map(item => (
                    <div key={item.id} className="group border border-slate-800 bg-slate-900 rounded-2xl overflow-hidden hover:border-emerald-500/30 transition-all flex flex-col">
                        <div className="aspect-video relative overflow-hidden bg-slate-950">
                            <Image src={item.imageUrl} alt={item.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw" className="object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute top-2 right-2 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    className="p-2 bg-red-500/80 text-white rounded-lg hover:bg-red-500"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h4 className="font-bold text-lg mb-1 truncate">{item.title}</h4>
                            <p className="text-xs text-slate-500 line-clamp-2">{item.description || "No description provided."}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
