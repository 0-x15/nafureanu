import { useEffect, useMemo, useRef, useState } from "react";
import { Search } from "lucide-react";
import { useDemo } from "../store/DemoStore";
import { useUi } from "../store/UiContext";
import { search } from "../store/selectors";
import { bi, cx } from "../utils/format";
import { fill } from "../i18n";

/** Client-side search across properties, contacts, demand and operations. */
export default function GlobalSearch() {
  const { data } = useDemo();
  const { lang, S, go } = useUi();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  const results = useMemo(() => search(data, query, lang), [data, query, lang]);
  const flat = useMemo(() => {
    const out = [];
    results.properties.forEach((p) => out.push({ group: "properties", id: p.id, label: p.id, meta: `${S.enums.propertyType[p.type]} · ${S.enums.zone[p.zone]}`, target: { view: "property", id: p.id } }));
    results.contacts.forEach((c) => out.push({ group: "contacts", id: c.id, label: bi(c.name, lang), meta: `${c.id} · ${S.enums.contactRole[c.role]}`, target: { view: "contact", id: c.id } }));
    results.demands.forEach((d) => out.push({ group: "demands", id: d.id, label: d.id, meta: `${S.enums.kind[d.kind]} · ${S.enums.zone[d.zone]}`, target: { view: "demand", id: d.id } }));
    results.operations.forEach((o) => out.push({ group: "operations", id: o.id, label: o.id, meta: `${o.propertyId} · ${S.enums.operationStage[o.stage]}`, target: { view: "operation", id: o.id } }));
    return out;
  }, [results, S, lang]);

  useEffect(() => {
    const onDown = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  const pick = (item) => {
    go(item.target.view, item.target.id);
    setQuery("");
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      setOpen(false);
      e.currentTarget.blur();
    }
    if (e.key === "Enter" && flat[0]) pick(flat[0]);
  };

  let lastGroup = null;

  return (
    <div ref={boxRef} className="relative w-full max-w-md">
      <label className="relative block">
        <Search className="pointer-events-none absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
        <input
          type="search"
          value={query}
          placeholder={S.app.search}
          aria-label={S.app.search}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          className="h-8 w-full rounded-md border border-slate-200 bg-slate-50 pl-8 pr-3 text-[12.5px] text-slate-700 placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:outline-none"
        />
      </label>
      {open && query.trim() && (
        <div className="absolute left-0 right-0 top-full z-40 mt-1 max-h-80 overflow-auto rounded-md border border-slate-200 bg-white py-1 shadow-lg">
          {flat.length === 0 && (
            <p className="px-3 py-2 text-[12px] text-slate-500">{fill(S.search.empty, { q: query })}</p>
          )}
          {flat.map((item) => {
            const showGroup = item.group !== lastGroup;
            lastGroup = item.group;
            return (
              <div key={`${item.group}-${item.id}`}>
                {showGroup && (
                  <p className="px-3 pb-0.5 pt-1.5 text-[10px] font-semibold uppercase tracking-[0.1em] text-slate-400">
                    {S.search.groups[item.group]}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => pick(item)}
                  className={cx("flex w-full items-baseline justify-between gap-3 px-3 py-1.5 text-left hover:bg-blue-50/60")}
                >
                  <span className="text-[12.5px] font-medium text-slate-800">{item.label}</span>
                  <span className="truncate text-[11px] text-slate-500">{item.meta}</span>
                </button>
              </div>
            );
          })}
        </div>
      )}
      {open && !query.trim() && (
        <p className="absolute left-0 top-full mt-1 text-[10.5px] text-slate-400">{S.app.searchHint}</p>
      )}
    </div>
  );
}
