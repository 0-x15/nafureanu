import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, MONO, Pill } from "./serviceBits";

/** Technology — decided after the operation: Odoo as a base, custom when needed. */
export default function CrmServiceTechnology({ c }) {
  const t = c.technology;
  return (
    <Chapter id="crm-service-technology">
      <ChapterHead id="crm-service-technology" kicker={t.kicker} title={t.title} />
      <Reveal delay={0.05}><p className="mt-6 max-w-3xl text-base leading-[1.75] text-muted-foreground md:text-lg">{t.copy}</p></Reveal>
      <div className="mt-10 grid gap-6 lg:grid-cols-12 lg:gap-8">
        <Reveal delay={0.06} className="lg:col-span-7">
          <div className="h-full rounded-[10px] border border-border bg-white p-5 md:p-6">
            <p className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{t.odoo.title}</p>
            <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{t.odoo.text}</p>
            <ul className="mt-4 divide-y divide-border border-t border-border">{t.odoo.items.map((i) => <li key={i} className="flex items-start gap-3 py-2 text-[13px] text-foreground/85"><span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />{i}</li>)}</ul>
          </div>
        </Reveal>
        <div className="grid gap-6 lg:col-span-5">
          <Reveal delay={0.08}>
            <div className="rounded-[10px] border border-dashed border-foreground/30 p-5 md:p-6">
              <p className="font-heading text-lg font-bold tracking-[-0.01em] text-foreground">{t.custom.title}</p>
              <p className="mt-2 text-[14px] leading-relaxed text-muted-foreground">{t.custom.text}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <p className={cn(MONO, "text-muted-foreground")}>{t.toolsLabel}</p>
            <div className="mt-2 flex flex-wrap gap-1.5">{t.tools.map((x) => <Pill key={x}>{x}</Pill>)}</div>
          </Reveal>
        </div>
      </div>
      <Reveal delay={0.1}>
        <p className="mt-12 font-heading text-2xl font-bold leading-[1.1] tracking-[-0.025em] text-foreground md:text-4xl">
          <span className="block">{t.principle[0]}</span>
          <span className="block text-muted-foreground">{t.principle[1]}</span>
        </p>
      </Reveal>
    </Chapter>
  );
}
