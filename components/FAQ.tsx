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

interface FaqItem {
  question: string;
  answer: string;
  Icon: typeof FaShieldHalved;
}

const faqs: FaqItem[] = [
  {
    question: "Is our school's data completely private and safe?",
    answer:
      "Yes. Your school gets its own isolated, bank-grade secure environment. No outside person or other school can ever view or access your students' records, grades, or financial data.",
    Icon: FaShieldHalved,
  },
  {
    question: 'Can we transfer our existing student lists without re-typing everything?',
    answer:
      "Yes. Our team helps you import all your existing Excel lists, student files, and class rosters into Madrasio in minutes so you don't have to enter data manually.",
    Icon: FaUsers,
  },
  {
    question: "Can Madrasio adapt to our school's specific grading scale and report cards?",
    answer:
      'Yes. Whether your school uses percentage scales, letter grades, or custom evaluation systems, Madrasio customizes report cards and grading systems to match your exact academic standards.',
    Icon: FaChartBar,
  },
  {
    question: 'Which languages are supported, and can parents set their own language?',
    answer:
      'Madrasio supports over 12 languages—including Arabic, French, English, and Spanish—with full support for right-to-left (RTL) and left-to-right (LTR) reading. Directors, teachers, and parents can each choose their preferred language independently.',
    Icon: FaGlobe,
  },
  {
    question: 'Do our teachers need technical skills to use Madrasio?',
    answer:
      'Not at all. Madrasio is designed to be as simple as using a smartphone. If your staff knows how to browse the internet, they can learn Madrasio in under 30 minutes.',
    Icon: FaGraduationCap,
  },
  {
    question: 'How does Madrasio help us manage tuition fees?',
    answer:
      'Madrasio provides a clear financial overview of paid, pending, and overdue tuition. It can send automatic payment reminders to parents, saving your administration hours of manual follow-up.',
    Icon: FaCreditCard,
  },
  {
    question: 'How long does it take to set up Madrasio for our school?',
    answer:
      'Your school can be completely set up and ready to go in less than 48 hours. Our setup team manages the configuration for you so your staff can start smoothly.',
    Icon: FaClock,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 w-full bg-[#000000]">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Header */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCA311]/15 border border-[#FCA311]/40 text-[#FCA311] text-xs font-black tracking-widest uppercase mb-6">
              💬 QUESTIONS ?
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6 leading-tight">
              Frequently Asked{' '}
              <span className="text-[#FCA311]">Questions</span>
            </h2>
            <p className="text-[#E5E5E5]/80 text-lg sm:text-xl max-w-lg">
              Find quick answers to the most common questions about Madrasio,
              from data security to setup and support.
            </p>
          </div>

          {/* Right Column: Accordion */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {faqs.map(({ question, answer, Icon }, index) => {
              const isOpen = openIndex === index;
              return (
                <div
                  key={question}
                  className="bg-[#14213D]/60 backdrop-blur-md border border-[#FCA311]/20 rounded-2xl p-4 sm:p-6 mb-4 hover:border-[#FCA311]/50 transition-colors shadow-lg w-full text-left flex flex-col"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    aria-expanded={isOpen}
                    className="flex items-center justify-between gap-4 w-full cursor-pointer group text-left"
                  >
                    <span className="flex items-center gap-4">
                      <span className="w-10 h-10 shrink-0 rounded-xl bg-[#FCA311]/10 text-[#FCA311] flex items-center justify-center text-lg">
                        <Icon aria-hidden="true" />
                      </span>
                      <span className="font-bold text-white text-base sm:text-lg group-hover:text-[#FCA311] transition-colors">
                        {question}
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
                    <p className="text-[#E5E5E5] text-sm sm:text-base leading-relaxed mt-4 pl-14">
                      {answer}
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
