import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, SERIF } from "./webBits";
import "./webDigital.css";

/*
 * The fictional business, art-directed four ways. Same content, four
 * visual systems: type, grid, scale, image treatment, spacing, motion,
 * navigation feel, CTA treatment. Also the surface the engineering
 * overlay reveals, and the surface that re-art-directs itself for a
 * phone. Marked as a design exercise wherever it appears.
 */
const MODES = {
  editorial: {
    bg: "bg-[#F6F3EC] text-[#1C1B19]",
    nav: "border-b border-[#1C1B19]/15",
    brand: `${SERIF} text-[1.1em] font-semibold tracking-[-0.01em]`,
    navItem: "font-mono text-[0.42em] uppercase tracking-[0.18em] opacity-70",
    kicker: "font-mono text-[0.42em] uppercase tracking-[0.2em] opacity-60",
    title: `${SERIF} font-medium leading-[0.98] tracking-[-0.025em]`,
    titleSize: "text-[2.3em]",
    sub: "text-[0.66em] leading-[1.55] opacity-80",
    proof: "font-mono text-[0.42em] uppercase tracking-[0.14em] opacity-70",
    cta: "inline-flex items-center gap-2 border-b border-current pb-[0.1em] text-[0.62em] font-medium",
    ctaArrow: "→",
    plate: "grayscale contrast-[1.05] rounded-none border border-[#1C1B19]/20",
    plateBox: "aspect-[4/5]",
    grid: "grid-cols-[1.3fr_1fr] gap-[6%] items-end",
    rule: true,
    motion: false,
  },
  precise: {
    bg: "bg-white text-[#0F172A]",
    nav: "border-b border-[#0F172A]/10",
    brand: "font-heading text-[0.9em] font-bold tracking-[-0.02em]",
    navItem: "font-mono text-[0.42em] uppercase tracking-[0.16em] opacity-70",
    kicker: "font-mono text-[0.42em] uppercase tracking-[0.18em] text-[#0F172A]/60",
    title: "font-heading font-bold leading-[1.02] tracking-[-0.035em]",
    titleSize: "text-[2em]",
    sub: "text-[0.62em] leading-[1.55] opacity-75",
    proof: "font-mono text-[0.4em] uppercase tracking-[0.14em] border border-[#0F172A]/20 px-[0.5em] py-[0.25em]",
    cta: "inline-flex items-center gap-2 bg-[#0F172A] px-[1.1em] py-[0.55em] text-[0.56em] font-semibold text-white",
    ctaArrow: "↗",
    plate: "rounded-none",
    plateBox: "aspect-square",
    grid: "grid-cols-[1.15fr_1fr] gap-[5%] items-start",
    rule: false,
    motion: true,
    data: true,
  },
  warm: {
    bg: "bg-[#FBF2E7] text-[#3B2A1E]",
    nav: "",
    brand: "font-heading text-[1em] font-bold tracking-[-0.01em] text-[#C2603B]",
    navItem: "text-[0.5em] font-medium opacity-75",
    kicker: "text-[0.5em] font-semibold text-[#C2603B]",
    title: "font-heading font-bold leading-[1.04] tracking-[-0.025em]",
    titleSize: "text-[2em]",
    sub: "text-[0.64em] leading-[1.6] opacity-80",
    proof: "text-[0.5em] font-medium before:mr-1 before:content-['✓'] before:text-[#C2603B]",
    cta: "inline-flex items-center gap-2 rounded-full bg-[#C2603B] px-[1.2em] py-[0.6em] text-[0.58em] font-semibold text-white",
    ctaArrow: "→",
    plate: "rounded-[14%] sepia-[0.35] saturate-[1.1]",
    plateBox: "aspect-[5/6]",
    grid: "grid-cols-[1.1fr_1fr] gap-[6%] items-center",
    rule: false,
    motion: true,
  },
  bold: {
    bg: "bg-[#0E0E0E] text-white",
    nav: "",
    brand: "font-heading text-[1em] font-black uppercase tracking-[0.02em]",
    navItem: "font-mono text-[0.42em] uppercase tracking-[0.18em] text-white/60",
    kicker: "font-mono text-[0.42em] uppercase tracking-[0.2em] text-[#D8FF4A]",
    title: "font-heading font-black uppercase leading-[0.88] tracking-[-0.04em]",
    titleSize: "text-[2.45em]",
    sub: "text-[0.62em] leading-[1.5] text-white/75",
    proof: "font-mono text-[0.4em] uppercase tracking-[0.14em] text-white/70",
    cta: "inline-flex items-center gap-3 text-[0.9em] font-black uppercase tracking-[-0.02em] text-[#D8FF4A]",
    ctaArrow: "→",
    plate: "rounded-none mix-blend-screen contrast-[1.2] saturate-0",
    plateBox: "aspect-[4/3]",
    grid: "grid-cols-1 gap-[3%]",
    rule: false,
    motion: true,
    bleed: true,
  },
};

export const MODE_IDS = Object.keys(MODES);

export default function NortePage({ content: k, mode = "editorial", viewport = "desktop", overlay = false, active = undefined, layers = {}, className = "" }) {
  const m = MODES[mode] || MODES.editorial;
  const reduced = useReducedMotion();
  const phone = viewport === "mobile";
  const anim = m.motion && !reduced;
  const ov = (id, side = undefined, inside = false) => (overlay ? { "data-ov-id": id, "data-ov-label": layers[id] || id, ...(side ? { "data-ov-side": side } : {}), ...(inside ? { "data-ov-inside": "" } : {}) } : {});
  const enter = (i) => (anim ? { initial: { opacity: 0, y: mode === "bold" ? 24 : 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: mode === "bold" ? 0.7 : 0.5, delay: 0.08 * i, ease: EASE } } : {});
  return (
    <div className={cn("wd-surface relative overflow-hidden", m.bg, phone ? "aspect-[9/17] text-[9px] sm:text-[10px]" : "aspect-[16/10] text-[11px] sm:text-[13px] md:text-[15px] lg:text-[17px]", className)} data-ov={overlay ? "on" : "off"} data-ov-active={active} aria-hidden="true">
      <div className={cn("relative flex h-full flex-col", phone ? "px-[6%] pt-[5%]" : "px-[5%] pt-[3.5%]")} {...ov("html", "end", true)}>
        <div className={cn("relative flex items-center justify-between pb-[2.5%]", m.nav)} {...ov("interaction")}>
          <span className={m.brand}>{k.name}</span>
          {phone ? (
            <span className="flex items-center gap-3"><span className={cn(m.cta, "!py-[0.4em] !text-[0.5em]")}>{k.ctaShort}</span><span aria-hidden="true" className="flex flex-col gap-[3px]"><i className="block h-px w-4 bg-current" /><i className="block h-px w-4 bg-current" /></span></span>
          ) : (
            <span className="flex items-center gap-[1.6em]">{k.nav.map((n) => <span key={n} className={m.navItem}>{n}</span>)}<span className={cn(m.cta, mode === "bold" ? "!text-[0.5em]" : "!text-[0.5em]")}>{k.ctaShort}</span></span>
          )}
        </div>

        <div className={cn("relative grid flex-1", phone ? "grid-cols-1 content-start gap-[5%] pt-[8%]" : cn(m.grid, "pt-[4%]"))} {...ov("grid", "end")}>
          <div className={cn("min-w-0", phone && "order-1")}>
            <motion.p {...enter(0)} className={m.kicker}>{k.kicker}</motion.p>
            <motion.h3 {...enter(1)} className={cn(m.title, phone ? (mode === "bold" ? "text-[2.6em]" : "text-[2em]") : m.titleSize, "relative mt-[0.4em]")} {...ov("seo")}>{k.title}</motion.h3>
            <motion.p {...enter(2)} className={cn(m.sub, "mt-[0.9em] max-w-[34em]")}>{k.sub}</motion.p>
            {m.rule && <span aria-hidden="true" className="mt-[1.2em] block h-px w-[4em] bg-current opacity-40" />}
            <motion.ul {...enter(3)} className={cn("relative mt-[1.1em] flex flex-wrap gap-x-[1.2em] gap-y-[0.5em]", phone && "flex-col gap-y-[0.4em]")} {...ov("content", "end")}>
              {k.proof.map((p) => <li key={p} className={m.proof}>{p}</li>)}
            </motion.ul>
            {m.data && !phone && (
              <div className="mt-[1.2em] grid max-w-[22em] grid-cols-[auto_1fr_auto] items-center gap-x-[0.8em] gap-y-[0.35em] font-mono text-[0.4em] uppercase tracking-[0.12em]">
                <span>{k.dataBefore}</span><span className="h-[0.7em] w-full bg-[#0F172A]/15"><i className="block h-full w-[86%] bg-[#0F172A]" /></span><span>{k.dataBeforeValue}</span>
                <span>{k.dataAfter}</span><span className="h-[0.7em] w-full bg-[#0F172A]/15"><i className="block h-full w-[38%] bg-[#0F172A]" /></span><span>{k.dataAfterValue}</span>
                <span className="col-span-3 normal-case tracking-normal opacity-60">{k.dataNote}</span>
              </div>
            )}
            <motion.div {...enter(4)} className={cn("relative mt-[1.4em] flex flex-wrap items-center gap-[1em]", phone && "flex-col items-stretch")} {...ov("a11y")}>
              <span className={cn(m.cta, phone && "justify-center")}>{k.cta}<span aria-hidden="true">{m.ctaArrow}</span></span>
              {!phone && <span className={cn("text-[0.52em] opacity-70", mode === "bold" && "text-white/60")}>{k.ctaAlt}</span>}
            </motion.div>
          </div>
          <motion.div {...enter(2)} className={cn("relative", phone ? "order-2 aspect-[16/10]" : m.plateBox, m.bleed && !phone && "-mx-[5%] mt-[2%]")} {...ov("images", "end")}>
            <span className={cn("wd-plate absolute inset-0 block", m.plate)} />
            <span className={cn("absolute bottom-[4%] left-[4%] font-mono text-[0.38em] uppercase tracking-[0.16em]", mode === "bold" ? "text-white/70" : mode === "editorial" ? "text-white/90" : "text-white/85")} {...ov("perf")}>{k.imageLabel}</span>
          </motion.div>
        </div>

        <div className={cn("relative mt-auto grid gap-[2%] pb-[3%] pt-[3%]", phone ? "grid-cols-2" : "grid-cols-4")} {...ov("measure", "end")}>
          {k.sections.slice(0, phone ? 2 : 4).map((s) => (
            <span key={s} className={cn("border-t pt-[0.5em] font-mono text-[0.38em] uppercase tracking-[0.14em] opacity-60", mode === "bold" ? "border-white/20" : "border-current/20")}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
