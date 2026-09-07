import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO } from "./serviceBits";

/** Generic versus custom — the vocabulary each one understands. */
export default function CrmServiceComparison({ c }) {
  const k = c.comparison;
  return (
    <Chapter id="crm-service-comparison" tone="white">
      <ChapterHead id="crm-service-comparison" kicker={k.kicker} title={k.title} />
      <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-12">
        <Reveal delay={0.05} className="md:col-span-4">
          <div className="h-full rounded-[10px] border border-dashed border-foreground/30 p-5 md:p-6">
            <p className={cn(MONO, "text-muted-foreground")}>{k.generic.label}</p>
            <ul className="mt-4 flex flex-wrap gap-2">{k.generic.items.map((i) => <li key={i} className="rounded-[6px] border border-border bg-[#FAFBFD] px-3 py-1.5 text-[13px] text-foreground/70">{i}</li>)}</ul>
          </div>
        </Reveal>
        <Reveal variant="scale" delay={0.1} className="md:col-span-8">
          <div className="h-full rounded-[10px] border border-accent/40 bg-[#F7F9FD] p-5 md:p-6">
            <p className={cn(MONO, "text-accent")}>{k.custom.label}</p>
            <ul className="mt-4 flex flex-wrap gap-2">{k.custom.items.map((i) => <li key={i} className="rounded-[6px] border border-accent/40 bg-white px-3 py-1.5 text-[13px] font-medium text-foreground">{i}</li>)}</ul>
          </div>
        </Reveal>
      </div>
      <Closing>{k.closing}</Closing>
    </Chapter>
  );
}
