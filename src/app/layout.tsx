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

export const metadata: Metadata = {
  metadataBase: new URL('https://asifmohtadi.me'),
  title: "Mohtadi's Portal",
  description: "Senior Developer & Head of IT specializing in React, Next.js, and WordPress. Discover high-performance solutions and professional IT resume building services.",
  keywords: ["Asif Mohtadi Ahmed", "Head of IT", "Softs Studio", "Full Stack Developer", "React Expert", "WordPress Specialist", "IT Resume Builder", "Bangladesh IT Expert"],
  authors: [{ name: "Asif Mohtadi Ahmed" }],
  openGraph: {
    title: "Mohtadi's Portal",
    description: "Expert React & WordPress Development Portfolio. Delivering scalable digital experiences at Softs Studio.",
    url: "https://asifmohtadi.me",
    siteName: "Mohtadi's Portal",
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
    title: "Mohtadi's Portal | Senior Developer & Head of IT",
    description: "Senior Developer & IT Leader. View my portfolio of React and WordPress projects.",
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
