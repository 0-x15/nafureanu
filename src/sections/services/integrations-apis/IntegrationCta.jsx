import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { Act, KICKER } from "./intBits";

/** Final CTA — tell us which tools have to talk to each other. */
export default function IntegrationCta({ lang, c }) {
  const t = c.cta;
  return (
    <Act id="in-cta" tone="page" className="border-t border-border md:py-32">
      <div className="grid gap-10 md:grid-cols-12 md:items-end md:gap-10">
        <Reveal className="md:col-span-8">
          <p className={KICKER}>{t.kicker}</p>
          <h2 id="in-cta-title" className="mt-4 max-w-3xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-foreground md:text-5xl [text-wrap:balance]">{t.title}</h2>
          <p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">{t.copy}</p>
        </Reveal>
        <Reveal variant="left" delay={0.1} className="flex flex-wrap items-center gap-3 md:col-span-4 md:justify-end">
          <ActionLink to={langPath(lang, "/contact")} size="lg">{t.primary}</ActionLink>
          <ActionLink to="#in-proof" variant="secondary" icon="right" size="lg">{t.secondary}</ActionLink>
        </Reveal>
      </div>
    </Act>
  );
}
