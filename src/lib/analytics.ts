'use client';

/**
 * Plausible Analytics helpers.
 * Script is loaded only after cookie consent — see CookieConsent component.
 */

type PlausibleEventName =
  | 'Contact Form Submitted'
  | 'Subscribe Form Submitted'
  | 'CTA Button Clicked'
  | 'Case Study Viewed';

/**
 * Track a custom Plausible event.
 * No-ops gracefully if Plausible isn't loaded (consent denied or dev mode).
 */
export function trackEvent(eventName: PlausibleEventName, props?: Record<string, string>) {
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible(eventName, { props });
  }
}

// Extend Window for Plausible's global function
declare global {
  interface Window {
    plausible: ((eventName: string, options?: { props?: Record<string, string> }) => void) | undefined;
  }
}
