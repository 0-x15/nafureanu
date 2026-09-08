import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Act, MONO, Statement } from "./webBits";

/**
 * Act 02 — structure before style. While this act is on screen the whole
 * page drops its styling: what remains is what is said, in which order,
 * and what can be done. The page labels its own hierarchy. Then editorial
 * judgement, shown on our own description: sentences removed one by one
 * until one clear idea is left.
 */
export default function StructureAct({ c, wire, setWire }) {
  const t = c.structure;
  const reduced = useReducedMotion();
  const zone = useRef(null);
  const [inZone, setInZone] = useState(false);
  const [manual, setManual] = useState(/** @type {boolean | null} */ (null));
  useEffect(() => {
    const el = zone.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([e]) => setInZone(e.isIntersecting), { rootMargin: "-25% 0px -30% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => { if (!inZone) setManual(null); }, [inZone]);
  useEffect(() => { setWire(manual === null ? inZone : manual); }, [inZone, manual, setWire]);

  const demo = useRef(null);
  const demoIn = useInView(demo, { amount: 0.5, once: true });
  const n = t.verbose.length;
  const [cut, setCut] = useState(reduced ? n : 0);
  useEffect(() => {
    if (!demoIn || reduced || cut >= n) return undefined;
    const id = window.setTimeout(() => setCut((v) => v + 1), cut === 0 ? 1100 : 700);
    return () => window.clearTimeout(id);
  }, [demoIn, reduced, cut, n]);

  return (
    <Act id="wd-structure" tone="white" index={c.index.structure} wireLabel={c.wire.context}>
      <div ref={zone}>
        <Statement id="wd-structure-title" a={t.a} b={t.b} />
        <p className="mt-6 font-heading text-[clamp(2rem,5vw,4.8rem)] font-bold leading-[0.98] tracking-[-0.04em] text-accent [text-wrap:balance]">{t.q}</p>
        <div className="mt-14 grid gap-8 md:grid-cols-12 md:items-start">
          <p className="text-[15px] leading-[1.7] text-foreground/80 md:col-span-5">{t.text}</p>
          <div className="md:col-span-4 md:col-start-9 md:text-right">
            <button type="button" aria-pressed={wire} onClick={() => setManual(!wire)} className={cn("wd-keep inline-flex items-center gap-3 border-b-2 pb-1 font-heading text-lg font-bold tracking-[-0.02em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4", wire ? "border-accent text-accent" : "border-foreground text-foreground hover:border-accent hover:text-accent")}>
              <span aria-hidden="true" className={cn("h-2.5 w-2.5 border", wire ? "border-accent bg-accent" : "border-current")} />{wire ? t.toggleOn : t.toggleOff}
            </button>
          </div>
        </div>
      </div>

      <div ref={demo} className="mt-28 grid gap-10 md:mt-40 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-5">
          <h3 className="font-heading text-[clamp(1.8rem,3.6vw,3.2rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground [text-wrap:balance]"><span className="block">{t.editA}</span><span className="block text-muted-foreground">{t.editB}</span></h3>
          <p className="mt-6 max-w-[34ch] text-[15px] leading-[1.7] text-muted-foreground">{t.note}</p>
        </div>
        <div className="md:col-span-7">
          <p aria-live="polite" className="font-heading text-[clamp(1.25rem,2.2vw,1.9rem)] font-medium leading-[1.4] tracking-[-0.02em] text-foreground">
            {t.verbose.map((sentence, i) => (
              <motion.span key={sentence} initial={false} animate={{ opacity: i < cut ? 0.3 : 1 }} transition={{ duration: reduced ? 0 : 0.5 }} className={cn(i < cut && "line-through decoration-[#A4261B]/60 decoration-1")}>{sentence} </motion.span>
            ))}
            <motion.span initial={false} animate={{ color: cut >= n ? "#2563EB" : "#1B1F2A" }} transition={{ duration: reduced ? 0 : 0.6 }} className="wd-keep font-bold">{t.final}</motion.span>
          </p>
          {!reduced && <button type="button" onClick={() => setCut(0)} disabled={cut < n} className={cn(MONO, "wd-keep mt-6 text-muted-foreground underline underline-offset-4 outline-none transition-opacity focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 disabled:opacity-0")}>{t.replay}</button>}
        </div>
      </div>
    </Act>
  );
}
