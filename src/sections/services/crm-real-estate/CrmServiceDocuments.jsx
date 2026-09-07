import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill, Surface } from "./serviceBits";
import UiFragment from "./SystemFragments";

/** Documentation — a state machine, a file, and the rules around it. */
export default function CrmServiceDocuments({ c }) {
  const d = c.documents;
  const cards = [d.gate, d.deferred, d.mailbox, d.checklist];
  return (
    <Chapter id="crm-service-documents" tone="blue">
      <ChapterHead id="crm-service-documents" kicker={d.kicker} title={d.title} intro={d.intro} />
      <Reveal delay={0.05} className="mt-10">
        <p className={cn(MONO, "text-muted-foreground")}>{d.statesLabel}</p>
        <ol className="mt-3 flex flex-wrap items-center gap-2">
          {d.states.map((s, i) => (
            <li key={s} className="flex items-center gap-2">
              <Pill tone={i >= 3 ? "done" : i === 2 ? "warn" : "neutral"}>{s}</Pill>
              {i < d.states.length - 1 && <span aria-hidden="true" className="h-px w-4 bg-foreground/30" />}
            </li>
          ))}
        </ol>
        <p className={cn(MONO, "mt-6 text-muted-foreground")}>{d.typesLabel}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{d.types.map((t) => <Pill key={t} tone="soft">{t}</Pill>)}</div>
      </Reveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <Reveal variant="scale" className="lg:col-span-5">
          <Surface title={d.file.title} meta="PR-01840"><UiFragment ui={{ kind: "docs", rows: d.file.rows }} /></Surface>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <ul className="grid gap-4 sm:grid-cols-2">
            {cards.map((k, i) => (
              <li key={k.title} className={cn("rounded-[10px] border bg-white p-5", i === 0 ? "border-accent/40" : "border-border")}>
                <p className="font-heading text-base font-bold tracking-[-0.01em] text-foreground">{k.title}</p>
                <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{k.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <Closing>{d.closing}</Closing>
    </Chapter>
  );
}
