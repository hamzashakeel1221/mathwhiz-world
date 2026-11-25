import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import { getSiteUrl } from "@/lib/site-url";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
    sitemap: absoluteUrl(await getSiteUrl(), "/sitemap.xml"),
  };
}
