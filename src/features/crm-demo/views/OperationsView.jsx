import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { contactById } from "../store/selectors";
import { bi, money, relativeTime, hoursAgoTs } from "../utils/format";
import { Card, DataTable, PageHeader, StatusBadge } from "../components/ui";

export default function OperationsView() {
  const { data } = useDemo();
  const { lang, S, go } = useUi();
  const O = S.operations;
  const columns = [
    { key: "id", label: S.common.ref, render: (o) => <span className="font-mono text-[12px] text-blue-700">{o.id}</span> },
    { key: "property", label: S.common.property, render: (o) => <span className="font-mono text-[12px]">{o.propertyId}</span> },
    { key: "buyer", label: O.buyer, render: (o) => { const c = contactById(data, o.contactId); return c ? bi(c.name, lang) : o.contactId; }, mobileFull: true },
    { key: "price", label: S.common.agreedPrice, render: (o) => <span className="font-medium text-slate-900">{money(o.price, lang, "sale", S)}</span> },
    { key: "opened", label: S.common.opened, render: (o) => relativeTime(hoursAgoTs(o.openedHours), lang, S), hideMobile: true },
    { key: "stage", label: S.common.stage, render: (o) => <StatusBadge kind="operationStage" value={o.stage} S={S} /> },
  ];
  return (
    <div>
      <PageHeader title={O.title} subtitle={O.subtitle} />
      <Card>
        <DataTable columns={columns} rows={data.operations} onRowClick={(o) => go("operation", o.id)} empty={S.common.noResults} />
      </Card>
    </div>
  );
}
