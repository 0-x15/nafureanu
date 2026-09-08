import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, EASE, MONO, Pill, Tone, Who } from "./aiBits";

/** Unstructured message → structured work: intent, data, context, qualification, workflow, next action. */
export default function AiMessages({ c }) {
  const m = c.messages;
  const reduced = useReducedMotion();
  return (
    <Chapter id="ai-messages">
      <ChapterHead id="ai-messages" kicker={m.kicker} title={m.title} intro={m.intro} />
      <Reveal delay={0.05} className="mt-8 flex flex-wrap gap-1.5">{m.channels.map((ch) => <Pill key={ch} tone="soft">{ch}</Pill>)}</Reveal>
      <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:gap-10">
        <Reveal variant="left" className="lg:col-span-5">
          <div className="rounded-[12px] border border-border bg-white p-5">
            <p className={cn(MONO, "text-muted-foreground")}>{m.message.channel}</p>
            <p className="mt-3 rounded-[12px] bg-[#F1F4F9] px-4 py-3 text-[14px] leading-relaxed text-foreground">{m.message.text}</p>
          </div>
          <p className={cn(MONO, "mt-3 text-muted-foreground")}>{m.note}</p>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <ol className="divide-y divide-border rounded-[12px] border border-border bg-white">
            {m.steps.map((s, i) => (
              <motion.li key={s.label} initial={reduced ? false : { opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.35, delay: i * 0.18, ease: EASE }} className="grid gap-1 px-5 py-3 sm:grid-cols-[130px_1fr] sm:gap-4">
                <span className="flex items-center gap-2"><span className={cn(MONO, "text-muted-foreground")}>{s.label}</span></span>
                <span className="flex flex-wrap items-center gap-2"><Who who={s.who} label={c.roles.labels[s.who]} /><span className="text-[13px] leading-snug text-foreground/85">{s.value}</span></span>
              </motion.li>
            ))}
          </ol>
        </Reveal>
      </div>
      <Reveal delay={0.08} className="mt-8"><div className="rounded-[10px] border border-[#B9DDC6] bg-[#EAF6EE]/60 p-5"><Tone tone="ok">{m.proof.label}</Tone><p className="mt-2 max-w-4xl text-[14px] leading-relaxed text-foreground/85">{m.proof.text}</p></div></Reveal>
      <Closing>{m.closing}</Closing>
    </Chapter>
  );
}
