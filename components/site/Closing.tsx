import { closing } from "@/lib/content/shared";
import { site } from "@/lib/site";
import Lines from "@/components/ui/Lines";
import Button from "@/components/ui/Button";
import Arrow from "@/components/ui/Arrow";
import Index from "@/components/ui/Index";

/**
 * The ask that ends every page except Contact: a paper band with a giant
 * serif statement, the primary action, and the direct email.
 */
export default function Closing() {
  return (
    <section aria-labelledby="closing-heading" className="tone-mist band relative overflow-hidden">
      <div className="wrap">
        <Index className="mb-10">{closing.index}</Index>
        <Lines
          id="closing-heading"
          as="h2"
          lines={closing.heading}
          className="serif text-display max-w-[16ch]"
        />
        <div className="mt-12 grid gap-10 min-[900px]:mt-16 min-[900px]:grid-cols-[minmax(0,34rem)_1fr] min-[900px]:items-end">
          <p className="text-lead text-fg-2" data-reveal="">
            {closing.body}
          </p>
          <div
            className="flex flex-col items-start gap-5 min-[900px]:items-end"
            data-reveal=""
            style={{ "--d": 120 } as React.CSSProperties}
          >
            <Button href="/contact" size="lg">
              {closing.primary}
            </Button>
            <p className="text-small text-fg-3">
              {closing.emailLabel}{" "}
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-1 text-fg">
                <span className="link">{site.email}</span>
                <Arrow dir="up-right" />
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
