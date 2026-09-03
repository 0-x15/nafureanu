import { motion } from "framer-motion";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { STRINGS, langPath } from "@/i18n";

const EASE = [0.22, 1, 0.36, 1];

/**
 * The homepage's closing moment — not a banner, but the beginning of
 * a project conversation: the message on the left, the project brief
 * prompts and the primary action on the right. (Other pages keep the
 * shared CtaBand.)
 */
export default function HomeCta({ lang = "es" }) {
  const t = STRINGS[lang].homeCta;

  return (
    <section
      className="relative bg-background px-5 py-16 md:px-10 md:pt-20 md:pb-24"
      aria-labelledby="home-cta-heading"
    >
      <div className="relative mx-auto max-w-[1440px]">
        {/* one precise line — "Hablemos" resolving toward "Empieza por aquí" */}
        <motion.div
          aria-hidden="true"
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
          className="pointer-events-none absolute left-[16%] right-[42%] top-2 hidden h-px origin-left bg-accent/40 lg:block"
        />

        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          {/* Left — main conversion message */}
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
                {t.kicker}
              </p>
              <h2
                id="home-cta-heading"
                className="mt-5 max-w-xl font-heading text-3xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-5xl xl:text-[56px]"
              >
                {t.title}
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
                {t.note}
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <p className="mt-10 max-w-xl text-sm font-medium text-foreground">
                {t.reassurance}
              </p>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {t.explain}
              </p>
            </Reveal>
          </div>

          {/* Right — the project starting point */}
          <div className="lg:col-span-5">
            <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
              {t.briefKicker}
            </p>
            <div className="mt-4">
              {t.brief.map((p, i) => (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.55, delay: 0.25 + i * 0.15, ease: EASE }}
                  className="group grid grid-cols-[22px_1fr] gap-x-3 border-t border-foreground/15 py-6"
                >
                  <span className="mt-1.5 font-mono text-[10px] text-accent transition-transform duration-300 group-hover:translate-x-0.5">
                    {p.num}
                  </span>
                  <div>
                    <h3 className="font-heading text-base font-bold tracking-[-0.01em] text-foreground">
                      {p.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground/90 transition-colors duration-300 group-hover:text-muted-foreground">
                      {p.text}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Primary action */}
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: 0.8, ease: EASE }}
                className="mt-8"
              >
                <ActionLink
                  to={langPath(lang, "/contact")}
                  className="px-8 py-4"
                >
                  {t.button}
                </ActionLink>
                <p className="mt-4 text-xs text-muted-foreground">{t.trust}</p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}