import { Award, CalendarDays, Hash } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { certifications } from "../data/certifications";

export default function Certifications() {
  return (
    <section id="certifications" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          title="Credentials & certifications"
          lead="Professional certifications that support my technical knowledge and continuous learning journey."
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {certifications.map((cert) => (
            <div key={cert.id} data-reveal>
              <TiltCard className="h-full rounded-3xl" max={9}>
                <article className="glass glass-hover flex h-full flex-col rounded-3xl p-7" style={{ transformStyle: "preserve-3d" }}>
                  <div
                    className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan/30 bg-gradient-to-br from-electric/30 to-cyan/10 text-cyan shadow-glow-cyan"
                    style={{ transform: "translateZ(44px)" }}
                  >
                    <Award size={28} aria-hidden="true" />
                  </div>

                  <h3 className="mt-6 font-display text-lg font-semibold leading-snug text-ice">{cert.title}</h3>
                  <p className="mt-2 text-sm font-semibold text-cyan">{cert.issuer}</p>
                  <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">{cert.description}</p>

                  <dl className="mt-6 space-y-3 border-t border-white/10 pt-5 text-sm">
                    <div className="flex items-center gap-3">
                      <CalendarDays size={16} className="text-slate-400" aria-hidden="true" />
                      <dt className="sr-only">Issue date</dt>
                      <dd className="text-slate-200">{cert.date}</dd>
                    </div>
                    {cert.serial && (
                      <div className="flex items-center gap-3">
                        <Hash size={16} className="text-slate-400" aria-hidden="true" />
                        <dt className="sr-only">Certificate ID</dt>
                        <dd className="text-slate-200">{cert.serial}</dd>
                      </div>
                    )}
                  </dl>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {cert.skills.map((s) => (
                      <li key={s} className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300">
                        {s}
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            </div>
          ))}
        </div>

        <p data-reveal className="mx-auto mt-14 max-w-2xl text-center text-sm leading-7 text-slate-400">
          <span className="font-semibold text-slate-200">Continuous learning.</span> Certifications are part of my
          ongoing effort to strengthen my technical skills and apply what I learn through practical projects.
        </p>
      </div>
    </section>
  );
}
