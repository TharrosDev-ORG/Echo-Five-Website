import { contact } from "@/lib/content/contact";
import { credentials } from "@/lib/content/shared";
import { site, mailtoBook } from "@/lib/site";
import Arrow from "@/components/ui/Arrow";

/**
 * Beside the form: what happens after you send, the direct address for
 * people who would rather write, and the credentials in brief.
 */
export default function ContactAside() {
  return (
    <div className="grid gap-16 min-[900px]:grid-cols-2 min-[900px]:gap-x-12 min-[1200px]:grid-cols-1 min-[1200px]:gap-y-20">
      <section aria-labelledby="next-heading" className="min-[900px]:row-span-2 min-[1200px]:row-span-1">
        <h2 id="next-heading" className="serif text-h3">
          {contact.stepsHeading}
        </h2>
        <ol className="mt-8 border-t border-fg">
          {contact.steps.map((s, i) => (
            <li
              key={s.n}
              className="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-3 border-b border-rule py-6"
              data-reveal=""
              style={{ "--d": i * 90 } as React.CSSProperties}
            >
              <span aria-hidden="true" className="serif text-[2.25rem] leading-[0.9] text-accent">
                {s.n}
              </span>
              <div>
                <h3 className="font-medium text-fg">{s.title}</h3>
                <p className="mt-1.5 text-small text-fg-2">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section aria-labelledby="email-heading">
        <h2 id="email-heading" className="serif text-h3">
          {contact.emailHeading}
        </h2>
        <p className="mt-3 text-fg-2">{contact.emailNote}</p>
        <a
          href={mailtoBook}
          className="group mt-6 inline-flex max-w-full items-center gap-3 text-fg"
        >
          <span className="serif link break-all text-[clamp(1.75rem,1.35rem+1.5vw,2.5rem)] leading-[1.15] tracking-[-0.02em]">
            {site.email}
          </span>
          <Arrow dir="up-right" className="h-6 w-6" />
        </a>
      </section>

      <section aria-labelledby="creds-heading">
        <h2 id="creds-heading" className="label text-fg-3">
          {contact.credentialsHeading}
        </h2>
        <ul className="mt-4 border-t border-rule">
          {credentials.items.map((c) => (
            <li
              key={c.title}
              className="flex flex-col gap-0.5 border-b border-rule py-3"
            >
              <span className="text-small font-medium text-fg">{c.title}</span>
              <span className="label text-fg-3">{c.issuer}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
