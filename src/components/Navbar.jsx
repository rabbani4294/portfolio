import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Download, Menu, X } from "lucide-react";
import { navLinks, personalInfo } from "../data/personal";

const sectionIds = [...navLinks.map((l) => l.id), "resume"];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  // Active section = the one crossing the middle of the viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id === "resume" ? "certifications" : entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:rounded-lg focus:bg-electric focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <nav
        aria-label="Primary"
        className={`glass relative mx-auto max-w-6xl overflow-hidden rounded-2xl transition-all duration-500 ${
          scrolled ? "shadow-glow" : ""
        }`}
        style={{ boxShadow: scrolled ? "0 18px 50px -18px rgba(37,99,235,0.55), inset 0 1px 0 rgba(255,255,255,0.1)" : undefined }}
      >
        <div className={`flex items-center justify-between gap-3 px-4 transition-all duration-500 sm:px-6 ${scrolled ? "h-14" : "h-16"}`}>
          <a href="#home" className="flex items-center gap-2.5" aria-label="Mubashar — back to top">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-electric to-cyan font-display text-sm font-bold text-midnight">
              M
            </span>
            <span className="hidden font-display text-sm font-semibold tracking-tight text-ice sm:block">Mubashar</span>
          </a>

          <ul className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-xl px-3 py-2 text-[13px] font-semibold transition-colors duration-300 ${
                      isActive ? "text-ice" : "text-slate-400 hover:text-ice"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-xl border border-cyan/25 bg-electric/20"
                        style={{ boxShadow: "0 0 22px -4px rgba(37,99,235,0.7)" }}
                      />
                    )}
                    <span className="relative">{link.name}</span>
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <a href={personalInfo.resume} download className="btn btn-ghost hidden !rounded-xl !px-4 !py-2 !text-[13px] sm:inline-flex">
              <Download size={15} aria-hidden="true" />
              Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-200 transition hover:border-cyan/40 hover:text-cyan lg:hidden"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              id="mobile-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="grid grid-cols-2 gap-2 border-t border-white/10 p-3">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      onClick={() => setOpen(false)}
                      className={`block rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        active === link.id ? "bg-electric/20 text-ice" : "text-slate-400 hover:bg-white/5 hover:text-cyan"
                      }`}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
                <li className="col-span-2">
                  <a href={personalInfo.resume} download className="btn btn-primary w-full !py-3">
                    <Download size={16} aria-hidden="true" /> Download resume
                  </a>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          aria-hidden="true"
          style={{ scaleX: progress }}
          className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-electric to-cyan"
        />
      </nav>
    </header>
  );
}
