'use client';

import { useEffect, useState } from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from 'react-icons/fa6';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Roles', href: '#roles' },
  { label: 'Security', href: '#security' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  {
    label: 'Madrasio on LinkedIn',
    href: 'https://www.linkedin.com/showcase/madrasio',
    Icon: FaLinkedin,
  },
  {
    label: 'Madrasio on Facebook',
    href: 'https://www.facebook.com/Madrasio',
    Icon: FaFacebook,
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

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const LANGUAGES = ['EN', 'FR', 'ES', 'PT', 'DE', 'IT', 'AR'];

  const languageSelectClassName =
    'bg-transparent text-[#FFFFFF] border border-[#FFFFFF]/30 rounded px-2 py-1 text-sm outline-none focus:border-[#FCA311] [&>option]:text-black';

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-50 bg-[#14213D] text-[#FFFFFF]">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Brand logo (far left) */}
        <a
          href="#top"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2 font-bold text-xl tracking-tight text-[#FFFFFF]"
        >
          <img
            src="/madrasio-logo.png"
            alt="Madrasio Logo"
            className="w-12 h-12 object-contain"
          />
          Madrasio
        </a>

        {/* Desktop links (center/right) */}
        <ul className="hidden items-center gap-4 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="text-sm font-medium text-[#FFFFFF] transition-colors hover:text-[#E5E5E5]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA (far right) */}
        <div className="hidden items-center gap-3 md:flex">
          <select
            aria-label="Select language"
            defaultValue="EN"
            className={languageSelectClassName}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <a
            href="#contact"
            className="inline-flex items-center rounded-md bg-[#FCA311] px-4 py-2 text-sm font-bold text-[#000000] transition-colors hover:bg-[#e5940b]"
          >
            Request Early Access
          </a>
        </div>

        {/* Mobile hamburger toggle */}
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex items-center justify-center rounded-md p-2 text-[#FFFFFF] hover:text-[#E5E5E5] md:hidden"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="fixed inset-x-0 top-16 h-[calc(100dvh-4rem)] bg-[#14213D] text-[#FFFFFF] z-50 flex flex-col justify-between p-6 overflow-y-auto md:hidden"
        >
          {/* Centered Navigation Links & Social Icons Section */}
          <div className="flex-1 flex flex-col items-center justify-center space-y-8 my-auto w-full">
            <ul className="flex flex-col items-center justify-center space-y-6 text-center text-2xl font-bold">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-[#FFFFFF] hover:text-[#FCA311] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            <div className="flex items-center justify-center space-x-6 pt-4">
              {SOCIAL_LINKS.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="text-[#E5E5E5] hover:text-[#FCA311] transition-colors p-2 text-xl"
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Section: Language + CTA */}
          <div className="w-full pt-6 flex flex-col items-center space-y-4 border-t border-[#FFFFFF]/10 mt-auto">
            <div className="flex justify-center w-full">
              <select
                aria-label="Select language"
                defaultValue="EN"
                className={languageSelectClassName}
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-[#FCA311] hover:bg-[#FCA311]/90 text-[#000000] font-bold py-3.5 rounded-lg text-center text-lg"
            >
              Request Early Access
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
