import { useState, useRef, useLayoutEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import CrmProblemVisual from "./CrmProblemVisual";
import CrmSolutionBubble from "./CrmSolutionBubble";

const EASE = [0.22, 1, 0.36, 1];

function ProblemRow({ pain, i, active, onSelect, onTrack }) {
  return (
    <li className="border-t border-border first:border-t-0">
      <button
        type="button"
        aria-controls="crm-solutions"
        onMouseMove={onTrack}
        onMouseEnter={(e) => onSelect(i, e.currentTarget)}
        onFocus={(e) => onSelect(i, e.currentTarget)}
        onClick={(e) => onSelect(i, e.currentTarget)}
        className={cn(
          "flex w-full items-baseline gap-4 px-2 py-5 text-left transition-colors duration-300 md:py-6",
          active ? "bg-accent/[0.05]" : "hover:bg-accent/[0.04]"
        )}
      >
        <span className="font-mono text-[10px] text-accent">
          {String(i + 1).padStart(2, "0")}
        </span>
        <span
          className={cn(
            "flex-1 text-sm font-medium leading-snug transition-colors duration-300 md:text-base",
            active ? "text-foreground" : "text-foreground/75"
          )}
        >
          {pain.title}
        </span>
      </button>
    </li>
  );
}

/**
 * The problem — supporting visual LEFT, two-part headline RIGHT, then
 * ONE shared framed container with the 8 problems in 2 columns of 4.
 * The organic solution bubble lives INSIDE the same container as a
 * real hover overlay: it appears on hover/focus, disappears when the
 * state is left, and relocates — per-item anchors derived from the
 * hovered row — whenever a different problem is engaged.
 */
export default function CrmProblem({ c, lang = "es" }) {
  const p = c.problem;
  const [active, setActive] = useState(null);
  const [anchor, setAnchor] = useState({ x: 16, y: 10, w: 620 });
  const containerRef = useRef(null);
  const bubbleRef = useRef(null);
  const hoveredRef = useRef(null);
  const lastRef = useRef(0);

  /* Continuous horizontal follow — a spring-smoothed X motion value
     driven by pointer movement, starting from the per-item anchor. */
  const xMotion = useMotionValue(16);
  const xSpring = useSpring(xMotion, { stiffness: 450, damping: 42 });

  const select = (i, el) => {
    hoveredRef.current = el;
    setActive(i);
  };

  /* While the pointer travels inside an active row, the bubble tracks
     its container-local X with a fixed stand-off, clamped so it never
     leaves the shared container. Only used for mouse pointers. */
  const trackPointer = (e) => {
    const cEl = containerRef.current;
    const bEl = bubbleRef.current;
    if (!cEl || !bEl || active === null) return;
    const cR = cEl.getBoundingClientRect();
    const bW = bEl.offsetWidth || anchor.w;
    const localX = e.clientX - cR.left;
    const target = localX + 46;
    xMotion.set(Math.max(10, Math.min(target, cR.width - bW - 10)));
  };

  /* Per-item anchor: the bubble follows the hovered row's column and
     height, clamped so it never leaves the shared container. */
  useLayoutEffect(() => {
    if (active === null) return;
    lastRef.current = active;
    const cEl = containerRef.current;
    const bEl = bubbleRef.current;
    const row = hoveredRef.current;
    if (!cEl || !bEl || !row) return;

    const cW = cEl.offsetWidth;
    const cH = cEl.offsetHeight;
    const bW = Math.min(620, cW * (cW < 900 ? 0.88 : 0.46));
    const bH = bEl.offsetHeight;
    const cR = cEl.getBoundingClientRect();
    const rR = row.getBoundingClientRect();
    const rowCenter = rR.top - cR.top + rR.height / 2;

    const rowIdx = active % 4;
    const drift = [0, 26, 12, 40][rowIdx];
    const x = active >= 4 ? 14 + drift : cW - bW - 14 - drift;
    const y = Math.min(
      Math.max(rowCenter - bH * 0.4, 10),
      Math.max(cH - bH - 10, 10)
    );
    const bx = Math.max(10, Math.min(x, cW - bW - 10));
    setAnchor({ x: bx, y, w: bW });
    xMotion.set(bx);
  }, [active]);

  return (
    <section className="mx-auto max-w-[1440px] px-5 py-16 md:px-10 md:py-24">
      {/* Intro — visual LEFT, text RIGHT */}
      <div className="md:grid md:grid-cols-12 md:items-center md:gap-16">
        <Reveal className="md:col-span-7 md:col-start-6 md:row-start-1">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {p.kicker}
          </p>
          <h2 className="mt-5 font-heading text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.5rem]">
            {p.titleA}
          </h2>
          <h2 className="mt-6 font-heading text-3xl font-bold leading-[1.1] tracking-[-0.02em] text-foreground md:text-[2.5rem]">
            {p.titleB}
          </h2>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            {p.intro}
          </p>
        </Reveal>

        <div className="mt-14 md:col-span-5 md:col-start-1 md:row-start-1 md:mt-0">
          <Reveal variant="scale" delay={0.1}>
            <CrmProblemVisual lang={lang} />
          </Reveal>
        </div>
      </div>

      {/* ONE shared framed container — problems + bubble overlay */}
      <Reveal className="mt-16 md:mt-24">
        <div
          ref={containerRef}
          onMouseLeave={() => setActive(null)}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget)) setActive(null);
          }}
          className="relative overflow-hidden rounded-xl border border-border bg-card/80 shadow-[0_1px_2px_rgba(12,18,32,0.05),0_24px_60px_-24px_rgba(12,18,32,0.22)]"
        >
          {/* The 8 problems — 2 columns of 4 */}
          <div className="grid p-5 sm:p-8 md:grid-cols-2 md:gap-x-16 md:p-10">
            <ul className="border-b border-border md:border-b-0">
              {p.pains.slice(0, 4).map((pain, idx) => (
                <ProblemRow
                  key={pain.title}
                  pain={pain}
                  i={idx}
                  active={active === idx}
                  onSelect={select}
                  onTrack={trackPointer}
                />
              ))}
            </ul>
            <ul>
              {p.pains.slice(4).map((pain, idx) => (
                <ProblemRow
                  key={pain.title}
                  pain={pain}
                  i={idx + 4}
                  active={active === idx + 4}
                  onSelect={select}
                  onTrack={trackPointer}
                />
              ))}
            </ul>
          </div>

          {/* The solution bubble — inside the same container, over the list */}
          <motion.div
            ref={bubbleRef}
            className="pointer-events-none absolute left-0 top-0 z-20"
            style={{ width: anchor.w, x: xSpring }}
            initial={false}
            animate={{ y: anchor.y }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <motion.div
              id="crm-solutions"
              aria-live="polite"
              initial={false}
              animate={{
                opacity: active === null ? 0 : 1,
                scale: active === null ? 0.97 : 1,
                y: active === null ? 12 : 0,
              }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <CrmSolutionBubble
                pain={p.pains[active ?? lastRef.current]}
                howLabel={p.howLabel}
              />
            </motion.div>
          </motion.div>
        </div>
      </Reveal>
    </section>
  );
}