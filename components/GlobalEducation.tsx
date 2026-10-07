import { FaGlobe, FaGraduationCap, FaSchool } from 'react-icons/fa6';

const TICKER_ITEMS = Array.from({ length: 5 }).map((_, index) => index);

const CARDS = [
  {
    title: 'Native Multilingual',
    description:
      'Seamlessly operate in 12+ languages including English, Arabic, French, Spanish, Deutsch, Italian, and more.',
    Icon: FaGlobe,
  },
  {
    title: 'Curriculum Agnostic',
    description:
      'Adapts to any grading system, track, or national academic structure with custom weighting.',
    Icon: FaGraduationCap,
  },
  {
    title: 'Primary to High School',
    description:
      'Perfectly adapted to the specific operational and academic needs of Primary, Middle, and High Schools.',
    Icon: FaSchool,
  },
];

export default function GlobalEducation() {
  return (
    <section className="w-full bg-[#000000]">

      {/* Section Header & Feature Cards */}
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center py-16 lg:py-24">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FCA311]/30 bg-[#14213D] text-[#FCA311] text-xs font-semibold tracking-widest uppercase mb-6">
          🎓 BUILT FOR
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          Built for <span className="text-[#FCA311]">Global Education</span>
        </h2>
        <div className="w-16 h-1 bg-[#FCA311] mx-auto mb-6 rounded-full" />
        <p className="text-[#E5E5E5] text-base sm:text-lg max-w-2xl mx-auto mb-12">
          A flexible school management platform designed for different
          languages, curricula, and grade levels — anywhere in the world.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CARDS.map(({ title, description, Icon }) => (
            <div
              key={title}
              className="relative p-6 sm:p-8 rounded-2xl bg-[#14213D]/70 border border-[#FCA311]/20 hover:border-[#FCA311]/60 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col items-start text-left group"
            >
              <div className="absolute left-0 top-6 bottom-6 w-1 bg-[#FCA311] rounded-r" />
              <span className="w-14 h-14 rounded-xl bg-[#000000]/60 border border-[#FCA311]/30 flex items-center justify-center text-[#FCA311] text-2xl mb-6 shadow-inner">
                <Icon aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-[#FFFFFF] mb-3">
                {title}
              </h3>
              <p className="text-[#E5E5E5] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
