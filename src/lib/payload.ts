/**
 * Payload CMS fetch helpers.
 * These run at build time only — the static site never calls the CMS at runtime.
 */

import type {
  Service,
  TeamMember,
  CaseStudy,
  Testimonial,
  ProofStat,
  SiteSettings,
  PaginatedDocs,
} from '@payload/payload-types';

const PAYLOAD_URL = process.env.PAYLOAD_URL || 'http://localhost:3000';

async function fetchCollection<T>(endpoint: string): Promise<PaginatedDocs<T>> {
  const res = await fetch(`${PAYLOAD_URL}/api/${endpoint}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error(`Payload fetch failed: /api/${endpoint} — ${res.status}`);
  }
  return res.json();
}

async function fetchGlobal<T>(slug: string): Promise<T> {
  const res = await fetch(`${PAYLOAD_URL}/api/globals/${slug}`, {
    next: { revalidate: 0 },
  });
  if (!res.ok) {
    throw new Error(`Payload global fetch failed: ${slug} — ${res.status}`);
  }
  return res.json();
}

export async function getServices(): Promise<Service[]> {
  const data = await fetchCollection<Service>('services?limit=100&sort=displayOrder');
  return data.docs;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  const data = await fetchCollection<TeamMember>('team-members?limit=100&sort=displayOrder');
  return data.docs;
}

export async function getCaseStudies(): Promise<CaseStudy[]> {
  const data = await fetchCollection<CaseStudy>(
    'case-studies?where[status][equals]=published&limit=100'
  );
  return data.docs;
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const data = await fetchCollection<Testimonial>(
    'testimonials?where[active][equals]=true&limit=100'
  );
  return data.docs;
}

export async function getProofStats(): Promise<ProofStat[]> {
  const data = await fetchCollection<ProofStat>('proof-stats?limit=100&sort=displayOrder');
  return data.docs;
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return fetchGlobal<SiteSettings>('site-settings');
}
