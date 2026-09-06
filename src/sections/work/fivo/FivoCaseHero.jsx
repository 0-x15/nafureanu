import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import ActionLink from "@/components/ActionLink";
import { STRINGS, langPath } from "@/i18n";
import FivoHeroComposition from "./FivoHeroComposition";
import { Kicker } from "./fivoBits";

/**
 * Fivo hero — positioning first, product second. Row one is the
 * statement (kicker, product mark, one-line claim, support copy) with
 * verified proof on the right; row two is the full-width composition
 * of real product surfaces. No giant project title, no dark band.
 */
export default function FivoCaseHero({ lang, c }) {
  const h = c.hero;

  return (
    <header className="mx-auto max-w-[1440px] overflow-x-clip px-5 pb-10 pt-8 md:px-10 md:pb-16 md:pt-12">
      <div className="grid gap-10 md:grid-cols-12 md:gap-12">
        <div className="min-w-0 md:col-span-7">
          <Reveal>
            <Kicker>{h.kicker}</Kicker>
            <div className="mt-5 flex items-center gap-4">
              <img
                src="/work/fivo/fivo-icon.webp"
                width={256}
                height={256}
                alt=""
                aria-hidden="true"
                className="h-11 w-11 rounded-[12px] shadow-[0_10px_24px_-10px_rgba(49,87,246,0.7)] md:h-12 md:w-12"
              />
              <h1 className="font-heading text-5xl font-bold tracking-[-0.03em] text-foreground md:text-6xl">
                {h.title}
              </h1>
            </div>
            <p className="mt-7 max-w-3xl font-heading text-2xl font-bold leading-[1.12] tracking-[-0.02em] text-foreground md:text-4xl">
              {h.statement}
            </p>
            <p className="mt-6 max-w-2xl text-base leading-[1.7] text-muted-foreground md:text-lg">
              {h.support}
            </p>
          </Reveal>
        </div>

        <div className="min-w-0 md:col-span-5 md:self-end">
          <Reveal variant="left" delay={0.08}>
            <dl className="grid grid-cols-2 gap-x-8 gap-y-6">
              {h.proof.map((p) => (
                <div key={p.label} className="border-l border-border pl-4">
                  <dd className="font-heading text-2xl font-bold tracking-tight text-foreground md:text-3xl">
                    {p.value}
                  </dd>
                  <dt className="mt-1 text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
                    {p.label}
                  </dt>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="inline-flex items-center gap-2 rounded-full border border-accent/25 bg-accent/5 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-deep">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
                {h.alliance}
              </span>
              <a
                href={h.product.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {h.product.label} · {h.product.host}
                <ArrowUpRight className="h-3 w-3 transition-transform group-hover:-translate-y-px group-hover:translate-x-px" />
              </a>
            </div>
            <div className="mt-8">
              <ActionLink to={langPath(lang, "/contact")} size="md">
                {STRINGS[lang].nav.start}
              </ActionLink>
            </div>
          </Reveal>
        </div>
      </div>

      <Reveal variant="scale" delay={0.12} className="mt-16 md:mt-24">
        <FivoHeroComposition c={h} />
      </Reveal>
    </header>
  );
}
