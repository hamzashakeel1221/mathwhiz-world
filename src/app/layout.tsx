import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Sora, Caveat } from "next/font/google";
import "./globals.css";
import { SITE_URL, siteConfig } from "@/lib/site";

const sans = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-sans", display: "swap" });
const display = Sora({ subsets: ["latin"], variable: "--font-display", display: "swap", weight: ["600", "700", "800"] });
const hand = Caveat({ subsets: ["latin"], variable: "--font-hand", display: "swap", weight: ["600", "700"] });

export const metadata: Metadata = {
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
