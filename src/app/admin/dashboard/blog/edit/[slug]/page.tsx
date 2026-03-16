import { getPostData } from "@/lib/blog";
import { notFound } from "next/navigation";
import EditPostWrapper from "@/components/admin/EditPostWrapper";

type Params = Promise<{ slug: string }>;

export default async function EditBlogPostPage({ params }: { params: Params }) {
    const { slug } = await params;
    let post = null;

    try {
        post = await getPostData(slug);
    } catch (error) {
        console.error("Error fetching post for edit:", error);
    }

    if (!post) {
        notFound();
    }

    return <EditPostWrapper post={post} />;
}
