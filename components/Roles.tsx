'use client';

import {
  FaCheck,
  FaHouseUser,
  FaPersonChalkboard,
  FaUserShield,
} from 'react-icons/fa6';
import { GrStakeholder } from "react-icons/gr";


import { useLanguage } from '@/components/LanguageProvider';

const ROLE_ICONS = [FaUserShield, FaPersonChalkboard, FaHouseUser];

export default function Roles() {
  const { t, tp } = useLanguage();
  const roles = tp<
    Array<{ title: string; tagline: string; points: string[] }>
  >('roles.cards');
  return (
    <section id="roles" className="relative overflow-hidden bg-[#0A1120] w-full">
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 600"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Top-Left Glowing Curved Accent */}
        <path
          d="M0 0 C400 30 700 180 0 320 V0 Z"
          fill="url(#roleTopLeftGrad)"
          opacity="0.4"
        />
        <path
          d="M0 0 C300 10 500 120 0 200 V0 Z"
          stroke="url(#roleLineGrad)"
          strokeWidth="1.5"
          opacity="0.6"
        />

        {/* Bottom Right Glowing Wave Layer */}
        <path
          d="M1440 600 C1000 520 600 480 0 580 V600 H1440 Z"
          fill="url(#roleBottomWave1)"
          opacity="0.5"
        />
        <path
          d="M1440 380 C1100 420 800 550 1440 600 V380 Z"
          fill="url(#roleBottomWave2)"
          opacity="0.6"
        />
        <path
          d="M1440 380 C1100 420 800 550 1440 600"
          stroke="url(#roleLineGrad)"
          strokeWidth="1.5"
          fill="none"
          opacity="0.8"
        />

        <defs>
          <linearGradient id="roleTopLeftGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3A8A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0A1120" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="roleBottomWave1" x1="100%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#1E40AF" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#0A1120" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="roleBottomWave2" x1="100%" y1="50%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="#2563EB" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#0A1120" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="roleLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0.1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap bg-[#FCA311]/15 border border-[#FCA311]/40 text-[#FCA311] text-xs font-black tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(252,163,17,0.2)]">
          <GrStakeholder size={20} />
          <span>{t('roles.badge')}</span>
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
          {t('roles.titleA')}{' '}
          <span className="text-[#FCA311]">{t('roles.titleB')}</span>
        </h2>
        <p className="text-[#E5E5E5]/80 text-base sm:text-lg max-w-2xl mx-auto mb-12 sm:mb-16">
          {t('roles.subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full max-w-[1536px] mx-auto text-start">
          {roles.map(({ title, tagline, points }, index) => {
            const Icon = ROLE_ICONS[index] ?? FaUserShield;
            return (
            <div
              key={title}
              className="relative p-6 sm:p-8 rounded-3xl bg-[#14213D]/80 border border-[#FCA311]/30 hover:border-[#FCA311]/60 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between h-full"
            >
              <div>
                <span className="w-12 h-12 rounded-2xl bg-[#FCA311]/20 border border-[#FCA311]/30 text-[#FCA311] flex items-center justify-center text-xl mb-6">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {title}
                </h3>
                <p className="text-[#FCA311] font-medium text-sm mb-6">
                  {tagline}
                </p>
                <ul className="space-y-4 text-start">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-[#E5E5E5] text-sm leading-relaxed"
                    >
                      <FaCheck
                        className="text-[#FCA311] mt-1 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
