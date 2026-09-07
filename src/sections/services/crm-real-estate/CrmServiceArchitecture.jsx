import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, MONO, Num } from "./serviceBits";

/**
 * Technology — decided after the operation is understood. Odoo as a
 * base when it fits, a custom architecture when it doesn't; the tools
 * we work with; and the principle that governs the choice.
 */
export default function CrmServiceArchitecture({ c }) {
  const a = c.architecture;
  return (
    <Chapter tone="blue" aria-labelledby="crm-service-architecture">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="md:col-span-7">
          <ChapterHead id="crm-service-architecture" kicker={a.kicker} title={a.title} />
          <Reveal delay={0.05}>
            <p className="mt-6 max-w-2xl text-base leading-[1.75] text-muted-foreground md:text-lg">{a.copy}</p>
          </Reveal>
          <Reveal delay={0.08}>
            <ol className="mt-10 border-t border-foreground/15">
              {a.options.map((o, i) => (
                <li key={o.title} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-foreground/10 py-6">
                  <Num n={i + 1} className="pt-1.5" />
                  <div>
                    <h3 className="font-heading text-lg font-bold tracking-[-0.015em] text-foreground md:text-xl">{o.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">{o.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
        <Reveal variant="left" delay={0.1} className="md:col-span-5 md:pt-2">
          <div className="rounded-[20px] border border-[#DCE2EE] bg-white/85 p-7 md:p-8">
            <p className={cn(MONO, "text-muted-foreground")}>{a.toolsLabel}</p>
            <ul className="mt-4 divide-y divide-[#EEF1F6]">
              {a.tools.map((tool) => (
                <li key={tool} className="flex items-center gap-3 py-2.5 text-[15px] text-foreground/85">
                  <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-[2px] bg-accent/70" />
                  {tool}
                </li>
              ))}
            </ul>
            <p className="mt-7 border-t border-[#E3E7F0] pt-5 font-heading text-lg font-bold leading-snug tracking-[-0.01em] text-foreground">
              {a.principle[0]} <span className="text-accent">{a.principle[1]}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </Chapter>
  );
}
