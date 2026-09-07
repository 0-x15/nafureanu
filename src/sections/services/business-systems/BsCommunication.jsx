import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Num, Surface } from "./bsBits";

/** Communication in context — message → contact → operation → next action, and a thread that resolves into system facts. */
export default function BsCommunication({ c }) {
  const k = c.communication;
  return (
    <Chapter id="bs-communication" tone="white">
      <ChapterHead id="bs-communication" kicker={k.kicker} title={k.title} intro={k.intro} />
      <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-12 lg:gap-10">
        <Reveal delay={0.05} className="lg:col-span-5">
          <ol className="relative border-l border-border pl-6">
            {k.flow.map((f, i) => (
              <li key={f.label} className="relative pb-6 last:pb-0">
                <span aria-hidden="true" className={cn("absolute -left-[31px] top-[4px] h-[11px] w-[11px] rounded-full border bg-white", i === 3 ? "border-accent bg-accent" : "border-accent")} />
                <Num n={i + 1} />
                <p className="mt-1 font-heading text-base font-bold tracking-[-0.01em] text-foreground">{f.label}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{f.text}</p>
              </li>
            ))}
          </ol>
          <p className="mt-6 max-w-md text-[13px] leading-relaxed text-muted-foreground">{k.channelsNote}</p>
        </Reveal>
        <Reveal variant="scale" delay={0.1} className="lg:col-span-7">
          <Surface title={k.thread.title}>
            <ol className="space-y-2">
              {k.thread.lines.map((l) => (
                <li key={l.text} className={cn("max-w-[90%] rounded-[10px] px-3.5 py-2 text-[13px] leading-snug", l.who === "in" ? "bg-[#F1F4F9] text-foreground" : "ml-auto border border-accent/30 bg-white font-mono text-[11px] uppercase tracking-[0.06em] text-accent-deep")}>{l.text}</li>
              ))}
            </ol>
          </Surface>
          <ul className="mt-6 divide-y divide-border border-t border-border">
            {k.examples.map((e) => <li key={e.channel} className="grid gap-1 py-3 sm:grid-cols-[140px_1fr] sm:gap-6"><p className={cn(MONO, "text-accent")}>{e.channel}</p><p className="text-[14px] leading-relaxed text-foreground/85">{e.text}</p></li>)}
          </ul>
        </Reveal>
      </div>
      <Closing>{k.closing}</Closing>
    </Chapter>
  );
}
