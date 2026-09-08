import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, EASE, MONO } from "./csBits";

/**
 * The interface is only the visible part — a cross-section in the
 * site's light palette: the surface sits on top as a white card and
 * seven strata rise beneath it as the chapter enters the viewport.
 */
export default function CsBeneath({ c }) {
  const b = c.beneath;
  const reduced = useReducedMotion();
  return (
    <Chapter id="cs-beneath" tone="blue">
      <ChapterHead id="cs-beneath" kicker={b.kicker} title={b.title} intro={b.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal variant="scale" className="lg:col-span-5">
          <div className="rounded-[10px] border border-accent bg-white p-4 shadow-[0_24px_48px_-30px_rgba(37,99,235,0.45)] md:p-5">
            <div className="flex items-center justify-between gap-3">
              <span className={cn(MONO, "text-accent")}>{b.surface.label} · {b.surface.title}</span>
              <span className="flex gap-1.5"><i aria-hidden="true" className="h-2 w-2 rounded-full bg-border" /><i aria-hidden="true" className="h-2 w-2 rounded-full bg-border" /><i aria-hidden="true" className="h-2 w-2 rounded-full bg-border" /></span>
            </div>
            <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-3">
              <div><span className="block h-3 w-2/3 rounded-[3px] bg-foreground/80" /><span className="mt-2 block h-2 w-1/2 rounded-[3px] bg-border" /><span className="mt-1.5 block h-2 w-2/5 rounded-[3px] bg-border" /></div>
              <span className="rounded-[5px] bg-accent px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white">{b.surface.text}</span>
            </div>
          </div>
        </Reveal>
        <div className="lg:col-span-7">
          <ol className="relative border-l border-accent/40 pl-6">
            {b.layers.map((l, i) => (
              <motion.li key={l.label} initial={reduced ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.1 * i, ease: EASE }} className="relative mb-2 rounded-[8px] border border-border bg-white px-4 py-3" style={{ marginLeft: `${i * 2}%` }}>
                <span aria-hidden="true" className="absolute -left-[31px] top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full border border-accent bg-white" />
                <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[15px] font-semibold tracking-[-0.01em] text-foreground">{l.label}</span>
                  <span className="text-[13px] text-muted-foreground">{l.text}</span>
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
      <Closing>{b.closing}</Closing>
    </Chapter>
  );
}
