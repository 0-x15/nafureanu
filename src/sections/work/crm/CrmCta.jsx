import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { langPath } from "@/i18n";

/**
 * Commercial transition — the case's closing argument, built on
 * the ActionLink system instead of the generic CtaBand.
 */
export default function CrmCta({ lang, c }) {
  const t = c.cta;
  return (
    <section className="border-t border-border px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <Reveal className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {t.kicker}
          </p>
          <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-5xl">
            {t.title}
          </h2>
          <p className="mt-6 text-base leading-relaxed text-muted-foreground">
            {t.copy}
          </p>
          <ActionLink
            to={langPath(lang, "/work")}
            variant="text"
            icon="right"
            size="sm"
            className="mt-7"
          >
            {t.secondary}
          </ActionLink>
        </Reveal>
        <Reveal variant="left" delay={0.1} className="shrink-0">
          <ActionLink to={langPath(lang, "/contact")} size="lg">
            {t.primary}
          </ActionLink>
        </Reveal>
      </div>
    </section>
  );
}