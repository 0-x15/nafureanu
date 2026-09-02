import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import Magnetic from "@/components/Magnetic";
import { langPath } from "@/i18n";

export default function CtaBand({
  lang = "es",
  kicker = "04 — INITIATION",
  title = "Have a process that eats hours?",
  note = "Tell us what slows your business down. We'll tell you how to remove it.",
}) {
  return (
    <section className="relative overflow-hidden bg-[#05060A] px-5 py-28 text-[#F0EFEA] md:px-10 md:py-44">
      {/* Ambient light fields */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 -top-40 h-[480px] w-[480px] rounded-full bg-[#3D7BFF]/10 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-48 -left-32 h-[420px] w-[420px] rounded-full bg-[#8E7BFF]/10 blur-[130px]"
      />
      <div className="relative mx-auto max-w-[1440px]">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8A93A6]">
          <span className="text-[#3D7BFF]">{kicker}</span>
        </p>
        <Reveal variant="mask">
          <h2 className="mt-8 max-w-5xl font-heading text-4xl font-bold leading-[1.05] tracking-[-0.02em] md:text-7xl">
            {title}
          </h2>
        </Reveal>
        <div className="mt-12 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-md text-sm text-[#A6AEBD] md:text-base">{note}</p>
          <Magnetic>
            <Link
              to={langPath(lang, "/contact")}
              data-cursor="start"
              className="inline-flex items-center gap-3 bg-[#F0EFEA] px-9 py-5 font-mono text-xs uppercase tracking-[0.15em] text-[#07090E] transition-colors hover:bg-[#3D7BFF] hover:text-[#F0EFEA]"
            >
              Start a project <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}