import Link from "next/link";
import { principal } from "@/lib/content/shared";
import { founder } from "@/lib/content/about";
import { site } from "@/lib/site";
import Index from "@/components/ui/Index";
import Arrow from "@/components/ui/Arrow";
import { LogoMark } from "@/components/ui/Logo";

/**
 * The founder: a business card beside the name, role, bio, and credentials.
 * No photo, by design; the card is decorative and the text carries everything.
 */
export default function Founder() {
  return (
    <section id="founder" aria-labelledby="founder-heading" className="tone-paper band">
      <div className="wrap">
        <div className="grid-12 gap-y-14 min-[900px]:items-start">
          <div className="col-span-12 min-[900px]:col-span-5" data-reveal="">
            {/* A business card: deliberate, not a stand-in for a missing photo. */}
            <div
              aria-hidden="true"
              className="tone-night grain relative flex aspect-[1.75/1] w-full max-w-[30rem] flex-col justify-between overflow-hidden rounded-[0.75rem] p-6 shadow-[0_40px_80px_-40px_rgb(11_13_18/0.6)] min-[900px]:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <span className="inline-flex items-center gap-2.5 text-fg">
                  <LogoMark />
                  <span className="text-[1.0625rem] font-semibold tracking-[-0.025em]">{site.shortName}</span>
                </span>
                <span className="label text-fg-3">{site.region}</span>
              </div>
              <div>
                <p className="serif text-[clamp(1.5rem,1.1rem+1.4vw,2.25rem)] leading-none tracking-[-0.02em] text-fg">
                  {principal.name}
                </p>
                <p className="label mt-3 text-fg-2">{principal.role}</p>
                <p className="label mt-5 border-t border-rule pt-4 text-fg-3">{site.email}</p>
              </div>
            </div>
          </div>

          <div className="col-span-12 min-[900px]:col-span-6 min-[900px]:col-start-7 min-[1200px]:col-span-5 min-[1200px]:col-start-8">
            <Index n="02">{founder.index}</Index>
            <h2 id="founder-heading" className="serif mt-8 text-h1" data-reveal="">
              {principal.name}
            </h2>
            <p className="label mt-5 text-fg-3" data-reveal="" style={{ "--d": 80 } as React.CSSProperties}>
              {principal.role}
            </p>
            <p className="mt-10 text-lead text-fg-2" data-reveal="" style={{ "--d": 140 } as React.CSSProperties}>
              {principal.bio}
            </p>

            <h3 className="label mt-12 text-fg-3">{founder.credentialsLabel}</h3>
            <ul className="mt-4 border-t border-fg">
              {principal.credentials.map((c, i) => (
                <li
                  key={c}
                  className="flex items-baseline gap-4 border-b border-rule py-4 text-fg"
                  data-reveal=""
                  style={{ "--d": 200 + i * 70 } as React.CSSProperties}
                >
                  <span aria-hidden="true" className="label text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-medium">{c}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/contact"
              className="mt-10 inline-flex min-h-11 items-center gap-1.5 text-small font-medium text-fg"
            >
              <span className="link">{founder.contactLink}</span>
              <Arrow />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
