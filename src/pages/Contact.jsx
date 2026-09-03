import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { SITE } from "@/data/site";
import { STRINGS, langPath, otherLang } from "@/i18n";
import Reveal from "@/components/Reveal";
import { usePageMeta } from "@/lib/seo";

const fieldCls =
  "w-full rounded-lg border border-border bg-card px-4 py-3 text-sm text-foreground placeholder:text-[#9A94A6] outline-none transition-colors focus:border-accent";

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

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    need: "",
    problem: "",
    result: "",
  });
  const [error, setError] = useState("");

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError(c.error);
      return;
    }
    setError("");
    const body = [
      `${c.fields.name}: ${form.name}`,
      `${c.fields.company}: ${form.company || "—"}`,
      `${c.fields.email}: ${form.email}`,
      "",
      `${c.fields.need}:`,
      form.need || "—",
      "",
      `${c.fields.problem}:`,
      form.problem || "—",
      "",
      `${c.fields.result}:`,
      form.result || "—",
    ].join("\n");
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      c.subjectPrefix + form.name
    )}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section className="bg-background px-5 pt-36 md:px-10 md:pt-48" aria-labelledby="contact-heading">
      <p className="text-xs font-medium uppercase tracking-[0.22em] text-accent">
        {c.kicker}
      </p>
      <h1
        id="contact-heading"
        className="mt-5 max-w-3xl font-heading text-4xl font-bold leading-[1.08] tracking-[-0.02em] text-foreground md:text-6xl"
      >
        {c.h1}
      </h1>
      <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
        {c.sub}
      </p>

      <div className="mt-16 grid gap-16 pb-24 md:mt-24 md:grid-cols-12">
        {/* Form */}
        <form onSubmit={submit} noValidate className="md:col-span-7 lg:col-span-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">
                {c.fields.name}
              </span>
              <input
                type="text"
                value={form.name}
                onChange={set("name")}
                placeholder={c.ph.name}
                autoComplete="name"
                className={fieldCls}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">
                {c.fields.company}
              </span>
              <input
                type="text"
                value={form.company}
                onChange={set("company")}
                placeholder={c.ph.company}
                autoComplete="organization"
                className={fieldCls}
              />
            </label>
          </div>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-foreground">
              {c.fields.email}
            </span>
            <input
              type="email"
              value={form.email}
              onChange={set("email")}
              placeholder={c.ph.email}
              autoComplete="email"
              className={fieldCls}
            />
          </label>

          <label className="mt-5 block">
            <span className="mb-2 block text-sm font-medium text-foreground">
              {c.fields.need}
            </span>
            <textarea
              rows={4}
              value={form.need}
              onChange={set("need")}
              placeholder={c.ph.need}
              className={fieldCls}
            />
          </label>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">
                {c.fields.problem}
              </span>
              <textarea
                rows={3}
                value={form.problem}
                onChange={set("problem")}
                placeholder={c.ph.problem}
                className={fieldCls}
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm font-medium text-foreground">
                {c.fields.result}
              </span>
              <textarea
                rows={3}
                value={form.result}
                onChange={set("result")}
                placeholder={c.ph.result}
                className={fieldCls}
              />
            </label>
          </div>

          {error && (
            <p role="alert" className="mt-5 text-sm font-medium text-destructive">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="action-primary group mt-8 inline-flex items-center gap-2 rounded-[6px] px-8 py-4 text-sm font-medium text-accent-foreground"
          >
            {c.submit}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-[2px] group-hover:translate-x-[2px]" />
          </button>
        </form>

        {/* Aside */}
        <aside className="md:col-span-5 lg:col-span-4">
          <Reveal>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {c.nextKicker}
            </p>
            <ol className="mt-6 space-y-4">
              {c.steps.map((step, i) => (
                <li key={step} className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-[#5A6070]">{step}</span>
                </li>
              ))}
            </ol>
            <div className="mt-10 border-t border-border pt-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                {c.emailKicker}
              </p>
              <a
                href={`mailto:${SITE.email}`}
                className="mt-3 inline-block text-sm font-medium text-foreground underline underline-offset-4 transition-colors hover:text-accent"
              >
                {SITE.email}
              </a>
              <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
                {c.note}
              </p>
            </div>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}