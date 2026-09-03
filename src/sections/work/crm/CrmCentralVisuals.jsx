import { ChevronRight, FileText, Phone, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

/*
 * Enterprise-style microvisuals for the connected system panel — small
 * fragments of product UI (records, steppers, pipelines, task strips),
 * not illustrations. Demo data only; every visible word comes from the
 * item's i18n copy. Rendered aria-hidden by the module.
 */

/* ── quiet atoms ─────────────────────────────────────────────── */

function Frame({ className = "", children }) {
  return (
    <div className={cn("rounded-md border border-border bg-[#FCFBF8] p-3", className)}>
      {children}
    </div>
  );
}

function Bar({ className = "" }) {
  return <span className={cn("block h-1.5 rounded-full bg-foreground/[0.08]", className)} />;
}

function Dot({ accent = false, className = "" }) {
  return (
    <span
      className={cn(
        "h-1.5 w-1.5 shrink-0 rounded-full",
        accent ? "bg-accent" : "bg-foreground/20",
        className
      )}
    />
  );
}

function Thumb({ className = "h-4 w-5" }) {
  return (
    <span
      className={cn(
        "shrink-0 rounded-[3px] bg-gradient-to-br from-[#DCE5F5] to-[#EDF2FF]",
        className
      )}
    />
  );
}

function Pill({ tone = "muted", className = "", children }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center rounded-sm px-1.5 py-[3px] font-mono text-[8.5px] uppercase leading-none tracking-[0.1em]",
        tone === "accent" ? "bg-[#EDF2FF] text-accent" : "bg-secondary text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
}

function Field({ label, children }) {
  return (
    <div className="min-w-0">
      <dt className="text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{label}</dt>
      <dd className="mt-1">{children}</dd>
    </div>
  );
}

/** Horizontal status timeline: done · current · upcoming. */
function Stepper({ steps, current }) {
  return (
    <ol className="flex items-start">
      {steps.map((step, i) => {
        const done = i < current;
        const now = i === current;
        return (
          <li key={step} className="flex min-w-0 flex-1 flex-col items-center">
            <span className="flex w-full items-center">
              <span
                className={cn(
                  "h-px flex-1",
                  i === 0 ? "bg-transparent" : done || now ? "bg-accent/50" : "bg-border"
                )}
              />
              <span
                className={cn(
                  "h-2 w-2 shrink-0 rounded-full border",
                  now
                    ? "border-accent bg-accent shadow-[0_0_0_3px_rgba(49,87,246,0.15)]"
                    : done
                      ? "border-accent/60 bg-accent/60"
                      : "border-border bg-white"
                )}
              />
              <span
                className={cn(
                  "h-px flex-1",
                  i === steps.length - 1 ? "bg-transparent" : done ? "bg-accent/50" : "bg-border"
                )}
              />
            </span>
            <span
              className={cn(
                "mt-1.5 max-w-full truncate px-0.5 text-center text-[9px] leading-tight",
                now ? "font-semibold text-accent" : done ? "text-foreground/70" : "text-muted-foreground"
              )}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}

/** A quiet strip of the domains a record is wired to. */
function LinkStrip({ label, links, className = "" }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-2 gap-y-1.5", className)}>
      <span className="text-[9px] uppercase tracking-[0.08em] text-muted-foreground">{label}</span>
      {links.map((link, i) => (
        <span key={link} className="flex items-center gap-1.5">
          <span className={cn("h-px w-2.5", i === 0 ? "bg-accent/60" : "bg-border")} />
          <span className="rounded-sm border border-accent/25 bg-white px-1.5 py-0.5 font-mono text-[8.5px] text-foreground/75">
            {link}
          </span>
        </span>
      ))}
    </div>
  );
}

/* ── 01 Inmuebles — the operational property record ───────────── */

function PropertiesVisual({ item }) {
  const [status, price, images, docs, availability] = item.tags;
  const u = item.ui;
  return (
    <Frame>
      <div className="flex items-center justify-between gap-3">
        <span className="flex min-w-0 items-center gap-2.5">
          <Thumb className="h-10 w-12" />
          <span className="min-w-0">
            <Bar className="w-28 bg-foreground/15" />
            <Bar className="mt-1.5 w-16" />
            <span className="mt-1.5 block font-mono text-[8.5px] text-muted-foreground">
              REF-1042
            </span>
          </span>
        </span>
        <span className="flex items-center gap-2">
          <span className="text-[9px] uppercase tracking-[0.08em] text-muted-foreground">
            {status}
          </span>
          <Pill tone="accent">{u.status}</Pill>
        </span>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2.5 border-t border-border pt-3 lg:grid-cols-4">
        <Field label={price}>
          <span className="font-heading text-xs font-bold text-foreground">€ 248.000</span>
        </Field>
        <Field label={availability}>
          <span className="flex items-center gap-1.5 text-[10px] text-foreground/80">
            <Dot accent />
            {u.availability}
          </span>
        </Field>
        <Field label={images}>
          <span className="flex gap-1">
            {[0, 1, 2, 3].map((i) => (
              <Thumb key={i} className="h-4 w-5" />
            ))}
          </span>
        </Field>
        <Field label={docs}>
          <span className="flex items-center gap-1.5">
            <Dot accent />
            <Dot accent />
            <Dot />
            <span className="ml-0.5 font-mono text-[9px] text-muted-foreground">2/3</span>
          </span>
        </Field>
      </dl>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-3">
        {u.portals.map((portal) => (
          <span key={portal} className="flex items-center gap-1.5 text-[10px] text-foreground/80">
            <Dot accent />
            {portal}
            <Pill className="ml-0.5">{u.published}</Pill>
          </span>
        ))}
        <LinkStrip label={u.linksLabel} links={u.links} className="sm:ml-auto" />
      </div>
    </Frame>
  );
}

/* ── 02 Clientes — profile + linked activity ─────────────────── */

function ClientsVisual({ item }) {
  return (
    <Frame>
      <div className="flex items-center gap-2.5">
        <span className="h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-[#DCE5F5] to-[#EDF2FF]" />
        <span className="min-w-0 flex-1">
          <Bar className="w-3/5 bg-foreground/15" />
          <Bar className="mt-1.5 w-2/5" />
        </span>
        <Pill tone="accent">{item.tags[0]}</Pill>
      </div>
      <ul className="ml-3 mt-3 border-l border-accent/30 pl-3">
        {item.ui.activity.map((entry, i) => (
          <li
            key={entry}
            className="relative flex items-center gap-2 py-1 text-[10px] text-foreground/80"
          >
            <Dot accent={i === 0} className={cn("absolute -left-4", i > 0 && "bg-accent/40")} />
            {entry}
            <Bar className="ml-auto w-8" />
          </li>
        ))}
      </ul>
    </Frame>
  );
}

/* ── 03 Demandas — criteria converging into matches ──────────── */

function DemandVisual({ item }) {
  return (
    <Frame className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
      <div className="flex flex-wrap gap-1">
        {item.tags.map((tag, i) => (
          <span
            key={tag}
            className={cn(
              "rounded-sm border px-1.5 py-0.5 font-mono text-[8.5px]",
              i < 3
                ? "border-accent/40 bg-[#EDF2FF] text-accent"
                : "border-border bg-white text-muted-foreground"
            )}
          >
            {tag}
          </span>
        ))}
      </div>
      <span className="flex items-center">
        <span className="h-px w-4 bg-accent/50" />
        <ChevronRight className="-ml-1 h-3 w-3 text-accent" />
      </span>
      <div className="rounded-sm border border-border bg-white p-2">
        <p className="font-mono text-[8.5px] uppercase tracking-[0.1em] text-accent">
          {item.ui.matches}
        </p>
        <div className="mt-1.5 space-y-1">
          {["w-3/4", "w-1/2", "w-2/3"].map((w) => (
            <span key={w} className="flex items-center gap-1.5">
              <Thumb className="h-3.5 w-4" />
              <Bar className={w} />
            </span>
          ))}
        </div>
      </div>
    </Frame>
  );
}

/* ── 04 Prospectos — acquisition progression ─────────────────── */

function ProspectsVisual({ item }) {
  const u = item.ui;
  return (
    <Frame>
      <p className="text-[9px] uppercase tracking-[0.1em] text-muted-foreground">{u.stage}</p>
      <div className="mt-2 flex gap-1">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn(
              "h-1.5 flex-1 rounded-full",
              i < 2 ? "bg-accent" : i === 2 ? "bg-accent/30" : "bg-foreground/[0.08]"
            )}
          />
        ))}
      </div>
      <div className="mt-3 space-y-1.5 text-[10px]">
        <p className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">{u.tasks}</span>
          <span className="font-mono text-foreground">2</span>
        </p>
        <p className="flex items-center justify-between gap-2">
          <span className="text-muted-foreground">{u.activity}</span>
          <span className="font-mono text-foreground">3d</span>
        </p>
      </div>
    </Frame>
  );
}

/* ── 05 Leads — first-contact timer ──────────────────────────── */

function LeadsVisual({ item }) {
  const u = item.ui;
  return (
    <Frame>
      <div className="flex items-center gap-2">
        <Pill tone="accent">{u.assigned}</Pill>
        <span className="relative h-px flex-1 bg-border">
          <span className="absolute left-0 top-0 h-px w-2/3 bg-accent/60" />
          <span className="absolute left-2/3 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent motion-safe:animate-pulse" />
        </span>
        <Pill>{u.contacted}</Pill>
      </div>
      <p className="mt-2.5 flex items-center justify-between font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted-foreground">
        <span>{u.first}</span>
        <span className="text-accent">00:42</span>
      </p>
    </Frame>
  );
}

/* ── 06 Visitas — status timeline ────────────────────────────── */

function VisitsVisual({ item }) {
  return (
    <Frame>
      <Stepper steps={item.statuses} current={2} />
      <LinkStrip
        label={item.ui.linksLabel}
        links={item.ui.links}
        className="mt-3 border-t border-border pt-3"
      />
    </Frame>
  );
}

/* ── 07 Operaciones — the closing pipeline ───────────────────── */

function OperationsVisual({ item }) {
  const current = 2;
  const fills = ["w-3/5", "w-1/2", "w-full"];
  const values = ["3/5", "2/4", "OK"];
  return (
    <Frame>
      <ol className="flex flex-wrap items-center gap-y-2">
        {item.flow.map((phase, i) => (
          <li key={phase} className="flex items-center lg:flex-1 last:lg:flex-none">
            <span
              className={cn(
                "rounded-sm border px-2 py-1 text-center font-mono text-[9px] uppercase tracking-[0.08em] lg:flex-1 lg:px-3 lg:py-2 lg:text-[10px]",
                i === current
                  ? "border-accent bg-[#EDF2FF] text-accent"
                  : i < current
                    ? "border-accent/30 bg-white text-foreground/70"
                    : "border-border bg-white text-muted-foreground"
              )}
            >
              {phase}
            </span>
            {i < item.flow.length - 1 && (
              <span
                className={cn(
                  "mx-1.5 h-px w-3 shrink-0 lg:mx-2.5 lg:w-6",
                  i < current ? "bg-accent/50" : "bg-border"
                )}
              />
            )}
          </li>
        ))}
      </ol>
      <div className="mt-3 grid grid-cols-3 gap-3 border-t border-border pt-3 lg:gap-8">
        {item.ui.meters.map((meter, i) => (
          <div key={meter} className="min-w-0">
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-[9px] text-muted-foreground">{meter}</span>
              <span className="font-mono text-[8px] text-muted-foreground">{values[i]}</span>
            </div>
            <span className="mt-1.5 block h-1 w-full overflow-hidden rounded-full bg-foreground/[0.07]">
              <span className={cn("block h-full rounded-full bg-accent/70", fills[i])} />
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

/* ── 08 Documentación — states inside the workflow ───────────── */

function DocumentsVisual({ item }) {
  const u = item.ui;
  return (
    <Frame>
      <Stepper steps={item.flow} current={1} />
      <ul className="mt-3 space-y-1.5 border-t border-border pt-3">
        {u.docs.map((doc, i) => (
          <li key={doc} className="flex items-center justify-between gap-2 text-[10px]">
            <span className="flex min-w-0 items-center gap-1.5 text-foreground/80">
              <FileText className="h-3 w-3 shrink-0 text-muted-foreground" />
              <span className="truncate">{doc}</span>
            </span>
            <Pill tone={i === 0 ? "accent" : "muted"}>{item.flow[i === 0 ? 1 : 2]}</Pill>
          </li>
        ))}
      </ul>
      <p className="mt-2.5 flex items-center justify-between gap-2 text-[9px] text-muted-foreground">
        <span className="truncate">{u.checklist}</span>
        <span className="flex items-center gap-1">
          <Dot accent />
          <Dot accent />
          <Dot />
          <span className="ml-0.5 font-mono">2/3</span>
        </span>
      </p>
    </Frame>
  );
}

/* ── 09 Comunicación — linked conversation rows ──────────────── */

function CommunicationVisual({ item }) {
  const [whatsapp, calls, followUp] = item.tags;
  return (
    <Frame>
      <ul className="space-y-2">
        <li className="flex items-center gap-2 rounded-sm border border-border bg-white px-2 py-1.5">
          <Dot accent />
          <span className="truncate font-mono text-[8.5px] uppercase tracking-[0.1em] text-foreground/80">
            {whatsapp}
          </span>
          <Bar className="ml-1 min-w-3 max-w-14 flex-1" />
          <Pill tone="accent" className="ml-auto">
            {item.ui.incoming}
          </Pill>
        </li>
        <li className="flex items-center gap-2 rounded-sm border border-border bg-white px-2 py-1.5">
          <Phone className="h-3 w-3 shrink-0 text-accent" />
          <span className="truncate font-mono text-[8.5px] uppercase tracking-[0.1em] text-foreground/80">
            {calls}
          </span>
          <Bar className="ml-1 min-w-3 max-w-10 flex-1" />
          <span className="ml-auto shrink-0 font-mono text-[8.5px] uppercase tracking-[0.1em] text-muted-foreground">
            {followUp}
          </span>
        </li>
      </ul>
      <p className="mt-2.5 flex items-center gap-1.5 text-[9px] text-muted-foreground">
        <span className="h-px w-3 shrink-0 bg-accent/50" />
        {item.ui.linked}
      </p>
    </Frame>
  );
}

/* ── 10 Agenda — the day's task strip ────────────────────────── */

function CalendarVisual({ item }) {
  return (
    <Frame>
      <ul className="space-y-1.5">
        {item.ui.rows.map(([time, label], i) => (
          <li key={time} className="flex items-center gap-2 text-[10px]">
            <span className="w-8 shrink-0 font-mono text-[9px] text-muted-foreground">{time}</span>
            <Dot accent={i === 0} />
            <span className="text-foreground/80">{label}</span>
            <Bar className="ml-auto w-6" />
          </li>
        ))}
      </ul>
      <p className="mt-2.5 flex items-center gap-1.5 border-t border-border pt-2 text-[9px] text-muted-foreground">
        <RefreshCw className="h-2.5 w-2.5 shrink-0 text-accent" />
        {item.ui.sync}
      </p>
    </Frame>
  );
}

export const VISUALS = {
  properties: PropertiesVisual,
  clients: ClientsVisual,
  demand: DemandVisual,
  prospects: ProspectsVisual,
  leads: LeadsVisual,
  visits: VisitsVisual,
  operations: OperationsVisual,
  documents: DocumentsVisual,
  communication: CommunicationVisual,
  calendar: CalendarVisual,
};
