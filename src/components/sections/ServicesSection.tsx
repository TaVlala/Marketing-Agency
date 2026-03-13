import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import type { Service } from '@payload/payload-types';

interface ServicesSectionProps {
  services: Service[];
}

// Default SVG icons — used when a service has no icon set in CMS
const defaultIcons = [
  // Strategy
  <svg key="strategy" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
    <path d="M9 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h4" />
    <path d="M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4" />
    <line x1="12" y1="4" x2="12" y2="20" />
  </svg>,
  // Agency
  <svg key="agency" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
    <rect x="2" y="7" width="20" height="14" rx="2" />
    <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
    <line x1="12" y1="12" x2="12" y2="16" />
    <line x1="10" y1="14" x2="14" y2="14" />
  </svg>,
  // Audit
  <svg key="audit" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="15" x2="15" y2="15" />
    <line x1="9" y1="11" x2="11" y2="11" />
  </svg>,
  // Training
  <svg key="training" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7" aria-hidden="true">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>,
];

export default function ServicesSection({ services }: ServicesSectionProps) {
  if (!services.length) return null;

  return (
    <section className="py-24 md:py-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <SectionHeader
            label="What we do"
            title="Services"
            subtitle="Practical, IPA-grounded support across the full marketing lifecycle."
            className="mb-16"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 border border-neutral-200">
          {services.map((service, i) => (
            <ScrollReveal key={service.id} delay={i * 80}>
              <div className="p-8 md:p-10 border-r border-b border-neutral-200 last:border-r-0 group hover:bg-primary transition-colors duration-300 h-full">
                {/* Icon */}
                <div className="text-accent group-hover:text-white transition-colors duration-300 mb-6">
                  {service.icon ? (
                    <span dangerouslySetInnerHTML={{ __html: service.icon }} />
                  ) : (
                    defaultIcons[i % defaultIcons.length]
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-primary group-hover:text-white transition-colors duration-300 mb-3 tracking-tight">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-neutral-500 group-hover:text-neutral-300 transition-colors duration-300 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={200}>
          <div className="mt-10 flex">
            <Button href="/services" variant="ghost">
              View all services →
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
