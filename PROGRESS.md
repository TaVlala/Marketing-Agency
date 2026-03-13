# PROGRESS.md — IPA Marketing Agency

## Phase 0 — Architecture & Planning ✅

**Decisions made:**
- Stack: Next.js 15 (static export) + Payload CMS 3 on Railway + Hostinger static hosting
- Images: Cloudinary via Payload plugin + custom Next.js loader (no `unoptimized: true`)
- Subscribe form: Mailchimp embedded form endpoint (no serverless function)
- Types: Payload auto-generated types (`payload-types.ts`) — no manual type duplication
- Cookie consent: client-side only, gates Plausible script injection via `useEffect`
- Next.js pinned to 15.4.11 for Payload 3.79.0 peer dependency compatibility

## Phase 1 — Project Scaffold 🔄

**Completed:**
- Initialized Next.js 15.4.11 with App Router, TypeScript, Tailwind CSS v4
- Configured `output: 'export'` in `next.config.ts`
- Installed Payload CMS 3.79.0 with PostgreSQL adapter, Lexical editor, cloud-storage plugin
- Created all Payload collections: Users, Media, TeamMembers, Services, CaseStudies, Testimonials, ProofStats, SiteSettings (global)
- Created CMS fetch helpers (`src/lib/payload.ts`)
- Created Cloudinary image loader (`src/lib/cloudinary-loader.ts`)
- Created Plausible analytics helpers (`src/lib/analytics.ts`)
- Created `.env.example` with clear frontend/Railway separation
- Connected Git remote to https://github.com/TaVlala/Marketing-Agency.git

**Environment variable boundaries (critical):**
- Frontend `.env.local`: `PAYLOAD_URL`, `NEXT_PUBLIC_*` vars only
- Railway env panel: `DATABASE_URI`, `PAYLOAD_SECRET`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
- Cloudinary secrets NEVER appear in frontend code

**Next:** Verify dev server and build pass, then commit.

## What's Next

- Phase 2: Design system — Tailwind config, fonts, reusable components
