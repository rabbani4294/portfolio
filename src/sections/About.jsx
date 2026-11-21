import { BarChart3, BrainCircuit, Globe, GraduationCap, MapPin, Target } from "lucide-react";
import portraitSm from "../assets/portrait-sm.webp";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { personalInfo } from "../data/personal";

const highlights = [
  {
    icon: BarChart3,
    title: "Data Analytics",
    text: "Turning raw data into meaningful insights, dashboards, and data-driven decisions.",
  },
  {
    icon: BrainCircuit,
    title: "Machine Learning",
    text: "Building and evaluating machine learning models using Python and modern ML libraries.",
  },
  {
    icon: Globe,
    title: "Full Stack Development",
    text: "Creating modern, responsive web applications with frontend and backend technologies.",
  },
];

export default function About() {
  return (
    <section id="about" className="section-pad section-veil relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          title="Building skills. Creating impact."
          lead="A Computer Science student passionate about data, artificial intelligence, and modern software development."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
          {/* Profile */}
          <div data-reveal>
            <TiltCard className="h-full rounded-3xl" max={5}>
              <div className="glass h-full rounded-3xl p-7 sm:p-10">
                <div className="flex items-center gap-5">
                  <img
                    src={portraitSm}
                    alt=""
                    width="80"
                    height="80"
                    loading="lazy"
                    className="h-20 w-20 rounded-2xl object-cover ring-1 ring-cyan/30"
                    style={{ objectPosition: "50% 22%" }}
                  />
                  <div>
                    <h3 className="font-display text-xl font-semibold text-ice sm:text-2xl">{personalInfo.name}</h3>
                    <p className="mt-1 text-sm font-medium text-cyan">{personalInfo.identity.join(" • ")}</p>
                  </div>
                </div>

                <div className="mt-8 space-y-5 text-[15px] leading-8 text-slate-300 sm:text-base">
                  <p>
                    I am a BS Computer Science student with a strong interest in{" "}
                    <strong className="font-semibold text-ice">
                      Data Analytics, Machine Learning, and Full Stack Development.
                    </strong>
                  </p>
                  <p>
                    My journey involves working with data, developing predictive models, creating interactive dashboards,
                    and building practical software solutions that solve real-world problems.
                  </p>
                  <p>
                    I enjoy continuously learning new technologies and turning ideas into useful, professional, and
                    scalable digital products.
                  </p>
                </div>

                <dl className="mt-9 grid gap-5 border-t border-white/10 pt-7 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <GraduationCap size={20} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
                    <div>
                      <dt className="text-xs text-slate-400">Education</dt>
                      <dd className="text-sm font-semibold text-ice">{personalInfo.degree}</dd>
                      <dd className="text-xs text-slate-400">{personalInfo.university}</dd>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="mt-0.5 shrink-0 text-cyan" aria-hidden="true" />
                    <div>
                      <dt className="text-xs text-slate-400">Location</dt>
                      <dd className="text-sm font-semibold text-ice">{personalInfo.location}</dd>
                    </div>
                  </div>
                </dl>
              </div>
            </TiltCard>
          </div>

          {/* Highlights + objective */}
          <div className="flex flex-col gap-5">
            {highlights.map(({ icon: Icon, title, text }) => (
              <div key={title} data-reveal>
                <TiltCard className="rounded-2xl" max={8}>
                  <div className="glass glass-hover flex gap-5 rounded-2xl p-6" style={{ transformStyle: "preserve-3d" }}>
                    <div
                      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-cyan/20 bg-electric/15 text-cyan"
                      style={{ transform: "translateZ(34px)" }}
                    >
                      <Icon size={26} aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-ice">{title}</h3>
                      <p className="mt-2 text-sm leading-7 text-slate-400">{text}</p>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}

            <div data-reveal>
              <div
                className="rounded-2xl border border-electric/30 p-6"
                style={{ background: "linear-gradient(135deg, rgba(37,99,235,0.2), rgba(34,211,238,0.07))" }}
              >
                <div className="flex items-center gap-3">
                  <Target size={20} className="text-cyan" aria-hidden="true" />
                  <h3 className="font-display text-base font-semibold text-ice">Current focus</h3>
                </div>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Strengthening my expertise in Excel, SQL, Power BI, Python, statistics, data visualization, and
                  real-world analytics projects, and building data-driven solutions that combine analytics, machine
                  learning, and modern software development.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
