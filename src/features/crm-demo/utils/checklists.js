/*
 * Demo checklists derived from system state: document rows complete
 * when the related document is approved or signed; the last rows depend
 * on the previous ones or on the operation stage. Rows marked `auto` are
 * satisfied by the system, not ticked by hand.
 */
import { CHECKLISTS, OPERATION_STAGES } from "../data/seed";

export const docSatisfies = (doc) => doc && (doc.status === "approved" || doc.status === "signed");

function docFor(documents, entityType, entityId, key) {
  return documents.find((d) => d.entityType === entityType && d.entityId === entityId && d.checklistKey === key);
}

export function propertyChecklist(property, documents) {
  const registry = docSatisfies(docFor(documents, "property", property.id, "registry"));
  const energy = docSatisfies(docFor(documents, "property", property.id, "energy"));
  const rows = {
    data: { done: true, auto: false },
    photos: { done: property.photos > 0, auto: false },
    registry: { done: registry, auto: true },
    energy: { done: energy, auto: true },
    publication: { done: registry && energy && property.photos > 0, auto: true },
  };
  return CHECKLISTS.property.map((key) => ({ key, ...rows[key] }));
}

export function operationChecklist(operation, documents) {
  const stageIndex = OPERATION_STAGES.indexOf(operation.stage);
  const rows = {
    identity: { done: docSatisfies(docFor(documents, "operation", operation.id, "identity")), auto: true },
    deposit: { done: docSatisfies(docFor(documents, "operation", operation.id, "deposit")), auto: true },
    contract: { done: docSatisfies(docFor(documents, "operation", operation.id, "contract")), auto: true },
    financing: { done: stageIndex >= OPERATION_STAGES.indexOf("deed"), auto: true },
    deed: { done: operation.stage === "completed", auto: true },
  };
  return CHECKLISTS.operation.map((key) => ({ key, ...rows[key] }));
}

export function checklistFor(entityType, entity, documents) {
  return entityType === "property"
    ? propertyChecklist(entity, documents)
    : operationChecklist(entity, documents);
}
