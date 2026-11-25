import "server-only";
import { all, first, toFaq, toReview, toService, type CurriculumRow, type FaqRow, type ReviewRow, type ServiceRow } from "./db";
import {
  defaultCurricula, defaultFaqs, defaultServices, defaultSettings,
  type CurriculumData, type ExamPaper, type FaqData, type ServiceData,
} from "./defaults";

export type PublicReview = {
  id: string; name: string; role: string | null; country: string | null; curriculum: string | null;
  rating: number; content: string; createdAt: string;
};

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.warn("[data] database unavailable, using defaults:", (err as Error).message.split("\n")[0]);
    return fallback;
  }
}

function parseJson<T>(s: string | null, fallback: T): T {
  if (!s) return fallback;
  try { return JSON.parse(s) as T; } catch { return fallback; }
}

export function toCurriculum(r: CurriculumRow): CurriculumData & { id: string } {
  return {
    id: r.id, slug: r.slug, title: r.title, shortTitle: r.short_title, code: r.code, board: r.board, level: r.level,
    yearRange: r.year_range, tagline: r.tagline, summary: r.summary, description: r.description,
    topics: parseJson<string[]>(r.topics, []), highlights: parseJson<string[]>(r.highlights, []),
    examStructure: parseJson<ExamPaper[] | null>(r.exam_structure, null), accent: r.accent,
    featured: r.featured === 1, published: r.published === 1, sortOrder: r.sort_order,
    seoTitle: r.seo_title, seoDescription: r.seo_description,
  };
}

export async function getCurricula(): Promise<CurriculumData[]> {
  return safe(
    async () => (await all<CurriculumRow>("SELECT * FROM curricula WHERE published = 1 ORDER BY sort_order")).map(toCurriculum),
    defaultCurricula.filter((c) => c.published),
  );
}

export async function getCurriculum(slug: string): Promise<CurriculumData | null> {
  return safe(
    async () => {
      const row = await first<CurriculumRow>("SELECT * FROM curricula WHERE slug = ? AND published = 1", slug);
      return row ? toCurriculum(row) : null;
    },
    defaultCurricula.find((c) => c.slug === slug) ?? null,
  );
}

export async function getServices(): Promise<ServiceData[]> {
  return safe(async () => (await all<ServiceRow>("SELECT * FROM services WHERE published = 1 ORDER BY sort_order")).map(toService), defaultServices);
}

export async function getFaqs(): Promise<FaqData[]> {
  return safe(async () => (await all<FaqRow>("SELECT * FROM faqs WHERE published = 1 ORDER BY sort_order")).map(toFaq), defaultFaqs);
}

export async function getApprovedReviews(limit = 200): Promise<PublicReview[]> {
  return safe(
    async () =>
      (await all<ReviewRow>("SELECT * FROM reviews WHERE approved = 1 ORDER BY featured DESC, created_at DESC LIMIT ?", limit)).map((r) => {
        const { id, name, role, country, curriculum, rating, content, createdAt } = toReview(r);
        return { id, name, role, country, curriculum, rating, content, createdAt };
      }),
    [],
  );
}

export async function getSettings(): Promise<Record<string, string>> {
  const rows = await safe(() => all<{ key: string; value: string }>("SELECT key, value FROM site_settings"), []);
  const merged = { ...defaultSettings };
  for (const r of rows) merged[r.key] = r.value;
  return merged;
}
