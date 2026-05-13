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
<span>Hidden Gem Marketing / 2026</span>
          </div>

          <div className="team-hero__full">
            <div className="team-hero__category"><span className="bar"></span>01 — What is HGM</div>
            <h1 className="team-hero__title">Built to make great <em>locations</em> visible<span className="stop">.</span></h1>
            <p className="team-hero__lede">
              Every investment destination has a story worth telling. We started HGM because we&apos;ve seen what happens when that story lands with the right audience.
            </p>
          </div>
        </div>
      </header>

      {/* ── TEAM ROSTER ──────────────────────────────────── */}
      <section className="team-section">
        <div className="team-section__inner">
          <div className="team__head">
            <span className="team__head-num">02 — The Team</span>
            <h2 className="team__head-title">Insider knowledge. <em>Outside perspective.</em></h2>
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
      <section className="principles" id="principles">
        <div className="principles__inner">

          <div className="principles__head reveal">
            <div>
              <div className="section__num" style={{ marginBottom: '10px' }}><span className="bar"></span>03 — Our Principles</div>
              <h2 className="principles__title">Four quiet <em>commitments</em><br />that decide how we work.</h2>
            </div>
          </div>

          <div className="principles__grid reveal">

            <div className="principle">
              <div className="principle__num">i.</div>
              <h3 className="principle__word">Senior<span className="dot"></span></h3>
              <p className="principle__body">
                <strong>On the brief. On the work.</strong> Whoever you meet in discovery is on the mandate all the way through delivery. No bait-and-switch, no junior hand-off.
              </p>
            </div>

            <div className="principle principle--italic">
              <div className="principle__num">ii.</div>
              <h3 className="principle__word">Diagnose<span className="dot"></span></h3>
              <p className="principle__body">
                <strong>Before we propose.</strong> Every engagement begins with a written diagnostic. If we&apos;re not the right fit, we say so on page one — and recommend who is.
              </p>
            </div>

            <div className="principle principle--italic">
              <div className="principle__num">iii.</div>
              <h3 className="principle__word">Fewer<span className="dot"></span></h3>
              <p className="principle__body">
                <strong>Deeper partnerships.</strong> We work with a small number of IPAs at a time, so each one gets the senior attention the mandate deserves.
              </p>
            </div>

            <div className="principle">
              <div className="principle__num">iv.</div>
              <h3 className="principle__word">Ready<span className="dot"></span></h3>
              <p className="principle__body">
                <strong>Board-ready by default.</strong> Every output is written to be read by a minister or non-executive — clear, attributable, and on the record from day one.
              </p>
            </div>

          </div>


</div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="team-cta">
        <div className="team-cta__inner">
          <div>
            <h2 className="team-cta__title">Want to meet <em>the team</em>?</h2>
          </div>
          <Link href="/#contact" className="team-cta__btn">
            Start a conversation <span className="arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
