'use client';

import { useState, FormEvent, useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';

const FORMSPREE_URL = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || '';
const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL || '';
const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || '';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function HomeContactSection() {
  const [contactStatus, setContactStatus] = useState<FormStatus>('idle');
  const [contactError, setContactError] = useState('');

  useEffect(() => {
    if (contactStatus === 'success') {
      const t = setTimeout(() => setContactStatus('idle'), 5000);
      return () => clearTimeout(t);
    }
  }, [contactStatus]);

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
        if (PAYLOAD_URL) {
          fetch(`${PAYLOAD_URL}/api/submissions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: data.get('name'),
              email: data.get('email'),
              organisation: data.get('organisation'),
              message: data.get('message'),
            }),
          }).catch(() => {});
        }
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
    setNewsletterStatus('loading');
    setNewsletterError('');

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: newsletterEmail }),
    });
    const result = await res.json();
    if (result.success) {
      setNewsletterStatus('success');
      setNewsletterEmail('');
      trackEvent('Subscribe Form Submitted');
      if (PAYLOAD_URL) {
        fetch(`${PAYLOAD_URL}/api/subscribers`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: newsletterEmail }),
        }).catch(() => {});
      }
    } else {
      setNewsletterStatus('error');
      setNewsletterError(result.message);
    }
  };

  return (
    <>
      <div className="contact__body reveal">
        <div className="contact__left">
          <p className="contact__pitch">
            Ready to take your location<br />marketing to the <em>next level?</em><br />Reach out.
          </p>
          <div className="contact__direct">
            <span className="label">Direct line</span>
            <a href="mailto:hello@hgmrktng.com">hello@hgmrktng.com</a>
          </div>
        </div>

        <div className="contact__divider"></div>

        {contactStatus === 'success' ? (
          <div className="contact__thankyou">
            <p className="contact__thankyou-title">Thank you for reaching out.</p>
            <p className="contact__thankyou-sub">Our team will reply shortly.</p>
          </div>
        ) : (
          <form className="contact__form" onSubmit={handleContactSubmit}>
            <div className="field-row">
              <label className="field-row__label" htmlFor="c-name"><span className="num"></span>Name</label>
              <div className="field-row__input-wrap">
                <span className="field-row__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" /></svg>
                </span>
                <input id="c-name" name="name" type="text" required disabled={contactStatus === 'loading'} />
              </div>
            </div>

            <div className="field-row">
              <label className="field-row__label" htmlFor="c-org"><span className="num"></span>Organisation</label>
              <div className="field-row__input-wrap">
                <span className="field-row__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M3 21V7l8-4 8 4v14" /><path d="M3 21h18" /><path d="M8 11h0M8 15h0M14 11h0M14 15h0" /></svg>
                </span>
                <input id="c-org" name="organisation" type="text" required disabled={contactStatus === 'loading'} />
              </div>
            </div>

            <div className="field-row">
              <label className="field-row__label" htmlFor="c-email"><span className="num"></span>Email</label>
              <div className="field-row__input-wrap">
                <span className="field-row__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 7l9 6 9-6" /></svg>
                </span>
                <input id="c-email" name="email" type="email" required disabled={contactStatus === 'loading'} />
              </div>
            </div>

            <div className="field-row field-row--note">
              <label className="field-row__label" htmlFor="c-note"><span className="num"></span>Your note</label>
              <div className="field-row__input-wrap">
                <span className="field-row__icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24"><path d="M4 20l4-1L19 8a2 2 0 0 0 0-2.8L18.8 5a2 2 0 0 0-2.8 0L5 16l-1 4z" /><path d="M14 7l3 3" /></svg>
                </span>
                <textarea id="c-note" name="message" rows={2} disabled={contactStatus === 'loading'} />
              </div>
            </div>

            {contactStatus === 'error' && contactError && (
              <p role="alert" style={{ color: '#c00', fontSize: '0.9rem', marginTop: 8 }}>{contactError}</p>
            )}

            <div className="contact__submit">
              <button type="submit" className="send-btn" disabled={contactStatus === 'loading'}>
                {contactStatus === 'loading' ? 'Sending…' :
                 <>Send the note <span className="arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="13 6 19 12 13 18" /></svg></span></>}
              </button>
            </div>
          </form>
        )}
      </div>

      <div className="form__newsletter reveal" id="newsletter">
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
