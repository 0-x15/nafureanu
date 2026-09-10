import { cn } from "@/lib/utils";
import ActionLink from "@/components/ActionLink";
import Reveal from "@/components/Reveal";
import { langPath } from "@/i18n";
import { KICKER, MONO } from "./servicesIndexBits";
import ServiceSection from "./ServiceSection";

/**
 * Act 04 — the close. The system from the hero returns assembled: the
 * six layers closed into one solid block, seen a little smaller and
 * without callouts. Different capabilities, one built solution. One
 * action.
 */
export default function ServicesClosing({ lang, t }) {
  const c = t.closing;
  return (
    <section aria-labelledby="sv-closing" className="relative overflow-hidden px-5 py-20 md:px-10 md:py-28">
      {/* stronger contrast, still light: a cobalt field low on the page */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute inset-x-0 bottom-0 h-[70%] bg-[linear-gradient(180deg,transparent,rgba(49,87,246,0.08))]" />
        <span className="absolute -right-[10%] top-[10%] h-[80%] w-[50%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.14),transparent)]" />
      </div>
      <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        <Reveal className="lg:col-span-6">
          <p className={KICKER}>{c.kicker}</p>
          <h2 id="sv-closing" className="mt-5 max-w-[14ch] font-heading text-[clamp(2rem,3.6vw,3.3rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground [text-wrap:balance]">
            {c.title}
          </h2>
          <p className="mt-6 max-w-[48ch] text-[16px] leading-[1.65] text-foreground/80 md:text-[17px]">{c.text}</p>
          <div className="mt-9">
            <ActionLink to={langPath(lang, "/contact")} size="lg">{c.cta}</ActionLink>
          </div>
        </Reveal>
        <Reveal delay={0.1} aria-hidden="true" className="lg:col-span-6">
          <div className="relative mx-auto w-full max-w-[460px]">
            <ServiceSection labels={t.hero.layers} assembled compact />
            <p className={cn(MONO, "mt-2 text-center text-muted-foreground")}>{c.meta}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
