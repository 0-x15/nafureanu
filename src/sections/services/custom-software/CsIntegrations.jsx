import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Tag, tabKey } from "./csBits";

/**
 * Integrations — an integration bus. The custom system is the bar in
 * the middle; existing systems hang above and below it. Selecting one
 * shows how the connection behaves: read, write, sync or events.
 */
export default function CsIntegrations({ c }) {
  const g = c.integrations;
  const [i, setI] = useState(1);
  const sys = g.systems[i];
  const reduced = useReducedMotion();
  const top = g.systems.slice(0, 5);
  const bottom = g.systems.slice(5);
  const node = (x, k) => {
    const on = k === i;
    return (
      <button key={x.id} type="button" role="tab" id={`cs-int-${x.id}`} aria-selected={on} aria-controls="cs-int-panel" tabIndex={on ? 0 : -1} onClick={() => setI(k)} onKeyDown={(e) => tabKey(e, k, g.systems.length, setI)}
        className={cn("relative rounded-[7px] border bg-white px-3 py-2 text-[12px] font-semibold tracking-[-0.01em] outline-none transition-[border-color,box-shadow] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "border-accent text-accent-deep shadow-[0_12px_28px_-18px_rgba(37,99,235,0.7)]" : "border-border text-foreground/85 hover:border-foreground/40")}>
        {x.name}
      </button>
    );
  };
  return (
    <Chapter id="cs-integrations" tone="white">
      <ChapterHead id="cs-integrations" kicker={g.kicker} title={g.title} intro={g.intro} />
      <Reveal variant="scale" delay={0.06} className="mt-12 md:mt-16">
        <div role="tablist" aria-label={g.kicker} className="rounded-[12px] border border-border bg-[#FAFBFD] p-4 md:p-6">
          <div className="flex flex-wrap justify-center gap-2 md:grid md:grid-cols-5 md:justify-items-center">{top.map((x, k) => <span key={x.id} className="flex flex-col items-center">{node(x, k)}<span aria-hidden="true" className={cn("hidden h-6 w-px md:block", k === i ? "bg-accent" : "bg-border")} /></span>)}</div>
          <div className={cn("my-3 flex items-center justify-center rounded-[8px] border border-accent bg-white px-4 py-3 md:my-0", MONO, "text-accent")}>{g.core}</div>
          <div className="flex flex-wrap justify-center gap-2 md:grid md:grid-cols-4 md:justify-items-center">{bottom.map((x, k) => <span key={x.id} className="flex flex-col items-center"><span aria-hidden="true" className={cn("hidden h-6 w-px md:block", k + 5 === i ? "bg-accent" : "bg-border")} />{node(x, k + 5)}</span>)}</div>
        </div>
        <motion.div key={sys.id} id="cs-int-panel" role="tabpanel" aria-labelledby={`cs-int-${sys.id}`} initial={reduced ? false : { opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-4 grid gap-4 rounded-[10px] border border-border bg-white p-5 md:grid-cols-[220px_1fr] md:items-center">
          <div>
            <p className="font-heading text-xl font-bold tracking-[-0.02em] text-foreground">{sys.name}</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">{Object.keys(g.modes).map((m) => <li key={m}><Tag tone={sys.modes.includes(m) ? "solid" : "muted"}>{g.modes[m]}</Tag></li>)}</ul>
          </div>
          <p className="text-[14px] leading-relaxed text-foreground/85">{sys.text}</p>
        </motion.div>
        <p className="mt-3 max-w-3xl text-[13px] text-muted-foreground">{g.note}</p>
      </Reveal>
      <Closing>{g.closing}</Closing>
    </Chapter>
  );
}
