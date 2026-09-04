/* Formatting and date helpers for the demo (day offsets relative to today). */

const LOCALE = { es: "es-ES", en: "en-GB" };
const DAY = 24 * 3600 * 1000;

/** Picks a bilingual value ({ es, en }) or returns plain strings as-is. */
export function bi(value, lang) {
  if (value && typeof value === "object") return value[lang] ?? value.es ?? "";
  return value ?? "";
}

export function money(amount, lang, kind = "sale", S) {
  const formatted = new Intl.NumberFormat(LOCALE[lang] || LOCALE.es, {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(amount);
  return kind === "rent" && S ? `${formatted}${S.common.perMonth}` : formatted;
}

export function todayStart() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

export function dateFromOffset(offset) {
  return new Date(todayStart().getTime() + offset * DAY);
}

export function offsetFromDate(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - todayStart().getTime()) / DAY);
}

/** yyyy-mm-dd for <input type="date"> in local time. */
export function toInputDate(date) {
  const d = new Date(date);
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

export function fromInputDate(value) {
  const [y, m, d] = value.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function formatDate(offset, lang, opts = {}) {
  return new Intl.DateTimeFormat(LOCALE[lang] || LOCALE.es, {
    weekday: "short",
    day: "numeric",
    month: "short",
    ...opts,
  }).format(dateFromOffset(offset));
}

/** "Hoy" / "Mañana" / "Ayer" or a short date. */
export function dayLabel(offset, lang, S) {
  if (offset === 0) return S.common.today;
  if (offset === 1) return S.common.tomorrow;
  if (offset === -1) return S.common.yesterday;
  return formatDate(offset, lang);
}

export function timeToMinutes(time) {
  const [h, m] = String(time).split(":").map(Number);
  return h * 60 + (m || 0);
}

export function relativeTime(ts, lang, S, now = Date.now()) {
  const diff = Math.max(0, now - ts);
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return S.common.justNow;
  if (hours < 24) return S.common.hoursAgo.replace("{n}", hours);
  return S.common.daysAgo.replace("{n}", Math.floor(hours / 24));
}

export function hoursAgoTs(hours, now = Date.now()) {
  return now - hours * 3600000;
}

export const cx = (...parts) => parts.filter(Boolean).join(" ");
