import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO } from "./serviceBits";

/** AI — three concrete functions, each as input → output, and the principle. */
export default function CrmServiceAI({ c }) {
  const a = c.ai;
  return (
    <Chapter id="crm-service-ai">
      <ChapterHead id="crm-service-ai" kicker={a.kicker} title={a.title} intro={a.intro} />
      <ul className="mt-12 grid gap-4 md:mt-16 lg:grid-cols-3">
        {a.cases.map((k, i) => (
          <Reveal key={k.title} delay={0.05 * i}>
            <li className="flex h-full flex-col rounded-[10px] border border-border bg-white p-5 md:p-6">
              <p className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{k.title}</p>
              <div className="mt-4 rounded-[6px] border border-dashed border-foreground/30 bg-[#FAFBFD] px-3 py-2 text-[13px] text-foreground/80">
                <span className={cn(MONO, "mr-2 text-muted-foreground")}>IN</span>{k.input}
              </div>
              <span aria-hidden="true" className="mx-auto my-2 block h-4 w-px bg-accent" />
              <ul className="space-y-1.5">{k.output.map((o) => <li key={o} className="flex items-start gap-2 text-[13px] text-foreground"><span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{o}</li>)}</ul>
              <p className="mt-4 border-t border-border pt-3 text-[13px] leading-relaxed text-muted-foreground">{k.text}</p>
            </li>
          </Reveal>
        ))}
      </ul>
      <Closing>{a.principle}</Closing>
      <Reveal delay={0.1}><p className="mt-3 max-w-3xl text-[14px] text-muted-foreground">{a.note}</p></Reveal>
    </Chapter>
  );
}
