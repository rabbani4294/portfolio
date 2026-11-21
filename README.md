# Mubashar Ahmed Rabbani — 3D Portfolio

React 19 + Vite + Tailwind + Three.js (React Three Fiber) + GSAP + Framer Motion.

## Run
```
npm install
npm run dev      # development
npm run build    # production build -> dist/
```

## Where to edit content
- `src/data/personal.js`     name, tagline, contact, social links, resume path
- `src/data/projects.js`     31 projects. Fill `github` / `demo` with real URLs; cards show links only when set
- `src/data/skills.js`, `experience.js`, `education.js`, `certifications.js`
- `src/assets/portrait.webp` your portrait (swap the file to change it)

## Architecture
- `src/three/Scene.jsx`      one fixed, lightweight WebGL canvas (particles, neural lattice, wireframe forms); camera flies through it on scroll
- `src/lib/capability.js`    picks quality tier: high / low / off (no WebGL, reduced motion, data-saver)
- `src/hooks/useScrollSystem.js`  the only GSAP layer (scroll progress, reveals, parallax, timeline)
- Framer Motion is used only for pointer/interface interactions (tilt, nav, modal)

## Performance
Lower-tier devices (<=4 cores, touch, small screens) get fewer particles, 1x pixel ratio and a 30 fps cap. An in-scene governor sheds load automatically if frames run slow. Reduced-motion users get a static CSS background and no scroll animation.
