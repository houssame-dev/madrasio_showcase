'use client';

import { useState } from 'react';
import {
  FaChartBar,
  FaChevronDown,
  FaClock,
  FaCreditCard,
  FaGlobe,
  FaGraduationCap,
  FaShieldHalved,
  FaUsers,
} from 'react-icons/fa6';

import { useLanguage } from '@/components/LanguageProvider';

const FAQ_ICONS = [
  FaShieldHalved,
  FaUsers,
  FaChartBar,
  FaGlobe,
  FaGraduationCap,
  FaCreditCard,
  FaClock,
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t, tp } = useLanguage();
  const faqs = tp<Array<{ q: string; a: string }>>('faq.items');

  return (
    <section id="faq" className="scroll-mt-16 w-full bg-[#000000] overflow-hidden">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Header */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap bg-[#FCA311]/15 border border-[#FCA311]/40 text-[#FCA311] text-xs font-black tracking-widest uppercase mb-6">
              {t('faq.badge')}
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              {t('faq.titleA')}{' '}
              <span className="text-[#FCA311]">{t('faq.titleB')}</span>
            </h2>
            <p className="text-[#E5E5E5]/80 text-lg sm:text-xl max-w-lg">
              {t('faq.subtitle')}
            </p>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {faqs.map(({ q, a }, index) => {
              const isOpen = openIndex === index;
              const Icon = FAQ_ICONS[index] ?? FaShieldHalved;
              return (
                <div
                  key={q}
                  className="bg-[#14213D]/60 backdrop-blur-md border border-[#FCA311]/20 rounded-2xl p-4 sm:p-6 mb-4 hover:border-[#FCA311]/50 transition-colors shadow-lg w-full text-start flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex items-center justify-between gap-4 w-full cursor-pointer group text-start"
                  >
                    <span className="flex items-center gap-4">
                      <span className="w-10 h-10 shrink-0 rounded-xl bg-[#FCA311]/10 text-[#FCA311] flex items-center justify-center text-lg">
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="font-bold text-white text-base sm:text-lg group-hover:text-[#FCA311] transition-colors">
                        {q}
                      </span>
                    </span>
                    <FaChevronDown
                      aria-hidden="true"
                      className={`text-[#FCA311] transition-transform duration-300 shrink-0 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="text-[#E5E5E5] text-sm sm:text-base leading-relaxed mt-4 ps-14">
                      {a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
