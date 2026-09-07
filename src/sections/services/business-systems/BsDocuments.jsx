import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Points, Rail, StateChip, Surface, stateTone } from "./bsBits";

/** Documents as part of the process — a document passport, its lifecycle, the gate it can hold, and what each transition does. */
export default function BsDocuments({ c }) {
  const d = c.documents;
  return (
    <Chapter id="bs-documents">
      <ChapterHead id="bs-documents" kicker={d.kicker} title={d.title} intro={d.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <Reveal variant="scale" className="lg:col-span-5">
          <Surface title={d.passport.title} meta="DOC">
            <dl className="divide-y divide-border">
              {d.passport.rows.map(([k, v]) => (
                <div key={k} className="flex items-center justify-between gap-4 py-2">
                  <dt className="text-[12px] text-muted-foreground">{k}</dt>
                  <dd className="text-right text-[13px] font-medium text-foreground">{stateTone(v) !== "neutral" && v.length < 22 ? <StateChip>{v}</StateChip> : v}</dd>
                </div>
              ))}
            </dl>
          </Surface>
        </Reveal>
        <div className="grid gap-6 lg:col-span-7">
          <Reveal delay={0.06}>
            <div className="rounded-[10px] border border-border bg-white p-5">
              <p className={cn(MONO, "mb-4 text-muted-foreground")}>{d.lifecycleLabel}</p>
              <Rail steps={d.lifecycle} active={d.lifecycleActive} size="sm" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[10px] border border-accent/40 bg-[#F7F9FD] p-5">
              <p className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{d.gate.title}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{d.gate.text}</p>
              <ul className="mt-4 divide-y divide-border">
                {d.gate.items.map(([label, ok]) => <li key={label} className="flex items-center gap-3 py-2 text-[13px] text-foreground"><span aria-hidden="true" className={cn("flex h-4 w-4 items-center justify-center rounded-[3px] border font-mono text-[10px]", ok ? "border-accent bg-accent text-white" : "border-[#EAB4B4] bg-[#FDECEC] text-[#9B2C2C]")}>{ok ? "✓" : "!"}</span>{label}</li>)}
              </ul>
              <p className="mt-3"><StateChip tone="danger">{d.gate.blocked}</StateChip></p>
            </div>
          </Reveal>
        </div>
      </div>
      <Reveal delay={0.08}><Points items={d.consequences} cols={4} className="mt-12" /></Reveal>
      <Reveal delay={0.1}><p className={cn(MONO, "mt-4 text-muted-foreground")}>{d.note}</p></Reveal>
      <Closing>{d.closing}</Closing>
    </Chapter>
  );
}
