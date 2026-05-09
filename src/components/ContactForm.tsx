'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [newsletterDone, setNewsletterDone] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;
    if (endpoint) {
      const data = new FormData(form);
      await fetch(endpoint, { method: 'POST', body: data, headers: { Accept: 'application/json' } });
    }
    setSubmitted(true);
  };

  return (
    <>
      <div className="reveal">
        <p className="contact__lede">
          If your agency is <strong>ready</strong> to raise its profile, sharpen its brand, and attract the <em>investors it deserves</em> — start here.
        </p>

        <div className="about__signature" style={{ marginTop: 48 }}>
          — Direct line
          <strong>hello@hgmarketing.com</strong>
        </div>
      </div>

      <form className="form reveal" style={{ '--rd': '120ms' } as React.CSSProperties} onSubmit={handleSubmit}>
        <div className="field">
          <label className="field__label" htmlFor="f-name">Your name</label>
          <input className="field__input" id="f-name" name="name" type="text" placeholder="Maria Calder" required />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="f-org">Agency / Org</label>
          <input className="field__input" id="f-org" name="organisation" type="text" placeholder="Invest in [Country]" required />
        </div>
        <div className="field">
          <label className="field__label" htmlFor="f-email">Email</label>
          <input className="field__input" id="f-email" name="email" type="email" placeholder="m.calder@agency.gov" required />
        </div>
        <div className="field field--textarea">
          <label className="field__label" htmlFor="f-msg">In a sentence</label>
          <textarea className="field__input" id="f-msg" name="message" placeholder="Where you are, what you're after — a paragraph is plenty." />
        </div>
        <div className="form__submit">
          <button type="submit" className="btn btn--primary" disabled={submitted}>
            {submitted ? 'Sent — talk soon' : <>Send the note <span className="arrow">→</span></>}
          </button>
        </div>
      </form>

      <div className="form__newsletter reveal">
        <div>
          <h3>The Quarterly.</h3>
          <p>— Four notes a year. No noise.</p>
        </div>
        <form
          className="newsletter-form"
          onSubmit={(e) => { e.preventDefault(); setNewsletterDone(true); }}
        >
          <input type="email" placeholder="your@agency.gov" required aria-label="Email" />
          <button type="submit" disabled={newsletterDone}>
            {newsletterDone ? 'Subscribed ✓' : 'Subscribe →'}
          </button>
        </form>
      </div>
    </>
  );
}
