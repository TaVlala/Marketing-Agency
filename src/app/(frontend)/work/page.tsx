import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Work — Selected Engagements',
  description: 'Selected case studies — repositioning, sector campaigns, capability audits, and retained partnerships across investment promotion.',
};

export default function WorkPage() {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────── */}
      <header className="work-hero">
        <div className="work-hero__inner">
          <div className="work-hero__masthead">
            <span>HGM &nbsp;·&nbsp; Selected Work</span>
            <em>Vol. 03 — A few engagements, shown.</em>
            <span>Hidden Gem Marketing / 2026</span>
          </div>

          <div className="work-hero__category"><span className="bar"></span>Section 03 — Selected Work</div>
          <h1 className="work-hero__title">Where we have <em>been</em><span className="stop">.</span></h1>

          <div className="work-hero__sub">
            <p className="work-hero__lede">
              A small selection of recent engagements with <em>Investment Promotion Agencies</em> across four regions. More case studies and references are shared on request.
            </p>
            <div className="work-hero__index" aria-hidden="true">
              <Link href="#case-01"><span>i.</span><span>Caucasus — Repositioning</span><span>2024</span></Link>
              <Link href="#case-02"><span>ii.</span><span>MENA — Sector Campaign</span><span>2023</span></Link>
              <Link href="#case-03"><span>iii.</span><span>SE Europe — Capability Audit</span><span>2023</span></Link>
              <Link href="#case-04"><span>iv.</span><span>LATAM — Always-On Partner</span><span>2022 — present</span></Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── CASES ────────────────────────────────────────── */}
      <section className="work-cases">
        <div className="work-cases__inner">
          <div className="work-cases__head">
            <span className="work-cases__num">— 01 / Engagements</span>
            <h2>Four engagements, <em>shown</em>.</h2>
            <span className="work-cases__aside">More by request</span>
          </div>

          <div className="cases-list">
            <Link className="case reveal" href="/#contact" id="case-01">
              <div className="case__num">i.</div>
              <h3 className="case__title">National Investment Agency, Caucasus<small>— Repositioning · 2024</small></h3>
              <p className="case__body">A full brand and narrative reset, repositioning a multi-sector mandate around a single, ownable investor proposition.</p>
              <div className="case__metrics">
                <strong>+38%</strong>Inbound leads, Y/Y
                <span className="pipe">/</span>
                <strong>4 mo.</strong>Brief to launch
              </div>
            </Link>

            <Link className="case reveal" href="/#contact" id="case-02" style={{ '--rd': '80ms' } as React.CSSProperties}>
              <div className="case__num">ii.</div>
              <h3 className="case__title">Sub-National Promotion Authority, MENA<small>— Sector Campaign · 2023</small></h3>
              <p className="case__body">A sector-led demand campaign for tier-one logistics and manufacturing investors, supported by an always-on content engine.</p>
              <div className="case__metrics">
                <strong>×3.2</strong>Qualified meetings
                <span className="pipe">/</span>
                <strong>11 wks</strong>To first investor visit
              </div>
            </Link>

            <Link className="case reveal" href="/#contact" id="case-03" style={{ '--rd': '160ms' } as React.CSSProperties}>
              <div className="case__num">iii.</div>
              <h3 className="case__title">Regional Development Agency, Southeast Europe<small>— Capability Audit · 2023</small></h3>
              <p className="case__body">A diagnostic of marketing capability and reporting, followed by a 12-month plan to consolidate spend and sharpen attribution.</p>
              <div className="case__metrics">
                <strong>−27%</strong>Wasted spend
                <span className="pipe">/</span>
                <strong>2 partners</strong>Down from seven
              </div>
            </Link>

            <Link className="case reveal" href="/#contact" id="case-04" style={{ '--rd': '240ms' } as React.CSSProperties}>
              <div className="case__num">iv.</div>
              <h3 className="case__title">Cross-Border Investment Initiative, LATAM<small>— Always-On Partner · 2022 — present</small></h3>
              <p className="case__body">Retained senior partnership across strategy, content, and board reporting — covering five sectors and a quarterly investor newsletter.</p>
              <div className="case__metrics">
                <strong>4 yrs</strong>Continuous engagement
                <span className="pipe">/</span>
                <strong>8K+</strong>Investor readership
              </div>
            </Link>
          </div>

          <div className="work__foot reveal">
            <p>&ldquo; More case studies and references are <em>shared on request</em>. Some of our most meaningful work sits behind NDAs we are happy to honour. &rdquo;</p>
            <Link href="/#contact" className="btn btn--ghost">Request the full book <span className="arrow">→</span></Link>
          </div>
        </div>
      </section>

      {/* ── STATS BAND ───────────────────────────────────── */}
      <section className="deck-band">
        <div className="deck-band__inner">
          <div className="deck-band__head reveal">
            <div>By the numbers</div>
            <h2>A boutique with <em>institutional</em> reach.</h2>
          </div>
          <div className="deck-band__grid">
            <div className="stat reveal" style={{ '--rd': '80ms' } as React.CSSProperties}>
              <div className="stat__num" data-count="10">10<em>+</em></div>
              <div className="stat__label">Years inside investment promotion.</div>
            </div>
            <div className="stat reveal" style={{ '--rd': '160ms' } as React.CSSProperties}>
              <div className="stat__num" data-count="15">15<em>+</em></div>
              <div className="stat__label">Markets advised across four continents.</div>
            </div>
            <div className="stat reveal" style={{ '--rd': '240ms' } as React.CSSProperties}>
              <div className="stat__num" data-count="100">100<em>+</em></div>
              <div className="stat__label">Campaigns audited, briefs sharpened.</div>
            </div>
            <div className="stat reveal" style={{ '--rd': '320ms' } as React.CSSProperties}>
              <div className="stat__num" data-count="50">50<em>+</em></div>
              <div className="stat__label">Agency teams assessed end-to-end.</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTORS ──────────────────────────────────────── */}
      <section className="sectors">
        <div className="sectors__inner">
          <div className="sectors__head">
            <h2>Sectors we know <em>well</em>.</h2>
            <span className="sectors__head-aside">— Eight mandate areas</span>
          </div>
          <div className="sectors__grid">
            <div className="sector"><span className="sector__num">i.</span><h3 className="sector__name">Logistics &amp; <em>Mobility</em></h3><span className="sector__count">3 engagements</span></div>
            <div className="sector"><span className="sector__num">ii.</span><h3 className="sector__name">Energy &amp; <em>Transition</em></h3><span className="sector__count">5 engagements</span></div>
            <div className="sector"><span className="sector__num">iii.</span><h3 className="sector__name">Advanced <em>Manufacturing</em></h3><span className="sector__count">4 engagements</span></div>
            <div className="sector"><span className="sector__num">iv.</span><h3 className="sector__name">Agri &amp; <em>Food Tech</em></h3><span className="sector__count">2 engagements</span></div>
            <div className="sector"><span className="sector__num">v.</span><h3 className="sector__name">Tech &amp; <em>Shared Services</em></h3><span className="sector__count">3 engagements</span></div>
            <div className="sector"><span className="sector__num">vi.</span><h3 className="sector__name">Tourism &amp; <em>Place</em></h3><span className="sector__count">2 engagements</span></div>
            <div className="sector"><span className="sector__num">vii.</span><h3 className="sector__name">Life Sciences &amp; <em>Health</em></h3><span className="sector__count">1 engagement</span></div>
            <div className="sector"><span className="sector__num">viii.</span><h3 className="sector__name">Creative &amp; <em>Cultural</em></h3><span className="sector__count">1 engagement</span></div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────── */}
      <section className="work-cta">
        <div className="work-cta__inner">
          <div>
            <h2 className="work-cta__title">Ready to be <em>next</em>?</h2>
          </div>
          <Link href="/#contact" className="work-cta__btn">Start a conversation <span className="arrow">→</span></Link>
        </div>
      </section>
    </>
  );
}
