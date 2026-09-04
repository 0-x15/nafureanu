import { useEffect, useMemo, useState } from "react";
import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { checklistFor } from "../utils/checklists";
import { bi, cx } from "../utils/format";
import { fill } from "../i18n";
import {
  Badge,
  Button,
  Card,
  CardHeader,
  Check,
  DataTable,
  PageHeader,
  RefLink,
  Select,
  StatusBadge,
} from "../components/ui";

/** Documents with status workflow and the system-driven checklist of the selected record. */
export default function DocumentsView() {
  const { data, setDocumentStatus } = useDemo();
  const { lang, S, nav, go, toast } = useUi();
  const D = S.documents;
  const [filter, setFilter] = useState("all");
  const [entity, setEntity] = useState(() =>
    nav.params?.entityType
      ? `${nav.params.entityType}:${nav.params.entityId}`
      : "property:DEMO-P001",
  );
  useEffect(() => {
    if (nav.params?.entityType)
      setEntity(`${nav.params.entityType}:${nav.params.entityId}`);
    else if (nav.params?.documentId) {
      const doc = data.documents.find((d) => d.id === nav.params.documentId);
      if (doc) setEntity(`${doc.entityType}:${doc.entityId}`);
    }
  }, [nav.params, data.documents]);

  const [entityType, entityId] = entity.split(":");
  const record =
    entityType === "property"
      ? data.properties.find((p) => p.id === entityId)
      : data.operations.find((o) => o.id === entityId);
  const checklist = record
    ? checklistFor(entityType, record, data.documents)
    : [];
  const entityOptions = [
    ...data.properties.map((p) => ({
      value: `property:${p.id}`,
      label: `${S.enums.entityType.property} · ${p.id}`,
    })),
    ...data.operations.map((o) => ({
      value: `operation:${o.id}`,
      label: `${S.enums.entityType.operation} · ${o.id}`,
    })),
  ];

  const rows = useMemo(() => {
    const all = data.documents;
    if (filter === "pending")
      return all.filter((d) => d.status === "pending" || d.status === "review");
    if (filter === "approved")
      return all.filter(
        (d) => d.status === "approved" || d.status === "signed",
      );
    return all;
  }, [data.documents, filter]);

  const setStatus = (doc, status) => {
    const before = record
      ? checklistFor(
          doc.entityType,
          doc.entityType === "property"
            ? data.properties.find((p) => p.id === doc.entityId)
            : data.operations.find((o) => o.id === doc.entityId),
          data.documents,
        )
      : null;
    setDocumentStatus(doc.id, status);
    toast(
      fill(S.toasts.document, {
        name: bi(doc.name, lang),
        status: S.enums.docStatus[status].toLowerCase(),
      }),
    );
    if (
      before &&
      (status === "approved" || status === "signed") &&
      doc.checklistKey
    ) {
      const row = before.find((r) => r.key === doc.checklistKey);
      if (row && !row.done)
        window.setTimeout(() => toast(S.toasts.checklist), 400);
    }
  };

  const columns = [
    {
      key: "name",
      label: D.columns.name,
      render: (d) => (
        <span className="font-medium text-slate-900">{bi(d.name, lang)}</span>
      ),
      mobileFull: true,
    },
    {
      key: "related",
      label: D.columns.related,
      render: (d) => (
        <span className="flex items-center gap-2">
          <span className="text-[11px] text-slate-500">
            {S.enums.entityType[d.entityType]}
          </span>
          <RefLink onClick={() => go(d.entityType, d.entityId)}>
            {d.entityId}
          </RefLink>
        </span>
      ),
    },
    {
      key: "status",
      label: D.columns.status,
      render: (d) => <StatusBadge kind="docStatus" value={d.status} S={S} />,
    },
    {
      key: "actions",
      label: S.common.actions,
      className: "text-right",
      mobileFull: true,
      render: (d) =>
        d.status === "signed" ? null : (
          <span
            className="flex flex-wrap justify-end gap-1.5"
            onClick={(e) => e.stopPropagation()}
          >
            {d.status === "pending" && (
              <Button size="xs" onClick={() => setStatus(d, "review")}>
                {D.actions.review}
              </Button>
            )}
            {(d.status === "pending" || d.status === "review") && (
              <Button
                size="xs"
                variant="primary"
                onClick={() => setStatus(d, "approved")}
              >
                {D.actions.approve}
              </Button>
            )}
            {d.status === "approved" && (
              <Button size="xs" onClick={() => setStatus(d, "signed")}>
                {D.actions.sign}
              </Button>
            )}
          </span>
        ),
    },
  ];

  return (
    <div>
      <PageHeader
        title={D.title}
        subtitle={D.subtitle}
        actions={
          <div
            role="group"
            className="flex rounded-md border border-slate-200 bg-white p-0.5"
          >
            {Object.entries(D.filters).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={filter === key}
                onClick={() => setFilter(key)}
                className={cx(
                  "rounded px-2.5 py-1 text-[12px] font-medium",
                  filter === key
                    ? "bg-blue-600 text-white"
                    : "text-slate-600 hover:bg-slate-50",
                )}
              >
                {label}
              </button>
            ))}
          </div>
        }
      />
      <div className="grid gap-4 xl:grid-cols-12">
        <Card className="xl:col-span-8">
          <DataTable
            columns={columns}
            rows={rows}
            onRowClick={(d) => setEntity(`${d.entityType}:${d.entityId}`)}
            activeKey={
              rows.find((d) => `${d.entityType}:${d.entityId}` === entity)?.id
            }
            empty={S.common.noResults}
          />
        </Card>
        <Card className="xl:col-span-4">
          <CardHeader
            title={
              record
                ? fill(D.checklistFor, { ref: record.id })
                : D.checklistTitle
            }
            subtitle={D.autoNote}
          />
          <div className="space-y-3 px-4 py-4">
            <label className="grid gap-1 text-[11.5px] font-medium text-slate-600">
              {D.selectEntity}
              <Select
                value={entity}
                onChange={(e) => setEntity(e.target.value)}
              >
                {entityOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </Select>
            </label>
            <ul className="space-y-2">
              {checklist.map((row) => (
                <li
                  key={row.key}
                  className="flex items-center gap-2 text-[12.5px]"
                >
                  <Check done={row.done} auto={row.auto} />
                  <span
                    className={row.done ? "text-slate-800" : "text-slate-500"}
                  >
                    {S.checklist[entityType][row.key]}
                  </span>
                  {row.auto && <Badge tone="neutral">{S.common.auto}</Badge>}
                </li>
              ))}
            </ul>
            {record && (
              <Button size="xs" onClick={() => go(entityType, record.id)}>
                {S.common.open} {record.id}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
