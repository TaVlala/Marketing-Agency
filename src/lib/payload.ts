/**
 * Payload CMS fetch helpers.
 * These run at build time only — the static site never calls the CMS at runtime.
 */

const PAYLOAD_URL = process.env.PAYLOAD_URL || 'http://localhost:3000';

async function fetchPayload<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${PAYLOAD_URL}/api/${endpoint}`, {
    next: { revalidate: 0 }, // Always fetch fresh at build time
  });

  if (!res.ok) {
    throw new Error(`Payload fetch failed: ${endpoint} — ${res.status}`);
  }

  return res.json();
}

// Collection fetchers — typed with Payload generated types in Phase 3

export async function getServices() {
  return fetchPayload('services?limit=100&sort=displayOrder');
}

export async function getTeamMembers() {
  return fetchPayload('team-members?limit=100&sort=displayOrder');
}

export async function getCaseStudies() {
  return fetchPayload('case-studies?where[status][equals]=published&limit=100');
}

export async function getTestimonials() {
  return fetchPayload('testimonials?where[active][equals]=true&limit=100');
}

export async function getProofStats() {
  return fetchPayload('proof-stats?limit=100&sort=displayOrder');
}

export async function getSiteSettings() {
  return fetchPayload('globals/site-settings');
}
