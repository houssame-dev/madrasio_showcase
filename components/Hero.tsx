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
          <a
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg bg-[#FCA311] px-8 py-4 font-bold text-[#000000] hover:brightness-95"
          >
            Request Early Access
          </a>
          <a
            href="https://app.madrasio.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-[#14213D] px-8 py-4 font-bold text-[#FFFFFF]"
          >
            Sign In to App
          </a>
        </div>

        {/* Dashboard Preview Mockup */}
        <div className="mt-16">

          {/* Mock dashboard images */}
          <img src="/school_admin_dashboard_monitor.png" alt="Madrasio Desktop Dashboard" className="hidden md:block w-full h-auto object-cover border-t border-[#14213D]" />
          <img src="/school_admin_dashboard_mobile.png" alt="Madrasio Mobile Dashboard" className="block md:hidden w-full h-auto object-cover border-t border-[#14213D]" />
        </div>
      </div>
    </section>
  );
}
