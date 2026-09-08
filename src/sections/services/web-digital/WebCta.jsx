import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { Act, KICKER } from "./webBits";

/** Final CTA — tell us what a person has to understand when they arrive. */
export default function WebCta({ lang, c, paths }) {
  const t = c.cta;
  return (
    <Act id="wd-cta" tone="page" className="border-t border-border md:py-40">
      <Reveal>
        <p className={KICKER}>{t.kicker}</p>
        <h2 id="wd-cta-title" className="mt-6 max-w-5xl font-heading text-[clamp(2.2rem,5.6vw,5.4rem)] font-bold leading-[0.96] tracking-[-0.045em] text-foreground [text-wrap:balance]">{t.title}</h2>
      </Reveal>
      <Reveal delay={0.1} className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
        <p className="max-w-2xl text-base leading-[1.7] text-muted-foreground md:col-span-7 md:text-lg">{t.copy}</p>
        <div className="flex flex-wrap items-center gap-3 md:col-span-5 md:justify-end">
          <ActionLink to={langPath(lang, "/contact")} size="lg">{t.primary}</ActionLink>
          <ActionLink to={paths.exhibition} variant="secondary" icon="right" size="lg">{t.secondary}</ActionLink>
        </div>
      </Reveal>
    </Act>
  );
}
