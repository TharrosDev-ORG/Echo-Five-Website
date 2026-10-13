import Link from "next/link";
import { contact } from "@/lib/content";
import { site } from "@/lib/site";
import { ArrowRight } from "@/components/site/icons";

/** The closing ask at the end of every page except Contact. */
export default function CtaBand() {
  return (
    <section className="cta on-night" aria-labelledby="cta-heading">
      <div className="container">
        <h2 id="cta-heading" className="t-h2" style={{ maxWidth: "24ch" }}>
          {contact.heading}
        </h2>
        <p className="t-lead">{contact.body}</p>
        <div className="actions">
          <Link href="/contact" className="btn btn-primary">
            Start a conversation
            <ArrowRight />
          </Link>
          <a href={`mailto:${site.email}`} className="btn btn-secondary">
            Email {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}
