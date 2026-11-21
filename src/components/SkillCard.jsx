import { motion } from "framer-motion";

function SkillCard({ title, skills, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition-all duration-300 hover:border-blue-500/30 hover:bg-white/[0.04]"
    >
      <h3 className="text-lg font-semibold text-white">
        {title}
      </h3>

      <div className="mt-5 flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-gray-400 transition-colors duration-300 hover:border-blue-500/30 hover:text-blue-400"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default SkillCard;