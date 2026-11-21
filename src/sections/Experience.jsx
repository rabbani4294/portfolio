import { Briefcase, CalendarDays, Clock, MapPin } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { experiences } from "../data/experience";

export default function Experience() {
  return (
    <section id="experience" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          title="My professional journey"
          lead="Practical experiences that have helped me develop technical, analytical, and professional skills."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {experiences.map((exp) => {
            const meta = [
              exp.location && { icon: MapPin, text: exp.location },
              exp.mode && { icon: Briefcase, text: `${exp.mode} ${exp.type}` },
              !exp.mode && exp.type && { icon: Briefcase, text: exp.type },
              exp.duration && { icon: Clock, text: exp.duration },
              exp.period && { icon: CalendarDays, text: exp.period },
            ].filter(Boolean);

            return (
              <div key={exp.id} data-reveal>
                <TiltCard className="h-full rounded-3xl" max={8}>
                  <article className="glass glass-hover flex h-full flex-col rounded-3xl p-7" style={{ transformStyle: "preserve-3d" }}>
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan/25 bg-electric/15 text-cyan"
                      style={{ transform: "translateZ(38px)" }}
                    >
                      <Briefcase size={22} aria-hidden="true" />
                    </div>

                    <h3 className="mt-6 font-display text-lg font-semibold leading-snug text-ice">{exp.role}</h3>
                    <p className="mt-2 text-base font-semibold text-cyan">{exp.company}</p>

                    <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-400">
                      {meta.map(({ icon: Icon, text }) => (
                        <li key={text} className="flex items-center gap-1.5">
                          <Icon size={13} aria-hidden="true" /> {text}
                        </li>
                      ))}
                    </ul>

                    <p className="mt-5 flex-1 text-sm leading-7 text-slate-300">{exp.description}</p>

                    <ul className="mt-6 flex flex-wrap gap-1.5">
                      {exp.skills.map((s) => (
                        <li key={s} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
                          {s}
                        </li>
                      ))}
                    </ul>
                  </article>
                </TiltCard>
              </div>
            );
          })}
        </div>

        <p data-reveal className="mx-auto mt-14 max-w-2xl text-center text-sm leading-7 text-slate-400">
          <span className="font-semibold text-slate-200">Learning through real-world experience.</span> Every project,
          internship, and challenge contributes to my growth as a data professional and software developer.
        </p>
      </div>
    </section>
  );
}
