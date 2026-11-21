import { useRef } from "react";
import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import { getCapability } from "../lib/capability";

/**
 * Pointer-driven 3D tilt with a soft light glare.
 * Disabled on touch devices and when the user prefers reduced motion.
 * Reveal animations (GSAP) must live on a wrapper, never on this element,
 * so the two systems never fight over `transform`.
 */
export default function TiltCard({ children, className = "", max = 9, glare = true, ...rest }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const srx = useSpring(rx, { stiffness: 190, damping: 18, mass: 0.6 });
  const sry = useSpring(ry, { stiffness: 190, damping: 18, mass: 0.6 });
  const sheen = useMotionTemplate`radial-gradient(380px circle at ${gx}% ${gy}%, rgba(34,211,238,0.16), transparent 62%)`;
  const { coarse, reduced } = getCapability();
  const enabled = !coarse && !reduced;

  const onMove = (e) => {
    if (!enabled || e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 2 * max);
    rx.set(-(py - 0.5) * 2 * max);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={enabled ? { rotateX: srx, rotateY: sry, transformPerspective: 1000, transformStyle: "preserve-3d" } : undefined}
      className={`group relative ${className}`}
      {...rest}
    >
      {glare && enabled && (
        <motion.div
          aria-hidden="true"
          style={{ background: sheen }}
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
      )}
      {children}
    </motion.div>
  );
}
