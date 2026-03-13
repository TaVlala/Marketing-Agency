import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import type { CaseStudy, CaseStudyTag } from '@payload/payload-types';

interface FeaturedWorkProps {
  caseStudies: CaseStudy[];
}

const tagLabels: Record<CaseStudyTag, string> = {
  strategy: 'Strategy',
  audit: 'Audit',
  training: 'Training',
  'agency-management': 'Agency Management',
};

export default function FeaturedWork({ caseStudies }: FeaturedWorkProps) {
  // Show max 3 on homepage
  const featured = caseStudies.slice(0, 3);
  if (!featured.length) return null;

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <SectionHeader
              label="Selected work"
              title="Results, not reports."
              subtitle="A selection of client engagements — anonymised where required."
            />
            <Button href="/work" variant="secondary" className="shrink-0 self-start md:self-auto">
              View all work
            </Button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-neutral-200">
          {featured.map((study, i) => (
            <ScrollReveal key={study.id} delay={i * 100}>
              <article className="p-8 md:p-10 border-r border-b border-neutral-200 md:last:border-r-0 flex flex-col h-full group hover:bg-neutral-50 transition-colors duration-200">
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(study.tags ?? []).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-accent border border-accent px-2 py-0.5"
                    >
                      {tagLabels[tag]}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-primary tracking-tight mb-3 leading-snug">
                  {study.title}
                </h3>

                {/* Client / Region */}
                <p className="text-sm text-neutral-400 mb-5">
                  {study.client}
                  {study.region ? ` · ${study.region}` : ''}
                </p>

                {/* Challenge — truncated */}
                <p className="text-sm text-neutral-500 leading-relaxed mb-6 flex-1">
                  {study.challenge}
                </p>

                {/* Outcome highlight */}
                <div className="border-l-2 border-accent pl-4 mt-auto">
                  <p className="text-sm font-semibold text-primary leading-snug">
                    {study.outcome}
                  </p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
