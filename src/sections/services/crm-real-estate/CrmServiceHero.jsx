import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { KICKER } from "./serviceBits";
import CrmServiceHeroVisual from "./CrmServiceHeroVisual";

/**
 * Service hero — commercial, not a case study: the system we can
 * design around the visitor's own operation. Copy left, the connected
 * operation right; the secondary action points at the real project.
 */
export default function CrmServiceHero({ lang, c, proofPath }) {
  const h = c.hero;
  return (
    <header className="mx-auto grid max-w-[1440px] items-center gap-12 overflow-x-clip px-5 pb-12 pt-8 md:px-10 md:pb-16 md:pt-12 lg:grid-cols-12 lg:gap-10">
      <div className="min-w-0 lg:col-span-5">
        <Reveal>
          <p className={KICKER}>{h.kicker}</p>
          <h1 className="mt-5 font-heading text-4xl font-bold leading-[1.04] tracking-[-0.03em] text-foreground md:text-5xl lg:text-6xl [text-wrap:balance]">{h.title}</h1>
          <p className="mt-7 max-w-xl text-base leading-[1.7] text-foreground/85 md:text-lg">{h.support}</p>
          <p className="mt-4 max-w-xl text-[15px] leading-[1.7] text-muted-foreground">{h.secondary}</p>
        </Reveal>
        <Reveal delay={0.1} className="mt-9 flex flex-wrap items-center gap-3">
          <ActionLink to={langPath(lang, "/contact")} size="lg">{h.primary}</ActionLink>
          <ActionLink to={proofPath} variant="secondary" icon="right" size="lg">{h.proof}</ActionLink>
        </Reveal>
      </div>
      <Reveal variant="scale" delay={0.1} className="min-w-0 md:mx-auto md:max-w-[560px] lg:col-span-7 lg:max-w-none lg:pl-6">
        <CrmServiceHeroVisual h={h} />
      </Reveal>
    </header>
  );
}
