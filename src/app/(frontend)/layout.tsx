import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
