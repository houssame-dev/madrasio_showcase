'use client';

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

import { useLanguage } from '@/components/LanguageProvider';

const QUICK_LINK_HREFS = ['#features', '#pricing', '#faq', '#contact'];

const QUICK_LINK_KEYS = [
  'nav.features',
  'nav.pricing',
  'nav.faq',
  'nav.contact',
];

const LEGAL_HREFS = ['#privacy-policy', '#terms-of-service', '#cookie-policy'];

const SOCIAL_LINKS = [
  {
    labelKey: 'footer.socials.0',
    href: 'https://www.linkedin.com/showcase/madrasio',
    Icon: FaLinkedinIn,
  },
  {
    labelKey: 'footer.socials.1',
    href: 'https://www.facebook.com/Madrasio',
    Icon: FaFacebookF,
  },
  {
    labelKey: 'footer.socials.2',
    href: 'https://x.com/madrasio',
    Icon: FaXTwitter,
  },
  {
    labelKey: 'footer.socials.3',
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
  const { t, tp } = useLanguage();
  const quickLinks = QUICK_LINK_HREFS.map((href, index) => ({
    label: t(QUICK_LINK_KEYS[index]),
    href,
  }));
  const legalLinks = tp<Array<{ label: string }>>('footer.policies').map(
    ({ label }, index) => ({ label, href: LEGAL_HREFS[index] ?? '#' }),
  );
  return (
    <footer className="w-full bg-[#000000] text-[#E5E5E5] overflow-hidden">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          {/* Brand Section (centered on mobile, left-aligned on desktop) */}
          <div className="text-center md:text-start flex flex-col items-center md:items-start">
            <p className="text-2xl font-bold tracking-tight text-[#FFFFFF] flex items-center">
              <img
                src="/logo-white.png"
                alt="Madrasio Logo"
                className="w-12 h-12 object-contain inline-block me-2"
              />
              <span className="font-bold text-2xl tracking-tight">
                <span className="text-[#FFFFFF]">Madrasio</span>
              </span>
            </p>
            <p className="text-sm text-[#E5E5E5] mt-1 max-w-sm">
              {t('footer.tagline')}
            </p>
            <p className="text-[#FCA311] font-medium text-sm mt-2">
              {t('footer.byLine')}
            </p>
            <div className="flex gap-3 mt-4 text-[#E5E5E5]">
              {SOCIAL_LINKS.map(({ labelKey, href, Icon }) => (
                <a
                  key={labelKey}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t(labelKey)}
                  className="flex items-center justify-center w-10 h-10 min-h-[44px] min-w-[44px] rounded-md border border-[#E5E5E5]/20 hover:border-[#FCA311] hover:text-[#FCA311] transition-all"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Navigation Columns */}
          <div className="hidden md:flex gap-16">
            <div>
              <ColumnHeading>{t('footer.quickLinks')}</ColumnHeading>
              <ul className="flex flex-col space-y-3 text-sm text-[#E5E5E5]">
                {quickLinks.map((link) => (
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
              <ColumnHeading>{t('footer.legal')}</ColumnHeading>
              <ul className="flex flex-col space-y-3 text-sm text-[#E5E5E5]">
                {legalLinks.map((link) => (
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
              <ColumnHeading>{t('footer.contact')}</ColumnHeading>
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
              <FaCube className="text-[#FCA311] me-3" aria-hidden="true" />
              {t('footer.quickLinks')}
            </p>
            <ul className="flex flex-col space-y-3 text-sm text-[#E5E5E5] mt-4">
              {quickLinks.map((link) => (
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
                    className="text-[#FCA311] me-3"
                    aria-hidden="true"
                  />
                  {t('footer.legal')}
            </p>
            <ul className="flex flex-col space-y-3 text-sm text-[#E5E5E5] mt-4">
              {legalLinks.map((link) => (
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
              <FaPhone className="text-[#FCA311] me-3" aria-hidden="true" />
              {t('footer.contact')}
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

        {/* Divider */}
        <div className="relative h-px w-full bg-[#E5E5E5]/10 mt-12 mb-6">
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p>{t('footer.rights')}</p>
          <div className="space-x-4">
            {legalLinks.map((link) => (
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
