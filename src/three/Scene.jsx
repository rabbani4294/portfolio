import { Component, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { scrollState } from "../lib/scrollState";

const BLUE = "#3B82F6";
const CYAN = "#22D3EE";
const DEPTH = 56; // how far the camera travels along -Z over the full scroll

/* Deterministic pseudo-random so the scene is identical on every load */
function rng(seed) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

/* ---------- Atmospheric particles spread along the camera path ---------- */
function Particles({ count, degraded }) {
  const ref = useRef();
  const geometry = useMemo(() => {
    const r = rng(7);
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (r() - 0.5) * 30;
      pos[i * 3 + 1] = (r() - 0.5) * 20;
      pos[i * 3 + 2] = 6 - r() * (DEPTH + 18);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [count]);

  useEffect(() => {
    geometry.setDrawRange(0, degraded ? Math.floor(count * 0.5) : count);
  }, [degraded, count, geometry]);

  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.z += delta * 0.01;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color={CYAN}
        size={0.055}
        sizeAttenuation
        transparent
        opacity={0.75}
        depthWrite={false}
      />
    </points>
  );
}

/* ---------- Neural lattice: nodes + connecting lines (meaningful for ML) ---------- */
function NeuralLattice({ position, scale = 1, seed = 3, nodes = 34 }) {
  const group = useRef();
  const { pts, lines } = useMemo(() => {
    const r = rng(seed);
    const p = [];
    for (let i = 0; i < nodes; i++) {
      const u = r() * Math.PI * 2;
      const v = Math.acos(2 * r() - 1);
      const rad = 1.2 + r() * 1.6;
      p.push(
        new THREE.Vector3(
          rad * Math.sin(v) * Math.cos(u),
          rad * Math.sin(v) * Math.sin(u),
          rad * Math.cos(v),
        ),
      );
    }
    const seg = [];
    for (let i = 0; i < p.length; i++)
      for (let j = i + 1; j < p.length; j++)
        if (p[i].distanceTo(p[j]) < 1.9) seg.push(p[i].x, p[i].y, p[i].z, p[j].x, p[j].y, p[j].z);
    const lg = new THREE.BufferGeometry();
    lg.setAttribute("position", new THREE.Float32BufferAttribute(seg, 3));
    const pg = new THREE.BufferGeometry().setFromPoints(p);
    return { pts: pg, lines: lg };
  }, [seed, nodes]);

  useFrame((_, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.12;
    group.current.rotation.x += delta * 0.04;
  });

  return (
    <group ref={group} position={position} scale={scale}>
      <lineSegments geometry={lines}>
        <lineBasicMaterial color={BLUE} transparent opacity={0.45} />
      </lineSegments>
      <points geometry={pts}>
        <pointsMaterial color={CYAN} size={0.12} sizeAttenuation transparent opacity={0.95} depthWrite={false} />
      </points>
    </group>
  );
}

/* ---------- Floating geometric forms: dark lit core + glowing wire shell ---------- */
const SHAPES = [
  { kind: "ico", z: -7, x: 1, y: 1.6, color: BLUE },
  { kind: "knot", z: -15, x: 1, y: -1.2, color: CYAN },
  { kind: "octa", z: -30, x: -1, y: 1.4, color: BLUE },
  { kind: "torus", z: -38, x: 1, y: -1.1, color: CYAN },
  { kind: "dodeca", z: -46, x: -1, y: 1.2, color: BLUE },
  { kind: "ico", z: -56, x: 1, y: -1, color: CYAN },
];

function makeGeometry(kind) {
  switch (kind) {
    case "octa":
      return new THREE.OctahedronGeometry(1, 0);
    case "dodeca":
      return new THREE.DodecahedronGeometry(1, 0);
    case "torus":
      return new THREE.TorusGeometry(1, 0.28, 10, 30);
    case "knot":
      return new THREE.TorusKnotGeometry(0.8, 0.22, 64, 8);
    default:
      return new THREE.IcosahedronGeometry(1, 1);
  }
}

function Shape({ kind, color, position, size, speed }) {
  const ref = useRef();
  const geometry = useMemo(() => makeGeometry(kind), [kind]);
  const base = position[1];
  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;
    g.rotation.x += delta * 0.18 * speed;
    g.rotation.y += delta * 0.24 * speed;
    g.position.y = base + Math.sin(state.clock.elapsedTime * 0.5 * speed + position[2]) * 0.35;
  });
  return (
    <group ref={ref} position={position} scale={size}>
      <mesh geometry={geometry} scale={0.985}>
        <meshStandardMaterial color="#0B1226" metalness={0.7} roughness={0.35} flatShading />
      </mesh>
      <mesh geometry={geometry}>
        <meshBasicMaterial color={color} wireframe transparent opacity={0.9} />
      </mesh>
    </group>
  );
}

function Shapes({ narrow, degraded }) {
  const list = degraded ? SHAPES.slice(0, 4) : SHAPES;
  return list.map((s, i) => (
    <Shape
      key={i}
      kind={s.kind}
      color={s.color}
      position={[s.x * (narrow ? 2.7 : 6.4), s.y * (narrow ? 1.1 : 1.5), s.z]}
      size={narrow ? 0.9 : 1.35}
      speed={0.8 + (i % 3) * 0.25}
    />
  ));
}

/* ---------- Camera + light choreography driven by scroll ---------- */
function Rig({ narrow }) {
  const key = useRef();
  const rim = useRef();
  const look = useRef(new THREE.Vector3());
  const colA = useMemo(() => new THREE.Color(BLUE), []);
  const colB = useMemo(() => new THREE.Color(CYAN), []);

  useFrame((state, delta) => {
    const { progress, pointer } = scrollState;
    const cam = state.camera;
    const targetZ = 8 - progress * DEPTH;
    const sway = Math.sin(progress * Math.PI * 4) * (narrow ? 0.5 : 1.3);

    cam.position.z = THREE.MathUtils.damp(cam.position.z, targetZ, 3.2, delta);
    cam.position.x = THREE.MathUtils.damp(cam.position.x, sway + pointer.x * 0.7, 2.4, delta);
    cam.position.y = THREE.MathUtils.damp(cam.position.y, -progress * 1.6 + pointer.y * 0.45, 2.4, delta);
    look.current.set(cam.position.x * 0.35, cam.position.y * 0.4, cam.position.z - 10);
    cam.lookAt(look.current);

    if (key.current) {
      key.current.position.set(cam.position.x + 3, cam.position.y + 3, cam.position.z - 2);
      key.current.color.lerpColors(colA, colB, Math.min(1, progress * 1.4));
    }
    if (rim.current) {
      rim.current.position.set(cam.position.x - 4, cam.position.y - 2, cam.position.z - 8);
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <pointLight ref={key} intensity={60} distance={22} color={BLUE} />
      <pointLight ref={rim} intensity={40} distance={20} color={CYAN} />
    </>
  );
}

/* ---------- Render pacing: cap lower-tier devices at 30 fps, pause when hidden ---------- */
function Pacer({ fps }) {
  const invalidate = useThree((s) => s.invalidate);
  useEffect(() => {
    let raf;
    let last = 0;
    const interval = 1000 / fps;
    const loop = (now) => {
      raf = requestAnimationFrame(loop);
      if (document.hidden || now - last < interval - 2) return;
      last = now;
      invalidate();
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [fps, invalidate]);
  return null;
}

/* ---------- Adaptive quality: if frames run slow, shed load automatically ---------- */
function FrameGovernor({ onDecline }) {
  const acc = useRef({ t: 0, n: 0, slow: 0, warm: 0 });
  useFrame((_, delta) => {
    const a = acc.current;
    a.warm += delta;
    if (a.warm < 3) return; // ignore shader compile / startup
    a.t += delta;
    a.n += 1;
    if (a.t >= 2) {
      const fps = a.n / a.t;
      a.slow = fps < 40 ? a.slow + 1 : 0;
      a.t = 0;
      a.n = 0;
      if (a.slow >= 2) {
        a.slow = 0;
        onDecline();
      }
    }
  });
  return null;
}

class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(err) {
    console.warn("3D scene disabled:", err?.message || err);
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

export default function Scene({ tier, narrow }) {
  const high = tier === "high";
  const [degraded, setDegraded] = useState(false);
  const [dpr, setDpr] = useState(high ? 1.5 : 1);

  return (
    <SceneBoundary>
      <div className="scene-canvas" aria-hidden="true">
        <Canvas
          frameloop="demand"
          dpr={dpr}
          camera={{ fov: narrow ? 66 : 50, position: [0, 0, 8], near: 0.1, far: 70 }}
          gl={{ antialias: false, alpha: true, powerPreference: high ? "high-performance" : "low-power" }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <Pacer fps={high && !degraded ? 60 : 30} />
          <FrameGovernor
            onDecline={() => {
              setDegraded(true);
              setDpr(1);
            }}
          />
          <fog attach="fog" args={["#05070D", 10, 46]} />
          <Rig narrow={narrow} />
          <Particles count={high ? 900 : 380} degraded={degraded} />
          <NeuralLattice position={[narrow ? 1.2 : 3.4, 0.2, -22]} scale={narrow ? 0.8 : 1.15} />
          {!degraded && high && (
            <NeuralLattice position={[narrow ? -1 : -3.6, -0.8, -50]} scale={1} seed={11} nodes={30} />
          )}
          <Shapes narrow={narrow} degraded={degraded || !high} />
        </Canvas>
      </div>
    </SceneBoundary>
  );
}
