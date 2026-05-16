import type { Metadata } from 'next';
import { Newsreader, Inter } from 'next/font/google';
import '@/styles/globals.css';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import ClientEffects from '@/components/ClientEffects';
import { Analytics } from '@vercel/analytics/react';

const newsreader = Newsreader({
  subsets: ['latin'],
  axes: ['opsz'],
  style: ['normal', 'italic'],
  variable: '--font-newsreader',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? '';
if (!siteUrl.startsWith('http')) {
  console.warn(
    '[layout.tsx] NEXT_PUBLIC_SITE_URL is not set — OG/canonical URLs will fall back to https://hgmrktng.com. ' +
    'Set this env var in Vercel for correct metadata.'
  );
}

const description =
  'Boutique marketing consultancy for investment promotion agencies. We help IPAs sharpen their brand, build their narrative, and attract the investors they deserve.';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl.startsWith('http') ? siteUrl : 'https://hgmrktng.com'),
  title: {
    default: 'HGM · Hidden Gem Marketing',
    template: '%s | HGM · Hidden Gem Marketing',
  },
  description,
  icons: {
    apple: '/apple-touch-icon.png',
  },
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
  url: 'https://hgmrktng.com',
  logo: 'https://hgmrktng.com/favicon.svg',
  description,
  email: 'hello@hgmrktng.com',
  sameAs: [
    'https://www.linkedin.com/company/hgmarketing',
    'https://www.instagram.com/hgmarketing',
  ],
};

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${newsreader.variable} ${inter.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body suppressHydrationWarning>
        <Nav />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
        <ClientEffects />
        <Analytics />
      </body>
    </html>
  );
}
