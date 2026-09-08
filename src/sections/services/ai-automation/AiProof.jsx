import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Tone } from "./aiBits";

/** Real proof — understand → decide → execute, with three real systems mapped onto the continuum. */
export default function AiProof({ c, paths }) {
  const p = c.proof;
  return (
    <Chapter id="ai-proof" tone="blue">
      <ChapterHead id="ai-proof" kicker={p.kicker} title={p.title} intro={p.intro} />
      <Reveal delay={0.05} className="mt-12 md:mt-16">
        <ol className="grid gap-2 sm:grid-cols-3 sm:gap-3">
          {p.continuum.map((k, i) => <li key={k.id} className="relative rounded-[8px] border border-accent/40 bg-white px-4 py-3"><span className={cn(MONO, "text-accent")}>{String(i + 1).padStart(2, "0")} · {k.label}</span><span className="mt-1 block text-[13px] text-muted-foreground">{k.text}</span>{i < 2 && <span aria-hidden="true" className="absolute -right-[8px] top-1/2 hidden h-px w-3 bg-accent sm:block" />}</li>)}
        </ol>
      </Reveal>
      <ol className="mt-6 grid gap-4 lg:grid-cols-3">
        {p.systems.map((s, i) => (
          <Reveal key={s.id} delay={0.06 * i} className="h-full">
            <li className="flex h-full flex-col rounded-[12px] border border-border bg-white p-5 md:p-6">
              <p className={cn(MONO, "text-muted-foreground")}>{s.domain}</p>
              <h3 className="mt-1 font-heading text-2xl font-bold tracking-[-0.02em] text-foreground">{s.name}</h3>
              <ul className="mt-3 flex flex-wrap gap-1.5">{p.continuum.map((k) => <li key={k.id}><Tone tone={s.kinds.includes(k.id) ? "info" : "muted"}>{k.label}</Tone></li>)}</ul>
              <ul className="mt-4 flex-1 divide-y divide-border border-t border-border">{s.items.map((it) => <li key={it} className="flex gap-3 py-2.5 text-[13px] leading-snug text-foreground/85"><span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{it}</li>)}</ul>
              <ul className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4">{s.figures.map(([v, l]) => <li key={l}><span className="block font-heading text-xl font-bold tracking-tight text-foreground">{v}</span><span className="block text-[10px] uppercase leading-snug tracking-[0.12em] text-muted-foreground">{l}</span></li>)}</ul>
              <Link to={paths[s.id]} className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-accent outline-none transition-colors hover:text-accent-deep focus-visible:underline">{s.cta}<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]" /></Link>
            </li>
          </Reveal>
        ))}
      </ol>
      <Reveal delay={0.1}><p className="mt-5 max-w-3xl text-[13px] text-muted-foreground"><Tone tone="ok" className="mr-2 align-middle">{p.kicker}</Tone>{p.note}</p></Reveal>
      <Closing>{p.closing}</Closing>
    </Chapter>
  );
}
