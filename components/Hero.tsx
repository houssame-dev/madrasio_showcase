import {
  FaArrowRight,
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
      <section className="bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
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
              <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-8 pt-6 border-t border-gray-100">
                {ROLE_PILLARS.map(({ title, subtext, Icon }) => (
                  <div key={title} className="flex flex-col items-start gap-2">
                    <span className="bg-blue-50 text-blue-600 p-2.5 rounded-full flex items-center justify-center">
                      <Icon aria-hidden="true" />
                    </span>
                    <p className="font-bold text-sm text-[#14213D]">{title}</p>
                    <p className="text-xs text-gray-500">{subtext}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column / Mockup Image */}
            <div className="lg:col-span-6 order-3 lg:order-2">
              <div className="relative w-full flex justify-center lg:justify-end mt-8 lg:mt-0">
                <img
                  src="/images/hero-laptop-mockup.png"
                  alt="Madrasio School Management Dashboard"
                  className="w-full max-w-2xl h-auto drop-shadow-2xl object-contain"
                />
              </div>
            </div>

            {/* Trust & Social Proof Banner */}
            <div className="lg:col-span-12 order-2 lg:order-3">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <p className="uppercase text-gray-500 text-xs tracking-wider whitespace-nowrap">
                  — Trusted by over 100 private schools —
                </p>
                <div className="h-px flex-1 bg-gray-200" />
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
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
                <p className="text-sm text-gray-600 text-center sm:text-left">
                  Join <strong className="text-[#14213D]">100+ schools</strong>{' '}
                  building a brighter future with Madrasio.
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
