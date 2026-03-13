import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import '@/styles/globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://example.com'),
  title: {
    default: 'IPA Marketing Agency',
    template: '%s | IPA Marketing Agency',
  },
  description:
    'Expert IPA marketing strategy, agency management, campaign audits, and best practice training.',
  openGraph: {
    type: 'website',
    siteName: 'IPA Marketing Agency',
    title: 'IPA Marketing Agency',
    description:
      'Expert IPA marketing strategy, agency management, campaign audits, and best practice training.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IPA Marketing Agency',
    description:
      'Expert IPA marketing strategy, agency management, campaign audits, and best practice training.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="bg-base text-primary font-sans antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
        <CookieConsent />
      </body>
    </html>
  );
}
