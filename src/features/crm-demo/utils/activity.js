/* Turns stored activity entries into readable, localized lines. */
import { fill } from "../i18n";
import { bi } from "./format";

export function describeActivity(entry, data, lang, S) {
  const r = entry.refs || {};
  const contact = data.contacts.find((c) => c.id === r.contactId);
  const property = data.properties.find((p) => p.id === r.propertyId);
  const visit = data.visits.find((v) => v.id === r.visitId);
  const operation = data.operations.find((o) => o.id === r.operationId);
  const document = data.documents.find((d) => d.id === r.documentId);
  const values = {
    contact: contact ? bi(contact.name, lang) : r.contactId,
    property: property ? property.id : r.propertyId,
    visit: visit ? visit.id : r.visitId,
    operation: operation ? operation.id : r.operationId,
    document: document ? bi(document.name, lang) : r.documentId,
    demand: r.demandId,
    status: r.status
      ? S.enums.visitStatus[r.status] || S.enums.docStatus[r.status] || r.status
      : "",
    stage: r.stage ? S.enums.operationStage[r.stage] : "",
    feedback: r.feedback ? S.enums.feedback[r.feedback] : "",
    item: r.item ? (S.checklist[r.entityType] || {})[r.item] || r.item : "",
    task: r.taskKey ? S.agendaTasks[r.taskKey] || r.taskKey : "",
  };
  if (entry.type === "document_status") {
    values.status = S.enums.docStatus[r.status] ? S.enums.docStatus[r.status].toLowerCase() : r.status;
  }
  const template = entry.type === "seed" ? S.activity.seed[entry.key] : S.activity[entry.type];
  return {
    text: fill(template || entry.type, values),
    target: activityTarget(entry),
  };
}

/** Where clicking an activity line should go. */
export function activityTarget(entry) {
  const r = entry.refs || {};
  if (r.visitId) return { view: "visit", id: r.visitId };
  if (r.operationId) return { view: "operation", id: r.operationId };
  if (r.documentId) return { view: "documents", id: null, params: { documentId: r.documentId } };
  if (r.entityType === "property" && r.entityId) return { view: "property", id: r.entityId };
  if (r.demandId) return { view: "demand", id: r.demandId };
  if (r.propertyId) return { view: "property", id: r.propertyId };
  if (r.contactId) return { view: "contact", id: r.contactId };
  return null;
}
