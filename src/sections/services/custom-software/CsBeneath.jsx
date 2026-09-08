import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, EASE, KICKER, MONO } from "./csBits";

/**
 * The interface is only the visible part — a graphite cross-section.
 * The surface sits on top in white; seven strata rise from below as the
 * chapter enters the viewport.
 */
export default function CsBeneath({ c }) {
  const b = c.beneath;
  const reduced = useReducedMotion();
  return (
    <Chapter id="cs-beneath" className="border-[#232A3D] bg-[#141826]">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <p className={cn(KICKER, "text-[#8FB0F2]")}>{b.kicker}</p>
          <h2 id="cs-beneath-title" className="mt-4 font-heading text-3xl font-bold leading-[1.08] tracking-[-0.025em] text-white md:text-5xl [text-wrap:balance]">{b.title}</h2>
          <p className="mt-6 max-w-xl text-base leading-[1.7] text-[#B7BED0] md:text-lg">{b.intro}</p>
          <p className="mt-10 max-w-md font-heading text-lg font-semibold leading-snug tracking-[-0.01em] text-white md:text-xl">{b.closing}</p>
        </Reveal>
        <div className="lg:col-span-7">
          <Reveal variant="scale">
            <div className="rounded-[10px] border border-white/70 bg-white p-4 shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] md:p-5">
              <div className="flex items-center justify-between gap-3">
                <span className={cn(MONO, "text-muted-foreground")}>{b.surface.label} · {b.surface.title}</span>
                <span className="flex gap-1.5"><i aria-hidden="true" className="h-2 w-2 rounded-full bg-border" /><i aria-hidden="true" className="h-2 w-2 rounded-full bg-border" /><i aria-hidden="true" className="h-2 w-2 rounded-full bg-border" /></span>
              </div>
              <div className="mt-3 grid grid-cols-[1fr_auto] items-center gap-3">
                <div><span className="block h-3 w-2/3 rounded-[3px] bg-foreground/80" /><span className="mt-2 block h-2 w-1/2 rounded-[3px] bg-border" /><span className="mt-1.5 block h-2 w-2/5 rounded-[3px] bg-border" /></div>
                <span className="rounded-[5px] bg-accent px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-white">{b.surface.text}</span>
              </div>
            </div>
          </Reveal>
          <ol className="relative mt-2 border-l border-[#2F3750] pl-6">
            {b.layers.map((l, i) => (
              <motion.li key={l.label} initial={reduced ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.5 }} transition={{ duration: 0.5, delay: 0.12 * i, ease: EASE }} className="relative border-b border-[#232A3D] py-3.5 last:border-b-0" style={{ marginLeft: `${i * 2}%` }}>
                <span aria-hidden="true" className="absolute -left-[27px] top-[19px] h-[7px] w-[7px] rounded-full border border-[#8FB0F2] bg-[#141826]" />
                <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[#8FB0F2]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[15px] font-semibold tracking-[-0.01em] text-white">{l.label}</span>
                  <span className="text-[13px] text-[#9AA3B8]">{l.text}</span>
                </span>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </Chapter>
  );
}
