import { motion, useReducedMotion } from "framer-motion";

function Panel({ title, children }) {
  return (
    <div className="flex-1 rounded-xl border border-border bg-card p-5 text-left">
      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </p>
      <div className="mt-4 space-y-3">{children}</div>
    </div>
  );
}

function Connector({ reduced }) {
  return (
    <motion.span
      aria-hidden="true"
      className="h-6 w-px bg-accent/50 md:h-px md:w-10"
      animate={reduced ? undefined : { opacity: [0.35, 1, 0.35] }}
      transition={reduced ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

function MatchingNode({ label, reduced }) {
  return (
    <div className="relative flex items-center justify-center py-1">
      {!reduced && (
        <motion.span
          aria-hidden="true"
          className="absolute h-14 w-14 rounded-full border border-accent/40"
          animate={{ scale: [1, 1.4], opacity: [0.7, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
        />
      )}
      <span className="relative rounded-lg border border-accent/50 bg-[#EDF2FF] px-5 py-3 font-heading text-sm font-bold uppercase tracking-[0.12em] text-accent-deep">
        {label}
      </span>
    </div>
  );
}

/** Generic animated matching demo — demanda → matching → coincidencias. */
export default function MatchingDemo({ demo }) {
  const reduced = useReducedMotion();
  return (
    <div className="flex flex-col items-stretch gap-5 md:flex-row md:items-center">
      <Panel title={demo.demand}>
        {demo.criteria.map((label, i) => (
          <div key={label} className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-foreground">{label}</p>
            <span
              aria-hidden="true"
              className="h-1.5 rounded-full bg-foreground/10"
              style={{ width: `${58 - i * 10}%` }}
            />
          </div>
        ))}
      </Panel>

      <Connector reduced={reduced} />
      <MatchingNode label={demo.engine} reduced={reduced} />
      <Connector reduced={reduced} />

      <Panel title={demo.results}>
        {[0, 1].map((i) => (
          <div
            key={i}
            className="flex items-center gap-3 rounded-md border border-border bg-white px-3 py-2.5"
          >
            <span
              aria-hidden="true"
              className="h-6 w-6 shrink-0 rounded bg-gradient-to-br from-[#DCE5F5] to-[#EDF2FF]"
            />
            <span className="flex-1 text-xs font-medium text-foreground">
              {demo.resultRow}
            </span>
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />
          </div>
        ))}
      </Panel>
    </div>
  );
}