import "server-only";
import { prisma } from "./prisma";
import {
  defaultCurricula,
  defaultFaqs,
  defaultServices,
  defaultSettings,
  type CurriculumData,
  type ExamPaper,
  type FaqData,
  type ServiceData,
} from "./defaults";

export type PublicReview = {
  id: string;
  name: string;
  role: string | null;
  country: string | null;
  curriculum: string | null;
  rating: number;
  content: string;
  createdAt: Date;
};

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  if (!process.env.DATABASE_URL) return fallback;
  try {
    return await fn();
  } catch (err) {
    console.warn("[data] database unavailable, using defaults:", (err as Error).message.split("\n")[0]);
    return fallback;
  }
}

function toCurriculum(row: {
  slug: string; title: string; shortTitle: string; code: string | null; board: string; level: string; yearRange: string;
  tagline: string; summary: string; description: string; topics: unknown; highlights: unknown; examStructure: unknown;
  accent: string; featured: boolean; published: boolean; sortOrder: number; seoTitle: string | null; seoDescription: string | null;
}): CurriculumData {
  return {
    ...row,
    topics: Array.isArray(row.topics) ? (row.topics as string[]) : [],
    highlights: Array.isArray(row.highlights) ? (row.highlights as string[]) : [],
    examStructure: Array.isArray(row.examStructure) ? (row.examStructure as ExamPaper[]) : null,
  };
}

export async function getCurricula(): Promise<CurriculumData[]> {
  return safe(
    async () => (await prisma.curriculum.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } })).map(toCurriculum),
    defaultCurricula.filter((c) => c.published),
  );
}

export async function getCurriculum(slug: string): Promise<CurriculumData | null> {
  return safe(
    async () => {
      const row = await prisma.curriculum.findFirst({ where: { slug, published: true } });
      return row ? toCurriculum(row) : null;
    },
    defaultCurricula.find((c) => c.slug === slug) ?? null,
  );
}

export async function getServices(): Promise<ServiceData[]> {
  return safe(() => prisma.service.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }), defaultServices);
}

export async function getFaqs(): Promise<FaqData[]> {
  return safe(() => prisma.faq.findMany({ where: { published: true }, orderBy: { sortOrder: "asc" } }), defaultFaqs);
}

export async function getApprovedReviews(limit?: number): Promise<PublicReview[]> {
  return safe(
    () =>
      prisma.review.findMany({
        where: { approved: true },
        orderBy: [{ featured: "desc" }, { createdAt: "desc" }],
        take: limit,
        select: { id: true, name: true, role: true, country: true, curriculum: true, rating: true, content: true, createdAt: true },
      }),
    [],
  );
}

export async function getSettings(): Promise<Record<string, string>> {
  const rows = await safe(() => prisma.siteSetting.findMany(), [] as { key: string; value: string }[]);
  const merged = { ...defaultSettings };
  for (const r of rows) merged[r.key] = r.value;
  return merged;
}
