import type { MetadataRoute } from "next";
import { getCurricula } from "@/lib/data";
import { absoluteUrl } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const curricula = await getCurricula();
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/o-level-maths-tutor"), lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: absoluteUrl("/curricula"), lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: absoluteUrl("/contact"), lastModified: now, changeFrequency: "yearly", priority: 0.8 },
    { url: absoluteUrl("/reviews"), lastModified: now, changeFrequency: "weekly", priority: 0.6 },
    { url: absoluteUrl("/faq"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/about"), lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];
  return [
    ...staticPages,
    ...curricula.map((c) => ({
      url: absoluteUrl(`/curricula/${c.slug}`),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: c.code === "4024" ? 0.9 : 0.7,
    })),
  ];
}
