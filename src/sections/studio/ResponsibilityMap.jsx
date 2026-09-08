import { cn } from "@/lib/utils";
import { Act, Fade, H2, MONO } from "./studioBits";

/** One column of the boundary diagram. */
function Column({ c, tone = "plain", className = "" }) {
  return (
    <div className={cn("flex flex-col px-5 py-5 md:px-6", tone === "shared" && "bg-[#FAF9F5]", className)}>
      <p className={cn(MONO, tone === "shared" ? "text-muted-foreground" : "text-accent")}>{c.label}</p>
      <p className="mt-2 text-[13px] text-muted-foreground">{c.intro}</p>
      <ul className="mt-4 space-y-2">
        {c.items.map((x) => <li key={x} className="flex items-start gap-3 text-[14px] leading-[1.5] text-foreground/85"><span aria-hidden="true" className={cn("mt-[9px] h-px w-3 shrink-0", tone === "shared" ? "bg-foreground/30" : "bg-accent")} />{x}</li>)}
      </ul>
    </div>
  );
}

/**
 * Act 04 — who answers for what. A responsibility boundary, not a
 * process timeline: what the client brings, what we take responsibility
 * for, what is decided together, and what engineering cannot guarantee.
 */
export default function ResponsibilityMap({ a }) {
  const t = a.map;
  return (
    <Act id="studio-map" index={a.index[3]} className="py-14 md:py-20">
      <div className="mt-8 grid gap-5 lg:grid-cols-12 lg:items-end lg:gap-8">
        <h2 id="studio-map-title" className={cn(H2, "lg:col-span-5")}>{t.a}</h2>
        <p className="max-w-[46ch] text-[15px] leading-[1.65] text-foreground/80 lg:col-span-5 lg:col-start-8">{t.intro}</p>
      </div>
      <Fade className="mt-8">
        <div className="grid border border-foreground/12 bg-white md:grid-cols-3 md:divide-x md:divide-dashed md:divide-foreground/25">
          <Column c={t.client} className="border-b border-dashed border-foreground/25 md:border-b-0" />
          <Column c={t.shared} tone="shared" className="border-b border-dashed border-foreground/25 md:border-b-0" />
          <Column c={t.us} />
        </div>
      </Fade>
      <div className="mt-6 grid gap-4 border-t border-foreground/12 pt-5 md:grid-cols-12 md:gap-8">
        <p className={cn(MONO, "text-muted-foreground md:col-span-3")}>{t.outside.label}</p>
        <p className="max-w-[70ch] text-[14px] leading-[1.65] text-foreground/80 md:col-span-6">{t.outside.text}</p>
        <ul className="flex flex-wrap gap-x-4 gap-y-1 md:col-span-3 md:justify-end">
          {t.outside.items.map((x) => <li key={x} className={cn(MONO, "text-foreground/55 line-through decoration-foreground/30")}>{x}</li>)}
        </ul>
      </div>
    </Act>
  );
}
