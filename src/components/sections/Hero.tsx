import Button from '@/components/ui/Button';
import type { SiteSettings } from '@payload/payload-types';

interface HeroProps {
  settings: SiteSettings;
}

export default function Hero({ settings }: HeroProps) {
  const headline = settings.heroHeadline || 'IPA marketing that actually works.';
  const subheadline =
    settings.heroSubheadline ||
    'We help organisations navigate IPA frameworks, select the right agencies, and run campaigns that deliver measurable results.';

  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Subtle dot-grid background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, #0f1f3d10 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative w-full max-w-screen-xl mx-auto px-6 md:px-12 py-32 md:py-44">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 mb-6">
            IPA Marketing Consultancy
          </p>

          {/* Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-[1.05] tracking-tight mb-8">
            {headline}
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-neutral-500 leading-relaxed mb-12 max-w-2xl">
            {subheadline}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/contact" size="lg">
              Talk to us
            </Button>
            <Button href="/work" variant="secondary" size="lg">
              See our work
            </Button>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, var(--color-base), transparent)',
        }}
      />
    </section>
  );
}
