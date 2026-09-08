import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import { EASE, SERIF } from "./webBits";

/*
 * One landing surface, three art directions. Every element keeps its
 * identity and physically relocates when the direction changes: the
 * grid placement, the type, the media treatment, the action and the
 * density are all decisions. In live mode the surface answers the
 * pointer with intent: depth, menu intents and a magnetic action.
 */
const L = {
  editorial: {
    bg: "bg-[#F5F1E8] text-[#1C1B19]",
    brand: { col: "1 / 4", row: "1", cls: `${SERIF} text-[1.15em] font-semibold` },
    nav: { col: "6 / 13", row: "1", cls: "justify-self-end font-mono text-[0.46em] uppercase tracking-[0.18em] opacity-70" },
    navCta: null,
    kicker: { col: "2 / 8", row: "2", cls: "self-start font-mono text-[0.46em] uppercase tracking-[0.2em] opacity-60" },
    title: { col: "2 / 8", row: "2", cls: `${SERIF} self-center text-[2.35em] font-medium leading-[1] tracking-[-0.02em]` },
    lead: { col: "2 / 6", row: "3", cls: "self-end text-[0.72em] leading-[1.55] opacity-80" },
    cta: { col: "6 / 9", row: "3", cls: "self-end justify-self-start" },
    ctaCls: "border-b border-current pb-[0.15em] text-[0.7em] font-medium",
    media: { col: "9 / 13", row: "2 / 4", cls: "self-stretch" },
    mediaCls: "wd-plate-warm h-full w-full grayscale-[0.35]",
    support: { col: "1 / 2", row: "2 / 4", cls: "self-end justify-self-start" },
    supportKind: "vertical",
    caption: true,
    gridlines: false,
    dur: 0.9,
  },
  technical: {
    bg: "bg-white text-[#0F172A]",
    brand: { col: "1 / 3", row: "1", cls: "font-heading text-[0.95em] font-bold tracking-[-0.02em]" },
    nav: { col: "3 / 10", row: "1", cls: "font-mono text-[0.46em] uppercase tracking-[0.16em] opacity-70" },
    navCta: { col: "11 / 13", row: "1", cls: "justify-self-end" },
    kicker: { col: "1 / 7", row: "2", cls: "self-start font-mono text-[0.46em] uppercase tracking-[0.18em] text-[#2563EB]" },
    title: { col: "1 / 7", row: "2", cls: "self-center font-heading text-[2em] font-bold leading-[1.02] tracking-[-0.04em]" },
    lead: { col: "4 / 8", row: "3", cls: "self-end text-[0.68em] leading-[1.5] opacity-75" },
    cta: { col: "1 / 4", row: "3", cls: "self-end justify-self-start" },
    ctaCls: "bg-[#2563EB] px-[1.1em] py-[0.6em] text-[0.62em] font-semibold text-white",
    media: { col: "8 / 13", row: "2", cls: "self-stretch" },
    mediaCls: "system",
    support: { col: "8 / 13", row: "3", cls: "self-end" },
    supportKind: "columns",
    caption: false,
    gridlines: true,
    dur: 0.45,
  },
  expressive: {
    bg: "bg-[#0E0F13] text-white",
    brand: { col: "1 / 4", row: "1", cls: "font-heading text-[1em] font-black uppercase tracking-[0.04em]" },
    nav: { col: "9 / 13", row: "1", cls: "justify-self-end font-mono text-[0.46em] uppercase tracking-[0.18em] text-white/60" },
    navCta: null,
    kicker: { col: "1 / 6", row: "2", cls: "self-start font-mono text-[0.46em] uppercase tracking-[0.22em] text-[#6B90FF]" },
    title: { col: "1 / 11", row: "2", cls: "z-10 self-center font-heading text-[3.2em] font-black uppercase leading-[0.9] tracking-[-0.045em]" },
    lead: { col: "1 / 5", row: "3", cls: "self-end text-[0.68em] leading-[1.5] text-white/70" },
    cta: { col: "8 / 13", row: "3", cls: "z-10 self-end justify-self-end" },
    ctaCls: "text-[1.05em] font-black uppercase tracking-[-0.02em] text-[#6B90FF]",
    media: { col: "6 / 13", row: "1 / 4", cls: "w-full self-center" },
    mediaCls: "wd-plate-ink ml-auto aspect-square w-[82%] rounded-full border border-white/15",
    support: null,
    caption: true,
    gridlines: false,
    dur: 1,
  },
};

const place = (p) => (p ? { gridColumn: p.col, gridRow: p.row } : {});

export default function LandingSurface({ s, dir = "editorial", live = false, reduced = false }) {
  const d = L[dir] || L.editorial;
  const ref = useRef(null);
  const [intent, setIntent] = useState(/** @type {string | null} */ (null));
  const [hover, setHover] = useState(/** @type {string | null} */ (null));
  const [ctaShift, setCtaShift] = useState({ x: 0, y: 0 });
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 90, damping: 22 });
  const sy = useSpring(my, { stiffness: 90, damping: 22 });
  const depth = live && !reduced;
  const mediaX = useTransform(sx, [0, 1], depth ? [-14, 14] : [0, 0]);
  const mediaY = useTransform(sy, [0, 1], depth ? [-10, 10] : [0, 0]);
  const titleX = useTransform(sx, [0, 1], depth ? [7, -7] : [0, 0]);
  const curX = useTransform(sx, (v) => `${v * 100}%`);
  const curY = useTransform(sy, (v) => `${v * 100}%`);
  const ctaRef = useRef(null);
  const onMove = (e) => {
    if (!live || e.pointerType !== "mouse") return;
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
    if (!reduced && ctaRef.current) {
      const c = ctaRef.current.getBoundingClientRect();
      const cx = c.left + c.width / 2, cy = c.top + c.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const reach = intent === "contact" ? 220 : 130;
      setCtaShift(dist < reach ? { x: dx * 0.28, y: dy * 0.28 } : { x: 0, y: 0 });
    }
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); setHover(null); setCtaShift({ x: 0, y: 0 }); if (live) setIntent(null); };
  const nav = (id) => live ? { onPointerEnter: () => { setHover(id); setIntent(id); }, onPointerLeave: () => setHover(null), onPointerDown: (e) => { if (e.pointerType !== "mouse") setIntent((v) => (v === id ? null : id)); } } : {};
  const over = (id) => live ? { onPointerEnter: () => setHover(id), onPointerLeave: () => setHover(null) } : {};
  const NAV_IDS = ["services", "projects", "studio", "contact"];
  const t = { duration: reduced ? 0 : d.dur, ease: EASE };
  const dim = (id) => intent && intent !== "contact" && intent !== id && id !== "media" && id !== "support" ? 0.45 : 1;
  const mediaScale = intent === "projects" ? 1.08 : 1;
  const studio = intent === "studio";

  return (
    <div ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className={cn("wd-motion relative h-full w-full overflow-hidden text-[11px] transition-colors duration-700 sm:text-[13px] md:text-[15px] lg:text-[17px]", d.bg, live && "cursor-crosshair")} aria-hidden="true">
      {d.gridlines && <span className="pointer-events-none absolute inset-0 grid grid-cols-12 gap-[2%] px-[5%]">{Array.from({ length: 12 }).map((_, i) => <i key={i} className="block h-full border-x border-[#0F172A]/[0.07]" />)}</span>}
      <div className="relative grid h-full grid-cols-12 grid-rows-[auto_1fr_auto] gap-x-[2%] gap-y-[3%] px-[5%] pb-[4%] pt-[3.5%]">
        <motion.div layout transition={t} style={place(d.brand)} className={cn("wd-motion", d.brand.cls)}>{s.brand}</motion.div>
        <motion.div layout transition={t} style={place(d.nav)} className={cn("wd-motion flex items-center gap-[1.6em]", d.nav.cls)}>
          {s.nav.map((n, i) => <span key={n} {...nav(NAV_IDS[i])} className={cn("relative transition-opacity duration-300", live && "cursor-pointer", intent && intent !== NAV_IDS[i] && "opacity-50", intent === NAV_IDS[i] && "opacity-100")}>{dir === "technical" ? `0${i + 1} ` : ""}{n}{intent === NAV_IDS[i] && <motion.i layoutId="ls-nav-dot" className="absolute -bottom-[0.5em] left-0 right-0 block h-px bg-current" />}</span>)}
        </motion.div>
        {d.navCta && <motion.div layout transition={t} style={place(d.navCta)} className={cn("wd-motion", d.navCta.cls)}><span className="border border-current px-[0.9em] py-[0.4em] font-mono text-[0.42em] uppercase tracking-[0.14em]">{s.navCta}</span></motion.div>}

        <motion.div layout transition={t} style={place(d.kicker)} className={cn("wd-motion", d.kicker.cls)} animate={{ opacity: dim("kicker") }}>{s.kicker}</motion.div>
        <motion.div layout transition={t} style={{ ...place(d.title), x: titleX }} className={cn("wd-motion max-w-[16ch] transition-[letter-spacing,font-weight] duration-500", d.title.cls, studio && (dir === "expressive" ? "tracking-[-0.06em]" : "tracking-[-0.05em] font-black"))} animate={{ opacity: intent === "projects" ? 0.55 : 1 }} {...over("title")}>{s.title}</motion.div>
        <motion.div layout transition={t} style={place(d.lead)} className={cn("wd-motion max-w-[32ch]", d.lead.cls)} animate={{ opacity: dim("lead") }}>{s.lead}</motion.div>

        <motion.div layout transition={t} style={place(d.cta)} className={cn("wd-motion", d.cta.cls)}>
          <motion.span ref={ctaRef} animate={{ x: ctaShift.x, y: ctaShift.y, scale: intent === "contact" ? 1.12 : 1 }} transition={{ type: "spring", stiffness: 260, damping: 22 }} className={cn("inline-flex items-center gap-2 will-change-transform", d.ctaCls, intent === "contact" && "shadow-[0_0_0_6px_rgba(37,99,235,0.18)]")} {...over("cta")}>{s.cta}<span aria-hidden="true">{dir === "expressive" ? "→" : "↗"}</span></motion.span>
        </motion.div>

        <motion.div layout transition={t} style={{ ...place(d.media), x: mediaX, y: mediaY }} className={cn("wd-motion relative", d.media.cls)} {...over("media")}>
          {d.mediaCls === "system" ? (
            <motion.div animate={{ scale: mediaScale }} transition={{ duration: 0.5, ease: EASE }} className="grid h-full grid-cols-3 grid-rows-3 gap-[3%] border border-[#0F172A]/15 p-[3%] font-mono text-[0.4em] uppercase tracking-[0.12em] text-[#0F172A]/70">
              {["01 · retícula", "02 · tipo", "03 · media", "04 · acción", "05 · foco", "06 · datos", "07 · 12 col", "08 · 8 px", "09 · 1440"].map((x, i) => <span key={x} className={cn("flex items-end border p-[6%]", i === 4 ? "border-[#2563EB] bg-[#2563EB] text-white" : "border-[#0F172A]/15")}>{x}</span>)}
            </motion.div>
          ) : (
            <motion.div animate={{ scale: mediaScale }} transition={{ duration: 0.6, ease: EASE }} className={cn("relative overflow-hidden", d.mediaCls)}>
              {d.caption && <span className={cn("absolute bottom-[6%] left-[6%] font-mono text-[0.42em] uppercase tracking-[0.16em]", dir === "expressive" ? "text-white/70" : "text-white/85")}>{intent === "projects" ? s.captionLive : s.caption}</span>}
            </motion.div>
          )}
        </motion.div>

        {d.support && (
          <motion.div layout transition={t} style={place(d.support)} className={cn("wd-motion", d.support.cls)} animate={{ opacity: intent && !studio ? 0.5 : 1 }}>
            {d.supportKind === "columns" ? (
              <div className="grid grid-cols-3 gap-[4%] border-t border-[#0F172A]/15 pt-[3%]">
                {s.support.map((x) => <span key={x.n} className={cn("transition-colors duration-300", studio && "text-[#2563EB]")}><span className="font-mono text-[0.42em] uppercase tracking-[0.14em] opacity-60">{x.n}</span><span className="block text-[0.6em] font-semibold leading-tight">{x.label}</span><span className="block text-[0.5em] leading-snug opacity-70">{x.text}</span></span>)}
              </div>
            ) : (
              <ul className="flex gap-[1.6em] font-mono text-[0.42em] uppercase tracking-[0.16em] opacity-60 [writing-mode:vertical-rl] rotate-180">{s.support.map((x) => <li key={x.n} className={cn("transition-colors", studio && "text-[#2563EB] opacity-100")}>{x.n} — {x.label}</li>)}</ul>
            )}
          </motion.div>
        )}
      </div>

      {live && !reduced && (
        <motion.span style={{ left: curX, top: curY }} className="pointer-events-none absolute z-20 -translate-x-1 translate-y-3">
          <motion.span initial={false} animate={{ opacity: hover ? 1 : 0 }} transition={{ duration: 0.2 }} className={cn("inline-block px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]", dir === "expressive" ? "bg-white text-[#0E0F13]" : "bg-[#1B1F2A] text-white")}>{hover ? s.cursor[hover] : ""}</motion.span>
        </motion.span>
      )}
    </div>
  );
}
