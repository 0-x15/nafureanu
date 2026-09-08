import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE } from "./webBits";

export const bpOf = (w) => (w >= 1000 ? "desktop" : w >= 700 ? "tablet" : "mobile");

/*
 * A services page that recomposes continuously with its width. Not a
 * scaled copy: the navigation collapses, the grid drops columns, the
 * headline rewraps, the media changes crop, the action relocates and
 * the order changes. Every breakpoint is a decision.
 */
export default function ResponsiveSurface({ s, w, reduced = false }) {
  const bp = bpOf(w);
  const desktop = bp === "desktop", tablet = bp === "tablet", mobile = bp === "mobile";
  const t = { duration: reduced ? 0 : 0.5, ease: EASE };
  const base = Math.max(11, Math.min(16, w / 78));
  return (
    <div className="wd-motion h-full w-full overflow-hidden bg-white text-[#1B1F2A]" style={{ fontSize: `${base}px` }} aria-hidden="true">
      <div className="flex h-full flex-col px-[4.5%] pb-[3%] pt-[3%]">
        {/* navigation */}
        <motion.div layout transition={t} className="flex items-center justify-between border-b border-[#1B1F2A]/10 pb-[2%]">
          <span className="font-heading text-[1em] font-bold tracking-[-0.02em]">{s.brand}</span>
          <span className="flex items-center gap-[1.4em]">
            {!mobile && (desktop ? s.nav : s.nav.slice(0, 3)).map((n) => <span key={n} className="font-mono text-[0.48em] uppercase tracking-[0.16em] opacity-70">{n}</span>)}
            <span className={cn("bg-[#2563EB] px-[0.9em] py-[0.45em] font-mono text-[0.46em] uppercase tracking-[0.14em] text-white", mobile && "px-[0.8em]")}>{mobile ? s.navCtaShort : s.navCta}</span>
            {mobile && <span className="flex flex-col gap-[3px]"><i className="block h-px w-[1.2em] bg-current" /><i className="block h-px w-[1.2em] bg-current" /><i className="block h-px w-[0.8em] bg-current" /></span>}
          </span>
        </motion.div>

        {/* hero */}
        <motion.div layout transition={t} className={cn("grid pt-[4%]", desktop ? "grid-cols-[7fr_5fr] items-center gap-[5%]" : tablet ? "grid-cols-[8fr_4fr] items-end gap-[5%]" : "grid-cols-1 gap-[5%]")}>
          <motion.div layout="position" transition={t} className="min-w-0">
            <p className="font-mono text-[0.46em] uppercase tracking-[0.2em] text-[#2563EB]">{s.kicker}</p>
            <h4 className={cn("mt-[0.5em] font-heading font-bold leading-[1.02] tracking-[-0.035em]", desktop ? "max-w-[15ch] text-[2.1em]" : tablet ? "max-w-[15ch] text-[1.9em]" : "text-[1.85em]")}>{s.title}</h4>
            {!mobile && <p className="mt-[0.8em] max-w-[36ch] text-[0.7em] leading-[1.55] opacity-75">{s.lead}</p>}
            <div className={cn("mt-[1.2em] flex items-center gap-[1.2em]", mobile && "flex-col items-stretch gap-[0.8em]")}>
              <span className={cn("inline-flex items-center justify-center gap-2 bg-[#1B1F2A] px-[1.2em] py-[0.65em] text-[0.62em] font-semibold text-white", mobile && "w-full")}>{s.cta} <span>↗</span></span>
              {!mobile && <span className="text-[0.58em] opacity-70 underline underline-offset-4 decoration-current/30">{s.secondary}</span>}
            </div>
          </motion.div>
          <motion.div layout transition={t} className={cn("relative overflow-hidden", desktop ? "aspect-[4/5]" : tablet ? "aspect-[4/5]" : "aspect-[16/9]")}>
            <span className="wd-plate absolute inset-0" />
            <span className="absolute bottom-[5%] left-[5%] font-mono text-[0.42em] uppercase tracking-[0.16em] text-white/85">{s.mediaCaption[bp]}</span>
          </motion.div>
        </motion.div>

        {/* services */}
        <motion.div layout transition={t} className={cn("mt-auto grid gap-[3%] border-t border-[#1B1F2A]/10 pt-[3%]", desktop ? "grid-cols-3" : tablet ? "grid-cols-2" : "grid-cols-1 gap-[2%]")}>
          {s.services.map((x, i) => (
            <motion.div layout="position" transition={t} key={x.label} className={cn("flex gap-[0.8em]", mobile && "items-baseline", tablet && i === 2 && "col-span-2")}>
              <span className="font-mono text-[0.42em] uppercase tracking-[0.14em] text-[#2563EB]">0{i + 1}</span>
              <span className={cn(mobile && "flex items-baseline gap-[0.6em]")}>
                <span className="block text-[0.72em] font-semibold leading-tight">{x.label}</span>
                <span className={cn("block text-[0.58em] leading-snug opacity-70", mobile && "hidden")}>{x.text}</span>
              </span>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-[3%] flex items-center justify-between font-mono text-[0.42em] uppercase tracking-[0.14em] opacity-50">
          <span>{s.footer}</span><span>{Math.round(w)} px · {s.names[bp]}</span>
        </div>
      </div>
    </div>
  );
}
