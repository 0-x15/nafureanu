/*
 * Seed dataset of the interactive CRM demo. Every record is fictional:
 * generic demo identities, generic zones, DEMO-* references, no
 * addresses. Dates are stored as day offsets from "today" so the demo
 * always feels current. Text fields carry both languages.
 */

export const OPERATION_STAGES = ["negotiation", "offer", "deposit", "financing", "deed", "completed"];
export const DEMAND_STAGES = ["new", "contacted", "qualified", "visiting", "negotiating", "won"];
export const VISIT_STATUSES = ["scheduled", "confirmed", "completed", "noShow", "cancelled"];
export const DOC_STATUSES = ["pending", "review", "approved", "signed"];
export const CHECKLISTS = {
  property: ["data", "photos", "registry", "energy", "publication"],
  operation: ["identity", "deposit", "contract", "financing", "deed"],
};

const bi = (es, en) => ({ es, en });

export function createSeed(now = Date.now()) {
  const hoursAgo = (h) => now - h * 3600 * 1000;
  return {
    contacts: [
      { id: "DEMO-C001", name: bi("Cliente Demo A", "Demo Client A"), role: "buyer", channel: "whatsapp", stage: "qualified", phone: "+34 600 000 001", email: "cliente.a@demo.test", lastContactHours: 5 },
      { id: "DEMO-C002", name: bi("Cliente Demo B", "Demo Client B"), role: "buyer", channel: "portal", stage: "negotiating", phone: "+34 600 000 002", email: "cliente.b@demo.test", lastContactHours: 26 },
      { id: "DEMO-C003", name: bi("Cliente Demo C", "Demo Client C"), role: "tenant", channel: "phone", stage: "contacted", phone: "+34 600 000 003", email: "cliente.c@demo.test", lastContactHours: 50 },
      { id: "DEMO-C004", name: bi("Propietario Demo A", "Demo Owner A"), role: "owner", channel: "email", phone: "+34 600 000 004", email: "propietario.a@demo.test", lastContactHours: 80 },
      { id: "DEMO-C005", name: bi("Propietario Demo B", "Demo Owner B"), role: "owner", channel: "phone", phone: "+34 600 000 005", email: "propietario.b@demo.test", lastContactHours: 120 },
      { id: "DEMO-C006", name: bi("Cliente Demo D", "Demo Client D"), role: "buyer", channel: "web", stage: "new", phone: "+34 600 000 006", email: "cliente.d@demo.test", lastContactHours: 3 },
      { id: "DEMO-C007", name: bi("Cliente Demo E", "Demo Client E"), role: "buyer", channel: "portal", stage: "visiting", phone: "+34 600 000 007", email: "cliente.e@demo.test", lastContactHours: 20 },
      { id: "DEMO-C008", name: bi("Cliente Demo F", "Demo Client F"), role: "buyer", channel: "whatsapp", stage: "negotiating", phone: "+34 600 000 008", email: "cliente.f@demo.test", lastContactHours: 30 },
    ],
    properties: [
      { id: "DEMO-P001", type: "flat", kind: "sale", zone: "centro", price: 285000, bedrooms: 3, bathrooms: 2, surface: 92, status: "active", availability: "immediate", ownerId: "DEMO-C004", floor: 3, elevator: true, exterior: true, parking: false, terrace: false, photos: 12 },
      { id: "DEMO-P002", type: "flat", kind: "sale", zone: "ensanche", price: 310000, bedrooms: 3, bathrooms: 2, surface: 104, status: "reserved", availability: "agreed", ownerId: "DEMO-C005", floor: 5, elevator: true, exterior: true, parking: true, terrace: false, photos: 18 },
      { id: "DEMO-P003", type: "flat", kind: "sale", zone: "centro", price: 298000, bedrooms: 3, bathrooms: 1, surface: 88, status: "active", availability: "month", ownerId: "DEMO-C005", floor: 2, elevator: false, exterior: true, parking: false, terrace: true, photos: 9 },
      { id: "DEMO-P004", type: "house", kind: "sale", zone: "residencial", price: 420000, bedrooms: 4, bathrooms: 3, surface: 180, status: "active", availability: "immediate", ownerId: "DEMO-C004", floor: 0, elevator: false, exterior: true, parking: true, terrace: true, photos: 24 },
      { id: "DEMO-P005", type: "flat", kind: "sale", zone: "norte", price: 196000, bedrooms: 2, bathrooms: 1, surface: 71, status: "active", availability: "immediate", ownerId: "DEMO-C005", floor: 1, elevator: true, exterior: false, parking: false, terrace: false, photos: 8 },
      { id: "DEMO-P006", type: "penthouse", kind: "sale", zone: "costa", price: 365000, bedrooms: 2, bathrooms: 2, surface: 95, status: "active", availability: "agreed", ownerId: "DEMO-C004", floor: 7, elevator: true, exterior: true, parking: true, terrace: true, photos: 20 },
      { id: "DEMO-P007", type: "flat", kind: "sale", zone: "centro", price: 279000, bedrooms: 3, bathrooms: 2, surface: 84, status: "active", availability: "immediate", ownerId: "DEMO-C005", floor: 4, elevator: true, exterior: true, parking: false, terrace: false, photos: 11 },
      { id: "DEMO-P008", type: "flat", kind: "rent", zone: "ensanche", price: 1100, bedrooms: 2, bathrooms: 1, surface: 68, status: "active", availability: "immediate", ownerId: "DEMO-C004", floor: 2, elevator: true, exterior: true, parking: false, terrace: false, photos: 7 },
    ],
    demands: [
      { id: "DEMO-D001", contactId: "DEMO-C001", kind: "sale", type: "flat", zone: "centro", maxBudget: 300000, minBedrooms: 3, minSurface: 80, status: "qualified", createdHours: 290 },
      { id: "DEMO-D002", contactId: "DEMO-C002", kind: "sale", type: "flat", zone: "ensanche", maxBudget: 320000, minBedrooms: 3, minSurface: 90, status: "negotiating", createdHours: 600 },
      { id: "DEMO-D003", contactId: "DEMO-C003", kind: "rent", type: "flat", zone: "ensanche", maxBudget: 1200, minBedrooms: 2, minSurface: 60, status: "contacted", createdHours: 60 },
      { id: "DEMO-D004", contactId: "DEMO-C006", kind: "sale", type: "house", zone: "residencial", maxBudget: 450000, minBedrooms: 4, minSurface: 150, status: "new", createdHours: 4 },
      { id: "DEMO-D005", contactId: "DEMO-C007", kind: "sale", type: "penthouse", zone: "costa", maxBudget: 400000, minBedrooms: 2, minSurface: 80, status: "visiting", createdHours: 200 },
      { id: "DEMO-D006", contactId: "DEMO-C008", kind: "sale", type: "flat", zone: "norte", maxBudget: 200000, minBedrooms: 2, minSurface: 65, status: "negotiating", createdHours: 400 },
    ],
    visits: [
      { id: "DEMO-V001", propertyId: "DEMO-P002", contactId: "DEMO-C002", demandId: "DEMO-D002", dayOffset: -6, time: "11:00", duration: 45, type: "first", status: "completed", feedback: "offer", nextAction: "proposal", notes: "" },
      { id: "DEMO-V002", propertyId: "DEMO-P003", contactId: "DEMO-C001", demandId: "DEMO-D001", dayOffset: -2, time: "17:30", duration: 30, type: "first", status: "completed", feedback: "interested", nextAction: "secondVisit", notes: "" },
      { id: "DEMO-V003", propertyId: "DEMO-P006", contactId: "DEMO-C007", demandId: "DEMO-D005", dayOffset: 0, time: "09:30", duration: 45, type: "first", status: "confirmed", notes: "" },
      { id: "DEMO-V004", propertyId: "DEMO-P004", contactId: "DEMO-C006", demandId: "DEMO-D004", dayOffset: 1, time: "12:00", duration: 60, type: "first", status: "scheduled", notes: "" },
      { id: "DEMO-V005", propertyId: "DEMO-P005", contactId: "DEMO-C008", demandId: "DEMO-D006", dayOffset: -9, time: "10:00", duration: 30, type: "first", status: "completed", feedback: "offer", nextAction: "proposal", notes: "" },
    ],
    operations: [
      { id: "DEMO-O001", propertyId: "DEMO-P002", contactId: "DEMO-C002", demandId: "DEMO-D002", price: 310000, stage: "deposit", openedHours: 216 },
      { id: "DEMO-O002", propertyId: "DEMO-P005", contactId: "DEMO-C008", demandId: "DEMO-D006", price: 190000, stage: "offer", openedHours: 120 },
    ],
    documents: [
      { id: "DEMO-DOC001", name: bi("Nota simple", "Land registry extract"), entityType: "property", entityId: "DEMO-P001", status: "approved", checklistKey: "registry" },
      { id: "DEMO-DOC002", name: bi("Certificado energético", "Energy certificate"), entityType: "property", entityId: "DEMO-P001", status: "pending", checklistKey: "energy" },
      { id: "DEMO-DOC003", name: bi("Encargo de venta", "Sales mandate"), entityType: "property", entityId: "DEMO-P001", status: "signed", checklistKey: null },
      { id: "DEMO-DOC004", name: bi("Nota simple", "Land registry extract"), entityType: "property", entityId: "DEMO-P002", status: "approved", checklistKey: "registry" },
      { id: "DEMO-DOC005", name: bi("Certificado energético", "Energy certificate"), entityType: "property", entityId: "DEMO-P002", status: "approved", checklistKey: "energy" },
      { id: "DEMO-DOC006", name: bi("Verificación de identidad", "Identity verification"), entityType: "operation", entityId: "DEMO-O001", status: "approved", checklistKey: "identity" },
      { id: "DEMO-DOC007", name: bi("Contrato de arras", "Deposit contract"), entityType: "operation", entityId: "DEMO-O001", status: "review", checklistKey: "deposit" },
      { id: "DEMO-DOC008", name: bi("Contrato de compraventa", "Purchase agreement"), entityType: "operation", entityId: "DEMO-O001", status: "pending", checklistKey: "contract" },
      { id: "DEMO-DOC009", name: bi("Verificación de identidad", "Identity verification"), entityType: "operation", entityId: "DEMO-O002", status: "pending", checklistKey: "identity" },
      { id: "DEMO-DOC010", name: bi("Nota simple", "Land registry extract"), entityType: "property", entityId: "DEMO-P004", status: "review", checklistKey: "registry" },
      { id: "DEMO-DOC011", name: bi("Certificado energético", "Energy certificate"), entityType: "property", entityId: "DEMO-P007", status: "pending", checklistKey: "energy" },
    ],
    tasks: [
      { id: "DEMO-T001", type: "followup", labelKey: "followup_D003", demandId: "DEMO-D003", contactId: "DEMO-C003", dayOffset: 0, time: "12:00", done: false },
      { id: "DEMO-T002", type: "call", labelKey: "call_C002", contactId: "DEMO-C002", operationId: "DEMO-O001", dayOffset: 0, time: "16:15", done: false },
      { id: "DEMO-T003", type: "task", labelKey: "task_O001", operationId: "DEMO-O001", dayOffset: 1, time: "10:00", done: false },
      { id: "DEMO-T004", type: "task", labelKey: "task_P004", propertyId: "DEMO-P004", dayOffset: 1, time: "09:00", done: false },
    ],
    activity: [
      { id: "DEMO-A001", type: "seed", key: "lead_new", ts: hoursAgo(3), refs: { contactId: "DEMO-C006", demandId: "DEMO-D004" } },
      { id: "DEMO-A002", type: "seed", key: "message_linked", ts: hoursAgo(5), refs: { contactId: "DEMO-C001" } },
      { id: "DEMO-A003", type: "document_status", ts: hoursAgo(9), refs: { documentId: "DEMO-DOC005", status: "approved" } },
      { id: "DEMO-A004", type: "checklist_updated", ts: hoursAgo(9), refs: { entityType: "property", entityId: "DEMO-P002", item: "energy" } },
      { id: "DEMO-A005", type: "visit_status", ts: hoursAgo(14), refs: { visitId: "DEMO-V003", status: "confirmed" } },
      { id: "DEMO-A006", type: "seed", key: "call_logged", ts: hoursAgo(26), refs: { contactId: "DEMO-C002" } },
      { id: "DEMO-A007", type: "operation_stage", ts: hoursAgo(40), refs: { operationId: "DEMO-O001", stage: "deposit" } },
      { id: "DEMO-A008", type: "seed", key: "property_published", ts: hoursAgo(70), refs: { propertyId: "DEMO-P007" } },
    ],
    counters: { visit: 6, activity: 9, operation: 3, demand: 7 },
  };
}
