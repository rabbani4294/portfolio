// Decides how much 3D this device can afford.
//   "high" – full scene
//   "low"  – lighter scene (phones, tablets, weaker GPUs / few CPU cores)
//   "off"  – no WebGL (unsupported, reduced motion, or data-saver): CSS fallback only
let cached;

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl2") || canvas.getContext("webgl"))
    );
  } catch {
    return false;
  }
}

export function getCapability() {
  if (cached) return cached;
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const coarse = window.matchMedia("(pointer: coarse)").matches;
  const small = window.innerWidth < 768;
  const cores = navigator.hardwareConcurrency || 4;
  const memory = navigator.deviceMemory || 4;
  const saveData = !!navigator.connection?.saveData;
  const webgl = hasWebGL();

  let tier = "high";
  if (!webgl || reduced || saveData) tier = "off";
  else if (small || coarse || cores <= 4 || memory <= 4) tier = "low";

  cached = { tier, reduced, coarse, small, webgl };
  return cached;
}
