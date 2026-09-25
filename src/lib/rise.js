/**
 * Inline variables of the `.rise` entrance (index.css): the heroes rise
 * into place with a CSS animation, so the first paint never waits for
 * JavaScript. `y` is the distance (px, or any CSS length as a string),
 * `t` the duration and `d` the delay, both in seconds.
 */
export const rise = (y, t = 0.7, d = 0) =>
  /** @type {any} */ ({ "--rise-y": typeof y === "number" ? `${y}px` : y, "--rise-t": `${t}s`, "--rise-d": `${d}s` });
