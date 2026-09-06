import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";
import { OperatingLayer, OperatingLayerCompact } from "./about/HomeAboutVisual";

/**
 * About Nafureanu — the chapter right after the hero, read as a
 * premium company profile: what Nafureanu is, what it does, how it
 * thinks about software and how far it takes a project. Content is
 * the protagonist: the title, the company definition as the lead, three
 * editorial chapters separated by fine rules, the operating layer as an
 * explanatory object beside them, and a closing statement that hands
 * off into "Qué construimos". No cards, no capability grid.
 */
export default function HomeAbout({ lang = "es" }) {
  const a = STRINGS[lang].homeAbout;
  return (
    <section aria-labelledby="home-about" className="relative overflow-hidden bg-background px-5 pt-16 md:px-10 md:pt-24">
      {/* structural lines emerging from the hero's whitespace */}
      <svg aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 hidden h-48 w-full md:block" viewBox="0 0 1440 192" preserveAspectRatio="none" fill="none">
        <path d="M0 34 H520 C560 34 580 54 620 54 H1440" stroke="#3157F6" strokeOpacity="0.14" />
        <path d="M0 78 H300 C340 78 360 62 400 62 H900" stroke="#3157F6" strokeOpacity="0.09" />
      </svg>

      <div className="relative mx-auto max-w-[1440px]">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{a.kicker}</p>
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{a.identifier}</p>
        </div>

        {/* 1 · title */}
        <Reveal>
          <h2
            id="home-about"
            className="mt-8 font-heading font-bold leading-[1.02] tracking-[-0.03em] text-foreground md:mt-10 md:max-w-[12.5em]"
            style={{ fontSize: "clamp(32px, 4.4vw, 66px)" }}
          >
            {a.titleLines.map((line, i) => (
              <span key={line} className="md:block">{line}{i < a.titleLines.length - 1 ? " " : ""}</span>
            ))}
          </h2>
        </Reveal>

        {/* 2 · company definition */}
        <Reveal delay={0.06}>
          <p className="mt-8 max-w-[34em] text-[18px] leading-[1.6] text-foreground/90 md:mt-10 md:text-[21px]">{a.lead}</p>
        </Reveal>

        {/* 3 · three editorial chapters · 4 · the operating layer beside them */}
        <div className="mt-14 md:mt-20 lg:grid lg:grid-cols-12 lg:gap-x-14">
          <ol className="border-t border-border lg:col-span-7 xl:col-span-8">
            {a.chapters.map((ch, i) => (
              <li key={ch.label} className="border-b border-border">
                <Reveal delay={0.05 * i}>
                  <div className="grid gap-3 py-8 md:grid-cols-[3.5rem_1fr] md:gap-6 md:py-9">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-accent md:pt-1.5">0{i + 1}</span>
                    <div>
                      <h3 className="font-heading text-xl font-bold tracking-[-0.02em] text-foreground md:text-2xl">{ch.label}</h3>
                      <p className="mt-3 max-w-[56ch] text-[15px] leading-[1.65] text-muted-foreground md:text-[17px]">{ch.text}</p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
          <div className="mt-12 lg:col-span-5 lg:mt-0 lg:pt-8 xl:col-span-4">
            <div className="mx-auto hidden max-w-[440px] lg:block"><OperatingLayer t={a} /></div>
            <div className="md:mx-auto md:max-w-[560px] lg:hidden"><OperatingLayerCompact t={a} /></div>
          </div>
        </div>

        {/* 5 · closing statement → hands off into "Qué construimos" */}
        <Reveal delay={0.08}>
          <p className="mt-16 max-w-4xl font-heading text-2xl font-bold leading-[1.15] tracking-[-0.025em] md:mt-24 md:text-4xl [text-wrap:balance]">
            <span className="text-muted-foreground">{a.closing[0]}</span>{" "}
            <span className="text-foreground">{a.closing[1]}</span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
