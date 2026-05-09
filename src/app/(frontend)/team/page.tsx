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
              <div><dt>Partners</dt><dd>Four senior</dd></div>
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
            <span className="team__head-aside">Four · Senior · Always</span>
          </div>

          <div className="team__grid">

            <article className="member reveal">
              <div className="member__portrait">
                <span className="member__photo-num">i.</span>
                <span className="member__photo-tag"><span className="bar"></span>Founder</span>
                <span className="member__initials">A<span className="stop">.</span>R</span>
              </div>
              <div className="member__body">
                <span className="member__role-eyebrow"><span className="bar"></span>Founding Partner</span>
                <h3 className="member__name">Amelia Ross</h3>
                <p className="member__role">— Strategy &amp; Investor Narrative</p>
                <p className="member__bio">
                  Fifteen years inside investment promotion — first as a sector lead at a national IPA, then advising boards on positioning and pipeline. Amelia owns brand strategy, investor narrative, and the listening sessions that begin every engagement.
                </p>
                <p className="member__bio">
                  She believes most IPAs already have a story worth telling, and most marketing failures are diagnosis problems, not creative ones.
                </p>
                <dl className="member__facts">
                  <div className="member__fact"><dt>Based</dt><dd>London / Brussels</dd></div>
                  <div className="member__fact"><dt>Languages</dt><dd>EN · FR · DE</dd></div>
                  <div className="member__fact"><dt>Sector focus</dt><dd>Logistics · Energy</dd></div>
                  <div className="member__fact"><dt>Prior</dt><dd>National IPA · Big-4</dd></div>
                </dl>
              </div>
            </article>

            <article className="member reveal" style={{ '--rd': '80ms' } as React.CSSProperties}>
              <div className="member__portrait">
                <span className="member__photo-num">ii.</span>
                <span className="member__photo-tag"><span className="bar"></span>Founder</span>
                <span className="member__initials">D<span className="stop">.</span>K</span>
              </div>
              <div className="member__body">
                <span className="member__role-eyebrow"><span className="bar"></span>Founding Partner</span>
                <h3 className="member__name">Daniel Kovač</h3>
                <p className="member__role">— Brand &amp; Creative Direction</p>
                <p className="member__bio">
                  A creative director with two decades across institutional brand and editorial design. Daniel leads visual identity, the brand system, and the campaign craft — making sure every output reads with the seriousness investors expect.
                </p>
                <p className="member__bio">
                  Previously at a leading branding studio working with sovereign clients. He still thinks restraint is the most under-rated tool in the kit.
                </p>
                <dl className="member__facts">
                  <div className="member__fact"><dt>Based</dt><dd>Vienna</dd></div>
                  <div className="member__fact"><dt>Languages</dt><dd>EN · DE · HR</dd></div>
                  <div className="member__fact"><dt>Discipline</dt><dd>Brand · Editorial</dd></div>
                  <div className="member__fact"><dt>Prior</dt><dd>Sovereign branding</dd></div>
                </dl>
              </div>
            </article>

            <article className="member reveal" style={{ '--rd': '160ms' } as React.CSSProperties}>
              <div className="member__portrait">
                <span className="member__photo-num">iii.</span>
                <span className="member__photo-tag"><span className="bar"></span>Partner</span>
                <span className="member__initials">N<span className="stop">.</span>O</span>
              </div>
              <div className="member__body">
                <span className="member__role-eyebrow"><span className="bar"></span>Partner</span>
                <h3 className="member__name">Nadia Okafor</h3>
                <p className="member__role">— Campaigns &amp; Demand</p>
                <p className="member__bio">
                  Nadia leads the always-on engine — sector campaigns, content programmes, and the analytics behind quarterly board reporting. She built demand systems for two regional IPAs before joining HGM.
                </p>
                <p className="member__bio">
                  Her rule of thumb: if you can&apos;t explain a campaign on a single page to a minister, the campaign isn&apos;t ready yet.
                </p>
                <dl className="member__facts">
                  <div className="member__fact"><dt>Based</dt><dd>Lisbon</dd></div>
                  <div className="member__fact"><dt>Languages</dt><dd>EN · PT · FR</dd></div>
                  <div className="member__fact"><dt>Discipline</dt><dd>Demand · Analytics</dd></div>
                  <div className="member__fact"><dt>Prior</dt><dd>Regional IPA · Agency</dd></div>
                </dl>
              </div>
            </article>

            <article className="member reveal" style={{ '--rd': '240ms' } as React.CSSProperties}>
              <div className="member__portrait">
                <span className="member__photo-num">iv.</span>
                <span className="member__photo-tag"><span className="bar"></span>Partner</span>
                <span className="member__initials">T<span className="stop">.</span>L</span>
              </div>
              <div className="member__body">
                <span className="member__role-eyebrow"><span className="bar"></span>Partner</span>
                <h3 className="member__name">Theo Lindgren</h3>
                <p className="member__role">— Diagnostic &amp; Senior Counsel</p>
                <p className="member__bio">
                  Theo runs the diagnostic — capability audits, marketing-spend reviews, and the costed twelve-month plans that frame retainer engagements. Twenty years across management consulting and public-sector advisory.
                </p>
                <p className="member__bio">
                  He prefers a clear no over a polite yes, and writes most of our discovery notes himself.
                </p>
                <dl className="member__facts">
                  <div className="member__fact"><dt>Based</dt><dd>Stockholm</dd></div>
                  <div className="member__fact"><dt>Languages</dt><dd>EN · SV · DE</dd></div>
                  <div className="member__fact"><dt>Discipline</dt><dd>Diagnostic · Strategy</dd></div>
                  <div className="member__fact"><dt>Prior</dt><dd>Top-tier consulting</dd></div>
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
