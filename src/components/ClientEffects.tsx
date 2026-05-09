'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function ClientEffects() {
  const pathname = usePathname();

  // Reveal-on-scroll observer — re-scans on every route change
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' }
    );

    // Wait one frame for the new route's DOM to render, then scan
    let fallback: ReturnType<typeof setTimeout> | undefined;
    const raf = requestAnimationFrame(() => {
      const revealEls = document.querySelectorAll('.reveal:not(.in)');

      if (window.location.hash) {
        revealEls.forEach((el) => el.classList.add('in'));
      } else {
        revealEls.forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
            el.classList.add('in');
          } else {
            io.observe(el);
          }
        });
      }

      // Last-resort fallback: any element still hidden after 400ms gets revealed
      fallback = setTimeout(() => {
        document.querySelectorAll('.reveal:not(.in)').forEach((el) => el.classList.add('in'));
      }, 400);
    });

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      if (fallback) clearTimeout(fallback);
    };
  }, [pathname]);

  // Stat counter + hero parallax — only need to set up once
  useEffect(() => {
    const statIo = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target as HTMLElement;
          const target = parseInt(el.dataset.count ?? '0', 10);
          const dur = 1400;
          const t0 = performance.now();
          const emEl = el.querySelector('em');
          const emHtml = emEl ? emEl.outerHTML : '';
          const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
          const tick = (now: number) => {
            const t = Math.min(1, (now - t0) / dur);
            const v = Math.round(target * easeOut(t));
            el.innerHTML = v + emHtml;
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          statIo.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll('.stat__num[data-count]').forEach((el) => statIo.observe(el));

    const decoNum = document.querySelector('.hero__deco-num') as HTMLElement | null;
    let raf: number | null = null;
    const onParallax = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        if (decoNum) decoNum.style.transform = `translateY(${window.scrollY * 0.18}px)`;
        raf = null;
      });
    };
    if (decoNum) window.addEventListener('scroll', onParallax, { passive: true });

    return () => {
      statIo.disconnect();
      if (decoNum) window.removeEventListener('scroll', onParallax);
    };
  }, [pathname]);

  return null;
}
