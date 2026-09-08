import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Act, H2, MONO, Sheet } from "./studioBits";

/**
 * Act 03 — the engineering standard. Six dimensions of a professionally
 * delivered system, and a review sheet whose principles unfold one by one.
 * Labelled as principles, not as a formal certification.
 */
export default function EngineeringStandard({ a }) {
  const t = a.standard;
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(0);
  return (
    <Act id="studio-standard" index={a.index[2]} className="py-14 md:py-20">
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2 id="studio-standard-title" className={H2}><span className="block">{t.a}</span><span className="block text-muted-foreground">{t.b}</span></h2>
          <p className="mt-5 max-w-[44ch] text-[15px] leading-[1.65] text-foreground/80">{t.intro}</p>
          <p className={cn(MONO, "mt-10 text-muted-foreground")}>{t.dimsLabel}</p>
          <dl className="mt-2 grid grid-cols-2 gap-x-8 border-t border-foreground/12">
            {t.dims.map((d) => (
              <div key={d.label} className="border-b border-foreground/12 py-3">
                <dt className="text-[14px] font-semibold text-foreground">{d.label}</dt>
                <dd className="mt-0.5 text-[13px] leading-[1.5] text-muted-foreground">{d.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-[44ch] text-[14px] leading-[1.65] text-muted-foreground">{t.note}</p>
        </div>
        <div className="lg:col-span-7">
          <Sheet title={t.sheet.title} meta={t.sheet.meta}>
            <ol className="divide-y divide-foreground/10">
              {t.rows.map((r, i) => {
                const on = open === i;
                return (
                  <li key={r.label}>
                    <button type="button" aria-expanded={on} aria-controls={`studio-review-${i}`} onClick={() => setOpen(on ? -1 : i)} className={cn("grid w-full grid-cols-[28px_1fr_20px] items-center gap-4 px-5 py-3.5 text-left outline-none transition-colors hover:bg-[#FAF9F5] focus-visible:bg-[#FAF9F5] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-accent md:px-6")}>
                      <span aria-hidden="true" className={cn("font-mono text-[12px]", on ? "text-accent" : "text-foreground/45")}>✓</span>
                      <span className={cn("text-[15px] font-medium tracking-[-0.01em] transition-colors", on ? "text-foreground" : "text-foreground/80")}>{r.label}</span>
                      <span aria-hidden="true" className={cn("justify-self-end font-mono text-[12px] text-muted-foreground transition-transform", on && "rotate-45")}>+</span>
                    </button>
                    <motion.div id={`studio-review-${i}`} initial={false} animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.35, ease: [0.22, 1, 0.36, 1] }} className="overflow-hidden">
                      <p className="px-5 pb-4 pl-[60px] text-[14px] leading-[1.65] text-foreground/80 md:px-6 md:pl-[64px]">{r.text}</p>
                    </motion.div>
                  </li>
                );
              })}
            </ol>
            <p className={cn(MONO, "border-t border-foreground/12 px-5 py-3 text-muted-foreground md:px-6")}>{t.sheet.hint}</p>
          </Sheet>
        </div>
      </div>
    </Act>
  );
}
