'use client';

import { useState, FormEvent } from 'react';
import { trackEvent } from '@/lib/analytics';
import { subscribeToMailchimp } from '@/lib/mailchimp';

const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || '';
const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL || '';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function HomeContactSection() {
  const [contactStatus, setContactStatus] = useState<FormStatus>('idle');
  const [contactError, setContactError] = useState('');

  const [newsletterStatus, setNewsletterStatus] = useState<FormStatus>('idle');
  const [newsletterError, setNewsletterError] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');

  const handleContactSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!FORMSPREE_URL) {
      setContactStatus('error');
      setContactError('Contact form not configured. Please email us directly.');
      return;
    }

    setContactStatus('loading');
    setContactError('');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (res.ok) {
        setContactStatus('success');
        form.reset();
        trackEvent('Contact Form Submitted');
      } else {
        const json = await res.json().catch(() => null);
        setContactStatus('error');
        setContactError(json?.errors?.[0]?.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setContactStatus('error');
      setContactError('Network error. Please try again or email us directly.');
    }
  };

  const handleNewsletterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!MAILCHIMP_URL) {
      setNewsletterStatus('error');
      setNewsletterError('Subscribe form not configured yet.');
      return;
    }

    setNewsletterStatus('loading');
    setNewsletterError('');

    const result = await subscribeToMailchimp(MAILCHIMP_URL, newsletterEmail);
    if (result.success) {
      setNewsletterStatus('success');
      setNewsletterEmail('');
      trackEvent('Subscribe Form Submitted');
    } else {
      setNewsletterStatus('error');
      setNewsletterError(result.message);
    }
  };

  return (
    <>
      <div className="reveal">
        <p className="contact__lede">
          Are you ready to take your brand to the <em>next level?</em> Reach out.
        </p>

        <div className="about__signature" style={{ marginTop: 48 }}>
          — Direct line
          <strong>hello@hgmarketing.com</strong>
        </div>
      </div>

      <form className="form reveal" style={{ '--rd': '120ms' } as React.CSSProperties} onSubmit={handleContactSubmit}>
        <div className="field">
          <label className="field__label" htmlFor="f-name">Your name</label>
          <input className="field__input" id="f-name" name="name" type="text" placeholder="Maria Calder" required disabled={contactStatus === 'loading'} />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="f-org">Agency / Org</label>
          <input className="field__input" id="f-org" name="organisation" type="text" placeholder="Invest in [Country]" required disabled={contactStatus === 'loading'} />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="f-email">Email</label>
          <input className="field__input" id="f-email" name="email" type="email" placeholder="m.calder@agency.gov" required disabled={contactStatus === 'loading'} />
        </div>
        <div className="field field--textarea">
          <label className="field__label" htmlFor="f-msg">In a sentence</label>
          <textarea className="field__input" id="f-msg" name="message" placeholder="Where you are, what you're after — a paragraph is plenty." disabled={contactStatus === 'loading'} />
        </div>
        {contactStatus === 'error' && contactError && (
          <p role="alert" style={{ color: '#c00', fontSize: '0.9rem', marginTop: 8 }}>{contactError}</p>
        )}
        <div className="form__submit">
          <button type="submit" className="btn btn--primary" disabled={contactStatus === 'loading' || contactStatus === 'success'}>
            {contactStatus === 'success' ? 'Sent — talk soon' :
             contactStatus === 'loading' ? 'Sending…' :
             <>Send the note <span className="arrow">→</span></>}
          </button>
        </div>
      </form>

      <div className="form__newsletter reveal">
        <div>
          <h3>Sign up for quarterly newsletter.</h3>
          <p>— Four notes a year. No noise.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
          <input
            type="email"
            placeholder="your@agency.gov"
            required
            aria-label="Email"
            value={newsletterEmail}
            onChange={(e) => setNewsletterEmail(e.target.value)}
            disabled={newsletterStatus === 'loading' || newsletterStatus === 'success'}
          />
          <button type="submit" disabled={newsletterStatus === 'loading' || newsletterStatus === 'success' || !newsletterEmail}>
            {newsletterStatus === 'success' ? 'Subscribed ✓' :
             newsletterStatus === 'loading' ? 'Subscribing…' :
             'Subscribe →'}
          </button>
        </form>
        {newsletterStatus === 'error' && newsletterError && (
          <p role="alert" style={{ color: '#c00', fontSize: '0.85rem', marginTop: 8 }}>{newsletterError}</p>
        )}
      </div>
    </>
  );
}
