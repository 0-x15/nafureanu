import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill, Points, Surface } from "./serviceBits";

/** Clients and demand — one person, one record; one search, structured. */
export default function CrmServiceClients({ c }) {
  const k = c.clients;
  return (
    <Chapter id="crm-service-clients" tone="white">
      <ChapterHead id="crm-service-clients" kicker={k.kicker} title={k.title} intro={k.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-2">
        <Reveal variant="left">
          <Surface title={k.contact.label} meta={k.contact.source}>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF3FC] font-heading text-base font-bold text-accent-deep">{k.contact.name.slice(0, 1)}</span>
                <div>
                  <p className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{k.contact.name}</p>
                  <div className="mt-1 flex gap-1.5">{k.contact.types.map((t) => <Pill key={t} tone="soft">{t}</Pill>)}</div>
                </div>
              </div>
              <Pill tone="warn">{k.contact.scoring}</Pill>
            </div>
            <ul className="mt-5 divide-y divide-border">{k.contact.history.map((h) => <li key={h} className="flex items-center gap-3 py-2 text-[13px] text-foreground/85"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />{h}</li>)}</ul>
            <p className={cn(MONO, "mt-5 text-muted-foreground")}>{k.typesLabel}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">{k.types.map((t) => <Pill key={t}>{t}</Pill>)}</div>
          </Surface>
        </Reveal>
        <Reveal variant="scale" delay={0.1}>
          <Surface title={k.demand.label} meta="L-01204" className="border-accent/30">
            <dl className="divide-y divide-border">
              {k.demand.fields.map(([f, v]) => (
                <div key={f} className="flex items-center justify-between gap-4 py-2">
                  <dt className="text-[12px] text-muted-foreground">{f}</dt>
                  <dd className="text-[13px] font-medium text-foreground">{v}</dd>
                </div>
              ))}
            </dl>
          </Surface>
        </Reveal>
      </div>
      <Reveal delay={0.08}><Points items={k.points} cols={4} className="mt-12" /></Reveal>
      <Closing>{k.closing}</Closing>
    </Chapter>
  );
}
