import { usePageMeta } from "@/lib/seo";
import { PROJECTS } from "@/data/projects";
import { STRINGS, langPath, otherLang } from "@/i18n";
import ProjectBlock from "@/components/ProjectBlock";
import PracticeRow from "@/components/PracticeRow";
import CtaBand from "@/components/CtaBand";

const FEATURED = ["sophia", "fivo"];

export default function Work({ lang = "es" }) {
  const s = STRINGS[lang];
  usePageMeta({
    lang,
    title: s.meta.work.title,
    description: s.meta.work.description,
    path: langPath(lang, "/work"),
    alternatePath: langPath(otherLang(lang), "/work"),
  });

  const featured = FEATURED.map((slug) =>
    PROJECTS.find((p) => p.slug === slug)
  );
  const practice = PROJECTS.filter((p) => !FEATURED.includes(p.slug));

  return (
    <>
      <header className="bg-background px-5 pt-36 md:px-10 md:pt-48">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {s.workPage.kicker}
        </p>
        <h1 className="mt-5 font-heading text-5xl font-bold tracking-[-0.03em] text-foreground md:text-8xl">
          {s.workPage.h1}
        </h1>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
          {s.workPage.intro}
        </p>
      </header>

      <div className="mt-12 md:mt-16">
        <ProjectBlock
          project={featured[0]}
          lang={lang}
          environment="dark"
          viewCase={s.workSection.viewCase}
        />
        <ProjectBlock
          project={featured[1]}
          lang={lang}
          environment="light"
          flip
          viewCase={s.workSection.viewCase}
        />
      </div>

      <section className="bg-background px-5 py-20 md:px-10 md:py-28" aria-label={s.workPage.practiceKicker}>
        <div className="mx-auto max-w-[1440px]">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {s.workPage.practiceKicker}
          </p>
          <div className="mt-10 border-t border-border">
            {practice.map((p) => (
              <PracticeRow key={p.slug} project={p} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        lang={lang}
        kicker={s.workPage.cta.kicker}
        title={s.workPage.cta.title}
        note={s.workPage.cta.note}
        button={s.nav.start}
      />
    </>
  );
}