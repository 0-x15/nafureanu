import { usePageMeta } from "@/lib/seo";
import { STRINGS, langPath, otherLang } from "@/i18n";
import Reveal from "@/components/Reveal";
import CtaBand from "@/components/CtaBand";

export default function About({ lang = "es" }) {
  const s = STRINGS[lang];
  usePageMeta({
    lang,
    title: s.meta.about.title,
    description: s.meta.about.description,
    path: langPath(lang, "/about"),
    alternatePath: langPath(otherLang(lang), "/about"),
  });

  return (
    <>
      <header className="px-5 pt-36 md:px-10 md:pt-48">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
          <span className="text-[#E63946]">{s.about.kicker.split(" — ")[0]}</span> —{" "}
          {s.about.kicker.split(" — ")[1]}
        </p>
        <p className="mt-8 font-mono text-xs uppercase tracking-[0.25em] text-[#121212]">
          {s.about.voice}
        </p>
        <h1 className="mt-6 font-heading text-5xl font-bold uppercase tracking-[-0.02em] md:text-8xl">
          {s.about.h1}
        </h1>
        <Reveal>
          <p className="mt-10 max-w-3xl text-lg leading-[1.7] text-[#5C5C58] md:text-xl">
            {s.about.lead}
          </p>
        </Reveal>
      </header>

      <section className="px-5 py-24 md:px-10 md:py-36" aria-labelledby="principles-title">
        <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482]">
          {s.about.principlesKicker}
        </p>
        <h2
          id="principles-title"
          className="mt-6 font-heading text-3xl font-bold tracking-[-0.02em] md:text-5xl"
        >
          {s.about.principlesTitle}
        </h2>
        <ul className="mt-12 border-t border-[#E0E0DE]">
          {s.about.principles.map((p, i) => (
            <Reveal
              key={p.num}
              delay={i * 0.06}
              className="grid gap-3 border-b border-[#E0E0DE] py-8 md:grid-cols-12 md:items-baseline"
            >
              <span className="font-mono text-[11px] text-[#E63946] md:col-span-1">{p.num}</span>
              <h3 className="font-heading text-2xl font-bold tracking-[-0.02em] md:col-span-5 md:text-3xl">
                {p.title}
              </h3>
              <p className="max-w-xl text-sm leading-relaxed text-[#5C5C58] md:col-span-6 md:text-base">
                {p.text}
              </p>
            </Reveal>
          ))}
        </ul>
      </section>

      <section
        className="border-t border-[#E0E0DE] px-5 py-20 md:px-10 md:py-28"
        aria-labelledby="founder-title"
      >
        <div className="grid gap-6 md:grid-cols-12">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#848482] md:col-span-3">
            {s.about.founderKicker}
          </p>
          <div className="md:col-span-9">
            <h2 id="founder-title" className="font-heading text-2xl font-bold md:text-4xl">
              {s.about.founderTitle}
            </h2>
            <p className="mt-6 max-w-2xl text-base leading-[1.7] text-[#5C5C58]">
              {s.about.founderNote}
            </p>
          </div>
        </div>
      </section>

      <CtaBand kicker={s.about.cta.kicker} title={s.about.cta.title} note={s.about.cta.note} />
    </>
  );
}