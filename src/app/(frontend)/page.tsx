import HeroSection from '@/components/HeroSection';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

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
            <div className="section__head-meta">
              Four capabilities
              <strong>One senior partner.</strong>
            </div>
          </div>

          <div className="services__grid">
            <div className="service reveal">
              <div className="service__num">01<small>Brand</small></div>
              <h3 className="service__title">Brand <em>+</em> Positioning</h3>
              <ul className="service__list">
                <li>Brand identity exercises</li>
                <li>Brand audit &amp; benchmark</li>
                <li>Investment narrative &amp; country story</li>
                <li>Sector value proposition design</li>
                <li>Brand platform &amp; guidelines</li>
                <li>Visual identity systems</li>
              </ul>
            </div>
            <div className="service reveal" style={{ '--rd': '100ms' } as React.CSSProperties}>
              <div className="service__num">02<small>Strategy</small></div>
              <h3 className="service__title"><em>FDI</em> Marketing Strategy</h3>
              <ul className="service__list">
                <li>Sector &amp; target market analysis</li>
                <li>Competitive positioning</li>
                <li>FDI marketing strategy</li>
                <li>Action plan &amp; roadmap</li>
                <li>KPI &amp; measurement framework</li>
                <li>Board reporting structure</li>
              </ul>
            </div>
            <div className="service reveal" style={{ '--rd': '200ms' } as React.CSSProperties}>
              <div className="service__num">03<small>Execution</small></div>
              <h3 className="service__title">Campaigns <em>that</em> Land</h3>
              <ul className="service__list">
                <li>LinkedIn content engine</li>
                <li>SEO &amp; website optimisation</li>
                <li>Paid campaigns (LinkedIn + Google)</li>
                <li>Lead-generation landing pages</li>
                <li>Email marketing &amp; newsletters</li>
                <li>Campaign management &amp; reporting</li>
              </ul>
            </div>
            <div className="service reveal" style={{ '--rd': '300ms' } as React.CSSProperties}>
              <div className="service__num">04<small>Access</small></div>
              <h3 className="service__title">Senior <em>Counsel</em></h3>
              <ul className="service__list">
                <li>Media liaison (Bloomberg, Reuters, fDi…)</li>
                <li>Sponsored content management</li>
                <li>Investor targeting &amp; outreach</li>
                <li>Trade fair &amp; event strategy</li>
                <li>Thought leadership placement</li>
                <li>Board &amp; CEO advisory</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────── */}
      <section className="process" id="process">
        <div className="process__inner">
          <div className="process__head reveal">
            <h2 className="process__title">How we <em>work</em>.</h2>
            <p className="process__intro">
              A four-phase framework, scoped to each IPA. Every engagement begins with a no-commitment discovery call.
            </p>
          </div>

          <div className="steps">
            <div className="step reveal">
              <div className="step__node"></div>
              <div className="step__num">Phase 01</div>
              <h4 className="step__title"><em>Discover</em></h4>
              <div className="step__when">Weeks 1 — 2</div>
              <p className="step__body">Listening sessions, board context, brief diagnosis. We agree the problem before we propose the work.</p>
            </div>
            <div className="step reveal" style={{ '--rd': '100ms' } as React.CSSProperties}>
              <div className="step__node"></div>
              <div className="step__num">Phase 02</div>
              <h4 className="step__title">Diagnose</h4>
              <div className="step__when">Weeks 3 — 6</div>
              <p className="step__body">Capability, campaign, and spend audit. A written diagnostic and costed plan — yours to keep.</p>
            </div>
            <div className="step reveal" style={{ '--rd': '200ms' } as React.CSSProperties}>
              <div className="step__node"></div>
              <div className="step__num">Phase 03</div>
              <h4 className="step__title"><em>Build</em></h4>
              <div className="step__when">Months 2 — 4</div>
              <p className="step__body">Positioning, brand system, and the first campaign — built, launched, and handed over.</p>
            </div>
            <div className="step reveal" style={{ '--rd': '300ms' } as React.CSSProperties}>
              <div className="step__node"></div>
              <div className="step__num">Phase 04</div>
              <h4 className="step__title">Always-On</h4>
              <div className="step__when">Month 5 +</div>
              <p className="step__body">Optional retained partnership. Monthly cadence, quarterly board reporting, ongoing optimisation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────────── */}
      <section className="section contact" id="contact">
        <div className="section__inner">
          <div className="section__head reveal">
            <div>
              <div className="section__num"><span className="bar"></span>05 — Get in touch</div>
              <h2 className="section__title"><span className="light">Let&apos;s</span> <em>talk</em>.</h2>
            </div>
            <div className="section__head-meta">
              Discovery call
              <strong>No commitment.</strong>
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
