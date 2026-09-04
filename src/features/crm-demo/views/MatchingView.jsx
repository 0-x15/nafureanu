import { useEffect, useMemo, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { contactById, matchesForDemand, matchesForProperty } from "../store/selectors";
import { CRITERIA } from "../utils/matching";
import { bi, cx, money } from "../utils/format";
import { Badge, Button, Card, CardHeader, EmptyState, Field, Fields, PageHeader, RefLink, Select, StatusBadge } from "../components/ui";

/** Working bidirectional matching over the live demo store. */
export default function MatchingView() {
  const { data } = useDemo();
  const { lang, S, nav, go, openVisitSheet } = useUi();
  const M = S.matching;
  const [mode, setMode] = useState(nav.params?.mode || "demand");
  const [sourceId, setSourceId] = useState(nav.params?.id || null);

  useEffect(() => {
    if (nav.params?.mode) setMode(nav.params.mode);
    if (nav.params?.id) setSourceId(nav.params.id);
  }, [nav.params]);

  const options = mode === "demand" ? data.demands.filter((d) => d.status !== "won") : data.properties.filter((p) => p.status === "active" || p.status === "reserved");
  const selectedId = options.some((o) => o.id === sourceId) ? sourceId : options[0]?.id;
  const source = options.find((o) => o.id === selectedId) || null;

  const results = useMemo(() => {
    if (!source) return [];
    return mode === "demand" ? matchesForDemand(data, source) : matchesForProperty(data, source);
  }, [data, mode, source]);

  const switchMode = (next) => {
    setMode(next);
    setSourceId(null);
  };

  return (
    <div>
      <PageHeader
        title={M.title}
        subtitle={M.subtitle}
        actions={
          <div role="tablist" className="flex rounded-md border border-slate-200 bg-white p-0.5">
            {Object.entries(M.modes).map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={mode === key}
                onClick={() => switchMode(key)}
                className={cx("rounded px-3 py-1.5 text-[12px] font-medium transition-colors", mode === key ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50")}
              >
                {label}
              </button>
            ))}
          </div>
        }
      />
      <div className="grid gap-4 lg:grid-cols-12">
        <Card className="lg:col-span-4">
          <CardHeader title={M.source} />
          <div className="space-y-4 px-4 py-4">
            <label className="grid gap-1 text-[11.5px] font-medium text-slate-600">
              {mode === "demand" ? M.selectDemand : M.selectProperty}
              <Select value={selectedId || ""} onChange={(e) => setSourceId(e.target.value)}>
                {options.map((o) => {
                  const contact = mode === "demand" ? contactById(data, o.contactId) : null;
                  return (
                    <option key={o.id} value={o.id}>
                      {o.id} · {mode === "demand" ? (contact ? bi(contact.name, lang) : "") : `${S.enums.propertyType[o.type]} · ${S.enums.zone[o.zone]}`}
                    </option>
                  );
                })}
              </Select>
            </label>
            {source && mode === "demand" && (
              <Fields className="sm:grid-cols-2 lg:grid-cols-2">
                <Field label={S.common.type}>{S.enums.kind[source.kind]} · {S.enums.propertyType[source.type]}</Field>
                <Field label={S.common.zone}>{S.enums.zone[source.zone]}</Field>
                <Field label={S.common.budget}>≤ {money(source.maxBudget, lang, source.kind, S)}</Field>
                <Field label={S.common.bedrooms}>{source.minBedrooms}+</Field>
                <Field label={S.common.surface}>≥ {source.minSurface} m²</Field>
                <Field label={S.common.status}><StatusBadge kind="demandStatus" value={source.status} S={S} /></Field>
              </Fields>
            )}
            {source && mode === "property" && (
              <Fields className="sm:grid-cols-2 lg:grid-cols-2">
                <Field label={S.common.type}>{S.enums.propertyKind[source.kind]} · {S.enums.propertyType[source.type]}</Field>
                <Field label={S.common.zone}>{S.enums.zone[source.zone]}</Field>
                <Field label={S.common.price}>{money(source.price, lang, source.kind, S)}</Field>
                <Field label={S.common.bedrooms}>{source.bedrooms}</Field>
                <Field label={S.common.surface}>{source.surface} m²</Field>
                <Field label={S.common.status}><StatusBadge kind="propertyStatus" value={source.status} S={S} /></Field>
              </Fields>
            )}
            <div className="rounded-md border border-blue-100 bg-blue-50/60 p-3">
              <p className="text-[10.5px] font-semibold uppercase tracking-[0.08em] text-blue-700">{M.engine}</p>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {CRITERIA.map((key) => <Badge key={key} tone="blue">{S.enums.criteria[key]}</Badge>)}
              </ul>
              <p className="mt-2 text-[11px] leading-relaxed text-slate-500">{M.note}</p>
            </div>
          </div>
        </Card>

        <Card className="lg:col-span-8">
          <CardHeader title={M.results[mode]} subtitle={`${results.length} ${S.common.results}`} />
          {results.length === 0 ? <div className="p-4"><EmptyState>{M.empty}</EmptyState></div> : (
            <ul className="divide-y divide-slate-100">
              {results.map((r) => {
                const entity = mode === "demand" ? r.property : r.demand;
                const contact = mode === "property" ? contactById(data, r.demand.contactId) : null;
                return (
                  <li key={entity.id} className="px-4 py-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <RefLink onClick={() => go(mode === "demand" ? "property" : "demand", entity.id)}>{entity.id}</RefLink>
                      {mode === "demand" ? (
                        <span className="text-[12.5px] text-slate-700">{S.enums.propertyType[entity.type]} · {entity.bedrooms} {S.common.bedrooms.toLowerCase()} · {entity.surface} m² · {money(entity.price, lang, entity.kind, S)} · {S.enums.zone[entity.zone]}</span>
                      ) : (
                        <span className="text-[12.5px] text-slate-700">{contact ? bi(contact.name, lang) : entity.contactId} · {S.enums.kind[entity.kind]} · ≤ {money(entity.maxBudget, lang, entity.kind, S)} · {entity.minBedrooms}+ {S.common.bedrooms.toLowerCase()}</span>
                      )}
                      <Badge tone="green" className="ml-auto">{S.common.compatible}</Badge>
                    </div>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      {r.criteria.map((c) => <Badge key={c.key} tone={c.ok ? "blue" : "neutral"}>{S.enums.criteria[c.key]} {c.ok ? "✓" : "○"}</Badge>)}
                      <span className="ml-auto flex gap-2">
                        <Button size="xs" onClick={() => go(mode === "demand" ? "property" : "demand", entity.id)}>
                          {mode === "demand" ? M.actions.property : M.actions.demand}
                          <ArrowRight className="h-3 w-3" />
                        </Button>
                        <Button
                          size="xs"
                          variant="primary"
                          onClick={() =>
                            openVisitSheet(
                              mode === "demand"
                                ? { propertyId: entity.id, demandId: source.id, contactId: source.contactId }
                                : { propertyId: source.id, demandId: entity.id, contactId: entity.contactId }
                            )
                          }
                        >
                          {M.actions.visit}
                        </Button>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
}
