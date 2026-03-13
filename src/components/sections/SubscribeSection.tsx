'use client';

import { useState, useRef } from 'react';
import ScrollReveal from '@/components/ui/ScrollReveal';
import { trackEvent } from '@/lib/analytics';

/**
 * Mailchimp embedded form endpoint.
 * Use the full action URL from your Mailchimp embed form code:
 *   Audience → Signup forms → Embedded forms → copy the <form action="..."> URL
 *
 * Set NEXT_PUBLIC_MAILCHIMP_URL in your .env.local
 */
const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL || '';

export default function SubscribeSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!MAILCHIMP_URL) {
      setStatus('error');
      setMessage('Subscribe form not configured yet.');
      return;
    }

    setStatus('loading');

    // Mailchimp's embedded form uses a hidden iframe to prevent page redirect
    const url = new URL(MAILCHIMP_URL.replace('/post?', '/post-json?'));
    url.searchParams.set('EMAIL', email);
    url.searchParams.set('c', 'mailchimpCallback');

    // Inject a global callback for JSONP-style response
    (window as Window & { mailchimpCallback?: (data: { result: string; msg: string }) => void }).mailchimpCallback = (data: { result: string; msg: string }) => {
      if (data.result === 'success') {
        setStatus('success');
        setMessage('You&rsquo;re on the list. We&rsquo;ll be in touch.');
        setEmail('');
        trackEvent('Subscribe Form Submitted');
      } else {
        setStatus('error');
        setMessage(data.msg.includes('already') ? 'That email is already subscribed.' : 'Something went wrong. Please try again.');
      }
      delete (window as Window & { mailchimpCallback?: (data: { result: string; msg: string }) => void }).mailchimpCallback;
    };

    const script = document.createElement('script');
    script.src = url.toString();
    script.onerror = () => {
      setStatus('error');
      setMessage('Unable to subscribe. Please try again.');
    };
    document.body.appendChild(script);
    setTimeout(() => script.remove(), 5000);
  };

  return (
    <section className="py-20 md:py-28 bg-neutral-50 border-t border-neutral-200">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="max-w-xl mx-auto text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500 mb-4">
              Stay current
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight mb-4">
              IPA insights in your inbox
            </h2>
            <p className="text-neutral-500 mb-10">
              Occasional notes on IPA best practice, campaign effectiveness, and agency management. No noise.
            </p>

            {status === 'success' ? (
              <p className="text-accent font-semibold text-lg">
                ✓ You&rsquo;re on the list. We&rsquo;ll be in touch.
              </p>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="flex flex-col sm:flex-row gap-3"
                noValidate
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  disabled={status === 'loading'}
                  className="flex-1 px-4 py-3 bg-white border border-neutral-200 text-primary placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-60 text-sm"
                />
                <button
                  type="submit"
                  disabled={status === 'loading' || !email}
                  className="px-6 py-3 bg-primary text-white font-semibold text-sm tracking-tight hover:bg-primary-light active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap"
                >
                  {status === 'loading' ? 'Subscribing…' : 'Subscribe'}
                </button>
              </form>
            )}

            {status === 'error' && message && (
              <p className="text-red-600 text-sm mt-3">{message}</p>
            )}

            <p className="text-xs text-neutral-400 mt-4">
              No spam. Unsubscribe any time.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
