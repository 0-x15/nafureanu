import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { contactById, documentsFor, operationById, propertyById } from "../store/selectors";
import { OPERATION_STAGES } from "../data/seed";
import { operationChecklist } from "../utils/checklists";
import { bi, cx, money, relativeTime, hoursAgoTs } from "../utils/format";
import { fill } from "../i18n";
import { Badge, Button, Card, CardHeader, Check, EmptyState, Field, Fields, PageHeader, RefLink, StatusBadge } from "../components/ui";

export default function OperationDetail() {
  const { data, advanceOperation } = useDemo();
  const { lang, S, nav, go, back, toast } = useUi();
  const operation = operationById(data, nav.id);
  if (!operation) return <EmptyState>{S.common.noResults}</EmptyState>;
  const O = S.operations;
  const property = propertyById(data, operation.propertyId);
  const contact = contactById(data, operation.contactId);
  const documents = documentsFor(data, "operation", operation.id);
  const checklist = operationChecklist(operation, data.documents);
  const stageIndex = OPERATION_STAGES.indexOf(operation.stage);
  const nextStage = OPERATION_STAGES[stageIndex + 1];

  const advance = () => {
    advanceOperation(operation.id);
    toast(fill(S.toasts.operation, { id: operation.id, stage: S.enums.operationStage[nextStage] }));
  };

  return (
    <div>
      <PageHeader
        onBack={back}
        backLabel={S.common.back}
        title={operation.id}
        badge={<StatusBadge kind="operationStage" value={operation.stage} S={S} />}
        subtitle={`${operation.propertyId} · ${contact ? bi(contact.name, lang) : operation.contactId} · ${money(operation.price, lang, "sale", S)}`}
        actions={
          nextStage ? (
            <Button variant="primary" onClick={advance}>{fill(O.advance, { stage: S.enums.operationStage[nextStage] })}</Button>
          ) : (
            <Badge tone="green">{O.completed}</Badge>
          )
        }
      />
      <Card>
        <CardHeader title={O.pipelineTitle} />
        <ol className="flex flex-wrap gap-2 px-4 py-4">
          {OPERATION_STAGES.map((stage, i) => (
            <li key={stage} className="flex items-center gap-2">
              <span
                className={cx(
                  "rounded-md border px-2.5 py-1.5 text-[12px] font-medium",
                  i < stageIndex ? "border-blue-200 bg-blue-50 text-blue-700" : i === stageIndex ? "border-blue-600 bg-blue-600 text-white" : "border-slate-200 bg-white text-slate-500"
                )}
              >
                {S.enums.operationStage[stage]}
              </span>
              {i < OPERATION_STAGES.length - 1 && <span className={cx("h-px w-4", i < stageIndex ? "bg-blue-400" : "bg-slate-200")} />}
            </li>
          ))}
        </ol>
      </Card>
      <div className="mt-4 grid gap-4 xl:grid-cols-12">
        <Card className="xl:col-span-6">
          <CardHeader title={S.common.summary} />
          <div className="px-4 py-4">
            <Fields className="lg:grid-cols-2">
              <Field label={S.common.property}>
                {property ? <RefLink onClick={() => go("property", property.id)}>{property.id}</RefLink> : operation.propertyId}
                {property && <span className="ml-2 text-slate-500">{S.enums.propertyType[property.type]} · {S.enums.zone[property.zone]}</span>}
              </Field>
              <Field label={O.buyer}>
                {contact ? <RefLink onClick={() => go("contact", contact.id)}>{contact.id}</RefLink> : operation.contactId}
                {contact && <span className="ml-2 text-slate-500">{bi(contact.name, lang)}</span>}
              </Field>
              <Field label={S.common.demand}>{operation.demandId ? <RefLink onClick={() => go("demand", operation.demandId)}>{operation.demandId}</RefLink> : S.common.none}</Field>
              <Field label={S.common.agreedPrice}>{money(operation.price, lang, "sale", S)}</Field>
              <Field label={S.common.stage}><StatusBadge kind="operationStage" value={operation.stage} S={S} /></Field>
              <Field label={S.common.opened}>{relativeTime(hoursAgoTs(operation.openedHours), lang, S)}</Field>
            </Fields>
          </div>
        </Card>
        <Card className="xl:col-span-6">
          <CardHeader title={O.docsTitle} actions={<Button size="xs" onClick={() => go("documents", null, { entityType: "operation", entityId: operation.id })}>{S.nav.documents}</Button>} />
          {documents.length === 0 ? <p className="px-4 py-4 text-[12.5px] text-slate-500">{S.common.none}</p> : (
            <ul className="divide-y divide-slate-100">
              {documents.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between gap-3 px-4 py-2.5 text-[12.5px]">
                  <span className="text-slate-700">{bi(doc.name, lang)}</span>
                  <StatusBadge kind="docStatus" value={doc.status} S={S} />
                </li>
              ))}
            </ul>
          )}
          <CardHeader title={O.checklistTitle} className="border-t" />
          <ul className="space-y-1.5 px-4 py-3">
            {checklist.map((row) => (
              <li key={row.key} className="flex items-center gap-2 text-[12.5px]">
                <Check done={row.done} auto={row.auto} />
                <span className={row.done ? "text-slate-800" : "text-slate-500"}>{S.checklist.operation[row.key]}</span>
                {row.auto && <Badge tone="neutral">{S.common.auto}</Badge>}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}
