import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Pill, Points, Rail, Surface } from "./serviceBits";

/** Visits — the whole cycle of a visit and the signed report. */
export default function CrmServiceVisits({ c }) {
  const v = c.visits;
  const reduced = useReducedMotion();
  return (
    <Chapter id="crm-service-visits">
      <ChapterHead id="crm-service-visits" kicker={v.kicker} title={v.title} intro={v.intro} />
      <Reveal delay={0.05} className="mt-8 flex flex-wrap gap-1.5">{v.states.map((s, i) => <Pill key={s} tone={i === 0 ? "accent" : i < 3 ? "done" : "soft"}>{s}</Pill>)}</Reveal>
      <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.06} className="lg:col-span-6">
          <p className={cn(MONO, "text-muted-foreground")}>{v.timelineLabel}</p>
          <ol className="relative mt-4 border-l border-border pl-6">
            <motion.span aria-hidden="true" className="absolute -left-px top-0 w-px origin-top bg-accent" style={{ height: "100%" }} initial={reduced ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }} />
            {v.timeline.map((t, i) => (
              <li key={t.label} className="relative pb-6 last:pb-0">
                <span aria-hidden="true" className={cn("absolute -left-[31px] top-[5px] h-[11px] w-[11px] rounded-full border bg-white", i <= 2 ? "border-accent" : "border-border")} />
                <p className="font-heading text-base font-bold tracking-[-0.01em] text-foreground">{t.label}</p>
                <p className="mt-1 text-[14px] leading-relaxed text-muted-foreground">{t.text}</p>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal variant="scale" delay={0.1} className="lg:col-span-6">
          <Surface title={v.signature.title} meta="VIS-02311">
            <p className="text-[14px] leading-relaxed text-foreground/85">{v.signature.text}</p>
            <div className="mt-5 rounded-[8px] border border-dashed border-border bg-[#FAFBFD] p-4">
              <Rail steps={v.signature.steps} active={2} size="sm" />
            </div>
          </Surface>
        </Reveal>
      </div>
      <Reveal delay={0.08}><Points items={v.points} cols={4} className="mt-12" /></Reveal>
      <Closing>{v.closing}</Closing>
    </Chapter>
  );
}
