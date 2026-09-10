import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SERVICES, servicePath } from "@/data/services";
import Reveal from "@/components/Reveal";
import { KICKER, MONO } from "./servicesIndexBits";
import "./servicesIndex.css";

/**
 * Act 02 — the catalogue, once. Seven service blades standing on one
 * continuous surface, in two structural fields (systems and operations ·
 * automation and product). Each blade carries its number, its name and
 * the business situation that brings you here; it is a real link to the
 * dedicated page. Under the pointer a blade lifts off the surface, its
 * mark completes and the entry appears; the others step back. Below xl
 * the same seven entries read as an editorial list.
 */
const ORDER = ["crm-real-estate", "business-systems", "custom-software", "ai-automation", "saas", "integrations-apis", "web-digital"];
const FIELDS = [
  { id: "systems", ids: ORDER.slice(0, 3), range: "01—03" },
  { id: "product", ids: ORDER.slice(3), range: "04—07" },
];
/* the blades: unequal widths and heights, standing on one floor; the material shifts with depth */
const COLUMNS = "1.1fr 1.22fr 1fr 1.14fr 1.08fr 1fr 1.06fr";
const HEIGHT = [400, 444, 372, 456, 404, 380, 428];
const MATERIAL = [
  "border-white/75 bg-[linear-gradient(170deg,rgba(255,255,255,0.82),rgba(255,255,255,0.46))]",
  "border-white/70 bg-[linear-gradient(170deg,rgba(255,255,255,0.84),rgba(49,87,246,0.12))]",
  "border-white/75 bg-[linear-gradient(170deg,rgba(255,255,255,0.8),rgba(255,255,255,0.42))]",
  "border-white/70 bg-[linear-gradient(170deg,rgba(255,255,255,0.84),rgba(23,180,205,0.14))]",
  "border-white/75 bg-[linear-gradient(170deg,rgba(255,255,255,0.82),rgba(255,255,255,0.46))]",
  "border-white/70 bg-[linear-gradient(170deg,rgba(255,255,255,0.84),rgba(49,87,246,0.1))]",
  "border-white/75 bg-[linear-gradient(170deg,rgba(255,255,255,0.8),rgba(255,255,255,0.42))]",
];

function entryOf(id, lang) {
  const service = SERVICES.find((s) => s.id === id);
  return { id, n: String(ORDER.indexOf(id) + 1).padStart(2, "0"), to: service ? servicePath(service, lang) : "#" };
}

export default function ServiceArchitecture({ lang, t }) {
  const a = t.architecture;
  return (
    <section aria-labelledby="sv-architecture" className="relative px-5 py-16 md:px-10 md:py-20">
      {/* a more defined ground: the surface the blades stand on */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-white/35" />
      <div className="relative mx-auto max-w-[1440px]">
        <Reveal>
          <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2 border-b border-foreground/12 pb-3">
            <p className={KICKER}>{a.kicker}</p>
            <p className={cn(MONO, "text-muted-foreground")}>{t.hero.range}</p>
          </div>
          <h2 id="sv-architecture" className="mt-6 max-w-[26ch] font-heading text-[clamp(1.5rem,2.4vw,2.2rem)] font-bold leading-[1.1] tracking-[-0.03em] text-foreground">
            {a.title}
          </h2>
        </Reveal>

        {/* desktop: one continuous surface, seven blades of different heights standing on it */}
        <div className="sv-field relative mt-10 hidden xl:block">
          <div className="grid grid-cols-[3fr_4fr] gap-x-6">
            <div className="flex items-baseline justify-between border-t border-foreground/20 pt-2">
              <span className={cn(MONO, "text-foreground/80")}>{a.fields.systems}</span>
              <span className={cn(MONO, "text-muted-foreground")}>{FIELDS[0].range}</span>
            </div>
            <div className="flex items-baseline justify-between border-t border-foreground/20 pt-2">
              <span className={cn(MONO, "text-foreground/80")}>{a.fields.product}</span>
              <span className={cn(MONO, "text-muted-foreground")}>{FIELDS[1].range}</span>
            </div>
          </div>
          {/* the surface: one plane of glass with a floor line; the blades stand on it */}
          <div className="relative mt-5 rounded-t-[26px] border border-b-0 border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.55),rgba(255,255,255,0.2))] px-8 pt-10 shadow-[inset_0_1px_0_rgba(255,255,255,0.95)]">
            <ul className="grid items-end" style={{ gridTemplateColumns: COLUMNS }}>
              {ORDER.map((id, i) => {
                const e = entryOf(id, lang);
                return (
                  <li key={id} className="sv-slot relative min-w-0" style={{ zIndex: i + 1, marginLeft: i ? -10 : 0 }}>
                    <Link
                      to={e.to}
                      className={cn("sv-blade relative flex flex-col rounded-t-[14px] border border-b-0 p-5 pb-7 shadow-[inset_0_1px_0_rgba(255,255,255,0.95),0_30px_60px_-40px_rgba(49,87,246,0.3)] outline-none backdrop-blur-[10px] focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", MATERIAL[i])}
                      style={{ minHeight: HEIGHT[i] }}
                    >
                      <span className={cn(MONO, "text-accent")}>{e.n}</span>
                      <span aria-hidden="true" className="sv-mark mt-2 block h-[3px] w-10 bg-accent" />
                      <h3 className="mt-5 font-heading text-[17px] font-bold leading-[1.15] tracking-[-0.02em] text-foreground [text-wrap:balance]">{t.names[id]}</h3>
                      <p className="sv-when mt-3 text-[12.5px] leading-[1.55]">{t.entries[id]}</p>
                      <span className="sv-cta mt-auto inline-flex items-center gap-1.5 pt-5 text-[12px] font-medium text-accent">
                        {a.enter}
                        <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
            {/* the floor */}
            <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-px bg-foreground/30" />
          </div>
        </div>

        {/* below lg: the same seven entries as an editorial list */}
        <div className="mt-8 xl:hidden">
          {FIELDS.map((f) => (
            <div key={f.id} className="mt-8 first:mt-0">
              <div className="flex items-baseline justify-between border-t border-foreground/20 pt-2">
                <span className={cn(MONO, "text-foreground/80")}>{a.fields[f.id]}</span>
                <span className={cn(MONO, "text-muted-foreground")}>{f.range}</span>
              </div>
              <ul className="mt-2">
                {f.ids.map((id) => {
                  const e = entryOf(id, lang);
                  return (
                    <li key={id} className="border-b border-foreground/10">
                      <Link to={e.to} className="group relative flex items-start gap-4 py-5 pl-4 outline-none focus-visible:bg-white/50">
                        {/* the material as a sliver on the left edge */}
                        <span aria-hidden="true" className="absolute bottom-3 left-0 top-3 w-[3px] rounded-full bg-[linear-gradient(180deg,rgba(49,87,246,0.9),rgba(23,180,205,0.7))] opacity-60 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100" />
                        <span className={cn(MONO, "mt-1 w-6 shrink-0 text-accent")}>{e.n}</span>
                        <span className="min-w-0 flex-1">
                          <h3 className="font-heading text-[17px] font-bold leading-[1.15] tracking-[-0.02em] text-foreground">{t.names[id]}</h3>
                          <p className="mt-2 text-[14px] leading-[1.55] text-foreground/70">{t.entries[id]}</p>
                        </span>
                        <ArrowRight aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-accent transition-transform group-hover:translate-x-[2px]" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
