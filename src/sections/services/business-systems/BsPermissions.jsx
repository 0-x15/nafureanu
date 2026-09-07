import { useState } from "react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";
import { Chapter, ChapterHead, Closing, MONO, Points } from "./bsBits";

/** Permissions and responsibility — an example role × action matrix; select a role to read its row. */
export default function BsPermissions({ c }) {
  const p = c.permissions;
  const [r, setR] = useState(1);
  return (
    <Chapter id="bs-permissions" tone="blue">
      <ChapterHead id="bs-permissions" kicker={p.kicker} title={p.title} intro={p.intro} />
      <Reveal variant="scale" delay={0.06} className="mt-12 md:mt-16">
        <div className="overflow-x-auto rounded-[10px] border border-border bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className={cn(MONO, "px-4 pb-1 pt-3 text-left text-muted-foreground")}>{p.exampleNote}</caption>
            <thead>
              <tr className="border-b border-border">
                <th scope="col" className={cn(MONO, "px-4 py-2 font-normal text-muted-foreground")}>{p.scopeLabel}</th>
                {p.actions.map((a) => <th key={a} scope="col" className={cn(MONO, "px-3 py-2 text-center font-normal text-muted-foreground")}>{a}</th>)}
              </tr>
            </thead>
            <tbody>
              {p.roles.map((role, ri) => {
                const on = ri === r;
                return (
                  <tr key={role} className={cn("border-b border-border last:border-b-0 transition-colors", on && "bg-[#F7F9FD]")}>
                    <th scope="row" className="px-4 py-3 font-normal">
                      <button type="button" aria-pressed={on} onClick={() => setR(ri)} className={cn("text-left outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", on ? "text-accent-deep" : "text-foreground")}>
                        <span className="block text-[14px] font-semibold">{role}</span>
                        <span className={cn(MONO, "mt-0.5 block text-muted-foreground")}>{p.scopes[ri]}</span>
                      </button>
                    </th>
                    {p.matrix[ri].map((v, ai) => (
                      <td key={ai} className="px-3 py-3 text-center">
                        <span aria-label={v ? p.actions[ai] : undefined} className={cn("inline-block h-3 w-3 rounded-full border", v ? (on ? "border-accent bg-accent" : "border-accent/60 bg-accent/60") : "border-border bg-white")} />
                        <span className="sr-only">{v ? "✓" : "—"}</span>
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Reveal>
      <Reveal delay={0.08}><Points items={p.points} cols={4} className="mt-12" /></Reveal>
      <Closing>{p.closing}</Closing>
    </Chapter>
  );
}
