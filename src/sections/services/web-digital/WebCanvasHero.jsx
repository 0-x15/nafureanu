import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import ActionLink from "@/components/ActionLink";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import { EASE, Index, MONO, Reg } from "./webBits";
import "./webDigital.css";

/* Objects on the canvas, in canvas percentages. The pointer selects the one under it. */
const OBJ = {
  text: { left: 6, top: 40, width: 50, height: 26 },
  media: { left: 62, top: 14, width: 32, height: 60 },
  action: { left: 6, top: 76, width: 26, height: 9 },
};
const inside = (o, x, y) => x >= o.left && x <= o.left + o.width && y >= o.top && y <= o.top + o.height;
const Handles = () => <><i className="wd-h tl" /><i className="wd-h tr" /><i className="wd-h bl" /><i className="wd-h br" /></>;

/**
 * The live design canvas beside the headline: a page being composed. A
 * type specimen, a text frame holding the message, a media crop, an
 * action, spacing measures and a design cursor. The pointer selects
 * objects, exposes their handles and metadata, lights the column it
 * crosses and shifts the crop. Touch selects by tap.
 */
function DesignCanvas({ k, reduced }) {
  const ref = useRef(null);
  const [sel, setSel] = useState("text");
  const [hot, setHot] = useState(false);
  const [col, setCol] = useState(-1);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 120, damping: 20 });
  const sy = useSpring(my, { stiffness: 120, damping: 20 });
  const plateX = useTransform(sx, [0, 1], reduced ? [0, 0] : [-9, 9]);
  const plateY = useTransform(sy, [0, 1], reduced ? [0, 0] : [-6, 6]);
  const curX = useTransform(sx, (v) => `${v * 100}%`);
  const curY = useTransform(sy, (v) => `${v * 100}%`);
  const move = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    mx.set(x); my.set(y);
    setCol(Math.min(11, Math.max(0, Math.floor(x * 12))));
    const px = x * 100, py = y * 100;
    const o = Object.keys(OBJ).find((id) => inside(OBJ[id], px, py));
    if (o) setSel(o);
  };
  const leave = () => { setHot(false); setCol(-1); mx.set(0.5); my.set(0.5); setSel("text"); };
  const box = (o) => ({ left: `${o.left}%`, top: `${o.top}%`, width: `${o.width}%`, height: `${o.height}%` });
  const t = { duration: reduced ? 0 : 0.4, ease: EASE };
  return (
    <figure aria-label={k.label} className="m-0">
      <div ref={ref} onPointerEnter={(e) => { if (e.pointerType === "mouse") setHot(true); }} onPointerMove={(e) => { if (e.pointerType === "mouse") move(e); }} onPointerLeave={leave} onPointerDown={(e) => { if (e.pointerType !== "mouse") { setHot(true); move(e); } }} className="wd-canvas relative h-[clamp(340px,54svh,540px)] w-full select-none overflow-hidden border border-foreground/10 shadow-[0_40px_80px_-60px_rgba(12,18,32,0.35)]" aria-hidden="true">
        <div className="pointer-events-none absolute inset-0 grid grid-cols-12 gap-3 px-[6%]">
          {Array.from({ length: 12 }).map((_, i) => <motion.i key={i} initial={false} animate={{ opacity: hot ? (i === col ? 1 : 0.35) : 0 }} transition={{ duration: 0.35 }} className={cn("block h-full border-x", i === col ? "border-accent/60 bg-accent/[0.04]" : "border-accent/30")} />)}
        </div>
        <span className={cn(MONO, "absolute left-[6%] top-[5%] text-foreground/60")}>{k.layer}</span>
        <span className={cn(MONO, "absolute right-[6%] top-[5%] text-foreground/60")}>{k.size}</span>
        <div className="absolute left-[6%] top-[12%] flex items-end gap-4">
          <span className="font-heading text-[clamp(2.6rem,5.2vw,4.6rem)] font-bold leading-none tracking-[-0.04em] text-foreground">{k.specimen}</span>
          <span className={cn(MONO, "mb-2 hidden text-foreground/55 sm:inline")}>{k.style}</span>
        </div>
        <div className={cn("absolute flex items-center", sel === "text" && "wd-sel")} style={box(OBJ.text)}>
          {sel === "text" && <><Handles /><span className={cn(MONO, "absolute -top-5 left-0 text-accent")}>{k.frame}</span></>}
          <p className="px-[3%] font-heading text-[clamp(1.05rem,1.75vw,1.6rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground">{k.title}</p>
        </div>
        <div className={cn("absolute", sel === "media" && "wd-sel")} style={box(OBJ.media)}>
          {sel === "media" && <><Handles /><span className={cn(MONO, "absolute -top-5 left-0 text-accent")}>{k.media}</span></>}
          <div className="relative h-full w-full overflow-hidden">
            <motion.div style={{ x: plateX, y: plateY }} className="wd-plate absolute -inset-[6%]" />
            <span className="pointer-events-none absolute inset-[9%] border border-dashed border-white/70" />
          </div>
        </div>
        <span className="absolute top-[52%] hidden items-center sm:flex" style={{ left: `${OBJ.text.left + OBJ.text.width + 1}%`, width: `${OBJ.media.left - OBJ.text.left - OBJ.text.width - 2}%` }}>
          <i className="h-2 w-px bg-accent" /><i className="h-px flex-1 bg-accent" /><span className={cn(MONO, "px-1 text-accent")}>{k.measure}</span><i className="h-px flex-1 bg-accent" /><i className="h-2 w-px bg-accent" />
        </span>
        <div className={cn("absolute", sel === "action" && "wd-sel")} style={box(OBJ.action)}>
          {sel === "action" && <><Handles /><span className={cn(MONO, "absolute -top-5 left-0 text-accent")}>{k.action}</span></>}
          <span className="flex h-full w-full items-center justify-center gap-1.5 whitespace-nowrap bg-accent px-3 text-[clamp(10px,0.85vw,13px)] font-medium text-white"><span className="sm:hidden">{k.actionShort}</span><span className="hidden sm:inline">{k.actionText}</span><span>↗</span></span>
        </div>
        <span className="absolute left-[3.2%] hidden flex-col items-center sm:flex" style={{ top: `${OBJ.text.top + OBJ.text.height + 0.5}%`, height: `${OBJ.action.top - OBJ.text.top - OBJ.text.height - 1}%` }}>
          <i className="h-px w-2 bg-accent" /><i className="w-px flex-1 bg-accent" /><span className={cn(MONO, "py-0.5 text-accent")}>{k.gap}</span><i className="w-px flex-1 bg-accent" /><i className="h-px w-2 bg-accent" />
        </span>
        <motion.span style={{ left: curX, top: curY }} className="pointer-events-none absolute z-10 flex items-start gap-1.5">
          <svg width="14" height="18" viewBox="0 0 14 18"><path d="M1 1l12 9-5.2 1.1L11 17l-2.6 1-3.1-5.7L1 16z" fill="#1B1F2A" stroke="#fff" strokeWidth="1.2" /></svg>
          <span className="mt-2 bg-foreground px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-white">{k.cursor}</span>
        </motion.span>
        <div className="absolute inset-x-[6%] bottom-[5%] flex items-baseline justify-between gap-4">
          <span className={cn(MONO, "hidden text-foreground/55 sm:inline")}>{k.breakpoints}</span>
          <motion.span key={sel} initial={reduced ? false : { opacity: 0, y: 3 }} animate={{ opacity: 1, y: 0 }} transition={t} className={cn(MONO, "text-accent")}>{k.inspector[sel]}</motion.span>
        </div>
      </div>
      <figcaption className="mt-3 flex items-center justify-between gap-4">
        <Reg label={k.reg} />
        <span className={cn(MONO, "text-muted-foreground")}>{k.hint}</span>
      </figcaption>
    </figure>
  );
}

/**
 * Act 01 — the canvas is already being worked on. Compact editorial
 * metadata, a controlled headline and, beside it, the live design
 * canvas. One composition, one viewport, also at 1366 × 768.
 */
export default function WebCanvasHero({ lang, c }) {
  const h = c.hero;
  const reduced = useReducedMotion();
  const words = h.title.split(" ");
  return (
    <header id="wd-hero" className="relative overflow-x-clip px-5 pb-16 pt-6 md:px-10 md:pb-24 md:pt-8 lg:pt-10">
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12 lg:items-center lg:gap-8">
        <div className="lg:col-span-5">
          <div className="flex items-center justify-between gap-6">
            <p className={cn(MONO, "text-foreground/80")}>{h.words.join(" / ")}</p>
            <Index>{c.index.hero}</Index>
          </div>
          <h1 className="mt-8 max-w-[15ch] font-heading text-[clamp(2.1rem,4.3vw,4rem)] font-bold leading-[1] tracking-[-0.04em] text-foreground md:mt-10">
            {words.map((w, i) => (
              <span key={`${w}-${i}`}><motion.span initial={reduced ? false : { opacity: 0, y: "0.4em" }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: EASE }} className="inline-block">{w}</motion.span>{i < words.length - 1 ? " " : ""}</span>
            ))}
          </h1>
          <motion.p initial={reduced ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55, ease: EASE }} className="mt-6 max-w-[40ch] text-[16px] leading-[1.6] text-foreground/85 md:text-[17px]">{h.lead}</motion.p>
          <motion.div initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.8 }} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ActionLink to={langPath(lang, "/contact")} size="lg">{h.primary}</ActionLink>
            <ActionLink to="#wd-structure" variant="text" icon="right" size="md">{h.secondary}</ActionLink>
          </motion.div>
        </div>
        <motion.div initial={reduced ? false : { opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.25, ease: EASE }} className="lg:col-span-7">
          <DesignCanvas k={h.canvas} reduced={Boolean(reduced)} />
        </motion.div>
      </div>
    </header>
  );
}
