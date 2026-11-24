# MathWhiz World Academy: website + admin panel

Modern, animated website for **MathWhiz World Academy**, an online maths tutoring academy (Islamabad, Pakistan, teaching worldwide), with **O-Level Mathematics (CAIE 4024)** as the headline programme.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS · Prisma + MySQL · Three.js / React Three Fiber · Framer Motion

## Features

**Public website**
- 3D animated hero (React Three Fiber): distorting core, orbit rings, floating math symbols, stars and sparkles, mouse parallax. It pauses when off-screen and is skipped for reduced-motion users and devices without WebGL.
- 3D particle-wave background on the booking section, plus scroll reveals, a 3D tilt and spotlight on cards, animated counters, marquees and a scroll progress bar.
- Dedicated **O-Level landing page** (`/o-level-maths-tutor`) covering the syllabus topics, Paper 1/Paper 2 structure, a study plan, the flyers and FAQs.
- Curricula listing plus an SEO page for each curriculum (`/curricula/[slug]`): O-Level 4024, IGCSE 0580 / 0606 / 0607, GCSE (Edexcel/AQA/OCR), Edexcel International GCSE, Cambridge Lower Secondary and Primary.
- Free demo booking form, saved to MySQL (validated with a honeypot and rate limit).
- Reviews page with a public submission form. Reviews stay hidden until an admin approves them.
- FAQ, About and Contact pages, a floating WhatsApp button and an announcement bar.

**Admin panel (`/admin`)**
- Secure login: bcrypt password hashes, signed JWT in an httpOnly cookie, middleware protection, a database check on every action, and login rate limiting.
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

## Setup

Requirements: Node.js 20+ and MySQL 8 (or MariaDB 10.6+).

```bash
# 1. Install
npm install

# 2. Create a database
mysql -u root -p -e "CREATE DATABASE mathwhiz CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# 3. Configure environment
cp .env.example .env
#   - DATABASE_URL         mysql://USER:PASSWORD@HOST:3306/mathwhiz
#   - NEXT_PUBLIC_SITE_URL your real domain, e.g. https://www.mathwhizworld.com
#   - AUTH_SECRET          run: openssl rand -base64 48
#   - ADMIN_EMAIL / ADMIN_PASSWORD (min 10 chars) for the first admin

# 4. Create tables
npm run db:migrate        # development (creates/apply migrations)
# or in production:
npm run db:deploy

# 5. Seed default content + the first admin
npm run db:seed

# 6. Run
npm run dev               # http://localhost:3000
# production:
npm run build && npm start
```

Sign in at **`/admin/login`** with `ADMIN_EMAIL` / `ADMIN_PASSWORD`, then **change the password** under *Account & admins*.

The seed is safe to re-run. It never overwrites content you have edited. It creates one **sample review** (pending). Delete it, and approve your real reviews or add them from the admin panel.

> If the database is unreachable, the public site still renders using the built-in default content (`src/lib/defaults.ts`). Forms and the admin panel need the database.

## Deployment notes
- Works on any Node host (VPS, Railway, Render, Vercel + PlanetScale/Aiven MySQL, cPanel Node apps).
- Set the same env vars in production. `NEXT_PUBLIC_SITE_URL` must be your live domain for the sitemap, canonical and OG URLs to be correct.
- Pages use ISR (5-minute revalidation). Admin changes refresh the site immediately.
- Rate limiting is in-memory (per server instance). For multi-instance hosting, swap `src/lib/rate-limit.ts` for Redis/Upstash.
- After launch, submit `https://YOUR-DOMAIN/sitemap.xml` in Google Search Console. You can put the verification token in `NEXT_PUBLIC_GOOGLE_VERIFICATION`.

## Project structure
```
prisma/            schema.prisma, migrations, seed.ts
public/            logo + flyer images
src/app/(site)/    public pages (home, o-level-maths-tutor, curricula, reviews, faq, about, contact)
src/app/admin/     login, (panel)/ dashboard, bookings, reviews, curricula, services, faqs, settings, account; actions.ts
src/app/           layout, sitemap, robots, manifest, opengraph-image, icon
src/components/    three/ (3D scenes), home/ (sections), ui/, forms/, admin/, layout/
src/lib/           prisma, auth/session, data (DB + fallbacks), seo (JSON-LD), defaults (seed content), validation
src/middleware.ts  protects /admin
```
