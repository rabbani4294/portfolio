// Shared mutable state read by the WebGL scene every frame.
// Mutating a plain object avoids React re-renders on scroll / pointer move.
export const scrollState = {
  progress: 0, // 0 → 1 across the whole page (driven by GSAP ScrollTrigger)
  pointer: { x: 0, y: 0 }, // -1 → 1
};
