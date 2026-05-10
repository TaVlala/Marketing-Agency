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

  // After cross-page navigation to /, if the URL has #contact scroll with
  // the fixed-nav offset. The timeout lets the page finish rendering first.
  useEffect(() => {
    if (pathname !== '/') return;
    if (typeof window === 'undefined' || window.location.hash !== '#contact') return;
    const id = setTimeout(() => {
      const el = document.getElementById('contact');
      if (!el) return;
      const navEl = document.getElementById('nav');
      const navH = navEl?.getBoundingClientRect().height ?? 106;
      window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH - 24, behavior: 'smooth' });
    }, 80);
    return () => clearTimeout(id);
  }, [pathname]);

  // Same-page (/) click: prevent Link navigation and smooth-scroll with offset.
  // Cross-page: let Link navigate normally (scroll={false} suppresses auto-scroll,
  // the pathname useEffect above corrects it once the page renders).
  const handleContactClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    setMenuOpen(false);
    if (pathname !== '/') return;
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
        <Link href="/#contact" scroll={false} onClick={handleContactClick}>Contact</Link>
      </div>

      <Link href="/#contact" scroll={false} onClick={handleContactClick} className="nav__cta">
        Start a conversation <span className="arrow">→</span>
      </Link>

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
          <Link href="/#contact" scroll={false} onClick={handleContactClick}>Contact</Link>
        </div>
        <Link href="/#contact" scroll={false} onClick={handleContactClick} className="nav__drawer-cta">
          Start a conversation <span className="arrow">→</span>
        </Link>
      </div>
    </nav>
  );
}
