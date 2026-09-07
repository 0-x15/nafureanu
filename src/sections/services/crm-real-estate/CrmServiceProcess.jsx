import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead, Num } from "./serviceBits";

/** How we approach the project — six CRM-specific steps on one thin rail. */
export default function CrmServiceProcess({ c }) {
  const p = c.process;
  return (
    <Chapter aria-labelledby="crm-service-process">
      <ChapterHead id="crm-service-process" kicker={p.kicker} title={p.title} />
      <Reveal delay={0.06}>
        <ol className="relative mt-12 grid gap-8 md:mt-16 md:grid-cols-3 md:gap-x-8 md:gap-y-12 lg:grid-cols-6 lg:gap-x-6">
          <span aria-hidden="true" className="absolute left-0 top-[5px] hidden h-px w-full bg-accent/25 lg:block" />
          {p.steps.map((st, i) => (
            <li key={st.title} className="relative lg:pt-6">
              <span aria-hidden="true" className="absolute left-0 top-0 hidden h-[11px] w-[11px] rounded-full border border-accent bg-white lg:block" />
              <Num n={i + 1} />
              <p className="mt-2 font-heading text-base font-bold leading-snug tracking-[-0.01em] text-foreground">{st.title}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{st.text}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </Chapter>
  );
}
