import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { langPath } from "@/i18n";
import { cn } from "@/lib/utils";
import ActionLink from "@/components/ActionLink";
import { EASE, MONO } from "./workBits";

/**
 * Act 03 — next. The closing looks forward: an empty plinth drawn in
 * hairlines, waiting for a piece; a registration
 * mark that follows the pointer across the field like a cursor looking
 * for the place; a light that sweeps the plinth on hover. Then the
 * statement and the door. Nothing about the projects already seen.
 */
function Plinth({ reduced }) {
  return (
    <svg viewBox="0 0 520 300" aria-hidden="true" className="h-auto w-full overflow-visible">
      <defs>
        <linearGradient id="wk-sweep" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#3157F6" stopOpacity="0" />
          <stop offset="0.5" stopColor="#3157F6" stopOpacity="0.35" />
          <stop offset="1" stopColor="#3157F6" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* the plinth: top face, two visible sides, in the site's oblique */}
      <motion.g initial={reduced ? false : { opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.9, ease: EASE }}>
        <polygon points="60,150 300,110 460,170 220,214" fill="rgba(255,255,255,0.55)" stroke="#1B1F2A" strokeOpacity="0.4" />
        <polygon points="60,150 220,214 220,262 60,198" fill="rgba(255,255,255,0.35)" stroke="#1B1F2A" strokeOpacity="0.4" />
        <polygon points="220,214 460,170 460,218 220,262" fill="rgba(49,87,246,0.06)" stroke="#1B1F2A" strokeOpacity="0.4" />
        {/* the reserved outline on the top face: where the piece would stand */}
        <polygon points="130,152 296,124 386,160 224,190" fill="none" stroke="#3157F6" strokeOpacity="0.75" strokeDasharray="5 4" />
        {/* the light that sweeps the top face */}
        <motion.rect x="-200" y="100" width="180" height="120" fill="url(#wk-sweep)" className="wk-sweep" transform="skewX(-20)" />
        {/* dimension ticks */}
        <g stroke="#1B1F2A" strokeOpacity="0.35">
          <line x1="60" y1="286" x2="220" y2="286" /><line x1="60" y1="282" x2="60" y2="290" /><line x1="220" y1="282" x2="220" y2="290" />
        </g>
      </motion.g>
    </svg>
  );
}

export default function WorkNext({ lang, t }) {
  const reduced = useReducedMotion();
  const n = t.next;
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
    <section aria-labelledby="work-next" className="group/next relative overflow-hidden border-t border-foreground/10 px-5 py-24 md:px-10 md:py-32">
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
              <div className="relative mx-auto max-w-[560px] pt-4 md:pt-6">
                <Plinth reduced={Boolean(reduced)} />
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
