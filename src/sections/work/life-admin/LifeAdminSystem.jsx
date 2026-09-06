import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Card, DISPLAY, Mono } from "./laBits";

/**
 * What the system centralises — a relationship map around one
 * obligation: frozen terms, derived cycles and evidence-based payments
 * on one side; per-cycle answers, detected purchases, plan benefits
 * and the read-only assistant on the other. Connectors point to the
 * record; on phones the record comes first and the nodes follow.
 */
function Node({ n, side }) {
  return (
    <li className="relative">
      <span
        aria-hidden="true"
        className={cn("absolute top-7 hidden h-px w-6 bg-[#C9C3BB] lg:block", side === "left" ? "-right-6" : "-left-6")}
      />
      <span aria-hidden="true" className={cn("absolute top-[26px] hidden h-1.5 w-1.5 rounded-full bg-[#928C86] lg:block", side === "left" ? "-right-[27px]" : "-left-[27px]")} />
      <Card className="px-4 py-3.5">
        <p className="text-sm font-medium text-[#201F1D]">{n.title}</p>
        <p className="mt-1 text-[12.5px] leading-relaxed text-[#706B66]">{n.text}</p>
      </Card>
    </li>
  );
}

export default function LifeAdminSystem({ c }) {
  const s = c.system;
  const left = s.nodes.slice(0, 3);
  const right = s.nodes.slice(3);
  return (
    <Chapter tone="white" aria-labelledby="la-system">
      <ChapterHead kicker={s.kicker} title={s.title} intro={s.intro} />
      <Reveal delay={0.08} className="mt-12 md:mt-16">
        <div className="grid gap-4 lg:grid-cols-[1fr_300px_1fr] lg:gap-6">
          <div className="order-2 lg:order-none">
            <ul className="space-y-3">{left.map((n) => <Node key={n.id} n={n} side="left" />)}</ul>
          </div>
          <div className="order-1 flex flex-col justify-center lg:order-none">
            <div className="relative rounded-2xl border border-[#201F1D] bg-[#201F1D] p-5 text-[#F9F8F4] shadow-[0_30px_70px_-30px_rgba(32,31,29,0.6)]">
              <span aria-hidden="true" className="absolute -top-3 left-1/2 hidden h-3 w-px bg-[#C9C3BB] lg:block" />
              <Mono className="text-[#F9F8F4]/60">{s.center.label}</Mono>
              <p className={`${DISPLAY} mt-1 text-3xl`}>{s.center.title}</p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-[#F9F8F4]/75">{s.center.sub}</p>
            </div>
            <p className="mt-4 text-center text-xs leading-relaxed text-[#706B66]">{s.note}</p>
          </div>
          <div className="order-3 lg:order-none">
            <ul className="space-y-3">{right.map((n) => <Node key={n.id} n={n} side="right" />)}</ul>
          </div>
        </div>
      </Reveal>
    </Chapter>
  );
}
