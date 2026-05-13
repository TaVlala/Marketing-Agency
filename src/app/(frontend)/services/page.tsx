import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Services — What We Offer',
  description: 'Six pillars built around the IPA investor journey — from audit and narrative to execution and ongoing advisory.',
};

export default function ServicesPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <header className="work-hero">
        <div className="work-hero__inner">
          <div className="work-hero__masthead">
            <em>Built around the IPA investor journey.</em>
            <span>Hidden Gem Marketing / 2026</span>
          </div>

          <div className="work-hero__category"><span className="bar"></span>01 — How We Work</div>
          <h1 className="work-hero__title">From hidden asset<br />to <em>investment brand</em><span className="stop">.</span></h1>

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

      {/* ── WORK FRAMEWORK ───────────────────────────────── */}
      <section className="framework" id="process">
        <div className="framework__inner">

          {/* Header */}
          <div className="framework__header">
            <div className="framework__header-left">
              <div className="framework__eyebrow"><span className="bar"></span>02 — Our Process</div>
              <h2 className="framework__title">Six structured stages that take an investment location from unexamined potential to a clear, compelling, <em>investor-ready brand.</em></h2>
            </div>
            <div className="framework__funnel">
              <span>Audit</span> <span className="arr">→</span>
              <span>Narrative</span> <span className="arr">→</span>
              <span>Strategy</span> <span className="arr">→</span>
              <span>Blueprints</span> <span className="arr">→</span>
              <span>Execution</span> <span className="arr">→</span>
              <span>Partners</span>
            </div>
          </div>

          {/* SVG Spine */}
          <div className="framework__spine">
            <svg viewBox="0 0 1200 100" preserveAspectRatio="none" height="80" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', overflow: 'visible' }}>
              <defs>
                <linearGradient id="spineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#B8924C" stopOpacity="0.15"/>
                  <stop offset="33%"  stopColor="#006A67" stopOpacity="0.35"/>
                  <stop offset="66%"  stopColor="#006A67" stopOpacity="0.35"/>
                  <stop offset="100%" stopColor="#B8924C" stopOpacity="0.50"/>
                </linearGradient>
              </defs>
              <line x1="0" y1="50" x2="1200" y2="50" stroke="url(#spineGrad)" strokeWidth="1"/>
              <g fill="#B8924C">
                <polygon points="100,43 108,50 100,57 92,50"  opacity="1"/>
                <polygon points="300,43 308,50 300,57 292,50" opacity="0.85"/>
                <polygon points="500,41 510,50 500,59 490,50" fill="#006A67" opacity="1"/>
                <polygon points="700,41 710,50 700,59 690,50" fill="#006A67" opacity="1"/>
                <polygon points="900,43 908,50 900,57 892,50" opacity="0.80"/>
                <polygon points="1100,40 1113,50 1100,60 1087,50" opacity="1"/>
              </g>
              <g stroke="rgba(184,146,76,0.2)" strokeWidth="1" strokeDasharray="4 6">
                <line x1="108"  y1="50" x2="292"  y2="50"/>
                <line x1="308"  y1="50" x2="490"  y2="50"/>
                <line x1="510"  y1="50" x2="690"  y2="50"/>
                <line x1="710"  y1="50" x2="892"  y2="50"/>
                <line x1="908"  y1="50" x2="1087" y2="50"/>
              </g>
              <g stroke="rgba(184,146,76,0.12)" strokeWidth="1">
                <line x1="100"  y1="57" x2="100"  y2="100"/>
                <line x1="300"  y1="57" x2="300"  y2="100"/>
                <line x1="500"  y1="59" x2="500"  y2="100"/>
                <line x1="700"  y1="59" x2="700"  y2="100"/>
                <line x1="900"  y1="57" x2="900"  y2="100"/>
                <line x1="1100" y1="60" x2="1100" y2="100"/>
              </g>
            </svg>
          </div>

          {/* Stage Cards */}
          <div className="framework__grid">

            <div className="framework__card">
              <span className="framework__card-num">01</span>
              <span className="framework__card-label">Audit</span>
              <div className="framework__card-rule"></div>
              <h3 className="framework__card-title">Investment Potential Audit</h3>
              <ul className="framework__card-items">
                <li>Landscape &amp; context</li>
                <li>Competitive positioning analysis</li>
                <li>Target investor mapping</li>
                <li>Visibility &amp; communication gaps</li>
              </ul>
            </div>

            <div className="framework__card">
              <span className="framework__card-num">02</span>
              <span className="framework__card-label">Narrative</span>
              <div className="framework__card-rule"></div>
              <h3 className="framework__card-title">Investment Narrative &amp; Positioning</h3>
              <ul className="framework__card-items">
                <li>Investment Vision &amp; Story</li>
                <li>Investment Logic Model</li>
                <li>Priority Sectors &amp; Investor Profiles</li>
                <li>Value Proposition Canvas</li>
                <li>Tagline / Investment Brand Promise</li>
              </ul>
            </div>

            <div className="framework__card">
              <span className="framework__card-num">03</span>
              <span className="framework__card-label">Strategy</span>
              <div className="framework__card-rule"></div>
              <h3 className="framework__card-title">Investment Communication Strategy</h3>
              <ul className="framework__card-items">
                <li>Investment Deal Flow Engine</li>
                <li>Channel &amp; campaign strategy</li>
                <li>Messaging architecture</li>
                <li>Investor journey framework</li>
              </ul>
            </div>

            <div className="framework__card">
              <span className="framework__card-num">04</span>
              <span className="framework__card-label">Blueprints</span>
              <div className="framework__card-rule"></div>
              <h3 className="framework__card-title">Execution Blueprints</h3>
              <ul className="framework__card-items">
                <li>Website &amp; digital platforms briefs</li>
                <li>Design &amp; identity briefs</li>
                <li>Media &amp; PR briefs</li>
                <li>Conferences &amp; investor outreach briefs</li>
              </ul>
            </div>

            <div className="framework__card">
              <span className="framework__card-num">05</span>
              <span className="framework__card-label">Execution</span>
              <div className="framework__card-rule"></div>
              <h3 className="framework__card-title">Guided Execution</h3>
              <ul className="framework__card-items">
                <li>Vendor supervision</li>
                <li>Campaign optimisation</li>
                <li>Investor engagement refinement</li>
                <li>Deal flow monitoring</li>
              </ul>
            </div>

            <div className="framework__card">
              <span className="framework__card-num">06</span>
              <span className="framework__card-label">Partners</span>
              <div className="framework__card-rule"></div>
              <h3 className="framework__card-title">Access to Execution Partners</h3>
              <ul className="framework__card-items">
                <li>Global media platforms</li>
                <li>Branding &amp; design studios</li>
                <li>Digital &amp; campaign agencies</li>
                <li>Investor-facing content specialists</li>
              </ul>
            </div>

          </div>

          {/* Output Banner */}
          <div className="framework__output">
            <div className="framework__output-label">The Output</div>
            <div className="framework__output-divider"></div>
            <div className="framework__output-title">
              A complete <em>investment brand</em><br />and go-to-market plan.
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
