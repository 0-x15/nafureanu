import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { Draw, MONO } from "./studioBits";

/**
 * The close: a graphite field. The axis that opened the profile returns
 * horizontally and ends at production. Then the door.
 */
export default function StudioCta({ lang, a }) {
  const t = a.cta;
  const st = a.hero.axis.stations;
  return (
    <section aria-labelledby="studio-cta-title" className="bg-[#151821] px-5 py-20 text-white md:px-10 md:py-28">
      <div className="mx-auto max-w-[1440px]">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p className={cn(MONO, "text-[#8FB3FF]")}>{t.kicker}</p>
            <h2 id="studio-cta-title" className="mt-5 max-w-[22ch] font-heading text-[clamp(1.8rem,3.2vw,3rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white [text-wrap:balance]">{t.title}</h2>
            <p className="mt-5 max-w-[48ch] text-[16px] leading-[1.6] text-white/70">{t.support}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 lg:col-span-5 lg:justify-end">
            <ActionLink to={langPath(lang, "/contact")} size="lg">{t.primary}</ActionLink>
            <Link to={langPath(lang, "/services")} className="group inline-flex items-center gap-2 text-sm font-medium text-white/80 outline-none transition-colors hover:text-white focus-visible:text-[#8FB3FF]">{t.secondary}<ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-[2px]" /></Link>
          </div>
        </div>
        {/* the axis, closed */}
        <div className="relative mt-16 md:mt-20">
          <Draw className="bg-white/20" />
          <ol className="mt-4 grid grid-cols-2 gap-y-4 sm:grid-cols-4">
            {st.map((s, i) => (
              <li key={s.id} className="flex items-baseline gap-3">
                <span aria-hidden="true" className={cn("h-[9px] w-[9px] shrink-0 border", i === st.length - 1 ? "border-[#8FB3FF] bg-[#8FB3FF]" : i > 0 ? "border-[#8FB3FF]" : "border-white/40")} />
                <span className={cn(MONO, i === st.length - 1 ? "text-[#8FB3FF]" : "text-white/55")}>0{i + 1} · {s.label}</span>
              </li>
            ))}
          </ol>
          <p className={cn(MONO, "mt-6 text-white/35")}>{a.hero.signature}</p>
        </div>
      </div>
    </section>
  );
}
