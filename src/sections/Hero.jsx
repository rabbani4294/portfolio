import { useLayoutEffect } from "react";
import { motion, useTransform } from "framer-motion";
import gsap from "gsap";
import { ArrowDown, FolderOpen, Send } from "lucide-react";
import portrait from "../assets/portrait.webp";
import portraitSm from "../assets/portrait-sm.webp";
import { personalInfo } from "../data/personal";
import { usePointerSprings } from "../hooks/usePointerSprings";
import { getCapability } from "../lib/capability";

/* The name is built from stacked layers pushed back in Z, so it reads as
   extruded type and turns with the pointer. Pure CSS 3D: no extra GPU scene. */
const LAYERS = 8;
const shade = (i) => {
  const t = i / (LAYERS - 1); // 0 = deepest
  const r = Math.round(6 + t * 24);
  const g = Math.round(21 + t * 70);
  const b = Math.round(52 + t * 150);
  return `rgb(${r},${g},${b})`;
};

function Name3D({ text, className = "" }) {
  return (
    <span className={`relative inline-block ${className}`} style={{ transformStyle: "preserve-3d" }}>
      {Array.from({ length: LAYERS }).map((_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className="name3d-layer"
          style={{
            transform: `translateZ(${-(LAYERS - i) * 4.5}px)`,
            color: shade(i),
            textShadow: i === 0 ? "0 0 46px rgba(37,99,235,0.75)" : undefined,
          }}
        >
          {text}
        </span>
      ))}
      <span className="name3d-front">{text}</span>
    </span>
  );
}

function PortraitFrame() {
  const { px, py } = usePointerSprings();
  const rotateY = useTransform(px, [-1, 1], [-11, 11]);
  const rotateX = useTransform(py, [-1, 1], [8, -8]);
  const sheenX = useTransform(px, [-1, 1], ["-30%", "30%"]);
  const chipX = useTransform(px, [-1, 1], [-14, 14]);
  const chipY = useTransform(py, [-1, 1], [-10, 10]);

  return (
    <div data-hero-frame className="relative mx-auto w-[min(66vw,290px)] sm:w-[min(60vw,400px)] lg:w-[min(36vw,450px)]" style={{ perspective: 1300 }}>
      {/* atmospheric light behind the frame */}
      <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-electric/25 blur-[70px]" />

      <div data-hero="frame">
        <motion.div style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="relative aspect-[4/5]">
          {/* depth plates behind the glass */}
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[2rem] border border-cyan/20 bg-electric/10"
            style={{ transform: "translateZ(-60px) scale(1.03)" }}
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 rounded-[2rem] border border-white/5 bg-navy/60"
            style={{ transform: "translateZ(-30px) scale(1.015)" }}
          />

          {/* the glass frame */}
          <div
            className="glass absolute inset-0 overflow-hidden rounded-[2rem] p-2.5"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.25), inset 0 0 0 1px rgba(34,211,238,0.12), 0 50px 90px -30px rgba(0,0,0,0.9), 0 0 60px -10px rgba(37,99,235,0.45)",
            }}
          >
            <img
              src={portrait}
              srcSet={`${portraitSm} 480w, ${portrait} 960w`}
              sizes="(min-width:1024px) 450px, 66vw"
              width="960"
              height="960"
              alt="Portrait of Mubashar Ahmed Rabbani"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full rounded-[1.5rem] object-cover"
              style={{ objectPosition: "50% 22%" }}
            />
            {/* soft reflection travelling across the glass */}
            <motion.div
              aria-hidden="true"
              style={{ x: sheenX }}
              className="pointer-events-none absolute inset-y-0 left-1/4 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.09] to-transparent"
            />
            <div aria-hidden="true" className="pointer-events-none absolute inset-2.5 rounded-[1.5rem] ring-1 ring-inset ring-white/10" />
          </div>

          {/* floating chips ahead of the glass */}
          <motion.div style={{ x: chipX, y: chipY, z: 70 }} className="absolute -left-6 top-[14%] sm:-left-12">
            <div data-hero="chip">
              <div className="glass float-slow rounded-xl px-3.5 py-2 text-xs font-bold text-cyan sm:text-sm">Python</div>
            </div>
          </motion.div>
          <motion.div style={{ x: chipX, y: chipY, z: 90 }} className="absolute -right-5 top-[44%] sm:-right-12">
            <div data-hero="chip">
              <div className="glass float-mid rounded-xl px-3.5 py-2 text-xs font-bold text-ice sm:text-sm">Machine Learning</div>
            </div>
          </motion.div>
          <motion.div style={{ x: chipX, y: chipY, z: 60 }} className="absolute -left-4 bottom-[10%] sm:-left-10">
            <div data-hero="chip">
              <div className="glass float-fast rounded-xl px-3.5 py-2 text-xs font-bold text-cyan sm:text-sm">Deep Learning</div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* floor shadow */}
      <div aria-hidden="true" className="mx-auto mt-6 h-5 w-3/4 rounded-[50%] bg-electric/30 blur-xl" />
    </div>
  );
}

export default function Hero({ ready }) {
  const { px, py } = usePointerSprings();
  const rotateY = useTransform(px, [-1, 1], [-24, 2]);
  const rotateX = useTransform(py, [-1, 1], [10, -2]);
  const { reduced } = getCapability();

  // One orchestrated entrance, played after the loader exits
  useLayoutEffect(() => {
    if (!ready || reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo("[data-hero='name']", { opacity: 0, rotateX: -75, y: 60, transformOrigin: "50% 100%" }, { opacity: 1, rotateX: 0, y: 0, duration: 1.5 })
        .fromTo("[data-hero='in']", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, "-=1.0")
        .fromTo("[data-hero='frame']", { opacity: 0, scale: 0.86, y: 70, rotateY: -28 }, { opacity: 1, scale: 1, y: 0, rotateY: 0, duration: 1.6 }, "-=1.4")
        .fromTo("[data-hero='chip']", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.8, stagger: 0.12, ease: "back.out(1.8)" }, "-=0.8");
    });
    return () => ctx.revert();
  }, [ready, reduced]);

  const { identity, tagline, brandLine, firstName, restOfName } = personalInfo;

  return (
    <section id="home" className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:pt-24">
      <div className="mx-auto grid grid-cols-1 w-full max-w-7xl items-center gap-14 px-6 lg:grid-cols-[1.12fr_0.88fr] lg:gap-8 lg:px-10">
        {/* Text */}
        <div data-hero-text className="order-2 text-center lg:order-1 lg:text-left">
          <p data-hero="in" className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm font-semibold text-cyan lg:justify-start">
            {identity.map((role, i) => (
              <span key={role} className="flex items-center gap-3">
                {role}
                {i < identity.length - 1 && <span aria-hidden="true" className="hidden h-4 w-px bg-white/20 sm:block" />}
              </span>
            ))}
          </p>

          <h1 className="mt-6 font-display" style={{ perspective: 1100 }} aria-label={personalInfo.name}>
            <span data-hero="name" className="block">
              <motion.span style={{ rotateX, rotateY, transformStyle: "preserve-3d" }} className="inline-block">
                <Name3D
                  text={firstName}
                  className="text-[clamp(2.6rem,13vw,4.6rem)] font-bold leading-[1.05] tracking-tight sm:text-[clamp(3.2rem,11vw,5.6rem)] lg:text-[clamp(3rem,5.9vw,5.6rem)]"
                />
                <span className="mt-2 block">
                  <Name3D
                    text={restOfName}
                    className="text-[clamp(1.3rem,6.4vw,2.2rem)] font-medium tracking-wide sm:text-[clamp(1.6rem,5vw,2.6rem)] lg:text-[clamp(1.5rem,2.9vw,2.7rem)]"
                  />
                </span>
              </motion.span>
            </span>
          </h1>

          <p data-hero="in" className="mx-auto mt-8 max-w-xl text-lg leading-8 text-slate-300 lg:mx-0 lg:text-xl">
            {tagline.split(". ").map((part, i, a) => (
              <span key={part} className="block">
                {part}
                {i < a.length - 1 ? "." : ""}
              </span>
            ))}
          </p>

          <div data-hero="in" className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a href="#projects" className="btn btn-primary">
              <FolderOpen size={18} aria-hidden="true" />
              Explore My Projects
            </a>
            <a href="#contact" className="btn btn-ghost">
              <Send size={17} aria-hidden="true" />
              Let&rsquo;s Connect
            </a>
          </div>

          <p data-hero="in" className="mt-10 font-display text-[11px] font-medium tracking-[0.18em] text-slate-400/80">
            {brandLine.toUpperCase()}
          </p>
        </div>

        {/* Portrait */}
        <div className="order-1 lg:order-2">
          <PortraitFrame />
        </div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-400 transition hover:text-cyan md:flex"
      >
        <span className="text-xs font-semibold">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}
