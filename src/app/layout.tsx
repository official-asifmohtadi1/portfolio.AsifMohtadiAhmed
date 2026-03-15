import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Asif Mohtadi Ahmed | Head of IT Dept. | Softs Studio",
  description: "Senior Developer & Head of IT specializing in React, Next.js, and WordPress. Discover high-performance solutions and professional IT resume building services.",
  keywords: ["Asif Mohtadi Ahmed", "Head of IT", "Softs Studio", "Full Stack Developer", "React Expert", "WordPress Specialist", "IT Resume Builder", "Bangladesh IT Expert"],
  authors: [{ name: "Asif Mohtadi Ahmed" }],
  openGraph: {
    title: "Asif Mohtadi Ahmed | Head of IT Dept. | Softs Studio",
    description: "Expert React & WordPress Development Portfolio. Delivering scalable digital experiences at Softs Studio.",
    url: "https://asifmohtadi.me",
    siteName: "Asif Mohtadi Ahmed Portfolio",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Asif Mohtadi Ahmed Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Asif Mohtadi Ahmed | Head of IT Dept.",
    description: "Senior Developer & IT Leader. View my portfolio of React and WordPress projects.",
    images: ["/og-image.jpg"],
  }
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-slate-950 text-slate-50 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 min-h-screen flex flex-col`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Asif Mohtadi Ahmed",
              "jobTitle": "Head of IT Department",
              "worksFor": {
                "@type": "Organization",
                "name": "Softs Studio"
              },
              "url": "https://asifmohtadi.me",
              "sameAs": [
                "https://github.com",
                "https://linkedin.com"
              ],
              "description": "Senior Developer and Head of IT specializing in React and WordPress architectures.",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Dhaka",
                "addressCountry": "Bangladesh"
              }
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
