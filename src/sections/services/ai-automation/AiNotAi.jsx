import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, WHO, Who } from "./aiBits";

/** Where AI is unnecessary — a two-axis map: structured→ambiguous input, exact→interpretive result. */
export default function AiNotAi({ c }) {
  const n = c.notai;
  return (
    <Chapter id="ai-notai" tone="white">
      <ChapterHead id="ai-notai" kicker={n.kicker} title={n.title} intro={n.intro} />
      <Reveal variant="scale" delay={0.06} className="mt-12 md:mt-16">
        {/* map — sm and up */}
        <div className="hidden sm:block">
          <div className="relative mx-auto aspect-[16/10] w-full max-w-[920px] rounded-[12px] border border-border bg-[#FAFBFD]">
            <div aria-hidden="true" className="absolute inset-0 [background-image:linear-gradient(rgba(15,23,42,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.05)_1px,transparent_1px)] [background-size:10%_10%]" />
            <div aria-hidden="true" className="absolute inset-y-0 left-1/2 w-px bg-border" /><div aria-hidden="true" className="absolute inset-x-0 top-1/2 h-px bg-border" />
            <span className={cn(MONO, "absolute bottom-2 left-3 text-muted-foreground")}>{n.axes.x[0]}</span>
            <span className={cn(MONO, "absolute bottom-2 right-3 text-muted-foreground")}>{n.axes.x[1]}</span>
            <span className={cn(MONO, "absolute left-3 top-2 text-muted-foreground")}>{n.axes.y[1]}</span>
            <span className={cn(MONO, "absolute bottom-8 left-3 text-muted-foreground")}>{n.axes.y[0]}</span>
            {n.points.map((p) => (
              <span key={p.label} className={cn("absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-[5px] border px-2 py-1 text-[11px] font-medium shadow-sm", WHO[p.kind].chip)} style={{ left: `${p.x}%`, top: `${100 - p.y}%` }}>{p.label}</span>
            ))}
            <span className="absolute right-3 top-2 flex gap-2"><Who who="rules" label={n.legend.rules} /><Who who="ai" label={n.legend.ai} /></span>
          </div>
        </div>
        {/* lists — below sm */}
        <div className="grid gap-4 sm:hidden">
          {["rules", "ai"].map((k) => <div key={k} className="rounded-[10px] border border-border bg-white p-4"><Who who={k} label={n.legend[k]} /><ul className="mt-3 flex flex-wrap gap-1.5">{n.points.filter((p) => p.kind === k).map((p) => <li key={p.label} className={cn("rounded-[5px] border px-2 py-1 text-[12px]", WHO[k].chip)}>{p.label}</li>)}</ul></div>)}
        </div>
      </Reveal>
      <Closing>{n.closing}</Closing>
    </Chapter>
  );
}
