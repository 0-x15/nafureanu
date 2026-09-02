import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { STRINGS, langPath } from "@/i18n";
import ProblemFragment from "./ProblemFragment";

/**
 * Conversion moment — from confusion to clarity. Real business
 * problems appear fragmented across the canvas; as the visitor
 * scrolls they drift into alignment and dissolve, the question
 * "¿no sabes qué tecnología necesitas?" surfaces, and the section
 * resolves into the final statement and CTA. One scroll-driven
 * transformation — not an interactive selector.
 */
export default function ProblemCanvas({ lang = "es" }) {
  const c = STRINGS[lang].build.close;
  const ref = useRef(null);
  const { scrollYProgress: p } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  /* Ambient field — appears mid-story, clears as it resolves */
  const tintOp = useTransform(p, [0.05, 0.3, 0.6, 0.85], [0, 0.9, 0.5, 0.15]);
  const stripOp = useTransform(p, [0.1, 0.35, 0.5], [0, 0.5, 0]);

  /* The question — ENTER fast, HOLD locked, EXIT clean, with a
     dead zone on each side so it never overlaps another state */
  const qOp = useTransform(p, [0.56, 0.62, 0.72, 0.78], [0, 1, 1, 0]);
  const qY = useTransform(p, [0.56, 0.62, 0.72, 0.78], [24, 0, 0, -28]);
  const qBlurV = useTransform(p, [0.56, 0.62, 0.72, 0.78], [2.5, 0, 0, 2]);
  const qBlur = useMotionTemplate`blur(${qBlurV}px)`;

  /* The resolution — enters fast, then holds until the section ends */
  const fOp = useTransform(p, [0.82, 0.88], [0, 1]);
  const fY = useTransform(p, [0.82, 0.88], [40, 0]);
  const fBlurV = useTransform(p, [0.82, 0.88], [2.5, 0]);
  const fBlur = useMotionTemplate`blur(${fBlurV}px)`;

  /* CTA and quiet closing line — settle after the headline */
  const cOp = useTransform(p, [0.86, 0.92], [0, 1]);
  const cY = useTransform(p, [0.86, 0.93], [18, 0]);
  const tOp = useTransform(p, [0.9, 0.96], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative h-[190vh] bg-background"
      aria-label={c.title}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* ambient field — soft cobalt, a touch of violet */}
        <motion.div
          style={{ opacity: tintOp }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
        >
          <span className="absolute left-1/2 top-1/2 h-[70vh] w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.10),transparent)]" />
          <span className="absolute bottom-[8%] left-[12%] h-[40vh] w-[40vw] rounded-full bg-[radial-gradient(closest-side,rgba(139,124,246,0.09),transparent)]" />
        </motion.div>

        {/* one glass strip crossing the composition */}
        <motion.div
          style={{ opacity: stripOp }}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[24vh] w-[130vw] -translate-x-1/2 -translate-y-1/2 -rotate-[3deg] border-y border-white/50 bg-white/20 backdrop-blur-md"
        />

        {/* the problems — fragments drifting from chaos to order */}
        {c.fragments.map((text, i) => (
          <ProblemFragment key={text} text={text} index={i} progress={p} />
        ))}

        {/* the question */}
        <motion.p
          style={{ opacity: qOp, y: qY, filter: qBlur }}
          className="absolute z-[5] max-w-xl px-6 text-center font-heading text-2xl font-bold tracking-[-0.02em] text-foreground/85 md:text-4xl"
        >
          {c.question}
        </motion.p>

        {/* the resolution */}
        <motion.div
          style={{ opacity: fOp, y: fY, filter: fBlur }}
          className="relative z-10 px-5 text-center"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
            {c.kicker}
          </p>
          <h3 className="mx-auto mt-5 max-w-3xl font-heading text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground md:text-6xl">
            {c.title}
          </h3>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-lg">
            {c.copy}
          </p>
          <motion.div style={{ opacity: cOp, y: cY }} className="mt-10">
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-10">
              <Link
                to={langPath(lang, "/contact")}
                className="group inline-flex items-center gap-2.5 bg-accent px-7 py-3.5 text-sm font-medium text-accent-foreground transition-colors hover:bg-[#1E44D6] md:text-base"
              >
                {c.cta}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </Link>
              <Link
                to={langPath(lang, "/services")}
                className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {c.all}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </Link>
            </div>
            <motion.p
              style={{ opacity: tOp }}
              className="mt-14 font-mono text-[10px] tracking-[0.08em] text-muted-foreground/55"
            >
              {c.trust}
            </motion.p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}