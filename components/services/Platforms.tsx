import { services } from "@/lib/content/services";
import Index from "@/components/ui/Index";
import Lines from "@/components/ui/Lines";

/** The Microsoft platforms the work happens in, set as a row of numbered cells. */
export default function Platforms() {
  const n = services.platforms.length;
  return (
    <section aria-labelledby="platforms-heading" className="tone-mist band-tight">
      <div className="wrap">
        <Index n="03">{services.platformsIndex}</Index>
        <Lines as="h2" id="platforms-heading" className="serif mt-8 text-h2" lines={[services.platformsLabel]} />
        <ol className="mt-12 grid border-t border-fg min-[640px]:grid-cols-2 min-[900px]:mt-16 min-[1200px]:grid-cols-5">
          {services.platforms.map((p, i) => (
            <li
              key={p}
              className="flex items-baseline gap-6 border-b border-rule py-5 min-[640px]:odd:border-r min-[640px]:odd:pr-6 min-[640px]:last:border-r-0 min-[640px]:even:pl-6 min-[1200px]:flex-col min-[1200px]:gap-10 min-[1200px]:border-b-0 min-[1200px]:border-r min-[1200px]:px-6 min-[1200px]:py-7 min-[1200px]:first:pl-0 min-[1200px]:last:border-r-0 min-[1200px]:even:pl-6"
              data-reveal=""
              style={{ "--d": i * 80 } as React.CSSProperties}
            >
              <span aria-hidden="true" className="label w-8 shrink-0 text-accent min-[1200px]:w-auto">
                {String(i + 1).padStart(2, "0")}
                <span className="text-fg-3 max-[1199px]:hidden"> / {String(n).padStart(2, "0")}</span>
              </span>
              <span className="serif text-h3 text-fg">{p}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
