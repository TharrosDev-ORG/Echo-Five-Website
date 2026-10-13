import Link from "next/link";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";
import { ArrowRight } from "@/components/site/icons";

/** The closing ask at the end of every page except Contact. */
export default function CtaBand() {
  return (
    <section className="cta-band section on-night" aria-labelledby="cta-heading">
      <div className="container cta-grid">
        <div data-reveal>
          <p className="t-label label-row">{contact.kicker}</p>
          <h2 id="cta-heading" className="t-h2" style={{ marginTop: "1rem", maxWidth: "18ch" }}>
            {contact.heading}
          </h2>
          <p className="t-lead" style={{ marginTop: "1.25rem", maxWidth: "58ch" }}>
            {contact.body}
          </p>
        </div>
        <div className="cta-actions" data-reveal>
          <Link href="/contact" className="btn btn-primary">
            Start a conversation
            <ArrowRight />
          </Link>
          <a href={`mailto:${site.email}`} className="btn btn-secondary">
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
