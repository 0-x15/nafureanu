import { usePageMeta } from "@/lib/seo";
import { PROJECTS } from "@/data/projects";
import { STRINGS, langPath, otherLang } from "@/i18n";
import CaseRow from "@/components/CaseRow";
import PracticeRow from "@/components/PracticeRow";
import CtaBand from "@/components/CtaBand";

export default function Work({ lang = "es" }) {
  const s = STRINGS[lang];
  usePageMeta({
    lang,
    title: s.meta.work.title,
    description: s.meta.work.description,
    path: langPath(lang, "/work"),
    alternatePath: langPath(otherLang(lang), "/work"),
  });

  const featured = PROJECTS.filter((p) => p.featured);
  const secondary = PROJECTS.filter((p) => !p.featured);

  return (
    <>
      <header className="px-5 pt-36 md:px-10 md:pt-48">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
          <span className="text-[#E63946]">{s.workPage.kicker.split(" — ")[0]}</span> —{" "}
          {s.workPage.kicker.split(" — ")[1]}
        </p>
        <h1 className="mt-8 font-heading text-6xl font-bold uppercase tracking-[-0.02em] md:text-8xl">
          {s.workPage.h1}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-[1.7] text-[#5C5C58] md:text-lg">
          {s.workPage.intro}
        </p>
      </header>
      <section className="px-5 pb-24 md:px-10 md:pb-36" aria-label="Case studies">
        {featured.map((p, i) => (
          <CaseRow key={p.slug} project={p} index={i} lang={lang} />
        ))}
        <div className="mt-16 border-t border-[#E0E0DE] pt-2">
          {secondary.map((p) => (
            <PracticeRow key={p.slug} project={p} lang={lang} />
          ))}
        </div>
      </section>
      <CtaBand
        kicker={s.workPage.cta.kicker}
        title={s.workPage.cta.title}
        note={s.workPage.cta.note}
      />
    </>
  );
}