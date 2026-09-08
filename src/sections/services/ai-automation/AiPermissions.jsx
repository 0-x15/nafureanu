import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, MONO } from "./aiBits";

/** Data and permissions — least access, roles, tool boundaries, sensitive data, explicit scopes. */
export default function AiPermissions({ c }) {
  const p = c.permissions;
  return (
    <Chapter id="ai-permissions" tone="white">
      <ChapterHead id="ai-permissions" kicker={p.kicker} title={p.title} intro={p.intro} />
      <Reveal delay={0.06}>
        <ol className="mt-10 grid gap-x-8 border-t border-border sm:grid-cols-2 lg:grid-cols-5 md:mt-14">
          {p.principles.map((x, i) => <li key={x.label} className="border-b border-border py-5 lg:border-b-0 lg:border-r lg:pr-6 lg:last:border-r-0"><span className={cn(MONO, "text-accent")}>{String(i + 1).padStart(2, "0")}</span><p className="mt-1.5 font-heading text-base font-bold tracking-[-0.01em] text-foreground">{x.label}</p><p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{x.text}</p></li>)}
        </ol>
      </Reveal>
      <Reveal delay={0.08}><p className="mt-8 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">{p.note}</p></Reveal>
    </Chapter>
  );
}
