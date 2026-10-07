import Image from 'next/image';
import {
  FaArrowRight,
  FaCircleCheck,
  FaGlobe,
  FaGraduationCap,
  FaStar,
  FaUser,
  FaUsers,
} from 'react-icons/fa6';

import InfiniteBanner from '@/components/InfiniteBanner';

const ROLE_PILLARS = [
  {
    title: 'For Directors',
    subtext: 'Full visibility and control',
    Icon: FaUsers,
  },
  {
    title: 'For Teachers',
    subtext: 'Simplify daily tasks',
    Icon: FaGraduationCap,
  },
  {
    title: 'For Parents',
    subtext: 'Stay informed in real time',
    Icon: FaUser,
  },
];

const AVATAR_URLS = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=100&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80',
];

export default function Hero() {
  return (
    <>
      <section className="relative w-full overflow-hidden bg-white min-h-screen">
        <div className="absolute inset-0 z-0 pointer-events-none opacity-90 lg:opacity-100">
          <span className="block sm:hidden absolute inset-0">
            <Image
              src="/images/hero-bg-mobile.png"
              alt="Hero Background Mobile"
              fill
              priority
              className="object-cover object-top"
            />
          </span>
          <span className="hidden sm:block lg:hidden absolute inset-0">
            <Image
              src="/images/hero-bg-tablet.png"
              alt="Hero Background Tablet"
              fill
              priority
              className="object-cover object-top"
            />
          </span>
          <span className="hidden lg:block absolute inset-0">
            <Image
              src="/images/hero-bg-desktop.png"
              alt="Hero Background Desktop"
              fill
              priority
              className="object-cover object-right-top"
            />
          </span>
        </div>
        <div className="relative z-10 w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 pt-28 pb-12 lg:pt-36 lg:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column Content */}
            <div className="lg:col-span-6 order-1">
              {/* Category Badge */}
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#14213D]/15 text-[#14213D] text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm mb-6">
                <FaStar aria-hidden="true" />
                All-in-One School Management System
              </span>

              {/* Main Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#14213D] leading-tight">
                Everything Your Private School Needs to Run{' '}
                <span className="text-[#FCA311]">Smoothly EveryDay</span>
              </h1>

              {/* Subheading */}
              <p className="text-gray-600 text-base sm:text-lg mt-4 max-w-xl">
                Effortless control for directors, simplified daily tasks for
                teachers, and real-time updates that keep parents connected
                and informed — all in one powerful platform.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-row items-center gap-4 mt-8 w-full max-w-md">
                <a
                  href="#contact"
                  className="bg-[#FCA311] hover:bg-[#e0920f] text-[#14213D] font-bold px-0 py-3.5 rounded-xl shadow-md flex-1 flex justify-center items-center gap-2"
                >
                  Book a Demo
                  <FaArrowRight aria-hidden="true" />
                </a>
                <a
                  href="https://app.madrasio.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#14213D] hover:bg-[#0c1527] text-white font-bold px-0 py-3.5 rounded-xl flex-1 flex justify-center items-center"
                >
                  Sign In
                </a>
              </div>

              {/* 3 Role Pillars */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-6 justify-start w-5/6 mt-8">
                {ROLE_PILLARS.map(({ title, subtext, Icon }) => (
                  <div
                    key={title}
                    className="w-full sm:w-auto flex items-center gap-3 p-2.5 px-3.5 rounded-xl bg-white/70 backdrop-blur-md border border-white/80 shadow-sm"
                  >
                    <span className="bg-blue-50 text-blue-600 p-2.5 rounded-full flex items-center justify-center shrink-0">
                      <Icon aria-hidden="true" />
                    </span>
                    <span>
                      <p className="font-bold text-sm text-[#14213D]">
                        {title}
                      </p>
                      <p className="text-xs text-[#14213D]/80 font-medium">
                        {subtext}
                      </p>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust & Social Proof Banner */}
            <div className="lg:col-span-12 order-2 lg:order-3 flex flex-col items-center lg:items-start text-center w-full mx-auto">
              <div className="flex items-center justify-center md:justify-start sm:justify-start w-full gap-4">
                <p className="text-[#14213D]/70 font-semibold uppercase tracking-wider text-xs whitespace-nowrap">
                  — Trusted by over 100 private schools —
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-start gap-4 mt-6">
                <div className="flex items-center">
                  {AVATAR_URLS.map((src, index) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Parent testimonial portrait ${index + 1}`}
                      loading="lazy"
                      className="w-10 h-10 rounded-full border-2 border-white -ml-2 first:ml-0 object-cover"
                    />
                  ))}
                  <span className="w-10 h-10 rounded-full bg-blue-100 text-blue-900 text-xs font-bold flex items-center justify-center -ml-2 border-2 border-white">
                    100+
                  </span>
                </div>
                <p className="text-sm text-[#14213D] font-medium text-center sm:text-left">
                  Join <strong className="text-[#14213D]">100+ schools</strong>{' '}
                  building a brighter future with <span className="font-bold uppercase underline">Madrasio</span>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <InfiniteBanner />
    </>
  );
}
