'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { CaseStudy, CaseStudyTag } from '@payload/payload-types';

interface WorkGridProps {
  caseStudies: CaseStudy[];
}

const ALL_TAGS: { label: string; value: CaseStudyTag | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Strategy', value: 'strategy' },
  { label: 'Audit', value: 'audit' },
  { label: 'Training', value: 'training' },
  { label: 'Agency Management', value: 'agency-management' },
];

const tagLabels: Record<CaseStudyTag, string> = {
  strategy: 'Strategy',
  audit: 'Audit',
  training: 'Training',
  'agency-management': 'Agency Management',
};

export default function WorkGrid({ caseStudies }: WorkGridProps) {
  const [activeFilter, setActiveFilter] = useState<CaseStudyTag | 'all'>('all');

  const filtered =
    activeFilter === 'all'
      ? caseStudies
      : caseStudies.filter((s) => s.tags?.includes(activeFilter));

  if (caseStudies.length === 0) {
    return (
      <p className="text-neutral-500 py-12">
        Case studies coming soon — check back after launch.
      </p>
    );
  }

  return (
    <>
      {/* Tag filter bar */}
      <div className="flex flex-wrap gap-2 mb-12" role="group" aria-label="Filter by service type">
        {ALL_TAGS.map((tag) => (
          <button
            key={tag.value}
            onClick={() => setActiveFilter(tag.value)}
            className={`px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] border transition-colors duration-200 ${
              activeFilter === tag.value
                ? 'bg-primary text-white border-primary'
                : 'bg-transparent text-neutral-500 border-neutral-200 hover:border-primary hover:text-primary'
            }`}
          >
            {tag.label}
            {tag.value !== 'all' && (
              <span className="ml-1.5 opacity-50">
                ({caseStudies.filter((s) => s.tags?.includes(tag.value as CaseStudyTag)).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-neutral-500 py-8">No projects match this filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-neutral-200">
          {filtered.map((study, i) => (
            <ScrollReveal key={study.id} delay={i * 60}>
              <article className="p-8 md:p-10 border-r border-b border-neutral-200 flex flex-col h-full hover:bg-neutral-50 transition-colors duration-200">
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
                <h2 className="text-xl font-bold text-primary tracking-tight mb-3 leading-snug">
                  {study.title}
                </h2>

                {/* Client / Region */}
                <p className="text-sm text-neutral-400 mb-5">
                  {study.client}
                  {study.region ? ` · ${study.region}` : ''}
                </p>

                {/* Challenge */}
                <p className="text-sm text-neutral-500 leading-relaxed mb-4">{study.challenge}</p>

                {/* Approach */}
                <p className="text-sm text-neutral-500 leading-relaxed mb-6 flex-1">{study.approach}</p>

                {/* Outcome */}
                <div className="border-l-2 border-accent pl-4 mt-auto">
                  <p className="text-xs font-semibold uppercase tracking-[0.1em] text-accent mb-1">
                    Outcome
                  </p>
                  <p className="text-sm font-semibold text-primary leading-snug">{study.outcome}</p>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      )}
    </>
  );
}
