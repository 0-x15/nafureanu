import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { Act, MONO, Reg } from "./webBits";

/** The door. The grid the page was designed on resolves here, once more, behind a controlled headline. */
export default function WebCta({ lang, c, paths }) {
  const t = c.cta;
  return (
    <Act id="wd-cta" className="overflow-x-clip py-20 md:py-28">
      <div className="relative border-t border-foreground/12 pt-10 md:pt-14">
        <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 hidden h-full grid-cols-12 gap-8 md:grid">{Array.from({ length: 12 }).map((_, i) => <i key={i} className={cn("block h-full border-l", i === 7 ? "border-accent/70" : "border-foreground/[0.06]")} />)}</span>
        <div className="relative grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <Reg label={t.kicker} />
            <h2 id="wd-cta-title" className="mt-6 max-w-[18ch] font-heading text-[clamp(1.9rem,3.6vw,3.6rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground [text-wrap:balance]">{t.title}</h2>
            <p className="mt-5 max-w-[42ch] text-[15px] leading-[1.6] text-foreground/80 md:text-[16px]">{t.support}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 md:col-span-5 md:justify-end">
            <ActionLink to={langPath(lang, "/contact")} size="lg">{t.primary}</ActionLink>
            <ActionLink to={paths.work} variant="text" icon="right">{t.secondary}</ActionLink>
          </div>
        </div>
        <p className={cn(MONO, "relative mt-10 text-muted-foreground")}>{t.closing}</p>
      </div>
    </Act>
  );
}
