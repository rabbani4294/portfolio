import { ArrowUp, Mail } from "lucide-react";
import { navLinks, personalInfo } from "../data/personal";
import { socialIcons } from "../ui/socialIcons";

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-midnight/80 px-6 py-14 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <a href="#home" className="font-display text-xl font-semibold text-ice">
              Mubashar<span className="text-cyan">.</span>
            </a>
            <p className="mt-5 max-w-sm text-sm leading-7 text-slate-400">{personalInfo.tagline}</p>
            <a href={`mailto:${personalInfo.email}`} className="link-underline mt-6 inline-flex items-center gap-2 text-sm text-slate-300 transition hover:text-cyan">
              <Mail size={16} aria-hidden="true" /> {personalInfo.email}
            </a>
          </div>

          <nav aria-label="Footer">
            <h3 className="font-display text-sm font-semibold text-cyan">Quick links</h3>
            <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-3">
              {[...navLinks, { name: "Resume", id: "resume" }].map((l) => (
                <li key={l.id}>
                  <a href={`#${l.id}`} className="text-sm text-slate-400 transition hover:text-ice">{l.name}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="font-display text-sm font-semibold text-cyan">Connect</h3>
            <p className="mt-5 text-sm leading-7 text-slate-400">Follow my work, projects, and professional journey online.</p>
            <ul className="mt-5 flex gap-3">
              {personalInfo.socials.map((s) => {
                const Icon = socialIcons[s.id];
                return (
                  <li key={s.id}>
                    <a href={s.href} target="_blank" rel="noreferrer" aria-label={s.name} title={s.name} className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-300 transition hover:-translate-y-1 hover:border-cyan/50 hover:text-cyan">
                      <Icon width={18} height={18} />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-sm text-slate-400">© {new Date().getFullYear()} {personalInfo.name}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <p className="text-xs text-slate-400">Built with React, Three.js &amp; Tailwind CSS</p>
            <a href="#home" aria-label="Back to top" className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-300 transition hover:border-cyan/50 hover:text-cyan">
              <ArrowUp size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
