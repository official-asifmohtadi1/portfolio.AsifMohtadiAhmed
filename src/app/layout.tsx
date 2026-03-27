import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import { prisma } from "@/lib/prisma";

export async function generateMetadata(): Promise<Metadata> {
  let settings;
  try {
    settings = await prisma.siteSettings.findUnique({ where: { id: "global" } });
  } catch(e) { /* silent on fresh install */ }
  
  const title = settings?.seoTitle || "Mohtadi's Portal";
  const description = settings?.seoDescription || "Expert React & WordPress Development Portfolio.";
  const keywords = (settings?.seoKeywords || "React, Next.js, WordPress").split(',').map((k: string) => k.trim());

  return {
    metadataBase: new URL('https://asifmohtadi.me'),
    title: title,
    description: description,
    keywords: keywords,
    authors: [{ name: "Asif Mohtadi Ahmed" }],
    openGraph: {
      title: title,
      description: description,
      url: "https://asifmohtadi.me",
      siteName: title,
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
      title: title,
      description: description,
      images: ["/og-image.jpg"],
    },
    alternates: {
      canonical: 'https://asifmohtadi.me',
      languages: {
        'en-US': 'https://asifmohtadi.me',
        'bn-BD': 'https://asifmohtadi.me?lang=bn',
        'ar-SA': 'https://asifmohtadi.me?lang=ar',
      },
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

import { Providers } from "@/components/Providers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-4682872605160930" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4682872605160930"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
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
                "https://github.com/asifmohtadi1",
                "https://linkedin.com/in/asifmohtadi",
                "https://twitter.com/asifmohtadi"
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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
