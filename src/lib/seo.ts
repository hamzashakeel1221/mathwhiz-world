import type { Metadata } from "next";
import { SITE_URL, absoluteUrl, siteConfig } from "./site";
import type { CurriculumData, FaqData } from "./defaults";

export function pageMetadata({ title, description, path, keywords }: { title: string; description: string; path: string; keywords?: string[] }): Metadata {
  return {
    title,
    description,
    keywords: keywords ?? siteConfig.keywords,
    alternates: { canonical: path },
    openGraph: { title, description, url: absoluteUrl(path), siteName: siteConfig.name, type: "website", locale: "en_GB" },
    twitter: { card: "summary_large_image", title, description },
  };
}

export function organizationJsonLd(settings: Record<string, string>) {
  const sameAs = [settings.facebookUrl, settings.instagramUrl, settings.youtubeUrl].filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.shortName,
    url: SITE_URL,
    logo: absoluteUrl("/logo-original.jpg"),
    image: absoluteUrl("/opengraph-image"),
    description: siteConfig.description,
    slogan: siteConfig.taglines.primary,
    email: settings.contactEmail,
    telephone: settings.whatsappDisplay,
    address: { "@type": "PostalAddress", addressLocality: "Islamabad", addressCountry: "PK" },
    areaServed: "Worldwide",
    openingHours: "Mo-Su 00:00-23:59",
    priceRange: "$$",
    knowsAbout: ["O Level Mathematics", "IGCSE Mathematics", "GCSE Mathematics", "Additional Mathematics", "Cambridge Primary Mathematics"],
    contactPoint: [{ "@type": "ContactPoint", contactType: "customer support", email: settings.contactEmail, telephone: settings.whatsappDisplay, availableLanguage: ["English", "Urdu"] }],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: siteConfig.name,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-GB",
  };
}

export function courseJsonLd(c: CurriculumData) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.title,
    description: c.summary,
    url: absoluteUrl(`/curricula/${c.slug}`),
    courseCode: c.code ?? undefined,
    educationalLevel: `${c.level} (${c.yearRange})`,
    inLanguage: "en",
    teaches: c.topics,
    provider: { "@type": "EducationalOrganization", "@id": `${SITE_URL}/#organization`, name: siteConfig.name, url: SITE_URL },
    offers: { "@type": "Offer", category: "Free demo class", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock", url: absoluteUrl("/contact") },
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: "PT1H",
      location: { "@type": "VirtualLocation", url: absoluteUrl("/contact") },
      instructor: { "@type": "Organization", name: siteConfig.name },
    },
  };
}

export function faqJsonLd(faqs: Pick<FaqData, "question" | "answer">[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: absoluteUrl(it.path) })),
  };
}

export function reviewsJsonLd(reviews: { name: string; rating: number; content: string }[]) {
  if (!reviews.length) return null;
  const avg = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${SITE_URL}/#organization`,
    name: siteConfig.name,
    aggregateRating: { "@type": "AggregateRating", ratingValue: avg.toFixed(1), reviewCount: reviews.length, bestRating: 5, worstRating: 1 },
    review: reviews.slice(0, 10).map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.name },
      reviewRating: { "@type": "Rating", ratingValue: r.rating, bestRating: 5 },
      reviewBody: r.content,
    })),
  };
}
