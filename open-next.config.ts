import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

// Pages that read the database are rendered on every request (always up to date after admin edits).
// Pre-rendered static pages are served straight from Cloudflare's static assets.
const config = defineCloudflareConfig({
  incrementalCache: staticAssetsIncrementalCache,
  enableCacheInterception: true,
});

// `npm run build` runs the OpenNext build (so Cloudflare's default build command works),
// so OpenNext itself must call `next build` directly instead of `npm run build`.
export default { ...config, buildCommand: "npx next build" };
