import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Surface } from "./csBits";

/** Discovery — select the questions and watch the system definition fill in. */
export default function CsDiscovery({ lang, c }) {
  const d = c.discovery;
  const [on, setOn] = useState(() => new Set([0, 1]));
  const reduced = useReducedMotion();
  const toggle = (k) => setOn((prev) => { const n = new Set(prev); if (n.has(k)) n.delete(k); else n.add(k); return n; });
  return (
    <Chapter id="cs-discovery" tone="blue">
      <ChapterHead id="cs-discovery" kicker={d.kicker} title={d.title} intro={d.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <Reveal delay={0.05} className="lg:col-span-5">
          <p className={cn(MONO, "mb-3 text-muted-foreground")}>{d.hint}</p>
          <ol className="space-y-1.5">
            {d.questions.map((x, k) => { const a = on.has(k); return <li key={x.q}><button type="button" aria-pressed={a} onClick={() => toggle(k)} className={cn("flex w-full items-center gap-3 rounded-[8px] border bg-white px-4 py-2.5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", a ? "border-accent" : "border-border hover:border-foreground/30")}><span aria-hidden="true" className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded-[3px] border font-mono text-[10px]", a ? "border-accent bg-accent text-white" : "border-border")}>{a ? "✓" : ""}</span><span className={cn("text-[14px] font-medium", a ? "text-accent-deep" : "text-foreground")}>{x.q}</span></button></li>; })}
          </ol>
          <div className="mt-6"><ActionLink to={langPath(lang, "/contact")} size="md">{d.cta}</ActionLink></div>
        </Reveal>
        <Reveal variant="scale" delay={0.08} className="lg:col-span-7">
          <Surface title={d.sheetTitle} meta={`${on.size}/${d.questions.length}`}>
            <dl className="divide-y divide-border" aria-live="polite">
              {d.questions.map((x, k) => { const a = on.has(k); return <div key={x.field} className="grid gap-1 py-2.5 sm:grid-cols-[140px_1fr] sm:gap-4"><dt className={cn(MONO, a ? "text-accent" : "text-muted-foreground")}>{x.field}</dt><motion.dd key={a ? "on" : "off"} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} className={cn("text-[13px] leading-snug", a ? "text-foreground" : "text-muted-foreground/60")}>{a ? x.value : d.emptyValue}</motion.dd></div>; })}
            </dl>
          </Surface>
        </Reveal>
      </div>
      <Closing>{d.closing}</Closing>
    </Chapter>
  );
}
