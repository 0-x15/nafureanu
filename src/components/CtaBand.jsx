import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";

export default function CtaBand({
  kicker = "04 — INITIATION",
  title = "Have a process that eats hours?",
  note = "Tell us what slows your business down. We'll tell you how to remove it.",
}) {
  return (
    <section className="bg-[#121212] px-5 py-28 text-[#F9F9F7] md:px-10 md:py-44">
      <div className="mx-auto max-w-[1440px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
          <span className="text-[#E63946]">{kicker}</span>
        </p>
        <Reveal>
          <h2 className="mt-8 max-w-5xl font-heading text-4xl font-bold leading-[1.05] tracking-[-0.02em] md:text-7xl">
            {title}
          </h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-sm text-[#B9B9B5] md:text-base">{note}</p>
          <Magnetic>
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-[#F9F9F7] px-9 py-5 font-mono text-xs uppercase tracking-[0.15em] text-[#121212] transition-colors hover:bg-[#E63946] hover:text-[#F9F9F7]"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}