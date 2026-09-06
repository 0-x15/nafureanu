import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { DISPLAY, Mono } from "./laBits";

/** Final CTA — the everyday business problem Life Admin's approach answers, and the product's honest status. */
export default function LifeAdminFinalCta({ lang, c }) {
  const t = c.cta;
  return (
    <section className="border-t border-[#E8E4DE] bg-[#F9F8F4] px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-3xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{t.kicker}</p>
            <h2 className={`${DISPLAY} mt-4 text-3xl font-medium leading-[1.14] tracking-[-0.01em] text-[#201F1D] md:text-4xl`}>{t.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-[#706B66]">{t.copy}</p>
          </Reveal>
          <Reveal variant="left" delay={0.1} className="flex shrink-0 flex-wrap items-center gap-4">
            <ActionLink to={langPath(lang, "/contact")} size="lg">{t.primary}</ActionLink>
            <ActionLink to={langPath(lang, "/work")} variant="secondary" icon="right" size="lg">{t.secondary}</ActionLink>
          </Reveal>
        </div>
        <Reveal delay={0.14} className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#E8E4DE] pt-6 text-xs text-[#706B66]">
          <Mono>{t.status.label}</Mono>
          <span>{t.status.text}</span>
        </Reveal>
      </div>
    </section>
  );
}
