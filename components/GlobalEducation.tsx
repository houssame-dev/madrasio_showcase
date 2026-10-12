'use client';

import { FaGlobe, FaGraduationCap, FaSchool } from 'react-icons/fa6';
import { BsGlobeAmericasFill } from "react-icons/bs";

import { useLanguage } from '@/components/LanguageProvider';

const TICKER_ITEMS = Array.from({ length: 5 }).map((_, index) => index);

const CARD_ICONS = [FaGlobe, FaGraduationCap, FaSchool];

export default function GlobalEducation() {
  const { t, tp } = useLanguage();
  const cards = tp<Array<{ title: string; description: string }>>(
    'globalEducation.cards',
  );
  return (
    <section id="features" className="relative overflow-hidden bg-slate-950/95 w-full scroll-mt-16">
      {/* Dark wave background layers */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="topWaveGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="bottomWaveGrad1" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1e3a8a" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.1" />
          </linearGradient>
          <linearGradient id="bottomWaveGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="bottomLinesGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#60a5fa" stopOpacity="0" />
            <stop offset="50%" stopColor="#93c5fd" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
          </linearGradient>
          <radialGradient id="topCenterGlow" cx="50%" cy="0%" r="45%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft radial glow, top-center */}
        <ellipse cx="720" cy="0" rx="620" ry="260" fill="url(#topCenterGlow)" />

        {/* Top-left accent wave */}
        <path
          d="M0 0 H420 C320 70 200 130 0 220 Z"
          fill="url(#topWaveGrad)"
          opacity="0.7"
        />

        {/* Path 1: large bottom deep wave */}
        <path
          d="M0 700 C360 580 720 820 1080 700 C1260 645 1360 665 1440 625 V900 H0 Z"
          fill="url(#bottomWaveGrad1)"
          opacity="0.85"
        />
        {/* Faint linear light-tracks inside the deep wave */}
        <path
          d="M0 730 C360 610 720 850 1080 730 C1260 675 1360 695 1440 655"
          stroke="url(#bottomLinesGrad)"
          strokeWidth="2"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M0 770 C360 650 720 890 1080 770 C1260 715 1360 735 1440 695"
          stroke="url(#bottomLinesGrad)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.4"
        />

        {/* Path 2: overlaying bottom accent wave (foreground) */}
        <path
          d="M0 790 C400 690 900 860 1440 750 V900 H0 Z"
          fill="url(#bottomWaveGrad2)"
          opacity="0.7"
        />
      </svg>

      {/* Section Header & Feature Cards */}
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center py-16 lg:py-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap border border-[#FCA311]/30 bg-[#14213D] text-[#FCA311] text-xs font-semibold tracking-widest uppercase mb-6">
          <BsGlobeAmericasFill size={20} />
          <span>{t('globalEducation.badge')}</span>
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
