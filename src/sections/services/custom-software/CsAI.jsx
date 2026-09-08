import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Tag } from "./csBits";

/** AI inside custom software — deterministic rules and probabilistic models, with different responsibilities, in one flow. */
export default function CsAI({ c }) {
  const a = c.ai;
  const Col = ({ side, tone }) => (
    <div className={cn("h-full rounded-[10px] border p-5 md:p-6", tone === "rules" ? "border-border bg-white" : "border-accent/40 bg-[#F7F9FD]")}>
      <div className="flex items-center justify-between gap-3"><p className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{side.label}</p><Tag tone={tone === "rules" ? "neutral" : "accent"}>{side.tag}</Tag></div>
      <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{side.text}</p>
      <ul className="mt-4 divide-y divide-border border-t border-border">{side.items.map((it) => <li key={it} className="flex items-center gap-3 py-2 text-[13px] text-foreground/85"><span aria-hidden="true" className={cn("h-1.5 w-1.5 shrink-0 rounded-full", tone === "rules" ? "bg-foreground/60" : "bg-accent")} />{it}</li>)}</ul>
    </div>
  );
  const who = { ai: "border-accent/40 bg-[#EEF3FC] text-accent-deep", rules: "border-border bg-white text-foreground", human: "border-[#E7C9A0] bg-[#FFF7EA] text-[#8A5A14]" };
  return (
    <Chapter id="cs-ai">
      <ChapterHead id="cs-ai" kicker={a.kicker} title={a.title} intro={a.intro} />
      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-2">
        <Reveal delay={0.05}><Col side={a.split.rules} tone="rules" /></Reveal>
        <Reveal delay={0.08}><Col side={a.split.ai} tone="ai" /></Reveal>
      </div>
      <Reveal delay={0.1} className="mt-8">
        <p className={cn(MONO, "text-muted-foreground")}>{a.example.title}</p>
        <ol className="mt-3 grid gap-3 md:grid-cols-3">
          {a.example.steps.map((st, i) => (
            <li key={st.text} className={cn("relative rounded-[8px] border px-4 py-3", who[st.who])}>
              <span className={cn(MONO, "block opacity-80")}>{String(i + 1).padStart(2, "0")} · {a.labels[st.who]}</span>
              <span className="mt-1 block text-[13px] leading-snug">{st.text}</span>
              {i < 2 && <span aria-hidden="true" className="absolute -right-[10px] top-1/2 hidden h-px w-4 bg-accent md:block" />}
            </li>
          ))}
        </ol>
        <p className="mt-4 max-w-3xl text-[13px] leading-relaxed text-muted-foreground">{a.note}</p>
      </Reveal>
      <Closing>{a.closing}</Closing>
    </Chapter>
  );
}
