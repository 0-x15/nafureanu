/* eslint-disable react/no-unknown-property -- three.js element props (geometry, material) */
import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { PLANES, asset } from "./data";
import { makeShadowMaterial, makeSurfaceMaterial } from "./materials";

const GEO = new THREE.PlaneGeometry(1, 1, 32, 32);
const DEG = Math.PI / 180;

function textureUrls() {
  const set = new Set();
  PLANES.forEach((p) => {
    set.add(asset(p.id, p.texA));
    if (p.texB) set.add(asset(p.id, p.texB));
  });
  return [...set];
}

/** One real capture as a suspended surface with a soft shadow under it. */
function Surface({ def, S, textures, stage, tilt, readyRef, onHover, onOpen }) {
  const mesh = useRef(null);
  const shadow = useRef(null);
  const mat = useMemo(
    () =>
      makeSurfaceMaterial({
        texA: textures[asset(def.id, def.texA)],
        texB: def.texB ? textures[asset(def.id, def.texB)] : null,
        winA: def.winA,
        winB: def.winB,
        seed: def.seed,
        dark: def.id === "mp-monitor" ? 1 : 0,
      }),
    [def, textures]
  );
  const smat = useMemo(() => makeShadowMaterial(), []);
  useEffect(() => () => { mat.dispose(); smat.dispose(); }, [mat, smat]);

  useFrame(({ camera, size }) => {
    const m = mesh.current;
    const sh = shadow.current;
    if (!m || !sh) return;
    const s = S[def.key];
    const visible = s.o > 0.003;
    m.visible = visible;
    sh.visible = visible;
    if (!visible) return;
    const cam = /** @type {THREE.PerspectiveCamera} */ (camera);
    const vh = 2 * Math.tan((cam.fov / 2) * DEG) * cam.position.z;
    const vw = vh * (size.width / size.height);
    const w = s.w * vw;
    const h = w / def.aspect;
    const depth = 1 + (s.z + 1.2) * 0.35;
    const px = tilt.x * 0.05 * depth;
    const py = tilt.y * 0.03 * depth;
    const opacity = s.o * readyRef.current;

    m.position.set(s.x * vw + px, s.y * vh + py, s.z);
    m.rotation.set(s.rx, s.ry, s.rz);
    m.scale.set(w, h, 1);
    const u = mat.uniforms;
    u.uOpacity.value = opacity;
    u.uScroll.value = s.s;
    u.uMix.value = s.m;
    u.uSize.value.set(w, h);
    u.uRadius.value = def.radius * w;
    u.uBend.value = stage.bend * (def.kind === "phone" ? 0.4 : 1);

    sh.position.set(s.x * vw + px + 0.02 * w, s.y * vh + py - 0.06 * h, s.z - 0.03);
    sh.rotation.set(s.rx, s.ry, s.rz);
    sh.scale.set(w * 1.4, h * 1.4, 1);
    const su = smat.uniforms;
    su.uSize.value.set(w * 1.4, h * 1.4);
    su.uInner.value.set(w / 2, h / 2);
    su.uRadius.value = def.radius * w;
    su.uOpacity.value = opacity * 0.32;
  });

  const canInteract = def.kind !== "detail";
  return (
    <>
      <mesh ref={shadow} geometry={GEO} material={smat} />
      <mesh
        ref={mesh}
        geometry={GEO}
        material={mat}
        onPointerOver={canInteract ? (e) => { if (S[def.key].o > 0.6) { e.stopPropagation(); onHover(def); } } : undefined}
        onPointerOut={canInteract ? () => onHover(null) : undefined}
        onClick={canInteract ? (e) => { if (S[def.key].o > 0.6) { e.stopPropagation(); onOpen(def); } } : undefined}
      />
    </>
  );
}

function Rig({ S, stage, onHover, onOpen, onReady }) {
  const gl = useThree((st) => st.gl);
  const urls = useMemo(textureUrls, []);
  const list = useLoader(THREE.TextureLoader, urls);
  const textures = useMemo(() => {
    const aniso = Math.min(8, gl.capabilities.getMaxAnisotropy());
    const map = {};
    list.forEach((t, i) => {
      t.colorSpace = THREE.NoColorSpace;
      t.minFilter = THREE.LinearMipmapLinearFilter;
      t.magFilter = THREE.LinearFilter;
      t.generateMipmaps = true;
      t.anisotropy = aniso;
      t.needsUpdate = true;
      map[urls[i]] = t;
    });
    return map;
  }, [list, urls, gl]);
  useEffect(() => {
    onReady?.();
    return () => {
      list.forEach((t) => t.dispose());
      useLoader.clear(THREE.TextureLoader, urls);
    };
  }, [list, urls, onReady]);

  const group = useRef(null);
  const tilt = useRef({ x: 0, y: 0 }).current;
  const readyRef = useRef(0);
  useFrame((st, dt) => {
    const d = Math.min(dt, 0.05);
    const k = 1 - Math.exp(-d * 4);
    tilt.x += (st.pointer.x - tilt.x) * k;
    tilt.y += (st.pointer.y - tilt.y) * k;
    if (group.current) {
      group.current.rotation.y = tilt.x * 0.045;
      group.current.rotation.x = -tilt.y * 0.03;
    }
    const target = THREE.MathUtils.clamp(stage.velocity / 6000, -1, 1) * 0.06;
    stage.bend += (target - stage.bend) * (1 - Math.exp(-d * 6));
    readyRef.current = Math.min(1, readyRef.current + d * 1.4);
  });

  return (
    <group ref={group}>
      {PLANES.map((def) => (
        <Surface key={def.key} def={def} S={S} textures={textures} stage={stage} tilt={tilt} readyRef={readyRef} onHover={onHover} onOpen={onOpen} />
      ))}
    </group>
  );
}

/**
 * The exhibition's WebGL layer: real screenshots on planes at
 * different depths, driven by the scroll timeline through `S`, with a
 * subconscious pointer tilt. Pixel ratio is capped at 1.5 and the loop
 * stops when the stage is off screen.
 */
export default function Scene({ S, stage, active = true, onHover, onOpen, onReady = undefined }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", stencil: false }}
      camera={{ fov: 32, near: 0.1, far: 40, position: [0, 0, 6] }}
      resize={{ scroll: false, debounce: { scroll: 50, resize: 80 } }}
      style={{ position: "absolute", inset: 0 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Suspense fallback={null}>
        <Rig S={S} stage={stage} onHover={onHover} onOpen={onOpen} onReady={onReady} />
      </Suspense>
    </Canvas>
  );
}
