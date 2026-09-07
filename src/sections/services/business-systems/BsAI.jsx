import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, EASE, MONO, Surface } from "./bsBits";

/** AI where it earns its place — five input → output possibilities and one demonstration: free text becoming fields. */
export default function BsAI({ c }) {
  const a = c.ai;
  const reduced = useReducedMotion();
  return (
    <Chapter id="bs-ai" tone="white">
      <ChapterHead id="bs-ai" kicker={a.kicker} title={a.title} intro={a.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.05} className="lg:col-span-6">
          <ol className="divide-y divide-border border-t border-border">
            {a.cases.map((k) => (
              <li key={k.from} className="grid gap-2 py-4 sm:grid-cols-[1fr_auto_1fr] sm:items-start sm:gap-4">
                <span className="rounded-[6px] border border-dashed border-foreground/30 px-3 py-2 text-[13px] text-foreground/80">{k.from}</span>
                <span aria-hidden="true" className="hidden h-px w-6 self-center bg-accent sm:block" />
                <span>
                  <span className="block rounded-[6px] border border-accent/40 bg-[#EEF3FC] px-3 py-2 text-[13px] font-medium text-accent-deep">{k.to}</span>
                  <span className="mt-1.5 block text-[12px] leading-relaxed text-muted-foreground">{k.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal variant="scale" delay={0.1} className="lg:col-span-6">
          <Surface title={a.cases[0].from} meta={a.cases[0].to}>
            <p className="rounded-[8px] border border-dashed border-foreground/25 bg-[#FAFBFD] px-4 py-3 text-[13px] leading-relaxed text-foreground/85">{a.demo.raw}</p>
            <span aria-hidden="true" className="mx-auto my-3 block h-5 w-px bg-accent" />
            <dl className="divide-y divide-border rounded-[8px] border border-border">
              {a.demo.fields.map(([k, v], i) => (
                <motion.div key={k} initial={reduced ? false : { opacity: 0, x: -6 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 0.4, delay: 0.3 + i * 0.18, ease: EASE }} className="flex items-center justify-between gap-4 px-3 py-2">
                  <dt className={cn(MONO, "text-muted-foreground")}>{k}</dt>
                  <dd className="text-right text-[13px] font-medium text-foreground">{v}</dd>
                </motion.div>
              ))}
            </dl>
          </Surface>
        </Reveal>
      </div>
      <Closing>{a.principle}</Closing>
      <Reveal delay={0.1}><p className="mt-3 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">{a.note}</p></Reveal>
    </Chapter>
  );
}
