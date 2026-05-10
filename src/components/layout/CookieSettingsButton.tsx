'use client';

import { RESET_EVENT } from './CookieConsent';

/**
 * Fires a custom DOM event that CookieConsent listens for.
 * Clears the stored preference and re-shows the consent banner.
 * Drop this anywhere — it doesn't need to be co-located with CookieConsent.
 */
export default function CookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(RESET_EVENT))}
      className="text-xs text-neutral-500 hover:text-neutral-300 transition-colors underline underline-offset-2 cursor-pointer bg-transparent border-none p-0"
    >
      Cookie settings
    </button>
  );
}
