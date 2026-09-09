import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, H2, Index, MONO } from "./studioBits";

/**
 * Room 04 — responsibility has boundaries. A horizontal field: business
 * context on the left, technical responsibility on the right, and the
 * hatched overlap of shared decisions between them. Hovering a side
 * brings its items forward. Below, quietly, what stays outside the
 * boundary of engineering.
 */
export default function ResponsibilityMap({ a }) {
  const t = a.map;
  const reduced = useReducedMotion();
  const [side, setSide] = useState(/** @type {"client" | "us" | null} */ (null));
  const Side = ({ id, c, align }) => (
    <div onMouseEnter={() => setSide(id)} onMouseLeave={() => setSide(null)} className={cn("flex flex-col justify-between px-6 py-6 transition-opacity duration-300 md:px-8 md:py-8", side && side !== id && "opacity-50", align === "right" && "md:text-right")}>
      <div>
        <p className={cn(MONO, "text-muted-foreground")}>{c.who}</p>
        <p className="mt-1 font-heading text-[19px] font-bold tracking-[-0.02em] text-foreground md:text-[22px]">{c.label}</p>
      </div>
      <ul className={cn("mt-8 space-y-2", align === "right" && "md:ml-auto")}>
        {c.items.map((x) => <li key={x} className={cn("flex items-center gap-3 text-[14px] text-foreground/85", align === "right" && "md:flex-row-reverse")}><span aria-hidden="true" className="h-px w-4 shrink-0 bg-accent" />{x}</li>)}
      </ul>
    </div>
  );
  return (
    <section id="studio-map" aria-labelledby="studio-map-title" className="scroll-mt-20 px-5 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <Index meta={t.meta}>{t.index}</Index>
        <div className="mt-6 grid gap-4 md:grid-cols-12 md:items-end">
          <h2 id="studio-map-title" className={cn(H2, "text-foreground md:col-span-6")}>{t.a}</h2>
          <p className="max-w-[44ch] text-[15px] leading-[1.6] text-foreground/80 md:col-span-5 md:col-start-8">{t.intro}</p>
        </div>

        <div className="relative mt-10 border border-foreground/15 bg-white md:mt-12">
          <div className="grid md:grid-cols-[1fr_minmax(220px,0.9fr)_1fr]">
            <Side id="client" c={t.client} align="left" />
            <motion.div initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: reduced ? 0 : 0.9, delay: 0.2, ease: EASE }} className="relative origin-center border-y border-dashed border-foreground/35 md:border-x md:border-y-0 [background-image:repeating-linear-gradient(135deg,transparent_0,transparent_7px,rgba(37,99,235,0.14)_7px,rgba(37,99,235,0.14)_8px)]">
              <div className="flex h-full flex-col justify-between bg-white/60 px-6 py-6 md:px-6 md:py-8">
                <p className={cn(MONO, "text-accent")}>{t.shared.label}</p>
                <ul className="mt-6 space-y-2 md:mt-0">
                  {t.shared.items.map((x) => <li key={x} className="flex items-center gap-3 text-[14px] font-medium text-foreground"><span aria-hidden="true" className="h-2 w-2 shrink-0 border border-accent bg-white" />{x}</li>)}
                </ul>
              </div>
            </motion.div>
            <Side id="us" c={t.us} align="right" />
          </div>
        </div>

        <div className="mt-6 grid gap-3 md:grid-cols-12 md:items-baseline md:gap-8">
          <p className={cn(MONO, "text-muted-foreground md:col-span-3")}>{t.outside.label}</p>
          <p className="text-[14px] leading-[1.6] text-foreground/70 md:col-span-4">{t.outside.text}</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1 md:col-span-5 md:justify-end">
            {t.outside.items.map((x) => <li key={x} className={cn(MONO, "border border-foreground/12 px-2 py-1 text-foreground/50")}>{x}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
