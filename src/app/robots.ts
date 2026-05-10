import type { MetadataRoute } from 'next';

// force-dynamic: env var is only available on Vercel at request time,
// not during Railway's build step — avoids build-time throw.
export const dynamic = 'force-dynamic';

export default function robots(): MetadataRoute.Robots {
  const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';

  if (!rawUrl.startsWith('http') && process.env.NODE_ENV === 'production') {
    console.warn(
      '[robots.ts] NEXT_PUBLIC_SITE_URL is not set or invalid in production. ' +
      'Set it to your production URL (e.g. https://ipamarketing.co.uk) in Vercel environment variables.'
    );
  }

  const BASE_URL = rawUrl.startsWith('http') ? rawUrl : 'http://localhost:3000';

  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
