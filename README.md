# IPA Marketing Agency

Marketing website for an IPA marketing consultancy. Built with Next.js (static export), Payload CMS, and Tailwind CSS.

## Architecture

- **Frontend**: Next.js 15 with static export (`output: 'export'`) — deployed to Hostinger as plain HTML/CSS/JS
- **CMS**: Payload CMS 3 on Railway (Node.js + PostgreSQL) — admin panel and content API
- **Images**: Cloudinary CDN with auto-format/quality optimization
- **Content rebuild**: Payload webhook → GitHub Actions → `next build` → deploy to Hostinger

## Local Development

```bash
# Clone
git clone https://github.com/TaVlala/Marketing-Agency.git
cd Marketing-Agency

# Install
npm install

# Configure environment
cp .env.example .env.local
# Fill in the PAYLOAD_URL and NEXT_PUBLIC_* values

# Run Next.js dev server
npm run dev
```

## Deployment

> Detailed deployment docs will be added in Phase 11.

### Frontend (Hostinger)
- Build: `npm run build`
- Deploy: upload `out/` folder to Hostinger

### CMS (Railway)
- Deploy Payload CMS to Railway with PostgreSQL
- Set environment variables in Railway dashboard (see `.env.example` for the full list)

## Environment Variables

See `.env.example` for all required variables with comments explaining each one.

**Important**: `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` belong in Railway only — never in the frontend environment.
