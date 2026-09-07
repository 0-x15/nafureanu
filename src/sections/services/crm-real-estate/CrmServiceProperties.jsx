import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill, Points, Rail, Surface } from "./serviceBits";

/**
 * Properties — the record as an operational object: one large
 * fictional record surface, the nine-state lifecycle, the publishing
 * gate and the exclusive traffic light.
 */
export default function CrmServiceProperties({ c }) {
  const p = c.properties;
  const r = p.record;
  return (
    <Chapter id="crm-service-properties" tone="white">
      <ChapterHead id="crm-service-properties" kicker={p.kicker} title={p.title} intro={p.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <Reveal variant="scale" className="min-w-0 lg:col-span-7">
          <Surface title={`${r.reference} · PR-01840`} meta="ID 01840" bodyClassName="p-0">
            <div className="flex flex-wrap items-start justify-between gap-4 px-5 pt-5">
              <div>
                <p className="font-heading text-xl font-bold tracking-[-0.02em] text-foreground md:text-2xl">{r.title}</p>
                <p className="mt-1 flex flex-wrap items-baseline gap-x-4 text-sm text-muted-foreground">
                  <span className="font-heading text-lg font-bold text-foreground">{r.price}</span>
                  <span>{r.rent}</span>
                </p>
              </div>
              <div className="flex gap-1.5"><Pill tone="done">{r.status}</Pill><Pill tone="neutral">{r.availability}</Pill></div>
            </div>
            <div role="presentation" className="mt-4 flex gap-1 overflow-x-auto border-b border-border px-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {r.tabs.map((t, i) => <span key={t} className={cn("relative shrink-0 px-2 pb-2.5 text-[12px] font-medium", i === 0 ? "text-accent after:absolute after:inset-x-0 after:-bottom-px after:h-[2px] after:bg-accent" : "text-muted-foreground")}>{t}</span>)}
            </div>
            <div className="grid gap-6 px-5 py-5 sm:grid-cols-2">
              <div>
                <p className={cn(MONO, "text-muted-foreground")}>{r.quality}</p>
                <div className="mt-2 flex items-center gap-3">
                  <span className="block h-2 flex-1 overflow-hidden rounded-full bg-[#EEF1F6]"><span className="block h-full rounded-full bg-accent" style={{ width: `${r.qualityValue}%` }} /></span>
                  <span className="font-mono text-[12px] text-foreground">{r.qualityValue}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-1.5">{r.alerts.map((a) => <Pill key={a} tone="soft">{a}</Pill>)}</div>
              </div>
              <div>
                <p className={cn(MONO, "text-muted-foreground")}>{r.tabs[2]}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">{r.portals.map((a) => <Pill key={a} tone="done">{a}</Pill>)}</div>
                <p className={cn(MONO, "mt-4 text-muted-foreground")}>{p.lifecycleLabel}</p>
                <p className="mt-1 text-[13px] text-foreground/85">{p.lifecycle[p.lifecycleActive]} · {p.lifecycleActive + 1}/{p.lifecycle.length}</p>
              </div>
            </div>
          </Surface>
        </Reveal>
        <div className="grid gap-6 lg:col-span-5">
          <Reveal delay={0.08}>
            <div className="rounded-[10px] border border-accent/30 bg-[#F7F9FD] p-5 md:p-6">
              <p className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{p.gate.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.gate.text}</p>
              <ul className="mt-4 divide-y divide-border">{p.gate.items.map((it) => <li key={it} className="flex items-center gap-3 py-2 text-[13px] text-foreground"><span aria-hidden="true" className="flex h-4 w-4 items-center justify-center rounded-[3px] border border-accent bg-accent text-[10px] text-white">✓</span>{it}</li>)}</ul>
            </div>
          </Reveal>
          <Reveal delay={0.12}>
            <div className="rounded-[10px] border border-border bg-white p-5 md:p-6">
              <div className="flex items-start justify-between gap-4">
                <p className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{p.exclusive.title}</p>
                <span aria-hidden="true" className="flex items-center gap-1"><i className="h-2.5 w-2.5 rounded-full bg-[#3BA55D]" /><i className="h-2.5 w-2.5 rounded-full bg-[#E3B341]" /><i className="h-2.5 w-2.5 rounded-full bg-[#D9534F] opacity-40" /></span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.exclusive.text}</p>
            </div>
          </Reveal>
        </div>
      </div>
      <Reveal delay={0.06} className="mt-12">
        <p className={cn(MONO, "mb-4 text-muted-foreground")}>{p.lifecycleLabel}</p>
        <Rail steps={p.lifecycle} active={p.lifecycleActive} />
      </Reveal>
      <Reveal delay={0.08}><Points items={p.points} cols={4} className="mt-12" /></Reveal>
      <Closing>{p.closing}</Closing>
    </Chapter>
  );
}
