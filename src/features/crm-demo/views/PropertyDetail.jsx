import { useState } from "react";
import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { contactById, documentsFor, matchesForProperty, propertyById, visitsForProperty } from "../store/selectors";
import { propertyChecklist } from "../utils/checklists";
import { bi, dayLabel, money } from "../utils/format";
import { fill } from "../i18n";
import { Button, Card, CardHeader, Check, EmptyState, Field, Fields, PageHeader, RefLink, StatusBadge, Tabs, Badge } from "../components/ui";

export default function PropertyDetail() {
  const { data } = useDemo();
  const { lang, S, nav, go, back, openVisitSheet } = useUi();
  const [tab, setTab] = useState("summary");
  const property = propertyById(data, nav.id);
  if (!property) return <EmptyState>{S.common.noResults}</EmptyState>;

  const owner = contactById(data, property.ownerId);
  const matches = matchesForProperty(data, property);
  const visits = visitsForProperty(data, property.id);
  const documents = documentsFor(data, "property", property.id);
  const checklist = propertyChecklist(property, data.documents);
  const P = S.properties;

  const tabs = [
    { id: "summary", label: P.tabs.summary },
    { id: "features", label: P.tabs.features },
    { id: "interested", label: P.tabs.interested, count: matches.length },
    { id: "visits", label: P.tabs.visits, count: visits.length },
    { id: "documents", label: P.tabs.documents, count: documents.length },
  ];

  return (
    <div>
      <PageHeader
        onBack={back}
        backLabel={S.common.back}
        title={property.id}
        badge={<StatusBadge kind="propertyStatus" value={property.status} S={S} />}
        subtitle={`${S.enums.propertyType[property.type]} · ${S.enums.zone[property.zone]} · ${money(property.price, lang, property.kind, S)}`}
        actions={
          <>
            <Button onClick={() => go("matching", null, { mode: "property", id: property.id })}>{P.actions.matches}</Button>
            <Button onClick={() => go("documents", null, { entityType: "property", entityId: property.id })}>{P.actions.docs}</Button>
            <Button variant="primary" onClick={() => openVisitSheet({ propertyId: property.id })}>
              {P.actions.visit}
            </Button>
          </>
        }
      />
      <Card>
        <Tabs tabs={tabs} active={tab} onChange={setTab} className="px-4 pt-1" />
        <div className="px-4 py-4">
          {tab === "summary" && (
            <Fields>
              <Field label={S.common.type}>{S.enums.propertyType[property.type]}</Field>
              <Field label={S.common.zone}>{S.enums.zone[property.zone]}</Field>
              <Field label={S.common.price}>{money(property.price, lang, property.kind, S)}</Field>
              <Field label={P.kindLabel}>{S.enums.propertyKind[property.kind]}</Field>
              <Field label={S.common.bedrooms}>{property.bedrooms}</Field>
              <Field label={S.common.bathrooms}>{property.bathrooms}</Field>
              <Field label={S.common.surface}>{property.surface} m²</Field>
              <Field label={S.common.availability}>{S.enums.availability[property.availability]}</Field>
              <Field label={P.commercial}><StatusBadge kind="propertyStatus" value={property.status} S={S} /></Field>
              <Field label={P.ownerRef}>
                {owner ? <RefLink onClick={() => go("contact", owner.id)}>{owner.id}</RefLink> : S.common.none}
                {owner && <span className="ml-2 text-slate-500">{bi(owner.name, lang)}</span>}
              </Field>
              <Field label={S.common.matches}>{matches.length}</Field>
              <Field label={P.photos}>{fill(P.photosCount, { n: property.photos })}</Field>
            </Fields>
          )}
          {tab === "features" && (
            <Fields>
              <Field label={S.enums.features.floor}>{property.floor}</Field>
              {["elevator", "exterior", "parking", "terrace"].map((f) => (
                <Field key={f} label={S.enums.features[f]}>{property[f] ? S.enums.yesNo.yes : S.enums.yesNo.no}</Field>
              ))}
              <Field label={S.common.bedrooms}>{property.bedrooms}</Field>
              <Field label={S.common.bathrooms}>{property.bathrooms}</Field>
              <Field label={S.common.surface}>{property.surface} m²</Field>
            </Fields>
          )}
          {tab === "interested" && (
            matches.length === 0 ? <EmptyState>{P.interestedEmpty}</EmptyState> : (
              <ul className="divide-y divide-slate-100">
                {matches.map(({ demand, criteria }) => {
                  const contact = contactById(data, demand.contactId);
                  return (
                    <li key={demand.id} className="flex flex-wrap items-center gap-3 py-2.5">
                      <RefLink onClick={() => go("demand", demand.id)}>{demand.id}</RefLink>
                      <span className="text-[12.5px] text-slate-700">{contact ? bi(contact.name, lang) : demand.contactId}</span>
                      <span className="text-[11.5px] text-slate-500">{S.enums.kind[demand.kind]} · ≤ {money(demand.maxBudget, lang, demand.kind, S)}</span>
                      <span className="ml-auto flex flex-wrap gap-1">
                        {criteria.map((c) => <Badge key={c.key} tone={c.ok ? "green" : "neutral"}>{S.enums.criteria[c.key]} {c.ok ? "✓" : "○"}</Badge>)}
                      </span>
                      <Button size="xs" variant="primary" onClick={() => openVisitSheet({ propertyId: property.id, demandId: demand.id, contactId: demand.contactId })}>
                        {P.actions.visit}
                      </Button>
                    </li>
                  );
                })}
              </ul>
            )
          )}
          {tab === "visits" && (
            visits.length === 0 ? <EmptyState>{P.visitsEmpty}</EmptyState> : (
              <ul className="divide-y divide-slate-100">
                {visits.map((v) => {
                  const contact = contactById(data, v.contactId);
                  return (
                    <li key={v.id}>
                      <button type="button" onClick={() => go("visit", v.id)} className="flex w-full flex-wrap items-center gap-3 py-2.5 text-left hover:bg-blue-50/40">
                        <span className="font-mono text-[12px] text-blue-700">{v.id}</span>
                        <span className="text-[12.5px] text-slate-700">{dayLabel(v.dayOffset, lang, S)} · {v.time}</span>
                        <span className="text-[12.5px] text-slate-500">{contact ? bi(contact.name, lang) : v.contactId}</span>
                        <span className="ml-auto"><StatusBadge kind="visitStatus" value={v.status} S={S} /></span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            )
          )}
          {tab === "documents" && (
            <div className="grid gap-4 lg:grid-cols-2">
              <div>
                <CardHeader title={S.common.documents} className="border-b-0 px-0 pt-0" />
                {documents.length === 0 ? <EmptyState>{P.docsEmpty}</EmptyState> : (
                  <ul className="divide-y divide-slate-100 rounded-md border border-slate-100">
                    {documents.map((doc) => (
                      <li key={doc.id} className="flex items-center justify-between gap-3 px-3 py-2 text-[12.5px]">
                        <span className="text-slate-700">{bi(doc.name, lang)}</span>
                        <StatusBadge kind="docStatus" value={doc.status} S={S} />
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <CardHeader title={S.common.checklist} className="border-b-0 px-0 pt-0" />
                <ul className="space-y-1.5">
                  {checklist.map((row) => (
                    <li key={row.key} className="flex items-center gap-2 text-[12.5px]">
                      <Check done={row.done} auto={row.auto} />
                      <span className={row.done ? "text-slate-800" : "text-slate-500"}>{S.checklist.property[row.key]}</span>
                      {row.auto && <Badge tone="neutral">{S.common.auto}</Badge>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
}
