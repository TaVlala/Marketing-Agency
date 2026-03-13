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
