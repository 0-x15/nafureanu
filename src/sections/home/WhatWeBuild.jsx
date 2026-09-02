import { useState } from "react";
import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";
import CapabilityNav from "./capabilities/CapabilityNav";
import CapabilityScene from "./capabilities/CapabilityScene";
import CapabilityChapter from "./capabilities/CapabilityChapter";
import ProblemBridge from "./ProblemBridge";

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

        {/* Conversion bridge — problem → system */}
        <ProblemBridge lang={lang} />
      </div>
    </section>
  );
}