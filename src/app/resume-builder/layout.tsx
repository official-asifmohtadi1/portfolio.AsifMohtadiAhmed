import { Metadata } from "next";

export const metadata: Metadata = {
    title: "IT Resume Builder | Asif Mohtadi Ahmed",
    description: "Build a professional, ATS-optimized IT resume in minutes with our custom builder tool.",
    openGraph: {
        title: "IT Resume Builder | Asif Mohtadi Ahmed",
        description: "Craft a high-impact technical resume for your next IT role.",
        type: "website",
    }
};

export default function ResumeBuilderLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
