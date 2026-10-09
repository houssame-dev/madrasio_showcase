'use client';

import { useState } from 'react';
import {
  FaArrowRight,
  FaCheck,
  FaCrown,
  FaDatabase,
  FaRocket,
  FaSchool,
  FaShieldHalved,
  FaUsers,
} from 'react-icons/fa6';

import { useLanguage } from '@/components/LanguageProvider';

interface PlanMeta {
  monthlyPrice: number;
  annualPrice: number;
  students: string;
  storageGB: string;
  highlighted?: boolean;
  Icon: typeof FaSchool;
}

const plansMeta: PlanMeta[] = [
  {
    monthlyPrice: 49,
    annualPrice: 39,
    students: '250',
    storageGB: '15',
    Icon: FaSchool,
  },
  {
    monthlyPrice: 99,
    annualPrice: 79,
    students: '750',
    storageGB: '50',
    highlighted: true,
    Icon: FaRocket,
  },
  {
    monthlyPrice: 149,
    annualPrice: 119,
    students: '1,500',
    storageGB: '150',
    Icon: FaCrown,
  },
];

export const PLAN_SELECT_EVENT = 'madrasio:select-plan';

function selectPlanAndScroll(plan: string) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent(PLAN_SELECT_EVENT, { detail: plan }));
  }
}

export default function Pricing() {
  const [billingAnnually, setBillingAnnually] = useState(false);
  const { t, tp } = useLanguage();
  const planNames = tp<Array<{ name: string; subtext: string }>>(
    'pricing.plans',
  );

  return (
    <section id="pricing" className="scroll-mt-16 w-full bg-[#FCA311] overflow-hidden">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#14213D] text-xs font-black tracking-widest uppercase mb-6 shadow-sm">
          {t('pricing.badge')}
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#14213D] mb-6">
          {t('pricing.titleA')}{' '}
          <span className="text-white">{t('pricing.titleB')}</span>
        </h2>
        <p className="text-[#14213D]/90 text-lg max-w-2xl mx-auto mb-8 font-medium">
          {t('pricing.subtitle')}
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span
            className={`text-sm font-bold ${
              billingAnnually ? 'text-[#14213D]/50' : 'text-[#14213D]'
            }`}
          >
            {t('pricing.monthly')}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={billingAnnually}
            aria-label="Toggle annual billing"
            onClick={() => setBillingAnnually((prev) => !prev)}
            className="relative w-14 h-8 rounded-full bg-[#14213D] border border-[#14213D] transition-colors"
          >
            <span
              aria-hidden="true"
              className={`absolute top-1 h-6 w-6 rounded-full bg-white transition-all duration-300 ${
                billingAnnually ? 'start-7' : 'start-1'
              }`}
            />
          </button>
          <span
            className={`text-sm font-bold ${
              billingAnnually ? 'text-[#14213D]' : 'text-[#14213D]/50'
            }`}
          >
            {t('pricing.annually')}
          </span>
          <span className="bg-white text-[#14213D] rounded-full px-3 py-1 text-xs font-bold">
            {t('pricing.save')}
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mt-12 text-start">
          {plansMeta.map((meta, index) => {
            const plan = planNames[index] ?? { name: '', subtext: '' };
            const { name, subtext } = plan;
            const { monthlyPrice, annualPrice, students, storageGB, highlighted, Icon } = meta;
            const features = [
              t('pricing.studentsUpTo').replace('{n}', students),
              t('pricing.storageGB').replace('{n}', storageGB),
              ...tp<string[]>('pricing.features'),
            ];
              const price = billingAnnually ? annualPrice : monthlyPrice;
              return (
                <div
                  key={name}
                  className={
                    highlighted
                      ? 'bg-white text-[#14213D] rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden border-2 border-white lg:scale-105 z-10'
                      : 'bg-[#14213D] text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden'
                  }
                >
                  {highlighted && (
                    <span className="absolute top-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 bg-[#FCA311] text-white text-xs font-bold px-4 py-1 rounded-b-lg whitespace-nowrap">
                      {t('pricing.popular')}
                    </span>
                  )}
                  <span
                    className={
                      highlighted
                        ? 'inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#FCA311]/15 text-[#14213D] text-xl mb-4'
                        : 'inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 text-white text-xl mb-4'
                    }
                  >
                    <Icon aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-bold">{name}</h3>
                  <p
                    className={`text-sm mb-2 ${
                      highlighted ? 'text-[#14213D]/70' : 'text-white/70'
                    }`}
                  >
                    {subtext}
                  </p>
                  <p
                    className={`font-black mt-4 mb-6 ${
                      highlighted ? 'text-5xl' : 'text-4xl'
                    }`}
                  >
                    ${price}
                    <span className="text-base font-bold">/mo</span>
                  </p>
                  <ul className="space-y-3 mb-8">
                    {features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2.5 text-sm font-medium"
                      >
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FCA311] text-white text-[10px]">
                          <FaCheck aria-hidden="true" />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#contact"
                    onClick={() => selectPlanAndScroll(name)}
                    className={
                      highlighted
                        ? 'w-full bg-[#14213D] text-white font-bold py-3 rounded-xl hover:bg-[#14213D]/80 transition-colors mt-6 flex items-center justify-center gap-2'
                        : 'w-full bg-[#FCA311] text-[#14213D] font-bold py-3 rounded-xl hover:bg-white transition-colors mt-6 flex items-center justify-center gap-2'
                    }
                  >
                    {highlighted ? t('pricing.startFree') : t('pricing.choosePlan')}
                    <FaArrowRight aria-hidden="true" className="rtl:rotate-180" />
                  </a>
                </div>
              );
            })}
        </div>

        {/* Enterprise Banner */}
        <div className="bg-[#14213D] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 text-start">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 text-[#FCA311] text-xl shrink-0">
              <FaUsers aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-bold">{t('pricing.enterpriseTitle')}</h3>
              <p className="text-sm text-white/70">
                {t('pricing.enterpriseSub')}
              </p>
            </div>
          </div>
          <a
            href="#contact"
            onClick={() => selectPlanAndScroll('Enterprise')}
            className="bg-[#FCA311] text-[#14213D] font-bold py-3 px-6 rounded-xl whitespace-nowrap flex items-center gap-2 hover:bg-white transition-colors"
          >
            {t('pricing.enterpriseCta')}
            <FaArrowRight aria-hidden="true" className="rtl:rotate-180" />
          </a>
        </div>


      </div>
    </section>
  );
}
