import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill, Surface } from "./serviceBits";

/** Calendar — the day's operation as one composition, mirrored in Google Calendar. */
export default function CrmServiceAgenda({ c }) {
  const a = c.agenda;
  return (
    <Chapter id="crm-service-agenda" tone="white">
      <ChapterHead id="crm-service-agenda" kicker={a.kicker} title={a.title} intro={a.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <Reveal variant="scale" className="lg:col-span-7">
          <Surface title={a.todayLabel} meta="09:00 — 18:00">
            <ol className="divide-y divide-border">
              {a.today.map((t) => (
                <li key={t.t} className="grid grid-cols-[52px_1fr] gap-4 py-3 sm:grid-cols-[52px_110px_1fr]">
                  <span className="font-mono text-[12px] text-accent">{t.t}</span>
                  <span className="hidden sm:block"><Pill tone="soft">{t.kind}</Pill></span>
                  <span>
                    <span className="block text-[14px] font-medium text-foreground">{t.text}</span>
                    <span className="mt-0.5 block text-[12px] text-muted-foreground">{t.ctx}</span>
                  </span>
                </li>
              ))}
            </ol>
          </Surface>
        </Reveal>
        <div className="grid gap-6 lg:col-span-5">
          <Reveal delay={0.08}>
            <div className="rounded-[10px] border border-accent/30 bg-[#F7F9FD] p-5 md:p-6">
              <p className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{a.sync.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{a.sync.text}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={cn(MONO, "text-muted-foreground")}>{a.typesLabel}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">{a.types.map((t) => <Pill key={t}>{t}</Pill>)}</div>
            <ul className="mt-5 divide-y divide-border border-t border-border">{a.alerts.map((x) => <li key={x} className="flex items-center gap-3 py-2 text-[13px] text-foreground/85"><span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-[2px] border border-accent bg-white" />{x}</li>)}</ul>
          </Reveal>
        </div>
      </div>
      <Closing>{a.closing}</Closing>
    </Chapter>
  );
}
