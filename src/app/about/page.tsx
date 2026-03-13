import type { Metadata } from 'next';
import Image from 'next/image';
import ScrollReveal from '@/components/ui/ScrollReveal';
import SectionHeader from '@/components/ui/SectionHeader';
import CTABanner from '@/components/sections/CTABanner';
import { getTeamMembers, getSiteSettings } from '@/lib/payload';
import type { SiteSettings, TeamMember } from '@payload/payload-types';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Meet the team behind IPA Marketing Agency — experienced practitioners in IPA frameworks, agency management, and campaign effectiveness.',
};

const fallbackSettings: SiteSettings = {
  id: 'fallback', firmName: 'IPA Marketing Agency', heroHeadline: '', heroSubheadline: '',
  tagline: '', contactEmail: '', socialLinks: { linkedin: '', twitter: '' },
  createdAt: '', updatedAt: '',
};

async function safeFetch<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try { return await fn(); } catch { return fallback; }
}

export default async function AboutPage() {
  const [settings, team] = await Promise.all([
    safeFetch(getSiteSettings, fallbackSettings),
    safeFetch(getTeamMembers, [] as TeamMember[]),
  ]);

  return (
    <>
      {/* Page header */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-28">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <ScrollReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 mb-6">
              Who we are
            </p>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-primary leading-[1.05] tracking-tight max-w-3xl mb-8">
              IPA expertise, applied with intent.
            </h1>
            <p className="text-xl text-neutral-500 max-w-2xl leading-relaxed">
              We are a specialist consultancy built around one purpose: helping organisations get
              more from their marketing investment through the rigour of IPA best practice.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Mission strip */}
      <section className="border-t border-b border-neutral-200 py-16 md:py-20 bg-white">
        <div className="max-w-screen-xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
            {[
              {
                label: 'Our mission',
                text: 'To bring IPA measurement standards and effectiveness thinking to every client engagement — regardless of sector or scale.',
              },
              {
                label: 'Our approach',
                text: 'Practical over theoretical. We work alongside teams, not just in reports. Every recommendation is grounded in evidence and deliverable.',
              },
              {
                label: 'Our values',
                text: 'Rigour, clarity, and candour. We tell clients what they need to hear, backed by the IPA frameworks that prove it.',
              },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 80}>
                <div className={`py-8 md:py-0 ${i === 0 ? 'md:pr-10' : i === 1 ? 'md:px-10' : 'md:pl-10'}`}>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-400 mb-3">
                    {item.label}
                  </p>
                  <p className="text-base text-neutral-600 leading-relaxed">{item.text}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {team.length > 0 && (
        <section className="py-24 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <SectionHeader
                label="The team"
                title="People behind the work"
                className="mb-16"
              />
            </ScrollReveal>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
              {team.map((member, i) => (
                <ScrollReveal key={member.id} delay={i * 80}>
                  <div className="flex flex-col">
                    {/* Photo */}
                    <div className="w-full aspect-[4/5] bg-neutral-100 mb-6 overflow-hidden">
                      {member.photo && typeof member.photo === 'object' && member.photo.url ? (
                        <Image
                          src={member.photo.url}
                          alt={member.photo.alt || member.name}
                          width={400}
                          height={500}
                          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                        />
                      ) : (
                        /* Placeholder silhouette */
                        <div className="w-full h-full flex items-end justify-center pb-0">
                          <svg viewBox="0 0 200 250" fill="none" className="w-2/3 text-neutral-300" aria-hidden="true">
                            <circle cx="100" cy="80" r="45" fill="currentColor" />
                            <path d="M10 250 Q10 150 100 150 Q190 150 190 250Z" fill="currentColor" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Info */}
                    <h3 className="text-xl font-bold text-primary tracking-tight mb-1">
                      {member.name}
                    </h3>
                    <p className="text-sm font-medium text-accent uppercase tracking-[0.1em] mb-3">
                      {member.role}
                    </p>
                    <p className="text-sm text-neutral-500 leading-relaxed mb-4">{member.bio}</p>
                    {member.linkedinUrl && (
                      <a
                        href={member.linkedinUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold uppercase tracking-[0.12em] text-primary hover:text-accent transition-colors"
                      >
                        LinkedIn →
                      </a>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fallback if no team data yet */}
      {team.length === 0 && (
        <section className="py-24 md:py-32">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12">
            <ScrollReveal>
              <SectionHeader label="The team" title="People behind the work" className="mb-8" />
              <p className="text-neutral-500">Team profiles coming soon.</p>
            </ScrollReveal>
          </div>
        </section>
      )}

      <CTABanner settings={settings} />
    </>
  );
}
