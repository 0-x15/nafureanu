import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import ActionLink from "@/components/ActionLink";
import { STRINGS, langPath, otherLang } from "@/i18n";
import { usePageMeta } from "@/lib/seo";

/**
 * Contact — where a project starts. One composition: the statement on
 * the left, the brief on the right, written like a short project
 * document in three numbered parts (contact · project · context). Each
 * part carries a mark that fills as it is completed; sending resolves
 * the document into its received state in place. The message goes to a
 * server-side endpoint that owns the recipient; nothing here knows it.
 */
const MONO = "font-mono text-[10px] uppercase tracking-[0.16em]";
const EASE = [0.22, 1, 0.36, 1];
const ENDPOINT = "/api/contact";
const LIMITS = { name: 120, company: 160, email: 200, need: 4000, problem: 4000, result: 4000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const EMPTY = { name: "", company: "", email: "", need: "", problem: "", result: "", website: "" };
const ORDER = ["name", "company", "email", "need", "problem", "result"];

function validate(form, e) {
  /** @type {Record<string, string>} */
  const errors = {};
  const name = form.name.trim();
  if (name.length < 2) errors.name = e.nameRequired;
  else if (name.length > LIMITS.name) errors.name = e.tooLong;
  const email = form.email.trim();
  if (!email) errors.email = e.emailRequired;
  else if (email.length > LIMITS.email || !EMAIL_RE.test(email)) errors.email = e.emailInvalid;
  const need = form.need.trim();
  if (need.length < 10) errors.need = e.needRequired;
  else if (need.length > LIMITS.need) errors.need = e.tooLong;
  for (const k of ["company", "problem", "result"]) if (form[k].trim().length > LIMITS[k]) errors[k] = e.tooLong;
  return errors;
}

/** Server field codes → the same messages the client uses. */
function fromServer(fields, e) {
  /** @type {Record<string, Record<string, string>>} */
  const map = { required: { name: e.nameRequired, email: e.emailRequired, need: e.needRequired }, invalid: { email: e.emailInvalid } };
  /** @type {Record<string, string>} */
  const errors = {};
  for (const [key, code] of Object.entries(fields || {})) {
    if (!ORDER.includes(key)) continue;
    errors[key] = map[code]?.[key] || (code === "too_long" ? e.tooLong : e.summary);
  }
  return errors;
}

const fieldCls = "mt-2 block w-full border-0 border-b bg-transparent px-0 py-2.5 text-[16px] leading-[1.5] text-foreground placeholder:text-foreground/35 outline-none transition-[border-color,box-shadow] duration-200 focus:border-accent focus:shadow-[0_1px_0_0_hsl(var(--accent))]";

function Field({ id, label, optional = undefined, error = undefined, textarea = false, rows = 4, ...input }) {
  const Tag = textarea ? "textarea" : "input";
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <label htmlFor={id} className="text-[13px] font-medium tracking-[-0.005em] text-foreground">{label}</label>
        {optional && <span className={cn(MONO, "text-muted-foreground")}>{optional}</span>}
      </div>
      <Tag
        id={id}
        rows={textarea ? rows : undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(fieldCls, textarea && "min-h-[3.5rem] resize-y", error ? "border-destructive" : "border-foreground/20")}
        {...input}
      />
      {error && <p id={`${id}-error`} className="mt-2 text-[13px] text-destructive">{error}</p>}
    </div>
  );
}

/** One numbered part of the brief, with its completion mark. */
function Part({ part, state, stateLabel, children }) {
  return (
    <section aria-labelledby={`part-${part.n}`} className="grid gap-y-4 border-t border-foreground/12 py-7 md:grid-cols-[124px_1fr] md:gap-x-8 md:py-8">
      <div className="flex items-baseline justify-between gap-3 md:block">
        <p id={`part-${part.n}`} className="flex items-baseline gap-2">
          <span className={cn(MONO, "text-accent")}>{part.n}</span>
          <span className="text-[13px] font-medium text-foreground">{part.label}</span>
        </p>
        <p className="flex items-center gap-2 md:mt-3">
          <span aria-hidden="true" className={cn("h-[7px] w-[7px] border border-accent transition-colors duration-500", state === "done" && "bg-accent")} />
          <span className={cn(MONO, "text-muted-foreground")}>{stateLabel}</span>
        </p>
      </div>
      <div className="grid gap-6">{children}</div>
    </section>
  );
}

/** The brief, resolved. Takes focus when it mounts so the outcome is announced. */
function Received({ c, lang, parts, reduced }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus({ preventScroll: true });
  }, []);
  return (
    <motion.div
      ref={ref}
      tabIndex={-1}
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE }}
      className="border-t border-foreground/12 pt-8 outline-none"
    >
      <div className="flex items-center gap-3">
        <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true" className="shrink-0">
          <rect x="0.5" y="0.5" width="27" height="27" className="fill-accent stroke-accent" />
          <motion.path d="M7 14.5 L12 19.5 L21 9.5" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="square" initial={reduced ? false : { pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.25, ease: EASE }} />
        </svg>
        <p className={cn(MONO, "text-accent")}>{c.success.kicker}</p>
      </div>
      <h2 className="mt-6 font-heading text-[clamp(1.9rem,3.2vw,2.9rem)] font-bold leading-[1.02] tracking-[-0.03em] text-foreground">{c.success.title}</h2>
      <p className="mt-4 max-w-[46ch] text-[16px] leading-[1.6] text-foreground/80 md:text-[17px]">{c.success.text}</p>
      {/* the document, resolved */}
      <ol className="mt-10 border-t border-foreground/12">
        {parts.map((k) => (
          <li key={k} className="flex items-center justify-between border-b border-foreground/12 py-3">
            <span className="flex items-baseline gap-2">
              <span className={cn(MONO, "text-accent")}>{c.parts[k].n}</span>
              <span className="text-[13px] font-medium text-foreground">{c.parts[k].label}</span>
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="h-[7px] w-[7px] bg-accent" />
              <span className={cn(MONO, "text-muted-foreground")}>{c.status.done}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <span className={cn(MONO, "text-muted-foreground")}>{c.success.ref}</span>
        <ActionLink variant="text" icon="right" to={langPath(lang, "/")}>{c.success.back}</ActionLink>
      </div>
    </motion.div>
  );
}

function After({ c }) {
  return (
    <div>
      <p className={cn(MONO, "text-muted-foreground")}>{c.after.kicker}</p>
      <ol className="mt-4 space-y-2.5">
        {c.after.steps.map((t, i) => (
          <li key={t} className="flex items-baseline gap-3 text-[14px] text-foreground/80">
            <span className={cn(MONO, "text-accent")}>{String(i + 1).padStart(2, "0")}</span>
            {t}
          </li>
        ))}
      </ol>
    </div>
  );
}

function Capacity({ c, className = "" }) {
  return (
    <div className={className}>
      <p className={cn(MONO, "text-muted-foreground")}>{c.capacity.kicker}</p>
      <p className="mt-3 max-w-[38ch] text-[14px] leading-[1.6] text-foreground/75">{c.capacity.text}</p>
    </div>
  );
}

export default function Contact({ lang = "es" }) {
  const s = STRINGS[lang];
  const c = s.contact;
  usePageMeta({
    lang,
    title: s.meta.contact.title,
    description: s.meta.contact.description,
    path: langPath(lang, "/contact"),
    alternatePath: langPath(otherLang(lang), "/contact"),
  });
  const reduced = useReducedMotion();

  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState(/** @type {Record<string, string>} */ ({}));
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const mountedAt = useRef(Date.now());
  const inFlight = useRef(false);
  const alertRef = useRef(null);

  const set = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };
  // once the visitor has tried to send, keep the marks honest as they type
  useEffect(() => {
    if (submitted) setErrors(validate(form, c.errors));
  }, [form, submitted, c.errors]);
  useEffect(() => {
    if (status === "error") alertRef.current?.focus();
  }, [status]);

  const focusFirst = (errs) => {
    const key = ORDER.find((k) => errs[k]);
    if (key) document.getElementById(`contact-${key}`)?.focus();
  };

  const submit = async (e) => {
    e.preventDefault();
    if (inFlight.current) return;
    const errs = validate(form, c.errors);
    setSubmitted(true);
    setErrors(errs);
    if (Object.keys(errs).length) {
      setStatus("idle");
      focusFirst(errs);
      return;
    }
    inFlight.current = true;
    setStatus("sending");
    const ctrl = new AbortController();
    const timer = setTimeout(() => ctrl.abort(), 15000);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          company: form.company.trim(),
          email: form.email.trim(),
          need: form.need.trim(),
          problem: form.problem.trim(),
          result: form.result.trim(),
          lang,
          website: form.website,
          elapsed: Date.now() - mountedAt.current,
        }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data && data.ok === true) {
        setStatus("success");
      } else if (res.status === 422 && data && data.fields) {
        const serverErrs = fromServer(data.fields, c.errors);
        setErrors(serverErrs);
        setStatus("idle");
        focusFirst(serverErrs);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      clearTimeout(timer);
      inFlight.current = false;
    }
  };

  const sending = status === "sending";
  const emailOk = EMAIL_RE.test(form.email.trim());
  const states = {
    contact: form.name.trim().length >= 2 && emailOk ? "done" : "pending",
    project: form.need.trim().length >= 10 ? "done" : "pending",
    context: form.problem.trim() || form.result.trim() ? "done" : "optional",
  };
  const parts = ["contact", "project", "context"];
  const hasErrors = submitted && Object.keys(errors).length > 0;

  return (
    <section aria-labelledby="contact-heading" className="relative overflow-hidden px-5 pb-20 pt-24 md:px-10 md:pb-28 md:pt-28">
      {/* atmosphere: a cool field entering from the top right, a cyan one low on the left */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute -right-[14%] -top-[26%] h-[70vh] w-[56vw] rounded-full bg-[radial-gradient(closest-side,rgba(49,87,246,0.11),transparent)]" />
        <span className="absolute -left-[16%] bottom-[-14%] h-[52vh] w-[42vw] rounded-full bg-[radial-gradient(closest-side,rgba(23,180,205,0.08),transparent)]" />
      </div>

      <div className="relative mx-auto max-w-[1440px]">
        {/* the top edge */}
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-3 border-b border-foreground/12 pb-3">
          <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">{c.kicker}</p>
          <p className={cn(MONO, "text-muted-foreground")}>{c.meta.left}</p>
          <p className={cn(MONO, "hidden text-muted-foreground md:block")}>{c.meta.right}</p>
        </div>

        <div className="mt-8 grid gap-10 md:mt-10 lg:grid-cols-12 lg:gap-x-12">
          {/* the statement */}
          <div className="lg:col-span-5">
            <h1 id="contact-heading" className="max-w-[14ch] font-heading text-[clamp(2.4rem,4.4vw,3.9rem)] font-bold leading-[1.02] tracking-[-0.035em] text-foreground [text-wrap:balance]">
              {c.h1}
            </h1>
            <p className="mt-6 max-w-[44ch] text-[16px] leading-[1.6] text-foreground/80 md:text-[17px]">{c.sub}</p>
            <div className="mt-14 hidden lg:block">
              <After c={c} />
              <Capacity c={c} className="mt-10 border-t border-foreground/12 pt-6" />
            </div>
          </div>

          {/* the brief */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait" initial={false}>
              {status === "success" ? (
                <Received key="received" c={c} lang={lang} parts={parts} reduced={Boolean(reduced)} />
              ) : (
                <motion.form
                  key="brief"
                  onSubmit={submit}
                  noValidate
                  aria-busy={sending || undefined}
                  initial={false}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <Part part={c.parts.contact} state={states.contact} stateLabel={c.status[states.contact]}>
                    <div className="grid gap-6 sm:grid-cols-2 sm:gap-x-8">
                      <Field id="contact-name" name="name" type="text" label={c.fields.name} placeholder={c.ph.name} autoComplete="name" maxLength={LIMITS.name} value={form.name} onChange={set("name")} error={errors.name} disabled={sending} />
                      <Field id="contact-company" name="company" type="text" label={c.fields.company} optional={c.optional} placeholder={c.ph.company} autoComplete="organization" maxLength={LIMITS.company} value={form.company} onChange={set("company")} error={errors.company} disabled={sending} />
                    </div>
                    <Field id="contact-email" name="email" type="email" inputMode="email" spellCheck={false} label={c.fields.email} placeholder={c.ph.email} autoComplete="email" maxLength={LIMITS.email} value={form.email} onChange={set("email")} error={errors.email} disabled={sending} />
                  </Part>

                  <Part part={c.parts.project} state={states.project} stateLabel={c.status[states.project]}>
                    <Field id="contact-need" name="need" textarea rows={4} label={c.fields.need} placeholder={c.ph.need} maxLength={LIMITS.need} value={form.need} onChange={set("need")} error={errors.need} disabled={sending} />
                  </Part>

                  <Part part={c.parts.context} state={states.context} stateLabel={c.status[states.context]}>
                    <Field id="contact-problem" name="problem" textarea rows={3} label={c.fields.problem} optional={c.optional} placeholder={c.ph.problem} maxLength={LIMITS.problem} value={form.problem} onChange={set("problem")} error={errors.problem} disabled={sending} />
                    <Field id="contact-result" name="result" textarea rows={3} label={c.fields.result} optional={c.optional} placeholder={c.ph.result} maxLength={LIMITS.result} value={form.result} onChange={set("result")} error={errors.result} disabled={sending} />
                  </Part>

                  {/* honeypot: hidden from people and assistive tech, skipped by the keyboard */}
                  <div className="sr-only" aria-hidden="true">
                    <label htmlFor="contact-website">Website</label>
                    <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={set("website")} />
                  </div>

                  <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-foreground/12 pt-7">
                    <ActionLink as="button" type="submit" size="lg" disabled={sending}>{sending ? c.sending : c.submit}</ActionLink>
                    <p className="text-[13px] text-muted-foreground">{c.hint}</p>
                  </div>
                  {hasErrors && status !== "error" && (
                    <p role="alert" className="mt-5 text-[13px] text-destructive">{c.errors.summary}</p>
                  )}
                  {status === "error" && (
                    <p ref={alertRef} tabIndex={-1} role="alert" className="mt-5 border-l-2 border-destructive pl-4 text-[14px] text-foreground outline-none">{c.error}</p>
                  )}
                  <p role="status" aria-live="polite" className="sr-only">{sending ? c.sending : ""}</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* below lg, what happens next and the capacity note follow the brief */}
        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:hidden">
          <After c={c} />
          <Capacity c={c} />
        </div>
      </div>
    </section>
  );
}
