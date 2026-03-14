import type { Metadata } from 'next';
import ScrollReveal from '@/components/ui/ScrollReveal';
import ContactForm from '@/components/sections/ContactForm';
import { getSiteSettings } from '@/lib/payload';
import type { SiteSettings } from '@payload/payload-types';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Get in touch to discuss IPA marketing strategy, agency management, campaign audits, or training.',
};

const fallbackSettings: SiteSettings = {
  id: 'fallback', firmName: 'IPA Marketing Agency', heroHeadline: '', heroSubheadline: '',
  tagline: '', contactEmail: 'hello@example.com', socialLinks: { linkedin: '', twitter: '' },
  createdAt: '', updatedAt: '',
};

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}

export default async function ContactPage() {
  const settings = await safeFetch(getSiteSettings, fallbackSettings);

  return (
    <section className="pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          {/* Left — intro */}
          <ScrollReveal>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 mb-6">
                Get in touch
              </p>
              <h1 className="text-4xl md:text-5xl font-extrabold text-primary leading-tight tracking-tight mb-8">
                Let&rsquo;s talk about your next project.
              </h1>
              <p className="text-lg text-neutral-500 leading-relaxed mb-10">
                Whether you&rsquo;re looking for strategic advice, an agency review, a campaign audit,
                or team training — we&rsquo;re happy to have an initial conversation with no obligation.
              </p>

              {/* Direct contact */}
              <div className="flex flex-col gap-5">
                {settings.contactEmail && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400 mb-1">
                      Email
                    </p>
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="text-primary font-medium hover:text-accent transition-colors"
                    >
                      {settings.contactEmail}
                    </a>
                  </div>
                )}
                {settings.socialLinks?.linkedin && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400 mb-1">
                      LinkedIn
                    </p>
                    <a
                      href={settings.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary font-medium hover:text-accent transition-colors"
                    >
                      Connect on LinkedIn →
                    </a>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>

          {/* Right — form */}
          <ScrollReveal delay={120}>
            <ContactForm />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
