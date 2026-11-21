import { motion } from "framer-motion";

function ProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.5,
        delay: index * 0.06,
      }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/30 hover:bg-white/[0.04]"
    >
      {/* Project Visual */}
      <div className="relative flex h-44 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.12),transparent_60%)]" />

        <span className="relative text-5xl font-bold text-white/10 transition-transform duration-500 group-hover:scale-110">
          {project.title.charAt(0)}
        </span>
      </div>

      {/* Project Content */}
      <div className="flex flex-1 flex-col p-6">

        {/* Category */}
        <p className="text-xs font-medium uppercase tracking-wider text-blue-500">
          {project.category}
        </p>

        {/* Title */}
        <h3 className="mt-2 text-xl font-semibold text-white">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-md bg-white/5 px-2 py-1 text-[11px] text-gray-400"
            >
              {technology}
            </span>
          ))}
        </div>

      </div>
    </motion.article>
  );
}

export default ProjectCard;