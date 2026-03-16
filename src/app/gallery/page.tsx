import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { prisma } from "@/lib/prisma";
import { Sparkles, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

export default async function GalleryPage() {
    const images = await prisma.gallery.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col pt-24">
            <Navbar />

            <main className="container mx-auto px-6 py-12 flex-grow">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-bold uppercase tracking-widest mb-6">
                            <Sparkles size={14} /> Visual Showcase
                        </div>
                        <h1 className="text-4xl md:text-6xl font-bold font-heading mb-6">
                            Project <span className="text-gradient">Gallery</span>
                        </h1>
                        <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                            A showcase of my recent work, UI designs, snippets, and project snapshots.
                        </p>
                    </div>

                    {images.length === 0 ? (
                        <div className="py-24 text-center text-slate-500">
                            <ImageIcon size={64} className="mx-auto mb-6 opacity-20" />
                            <h3 className="text-2xl font-bold text-slate-400 mb-2">Gallery is Empty</h3>
                            <p>No images have been uploaded yet. Check back soon!</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {images.map((image: { id: string, title: string, description: string | null, imageUrl: string }) => (
                                <div key={image.id} className="group relative overflow-hidden rounded-[2rem] bg-slate-900 border border-slate-800 hover:border-emerald-500/50 transition-all shadow-xl hover:shadow-emerald-500/20">
                                    <div className="aspect-[4/3] overflow-hidden relative bg-slate-950">
                                        <Image
                                            src={image.imageUrl || "/asif-profile.jpg"}
                                            alt={image.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            className="object-cover group-hover:scale-110 transition-transform duration-700 brightness-90 group-hover:brightness-110"
                                        />
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <h3 className="text-2xl font-bold text-white mb-2">{image.title}</h3>
                                        {image.description && <p className="text-slate-300 text-sm line-clamp-2">{image.description}</p>}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </div>
    );
}
