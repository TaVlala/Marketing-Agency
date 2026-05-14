import Link from 'next/link';
import CookieSettingsButton from './CookieSettingsButton';
import EmailLink from './EmailLink';

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

          <div className="footer__nav-cols">
            <div>
              <div className="footer__col-head">— Navigate</div>
              <ul className="footer__list">
                <li><Link href="/team">Who we are</Link></li>
                <li><Link href="/services">How we work</Link></li>
                <li><Link href="/#contact">Contact</Link></li>
              </ul>
            </div>

            <div>
              <div className="footer__col-head">— Capabilities</div>
              <ul className="footer__list">
                <li><Link href="/services">Investment Potential Audit</Link></li>
                <li><Link href="/services">Narrative &amp; Positioning</Link></li>
                <li><Link href="/services">Communication Strategy</Link></li>
                <li><Link href="/services">Execution Blueprints</Link></li>
                <li><Link href="/services">Guided Execution</Link></li>
                <li><Link href="/services">Execution Partners</Link></li>
              </ul>
            </div>

            <div>
              <div className="footer__col-head">— Reach us</div>
              <ul className="footer__list">
                <li><EmailLink /></li>
                <li><Link href="/#contact">Contact us</Link></li>
                <li><a href="/#newsletter">Subscribe</a></li>
              </ul>
              <div className="footer__social">
                <a href="https://www.linkedin.com/company/hgmarketing" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <rect x="2" y="9" width="4" height="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
                <a href="https://www.instagram.com/hgmarketing" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="currentColor" strokeWidth="1"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bot">
          <div>© 2026 HGM · Hidden Gem Marketing.</div>
          <div className="right flex items-center gap-4">
            <span>Investment Promotion. Marketing. Redefined.</span>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
