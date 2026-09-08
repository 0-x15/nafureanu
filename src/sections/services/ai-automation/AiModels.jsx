import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill } from "./aiBits";

/** Models are components — what is yours and stays, versus the interchangeable model. */
export default function AiModels({ c }) {
  const m = c.models;
  return (
    <Chapter id="ai-models" tone="blue">
      <ChapterHead id="ai-models" kicker={m.kicker} title={m.titleB} titleMuted={m.titleA} intro={m.intro} />
      <div className="mt-12 grid items-stretch gap-4 md:mt-16 md:grid-cols-[1.3fr_auto_1fr]">
        <Reveal delay={0.05}><div className="h-full rounded-[10px] border border-accent bg-white p-5 md:p-6"><p className={cn(MONO, "text-accent")}>{m.systemLabel}</p><ol className="mt-3 space-y-1.5">{m.system.map((s, i) => <li key={s} className="flex items-center gap-3 rounded-[6px] border border-border bg-[#FAFBFD] px-3 py-2 text-[14px] font-medium text-foreground"><span className="font-mono text-[10px] tracking-[0.18em] text-accent">{String(i + 1).padStart(2, "0")}</span>{s}</li>)}</ol></div></Reveal>
        <Reveal delay={0.08} className="flex items-center justify-center"><span aria-hidden="true" className="flex items-center gap-1 font-mono text-[11px] text-accent md:flex-col"><i className="block h-px w-6 bg-accent md:h-6 md:w-px" />⇄<i className="block h-px w-6 bg-accent md:h-6 md:w-px" /></span></Reveal>
        <Reveal delay={0.1}><div className="h-full rounded-[10px] border border-dashed border-foreground/30 p-5 md:p-6"><p className={cn(MONO, "text-muted-foreground")}>{m.model.label}</p><ul className="mt-3 flex flex-wrap gap-1.5">{m.model.providers.map((p) => <li key={p}><Pill>{p}</Pill></li>)}</ul><p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">{m.model.text}</p></div></Reveal>
      </div>
      <Closing>{m.closing}</Closing>
    </Chapter>
  );
}
