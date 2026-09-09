import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, H2, Index, MONO } from "./studioBits";

/**
 * Room 05 — technical direction. Corporate governance, not biography:
 * who holds technical responsibility, and how the company avoids
 * depending on one person. The knowledge-transfer drawing is the centre.
 */
export default function FounderDirection({ a }) {
  const t = a.founder;
  const reduced = useReducedMotion();
  return (
    <section id="studio-founder" aria-labelledby="studio-founder-title" className="scroll-mt-20 bg-white px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1440px]">
        <Index meta={t.meta}>{t.index}</Index>
        <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="flex items-start gap-6 lg:col-span-3">
            <p id="studio-founder-title" className="font-heading text-[clamp(3rem,6vw,5.5rem)] font-bold leading-none tracking-[-0.045em] text-foreground lg:self-start lg:[writing-mode:vertical-rl] lg:rotate-180">{t.name}</p>
            <div className="pt-2">
              <p className={cn(MONO, "text-accent")}>{t.role}</p>
              <p className="mt-4 max-w-[26ch] text-[14px] leading-[1.6] text-foreground/80">{t.question}</p>
            </div>
          </div>
          <div className="lg:col-span-8 lg:col-start-5">
            <div className="grid gap-6 border-t border-foreground/12 pt-5 md:grid-cols-12">
              <p className={cn(MONO, "text-muted-foreground md:col-span-3")}>{t.matrixLabel}</p>
              <ul className="flex flex-wrap gap-x-6 gap-y-2 md:col-span-9">
                {t.matrix.map((m) => <li key={m} className="flex items-center gap-2 text-[14px] font-semibold text-foreground"><span aria-hidden="true" className="h-2 w-2 bg-accent" />{m}</li>)}
              </ul>
              <p className="text-[15px] leading-[1.6] text-foreground/80 md:col-span-9 md:col-start-4">{t.intent}</p>
            </div>

            <div className="mt-14 md:mt-16">
              <span aria-hidden="true" className="block h-[3px] w-12 bg-accent" />
              <h3 className={cn(H2, "mt-5 max-w-[26ch] text-foreground")}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span></h3>
            </div>

            {/* knowledge transfer: person → system through four channels */}
            <figure aria-label={t.transfer.label} className="m-0 mt-10">
              <div className="grid grid-cols-[auto_1fr_auto] items-stretch gap-4 md:gap-8">
                <div className="flex items-center border border-foreground/25 px-4 py-6 md:px-6"><span className="font-heading text-[15px] font-bold tracking-[-0.02em] text-foreground md:text-[17px]">{t.transfer.from}</span></div>
                <ul className="flex flex-col justify-center gap-3">
                  {t.transfer.channels.map((ch, i) => (
                    <li key={ch} className="relative flex items-center">
                      <motion.span aria-hidden="true" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.15 * i, ease: EASE }} className="block h-px w-full origin-left bg-accent" />
                      <span className={cn(MONO, "absolute left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-foreground/80")}>{ch}</span>
                      <span aria-hidden="true" className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rotate-45 border-r border-t border-accent" />
                    </li>
                  ))}
                </ul>
                <div className="flex items-center border border-accent bg-accent px-4 py-6 text-white md:px-6"><span className="font-heading text-[15px] font-bold tracking-[-0.02em] md:text-[17px]">{t.transfer.to}</span></div>
              </div>
              <figcaption className="mt-4 text-[14px] leading-[1.6] text-muted-foreground">{t.note}</figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
