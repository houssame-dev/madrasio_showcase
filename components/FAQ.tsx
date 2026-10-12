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
import { RiQuestionnaireFill } from "react-icons/ri";

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
    <section id="faq" className="scroll-mt-16 relative overflow-hidden w-full bg-[#040713]">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Top-Left Glowing Curved Accent with Subtle Lines */}
        <path
          d="M0 0 C400 40 700 180 0 320 V0 Z"
          fill="url(#faqTopLeftGrad1)"
          opacity="0.4"
        />
        <path
          d="M0 0 C300 20 600 140 0 240 V0 Z"
          stroke="url(#faqLineGrad)"
          strokeWidth="1"
          opacity="0.6"
        />

        {/* Bottom Sweeping Layered Waves with Accent Lines */}
        <path
          d="M1440 900 C1000 820 600 780 0 880 V900 H1440 Z"
          fill="url(#faqBottomWave1)"
          opacity="0.6"
        />
        <path
          d="M1440 680 C1100 720 800 850 1440 900 V680 Z"
          fill="url(#faqBottomWave2)"
          opacity="0.5"
        />
        <path
          d="M1440 680 C1100 720 800 850 1440 900"
          stroke="url(#faqLineGrad)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.8"
        />
        {/* Additional faint accent lines in the waves */}
        <path
          d="M1440 780 C1100 800 900 880 1440 900"
          stroke="url(#faqLineGrad)"
          strokeWidth="0.75"
          fill="none"
          opacity="0.5"
        />

        <defs>
          <linearGradient id="faqTopLeftGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#040713" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="faqBottomWave1" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#040713" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="faqBottomWave2" x1="100%" y1="50%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#040713" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="faqLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.2" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Header */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap bg-[#FCA311]/15 border border-[#FCA311]/40 text-[#FCA311] text-xs font-black tracking-widest uppercase mb-6">
              <RiQuestionnaireFill size={20} />
              <span>{t('faq.badge')}</span>
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
