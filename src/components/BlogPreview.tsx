"use client";

import { motion } from "framer-motion";
import { Clock, Tag, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/lib/blog";

export default function BlogPreview({ posts }: { posts: BlogPost[] }) {
    const recentPosts = posts.slice(0, 3);

    return (
        <section id="blog" className="py-24 relative">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-16 gap-8 text-center lg:text-left">
                    <div className="max-w-xl">
                        <h2 className="text-4xl md:text-5xl font-bold font-heading mb-6 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-sky-400 inline-block">
                            Latest Insights
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Thoughts on tech, tutorials on modern web development, and musings on content creation.
                        </p>
                    </div>
                    <Link
                        href="/blog"
                        className="px-8 py-4 rounded-2xl text-slate-950 bg-emerald-500 hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 font-bold shadow-xl shadow-emerald-500/10 self-center lg:self-end"
                    >
                        Go to Blog Engine
                        <ChevronRight size={18} />
                    </Link>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {recentPosts.map((post, idx) => (
                        <motion.article
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            key={post.title}
                            className="group glass rounded-[2rem] overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300 border border-slate-800/50 hover:border-emerald-500/50"
                        >
                            <div className="relative h-56 overflow-hidden">
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-slate-900/80 backdrop-blur border border-slate-700 text-emerald-400 flex items-center gap-1">
                                        <Tag size={12} />
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex justify-between items-center text-xs text-slate-400 font-medium mb-4">
                                    <span>{post.date}</span>
                                    <span className="flex items-center gap-1">
                                        <Clock size={12} />
                                        {post.readTime}
                                    </span>
                                </div>
                                <h3 className="text-2xl font-bold mb-3 leading-tight group-hover:text-emerald-400 transition-colors">
                                    <Link href={`/blog/${post.slug}`}>
                                        {post.title}
                                    </Link>
                                </h3>
                                <p className="text-slate-400 mb-6 flex-grow">{post.excerpt}</p>
                                <div className="pt-6 border-t border-slate-800/60 mt-auto">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="text-emerald-400 font-semibold flex items-center gap-1 hover:gap-3 transition-all uppercase tracking-wider text-sm"
                                    >
                                        Read Article <ChevronRight size={16} />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>
                {recentPosts.length === 0 && (
                    <p className="text-center text-slate-500 py-10">No posts yet. Head to the dashboard to write your first one!</p>
                )}
            </div>
        </section>
    );
}

