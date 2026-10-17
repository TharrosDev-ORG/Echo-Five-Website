import Link from "next/link";
import { principal } from "@/lib/content/shared";
import { founder } from "@/lib/content/about";
import { site } from "@/lib/site";
import Index from "@/components/ui/Index";
import Arrow from "@/components/ui/Arrow";
import { LogoMark } from "@/components/ui/Logo";

/**
 * The founder as a typographic portrait: a night plate with the monogram set
 * huge in the serif, beside the name, role, bio, and credentials. No photo,
 * by design; the plate is decorative and the text carries everything.
 */
export default function Founder() {
  return (
    <section id="founder" aria-labelledby="founder-heading" className="tone-paper band">
      <div className="wrap">
        <div className="grid-12 gap-y-14 min-[900px]:items-start">
          <div className="col-span-12 min-[900px]:col-span-5" data-reveal="">
            <div
              aria-hidden="true"
              className="@container tone-night grain relative flex aspect-[4/5] w-full max-w-[22rem] flex-col min-[900px]:max-w-[34rem] justify-between overflow-hidden rounded-[0.75rem] p-6 min-[900px]:p-8"
            >
              <div className="label flex items-start justify-between gap-4 text-fg-3">
                <LogoMark className="h-7 w-7 text-fg" />
                <span>{founder.plate} 01</span>
              </div>
              <p className="serif -mb-[0.12em] -ml-[0.04em] text-[46cqw] leading-[0.8] tracking-[-0.035em] text-fg">
                {principal.monogram}
              </p>
              <div className="label flex items-end justify-between gap-4 border-t border-rule pt-4 text-fg-3">
                <span className="text-fg">{principal.name}</span>
                <span>{site.shortName}</span>
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
