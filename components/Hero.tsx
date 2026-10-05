import Image from 'next/image';

import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="bg-[#FFFFFF] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-7xl text-center">
        {/* Badge */}
        <span className="bg-[#E5E5E5] text-[#14213D] font-medium rounded-full px-4 py-1 text-sm border border-[#14213D]/20 inline-block mb-4">
          Global School Management Platform
        </span>

        {/* Main Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-[#000000] max-w-4xl mx-auto leading-tight">
          The All-in-One School Management System for Modern Private Schools
        </h1>

        {/* Subheadline */}
        <p className="text-lg md:text-xl text-[#14213D]/80 max-w-2xl mx-auto mt-6">
          Streamline academics, simplify tuition collection, and keep parents
          engaged—all inside a secure, multilingual platform built for global
          education.
        </p>

        {/* CTA Group */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            render={<a href="#contact" />}
            className="bg-[#FCA311] hover:bg-[#FCA311]/90 text-[#000000] font-bold px-8 py-6 text-lg rounded-lg"
          >
            Request Early Access
          </Button>
          <Button
            render={
              <a
                href="https://app.madrasio.com"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            className="bg-[#14213D] hover:bg-[#14213D]/90 text-[#FFFFFF] font-bold px-8 py-6 text-lg rounded-lg"
          >
            Sign In to App
          </Button>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-16 max-w-5xl mx-auto rounded-xl border-2 border-[#14213D] bg-[#E5E5E5] overflow-hidden">
          <Image
            src="/dashboard-desktop-placeholder.webp"
            alt="Madrasio Desktop Dashboard"
            width={1200}
            height={800}
            className="hidden md:block w-full h-auto object-cover rounded-b-lg"
            priority
          />
          <Image
            src="/dashboard-mobile-placeholder.webp"
            alt="Madrasio Mobile Dashboard"
            width={600}
            height={1000}
            className="block md:hidden w-full h-auto object-cover rounded-b-lg"
            priority
          />
        </div>
      </div>
    </section>
  );
}
