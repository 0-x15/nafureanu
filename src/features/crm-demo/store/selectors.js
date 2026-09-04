/* Pure selectors over the demo data — relationships between records. */
import { OPERATION_STAGES, DEMAND_STAGES } from "../data/seed";
import { propertiesForDemand, demandsForProperty } from "../utils/matching";
import { timeToMinutes } from "../utils/format";

export const byId = (list, id) => list.find((x) => x.id === id) || null;

export const contactById = (data, id) => byId(data.contacts, id);
export const propertyById = (data, id) => byId(data.properties, id);
export const demandById = (data, id) => byId(data.demands, id);
export const visitById = (data, id) => byId(data.visits, id);
export const operationById = (data, id) => byId(data.operations, id);

export const demandsForContact = (data, contactId) => data.demands.filter((d) => d.contactId === contactId);
export const propertiesForOwner = (data, contactId) => data.properties.filter((p) => p.ownerId === contactId);
export const visitsForContact = (data, contactId) => sortVisits(data.visits.filter((v) => v.contactId === contactId));
export const visitsForProperty = (data, propertyId) => sortVisits(data.visits.filter((v) => v.propertyId === propertyId));
export const visitsForDemand = (data, demandId) => sortVisits(data.visits.filter((v) => v.demandId === demandId));
export const operationsForContact = (data, contactId) => data.operations.filter((o) => o.contactId === contactId);
export const operationsForProperty = (data, propertyId) => data.operations.filter((o) => o.propertyId === propertyId);
export const operationsForDemand = (data, demandId) => data.operations.filter((o) => o.demandId === demandId);
export const documentsFor = (data, entityType, entityId) =>
  data.documents.filter((d) => d.entityType === entityType && d.entityId === entityId);

export const matchesForDemand = (data, demand) => propertiesForDemand(demand, data.properties);
export const matchesForProperty = (data, property) => demandsForProperty(property, data.demands);

export function sortVisits(visits) {
  return [...visits].sort((a, b) => a.dayOffset - b.dayOffset || timeToMinutes(a.time) - timeToMinutes(b.time));
}

const isUpcomingVisit = (v) => (v.status === "scheduled" || v.status === "confirmed") && v.dayOffset >= 0;

/** Visits and tasks merged into one agenda, sorted by day and time. */
export function agendaItems(data) {
  const visits = data.visits
    .filter((v) => v.status !== "cancelled")
    .map((v) => ({ id: v.id, kind: "visit", type: "visit", dayOffset: v.dayOffset, time: v.time, duration: v.duration, status: v.status, done: v.status === "completed", refs: { propertyId: v.propertyId, contactId: v.contactId, demandId: v.demandId, visitId: v.id } }));
  const tasks = data.tasks.map((t) => ({ id: t.id, kind: "task", type: t.type, labelKey: t.labelKey, dayOffset: t.dayOffset, time: t.time, duration: null, done: t.done, refs: { propertyId: t.propertyId, contactId: t.contactId, demandId: t.demandId, operationId: t.operationId } }));
  return [...visits, ...tasks].sort((a, b) => a.dayOffset - b.dayOffset || timeToMinutes(a.time) - timeToMinutes(b.time));
}

const PERIOD_DAYS = { today: 0, week: 6, month: 29 };

export function dashboardStats(data, period = "week", now = Date.now()) {
  const horizon = PERIOD_DAYS[period] ?? 6;
  const windowMs = (horizon + 1) * 24 * 3600 * 1000;
  const inWindow = (createdHours) => createdHours * 3600 * 1000 <= windowMs;
  const upcoming = data.visits.filter((v) => isUpcomingVisit(v) && v.dayOffset <= horizon);
  const newDemands = data.demands.filter((d) => d.status === "new" && inWindow(d.createdHours ?? 0));
  const attention =
    data.demands.filter((d) => d.status === "new").length +
    data.visits.filter((v) => v.status === "scheduled" && v.dayOffset === 0).length +
    data.documents.filter((d) => d.status === "review").length;
  return {
    newDemands: newDemands.length,
    attention,
    activeProperties: data.properties.filter((p) => p.status === "active").length,
    upcomingVisits: upcoming.length,
    openOperations: data.operations.filter((o) => o.stage !== "completed").length,
    pendingDocs: data.documents.filter((d) => d.status === "pending" || d.status === "review").length,
    pendingTasks: data.tasks.filter((t) => !t.done && t.dayOffset <= horizon).length,
    now,
  };
}

export function pipelineCounts(data) {
  return DEMAND_STAGES.map((stage) => ({ stage, count: data.demands.filter((d) => d.status === stage).length }));
}

export function operationCounts(data) {
  return OPERATION_STAGES.map((stage) => ({ stage, count: data.operations.filter((o) => o.stage === stage).length }));
}

export function recentActivity(data, n = 8) {
  return [...data.activity].sort((a, b) => b.ts - a.ts).slice(0, n);
}

/** Global search across the main records. */
export function search(data, query, lang) {
  const q = query.trim().toLowerCase();
  if (!q) return { properties: [], contacts: [], demands: [], operations: [] };
  const hit = (...fields) => fields.some((f) => String(f ?? "").toLowerCase().includes(q));
  const name = (c) => (c?.name ? c.name[lang] || c.name.es : "");
  return {
    properties: data.properties.filter((p) => hit(p.id, p.zone, p.type, p.price)).slice(0, 5),
    contacts: data.contacts.filter((c) => hit(c.id, name(c), c.email)).slice(0, 5),
    demands: data.demands.filter((d) => hit(d.id, d.zone, d.type, name(contactById(data, d.contactId)))).slice(0, 5),
    operations: data.operations.filter((o) => hit(o.id, o.propertyId, name(contactById(data, o.contactId)))).slice(0, 5),
  };
}
