import { BookOpen, GraduationCap, MapPin } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { education } from "../data/education";

export default function Education() {
  return (
    <section id="education" className="section-pad section-veil relative">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionHeading
          title="My academic journey"
          lead="My educational foundation and the academic journey behind my technical career."
        />

        <div className="relative">
          {/* Spine: a track plus a line that fills as you scroll */}
          <div aria-hidden="true" className="absolute bottom-2 left-[19px] top-2 w-px bg-white/10 md:left-1/2 md:-translate-x-1/2">
            <div data-spine className="h-full w-full origin-top bg-gradient-to-b from-electric via-cyan to-electric" style={{ boxShadow: "0 0 14px rgba(34,211,238,0.7)" }} />
          </div>

          <ol className="space-y-12 md:space-y-16">
            {education.map((item, i) => {
              const right = i % 2 === 1;
              const status = item.status === "In Progress" ? "In progress · 5th semester" : item.status;
              return (
                <li key={item.degree} className="relative pl-14 md:grid md:grid-cols-2 md:gap-16 md:pl-0">
                  {/* Milestone */}
                  <span
                    aria-hidden="true"
                    className="absolute left-0 top-7 flex h-10 w-10 items-center justify-center rounded-full border border-cyan/50 bg-navy text-cyan md:left-1/2 md:-translate-x-1/2"
                    style={{ boxShadow: "0 0 0 6px rgba(5,7,13,0.9), 0 0 28px rgba(34,211,238,0.55)" }}
                  >
                    <GraduationCap size={18} />
                  </span>

                  <div data-reveal className={right ? "md:col-start-2" : "md:col-start-1"}>
                    <TiltCard className="rounded-3xl" max={6}>
                      <article className="glass glass-hover rounded-3xl p-7 sm:p-8">
                        <span className="inline-flex rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-xs font-semibold text-cyan">
                          {status}
                        </span>
                        <h3 className="mt-4 font-display text-xl font-semibold text-ice">{item.degree}</h3>
                        <p className="mt-2 font-semibold text-cyan">{item.institution}</p>
                        <p className="mt-2 flex items-center gap-1.5 text-sm text-slate-400">
                          <MapPin size={14} aria-hidden="true" /> {item.location}
                          <span aria-hidden="true">·</span> {item.period}
                        </p>
                        <p className="mt-5 text-sm leading-7 text-slate-300">{item.description}</p>

                        <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-200">
                          <BookOpen size={16} className="text-cyan" aria-hidden="true" /> Key areas
                        </div>
                        <ul className="mt-3 flex flex-wrap gap-2">
                          {item.areas.map((a) => (
                            <li key={a} className="rounded-lg border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs text-slate-300">
                              {a}
                            </li>
                          ))}
                        </ul>
                      </article>
                    </TiltCard>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>

        <p data-reveal className="mx-auto mt-16 max-w-2xl text-center text-sm leading-7 text-slate-400">
          <span className="font-semibold text-slate-200">Growing through continuous learning.</span> Combining academic
          knowledge with practical projects, internships, certifications, and continuous exploration of modern technologies.
        </p>
      </div>
    </section>
  );
}
