import Image from 'next/image';
import { FaStar } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import InfiniteBanner from '@/components/InfiniteBanner';

export default function Hero() {
  return (
    <>
    <section className="bg-[#FFFFFF] px-4 pt-16 md:pt-24 pb-0">
      <div className="mx-auto max-w-7xl text-center">

        {/* Pill Badge */}
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#14213D]/15 text-[#14213D] text-xs sm:text-sm font-semibold tracking-wide uppercase shadow-sm mb-6">
          <FaStar aria-hidden="true" />
          All-in-One School Management System
        </span>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#000000] max-w-4xl mx-auto leading-tight">
          Everything Your Private School Needs to Run Smoothly EveryDay
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-[#14213D]/80 max-w-2xl mx-auto mt-6">
          Effortless control for directors, simplified daily tasks for teachers, and real-time updates that keep parents connected and informed.
        </p>

        {/* CTA Group */}
        <div className="flex flex-row items-center justify-center gap-3 w-full max-w-[24rem] mx-auto mt-8">
          <Button
            render={<a href="#contact" />}
            className="flex-1 flex justify-center items-center px-2 py-6 text-sm sm:text-base font-bold whitespace-nowrap bg-[#FCA311] hover:bg-[#FCA311]/90 text-[#000000] rounded-lg"
          >
            Book a Demo
          </Button>
          <Button
            render={
              <a
                href="https://app.madrasio.com"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            className="flex-1 flex justify-center items-center px-2 py-6 text-sm sm:text-base font-bold whitespace-nowrap bg-[#14213D] hover:bg-[#14213D]/90 text-[#FFFFFF] rounded-lg"
          >
            Sign In
          </Button>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-16 mb-12 overflow-hidden">
          <Image
            src="/school_admin_dashboard_monitor.png"
            alt="Madrasio Desktop Dashboard"
            width={1200}
            height={800}
            className="hidden md:block w-full h-auto object-cover rounded-b-lg"
            priority
          />
          <Image
            src="/school_admin_dashboard_mobile.png"
            alt="Madrasio Mobile Dashboard"
            width={600}
            height={1000}
            className="block md:hidden w-full h-auto object-cover rounded-b-lg"
            priority
          />
        </div>
      </div>
    </section>
    <InfiniteBanner />
    </>
  );
}
