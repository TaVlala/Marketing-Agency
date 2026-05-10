import type { MetadataRoute } from 'next';
import { getCaseStudies, getTeamMembers } from '@/lib/payload';

// Revalidate sitemap every hour alongside other Payload data
export const revalidate = 3600;

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';

if (!rawUrl.startsWith('http') && process.env.NODE_ENV === 'production') {
  throw new Error(
    '[sitemap.ts] NEXT_PUBLIC_SITE_URL is not set or invalid in production.\n' +
    'Set it to your production URL (e.g. https://ipamarketing.co.uk) in Vercel environment variables.'
  );
}

const BASE_URL = rawUrl.startsWith('http') ? rawUrl : 'http://localhost:3000';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,         lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: `${BASE_URL}/about`,    lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/services`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/work`,     lastModified: new Date(), changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/contact`,  lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.7 },
    { url: `${BASE_URL}/privacy`,  lastModified: new Date(), changeFrequency: 'yearly',  priority: 0.3 },
  ];

  // Fetch CMS content for dynamic lastModified dates — degrade gracefully if Payload is down
  const cmsPages: MetadataRoute.Sitemap = [];
  try {
    const [caseStudies, teamMembers] = await Promise.all([
      getCaseStudies(),
      getTeamMembers(),
    ]);

    // /work page — lastModified from the most recently updated case study
    if (caseStudies.length > 0) {
      const latest = caseStudies.reduce((a, b) =>
        new Date(a.updatedAt ?? 0) > new Date(b.updatedAt ?? 0) ? a : b
      );
      const workEntry = staticPages.find(p => p.url === `${BASE_URL}/work`);
      if (workEntry) workEntry.lastModified = new Date(latest.updatedAt ?? Date.now());
    }

    // /team page — lastModified from the most recently updated team member
    if (teamMembers.length > 0) {
      const latest = teamMembers.reduce((a, b) =>
        new Date(a.updatedAt ?? 0) > new Date(b.updatedAt ?? 0) ? a : b
      );
      cmsPages.push({
        url: `${BASE_URL}/team`,
        lastModified: new Date(latest.updatedAt ?? Date.now()),
        changeFrequency: 'monthly',
        priority: 0.7,
      });
    }
  } catch (err) {
    console.error('[sitemap] failed to fetch CMS content — using static pages only:', err);
  }

  return [...staticPages, ...cmsPages];
}
