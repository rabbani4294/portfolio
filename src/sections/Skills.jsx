import {
  BarChart3,
  BrainCircuit,
  Code2,
  Database,
  FileSpreadsheet,
  Globe,
  Layers3,
  Monitor,
  Palette,
  PieChart,
  Server,
  Wrench,
} from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { skillCategories, tools } from "../data/skills";

const icons = { BarChart3, BrainCircuit, Code2, Database, FileSpreadsheet, Globe, Layers3, Monitor, Palette, PieChart, Server, Wrench };
const levelSegments = { Advanced: 4, Intermediate: 3, Beginner: 2 };

function LevelMeter({ level }) {
  const filled = levelSegments[level] ?? 3;
  return (
    <span className="flex items-center gap-1" role="img" aria-label={`${level} level`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span
          key={i}
          className={`h-1.5 w-4 rounded-full ${i < filled ? "bg-gradient-to-r from-electric to-cyan" : "bg-white/10"}`}
        />
      ))}
    </span>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          title="Technologies I work with"
          lead="A growing technical toolkit focused on data analytics, machine learning, databases, and full stack development."
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {skillCategories.map((category) => {
            const Icon = icons[category.icon] ?? Code2;
            return (
              <div key={category.title} data-reveal>
                <TiltCard className="h-full rounded-3xl" max={8}>
                  <div className="glass glass-hover h-full rounded-3xl p-7" style={{ transformStyle: "preserve-3d" }}>
                    <div className="flex items-start gap-4">
                      <div
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan/25 bg-electric/15 text-cyan shadow-glow-cyan"
                        style={{ transform: "translateZ(40px)" }}
                      >
                        <Icon size={24} aria-hidden="true" />
                      </div>
                      <div>
                        <h3 className="font-display text-base font-semibold text-ice">{category.title}</h3>
                        <p className="mt-1 text-sm leading-6 text-slate-400">{category.description}</p>
                      </div>
                    </div>

                    <ul className="mt-7 space-y-3.5">
                      {category.skills.map((skill) => (
                        <li key={skill.name} className="flex items-center justify-between gap-4">
                          <span className="text-sm font-medium text-slate-200">{skill.name}</span>
                          <LevelMeter level={skill.level} />
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>

        {/* Floating tools */}
        <div className="mt-20">
          <h3 data-reveal className="mb-8 font-display text-lg font-semibold text-ice">
            Tools &amp; platforms
          </h3>
          <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {tools.map((tool, i) => {
              const Icon = icons[tool.icon] ?? Code2;
              const float = ["float-slow", "float-mid", "float-fast"][i % 3];
              return (
                <li key={tool.name} data-reveal>
                  <div className={float} style={{ animationDelay: `${-(i % 5) * 0.9}s` }}>
                    <div className="glass glass-hover group flex flex-col items-center gap-3 rounded-2xl px-4 py-6 text-center transition-transform duration-300 hover:-translate-y-1">
                      <Icon size={28} className="text-slate-400 transition-colors duration-300 group-hover:text-cyan" aria-hidden="true" />
                      <span className="text-sm font-semibold text-slate-200">{tool.name}</span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
