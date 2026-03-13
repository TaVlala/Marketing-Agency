import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy & Cookie Policy',
  description: 'How IPA Marketing Agency collects, uses, and protects your personal data.',
};

export default function PrivacyPage() {
  return (
    <section className="pt-40 pb-24 md:pt-48 md:pb-32">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 mb-6">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-extrabold text-primary tracking-tight mb-12">
            Privacy &amp; Cookie Policy
          </h1>

          <div className="prose prose-neutral max-w-none text-neutral-600 space-y-8">
            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Who we are</h2>
              <p className="leading-relaxed">
                IPA Marketing Agency is a marketing consultancy. This policy explains how we
                collect and use personal data when you visit this website or contact us.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Data we collect</h2>
              <p className="leading-relaxed mb-3">
                We collect personal data only when you voluntarily provide it — for example, when
                you submit our contact form or subscribe to our mailing list. This may include your
                name, email address, and the organisation you represent.
              </p>
              <p className="leading-relaxed">
                We do not collect sensitive personal data and we do not sell personal data to
                third parties.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">How we use your data</h2>
              <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                <li>To respond to enquiries submitted via our contact form</li>
                <li>To send you our newsletter if you have subscribed (you can unsubscribe at any time)</li>
                <li>To improve our website based on aggregate, anonymised usage data</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Third-party services</h2>
              <ul className="list-disc pl-5 space-y-2 leading-relaxed">
                <li>
                  <strong>Formspree</strong> — processes contact form submissions. See{' '}
                  <a href="https://formspree.io/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">
                    Formspree&rsquo;s Privacy Policy
                  </a>.
                </li>
                <li>
                  <strong>Mailchimp</strong> — manages our mailing list. See{' '}
                  <a href="https://mailchimp.com/legal/privacy/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">
                    Mailchimp&rsquo;s Privacy Policy
                  </a>.
                </li>
                <li>
                  <strong>Plausible Analytics</strong> — privacy-first, cookieless website analytics.
                  No personal data is collected. See{' '}
                  <a href="https://plausible.io/privacy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">
                    Plausible&rsquo;s Privacy Policy
                  </a>.
                </li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Cookies</h2>
              <p className="leading-relaxed mb-3">
                This website uses only functional cookies necessary for operation. We ask for your
                consent before loading Plausible Analytics. Plausible does not use cookies or
                collect personal data.
              </p>
              <p className="leading-relaxed">
                You can withdraw consent at any time by clearing your browser&rsquo;s local storage
                or contacting us.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Your rights</h2>
              <p className="leading-relaxed">
                Under UK GDPR you have the right to access, correct, or delete the personal data
                we hold about you. To exercise any of these rights, please contact us at{' '}
                <a href="mailto:hello@example.com" className="underline hover:text-primary transition-colors">
                  hello@example.com
                </a>{/* TODO: replace with CMS contact email */}.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-primary mb-3">Changes to this policy</h2>
              <p className="leading-relaxed">
                We may update this policy from time to time. The current version is always
                published at this URL. Last updated: March 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
