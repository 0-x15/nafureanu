import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { STRINGS, langPath } from "@/i18n";
import CapabilityNav from "./capabilities/CapabilityNav";
import CapabilityScene from "./capabilities/CapabilityScene";
import CapabilityChapter from "./capabilities/CapabilityChapter";

/**
 * What we build — an interactive capability experience. The six
 * capabilities are a large typographic navigation (left); selecting
 * one transforms the art-directed scene (right). On mobile it
 * becomes a vertical story of full-width chapters.
 */
export default function WhatWeBuild({ lang = "es" }) {
  const s = STRINGS[lang].build;
  const [active, setActive] = useState(0);
  const labels = { when: s.whenLabel, build: s.buildLabel };

  return (
    <section
      className="bg-background px-5 py-20 md:px-10 md:py-32"
      aria-labelledby="build-heading"
    >
      <div className="mx-auto max-w-[1440px]">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
            {s.kicker}
          </p>
          <h2
            id="build-heading"
            className="mt-5 font-heading text-3xl font-bold tracking-[-0.03em] text-foreground md:text-6xl"
          >
            {s.title}
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-lg">
            {s.intro}
          </p>
        </Reveal>

        {/* Desktop — typographic navigation + capability scene */}
        <div className="mt-14 hidden gap-14 md:grid md:grid-cols-[32%_1fr] lg:gap-20">
          <Reveal variant="left">
            <CapabilityNav
              capabilities={s.capabilities}
              active={active}
              onSelect={setActive}
              ariaLabel={s.title}
            />
          </Reveal>
          <CapabilityScene
            capabilities={s.capabilities}
            active={active}
            lang={lang}
            labels={labels}
          />
        </div>

        {/* Mobile — vertical storytelling chapters */}
        <div className="mt-12 space-y-16 md:hidden">
          {s.capabilities.map((cap, i) => (
            <Reveal key={cap.name}>
              <CapabilityChapter cap={cap} index={i} lang={lang} labels={labels} />
            </Reveal>
          ))}
        </div>

        {/* Closing CTA */}
        <Reveal className="mt-16 border-t border-border pt-12 md:mt-24">
          <p className="font-heading text-xl font-bold tracking-[-0.02em] text-foreground md:text-2xl">
            {s.close.note}
          </p>
          <p className="mt-2.5 max-w-lg text-sm leading-relaxed text-muted-foreground md:text-base">
            {s.close.sub}
          </p>
          <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-4">
            <Link
              to={langPath(lang, "/contact")}
              className="group inline-flex items-center gap-2 text-sm font-medium text-accent"
            >
              {s.close.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to={langPath(lang, "/services")}
              className="group inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {s.close.all}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}