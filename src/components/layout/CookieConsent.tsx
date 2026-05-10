'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

export const STORAGE_KEY = 'cookie_consent';
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/** Custom DOM event fired by CookieSettingsButton to re-open the banner */
export const RESET_EVENT = 'cookie-consent-reset';

type ConsentValue = 'accepted' | 'rejected' | null;

// ─── Safe localStorage helpers (throws in private browsing) ─────────────────

function getStoredConsent(): ConsentValue {
  try {
    return localStorage.getItem(STORAGE_KEY) as ConsentValue;
  } catch {
    return null; // private browsing or storage blocked — treat as no preference
  }
}

function setStoredConsent(value: 'accepted' | 'rejected'): void {
  try {
    localStorage.setItem(STORAGE_KEY, value);
  } catch {
    // silent — banner will re-appear on next visit
  }
}

function clearStoredConsent(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // silent
  }
}

// ─── Plausible loader ────────────────────────────────────────────────────────

function loadPlausible() {
  if (!PLAUSIBLE_DOMAIN || typeof document === 'undefined') return;
  if (document.querySelector('script[data-plausible]')) return;

  const script = document.createElement('script');
  script.src = 'https://plausible.io/js/script.js';
  script.defer = true;
  script.dataset.domain = PLAUSIBLE_DOMAIN;
  script.dataset.plausible = 'true';
  document.head.appendChild(script);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentValue>(null);
  const [visible, setVisible] = useState(false);

  // Check stored preference on mount; listen for manual reset from footer
  useEffect(() => {
    const stored = getStoredConsent();
    if (stored === 'accepted') {
      setConsent('accepted');
      loadPlausible();
    } else if (stored === 'rejected') {
      setConsent('rejected');
    } else {
      setTimeout(() => setVisible(true), 1000);
    }

    // CookieSettingsButton dispatches this event to re-open the banner
    const handleReset = () => {
      clearStoredConsent();
      setConsent(null);
      setVisible(true);
    };

    window.addEventListener(RESET_EVENT, handleReset);
    return () => window.removeEventListener(RESET_EVENT, handleReset);
  }, []);

  const accept = () => {
    setStoredConsent('accepted');
    setConsent('accepted');
    setVisible(false);
    loadPlausible();
  };

  const reject = () => {
    setStoredConsent('rejected');
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
