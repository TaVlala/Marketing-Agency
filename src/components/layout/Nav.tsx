'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
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
    </nav>
  );
}
