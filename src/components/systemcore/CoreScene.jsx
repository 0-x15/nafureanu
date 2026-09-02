import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const BG = "#07090E";
const BLUE = "#3D7BFF";
const CYAN = "#5CDBEA";
const VIOLET = "#8E7BFF";
const FRAME = "#2A3550";
const LINK = "#20304E";
const GRAY = "#8A93A6";

/* Six modules in two formations: a tight living core (scroll state 01)
   and the separated system grid (scroll state 03). */
const CORE_POS = [
  [1.7, 1.0, 0.5],
  [2.2, -0.7, -0.9],
  [0.4, 1.9, -1.1],
  [-1.6, 0.9, 0.8],
  [-1.3, -1.5, -0.6],
  [1.2, -2.0, 1.0],
];
const GRID_POS = [
  [0.0, 3.0, 0.3],
  [5.6, 1.5, -1.0],
  [5.2, -2.6, 0.7],
  [0.0, -3.5, -0.9],
  [-5.2, -2.6, 1.0],
  [-5.6, 1.5, -1.2],
];
const LINK_PAIRS = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 0],
  [0, 3],
  [1, 4],
  [2, 5],
  [1, 3],
];
const SIZES = [
  [2.7, 1.9, 2.2],
  [2.1, 2.1, 2.1],
  [2.5, 1.7, 2.4],
  [2.0, 2.0, 1.8],
  [2.6, 1.8, 2.2],
  [2.2, 2.4, 2.0],
];
const CORE_COLORS = [BLUE, CYAN, BLUE, VIOLET, CYAN, BLUE];
const SEG = 18;

/** Deterministic pseudo-random so the core always renders the same layout. */
function seeded(seed) {
  let s = seed;
  return () => {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const smooth = (v) => v * v * (3 - 2 * v);
const range = (v, a, b) => smooth(Math.min(1, Math.max(0, (v - a) / (b - a))));

/** Quadratic bezier point a → b through control c. */
function bez(out, a, c, b, t) {
  const u = 1 - t;
  out.set(
    u * u * a.x + 2 * u * t * c.x + t * t * b.x,
    u * u * a.y + 2 * u * t * c.y + t * t * b.y,
    u * u * a.z + 2 * u * t * c.z + t * t * b.z
  );
  return out;
}

/** Background particle field — depth layer behind the system. */
function Particles({ count }) {
  const ref = useRef(null);
  const { positions, colors } = useMemo(() => {
    const rand = seeded(7712);
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const cBlue = new THREE.Color(BLUE);
    const cCyan = new THREE.Color(CYAN);
    const cGray = new THREE.Color(GRAY);
    const tmp = new THREE.Color();
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (rand() - 0.5) * 52;
      positions[i * 3 + 1] = (rand() - 0.5) * 28;
      positions[i * 3 + 2] = -4 - rand() * 18;
      const r = rand();
      tmp.copy(r > 0.92 ? cCyan : r > 0.82 ? cBlue : cGray);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += Math.min(dt, 0.05) * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.09}
        vertexColors
        transparent
        opacity={0.55}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

/** Orbital ring with small satellite markers — spatial scale reference. */
function Ring({ radius, tilt, opacity, speed, markerAngles }) {
  const spin = useRef(null);
  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.z += Math.min(dt, 0.05) * speed;
  });
  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.006, 6, 160]} />
        <meshBasicMaterial color={FRAME} transparent opacity={opacity} />
      </mesh>
      <group ref={spin}>
        {markerAngles.map((a, i) => (
          <mesh key={i} position={[Math.cos(a) * radius, Math.sin(a) * radius, 0]}>
            <sphereGeometry args={[0.07, 8, 8]} />
            <meshBasicMaterial color={CYAN} transparent opacity={0.75} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/**
 * The living system: six geometric modules, curved data paths between
 * them, and traveling signals. Scroll drives the formation (core cluster
 * → separated grid), connection visibility and signal energy; pointer
 * movement drives the camera and rotation — both clearly perceptible.
 */
function System({ simplified, progressRef, pointerRef, reduced }) {
  const { camera } = useThree();
  const root = useRef(null);
  const moduleRefs = useRef([]);
  const coreRefs = useRef([]);
  const edgeMats = useRef([]);
  const linkGeo = useRef(null);
  const linkMat = useRef(null);
  const signalMesh = useRef(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);
  const tmpFrame = useMemo(() => new THREE.Color(), []);

  const nodes = useMemo(
    () => Array.from({ length: 6 }, () => new THREE.Vector3()),
    []
  );
  const ctrls = useMemo(
    () => Array.from({ length: LINK_PAIRS.length }, () => new THREE.Vector3()),
    []
  );
  const v0 = useMemo(() => new THREE.Vector3(), []);
  const v1 = useMemo(() => new THREE.Vector3(), []);

  const boxGeos = useMemo(() => SIZES.map((s) => new THREE.BoxGeometry(...s)), []);

  const linkPositions = useMemo(
    () => new Float32Array(LINK_PAIRS.length * SEG * 2 * 3),
    []
  );

  const signals = useMemo(() => {
    const rand = seeded(9124);
    const n = simplified ? 10 : 26;
    return Array.from({ length: n }, (_, i) => ({
      link: i % LINK_PAIRS.length,
      t: rand(),
      speed: 0.22 + rand() * 0.3,
    }));
  }, [simplified]);

  /* Instance colors for the signal fleet */
  useLayoutEffect(() => {
    const mesh = signalMesh.current;
    if (!mesh) return;
    const cCyan = new THREE.Color(CYAN);
    const cBlue = new THREE.Color(BLUE);
    const cViolet = new THREE.Color(VIOLET);
    signals.forEach((_, i) => {
      dummy.position.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      tmpFrame.copy(i % 7 === 0 ? cViolet : i % 3 === 0 ? cBlue : cCyan);
      mesh.setColorAt(i, tmpFrame);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [signals, dummy, tmpFrame]);

  /** Write the curved connection lines into the buffer. */
  const writeLinks = () => {
    const geo = linkGeo.current;
    if (!geo) return;
    const arr = geo.attributes.position.array;
    let o = 0;
    LINK_PAIRS.forEach(([a, b], li) => {
      const A = nodes[a];
      const B = nodes[b];
      const c = ctrls[li];
      c.set((A.x + B.x) / 2, (A.y + B.y) / 2, (A.z + B.z) / 2);
      const len = c.length() || 1;
      c.multiplyScalar(1 + 0.9 / len);
      c.y += 0.7;
      for (let s = 0; s < SEG; s++) {
        bez(v0, A, c, B, s / SEG);
        bez(v1, A, c, B, (s + 1) / SEG);
        arr[o++] = v0.x;
        arr[o++] = v0.y;
        arr[o++] = v0.z;
        arr[o++] = v1.x;
        arr[o++] = v1.y;
        arr[o++] = v1.z;
      }
    });
    geo.attributes.position.needsUpdate = true;
  };

  const writeSignals = (tArray) => {
    const mesh = signalMesh.current;
    if (!mesh) return;
    tArray.forEach((s, i) => {
      const [a, b] = LINK_PAIRS[s.link];
      bez(v0, nodes[a], ctrls[s.link], nodes[b], s.t);
      dummy.position.copy(v0);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  };

  useFrame((state, dt) => {
    const step = Math.min(dt, 0.05);
    const time = state.clock.elapsedTime;
    const p = progressRef?.current ?? 0;
    const px = pointerRef?.current?.x ?? 0;
    const py = pointerRef?.current?.y ?? 0;

    /* Camera — dolly in through the middle of the story, back out at the end */
    const dolly = 16.5 - Math.sin(Math.min(p, 1) * Math.PI) * 4.6;
    camera.position.x += (px * 2.4 - camera.position.x) * 0.05;
    camera.position.y += ((0.7 - py * 1.5) - camera.position.y) * 0.05;
    camera.position.z += (dolly - camera.position.z) * 0.06;
    camera.lookAt(0, 0, 0);

    /* Root rotation — pointer + scroll orbit */
    if (root.current) {
      const targetY = 0.4 + px * 0.22 + p * 0.6;
      const targetX = -py * 0.1 - p * 0.06;
      root.current.rotation.y += (targetY - root.current.rotation.y) * 0.05;
      root.current.rotation.x += (targetX - root.current.rotation.x) * 0.05;
    }

    /* Formation: tight core → separated grid */
    const f = range(p, 0.16, 0.52);
    for (let i = 0; i < 6; i++) {
      const c = CORE_POS[i];
      const g = GRID_POS[i];
      nodes[i].set(
        c[0] + (g[0] - c[0]) * f,
        c[1] + (g[1] - c[1]) * f,
        c[2] + (g[2] - c[2]) * f
      );
      const grp = moduleRefs.current[i];
      if (!grp) continue;
      grp.position.copy(nodes[i]);
      const active = Math.floor(time * 0.8) % 6 === i;
      const pulse = 1 + Math.sin(time * 2.2 + i * 1.1) * 0.12;
      grp.scale.setScalar(pulse * (active ? 1.14 : 1));
      const core = coreRefs.current[i];
      if (core) {
        core.rotation.y += step * 0.6;
        core.rotation.x += step * 0.3;
        core.scale.setScalar(active ? 1.3 + Math.sin(time * 4) * 0.15 : 1);
      }
      const mat = edgeMats.current[i];
      if (mat) {
        mat.color.lerp(tmpColor.set(active ? BLUE : FRAME), 0.08);
        mat.opacity += ((active ? 0.95 : 0.6) - mat.opacity) * 0.08;
      }
    }

    writeLinks();

    /* Connection visibility grows as the system separates */
    if (linkMat.current) {
      linkMat.current.opacity = 0.15 + range(p, 0.3, 0.62) * 0.5;
    }

    /* Signals accelerate as the story progresses */
    const speedMult = 0.7 + p * 1.7;
    signals.forEach((s) => {
      s.t += step * s.speed * speedMult;
      if (s.t > 1) {
        s.t = 0;
        s.link = (s.link + 3) % LINK_PAIRS.length;
      }
    });
    writeSignals(signals);
  });

  /* Reduced motion: render the separated system as a still frame. */
  useLayoutEffect(() => {
    if (!reduced) return;
    for (let i = 0; i < 6; i++) {
      nodes[i].set(...GRID_POS[i]);
      const grp = moduleRefs.current[i];
      if (grp) grp.position.copy(nodes[i]);
    }
    writeLinks();
    if (linkMat.current) linkMat.current.opacity = 0.55;
    writeSignals(signals.map((s) => ({ ...s, t: 0.5 })));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduced]);

  return (
    <group ref={root} scale={simplified ? 0.72 : 1}>
      <Ring
        radius={9.8}
        tilt={[Math.PI / 2.25, 0, 0.4]}
        opacity={0.5}
        speed={0.05}
        markerAngles={[0.4, 3.6]}
      />
      <Ring
        radius={12.6}
        tilt={[Math.PI / 2.05, 0.2, -0.3]}
        opacity={0.3}
        speed={-0.035}
        markerAngles={[1.8]}
      />
      <Ring
        radius={15.8}
        tilt={[Math.PI / 1.85, -0.15, 0.2]}
        opacity={0.16}
        speed={0.02}
        markerAngles={[5.1]}
      />

      {/* Modules: geometric frames + glowing cores */}
      {GRID_POS.map((_, i) => (
        <group key={i} ref={(el) => (moduleRefs.current[i] = el)}>
          <lineSegments>
            <edgesGeometry args={[boxGeos[i]]} />
            <lineBasicMaterial
              ref={(el) => (edgeMats.current[i] = el)}
              color={FRAME}
              transparent
              opacity={0.6}
            />
          </lineSegments>
          <mesh ref={(el) => (coreRefs.current[i] = el)}>
            <icosahedronGeometry args={[0.34, 0]} />
            <meshBasicMaterial color={CORE_COLORS[i]} transparent opacity={0.95} />
          </mesh>
          <mesh>
            <icosahedronGeometry args={[0.62, 1]} />
            <meshBasicMaterial color={CORE_COLORS[i]} wireframe transparent opacity={0.3} />
          </mesh>
        </group>
      ))}

      {/* Data paths between modules */}
      <lineSegments>
        <bufferGeometry ref={linkGeo}>
          <bufferAttribute attach="attributes-position" args={[linkPositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial ref={linkMat} color={LINK} transparent opacity={0.2} />
      </lineSegments>

      {/* Traveling signals */}
      <instancedMesh ref={signalMesh} args={[undefined, undefined, signals.length]}>
        <octahedronGeometry args={[0.1, 0]} />
        <meshBasicMaterial />
      </instancedMesh>
    </group>
  );
}

export default function CoreScene({ simplified, progressRef, pointerRef, reduced }) {
  return (
    <Canvas
      dpr={[1, simplified ? 1.25 : 1.6]}
      camera={{ position: [0, 0.7, 16.5], fov: 42 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      style={{ touchAction: "pan-y" }}
    >
      <fog attach="fog" args={[BG, 13, 42]} />
      <Particles count={simplified ? 260 : 620} />
      <System simplified={simplified} progressRef={progressRef} pointerRef={pointerRef} reduced={reduced} />
    </Canvas>
  );
}