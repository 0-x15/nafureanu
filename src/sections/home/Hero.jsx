import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

const LINES = ["SOFTWARE", "THAT REMOVES", "WORK."];
const EASE = [0.22, 1, 0.36, 1];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-16 pt-32 md:px-10">
      <div className="pointer-events-none absolute inset-x-5 top-24 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-[#848482] md:inset-x-10">
        <span>Nafureanu — Software engineering studio</span>
        <span className="hidden md:inline">Systems / AI / Automation</span>
        <span className="hidden md:inline">V.2026</span>
      </div>

      <h1 className="font-heading text-[length:clamp(3.2rem,10.5vw,10.5rem)] font-bold uppercase leading-[0.92] tracking-[-0.02em]">
        {LINES.map((line, i) => (
          <span key={line} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: EASE }}
            >
              {i === 2 ? (
                <>
                  <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #121212" }}>
                    WORK
                  </span>
                  <span className="text-[#E63946]">.</span>
                </>
              ) : (
                line
              )}
            </motion.span>
          </span>
        ))}
      </h1>

      <div className="mt-10 flex flex-col gap-8 md:mt-14 md:flex-row md:items-end md:justify-between">
        <p className="max-w-md text-base leading-relaxed text-[#5C5C58] md:text-lg">
          We design and build the systems, automation and custom software that take repetitive
          work off your business.
        </p>
        <div className="flex flex-wrap items-center gap-6">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 bg-[#121212] px-7 py-4 font-mono text-xs uppercase tracking-[0.15em] text-[#F9F9F7] transition-colors hover:bg-[#E63946]"
          >
            Start a project <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/work"
            className="group font-mono text-xs uppercase tracking-[0.15em] text-[#121212]"
          >
            <span className="border-b border-[#121212] pb-1 transition-colors group-hover:border-[#E63946] group-hover:text-[#E63946]">
              See the work
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-14 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-[#848482]">
        <ArrowDown className="h-3 w-3 animate-bounce" aria-hidden="true" />
        Scroll
      </div>
    </section>
  );
}