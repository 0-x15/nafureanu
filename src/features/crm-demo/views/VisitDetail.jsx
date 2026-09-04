import { useState } from "react";
import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { contactById, propertyById, visitById } from "../store/selectors";
import { bi, dayLabel, money } from "../utils/format";
import { fill } from "../i18n";
import { Button, Card, CardHeader, EmptyState, Field, Fields, PageHeader, RefLink, Select, StatusBadge } from "../components/ui";

export default function VisitDetail() {
  const { data, setVisitStatus, setVisitOutcome } = useDemo();
  const { lang, S, nav, go, back, toast } = useUi();
  const visit = visitById(data, nav.id);
  const [feedback, setFeedback] = useState(visit?.feedback || "interested");
  const [nextAction, setNextAction] = useState(visit?.nextAction || "followup");
  if (!visit) return <EmptyState>{S.common.noResults}</EmptyState>;
  const V = S.visits;
  const contact = contactById(data, visit.contactId);
  const property = propertyById(data, visit.propertyId);

  const change = (status) => {
    setVisitStatus(visit.id, status);
    toast(fill(S.toasts.visitStatus, { id: visit.id, status: S.enums.visitStatus[status] }));
  };
  const saveOutcome = () => {
    setVisitOutcome(visit.id, feedback, nextAction);
    toast(fill(S.toasts.visitOutcome, { id: visit.id }));
  };
  const open = visit.status === "scheduled" || visit.status === "confirmed";

  return (
    <div>
      <PageHeader
        onBack={back}
        backLabel={S.common.back}
        title={visit.id}
        badge={<StatusBadge kind="visitStatus" value={visit.status} S={S} />}
        subtitle={`${S.enums.visitType[visit.type]} · ${dayLabel(visit.dayOffset, lang, S)} · ${visit.time}`}
        actions={
          open ? (
            <>
              {visit.status === "scheduled" && <Button variant="primary" onClick={() => change("confirmed")}>{V.actions.confirm}</Button>}
              {visit.status === "confirmed" && <Button variant="primary" onClick={() => change("completed")}>{V.actions.complete}</Button>}
              <Button onClick={() => change("noShow")}>{V.actions.noShow}</Button>
              <Button variant="danger" onClick={() => change("cancelled")}>{V.actions.cancel}</Button>
            </>
          ) : null
        }
      />
      <div className="grid gap-4 xl:grid-cols-12">
        <Card className="xl:col-span-7">
          <CardHeader title={S.common.summary} />
          <div className="px-4 py-4">
            <Fields>
              <Field label={S.common.property}>
                {property ? <RefLink onClick={() => go("property", property.id)}>{property.id}</RefLink> : visit.propertyId}
                {property && <span className="ml-2 text-slate-500">{S.enums.propertyType[property.type]} · {S.enums.zone[property.zone]} · {money(property.price, lang, property.kind, S)}</span>}
              </Field>
              <Field label={S.common.contact}>
                {contact ? <RefLink onClick={() => go("contact", contact.id)}>{contact.id}</RefLink> : visit.contactId}
                {contact && <span className="ml-2 text-slate-500">{bi(contact.name, lang)}</span>}
              </Field>
              <Field label={S.common.demand}>{visit.demandId ? <RefLink onClick={() => go("demand", visit.demandId)}>{visit.demandId}</RefLink> : S.common.none}</Field>
              <Field label={V.scheduledAt}>{dayLabel(visit.dayOffset, lang, S)} · {visit.time}</Field>
              <Field label={S.common.duration}>{visit.duration} {S.common.min}</Field>
              <Field label={S.common.type}>{S.enums.visitType[visit.type]}</Field>
              <Field label={S.common.status}><StatusBadge kind="visitStatus" value={visit.status} S={S} /></Field>
              <Field label={S.common.feedback}>{visit.feedback ? S.enums.feedback[visit.feedback] : S.common.none}</Field>
              <Field label={V.nextTitle}>{visit.nextAction ? S.enums.nextAction[visit.nextAction] : V.emptyNext}</Field>
              {visit.notes && <Field label={S.common.notes}>{visit.notes}</Field>}
            </Fields>
          </div>
        </Card>
        <Card className="xl:col-span-5">
          <CardHeader title={V.outcome} subtitle={V.outcomeHint} />
          <div className="space-y-3 px-4 py-4">
            <label className="grid gap-1 text-[11.5px] font-medium text-slate-600">
              {S.common.feedback}
              <Select value={feedback} onChange={(e) => setFeedback(e.target.value)} disabled={visit.status === "cancelled" || visit.status === "noShow"}>
                {Object.entries(S.enums.feedback).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </Select>
            </label>
            <label className="grid gap-1 text-[11.5px] font-medium text-slate-600">
              {S.common.nextAction}
              <Select value={nextAction} onChange={(e) => setNextAction(e.target.value)} disabled={visit.status === "cancelled" || visit.status === "noShow"}>
                {Object.entries(S.enums.nextAction).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </Select>
            </label>
            <Button variant="primary" onClick={saveOutcome} disabled={visit.status === "cancelled" || visit.status === "noShow"}>
              {V.save}
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
