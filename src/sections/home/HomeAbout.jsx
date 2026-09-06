import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";
import { cn } from "@/lib/utils";

/**
 * About Nafureanu — the calm chapter between the promise (Hero) and the
 * capabilities (What we build): who the company is, what it actually
 * does and how it thinks about technology. An asymmetric editorial
 * composition: identity on the left, the introduction on the right,
 * closed by one small structural annotation — process → technology →
 * operation. No cards, no diagram, no imagery.
 */
export default function HomeAbout({ lang = "es" }) {
  const a = STRINGS[lang].homeAbout;
  return (
    <section aria-labelledby="home-about" className="bg-background px-5 pt-16 md:px-10 md:pt-24">
      <div className="mx-auto max-w-[1440px] border-t border-border pt-14 md:pt-20">
        <div className="grid gap-10 md:grid-cols-12 md:gap-10">
          {/* Identity */}
          <Reveal className="md:col-span-4">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{a.kicker}</p>
            <div className="mt-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{a.identityLabel}</p>
              <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 md:flex-col md:gap-2">
                {a.identity.map((item, i) => (
                  <li key={item} className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.16em] text-foreground/80">
                    <span aria-hidden="true" className={cn("h-1.5 w-1.5 shrink-0", i === 0 ? "bg-accent" : "border border-accent/50")} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {/* The introduction */}
          <div className="md:col-span-8">
            <Reveal>
              <h2 id="home-about" className="max-w-3xl font-heading text-3xl font-bold leading-[1.06] tracking-[-0.03em] text-foreground md:text-5xl [text-wrap:balance]">
                {a.title}
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <p className="mt-8 max-w-2xl text-lg leading-relaxed text-foreground/85 md:text-xl">{a.primary}</p>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">{a.secondary}</p>
            </Reveal>
            <Reveal delay={0.12}>
              <ol className="mt-12 flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                {a.annotation.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden="true" className="h-px w-8 bg-foreground/20 md:w-14" />}
                    <span className={i === a.annotation.length - 1 ? "text-foreground" : undefined}>{step}</span>
                  </li>
                ))}
                <li aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
              </ol>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
