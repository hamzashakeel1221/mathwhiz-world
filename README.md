# MathWhiz World Academy: website + admin panel

Modern, animated website for **MathWhiz World Academy**, an online maths tutoring academy (Islamabad, Pakistan, teaching worldwide), with **O-Level Mathematics (CAIE 4024)** as the headline programme.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Cloudflare Workers (OpenNext) + **Cloudflare D1** database · Three.js / React Three Fiber · Framer Motion

## Features

**Public website**
- 3D animated hero (React Three Fiber): distorting core, orbit rings, floating math symbols, stars and sparkles, mouse parallax. It pauses when off-screen and is skipped for reduced-motion users and devices without WebGL.
- 3D particle-wave background on the booking section, plus scroll reveals, a 3D tilt and spotlight on cards, animated counters, marquees and a scroll progress bar.
- Dedicated **O-Level landing page** (`/o-level-maths-tutor`) covering the syllabus topics, Paper 1/Paper 2 structure, a study plan, the flyers and FAQs.
- Curricula listing plus an SEO page for each curriculum (`/curricula/[slug]`): O-Level 4024, IGCSE 0580 / 0606 / 0607, GCSE (Edexcel/AQA/OCR), Edexcel International GCSE, Cambridge Lower Secondary and Primary.
- Free demo booking form, saved to the D1 database (validated with a honeypot and rate limit).
- Reviews page with a public submission form. Reviews stay hidden until an admin approves them.
- FAQ, About and Contact pages, a floating WhatsApp button and an announcement bar.

**Admin panel (`/admin`)**
- Secure login: PBKDF2-SHA256 password hashes, random session tokens in an httpOnly cookie (only their hash is stored), middleware protection, a database check on every page and action, and login rate limiting.
- Dashboard with new requests, pending reviews and requests by curriculum.
- Demo bookings: change status (New → Contacted → Scheduled → Completed/Cancelled), private notes, one-click WhatsApp reply, search, delete.
- Reviews: approve or unpublish, feature, edit, add manually, delete.
- Curricula: create, edit, publish/unpublish, feature, delete, with topics, highlights, exam structure and SEO title/description.
- Services and FAQs: full CRUD.
- Site content: hero text, announcement bar, O-Level intro, About text, email, WhatsApp, location and social links.
- Account: change password, add or remove admins.

**SEO**
- Per-page metadata, canonical URLs, Open Graph and Twitter cards, plus a generated OG image (`/opengraph-image`).
- JSON-LD: `EducationalOrganization` + `LocalBusiness`, `WebSite`, `Course` (per curriculum), `FAQPage`, `BreadcrumbList`, `ItemList`, and reviews.
- `sitemap.xml` built from the database, `robots.txt` that blocks `/admin`, a web manifest and an SVG icon.
- Admin pages are `noindex`.

## Deploy to Cloudflare

Same setup as CartWhim and LaunchWright: Cloudflare builds and deploys straight from GitHub on every push to `main`.

1. In the [Cloudflare dashboard](https://dash.cloudflare.com) open **Workers & Pages → Create → Import a repository** and pick `mathwhiz-world`.
2. Project name: `mathwhiz-world` (must match `name` in `wrangler.jsonc`).
3. Build command: `npm run build` (the default is fine).
4. Deploy command: `npm run cf-deploy`
   (deploys the Worker, creates the `mathwhiz-world` D1 database automatically on the first deploy, then applies the files in `migrations/`, which create the tables and load the default curricula, services, FAQs and settings).
5. Click **Deploy**. The site goes live at `https://mathwhiz-world.<your-subdomain>.workers.dev`.
6. Open the Worker's **Settings → Variables and secrets** and add two secrets: `ADMIN_EMAIL` and `ADMIN_PASSWORD` (10+ characters). Optionally add a variable `SITE_URL` with your final address (e.g. `https://www.mathwhizworld.com`). They are kept on later deploys.
7. Go to `/admin/login` and sign in with that email and password. The first sign-in creates the admin account. Then change the password under **Account & admins** and add other admins there if needed.
8. When you have a domain, add it under **Settings → Domains & Routes** (the domain's nameservers must point to Cloudflare) and set `SITE_URL` to it.

Deploying from your own computer instead: `npx wrangler login`, then `npm run deploy`.

## Run it locally

```bash
npm install
cp .dev.vars.example .dev.vars    # set ADMIN_EMAIL / ADMIN_PASSWORD
cp .dev.vars .env.local           # same values, used by `next dev`
npm run db:migrate:local          # creates the local D1 database with default content
npm run dev                       # http://localhost:3000 (fast refresh)
npm run preview                   # runs the real Cloudflare build locally (http://localhost:8787)
```

Default content lives in `src/lib/defaults.ts`. After changing it, run `npm run db:seed:generate` to rebuild `migrations/0002_seed.sql` (only affects new databases; existing content is edited in the admin panel). Table changes go in a new numbered file in `migrations/`.

Setup creates one **sample review** (pending). Delete it, and approve your real reviews or add them from the admin panel.

## Notes
- Every page that shows database content is rendered on each request, so admin changes appear on the site immediately.
- Fonts are bundled in `src/app/fonts/` (Plus Jakarta Sans, Sora, Caveat; SIL Open Font License), so the build needs no font downloads.
- Login rate limiting is in-memory per Worker instance (best effort).
- After launch, submit `https://YOUR-DOMAIN/sitemap.xml` in Google Search Console.

## Project structure
```
migrations/        D1 tables (0001) and default content (0002)
scripts/           generate-seed.mjs (rebuilds 0002 from src/lib/defaults.ts)
public/            logo + flyer images
src/app/(site)/    public pages (home, o-level-maths-tutor, curricula, reviews, faq, about, contact)
src/app/admin/     login, (panel)/ dashboard, bookings, reviews, curricula, services, faqs, settings, account; actions.ts
src/app/           layout, sitemap, robots, manifest, opengraph-image, icon
src/components/    three/ (3D scenes), home/ (sections), ui/, forms/, admin/, layout/
src/lib/           db (D1 helpers), auth, data (DB + fallbacks), seo (JSON-LD), defaults (seed content), validation
src/middleware.ts  protects /admin
```
