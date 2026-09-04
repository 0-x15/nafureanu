import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Building2,
  CalendarDays,
  ClipboardList,
  DoorOpen,
  FileText,
  LayoutDashboard,
  Menu,
  RotateCcw,
  Route,
  Shuffle,
  Users,
  X,
} from "lucide-react";
import GlobalSearch from "./components/GlobalSearch";
import { useUi } from "./store/UiContext";
import { cx } from "./utils/format";

const NAV = [
  { view: "dashboard", icon: LayoutDashboard },
  { view: "properties", icon: Building2, group: ["properties", "property"] },
  { view: "contacts", icon: Users, group: ["contacts", "contact"] },
  { view: "demands", icon: ClipboardList, group: ["demands", "demand"] },
  { view: "matching", icon: Shuffle },
  { view: "calendar", icon: CalendarDays },
  { view: "visits", icon: DoorOpen, group: ["visits", "visit"] },
  { view: "operations", icon: Briefcase, group: ["operations", "operation"] },
  { view: "documents", icon: FileText },
];

/** The application shell: sidebar, top bar, content and disclaimer. */
export default function CrmDemoShell({ children, onReset }) {
  const { S, nav, go, tour, casePath, otherLangPath } = useUi();
  const [drawer, setDrawer] = useState(false);

  const isActive = (item) => (item.group || [item.view]).includes(nav.view);
  const currentNav = NAV.find(isActive) || NAV[0];

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-2.5 border-b border-white/10 px-4 py-4">
        <span aria-hidden="true" className="flex h-7 w-7 items-center justify-center rounded-md bg-white/15 font-mono text-[10px] font-bold text-white">
          CRM
        </span>
        <div className="min-w-0">
          <p className="truncate text-[13px] font-semibold text-white">{S.app.name}</p>
          <p className="truncate text-[10.5px] text-blue-100/70">{S.app.subtitle}</p>
        </div>
        <button
          type="button"
          onClick={() => setDrawer(false)}
          aria-label={S.app.close}
          className="ml-auto rounded-md p-1 text-blue-100/80 hover:bg-white/10 lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <nav aria-label={S.app.menu} className="flex-1 overflow-y-auto px-2 py-3">
        {NAV.map(({ view, icon: Icon, ...item }) => {
          const active = isActive({ view, ...item });
          return (
            <button
              key={view}
              type="button"
              onClick={() => {
                go(view);
                setDrawer(false);
              }}
              aria-current={active ? "page" : undefined}
              className={cx(
                "mb-0.5 flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[12.5px] font-medium transition-colors",
                active ? "bg-white/15 text-white" : "text-blue-100/80 hover:bg-white/10 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {S.nav[view]}
            </button>
          );
        })}
      </nav>
      <div className="border-t border-white/10 px-2 py-3">
        <button
          type="button"
          onClick={() => {
            tour.start();
            setDrawer(false);
          }}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[12.5px] font-medium text-blue-100/80 hover:bg-white/10 hover:text-white"
        >
          <Route className="h-4 w-4 shrink-0" />
          {S.app.tour}
        </button>
        <button
          type="button"
          onClick={() => {
            onReset();
            setDrawer(false);
          }}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[12.5px] font-medium text-blue-100/80 hover:bg-white/10 hover:text-white"
        >
          <RotateCcw className="h-4 w-4 shrink-0" />
          {S.app.reset}
        </button>
        <Link
          to={casePath}
          className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-left text-[12.5px] font-medium text-blue-100/80 hover:bg-white/10 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4 shrink-0" />
          {S.app.back}
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F4F6FA] font-body text-slate-800 antialiased">
      {/* Sidebar — persistent on large screens, drawer below */}
      <aside className="hidden w-56 shrink-0 bg-[#0F2A6B] lg:sticky lg:top-0 lg:block lg:h-screen">{sidebar}</aside>
      {drawer && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div className="w-64 max-w-[85%] bg-[#0F2A6B] shadow-2xl">{sidebar}</div>
          <button type="button" aria-label={S.app.close} onClick={() => setDrawer(false)} className="flex-1 bg-slate-900/40" />
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        {/* Top application bar */}
        <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-4 py-2.5 md:px-6">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              aria-label={S.app.menu}
              className="rounded-md p-1.5 text-slate-600 hover:bg-slate-100 lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
            <p className="hidden items-center gap-1.5 text-[12px] text-slate-500 md:flex">
              <span className="font-medium text-slate-700">{S.app.name}</span>
              <span className="text-slate-300">/</span>
              <span>{S.nav[currentNav.view]}</span>
            </p>
            <div className="order-last w-full md:order-none md:ml-auto md:w-auto md:flex-1 md:max-w-md">
              <GlobalSearch />
            </div>
            <div className="ml-auto flex items-center gap-2 md:ml-0">
              <span className="hidden items-center gap-1.5 rounded-md border border-yellow-300 bg-yellow-50 px-2 py-1 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-yellow-800 sm:flex">
                <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
                {S.app.env}
              </span>
              <Link
                to={otherLangPath}
                className="rounded-md border border-slate-200 px-2 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-slate-600 hover:bg-slate-50"
              >
                {S.app.language}
              </Link>
              <span className="flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1 text-[11.5px] text-slate-700">
                <span aria-hidden="true" className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-[10px] font-semibold text-blue-700">
                  UD
                </span>
                <span className="hidden sm:inline">{S.app.user}</span>
              </span>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 py-5 md:px-6 md:py-6">{children}</main>

        <footer className="border-t border-slate-200 px-4 py-3 md:px-6">
          <p className="text-[11px] leading-relaxed text-slate-500">{S.app.disclaimer}</p>
        </footer>
      </div>
    </div>
  );
}
