import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead, Closing, Points, Rail, Surface } from "./serviceBits";

/** Operations — from the first yes to the deed, as one process rail. */
export default function CrmServiceOperations({ c }) {
  const o = c.operations;
  return (
    <Chapter id="crm-service-operations" tone="white">
      <ChapterHead id="crm-service-operations" kicker={o.kicker} title={o.title} intro={o.intro} />
      <Reveal variant="scale" delay={0.06} className="mt-12 md:mt-16">
        <Surface title={o.kicker} meta="OP-00318">
          <Rail steps={o.stages} active={o.stagesActive} className="[&>li]:min-w-[132px]" />
        </Surface>
      </Reveal>
      <Reveal delay={0.08}><Points items={o.points} cols={4} className="mt-12" /></Reveal>
      <Closing>{o.closing}</Closing>
    </Chapter>
  );
}
