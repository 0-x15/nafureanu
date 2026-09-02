import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useReducedMotion } from "framer-motion";
import * as THREE from "three";

const INK = "#121212";
const SIGNAL = "#E63946";
const LEAD = "#8A8A87";

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

/**
 * Nafureanu System Core: four procedural stages —
 * INPUT → LOGIC → AUTOMATION → OUTPUT — of instanced nodes,
 * hairline connections, translucent frames and traveling signals.
 */
function buildCore(simplified) {
  const rand = seeded(20260902);
  const counts = simplified ? [5, 7, 7, 4] : [10, 14, 14, 8];
  const stageX = [-7.4, -2.5, 2.5, 7.4];
  const nodes = [];
  counts.forEach((count, s) => {
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: stageX[s] + (rand() - 0.5) * 1.1,
        y: (i - (count - 1) / 2) * (simplified ? 1.5 : 1.08) + (rand() - 0.5) * 0.55,
        z: (rand() - 0.5) * 3.4,
        stage: s,
      });
    }
  });
  const byStage = [[], [], [], []];
  nodes.forEach((n, i) => byStage[n.stage].push(i));
  const conns = [];
  nodes.forEach((n, i) => {
    if (n.stage === 3) return;
    const targets = byStage[n.stage + 1];
    const links = n.stage === 0 ? 2 : 1 + (i % 2);
    const used = new Set();
    for (let k = 0; k < links && used.size < targets.length; k++) {
      const t = targets[Math.floor(rand() * targets.length)];
      if (!used.has(t)) {
        used.add(t);
        conns.push([i, t]);
      }
    }
  });
  return { nodes, conns };
}

function Core({ simplified, scrollRef }) {
  const reduced = useReducedMotion();
  const { nodes, conns } = useMemo(() => buildCore(simplified), [simplified]);
  const nodeMesh = useRef(null);
  const signalMesh = useRef(null);
  const group = useRef(null);
  const { pointer } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const color = useMemo(() => new THREE.Color(), []);

  const frames = useMemo(
    () =>
      [0, 1, 2, 3].map((s) => {
        const stageNodes = nodes.filter((n) => n.stage === s);
        const xs = stageNodes.map((n) => n.x);
        const ys = stageNodes.map((n) => n.y);
        const zs = stageNodes.map((n) => n.z);
        const pad = 0.85;
        return {
          position: [
            (Math.min(...xs) + Math.max(...xs)) / 2,
            (Math.min(...ys) + Math.max(...ys)) / 2,
            (Math.min(...zs) + Math.max(...zs)) / 2,
          ],
          size: [
            Math.max(...xs) - Math.min(...xs) + pad,
            Math.max(...ys) - Math.min(...ys) + pad,
            Math.max(...zs) - Math.min(...zs) + pad,
          ],
        };
      }),
    [nodes]
  );

  const signals = useMemo(
    () =>
      Array.from({ length: simplified ? 6 : 14 }, (_, i) => ({
        conn: (i * 5) % conns.length,
        t: (i * 0.37) % 1,
        speed: 0.35 + ((i * 7) % 10) / 22,
      })),
    [conns.length, simplified]
  );

  const lineGeo = useMemo(() => {
    const pos = new Float32Array(conns.length * 6);
    conns.forEach(([a, b], i) => {
      const na = nodes[a];
      const nb = nodes[b];
      const o = i * 6;
      pos[o] = na.x;
      pos[o + 1] = na.y;
      pos[o + 2] = na.z;
      pos[o + 3] = nb.x;
      pos[o + 4] = nb.y;
      pos[o + 5] = nb.z;
    });
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return geo;
  }, [nodes, conns]);

  useLayoutEffect(() => {
    const mesh = nodeMesh.current;
    if (!mesh) return;
    nodes.forEach((n, i) => {
      dummy.position.set(n.x, n.y, n.z);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
      color.set(i % 9 === 0 ? SIGNAL : i % 3 === 0 ? LEAD : INK);
      mesh.setColorAt(i, color);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [nodes, dummy, color]);

  useLayoutEffect(() => {
    const mesh = signalMesh.current;
    if (!mesh) return;
    signals.forEach((s, i) => {
      const [a, b] = conns[s.conn];
      const na = nodes[a];
      const nb = nodes[b];
      const t = reduced ? 0.5 : s.t;
      dummy.position.set(
        na.x + (nb.x - na.x) * t,
        na.y + (nb.y - na.y) * t,
        na.z + (nb.z - na.z) * t
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  }, [conns, nodes, signals, dummy, reduced]);

  useFrame((_, dt) => {
    if (reduced) return;
    const g = group.current;
    if (g) {
      const sp = scrollRef?.current ?? 0;
      const targetY = 0.5 + pointer.x * 0.12 + sp * 0.3;
      const targetX = -0.16 - pointer.y * 0.05;
      g.rotation.y += (targetY - g.rotation.y) * 0.045;
      g.rotation.x += (targetX - g.rotation.x) * 0.045;
    }
    const mesh = signalMesh.current;
    if (!mesh) return;
    const step = Math.min(dt, 0.05);
    signals.forEach((s, i) => {
      s.t += step * s.speed;
      if (s.t > 1) {
        s.t = 0;
        s.conn = (s.conn + 7) % conns.length;
      }
      const [a, b] = conns[s.conn];
      const na = nodes[a];
      const nb = nodes[b];
      dummy.position.set(
        na.x + (nb.x - na.x) * s.t,
        na.y + (nb.y - na.y) * s.t,
        na.z + (nb.z - na.z) * s.t
      );
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    });
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group ref={group} scale={simplified ? 0.62 : 1} rotation={[0, 0.5, 0]}>
      <instancedMesh ref={nodeMesh} args={[undefined, undefined, nodes.length]}>
        <boxGeometry args={[0.16, 0.16, 0.16]} />
        <meshBasicMaterial />
      </instancedMesh>
      <instancedMesh ref={signalMesh} args={[undefined, undefined, signals.length]}>
        <boxGeometry args={[0.11, 0.11, 0.11]} />
        <meshBasicMaterial color={SIGNAL} />
      </instancedMesh>
      <lineSegments geometry={lineGeo}>
        <lineBasicMaterial color={INK} transparent opacity={0.16} />
      </lineSegments>
      {frames.map((f, i) => (
        <mesh key={i} position={f.position}>
          <boxGeometry args={f.size} />
          <meshBasicMaterial color={INK} wireframe transparent opacity={0.08} />
        </mesh>
      ))}
    </group>
  );
}

export default function CoreScene({ simplified, scrollRef }) {
  const reduced = useReducedMotion();
  return (
    <Canvas
      dpr={[1, simplified ? 1.25 : 1.5]}
      camera={{ position: [0, 0.8, 17.5], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      frameloop={reduced ? "demand" : "always"}
      style={{ touchAction: "pan-y" }}
    >
      <Core simplified={simplified} scrollRef={scrollRef} />
    </Canvas>
  );
}