'use client';

import { useState } from 'react';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Roles', href: '#roles' },
  { label: 'Security', href: '#security' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const LANGUAGES = ['EN', 'FR', 'ES', 'PT', 'DE', 'IT', 'AR'];

  const languageSelectClassName =
    'bg-transparent text-[#FFFFFF] border border-[#FFFFFF]/30 rounded px-2 py-1 text-sm outline-none focus:border-[#FCA311] [&>option]:text-black';

  return (
    <header className="sticky top-0 z-50 bg-[#14213D] text-[#FFFFFF]">
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        {/* Brand logo (far left) */}
        <a
          href="#top"
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
        <ul className="hidden items-center gap-8 md:flex">
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
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="inline-flex items-center justify-center rounded-md p-2 text-[#FFFFFF] hover:text-[#E5E5E5] md:hidden"
        >
          {isOpen ? (
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
      {isOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="border-t border-white/10 md:hidden"
        >
          <ul className="space-y-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-3 py-2 text-base font-medium text-[#FFFFFF] hover:text-[#E5E5E5]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="block rounded-md bg-[#FCA311] px-3 py-2 text-center text-base font-bold text-[#000000]"
              >
                Request Early Access
              </a>
            </li>
            <li className="pt-2 px-3">
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
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
