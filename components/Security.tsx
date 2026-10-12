'use client';

import {
  FaClockRotateLeft,
  FaDatabase,
  FaShieldHalved,
} from 'react-icons/fa6';
import { IoShieldHalfOutline } from "react-icons/io5";

import { useLanguage } from '@/components/LanguageProvider';

const CARD_META = [
  {
    number: '01',
    Icon: FaShieldHalved,
    iconBoxClassName: 'bg-[#FCA311]/15 text-[#14213D]',
    bottomLineClassName: 'w-12 h-1 bg-[#FCA311] rounded-full mt-6',
  },
  {
    number: '02',
    Icon: FaClockRotateLeft,
    iconBoxClassName: 'bg-[#14213D]/10 text-[#14213D]',
    bottomLineClassName: 'w-12 h-1 bg-[#14213D] rounded-full mt-6',
  },
  {
    number: '03',
    Icon: FaDatabase,
    iconBoxClassName: 'bg-[#FCA311]/15 text-[#14213D]',
    bottomLineClassName: 'w-12 h-1 bg-[#FCA311] rounded-full mt-6',
  },
];

export default function Security() {
  const { t, tp } = useLanguage();
  const cards = tp<Array<{ title: string; description: string }>>(
    'security.cards',
  );
  return (
    <section id="security" className="relative overflow-hidden bg-slate-50/70 w-full">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 500"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Top-Left Ethereal Waves */}
        <path
          d="M0 0 C350 40 600 220 0 380 V0 Z"
          fill="url(#secTopLeftGrad1)"
          opacity="0.6"
        />
        <path
          d="M0 0 C450 80 750 280 0 440 V0 Z"
          fill="url(#secTopLeftGrad2)"
          opacity="0.4"
        />
        <path
          d="M0 0 C350 40 600 220 0 380"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          opacity="0.9"
        />

        {/* Bottom-Right Layered Smooth Waves */}
        <path
          d="M1440 500 C1100 420 700 450 0 500 H1440 Z"
          fill="url(#secBottomRightGrad1)"
          opacity="0.7"
        />
        <path
          d="M1440 280 C1150 320 850 460 1440 500 V280 Z"
          fill="url(#secBottomRightGrad2)"
          opacity="0.5"
        />
        <path
          d="M1440 280 C1150 320 850 460 1440 500"
          stroke="#ffffff"
          strokeWidth="1.5"
          fill="none"
          opacity="0.8"
        />

        <defs>
          <linearGradient id="secTopLeftGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="secTopLeftGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="secBottomRightGrad1" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#f1f5f9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="secBottomRightGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap bg-[#14213D]/5 border border-[#14213D]/10 text-[#14213D] text-xs font-bold tracking-widest uppercase mb-4">
          <IoShieldHalfOutline size={20} />
          <span>{t('security.badge')}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#14213D] tracking-tight mb-4">
          {t('security.titleA')}{' '}
          <span className="text-[#FCA311] block sm:inline">
            {t('security.titleB')}
          </span>
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-12 sm:mb-16">
          {t('security.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full text-start">
          {cards.map(({ title, description }, index) => {
            const meta = CARD_META[index] ?? CARD_META[0];
            const { number, Icon, iconBoxClassName, bottomLineClassName } =
              meta;
            return (
              <div
                key={number}
                className="relative p-6 sm:p-8 rounded-3xl bg-white border border-gray-100/80 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col justify-between text-start overflow-hidden group"
              >
                <div>
                  <span
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-6 shadow-sm ${iconBoxClassName}`}
                  >
                    <Icon aria-hidden="true" />
                  </span>
                  <span
                    aria-hidden="true"
                    className="absolute top-6 end-8 text-2xl font-bold text-gray-300 group-hover:text-[#FCA311] transition-colors"
                  >
                    {number}
                  </span>
                  <h3 className="text-xl font-bold text-[#14213D] mb-3">
                    {title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {description}
                  </p>
                </div>
                <div className={bottomLineClassName} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
