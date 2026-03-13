import Button from '@/components/ui/Button';
import ScrollReveal from '@/components/ui/ScrollReveal';
import type { SiteSettings } from '@payload/payload-types';

interface CTABannerProps {
  settings: SiteSettings;
}

export default function CTABanner({ settings }: CTABannerProps) {
  return (
    <section className="bg-primary py-20 md:py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-10">
            <div className="max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50 mb-4">
                Ready to start?
              </p>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
                Let&rsquo;s talk about your next campaign.
              </h2>
              <p className="text-white/60 text-lg leading-relaxed">
                Whether you need a strategy review, agency support, or team training — we can help.
                {settings.contactEmail && (
                  <>
                    {' '}Reach us directly at{' '}
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="text-white underline underline-offset-4 hover:text-white/80 transition-colors"
                    >
                      {settings.contactEmail}
                    </a>
                    .
                  </>
                )}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <Button
                href="/contact"
                variant="white"
                size="lg"
              >
                Get in touch
              </Button>
              <Button
                href="/work"
                variant="secondary"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                See case studies
              </Button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
