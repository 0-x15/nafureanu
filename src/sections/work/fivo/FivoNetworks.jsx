import { Check, Minus } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead } from "./fivoBits";

/** Networks — a compact settlement matrix, not a logo wall. */
function Cell({ on, yes, no }) {
  return on ? (
    <span className="inline-flex items-center gap-1.5 text-foreground">
      <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/10 text-accent">
        <Check className="h-3 w-3" strokeWidth={3} />
      </span>
      <span className="sr-only">{yes}</span>
    </span>
  ) : (
    <span className="inline-flex items-center text-[#B4B9C6]">
      <Minus aria-hidden="true" className="h-3.5 w-3.5" />
      <span className="sr-only">{no}</span>
    </span>
  );
}

export default function FivoNetworks({ c }) {
  const n = c.networks;
  return (
    <Chapter tone="white" aria-labelledby="fivo-networks">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="min-w-0 lg:col-span-5">
          <ChapterHead kicker={n.kicker} title={n.title} intro={n.intro} />
          <Reveal delay={0.08}>
            <ul className="mt-8 space-y-2">
              {n.footnotes.map((f, i) => (
                <li key={f} className="flex gap-3 text-xs leading-relaxed text-muted-foreground">
                  <span className="font-mono text-accent">{i + 1}</span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <Reveal variant="scale" delay={0.06} className="min-w-0 lg:col-span-7">
          <div className="relative overflow-x-auto rounded-2xl border border-[#E1E5EF] bg-white shadow-[0_1px_2px_rgba(12,18,32,0.04)]">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="border-b border-[#EEF1F7] text-left">
                  {n.columns.map((col, i) => (
                    <th key={col} scope="col" className={i === 0 ? "px-5 py-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground" : "px-4 py-3.5 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground"}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {n.rows.map((row, i) => (
                  <tr key={row.name} className="border-b border-[#F2F4F9] last:border-b-0">
                    <th scope="row" className="flex items-center gap-3 px-5 py-3 text-left font-medium text-foreground">
                      <span aria-hidden="true" className="font-mono text-[10px] text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                      {row.name}
                    </th>
                    <td className="px-4 py-3"><Cell on={row.usdc} yes={n.legend.yes} no={n.legend.no} /></td>
                    <td className="px-4 py-3"><Cell on={row.eurc} yes={n.legend.yes} no={n.legend.no} /></td>
                    <td className="px-4 py-3"><Cell on={row.cross} yes={n.legend.yes} no={n.legend.no} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </Chapter>
  );
}
