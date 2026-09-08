import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, DOT, EASE, MONO, Pill, Surface } from "./aiBits";

/** Reliability — what you need to know, the trail of one run, and the concepts underneath. */
export default function AiReliability({ c }) {
  const r = c.reliability;
  const reduced = useReducedMotion();
  return (
    <Chapter id="ai-reliability">
      <ChapterHead id="ai-reliability" kicker={r.kicker} title={r.title} intro={r.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.05} className="lg:col-span-4">
          <p className={cn(MONO, "text-muted-foreground")}>{r.needsLabel}</p>
          <ol className="mt-3 space-y-3">{r.needs.map((n, i) => <li key={n} className="flex items-start gap-3"><span className="font-mono text-[10px] tracking-[0.18em] text-accent">{String(i + 1).padStart(2, "0")}</span><span className="font-heading text-xl font-bold tracking-[-0.02em] text-foreground">{n}</span></li>)}</ol>
          <p className={cn(MONO, "mt-8 text-muted-foreground")}>{r.conceptsLabel}</p>
          <ul className="mt-2 flex flex-wrap gap-1.5">{r.concepts.map((k) => <li key={k}><Pill tone="soft">{k}</Pill></li>)}</ul>
        </Reveal>
        <Reveal variant="scale" delay={0.08} className="lg:col-span-8">
          <Surface title={r.trail.title} meta={String(r.trail.entries.length)}>
            <ol className="divide-y divide-border">
              {r.trail.entries.map((en, i) => (
                <motion.li key={en.t + en.label} initial={reduced ? false : { opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.3, delay: i * 0.16, ease: EASE }} className="grid grid-cols-[52px_12px_1fr] items-center gap-3 py-2 sm:grid-cols-[52px_12px_110px_1fr]">
                  <span className="font-mono text-[11px] text-muted-foreground">{en.t}</span>
                  <span aria-hidden="true" className={cn("h-2.5 w-2.5 rounded-full", DOT[en.tone])} />
                  <span className={cn(MONO, "hidden text-muted-foreground sm:block")}>{en.label}</span>
                  <span className="text-[13px] leading-snug text-foreground/85"><span className={cn(MONO, "mr-2 text-muted-foreground sm:hidden")}>{en.label}</span>{en.text}</span>
                </motion.li>
              ))}
            </ol>
          </Surface>
        </Reveal>
      </div>
      <Closing>{r.closing}</Closing>
    </Chapter>
  );
}
