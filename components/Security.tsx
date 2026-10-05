interface SecurityCard {
  title: string;
  body: string;
}

const cards: SecurityCard[] = [
  {
    title: 'Strict Tenant Isolation',
    body: 'Every query is securely isolated at the database level. Authorization is validated on every server request, ensuring zero cross-school data leakage.',
  },
  {
    title: 'Historical Data Preservation',
    body: 'Academic history is immutable. Changing current class configurations or curriculum rules will never silently rewrite past student transcripts or published report cards.',
  },
  {
    title: 'Encrypted Storage & Backups',
    body: 'Powered by enterprise relational databases and edge object storage. All sensitive documents, attachments, and records are private by default and encrypted at rest.',
  },
];

export default function Security() {
  return (
    <section id="security" className="bg-[#FFFFFF] px-4 py-16 md:py-24">
      <div className="mx-auto max-w-6xl text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-[#000000] mb-4">
          Enterprise-Grade Architecture &amp; Security
        </h2>
        <p className="text-lg text-[#14213D]/80 max-w-3xl mx-auto">
          Built on zero-trust principles. Your institution&apos;s data is
          strictly isolated, encrypted, and preserved with immutable historical
          integrity.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mt-16 text-left">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-[#14213D] border-2 border-[#000000] rounded-xl p-8 shadow-none"
            >
              <h3 className="text-xl font-bold text-[#FCA311] mb-4">
                {card.title}
              </h3>
              <p className="text-[#FFFFFF] text-sm md:text-base leading-relaxed">
                {card.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
