import { useMemo, useState } from "react";
import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { contactById, sortVisits } from "../store/selectors";
import { bi, cx, dayLabel } from "../utils/format";
import { Card, DataTable, PageHeader, StatusBadge } from "../components/ui";

export default function VisitsView() {
  const { data } = useDemo();
  const { lang, S, go } = useUi();
  const [filter, setFilter] = useState("all");
  const V = S.visits;

  const rows = useMemo(() => {
    const all = sortVisits(data.visits);
    if (filter === "upcoming") return all.filter((v) => (v.status === "scheduled" || v.status === "confirmed") && v.dayOffset >= 0);
    if (filter === "done") return all.filter((v) => v.status === "completed");
    return all;
  }, [data.visits, filter]);

  const columns = [
    { key: "id", label: S.common.ref, render: (v) => <span className="font-mono text-[12px] text-blue-700">{v.id}</span> },
    { key: "date", label: S.common.date, render: (v) => `${dayLabel(v.dayOffset, lang, S)} · ${v.time}` },
    { key: "property", label: S.common.property, render: (v) => <span className="font-mono text-[12px]">{v.propertyId}</span> },
    { key: "contact", label: S.common.contact, render: (v) => { const c = contactById(data, v.contactId); return c ? bi(c.name, lang) : v.contactId; }, mobileFull: true },
    { key: "type", label: S.common.type, render: (v) => S.enums.visitType[v.type], hideMobile: true },
    { key: "status", label: S.common.status, render: (v) => <StatusBadge kind="visitStatus" value={v.status} S={S} /> },
  ];

  return (
    <div>
      <PageHeader
        title={V.title}
        subtitle={V.subtitle}
        actions={
          <div role="group" className="flex rounded-md border border-slate-200 bg-white p-0.5">
            {Object.entries(V.filters).map(([key, label]) => (
              <button key={key} type="button" aria-pressed={filter === key} onClick={() => setFilter(key)} className={cx("rounded px-2.5 py-1 text-[12px] font-medium", filter === key ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50")}>
                {label}
              </button>
            ))}
          </div>
        }
      />
      <Card>
        <DataTable columns={columns} rows={rows} onRowClick={(v) => go("visit", v.id)} empty={S.common.noResults} />
      </Card>
    </div>
  );
}
