import Hero from '@/components/sections/Hero';
import ServicesSection from '@/components/sections/ServicesSection';
import ProofStrip from '@/components/sections/ProofStrip';
import FeaturedWork from '@/components/sections/FeaturedWork';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import SubscribeSection from '@/components/sections/SubscribeSection';
import CTABanner from '@/components/sections/CTABanner';
import {
  getSiteSettings,
  getServices,
  getProofStats,
  getCaseStudies,
  getTestimonials,
} from '@/lib/payload';
import type { SiteSettings, Service, ProofStat, CaseStudy, Testimonial } from '@payload/payload-types';

// Fallback data used when CMS is unreachable (build-time dev / no DB configured)
const fallbackSettings: SiteSettings = {
  id: 'fallback',
  firmName: 'IPA Marketing Agency',
  heroHeadline: 'IPA marketing that actually works.',
  heroSubheadline:
    'We help organisations navigate IPA frameworks, select the right agencies, and run campaigns that deliver measurable results.',
  tagline: 'Expert IPA marketing strategy, agency management, and best practice training.',
  contactEmail: '',
  socialLinks: { linkedin: '', twitter: '' },
  createdAt: '',
  updatedAt: '',
};

const fallbackServices: Service[] = [
  { id: '1', title: 'IPA Marketing Strategy', description: 'Develop IPA-aligned marketing strategies that connect objectives to measurable outcomes.', displayOrder: 1, createdAt: '', updatedAt: '' },
  { id: '2', title: 'Agency Selection & Management', description: 'Find the right agency partners and manage relationships for consistent performance.', displayOrder: 2, createdAt: '', updatedAt: '' },
  { id: '3', title: 'Campaign Audits & Reviews', description: 'Independent reviews of live or completed campaigns with actionable recommendations.', displayOrder: 3, createdAt: '', updatedAt: '' },
  { id: '4', title: 'Best Practice Training', description: 'Hands-on workshops bringing IPA best practices to your marketing team.', displayOrder: 4, createdAt: '', updatedAt: '' },
];

const fallbackStats: ProofStat[] = [
  { id: '1', label: 'Years in IPA', value: '10+', displayOrder: 1, createdAt: '', updatedAt: '' },
  { id: '2', label: 'Markets covered', value: '15+', displayOrder: 2, createdAt: '', updatedAt: '' },
  { id: '3', label: 'Campaigns audited', value: '100+', displayOrder: 3, createdAt: '', updatedAt: '' },
  { id: '4', label: 'Agencies assessed', value: '50+', displayOrder: 4, createdAt: '', updatedAt: '' },
];

/**
 * Safe fetch helper — returns fallback value if Payload is unreachable.
 * The CMS is only called at build time; the static output has no runtime dependency.
 */
async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn();
  } catch {
    return fallback;
  }
}

export default async function HomePage() {
  const [settings, services, stats, caseStudies, testimonials] = await Promise.all([
    safeFetch(getSiteSettings, fallbackSettings),
    safeFetch(getServices, fallbackServices),
    safeFetch(getProofStats, fallbackStats),
    safeFetch(getCaseStudies, [] as CaseStudy[]),
    safeFetch(getTestimonials, [] as Testimonial[]),
  ]);

  return (
    <>
      <Hero settings={settings} />
      <ServicesSection services={services} />
      <ProofStrip stats={stats} />
      <FeaturedWork caseStudies={caseStudies} />
      {testimonials.length > 0 && (
        <TestimonialsSection testimonials={testimonials} />
      )}
      <SubscribeSection />
      <CTABanner settings={settings} />
    </>
  );
}
