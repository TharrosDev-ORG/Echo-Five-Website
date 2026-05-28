import Reveal from "@/components/site/Reveal";
import { clients } from "@/lib/content";

export default function Clients() {
  return (
    <section id="clients" className="section-pad bg-paper">
      <div className="u-container">
        <div className="grid gap-x-12 gap-y-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="flex items-center gap-3">
                <span className="section-index">{clients.index}</span>
                <span className="t-label text-muted">{clients.kicker}</span>
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="t-h2 mt-8 max-w-[16ch] text-balance">{clients.heading}</h2>
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:pt-2">
            <Reveal delay={0.1}>
              <p className="t-body text-muted measure-wide">{clients.intro}</p>
            </Reveal>
          </div>
        </div>

        <div className="mt-14 space-y-12">
          {clients.groups.map((group) => (
            <div key={group.label} className="grid gap-y-6 border-t border-line pt-8 lg:grid-cols-12 lg:gap-x-12">
              <Reveal className="lg:col-span-3">
                <h3 className="font-mono text-[0.78rem] uppercase tracking-[0.14em] text-signal-deep">
                  {group.label}
                </h3>
              </Reveal>
              <ul className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-4">
                {group.orgs.map((org, i) => (
                  <Reveal as="li" key={org.name} delay={Math.min(i, 6) * 0.04}>
                    <span className="block font-display text-xl leading-none tracking-tight text-ink">
                      {org.short}
                    </span>
                    <span className="mt-1.5 block text-[0.78rem] leading-snug text-muted">
                      {org.name}
                    </span>
                  </Reveal>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
