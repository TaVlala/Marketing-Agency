import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(
    (process.env.NEXT_PUBLIC_SITE_URL ?? '').startsWith('http')
      ? process.env.NEXT_PUBLIC_SITE_URL!
      : 'https://hgmarketing.com'
  ),
  title: {
    default: 'HGM · Hidden Gem Marketing',
    template: '%s | HGM · Hidden Gem Marketing',
  },
  description:
    'HGM is a boutique marketing consultancy specialised in investment promotion. We help IPAs raise their profile, sharpen their brand, and attract the investors they deserve.',
  openGraph: {
    type: 'website',
    siteName: 'HGM · Hidden Gem Marketing',
    title: 'HGM · Hidden Gem Marketing',
    description:
      'HGM is a boutique marketing consultancy specialised in investment promotion. We help IPAs raise their profile, sharpen their brand, and attract the investors they deserve.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HGM · Hidden Gem Marketing',
    description:
      'HGM is a boutique marketing consultancy specialised in investment promotion. We help IPAs raise their profile, sharpen their brand, and attract the investors they deserve.',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,300;0,6..72,400;0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,300;1,6..72,400;1,6..72,500&family=Inter:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
