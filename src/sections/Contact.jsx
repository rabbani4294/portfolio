import { useState } from "react";
import { ArrowUpRight, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import SectionHeading from "../ui/SectionHeading";
import TiltCard from "../ui/TiltCard";
import { socialIcons } from "../ui/socialIcons";
import { personalInfo } from "../data/personal";

const rows = [
  { icon: Mail, label: "Email", value: personalInfo.email, href: `mailto:${personalInfo.email}` },
  { icon: MessageCircle, label: "WhatsApp", value: personalInfo.whatsappDisplay, href: personalInfo.whatsappHref },
  { icon: MapPin, label: "Location", value: personalInfo.location },
];

const field =
  "w-full rounded-xl border border-white/10 bg-midnight/60 px-4 py-3.5 text-sm text-ice outline-none transition placeholder:text-slate-400/70 focus:border-cyan/60 focus:ring-2 focus:ring-cyan/20";

export default function Contact() {
  const [sent, setSent] = useState(false);

  // No backend: compose the message in the visitor's own email app.
  const onSubmit = (e) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const subject = f.get("subject") || `Portfolio message from ${f.get("name")}`;
    const body = `${f.get("message")}\n\n— ${f.get("name")} (${f.get("email")})`;
    window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <section id="contact" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <SectionHeading
          title="Let's connect"
          lead="Have a project, opportunity, or idea? Feel free to reach out. I would be happy to connect and discuss it with you."
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div data-reveal className="min-w-0">
            <TiltCard className="h-full rounded-3xl" max={5}>
              <div className="glass h-full rounded-3xl p-7 sm:p-10">
                <h3 className="font-display text-xl font-semibold text-ice">Let&rsquo;s work together.</h3>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  I&rsquo;m open to internships, freelance opportunities, collaborations, data analytics projects, machine
                  learning projects, and full-stack development work.
                </p>

                <ul className="mt-8 space-y-3">
                  {rows.map(({ icon: Icon, label, value, href }) => {
                    const inner = (
                      <>
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-electric/15 text-cyan transition group-hover:bg-electric/30">
                          <Icon size={20} aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-xs text-slate-400">{label}</span>
                          <span className="block truncate text-sm font-semibold text-ice">{value}</span>
                        </span>
                        {href && <ArrowUpRight size={16} className="text-slate-400 transition group-hover:text-cyan" aria-hidden="true" />}
                      </>
                    );
                    return (
                      <li key={label}>
                        {href ? (
                          <a
                            href={href}
                            target={href.startsWith("http") ? "_blank" : undefined}
                            rel={href.startsWith("http") ? "noreferrer" : undefined}
                            className="group glass-hover flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5"
                          >
                            {inner}
                          </a>
                        ) : (
                          <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-3.5">{inner}</div>
                        )}
                      </li>
                    );
                  })}
                </ul>

                <p className="mt-9 text-sm font-semibold text-slate-400">Find me online</p>
                <ul className="mt-4 flex flex-wrap gap-3">
                  {personalInfo.socials.map((s) => {
                    const Icon = socialIcons[s.id];
                    return (
                      <li key={s.id}>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          aria-label={s.name}
                          title={s.name}
                          className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-slate-300 transition duration-300 hover:-translate-y-1.5 hover:border-cyan/50 hover:bg-cyan/10 hover:text-cyan hover:shadow-glow-cyan"
                        >
                          <Icon />
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </TiltCard>
          </div>

          <div data-reveal className="min-w-0">
            <TiltCard className="h-full rounded-3xl" max={5}>
              <form onSubmit={onSubmit} className="glass h-full rounded-3xl p-7 sm:p-10">
                <h3 className="font-display text-xl font-semibold text-ice">Send a message</h3>
                <div className="mt-7 space-y-5">
                  <div>
                    <label htmlFor="c-name" className="mb-2 block text-sm font-semibold text-slate-200">Your name</label>
                    <input id="c-name" name="name" required autoComplete="name" placeholder="Enter your name" className={field} />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="mb-2 block text-sm font-semibold text-slate-200">Email address</label>
                    <input id="c-email" name="email" type="email" required autoComplete="email" placeholder="you@example.com" className={field} />
                  </div>
                  <div>
                    <label htmlFor="c-subject" className="mb-2 block text-sm font-semibold text-slate-200">Subject</label>
                    <input id="c-subject" name="subject" placeholder="What is this about?" className={field} />
                  </div>
                  <div>
                    <label htmlFor="c-message" className="mb-2 block text-sm font-semibold text-slate-200">Message</label>
                    <textarea id="c-message" name="message" required rows={5} placeholder="Write your message" className={`${field} resize-none`} />
                  </div>
                  <button type="submit" className="btn btn-primary w-full">
                    <Send size={18} aria-hidden="true" /> Send message
                  </button>
                  <p className="min-h-5 text-center text-xs text-slate-400" aria-live="polite">
                    {sent ? "Opening your email app. If nothing opens, write to " + personalInfo.email + "." : "This opens your email app with the message ready to send."}
                  </p>
                </div>
              </form>
            </TiltCard>
          </div>
        </div>

        <p data-reveal className="mt-14 text-center text-sm text-slate-400">
          Available for opportunities • Let&rsquo;s build something meaningful together.
        </p>
      </div>
    </section>
  );
}
