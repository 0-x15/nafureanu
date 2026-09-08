import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, EASE, MONO, Pill, Step, Surface, Tone, Who } from "./aiBits";

/** Document intelligence — a document becomes fields, fields get validated, uncertainty gets confirmed, and the system acts. */
export default function AiDocuments({ c }) {
  const d = c.documents;
  const reduced = useReducedMotion();
  return (
    <Chapter id="ai-documents" tone="blue">
      <ChapterHead id="ai-documents" kicker={d.kicker} title={d.title} intro={d.intro} />
      <div className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-[1fr_1fr_1.2fr] lg:gap-6">
        <Reveal variant="left">
          <Surface title={d.doc.title} meta="PDF">
            <ul className="space-y-2 font-mono text-[11px] leading-relaxed text-foreground/80">{d.doc.lines.map((l) => <li key={l} className="border-b border-dashed border-border pb-1.5 last:border-b-0">{l}</li>)}</ul>
          </Surface>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="h-full rounded-[10px] border border-border bg-white p-4">
            <div className="flex items-center justify-between"><Who who="ai" label={c.roles.labels.ai} /><span className={cn(MONO, "text-muted-foreground")}>{d.steps[0].label}</span></div>
            <dl className="mt-3 divide-y divide-border">
              {d.fields.map((f, i) => (
                <motion.div key={f.label} initial={reduced ? false : { opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.35, delay: 0.2 + i * 0.15, ease: EASE }} className="flex items-center justify-between gap-3 py-2">
                  <dt className="text-[12px] text-muted-foreground">{f.label}</dt>
                  <dd className="flex items-center gap-2 text-right text-[12px] font-medium text-foreground"><span>{f.value}</span><Tone tone={f.state === "certain" ? "ok" : "warn"}>{d.states[f.state]}</Tone></dd>
                </motion.div>
              ))}
            </dl>
          </div>
        </Reveal>
        <Reveal delay={0.12}>
          <ol className="space-y-2">
            {d.steps.map((s, i) => <li key={s.label} className="rounded-[8px] border border-border bg-white px-4 py-3"><Step who={s.who} label={c.roles.labels[s.who]} text={<><span className="font-semibold text-foreground">{s.label}. </span>{s.text}</>} n={i + 1} /></li>)}
          </ol>
        </Reveal>
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.06} className="lg:col-span-5">
          <ul className="flex flex-wrap gap-1.5">{d.categories.map((k) => <li key={k}><Pill tone="soft">{k}</Pill></li>)}</ul>
          <p className={cn(MONO, "mt-3 text-muted-foreground")}>{d.note}</p>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <div className="rounded-[10px] border border-[#B9DDC6] bg-[#EAF6EE]/60 p-5"><Tone tone="ok">{d.proof.label}</Tone><p className="mt-2 text-[14px] leading-relaxed text-foreground/85">{d.proof.text}</p></div>
        </Reveal>
      </div>
      <Closing>{d.closing}</Closing>
    </Chapter>
  );
}
