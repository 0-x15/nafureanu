import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";
import BackToHome from "@/components/work/BackToHome";
import { EASE, MONO } from "./workBits";

/**
 * Act 01 — the entrance of the exhibition. Metadata along the top
 * edge, the statement with its last word in cobalt, one sentence and
 * the line of state on the left; on the right the hall itself, seen
 * from its door: a floor
 * drawn in perspective, two walls of exhibition panels converging on a
 * light at the far end. The panels are solid, paper-white slabs with
 * real thickness, each divided into three segments — a header with a
 * cobalt mark, a body of rules, a footer of slots — mirrored faintly in
 * the floor. They rise one after another on entry and their marks
 * light up in sequence; the camera leans with the pointer and
 * scrolling walks you in, towards the pieces shown below. Nothing
 * hangs on them: the work is shown in the cards.
 */
const DEPTHS = [60, -220, -500, -780, -1060, -1340];

function Panel({ side, z, i, reduced }) {
  const left = side === "l";
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.3 + i * 0.12, ease: EASE }}
      style={{ z: left ? z : z - 200, rotateY: left ? 90 : -90, transformOrigin: "left center" }}
      className={cn("absolute bottom-[26%] h-[320px] w-[200px] [transform-style:preserve-3d]", left ? "left-[8%]" : "left-[92%]")}
    >
      {/* the face: three segments */}
      <div className="absolute inset-0 border border-foreground/15 bg-[#FCFBF8] shadow-[inset_0_1px_0_#fff,0_40px_70px_-40px_rgba(25,28,41,0.3)]">
        <div className={cn("absolute inset-x-0 top-0 h-[24%] border-b border-foreground/12 bg-[#F3F0E9]", left ? "text-left" : "text-right")}>
          <motion.span
            initial={reduced ? false : { backgroundColor: "rgba(49,87,246,0)" }}
            animate={{ backgroundColor: "rgba(49,87,246,1)" }}
            transition={{ duration: reduced ? 0 : 0.35, delay: reduced ? 0 : 1.3 + i * 0.16 }}
            className={cn("absolute top-5 h-[8px] w-12 border border-accent", left ? "left-5" : "right-5")}
          />
          <span className={cn("absolute bottom-5 h-px w-[40%] bg-foreground/25", left ? "left-5" : "right-5")} />
        </div>
        <div className="absolute inset-x-0 top-[24%] h-[50%] border-b border-foreground/12">
          <span className={cn("absolute top-[22%] h-[6px] w-[62%] bg-foreground/[0.08]", left ? "left-5" : "right-5")} />
          <span className={cn("absolute top-[40%] h-[6px] w-[48%] bg-foreground/[0.08]", left ? "left-5" : "right-5")} />
          <span className={cn("absolute top-[58%] h-[6px] w-[70%] bg-foreground/[0.08]", left ? "left-5" : "right-5")} />
          <span className={cn("absolute top-[76%] h-[6px] w-[36%] bg-accent/25", left ? "left-5" : "right-5")} />
        </div>
        <div className="absolute inset-x-0 bottom-0 h-[26%] bg-[#F7F5EF]">
          <span className={cn("absolute top-5 grid grid-cols-4 gap-1.5", left ? "left-5" : "right-5")}>
            <i className="h-[10px] w-[10px] border border-foreground/25 bg-white" />
            <i className="h-[10px] w-[10px] border border-foreground/25 bg-white" />
            <i className="h-[10px] w-[10px] border border-foreground/25 bg-white" />
            <i className="h-[10px] w-[10px] border border-accent/60 bg-accent/15" />
          </span>
          <span className={cn("absolute bottom-5 h-px w-[52%] bg-foreground/20", left ? "left-5" : "right-5")} />
        </div>
      </div>
      {/* the thickness of the slab, on the end that faces the door */}
      <div
        aria-hidden="true"
        className={cn("absolute top-0 h-full w-[14px] border-y border-foreground/15 bg-[#ECE9E0]", left ? "left-0 origin-left [transform:rotateY(-90deg)]" : "right-0 origin-right [transform:rotateY(90deg)]")}
      />
      {/* the reflection in the floor */}
      <div aria-hidden="true" className="absolute inset-x-0 top-full h-[50%] origin-top border-x border-foreground/10 bg-[linear-gradient(to_bottom,rgba(252,251,248,0.9),rgba(252,251,248,0))] opacity-40 [transform:scaleY(-1)]" />
    </motion.div>
  );
}

function Hall({ reduced, rx, ry, walk }) {
  return (
    <div className="relative mx-auto h-[205px] w-[346px] sm:h-[342px] sm:w-[576px] md:h-[380px] md:w-[640px] lg:ml-auto lg:mr-0 lg:h-[274px] lg:w-[461px] xl:h-[354px] xl:w-[595px] min-[1440px]:h-[380px] min-[1440px]:w-[640px]">
      {/* the scene is drawn at one size and scaled to the column */}
      <div className="absolute left-0 top-0 h-[460px] w-[640px] origin-top-left scale-[0.54] sm:scale-[0.9] md:scale-100 lg:scale-[0.72] xl:scale-[0.93] min-[1440px]:scale-100" style={{ perspective: "1000px", perspectiveOrigin: "50% 40%" }}>
        <motion.div style={reduced ? undefined : { rotateX: rx, rotateY: ry, z: walk }} className="absolute inset-0 [transform-style:preserve-3d]">
          {/* the floor, receding from the door to the far end */}
          <div aria-hidden="true" className="absolute inset-x-[-10%] top-[74%] h-[1600px] origin-top [transform:rotateX(-90deg)]">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(27,31,42,0.22)_1px,transparent_1px),linear-gradient(0deg,rgba(27,31,42,0.22)_1px,transparent_1px)] bg-[size:120px_120px] [mask-image:linear-gradient(to_bottom,rgba(0,0,0,0.95),transparent_78%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(40%_30%_at_50%_70%,rgba(49,87,246,0.18),transparent)]" />
          </div>
          {/* the light at the far end */}
          <div aria-hidden="true" className="absolute left-1/2 top-[40%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.24),rgba(23,180,205,0.08)_55%,transparent)] blur-2xl" style={{ transform: "translate(-50%,-50%) translateZ(-1500px)" }} />

          {/* the two walls */}
          {DEPTHS.map((z, i) => (
            <Panel key={`l${i}`} side="l" z={z} i={i} reduced={reduced} />
          ))}
          {DEPTHS.map((z, i) => (
            <Panel key={`r${i}`} side="r" z={z} i={i} reduced={reduced} />
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
