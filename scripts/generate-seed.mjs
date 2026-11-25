// Regenerates migrations/0002_seed.sql from src/lib/defaults.ts.
// Run: node scripts/generate-seed.mjs   (Node 22.18+ strips TypeScript types natively)
import { writeFileSync } from "node:fs";
import { defaultCurricula, defaultFaqs, defaultServices, defaultSettings, sampleReviews } from "../src/lib/defaults.ts";

const q = (v) => (v === null || v === undefined ? "NULL" : typeof v === "number" ? String(v) : typeof v === "boolean" ? (v ? "1" : "0") : `'${String(v).replace(/'/g, "''")}'`);
const now = "2026-11-25T00:00:00.000Z";
const lines = ["-- Default content. INSERT OR IGNORE keeps anything already edited in the admin panel.", ""];

defaultCurricula.forEach((c, i) => {
  lines.push(`INSERT OR IGNORE INTO curricula (id, slug, title, short_title, code, board, level, year_range, tagline, summary, description, topics, highlights, exam_structure, accent, featured, published, sort_order, seo_title, seo_description, created_at, updated_at) VALUES (${[
    `cur_${String(i + 1).padStart(2, "0")}`, c.slug, c.title, c.shortTitle, c.code, c.board, c.level, c.yearRange, c.tagline, c.summary, c.description,
    JSON.stringify(c.topics), JSON.stringify(c.highlights), c.examStructure ? JSON.stringify(c.examStructure) : null, c.accent, c.featured, c.published, c.sortOrder,
    c.seoTitle, c.seoDescription, now, now,
  ].map(q).join(", ")});`);
});
defaultServices.forEach((s, i) => {
  lines.push(`INSERT OR IGNORE INTO services (id, title, description, icon, sort_order, published, created_at, updated_at) VALUES (${[`svc_${i + 1}`, s.title, s.description, s.icon, s.sortOrder, s.published, now, now].map(q).join(", ")});`);
});
defaultFaqs.forEach((f, i) => {
  lines.push(`INSERT OR IGNORE INTO faqs (id, question, answer, category, sort_order, published, created_at, updated_at) VALUES (${[`faq_${i + 1}`, f.question, f.answer, f.category, f.sortOrder, f.published, now, now].map(q).join(", ")});`);
});
sampleReviews.forEach((r, i) => {
  lines.push(`INSERT OR IGNORE INTO reviews (id, name, role, country, curriculum, rating, content, approved, featured, created_at, updated_at) VALUES (${[`rev_sample_${i + 1}`, r.name, r.role, r.country, r.curriculum, r.rating, r.content, 0, 0, now, now].map(q).join(", ")});`);
});
for (const [k, v] of Object.entries(defaultSettings)) {
  lines.push(`INSERT OR IGNORE INTO site_settings (key, value, updated_at) VALUES (${[k, v, now].map(q).join(", ")});`);
}
writeFileSync(new URL("../migrations/0002_seed.sql", import.meta.url), lines.join("\n") + "\n");
console.log("migrations/0002_seed.sql written");
