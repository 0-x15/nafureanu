import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import CrmHeroComposition from "./CrmHeroComposition";
import { STRINGS, langPath } from "@/i18n";

/**
 * CRM case hero — two-column: positioning, verified proof and
 * capability tags on the left; the sanitized operational CRM
 * surface on the right. No empty right side.
 *
 * Both grid columns are min-w-0: the operational mockup's tab strip
 * is wider than a phone screen, and without it the column (and the
 * whole page) would grow to the strip's intrinsic width. The header
 * clips horizontal overflow only, so the rotated backdrop plane of
 * the composition can't push a horizontal scrollbar at any width
 * while everything that overlaps vertically stays visible.
 */
export default function CrmCaseHero({ lang, c }) {
  const h = c.hero;

  return (
    <header className="mx-auto grid max-w-[1440px] items-center gap-12 overflow-x-clip px-5 pb-8 pt-8 md:grid-cols-2 md:gap-16 md:px-10 md:pb-10 md:pt-12">
      <div className="min-w-0">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {h.kicker}
          </p>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.06] tracking-[-0.03em] text-foreground md:text-5xl">
            {h.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {h.support}
          </p>
        </Reveal>

        <Reveal variant="left" delay={0.08} className="mt-10 flex flex-wrap gap-x-12 gap-y-5">
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
        </Reveal>

        <Reveal delay={0.12} className="mt-7 flex flex-wrap gap-2">
          {h.tech.split(" · ").map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground"
            >
              {chip}
            </span>
          ))}
        </Reveal>

        <Reveal delay={0.16} className="mt-10">
          <ActionLink to={langPath(lang, "/contact")} size="md">
            {STRINGS[lang].nav.start}
          </ActionLink>
        </Reveal>
      </div>

      <Reveal variant="scale" delay={0.1} className="min-w-0">
        <CrmHeroComposition lang={lang} />
      </Reveal>
    </header>
  );
}