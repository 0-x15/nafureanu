import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead } from "./serviceBits";

/** Who this is for — the signals that make a custom CRM worth discussing. */
export default function CrmServiceFit({ c }) {
  const f = c.fit;
  return (
    <Chapter aria-labelledby="crm-service-fit">
      <ChapterHead id="crm-service-fit" kicker={f.kicker} title={f.title} />
      <Reveal delay={0.06}>
        <ul className="mt-10 grid gap-x-14 border-t border-border md:mt-14 md:grid-cols-2">
          {f.signals.map((sig) => (
            <li key={sig} className="flex items-start gap-4 border-b border-border py-5">
              <span aria-hidden="true" className="mt-[9px] h-2 w-2 shrink-0 rounded-[2px] border border-accent bg-white" />
              <p className="text-base leading-relaxed text-foreground/85 md:text-[17px]">{sig}</p>
            </li>
          ))}
        </ul>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-3xl font-heading text-lg font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-xl">{f.closing}</p>
      </Reveal>
    </Chapter>
  );
}
