import { useState } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, Entity, MONO, Points, StateChip } from "./bsBits";

/**
 * Operations — the customer connects to an operational object. Change
 * its name (case, project, order, file…) and the structure holds:
 * state, owner, tasks, documents, deadlines, communication, rules.
 */
export default function BsOperations({ c }) {
  const o = c.operations;
  const [noun, setNoun] = useState(o.nouns[0]);
  return (
    <Chapter id="bs-operations" tone="blue">
      <ChapterHead id="bs-operations" kicker={o.kicker} title={o.title} intro={o.intro} />
      <Reveal delay={0.05} className="mt-10 md:mt-14">
        <p className={cn(MONO, "mb-2 text-muted-foreground")}>{o.nounLabel}</p>
        <div className="flex flex-wrap gap-1.5">
          {o.nouns.map((n) => <button key={n} type="button" aria-pressed={n === noun} onClick={() => setNoun(n)} className={cn("rounded-full border px-3.5 py-1.5 text-[13px] font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", n === noun ? "border-accent bg-accent text-white" : "border-border bg-white text-foreground hover:border-foreground/40")}>{n}</button>)}
        </div>
      </Reveal>
      <Reveal variant="scale" delay={0.08} className="mt-8">
        <div className="rounded-[12px] border border-border bg-white p-5 md:p-8">
          <div className="grid items-center gap-6 md:grid-cols-[220px_1fr]">
            <div className="relative">
              <Entity label={o.client.label} name={o.client.name}><span className="mt-1 block text-[11px] text-muted-foreground">{o.client.meta}</span></Entity>
              <span aria-hidden="true" className="absolute left-1/2 top-full h-6 w-px bg-accent md:left-full md:top-1/2 md:h-px md:w-6" />
            </div>
            <div className="rounded-[10px] border border-accent bg-[#F7F9FD] p-4 md:p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p><span className={cn(MONO, "mr-2 text-accent")}>{noun}</span><span className="font-heading text-xl font-bold tracking-[-0.02em] text-foreground">{o.operation.ref}</span></p>
                <StateChip>{o.operation.facets[0].value}</StateChip>
              </div>
              <dl className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {o.operation.facets.slice(1).map((f) => (
                  <div key={f.id} className="rounded-[6px] border border-border bg-white px-3 py-2">
                    <dt className={cn(MONO, "text-muted-foreground")}>{f.label}</dt>
                    <dd className="mt-0.5 text-[13px] font-medium text-foreground">{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.08}><Points items={o.points} cols={4} className="mt-12" /></Reveal>
      <Closing>{o.closing}</Closing>
    </Chapter>
  );
}
