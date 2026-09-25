import { useState } from "react";
import Reveal from "@/components/Reveal";
import { STRINGS, langPath } from "@/i18n";
import { SERVICES, servicePath } from "@/data/services";
import { PROJECTS, projectSlug } from "@/data/projects";
import CapabilityNav from "./capabilities/CapabilityNav";
import CapabilityScene from "./capabilities/CapabilityScene";
import CapabilityChapter from "./capabilities/CapabilityChapter";

/**
 * What we build — an interactive capability experience. The six
 * capabilities are a large typographic navigation (left); selecting
 * one transforms the art-directed scene (right). On mobile it
 * becomes a vertical story of full-width chapters.
 */
/* Where each capability leads, in the order of `build.capabilities`: the
   dedicated service page, or the Fivo case for the infrastructure that has
   no commercial page yet; two capabilities also expose a specialist page. */
const DESTINATIONS = [
  { service: "custom-software" },
  { service: "ai-automation" },
  { service: "business-systems", also: "crm-real-estate" },
  { service: "integrations-apis" },
  { service: "saas", also: "web-digital" },
  { project: "fivo" },
];

export default function WhatWeBuild({ lang = "es" }) {
  const strings = STRINGS[lang];
  const s = strings.build;
  const [active, setActive] = useState(0);
  const labels = { when: s.whenLabel, build: s.buildLabel };
  const path = (id) => servicePath(SERVICES.find((service) => service.id === id), lang);
  const routes = DESTINATIONS.map((d) => {
    const project = d.project ? PROJECTS.find((p) => p.slug === d.project) : null;
    return {
      to: project ? langPath(lang, `/work/${projectSlug(project, lang)}`) : path(d.service),
      also: d.also ? { to: path(d.also), label: strings.servicesPage.names[d.also] } : null,
    };
  });

  return (
    <section
      className="px-5 pt-20 md:px-10 md:pt-32"
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
            routes={routes}
            active={active}
            lang={lang}
            labels={labels}
          />
        </div>

        {/* Mobile — vertical storytelling chapters */}
        <div className="mt-12 space-y-16 md:hidden">
          {s.capabilities.map((cap, i) => (
            <Reveal key={cap.name}>
              <CapabilityChapter cap={cap} route={routes[i]} index={i} lang={lang} labels={labels} />
            </Reveal>
          ))}
        </div>

      </div>
    </section>
  );
}