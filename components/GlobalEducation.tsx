'use client';

import { FaGlobe, FaGraduationCap, FaSchool } from 'react-icons/fa6';

import { useLanguage } from '@/components/LanguageProvider';

const TICKER_ITEMS = Array.from({ length: 5 }).map((_, index) => index);

const CARD_ICONS = [FaGlobe, FaGraduationCap, FaSchool];

export default function GlobalEducation() {
  const { t, tp } = useLanguage();
  const cards = tp<Array<{ title: string; description: string }>>(
    'globalEducation.cards',
  );
  return (
    <section id="features" className="w-full scroll-mt-16 bg-[#000000] overflow-hidden">

      {/* Section Header & Feature Cards */}
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center py-16 lg:py-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FCA311]/30 bg-[#14213D] text-[#FCA311] text-xs font-semibold tracking-widest uppercase mb-6">
          {t('globalEducation.badge')}
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          {t('globalEducation.titleA')}{' '}
          <span className="text-[#FCA311]">{t('globalEducation.titleB')}</span>
        </h2>
        <div className="w-16 h-1 bg-[#FCA311] mx-auto mb-6 rounded-full" />
        <p className="text-[#E5E5E5] text-base sm:text-lg max-w-2xl mx-auto mb-12">
          {t('globalEducation.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map(({ title, description }, index) => {
            const Icon = CARD_ICONS[index] ?? FaGlobe;
            return (
            <div
              key={title}
              className="relative p-6 sm:p-8 rounded-2xl bg-[#14213D]/70 border border-[#FCA311]/20 hover:border-[#FCA311]/60 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col items-start text-start group"
            >
              <div className="absolute start-0 top-6 bottom-6 w-1 bg-[#FCA311] rounded-e" />
              <span className="w-14 h-14 rounded-xl bg-[#000000]/60 border border-[#FCA311]/30 flex items-center justify-center text-[#FCA311] text-2xl mb-6 shadow-inner">
                <Icon aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-[#FFFFFF] mb-3">
                {title}
              </h3>
              <p className="text-[#E5E5E5] leading-relaxed">{description}</p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
