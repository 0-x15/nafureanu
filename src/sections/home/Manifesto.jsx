import { useMemo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { STRINGS } from "@/i18n";
import Reveal from "@/components/Reveal";

/** One statement word — lights up as the reader scrolls through it. */
function Word({ children, progress, range, accent }) {
  const opacity = useTransform(progress, range, [0.13, 1]);
  return (
    <motion.span style={{ opacity }} className={accent ? "text-[#3D7BFF]" : undefined}>
      {children}{" "}
    </motion.span>
  );
}

/**
 * Manifesto: the positioning statement illuminates word-by-word with
 * scroll — a reading experience, not a fade-in block.
 */
export default function Manifesto({ lang = "es" }) {
  const s = STRINGS[lang].manifesto;
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.82", "end 0.45"],
  });

  const words = useMemo(() => {
    const arr = [];
    s.statementA
      .split(" ")
      .filter(Boolean)
      .forEach((w) => arr.push({ text: w, accent: false }));
    s.statementHighlight
      .split(" ")
      .filter(Boolean)
      .forEach((w) => arr.push({ text: w, accent: true }));
    arr.push({ text: s.statementB, accent: false });
    return arr;
  }, [s]);

  return (
    <section className="px-5 py-28 md:px-10 md:py-48" aria-labelledby="manifesto-title">
      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8A93A6]">
        <span className="text-[#3D7BFF]">{s.kicker.split(" — ")[0]}</span> —{" "}
        {s.kicker.split(" — ")[1]}
      </p>

      <p
        ref={ref}
        id="manifesto-title"
        aria-label={`${s.statementA}${s.statementHighlight}${s.statementB}`}
        className="mt-12 max-w-6xl font-heading text-3xl font-bold leading-[1.16] tracking-[-0.02em] md:text-6xl"
      >
        {words.map((w, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;
          return (
            <Word key={`${w.text}-${i}`} progress={scrollYProgress} range={[start, end]} accent={w.accent}>
              {w.text}
            </Word>
          );
        })}
      </p>

      <div className="mt-20 grid border-t border-[#1E2530] md:grid-cols-3">
        {s.triad.map((t, i) => (
          <Reveal
            key={t.left}
            variant={i === 1 ? "scale" : "left"}
            delay={i * 0.08}
            className="border-b border-[#1E2530] py-8 md:border-b-0 md:border-l md:px-8 md:first:border-l-0 md:first:pl-0"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#8A93A6]">
              {t.left} =
            </p>
            <p className="mt-2 font-heading text-xl font-bold uppercase tracking-[-0.02em] text-[#F0EFEA] md:text-2xl">
              {t.right}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal variant="mask" className="mt-16 border-t border-[#1E2530] pt-10 md:mt-24">
        <p className="flex max-w-3xl items-baseline gap-4 font-heading text-2xl font-bold tracking-[-0.02em] text-[#F0EFEA] md:text-4xl">
          <span aria-hidden="true" className="h-2 w-2 shrink-0 self-center bg-[#3D7BFF]" />
          {s.automation}
        </p>
      </Reveal>
    </section>
  );
}