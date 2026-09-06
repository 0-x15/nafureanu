import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";
import { OperatingLayer, OperatingLayerCompact } from "./about/HomeAboutVisual";

/**
 * About Nafureanu — the chapter right after the hero: who builds the
 * software that removes work, and how the company thinks. An editorial
 * composition around one idea, the operating layer: the business is
 * the input, the system is the result. The title is the visual anchor;
 * the definition sits to its right; the visual field carries the idea
 * with the secondary paragraph beside it. No cards, no capability grid.
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

        <Reveal>
          <h2
            id="home-about"
            className="mt-8 font-heading font-bold leading-[0.98] tracking-[-0.035em] text-foreground md:mt-12 md:max-w-[10.5em]"
            style={{ fontSize: "clamp(38px, 5.6vw, 88px)" }}
          >
            {a.titleLines.map((line, i) => (
              <span key={line} className="md:block">{line}{i < a.titleLines.length - 1 ? " " : ""}</span>
            ))}
          </h2>
        </Reveal>

        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          <Reveal delay={0.08} className="mt-8 max-w-2xl lg:col-start-7 lg:col-end-12 lg:mt-14 lg:max-w-none">
            <p className="text-lg leading-relaxed text-foreground/85 md:text-xl">{a.primary}</p>
          </Reveal>
        </div>

        <div className="mt-12 md:mt-16 lg:grid lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="md:max-w-[560px] lg:col-start-1 lg:col-end-10 lg:max-w-none xl:col-end-9">
            <div className="hidden lg:block"><OperatingLayer t={a} /></div>
            <div className="lg:hidden"><OperatingLayerCompact t={a} /></div>
          </div>
          <Reveal delay={0.1} className="mt-10 lg:col-start-10 lg:col-end-13 lg:mt-0 lg:pb-10 xl:col-start-9">
            <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">{a.secondary}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
