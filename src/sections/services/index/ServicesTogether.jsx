import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import Reveal from "@/components/Reveal";
import { EASE, KICKER, MONO, TONES } from "./servicesIndexBits";

/**
 * Act 03 — services are entry points, not compartments. Four independent
 * surfaces, each carrying one generic word, slide together into one
 * solid stacked piece as the section comes into view; a cobalt frame
 * closes around the result. Disciplines combine without fragmenting the
 * solution. No service names, no nodes, no arrows.
 */
const SCATTER = [
  { x: -150, y: -110, r: -9 },
  { x: 150, y: -80, r: 7 },
  { x: -130, y: 100, r: 6 },
  { x: 140, y: 90, r: -7 },
];
const STACK = [
  { x: -54, y: -54, r: 0 },
  { x: -18, y: -18, r: 0 },
  { x: 18, y: 18, r: 0 },
  { x: 54, y: 54, r: 0 },
];
const TONE = ["white", "cyan", "white", "cobalt"];

export default function ServicesTogether({ t }) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-25% 0px" });
  const done = reduced || inView;
  const g = t.together;
  return (
    <section aria-labelledby="sv-together" className="relative overflow-hidden px-5 py-20 md:px-10 md:py-28">
      {/* a slightly deeper, cooler field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(49,87,246,0.05),rgba(23,180,205,0.07))]" />
      <div className="relative mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-10">
        <Reveal className="lg:col-span-5">
          <p className={KICKER}>{g.kicker}</p>
          <h2 id="sv-together" className="mt-5 max-w-[16ch] font-heading text-[clamp(1.9rem,3.2vw,2.9rem)] font-bold leading-[1.05] tracking-[-0.03em] text-foreground [text-wrap:balance]">
            {g.title}
          </h2>
          <p className="mt-6 max-w-[52ch] text-[16px] leading-[1.65] text-foreground/80 md:text-[17px]">{g.text}</p>
        </Reveal>

        {/* the composition: four surfaces become one piece */}
        <div ref={ref} aria-hidden="true" className="lg:col-span-7">
          <div className="relative mx-auto h-[380px] w-full max-w-[560px]">
            {/* the frame that closes around the assembled piece */}
            <motion.span
              initial={reduced ? false : { opacity: 0, scale: 1.06 }}
              animate={done ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 1.1, ease: EASE }}
              className="absolute h-[290px] w-[370px] rounded-[24px] border border-accent/50" style={{ left: "calc(50% - 185px)", top: "calc(50% - 145px)" }}
            >
              <span className="absolute -left-px -top-px h-3 w-3 border-l-2 border-t-2 border-accent" />
              <span className="absolute -right-px -top-px h-3 w-3 border-r-2 border-t-2 border-accent" />
              <span className="absolute -bottom-px -left-px h-3 w-3 border-b-2 border-l-2 border-accent" />
              <span className="absolute -bottom-px -right-px h-3 w-3 border-b-2 border-r-2 border-accent" />
            </motion.span>
            {g.words.map((w, i) => (
              <motion.span
                key={w}
                initial={reduced ? false : { x: SCATTER[i].x, y: SCATTER[i].y, rotate: SCATTER[i].r, opacity: 0.85 }}
                animate={done ? { x: STACK[i].x, y: STACK[i].y, rotate: 0, opacity: 1 } : {}}
                transition={{ duration: 1.1, delay: 0.15 + i * 0.12, ease: EASE }}
                className={cn("absolute flex h-[150px] w-[230px] items-start rounded-[16px] border p-3.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_40px_70px_-40px_rgba(49,87,246,0.45)] backdrop-blur-[8px]", TONES[TONE[i]])}
                style={{ zIndex: i + 1, left: "calc(50% - 115px)", top: "calc(50% - 75px)" }}
              >
                <span className={cn(MONO, TONE[i] === "cobalt" ? "text-white" : "text-foreground/80")}>{w}</span>
              </motion.span>
            ))}
            <motion.span
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={done ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.4, ease: EASE }}
              className={cn(MONO, "absolute bottom-0 left-0 right-0 text-center text-accent")}
            >
              {g.result}
            </motion.span>
          </div>
        </div>
      </div>
    </section>
  );
}
