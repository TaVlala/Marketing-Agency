/**
 * Payload CMS generated types — hand-maintained to match payload.config.ts collections.
 * Regenerate by running: npx payload generate:types (requires DB connection).
 */

export interface Config {
  collections: {
    users: User;
    media: Media;
    'team-members': TeamMember;
    services: Service;
    'case-studies': CaseStudy;
    testimonials: Testimonial;
    'proof-stats': ProofStat;
  };
  globals: {
    'site-settings': SiteSettings;
  };
}

// ─── Users ────────────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

// ─── Media ────────────────────────────────────────────────────────────────────

export interface Media {
  id: string;
  alt: string;
  url?: string;
  filename?: string;
  mimeType?: string;
  filesize?: number;
  width?: number;
  height?: number;
  createdAt: string;
  updatedAt: string;
}

// ─── Team Members ─────────────────────────────────────────────────────────────

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  photo?: Media | string | null;
  linkedinUrl?: string | null;
  displayOrder?: number | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Services ─────────────────────────────────────────────────────────────────

export interface Service {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
  displayOrder?: number | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Case Studies ─────────────────────────────────────────────────────────────

export type CaseStudyTag = 'strategy' | 'audit' | 'training' | 'agency-management';
export type CaseStudyStatus = 'draft' | 'published';

export interface CaseStudy {
  id: string;
  title: string;
  client: string;
  region?: string | null;
  challenge: string;
  approach: string;
  outcome: string;
  tags?: CaseStudyTag[] | null;
  status: CaseStudyStatus;
  createdAt: string;
  updatedAt: string;
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  organization: string;
  active?: boolean | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Proof Stats ──────────────────────────────────────────────────────────────

export interface ProofStat {
  id: string;
  label: string;
  value: string;
  displayOrder?: number | null;
  createdAt: string;
  updatedAt: string;
}

// ─── Site Settings (Global) ───────────────────────────────────────────────────

export interface SiteSettings {
  id: string;
  firmName: string;
  tagline?: string | null;
  contactEmail?: string | null;
  heroHeadline?: string | null;
  heroSubheadline?: string | null;
  socialLinks?: {
    linkedin?: string | null;
    twitter?: string | null;
  } | null;
  createdAt: string;
  updatedAt: string;
}

// ─── API Response wrappers ────────────────────────────────────────────────────

export interface PaginatedDocs<T> {
  docs: T[];
  totalDocs: number;
  limit: number;
  totalPages: number;
  page: number;
  pagingCounter: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  prevPage: number | null;
  nextPage: number | null;
}
