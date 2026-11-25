import "server-only";
import { headers } from "next/headers";

/** Public base URL (no trailing slash): SITE_URL variable if set, otherwise the address the request came in on. */
export async function getSiteUrl() {
  const fromEnv = process.env.SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host") ?? "localhost:3000";
  const proto = h.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  return `${proto}://${host}`;
}
