import { Link } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import { STRINGS, langPath } from "@/i18n";
import WorkPanel from "@/components/WorkPanel";
import PracticeRow from "@/components/PracticeRow";
import Reveal from "@/components/Reveal";

/**
 * Selected work: full-viewport cinematic panels for the featured systems,
 * followed by the secondary engineering practice rows.
 */
export default function SelectedWork({ lang = "es" }) {
  const s = STRINGS[lang].workSection;
  const featured = PROJECTS.filter((p) => p.featured);
  const secondary = PROJECTS.filter((p) => !p.featured);

  return (
    <section className="py-24 md:py-40" aria-labelledby="work-title">
      <div className="flex items-end justify-between gap-6 px-5 md:px-10">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8A93A6]">
            <span className="text-[#3D7BFF]">{s.kicker.split(" — ")[0]}</span> —{" "}
            {s.kicker.split(" — ")[1]}
          </p>
          <Reveal variant="mask">
            <h2
              id="work-title"
              className="mt-6 font-heading text-4xl font-bold tracking-[-0.02em] text-[#F0EFEA] md:text-6xl"
            >
              {s.title}
            </h2>
          </Reveal>
        </div>
        <Link
          to={langPath(lang, "/work")}
          className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.15em] text-[#8A93A6] transition-colors hover:text-[#3D7BFF] md:inline-flex"
        >
          {s.all}
        </Link>
      </div>

      <div className="mt-14 md:mt-20">
        {featured.slice(0, 3).map((p, i) => (
          <WorkPanel key={p.slug} project={p} index={i} lang={lang} />
        ))}
      </div>

      <div className="mt-4 px-5 md:px-10">
        <div className="border-t border-[#1E2530] pt-2">
          {secondary.map((p) => (
            <PracticeRow key={p.slug} project={p} lang={lang} />
          ))}
        </div>
      </div>
    </section>
  );
}