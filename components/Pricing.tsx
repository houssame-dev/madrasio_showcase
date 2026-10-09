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

interface Plan {
  name: string;
  subtext: string;
  monthlyPrice: number;
  annualPrice: number;
  INCLUDED_FEATURES: string[];
  highlighted?: boolean;
  Icon: typeof FaSchool;
}

const plans: Plan[] = [
  {
    name: 'Foundation Campus',
    subtext: 'For smaller primary or emerging private schools.',
    monthlyPrice: 49,
    annualPrice: 39,
    INCLUDED_FEATURES: ['Up to 250 Students','Complete tuition management tracking','Admin, Parent & Teacher Workspaces','Multilingual Interface Support','Automated Encrypted Backups','Free Data Migration & Setup','24/7 Priority Support'],
    Icon: FaSchool,
  },
  {
    name: 'Growth Campus',
    subtext: 'The optimal choice for standard K-12 private campuses.',
    monthlyPrice: 99,
    annualPrice: 79,
    INCLUDED_FEATURES: ['Up to 750 Students', 'Complete tuition management tracking', 'Admin, Parent & Teacher Workspaces','Multilingual Interface Support','Automated Encrypted Backups','Free Data Migration & Setup','24/7 Priority Support'],
    highlighted: true,
    Icon: FaRocket,
  },
  {
    name: 'Elite Campus',
    subtext: 'Built for large private schools with high operational volume.',
    monthlyPrice: 149,
    annualPrice: 119,
    INCLUDED_FEATURES: ['Up to 1,500 Students', 'Complete tuition management tracking', 'Admin, Parent & Teacher Workspaces','Multilingual Interface Support','Automated Encrypted Backups','Free Data Migration & Setup','24/7 Priority Support'],
    Icon: FaCrown,
  },
];


export default function Pricing() {
  const [billingAnnually, setBillingAnnually] = useState(false);

  return (
    <section id="pricing" className="scroll-mt-20 w-full bg-[#FCA311] overflow-hidden">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white text-[#14213D] text-xs font-black tracking-widest uppercase mb-6 shadow-sm">
          TRANSPARENT PRICING
        </div>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#14213D] mb-6">
          Simple, Predictable Pricing for{' '}
          <span className="text-white">Private Schools</span>
        </h2>
        <p className="text-[#14213D]/90 text-lg max-w-2xl mx-auto mb-8 font-medium">
          Run your entire private school with absolute clarity. Get your first
          month completely free. No hidden implementation fees, and all core
          features are included in every tier.
        </p>

        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span
            className={`text-sm font-bold ${
              billingAnnually ? 'text-[#14213D]/50' : 'text-[#14213D]'
            }`}
          >
            Monthly
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
                billingAnnually ? 'left-7' : 'left-1'
              }`}
            />
          </button>
          <span
            className={`text-sm font-bold ${
              billingAnnually ? 'text-[#14213D]' : 'text-[#14213D]/50'
            }`}
          >
            Annually
          </span>
          <span className="bg-white text-[#14213D] rounded-full px-3 py-1 text-xs font-bold">
            SAVE 20%
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 mt-12 text-left">
          {plans.map(
            ({
              name,
              subtext,
              monthlyPrice,
              annualPrice,
              INCLUDED_FEATURES,
              highlighted,
              Icon,
            }) => {
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
                    <span className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#FCA311] text-white text-xs font-bold px-4 py-1 rounded-b-lg whitespace-nowrap">
                      👑 MOST POPULAR
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
                    {INCLUDED_FEATURES.map((feature) => (
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
                    className={
                      highlighted
                        ? 'w-full bg-[#14213D] text-white font-bold py-3 rounded-xl hover:bg-[#14213D]/80 transition-colors mt-6 flex items-center justify-center gap-2'
                        : 'w-full bg-[#FCA311] text-[#14213D] font-bold py-3 rounded-xl hover:bg-white transition-colors mt-6 flex items-center justify-center gap-2'
                    }
                  >
                    {highlighted ? 'Start Free Month' : 'Choose Plan'}
                    <FaArrowRight aria-hidden="true" />
                  </a>
                </div>
              );
            },
          )}
        </div>

        {/* Enterprise Banner */}
        <div className="bg-[#14213D] text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 text-left">
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-white/10 text-[#FCA311] text-xl shrink-0">
              <FaUsers aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-xl font-bold">Enterprise & District</h3>
              <p className="text-sm text-white/70">
                For 1,500+ students.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            className="bg-[#FCA311] text-[#14213D] font-bold py-3 px-6 rounded-xl whitespace-nowrap flex items-center gap-2 hover:bg-white transition-colors"
          >
            Contact Us for Custom Pricing
            <FaArrowRight aria-hidden="true" />
          </a>
        </div>


      </div>
    </section>
  );
}
