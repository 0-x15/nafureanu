import { motion, useReducedMotion } from "framer-motion";
import Reveal from "@/components/Reveal";
import { Chapter, ChapterHead, Mono } from "./fivoBits";

const EASE = [0.22, 1, 0.36, 1];

/**
 * The problem — an infrastructure abstraction panel: on one side the
 * merchant wired to nine networks, one integration each; on the other
 * the merchant wired once to Fivo, with the networks behind it. Lines
 * draw in on view; under reduced motion they are simply there.
 */
function Wiring({ mode, p, reduce }) {
  const networks = p.networks;
  const W = 420;
  const H = 300;
  const mx = 62; // merchant x
  const my = H / 2;
  const nx = 372; // networks x
  const step = 30;
  const top = my - ((networks.length - 1) * step) / 2;
  const fx = 218; // fivo x
  const draw = (delay) =>
    reduce
      ? {}
      : {
          initial: { pathLength: 0, opacity: 0 },
          whileInView: { pathLength: 1, opacity: 1 },
          viewport: { once: true, margin: "-60px" },
          transition: { duration: 0.9, delay, ease: EASE },
        };

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={`${mode === "without" ? p.without.label : p.with.label}: ${mode === "without" ? p.without.note : p.with.note}`}>
      {/* merchant */}
      <rect x={mx - 46} y={my - 18} width={92} height={36} rx={8} fill="#fff" stroke="#D9DEE9" />
      <text x={mx} y={my + 4} textAnchor="middle" className="fill-[#171C29]" fontSize="11" fontWeight="600">
        {mode === "without" ? p.without.merchant : p.with.merchant}
      </text>

      {mode === "without" ? (
        networks.map((n, i) => {
          const y = top + i * step;
          const d = `M ${mx + 46} ${my} C ${mx + 130} ${my}, ${nx - 130} ${y}, ${nx - 44} ${y}`;
          return (
            <g key={n}>
              <motion.path d={d} fill="none" stroke="#9AA6C4" strokeWidth="1.1" strokeDasharray="3 3" {...draw(0.05 * i)} />
              <rect x={nx - 44} y={y - 10} width={88} height={20} rx={5} fill="#fff" stroke="#E1E5EF" />
              <text x={nx} y={y + 3.5} textAnchor="middle" fontSize="9" className="fill-[#4A5164]">{n}</text>
            </g>
          );
        })
      ) : (
        <>
          <motion.path d={`M ${mx + 46} ${my} L ${fx - 40} ${my}`} fill="none" stroke="#3157F6" strokeWidth="2" {...draw(0)} />
          <text x={(mx + 46 + fx - 40) / 2} y={my - 10} textAnchor="middle" fontSize="7.5" className="fill-[#3157F6]" fontFamily="var(--font-mono)" letterSpacing="1">
            {p.with.integration.toUpperCase()}
          </text>
          <rect x={fx - 40} y={my - 20} width={80} height={40} rx={9} fill="#3157F6" />
          <text x={fx} y={my + 4} textAnchor="middle" fill="#fff" fontSize="12" fontWeight="700">{p.with.fivo}</text>
          {networks.map((n, i) => {
            const y = top + i * step;
            const d = `M ${fx + 40} ${my} C ${fx + 90} ${my}, ${nx - 100} ${y}, ${nx - 44} ${y}`;
            return (
              <g key={n} opacity="0.8">
                <motion.path d={d} fill="none" stroke="#B9C6EA" strokeWidth="1" {...draw(0.25 + 0.04 * i)} />
                <rect x={nx - 44} y={y - 10} width={88} height={20} rx={5} fill="#F4F6FB" stroke="#E1E5EF" />
                <text x={nx} y={y + 3.5} textAnchor="middle" fontSize="9" className="fill-[#5A6070]">{n}</text>
              </g>
            );
          })}
        </>
      )}
    </svg>
  );
}

export default function FivoProblem({ c }) {
  const p = c.problem;
  const reduce = useReducedMotion();
  return (
    <Chapter tone="page" aria-labelledby="fivo-problem">
      <ChapterHead kicker={p.kicker} title={p.title} intro={p.intro} wide />

      <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="min-w-0 lg:col-span-5">
          <ol className="grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-1">
            {p.points.map((pt, i) => (
              <li key={pt.title} className="flex gap-4">
                <span className="mt-0.5 font-mono text-[10px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <p className="text-sm font-semibold text-foreground">{pt.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-[#5A6070]">{pt.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <Reveal variant="scale" delay={0.08} className="min-w-0 lg:col-span-7">
          <div className="overflow-hidden rounded-2xl border border-[#E1E5EF] bg-white shadow-[0_1px_2px_rgba(12,18,32,0.04),0_40px_80px_-50px_rgba(49,87,246,0.3)]">
            <div className="grid md:grid-cols-2">
              <div className="border-b border-[#EEF1F7] p-5 md:border-b-0 md:border-r md:p-6">
                <Mono className="text-foreground/70">{p.without.label}</Mono>
                <p className="mt-1 font-mono text-[9px] tracking-[0.06em] text-muted-foreground">{p.without.per}</p>
                <div className="mt-4"><Wiring mode="without" p={p} reduce={reduce} /></div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.without.note}</p>
              </div>
              <div className="bg-[#F7F9FD] p-5 md:p-6">
                <Mono className="text-accent">{p.with.label}</Mono>
                <p className="mt-1 font-mono text-[9px] tracking-[0.06em] text-muted-foreground">{p.with.integration}</p>
                <div className="mt-4"><Wiring mode="with" p={p} reduce={reduce} /></div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{p.with.note}</p>
              </div>
            </div>
            <div className="border-t border-[#EEF1F7] px-5 py-4 md:px-6">
              <p className="text-sm font-semibold text-foreground">{p.takeaway}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Chapter>
  );
}
