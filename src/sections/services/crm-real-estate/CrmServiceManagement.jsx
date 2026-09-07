import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Surface } from "./serviceBits";

const FUNNEL = [100, 82, 66, 52, 38, 24, 12];

/** Management and team — the indicator panel, what it includes, roles and visibility. */
export default function CrmServiceManagement({ c }) {
  const m = c.management;
  const reduced = useReducedMotion();
  return (
    <Chapter id="crm-service-management" tone="blue">
      <ChapterHead id="crm-service-management" kicker={m.kicker} title={m.title} intro={m.intro} />
      <div className="mt-12 grid gap-6 md:mt-16 lg:grid-cols-12 lg:gap-8">
        <Reveal variant="scale" className="lg:col-span-7">
          <Surface title={m.panel.title} meta="—">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {m.panel.kpis.map(([k, v]) => (
                <div key={k} className="rounded-[6px] border border-border bg-[#FAFBFD] px-3 py-3">
                  <span className="block font-heading text-xl font-bold tracking-[-0.02em] text-foreground">{v}</span>
                  <span className="mt-0.5 block text-[11px] leading-snug text-muted-foreground">{k}</span>
                </div>
              ))}
            </div>
            <ol className="mt-5 space-y-1.5">
              {m.panel.funnel.map((f, i) => (
                <li key={f} className="grid grid-cols-[96px_1fr] items-center gap-3">
                  <span className="truncate font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground">{f}</span>
                  <motion.span aria-hidden="true" className={cn("block h-3 origin-left rounded-[3px]", i === 6 ? "bg-accent" : "bg-accent/30")} style={{ width: `${FUNNEL[i]}%` }} initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }} />
                </li>
              ))}
            </ol>
          </Surface>
        </Reveal>
        <div className="grid gap-6 lg:col-span-5">
          <Reveal delay={0.08}>
            <p className={cn(MONO, "text-muted-foreground")}>{m.featuresLabel}</p>
            <ul className="mt-3 divide-y divide-border border-t border-border">{m.features.map((f) => <li key={f} className="flex items-center gap-3 py-2 text-[13px] text-foreground/85"><span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{f}</li>)}</ul>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="rounded-[10px] border border-border bg-white p-5 md:p-6">
              <p className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{m.roles.title}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">{m.roles.text}</p>
              <ul className="mt-4 space-y-1.5">{m.roles.rules.map((r) => <li key={r} className="flex items-start gap-2 text-[13px] text-foreground/85"><span aria-hidden="true" className="mt-[6px] h-2 w-2 shrink-0 rounded-[2px] border border-accent bg-white" />{r}</li>)}</ul>
            </div>
          </Reveal>
        </div>
      </div>
      <Closing>{m.closing}</Closing>
    </Chapter>
  );
}
