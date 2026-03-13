import Link from 'next/link';

const navLinks = [
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/work' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy Policy', href: '/privacy' },
];

// TODO: replace social links with CMS-managed site-settings values
const socialLinks = [
  { label: 'LinkedIn', href: '#' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <span className="font-bold text-xl tracking-tight">IPA</span>{/* TODO: replace */}
            <p className="text-neutral-300 text-sm leading-relaxed max-w-xs">
              Expert IPA marketing strategy and agency management.{/* TODO: replace with tagline from CMS */}
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-300 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Social + contact */}
          <div className="flex flex-col gap-3">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-neutral-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="mailto:hello@example.com" /* TODO: replace with CMS contact email */
              className="text-sm text-neutral-300 hover:text-white transition-colors mt-2"
            >
              hello@example.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-xs text-neutral-400">
            &copy; {year} IPA Marketing Agency. All rights reserved.{/* TODO: replace firm name */}
          </p>
          <Link href="/privacy" className="text-xs text-neutral-400 hover:text-white transition-colors">
            Privacy &amp; Cookie Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
