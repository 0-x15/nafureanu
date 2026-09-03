import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";
import ProcessCanvas from "./process/ProcessCanvas";
import ProcessMobile from "./process/ProcessMobile";

/**
 * "De proceso a sistema" — the homepage's own visualization of the
 * studio's methodology: business reality enters, one engineering rail
 * carries it through six stations, and a system in production leaves.
 * (The services page keeps the simpler shared ProcessStrip.)
 */
export default function HomeProcess({ lang = "es" }) {
  const s = STRINGS[lang];
  const t = s.homeProcess;

  return (
    <section
      className="bg-background px-5 py-20 md:px-10 md:py-32"
      aria-labelledby="home-process-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {t.kicker}
          </p>
          <h2
            id="home-process-heading"
            className="mt-5 font-heading text-3xl font-bold tracking-[-0.03em] text-foreground md:text-6xl"
          >
            {t.title}
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-lg">
            {t.intro}
          </p>
        </Reveal>
        <ProcessCanvas t={t} steps={s.process} />
        <ProcessMobile t={t} steps={s.process} />
      </div>
    </section>
  );
}