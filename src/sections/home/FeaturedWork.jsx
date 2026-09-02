import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { STRINGS, langPath } from "@/i18n";
import SophiaChapter from "./work/SophiaChapter";
import FivoChapter from "./work/FivoChapter";
import TransitionBridge from "./work/TransitionBridge";

/**
 * Featured work — two art-directed proof chapters. SophIA is the
 * business-operations billboard on warm stone; Fivo is the advanced
 * infrastructure chapter on deep navy, reached through a light
 * transition that carries operations into infrastructure.
 */
export default function FeaturedWork({ lang = "es" }) {
  const s = STRINGS[lang].workSection;

  return (
    <section aria-label={s.title}>
      {/* chapter 01 environment — warm stone */}
      <div className="bg-[#F3F0E8]">
        <div className="mx-auto max-w-[1440px] px-5 pt-20 md:px-10 md:pt-28">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
              {s.kicker}
            </p>
            <h2 className="mt-4 font-heading text-3xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
              {s.title}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-[#5A6070] md:text-base">
              {s.intro}
            </p>
          </Reveal>
        </div>
        <SophiaChapter lang={lang} />
      </div>

      {/* operations → infrastructure */}
      <TransitionBridge />

      {/* chapter 02 environment — deep navy */}
      <FivoChapter lang={lang} />

      {/* restrained continuation */}
      <div className="bg-[#0B1220]">
        <div className="mx-auto max-w-[1440px] px-5 pb-20 md:px-10 md:pb-24">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-white/40">
              {s.moreKicker}
            </p>
            <Link
              to={langPath(lang, "/work")}
              className="group mt-3 inline-flex items-center gap-2 font-heading text-xl font-bold tracking-tight text-white md:text-2xl"
            >
              {s.moreLink}
              <ArrowUpRight className="h-5 w-5 text-[#8FA5E8] transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}