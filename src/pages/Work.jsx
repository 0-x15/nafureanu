import { usePageMeta } from "@/lib/seo";
import { PROJECTS } from "@/data/projects";
import { STRINGS, langPath, otherLang } from "@/i18n";
import WorkPanel from "@/components/WorkPanel";
import PracticeRow from "@/components/PracticeRow";
import CtaBand from "@/components/CtaBand";

/**
 * Work: featured systems as sticky cinematic panels that stack over
 * each other while scrolling, then the secondary practice rows.
 */
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
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#8A93A6]">
          <span className="text-[#3D7BFF]">{s.workPage.kicker.split(" — ")[0]}</span> —{" "}
          {s.workPage.kicker.split(" — ")[1]}
        </p>
        <h1 className="mt-8 font-heading text-6xl font-bold uppercase tracking-[-0.02em] text-[#F0EFEA] md:text-8xl">
          {s.workPage.h1}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-[1.7] text-[#A6AEBD] md:text-lg">
          {s.workPage.intro}
        </p>
      </header>

      <section className="mt-16 md:mt-24" aria-label="Case studies">
        {featured.map((p, i) => (
          <WorkPanel key={p.slug} project={p} index={i} lang={lang} stack />
        ))}
      </section>

      <section className="px-5 py-16 md:px-10 md:py-24" aria-label="Engineering practice">
        <div className="border-t border-[#1E2530] pt-2">
          {secondary.map((p) => (
            <PracticeRow key={p.slug} project={p} lang={lang} />
          ))}
        </div>
      </section>

      <CtaBand
        lang={lang}
        kicker={s.workPage.cta.kicker}
        title={s.workPage.cta.title}
        note={s.workPage.cta.note}
      />
    </>
  );
}