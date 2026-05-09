import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import ClientEffects from '@/components/ClientEffects';

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
      <ClientEffects />
    </>
  );
}
