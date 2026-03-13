'use client';

import { useState } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import type { Testimonial } from '@payload/payload-types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const [current, setCurrent] = useState(0);
  const active = testimonials[current];
  if (!testimonials.length || !active) return null;

  const prev = () => setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 md:py-32 bg-base">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <SectionHeader
            label="Client voices"
            title="What clients say"
            align="center"
            className="mb-16 mx-auto max-w-xl"
          />
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="max-w-3xl mx-auto">
            {/* Quote */}
            <div className="relative">
              {/* Opening quote mark */}
              <span
                aria-hidden="true"
                className="absolute -top-6 -left-4 text-8xl font-serif text-primary/10 leading-none select-none"
              >
                &ldquo;
              </span>

              <blockquote className="text-2xl md:text-3xl font-medium text-primary leading-relaxed tracking-tight text-center px-4">
                {active.quote}
              </blockquote>
            </div>

            {/* Author */}
            <div className="mt-10 text-center">
              <p className="font-bold text-primary">{active.authorName}</p>
              <p className="text-sm text-neutral-500 mt-0.5">
                {active.authorTitle} · {active.organization}
              </p>
            </div>

            {/* Navigation — only if more than one */}
            {testimonials.length > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 border border-neutral-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
                >
                  ←
                </button>

                {/* Dots */}
                <div className="flex gap-2">
                  {testimonials.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrent(i)}
                      aria-label={`Go to testimonial ${i + 1}`}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        i === current ? 'bg-primary w-6' : 'bg-neutral-300'
                      }`}
                    />
                  ))}
                </div>

                <button
                  onClick={next}
                  aria-label="Next testimonial"
                  className="w-10 h-10 border border-neutral-200 flex items-center justify-center text-primary hover:bg-primary hover:text-white hover:border-primary transition-colors duration-200"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
