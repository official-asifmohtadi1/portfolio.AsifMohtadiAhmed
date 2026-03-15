import { getPostData } from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ChevronLeft, Clock, Tag } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { slug } = await params;
    const post = await getPostData(slug);

    return {
        title: `${post.title} | Blog | Mohtadi's Portal`,
        description: post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            images: [{ url: post.image }],
            type: "article",
            publishedTime: post.date,
        },
        twitter: {
            card: "summary_large_image",
            title: post.title,
            description: post.excerpt,
            images: [post.image],
        }
    };
}

export default async function BlogPostPage({ params }: { params: Params }) {
    const { slug } = await params;
    const post = await getPostData(slug);

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col pt-24">
            <Navbar />
            <main className="container mx-auto px-6 py-12 flex-grow">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            "headline": post.title,
                            "description": post.excerpt,
                            "image": post.image,
                            "datePublished": post.date,
                            "author": {
                                "@type": "Person",
                                "name": "Asif Mohtadi Ahmed"
                            }
                        })
                    }}
                />
                <div className="max-w-4xl mx-auto">
                    {/* Back Navigation */}
                    <Link href="/blog" className="inline-flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-12 font-medium">
                        <ChevronLeft size={20} /> Back to Blog
                    </Link>

                    {/* Hero Header */}
                    <header className="mb-16">
                        <div className="flex items-center gap-4 mb-6">
                            <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-xs font-bold border border-emerald-500/50 flex items-center gap-1 uppercase tracking-wider">
                                <Tag size={12} /> {post.category}
                            </span>
                            <span className="text-slate-400 text-xs font-medium flex items-center gap-1 uppercase tracking-wider">
                                <Clock size={12} /> {post.readTime}
                            </span>
                            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">
                                {post.date}
                            </span>
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold font-heading mb-8 leading-tight">
                            {post.title}
                        </h1>
                        <p className="text-xl text-slate-400 leading-relaxed font-sans max-w-2xl mb-12">
                            {post.excerpt}
                        </p>
                        <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden border border-slate-800 shadow-2xl">
                            <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                sizes="100vw"
                                priority
                                className="object-cover"
                            />
                        </div>
                    </header>

                    {/* Content Body */}
                    <article className="prose prose-invert prose-emerald prose-lg lg:prose-xl max-w-none prose-headings:font-heading prose-headings:font-bold prose-p:text-slate-300 prose-p:leading-relaxed prose-a:text-emerald-400 prose-code:text-emerald-300 prose-code:bg-slate-900 prose-code:p-1 prose-code:rounded prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-800 prose-pre:shadow-xl">
                        <MDXRemote source={post.content || ""} />
                    </article>

                    {/* Hire Me CTA Section */}
                    <section className="mt-24 glass p-10 md:p-16 rounded-[4rem] text-center border-emerald-500/30 shadow-emerald-500/10">
                        <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">Inspired by this post?</h2>
                        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                            I can help you build exactly this kind of high-performance application. Let&apos;s discuss your project goals today.
                        </p>
                        <Link href="#contact" className="px-10 py-5 bg-gradient-to-r from-emerald-500 to-sky-500 text-slate-950 rounded-2xl font-bold text-lg hover:scale-105 transition-transform shadow-[0_0_40px_rgba(16,185,129,0.4)] inline-block">
                            Start a Conversation
                        </Link>
                    </section>
                </div>
            </main>
            <Footer />
        </div>
    );
}
