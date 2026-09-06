import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Frame, Number, PhoneFrame, ScrollFrame, Shot, Signal, VisitLink } from "./wpBits";

/* Share of each tall capture hidden below a 16:10 viewport (image height − viewport height, over image height). */
const REVEAL = { "dd-evecom": 66.7, "dental-goya": 62.5 };

function Text({ n, p, c, className = "" }) {
  return (
    <div className={cn("min-w-0", className)}>
      <div className="flex items-center gap-3">
        <Number n={n} />
        <span className="h-px w-8 bg-accent/40" aria-hidden="true" />
      </div>
      <h2 className="mt-4 font-heading text-3xl font-bold leading-[1.06] tracking-[-0.02em] text-foreground md:text-5xl">{p.name}</h2>
      <p className="mt-2 text-sm font-medium text-accent">{p.category}</p>
      <p className="mt-6 max-w-xl text-base leading-[1.7] text-[#4A5164]">{p.description}</p>
      {p.signals?.length > 0 && (
        <ul className="mt-6 flex flex-wrap gap-2">{p.signals.map((s) => <Signal key={s}>{s}</Signal>)}</ul>
      )}
      <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3">
        <VisitLink href={p.url} host={p.host} label={c.visit} hint={c.visitHint} />
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{c.scope}</span>
      </div>
    </div>
  );
}

function Caption({ children }) {
  return <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">{children}</p>;
}

/**
 * One editorial chapter per project. The system is shared (number,
 * name, category, description, signals, visit link) but the
 * composition is deliberate per project:
 *   A  text left · large scrolling desktop right · phone overlapping
 *   B  large scrolling desktop left · text right · phone beside the text
 *   C  text on top · full-width screen · two 3D scenes and the phone
 *   D  application: dark surfaces, market table, chart and phone
 */
export default function WebProjectChapter({ n, p, c, layout }) {
  const id = p.id;
  const anchor = `wp-${id}`;

  if (layout === "A") {
    return (
      <section id={anchor} className="scroll-mt-24 border-t border-border px-5 py-16 md:px-10 md:py-24" aria-labelledby={`${anchor}-title`}>
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
          <Reveal className="lg:col-span-4"><Text n={n} p={p} c={c} /></Reveal>
          <Reveal variant="scale" delay={0.08} className="relative lg:col-span-8 lg:pb-16 lg:pl-10">
            <ScrollFrame project={id} alt={p.images.tall} host={p.host} reveal={REVEAL[id]} label={p.captions.desktop} />
            <PhoneFrame className="mx-auto mt-6 w-[46%] max-w-[240px] lg:absolute lg:-bottom-2 lg:left-0 lg:mt-0 lg:w-[19%]">
              <Shot project={id} id="mobile" alt={p.images.mobile} />
            </PhoneFrame>
          </Reveal>
        </div>
      </section>
    );
  }

  if (layout === "B") {
    return (
      <section id={anchor} className="scroll-mt-24 border-t border-border bg-[#F2F5FA] px-5 py-16 md:px-10 md:py-24" aria-labelledby={`${anchor}-title`}>
        <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12 lg:items-start lg:gap-12">
          <Reveal variant="scale" className="lg:col-span-7">
            <ScrollFrame project={id} alt={p.images.tall} host={p.host} reveal={REVEAL[id]} label={p.captions.desktop} />
            <div className="mt-6">
              <Frame host={p.host}><Shot project={id} id="detail" alt={p.images.detail} /></Frame>
              <Caption>{p.captions.detail}</Caption>
            </div>
          </Reveal>
          <div className="grid gap-10 max-lg:order-first lg:col-span-5 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-8 lg:pt-6">
            <Reveal delay={0.06}><Text n={n} p={p} c={c} /></Reveal>
            <Reveal variant="left" delay={0.12} className="lg:pt-14">
              <PhoneFrame className="w-[46%] max-w-[220px] lg:w-[190px]">
                <Shot project={id} id="mobile" alt={p.images.mobile} />
              </PhoneFrame>
              <Caption>{p.captions.mobile}</Caption>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  if (layout === "C") {
    return (
      <section id={anchor} className="scroll-mt-24 border-t border-border px-5 py-16 md:px-10 md:py-24" aria-labelledby={`${anchor}-title`}>
        <div className="mx-auto max-w-[1440px]">
          <Reveal><Text n={n} p={p} c={c} className="max-w-3xl" /></Reveal>
          <Reveal variant="scale" delay={0.08} className="mt-12">
            <Frame host={p.host}><Shot project={id} id="desktop" alt={p.images.desktop} /></Frame>
            <Caption>{p.captions.desktop}</Caption>
          </Reveal>
          <div className="mt-8 grid gap-6 md:grid-cols-[1fr_1fr_0.42fr] md:items-start">
            <Reveal variant="scale">
              <Frame host={p.host} chrome={false}><Shot project={id} id="detail" alt={p.images.detail} /></Frame>
              <Caption>{p.captions.detail}</Caption>
            </Reveal>
            <Reveal variant="scale" delay={0.06}>
              <Frame host={p.host} chrome={false}><Shot project={id} id="detail2" alt={p.images.detail2} /></Frame>
              <Caption>{p.captions.detail2}</Caption>
            </Reveal>
            <Reveal variant="scale" delay={0.12} className="hidden md:block">
              <PhoneFrame><Shot project={id} id="mobile" alt={p.images.mobile} /></PhoneFrame>
              <Caption>{p.captions.mobile}</Caption>
            </Reveal>
          </div>
        </div>
      </section>
    );
  }

  /* D — application */
  return (
    <section id={anchor} className="scroll-mt-24 border-t border-border bg-[#F2F5FA] px-5 py-16 md:px-10 md:py-24" aria-labelledby={`${anchor}-title`}>
      <div className="mx-auto grid max-w-[1440px] gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4 lg:pt-4"><Text n={n} p={p} c={c} /></Reveal>
        <div className="lg:col-span-8">
          <Reveal variant="scale">
            <Frame host={p.host} dark><Shot project={id} id="desktop" alt={p.images.desktop} /></Frame>
            <Caption>{p.captions.desktop}</Caption>
          </Reveal>
          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_0.36fr] md:items-start">
            <Reveal variant="scale" delay={0.06}>
              <Frame host={p.host} dark chrome={false}><Shot project={id} id="detail" alt={p.images.detail} /></Frame>
              <Caption>{p.captions.detail}</Caption>
            </Reveal>
            <Reveal variant="scale" delay={0.12}>
              <PhoneFrame className="border-[#1E2432] bg-[#0B0F17] max-md:mx-auto max-md:w-[72%]"><Shot project={id} id="mobile" alt={p.images.mobile} /></PhoneFrame>
              <Caption>{p.captions.mobile}</Caption>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
