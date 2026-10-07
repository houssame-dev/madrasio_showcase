import {
  FaCoins,
  FaGraduationCap,
  FaShieldHalved,
  FaUsers,
} from 'react-icons/fa6';

interface PillarCard {
  title: string;
  description: string;
  Icon: typeof FaGraduationCap;
  iconBoxClassName: string;
}

const pillars: PillarCard[] = [
  {
    title: 'Academic Operations',
    description:
      'Manage timetables, gradebooks, attendance, and report cards in one streamlined workflow built for modern private schools.',
    Icon: FaGraduationCap,
    iconBoxClassName: 'bg-[#14213D]/10 text-[#14213D]',
  },
  {
    title: 'Tuition Collection',
    description:
      'Simplify invoicing, track payments, and boost on-time tuition collection with clear financial oversight for administrators.',
    Icon: FaCoins,
    iconBoxClassName: 'bg-[#FCA311]/15 text-[#14213D]',
  },
  {
    title: 'Parent Engagement',
    description:
      'Keep parents connected with real-time updates on grades, attendance, and announcements via a secure multilingual portal.',
    Icon: FaUsers,
    iconBoxClassName: 'bg-[#14213D]/10 text-[#14213D]',
  },
  {
    title: 'Secure Administration',
    description:
      'Control access by role, protect student data, and operate confidently on a secure platform built for global education.',
    Icon: FaShieldHalved,
    iconBoxClassName: 'bg-[#FCA311]/15 text-[#14213D]',
  },
];

export default function ValuePillars() {
  return (
    <section id="features" className="w-full bg-[#E5E5E5]">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#14213D]/5 border border-[#14213D]/10 text-[#14213D] text-xs font-bold tracking-widest uppercase mb-4">
          🎓 BUILT FOR MODERN SCHOOLS
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#14213D] tracking-tight mb-4">
          Four Pillars for{' '}
          <span className="text-[#FCA311] block sm:inline">
            School Operations
          </span>
        </h2>
        <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto mb-12 sm:mb-16">
          Everything your institution needs to streamline academics, finance,
          communication, and administration.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map(({ title, description, Icon, iconBoxClassName }) => (
            <div
              key={title}
              className="relative p-6 sm:p-8 rounded-3xl bg-white border border-gray-100 shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 flex flex-col items-start text-left overflow-hidden group"
            >
              <div
                aria-hidden="true"
                className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full bg-[#FCA311]/10 blur-2xl pointer-events-none"
              />
              <span
                className={`p-3.5 rounded-2xl mb-6 flex items-center justify-center text-xl ${iconBoxClassName}`}
              >
                <Icon aria-hidden="true" />
              </span>
              <h3 className="text-xl font-bold text-[#14213D] mb-3">
                {title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
