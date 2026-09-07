import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Num, Surface } from "./serviceBits";

/** Communication — the conversation where the client is; the context in the CRM. */
export default function CrmServiceCommunication({ c }) {
  const k = c.communication;
  return (
    <Chapter id="crm-service-communication">
      <ChapterHead id="crm-service-communication" kicker={k.kicker} title={k.title} intro={k.intro} />
      <Reveal delay={0.06} className="mt-12 md:mt-16">
        <ol className="grid gap-6 border-t border-border pt-6 sm:grid-cols-2 lg:grid-cols-4">
          {k.flow.map((f, i) => (
            <li key={f.label} className="relative">
              <Num n={i + 1} />
              <p className="mt-2 font-heading text-base font-bold tracking-[-0.01em] text-foreground">{f.label}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{f.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
      <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:gap-10">
        <Reveal variant="scale" className="lg:col-span-5">
          <Surface title={k.chat.title}>
            <div className="space-y-2">
              {k.chat.lines.map((l) => (
                <p key={l.text} className={cn("max-w-[88%] rounded-[12px] px-3.5 py-2 text-[13px] leading-snug", l.who === "cliente" ? "bg-[#F1F4F9] text-foreground" : "ml-auto border border-accent/30 bg-white font-mono text-[11px] uppercase tracking-[0.08em] text-accent-deep")}>{l.text}</p>
              ))}
            </div>
          </Surface>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7">
          <ul className="divide-y divide-border border-t border-border">
            {k.channels.map((ch) => (
              <li key={ch.name} className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:gap-6">
                <p className={cn(MONO, "text-accent")}>{ch.name}</p>
                <p className="text-[14px] leading-relaxed text-foreground/85">{ch.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
      <Closing>{k.closing}</Closing>
    </Chapter>
  );
}
