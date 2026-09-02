import { PROJECTS } from "@/data/projects";
import ProjectBlock from "@/components/ProjectBlock";
import { STRINGS } from "@/i18n";

/**
 * Featured work — SophIA and Fivo as the main proof of capability,
 * in alternating dark/light environments.
 */
export default function FeaturedWork({ lang = "es" }) {
  const s = STRINGS[lang].workSection;
  const fivo = PROJECTS.find((p) => p.slug === "fivo");
  const sophia = PROJECTS.find((p) => p.slug === "sophia");

  return (
    <section aria-label={s.title}>
      <div className="mx-auto max-w-[1440px] px-5 pt-20 md:px-10 md:pt-28">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {s.kicker}
        </p>
        <h2 className="mt-4 font-heading text-3xl font-bold tracking-[-0.02em] text-foreground md:text-5xl">
          {s.title}
        </h2>
      </div>
      <ProjectBlock
        project={fivo}
        lang={lang}
        environment="dark"
        viewCase={s.viewCase}
      />
      <ProjectBlock
        project={sophia}
        lang={lang}
        environment="light"
        flip
        viewCase={s.viewCase}
      />
    </section>
  );
}