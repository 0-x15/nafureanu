import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { Draw, MONO } from "./studioBits";

/**
 * The close, on the same paper as the opening. The axis that opened the
 * profile returns horizontally and ends at production. Then the door.
 */
export default function StudioCta({ lang, a }) {
  const t = a.cta;
  const st = a.hero.axis.stations;
  return (
    <section aria-labelledby="studio-cta-title" className="border-t border-foreground/12 bg-background px-5 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p className={cn(MONO, "text-accent")}>{t.kicker}</p>
            <h2 id="studio-cta-title" className="mt-5 max-w-[22ch] font-heading text-[clamp(1.8rem,3.2vw,3rem)] font-bold leading-[1.05] tracking-[-0.035em] text-foreground [text-wrap:balance]">{t.title}</h2>
            <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.6] text-foreground/80">{t.support}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 lg:col-span-5 lg:justify-end">
            <ActionLink to={langPath(lang, "/contact")} size="lg">{t.primary}</ActionLink>
            <Link to={langPath(lang, "/services")} className="group inline-flex items-center gap-2 text-sm font-medium text-foreground/80 outline-none transition-colors hover:text-foreground focus-visible:text-accent">{t.secondary}<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]" /></Link>
          </div>
        </div>
        {/* the axis, closed */}
        <div className="relative mt-16 md:mt-20">
          <Draw className="bg-foreground/15" />
          <ol className="mt-4 grid grid-cols-2 gap-y-4 sm:grid-cols-4">
            {st.map((s, i) => (
              <li key={s.id} className="flex items-baseline gap-3">
                <span aria-hidden="true" className={cn("h-[9px] w-[9px] shrink-0 border", i === st.length - 1 ? "border-accent bg-accent" : i > 0 ? "border-accent" : "border-foreground/40")} />
                <span className={cn(MONO, i === st.length - 1 ? "text-accent" : "text-muted-foreground")}>0{i + 1} · {s.label}</span>
              </li>
            ))}
          </ol>
          <p className={cn(MONO, "mt-6 text-muted-foreground")}>{a.hero.signature}</p>
        </div>
      </div>
    </section>
  );
}
