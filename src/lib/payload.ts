/**
 * Payload CMS fetch helpers.
 * These run at build time / ISR revalidation — the static site never calls
 * the CMS at runtime. Data is cached for 1 hour (revalidate: 3600) and
 * refreshed in the background by Next.js ISR.
 *
 * Each request has a 10-second AbortController timeout so a slow or
 * unresponsive Railway instance can't hang the Vercel build indefinitely.
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
const FETCH_TIMEOUT_MS = 10_000;

// ─── Core fetch helpers ───────────────────────────────────────────────────────

async function fetchCollection<T>(endpoint: string): Promise<PaginatedDocs<T>> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(`${PAYLOAD_URL}/api/${endpoint}`, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error(`[payload] collection fetch failed: /api/${endpoint} — HTTP ${res.status}`);
      throw new Error(`Payload fetch failed: /api/${endpoint} — ${res.status}`);
    }

    return res.json();
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      console.error(`[payload] collection fetch timed out after ${FETCH_TIMEOUT_MS}ms: /api/${endpoint}`);
      throw new Error(`Payload fetch timed out: /api/${endpoint}`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

async function fetchGlobal<T>(slug: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const res = await fetch(`${PAYLOAD_URL}/api/globals/${slug}`, {
      next: { revalidate: 3600 },
      signal: controller.signal,
    });

    if (!res.ok) {
      console.error(`[payload] global fetch failed: ${slug} — HTTP ${res.status}`);
      throw new Error(`Payload global fetch failed: ${slug} — ${res.status}`);
    }

    return res.json();
  } catch (err) {
    if ((err as Error).name === 'AbortError') {
      console.error(`[payload] global fetch timed out after ${FETCH_TIMEOUT_MS}ms: ${slug}`);
      throw new Error(`Payload global fetch timed out: ${slug}`);
    }
    throw err;
  } finally {
    clearTimeout(timer);
  }
}

// ─── Shared safeFetch — use in pages to degrade gracefully when Payload is down ─

/**
 * Wraps a Payload fetch so the page can still build when the CMS is
 * temporarily unavailable. Logs all failures to stderr so they're visible
 * in Vercel build logs, and returns `fallback` instead of crashing.
 *
 * Usage:
 *   const services = await safeFetch(getServices, [], 'getServices');
 */
export async function safeFetch<T>(
  fn: () => Promise<T>,
  fallback: T,
  label = 'unknown'
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    console.error(`[payload:safeFetch] "${label}" failed at build time — using fallback data:`, err);
    return fallback;
  }
}

// ─── Collection helpers ───────────────────────────────────────────────────────

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
