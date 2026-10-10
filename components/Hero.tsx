'use client';

import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa6';

import InfiniteBanner from '@/components/InfiniteBanner';
import { useLanguage } from '@/components/LanguageProvider';

export default function Hero() {
  const { t } = useLanguage();
  return (
    <>
      <section className="relative w-full overflow-hidden bg-white min-h-screen">
        <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-40">
          <div className="flex flex-col items-center justify-center text-center mx-auto w-full">
            {/* Category Badge */}
            <span className="inline-flex mx-auto items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#14213D]/15 text-[#14213D] text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm mb-6 whitespace-nowrap">
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

              <Image
                src="/images/dashboard-mockup.png"
                alt="Madrasio dashboard preview"
                width={1600}
                height={900}
                className="w-full h-auto object-cover aspect-video mt-32"
                priority
              />
           
          </div>
        </div>
      </section>
      <InfiniteBanner />
    </>
  );
}
