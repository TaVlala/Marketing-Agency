'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const STORAGE_KEY = 'cookie_consent';
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

type ConsentValue = 'accepted' | 'rejected' | null;

function loadPlausible() {
  if (!PLAUSIBLE_DOMAIN || typeof document === 'undefined') return;
  if (document.querySelector('script[data-plausible]')) return; // already loaded

  const script = document.createElement('script');
  script.src = 'https://plausible.io/js/script.js';
  script.defer = true;
  script.dataset.domain = PLAUSIBLE_DOMAIN;
  script.dataset.plausible = 'true';
  document.head.appendChild(script);
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [visible, setVisible] = useState(false);

  // Check stored preference on mount
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentValue;
    if (stored === 'accepted') {
      setConsent('accepted');
      loadPlausible();
    } else if (stored === 'rejected') {
      setConsent('rejected');
    } else {
      // No preference yet — show banner after short delay
      setTimeout(() => setVisible(true), 1000);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setConsent('accepted');
    setVisible(false);
    loadPlausible();
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setConsent('rejected');
    setVisible(false);
  };

  if (!visible || consent !== null) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-0 left-0 right-0 z-50 bg-primary text-white px-6 py-5 md:px-12"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <p className="text-sm text-neutral-200 max-w-2xl leading-relaxed">
          We use analytics to understand how visitors use this site.{' '}
          <Link href="/privacy" className="underline hover:text-white">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex items-center gap-3 shrink-0">
          <Button variant="ghost" size="sm" onClick={reject} className="text-neutral-300 hover:text-white">
            Reject
          </Button>
          <Button variant="secondary" size="sm" onClick={accept} className="border-white text-white hover:bg-white hover:text-primary">
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
