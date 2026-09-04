import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { contactById, demandById, matchesForDemand, operationsForDemand, visitsForDemand } from "../store/selectors";
import { bi, dayLabel, money } from "../utils/format";
import { Badge, Button, Card, CardHeader, EmptyState, Field, Fields, PageHeader, RefLink, StatusBadge } from "../components/ui";

export default function DemandDetail() {
  const { data } = useDemo();
  const { lang, S, nav, go, back, openVisitSheet } = useUi();
  const demand = demandById(data, nav.id);
  if (!demand) return <EmptyState>{S.common.noResults}</EmptyState>;
  const D = S.demands;
  const contact = contactById(data, demand.contactId);
  const matches = matchesForDemand(data, demand);
  const visits = visitsForDemand(data, demand.id);
  const operations = operationsForDemand(data, demand.id);

  return (
    <div>
      <PageHeader
        onBack={back}
        backLabel={S.common.back}
        title={demand.id}
        badge={<StatusBadge kind="demandStatus" value={demand.status} S={S} />}
        subtitle={`${S.enums.kind[demand.kind]} · ${S.enums.propertyType[demand.type]} · ${contact ? bi(contact.name, lang) : demand.contactId}`}
        actions={
          <>
            <Button onClick={() => go("matching", null, { mode: "demand", id: demand.id })}>{D.actions.matching}</Button>
            <Button variant="primary" onClick={() => openVisitSheet({ demandId: demand.id, contactId: demand.contactId, propertyId: matches[0]?.property.id })}>
              {D.actions.visit}
            </Button>
          </>
        }
      />
      <div className="grid gap-4 xl:grid-cols-12">
        <Card className="xl:col-span-5">
          <CardHeader title={D.criteriaTitle} />
          <div className="px-4 py-4">
            <Fields className="lg:grid-cols-2">
              <Field label={S.common.client}>
                {contact ? <RefLink onClick={() => go("contact", contact.id)}>{contact.id}</RefLink> : demand.contactId}
                {contact && <span className="ml-2 text-slate-500">{bi(contact.name, lang)}</span>}
              </Field>
              <Field label={S.common.type}>{S.enums.kind[demand.kind]} · {S.enums.propertyType[demand.type]}</Field>
              <Field label={S.common.zone}>{S.enums.zone[demand.zone]}</Field>
              <Field label={D.maxBudget}>≤ {money(demand.maxBudget, lang, demand.kind, S)}</Field>
              <Field label={D.minBedrooms}>{demand.minBedrooms}</Field>
              <Field label={D.minSurface}>≥ {demand.minSurface} m²</Field>
              <Field label={S.common.status}><StatusBadge kind="demandStatus" value={demand.status} S={S} /></Field>
            </Fields>
          </div>
          <CardHeader title={D.visitsTitle} className="border-t" />
          <div className="px-4 py-3">
            {visits.length === 0 ? <p className="text-[12.5px] text-slate-500">{S.common.none}</p> : (
              <ul className="space-y-2">
                {visits.map((v) => (
                  <li key={v.id} className="flex flex-wrap items-center gap-3 text-[12.5px]">
                    <RefLink onClick={() => go("visit", v.id)}>{v.id}</RefLink>
                    <RefLink onClick={() => go("property", v.propertyId)}>{v.propertyId}</RefLink>
                    <span className="text-slate-700">{dayLabel(v.dayOffset, lang, S)} · {v.time}</span>
                    <StatusBadge kind="visitStatus" value={v.status} S={S} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <CardHeader title={D.operationsTitle} className="border-t" />
          <div className="px-4 py-3">
            {operations.length === 0 ? <p className="text-[12.5px] text-slate-500">{S.common.none}</p> : (
              <ul className="space-y-2">
                {operations.map((o) => (
                  <li key={o.id} className="flex flex-wrap items-center gap-3 text-[12.5px]">
                    <RefLink onClick={() => go("operation", o.id)}>{o.id}</RefLink>
                    <span className="text-slate-700">{o.propertyId} · {money(o.price, lang, "sale", S)}</span>
                    <StatusBadge kind="operationStage" value={o.stage} S={S} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>

        <Card className="xl:col-span-7">
          <CardHeader title={D.compatible} subtitle={`${matches.length} ${S.common.results}`} />
          {matches.length === 0 ? <div className="p-4"><EmptyState>{D.compatibleEmpty}</EmptyState></div> : (
            <ul className="divide-y divide-slate-100">
              {matches.map(({ property, criteria }) => (
                <li key={property.id} className="px-4 py-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <RefLink onClick={() => go("property", property.id)}>{property.id}</RefLink>
                    <span className="text-[12.5px] font-medium text-slate-900">{S.enums.propertyType[property.type]} · {property.bedrooms} {S.common.bedrooms.toLowerCase()}</span>
                    <span className="text-[12.5px] text-slate-600">{property.surface} m² · {money(property.price, lang, property.kind, S)} · {S.enums.zone[property.zone]}</span>
                    <Badge tone="green" className="ml-auto">{S.common.compatible}</Badge>
                  </div>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    {criteria.map((c) => <Badge key={c.key} tone={c.ok ? "blue" : "neutral"}>{S.enums.criteria[c.key]} {c.ok ? "✓" : "○"}</Badge>)}
                    <span className="ml-auto flex gap-2">
                      <Button size="xs" onClick={() => go("property", property.id)}>{D.actions.property}</Button>
                      <Button size="xs" variant="primary" onClick={() => openVisitSheet({ propertyId: property.id, demandId: demand.id, contactId: demand.contactId })}>{D.actions.visit}</Button>
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
