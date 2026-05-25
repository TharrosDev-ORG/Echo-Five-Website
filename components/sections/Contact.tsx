const COPY = {
  index: "04",
  headLead: "Let's talk about what you're trying to",
  headAccent: "change.",
  body: "Send a note and Mark will come back within two business days. Engagements are run end-to-end by the principal: you're writing to the person who'll do the work.",
  email: "Mark.abdelnour@gmail.com",
  mailto:
    "mailto:Mark.abdelnour@gmail.com?subject=Echo-Five%20enquiry&body=Hi%20Mark%2C%0A%0AWe're%20looking%20at%20a%20Microsoft%20365%20rollout%20and%20would%20like%20to%20talk.%0A%0A",
  ctaLabel: "Email Mark Abdelnour",
  note: "For sensitive matters, ask about secure channels.",
  linkedin: "https://www.linkedin.com/in/mark-abdelnour-235b6a4/",
  linkedinLabel: "Mark Abdelnour",
  location: "Ottawa, ON",
};

const divider = "color-mix(in oklch, var(--color-paper) 15%, transparent)";

export function Contact() {
  return (
    <section id="contact" className="bg-ink text-paper">
      <div className="container-tight section-y">
        <div className="md:grid md:grid-cols-12 md:gap-x-10">
          <div className="md:col-span-9">
            <div className="flex items-baseline gap-4 md:gap-6">
              <span
                aria-hidden="true"
                className="font-display font-extrabold shrink-0 text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[0.96] tracking-[-0.02em] text-signal"
              >
                {COPY.index}
              </span>
              <h2 className="font-display font-bold uppercase text-[clamp(2.25rem,5.5vw,4.25rem)] leading-[0.96] tracking-[-0.02em] max-w-[16ch]">
                {COPY.headLead} <span className="text-signal">{COPY.headAccent}</span>
              </h2>
            </div>
            <p className="mt-7 max-w-xl text-lg leading-[1.6] text-paper/90">
              {COPY.body}
            </p>
          </div>
        </div>

        <div
          className="mt-12 md:mt-16 grid gap-y-10 md:grid-cols-12 md:gap-x-10 border-t pt-10 md:pt-12"
          style={{ borderColor: divider }}
        >
          <div className="md:col-span-7 flex flex-col items-start gap-5">
            <a
              href={COPY.mailto}
              className="group inline-flex min-h-[56px] items-center gap-4 bg-paper px-8 py-4 text-sm md:text-base font-medium uppercase tracking-[0.06em] text-ink hover:bg-signal hover:text-paper transition-colors"
            >
              {COPY.ctaLabel}
              <span
                aria-hidden="true"
                className="text-lg transition-transform group-hover:translate-x-1.5"
              >
                →
              </span>
            </a>
            <p className="text-sm text-paper/70">{COPY.note}</p>
          </div>

          <dl className="md:col-span-5 md:col-start-8">
            <ContactRow label="Email" divider={divider}>
              <a
                className="text-paper underline underline-offset-4 decoration-1 decoration-[color:var(--color-signal)] hover:decoration-2"
                href={`mailto:${COPY.email}`}
              >
                {COPY.email}
              </a>
            </ContactRow>
            <ContactRow label="LinkedIn" divider={divider}>
              <a
                className="text-paper underline underline-offset-4 decoration-1 decoration-[color:var(--color-signal)] hover:decoration-2"
                href={COPY.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                {COPY.linkedinLabel}
              </a>
            </ContactRow>
            <ContactRow label="Office" divider={divider}>
              <span className="text-paper">{COPY.location}</span>
            </ContactRow>
          </dl>
        </div>
      </div>
    </section>
  );
}

function ContactRow({
  label,
  divider,
  children,
}: {
  label: string;
  divider: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className="grid grid-cols-[88px_1fr] items-baseline gap-4 border-b py-4 text-sm first:border-t"
      style={{ borderColor: divider }}
    >
      <dt className="text-[11px] uppercase tracking-[0.2em] text-paper/65">{label}</dt>
      <dd>{children}</dd>
    </div>
  );
}
