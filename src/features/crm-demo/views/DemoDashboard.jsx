import { useState } from "react";
import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { agendaItems, dashboardStats, operationCounts, pipelineCounts, recentActivity } from "../store/selectors";
import { describeActivity } from "../utils/activity";
import { bi, cx, relativeTime } from "../utils/format";
import { Badge, Button, Card, CardHeader, KpiCard, PageHeader, StatusBadge } from "../components/ui";

export default function DemoDashboard() {
  const { data } = useDemo();
  const { lang, S, go } = useUi();
  const [period, setPeriod] = useState("week");
  const d = S.dashboard;
  const stats = dashboardStats(data, period);
  const pipeline = pipelineCounts(data);
  const operations = operationCounts(data);
  const maxPipeline = Math.max(1, ...pipeline.map((p) => p.count));
  const today = agendaItems(data).filter((item) => item.dayOffset === 0 && !item.done);
  const activity = recentActivity(data, 8);

  const kpis = [
    { key: "newDemands", value: stats.newDemands, target: ["demands"] },
    { key: "attention", value: stats.attention, tone: "yellow", target: ["demands"] },
    { key: "activeProperties", value: stats.activeProperties, target: ["properties"] },
    { key: "upcomingVisits", value: stats.upcomingVisits, target: ["visits"] },
    { key: "openOperations", value: stats.openOperations, target: ["operations"] },
    { key: "pendingDocs", value: stats.pendingDocs, target: ["documents"] },
    { key: "pendingTasks", value: stats.pendingTasks, target: ["calendar"] },
  ];

  const openItem = (item) => {
    if (item.kind === "visit") go("visit", item.id);
    else if (item.refs.operationId) go("operation", item.refs.operationId);
    else if (item.refs.demandId) go("demand", item.refs.demandId);
    else if (item.refs.propertyId) go("property", item.refs.propertyId);
    else if (item.refs.contactId) go("contact", item.refs.contactId);
  };

  return (
    <div>
      <PageHeader
        title={d.title}
        subtitle={d.subtitle}
        actions={
          <div role="group" aria-label={S.common.filters} className="flex rounded-md border border-slate-200 bg-white p-0.5">
            {Object.entries(d.period).map(([key, label]) => (
              <button
                key={key}
                type="button"
                aria-pressed={period === key}
                onClick={() => setPeriod(key)}
                className={cx(
                  "rounded px-2.5 py-1 text-[12px] font-medium transition-colors",
                  period === key ? "bg-blue-600 text-white" : "text-slate-600 hover:bg-slate-50"
                )}
              >
                {label}
              </button>
            ))}
          </div>
        }
      />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-7">
        {kpis.map((kpi) => (
          <KpiCard
            key={kpi.key}
            label={d.kpis[kpi.key]}
            value={kpi.value}
            tone={kpi.tone}
            hint={kpi.tone && kpi.value > 0 ? "!" : undefined}
            onClick={() => go(...kpi.target)}
          />
        ))}
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-12">
        {/* Commercial pipeline */}
        <Card className="xl:col-span-7">
          <CardHeader title={d.pipeline} subtitle={d.pipelineNote} />
          <div className="px-4 py-4">
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
              {pipeline.map((stage) => (
                <div key={stage.stage} className="min-w-0">
                  <div className="flex h-24 items-end rounded-md bg-slate-50">
                    <span
                      className="w-full rounded-md bg-blue-600/85 transition-[height] duration-500"
                      style={{ height: `${Math.max(6, (stage.count / maxPipeline) * 100)}%` }}
                    />
                  </div>
                  <p className="mt-2 truncate text-[11px] font-medium text-slate-600">{S.enums.pipeline[stage.stage]}</p>
                  <p className="text-[16px] font-semibold text-slate-900">{stage.count}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 border-t border-slate-100 pt-4">
              <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-slate-400">{d.operationsPipeline}</p>
              <ol className="mt-2 flex flex-wrap gap-2">
                {operations.map((stage) => (
                  <li key={stage.stage} className="flex items-center gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1 text-[11.5px] text-slate-600">
                    {S.enums.operationStage[stage.stage]}
                    <span className={cx("rounded-full px-1.5 text-[10.5px] font-semibold", stage.count ? "bg-blue-100 text-blue-800" : "bg-slate-100 text-slate-500")}>
                      {stage.count}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Card>

        {/* Today's agenda */}
        <Card className="xl:col-span-5">
          <CardHeader title={d.agenda} actions={<Button size="xs" onClick={() => go("calendar")}>{d.viewAgenda}</Button>} />
          {today.length === 0 ? (
            <p className="px-4 py-6 text-[12.5px] text-slate-500">{d.agendaEmpty}</p>
          ) : (
            <ul className="divide-y divide-slate-100">
              {today.map((item) => {
                const contact = data.contacts.find((c) => c.id === item.refs.contactId);
                return (
                  <li key={item.id}>
                    <button type="button" onClick={() => openItem(item)} className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-blue-50/40">
                      <span className="w-11 shrink-0 font-mono text-[11.5px] text-slate-500">{item.time}</span>
                      <StatusBadge kind="agendaType" value={item.type} S={S} />
                      <span className="min-w-0 flex-1 truncate text-[12.5px] text-slate-700">
                        {item.kind === "visit" ? item.refs.propertyId : S.agendaTasks[item.labelKey]}
                        {contact && <span className="text-slate-400"> · {bi(contact.name, lang)}</span>}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        {/* Recent activity */}
        <Card className="xl:col-span-12">
          <CardHeader title={d.activity} />
          <ul className="divide-y divide-slate-100">
            {activity.map((entry) => {
              const { text, target } = describeActivity(entry, data, lang, S);
              const Row = target ? "button" : "div";
              return (
                <li key={entry.id}>
                  <Row
                    type={target ? "button" : undefined}
                    onClick={target ? () => go(target.view, target.id, target.params) : undefined}
                    className={cx("flex w-full items-center gap-3 px-4 py-2.5 text-left", target && "hover:bg-blue-50/40")}
                  >
                    <span aria-hidden="true" className={cx("h-1.5 w-1.5 shrink-0 rounded-full", entry.type === "checklist_updated" ? "bg-emerald-500" : "bg-blue-500")} />
                    <span className="min-w-0 flex-1 truncate text-[12.5px] text-slate-700">{text}</span>
                    {entry.type === "checklist_updated" && <Badge tone="green">{S.common.auto}</Badge>}
                    <span className="shrink-0 text-[11px] text-slate-400">{relativeTime(entry.ts, lang, S)}</span>
                  </Row>
                </li>
              );
            })}
          </ul>
        </Card>
      </div>
    </div>
  );
}
