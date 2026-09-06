import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { Mono } from "./fivoBits";

/**
 * Final CTA — the complexity of Fivo connected to Nafureanu's offer.
 * The product reference (site and support) is a separate, quiet line:
 * it is never the sales action.
 */
export default function FivoFinalCta({ lang, c }) {
  const t = c.cta;
  return (
    <section className="border-t border-border px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <Reveal className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{t.kicker}</p>
            <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-4xl">{t.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">{t.copy}</p>
          </Reveal>
          <Reveal variant="left" delay={0.1} className="flex shrink-0 flex-wrap items-center gap-4">
            <ActionLink to={langPath(lang, "/contact")} size="lg">{t.primary}</ActionLink>
            <ActionLink to={langPath(lang, "/work")} variant="secondary" icon="right" size="lg">{t.secondary}</ActionLink>
          </Reveal>
        </div>
        <Reveal delay={0.14} className="mt-14 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-6 text-xs text-muted-foreground">
          <Mono>{t.product.label}</Mono>
          <span>{t.product.text}</span>
          <a href={t.product.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-foreground/80 transition-colors hover:text-accent">
            {t.product.host} <ArrowUpRight className="h-3 w-3" />
          </a>
          <span aria-hidden="true">·</span>
          <a href={`mailto:${t.product.support}`} className="text-foreground/80 transition-colors hover:text-accent">{t.product.support}</a>
        </Reveal>
      </div>
    </section>
  );
}
