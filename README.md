# HGM · Hidden Gem Marketing — Website

Boutique marketing consultancy website for the investment promotion sector. Built with Next.js 15 (App Router) and a Payload CMS integration, deployed to Vercel.

**Repository:** https://github.com/TaVlala/Marketing-Agency.git · branch: `master`
**Brand:** HGM · *Hidden Gem Marketing — Investment Promotion. Marketing. Redefined.*

---

## Table of Contents

1. [Overview](#1-overview)
2. [Repository Structure](#2-repository-structure)
3. [Local Development](#3-local-development)
4. [Environment Variables](#4-environment-variables)
5. [Deployment](#5-deployment)
6. [Pages & Components](#6-pages--components)
7. [Design System](#7-design-system)
8. [Responsive Behaviour](#8-responsive-behaviour)
9. [Tech Stack](#9-tech-stack)
10. [Scripts](#10-scripts)

---

## 1. Overview

HGM is a boutique consultancy for Investment Promotion Agencies (IPAs). The site presents the agency, its six service pillars, the engagement process, the team, and a contact funnel.

The frontend is **Next.js 15 with the App Router** running on Vercel. Payload CMS is integrated via `@payloadcms/next/withPayload` for content management, with a PostgreSQL backend on Railway.

Key integrations:

- **Payload CMS 3** — content for team members, services, case studies, testimonials. Integrated directly into the Next.js app.
- **Cloudinary** — custom image loader for CDN-served, optimised media.
- **Formspree** — handles contact form submissions, no backend required.
- **Plausible** — privacy-friendly analytics, gated behind cookie consent.

---

## 2. Repository Structure

```
Marketing Agency/
├── src/
│   ├── app/
│   │   ├── (frontend)/               # Public-facing routes (route group)
│   │   │   ├── layout.tsx            # Frontend layout: Nav + Footer + ClientEffects
│   │   │   ├── page.tsx              # Homepage (hero, about, services, contact)
│   │   │   ├── services/page.tsx     # Services page with full process
│   │   │   ├── work/page.tsx         # Work / case studies
│   │   │   ├── team/page.tsx         # Who we are / team members
│   │   │   ├── contact/page.tsx
│   │   │   ├── about/page.tsx        # (legacy)
│   │   │   ├── privacy/page.tsx      # Privacy & Cookie Policy
│   │   │   └── not-found.tsx
│   │   └── (payload)/                # Payload admin route group
│   ├── components/
│   │   ├── HeroSection.tsx           # Animated hero with rotating word
│   │   ├── ContactForm.tsx           # Contact + newsletter forms
│   │   ├── ClientEffects.tsx         # Scroll-reveal observer + parallax + stat counters
│   │   ├── layout/
│   │   │   ├── Nav.tsx               # Desktop nav + mobile drawer + hamburger
│   │   │   ├── Footer.tsx            # 4-col footer with socials
│   │   │   └── CookieConsent.tsx     # Plausible consent banner
│   │   ├── sections/                 # Legacy section components
│   │   └── ui/                       # Reusable UI primitives
│   ├── lib/
│   │   ├── payload.ts                # safeFetch helpers (typed fallbacks if CMS down)
│   │   └── cloudinary-loader.ts      # Custom Next.js image loader
│   └── styles/
│       └── globals.css               # Design system + all component styles
├── payload/                          # Payload CMS config
│   ├── collections/                  # TeamMembers, Services, CaseStudies, Testimonials, ProofStats, Media
│   ├── payload.config.ts
│   └── payload-types.ts
├── next.config.ts                    # withPayload wrapper, Cloudinary loader
└── .env.example
```

---

## 3. Local Development

### Prerequisites

- Node.js 20+
- PostgreSQL (local or Railway connection string)

### Setup

```bash
cd "Marketing Agency"
npm install
cp .env.example .env.local
# Edit .env.local — see Environment Variables below
npm run dev        # → http://localhost:3000
```

The frontend builds without a live CMS — `safeFetch` calls in `src/lib/payload.ts` return typed fallback data when Payload is unreachable, so the UI can be developed standalone.

To run Payload locally with the integrated app, set `DATABASE_URI` and `PAYLOAD_SECRET` in `.env.local` and visit `/admin` after starting `npm run dev`.

---

## 4. Environment Variables

### `.env.local`

| Variable | Purpose |
|---|---|
| `DATABASE_URI` | PostgreSQL connection string for Payload |
| `PAYLOAD_SECRET` | JWT signing secret (≥32 random chars) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name for image CDN |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible analytics domain |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Formspree contact form endpoint |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL (sitemap) |

### Vercel

Set the same variables in **Project Settings → Environment Variables** for Production, Preview, and Development as appropriate.

### Railway (Payload PostgreSQL)

Railway provides `DATABASE_URI` automatically when you attach a PostgreSQL plugin. Reference it in your Vercel environment variables.

---

## 5. Deployment

### Frontend + CMS — Vercel

The site is a single Next.js app — Payload's admin is mounted as a route group within the same deployment.

1. Import the GitHub repo into Vercel.
2. Set environment variables (see above).
3. Vercel auto-deploys on every push to `master`.

### Database — Railway

1. Create a Railway project with the **PostgreSQL** plugin.
2. Copy the `DATABASE_URI` from Railway's Variables tab.
3. Paste it into Vercel's environment variables.

After first deploy, visit `https://your-domain/admin` to create the initial Payload admin user.

---

## 6. Pages & Components

### Pages

| Route | Description |
|---|---|
| `/` | Homepage — hero with rotating word, who we are, six service pillars, contact form |
| `/services` | Full services breakdown — six pillars + six-phase engagement process |
| `/work` | Case studies, sectors served, stats |
| `/team` | Team members + principles |
| `/#contact` | Anchor on homepage to contact section |
| `/privacy` | Privacy & Cookie Policy |

### Key Components

- **`Nav.tsx`** — Sticky top nav with `H.` logo + `HGM` wordmark, gold divider, desktop links, navy CTA pill. Mobile (≤900px): hamburger button + full-screen drawer with slide-down animation and body scroll lock.
- **`HeroSection.tsx`** — Hero with category eyebrow, large serif title, rotating italic word ("capital." → "investors." → "narratives." …), subheading, CTA button.
- **`ContactForm.tsx`** — Direct line + Formspree-powered form + quarterly newsletter signup.
- **`ClientEffects.tsx`** — Reveal-on-scroll observer (re-runs per route), stat counter animations, hero number parallax. Re-scans the DOM on `usePathname()` change so client-side route transitions don't leave sections invisible.
- **`Footer.tsx`** — 4-col footer with brand block, navigation, capabilities, reach-us with email + LinkedIn/Instagram icons.

---

## 7. Design System

The visual language lives in `src/styles/globals.css` as CSS custom properties:

| Token | Value | Usage |
|---|---|---|
| `--paper` | `#F5F0E1` | Default cream background |
| `--navy` | `#14213D` | Primary ink + button background |
| `--navy-deep` | `#0B132B` | Dark sections (services, footer) |
| `--teal` | `#006A67` | Italic accent in headings |
| `--gold` / `--gold-soft` | `#B8924C` / `#D6B373` | Section eyebrows, em accents in dark sections, the dot in `H.` |
| `--display` | Newsreader (variable serif) | Headings |
| `--sans` | Inter | Body, eyebrows, CTAs |
| `--maxw` | `1440px` | Section content max-width |
| `--gutter` | `clamp(24px, 5vw, 80px)` | Side padding |

Section rhythm uses generous `clamp(100px, 16vh, 180px)` vertical padding (with the section after the hero tightened to keep the CTA close to the next title).

---

## 8. Responsive Behaviour

| Breakpoint | Behaviour |
|---|---|
| **≥901px** | Full desktop nav, 3-col services, 4-col pillars, side-by-side contact grid |
| **≤900px** | Hamburger nav drawer, 2-col services, hero rotator unconstrained, sectors → 2 cols |
| **≤700px** | Form labels stack above inputs, newsletter input stacks above subscribe button |
| **≤600px** | Section padding tightens (`clamp(64, 8vh, 96)`), service card padding shrinks, drop-cap reduced 88→60px, hero deco number scaled down, all CTAs/heros flow vertically, footer monogram 96→64px |
| **≤380px** | Hero title floor reduced, wordmark shrinks further |

Body has `overflow-x: hidden` to prevent rogue horizontal scroll. The mobile drawer uses `100vw / 100dvh` with high z-index (9998) to escape the nav's stacking context.

---

## 9. Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| Styling | Custom CSS design system + Tailwind v4 (utility classes on legacy pages) |
| CMS | Payload CMS 3 (integrated via `@payloadcms/next/withPayload`) |
| Database | PostgreSQL (Railway plugin) |
| Hosting | Vercel (Next.js + Payload admin) |
| Database hosting | Railway |
| Image CDN | Cloudinary (custom Next.js loader) |
| Contact form | Formspree |
| Newsletter | Client-side form (placeholder — wire to Mailchimp/Formspree as needed) |
| Analytics | Plausible (cookie-consent gated) |
| Fonts | Newsreader + Inter (Google Fonts) |

---

## 10. Scripts

```bash
npm run dev        # Next.js dev server on http://localhost:3000
npm run build      # Production build
npm run start      # Run production build locally
npm run lint       # ESLint
```

ESLint warnings are non-blocking on Vercel (`eslint.ignoreDuringBuilds: true` in `next.config.ts`).
