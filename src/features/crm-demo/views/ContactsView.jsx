import { useMemo, useState } from "react";
import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { demandsForContact, operationsForContact, visitsForContact } from "../store/selectors";
import { bi } from "../utils/format";
import { Card, DataTable, Input, PageHeader, Select, StatusBadge } from "../components/ui";

export default function ContactsView() {
  const { data } = useDemo();
  const { lang, S, go } = useUi();
  const [q, setQ] = useState("");
  const [role, setRole] = useState("all");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return data.contacts.filter(
      (c) => (role === "all" || c.role === role) && (!needle || c.id.toLowerCase().includes(needle) || bi(c.name, lang).toLowerCase().includes(needle))
    );
  }, [data.contacts, q, role, lang]);

  const columns = [
    { key: "name", label: S.common.contact, render: (c) => <span className="font-medium text-slate-900">{bi(c.name, lang)}</span>, mobileFull: true },
    { key: "id", label: S.common.ref, render: (c) => <span className="font-mono text-[12px] text-blue-700">{c.id}</span> },
    { key: "role", label: S.common.role, render: (c) => <StatusBadge kind="contactRole" value={c.role} S={S} /> },
    { key: "channel", label: S.common.channel, render: (c) => S.enums.channel[c.channel], hideMobile: true },
    { key: "stage", label: S.common.stage, render: (c) => (c.stage ? <StatusBadge kind="demandStatus" value={c.stage} S={S} /> : S.common.none) },
    { key: "demands", label: S.common.demand, render: (c) => demandsForContact(data, c.id).map((d) => d.id).join(", ") || S.common.none, hideMobile: true },
    { key: "visits", label: S.common.visits, render: (c) => visitsForContact(data, c.id).length, hideMobile: true },
    { key: "ops", label: S.common.operation, render: (c) => operationsForContact(data, c.id).length, hideMobile: true },
  ];

  return (
    <div>
      <PageHeader title={S.contacts.title} subtitle={S.contacts.subtitle} />
      <Card>
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-100 px-4 py-3">
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder={S.common.search} className="w-full sm:w-56" />
          <Select value={role} onChange={(e) => setRole(e.target.value)} aria-label={S.common.role}>
            <option value="all">{S.common.role}: {S.common.all}</option>
            {Object.entries(S.enums.contactRole).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </Select>
          <span className="ml-auto text-[11.5px] text-slate-500">{rows.length} {S.common.results}</span>
        </div>
        <DataTable columns={columns} rows={rows} onRowClick={(c) => go("contact", c.id)} empty={S.common.noResults} />
      </Card>
    </div>
  );
}
