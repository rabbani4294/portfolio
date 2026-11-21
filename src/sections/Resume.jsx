import { Award, Briefcase, Code2, Download, ExternalLink, FileText, GraduationCap } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { personalInfo } from "../data/personal";

const items = [
  { icon: GraduationCap, title: "Education", value: "BS Computer Science", detail: "The Islamia University of Bahawalpur" },
  { icon: Briefcase, title: "Experience", value: "Data Analytics & ML Intern", detail: "Code Alpha • 2026" },
  { icon: Award, title: "Certifications", value: "Python & Machine Learning", detail: "IntellixSoft Bahawalpur" },
  { icon: Code2, title: "Core skills", value: "Python • SQL • Excel • Power BI", detail: "Data Analytics & Machine Learning" },
];

const strengths = [
  { title: "Data analytics", text: "Excel, SQL, Power BI, Python, Pandas, NumPy and data visualization." },
  { title: "Machine learning", text: "Scikit-learn, TensorFlow, Keras, XGBoost, classification, prediction and model evaluation." },
  { title: "Development", text: "React, Tailwind CSS, Node.js, Express, Django, REST APIs and MySQL." },
];

export default function Resume() {
  return (
    <section id="resume" className="section-pad section-veil relative">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <SectionHeading
          title="Professional profile"
          lead="A concise overview of my education, experience, technical skills, certifications, and professional direction."
        />

        <div data-reveal>
          <TiltCard className="rounded-3xl" max={3}>
            <div className="glass overflow-hidden rounded-3xl">
              <div className="flex flex-col gap-8 border-b border-white/10 p-8 md:flex-row md:items-center md:justify-between md:p-10">
                <div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-cyan">
                    <FileText size={22} aria-hidden="true" /> Curriculum vitae
                  </div>
                  <h3 className="mt-4 font-display text-2xl font-semibold text-ice sm:text-3xl">{personalInfo.name}</h3>
                  <p className="mt-2 text-slate-400">{personalInfo.identity.join(" • ")}</p>
                  <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300">
                    Computer Science student focused on transforming data into meaningful insights, developing machine
                    learning solutions, and building modern full-stack applications.
                  </p>
                </div>
                <div className="flex shrink-0 flex-col gap-3 sm:flex-row md:flex-col">
                  <a href={personalInfo.resume} download className="btn btn-primary">
                    <Download size={18} aria-hidden="true" /> Download resume
                  </a>
                  <a href={personalInfo.resume} target="_blank" rel="noreferrer" className="btn btn-ghost">
                    <ExternalLink size={17} aria-hidden="true" /> View resume
                  </a>
                </div>
              </div>

              <ul className="grid grid-cols-1 gap-px bg-white/10 sm:grid-cols-2">
                {items.map(({ icon: Icon, title, value, detail }) => (
                  <li key={title} className="bg-navy/80 p-7">
                    <Icon size={22} className="text-cyan" aria-hidden="true" />
                    <p className="mt-4 text-xs font-semibold text-slate-400">{title}</p>
                    <p className="mt-1 font-semibold text-ice">{value}</p>
                    <p className="mt-1 text-sm text-slate-400">{detail}</p>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-1 gap-8 border-t border-white/10 p-8 md:grid-cols-3 md:p-10">
                {strengths.map((s) => (
                  <div key={s.title}>
                    <h4 className="font-display text-sm font-semibold text-cyan">{s.title}</h4>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}
