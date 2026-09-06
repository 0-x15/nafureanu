/**
 * Data for the digital exhibition: which real captures become 3D
 * surfaces, the per-project atmosphere derived from each live site,
 * and the scroll choreography timing (1 unit = 100vh of scroll).
 */
export const IDS = ["dd-evecom", "dental-goya", "reformas-octavian", "mp-monitor"];

export const asset = (id, file) => `/work/web-projects/${id}/${file}.webp`;

/* Surfaces in the scene. `winA` is the share of a tall capture visible
   through the 16:10 frame (DD Evecom travels through its full homepage). */
export const PLANES = [
  { key: "dd-evecom:desk", id: "dd-evecom", kind: "desk", texA: "gl-surface", texB: "gl-detail", aspect: 1.6, winA: 1000 / 3000, winB: 1, radius: 0.012, seed: 1.3 },
  { key: "dd-evecom:phone", id: "dd-evecom", kind: "phone", texA: "gl-phone", aspect: 640 / 1385, winA: 1, winB: 1, radius: 0.09, seed: 2.1 },
  { key: "dental-goya:desk", id: "dental-goya", kind: "desk", texA: "gl-surface", texB: "gl-detail", aspect: 1.6, winA: 1, winB: 1, radius: 0.012, seed: 3.7 },
  { key: "dental-goya:phone", id: "dental-goya", kind: "phone", texA: "gl-phone", aspect: 640 / 1385, winA: 1, winB: 1, radius: 0.09, seed: 4.2 },
  { key: "reformas-octavian:desk", id: "reformas-octavian", kind: "desk", texA: "gl-surface", texB: "gl-detail", aspect: 1.6, winA: 1, winB: 1, radius: 0.012, seed: 5.9 },
  { key: "reformas-octavian:phone", id: "reformas-octavian", kind: "phone", texA: "gl-phone", aspect: 640 / 1385, winA: 1, winB: 1, radius: 0.09, seed: 6.4 },
  { key: "reformas-octavian:detail", id: "reformas-octavian", kind: "detail", texA: "gl-detail2", aspect: 1.6, winA: 1, winB: 1, radius: 0.012, seed: 7.1 },
  { key: "mp-monitor:desk", id: "mp-monitor", kind: "desk", texA: "gl-surface", aspect: 1.6, winA: 1, winB: 1, radius: 0.012, seed: 8.8 },
  { key: "mp-monitor:phone", id: "mp-monitor", kind: "phone", texA: "gl-phone", aspect: 640 / 1385, winA: 1, winB: 1, radius: 0.09, seed: 9.5 },
  { key: "mp-monitor:detail", id: "mp-monitor", kind: "detail", texA: "gl-detail", aspect: 1.6, winA: 1, winB: 1, radius: 0.012, seed: 10.2 },
];

/* Atmosphere per project, taken from the real designs: DD Evecom's
   violet, the clinic's green, Octavian's architectural greys and the
   dark product surface of MP Monitor. Screenshots are never recoloured;
   only the room around them changes. */
export const PALETTES = {
  hero: { c1: "#FBFAF6", c2: "#F3F2FA", c3: "#EEF2F8", fg: "#171A24", acc: "#3157F6", line: "rgba(23,26,36,0.14)" },
  "dd-evecom": { c1: "#F9F6FF", c2: "#EFE8FF", c3: "#E3DAF9", fg: "#1B1730", acc: "#7C5CE6", line: "rgba(27,23,48,0.14)" },
  "dental-goya": { c1: "#F7FAF2", c2: "#E9F2DD", c3: "#D6E8C4", fg: "#1B2818", acc: "#3E7D2C", line: "rgba(27,40,24,0.14)" },
  "reformas-octavian": { c1: "#F5F4F0", c2: "#E9E7E1", c3: "#D9D6CE", fg: "#151515", acc: "#151515", line: "rgba(21,21,21,0.16)" },
  "mp-monitor": { c1: "#151B27", c2: "#0E131C", c3: "#090D14", fg: "#EEF2F8", acc: "#35C77A", line: "rgba(238,242,248,0.16)" },
  end: { c1: "#F9F7F0", c2: "#F9F7F0", c3: "#F9F7F0", fg: "#171A24", acc: "#3157F6", line: "rgba(23,26,36,0.14)" },
};

/** Palette → CSS custom properties for a style attribute. @returns {any} */
export const cssVars = (p) => ({ "--c1": p.c1, "--c2": p.c2, "--c3": p.c3, "--fg": p.fg, "--acc": p.acc, "--line": p.line });

/* Choreography timing. 1 = 100vh of scroll. */
export const T = { hold: 0.25, intro: 0.7, project: 1.9, ending: 1.2 };
export const INTRO_END = T.hold + T.intro;
export const projectStart = (i) => INTRO_END + i * T.project;
export const ENDING = projectStart(4);
export const DURATION = ENDING + T.ending;

/* Where a click on the rail lands: the calm first state of each project. */
export const projectAnchor = (i) => projectStart(i) + 0.2;

export function activeIndex(t) {
  if (t < INTRO_END - 0.15) return -1;
  if (t >= ENDING + 0.15) return 4;
  return Math.max(0, Math.min(3, Math.floor((t - INTRO_END + 0.4) / T.project)));
}
