import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill, Rail, Surface } from "./serviceBits";

/** Leads and first contact — the demand pipeline and the first-contact clock. */
export default function CrmServiceLeads({ c }) {
  const l = c.leads;
  const reduced = useReducedMotion();
  return (
    <Chapter id="crm-service-leads" tone="blue">
      <ChapterHead id="crm-service-leads" kicker={l.kicker} title={l.title} intro={l.intro} />
      <Reveal delay={0.06} className="mt-12 md:mt-16">
        <p className={cn(MONO, "mb-4 text-muted-foreground")}>{l.pipelineLabel}</p>
        <Rail steps={l.pipeline} active={l.pipelineActive} />
      </Reveal>
      <Reveal variant="scale" delay={0.08} className="mt-10">
        <Surface title={l.sla.title} meta="L-01204">
          <ol className="relative grid gap-6 sm:grid-cols-4 sm:gap-4">
            <motion.span aria-hidden="true" className="absolute left-0 top-[7px] hidden h-px w-full origin-left bg-accent sm:block" initial={reduced ? false : { scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }} />
            {l.sla.steps.map((st, i) => (
              <li key={st.label} className="relative sm:pt-6">
                <span aria-hidden="true" className={cn("absolute left-0 top-0 hidden h-[15px] w-[15px] rounded-full border bg-white sm:block", i === 3 ? "border-accent bg-accent" : "border-accent")} />
                <span className="font-mono text-2xl font-medium tracking-tight text-accent">{st.t}</span>
                <p className="mt-1 font-heading text-base font-bold tracking-[-0.01em] text-foreground">{st.label}</p>
                <p className="mt-1 text-[13px] leading-snug text-muted-foreground">{st.text}</p>
              </li>
            ))}
          </ol>
        </Surface>
      </Reveal>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        <Reveal delay={0.08}>
          <p className={cn(MONO, "text-muted-foreground")}>{l.alertsLabel}</p>
          <ul className="mt-3 divide-y divide-border border-t border-border">{l.alerts.map((a) => <li key={a} className="flex items-center gap-3 py-2.5 text-[14px] text-foreground/85"><span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-[2px] border border-accent bg-white" />{a}</li>)}</ul>
        </Reveal>
        <Reveal delay={0.1}>
          <p className={cn(MONO, "text-muted-foreground")}>{l.sourcesLabel}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">{l.sources.map((s) => <Pill key={s}>{s}</Pill>)}</div>
        </Reveal>
      </div>
      <Closing>{l.closing}</Closing>
    </Chapter>
  );
}
