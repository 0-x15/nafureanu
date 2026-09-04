import { useMemo, useState } from "react";
import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { contactById, matchesForDemand } from "../store/selectors";
import { bi, money } from "../utils/format";
import { Card, DataTable, Input, PageHeader, Select, StatusBadge } from "../components/ui";

export default function DemandsView() {
  const { data } = useDemo();
  const { lang, S, go } = useUi();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return data.demands.filter((d) => {
      const contact = contactById(data, d.contactId);
      return (
        (status === "all" || d.status === status) &&
        (!needle || d.id.toLowerCase().includes(needle) || (contact && bi(contact.name, lang).toLowerCase().includes(needle)) || S.enums.zone[d.zone].toLowerCase().includes(needle))
      );
    });
  }, [data, q, status, lang, S]);

  const columns = [
    { key: "id", label: S.common.ref, render: (d) => <span className="font-mono text-[12px] text-blue-700">{d.id}</span> },
    { key: "client", label: S.common.client, render: (d) => { const c = contactById(data, d.contactId); return c ? bi(c.name, lang) : d.contactId; }, mobileFull: true },
    { key: "kind", label: S.common.type, render: (d) => `${S.enums.kind[d.kind]} · ${S.enums.propertyType[d.type]}` },
    { key: "zone", label: S.common.zone, render: (d) => S.enums.zone[d.zone] },
    { key: "budget", label: S.common.budget, render: (d) => `≤ ${money(d.maxBudget, lang, d.kind, S)}` },
    { key: "bedrooms", label: S.common.bedrooms, render: (d) => `${d.minBedrooms}+`, hideMobile: true },
    { key: "matches", label: S.common.matches, render: (d) => <span className="font-medium text-slate-900">{matchesForDemand(data, d).length}</span> },
    { key: "status", label: S.common.status, render: (d) => <StatusBadge kind="demandStatus" value={d.status} S={S} /> },
  ];

  return (
    <div>
      <PageHeader title={S.demands.title} subtitle={S.demands.subtitle} />
      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={S.common.search} className="w-full sm:w-56" />
          <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label={S.common.status}>
            <option value="all">{S.common.status}: {S.common.all}</option>
            {Object.entries(S.enums.demandStatus).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </Select>
          <span className="ml-auto text-[11.5px] text-slate-500">{rows.length} {S.common.results}</span>
        </div>
        <DataTable columns={columns} rows={rows} onRowClick={(d) => go("demand", d.id)} empty={S.common.noResults} />
      </Card>
    </div>
  );
}
