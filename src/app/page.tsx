import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Portfolio from "@/components/Portfolio";
import Skills from "@/components/Skills";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import StickyHireMe from "@/components/StickyHireMe";
import { getProjectsData } from "@/lib/projects";
import { getSortedPostsData } from "@/lib/blog";

export default async function Home() {
  const projects = getProjectsData();
  const posts = await getSortedPostsData();

  return (
    <main className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      <Navbar />
      <Hero />
      <Portfolio projects={projects} />
      <Skills />
      <BlogPreview posts={posts} />
      <Contact />
      <Footer />
      <StickyHireMe />
    </main>
  );
}
