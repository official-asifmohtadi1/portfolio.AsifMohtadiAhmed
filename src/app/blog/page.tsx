import { getSortedPostsData } from "@/lib/blog";
import Link from "next/link";
import { Clock, Tag, ChevronLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Blog | Asif Mohtadi Ahmed",
    description: "Read my latest thoughts, tutorials, and insights on React, Next.js, and WordPress development.",
    openGraph: {
        title: "Blog | Asif Mohtadi Ahmed",
        description: "Insights and tutorials on modern web development.",
        type: "website",
    }
};

export default async function BlogIndex() {
    const posts = await getSortedPostsData();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col pt-24">
            <Navbar />
            <main className="container mx-auto px-6 py-12 flex-grow">
                <Link href="/" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-12 font-medium">
                    <ChevronLeft size={20} /> Back to Portfolio
                </Link>
                <div className="max-w-4xl">
                    <h1 className="text-5xl md:text-6xl font-bold font-heading mb-8">
                        The <span className="text-gradient">Blog Engine</span>
                    </h1>
                    <p className="text-slate-400 text-xl max-w-2xl mb-16 leading-relaxed">
                        Sharing my journey, thoughts, and tutorials on the latest developments in React, WordPress, and content writing.
                    </p>

                    <div className="grid md:grid-cols-2 gap-12">
                        {posts.map((post) => (
                            <article key={post.slug} className="group glass rounded-3xl overflow-hidden hover:border-emerald-500/50 transition-colors">
                                <div className="relative h-60 overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                        className="object-cover transition-transform group-hover:scale-105 duration-700"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1 bg-slate-900/80 backdrop-blur rounded-full text-xs font-bold text-emerald-400 border border-slate-700 flex items-center gap-1">
                                            <Tag size={12} /> {post.category}
                                        </span>
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-medium">
                                        <span>{post.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold mb-4 group-hover:text-emerald-400 transition-colors leading-tight">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h2>
                                    <p className="text-slate-400 mb-6 leading-relaxed">{post.excerpt}</p>
                                    <Link href={`/blog/${post.slug}`} className="text-emerald-400 font-bold text-sm tracking-wider uppercase flex items-center gap-1 hover:gap-2 transition-all">
                                        Read Article <span className="text-lg">→</span>
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
