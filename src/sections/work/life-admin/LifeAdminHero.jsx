import { LifeBuoy } from "lucide-react";
import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { STRINGS, langPath } from "@/i18n";
import { DISPLAY, Kicker, Mono, Shot, Window } from "./laBits";

/**
 * Life Admin hero — what it is, what it replaces, why it exists, and
 * the product itself: the dashboard as the central operating view,
 * the subscriptions inbox behind it, and the product's signature
 * "one minimal question" block in front.
 */
export default function LifeAdminHero({ lang, c }) {
  const h = c.hero;
  const alt = h.composition;
  return (
    <header className="mx-auto max-w-[1440px] overflow-x-clip px-5 pb-10 pt-8 md:px-10 md:pb-16 md:pt-12">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="min-w-0 md:col-span-7">
          <Reveal>
            <Kicker>{h.kicker}</Kicker>
            <div className="mt-5 flex items-center gap-4">
              <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#201F1D] text-[#F9F8F4] shadow-[0_10px_24px_-12px_rgba(32,31,29,0.6)] md:h-12 md:w-12">
                <LifeBuoy className="h-5 w-5" />
              </span>
              <h1 className={`${DISPLAY} text-5xl font-medium tracking-[-0.02em] text-[#201F1D] md:text-6xl`}>{h.title}</h1>
            </div>
            <p className={`${DISPLAY} mt-7 max-w-3xl text-2xl font-medium leading-[1.16] tracking-[-0.01em] text-[#201F1D] md:text-4xl`}>{h.statement}</p>
            <p className="mt-6 max-w-2xl text-base leading-[1.7] text-[#706B66] md:text-lg">{h.support}</p>
          </Reveal>
        </div>
        <div className="min-w-0 md:col-span-5 md:self-end">
          <Reveal variant="left" delay={0.08}>
            <div className="rounded-xl border border-[#E8E4DE] bg-white px-4 py-3">
              <Mono>{h.status.label}</Mono>
              <p className="mt-1 flex items-start gap-2 text-sm font-medium text-[#201F1D]">
                <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#4F7267]" />
                {h.status.value}
              </p>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-5">
              {h.proof.map((p) => (
                <div key={p.label} className="border-l border-[#E8E4DE] pl-4">
                  <dd className={`${DISPLAY} text-2xl font-medium tracking-tight text-[#201F1D] md:text-3xl`}>{p.value}</dd>
                  <dt className="mt-1 text-[11px] uppercase tracking-[0.15em] text-[#928C86]">{p.label}</dt>
                </div>
              ))}
            </dl>
            <div className="mt-8">
              <ActionLink to={langPath(lang, "/contact")} size="md">{STRINGS[lang].nav.start}</ActionLink>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal variant="scale" delay={0.12} className="mt-16 md:mt-24">
        <div className="relative">
          <div aria-hidden="true" className="absolute inset-x-[1%] -top-6 bottom-4 rounded-[24px] border border-white bg-[linear-gradient(170deg,#F1EEE9_0%,#F9F8F4_60%,#F1EEE9_100%)] shadow-[0_50px_110px_-60px_rgba(32,31,29,0.35)] md:-top-10 md:bottom-8" />
          {/* Desktop composition */}
          <div className="relative hidden md:block md:aspect-[16/8.2]">
            <div className="absolute right-[2%] top-0 z-10 w-[58%]">
              <Shot id="subscriptions" lang={lang} alt={alt.subscriptions} priority className="rounded-2xl" />
            </div>
            <div className="absolute left-[2%] top-[19%] z-20 w-[62%]">
              <Shot id="dashboard" lang={lang} alt={alt.dashboard} priority className="rounded-2xl shadow-[0_44px_100px_-40px_rgba(32,31,29,0.5)]" />
            </div>
            <div className="absolute right-[5%] top-[74%] z-30 w-[40%]">
              <Shot id="question" lang={lang} alt={alt.question} priority className="rounded-xl shadow-[0_30px_60px_-24px_rgba(32,31,29,0.45)]" />
            </div>
          </div>
          {/* Phone composition */}
          <div className="relative space-y-4 pt-2 md:hidden">
            <Window id="dashboard" lang={lang} alt={alt.dashboard} priority />
            <Shot id="question" lang={lang} alt={alt.question} />
            <Window id="subscriptions" lang={lang} alt={alt.subscriptions} />
          </div>
        </div>
        <p className="mt-10 text-[11px] text-[#928C86] md:mt-14">{alt.note}</p>
      </Reveal>
    </header>
  );
}
