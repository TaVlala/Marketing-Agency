'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

export default function NewsletterLink() {
  const pathname = usePathname();

  const handleClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') return;
    e.preventDefault();
    const el = document.getElementById('newsletter');
    if (!el) return;
    const navEl = document.getElementById('nav');
    const navH = navEl?.getBoundingClientRect().height ?? 106;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH - 24, behavior: 'smooth' });
  }, [pathname]);

  return (
    <Link href="/#newsletter" scroll={false} onClick={handleClick}>Subscribe</Link>
  );
}
