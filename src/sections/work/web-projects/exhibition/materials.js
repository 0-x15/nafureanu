import * as THREE from "three";

/**
 * Surface shader: a real screenshot on a rounded plane. Supports a
 * vertical window over tall captures (uScroll travels through the
 * page), a restrained displacement crossfade to a second texture
 * (uMix), a hairline edge and a slight bend driven by scroll velocity.
 */
const SURFACE_VERT = /* glsl */ `
uniform float uBend;
varying vec2 vUv;
void main() {
  vUv = uv;
  vec3 p = position;
  p.z += sin(uv.y * 3.14159265) * uBend;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
}`;

const SURFACE_FRAG = /* glsl */ `
precision highp float;
uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform float uWinA;
uniform float uWinB;
uniform float uScroll;
uniform float uMix;
uniform float uOpacity;
uniform vec2 uSize;
uniform float uRadius;
uniform float uSeed;
uniform float uDark;
varying vec2 vUv;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x), mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x), f.y);
}
vec2 window(vec2 uv, float w, float s) {
  float top = 1.0 - s * (1.0 - w);
  return vec2(uv.x, top - w + uv.y * w);
}
void main() {
  vec2 hs = uSize * 0.5;
  vec2 q = abs((vUv - 0.5) * uSize) - (hs - uRadius);
  float d = length(max(q, 0.0)) - uRadius;
  float aa = fwidth(d) * 1.2;
  float shape = 1.0 - smoothstep(-aa, aa, d);
  if (shape <= 0.002) discard;

  float n = noise(vUv * 3.0 + uSeed) * 0.6 + vUv.x * 0.4;
  float p = smoothstep(n - 0.25, n + 0.25, uMix * 1.5 - 0.25);
  vec2 dir = vec2(0.035, 0.0);
  vec4 a = texture2D(uTexA, window(vUv, uWinA, uScroll) + dir * p);
  vec4 b = texture2D(uTexB, window(vUv, uWinB, 0.0) - dir * (1.0 - p));
  vec3 col = mix(a.rgb, b.rgb, p);

  float edge = 1.0 - smoothstep(0.0, aa * 2.6, -d);
  vec3 edgeCol = mix(vec3(0.86, 0.85, 0.83), vec3(0.28, 0.31, 0.38), uDark);
  col = mix(col, edgeCol, edge * 0.45);
  gl_FragColor = vec4(col, shape * uOpacity);
}`;

const SHADOW_VERT = /* glsl */ `
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;

const SHADOW_FRAG = /* glsl */ `
precision highp float;
uniform vec2 uSize;
uniform vec2 uInner;
uniform float uRadius;
uniform float uOpacity;
varying vec2 vUv;
void main() {
  vec2 q = abs((vUv - 0.5) * uSize) - (uInner - uRadius);
  float d = length(max(q, 0.0)) - uRadius;
  float a = 1.0 - smoothstep(-0.04, 0.42, d);
  gl_FragColor = vec4(0.05, 0.06, 0.10, a * a * uOpacity);
}`;

export function makeSurfaceMaterial({ texA, texB, winA = 1, winB = 1, seed = 0, dark = 0 }) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uTexA: { value: texA },
      uTexB: { value: texB || texA },
      uWinA: { value: winA },
      uWinB: { value: winB },
      uScroll: { value: 0 },
      uMix: { value: 0 },
      uOpacity: { value: 0 },
      uSize: { value: new THREE.Vector2(1, 1) },
      uRadius: { value: 0.02 },
      uSeed: { value: seed },
      uBend: { value: 0 },
      uDark: { value: dark },
    },
    vertexShader: SURFACE_VERT,
    fragmentShader: SURFACE_FRAG,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
}

export function makeShadowMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uSize: { value: new THREE.Vector2(1, 1) },
      uInner: { value: new THREE.Vector2(0.5, 0.5) },
      uRadius: { value: 0.02 },
      uOpacity: { value: 0 },
    },
    vertexShader: SHADOW_VERT,
    fragmentShader: SHADOW_FRAG,
    transparent: true,
    depthWrite: false,
  });
}
