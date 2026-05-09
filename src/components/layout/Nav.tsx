'use client';

import { useEffect, useState } from 'react';
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
        <Link href="/#contact">Contact</Link>
      </div>

      <Link href="/#contact" className="nav__cta">
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
          <Link href="/#contact">Contact</Link>
        </div>
        <Link href="/#contact" className="nav__drawer-cta">
          Start a conversation <span className="arrow">→</span>
        </Link>
      </div>
    </nav>
  );
}
