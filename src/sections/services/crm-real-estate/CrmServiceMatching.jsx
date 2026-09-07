import Reveal from "@/components/Reveal";
import { STRINGS } from "@/i18n";
import MatchingDemo from "@/sections/work/crm/MatchingDemo";
import { Chapter, ChapterHead, MONO } from "./serviceBits";

/**
 * Matching — the strongest differentiator, framed as the kind of
 * operational logic we can build into a CRM. The sanitized demo
 * workspace is reused from the case study unchanged (fictional data);
 * the framing around it is the service's own.
 */
export default function CrmServiceMatching({ lang, c }) {
  const m = c.matching;
  const demo = STRINGS[lang].crm.matching;
  return (
    <Chapter tone="white" aria-labelledby="crm-service-matching">
      <ChapterHead id="crm-service-matching" kicker={m.kicker} title={m.title} />
      <Reveal delay={0.05}>
        <div className="mt-6 max-w-2xl space-y-4">
          {m.paras.map((p) => <p key={p} className="text-base leading-[1.75] text-muted-foreground md:text-lg">{p}</p>)}
        </div>
      </Reveal>
      <Reveal delay={0.08} className="mt-12 md:mt-16">
        <p className={`mb-3 ${MONO} text-muted-foreground`}>{m.demoLabel}</p>
        <MatchingDemo m={demo} />
      </Reveal>
      <Reveal delay={0.1}>
        <p className="mt-8 max-w-3xl font-heading text-lg font-semibold leading-snug tracking-[-0.01em] text-foreground md:text-xl">{m.closing}</p>
      </Reveal>
    </Chapter>
  );
}
