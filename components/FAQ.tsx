interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'Does Madrasio support our country’s specific grading system?',
    answer:
      'Yes. Madrasio uses configurable curriculum versions. You can set custom coefficients, assessment types, passing thresholds, and calculation rules for any academic track.',
  },
  {
    question: 'Can we run our school in multiple languages simultaneously?',
    answer:
      'Yes. Administrators, teachers, and parents can each switch between Arabic, French, and English independently, with full support for RTL and LTR layouts.',
  },
  {
    question:
      "How are our school's records protected from other institutions on the platform?",
    answer:
      'Madrasio uses strict server-side multi-tenancy. Authorization is validated on every single server request, ensuring complete domain and data isolation between schools.',
  },
  {
    question: 'How long does it take to import our current school data?',
    answer:
      'You can onboard your school in minutes by importing student, teacher, and parent rosters via standard CSV/Excel templates.',
  },
];

export default function FAQ() {
  return (
    <section className="bg-[#FCA311] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#000000] mb-12 text-center">
          Frequently Asked Questions
        </h2>

        <div>
          {faqs.map((faq) => (
            <div
              key={faq.question}
              className="bg-[#FFFFFF] border-2 border-[#000000] rounded-xl p-6 mb-6 shadow-none"
            >
              <h3 className="text-xl font-bold text-[#000000] mb-3">
                {faq.question}
              </h3>
              <p className="text-base text-[#14213D]/90 leading-relaxed">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
