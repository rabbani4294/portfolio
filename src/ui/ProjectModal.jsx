import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ExternalLink, X } from "lucide-react";
import ProjectArt from "./ProjectArt";
import { GithubIcon } from "./BrandIcons";
import { personalInfo } from "../data/personal";

const githubProfile = personalInfo.socials.find((s) => s.id === "github").href;

export default function ProjectModal({ project, onClose }) {
  const closeRef = useRef(null);

  useEffect(() => {
    if (!project) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button type="button" aria-label="Close project details" onClick={onClose} className="absolute inset-0 cursor-default bg-midnight/80 backdrop-blur-sm" />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="project-modal-title"
            initial={{ opacity: 0, y: 40, rotateX: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            style={{ transformPerspective: 1200 }}
            className="glass relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl"
          >
            <div className="relative h-52 overflow-hidden rounded-t-3xl sm:h-64">
              <ProjectArt project={project} className="h-full w-full" />
              <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy to-transparent" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-midnight/70 text-slate-200 transition hover:border-cyan/50 hover:text-cyan"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-7 sm:p-9">
              <p className="text-sm font-semibold text-cyan">
                {project.category}
                {project.featured && <span className="ml-3 rounded-full border border-cyan/30 bg-cyan/10 px-2.5 py-0.5 text-xs">Featured</span>}
              </p>
              <h3 id="project-modal-title" className="mt-2 font-display text-2xl font-semibold leading-tight text-ice sm:text-3xl">
                {project.title}
              </h3>
              <p className="mt-5 text-base leading-8 text-slate-300">{project.description}</p>

              <h4 className="mt-8 text-sm font-semibold text-slate-400">Technologies</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.technologies.map((t) => (
                  <li key={t} className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-sm text-slate-200">
                    {t}
                  </li>
                ))}
              </ul>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a href={project.github || githubProfile} target="_blank" rel="noreferrer" className="btn btn-primary">
                  <GithubIcon width={18} height={18} />
                  {project.github ? "View on GitHub" : "Browse my GitHub"}
                </a>
                {project.demo && (
                  <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    <ExternalLink size={17} aria-hidden="true" />
                    Live demo
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
