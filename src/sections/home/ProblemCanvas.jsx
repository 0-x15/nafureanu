import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import ActionLink from "@/components/ActionLink";
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
  const tintOp = useTransform(p, [0, 0.35, 0.62, 0.85], [0.3, 0.9, 0.5, 0]);
  const stripOp = useTransform(p, [0.1, 0.35, 0.55], [0, 0.5, 0]);

  /* Glass-plane parallax — nearly imperceptible drift, far slower than the text */
  const p1Y = useTransform(p, [0, 1], ["3vh", "-3vh"]);
  const p1R = useTransform(p, [0, 1], [-6, -3]);
  const p2Y = useTransform(p, [0, 1], ["-2vh", "4vh"]);
  const p2X = useTransform(p, [0, 1], ["-1vw", "2vw"]);
  const p3Y = useTransform(p, [0, 1], ["4vh", "-2vh"]);
  const planesO = useTransform(p, [0, 0.7, 0.92], [1, 1, 0.55]);

  /* The question */
  const qOp = useTransform(p, [0.32, 0.44, 0.56, 0.66], [0, 1, 1, 0]);
  const qY = useTransform(p, [0.32, 0.66], [36, -44]);
  const qBlurV = useTransform(p, [0.32, 0.44, 0.56, 0.66], [10, 0, 0, 10]);
  const qBlur = useMotionTemplate`blur(${qBlurV}px)`;

  /* The resolution */
  const fOp = useTransform(p, [0.64, 0.8], [0, 1]);
  const fY = useTransform(p, [0.64, 0.84], [48, 0]);
  const fBlurV = useTransform(p, [0.64, 0.82], [10, 0]);
  const fBlur = useMotionTemplate`blur(${fBlurV}px)`;

  /* CTA and quiet closing line */
  const cOp = useTransform(p, [0.8, 0.92], [0, 1]);
  const cY = useTransform(p, [0.8, 0.95], [22, 0]);
  const tOp = useTransform(p, [0.9, 0.99], [0, 1]);

  return (
    <section
      ref={ref}
      className="relative h-[220vh] bg-background"
      aria-label={c.title}
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* ambient light — cobalt heart, pale cyan edge, distant violet */}
        <motion.div
          style={{ opacity: tintOp }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0"
        >
          <span className="absolute left-1/2 top-1/2 h-[80vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.17),transparent)]" />
          <span className="absolute right-[2%] top-[6%] h-[48vh] w-[44vw] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.16),transparent)]" />
          <span className="absolute bottom-[4%] left-[6%] h-[44vh] w-[42vw] rounded-full bg-[radial-gradient(closest-side,rgba(139,124,246,0.13),transparent)]" />
        </motion.div>

        {/* ambient glass architecture — oversized planes drifting behind everything */}
        <motion.div
          style={{ opacity: planesO }}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-[1]"
        >
          {/* plane 1 — broad horizontal glass, upper-right, catching light */}
          <motion.div
            style={{ y: p1Y, rotate: p1R }}
            className="absolute right-[-8%] top-[6%] h-[32vh] w-[56vw] rounded-[40px] border border-white/45 bg-white/[0.18] shadow-[0_70px_130px_-65px_rgba(12,18,32,0.35)] backdrop-blur-[30px]"
          >
            <span className="absolute left-[8%] top-[16%] h-px w-[72%] bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.9),rgba(43,89,255,0.5),transparent)] blur-[1px]" />
          </motion.div>

          {/* plane 2 — distant, bottom-left, faint cobalt within the material */}
          <motion.div
            style={{ y: p2Y, x: p2X }}
            className="absolute bottom-[0%] left-[-7%] h-[38vh] w-[55vw] rounded-[48px] border border-white/30 bg-[linear-gradient(130deg,rgba(255,255,255,0.19),rgba(43,89,255,0.09),rgba(255,255,255,0.07))] backdrop-blur-[40px]"
          >
            <span className="absolute bottom-[22%] right-[10%] h-px w-[55%] bg-[linear-gradient(to_right,transparent,rgba(43,89,255,0.38),transparent)] blur-[2px]" />
          </motion.div>

          {/* plane 3 — narrow diagonal catcher of light, mid-right */}
          <motion.div
            style={{ y: p3Y, rotate: -12 }}
            className="absolute left-[38%] top-[44%] h-[16vh] w-[50vw] rounded-full border border-white/25 bg-white/[0.10] backdrop-blur-[24px]"
          >
            <span className="absolute left-[15%] top-[45%] h-px w-[65%] bg-[linear-gradient(to_right,transparent,rgba(255,255,255,0.65),transparent)] blur-[1px]" />
          </motion.div>
        </motion.div>

        {/* diagonal glass strip — a quiet member of the same material system */}
        <motion.div
          style={{ opacity: stripOp }}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-[1] h-[14vh] w-[120vw] -translate-x-1/2 -translate-y-1/2 -rotate-[3deg] border-y border-white/38 bg-white/[0.14] backdrop-blur-md"
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
              <ActionLink
                to={langPath(lang, "/contact")}
                icon="right"
                className="md:text-base"
              >
                {c.cta}
              </ActionLink>
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