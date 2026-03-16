import { getProjectData } from "@/lib/projects";
import { notFound } from "next/navigation";
import EditProjectWrapper from "@/components/admin/EditProjectWrapper";

type Params = Promise<{ slug: string }>;

export default async function EditProjectPage({ params }: { params: Params }) {
    const { slug } = await params;
    let project = null;

    try {
        project = getProjectData(slug);
    } catch (error) {
        console.error("Error fetching project for edit:", error);
    }

    if (!project) {
        notFound();
    }

    return <EditProjectWrapper project={project} />;
}
