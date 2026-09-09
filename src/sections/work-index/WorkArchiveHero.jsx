import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
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
 * their own pace. The racks rise one after another on entry, the
 * camera leans with the pointer and scrolling walks you in, towards
 * the systems shown below in the cards. The scene is plain DOM/CSS:
 * one 3D transform per rack, gradients for every material.
 */
const RACK_Z = [40, -110, -260, -410, -560, -710, -860];
const MODULES = [
  { top: 8, d: 3.1, o: 0 },
  { top: 27, d: 2.3, o: 0.7 },
  { top: 46, d: 4.2, o: 1.4 },
  { top: 65, d: 2.8, o: 0.3 },
  { top: 84, d: 3.6, o: 1.1 },
];

function Rack({ side, z, i, reduced }) {
  const left = side === "l";
  const label = `${left ? "A" : "B"}-${String(i + 1).padStart(2, "0")}`;
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 36 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.25 + i * 0.1, ease: EASE }}
      style={{ z: left ? z : z - 120, rotateY: left ? 78 : -78, transformOrigin: "left center" }}
      className={cn("absolute bottom-[24%] h-[260px] w-[120px] [transform-style:preserve-3d]", left ? "left-[7%]" : "left-[93%]")}
    >
      {/* the cabinet and its door */}
      <div className="wk-rack">
        <div className="wk-plate"><span>{label}</span><i /></div>
        <div className="wk-door">
          <span className="wk-rail" style={{ left: 3 }} />
          <span className="wk-rail" style={{ right: 3 }} />
          {MODULES.map((m, k) => (
            <span key={k} className="wk-mod" style={/** @type {any} */ ({ top: `${m.top}%`, "--d": `${m.d + (i % 3) * 0.4}s`, "--o": `${m.o + i * 0.17}s` })}>
              <i className="wk-led wk-led-a" />
              <i className="wk-led wk-led-b" />
              {(k + i) % 2 === 0 && <i className="wk-led wk-led-c" />}
            </span>
          ))}
        </div>
      </div>
      {/* the depth of the cabinet, on the end that faces the door */}
      <div aria-hidden="true" className={cn("absolute top-0 h-full w-[16px] border-y border-foreground/25 bg-[linear-gradient(180deg,#D3D1C9,#C2C0B8)]", left ? "left-0 origin-left [transform:rotateY(-90deg)]" : "right-0 origin-right [transform:rotateY(90deg)]")} />
      {/* the reflection in the floor */}
      <div aria-hidden="true" className="absolute inset-x-0 top-full h-[70%] origin-top opacity-[0.32] [mask-image:linear-gradient(to_top,transparent_10%,rgba(0,0,0,0.9))] [transform:scaleY(-1)]">
        <div className="wk-rack"><div className="wk-door" /></div>
      </div>
    </motion.div>
  );
}

function Hall({ reduced, rx, ry, walk }) {
  return (
    <div className="relative mx-auto h-[225px] w-full [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_90%,transparent),linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-composite:source-in] sm:h-[335px] md:h-[380px] lg:ml-auto lg:mr-0 lg:h-[274px] lg:w-[461px] xl:h-[354px] xl:w-[595px] min-[1440px]:h-[380px] min-[1440px]:w-[640px]">
      {/* the scene is drawn at one size, centred and scaled to its box */}
      <div className="absolute left-1/2 top-0 h-[460px] w-[640px] origin-top -translate-x-1/2 scale-[0.6] sm:scale-[0.9] md:scale-100 lg:scale-[0.72] xl:scale-[0.93] min-[1440px]:scale-100" style={{ perspective: "1000px", perspectiveOrigin: "50% 42%" }}>
        <motion.div style={reduced ? undefined : { rotateX: rx, rotateY: ry, z: walk }} className="absolute inset-0 [transform-style:preserve-3d]">
          {/* the raised floor, receding from the door to the far end */}
          <div aria-hidden="true" className="absolute inset-x-[-10%] top-[76%] h-[1600px] origin-top [transform:rotateX(-90deg)]">
            <div className="wk-floor" />
            <div className="absolute inset-0 bg-[radial-gradient(38%_26%_at_50%_62%,rgba(23,180,205,0.22),transparent)]" />
          </div>
          {/* the ceiling: light strips and cable trays */}
          <div aria-hidden="true" className="absolute inset-x-[-10%] top-[13%] h-[1600px] origin-top [transform:rotateX(-90deg)]">
            <div className="wk-ceiling" />
          </div>
          {/* the far end: a lit doorway, its glow and the haze in front of it */}
          <div aria-hidden="true" className="absolute left-1/2 top-[42%] h-[300px] w-[250px] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(23,180,205,0.35)_60%,rgba(49,87,246,0.35))] shadow-[0_0_80px_20px_rgba(23,180,205,0.35)]" style={{ transform: "translate(-50%,-50%) translateZ(-1500px)" }} />
          <div aria-hidden="true" className="wk-glow absolute left-1/2 top-[42%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.3),rgba(49,87,246,0.14)_45%,transparent)] blur-2xl" style={{ transform: "translate(-50%,-50%) translateZ(-1500px)" }} />
          <div aria-hidden="true" className="wk-haze absolute left-1/2 top-[44%] h-[420px] w-[900px] bg-[radial-gradient(closest-side,rgba(249,247,240,0.8),transparent)] blur-xl" style={{ transform: "translate(-50%,-50%) translateZ(-900px)" }} />

          {/* the two rows of racks */}
          {RACK_Z.map((z, i) => (
            <Rack key={`l${i}`} side="l" z={z} i={i} reduced={reduced} />
          ))}
          {RACK_Z.map((z, i) => (
            <Rack key={`r${i}`} side="r" z={z} i={i} reduced={reduced} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default function WorkArchiveHero({ lang, t }) {
  const reduced = useReducedMotion();
  const h = t.hero;
  const ref = useRef(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 50, damping: 18 });
  const sy = useSpring(py, { stiffness: 50, damping: 18 });
  const ry = useTransform(sx, [-1, 1], [-4, 4]);
  const rx = useTransform(sy, [-1, 1], [2.5, -2.5]);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const walk = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const onMove = (e) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };
  const up = (i) => ({ initial: reduced ? false : { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE } });

  return (
    <header ref={ref} onPointerMove={onMove} onPointerLeave={onLeave} className="relative overflow-hidden px-5 pb-10 pt-24 md:px-10 md:pb-14 md:pt-24">
      {/* atmosphere: cool light; the site's canvas does the rest */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -right-[8%] -top-[30%] h-[90%] w-[54%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.09),transparent)] blur-2xl" />
        <span className="absolute -left-[10%] bottom-[-20%] h-[60%] w-[40%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.06),transparent)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        {/* the top edge */}
        <motion.div {...up(0)} className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-foreground/12 pb-3">
          <div className="flex items-baseline gap-6">
            <BackToHome lang={lang} />
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{t.kicker}</p>
          </div>
          <p className={cn(MONO, "text-muted-foreground")}>{h.selected}</p>
          <p className={cn(MONO, "hidden text-muted-foreground md:block")}>{h.discipline}</p>
        </motion.div>

        <div className="mt-10 grid gap-10 md:mt-12 lg:grid-cols-12 lg:items-center lg:gap-x-8">
          {/* the statement, beside the door */}
          <div className="lg:col-span-6 lg:-mt-12">
            <motion.h1 {...up(1)} className="font-heading text-[clamp(2.9rem,5.6vw,5.8rem)] font-bold leading-[0.95] tracking-[-0.04em] text-foreground [text-wrap:balance]">
              {h.h1a} <span className="text-accent">{h.h1b}</span>
            </motion.h1>
            <motion.p {...up(2)} className="mt-8 max-w-[40ch] text-[16px] leading-[1.6] text-foreground/80 md:text-[18px]">
              {t.intro}
            </motion.p>
            {/* the line of state: three marks lighting up in sequence */}
            <motion.div {...up(3)} className="mt-10 max-w-[520px]" role="list" aria-label={h.stateLabel}>
              <div className="relative h-px bg-foreground/15">
                <motion.span aria-hidden="true" initial={reduced ? false : { scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: reduced ? 0 : 1.4, delay: 0.5, ease: EASE }} className="absolute inset-y-0 left-0 w-full origin-left bg-accent/60" />
              </div>
              <ol className="mt-3 grid grid-cols-3 gap-4">
                {h.marks.map((w, i) => (
                  <li key={w} className="flex items-center gap-2.5">
                    <motion.span aria-hidden="true" initial={reduced ? false : { backgroundColor: "rgba(49,87,246,0)" }} animate={{ backgroundColor: "rgba(49,87,246,1)" }} transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.9 + i * 0.35 }} className="h-[7px] w-[7px] shrink-0 border border-accent" />
                    <span className={cn(MONO, "text-foreground/75")}>{w}</span>
                  </li>
                ))}
              </ol>
            </motion.div>
          </div>

          {/* the hall */}
          <motion.div {...up(2)} aria-hidden="true" className="lg:col-span-6">
            <Hall reduced={Boolean(reduced)} rx={rx} ry={ry} walk={walk} />
          </motion.div>
        </div>
      </div>
    </header>
  );
}
