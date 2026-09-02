import { Link } from "react-router-dom";
import { PROJECTS } from "@/data/projects";
import { STRINGS, langPath } from "@/i18n";
import CaseRow from "@/components/CaseRow";
import PracticeRow from "@/components/PracticeRow";

export default function SelectedWork({ lang = "es" }) {
  const s = STRINGS[lang].workSection;
  const featured = PROJECTS.filter((p) => p.featured);
  const secondary = PROJECTS.filter((p) => !p.featured);

  return (
    <section className="px-5 py-24 md:px-10 md:py-40" aria-labelledby="work-title">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
            <span className="text-[#E63946]">{s.kicker.split(" — ")[0]}</span> — {s.kicker.split(" — ")[1]}
          </p>
          <h2
            id="work-title"
            className="mt-6 font-heading text-4xl font-bold tracking-[-0.02em] md:text-6xl"
          >
            {s.title}
          </h2>
        </div>
        <Link
          to={langPath(lang, "/work")}
          className="hidden shrink-0 font-mono text-xs uppercase tracking-[0.15em] transition-colors hover:text-[#E63946] md:inline-flex"
        >
          {s.all}
        </Link>
      </div>

      {featured.slice(0, 3).map((p, i) => (
        <CaseRow key={p.slug} project={p} index={i} lang={lang} />
      ))}

      <div className="mt-16 border-t border-[#E0E0DE] pt-2">
        {secondary.map((p) => (
          <PracticeRow key={p.slug} project={p} lang={lang} />
        ))}
      </div>
    </section>
  );
}