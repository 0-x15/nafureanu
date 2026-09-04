import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { createSeed, OPERATION_STAGES } from "../data/seed";
import { checklistFor } from "../utils/checklists";

/*
 * In-memory data model of the demo, persisted to localStorage under a
 * clearly namespaced key. No backend, no external calls. Every mutation
 * records an activity entry so the dashboard and the records react.
 */

export const STORAGE_KEY = "nafureanu_crm_demo_v1";
const VERSION = 1;

const DemoContext = createContext(null);

function load() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed?.version !== VERSION || !parsed.data?.contacts) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function save(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: VERSION, data }));
  } catch {
    /* storage unavailable — the demo still works in memory */
  }
}

function nextId(data, kind, prefix) {
  const n = data.counters[kind];
  return { id: `${prefix}${String(n).padStart(3, "0")}`, counters: { ...data.counters, [kind]: n + 1 } };
}

function withActivity(data, type, refs, key) {
  const { id, counters } = nextId(data, "activity", "DEMO-A");
  const entry = { id, type, key, ts: Date.now(), refs };
  return { ...data, counters, activity: [entry, ...data.activity].slice(0, 60) };
}

function bumpDemand(data, demandId, status) {
  const order = ["new", "contacted", "qualified", "visiting", "negotiating", "won"];
  return {
    ...data,
    demands: data.demands.map((d) =>
      d.id === demandId && order.indexOf(status) > order.indexOf(d.status) ? { ...d, status } : d
    ),
    contacts: data.contacts.map((c) => {
      const demand = data.demands.find((d) => d.id === demandId);
      if (!demand || c.id !== demand.contactId || !c.stage) return c;
      return order.indexOf(status) > order.indexOf(c.stage) ? { ...c, stage: status } : c;
    }),
  };
}

/** Diff two checklists and record the rows that became complete. */
function recordChecklistChanges(data, before, entityType, entity) {
  const after = checklistFor(entityType, entity, data.documents);
  let next = data;
  after.forEach((row, i) => {
    if (row.done && !before[i].done) {
      next = withActivity(next, "checklist_updated", { entityType, entityId: entity.id, item: row.key });
    }
  });
  return next;
}

function reducer(data, action) {
  switch (action.type) {
    case "CREATE_VISIT": {
      const { id, counters } = nextId(data, "visit", "DEMO-V");
      const visit = { id, status: "scheduled", notes: "", ...action.visit };
      let next = { ...data, counters, visits: [...data.visits, visit] };
      if (visit.demandId) next = bumpDemand(next, visit.demandId, "visiting");
      return withActivity(next, "visit_created", {
        visitId: id,
        propertyId: visit.propertyId,
        contactId: visit.contactId,
        demandId: visit.demandId,
      });
    }
    case "SET_VISIT_STATUS": {
      const next = {
        ...data,
        visits: data.visits.map((v) => (v.id === action.id ? { ...v, status: action.status } : v)),
      };
      return withActivity(next, "visit_status", { visitId: action.id, status: action.status });
    }
    case "SET_VISIT_OUTCOME": {
      let next = {
        ...data,
        visits: data.visits.map((v) =>
          v.id === action.id ? { ...v, status: "completed", feedback: action.feedback, nextAction: action.nextAction } : v
        ),
      };
      const visit = data.visits.find((v) => v.id === action.id);
      if (visit?.demandId && action.feedback === "offer") next = bumpDemand(next, visit.demandId, "negotiating");
      return withActivity(next, "visit_outcome", { visitId: action.id, feedback: action.feedback });
    }
    case "ADVANCE_OPERATION": {
      const operation = data.operations.find((o) => o.id === action.id);
      if (!operation) return data;
      const index = OPERATION_STAGES.indexOf(operation.stage);
      if (index < 0 || index >= OPERATION_STAGES.length - 1) return data;
      const stage = OPERATION_STAGES[index + 1];
      const before = checklistFor("operation", operation, data.documents);
      let next = {
        ...data,
        operations: data.operations.map((o) => (o.id === action.id ? { ...o, stage } : o)),
      };
      if (stage === "deposit" || stage === "financing" || stage === "deed") {
        next = {
          ...next,
          properties: next.properties.map((p) =>
            p.id === operation.propertyId && p.status === "active" ? { ...p, status: "reserved" } : p
          ),
        };
      }
      if (stage === "completed") {
        next = {
          ...next,
          properties: next.properties.map((p) =>
            p.id === operation.propertyId ? { ...p, status: p.kind === "rent" ? "rented" : "sold" } : p
          ),
        };
        if (operation.demandId) next = bumpDemand(next, operation.demandId, "won");
      }
      next = withActivity(next, "operation_stage", { operationId: action.id, stage });
      const updated = next.operations.find((o) => o.id === action.id);
      return recordChecklistChanges(next, before, "operation", updated);
    }
    case "SET_DOCUMENT_STATUS": {
      const doc = data.documents.find((d) => d.id === action.id);
      if (!doc || doc.status === action.status) return data;
      const entity =
        doc.entityType === "property"
          ? data.properties.find((p) => p.id === doc.entityId)
          : data.operations.find((o) => o.id === doc.entityId);
      const before = entity ? checklistFor(doc.entityType, entity, data.documents) : null;
      let next = {
        ...data,
        documents: data.documents.map((d) => (d.id === action.id ? { ...d, status: action.status } : d)),
      };
      next = withActivity(next, "document_status", { documentId: action.id, status: action.status, entityType: doc.entityType, entityId: doc.entityId });
      return entity && before ? recordChecklistChanges(next, before, doc.entityType, entity) : next;
    }
    case "COMPLETE_TASK": {
      const task = data.tasks.find((t) => t.id === action.id);
      if (!task || task.done) return data;
      const next = { ...data, tasks: data.tasks.map((t) => (t.id === action.id ? { ...t, done: true } : t)) };
      return withActivity(next, "task_done", { taskKey: task.labelKey, contactId: task.contactId, operationId: task.operationId, demandId: task.demandId, propertyId: task.propertyId });
    }
    case "RESET":
      return withActivity(createSeed(), "reset", {});
    default:
      return data;
  }
}

export function DemoProvider({ children }) {
  const [data, dispatch] = useReducer(
    /** @type {import("react").Reducer<any, any>} */ (reducer),
    null,
    () => load() || createSeed()
  );

  useEffect(() => {
    save(data);
  }, [data]);

  const actions = useMemo(
    () => ({
      createVisit: (visit) => dispatch({ type: "CREATE_VISIT", visit }),
      setVisitStatus: (id, status) => dispatch({ type: "SET_VISIT_STATUS", id, status }),
      setVisitOutcome: (id, feedback, nextAction) => dispatch({ type: "SET_VISIT_OUTCOME", id, feedback, nextAction }),
      advanceOperation: (id) => dispatch({ type: "ADVANCE_OPERATION", id }),
      setDocumentStatus: (id, status) => dispatch({ type: "SET_DOCUMENT_STATUS", id, status }),
      completeTask: (id) => dispatch({ type: "COMPLETE_TASK", id }),
      reset: () => dispatch({ type: "RESET" }),
    }),
    []
  );

  const value = useMemo(() => ({ data, ...actions }), [data, actions]);
  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo must be used within DemoProvider");
  return ctx;
}

/** Next visit id the store will assign (for previews). */
export function useNextVisitId() {
  const { data } = useDemo();
  return useCallback(() => `DEMO-V${String(data.counters.visit).padStart(3, "0")}`, [data.counters.visit])();
}
