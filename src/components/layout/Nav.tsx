'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Click handler for /#contact links.
  // Same page (/) → manual smooth scroll with fixed-nav offset.
  // Other pages → fall through to native <a> href so the browser does a
  // full navigation and respects scroll-margin-top on the fresh load.
  const handleContactClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    if (pathname !== '/') return; // let native navigation handle cross-page
    e.preventDefault();
    const el = document.getElementById('contact');
    if (!el) return;
    const navEl = document.getElementById('nav');
    const navH = navEl?.getBoundingClientRect().height ?? 106;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH - 24, behavior: 'smooth' });
  }, [pathname]);

  // Lock body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}`} id="nav">
      <Link href="/" className="nav__brand" aria-label="HGM Home">
        <span className="nav__mark" aria-hidden="true">H<em>.</em></span>
        <span className="nav__divider" aria-hidden="true"></span>
        <span className="nav__wordmark">HGM</span>
      </Link>

      <div className="nav__links">
        <Link href="/team" className={pathname === '/team' ? 'is-active' : ''}>Who we are</Link>
        <Link href="/services" className={pathname === '/services' ? 'is-active' : ''}>Services</Link>
        <Link href="/work" className={pathname === '/work' ? 'is-active' : ''}>Work</Link>
        <a href="/#contact" onClick={handleContactClick}>Contact</a>
      </div>

      <a href="/#contact" onClick={handleContactClick} className="nav__cta">
        Start a conversation <span className="arrow">→</span>
      </a>

      <button
        type="button"
        className="nav__toggle"
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className="nav__toggle-bar"></span>
        <span className="nav__toggle-bar"></span>
      </button>

      <div className="nav__drawer" aria-hidden={!menuOpen}>
        <div className="nav__drawer-links">
          <Link href="/team" className={pathname === '/team' ? 'is-active' : ''}>Who we are</Link>
          <Link href="/services" className={pathname === '/services' ? 'is-active' : ''}>Services</Link>
          <Link href="/work" className={pathname === '/work' ? 'is-active' : ''}>Work</Link>
          <a href="/#contact" onClick={handleContactClick}>Contact</a>
        </div>
        <a href="/#contact" onClick={handleContactClick} className="nav__drawer-cta">
          Start a conversation <span className="arrow">→</span>
        </a>
      </div>
    </nav>
  );
}
