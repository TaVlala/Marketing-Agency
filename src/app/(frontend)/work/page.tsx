import type { Metadata } from 'next';
import ScrollReveal from '@/components/ui/ScrollReveal';
import WorkGrid from '@/components/sections/WorkGrid';
import CTABanner from '@/components/sections/CTABanner';
import { getCaseStudies, getSiteSettings } from '@/lib/payload';
import type { SiteSettings, CaseStudy } from '@payload/payload-types';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected client engagements — IPA strategy, agency management, campaign audits, and best practice training.',
};

const fallbackSettings: SiteSettings = {
  id: 'fallback', firmName: 'IPA Marketing Agency', heroHeadline: '', heroSubheadline: '',
  tagline: '', contactEmail: '', socialLinks: { linkedin: '', twitter: '' },
  createdAt: '', updatedAt: '',
};

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}

export default async function WorkPage() {
  const [settings, caseStudies] = await Promise.all([
    safeFetch(getSiteSettings, fallbackSettings),
    safeFetch(getCaseStudies, [] as CaseStudy[]),
  ]);

  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 mb-6">
              Selected work
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-[1.05] tracking-tight max-w-3xl mb-8">
              Results, not reports.
            </h1>
            <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed">
              A selection of client engagements — anonymised where required. Every project starts
              with a clear brief and ends with a measurable outcome.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Work grid with client-side tag filter */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <WorkGrid caseStudies={caseStudies} />
        </div>
      </section>

      <CTABanner settings={settings} />
    </>
  );
}
