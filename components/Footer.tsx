import {
  FaCube,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPhone,
  FaShieldHalved,
  FaXTwitter,
  FaWhatsapp,
} from 'react-icons/fa6';

const QUICK_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#privacy-policy' },
  { label: 'Terms of Service', href: '#terms-of-service' },
  { label: 'Cookie Policy', href: '#cookie-policy' },
];

const SOCIAL_LINKS = [
  {
    label: 'Madrasio on LinkedIn',
    href: 'https://www.linkedin.com/showcase/madrasio',
    Icon: FaLinkedinIn,
  },
  {
    label: 'Madrasio on Facebook',
    href: 'https://www.facebook.com/Madrasio',
    Icon: FaFacebookF,
  },
  {
    label: 'Madrasio on X',
    href: 'https://x.com/madrasio',
    Icon: FaXTwitter,
  },
  {
    label: 'Madrasio on Instagram',
    href: 'https://www.instagram.com/madrasio',
    Icon: FaInstagram,
  },
];

const CONTACT_ITEMS = [
  { label: 'Phone', value: '+212 60 79 91 55 44', Icon: FaWhatsapp  },
  { label: 'Email', value: 'contact@madrasio.com', Icon: FaEnvelope },
];

function ColumnHeading({ children }: { children: string }) {
  return (
    <>
      <p className="font-bold text-[#FFFFFF]">{children}</p>
      <div className="w-6 h-[2px] bg-[#FCA311] mt-1 mb-4" />
    </>
  );
}

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-[#E5E5E5] overflow-hidden">
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand Section (centered on mobile, left-aligned on desktop) */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <p className="text-2xl font-bold tracking-tight text-[#FFFFFF] flex items-center">
              <img
                src="/logo-colored.png"
                alt="Madrasio Logo"
                className="w-12 h-12 object-contain inline-block mr-2"
              />
              <span className="font-bold text-2xl tracking-tight">
                <span className="text-[#14213D]">Ma</span>
                <span className="text-[#FCA311]">dr</span>
                <span className="text-[#E5E5E5]">as</span>
                <span className="text-[#FFFFFF]">io</span>
              </span>
            </p>
            <p className="text-sm text-[#E5E5E5] mt-1 max-w-sm">
              All-in-One School Management System
            </p>
            <p className="text-[#FCA311] font-medium text-sm mt-2">
              A product by Gemistra Tech
            </p>
            <div className="flex gap-3 mt-4 text-[#E5E5E5]">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-md border border-[#E5E5E5]/20 hover:border-[#FCA311] hover:text-[#FCA311] transition-all"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Navigation Columns */}
          <div className="hidden md:flex gap-16">
            <div>
              <ColumnHeading>Quick Links</ColumnHeading>
              <ul className="flex flex-col space-y-3 text-sm text-[#E5E5E5]">
                {QUICK_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ColumnHeading>Legal</ColumnHeading>
              <ul className="flex flex-col space-y-3 text-sm text-[#E5E5E5]">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <ColumnHeading>Contact</ColumnHeading>
              <ul className="flex flex-col space-y-3 text-sm text-[#E5E5E5]">
                {CONTACT_ITEMS.map(({ label, value, Icon }) => (
                  <li key={label} className="flex items-center gap-3">
                    <span className="w-9 h-9 border border-[#E5E5E5]/20 rounded-md flex items-center justify-center text-[#FCA311]">
                      <Icon aria-hidden="true" size={20} />
                    </span>
                    <span>{value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Mobile Static Navigation (always visible) */}
        <div className="md:hidden w-full mt-8">
          <div className="border-b border-[#E5E5E5]/10 pb-6 mb-6">
            <p className="flex items-center font-bold text-[#FFFFFF]">
              <FaCube className="text-[#FCA311] mr-3" aria-hidden="true" />
              Quick Links
            </p>
            <ul className="flex flex-col space-y-3 text-sm text-[#E5E5E5] mt-4">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-b border-[#E5E5E5]/10 pb-6 mb-6">
            <p className="flex items-center font-bold text-[#FFFFFF]">
              <FaShieldHalved
                className="text-[#FCA311] mr-3"
                aria-hidden="true"
              />
              Legal
            </p>
            <ul className="flex flex-col space-y-3 text-sm text-[#E5E5E5] mt-4">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="border-b border-[#E5E5E5]/10 pb-6 mb-6 last:border-b-0">
            <p className="flex items-center font-bold text-[#FFFFFF]">
              <FaPhone className="text-[#FCA311] mr-3" aria-hidden="true" />
              Contact
            </p>
            <ul className="flex flex-col space-y-3 text-sm text-[#E5E5E5] mt-4">
              {CONTACT_ITEMS.map(({ label, value, Icon }) => (
                <li key={label} className="flex items-center gap-3">
                  <span className="w-9 h-9 border border-[#E5E5E5]/20 rounded-md flex items-center justify-center text-[#FCA311]">
                    <Icon aria-hidden="true" size={20} />
                  </span>
                  <span>{value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider with center glow */}
        <div className="relative h-px w-full bg-[#E5E5E5]/10 mt-12 mb-6">
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>© 2026 Madrasio. All rights reserved.</p>
          <div className="space-x-4">
            {LEGAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
