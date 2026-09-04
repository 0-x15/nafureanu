import { MessageCircle, Phone } from "lucide-react";
import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { contactById, demandsForContact, operationsForContact, propertiesForOwner, visitsForContact } from "../store/selectors";
import { describeActivity } from "../utils/activity";
import { bi, dayLabel, money, relativeTime, hoursAgoTs } from "../utils/format";
import { Card, CardHeader, EmptyState, Field, Fields, PageHeader, RefLink, StatusBadge } from "../components/ui";

export default function ContactDetail() {
  const { data } = useDemo();
  const { lang, S, nav, go, back } = useUi();
  const contact = contactById(data, nav.id);
  if (!contact) return <EmptyState>{S.common.noResults}</EmptyState>;
  const C = S.contacts;
  const demands = demandsForContact(data, contact.id);
  const visits = visitsForContact(data, contact.id);
  const operations = operationsForContact(data, contact.id);
  const owned = propertiesForOwner(data, contact.id);
  const activity = data.activity
    .filter((a) => a.refs?.contactId === contact.id || demands.some((d) => d.id === a.refs?.demandId) || visits.some((v) => v.id === a.refs?.visitId) || operations.some((o) => o.id === a.refs?.operationId))
    .sort((a, b) => b.ts - a.ts)
    .slice(0, 6);

  return (
    <div>
      <PageHeader
        onBack={back}
        backLabel={S.common.back}
        title={bi(contact.name, lang)}
        badge={<StatusBadge kind="contactRole" value={contact.role} S={S} />}
        subtitle={`${contact.id} · ${S.enums.channel[contact.channel]}`}
      />
      <div className="grid gap-4 xl:grid-cols-12">
        <Card className="xl:col-span-7">
          <CardHeader title={S.common.summary} />
          <div className="px-4 py-4">
            <Fields>
              <Field label={S.common.role}>{S.enums.contactRole[contact.role]}</Field>
              <Field label={S.common.channel}>{S.enums.channel[contact.channel]}</Field>
              {contact.stage && <Field label={S.common.stage}><StatusBadge kind="demandStatus" value={contact.stage} S={S} /></Field>}
              <Field label={S.common.phone}>{contact.phone}</Field>
              <Field label={S.common.email}>{contact.email}</Field>
              <Field label={C.lastContact}>{relativeTime(hoursAgoTs(contact.lastContactHours), lang, S)}</Field>
            </Fields>
          </div>
          <CardHeader title={C.sections.demand} className="border-t" />
          <div className="px-4 py-3">
            {demands.length === 0 ? <p className="text-[12.5px] text-slate-500">{C.noDemand}</p> : (
              <ul className="space-y-2">
                {demands.map((d) => (
                  <li key={d.id} className="flex flex-wrap items-center gap-3 text-[12.5px]">
                    <RefLink onClick={() => go("demand", d.id)}>{d.id}</RefLink>
                    <span className="text-slate-700">{S.enums.kind[d.kind]} · {S.enums.propertyType[d.type]} · {S.enums.zone[d.zone]} · ≤ {money(d.maxBudget, lang, d.kind, S)}</span>
                    <StatusBadge kind="demandStatus" value={d.status} S={S} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          {owned.length > 0 && (
            <>
              <CardHeader title={C.sections.properties} className="border-t" />
              <ul className="space-y-2 px-4 py-3">
                {owned.map((p) => (
                  <li key={p.id} className="flex flex-wrap items-center gap-3 text-[12.5px]">
                    <RefLink onClick={() => go("property", p.id)}>{p.id}</RefLink>
                    <span className="text-slate-700">{S.enums.propertyType[p.type]} · {S.enums.zone[p.zone]} · {money(p.price, lang, p.kind, S)}</span>
                    <StatusBadge kind="propertyStatus" value={p.status} S={S} />
                  </li>
                ))}
              </ul>
            </>
          )}
          <CardHeader title={C.sections.visits} className="border-t" />
          <div className="px-4 py-3">
            {visits.length === 0 ? <p className="text-[12.5px] text-slate-500">{C.noVisits}</p> : (
              <ul className="space-y-2">
                {visits.map((v) => (
                  <li key={v.id} className="flex flex-wrap items-center gap-3 text-[12.5px]">
                    <RefLink onClick={() => go("visit", v.id)}>{v.id}</RefLink>
                    <span className="text-slate-700">{v.propertyId} · {dayLabel(v.dayOffset, lang, S)} · {v.time}</span>
                    <StatusBadge kind="visitStatus" value={v.status} S={S} />
                  </li>
                ))}
              </ul>
            )}
          </div>
          <CardHeader title={C.sections.operations} className="border-t" />
          <div className="px-4 py-3">
            {operations.length === 0 ? <p className="text-[12.5px] text-slate-500">{C.noOperation}</p> : (
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
        <div className="space-y-4 xl:col-span-5">
          <Card>
            <CardHeader title={C.sections.comms} subtitle={C.commsSummary} />
            <ul className="divide-y divide-slate-100">
              {C.comms.map((line, i) => (
                <li key={i} className="flex items-center gap-3 px-4 py-2.5 text-[12.5px] text-slate-700">
                  {line.type === "whatsapp" ? <MessageCircle className="h-4 w-4 text-emerald-600" /> : <Phone className="h-4 w-4 text-blue-600" />}
                  {line.text}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <CardHeader title={C.sections.activity} />
            {activity.length === 0 ? <p className="px-4 py-4 text-[12.5px] text-slate-500">{S.common.none}</p> : (
              <ul className="divide-y divide-slate-100">
                {activity.map((entry) => {
                  const { text } = describeActivity(entry, data, lang, S);
                  return (
                    <li key={entry.id} className="flex items-center gap-3 px-4 py-2.5 text-[12.5px] text-slate-700">
                      <span className="min-w-0 flex-1 truncate">{text}</span>
                      <span className="text-[11px] text-slate-400">{relativeTime(entry.ts, lang, S)}</span>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
