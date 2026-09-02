import { CAPABILITIES } from "@/data/capabilities";
import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";

/**
 * Commercial service presentation — what we build, what problem it
 * solves, and when a company needs it.
 */
export default function CapabilityList({ lang = "es" }) {
  const s = STRINGS[lang].servicesPage;

  return (
    <section className="bg-background px-5 md:px-10" aria-label={s.h1}>
      <div className="mx-auto max-w-[1440px]">
        {CAPABILITIES.map((cap, i) => {
          const c = cap.copy[lang];
          return (
            <Reveal
              key={cap.id}
              variant={i % 2 === 0 ? "up" : "left"}
              className="border-t border-border py-14 md:py-20"
            >
              <div className="grid gap-8 md:grid-cols-12">
                <div className="md:col-span-4">
                  <p className="font-mono text-[11px] text-accent">{cap.num}</p>
                  <h2
                    id={cap.id}
                    className="mt-2 font-heading text-2xl font-bold tracking-[-0.02em] text-foreground md:scroll-mt-32 md:text-4xl"
                  >
                    {c.title}
                  </h2>
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {cap.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-border px-3 py-1 font-mono text-[10px] text-muted-foreground"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="md:col-span-8">
                  <p className="max-w-2xl text-base leading-[1.7] text-[#3F4656] md:text-lg">
                    {c.detail}
                  </p>
                  <p className="mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                    {s.when}
                  </p>
                  <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                    {cap.needs[lang].map((need) => (
                      <li
                        key={need}
                        className="flex items-start gap-2.5 text-sm leading-relaxed text-[#5A6070]"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-accent"
                        />
                        {need}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
      <div className="border-t border-border" />
    </section>
  );
}