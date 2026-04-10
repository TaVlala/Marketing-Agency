'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';

const offerings = [
  {
    title: 'Strategic Planning',
    description:
      'Map business objectives to measurable marketing outcomes using IPA-aligned planning frameworks.',
    hoverBg: '#0F1F3D',
  },
  {
    title: 'Agency Selection',
    description:
      'Rigorous briefing, pitch management, and chemistry processes to find your ideal creative partner.',
    hoverBg: '#1B4332',
  },
  {
    title: 'Campaign Audits',
    description:
      'Independent end-to-end reviews of live or completed campaigns — with clear, actionable findings.',
    hoverBg: '#92400E',
  },
  {
    title: 'Performance Measurement',
    description:
      'Build frameworks that measure what truly matters: contribution, efficiency, and brand health.',
    hoverBg: '#1E3A5F',
  },
  {
    title: 'Best Practice Training',
    description:
      'Hands-on IPA workshops that build strategic marketing capability across your whole team.',
    hoverBg: '#3D1F5C',
  },
  {
    title: 'Stakeholder Reporting',
    description:
      'Boardroom-ready reporting that translates marketing activity into commercial language.',
    hoverBg: '#0F3D3D',
  },
];

export default function OfferingsSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-24 md:py-32 bg-base-dark">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <SectionHeader
            label="Our expertise"
            title="What we offer"
            subtitle="Six core disciplines that cover every stage of the marketing lifecycle."
            className="mb-16"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-neutral-200">
          {offerings.map((item, i) => {
            const isHovered = hoveredIndex === i;
            return (
              <ScrollReveal key={item.title} delay={i * 70}>
                <div
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  style={{
                    backgroundColor: isHovered ? item.hoverBg : '#F5F0EB',
                    transition: 'background-color 0.35s ease, transform 0.35s ease',
                    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
                  }}
                  className="p-8 md:p-10 cursor-default h-full"
                >
                  {/* Number */}
                  <span
                    style={{
                      color: isHovered ? 'rgba(255,255,255,0.35)' : undefined,
                      transition: 'color 0.35s ease',
                    }}
                    className={`block text-xs font-semibold tracking-widest uppercase mb-6 ${
                      isHovered ? '' : 'text-accent'
                    }`}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Title */}
                  <h3
                    style={{
                      color: isHovered ? '#FFFFFF' : undefined,
                      transition: 'color 0.35s ease',
                    }}
                    className={`text-xl font-bold tracking-tight mb-3 ${
                      isHovered ? '' : 'text-primary'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p
                    style={{
                      color: isHovered ? 'rgba(255,255,255,0.75)' : undefined,
                      transition: 'color 0.35s ease',
                    }}
                    className={`text-sm leading-relaxed ${
                      isHovered ? '' : 'text-neutral-500'
                    }`}
                  >
                    {item.description}
                  </p>

                  {/* Arrow indicator */}
                  <div
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateX(0)' : 'translateX(-8px)',
                      transition: 'opacity 0.35s ease, transform 0.35s ease',
                      color: '#FFFFFF',
                    }}
                    className="mt-6 text-lg font-light"
                    aria-hidden="true"
                  >
                    →
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
