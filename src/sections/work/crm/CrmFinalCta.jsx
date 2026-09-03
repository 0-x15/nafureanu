import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";

/**
 * Final CTA — corporate and light: an editorial question on the
 * left, the two actions on the right. No dark box.
 */
export default function CrmFinalCta({ lang, c }) {
  const t = c.cta;

  return (
    <section className="border-t border-border px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {t.kicker}
          </p>
          <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-4xl">
            {t.title}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-muted-foreground">
            {t.copy}
          </p>
        </Reveal>
        <Reveal
          variant="left"
          delay={0.1}
          className="flex shrink-0 flex-wrap items-center gap-4"
        >
          <ActionLink to={langPath(lang, "/contact")} size="lg">
            {t.primary}
          </ActionLink>
          <ActionLink
            to={langPath(lang, "/work")}
            variant="secondary"
            icon="right"
            size="lg"
          >
            {t.secondary}
          </ActionLink>
        </Reveal>
      </div>
    </section>
  );
}