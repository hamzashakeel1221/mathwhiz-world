import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { JsonLd } from "@/components/ui/JsonLd";
import { getCurricula, getSettings } from "@/lib/data";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, curricula] = await Promise.all([getSettings(), getCurricula()]);
  return (
    <>
      <JsonLd data={[organizationJsonLd(settings), websiteJsonLd()]} />
      <ScrollProgress />
      <AnnouncementBar text={settings.announcement} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-navy-900">
        Skip to content
      </a>
      <Header />
      <main id="main" className="-mt-[76px]">{children}</main>
      <Footer settings={settings} curricula={curricula} />
      <WhatsAppButton number={settings.whatsappNumber} />
    </>
  );
}
