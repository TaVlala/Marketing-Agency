import type { Metadata } from 'next';
import ScrollReveal from '@/components/ui/ScrollReveal';
import CTABanner from '@/components/sections/CTABanner';
import { getServices, getSiteSettings } from '@/lib/payload';
import type { SiteSettings, Service } from '@payload/payload-types';

export const metadata: Metadata = {
  title: 'Services',
  description:
    'IPA marketing strategy, agency selection and management, campaign audits, and best practice training.',
};

const fallbackSettings: SiteSettings = {
  id: 'fallback', firmName: 'IPA Marketing Agency', heroHeadline: '', heroSubheadline: '',
  tagline: '', contactEmail: '', socialLinks: { linkedin: '', twitter: '' },
  createdAt: '', updatedAt: '',
};

const fallbackServices: Service[] = [
  { id: '1', title: 'IPA Marketing Strategy', description: 'Develop IPA-aligned marketing strategies that connect objectives to measurable outcomes.', displayOrder: 1, createdAt: '', updatedAt: '' },
  { id: '2', title: 'Agency Selection & Management', description: 'Find the right agency partners and manage relationships for consistent performance.', displayOrder: 2, createdAt: '', updatedAt: '' },
  { id: '3', title: 'Campaign Audits & Reviews', description: 'Independent reviews of live or completed campaigns with actionable recommendations.', displayOrder: 3, createdAt: '', updatedAt: '' },
  { id: '4', title: 'Best Practice Training', description: 'Hands-on workshops bringing IPA best practices to your marketing team.', displayOrder: 4, createdAt: '', updatedAt: '' },
];

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}

// Expanded detail copy per service (static — not in CMS, editorial copy)
const serviceDetails: Record<string, { what: string; who: string; deliverable: string }> = {
  'IPA Marketing Strategy': {
    what: 'We work with your team to build an IPA-compliant marketing strategy from the ground up — or audit and improve an existing one. This includes objective-setting, budget allocation, channel planning, and measurement frameworks aligned to the IPA Effectiveness Databank.',
    who: 'Marketing directors, brand teams, and in-house agencies who want a strategy grounded in proven effectiveness principles rather than trend-chasing.',
    deliverable: 'Written strategy document · KPI framework · measurement plan',
  },
  'Agency Selection & Management': {
    what: 'We run structured agency selection processes — from brief writing and agency longlist through to credentials review, chemistry meetings, and final selection. Post-appointment, we help you build performance management frameworks that keep agencies accountable.',
    who: 'Organisations selecting a new creative, media, or digital agency — or those who want to restructure an existing roster for clearer accountability.',
    deliverable: 'Selection process facilitation · agency brief · scorecard · performance SLA',
  },
  'Campaign Audits & Reviews': {
    what: 'An independent review of a live or completed campaign against IPA effectiveness criteria. We analyse targeting, messaging, media mix, measurement approach, and learnings — then deliver a frank, actionable report.',
    who: 'Teams who want a second opinion on campaign performance, or organisations preparing for an IPA Effectiveness Award submission.',
    deliverable: 'Written audit report · findings presentation · priority actions',
  },
  'Best Practice Training': {
    what: 'Half-day and full-day workshops for marketing teams covering IPA best practice: briefing, agency management, campaign evaluation, and effectiveness thinking. Delivered on-site or remotely.',
    who: 'Marketing teams at all levels — from graduates to senior managers — who want structured, practical IPA knowledge.',
    deliverable: 'Tailored workshop delivery · slides and handouts · follow-up Q&A session',
  },
};

export default async function ServicesPage() {
  const [settings, services] = await Promise.all([
    safeFetch(getSiteSettings, fallbackSettings),
    safeFetch(getServices, fallbackServices),
  ]);

  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 mb-6">
              What we offer
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-[1.05] tracking-tight max-w-3xl mb-8">
              Services built around IPA rigour.
            </h1>
            <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed">
              Everything we do is grounded in IPA best practice — the same frameworks used by the
              world&rsquo;s most effective marketing organisations.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Services list */}
      <section className="pb-24 md:pb-32">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="flex flex-col divide-y divide-neutral-200 border-t border-neutral-200">
            {services.map((service, i) => {
              const detail = serviceDetails[service.title];
              return (
                <ScrollReveal key={service.id} delay={i * 60}>
                  <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 group">
                    {/* Number + title */}
                    <div className="md:col-span-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-4">
                        0{i + 1}
                      </p>
                      <h2 className="text-2xl md:text-3xl font-bold text-primary tracking-tight leading-snug">
                        {service.title}
                      </h2>
                    </div>

                    {/* Detail */}
                    <div className="md:col-span-8">
                      <p className="text-base text-neutral-600 leading-relaxed mb-8">
                        {detail?.what || service.description}
                      </p>

                      {detail && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400 mb-2">
                              Who it&rsquo;s for
                            </p>
                            <p className="text-sm text-neutral-500 leading-relaxed">{detail.who}</p>
                          </div>
                          <div>
                            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400 mb-2">
                              What you get
                            </p>
                            <p className="text-sm text-neutral-500 leading-relaxed">{detail.deliverable}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <CTABanner settings={settings} />
    </>
  );
}
