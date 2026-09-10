import { useLayoutEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import BackToHome from "@/components/work/BackToHome";
import { EASE, MONO } from "./workBits";
import "./workHero.css";

/**
 * Act 01 — the entrance of the machine room. Metadata along the top
 * edge, the statement with its last word in cobalt, one sentence and
 * the line of state on the left; on the right, a corridor of a modern
 * server room seen from its door: two rows of racks converging on a
 * cool light at the far end, a raised technical floor that mirrors
 * them, a ceiling with two light strips and cable trays, and inside
 * each rack a dark perforated door with modules whose LEDs blink at
 * their own pace. The racks rise one after another on entry and
 * scrolling walks you in, towards
 * the systems shown below in the cards. The scene is plain DOM/CSS:
 * one 3D transform per rack, gradients for every material.
 */
const RACK_Z = [40, -110, -260, -410, -560, -710, -860];
const MODULE_TOPS = [8, 27, 46, 65, 84];
/* The LEDs of one door as a single background: one dot per module row. */
const leds = (color, x) => MODULE_TOPS.map((t) => `radial-gradient(circle at ${x}px calc(${t}% + 7px), ${color} 0 2.5px, ${color}99 3.5px, transparent 7px)`).join(",");
const LED_A = leds("#17B4CD", 13);
const LED_B = `${leds("#3157F6", 72)},${leds("#E9EEFF", 83)}`;

/**
 * One rack. The first two on each side are true boxes (a side panel in
 * 3D, seen from the door); the rest are flat planes, which is all the
 * eye can tell at that distance and saves a compositing layer each.
 * The LEDs live in two overlays per door whose opacity animates on the
 * compositor — the door itself is never repainted. Far racks keep the
 * overlays still.
 */
function Rack({ side, z, i, reduced }) {
  const left = side === "l";
  const boxed = i < 2;
  const live = i < 4;
  const label = `${left ? "A" : "B"}-${String(i + 1).padStart(2, "0")}`;
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.25 + i * 0.1, ease: EASE }}
      style={{ z: left ? z : z - 120, rotateY: left ? 78 : -78, transformOrigin: "left center" }}
      className={cn("absolute bottom-[24%] h-[260px] w-[120px]", boxed && "[transform-style:preserve-3d]", left ? "left-[14%] md:left-[7%]" : "left-[86%] md:left-[93%]")}
    >
      {/* the cabinet and its door */}
      <div className="wk-rack">
        <div className="wk-plate"><span>{label}</span><i className={live ? undefined : "wk-still"} /></div>
        <div className="wk-door">
          <span className="wk-rail" style={{ left: 3 }} />
          <span className="wk-rail" style={{ right: 3 }} />
          {MODULE_TOPS.map((t) => <span key={t} className="wk-mod" style={{ top: `${t}%` }} />)}
          <span className={cn("wk-leds", live && "wk-live")} style={/** @type {any} */ ({ backgroundImage: LED_A, "--d": `${3.1 + (i % 3) * 0.5}s`, "--o": `${i * 0.37}s` })} />
          <span className={cn("wk-leds", live && "wk-live")} style={/** @type {any} */ ({ backgroundImage: LED_B, "--d": `${2.2 + (i % 2) * 0.7}s`, "--o": `${0.6 + i * 0.23}s` })} />
        </div>
      </div>
      {/* the side of the cabinet, going back from the door towards the wall */}
      {boxed && <div aria-hidden="true" className={cn("absolute top-0 h-full w-[16px] border-y border-foreground/25 bg-[linear-gradient(180deg,#D3D1C9,#C2C0B8)]", left ? "left-0 origin-left [transform:rotateY(90deg)]" : "right-0 origin-right [transform:rotateY(-90deg)]")} />}
      {/* the reflection in the floor */}
      <div aria-hidden="true" className="absolute inset-x-0 top-full h-[70%] origin-top opacity-[0.32] [mask-image:linear-gradient(to_top,transparent_10%,rgba(0,0,0,0.9))] [transform:scaleY(-1)]">
        <div className="wk-rack"><div className="wk-door" /></div>
      </div>
    </motion.div>
  );
}

function Hall({ reduced, walk, scale }) {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      {/* the scene is drawn at one size and scaled to cover the hero */}
      <div className="absolute left-1/2 top-[58%] h-[460px] w-[640px]" style={{ transform: `translate(-50%, -50%) scale(${scale})`, perspective: "1000px", perspectiveOrigin: "50% 42%" }}>
        <motion.div style={reduced ? undefined : { z: walk }} className="absolute inset-0 [transform-style:preserve-3d]">
          {/* the raised floor, receding from the door to the far end */}
          <div className="absolute inset-x-[-10%] top-[76%] h-[1600px] origin-top [transform:rotateX(-90deg)]">
            <div className="wk-floor" />
            <div className="absolute inset-0 bg-[radial-gradient(38%_26%_at_50%_62%,rgba(23,180,205,0.22),transparent)]" />
          </div>
          {/* the ceiling: light strips and cable trays */}
          <div className="absolute inset-x-[-10%] top-[13%] h-[1600px] origin-top [transform:rotateX(-90deg)]">
            <div className="wk-ceiling" />
          </div>
          {/* the far end: a lit doorway, its glow and the haze in front of it */}
          <div className="absolute left-1/2 top-[42%] h-[340px] w-[300px] bg-[radial-gradient(closest-side,rgba(255,255,255,0.95),rgba(220,245,250,0.7)_45%,rgba(23,180,205,0.18)_75%,transparent)]" style={{ transform: "translate(-50%,-50%) translateZ(-1500px)" }} />
          <div className="wk-glow absolute left-1/2 top-[42%] h-[640px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.32),rgba(49,87,246,0.14)_40%,rgba(49,87,246,0.04)_70%,transparent)]" style={{ transform: "translate(-50%,-50%) translateZ(-1500px)" }} />
          <div className="wk-haze absolute left-1/2 top-[44%] h-[460px] w-[960px] bg-[radial-gradient(closest-side,rgba(249,247,240,0.8),rgba(249,247,240,0.35)_55%,transparent)]" style={{ transform: "translate(-50%,-50%) translateZ(-900px)" }} />

          {/* the two rows of racks */}
          {RACK_Z.map((z, i) => (
            <Rack key={`l${i}`} side="l" z={z} i={i} reduced={reduced} />
          ))}
          {RACK_Z.map((z, i) => (
            <Rack key={`r${i}`} side="r" z={z} i={i} reduced={reduced} />
          ))}
        </motion.div>
      </div>
      {/* the edges of the room dissolve into the page */}
      <span className="absolute inset-x-0 top-0 h-[22%] bg-gradient-to-b from-background to-transparent" />
      <span className="absolute inset-x-0 bottom-0 h-[14%] bg-gradient-to-t from-background to-transparent" />
      <span className="absolute inset-y-0 left-0 w-[6%] bg-gradient-to-r from-background to-transparent" />
      <span className="absolute inset-y-0 right-0 w-[6%] bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

export default function WorkArchiveHero({ lang, t }) {
  const reduced = useReducedMotion();
  const h = t.hero;
  const ref = useRef(null);
  const [scale, setScale] = useState(2.2);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const walk = useTransform(scrollYProgress, [0, 1], [0, 360]);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const fit = () => setScale(Math.max(el.clientWidth / 640, el.clientHeight / 460));
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const up = (i) => ({ initial: reduced ? false : { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE } });

  return (
    <header ref={ref} className="relative flex h-[560px] flex-col overflow-hidden px-5 pb-10 pt-24 sm:h-[640px] md:px-10 md:pb-14 md:pt-24 lg:h-[min(88svh,860px)] lg:min-h-[640px]">
      {/* the room, filling the hero */}
      <Hall reduced={Boolean(reduced)} walk={walk} scale={scale} />

      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] flex-1 flex-col">
        {/* the top edge */}
        <motion.div {...up(0)} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-foreground/12 pb-3">
          <div className="flex items-baseline gap-6">
            <BackToHome lang={lang} />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{t.kicker}</p>
          </div>
          <p className={cn(MONO, "text-muted-foreground")}>{h.selected}</p>
          <p className={cn(MONO, "hidden text-muted-foreground md:block")}>{h.discipline}</p>
        </motion.div>

        {/* the statement, standing in the middle of the room */}
        <div className="relative flex flex-1 flex-col items-center justify-center text-center">
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[130%] w-[220%] -translate-x-1/2 -translate-y-1/2 bg-[radial-gradient(closest-side,rgba(249,247,240,0.96),rgba(249,247,240,0.8)_45%,transparent)] lg:h-[120%] lg:w-[min(100%,980px)] lg:bg-[radial-gradient(closest-side,rgba(249,247,240,0.9),rgba(249,247,240,0.55)_55%,transparent)]" />
          <motion.h1 {...up(1)} className="relative max-w-[11em] font-heading text-[clamp(2.9rem,6vw,6.2rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground [text-wrap:balance]">
            {h.h1a} <span className="text-accent">{h.h1b}</span>
          </motion.h1>
          <motion.p {...up(2)} className="relative mt-6 max-w-[46ch] text-[16px] leading-[1.6] text-foreground/85 md:text-[18px]">
            {t.intro}
          </motion.p>
          {/* the line of state: three marks lighting up in sequence */}
          <motion.div {...up(3)} className="relative mt-8 w-full max-w-[520px]" role="list" aria-label={h.stateLabel}>
            <div className="relative h-px bg-foreground/15">
              <motion.span aria-hidden="true" initial={reduced ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduced ? 0 : 1.4, delay: 0.5, ease: EASE }} className="absolute inset-y-0 left-0 w-full origin-left bg-accent/60" />
            </div>
            <ol className="mt-3 grid grid-cols-3 gap-4">
              {h.marks.map((w, i) => (
                <li key={w} className="flex items-center justify-center gap-2.5">
                  <motion.span aria-hidden="true" initial={reduced ? false : { backgroundColor: "rgba(49,87,246,0)" }} animate={{ backgroundColor: "rgba(49,87,246,1)" }} transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.9 + i * 0.35 }} className="h-[7px] w-[7px] shrink-0 border border-accent" />
                  <span className={cn(MONO, "text-foreground/75")}>{w}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
