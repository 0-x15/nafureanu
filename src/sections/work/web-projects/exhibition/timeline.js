import { ENDING, DURATION, IDS, INTRO_END, PALETTES, PLANES, T, cssVars, projectStart } from "./data";

/**
 * The whole exhibition is one scrubbed GSAP timeline. It drives plain
 * state objects (read every frame by the WebGL surfaces) and the DOM
 * layers with the same clock, so typography, atmosphere and surfaces
 * move as one choreography. Times are in units of 100vh of scroll.
 *
 * Plane state: x/y are fractions of the visible width/height at z=0
 * (-0.5..0.5), z is world depth (camera at z=6), w is the plane width as
 * a fraction of the visible width, o opacity, s travel through a tall
 * capture (0..1), m displacement crossfade to the detail texture.
 */
export function initialStates() {
  const S = {};
  PLANES.forEach((p) => {
    S[p.key] = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, w: 0.5, o: 0, s: 0, m: 0 };
  });
  /* The hero: four surfaces suspended at different depths around the title. */
  Object.assign(S["dd-evecom:desk"], { x: 0.35, y: 0.04, z: 0, rx: 0.02, ry: -0.18, w: 0.28, o: 1 });
  Object.assign(S["dental-goya:phone"], { x: 0.16, y: -0.3, z: 0.9, ry: -0.14, rz: 0.02, w: 0.054, o: 1 });
  Object.assign(S["reformas-octavian:desk"], { x: 0.22, y: 0.37, z: -1.6, ry: 0.22, rz: 0.02, w: 0.24, o: 0.92 });
  Object.assign(S["mp-monitor:detail"], { x: -0.2, y: 0.37, z: -0.9, ry: 0.14, rz: -0.02, w: 0.2, o: 0.88 });
  return S;
}

/* The calm first state of each project's main surface. */
const POSE_A = {
  "dd-evecom": { x: 0.19, y: 0, z: 0, rx: 0, ry: -0.1, rz: 0, w: 0.56 },
  "dental-goya": { x: 0.19, y: 0, z: 0, rx: 0, ry: -0.1, rz: 0, w: 0.56 },
  "reformas-octavian": { x: 0.19, y: 0, z: 0, rx: 0.01, ry: -0.08, rz: 0, w: 0.58 },
  "mp-monitor": { x: 0.2, y: 0, z: 0, rx: 0.02, ry: 0.07, rz: 0, w: 0.58 },
};
const PHONE_FROM = { x: 0.45, y: -0.55, z: -0.4, rx: 0, ry: -0.3, rz: 0.05, w: 0.115, o: 0, s: 0, m: 0 };
const PHONE_B = { x: 0.34, y: -0.08, z: 0.7, ry: -0.18, rz: 0, o: 1 };

export function buildTimeline(tl, S, q, atmo) {
  const set = (key, props, at) => tl.set(S[key], props, at);
  const to = (key, props, dur, at, ease = "power2.inOut") => tl.to(S[key], { ...props, duration: dur, ease }, at);
  const palette = (name, dur, at) => tl.to(atmo, { ...cssVars(PALETTES[name]), duration: dur, ease: "sine.inOut" }, at);
  const HIDDEN = "inset(0% 0% 100% 0%)";
  const SHOWN = "inset(0% 0% 0% 0%)";
  const GONE = "inset(100% 0% 0% 0%)";

  const infoIn = (i, at) => {
    tl.fromTo(q(`[data-name='${i}'] [data-line]`), { clipPath: HIDDEN, yPercent: 40 }, { clipPath: SHOWN, yPercent: 0, stagger: 0.06, duration: 0.32, ease: "power3.out" }, at);
    tl.fromTo(q(`[data-info='${i}'] [data-item]`), { opacity: 0, y: 14 }, { opacity: 1, y: 0, stagger: 0.04, duration: 0.25, ease: "power2.out" }, at + 0.12);
    tl.set(q(`[data-info='${i}']`), { pointerEvents: "auto" }, at);
  };
  const infoOut = (i, at) => {
    tl.to(q(`[data-name='${i}'] [data-line]`), { clipPath: GONE, yPercent: -30, stagger: 0.04, duration: 0.28, ease: "power2.in" }, at);
    tl.to(q(`[data-info='${i}'] [data-item]`), { opacity: 0, y: -8, duration: 0.2, ease: "power1.in" }, at);
    tl.set(q(`[data-info='${i}']`), { pointerEvents: "none" }, at);
  };

  /* ── Hero hold: the composition barely breathes with the first scroll ── */
  to("dd-evecom:desk", { z: 0.15 }, T.hold, 0, "none");
  to("dental-goya:phone", { y: -0.27 }, T.hold, 0, "none");
  to("reformas-octavian:desk", { y: 0.34 }, T.hold, 0, "none");
  to("mp-monitor:detail", { y: 0.35 }, T.hold, 0, "none");

  /* ── Entering the exhibition: the title separates, the far surfaces fly
        past the camera and DD Evecom settles into the stage ── */
  const I = T.hold;
  to("dd-evecom:desk", { ...POSE_A["dd-evecom"] }, 0.7, I, "power2.inOut");
  to("dental-goya:phone", { z: 3.6, x: -0.62, y: -0.6, o: 0 }, 0.5, I, "power2.in");
  to("reformas-octavian:desk", { z: 2.4, x: 0.55, y: 0.75, o: 0 }, 0.6, I + 0.05, "power2.in");
  to("mp-monitor:detail", { z: 3.0, x: -0.7, y: 0.8, o: 0 }, 0.55, I + 0.03, "power2.in");
  tl.to(q("[data-hero-line='0']"), { xPercent: -14, opacity: 0, duration: 0.4, ease: "power2.in" }, I + 0.05);
  tl.to(q("[data-hero-line='1']"), { letterSpacing: "0.08em", opacity: 0, duration: 0.42, ease: "power2.in" }, I + 0.1);
  tl.to(q("[data-hero-line='2']"), { xPercent: 14, opacity: 0, duration: 0.45, ease: "power2.in" }, I + 0.05);
  tl.to(q("[data-hero-ui]"), { opacity: 0, y: -10, duration: 0.25, ease: "power1.in" }, I);
  tl.set(q("[data-hero]"), { pointerEvents: "none" }, I + 0.25);
  tl.set(q("[data-hero-ui]"), { visibility: "hidden" }, I + 0.26);
  palette("dd-evecom", 0.55, I + 0.1);
  tl.to(q("[data-exhibit-ui]"), { opacity: 1, duration: 0.25, ease: "power1.out" }, INTRO_END - 0.2);
  infoIn(0, INTRO_END - 0.3);

  /* ── One scene per project: A main surface · B second surface forward ·
        C detail · then an authored hand-over to the next project ── */
  IDS.forEach((id, i) => {
    const P = projectStart(i);
    const desk = `${id}:desk`;
    const phone = `${id}:phone`;
    const detail = `${id}:detail`;

    if (id !== "mp-monitor") {
      set(phone, PHONE_FROM, P + 0.44);
      to(phone, PHONE_B, 0.45, P + 0.45, "power3.out");
      to(desk, { x: POSE_A[id].x - 0.05, ry: POSE_A[id].ry - 0.06, z: -0.15 }, 0.45, P + 0.45);
    }
    if (id === "dd-evecom") {
      /* Travel through the whole homepage, then a displacement to the projects page. */
      to(desk, { s: 1 }, 0.75, P + 0.3, "none");
      to(desk, { m: 1 }, 0.15, P + 1.06, "power1.inOut");
    }
    if (id === "dental-goya") {
      to(desk, { m: 1 }, 0.17, P + 0.95, "power1.inOut");
      to(desk, { x: 0.1, y: 0.03, z: 0.1, ry: -0.2 }, 0.45, P + 0.95);
      to(phone, { x: 0.37, y: -0.18, z: 0.9, ry: -0.24 }, 0.45, P + 0.95);
    }
    if (id === "reformas-octavian") {
      to(desk, { m: 1 }, 0.16, P + 0.92, "power1.inOut");
      set(detail, { x: 0.5, y: -0.42, z: -1.3, rx: 0, ry: 0.28, rz: 0.03, w: 0.32, o: 0, s: 0, m: 0 }, P + 0.99);
      to(detail, { x: 0.45, y: -0.37, z: -0.9, o: 0.95 }, 0.4, P + 1.0, "power3.out");
    }
    if (id === "mp-monitor") {
      /* An application: the chart comes forward as a data layer, then the phone. */
      set(detail, { x: -0.06, y: -0.14, z: -0.6, rx: 0, ry: 0.24, rz: -0.01, w: 0.36, o: 0, s: 0, m: 0 }, P + 0.44);
      to(detail, { x: 0.02, y: -0.1, z: 0.55, ry: 0.16, o: 1 }, 0.45, P + 0.45, "power3.out");
      to(desk, { x: 0.23, ry: 0.12, z: -0.2 }, 0.45, P + 0.45);
      set(phone, { x: 0.5, y: -0.4, z: -0.3, rx: 0, ry: -0.3, rz: 0.04, w: 0.105, o: 0, s: 0, m: 0 }, P + 0.94);
      to(phone, { x: 0.38, y: -0.14, z: 0.9, ry: -0.2, rz: 0, o: 1 }, 0.4, P + 0.95, "power3.out");
    }

    if (i < 3) {
      const next = IDS[i + 1];
      const ndesk = `${next}:desk`;
      to(desk, { x: -0.3, y: 0.06, z: 1.5, ry: -0.5, rz: -0.06 }, 0.45, P + 1.4, "power2.in");
      to(desk, { o: 0 }, 0.3, P + 1.5, "power1.in");
      to(phone, { x: 0.6, y: 0.4, z: 1.8, ry: 0.2 }, 0.4, P + 1.42, "power2.in");
      to(phone, { o: 0 }, 0.25, P + 1.5, "power1.in");
      if (id === "reformas-octavian") to(detail, { z: -3, o: 0 }, 0.35, P + 1.4, "power2.in");
      set(ndesk, { ...POSE_A[next], x: 0.44, y: -0.1, z: -2.4, ry: -0.36, rz: 0.03, o: 0, s: 0, m: 0 }, P + 1.45);
      to(ndesk, { ...POSE_A[next] }, 0.5, P + 1.5, "power3.out");
      to(ndesk, { o: 1 }, 0.35, P + 1.55, "power1.out");
      infoOut(i, P + 1.4);
      infoIn(i + 1, P + 1.62);
      palette(next, 0.4, P + 1.45);
    }
  });

  /* ── After the exhibition: the four surfaces line up as a receding
        corridor, then flatten into the distance while the statement lands ── */
  const E = ENDING;
  to("mp-monitor:detail", { z: 2.2, x: -0.3, o: 0 }, 0.3, E, "power2.in");
  to("mp-monitor:phone", { z: 2.4, x: 0.6, o: 0 }, 0.3, E, "power2.in");
  infoOut(3, E);
  tl.to(q("[data-exhibit-ui]"), { opacity: 0, duration: 0.25 }, E);
  IDS.forEach((id, i) => {
    const desk = `${id}:desk`;
    const slabX = -0.3 + i * 0.2;
    const slabZ = -0.4 - i * 0.5;
    if (id !== "mp-monitor") set(desk, { x: slabX + 0.3, y: -0.06, z: slabZ - 1.6, rx: 0, ry: 0.5, rz: 0, w: 0.34, o: 0, s: 0, m: 0 }, E + 0.02);
    to(desk, { x: slabX, y: 0, z: slabZ, rx: 0, ry: 0.48, rz: 0, w: 0.34, o: 0.95, s: 0, m: 0 }, 0.5, E + 0.05 + i * 0.06, "power3.out");
    to(desk, { x: slabX + 0.16, ry: 0.02, z: slabZ - 2.2, y: 0.27, w: 0.2, o: 0.22 }, 0.45, E + 0.5, "power2.inOut");
  });
  palette("end", 0.5, E + 0.3);
  tl.fromTo(q("[data-statement-line]"), { clipPath: HIDDEN, yPercent: 30 }, { clipPath: SHOWN, yPercent: 0, stagger: 0.08, duration: 0.3, ease: "power3.out" }, E + 0.6);
  tl.fromTo(q("[data-statement-cap]"), { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.2, ease: "power2.out" }, E + 0.85);

  /* Exhibition progress and total length. */
  tl.fromTo(q("[data-progress-fill]"), { scaleX: 0 }, { scaleX: 1, duration: ENDING - INTRO_END, ease: "none" }, INTRO_END);
  tl.to({}, { duration: DURATION - (E + 1.05) }, E + 1.05);
  return tl;
}
