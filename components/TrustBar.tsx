export default function TrustBar() {
  const features = [
    {
      title: 'Native Multilingual',
      description:
        'Seamlessly operate in 12+ languages including English, Arabic, French, Spanish, Deutsch, Italian, and more.',
    },
    {
      title: 'Curriculum Agnostic',
      description:
        'Adapts to any grading system, track, or national academic structure with custom weighting.',
    },
    {
      title: 'Primary to High School',
      description:
        'Perfectly adapted to the specific operational and academic needs of Primary, Middle, and High Schools.',
    },
  ];

  return (
    <section className="bg-[#000000] px-4 py-16">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <h2 className="text-2xl md:text-3xl font-bold text-[#FFFFFF] mb-10 text-center">
          Built for Global Education
        </h2>

        {/* Three Feature Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="border-2 border-[#14213D] rounded-lg p-6 bg-[#050505]"
            >
              <h3 className="text-[#FCA311] font-bold text-xl mb-3">
                {feature.title}
              </h3>
              <p className="text-[#E5E5E5] leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
