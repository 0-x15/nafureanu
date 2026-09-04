import { useMemo, useState } from "react";
import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { matchesForProperty } from "../store/selectors";
import { money } from "../utils/format";
import { Card, DataTable, Input, PageHeader, Select, StatusBadge } from "../components/ui";

export default function PropertiesView() {
  const { data } = useDemo();
  const { lang, S, go } = useUi();
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [zone, setZone] = useState("all");
  const [type, setType] = useState("all");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return data.properties.filter(
      (p) =>
        (status === "all" || p.status === status) &&
        (zone === "all" || p.zone === zone) &&
        (type === "all" || p.type === type) &&
        (!needle || p.id.toLowerCase().includes(needle) || S.enums.zone[p.zone].toLowerCase().includes(needle))
    );
  }, [data.properties, q, status, zone, type, S]);

  const columns = [
    { key: "id", label: S.common.ref, render: (p) => <span className="font-mono text-[12px] text-blue-700">{p.id}</span> },
    { key: "type", label: S.common.type, render: (p) => S.enums.propertyType[p.type] },
    { key: "zone", label: S.common.zone, render: (p) => S.enums.zone[p.zone] },
    { key: "price", label: S.common.price, render: (p) => <span className="font-medium text-slate-900">{money(p.price, lang, p.kind, S)}</span> },
    { key: "bedrooms", label: S.common.bedrooms, render: (p) => p.bedrooms, hideMobile: true },
    { key: "surface", label: S.common.surface, render: (p) => `${p.surface} m²` },
    { key: "matches", label: S.common.matches, render: (p) => matchesForProperty(data, p).length, hideMobile: true },
    { key: "status", label: S.common.status, render: (p) => <StatusBadge kind="propertyStatus" value={p.status} S={S} /> },
  ];

  return (
    <div>
      <PageHeader title={S.properties.title} subtitle={S.properties.subtitle} />
      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={S.common.search} className="w-full sm:w-56" />
          <Select value={status} onChange={(e) => setStatus(e.target.value)} aria-label={S.common.status}>
            <option value="all">{S.common.status}: {S.common.all}</option>
            {Object.entries(S.enums.propertyStatus).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </Select>
          <Select value={zone} onChange={(e) => setZone(e.target.value)} aria-label={S.common.zone}>
            <option value="all">{S.common.zone}: {S.common.all}</option>
            {Object.entries(S.enums.zone).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </Select>
          <Select value={type} onChange={(e) => setType(e.target.value)} aria-label={S.common.type}>
            <option value="all">{S.common.type}: {S.common.all}</option>
            {Object.entries(S.enums.propertyType).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </Select>
          <span className="ml-auto text-[11.5px] text-slate-500">{rows.length} {S.common.results}</span>
        </div>
        <DataTable columns={columns} rows={rows} onRowClick={(p) => go("property", p.id)} empty={S.common.noResults} />
      </Card>
    </div>
  );
}
