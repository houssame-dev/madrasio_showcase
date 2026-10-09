'use client';

import { useEffect, useState } from 'react';
import {
  FaChevronDown,
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from 'react-icons/fa6';
import { ImMenu } from 'react-icons/im';
import { FaWindowClose } from 'react-icons/fa';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  GB,
  FR,
  MA,
  ES,
  PT,
  IT,
  DE,
  TR,
  NL,
  RU,
  CN,
  JP,
} from 'country-flag-icons/react/3x2';

const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
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

const languages = [
  { code: 'en', name: 'English', Flag: GB, dir: 'ltr' },
  { code: 'fr', name: 'Français', Flag: FR, dir: 'ltr' },
  { code: 'ar', name: 'العربية', Flag: MA, dir: 'rtl' },
  { code: 'es', name: 'Español', Flag: ES, dir: 'ltr' },
  { code: 'pt', name: 'Português', Flag: PT, dir: 'ltr' },
  { code: 'it', name: 'Italiano', Flag: IT, dir: 'ltr' },
  { code: 'de', name: 'Deutsch', Flag: DE, dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', Flag: TR, dir: 'ltr' },
  { code: 'nl', name: 'Nederlands', Flag: NL, dir: 'ltr' },
  { code: 'ru', name: 'Русский', Flag: RU, dir: 'ltr' },
  { code: 'zh', name: '中文', Flag: CN, dir: 'ltr' },
  { code: 'ja', name: '日本語', Flag: JP, dir: 'ltr' },
];

const getLanguageDir = (code: string) =>
  languages.find((lang) => lang.code === code)?.dir ?? 'ltr';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState('en');
  const [isScrolled, setIsScrolled] = useState(false);
  // Mobile language list uses click-driven inline expansion (touch-safe:
  // no hover, no floating portal that could clip or hide behind the overlay).
  const [isLangOpen, setIsLangOpen] = useState(false);

  // Solid navy background once scrolled OR while the mobile menu is open
  // (so the header blends seamlessly with the navy mobile overlay).
  const navbarSolid = isScrolled || isMenuOpen;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLanguageChange = (value: string | null) => {
    if (!value) return;
    setCurrentLang(value);
    // Close the mobile menu on selection so the newly applied
    // language (and RTL/LTR direction) is immediately visible.
    // No-op on desktop where the menu is already closed.
    setIsMenuOpen(false);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = value;
      document.documentElement.dir = getLanguageDir(value);
    }
  };

  const currentLanguage =
    languages.find((lang) => lang.code === currentLang) ?? languages[0];

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = currentLang;
      document.documentElement.dir = getLanguageDir(currentLang);
    }
  }, [currentLang]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isMenuOpen]);

  // Never trap keyboard focus: Escape closes the mobile drawer and
  // focus stays in the normal tab order (no focus lock is applied).
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed top-0 start-0 end-0 transition-all duration-300 ${
        isMenuOpen ? 'z-[999]' : 'z-50'
      } ${
        navbarSolid
          ? 'bg-[#14213D] py-3 shadow-md border-b border-[#14213D]'
          : 'bg-transparent py-5 border-b border-transparent'
      }`}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-10 w-full items-center justify-between px-4 sm:px-8 lg:px-12 xl:px-16"
      >
        {/* Brand logo (far left) */}
        <a
          href="#top"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2 font-bold text-xl tracking-tight"
        >
          <img
            src={navbarSolid ? '/logo-white.png' : '/logo-black.png'}
            alt="Madrasio Logo"
            className="w-12 h-12 object-contain"
          />
          <span className={navbarSolid ? 'text-white' : 'text-[#14213D]'}>
            Madrasio
          </span>
        </a>

        {/* Desktop links (center/right) */}
        <ul className="hidden items-center gap-4 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-[#FCA311] ${
                  navbarSolid ? 'text-white' : 'text-[#14213D]'
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTA (far right) */}
        <div className="hidden items-center gap-3 md:flex">
          <Select onValueChange={handleLanguageChange} value={currentLang}>
            <SelectTrigger
              aria-label="Select language"
              className="inline-flex items-center justify-between gap-2 px-4 py-2 rounded-xl bg-[#14213D] border border-white/20 text-white text-sm font-semibold hover:border-[#FCA311]/50 transition-colors cursor-pointer min-h-[44px]"
            >
              <SelectValue placeholder="EN">
                {(value: string | null) => {
                  const lang =
                    languages.find((l) => l.code === value) ?? currentLanguage;
                  const Flag = lang.Flag;
                  return (
                    <span className="flex items-center gap-1.5">
                      <Flag
                        style={{ width: 18, height: 13 }}
                        className="shrink-0 rounded-[2px]"
                      />
                      {lang.code.toUpperCase()}
                    </span>
                  );
                }}
              </SelectValue>
            </SelectTrigger>
            <SelectContent
              sideOffset={8}
              className="w-48 bg-[#14213D] border border-[#FCA311]/40 rounded-2xl p-2 shadow-2xl text-white z-[999] max-h-60 overflow-y-auto"
            >
              {languages.map((lang) => (
                <SelectItem
                  key={lang.code}
                  value={lang.code}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-white text-sm font-medium hover:bg-white/10 cursor-pointer transition-colors whitespace-nowrap"
                >
                  <lang.Flag
                    style={{ width: 20, height: 14 }}
                    className="shrink-0 rounded-[2px]"
                  />
                  <span>{lang.name}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <a
            href="#contact"
            className="inline-flex items-center rounded-md bg-[#FCA311] px-4 py-2 text-sm font-bold text-[#14213D] transition-colors hover:bg-[#e08f0a]"
          >
            Book a Demo
          </a>
        </div>

        {/* Mobile hamburger toggle */}
        <button
          type="button"
          onClick={() => {
            setIsMenuOpen((prev) => !prev);
            setIsLangOpen(false);
          }}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className={`inline-flex items-center justify-center p-2 rounded-md md:hidden min-h-[44px] min-w-[44px] transition-colors hover:text-[#FCA311] ${
            isMenuOpen
              ? 'text-white'
              : isScrolled
                ? 'text-white'
                : 'text-[#14213D]'
          }`}
        >
          {isMenuOpen ? (
            <FaWindowClose className="w-6 h-6 text-white" />
          ) : (
            <ImMenu className="w-6 h-6" />
          )}
        </button>
      </nav>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <nav
          id="mobile-menu"
          aria-label="Mobile navigation"
          className="absolute inset-x-0 top-full h-[calc(100dvh-100%)] bg-[#14213D] text-[#FFFFFF] z-[999] flex flex-col justify-between p-6 overflow-y-auto md:hidden"
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
                  className="text-[#E5E5E5] hover:text-[#FCA311] transition-colors p-2 text-xl min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Bottom Section: Language + CTA */}
          <div className="w-full pt-6 flex flex-col items-center space-y-4 border-t border-[#FFFFFF]/10 mt-auto">
            <div className="flex justify-center w-full">
              <div className="relative">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsLangOpen((prev) => !prev);
                  }}
                  aria-expanded={isLangOpen}
                  aria-label="Select language"
                  className="inline-flex items-center justify-between gap-2 px-4 py-2 rounded-xl bg-[#14213D] border border-white/20 text-white text-sm font-semibold hover:border-[#FCA311]/50 transition-colors cursor-pointer min-h-[44px]"
                >
                  <span className="flex items-center gap-1.5">
                    {(() => {
                      const Flag = currentLanguage.Flag;
                      return (
                        <>
                          <Flag
                            style={{ width: 18, height: 13 }}
                            className="shrink-0 rounded-[2px]"
                          />
                          {currentLanguage.code.toUpperCase()}
                        </>
                      );
                    })()}
                  </span>
                  <FaChevronDown
                    aria-hidden="true"
                    className={`text-[10px] shrink-0 transition-transform duration-200 ${
                      isLangOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isLangOpen && (
                  <ul className="absolute bottom-full mb-2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 w-48 bg-[#14213D] border border-[#FCA311]/40 rounded-2xl p-2 shadow-2xl text-white z-[999] max-h-60 overflow-y-auto flex flex-col gap-0.5">
                    {languages.map((lang) => {
                      const LangFlag = lang.Flag;
                      const isActive = lang.code === currentLang;
                      return (
                        <li key={lang.code}>
                          <button
                            type="button"
                            onClick={() => {
                              handleLanguageChange(lang.code);
                              setIsLangOpen(false);
                            }}
                            aria-current={isActive ? 'true' : undefined}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors whitespace-nowrap w-full ${
                              isActive
                                ? 'bg-[#FCA311] text-[#14213D]'
                                : 'text-white hover:bg-white/10'
                            }`}
                          >
                            <LangFlag
                              style={{ width: 20, height: 14 }}
                              className="shrink-0 rounded-[2px]"
                            />
                            <span>{lang.name}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            </div>
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="w-full bg-[#FCA311] hover:bg-[#FCA311]/90 text-[#000000] font-bold py-3.5 rounded-lg text-center text-lg"
            >
              Book a Demo
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
