import type { Metadata } from 'next';
import '@/styles/globals.css';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import ClientEffects from '@/components/ClientEffects';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
if (!siteUrl.startsWith('http')) {
  console.warn(
    '[layout.tsx] NEXT_PUBLIC_SITE_URL is not set — OG/canonical URLs will fall back to https://hgmarketing.com. ' +
    'Set this env var in Vercel for correct metadata.'
  );
}

const description =
  'Boutique marketing consultancy for investment promotion agencies. We help IPAs sharpen their brand, build their narrative, and attract the investors they deserve.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl.startsWith('http') ? siteUrl : 'https://hgmarketing.com'),
  title: {
    default: 'HGM · Hidden Gem Marketing',
    template: '%s | HGM · Hidden Gem Marketing',
  },
  description,
  openGraph: {
    type: 'website',
    siteName: 'HGM · Hidden Gem Marketing',
    title: 'HGM · Hidden Gem Marketing',
    description,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HGM · Hidden Gem Marketing',
    description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'HGM · Hidden Gem Marketing',
  url: 'https://hgmarketing.com',
  logo: 'https://hgmarketing.com/favicon.svg',
  description,
  email: 'hello@hgmarketing.com',
  sameAs: [
    'https://www.linkedin.com/company/hgmarketing',
    'https://www.instagram.com/hgmarketing',
  ],
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,300;1,6..72,400;1,6..72,500&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        <Nav />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <ClientEffects />
      </body>
    </html>
  );
}
