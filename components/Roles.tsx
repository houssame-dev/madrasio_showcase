import {
  FaCheck,
  FaHouseUser,
  FaPersonChalkboard,
  FaUserShield,
} from 'react-icons/fa6';

interface RoleCard {
  title: string;
  tagline: string;
  points: string[];
  Icon: typeof FaUserShield;
}

const roles: RoleCard[] = [
  {
    title: 'School Administrators',
    tagline: 'Complete operational control',
    points: [
      'Real-time tuition collection and financial tracking',
      'Configurable academic structure, tracks, and grading rules',
      'Historical student enrollment and transcript preservation',
    ],
    Icon: FaUserShield,
  },
  {
    title: 'Teachers & Educators',
    tagline: 'Streamlined daily workflows',
    points: [
      'Period-by-period attendance tracking in seconds',
      'Flexible assessment gradebooks and custom weighting',
      'Homework creation and class-targeted announcements',
    ],
    Icon: FaPersonChalkboard,
  },
  {
    title: 'Parents & Guardians',
    tagline: 'Real-time visibility & peace of mind',
    points: [
      'Multi-child dashboard with instant profile switching',
      'Direct visibility into published grades and attendance',
      'Mobile-friendly school announcements and alerts',
    ],
    Icon: FaHouseUser,
  },
];

export default function Roles() {
  return (
    <section id="roles" className="w-full bg-[#000000] overflow-hidden">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-24 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FCA311]/15 border border-[#FCA311]/40 text-[#FCA311] text-xs font-black tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(252,163,17,0.2)]">
          DESIGNED FOR EVERY STAKEHOLDER
        </div>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight mb-4">
          Tailored Experiences for{' '}
          <span className="text-[#FCA311]">Every Role</span>
        </h2>
        <p className="text-[#E5E5E5]/80 text-base sm:text-lg max-w-2xl mx-auto mb-12 sm:mb-16">
          Purpose-built workspaces that give administrators, educators, and
          families exactly what they need.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch w-full max-w-[1536px] mx-auto text-left">
          {roles.map(({ title, tagline, points, Icon }) => (
            <div
              key={title}
              className="relative p-6 sm:p-8 rounded-3xl bg-[#14213D]/80 border border-[#FCA311]/30 hover:border-[#FCA311]/60 transition-all duration-300 shadow-xl backdrop-blur-md flex flex-col justify-between h-full"
            >
              <div>
                <span className="w-12 h-12 rounded-2xl bg-[#FCA311]/20 border border-[#FCA311]/30 text-[#FCA311] flex items-center justify-center text-xl mb-6">
                  <Icon aria-hidden="true" />
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">
                  {title}
                </h3>
                <p className="text-[#FCA311] font-medium text-sm mb-6">
                  {tagline}
                </p>
                <ul className="space-y-4 text-left">
                  {points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-[#E5E5E5] text-sm leading-relaxed"
                    >
                      <FaCheck
                        className="text-[#FCA311] mt-1 shrink-0"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
