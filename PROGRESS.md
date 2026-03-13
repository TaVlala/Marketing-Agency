# PROGRESS.md — IPA Marketing Agency

## Phase 0 — Architecture & Planning ✅

**Decisions made:**
- Stack: Next.js 15 (static export) + Payload CMS 3 on Railway + Hostinger static hosting
- Images: Cloudinary CDN via custom Next.js loader (frontend only — see Phase 3 note)
- Subscribe form: Mailchimp embedded form endpoint (no serverless function)
- Types: Payload hand-maintained types in `payload/payload-types.ts` (see Phase 3 note)
- Cookie consent: client-side only, gates Plausible script injection via `useEffect`
- Next.js pinned to 15.4.11 for Payload 3.79.0 peer dependency compatibility

## Phase 1 — Project Scaffold ✅

**Completed:**
- Next.js 15.4.11 (static export) + Payload CMS 3.79.0 + Tailwind CSS v4
- `output: 'export'` set in `next.config.ts` — never remove
- Payload collections defined, CMS fetch helpers, Cloudinary loader, analytics helpers
- `.env.example` with clear frontend/Railway env var boundary

**Environment variable boundaries (critical):**
- Frontend `.env.local`: `PAYLOAD_URL`, `NEXT_PUBLIC_*` vars only
- Railway env panel: `DATABASE_URI`, `PAYLOAD_SECRET`, `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`

## Phase 2 — Design System ✅

**Completed:**
- Tailwind v4 `@theme` block: custom colors (`--color-base`, `--color-primary`, `--color-accent`), fonts, spacing
- Plus Jakarta Sans via `next/font/google` with `variable: '--font-sans'`
- UI components: `Button` (3 variants), `Card`, `SectionHeader`, `ScrollReveal` (Intersection Observer)
- Layout: sticky `Nav` (scroll-aware, mobile hamburger), dark `Footer`, `CookieConsent` (localStorage + Plausible gating)
- Custom 404 `not-found.tsx` page

## Phase 3 — CMS Setup ✅

**Completed:**
- All 7 Payload collections fully defined with admin descriptions, access rules, field labels:
  - `users`, `media`, `team-members`, `services`, `case-studies`, `testimonials`, `proof-stats`
- `site-settings` global with firm name, tagline, hero copy, contact email, social links
- `payload/seed.ts` — placeholder data script for all collections
- `payload/payload-types.ts` — hand-maintained TypeScript interfaces (single source of truth)
- Typed fetch helpers in `src/lib/payload.ts` — all return typed data

**Architecture decisions made in Phase 3:**
- **No Cloudinary plugin for Payload**: Payload 3 has no official Cloudinary storage adapter (available: S3, GCS, Azure, Vercel Blob, Uploadthing). Decision: Payload uses **local file storage on Railway with a persistent volume**. The Next.js frontend Cloudinary loader handles display-side optimisation. Admins can reference Cloudinary URLs in text fields if needed.
- **Types hand-maintained**: `payload generate:types` requires a DB connection + integrated Next.js setup. The `payload-types.ts` file is hand-written and accurate. Regenerate when collections change by running the seed environment.

## What's Next

- **Phase 4**: Home page — Hero, Services, Proof Strip, Featured Work, Testimonials, Subscribe, CTA sections

## Phase 4 — Home Page ✅

**Completed:**
- Hero, ServicesSection, ProofStrip, FeaturedWork, TestimonialsSection, SubscribeSection, CTABanner
- All sections typed against `payload-types.ts`, graceful fallbacks for offline/no-CMS builds
- Mailchimp JSONP subscribe — no serverless function
- Build verified clean

## Phase 5 — Inner Pages ✅

**Completed:**
- `/about` — mission strip (3-col), team grid with photo placeholder, CTA banner
- `/services` — numbered editorial list with What/Who/Deliverable per service
- `/work` — WorkGrid client component with tag filter bar, outcome highlights, empty state
- `/contact` — two-column layout, ContactForm (Formspree), service dropdown, success/error states
- `/privacy` — UK GDPR policy (Formspree, Mailchimp, Plausible)
- `sitemap.ts` — all 6 routes with `force-static` for static export compatibility
- All 7 routes build clean, verified in browser

## Phase 6 — Deploy Workflow ✅

**Completed:**
- `.github/workflows/deploy.yml` — three triggers: push to main, workflow_dispatch, repository_dispatch `cms-update` (Payload webhook)
- Steps: checkout → Node 20 + npm cache → npm ci → next build (with all secrets as env vars) → FTP deploy to Hostinger `/public_html/`
- `dangerous-clean-slate: false` — never wipes production before upload
- `.env.example` updated with `NEXT_PUBLIC_SITE_URL` and GitHub Actions secrets section

**GitHub Secrets required (Settings → Secrets → Actions):**
- `PAYLOAD_URL` — Railway Payload CMS URL
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`, `NEXT_PUBLIC_MAILCHIMP_URL`, `NEXT_PUBLIC_FORMSPREE_ENDPOINT`, `NEXT_PUBLIC_SITE_URL`
- `FTP_SERVER`, `FTP_USERNAME`, `FTP_PASSWORD` — Hostinger FTP credentials

**Payload webhook setup (after Railway deploy):**
- In Railway Payload admin → Settings → Webhooks → Add `https://api.github.com/repos/OWNER/REPO/dispatches`
- Method: POST, Header: `Authorization: Bearer YOUR_GITHUB_PAT`, Body: `{"event_type":"cms-update"}`

## Phase 7 — SEO Polish ✅

**Completed:**
- `robots.ts` — static robots.txt pointing to sitemap via `NEXT_PUBLIC_SITE_URL`
- `layout.tsx` metadata enhanced: `metadataBase`, `openGraph` (type, siteName, title, description), `twitter` card, `robots` (index + follow)
- `sitemap.ts` already used `NEXT_PUBLIC_SITE_URL` — no change needed
- Build verified: 11 static routes including `/robots.txt` and `/sitemap.xml`

## What's Next

- **Phase 8**: Handover — launch checklist, README, final env var verification
