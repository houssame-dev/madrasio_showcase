'use client';

import {
  FaCoins,
  FaGraduationCap,
  FaShieldHalved,
  FaUsers,
} from 'react-icons/fa6';
import { IoSchool } from "react-icons/io5";


import { useLanguage } from '@/components/LanguageProvider';

const PILLAR_META = [
  { Icon: FaGraduationCap, iconBoxClassName: 'bg-[#14213D]/10 text-[#14213D]' },
  { Icon: FaCoins, iconBoxClassName: 'bg-[#FCA311]/15 text-[#14213D]' },
  { Icon: FaUsers, iconBoxClassName: 'bg-[#14213D]/10 text-[#14213D]' },
  { Icon: FaShieldHalved, iconBoxClassName: 'bg-[#FCA311]/15 text-[#14213D]' },
];

export default function ValuePillars() {
  const { t, tp } = useLanguage();
  const pillars = tp<Array<{ title: string; description: string }>>(
    'pillars.cards',
  );
  return (
    <section className="relative overflow-hidden bg-slate-50/60 w-full">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 500"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Left Side Sweeping Waves */}
        <path
          d="M0 120 C180 200 320 380 0 480 V500 H1440 V0 H0 V120 Z"
          fill="url(#leftWaveGrad)"
          opacity="0.5"
        />
        <path
          d="M0 250 C220 280 400 420 0 500 H1440 V500 H0 V250 Z"
          fill="url(#leftWaveGrad2)"
          opacity="0.7"
        />

        {/* Right Side Gentle Waves */}
        <path
          d="M1440 80 C1200 160 1100 350 1440 450 V500 H0 V500 H1440 V80 Z"
          fill="url(#rightWaveGrad)"
          opacity="0.6"
        />
        <path
          d="M1440 220 C1280 280 1180 400 1440 500 H0 V500 H1440 V220 Z"
          fill="url(#rightWaveGrad2)"
          opacity="0.8"
        />

        <defs>
          <linearGradient id="leftWaveGrad" x1="0%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="leftWaveGrad2" x1="0%" y1="0%" x2="40%" y2="100%">
            <stop offset="0%" stopColor="#f1f5f9" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="rightWaveGrad" x1="100%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#cbd5e1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="rightWaveGrad2" x1="100%" y1="0%" x2="60%" y2="100%">
            <stop offset="0%" stopColor="#e2e8f0" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap bg-[#14213D]/5 border border-[#14213D]/10 text-[#14213D] text-xs font-bold tracking-widest uppercase mb-4">
          <IoSchool size={20} />
          <span>{t('pillars.badge')}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#14213D] tracking-tight mb-4">
          {t('pillars.titleA')}{' '}
          <span className="text-[#FCA311] block sm:inline">
            {t('pillars.titleB')}
          </span>
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-12 sm:mb-16">
          {t('pillars.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(({ title, description }, index) => {
            const { Icon, iconBoxClassName } =
              PILLAR_META[index] ?? PILLAR_META[0];
            return (
            <div
              key={title}
              className="relative p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col items-start text-start overflow-hidden group"
            >
              <div
                aria-hidden="true"
                className="absolute -bottom-10 -end-10 w-32 h-32 rounded-full bg-[#FCA311]/10 blur-2xl pointer-events-none"
              />
              <span
                className={`p-3.5 rounded-2xl mb-6 flex items-center justify-center text-xl ${iconBoxClassName}`}
              >
                <Icon aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-[#14213D] mb-3">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
