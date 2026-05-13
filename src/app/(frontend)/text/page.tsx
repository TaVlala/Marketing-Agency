import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services — What We Offer',
  description: 'Six pillars built around the IPA investor journey — from audit and narrative to execution and ongoing advisory.',
};

export default function TextPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <header className="work-hero">
        <div className="work-hero__inner">
          <div className="work-hero__masthead">
            <span>HGM &nbsp;·&nbsp; Services</span>
            <em>Built around the IPA investor journey.</em>
            <span>Hidden Gem Marketing / 2026</span>
          </div>

          <div className="work-hero__category"><span className="bar"></span>What We Offer</div>
          <h1 className="work-hero__title">Six pillars<span className="stop">.</span> <em>One</em> partner.</h1>

          <div className="work-hero__sub">
            <p className="work-hero__lede">
              A full-service menu built around the <em>IPA investor journey</em> — from understanding your investment potential to ongoing advisory and execution support.
            </p>
          </div>
        </div>
      </header>

      {/* ── WHAT WE OFFER ────────────────────────────────── */}
      <section className="section services" id="services">
        <div className="services__grid-bg" aria-hidden="true"></div>
        <div className="section__inner">
          <div className="section__head reveal">
            <div>
              <div className="section__num"><span className="bar"></span>01 — Capabilities</div>
              <h2 className="section__title"><span className="light">What</span> <em>we offer</em>.</h2>
            </div>
            <div className="section__head-meta">
              Six pillars
              <strong>One senior partner.</strong>
            </div>
          </div>

          <div className="services__grid">
            <div className="service reveal">
              <div className="service__num">01<small>Audit</small></div>
              <h3 className="service__title">Investment Potential<br /><em>Audit</em></h3>
              <p className="service__obj">Develop a clear, evidence-based understanding of your destination&apos;s investment potential, market position, and current visibility.</p>
              <ul className="service__list">
                <li>Investment landscape &amp; context</li>
                <li>Competitive positioning analysis</li>
                <li>Investment Readiness Assessment</li>
                <li>Target investor mapping</li>
                <li>Visibility &amp; communication gaps</li>
              </ul>
            </div>
            <div className="service reveal" style={{ '--rd': '100ms' } as React.CSSProperties}>
              <div className="service__num">02<small>Narrative</small></div>
              <h3 className="service__title">Investment Narrative<br /><em>&amp; Positioning</em></h3>
              <p className="service__obj">Transform insights into a clear, investor-centric narrative that positions your destination competitively in the global investment landscape.</p>
              <ul className="service__list">
                <li>Investment Vision &amp; Story</li>
                <li>Investment Logic Model</li>
                <li>Priority Sectors &amp; Investor Profiles</li>
                <li>Investment Value Proposition Canvas</li>
                <li>Tagline / Investment Brand Promise</li>
              </ul>
            </div>
            <div className="service reveal" style={{ '--rd': '200ms' } as React.CSSProperties}>
              <div className="service__num">03<small>Strategy</small></div>
              <h3 className="service__title">Investment Communication<br /><em>Strategy</em></h3>
              <p className="service__obj">Design a structured system to attract, engage, and convert investors using the narrative and positioning defined earlier.</p>
              <ul className="service__list">
                <li>Investment Deal Flow Engine</li>
                <li>Channel &amp; campaign strategy</li>
                <li>Messaging architecture</li>
                <li>Investor journey framework</li>
              </ul>
            </div>
            <div className="service reveal">
              <div className="service__num">04<small>Blueprints</small></div>
              <h3 className="service__title">Execution<br /><em>Blueprints</em></h3>
              <p className="service__obj">Provide clear, actionable instructions for implementation partners and internal teams.</p>
              <ul className="service__list">
                <li>Website &amp; digital platforms briefs</li>
                <li>Design &amp; identity briefs</li>
                <li>Media &amp; PR briefs</li>
                <li>Conferences &amp; investor outreach briefs</li>
              </ul>
            </div>
            <div className="service reveal" style={{ '--rd': '100ms' } as React.CSSProperties}>
              <div className="service__num">05<small>Execution</small></div>
              <h3 className="service__title">Guided<br /><em>Execution</em></h3>
              <p className="service__obj">Support implementation and ensure the strategy translates into measurable investor engagement.</p>
              <ul className="service__list">
                <li>Vendor supervision</li>
                <li>Campaign optimisation</li>
                <li>Investor engagement refinement</li>
                <li>Deal flow monitoring</li>
              </ul>
            </div>
            <div className="service reveal" style={{ '--rd': '200ms' } as React.CSSProperties}>
              <div className="service__num">06<small>Partners</small></div>
              <h3 className="service__title">Access to Execution<br /><em>Partners</em></h3>
              <p className="service__obj">We connect you with global media platforms, design studios, and digital agencies aligned with your strategy from day one.</p>
              <ul className="service__list">
                <li>Global media platforms</li>
                <li>Design &amp; branding studios</li>
                <li>Digital &amp; campaign agencies</li>
                <li>Investor-facing content specialists</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW WE WORK ──────────────────────────────────── */}
      <section className="process" id="process">
        <div className="process__inner">
          <div className="process__head reveal">
            <h2 className="process__title">How we <em>work</em>.</h2>
            <p className="process__intro">
              A six-phase engagement, scoped to each IPA.
            </p>
          </div>

          <div className="steps">
            <div className="step reveal">
              <div className="step__node"></div>
              <div className="step__num">Phase 01</div>
              <h4 className="step__title"><em>Onboarding</em></h4>
              <ul className="step__list">
                <li>Kick-off call &amp; briefing</li>
                <li>Access to existing materials</li>
                <li>Priorities &amp; quick wins agreed</li>
              </ul>
            </div>
            <div className="step reveal" style={{ '--rd': '100ms' } as React.CSSProperties}>
              <div className="step__node"></div>
              <div className="step__num">Phase 02</div>
              <h4 className="step__title">Diagnose</h4>
              <ul className="step__list">
                <li>Desk research (economy, sectors, competitors)</li>
                <li>Stakeholder interviews (IPA, policymakers)</li>
                <li>Investor insights (existing &amp; target)</li>
                <li>Marketing &amp; visibility audit</li>
              </ul>
            </div>
            <div className="step reveal" style={{ '--rd': '200ms' } as React.CSSProperties}>
              <div className="step__node"></div>
              <div className="step__num">Phase 03</div>
              <h4 className="step__title"><em>Define</em></h4>
              <ul className="step__list">
                <li>Strategic workshops (vision, sectors, targeting)</li>
                <li>Investment story &amp; positioning development</li>
                <li>Investment Logic Model (Why / How / What)</li>
                <li>Value Proposition Canvas (by investor profiles)</li>
              </ul>
            </div>
            <div className="step reveal" style={{ '--rd': '300ms' } as React.CSSProperties}>
              <div className="step__node"></div>
              <div className="step__num">Phase 04</div>
              <h4 className="step__title">Activate</h4>
              <ul className="step__list">
                <li>Investor journey mapping</li>
                <li>Channel strategy (digital, media, events)</li>
                <li>Messaging architecture</li>
              </ul>
            </div>
            <div className="step reveal" style={{ '--rd': '400ms' } as React.CSSProperties}>
              <div className="step__node"></div>
              <div className="step__num">Phase 05</div>
              <h4 className="step__title"><em>Implement</em></h4>
              <ul className="step__list">
                <li>Website &amp; digital platform briefs</li>
                <li>Design &amp; identity briefs</li>
                <li>Media &amp; outreach briefs</li>
                <li>Conference &amp; activation guidelines</li>
              </ul>
            </div>
            <div className="step reveal" style={{ '--rd': '500ms' } as React.CSSProperties}>
              <div className="step__node"></div>
              <div className="step__num">Phase 06</div>
              <h4 className="step__title">Advisory</h4>
              <ul className="step__list">
                <li>Vendor alignment &amp; supervision</li>
                <li>Campaign optimisation</li>
                <li>Investor engagement refinement</li>
                <li>Deal flow monitoring</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="work-cta">
        <div className="work-cta__inner">
          <div>
            <h2 className="work-cta__title">Ready to <em>start</em>?</h2>
          </div>
          <Link href="/#contact" className="work-cta__btn">Start a conversation <span className="arrow">→</span></Link>
        </div>
      </section>
    </>
  );
}
