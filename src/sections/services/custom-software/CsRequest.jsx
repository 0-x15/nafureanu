import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, EASE, MONO, tabKey } from "./csBits";

/** Request versus system — the sentence a client says, and the pieces that usually have to exist behind it. */
export default function CsRequest({ c }) {
  const r = c.request;
  const [i, setI] = useState(0);
  const q = r.requests[i];
  const reduced = useReducedMotion();
  return (
    <Chapter id="cs-request">
      <ChapterHead id="cs-request" kicker={r.kicker} title={r.title} intro={r.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8 lg:items-start">
        <Reveal delay={0.05} className="lg:col-span-5">
          <p className={cn(MONO, "mb-3 text-muted-foreground")}>{r.labels.request}</p>
          <ol role="tablist" aria-label={r.labels.request} className="space-y-2">
            {r.requests.map((x, k) => { const on = k === i; return <li key={x.id}><button type="button" role="tab" id={`cs-req-${x.id}`} aria-selected={on} aria-controls="cs-req-panel" tabIndex={on ? 0 : -1} onClick={() => setI(k)} onKeyDown={(e) => tabKey(e, k, r.requests.length, setI)} className={cn("w-full rounded-[10px] border px-5 py-4 text-left font-heading text-lg font-semibold tracking-[-0.01em] outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent bg-white text-foreground" : "border-border bg-white/60 text-foreground/70 hover:border-foreground/30")}><span aria-hidden="true" className="mr-1 text-accent">“</span>{x.quote}<span aria-hidden="true" className="text-accent">”</span></button></li>; })}
          </ol>
        </Reveal>
        <div id="cs-req-panel" role="tabpanel" aria-labelledby={`cs-req-${q.id}`} className="lg:col-span-7">
          <p className={cn(MONO, "mb-3 text-muted-foreground")}>{r.labels.system}</p>
          <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {q.underlying.map((u, k) => (
              <motion.li key={`${q.id}-${u}`} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: k * 0.05, ease: EASE }} className="rounded-[8px] border border-accent/40 bg-white px-3 py-3 text-[13px] font-medium text-foreground">
                <span className="mr-2 font-mono text-[10px] tracking-[0.18em] text-accent">{String(k + 1).padStart(2, "0")}</span>{u}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      <Closing>{r.closing}</Closing>
    </Chapter>
  );
}
