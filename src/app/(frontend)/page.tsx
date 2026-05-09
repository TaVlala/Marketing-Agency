import HeroSection from '@/components/HeroSection';
import ContactForm from '@/components/ContactForm';

export const metadata = {
  title: 'HGM · Hidden Gem Marketing — Investment Promotion. Marketing. Redefined.',
};

export default function HomePage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <HeroSection />

      {/* ── ABOUT ────────────────────────────────────────── */}
      <section className="section about" id="about">
        <div className="section__inner">
          <div className="section__head reveal">
            <div>
              <div className="section__num"><span className="bar"></span>01 — Introduction</div>
              <h2 className="section__title"><span className="light">Who</span> <em>we are</em>.</h2>
            </div>
            <div className="section__head-meta">
              Established 2026
              <strong>Boutique by design.</strong>
            </div>
          </div>

          <div className="about__grid">
            <div className="reveal">
              <p className="about__lede">
                HGM is a <em>boutique</em> marketing consultancy built for the investment promotion sector — a few partners at a time, <strong>senior attention always</strong>.
              </p>
              <div className="about__signature">
                — Founders&apos; note
                <strong>Less, but better.</strong>
              </div>
            </div>

            <div className="about__body reveal" style={{ '--rd': '160ms' } as React.CSSProperties}>
              <p>We are former IPA insiders, marketing strategists, and brand specialists who have spent the last decade inside the investment promotion machine. We know how IPAs are funded, how boards measure success, how briefs get written, and how the work actually lands on the desks of investors.</p>
              <p>So we built the agency we wished existed when we were on the other side: small, senior, accountable, and willing to challenge the brief when the brief is wrong.</p>
              <p>We do not chase scale. We chase outcomes — for a small number of agencies, a few engagements at a time.</p>
            </div>
          </div>

          <div className="about__pillars">
            <div className="pillar reveal">
              <div className="pillar__num">01 — Principle</div>
              <h3 className="pillar__title">Senior <em>always</em>.</h3>
              <p className="pillar__body">No junior teams, no handoffs. The people you meet are the people on the work.</p>
            </div>
            <div className="pillar reveal" style={{ '--rd': '100ms' } as React.CSSProperties}>
              <div className="pillar__num">02 — Principle</div>
              <h3 className="pillar__title">IPA <em>insiders</em>.</h3>
              <p className="pillar__body">A decade inside investment promotion. We speak fluent board, KPI, and ministerial review.</p>
            </div>
            <div className="pillar reveal" style={{ '--rd': '200ms' } as React.CSSProperties}>
              <div className="pillar__num">03 — Principle</div>
              <h3 className="pillar__title">Strategy <em>+</em> execution.</h3>
              <p className="pillar__body">One partner across the full arc — positioning to campaign to performance.</p>
            </div>
            <div className="pillar reveal" style={{ '--rd': '300ms' } as React.CSSProperties}>
              <div className="pillar__num">04 — Principle</div>
              <h3 className="pillar__title">Tailored, <em>not templated</em>.</h3>
              <p className="pillar__body">Every IPA is shaped by its mandate, market, and moment. Scoped from the brief, never the boilerplate.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ─────────────────────────────────────── */}
      <section className="section services" id="services">
        <div className="services__grid-bg" aria-hidden="true"></div>
        <div className="section__inner">
          <div className="section__head reveal">
            <div>
              <div className="section__num"><span className="bar"></span>02 — Capabilities</div>
              <h2 className="section__title"><span className="light">What</span> <em>we offer</em>.</h2>
            </div>
          </div>

          <div className="services__grid">
            <div className="service reveal">
              <div className="service__num">01<small>Audit</small></div>
              <h3 className="service__title">Investment Potential<br /><em>Audit</em></h3>
              <p className="service__obj">Develop a clear, evidence-based understanding of your destination&apos;s investment potential, market position, and current visibility.</p>
            </div>
            <div className="service reveal" style={{ '--rd': '100ms' } as React.CSSProperties}>
              <div className="service__num">02<small>Narrative</small></div>
              <h3 className="service__title">Narrative<br /><em>&amp; Positioning</em></h3>
              <p className="service__obj">Transform insights into a clear, investor-centric narrative that positions your destination competitively in the global investment landscape.</p>
            </div>
            <div className="service reveal" style={{ '--rd': '200ms' } as React.CSSProperties}>
              <div className="service__num">03<small>Strategy</small></div>
              <h3 className="service__title">Communication<br /><em>Strategy</em></h3>
              <p className="service__obj">Design a structured system to attract, engage, and convert investors using the narrative and positioning defined earlier.</p>
            </div>
            <div className="service reveal">
              <div className="service__num">04<small>Blueprints</small></div>
              <h3 className="service__title">Execution<br /><em>Blueprints</em></h3>
              <p className="service__obj">Provide clear, actionable instructions for implementation partners and internal teams.</p>
            </div>
            <div className="service reveal" style={{ '--rd': '100ms' } as React.CSSProperties}>
              <div className="service__num">05<small>Execution</small></div>
              <h3 className="service__title">Guided<br /><em>Execution</em></h3>
              <p className="service__obj">Support implementation and ensure the strategy translates into measurable investor engagement.</p>
            </div>
            <div className="service reveal" style={{ '--rd': '200ms' } as React.CSSProperties}>
              <div className="service__num">06<small>Partners</small></div>
              <h3 className="service__title">Access to Execution<br /><em>Partners</em></h3>
              <p className="service__obj">We connect you with global media platforms, design studios, and digital agencies aligned with your strategy from day one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section className="section contact" id="contact">
        <div className="section__inner">
          <div className="section__head reveal">
            <div>
              <h2 className="section__title"><span className="light">Let&apos;s</span> <em>talk</em>.</h2>
            </div>
          </div>

          <div className="contact__grid">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
