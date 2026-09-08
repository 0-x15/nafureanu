import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { EASE, MONO } from "./webBits";

/** The design grid beneath the blank canvas: columns, baseline, a few markers. Shown briefly. */
function DesignGrid({ show, h }) {
  return (
    <motion.div aria-hidden="true" initial={false} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.7, ease: EASE }} className="pointer-events-none absolute inset-0 z-0">
      <div className="wd-baseline absolute inset-0 opacity-60" />
      <div className="absolute inset-x-5 inset-y-0 md:inset-x-10">
        <div className="mx-auto grid h-full max-w-[1440px] grid-cols-12 gap-8">
          {Array.from({ length: 12 }).map((_, i) => <i key={i} className="block h-full border-x border-accent/25" />)}
        </div>
      </div>
      <span className={cn(MONO, "absolute bottom-6 right-5 bg-background px-1 text-accent md:right-10")}>{h.marks.cols}</span>
      <span className={cn(MONO, "absolute bottom-6 left-5 bg-background px-1 text-accent md:left-10")}>{h.marks.baseline}</span>
    </motion.div>
  );
}

/**
 * Act 01 — the blank canvas. Three words, an empty field, and a
 * statement that establishes itself word by word. On the first seconds,
 * and whenever the pointer moves across it, the page reveals the grid it
 * was designed on, then hides it again: what looks simple is deliberate.
 */
export default function WebCanvasHero({ lang, c }) {
  const h = c.hero;
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);
  const timer = useRef(0);
  const flash = (ms) => { setShow(true); window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setShow(false), ms); };
  useEffect(() => {
    if (reduced) return undefined;
    const id = window.setTimeout(() => flash(2400), 1500);
    return () => { window.clearTimeout(id); window.clearTimeout(timer.current); };
  }, [reduced]);
  const words = h.title.split(" ");
  return (
    <header id="wd-hero" data-wire-label={c.wire.message} onPointerMove={(e) => { if (e.pointerType === "mouse") flash(900); }} onPointerDown={(e) => { if (e.pointerType !== "mouse") flash(1600); }} className="wd-act relative overflow-x-clip bg-background px-5 pb-20 pt-10 md:px-10 md:pb-28 md:pt-16">
      <DesignGrid show={show} h={h} />
      <div className="relative mx-auto flex min-h-[calc(100svh-13rem)] max-w-[1440px] flex-col">
        <div className="flex items-baseline justify-between gap-6">
          <p className={cn(MONO, "text-foreground/80")}>{h.words.join(" / ")}</p>
          <p className={cn(MONO, "text-muted-foreground")}>{c.index.hero}</p>
        </div>
        <div className="mt-auto pt-28 md:pt-36">
          <div className="relative inline-block">
            <motion.span aria-hidden="true" initial={false} animate={{ opacity: show ? 1 : 0 }} transition={{ duration: 0.5 }} className="pointer-events-none absolute -inset-x-4 -inset-y-3">
              <i className="absolute left-0 top-0 h-3.5 w-3.5 border-l border-t border-accent" /><i className="absolute right-0 top-0 h-3.5 w-3.5 border-r border-t border-accent" /><i className="absolute bottom-0 left-0 h-3.5 w-3.5 border-b border-l border-accent" /><i className="absolute bottom-0 right-0 h-3.5 w-3.5 border-b border-r border-accent" />
              <span className={cn(MONO, "absolute -top-6 right-0 text-accent")}>{h.marks.type}</span>
            </motion.span>
            <h1 className="max-w-[12ch] font-heading text-[clamp(2.7rem,7.6vw,8rem)] font-bold leading-[0.92] tracking-[-0.045em] text-foreground">
              {words.map((w, i) => (
                <motion.span key={`${w}-${i}`} initial={reduced ? false : { opacity: 0, y: "0.55em" }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 + i * 0.07, ease: EASE }} className="inline-block">{w}{i < words.length - 1 ? " " : ""}</motion.span>
              ))}
            </h1>
          </div>
          <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:items-end md:gap-8">
            <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }} className="md:col-span-3">
              <ActionLink to="#wd-structure" variant="text" icon="right" size="md">{h.secondary}</ActionLink>
            </motion.div>
            <motion.p initial={reduced ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.75, ease: EASE }} className="text-lg leading-[1.55] text-foreground/85 md:col-span-6 md:text-[1.3rem]">{h.lead}</motion.p>
            <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 1 }} className="md:col-span-3 md:text-right">
              <ActionLink to={langPath(lang, "/contact")} size="lg">{h.primary}</ActionLink>
            </motion.div>
          </div>
        </div>
      </div>
    </header>
  );
}
