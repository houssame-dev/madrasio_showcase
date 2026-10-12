'use client';

import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa6';

import InfiniteBanner from '@/components/InfiniteBanner';
import { useLanguage } from '@/components/LanguageProvider';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <>
      <section className="relative w-full overflow-hidden bg-slate-50/50 min-h-screen">
        {/* Gradient glow: top-right */}
        <div
          aria-hidden="true"
          className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-bl from-slate-200/50 via-slate-100/30 to-transparent rounded-full blur-3xl pointer-events-none"
        />
        {/* Gradient glow: bottom center/left */}
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-slate-200/40 via-slate-100/20 to-transparent rounded-full blur-3xl pointer-events-none"
        />
        {/* Layered SVG waves */}
        <svg
          className="absolute inset-0 w-full h-full preserve-3d pointer-events-none z-0"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 800"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          {/* Top-Right Soft Wave */}
          <path
            d="M800 0 C1000 120 1250 80 1440 200 V0 H800 Z"
            fill="url(#topWaveGrad)"
            opacity="0.6"
          />
          {/* Bottom Curved Layer 1 */}
          <path
            d="M0 650 C400 500 900 780 1440 600 V800 H0 V650 Z"
            fill="url(#bottomWaveGrad1)"
            opacity="0.8"
          />
          {/* Bottom Curved Layer 2 (Foreground accent) */}
          <path
            d="M0 720 C500 580 1000 750 1440 680 V800 H0 V720 Z"
            fill="url(#bottomWaveGrad2)"
            opacity="0.9"
          />
          <defs>
            <linearGradient id="topWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f1f5f9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="bottomWaveGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#f1f5f9" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.3" />
            </linearGradient>
            <linearGradient id="bottomWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#f8fafc" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </svg>
        <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-40">
          <div className="flex flex-col items-center justify-center text-center mx-auto w-full">
            {/* Category Badge */}
            <span className="inline-flex mx-auto items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#14213D]/15 text-[#14213D] text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm mb-6 whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-300 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              {t('hero.badge')}
            </span>

            {/* Main Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#14213D] leading-tight text-balance text-center mx-auto max-w-4xl">
              {t('hero.title')}{' '}
              <span className="text-[#FCA311]">{t('hero.titleHighlight')}</span>
            </h1>

            {/* Subheading */}
            <p className="text-gray-600 text-base sm:text-lg mt-6 text-center mx-auto max-w-2xl">
              {t('hero.subtitle')}
            </p>

            {/* CTA Buttons */}
              <div className="flex flex-row flex-wrap justify-center gap-4 mt-8 w-full max-w-md mx-auto">
              <a
                href="#contact"
                  className="bg-[#FCA311] hover:bg-[#e0920f] text-[#14213D] font-bold px-2 sm:px-6 py-3.5 rounded-xl shadow-md flex-1 flex justify-center items-center gap-2 whitespace-nowrap text-sm sm:text-base"
              >
                  {t('hero.ctaPrimary')}
                  <FaArrowRight aria-hidden="true" className="rtl:rotate-180 shrink-0" />
              </a>
              <a
                href="https://app.madrasio.com"
                target="_blank"
                rel="noopener noreferrer"
                  className="bg-[#14213D] hover:bg-[#0c1527] text-white font-bold px-2 sm:px-6 py-3.5 rounded-xl flex-1 flex justify-center items-center whitespace-nowrap text-sm sm:text-base"
              >
                {t('hero.ctaSecondary')}
              </a>
            </div>

            {/* Dashboard Mockup */}
            <div className="relative w-full overflow-hidden mt-16">
              <Image
                src="/images/dashboard-mockup-desktop.png"
                alt="Madrasio dashboard preview"
                width={1672}
                height={941}
                className="hidden md:block w-full h-auto object-cover"
                priority
              />
              <Image
                src="/images/dashboard-mockup-mobile.png"
                alt="Madrasio dashboard preview"
                width={941}
                height={1672}
                className="block md:hidden w-full h-auto max-w-sm mx-auto object-cover"
                priority
              />
            </div>
           
          </div>
        </div>
      </section>
      <InfiniteBanner />
    </>
  );
}
