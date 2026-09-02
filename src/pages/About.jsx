import { usePageMeta } from "@/lib/seo";
import { STRINGS, langPath, otherLang } from "@/i18n";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

export default function About({ lang = "es" }) {
  const s = STRINGS[lang];
  const a = s.about;
  usePageMeta({
    lang,
    title: s.meta.about.title,
    description: s.meta.about.description,
    path: langPath(lang, "/about"),
    alternatePath: langPath(otherLang(lang), "/about"),
  });

  return (
    <>
      <header className="bg-background px-5 pt-36 md:px-10 md:pt-48">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {a.kicker}
        </p>
        <h1 className="mt-5 max-w-4xl font-heading text-4xl font-bold leading-[1.06] tracking-[-0.02em] text-foreground md:text-6xl">
          {a.h1}
        </h1>
        <Reveal variant="mask">
          <p className="mt-10 max-w-3xl text-lg leading-[1.75] text-muted-foreground md:text-xl">
            {a.lead}
          </p>
        </Reveal>
      </header>

      <section
        className="bg-background px-5 py-20 md:px-10 md:py-32"
        aria-labelledby="principles-heading"
      >
        <div className="mx-auto max-w-[1440px]">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {a.principlesKicker}
          </p>
          <h2
            id="principles-heading"
            className="mt-4 font-heading text-3xl font-bold tracking-[-0.02em] text-foreground md:text-5xl"
          >
            {a.principlesTitle}
          </h2>
          <ul className="mt-14 border-t border-border">
            {a.principles.map((p, i) => (
              <Reveal
                key={p.num}
                delay={i * 0.06}
                variant={i % 2 === 0 ? "left" : "up"}
                className="grid gap-3 border-b border-border py-8 md:grid-cols-12 md:items-baseline"
              >
                <span className="font-mono text-[11px] text-accent md:col-span-1">
                  {p.num}
                </span>
                <h3 className="font-heading text-2xl font-bold tracking-[-0.02em] text-foreground md:col-span-5 md:text-3xl">
                  {p.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted-foreground md:col-span-6 md:text-base">
                  {p.text}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="border-t border-border bg-background px-5 py-16 md:px-10 md:py-24"
        aria-labelledby="founder-heading"
      >
        <div className="mx-auto grid max-w-[1440px] gap-6 md:grid-cols-12">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-muted-foreground md:col-span-3">
            {a.founderKicker}
          </p>
          <div className="md:col-span-9">
            <h2
              id="founder-heading"
              className="max-w-2xl font-heading text-2xl font-bold leading-[1.3] tracking-[-0.02em] text-foreground md:text-4xl"
            >
              {a.founderTitle}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
              {a.founderNote}
            </p>
          </div>
        </div>
      </section>

      <CtaBand
        lang={lang}
        kicker={a.cta.kicker}
        title={a.cta.title}
        note={a.cta.note}
        button={s.nav.start}
      />
    </>
  );
}