import { useMemo, useState } from "react";
import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { agendaItems, contactById } from "../store/selectors";
import { bi, cx, dayLabel, formatDate } from "../utils/format";
import { Button, Card, CardHeader, PageHeader, StatusBadge } from "../components/ui";

const DAYS = [-1, 0, 1, 2, 3, 4, 5];

/** Practical week agenda: visits, follow-ups and calls, live from the store. */
export default function CalendarView() {
  const { data, completeTask } = useDemo();
  const { lang, S, nav, go, toast } = useUi();
  /* Focus the day of the most recently created visit when asked to (guided tour) */
  const [day, setDay] = useState(() => {
    const latest = nav.params?.focusLatest ? data.visits[data.visits.length - 1] : null;
    return latest && DAYS.includes(latest.dayOffset) ? latest.dayOffset : 0;
  });
  const items = useMemo(() => agendaItems(data), [data]);
  const byDay = (offset) => items.filter((i) => i.dayOffset === offset);
  const selected = byDay(day);

  const open = (item) => {
    if (item.kind === "visit") go("visit", item.id);
    else if (item.refs.operationId) go("operation", item.refs.operationId);
    else if (item.refs.demandId) go("demand", item.refs.demandId);
    else if (item.refs.propertyId) go("property", item.refs.propertyId);
    else if (item.refs.contactId) go("contact", item.refs.contactId);
  };

  return (
    <div>
      <PageHeader title={S.calendar.title} subtitle={S.calendar.subtitle} />
      <Card>
        <div role="tablist" aria-label={S.calendar.week} className="grid grid-cols-7 border-b border-slate-200">
          {DAYS.map((offset) => {
            const count = byDay(offset).filter((i) => !i.done).length;
            return (
              <button
                key={offset}
                type="button"
                role="tab"
                aria-selected={day === offset}
                onClick={() => setDay(offset)}
                className={cx(
                  "flex flex-col items-center gap-0.5 border-b-2 px-1 py-2.5 text-center transition-colors",
                  day === offset ? "border-blue-600 bg-blue-50/40" : "border-transparent hover:bg-slate-50"
                )}
              >
                <span className={cx("text-[10.5px] uppercase tracking-[0.06em]", offset === 0 ? "font-semibold text-blue-700" : "text-slate-500")}>
                  {offset === 0 ? S.common.today : formatDate(offset, lang, { weekday: "short", day: undefined, month: undefined })}
                </span>
                <span className="text-[13px] font-semibold text-slate-800">{formatDate(offset, lang, { weekday: undefined, day: "numeric", month: undefined })}</span>
                <span className={cx("h-4 min-w-4 rounded-full px-1 text-[10px] font-semibold leading-4", count ? "bg-blue-600 text-white" : "text-transparent")}>{count || "0"}</span>
              </button>
            );
          })}
        </div>
        <CardHeader title={dayLabel(day, lang, S)} subtitle={formatDate(day, lang, { weekday: "long", day: "numeric", month: "long" })} />
        {selected.length === 0 ? (
          <p className="px-4 py-8 text-center text-[12.5px] text-slate-500">{S.calendar.empty}</p>
        ) : (
          <ul className="divide-y divide-slate-100">
            {selected.map((item) => {
              const contact = contactById(data, item.refs.contactId);
              return (
                <li key={item.id} className={cx("flex flex-wrap items-center gap-3 px-4 py-2.5", item.done && "opacity-60")}>
                  <span className="w-12 shrink-0 font-mono text-[12px] text-slate-600">{item.time}</span>
                  <StatusBadge kind="agendaType" value={item.type} S={S} />
                  <button type="button" onClick={() => open(item)} className="min-w-0 flex-1 text-left text-[12.5px] text-slate-800 hover:text-blue-700">
                    <span className="font-medium">{item.kind === "visit" ? `${S.calendar.kinds.visit} · ${item.refs.propertyId}` : S.agendaTasks[item.labelKey]}</span>
                    {contact && <span className="text-slate-500"> · {bi(contact.name, lang)}</span>}
                    {item.duration && <span className="text-slate-400"> · {item.duration} {S.common.min}</span>}
                  </button>
                  {item.kind === "visit" ? (
                    <StatusBadge kind="visitStatus" value={item.status} S={S} />
                  ) : item.done ? (
                    <span className="text-[11px] text-slate-400">{S.calendar.done}</span>
                  ) : (
                    <Button size="xs" onClick={() => { completeTask(item.id); toast(S.toasts.task); }}>{S.calendar.markDone}</Button>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
}
