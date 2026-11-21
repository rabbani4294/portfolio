import { useId } from "react";

/* Per-category generated artwork. Your files contain no project screenshots, so
   each card gets an abstract visual that reflects the kind of work (network,
   layers, detection boxes, charts, tables, database, app window), varied by a
   seed derived from the title. Swap in real screenshots later via project.image. */

function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
function rng(seed) {
  let s = seed || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const B = "#2563EB";
const C = "#22D3EE";

function Network({ r }) {
  const pick = () => 3 + Math.floor(r() * 4); // 3-6 nodes per layer
  const layers = [pick(), pick(), pick(), 2 + Math.floor(r() * 3)];
  const xs = [70, 150, 250, 330];
  const nodes = layers.map((n, li) =>
    Array.from({ length: n }, (_, i) => ({ x: xs[li], y: 110 + (i - (n - 1) / 2) * 34 + (r() - 0.5) * 10, on: r() > 0.45 })),
  );
  const lines = [];
  for (let l = 0; l < nodes.length - 1; l++)
    nodes[l].forEach((a, ai) =>
      nodes[l + 1].forEach((b, bi) => {
        if (r() > 0.35) lines.push(<line key={`${l}-${ai}-${bi}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={B} strokeOpacity={a.on && b.on ? 0.85 : 0.28} />);
      }),
    );
  return (
    <g>
      {lines}
      {nodes.flat().map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.on ? 6 : 4.5} fill={n.on ? C : "#0A1020"} stroke={n.on ? C : B} strokeOpacity={n.on ? 1 : 0.7} />
      ))}
    </g>
  );
}

function Layers({ r }) {
  return (
    <g>
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 150 - i * 24;
        const w = 120 - i * 8 + r() * 8;
        return (
          <g key={i} opacity={0.35 + i * 0.16}>
            <polygon points={`${200 - w},${y} ${200},${y - 28} ${200 + w},${y} ${200},${y + 28}`} fill={i === 4 ? C : B} fillOpacity={0.12 + i * 0.05} stroke={i === 4 ? C : B} />
          </g>
        );
      })}
      <line x1="200" y1="46" x2="200" y2="178" stroke={C} strokeDasharray="3 5" strokeOpacity="0.6" />
    </g>
  );
}

function Detection({ r }) {
  const boxes = [0, 1, 2].map(() => ({ x: 60 + r() * 190, y: 40 + r() * 80, w: 60 + r() * 50, h: 50 + r() * 40 }));
  const tags = ["mask", "cap", "gloves"];
  return (
    <g>
      <rect x="30" y="26" width="340" height="168" rx="10" fill="none" stroke={B} strokeOpacity="0.4" strokeDasharray="2 6" />
      {boxes.map((b, i) => (
        <g key={i}>
          <rect x={b.x} y={b.y} width={b.w} height={b.h} fill={C} fillOpacity="0.07" stroke={C} strokeWidth="1.5" />
          <rect x={b.x} y={b.y - 14} width="42" height="14" fill={C} />
          <text x={b.x + 4} y={b.y - 4} fontSize="9" fontWeight="700" fill="#05070D">{tags[i]}</text>
        </g>
      ))}
    </g>
  );
}

function LineChart({ r }) {
  const pts = Array.from({ length: 9 }, (_, i) => [50 + i * 37, 150 - (20 + i * 9 + r() * 38)]);
  const d = pts.map((p, i) => `${i ? "L" : "M"}${p[0]},${p[1]}`).join(" ");
  return (
    <g>
      {[60, 100, 140, 180].map((y) => <line key={y} x1="40" x2="360" y1={y} y2={y} stroke="#94A3B8" strokeOpacity="0.14" />)}
      <path d={`${d} L${pts[8][0]},190 L${pts[0][0]},190 Z`} fill={B} fillOpacity="0.16" />
      <path d={d} fill="none" stroke={C} strokeWidth="2.5" strokeLinejoin="round" />
      {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="3.5" fill="#05070D" stroke={C} strokeWidth="2" />)}
    </g>
  );
}

function Table({ r }) {
  const rows = 5, cols = 6;
  return (
    <g>
      {Array.from({ length: rows }).map((_, y) =>
        Array.from({ length: cols }).map((_, x) => {
          const hot = y > 0 && r() > 0.72;
          return (
            <rect key={`${x}-${y}`} x={50 + x * 53} y={42 + y * 30} width="49" height="26" rx="3" fill={y === 0 ? B : hot ? C : "#94A3B8"} fillOpacity={y === 0 ? 0.55 : hot ? 0.4 : 0.1} stroke={B} strokeOpacity="0.25" />
          );
        }),
      )}
    </g>
  );
}

function Dashboard({ r }) {
  const bars = Array.from({ length: 6 }, () => 28 + r() * 80);
  return (
    <g>
      {bars.map((h, i) => <rect key={i} x={48 + i * 32} y={176 - h} width="22" height={h} rx="4" fill={i % 2 ? B : C} fillOpacity="0.8" />)}
      <circle cx="292" cy="96" r="44" fill="none" stroke={B} strokeOpacity="0.35" strokeWidth="14" />
      <circle cx="292" cy="96" r="44" fill="none" stroke={C} strokeWidth="14" strokeDasharray={`${130 + r() * 90} 400`} transform="rotate(-90 292 96)" strokeLinecap="round" />
      <rect x="250" y="156" width="90" height="8" rx="4" fill="#94A3B8" fillOpacity="0.25" />
      <rect x="250" y="172" width="60" height="8" rx="4" fill="#94A3B8" fillOpacity="0.15" />
    </g>
  );
}

function Database({ r }) {
  const cyl = (cx, cy, key, on) => (
    <g key={key}>
      <path d={`M${cx - 36},${cy - 22} v44 a36,12 0 0 0 72,0 v-44`} fill={B} fillOpacity={on ? 0.28 : 0.12} stroke={on ? C : B} />
      <ellipse cx={cx} cy={cy - 22} rx="36" ry="12" fill={on ? C : B} fillOpacity={on ? 0.55 : 0.3} stroke={on ? C : B} />
      <path d={`M${cx - 36},${cy} a36,12 0 0 0 72,0`} fill="none" stroke={B} strokeOpacity="0.6" />
    </g>
  );
  return (
    <g>
      <line x1="120" y1="104" x2="280" y2="104" stroke={C} strokeDasharray="4 5" strokeOpacity="0.7" />
      {cyl(90, 104, "a", false)}
      {cyl(200, 82 + r() * 10, "b", true)}
      {cyl(310, 104, "c", false)}
    </g>
  );
}

function AppWindow({ r }) {
  return (
    <g>
      <rect x="44" y="30" width="312" height="150" rx="12" fill="#0A1020" stroke={B} strokeOpacity="0.6" />
      <circle cx="62" cy="46" r="3.5" fill={C} /><circle cx="76" cy="46" r="3.5" fill={B} /><circle cx="90" cy="46" r="3.5" fill="#94A3B8" fillOpacity="0.5" />
      <line x1="44" y1="62" x2="356" y2="62" stroke={B} strokeOpacity="0.35" />
      <rect x="56" y="74" width="62" height="94" rx="6" fill={B} fillOpacity="0.16" />
      {[0, 1, 2].map((i) => <rect key={i} x={132 + i * 74} y="74" width="64" height={40 + r() * 20} rx="6" fill={i === 1 ? C : B} fillOpacity={i === 1 ? 0.4 : 0.22} />)}
      <rect x="132" y="130" width="206" height="10" rx="5" fill="#94A3B8" fillOpacity="0.22" />
      <rect x="132" y="148" width="140" height="10" rx="5" fill="#94A3B8" fillOpacity="0.14" />
    </g>
  );
}

const byCategory = {
  "Machine Learning": Network,
  "Deep Learning": Layers,
  "Computer Vision": Detection,
  "Data Analytics": LineChart,
  Excel: Table,
  "Power BI": Dashboard,
  MySQL: Database,
  "Full Stack": AppWindow,
};

export default function ProjectArt({ project, className = "" }) {
  const id = useId();
  const Motif = byCategory[project.category] ?? Network;
  const r = rng(hash(project.title));
  const gx = 20 + r() * 60;

  return (
    <svg viewBox="0 0 400 220" className={className} role="img" aria-label={`${project.category} illustration for ${project.title}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id={`${id}-bg`} cx={`${gx}%`} cy="30%" r="90%">
          <stop offset="0%" stopColor={B} stopOpacity="0.38" />
          <stop offset="60%" stopColor="#0A1020" stopOpacity="1" />
          <stop offset="100%" stopColor="#05070D" stopOpacity="1" />
        </radialGradient>
        <pattern id={`${id}-grid`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke="#94A3B8" strokeOpacity="0.08" />
        </pattern>
      </defs>
      <rect width="400" height="220" fill={`url(#${id}-bg)`} />
      <rect width="400" height="220" fill={`url(#${id}-grid)`} />
      <g transform="translate(46 30) scale(0.78)">
        <Motif r={r} />
      </g>
    </svg>
  );
}
