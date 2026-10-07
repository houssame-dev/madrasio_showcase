interface RoleCard {
  title: string;
  subtitle: string;
  points: string[];
}

const roles: RoleCard[] = [
  {
    title: 'School Administrators',
    subtitle: 'Complete operational control',
    points: [
      'Real-time tuition collection and financial tracking',
      'Configurable academic structure, tracks, and grading rules',
      'Historical student enrollment and transcript preservation',
    ],
  },
  {
    title: 'Teachers & Educators',
    subtitle: 'Streamlined daily workflows',
    points: [
      'Period-by-period attendance tracking in seconds',
      'Flexible assessment gradebooks and custom weighting',
      'Homework creation and class-targeted announcements',
    ],
  },
  {
    title: 'Parents & Guardians',
    subtitle: 'Real-time visibility & peace of mind',
    points: [
      'Multi-child dashboard with instant profile switching',
      'Direct visibility into published grades and attendance',
      'Mobile-friendly school announcements and alerts',
    ],
  },
];

export default function Roles() {
  return (
    <section id="roles" className="w-full bg-[#14213D] py-16 md:py-24">
      <div className="w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 text-center">
        <span className="bg-[#FCA311] text-[#000000] font-bold text-xs uppercase px-3 py-1 rounded-full inline-block mb-3">
          Designed for Every Stakeholder
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#FFFFFF]">
          Tailored Experiences for Every Role
        </h2>
        <p className="text-base md:text-lg text-[#E5E5E5] mt-4 max-w-2xl mx-auto">
          Purpose-built workspaces that give administrators, educators, and
          families exactly what they need.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
          {roles.map((role) => (
            <div
              key={role.title}
              className="bg-[#000000] border-2 border-[#FCA311] rounded-xl p-8 flex flex-col justify-between shadow-none"
            >
              <div>
                <h3 className="text-2xl font-bold text-[#FFFFFF]">
                  {role.title}
                </h3>
                <p className="text-sm text-[#FCA311] font-semibold mb-6 mt-1">
                  {role.subtitle}
                </p>
                <ul>
                  {role.points.map((point) => (
                    <li
                      key={point}
                      className="text-[#E5E5E5] text-sm leading-relaxed mb-3 flex items-start gap-2"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 font-bold text-[#FCA311]"
                      >
                        ✓
                      </span>
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
