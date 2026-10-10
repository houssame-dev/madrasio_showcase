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
    <section className="w-full bg-[#E5E5E5] overflow-hidden">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24 text-center">
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
