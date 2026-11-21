import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

function ExperienceCard({ experience, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
      className="relative pl-10"
    >
      {/* Timeline Dot */}
      <div className="absolute left-0 top-1 flex h-8 w-8 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-500">
        <Briefcase size={15} />
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.04]">
        <div className="flex flex-col justify-between gap-2 md:flex-row md:items-start">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-blue-500">
              {experience.type}
            </p>

            <h3 className="mt-2 text-xl font-semibold text-white">
              {experience.role}
            </h3>

            <p className="mt-1 text-gray-400">
              {experience.company}
            </p>
          </div>

          {experience.duration && (
            <span className="text-sm text-gray-500">
              {experience.duration}
            </span>
          )}
        </div>

        <p className="mt-5 text-sm leading-7 text-gray-500">
          {experience.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {experience.technologies.map((technology) => (
            <span
              key={technology}
              className="rounded-md bg-white/5 px-2.5 py-1 text-xs text-gray-400"
            >
              {technology}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default ExperienceCard;