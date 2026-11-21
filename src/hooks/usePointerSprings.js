import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";
import { getCapability } from "../lib/capability";

/** Smoothed pointer position, normalised to -1 → 1. Static on touch / reduced motion. */
export function usePointerSprings() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const px = useSpring(x, { stiffness: 70, damping: 16, mass: 0.8 });
  const py = useSpring(y, { stiffness: 70, damping: 16, mass: 0.8 });

  useEffect(() => {
    const { coarse, reduced } = getCapability();
    if (coarse || reduced) return;
    const onMove = (e) => {
      x.set((e.clientX / window.innerWidth) * 2 - 1);
      y.set((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [x, y]);

  return { px, py };
}
