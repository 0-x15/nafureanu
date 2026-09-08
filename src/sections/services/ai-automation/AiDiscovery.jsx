import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Surface } from "./aiBits";

/** Discovery — one sentence taken apart into system components, question by question. */
export default function AiDiscovery({ c }) {
  const d = c.discovery;
  const [on, setOn] = useState(() => new Set([0, 1, 4]));
  const reduced = useReducedMotion();
  const toggle = (k) => setOn((prev) => { const n = new Set(prev); if (n.has(k)) n.delete(k); else n.add(k); return n; });
  return (
    <Chapter id="ai-discovery" tone="blue">
      <ChapterHead id="ai-discovery" kicker={d.kicker} title={d.title} intro={d.intro} />
      <Reveal delay={0.05} className="mt-10 md:mt-14"><p className="inline-block rounded-[10px] border border-accent bg-white px-5 py-3 font-heading text-lg font-semibold tracking-[-0.01em] text-foreground"><span aria-hidden="true" className="mr-1 text-accent">“</span>{d.task}<span aria-hidden="true" className="text-accent">”</span></p></Reveal>
      <div className="mt-6 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <Reveal delay={0.06} className="lg:col-span-5">
          <p className={cn(MONO, "mb-3 text-muted-foreground")}>{d.hint}</p>
          <ol className="space-y-1.5">{d.parts.map((x, k) => { const a = on.has(k); return <li key={x.q}><button type="button" aria-pressed={a} onClick={() => toggle(k)} className={cn("flex w-full items-center gap-3 rounded-[8px] border bg-white px-4 py-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", a ? "border-accent" : "border-border hover:border-foreground/30")}><span aria-hidden="true" className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border font-mono text-[10px]", a ? "border-accent bg-accent text-white" : "border-border")}>{a ? "✓" : ""}</span><span className={cn("text-[14px] font-medium", a ? "text-accent-deep" : "text-foreground")}>{x.q}</span></button></li>; })}</ol>
        </Reveal>
        <Reveal variant="scale" delay={0.08} className="lg:col-span-7">
          <Surface title={d.task} meta={`${on.size}/${d.parts.length}`}>
            <ul className="grid gap-2 sm:grid-cols-2">
              {d.parts.map((x, k) => { const a = on.has(k); return <motion.li key={x.component} initial={false} animate={{ opacity: a ? 1 : 0.45 }} transition={{ duration: reduced ? 0 : 0.25 }} className={cn("rounded-[8px] border px-3 py-2.5", a ? "border-accent/50 bg-white" : "border-dashed border-border bg-transparent")}><span className={cn(MONO, a ? "text-accent" : "text-muted-foreground")}>{x.component}</span><span className="mt-0.5 block text-[12px] leading-snug text-foreground/85">{a ? x.value : "—"}</span></motion.li>; })}
            </ul>
          </Surface>
        </Reveal>
      </div>
      <Closing>{d.closing}</Closing>
    </Chapter>
  );
}
