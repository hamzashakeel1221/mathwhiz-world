// Simple in-memory fixed-window rate limiter. Good enough for a single server;
// use Redis/Upstash if you deploy to multiple instances.
const buckets = new Map<string, { count: number; reset: number }>();

export function rateLimit(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const bucket = buckets.get(key);
  if (!bucket || bucket.reset < now) {
    buckets.set(key, { count: 1, reset: now + windowMs });
    return { ok: true, retryAfter: 0 };
  }
  bucket.count += 1;
  if (bucket.count > limit) return { ok: false, retryAfter: Math.ceil((bucket.reset - now) / 1000) };
  return { ok: true, retryAfter: 0 };
}

export function clearRateLimit(key: string) {
  buckets.delete(key);
}
