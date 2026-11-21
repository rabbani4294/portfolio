import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Search, Star } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import ProjectArt from "../ui/ProjectArt";
import ProjectModal from "../ui/ProjectModal";
import { GithubIcon } from "../ui/BrandIcons";
import { projectCategories, projects } from "../data/projects";
import { personalInfo } from "../data/personal";

const githubProfile = personalInfo.socials.find((s) => s.id === "github").href;
const PAGE = 9;

function ProjectCard({ project, onOpen }) {
  return (
    <TiltCard className="h-full rounded-3xl" max={9}>
      <article className="glass glass-hover flex h-full flex-col overflow-hidden rounded-3xl" style={{ transformStyle: "preserve-3d" }}>
        <div className="relative h-44 overflow-hidden">
          <ProjectArt project={project} className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]" />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-navy/90 to-transparent" />
          <span
            className="absolute left-4 top-4 rounded-full border border-white/15 bg-midnight/70 px-3 py-1 text-xs font-semibold text-slate-200 backdrop-blur"
            style={{ transform: "translateZ(30px)" }}
          >
            {project.category}
          </span>
          {project.featured && (
            <span
              className="absolute right-4 top-4 flex items-center gap-1 rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-1 text-xs font-semibold text-cyan backdrop-blur"
              style={{ transform: "translateZ(30px)" }}
            >
              <Star size={12} fill="currentColor" aria-hidden="true" /> Featured
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-6">
          <h3 className="font-display text-[1.05rem] font-semibold leading-snug text-ice">{project.title}</h3>
          <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-slate-400">{project.description}</p>

          <ul className="mt-5 flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((t) => (
              <li key={t} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
                {t}
              </li>
            ))}
            {project.technologies.length > 4 && (
              <li className="rounded-md px-1.5 py-1 text-xs text-slate-400">+{project.technologies.length - 4}</li>
            )}
          </ul>

          <div className="mt-6 flex items-center justify-between border-t border-white/10 pt-5">
            <button
              type="button"
              onClick={() => onOpen(project)}
              className="link-underline flex items-center gap-1.5 text-sm font-semibold text-ice transition hover:text-cyan"
              aria-label={`View details for ${project.title}`}
            >
              View details <ArrowUpRight size={16} aria-hidden="true" />
            </button>
            <a
              href={project.github || githubProfile}
              target="_blank"
              rel="noreferrer"
              aria-label={project.github ? `${project.title} on GitHub` : "My GitHub profile"}
              title={project.github ? "View repository" : "My GitHub profile"}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition hover:border-cyan/50 hover:bg-cyan/10 hover:text-cyan"
            >
              <GithubIcon width={17} height={17} />
            </a>
          </div>
        </div>
      </article>
    </TiltCard>
  );
}

export default function Projects() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [visible, setVisible] = useState(PAGE);
  const [selected, setSelected] = useState(null);
  const close = useCallback(() => setSelected(null), []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      const inCat = category === "All" || (category === "Featured" ? p.featured : p.category === category);
      if (!inCat) return false;
      if (!q) return true;
      return [p.title, p.category, p.description, ...p.technologies].join(" ").toLowerCase().includes(q);
    });
  }, [category, query]);

  const shown = filtered.slice(0, visible);

  return (
    <section id="projects" className="section-pad section-veil relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          title="Things I've built"
          lead="A collection of projects across machine learning, data analytics, business intelligence, databases, computer vision, and full stack development."
        />

        {/* Controls */}
        <div data-reveal className="mb-10 flex flex-col gap-6">
          <div className="relative max-w-md">
            <Search size={18} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" aria-hidden="true" />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setVisible(PAGE);
              }}
              placeholder="Search projects or technologies"
              aria-label="Search projects"
              className="glass w-full rounded-xl py-3.5 pl-11 pr-4 text-sm text-ice outline-none transition placeholder:text-slate-400 focus:border-cyan/50"
            />
          </div>
          <div role="tablist" aria-label="Project categories" className="flex flex-wrap gap-2">
            {projectCategories.map((c) => (
              <button
                key={c}
                role="tab"
                aria-selected={category === c}
                onClick={() => {
                  setCategory(c);
                  setVisible(PAGE);
                }}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === c
                    ? "bg-electric text-white shadow-glow"
                    : "border border-white/10 bg-white/[0.04] text-slate-300 hover:border-cyan/40 hover:text-ice"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <p className="text-sm text-slate-400" aria-live="polite">
            Showing <span className="font-semibold text-ice">{shown.length}</span> of {filtered.length} projects
          </p>
        </div>

        {/* Grid */}
        {shown.length ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((project) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 24, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProjectCard project={project} onOpen={setSelected} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="glass rounded-3xl py-20 text-center">
            <Search size={36} className="mx-auto text-slate-400" aria-hidden="true" />
            <h3 className="mt-4 font-display text-lg font-semibold">No projects match</h3>
            <p className="mt-2 text-sm text-slate-400">Clear the search or pick another category.</p>
          </div>
        )}

        {filtered.length > visible && (
          <div className="mt-12 flex justify-center">
            <button type="button" onClick={() => setVisible((v) => v + PAGE)} className="btn btn-ghost">
              Show more projects
              <ChevronDown size={18} aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <ProjectModal project={selected} onClose={close} />
    </section>
  );
}
