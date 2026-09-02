import { motion } from "framer-motion";
import Reveal from "@/components/Reveal";
import SophIADashboard from "@/components/mockups/SophIADashboard";
import { STRINGS, langPath } from "@/i18n";
import { ProjectTag, ProofRow, CapLine, TechLine, Takeaway } from "./chapterBits";
import MatchingScene from "./MatchingScene";

const EASE = [0.22, 1, 0.36, 1];

/**
 * Chapter 01 — SophIA. A disciplined editorial case-study composition:
 * the introduction (headline + summary) sits above everything, and below
 * it one continuous left column carries the whole narrative — project
 * identity, proof, capabilities, commercial takeaway and technology —
 * paired with the art-directed product stage on the right.
 */
export default function SophiaChapter({ lang = "es" }) {
  const s = STRINGS[lang].workSection.sophia;
  const to = langPath(lang, "/work/sophia");

  return (
    <div className="relative overflow-hidden">
      {/* warm environment — richer than plain white */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute right-[-10%] top-[14%] h-[72%] w-[68%] rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.10),transparent)]" />
        <span className="absolute left-[-14%] top-[-10%] h-[58%] w-[58%] rounded-full bg-[radial-gradient(closest-side,rgba(214,197,163,0.4),transparent)]" />
        <span className="absolute bottom-[-18%] left-[22%] h-[46%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.75),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 pb-24 pt-12 md:px-10 md:pb-28 md:pt-16">
        {/* section introduction — headline + summary, above the composition */}
        <Reveal>
          <h3 className="max-w-4xl font-heading text-3xl font-bold leading-[1.05] tracking-[-0.03em] text-foreground md:text-5xl lg:text-6xl">
            {s.headlineA}
          </h3>
        </Reveal>
        <Reveal delay={0.06}>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#5A6070] md:text-lg">
            {s.copy}
          </p>
        </Reveal>

        {/* one two-column composition — narrative left, product right */}
        <div className="mt-10 flex flex-col md:mt-14 md:flex-row md:items-start md:gap-12">
          {/* left — the complete SophIA narrative, one continuous column */}
          <div className="contents md:block md:w-[36%] md:shrink-0">
            <Reveal variant="left" className="order-1">
              <ProjectTag index={s.index} name={s.name} role={s.role} />
            </Reveal>
            <Reveal className="order-2 mt-6 md:mt-7">
              <ProofRow items={s.proof} />
            </Reveal>
            <Reveal className="order-3 mt-6">
              <CapLine items={s.caps} />
            </Reveal>
            <Reveal className="order-5 mt-9 md:mt-10">
              <Takeaway kicker={s.showsKicker} text={s.shows} to={to} cta={s.cta} />
            </Reveal>
            <Reveal className="order-6 mt-5">
              <TechLine>{s.tech}</TechLine>
            </Reveal>
          </div>

          {/* right — product stage, one contained art-directed visual */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.9, ease: EASE }}
            className="relative order-4 mt-12 md:mt-0 md:flex-1"
          >
            {/* soft cobalt reflection under the stage */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-10 right-[6%] h-[45%] w-[70%] rounded-full bg-[radial-gradient(closest-side,rgba(43,89,255,0.12),transparent)]"
            />
            {/* warm glass surface hosting the product */}
            <div
              aria-hidden="true"
              className="absolute -inset-x-4 -top-4 -bottom-4 rounded-[24px] border border-white/70 bg-white/40 shadow-[0_48px_90px_-48px_rgba(12,18,32,0.28)] backdrop-blur-[6px] md:-inset-x-6 md:-top-6 md:-bottom-16"
            />
            <div className="relative">
              <SophIADashboard lang={lang} bare />
              {/* the system reacting — a product moment inside the stage */}
              <div className="absolute -bottom-11 right-3 hidden w-60 md:block lg:right-8">
                <MatchingScene lang={lang} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* mobile — the system reacting, below the stage */}
        <div className="mt-6 md:hidden">
          <MatchingScene lang={lang} />
        </div>
      </div>
    </div>
  );
}