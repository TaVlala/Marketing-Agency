'use client';

import { useEffect } from 'react';

export default function ClientEffects() {
  useEffect(() => {
    // Reveal on scroll
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
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));

    // Stat counter animation
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

    // Hero parallax
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
      io.disconnect();
      statIo.disconnect();
      if (decoNum) window.removeEventListener('scroll', onParallax);
    };
  }, []);

  return null;
}
