import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Team — The People on the Work',
  description: 'A small senior team built around investment promotion. Meet the people behind HGM.',
};

export default function TeamPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <header className="team-hero">
        <div className="team-hero__inner">
          <div className="team-hero__masthead">
            <span>HGM &nbsp;·&nbsp; The Team</span>
            <em>Vol. 02 — Boutique. Senior. Always.</em>
            <span>Hidden Gem Marketing / 2026</span>
          </div>

          <div>
            <div className="team-hero__category"><span className="bar"></span>Section 02 — The People</div>
            <h1 className="team-hero__title">The <em>people</em><br />on the work<span className="stop">.</span></h1>
          </div>

          <div>
            <p className="team-hero__lede">
              HGM is built on a simple promise — <em>the senior partners you meet are the people on the work</em>. No layered teams, no junior handoffs.
            </p>
            <dl className="team-hero__meta">
              <div><dt>Founded</dt><dd>2026</dd></div>
              <div><dt>Partners</dt><dd>Two founders</dd></div>
              <div><dt>Sector</dt><dd>Investment promotion</dd></div>
              <div><dt>Engagement model</dt><dd>A few partners at a time</dd></div>
            </dl>
          </div>
        </div>
      </header>

      {/* ── TEAM ROSTER ──────────────────────────────────── */}
      <section className="team-section">
        <div className="team-section__inner">
          <div className="team__head">
            <span className="team__head-num">— 01 / The Partners</span>
            <h2 className="team__head-title">A small senior team, <em>by design</em>.</h2>
          </div>

          <div className="team__grid">

            <article className="member reveal">
              <div className="member__portrait">
                <img src="/team/eko.jpeg" alt="Eko Chubinidze" className="member__photo-img" />
              </div>
              <div className="member__body">
                <span className="member__role-eyebrow"><span className="bar"></span>Co-Founder</span>
                <h3 className="member__name">Eko Chubinidze</h3>
                <p className="member__role">— Brand Strategy &amp; Communications</p>
                <p className="member__bio">
                  Eko is a brand strategy and communications professional with extensive experience at the intersection of investment, government, and strategic communications. She played a key role in the development and positioning of Galleria Tbilisi, one of Georgia&apos;s flagship investment projects, working within the Georgian Co-Investment Fund to shape its market narrative and investor-facing communication.
                </p>
                <p className="member__bio">
                  She later served as a strategist at the Strategic Communications Center, contributing to high-level communication frameworks and national messaging initiatives. As Client Service Director at Leavingstone — one of the most awarded creative and digital agencies in the region — she led complex, multi-stakeholder projects, aligning strategy, creative execution, and measurable outcomes for both public and private sector clients.
                </p>
                <p className="member__bio">
                  Her work is defined by the ability to translate complex economic and strategic contexts into clear, compelling narratives that support positioning, visibility, and engagement.
                </p>
                <dl className="member__facts">
                  <div className="member__fact"><dt>Based</dt><dd>Tbilisi</dd></div>
                  <div className="member__fact"><dt>Focus</dt><dd>Brand Strategy · Communications</dd></div>
                  <div className="member__fact"><dt>Prior</dt><dd>Georgian Co-Investment Fund · Leavingstone</dd></div>
                </dl>
              </div>
            </article>

            <article className="member reveal" style={{ '--rd': '80ms' } as React.CSSProperties}>
              <div className="member__portrait">
                <img src="/team/david.jpeg" alt="David Tavlalashvili" className="member__photo-img" />
              </div>
              <div className="member__body">
                <span className="member__role-eyebrow"><span className="bar"></span>Co-Founder</span>
                <h3 className="member__name">David Tavlalashvili</h3>
                <p className="member__role">— Investment Strategy &amp; FDI</p>
                <p className="member__bio">
                  David is an investment promotion professional with over a decade of hands-on experience at the intersection of FDI strategy, investor relations, and location marketing. The majority of his career was spent at Enterprise Georgia — Georgia&apos;s national investment promotion agency — where he rose to Head of Investment Department, leading investment attraction and aftercare strategy at the institutional level.
                </p>
                <p className="member__bio">
                  Over the years, he has facilitated multi-billion dollar investment projects across key sectors, and collaborated with international media and marketing agencies on major promotional campaigns. That combination of institutional depth and agency-side exposure gives him a rare vantage point: a firsthand understanding of what it actually takes to communicate a country&apos;s investment proposition — and where most efforts fall short.
                </p>
                <p className="member__bio">
                  At HGM, David leads client strategy and the investment narrative, grounding every engagement in the operational realities of FDI.
                </p>
                <dl className="member__facts">
                  <div className="member__fact"><dt>Based</dt><dd>Tbilisi</dd></div>
                  <div className="member__fact"><dt>Focus</dt><dd>FDI Strategy · Investor Relations</dd></div>
                  <div className="member__fact"><dt>Prior</dt><dd>Enterprise Georgia · Head of Investment</dd></div>
                </dl>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* ── PRINCIPLES ───────────────────────────────────── */}
      <section className="principles">
        <div className="principles__inner">
          <div className="principles__head reveal">
            <span className="team-hero__category"><span className="bar"></span>Section 02 — How We Work</span>
            <h2>How we work, <em>day to day</em>.</h2>
            <p>— A few quiet rules that hold the boutique model together.</p>
          </div>

          <ol className="principles__list reveal">
            <li>
              <span className="principles__num">i.</span>
              <div>
                <h3>Senior on the brief, senior on the work.</h3>
                <p>Whoever you meet in discovery is on the work all the way through delivery. No bait-and-switch.</p>
              </div>
            </li>
            <li>
              <span className="principles__num">ii.</span>
              <div>
                <h3>Diagnose before we propose.</h3>
                <p>Every engagement begins with a written diagnostic. If we&apos;re not the right fit, we say so on page one.</p>
              </div>
            </li>
            <li>
              <span className="principles__num">iii.</span>
              <div>
                <h3>Fewer, deeper partnerships.</h3>
                <p>We work with a small number of IPAs at a time so each gets the attention the mandate deserves.</p>
              </div>
            </li>
            <li>
              <span className="principles__num">iv.</span>
              <div>
                <h3>Board-ready by default.</h3>
                <p>Every output is written to be read by a minister or non-executive — clear, attributable, and on the record.</p>
              </div>
            </li>
          </ol>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="team-cta">
        <div className="team-cta__inner">
          <div>
            <h2 className="team-cta__title">Want to meet <em>the team</em>?</h2>
            <div className="team-cta__sub">— Start with a no-commitment discovery call.</div>
          </div>
          <Link href="/#contact" className="team-cta__btn">
            Start a conversation <span className="arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
