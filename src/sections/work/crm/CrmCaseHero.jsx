import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import CrmOpsMockup from "@/components/work/crm/CrmOpsMockup";
import CrmMatchingFragment from "@/components/work/crm/CrmMatchingFragment";
import CrmCommsFragment from "@/components/work/crm/CrmCommsFragment";
import { STRINGS, langPath } from "@/i18n";

/**
 * CRM case hero — two-column: positioning, verified proof and
 * capability tags on the left; the sanitized operational CRM
 * surface on the right. No empty right side.
 */
export default function CrmCaseHero({ lang, c }) {
  const h = c.hero;

  return (
    <header className="mx-auto grid max-w-[1440px] items-center gap-12 px-5 pb-16 pt-8 md:grid-cols-2 md:gap-16 md:px-10 md:pb-24 md:pt-12">
      <div>
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

      <Reveal variant="scale" delay={0.1}>
        <div className="relative">
          <CrmOpsMockup lang={lang} />

          {/* Matching surface — overlaps the lower-left of the main image */}
          <motion.div
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -bottom-10 -left-4 z-20 hidden lg:block xl:-left-10"
          >
            <CrmMatchingFragment lang={lang} className="-rotate-2" />
          </motion.div>

          {/* Communication surface — peeks over the top-right edge */}
          <motion.div
            initial={{ opacity: 0, y: -18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -top-9 -right-3 z-0 hidden lg:block"
          >
            <CrmCommsFragment lang={lang} className="rotate-2" />
          </motion.div>
        </div>
      </Reveal>
    </header>
  );
}