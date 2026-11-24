import { PageHero } from "@/components/ui/PageHero";
import { JsonLd } from "@/components/ui/JsonLd";
import { Stars } from "@/components/ui/Stars";
import { Reveal } from "@/components/ui/Reveal";
import { ReviewForm } from "@/components/forms/ReviewForm";
import { getApprovedReviews, getCurricula } from "@/lib/data";
import { breadcrumbJsonLd, pageMetadata, reviewsJsonLd } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMetadata({
  title: "Reviews from Students & Parents",
  description: "Read reviews of MathWhiz World Academy's online O Level, IGCSE and GCSE maths tutoring, and share your own experience.",
  path: "/reviews",
});

export default async function ReviewsPage() {
  const [reviews, curricula] = await Promise.all([getApprovedReviews(), getCurricula()]);
  const avg = reviews.length ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length : 0;
  const crumbs = [{ name: "Home", path: "/" }, { name: "Reviews", path: "/reviews" }];
  const ld = reviewsJsonLd(reviews);
  return (
    <>
      <JsonLd data={ld ? [breadcrumbJsonLd(crumbs), ld] : breadcrumbJsonLd(crumbs)} />
      <PageHero eyebrow="Reviews" title={<>Loved by students <span className="text-gradient">& parents</span></>} subtitle="Your child's success is our priority." crumbs={crumbs}>
        {reviews.length > 0 && (
          <div className="glass mt-8 inline-flex items-center gap-4 rounded-2xl px-5 py-4">
            <span className="font-display text-4xl font-extrabold text-white">{avg.toFixed(1)}</span>
            <span><Stars rating={Math.round(avg)} className="h-5 w-5" /><span className="mt-1 block text-xs text-slate-400">from {reviews.length} review{reviews.length === 1 ? "" : "s"}</span></span>
          </div>
        )}
      </PageHero>
      <section className="section pt-4">
        <div className="container grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="columns-1 gap-5 space-y-5 md:columns-2">
            {reviews.length === 0 && <p className="text-slate-400">No reviews published yet. Be the first to share your experience!</p>}
            {reviews.map((r, i) => (
              <Reveal key={r.id} delay={(i % 4) * 0.05}>
                <figure className="glass break-inside-avoid rounded-3xl p-6">
                  <Stars rating={r.rating} />
                  <blockquote className="mt-3 text-sm leading-relaxed text-slate-200">“{r.content}”</blockquote>
                  <figcaption className="mt-4 text-sm">
                    <span className="font-semibold text-white">{r.name}</span>
                    <span className="block text-xs text-slate-400">{[r.role, r.curriculum, r.country].filter(Boolean).join(" · ")}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
          <div id="write" className="lg:sticky lg:top-28 lg:self-start">
            <div className="glass-strong gradient-border rounded-3xl p-7">
              <h2 className="font-display text-2xl font-bold text-white">Write a review</h2>
              <p className="mt-1 text-sm text-slate-400">Reviews appear after a quick approval.</p>
              <div className="mt-6"><ReviewForm curricula={curricula.map((c) => c.shortTitle)} /></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
