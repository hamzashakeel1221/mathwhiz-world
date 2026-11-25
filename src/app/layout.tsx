import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

// Fonts are bundled with the site (no build-time download): Plus Jakarta Sans, Sora, Caveat (all SIL OFL).
const sans = localFont({ src: "./fonts/plus-jakarta-sans-latin-wght-normal.woff2", variable: "--font-sans", display: "swap", weight: "200 800" });
const display = localFont({ src: "./fonts/sora-latin-wght-normal.woff2", variable: "--font-display", display: "swap", weight: "100 800" });
const hand = localFont({ src: "./fonts/caveat-latin-wght-normal.woff2", variable: "--font-hand", display: "swap", weight: "400 700" });

export async function generateMetadata(): Promise<Metadata> {
  const SITE_URL = await getSiteUrl();
  return {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "O Level Maths Tutor Online | MathWhiz World Academy",
    template: "%s | MathWhiz World Academy",
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "education",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: SITE_URL,
    siteName: siteConfig.name,
    title: "O Level Maths Tutor Online | MathWhiz World Academy",
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "O Level Maths Tutor Online | MathWhiz World Academy",
    description: siteConfig.description,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 } },
  verification: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION ? { google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION } : undefined,
  formatDetection: { telephone: false },
  };
}

export const viewport: Viewport = {
  themeColor: "#060f24",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${sans.variable} ${display.variable} ${hand.variable}`}>
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
