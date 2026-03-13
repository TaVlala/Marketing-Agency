'use client';

import { useState } from 'react';
import { trackEvent } from '@/lib/analytics';

/**
 * Contact form — submits to Formspree.
 * Set NEXT_PUBLIC_FORMSPREE_ENDPOINT in .env.local to your Formspree form ID.
 * Get a free form at https://formspree.io
 */
const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || '';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!FORMSPREE_URL) {
      setStatus('error');
      setErrorMsg('Contact form not configured yet. Please email us directly.');
      return;
    }

    setStatus('loading');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setStatus('success');
        form.reset();
        trackEvent('Contact Form Submitted');
      } else {
        const json = await res.json();
        setStatus('error');
        setErrorMsg(json?.errors?.[0]?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setErrorMsg('Network error. Please try again or email us directly.');
    }
  };

  if (status === 'success') {
    return (
      <div className="py-16 text-center">
        <p className="text-4xl mb-4" aria-hidden="true">✓</p>
        <h2 className="text-2xl font-bold text-primary mb-3">Message sent</h2>
        <p className="text-neutral-500">Thanks for getting in touch. We&rsquo;ll reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500 mb-2">
          Your name <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          placeholder="Jane Smith"
          disabled={status === 'loading'}
          className="w-full px-4 py-3 bg-white border border-neutral-200 text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-60 text-sm"
        />
      </div>

      {/* Email */}
      <div>
        <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500 mb-2">
          Email address <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="jane@organisation.com"
          disabled={status === 'loading'}
          className="w-full px-4 py-3 bg-white border border-neutral-200 text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-60 text-sm"
        />
      </div>

      {/* Organisation */}
      <div>
        <label htmlFor="organisation" className="block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500 mb-2">
          Organisation
        </label>
        <input
          id="organisation"
          name="organisation"
          type="text"
          autoComplete="organization"
          placeholder="Company or department"
          disabled={status === 'loading'}
          className="w-full px-4 py-3 bg-white border border-neutral-200 text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-60 text-sm"
        />
      </div>

      {/* Service interest */}
      <div>
        <label htmlFor="service" className="block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500 mb-2">
          I&rsquo;m interested in
        </label>
        <select
          id="service"
          name="service"
          disabled={status === 'loading'}
          className="w-full px-4 py-3 bg-white border border-neutral-200 text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-60 text-sm appearance-none"
        >
          <option value="">Select a service (optional)</option>
          <option value="IPA Marketing Strategy">IPA Marketing Strategy</option>
          <option value="Agency Selection & Management">Agency Selection &amp; Management</option>
          <option value="Campaign Audits & Reviews">Campaign Audits &amp; Reviews</option>
          <option value="Best Practice Training">Best Practice Training</option>
          <option value="Other">Other / Not sure yet</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500 mb-2">
          Message <span className="text-red-500" aria-hidden="true">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us a bit about your project or question…"
          disabled={status === 'loading'}
          className="w-full px-4 py-3 bg-white border border-neutral-200 text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-60 text-sm resize-none"
        />
      </div>

      {/* Error */}
      {status === 'error' && errorMsg && (
        <p className="text-red-600 text-sm">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="px-8 py-4 bg-primary text-white font-semibold tracking-tight hover:bg-primary-light active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none self-start"
      >
        {status === 'loading' ? 'Sending…' : 'Send message'}
      </button>

      <p className="text-xs text-neutral-400">
        We typically reply within one business day. Your data is handled per our{' '}
        <a href="/privacy" className="underline hover:text-primary transition-colors">Privacy Policy</a>.
      </p>
    </form>
  );
}
