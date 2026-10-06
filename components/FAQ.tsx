import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: "Is our school's data completely private and safe?",
    answer:
      "Yes. Your school gets its own isolated, bank-grade secure environment. No outside person or other school can ever view or access your students' records, grades, or financial data.",
  },
  {
    question: 'Can we transfer our existing student lists without re-typing everything?',
    answer:
      "Yes. Our team helps you import all your existing Excel lists, student files, and class rosters into Madrasio in minutes so you don't have to enter data manually.",
  },
  {
    question: "Can Madrasio adapt to our school's specific grading scale and report cards?",
    answer:
      'Yes. Whether your school uses percentage scales, letter grades, or custom evaluation systems, Madrasio customizes report cards and grading systems to match your exact academic standards.',
  },
  {
    question: 'Which languages are supported, and can parents set their own language?',
    answer:
      'Madrasio supports over 12 languages—including Arabic, French, English, and Spanish—with full support for right-to-left (RTL) and left-to-right (LTR) reading. Directors, teachers, and parents can each choose their preferred language independently.',
  },
  {
    question: 'Do our teachers need technical skills to use Madrasio?',
    answer:
      'Not at all. Madrasio is designed to be as simple as using a smartphone. If your staff knows how to browse the internet, they can learn Madrasio in under 30 minutes.',
  },
  {
    question: 'How does Madrasio help us manage tuition fees?',
    answer:
      'Madrasio provides a clear financial overview of paid, pending, and overdue tuition. It can send automatic payment reminders to parents, saving your administration hours of manual follow-up.',
  },
  {
    question: 'How long does it take to set up Madrasio for our school?',
    answer:
      'Your school can be completely set up and ready to go in less than 48 hours. Our setup team manages the configuration for you so your staff can start smoothly.',
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 bg-[#FCA311] px-4 py-16 md:py-24">
      <div className="max-w-3xl mx-auto space-y-4 px-4">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#000000] mb-12 text-center">
          Frequently Asked Questions
        </h2>

        <Accordion>
          {faqs.map((faq) => (
            <AccordionItem
              key={faq.question}
              value={faq.question}
              className="bg-[#FFFFFF] border-2 border-[#000000] rounded-xl px-6 py-2 mb-4 shadow-none"
            >
              <AccordionTrigger className="text-xl font-bold text-[#000000] hover:no-underline text-left">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-[#14213D]/90 leading-relaxed pt-2">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
