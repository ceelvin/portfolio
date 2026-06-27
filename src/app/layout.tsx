import type { Metadata } from "next";
import Link from "next/link";
import { Inter, Space_Grotesk } from "next/font/google";
import AppProviders from "@/components/providers/app-providers";
import { siteConfig } from "@/data/site";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} | ${siteConfig.title}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.tagline,
  keywords: [
    "Full Stack Developer",
    "UI/UX Designer",
    "TypeScript",
    "React",
    "Angular",
    "Portfolio",
    siteConfig.name,
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.github }],
  creator: siteConfig.name,
  metadataBase: new URL(siteConfig.siteUrl),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.siteUrl,
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.tagline,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/profile-picture.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.title}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${siteConfig.title}`,
    description: siteConfig.tagline,
    images: ["/images/profile-picture.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-icon.svg", type: "image/svg+xml" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} min-h-screen font-sans antialiased`}
      >
        <AppProviders>
          <Link
            href="/"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-cyan-500 focus:px-4 focus:py-2 focus:text-navy-950 focus:outline-none"
          >
            Skip to content
          </Link>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}