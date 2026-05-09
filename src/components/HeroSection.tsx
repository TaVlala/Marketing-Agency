'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

const WORDS = ['capital.', 'investors.', 'narratives.', 'agencies.', 'outcomes.', 'the needle.'];

export default function HeroSection() {
  const rotatorRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = rotatorRef.current;
    if (!el) return;
    let idx = 0;
    el.classList.add('hero__rotator-word');
    el.textContent = WORDS[0];
    const cycle = () => {
      idx = (idx + 1) % WORDS.length;
      el.classList.add('out');
      setTimeout(() => {
        el.textContent = WORDS[idx];
        el.classList.remove('out');
        el.classList.add('in-from-down');
        void el.offsetWidth;
        el.classList.remove('in-from-down');
      }, 380);
    };
    const timer = setInterval(cycle, 2400);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="hero" id="top">
      <div className="hero__deco" aria-hidden="true">
        <div className="hero__deco-num">26</div>
      </div>


      <div className="hero__inner">
        <div className="hero__title-block reveal" style={{ '--rd': '120ms' } as React.CSSProperties}>
          <div className="hero__category">
            <span className="bar"></span>
            Investment Promotion · Marketing · Redefined
          </div>
          <h1 className="hero__title">
            Marketing that<br />
            moves{' '}
            <em>
              <span className="hero__rotator" aria-live="polite">
                <span ref={rotatorRef} id="rotator"></span>
              </span>
            </em>
          </h1>
        </div>

        <div className="hero__sub reveal" style={{ '--rd': '280ms' } as React.CSSProperties}>
          <div className="hero__sub-meta">
            — A boutique consultancy
            <strong>Specialised in IPAs.</strong>
          </div>
          <div>
            <p className="hero__sub-lede">
              We help <em>Investment Promotion Agencies</em> raise their profile, sharpen their brand, and attract the investors they deserve.
            </p>
          </div>
        </div>

        <div className="hero__cta-row reveal" style={{ '--rd': '400ms' } as React.CSSProperties}>
          <Link href="/#services" className="btn btn--primary">
            What we do <span className="arrow">↓</span>
          </Link>
        </div>
      </div>

    </header>
  );
}
