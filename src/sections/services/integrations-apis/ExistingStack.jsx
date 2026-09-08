import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Act, MONO, Packet, Statement } from "./intBits";

const TRAVEL = 2.6;

/**
 * Act IV — keep what already works. The company's tools stand as separate
 * columns; a thin integration layer runs through them like a shared
 * transport line. One packet travels it once when the act enters view.
 */
export default function ExistingStack({ c }) {
  const t = c.stack;
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.5, once: true });
  const run = inView && !reduced;
  const n = t.columns.length;
  const lit = reduced || run;
  return (
    <Act id="in-stack" tone="white" className="border-t border-border">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-5">
          <Statement id="in-stack-title" a={t.a} b={t.b} className="lg:text-[2.6rem]" />
          <p className="mt-6 max-w-lg text-base leading-[1.7] text-muted-foreground md:text-lg">{t.intro}</p>
          <dl className="mt-10 grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[t.stays, t.adds, t.changes].map((x) => (
              <div key={x.label} className="border-l-2 border-accent pl-4">
                <dt className={cn(MONO, "text-accent")}>{x.label}</dt>
                <dd className="mt-1 text-[14px] leading-[1.6] text-foreground/85">{x.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 max-w-lg text-[14px] leading-[1.7] text-muted-foreground">{t.note}</p>
        </Reveal>
        <div ref={ref} className="lg:col-span-7">
          <figure aria-label={t.label} className="relative m-0 pl-8 md:pl-0">
            {/* transport line */}
            <span aria-hidden="true" className="absolute bottom-3 left-[15px] top-3 w-px bg-accent md:bottom-auto md:left-0 md:right-0 md:top-1/2 md:h-px md:w-auto" />
            <span className={cn(MONO, "absolute -left-1 top-0 hidden -translate-y-full pb-2 text-accent md:left-0 md:top-1/2 md:block md:-translate-y-[calc(100%+6px)]")}>{t.layer}</span>
            {run && (
              <>
                <motion.span aria-hidden="true" initial={{ left: "0%" }} animate={{ left: "100%" }} transition={{ duration: TRAVEL, ease: "linear", delay: 0.3 }} className="absolute top-1/2 z-20 hidden -translate-x-1/2 -translate-y-1/2 md:block"><Packet /></motion.span>
                <motion.span aria-hidden="true" initial={{ top: "0%" }} animate={{ top: "100%" }} transition={{ duration: TRAVEL, ease: "linear", delay: 0.3 }} className="absolute left-[15px] z-20 -translate-x-1/2 -translate-y-1/2 md:hidden"><Packet /></motion.span>
              </>
            )}
            <ol className="relative grid gap-2 md:grid-cols-6 md:gap-3">
              {t.columns.map((col, i) => (
                <li key={col} className="relative rounded-[8px] border border-border bg-[#FAFBFD] p-3 md:min-h-[240px] md:p-2.5 lg:min-h-[280px]">
                  <span className="block text-[13px] font-semibold text-foreground md:text-[12px]">{col}</span>
                  <span aria-hidden="true" className="mt-2 hidden space-y-1.5 md:block">{[70, 45, 60].map((w) => <i key={w} className="block h-1.5 rounded-[2px] bg-foreground/12" style={{ width: `${w}%` }} />)}</span>
                  {/* tap: where the line touches this system */}
                  <motion.i aria-hidden="true" initial={false} animate={lit ? { backgroundColor: "#2563EB", borderColor: "#2563EB" } : { backgroundColor: "#FFFFFF", borderColor: "rgba(15,23,42,0.35)" }} transition={{ duration: reduced ? 0 : 0.25, delay: reduced ? 0 : 0.3 + (TRAVEL * (i + 0.5)) / n }} className="absolute -left-[26px] top-1/2 z-10 block h-2.5 w-2.5 -translate-y-1/2 rounded-full border md:left-1/2 md:-translate-x-1/2" />
                  <span aria-hidden="true" className="mt-4 hidden space-y-1.5 md:block">{[55, 65].map((w) => <i key={w} className="block h-1.5 rounded-[2px] bg-foreground/12" style={{ width: `${w}%` }} />)}</span>
                </li>
              ))}
            </ol>
            <figcaption className={cn(MONO, "mt-4 flex items-center gap-2 text-muted-foreground")}><Packet className="h-2 w-2 shadow-none" />{t.packet}</figcaption>
          </figure>
        </div>
      </div>
    </Act>
  );
}
