import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, MONO } from "./serviceBits";

function Group({ g, align = "left" }) {
  return (
    <div className={cn(align === "right" && "lg:text-right")}>
      <p className={cn(MONO, "text-muted-foreground")}>{g.title}</p>
      <ul className="mt-3 divide-y divide-border border-y border-border">
        {g.items.map((it) => (
          <li key={it.name} className={cn("flex items-start gap-4 py-4", align === "right" && "lg:flex-row-reverse")}>
            <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <div className="min-w-0">
              <p className="font-heading text-base font-bold tracking-[-0.01em] text-foreground">{it.name}</p>
              <p className="mt-1 text-sm text-muted-foreground">{it.role}</p>
              <p className={cn(MONO, "mt-1.5 text-accent")}>{it.direction}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Integrations — the CRM as part of the agency's ecosystem: portals on
 * one side, communication and operation on the other, the CRM in the
 * middle. Positioned as possible, project-dependent integrations.
 */
export default function CrmServiceIntegrations({ c }) {
  const t = c.integrations;
  const [portals, communication, operation] = t.groups;
  return (
    <Chapter aria-labelledby="crm-service-integrations">
      <ChapterHead id="crm-service-integrations" kicker={t.kicker} title={t.title} intro={t.intro} />
      <Reveal delay={0.06} className="mt-12 md:mt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12">
          <Group g={portals} />
          <div className="relative flex items-center justify-center lg:px-6">
            <span aria-hidden="true" className="absolute inset-y-1/2 left-0 hidden h-px w-full bg-[repeating-linear-gradient(90deg,rgba(49,87,246,0.45)_0_4px,transparent_4px_10px)] lg:block" />
            <div className="relative w-full max-w-[280px] rounded-xl border border-accent/40 bg-white p-5 shadow-[0_24px_50px_-30px_rgba(49,87,246,0.45)] lg:w-[260px]">
              <p className="flex items-center gap-2 font-heading text-base font-bold tracking-[-0.01em] text-foreground">
                <span aria-hidden="true" className="h-1.5 w-1.5 bg-accent" />
                {t.core}
              </p>
              <p className={cn(MONO, "mt-2 flex items-center gap-2 text-accent")}>
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#17B4CD]" />
                {t.coreState}
              </p>
            </div>
          </div>
          <div className="space-y-8">
            <Group g={communication} align="right" />
            <Group g={operation} align="right" />
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-10 max-w-3xl text-sm leading-relaxed text-muted-foreground">{t.note}</p>
      </Reveal>
    </Chapter>
  );
}
