import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Image } from "@/components/ui/image";
import { STRINGS, langPath } from "@/i18n";

const EASE = [0.22, 1, 0.36, 1];
/** Per-project accent — distinct identity, same design system. */
const ACCENTS = {
  fivo: "#5CDBEA",
  sophia: "#3D7BFF",
  "life-admin": "#8E7BFF",
  "odoo-engineering": "#3D7BFF",
  "web-projects": "#8E7BFF",
};

/**
 * Cinematic full-viewport project panel with parallax depth, ghost
 * index typography and a masked title reveal.
 * variant "stack" (Work page): sticky panels that cover each other.
 */
export default function WorkPanel({ project, index, lang, stack = false }) {
  const s = STRINGS[lang].workSection;
  const c = project.copy[lang];
  const accent = ACCENTS[project.slug] || "#3D7BFF";
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.18, 1.02]);
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <section
      ref={ref}
      className={
        stack
          ? "sticky top-0 h-screen overflow-hidden"
          : "relative h-[86vh] overflow-hidden md:h-[94vh]"
      }
    >
      <Link
        to={langPath(lang, `/work/${project.slug}`)}
        data-cursor="view"
        className="group absolute inset-0 block"
        aria-label={`${project.title} — ${c.type}`}
      >
        <motion.div style={{ scale, y }} className="absolute inset-0">
          <Image
            src={project.image}
            alt=""
            fittingType="fill"
            className="h-full w-full"
          />
        </motion.div>

        {/* Legibility gradients */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#07090E] via-[#07090E]/45 to-[#07090E]/15"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[#07090E]/25 transition-colors duration-700 group-hover:bg-[#07090E]/10"
        />

        {/* Ghost index */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-2 right-3 font-heading text-[30vw] font-bold leading-none text-transparent md:-top-6 md:right-10 md:text-[17vw]"
          style={{ WebkitTextStroke: `1px ${accent}40` }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Content */}
        <div className="absolute inset-x-5 bottom-8 md:inset-x-10 md:bottom-12">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.2em]"
            style={{ color: accent }}
          >
            {project.code} — {c.type}
          </p>
          <h3 className="mt-3 overflow-hidden">
            <motion.span
              className="block font-heading text-6xl font-bold uppercase leading-[0.95] tracking-[-0.02em] text-[#F0EFEA] md:text-9xl"
              initial={{ y: "108%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.9, ease: EASE }}
            >
              {project.title}
            </motion.span>
          </h3>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#C6CCD9] md:text-base">
            {c.summary}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
            <ul className="flex flex-wrap gap-2">
              {project.stack.slice(0, 4).map((t) => (
                <li
                  key={t}
                  className="border border-[#2A3550] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-[#8A93A6]"
                >
                  {t}
                </li>
              ))}
            </ul>
            <span
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.15em] text-[#F0EFEA]"
              style={{ color: accent }}
            >
              {s.viewCase}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>

        {/* Accent rail */}
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 transition-transform duration-700 group-hover:scale-y-100"
          style={{ background: accent }}
        />
      </Link>
    </section>
  );
}