import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { H2, MONO, Rule } from "./studioBits";

/** The close: institutional, unhurried. One conversation to understand the problem and the fit. */
export default function StudioCta({ lang, a }) {
  const t = a.cta;
  return (
    <section aria-labelledby="studio-cta-title" className="px-5 pb-24 pt-10 md:px-10 md:pb-32 md:pt-14">
      <div className="mx-auto max-w-[1440px]">
        <Rule />
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end md:gap-8">
          <div className="md:col-span-7">
            <p className={cn(MONO, "text-accent")}>{t.kicker}</p>
            <h2 id="studio-cta-title" className={cn(H2, "mt-4 max-w-[26ch] text-[clamp(1.7rem,2.9vw,2.7rem)]")}>{t.title}</h2>
            <p className="mt-5 max-w-[56ch] text-[15px] leading-[1.65] text-foreground/80 md:text-[16px]">{t.copy}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4 md:col-span-5 md:justify-end">
            <ActionLink to={langPath(lang, "/contact")} size="lg">{t.primary}</ActionLink>
            <ActionLink to={langPath(lang, "/services")} variant="text" icon="right">{t.secondary}</ActionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
