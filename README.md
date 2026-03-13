# IPA Marketing Agency — Website

Static Next.js frontend with a headless Payload CMS backend. The frontend deploys to Hostinger via GitHub Actions FTP on every push to `master`. The CMS runs as a standalone service on Railway backed by PostgreSQL.

**Repository:** https://github.com/TaVlala/Marketing-Agency.git · branch: `master`

---

## Table of Contents

1. [Overview](#1-overview)
2. [Repository Structure](#2-repository-structure)
3. [Local Development](#3-local-development)
4. [Environment Variables](#4-environment-variables)
5. [Deployment](#5-deployment)
6. [Content Management](#6-content-management)
7. [Image Handling](#7-image-handling)
8. [Tech Stack](#8-tech-stack)
9. [Scripts](#9-scripts)

---

## 1. Overview

IPA Marketing Agency website — static Next.js 15 frontend paired with a headless Payload CMS 3 instance. At build time the frontend fetches content from Payload (team members, services, case studies, testimonials, proof stats) and emits a fully static HTML/CSS/JS bundle. That bundle is uploaded to Hostinger via FTP by a GitHub Actions workflow.

The CMS is deployed independently to Railway and is the only piece that requires a persistent server and database. The frontend has no server component in production — everything is pre-rendered.

Key integrations:

- **Cloudinary** — images are served through Cloudinary's CDN using a custom Next.js image loader (display side only; uploads go to Payload/Railway).
- **Formspree** — powers the contact form with no backend required.
- **Mailchimp JSONP** — handles newsletter sign-ups client-side.
- **Plausible** — privacy-friendly analytics, loaded only after the user accepts the cookie consent prompt.

---

## 2. Repository Structure

```
Marketing Agency/
├── src/                          # Next.js 15 frontend
│   ├── app/                      # Pages: /, /about, /services, /work, /contact, /privacy
│   ├── components/               # UI components
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   ├── sections/             # Page-level section components
│   │   └── ui/                   # Reusable primitives (Button, Card, etc.)
│   └── lib/
│       ├── payload.ts            # safeFetch helpers — returns typed fallbacks when CMS is unreachable
│       ├── cloudinary-loader.ts  # Custom Next.js image loader (f_auto, q_auto, w_{width})
│       └── plausible.ts          # Plausible analytics initialisation
├── payload/                      # Payload CMS — deployed separately to Railway
│   ├── collections/              # TeamMembers, Services, CaseStudies, Testimonials, ProofStats, Media
│   ├── payload.config.ts         # CMS configuration
│   ├── payload-types.ts          # Hand-maintained TypeScript interfaces (shared with frontend via path alias)
│   └── seed.ts                   # Populate collections with placeholder data
├── .github/
│   └── workflows/
│       └── deploy.yml            # GitHub Actions CI/CD — build → FTP upload to Hostinger
├── .env.example                  # All required environment variables documented
├── LAUNCH-CHECKLIST.md           # Step-by-step go-live guide
└── PROGRESS.md                   # Build log and architectural decisions
```

---

## 3. Local Development

### Prerequisites

- Node.js 20+
- PostgreSQL (local install or a Railway PostgreSQL instance URL)

### Frontend Setup

```bash
cd "Marketing Agency"
npm install
cp .env.example .env.local
# Edit .env.local — see the Environment Variables section below
npm run dev        # → http://localhost:3000
```

> **Note:** The frontend builds successfully without a live CMS. All `safeFetch` calls in `src/lib/payload.ts` return typed fallback data when Payload is unreachable, so you can develop UI without running the CMS locally.

### Payload CMS Setup (optional)

```bash
cd "Marketing Agency/payload"
npm install
# Set DATABASE_URI and PAYLOAD_SECRET in your shell or a local .env file
npx tsx payload/seed.ts    # Populate collections with placeholder content
npx payload serve          # → http://localhost:3001/admin
```

---

## 4. Environment Variables

### Frontend (`.env.local`)

| Variable | Where needed | Purpose |
|---|---|---|
| `PAYLOAD_URL` | Build-time | Base URL of the Payload CMS instance (e.g. `https://your-app.railway.app`) |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Client + build | Cloudinary cloud name used by the custom image loader |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Client | Domain registered in the Plausible dashboard |
| `NEXT_PUBLIC_MAILCHIMP_URL` | Client | Mailchimp `/post-json?` JSONP endpoint URL |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Client | Full Formspree form endpoint URL |
| `NEXT_PUBLIC_SITE_URL` | Build-time | Canonical site URL — used when generating the sitemap |

### GitHub Actions Secrets

Add these under **Settings → Secrets and variables → Actions** in the repository:

| Secret | Purpose |
|---|---|
| `PAYLOAD_URL` | CMS URL injected into the build |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Plausible domain |
| `NEXT_PUBLIC_MAILCHIMP_URL` | Mailchimp JSONP endpoint |
| `NEXT_PUBLIC_FORMSPREE_ENDPOINT` | Formspree endpoint |
| `NEXT_PUBLIC_SITE_URL` | Canonical URL |
| `FTP_SERVER` | Hostinger FTP host |
| `FTP_USERNAME` | Hostinger FTP username |
| `FTP_PASSWORD` | Hostinger FTP password |

### Railway Environment Variables

Set these in the Railway dashboard for the Payload CMS service. These are **never** placed in the frontend or committed to the repository.

| Variable | Purpose |
|---|---|
| `DATABASE_URI` | PostgreSQL connection string (provided by Railway's PostgreSQL plugin) |
| `PAYLOAD_SECRET` | JWT signing secret — minimum 32 characters, randomly generated |
| `PAYLOAD_PUBLIC_SERVER_URL` | Public URL of the Railway deployment |
| `CLOUDINARY_API_KEY` | Cloudinary API key (optional — required only if Payload handles uploads) |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret |

---

## 5. Deployment

### Frontend — Automatic via GitHub Actions

Every push to `master` triggers `.github/workflows/deploy.yml`:

1. Checks out the repository.
2. Runs `npm ci` and `npm run build` with all frontend secrets injected as environment variables.
3. Uploads the `out/` directory to Hostinger via FTP into `/public_html/`.

**Manual trigger:** GitHub → Actions → *Deploy to Hostinger* → Run workflow.

**CMS-triggered rebuild:** Payload can POST a `repository_dispatch` event (event type: `cms-update`) to GitHub after content is published, which triggers the same workflow. Configure the webhook URL and a `GITHUB_TOKEN` secret in the Payload admin or directly in `payload.config.ts`.

### Payload CMS — Railway

1. Create a Railway project and add the **PostgreSQL** plugin.
2. Add the `payload/` directory as the root of a Railway service, or deploy the full repository and set the **Root Directory** to `payload/` in Railway's service settings.
3. Set all Railway environment variables listed above.
4. Railway auto-deploys on push to `master`.
5. On first launch, visit `https://your-railway-app.railway.app/admin` to create the initial admin user.

---

## 6. Content Management

Log in to the Payload admin panel at `https://your-railway-app.railway.app/admin`.

### Collections

| Collection | Purpose |
|---|---|
| **Services** | Agency services displayed on the home and services pages. Use `displayOrder` to control the sort order. |
| **Case Studies** | Work portfolio items. Tag with categories and set `status: published` to make them visible on the site. |
| **Team Members** | Displayed on the About page. Upload a headshot to the Media collection, then reference it here. Use `displayOrder` to sort. |
| **Testimonials** | Client quotes shown in the carousel on the home page. Toggle the `Active` field to show or hide individual entries. |
| **Proof Stats** | Short stat items used in the social proof strip (e.g. "10+ years in IPA"). |
| **Media** | Centralised image library shared across all collections. Always fill in the **Alt Text** field for accessibility. |

### Globals

| Global | Purpose |
|---|---|
| **Site Settings** | Firm name, hero headline and subheadline, contact email, and social media links. |

### Publishing Content

After saving content in Payload, a site rebuild is required to update the static frontend. Either:

- Push any commit to `master` to trigger the GitHub Action automatically, or
- Go to **GitHub → Actions → Deploy to Hostinger → Run workflow** to trigger manually.

---

## 7. Image Handling

- Upload source images to the **Media** collection in Payload CMS. Payload stores files on Railway's local disk — for production, attach a **persistent volume** in Railway to prevent files from being lost on redeployment.
- The Next.js frontend uses a custom Cloudinary image loader (`src/lib/cloudinary-loader.ts`). Images are served via Cloudinary's CDN with automatic format conversion (`f_auto`) and responsive sizing (`q_auto,w_{width}`), keeping the static bundle lean.
- To wire an image through Cloudinary, upload the file to your Cloudinary account and reference the resulting public path (without the Cloudinary base domain) as the `url` when creating a Media entry in Payload.
- The `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` environment variable must be set for images to load correctly in both development and production.

---

## 8. Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js 15 (static export — `output: 'export'`) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| CMS | Payload CMS 3 |
| Database | PostgreSQL (Railway plugin) |
| Frontend hosting | Hostinger (FTP upload) |
| CMS hosting | Railway |
| Image CDN | Cloudinary (custom Next.js loader) |
| Contact form | Formspree |
| Newsletter | Mailchimp JSONP |
| Analytics | Plausible (cookie-consent gated) |
| CI/CD | GitHub Actions |

---

## 9. Scripts

Run from the `Marketing Agency/` root:

```bash
npm run dev        # Start Next.js development server on http://localhost:3000
npm run build      # Production static export → out/
npm run lint       # Run ESLint checks
```

Run from `Marketing Agency/payload/` for CMS tasks:

```bash
npx tsx payload/seed.ts    # Seed all collections with placeholder data
npx payload serve          # Start Payload dev server on http://localhost:3001/admin
```
