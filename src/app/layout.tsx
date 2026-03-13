import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import '@/styles/globals.css';

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: {
    default: 'IPA Marketing Agency',
    template: '%s | IPA Marketing Agency',
  },
  description:
    'Expert IPA marketing strategy, agency management, campaign audits, and best practice training.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="bg-base text-primary font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
