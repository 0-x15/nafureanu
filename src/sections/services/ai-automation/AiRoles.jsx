import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, EASE, MONO, WHO, Who } from "./aiBits";

/** Rules, AI and people — three lanes with distinct responsibilities, then one process that combines all of them. */
export default function AiRoles({ c }) {
  const r = c.roles;
  const reduced = useReducedMotion();
  return (
    <Chapter id="ai-roles" tone="blue">
      <ChapterHead id="ai-roles" kicker={r.kicker} title={r.titleB} titleMuted={r.titleA} intro={r.intro} />
      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3">
        {r.roles.map((role, i) => (
          <Reveal key={role.id} delay={0.05 * i}>
            <div className="h-full rounded-[10px] border border-border bg-white p-5" style={{ borderTopColor: WHO[role.id].line, borderTopWidth: 3 }}>
              <Who who={role.id} label={role.label} />
              <p className={cn(MONO, "mt-4 text-muted-foreground")}>{r.whenLabel}</p>
              <ul className="mt-2 divide-y divide-border">{role.when.map((w) => <li key={w} className="py-1.5 text-[13px] leading-snug text-foreground/85">{w}</li>)}</ul>
              <p className={cn(MONO, "mt-4 text-muted-foreground")}>{r.examplesLabel}</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">{role.examples.map((x) => <li key={x} className={cn("rounded-[4px] border px-2 py-0.5 text-[11px]", WHO[role.id].chip)}>{x}</li>)}</ul>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal delay={0.08} className="mt-8">
        <p className={cn(MONO, "text-muted-foreground")}>{r.flow.title}</p>
        <ol className="mt-3 grid gap-2 md:grid-cols-4 md:gap-3">
          {r.flow.steps.map((st, i) => (
            <motion.li key={st.text} initial={reduced ? false : { opacity: 0.35, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ duration: 0.4, delay: i * 0.3, ease: EASE }} className="relative rounded-[8px] border border-border bg-white px-4 py-3">
              <Who who={st.who} label={r.labels[st.who]} />
              <p className="mt-2 text-[13px] leading-snug text-foreground/85">{st.text}</p>
              {i < 3 && <span aria-hidden="true" className="absolute -right-[8px] top-1/2 hidden h-px w-3 bg-accent/60 md:block" />}
            </motion.li>
          ))}
        </ol>
      </Reveal>
      <Closing>{r.closing}</Closing>
    </Chapter>
  );
}
