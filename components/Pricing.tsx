'use client';

import { useState } from 'react';
import {
  FaArrowRight,
  FaCheck,
  FaCoins,
  FaShieldHalved,
  FaUsers,
} from 'react-icons/fa6';

import { useLanguage } from '@/components/LanguageProvider';

export const PLAN_SELECT_EVENT = 'madrasio:select-plan';

export interface PlanSelection {
  plan: string;
  students: number | null;
}

function emitPlanSelection(plan: string, students: number | null) {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent(PLAN_SELECT_EVENT, { detail: { plan, students } }),
    );
  }
}

const MONTHLY_RATE = 0.5;
const ANNUAL_RATE = 0.3;
const EXAMPLE_SIZES = [150, 500, 1000];

const VALUE_ICONS = [FaShieldHalved, FaCoins, FaUsers];

function formatUSD(value: number): string {
  return `$${value.toLocaleString('en-US', { maximumFractionDigits: 0 })}`;
}

export default function Pricing() {
  const [students, setStudents] = useState(500);
  const [billingAnnually, setBillingAnnually] = useState(false);
  const { t, tp } = useLanguage();

  const features = tp<string[]>('pricingCalculator.features');
  const values = tp<Array<{ title: string; body: string }>>(
    'pricingCalculator.values',
  );

  const currentRate = billingAnnually ? ANNUAL_RATE : MONTHLY_RATE;
  const monthlyTotal = students * currentRate;
  const annualTotal = monthlyTotal * 12;

  const handleCta = () => {
    emitPlanSelection('Pay-per-student', students);
  };

  const handleSliderChange = (value: number) => {
    setStudents(value);
    // Keep the demo form's student count in sync even if the visitor
    // adjusts the slider after clicking through to the form.
    emitPlanSelection('Pay-per-student', value);
  };

  return (
    <section id="pricing" className="scroll-mt-20 w-full bg-[#FCA311]">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full whitespace-nowrap bg-[#14213D] text-[#FCA311] text-xs font-black tracking-widest uppercase mb-6">
          {t('pricingCalculator.badge')}
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#14213D] mb-6">
          <span className="text-black">{t('pricingCalculator.titleA')}</span>{' '}
          <span className="text-[#14213D]">{t('pricingCalculator.titleB')}</span>{' '}
          <span className="text-white">{t('pricingCalculator.titleC')}</span>
        </h2>
        <p className="text-[#14213D]/80 text-lg max-w-2xl mx-auto mb-12 font-medium">
          {t('pricingCalculator.subtitle')}
        </p>

        {/* Calculator Card */}
        <div className="relative w-full max-w-5xl mx-auto rounded-3xl bg-[#14213D] p-6 sm:p-10 text-start shadow-2xl">
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span
              className={`text-sm font-bold ${
                billingAnnually ? 'text-white/50' : 'text-white'
              }`}
            >
              {t('pricingCalculator.monthly')}
            </span>
            <button
              type="button"
              role="switch"
              aria-checked={billingAnnually}
              aria-label={t('pricingCalculator.monthly')}
              onClick={() => setBillingAnnually((prev) => !prev)}
              className="relative w-14 h-8 rounded-full bg-white/10 border border-[#FCA311]/40 transition-colors"
            >
              <span
                aria-hidden="true"
                className={`absolute top-1 h-6 w-6 rounded-full bg-[#FCA311] transition-all duration-300 ${
                  billingAnnually ? 'start-7' : 'start-1'
                }`}
              />
            </button>
            <span
              className={`text-sm font-bold ${
                billingAnnually ? 'text-white' : 'text-white/50'
              }`}
            >
              {t('pricingCalculator.annually')}
            </span>
            <span className="text-xs font-bold text-[#14213D] bg-[#FCA311] px-3 py-1 rounded-full w-auto whitespace-nowrap">
              {t('pricingCalculator.save')}
            </span>
          </div>

          {/* Base Price */}
          <p className="text-center text-white font-bold text-lg mt-6">
            {billingAnnually
              ? t('pricingCalculator.baseAnnually')
              : t('pricingCalculator.baseMonthly')}
          </p>

          {/* Features */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-8">
            {features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-2.5 text-sm font-medium text-gray-200"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#FCA311] text-[#14213D] text-[10px]">
                  <FaCheck aria-hidden="true" />
                </span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>

          {/* Slider */}
          <div className="mt-10">
            <div className="flex items-center justify-between gap-4 mb-3">
              <label
                htmlFor="student-count"
                className="text-sm font-bold text-white"
              >
                {t('pricingCalculator.sliderLabel')}
              </label>
              <span className="text-sm font-black text-[#FCA311]">
                {t('pricingCalculator.studentsCount').replace(
                  '{n}',
                  String(students),
                )}
              </span>
            </div>
            <input
              id="student-count"
              name="studentCount"
              type="range"
              min={50}
              max={2000}
              step={10}
              value={students}
              onChange={(e) => handleSliderChange(Number(e.target.value))}
              className="w-full accent-[#FCA311] cursor-pointer"
            />
            <div className="flex justify-between text-xs font-medium text-white/50 mt-1">
              <span>50</span>
              <span>2,000</span>
            </div>
          </div>

          {/* Dynamic Cost Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
            <div className="rounded-2xl bg-white/10 p-5 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
                {t('pricingCalculator.monthlySub')}
              </p>
                <p className="text-3xl font-black text-white">
                  {formatUSD(monthlyTotal)}
                <span className="text-base font-bold text-white/60">
                  {t('pricingCalculator.perMonth')}
                </span>
              </p>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 text-center">
              <p className="text-xs font-bold uppercase tracking-widest text-white/60 mb-1">
                {t('pricingCalculator.annualTotal')}
              </p>
                <p className="text-3xl font-black text-[#FCA311]">
                  {formatUSD(annualTotal)}
                <span className="text-base font-bold text-white/60">
                  {t('pricingCalculator.perYear')}
                </span>
              </p>
            </div>
          </div>

          {/* Popular Examples */}
          <p className="text-center text-sm font-bold text-white/70 mt-10 mb-4">
            {t('pricingCalculator.examplesHeading')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {EXAMPLE_SIZES.map((size) => (
              <div
                key={size}
                className="rounded-2xl bg-white/10 p-4 text-center"
              >
                <p className="text-sm font-bold text-white">
                  {t('pricingCalculator.studentsCount').replace(
                    '{n}',
                    String(size),
                  )}
                </p>
                <p className="text-xl font-black text-[#FCA311] mt-1">
                  {formatUSD(size * currentRate)}
                  <span className="text-sm font-bold text-white/60">
                    {t('pricingCalculator.perMonth')}
                  </span>
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            onClick={handleCta}
            className="w-full mt-8 bg-[#FCA311] hover:bg-[#E5930F] text-[#14213D] font-bold text-lg py-4 rounded-xl flex items-center justify-center gap-2 transition-all whitespace-nowrap px-5"
          >
            {t('pricingCalculator.cta')}
            <FaArrowRight aria-hidden="true" className="rtl:rotate-180 shrink-0" />
          </a>

          {/* Value Props */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {values.map(({ title, body }, index) => {
              const Icon = VALUE_ICONS[index] ?? FaShieldHalved;
              return (
                <div key={title} className="flex items-start gap-3">
                  <span className="bg-[#FCA311]/15 text-[#FCA311] p-2.5 rounded-xl shrink-0">
                    <Icon aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-white">
                      {title}
                    </span>
                    <span className="block text-xs text-gray-300 mt-1 leading-relaxed">
                      {body}
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
