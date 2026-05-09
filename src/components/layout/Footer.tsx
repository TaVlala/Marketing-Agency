import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__deco-num" aria-hidden="true">HGM</div>
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand-block">
            <div className="footer__monogram">HGM<span className="stop">.</span></div>
            <div className="footer__brand-tag">
              <em>Hidden Gem Marketing</em> — a boutique consultancy built for the investment promotion sector.
            </div>
          </div>

          <div>
            <div className="footer__col-head">— Navigate</div>
            <ul className="footer__list">
              <li><Link href="/#about">About</Link></li>
              <li><Link href="/team">Team</Link></li>
              <li><Link href="/#services">Services</Link></li>
              <li><Link href="/work">Work</Link></li>
              <li><Link href="/#process">Process</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer__col-head">— Capabilities</div>
            <ul className="footer__list">
              <li><Link href="/#services">Brand &amp; Positioning</Link></li>
              <li><Link href="/#services">Campaigns</Link></li>
              <li><Link href="/#services">Diagnostic &amp; Audit</Link></li>
              <li><Link href="/#services">Senior Counsel</Link></li>
            </ul>
          </div>

          <div>
            <div className="footer__col-head">— Reach us</div>
            <ul className="footer__list">
              <li><a href="mailto:hello@hgmarketing.com">hello@hgmarketing.com</a></li>
              <li><Link href="/#contact">Discovery call</Link></li>
              <li><Link href="/#contact">The Quarterly</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bot">
          <div>© 2026 HGM · Hidden Gem Marketing.</div>
          <div className="center">— Boutique. Senior. Always. —</div>
          <div className="right">Investment Promotion. Marketing. Redefined.</div>
        </div>
      </div>
    </footer>
  );
}
