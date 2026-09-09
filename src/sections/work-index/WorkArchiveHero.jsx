import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import BackToHome from "@/components/work/BackToHome";
import { EASE, MONO } from "./workBits";

/**
 * Act 01 — the archive opens. Metadata along the top edge, the
 * statement with its last word in cobalt, one sentence — and the
 * production register: ten rows of segments on a technical ruler that
 * resolve through three states — drafted (outlines), built (graphite),
 * operating (the last segments and one whole row turn cobalt). On
 * entry the register plays the sequence once; then the state rail
 * under it is interactive (hover, focus, click). No diagram, no project.
 */
/* The register: ten rows of segments on a technical ruler. Each segment
   is [start, length] in field units; joints are the gaps between them. */
const ROWS = [
  [[0, 96], [112, 48], [176, 168]],
  [[0, 40], [56, 200], [272, 72]],
  [[0, 152], [168, 32], [216, 128]],
  [[0, 72], [88, 88], [192, 40], [248, 96]],
  [[0, 344]],
  [[0, 56], [72, 136], [224, 120]],
  [[0, 184], [200, 64], [280, 64]],
  [[0, 32], [48, 96], [160, 184]],
  [[0, 120], [136, 40], [192, 152]],
  [[0, 88], [104, 240]],
];
const FIELD_X = 64;
const ROW_H = 30;
const ROW_Y = 84;

/** One segment of the register, resolving with the stage. */
function Segment({ x, y, w, row, k, stage, reduced }) {
  // which segments turn cobalt when operating: the last of each row, and the whole live row
  const liveRow = row === 4;
  const last = k === ROWS[row].length - 1;
  const fill = stage >= 2 && (liveRow || last) ? "#3157F6" : stage >= 1 ? "rgba(27,31,42,0.55)" : "rgba(27,31,42,0)";
  const stroke = stage >= 1 ? "rgba(27,31,42,0)" : "rgba(27,31,42,0.5)";
  return (
    <motion.rect
      initial={false}
      x={x} y={y} width={w} height={liveRow ? 10 : 6}
      animate={{ fill, stroke }}
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : (x / 760) * 0.5 + row * 0.03, ease: EASE }}
      strokeWidth="1"
      strokeDasharray={stage >= 1 ? undefined : "4 3"}
    />
  );
}

function Field({ stage, words, marks, reduced }) {
  return (
    <svg viewBox="0 0 760 470" aria-hidden="true" className="h-auto w-full overflow-visible">
      {/* the ruler */}
      <g stroke="#1B1F2A" strokeOpacity="0.35">
        <line x1={FIELD_X} y1="40" x2="720" y2="40" strokeOpacity="0.25" />
        {Array.from({ length: 33 }, (_, i) => {
          const x = FIELD_X + i * 20.5;
          const major = i % 4 === 0;
          return <line key={i} x1={x} y1={major ? 30 : 35} x2={x} y2="40" />;
        })}
      </g>
      <g fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.4" fill="#1B1F2A" fillOpacity="0.5">
        {[0, 1, 2, 3, 4].map((i) => <text key={i} x={FIELD_X + i * 164} y="56" textAnchor={i === 4 ? "end" : "start"}>{String(i * 25).padStart(3, "0")}</text>)}
      </g>
      {/* row indices */}
      <g fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.4" fill="#1B1F2A" fillOpacity="0.45">
        {ROWS.map((_, i) => <text key={i} x="0" y={ROW_Y + i * ROW_H + 8}>{String(i + 1).padStart(2, "0")}</text>)}
      </g>
      {/* the segments */}
      {ROWS.map((segs, row) => {
        const y = ROW_Y + row * ROW_H + (row === 4 ? 0 : 2);
        return (
          <motion.g key={row} initial={reduced ? false : { opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.25 + row * 0.06, ease: EASE }}>
            {segs.map(([start, len], k) => <Segment key={k} x={FIELD_X + start * 1.9} y={y} w={len * 1.9} row={row} k={k} stage={stage} reduced={reduced} />)}
          </motion.g>
        );
      })}
      {/* the live row's end mark and rail */}
      <motion.g initial={false} animate={{ opacity: stage >= 2 ? 1 : 0 }} transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : 0.5 }}>
        <line x1={FIELD_X + 344 * 1.9 + 12} y1={ROW_Y + 4 * ROW_H + 5} x2="712" y2={ROW_Y + 4 * ROW_H + 5} stroke="#3157F6" strokeOpacity="0.45" />
        <circle cx="716" cy={ROW_Y + 4 * ROW_H + 5} r="3" fill="#FFFFFF" stroke="#3157F6" strokeWidth="1.2" />
      </motion.g>
      {/* the state words, top right — the current one lit */}
      <g fontFamily="var(--font-mono)" fontSize="10" letterSpacing="1.6">
        {words.map((w, i) => (
          <motion.g key={w} initial={false} transform={`translate(${472 + i * 96} 22)`} animate={{ opacity: i === stage ? 1 : 0.4 }} transition={{ duration: reduced ? 0 : 0.4 }}>
            <rect x="0" y="-8" width="7" height="7" fill={i <= stage ? "#3157F6" : "none"} stroke="#3157F6" strokeOpacity="0.8" />
            <text x="14" y="-1" fill={i === stage ? "#3157F6" : "#1B1F2A"}>{w.toUpperCase()}</text>
          </motion.g>
        ))}
      </g>
      {/* production marks along the bottom rule */}
      <line x1={FIELD_X} y1="404" x2="720" y2="404" stroke="#1B1F2A" strokeOpacity="0.25" />
      <motion.g initial={false} animate={{ opacity: stage >= 2 ? 1 : 0.35 }} transition={{ duration: reduced ? 0 : 0.6 }} fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1.6">
        {marks.map((w, i) => (
          <g key={w} transform={`translate(${FIELD_X + i * 150} 428)`}>
            <rect x="0" y="-5" width="6" height="6" fill={stage >= 2 ? "#3157F6" : "none"} stroke="#3157F6" strokeOpacity="0.8" />
            <text x="12" y="1" fill="#1B1F2A" fillOpacity="0.62">{w.toUpperCase()}</text>
          </g>
        ))}
      </motion.g>
    </svg>
  );
}

export default function WorkArchiveHero({ lang, t }) {
  const reduced = useReducedMotion();
  const h = t.hero;
  const [stage, setStage] = useState(reduced ? 2 : 0);
  const [played, setPlayed] = useState(Boolean(reduced));

  // the sequence plays once on entry, then the rail is the visitor's
  useEffect(() => {
    if (played) return undefined;
    const t1 = window.setTimeout(() => setStage(1), 900);
    const t2 = window.setTimeout(() => { setStage(2); setPlayed(true); }, 1900);
    return () => { window.clearTimeout(t1); window.clearTimeout(t2); };
  }, [played]);

  const up = (i) => ({ initial: reduced ? false : { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: 0.1 + i * 0.08, ease: EASE } });

  return (
    <header className="relative overflow-hidden px-5 pb-12 pt-24 md:px-10 md:pb-16 md:pt-24">
      {/* atmosphere: cool light and a vertical registration line */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -right-[8%] -top-[30%] h-[90%] w-[54%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.09),transparent)] blur-2xl" />
        <span className="absolute -left-[10%] bottom-[-20%] h-[60%] w-[40%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.06),transparent)] blur-2xl" />
        <span className="absolute bottom-0 left-[46%] top-[128px] hidden w-px bg-foreground/[0.08] lg:block" />
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

        <div className="relative mt-10 grid gap-10 md:mt-14 lg:grid-cols-12 lg:gap-x-8">
          {/* the statement */}
          <div className="lg:col-span-5 lg:flex lg:flex-col lg:justify-between">
            <motion.h1 {...up(1)} className="font-heading text-[clamp(2.75rem,5.4vw,5.4rem)] font-bold leading-[0.96] tracking-[-0.04em] text-foreground [text-wrap:balance]">
              {h.h1a} <span className="text-accent">{h.h1b}</span>
            </motion.h1>
            <motion.p {...up(3)} className="mt-8 max-w-[38ch] text-[16px] leading-[1.6] text-foreground/80 md:text-[18px] lg:mt-0">
              {t.intro}
            </motion.p>
          </div>

          {/* the production field and its state rail */}
          <motion.div {...up(2)} className="lg:col-span-7">
            <Field stage={stage} words={h.words} marks={h.marks} reduced={Boolean(reduced)} />
            <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-foreground/12 pt-3" role="group" aria-label={h.railLabel}>
              <p className={cn(MONO, "text-muted-foreground")}>{h.railLabel}</p>
              {h.words.map((w, i) => (
                <button
                  key={w}
                  type="button"
                  aria-pressed={stage === i}
                  onMouseEnter={() => played && setStage(i)}
                  onFocus={() => played && setStage(i)}
                  onClick={() => { setPlayed(true); setStage(i); }}
                  className={cn(MONO, "flex items-center gap-2 py-1 outline-none transition-colors focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-[#F9F7F0]", stage === i ? "text-accent" : "text-muted-foreground hover:text-foreground")}
                >
                  <span aria-hidden="true" className={cn("h-[7px] w-[7px] border border-accent", i <= stage ? "bg-accent" : "bg-transparent")} />
                  {w}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
