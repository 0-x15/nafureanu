import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { bi, dateFromOffset, fromInputDate, offsetFromDate, toInputDate } from "../utils/format";
import { Button, Input, Select } from "./ui";

/**
 * Schedule-visit side sheet. Creating the visit really updates the
 * store, so it appears in Visits, Calendar, the demand, the property,
 * the dashboard and the activity feed.
 */
export default function VisitSheet({ open, prefill, onClose }) {
  const { data, createVisit } = useDemo();
  const { lang, S, toast } = useUi();
  const sheet = S.visitSheet;

  const demandOptions = useMemo(
    () =>
      data.demands
        .filter((d) => d.status !== "won")
        .map((d) => {
          const contact = data.contacts.find((c) => c.id === d.contactId);
          return { id: d.id, contactId: d.contactId, label: `${d.id} · ${contact ? bi(contact.name, lang) : d.contactId}` };
        }),
    [data, lang]
  );
  const propertyOptions = useMemo(
    () => data.properties.filter((p) => p.status === "active" || p.status === "reserved"),
    [data]
  );

  const [form, setForm] = useState(null);
  useEffect(() => {
    if (!open) return;
    const firstDemand = prefill?.demandId || demandOptions[0]?.id;
    setForm({
      propertyId: prefill?.propertyId || propertyOptions[0]?.id,
      demandId: firstDemand,
      date: toInputDate(dateFromOffset(1)),
      time: "10:00",
      duration: 45,
      type: "first",
      notes: "",
    });
  }, [open, prefill, demandOptions, propertyOptions]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    const demand = data.demands.find((d) => d.id === form.demandId);
    createVisit({
      propertyId: form.propertyId,
      demandId: form.demandId,
      contactId: demand ? demand.contactId : prefill?.contactId,
      dayOffset: offsetFromDate(fromInputDate(form.date)),
      time: form.time,
      duration: Number(form.duration),
      type: form.type,
      notes: form.notes,
    });
    toast(sheet.toast);
    onClose();
  };

  return (
    <AnimatePresence>
      {open && form && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[60] flex justify-end bg-slate-900/40"
          onClick={onClose}
        >
          <motion.form
            role="dialog"
            aria-modal="true"
            aria-labelledby="crm-demo-visit-title"
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 24, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            onSubmit={submit}
            className="flex h-full w-full max-w-md flex-col overflow-auto border-l border-slate-200 bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
              <div>
                <h2 id="crm-demo-visit-title" className="text-[15px] font-semibold text-slate-900">{sheet.title}</h2>
                <p className="mt-0.5 text-[12px] text-slate-500">{sheet.subtitle}</p>
              </div>
              <button type="button" onClick={onClose} aria-label={S.app.close} className="rounded-md p-1 text-slate-500 hover:bg-slate-100">
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="grid flex-1 content-start gap-4 px-5 py-4">
              <label className="grid gap-1 text-[11.5px] font-medium text-slate-600">
                {sheet.fields.property}
                <Select value={form.propertyId} onChange={set("propertyId")}>
                  {propertyOptions.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.id} · {S.enums.propertyType[p.type]} · {S.enums.zone[p.zone]}
                    </option>
                  ))}
                </Select>
              </label>
              <label className="grid gap-1 text-[11.5px] font-medium text-slate-600">
                {sheet.fields.contact}
                <Select value={form.demandId} onChange={set("demandId")}>
                  {demandOptions.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.label}
                    </option>
                  ))}
                </Select>
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="grid gap-1 text-[11.5px] font-medium text-slate-600">
                  {sheet.fields.date}
                  <Input type="date" value={form.date} onChange={set("date")} required />
                </label>
                <label className="grid gap-1 text-[11.5px] font-medium text-slate-600">
                  {sheet.fields.time}
                  <Input type="time" value={form.time} onChange={set("time")} required />
                </label>
                <label className="grid gap-1 text-[11.5px] font-medium text-slate-600">
                  {sheet.fields.duration}
                  <Select value={form.duration} onChange={set("duration")}>
                    {Object.entries(sheet.durations).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </label>
                <label className="grid gap-1 text-[11.5px] font-medium text-slate-600">
                  {sheet.fields.type}
                  <Select value={form.type} onChange={set("type")}>
                    {Object.entries(S.enums.visitType).map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </Select>
                </label>
              </div>
              <label className="grid gap-1 text-[11.5px] font-medium text-slate-600">
                {sheet.fields.notes}
                <textarea
                  rows={3}
                  value={form.notes}
                  onChange={set("notes")}
                  placeholder={sheet.notesPlaceholder}
                  className="rounded-md border border-slate-200 px-2.5 py-2 text-[12.5px] text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:outline-none"
                />
              </label>
            </div>
            <div className="flex items-center justify-end gap-2 border-t border-slate-100 px-5 py-3">
              <Button onClick={onClose}>{S.common.cancel}</Button>
              <Button variant="primary" type="submit">
                {sheet.create}
              </Button>
            </div>
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
