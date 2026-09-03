import Reveal from "@/components/Reveal";
import CrmHeroVisual from "./CrmHeroVisual";

/** Case hero — positioning, verified proof and the demo product visual. */
export default function CrmHero({ lang, c }) {
  const h = c.hero;
  return (
    <header className="mx-auto max-w-[1440px] px-5 pt-36 md:px-10 md:pt-44">
      <Reveal>
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {h.kicker}
        </p>
        <h1 className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground md:text-6xl">
          {h.title}
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {h.support}
        </p>
      </Reveal>

      <Reveal variant="left" className="mt-12 flex flex-wrap items-start gap-x-14 gap-y-6">
        {h.proof.map((p) => (
          <div key={p.label}>
            <p className="font-heading text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {p.value}
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-muted-foreground">
              {p.label}
            </p>
          </div>
        ))}
        <p className="w-full font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/80">
          {h.tech}
        </p>
      </Reveal>

      <Reveal variant="scale" className="mt-16 md:mt-20">
        <CrmHeroVisual lang={lang} />
      </Reveal>
    </header>
  );
}