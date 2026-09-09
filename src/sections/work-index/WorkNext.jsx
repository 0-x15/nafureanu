import { useRef, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import ActionLink from "@/components/ActionLink";
import { EASE, MONO } from "./workBits";

/**
 * Act 03 — next. The closing looks forward: a glass plinth with a
 * reserved outline on top, and above it the piece that does not exist
 * yet — a dashed body hanging from a guide, floating, tagged 05. When
 * the visitor enters the field the piece descends, lands in the
 * reserved place and turns solid cobalt; a registration mark follows
 * the pointer and a light sweeps the plinth. Then the statement and
 * the door. Nothing about the projects already seen.
 */
function Plinth({ reduced, hot, tag }) {
  const bob = reduced ? {} : { y: [0, -5, 0] };
  return (
    <svg viewBox="0 0 560 340" aria-hidden="true" className="h-auto w-full overflow-visible">
      <defs>
        <linearGradient id="wk-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3157F6" stopOpacity="0" />
          <stop offset="0.5" stopColor="#3157F6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3157F6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="wk-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.92" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="wk-side" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.55" />
          <stop offset="1" stopColor="#E9EDF7" stopOpacity="0.9" />
        </linearGradient>
        <filter id="wk-shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="18" stdDeviation="16" floodColor="#3157F6" floodOpacity="0.16" />
        </filter>
        <radialGradient id="wk-floor" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3157F6" stopOpacity="0.16" />
          <stop offset="1" stopColor="#3157F6" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* the floor light */}
      <ellipse cx="280" cy="292" rx="230" ry="26" fill="url(#wk-floor)" />

      {/* the plinth: glass top, two sides, a highlight on the front edge */}
      <motion.g initial={reduced ? false : { opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, ease: EASE }} filter="url(#wk-shadow)">
        <polygon points="80,178 320,134 490,196 250,240" fill="url(#wk-top)" stroke="#1B1F2A" strokeOpacity="0.28" />
        <polygon points="80,178 250,240 250,286 80,224" fill="url(#wk-side)" stroke="#1B1F2A" strokeOpacity="0.28" />
        <polygon points="250,240 490,196 490,242 250,286" fill="url(#wk-side)" stroke="#1B1F2A" strokeOpacity="0.28" />
        <polyline points="80,178 250,240 490,196" fill="none" stroke="#FFFFFF" strokeOpacity="0.9" />
        {/* the reserved outline on the top face, and its fill when the piece lands */}
        <motion.polygon points="150,180 318,148 410,182 242,214" initial={false} animate={{ fill: hot ? "rgba(49,87,246,0.12)" : "rgba(49,87,246,0)", stroke: hot ? "#3157F6" : "rgba(49,87,246,0.6)" }} transition={{ duration: reduced ? 0 : 0.6 }} strokeDasharray="5 4" />
        {/* the light that sweeps the top face */}
        <rect x="-200" y="120" width="180" height="130" fill="url(#wk-sweep)" className="wk-sweep" transform="skewX(-20)" />
      </motion.g>

      {/* the piece that does not exist yet: a dashed body hanging from a guide, floating; it lands on hover */}
      <motion.g initial={false} animate={hot ? { y: 46 } : bob} transition={hot ? { duration: reduced ? 0 : 0.8, ease: EASE } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}>
        <line x1="280" y1="0" x2="280" y2="86" stroke="#3157F6" strokeOpacity="0.45" />
        <circle cx="280" cy="0" r="3" fill="#FFFFFF" stroke="#3157F6" strokeWidth="1.2" />
        <motion.g initial={false} animate={{ opacity: hot ? 1 : 0.85 }}>
          <motion.polygon points="150,118 318,86 410,120 242,152" initial={false} animate={{ fill: hot ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.35)", stroke: hot ? "#3157F6" : "#1B1F2A", strokeOpacity: hot ? 1 : 0.55 }} transition={{ duration: reduced ? 0 : 0.6 }} strokeDasharray={hot ? "0 0" : "6 5"} />
          <motion.polygon points="150,118 242,152 242,166 150,132" initial={false} animate={{ fill: hot ? "rgba(49,87,246,0.9)" : "rgba(49,87,246,0)", stroke: hot ? "#3157F6" : "#1B1F2A", strokeOpacity: hot ? 1 : 0.35 }} transition={{ duration: reduced ? 0 : 0.6 }} strokeDasharray={hot ? "0 0" : "6 5"} />
          <motion.polygon points="242,152 410,120 410,134 242,166" initial={false} animate={{ fill: hot ? "rgba(35,72,232,0.9)" : "rgba(49,87,246,0)", stroke: hot ? "#2348E8" : "#1B1F2A", strokeOpacity: hot ? 1 : 0.35 }} transition={{ duration: reduced ? 0 : 0.6 }} strokeDasharray={hot ? "0 0" : "6 5"} />
          {/* the tag */}
          <g transform="translate(410 100)">
            <line x1="0" y1="0" x2="42" y2="-22" stroke="#1B1F2A" strokeOpacity="0.4" />
            <rect x="42" y="-38" width="46" height="18" fill="#FFFFFF" stroke="#1B1F2A" strokeOpacity="0.4" />
            <text x="65" y="-25" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="9.5" letterSpacing="1.4" fill="#3157F6">{tag}</text>
          </g>
        </motion.g>
      </motion.g>

      {/* dimension ticks */}
      <g stroke="#1B1F2A" strokeOpacity="0.35">
        <line x1="80" y1="318" x2="250" y2="318" /><line x1="80" y1="314" x2="80" y2="322" /><line x1="250" y1="314" x2="250" y2="322" />
      </g>
    </svg>
  );
}

export default function WorkNext({ lang, t }) {
  const reduced = useReducedMotion();
  const n = t.next;
  const [hot, setHot] = useState(false);
  const ref = useRef(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const cx = useSpring(mx, { stiffness: 80, damping: 22 });
  const cy = useSpring(my, { stiffness: 80, damping: 22 });
  const left = useTransform(cx, (v) => `${v * 100}%`);
  const top = useTransform(cy, (v) => `${v * 100}%`);
  const onMove = (e) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)));
    my.set(Math.min(1, Math.max(0, (e.clientY - r.top) / r.height)));
  };
  const io = { initial: reduced ? false : { opacity: 0, y: 12 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } };

  return (
    <section aria-labelledby="work-next" onPointerEnter={() => setHot(true)} onPointerLeave={() => setHot(false)} onFocusCapture={() => setHot(true)} onBlurCapture={() => setHot(false)} className="group/next relative overflow-hidden border-t border-foreground/10 px-5 py-24 md:px-10 md:py-32">
      {/* the stronger closing field: cobalt light, a cyan reflection */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -bottom-[40%] left-[14%] h-[120%] w-[72%] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.14),transparent)] blur-2xl" />
        <span className="absolute -right-[6%] top-[-10%] h-[70%] w-[36%] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.08),transparent)] blur-2xl" />
        <span className="absolute inset-x-0 top-[38%] h-px bg-foreground/[0.08]" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-10">
          {/* the empty plinth */}
          <motion.div {...io} transition={{ duration: 0.9, ease: EASE }} ref={ref} onPointerMove={onMove} className="relative lg:col-span-7">
            <p className={cn(MONO, "text-accent")}>{n.kicker}</p>
            <div className="relative mt-4">
              <div className="relative mx-auto max-w-[560px] pt-2 md:pt-4">
                <Plinth reduced={Boolean(reduced)} hot={hot} tag={n.tag} />
              </div>
              {/* the cursor: a registration mark looking for its place */}
              {!reduced && (
                <motion.span aria-hidden="true" style={{ left, top }} className="pointer-events-none absolute hidden h-[11px] w-[11px] -translate-x-1/2 -translate-y-1/2 border border-accent bg-[#F9F7F0] opacity-0 transition-opacity duration-500 group-hover/next:opacity-100 lg:block">
                  <span className="absolute left-1/2 top-1/2 h-px w-6 -translate-x-1/2 -translate-y-1/2 bg-accent/50" />
                  <span className="absolute left-1/2 top-1/2 h-6 w-px -translate-x-1/2 -translate-y-1/2 bg-accent/50" />
                </motion.span>
              )}
              <p className={cn(MONO, "mt-2 text-muted-foreground")}>{n.slot}</p>
            </div>
          </motion.div>

          {/* the statement and the door */}
          <motion.div {...io} transition={{ duration: 0.9, delay: 0.15, ease: EASE }} className="lg:col-span-5 lg:self-center">
            <h2 id="work-next" className="max-w-[16ch] font-heading text-[clamp(1.9rem,3.2vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground [text-wrap:balance]">{n.line}</h2>
            <p className="mt-6 max-w-[42ch] text-[16px] leading-[1.6] text-foreground/80 md:text-[17px]">{n.support}</p>
            <div className="mt-9">
              <ActionLink to={langPath(lang, "/contact")} size="lg">{n.cta}</ActionLink>
            </div>
            <p className={cn(MONO, "mt-5 text-muted-foreground")}>{n.reassure}</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
