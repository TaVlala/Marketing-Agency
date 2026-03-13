import ScrollReveal from '@/components/ui/ScrollReveal';
import type { ProofStat } from '@payload/payload-types';

interface ProofStripProps {
  stats: ProofStat[];
}

export default function ProofStrip({ stats }: ProofStripProps) {
  if (!stats.length) return null;

  return (
    <section className="bg-primary py-16 md:py-20 overflow-hidden">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/10">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.id} delay={i * 60}>
              <div className="bg-primary px-8 py-10 text-center">
                <p className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-2">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-white/60 uppercase tracking-[0.12em]">
                  {stat.label}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* IPA member badge line */}
        <ScrollReveal delay={300}>
          <p className="text-center text-white/40 text-xs font-semibold uppercase tracking-[0.15em] mt-12">
            IPA Member · CPD Accredited · UK & International
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
