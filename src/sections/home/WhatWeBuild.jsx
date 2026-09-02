import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { STRINGS, langPath } from "@/i18n";

/**
 * What we build — six commercial areas, presented editorially.
 */
export default function WhatWeBuild({ lang = "es" }) {
  const s = STRINGS[lang].build;

  return (
    <section
      className="bg-background px-5 py-20 md:px-10 md:py-32"
      aria-labelledby="build-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
          {s.kicker}
        </p>
        <div className="mt-4 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <h2
            id="build-heading"
            className="max-w-xl font-heading text-3xl font-bold tracking-[-0.02em] text-foreground md:text-5xl"
          >
            {s.title}
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
            {s.intro}
          </p>
        </div>

        <div className="mt-14 border-t border-border">
          {s.groups.map((g, i) => (
            <Reveal key={g.name} delay={i * 0.04} variant={i % 2 === 0 ? "up" : "left"}>
              <Link
                to={langPath(lang, "/services")}
                className="group grid gap-2 border-b border-border px-2 py-7 transition-colors hover:bg-[#F1EEE6] md:grid-cols-12 md:items-baseline"
              >
                <h3 className="font-heading text-2xl font-bold tracking-[-0.02em] text-foreground transition-colors group-hover:text-accent md:col-span-4 md:text-3xl">
                  {g.name}
                </h3>
                <p className="text-sm text-[#5A6070] md:col-span-5 md:text-base">
                  {g.desc}
                </p>
                <p className="font-mono text-[11px] text-muted-foreground md:col-span-3 md:text-right">
                  {g.items}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Link
          to={langPath(lang, "/services")}
          className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent"
        >
          {s.all}
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </section>
  );
}