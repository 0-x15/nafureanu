import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { EASE, KICKER, Mark, MONO } from "./webBits";

/* Alternative treatments of the same headline: the noise that design removes. */
const GHOSTS = [
  { cls: "font-medium tracking-[0.02em]", x: "-3%", y: -18, r: -1.6, o: 0.16 },
  { cls: "font-black tracking-[-0.06em] uppercase", x: "2.5%", y: 22, r: 1.1, o: 0.1 },
  { cls: "font-bold tracking-[0.12em]", x: "4%", y: -8, r: 0.6, o: 0.12 },
  { cls: "font-medium tracking-[-0.02em] italic", x: "-2%", y: 14, r: -0.5, o: 0.14 },
];

/**
 * Typographic hero. The headline first appears as several competing
 * treatments; within two seconds they converge into one deliberate
 * composition, and the margins annotate why. Design is choosing, not
 * adding. Reduced motion: only the final composition.
 */
export default function WebHero({ lang, c, proofPath }) {
  const h = c.hero;
  const reduced = useReducedMotion();
  const [settled, setSettled] = useState(Boolean(reduced));
  useEffect(() => {
    if (reduced) return undefined;
    const id = setTimeout(() => setSettled(true), 2100);
    return () => clearTimeout(id);
  }, [reduced]);
  return (
    <header id="wd-hero" className="overflow-x-clip px-5 pb-20 pt-10 md:px-10 md:pb-32 md:pt-14">
      <div className="mx-auto max-w-[1440px]">
        <Reveal><p className={KICKER}>{h.kicker}</p></Reveal>
        <div className="relative mt-8 md:mt-10">
          {!reduced && GHOSTS.map((g, i) => (
            <motion.span key={i} aria-hidden="true" initial={{ opacity: g.o, x: g.x, y: g.y, rotate: g.r }} animate={{ opacity: 0, x: 0, y: 0, rotate: 0 }} transition={{ duration: 1.9, delay: 0.25 + 0.12 * i, ease: EASE }} className={cn("pointer-events-none absolute inset-0 select-none font-heading text-[clamp(2.75rem,7.4vw,7.6rem)] leading-[0.94] text-foreground [text-wrap:balance]", g.cls)}>{h.title}</motion.span>
          ))}
          <motion.h1 initial={reduced ? false : { opacity: 0.35 }} animate={{ opacity: 1 }} transition={{ duration: 1.6, delay: 0.3, ease: EASE }} className="relative max-w-[16ch] font-heading text-[clamp(2.75rem,7.4vw,7.6rem)] font-bold leading-[0.94] tracking-[-0.045em] text-foreground [text-wrap:balance]">{h.title}</motion.h1>
        </div>
        <div className="mt-12 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-8">
          <motion.ol initial={false} animate={{ opacity: settled ? 1 : 0 }} transition={{ duration: 0.6, ease: EASE }} className="space-y-5 md:col-span-4 md:pt-2" aria-label={h.marksLabel}>
            {h.marks.map((m, i) => <li key={m.label}><Mark n={`0${i + 1}`} label={m.label}>{m.text}</Mark></li>)}
          </motion.ol>
          <div className="md:col-span-7 md:col-start-6">
            <Reveal delay={0.15}>
              <p className="max-w-2xl text-lg leading-[1.6] text-foreground/90 md:text-[1.35rem]">{h.lead}</p>
              <p className="mt-5 max-w-xl text-[15px] leading-[1.7] text-muted-foreground">{h.support}</p>
            </Reveal>
            <Reveal delay={0.25} className="mt-9 flex flex-wrap items-center gap-3">
              <ActionLink to={langPath(lang, "/contact")} size="lg">{h.primary}</ActionLink>
              <ActionLink to={proofPath} variant="secondary" icon="right" size="lg">{h.proof}</ActionLink>
            </Reveal>
            <p className={cn(MONO, "mt-8 text-muted-foreground")}>{h.note}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
