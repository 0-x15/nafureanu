import { forwardRef } from "react";
import { ArrowLeft } from "lucide-react";
import { cx } from "../utils/format";

/* Compact enterprise UI atoms for the demo application. */

const TONES = {
  neutral: "border-slate-200 bg-slate-50 text-slate-600",
  blue: "border-blue-200 bg-blue-50 text-blue-700",
  green: "border-emerald-200 bg-emerald-50 text-emerald-700",
  amber: "border-amber-200 bg-amber-50 text-amber-800",
  red: "border-rose-200 bg-rose-50 text-rose-700",
  violet: "border-violet-200 bg-violet-50 text-violet-700",
  yellow: "border-yellow-300 bg-yellow-50 text-yellow-800",
};

export const TONE_OF = {
  visitStatus: {
    scheduled: "blue",
    confirmed: "green",
    completed: "neutral",
    noShow: "amber",
    cancelled: "red",
  },
  docStatus: {
    pending: "amber",
    review: "blue",
    approved: "green",
    signed: "violet",
  },
  operationStage: {
    negotiation: "neutral",
    offer: "blue",
    deposit: "violet",
    financing: "amber",
    deed: "blue",
    completed: "green",
  },
  propertyStatus: {
    active: "green",
    reserved: "amber",
    sold: "neutral",
    rented: "neutral",
  },
  demandStatus: {
    new: "blue",
    contacted: "neutral",
    qualified: "violet",
    visiting: "amber",
    negotiating: "blue",
    won: "green",
  },
  contactRole: { buyer: "blue", tenant: "violet", owner: "neutral" },
  agendaType: {
    visit: "blue",
    followup: "violet",
    call: "amber",
    task: "neutral",
  },
};

export function Badge({ tone = "neutral", className = "", children }) {
  return (
    <span
      className={cx(
        "inline-flex shrink-0 items-center whitespace-nowrap rounded-md border px-1.5 py-0.5 text-[11px] font-medium leading-tight",
        TONES[tone] || TONES.neutral,
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Enum-driven status badge. */
export function StatusBadge({ kind, value, S, className = "" }) {
  const label = (S.enums[kind] || {})[value] || value;
  return (
    <Badge
      tone={(TONE_OF[kind] || {})[value] || "neutral"}
      className={className}
    >
      {label}
    </Badge>
  );
}

/**
 * @param {Record<string, any>} props
 * @param {import("react").ForwardedRef<HTMLButtonElement>} ref
 */
function ButtonInner(
  {
    variant = "secondary",
    size = "sm",
    className = "",
    type = "button",
    ...props
  },
  ref,
) {
  const base =
    "inline-flex items-center justify-center gap-1.5 rounded-md border font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50";
  const variants = {
    primary: "border-blue-700 bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50",
    ghost:
      "border-transparent bg-transparent text-slate-600 hover:bg-slate-100",
    danger: "border-rose-200 bg-white text-rose-700 hover:bg-rose-50",
  };
  const sizes = {
    xs: "h-7 px-2 text-[11px]",
    sm: "h-8 px-3 text-[12px]",
    md: "h-9 px-4 text-[13px]",
  };
  return (
    <button
      ref={ref}
      type={type}
      className={cx(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
export const Button = forwardRef(ButtonInner);

export function Card({ className = "", children }) {
  return (
    <div
      className={cx(
        "min-w-0 rounded-lg border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  title,
  subtitle = null,
  actions = null,
  className = "",
}) {
  return (
    <div
      className={cx(
        "flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-4 py-3",
        className,
      )}
    >
      <div>
        <h3 className="text-[13px] font-semibold text-slate-800">{title}</h3>
        {subtitle && (
          <p className="mt-0.5 text-[11.5px] text-slate-500">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      )}
    </div>
  );
}

export function Field({ label, children, className = "" }) {
  return (
    <div className={cx("min-w-0", className)}>
      <dt className="text-[10.5px] font-medium uppercase tracking-[0.08em] text-slate-400">
        {label}
      </dt>
      <dd className="mt-0.5 text-[13px] text-slate-800">{children}</dd>
    </div>
  );
}

export function Fields({ children, className = "" }) {
  return (
    <dl
      className={cx(
        "grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {children}
    </dl>
  );
}

export function PageHeader({
  title,
  subtitle = null,
  badge = null,
  actions = null,
  onBack = null,
  backLabel = "",
}) {
  return (
    <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
      <div className="min-w-0">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="mb-2 inline-flex items-center gap-1 text-[12px] font-medium text-slate-500 hover:text-slate-800"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {backLabel}
          </button>
        )}
        <div className="flex flex-wrap items-center gap-2.5">
          <h1 className="text-[20px] font-semibold tracking-[-0.01em] text-slate-900">
            {title}
          </h1>
          {badge}
        </div>
        {subtitle && (
          <p className="mt-1 text-[12.5px] text-slate-500">{subtitle}</p>
        )}
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2">{actions}</div>
      )}
    </div>
  );
}

export function Tabs({ tabs, active, onChange, className = "" }) {
  return (
    <div
      role="tablist"
      className={cx(
        "flex flex-wrap gap-1 border-b border-slate-200",
        className,
      )}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          role="tab"
          aria-selected={active === tab.id}
          onClick={() => onChange(tab.id)}
          className={cx(
            "-mb-px border-b-2 px-3 py-2 text-[12.5px] font-medium transition-colors",
            active === tab.id
              ? "border-blue-600 text-blue-700"
              : "border-transparent text-slate-500 hover:text-slate-800",
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span className="ml-1.5 rounded-full bg-slate-100 px-1.5 text-[10.5px] text-slate-600">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/**
 * Responsive data table: a real table from md up, stacked cards below.
 * columns: [{ key, label, render(row), className, hideMobile }]
 */
export function DataTable({
  columns,
  rows,
  rowKey = (r) => r.id,
  onRowClick = null,
  empty = "",
  activeKey = null,
}) {
  if (!rows.length) {
    return (
      <p className="px-4 py-8 text-center text-[12.5px] text-slate-500">
        {empty}
      </p>
    );
  }
  return (
    <>
      <table className="hidden w-full border-collapse text-[12.5px] md:table">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50/80 text-left">
            {columns.map((col) => (
              <th
                key={col.key}
                className={cx(
                  "px-3 py-2 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-slate-500",
                  col.className,
                )}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => {
            const key = rowKey(row);
            return (
              <tr
                key={key}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
                className={cx(
                  "border-b border-slate-100 last:border-b-0",
                  onRowClick && "cursor-pointer hover:bg-blue-50/40",
                  activeKey === key && "bg-blue-50/60",
                )}
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cx(
                      "px-3 py-2.5 align-middle text-slate-700",
                      col.className,
                    )}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <ul className="divide-y divide-slate-100 md:hidden">
        {rows.map((row) => (
          <li
            key={rowKey(row)}
            onClick={onRowClick ? () => onRowClick(row) : undefined}
            className={cx(
              "px-4 py-3",
              onRowClick && "cursor-pointer active:bg-blue-50/40",
            )}
          >
            <dl className="grid grid-cols-2 gap-x-3 gap-y-1.5">
              {columns
                .filter((col) => !col.hideMobile)
                .map((col) => {
                  const value = col.render ? col.render(row) : row[col.key];
                  if (value == null || value === false) return null;
                  return (
                    <div
                      key={col.key}
                      className={cx("min-w-0", col.mobileFull && "col-span-2")}
                    >
                      <dt className="text-[10px] uppercase tracking-[0.08em] text-slate-400">
                        {col.label}
                      </dt>
                      <dd className="mt-0.5 truncate text-[12.5px] text-slate-800">
                        {value}
                      </dd>
                    </div>
                  );
                })}
            </dl>
          </li>
        ))}
      </ul>
    </>
  );
}

export function KpiCard({ label, value, hint, tone = "neutral", onClick }) {
  const Tag = onClick ? "button" : "div";
  return (
    <Tag
      type={onClick ? "button" : undefined}
      onClick={onClick}
      className={cx(
        "flex min-w-0 flex-col rounded-lg border border-slate-200 bg-white px-3.5 py-3 text-left shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        onClick &&
          "transition-colors hover:border-blue-300 hover:bg-blue-50/30",
      )}
    >
      <span className="truncate text-[11px] font-medium text-slate-500">
        {label}
      </span>
      <span className="mt-1 flex items-baseline gap-2">
        <span className="text-[22px] font-semibold leading-none tracking-[-0.02em] text-slate-900">
          {value}
        </span>
        {hint && <Badge tone={tone}>{hint}</Badge>}
      </span>
    </Tag>
  );
}

export function EmptyState({ children }) {
  return (
    <p className="rounded-md border border-dashed border-slate-200 px-4 py-6 text-center text-[12.5px] text-slate-500">
      {children}
    </p>
  );
}

export function Select({ className = "", ...props }) {
  return (
    <select
      className={cx(
        "h-8 rounded-md border border-slate-200 bg-white px-2 text-[12.5px] text-slate-700 focus:border-blue-400 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function Input({ className = "", ...props }) {
  return (
    <input
      className={cx(
        "h-8 rounded-md border border-slate-200 bg-white px-2.5 text-[12.5px] text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none",
        className,
      )}
      {...props}
    />
  );
}

export function Check({ done, auto }) {
  return (
    <span
      className={cx(
        "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border text-[10px]",
        done
          ? "border-blue-600 bg-blue-600 text-white"
          : "border-slate-300 bg-white",
        auto && !done && "border-dashed",
      )}
      aria-hidden="true"
    >
      {done ? "✓" : ""}
    </span>
  );
}

/** Reference-style link to another record. */
export function RefLink({ onClick, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={cx(
        "font-mono text-[12px] text-blue-700 hover:underline",
        className,
      )}
    >
      {children}
    </button>
  );
}
