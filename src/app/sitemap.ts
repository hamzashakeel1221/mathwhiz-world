import type { MetadataRoute } from "next";
import { getCurricula } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [base, curricula] = await Promise.all([getSiteUrl(), getCurricula()]);
  const now = new Date();
  const url = (p: string) => absoluteUrl(base, p);
  const staticPages: MetadataRoute.Sitemap = [
    { url: url("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: url("/o-level-maths-tutor"), lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: url("/curricula"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: url("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: url("/reviews"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: url("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: url("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];
  return [
    ...staticPages,
    ...curricula.map((c) => ({
      url: url(`/curricula/${c.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: c.code === "4024" ? 0.9 : 0.7,
    })),
  ];
}
