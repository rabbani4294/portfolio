import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Loader from "./ui/Loader";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Education from "./sections/Education";
import Certifications from "./sections/Certifications";
import Resume from "./sections/Resume";
import Contact from "./sections/Contact";
import { useScrollSystem } from "./hooks/useScrollSystem";
import { getCapability } from "./lib/capability";

// three.js / R3F live in their own chunk and load while the loader plays
const Scene = lazy(() => import("./three/Scene"));

export default function App() {
  const cap = getCapability();
  const [ready, setReady] = useState(false);
  const finish = useCallback(() => setReady(true), []);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.add(`tier-${cap.tier}`);
    if (!cap.reduced) root.classList.add("js-motion");
    // Safety net: never trap a visitor behind the loader
    const t = setTimeout(finish, 7000);
    return () => clearTimeout(t);
  }, [cap.tier, cap.reduced, finish]);

  useEffect(() => {
    document.documentElement.style.overflow = ready ? "" : "hidden";
  }, [ready]);

  useScrollSystem(ready);

  return (
    <>
      <div className="atmosphere" aria-hidden="true" />
      {cap.tier !== "off" && (
        <Suspense fallback={null}>
          <Scene tier={cap.tier} narrow={cap.small} />
        </Suspense>
      )}

      <AnimatePresence>{!ready && <Loader onDone={finish} />}</AnimatePresence>

      <Navbar />
      <main>
        <Hero ready={ready} />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
