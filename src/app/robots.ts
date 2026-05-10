import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';

if (!rawUrl.startsWith('http') && process.env.NODE_ENV === 'production') {
  throw new Error(
    '[robots.ts] NEXT_PUBLIC_SITE_URL is not set or invalid in production.\n' +
    'Set it to your production URL (e.g. https://ipamarketing.co.uk) in Vercel environment variables.'
  );
}

const BASE_URL = rawUrl.startsWith('http') ? rawUrl : 'http://localhost:3000';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
