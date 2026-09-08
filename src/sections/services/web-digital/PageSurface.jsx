import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, SERIF } from "./webBits";
import "./webDigital.css";

/*
 * This page's own opening, as a surface the acts can re-art-direct:
 * four visual directions, three contexts, keyboard and reduced-motion
 * conditions, one purposeful interaction, and a construction layer.
 * The words never change. The perception does.
 */
const MODES = {
  editorial: {
    bg: "bg-[#F6F3EC] text-[#1C1B19]",
    brand: `${SERIF} text-[1.05em] font-semibold tracking-[-0.01em]`,
    nav: "font-mono text-[0.42em] uppercase tracking-[0.18em] opacity-70",
    words: "font-mono text-[0.42em] uppercase tracking-[0.22em] opacity-60",
    title: `${SERIF} font-medium leading-[0.98] tracking-[-0.02em]`,
    size: { desktop: "text-[3em]", tablet: "text-[2.4em]", mobile: "text-[2.1em]" },
    lead: "text-[0.66em] leading-[1.55] opacity-80",
    cta: "inline-flex items-center gap-2 border-b border-current pb-[0.1em] text-[0.62em] font-medium",
    secondary: "text-[0.56em] opacity-70",
    grid: "grid-cols-[1.35fr_0.65fr] items-end gap-[6%]",
    shape: "rule",
    rule: true,
    motion: false,
  },
  systematic: {
    bg: "bg-white text-[#0F172A]",
    brand: "font-heading text-[0.9em] font-bold tracking-[-0.02em]",
    nav: "font-mono text-[0.42em] uppercase tracking-[0.16em] opacity-70",
    words: "font-mono text-[0.42em] uppercase tracking-[0.2em] text-[#2563EB]",
    title: "font-heading font-bold leading-[1] tracking-[-0.04em]",
    size: { desktop: "text-[2.7em]", tablet: "text-[2.2em]", mobile: "text-[2em]" },
    lead: "text-[0.62em] leading-[1.55] opacity-75",
    cta: "inline-flex items-center gap-2 bg-[#2563EB] px-[1.1em] py-[0.55em] text-[0.56em] font-semibold text-white",
    secondary: "font-mono text-[0.42em] uppercase tracking-[0.14em] opacity-70",
    grid: "grid-cols-[1fr_0.5fr] items-start gap-[5%]",
    shape: "square",
    rule: false,
    motion: true,
    gridlines: true,
  },
  expressive: {
    bg: "bg-[#0E0E0E] text-white",
    brand: "font-heading text-[1em] font-black uppercase tracking-[0.02em]",
    nav: "font-mono text-[0.42em] uppercase tracking-[0.18em] text-white/60",
    words: "font-mono text-[0.42em] uppercase tracking-[0.22em] text-[#6B90FF]",
    title: "font-heading font-black uppercase leading-[0.88] tracking-[-0.04em]",
    size: { desktop: "text-[5em]", tablet: "text-[3.4em]", mobile: "text-[2.6em]" },
    lead: "text-[0.62em] leading-[1.5] text-white/70",
    cta: "inline-flex items-center gap-3 text-[0.95em] font-black uppercase tracking-[-0.02em] text-[#6B90FF]",
    secondary: "font-mono text-[0.42em] uppercase tracking-[0.14em] text-white/55",
    grid: "grid-cols-1 gap-[2%]",
    shape: "circle",
    rule: false,
    motion: true,
  },
  minimal: {
    bg: "bg-white text-[#1C1B19]",
    brand: "font-heading text-[0.8em] font-semibold tracking-[-0.01em]",
    nav: "text-[0.5em] opacity-60",
    words: "font-mono text-[0.4em] uppercase tracking-[0.24em] opacity-50",
    title: "font-heading font-medium leading-[1.15] tracking-[-0.03em]",
    size: { desktop: "text-[1.55em]", tablet: "text-[1.35em]", mobile: "text-[1.45em]" },
    lead: "text-[0.58em] leading-[1.6] opacity-60",
    cta: "inline-flex items-center gap-2 text-[0.56em] font-medium underline underline-offset-4 decoration-current/40",
    secondary: "text-[0.5em] opacity-50",
    grid: "grid-cols-1 place-items-center text-center",
    shape: "none",
    rule: false,
    motion: false,
    center: true,
  },
};

export const MODE_IDS = Object.keys(MODES);

const BASE = {
  desktop: "aspect-[16/10] text-[11.5px] sm:text-[13px] md:text-[15px] lg:text-[17px]",
  tablet: "aspect-[4/3] text-[11px] sm:text-[12.5px] md:text-[14px] lg:text-[15px]",
  mobile: "aspect-[9/16] text-[10.5px] sm:text-[11.5px] md:text-[12.5px]",
};

function Shape({ kind, mode, s }) {
  if (kind === "none") return null;
  if (kind === "rule") {
    return (
      <span className="wd-shape relative flex h-full min-h-[8em] items-end gap-3" aria-hidden="true">
        <i className="block h-full w-px bg-current opacity-40" />
        <span className="flex flex-col gap-[0.3em] font-mono text-[0.4em] uppercase tracking-[0.2em] opacity-60">{s.words.map((w, i) => <span key={w}>0{i + 1} {w}</span>)}</span>
      </span>
    );
  }
  if (kind === "square") {
    return (
      <span className="wd-shape relative block aspect-square w-full bg-[#2563EB]" aria-hidden="true">
        <i className="absolute inset-[12%] block border border-white/40" /><i className="absolute inset-y-0 left-1/2 block w-px bg-white/30" /><i className="absolute inset-x-0 top-1/2 block h-px bg-white/30" />
      </span>
    );
  }
  return <span className={cn("wd-shape absolute -right-[8%] top-[26%] block aspect-square w-[42%] rounded-full border", mode === "expressive" ? "border-white/30" : "border-current/30")} aria-hidden="true" />;
}

export default function PageSurface({ s, mode = "editorial", viewport = "desktop", keyboard = false, reduced = false, interactive = false, build = false, className = "" }) {
  const m = MODES[mode] || MODES.editorial;
  const prefers = useReducedMotion();
  const anim = m.motion && !reduced && !prefers && !build;
  const phone = viewport === "mobile";
  const tablet = viewport === "tablet";
  const [ink, setInk] = useState(false);
  const enter = (i) => (anim ? { initial: { opacity: 0, y: mode === "expressive" ? 22 : 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: mode === "expressive" ? 0.7 : 0.5, delay: 0.08 * i, ease: EASE } } : {});
  const tag = (id, side = undefined, inside = false) => (build ? { "data-tag": s.tags[id], ...(side ? { "data-tag-side": side } : {}), ...(inside ? { "data-tag-inside": "" } : {}) } : {});
  const words = s.title.split(" ");
  const cut = Math.max(1, words.length - 2);
  const title = interactive ? (
    <>{words.slice(0, cut).join(" ")} <span className="wd-ink" data-on={ink ? "true" : "false"}>{words.slice(cut).join(" ")}</span></>
  ) : s.title;
  const grid = phone ? "grid-cols-1 content-start gap-[6%] pt-[10%]" : tablet ? (m.center ? "grid-cols-1 place-items-center text-center pt-[6%]" : "grid-cols-[1fr_0.4fr] items-end gap-[6%] pt-[6%]") : cn(m.grid, "pt-[5%]");
  return (
    <div className={cn("wd-surface relative overflow-hidden", m.bg, BASE[viewport], className)} data-build={build ? "" : undefined} aria-hidden="true">
      {m.gridlines && !build && <span aria-hidden="true" className="pointer-events-none absolute inset-0 grid grid-cols-12 gap-[2%] px-[5%]">{Array.from({ length: 12 }).map((_, i) => <i key={i} className="block h-full border-x border-[#0F172A]/[0.06]" />)}</span>}
      {build && <span className="absolute right-[5%] top-[3.5%] font-mono text-[0.42em] uppercase tracking-[0.14em] !text-[#2563EB]">{s.tags.meta}</span>}
      <div className={cn("relative flex h-full flex-col", phone ? "px-[6%] pt-[5%]" : "px-[5%] pt-[3.5%]")} {...tag("main", "end", true)}>
        <div className={cn("relative flex items-center justify-between pb-[2%]", m.rule && "border-b border-current/15")} {...tag("header")}>
          <span className={m.brand}>{s.brand}</span>
          {phone ? (
            <span className="flex items-center gap-[1em]"><span className={cn(m.cta, "!py-[0.35em] !text-[0.5em]")}>{s.short}</span><span aria-hidden="true" className="flex flex-col gap-[3px]"><i className="block h-px w-[1.1em] bg-current" /><i className="block h-px w-[1.1em] bg-current" /></span></span>
          ) : (
            <span className="flex items-center gap-[1.5em]">{(tablet ? s.nav.slice(0, 2) : s.nav).map((n) => <span key={n} className={m.nav}>{n}</span>)}<span className={cn(m.cta, "!text-[0.5em]")}>{s.short}</span></span>
          )}
        </div>

        <div className={cn("relative grid flex-1", grid)} {...tag("grid", "end")}>
          <div className={cn("relative min-w-0", m.center && "max-w-[26em]")}>
            <motion.p {...enter(0)} className={cn("relative", m.words)} {...tag("kicker")}>{s.words.join(" / ")}</motion.p>
            <motion.h3 {...enter(1)} className={cn("relative mt-[0.5em]", m.title, m.size[viewport], interactive && "wd-ink-host cursor-default")} onPointerDown={(e) => { if (interactive && e.pointerType !== "mouse") setInk((v) => !v); }} {...tag("h1")}>{title}</motion.h3>
            <motion.p {...enter(2)} className={cn("relative mt-[0.9em]", m.lead, m.center ? "mx-auto max-w-[30em]" : "max-w-[30em]")} {...tag("p")}>{s.lead}</motion.p>
            {m.rule && !phone && <span aria-hidden="true" className="mt-[1.2em] block h-px w-[4em] bg-current opacity-40" />}
            <motion.div {...enter(3)} className={cn("relative mt-[1.4em] flex flex-wrap items-center gap-[1em]", phone && "flex-col items-stretch", m.center && "justify-center")} {...tag("a")}>
              <span className={cn("relative", m.cta, phone && "justify-center", keyboard && "outline outline-2 outline-offset-4 outline-[#2563EB]")}>
                {s.primary}<span aria-hidden="true">→</span>
                {keyboard && <span className="absolute -right-[0.4em] -top-[1.2em] rounded-[3px] border border-[#2563EB] bg-white px-[0.5em] py-[0.15em] font-mono text-[0.38em] uppercase tracking-[0.12em] !text-[#2563EB]">Tab</span>}
              </span>
              {!phone && <span className={m.secondary}>{s.secondary}</span>}
            </motion.div>
          </div>
          {m.shape !== "none" && (
            <motion.div {...enter(2)} className={cn("relative", phone ? "order-2 min-h-[6em]" : "", m.shape === "circle" && "pointer-events-none")}>
              <Shape kind={m.shape} mode={mode} s={s} />
            </motion.div>
          )}
        </div>

        <div className={cn("relative mt-auto grid gap-[2%] pb-[3%] pt-[3%]", phone ? "grid-cols-2" : "grid-cols-4")} {...tag("sections", "end")}>
          {s.sections.slice(0, phone ? 2 : 4).map((x) => <span key={x} className={cn("border-t pt-[0.5em] font-mono text-[0.38em] uppercase tracking-[0.14em] opacity-60", mode === "expressive" ? "border-white/20" : "border-current/20")}>{x}</span>)}
        </div>
        {build && <span className="absolute bottom-[3%] right-[5%] font-mono text-[0.42em] uppercase tracking-[0.14em] !text-[#2563EB]">{s.tags.motion}</span>}
      </div>
    </div>
  );
}
