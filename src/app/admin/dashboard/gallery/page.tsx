import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import GalleryClient from "./GalleryClient";

export default async function AdminGallery() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/admin/login");

    const items = await prisma.gallery.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="space-y-6 lg:space-y-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 lg:mb-8">
                <div>
                    <h1 className="text-3xl lg:text-4xl font-bold font-heading mb-2">Gallery Management</h1>
                    <p className="text-slate-400 text-sm lg:text-base">Manage images and visual assets.</p>
                </div>
            </div>

            <div className="glass rounded-[1.5rem] lg:rounded-[2.5rem] border-slate-800 p-6 lg:p-10">
                <GalleryClient initialItems={items} />
            </div>
        </div>
    );
}
