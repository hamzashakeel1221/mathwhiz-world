import Link from "next/link";
import { Quote, MessageSquareHeart } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Stars } from "@/components/ui/Stars";
import type { PublicReview } from "@/lib/data";

function ReviewCard({ r }: { r: PublicReview }) {
  return (
    <figure className="glass relative w-[340px] shrink-0 rounded-3xl p-6 sm:w-[400px]">
      <Quote className="absolute right-5 top-5 h-8 w-8 text-teal-400/30" />
      <Stars rating={r.rating} />
      <blockquote className="mt-4 line-clamp-6 text-sm leading-relaxed text-slate-200">“{r.content}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-navy-500 font-display font-bold text-white">
          {r.name.charAt(0)}
        </span>
        <span>
          <span className="block font-semibold text-white">{r.name}</span>
          <span className="block text-xs text-slate-400">{[r.role, r.curriculum, r.country].filter(Boolean).join(" · ")}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials({ reviews }: { reviews: PublicReview[] }) {
  return (
    <section id="reviews" className="section overflow-hidden">
      <div className="container">
        <SectionHeading
          eyebrow="Reviews"
          title={<>What students & parents <span className="text-gradient">say</span></>}
          subtitle="Real feedback from the MathWhiz World family."
        />
      </div>
      {reviews.length > 0 ? (
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy-950 to-transparent sm:w-40" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy-950 to-transparent sm:w-40" />
          <div className="flex w-max animate-marquee gap-5 hover:[animation-play-state:paused]">
            {[...reviews, ...reviews, ...(reviews.length < 4 ? [...reviews, ...reviews] : [])].map((r, i) => (
              <ReviewCard key={`${r.id}-${i}`} r={r} />
            ))}
          </div>
        </div>
      ) : (
        <div className="container">
          <div className="glass mx-auto max-w-2xl rounded-3xl p-10 text-center">
            <MessageSquareHeart className="mx-auto h-12 w-12 text-teal-300" />
            <p className="mt-4 font-display text-xl font-bold text-white">Studied with us? We'd love your feedback.</p>
            <p className="mt-2 text-slate-400">Share your experience to help other students and parents.</p>
            <Link href="/reviews#write" className="mt-6 inline-block rounded-full bg-teal-400 px-6 py-3 text-sm font-bold text-navy-950">Write a review</Link>
          </div>
        </div>
      )}
      <div className="container mt-10 text-center">
        <Link href="/reviews" className="text-sm font-bold text-sun-400 hover:underline">Read all reviews & write your own →</Link>
      </div>
    </section>
  );
}
