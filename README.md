# HGM · Hidden Gem Marketing — Website

Boutique marketing consultancy website for the investment promotion sector.

**Repository:** https://github.com/TaVlala/Marketing-Agency.git · branch: `master`
**Live frontend:** https://marketing-agency-tau-gilt.vercel.app
**CMS admin:** https://web-production-addfa.up.railway.app/admin

---

## Table of Contents

1. [Architecture](#1-architecture)
2. [Repository Structure](#2-repository-structure)
3. [Local Development](#3-local-development)
4. [Environment Variables](#4-environment-variables)
5. [Deployment](#5-deployment)
6. [Pages](#6-pages)
7. [CMS Collections](#7-cms-collections)
8. [Design System](#8-design-system)
9. [Tech Stack](#9-tech-stack)
10. [Scripts](#10-scripts)

---

## 1. Architecture

The project is split into two independent deployments:

| Layer | Technology | Host |
|---|---|---|
| **Frontend** | Next.js 15 (App Router) | Vercel |
| **CMS / API** | Payload CMS 3 (standalone) | Railway |
| **Database** | PostgreSQL | Railway |
| **Image CDN** | Cloudinary (display-side loader only) | Cloudinary |

The frontend fetches CMS content at build time via `src/lib/payload.ts`. All fetch calls are wrapped in `safeFetch()` which returns typed fallback data if the CMS is unreachable, so the frontend builds and runs independently.

Form submissions and newsletter signups are mirrored to the CMS (fire-and-forget) after the primary services (Formspree, Mailchimp) confirm success.

---

## 2. Repository Structure

```
Marketing Agency/
├── src/
│   ├── app/
│   │   └── (frontend)/               # All public-facing routes
│   │       ├── layout.tsx            # Nav + Footer + CookieConsent + ClientEffects
│   │       ├── page.tsx              # Homepage
│   │       ├── team/page.tsx         # Who we are
│   │       ├── services/page.tsx     # How we work
│   │       ├── work/page.tsx         # Our work / case studies
│   │       ├── contact/page.tsx      # Contact page
│   │       └── privacy/page.tsx      # Privacy & Cookie Policy
│   ├── components/
│   │   ├── HeroSection.tsx           # Animated hero with rotating word
│   │   ├── ClientEffects.tsx         # Scroll-reveal, stat counters, parallax
│   │   ├── layout/
│   │   │   ├── Nav.tsx               # Desktop nav + mobile drawer
│   │   │   ├── Footer.tsx            # 4-col footer
│   │   │   └── CookieConsent.tsx     # Analytics consent banner
│   │   └── sections/
│   │       ├── HomeContactSection.tsx  # Contact form + newsletter (home)
│   │       └── ContactForm.tsx         # Contact form (contact page)
│   ├── lib/
│   │   ├── payload.ts                # Typed fetch helpers with fallbacks
│   │   ├── analytics.ts              # Plausible event helpers
│   │   ├── mailchimp.ts              # Mailchimp JSONP subscribe helper
│   │   └── cloudinary-loader.ts      # Custom Next.js image loader
│   └── styles/
│       └── globals.css               # Full design system + component styles
├── payload/                          # Standalone Payload CMS (deployed separately)
│   ├── collections/
│   │   ├── Users.ts
│   │   ├── Media.ts
│   │   ├── TeamMembers.ts
│   │   ├── Services.ts
│   │   ├── CaseStudies.ts            # Labelled "Our Work" in admin
│   │   ├── Testimonials.ts
│   │   ├── ProofStats.ts
│   │   ├── Submissions.ts            # Contact form submissions
│   │   └── Subscribers.ts            # Newsletter subscribers
│   ├── payload.config.ts
│   ├── payload-types.ts              # Hand-maintained TypeScript interfaces
│   └── seed.ts                       # Local seed script (requires live DB)
├── seed-rest.mjs                     # REST API seed — populates live CMS
├── public/
│   └── team/                         # Team member photos
└── .env.example
```

---

## 3. Local Development

### Prerequisites

- Node.js 20+
- Access to the Railway PostgreSQL connection string (or a local PostgreSQL instance)

### Setup

```bash
cd "Marketing Agency"
npm install
cp .env.example .env.local
# Fill in .env.local — see Environment Variables below
npm run dev        # → http://localhost:3000
```

The frontend builds and runs without a live CMS connection. `safeFetch()` in `src/lib/payload.ts` returns typed fallback data when Payload is unreachable.

---

## 4. Environment Variables

### Frontend — `.env.local` / Vercel

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for image CDN |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Formspree contact form endpoint URL |
| `NEXT_PUBLIC_MAILCHIMP_URL` | Mailchimp embedded form action URL |
| `NEXT_PUBLIC_PAYLOAD_URL` | Railway CMS URL — used by forms to mirror submissions to CMS |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible analytics domain |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (used for sitemap + OG meta) |
| `PAYLOAD_URL` | CMS API URL for build-time fetches (can be same as `NEXT_PUBLIC_PAYLOAD_URL`) |
| `DATABASE_URI` | PostgreSQL connection string (Railway) |
| `PAYLOAD_SECRET` | JWT signing secret for Payload (≥32 random chars) |

### CMS — Railway

| Variable | Purpose |
|---|---|
| `DATABASE_URI` | PostgreSQL connection string (auto-provided by Railway) |
| `PAYLOAD_SECRET` | JWT signing secret — must match any local seed scripts |
| `PAYLOAD_PUBLIC_SERVER_URL` | Public Railway URL — must be set without trailing slash |
| `PAYLOAD_CORS_ORIGINS` | Comma-separated list of allowed frontend origins (e.g. `https://marketing-agency-tau-gilt.vercel.app`) |

> When you move to a custom domain, update `PAYLOAD_CORS_ORIGINS` on Railway and the `NEXT_PUBLIC_SITE_URL` on Vercel. `NEXT_PUBLIC_PAYLOAD_URL` stays the same unless the CMS moves.

---

## 5. Deployment

### Frontend — Vercel

Vercel auto-deploys on every push to `master`. No build configuration needed beyond environment variables.

### CMS — Railway

The `payload/` directory is deployed as a standalone Node.js service on Railway.

- **Root directory:** `payload/`
- **Build command:** `payload build`
- **Start command:** `payload serve`
- **Required env vars:** `DATABASE_URI`, `PAYLOAD_SECRET`, `PAYLOAD_PUBLIC_SERVER_URL`, `PAYLOAD_CORS_ORIGINS`

To deploy manually: `railway up --detach` from the project root (git push alone does not always trigger Railway auto-deploy).

### Populating the CMS

After a fresh deploy, run the REST seed script to populate all collections with site content:

```bash
$env:ADMIN_PASSWORD="your-payload-admin-password"
node seed-rest.mjs
```

This populates: Site Settings, 6 Services, 4 Proof Stats, 4 Case Studies (Our Work), and 2 Team Members. Photos should be added manually via the admin panel.

---

## 6. Pages

| Route | Nav label | Description |
|---|---|---|
| `/` | — | Homepage — hero, who we are, six service pillars, contact |
| `/team` | Who we are | Team members + four principles |
| `/services` | How we work | Six-pillar service breakdown + six-phase engagement |
| `/work` | — (not in nav yet) | Case studies, stats, sectors |
| `/#contact` | Contact | Anchor to homepage contact section |
| `/contact` | — | Standalone contact page with full form |
| `/privacy` | — | Privacy & Cookie Policy |

---

## 7. CMS Collections

| Collection | Admin label | Purpose |
|---|---|---|
| `team-members` | Team Members | Eko and David — name, role, bio, photo, LinkedIn |
| `services` | Services | Six service pillars shown on homepage + services page |
| `case-studies` | Our Work | Client engagements — shown on `/work` when published |
| `testimonials` | Testimonials | Client quotes — add real quotes when available |
| `proof-stats` | Proof Stats | Stats band on homepage (10+, 15+, 100+, 50+) |
| `submissions` | Form Submissions | Contact form entries mirrored from Formspree |
| `subscribers` | Subscribers | Newsletter signups mirrored from Mailchimp |
| `media` | Media | Uploaded images — stored on Railway filesystem |
| `users` | Users | Admin panel users (roles: admin / editor) |

**Global:** `site-settings` — firm name, tagline, contact email, hero copy, social links.

---

## 8. Design System

All styles live in `src/styles/globals.css` as CSS custom properties.

| Token | Value | Usage |
|---|---|---|
| `--paper` | `#F5F0E1` | Default cream background |
| `--navy` | `#14213D` | Primary ink + button background |
| `--navy-deep` | `#0B132B` | Dark sections (services, footer) |
| `--teal` | `#006A67` | Italic accent in headings |
| `--gold` | `#B8924C` | Eyebrows, decorative accents, `H.` dot |
| `--display` | Newsreader (variable serif) | All headings |
| `--sans` | Inter | Body, eyebrows, CTAs |
| `--maxw` | `1440px` | Section content max-width |
| `--gutter` | `clamp(24px, 5vw, 80px)` | Horizontal section padding |

### Breakpoints

| Breakpoint | Changes |
|---|---|
| `≤900px` | Mobile nav drawer, stacked hero, 2-col services |
| `≤700px` | Form labels stack, footer columns stack |
| `≤600px` | Tighter section padding, smaller hero deco |
| `≤380px` | Smallest hero title floor |

---

## 9. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Custom CSS design system (`globals.css`) + Tailwind v4 (utility classes on some pages) |
| CMS | Payload CMS 3 (standalone, not integrated into Next.js) |
| Database | PostgreSQL on Railway |
| Frontend hosting | Vercel |
| CMS hosting | Railway |
| Image CDN | Cloudinary (display-side custom loader — no upload adapter) |
| Contact forms | Formspree + mirrored to Payload CMS |
| Newsletter | Mailchimp JSONP + mirrored to Payload CMS |
| Analytics | Plausible (cookie-consent gated) |
| Fonts | Newsreader + Inter (Google Fonts) |

---

## 10. Scripts

```bash
# Frontend
npm run dev             # Dev server → http://localhost:3000
npm run build           # Production build
npm run start           # Run production build locally
npm run lint            # ESLint

# CMS (run from project root)
npm run generate:types  # Regenerate payload/payload-types.ts from live DB schema

# Seed live CMS via REST API
$env:ADMIN_PASSWORD="your-password"
node seed-rest.mjs
```

### Regenerating Payload types

After changing any collection schema in `payload/collections/`, regenerate TypeScript types:

```bash
# Requires DATABASE_URI pointing at the live Railway DB
npm run generate:types
```

Commit the updated `payload/payload-types.ts` alongside the schema change.
