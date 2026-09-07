import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";
import MatchingDemo from "@/sections/work/crm/MatchingDemo";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill } from "./serviceBits";

/**
 * Matching — the strongest differentiator. The real criteria (what
 * filters out, what scores), the demo workspace reused unchanged from
 * the case study (fictional data) and what follows a match.
 */
export default function CrmServiceMatching({ lang, c }) {
  const m = c.matching;
  const demo = STRINGS[lang].crm.matching;
  return (
    <Chapter id="crm-service-matching" tone="white">
      <ChapterHead id="crm-service-matching" kicker={m.kicker} title={m.title} />
      <Reveal delay={0.05}>
        <div className="mt-6 max-w-2xl space-y-4">{m.paras.map((p) => <p key={p} className="text-base leading-[1.75] text-muted-foreground md:text-lg">{p}</p>)}</div>
      </Reveal>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Reveal delay={0.06}>
          <div className="h-full rounded-[10px] border border-border bg-white p-5">
            <p className={cn(MONO, "text-muted-foreground")}>{m.blocking.label}</p>
            <ul className="mt-3 space-y-2">{m.blocking.items.map((i) => <li key={i} className="flex items-center gap-3 text-[14px] text-foreground"><span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-[3px] border border-foreground/60 font-mono text-[10px] text-foreground/70">×</span>{i}</li>)}</ul>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full rounded-[10px] border border-border bg-white p-5">
            <p className={cn(MONO, "text-muted-foreground")}>{m.scoring.label}</p>
            <ul className="mt-3 space-y-2">{m.scoring.items.map((i) => <li key={i} className="flex items-center gap-3 text-[14px] text-foreground"><span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-[3px] border border-accent bg-[#EEF3FC] font-mono text-[10px] text-accent">+</span>{i}</li>)}</ul>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="h-full rounded-[10px] border border-accent/30 bg-[#F7F9FD] p-5">
            <p className={cn(MONO, "text-muted-foreground")}>{m.actionsLabel}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">{m.actions.map((a) => <Pill key={a} tone="done">{a}</Pill>)}</div>
            <p className="mt-4 text-[13px] leading-relaxed text-foreground/80">{m.notify}</p>
          </div>
        </Reveal>
      </div>
      <Reveal delay={0.08} className="mt-12 md:mt-16">
        <p className={`mb-3 ${MONO} text-muted-foreground`}>{m.demoLabel}</p>
        <MatchingDemo m={demo} />
      </Reveal>
      <Closing>{m.closing}</Closing>
    </Chapter>
  );
}
