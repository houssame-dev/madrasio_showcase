interface PillarCard {
  title: string;
  description: string;
}

const pillars: PillarCard[] = [
  {
    title: 'Academic Operations',
    description:
      'Manage timetables, gradebooks, attendance, and report cards in one streamlined workflow built for modern private schools.',
  },
  {
    title: 'Tuition Collection',
    description:
      'Simplify invoicing, track payments, and boost on-time tuition collection with clear financial oversight for administrators.',
  },
  {
    title: 'Parent Engagement',
    description:
      'Keep parents connected with real-time updates on grades, attendance, and announcements via a secure multilingual portal.',
  },
  {
    title: 'Secure Administration',
    description:
      'Control access by role, protect student data, and operate confidently on a secure platform built for global education.',
  },
];

export default function ValuePillars() {
  return (
    <section id="features" className="bg-[#E5E5E5] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#000000]">
          Four Pillars for Modern School Operations
        </h2>
        <p className="mt-4 text-lg text-[#14213D]/80 max-w-2xl mx-auto">
          Everything your institution needs to streamline academics, finance,
          communication, and administration.
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-lg border-2 border-[#14213D] bg-[#FFFFFF] p-6 shadow-none"
            >
              <div
                aria-hidden="true"
                className="mb-4 h-1.5 w-10 rounded-full bg-[#FCA311]"
              />
              <h3 className="mb-3 text-xl font-bold text-[#14213D]">
                {pillar.title}
              </h3>
              <p className="leading-relaxed text-[#14213D]/80">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
