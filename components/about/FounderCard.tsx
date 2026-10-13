import Image from "next/image";
import { principal } from "@/lib/content";
import Badge from "@/components/ui/Badge";
import { Check } from "@/components/ui/icons";

type Props = {
  /** A portrait to show in place of the monogram once one is available. */
  photo?: { src: string; alt: string };
};

/** Founder profile: a portrait tile (monogram until a photo exists) beside the bio. */
export default function FounderCard({ photo }: Props) {
  return (
    <article
      aria-labelledby="founder-name"
      className="card card-panel grid gap-8 md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)] md:items-start lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:gap-12"
    >
      <div className="surface-dark texture relative aspect-square w-full max-w-60 overflow-hidden rounded-card md:max-w-none">
        {photo ? (
          <Image src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 18rem, 15rem" className="object-cover" />
        ) : (
          <span
            aria-hidden="true"
            className="absolute inset-0 flex items-center justify-center font-display text-[clamp(4rem,3rem+4vw,6rem)] font-semibold tracking-[-0.04em] text-accent"
          >
            {principal.monogram}
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-col gap-4">
        <h2 className="text-small font-semibold text-accent">{principal.heading}</h2>
        <div>
          <p id="founder-name" className="font-display text-h2 text-fg">
            {principal.name}
          </p>
          <p className="mt-2 text-small font-medium text-fg-3">{principal.role}</p>
        </div>
        <p className="max-w-[62ch] text-fg-2">{principal.bio}</p>
        <ul className="flex flex-wrap gap-2 pt-1">
          {principal.credentials.map((c) => (
            <li key={c}>
              <Badge tone="accent" icon={<Check size={14} />}>
                {c}
              </Badge>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}
