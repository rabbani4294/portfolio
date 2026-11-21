import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import portrait from "../assets/portrait.webp";
import { getCapability } from "../lib/capability";
import { personalInfo } from "../data/personal";

export default function Loader({ onDone }) {
  const [progress, setProgress] = useState(0);
  const { reduced } = getCapability();

  useEffect(() => {
    let alive = true;
    const minTime = reduced ? 250 : 1400;
    const start = performance.now();

    const assets = Promise.all([
      document.fonts?.ready ?? Promise.resolve(),
      new Promise((resolve) => {
        const img = new Image();
        img.src = portrait;
        img.decode ? img.decode().then(resolve, resolve) : (img.onload = img.onerror = resolve);
      }),
    ]);

    let done = false;
    assets.then(() => (done = true));

    let raf;
    const tick = (now) => {
      if (!alive) return;
      const t = Math.min(1, (now - start) / minTime);
      // ease toward 92% on time alone; the last stretch needs real assets
      const target = done ? 100 : Math.min(92, t * 92);
      setProgress((p) => p + (target - p) * 0.14);
      if (done && t >= 1) {
        setProgress(100);
        setTimeout(() => alive && onDone(), 260);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, [onDone, reduced]);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-midnight px-6 text-center"
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 animate-spin rounded-full border border-electric/30 border-t-cyan" style={{ animationDuration: "1.6s" }} />
        <div className="absolute inset-3 rounded-full border border-cyan/20" />
        <span className="absolute inset-0 flex items-center justify-center font-display text-2xl font-semibold text-ice">M</span>
      </div>
      <p className="mt-10 max-w-xs font-display text-sm font-medium leading-relaxed tracking-wide text-slate-400">
        {personalInfo.brandLine}
      </p>
      <div className="mt-8 h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-electric to-cyan"
          style={{ width: `${Math.round(progress)}%`, transition: "width 0.1s linear" }}
        />
      </div>
      <p className="mt-3 font-sans text-xs tabular-nums text-slate-400">{Math.round(progress)}%</p>
    </motion.div>
  );
}
