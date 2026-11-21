import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollState } from "../lib/scrollState";
import { getCapability } from "../lib/capability";

gsap.registerPlugin(ScrollTrigger);
// On slow frames (weak GPUs) finish animations on time instead of stretching them out
gsap.ticker.lagSmoothing(0);

/**
 * The single GSAP layer of the site:
 *  1. page progress  → drives the 3D camera
 *  2. text/card reveals (data-reveal, data-heading, data-underline)
 *  3. scroll-linked parallax for the hero and the timeline line
 * Framer Motion is used only for pointer/interface interactions, never for these.
 */
export function useScrollSystem(ready) {
  useEffect(() => {
    const { reduced, coarse } = getCapability();

    const progressTrigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        scrollState.progress = self.progress;
      },
    });

    const onPointer = (e) => {
      scrollState.pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      scrollState.pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    if (!coarse && !reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    if (reduced) {
      return () => {
        progressTrigger.kill();
        window.removeEventListener("pointermove", onPointer);
      };
    }

    if (!ready) {
      return () => {
        progressTrigger.kill();
        window.removeEventListener("pointermove", onPointer);
      };
    }

    const ctx = gsap.context(() => {
      // Staggered reveals for anything flagged data-reveal
      ScrollTrigger.batch("[data-reveal]", {
        start: "top 90%",
        once: true,
        onEnter: (els) =>
          gsap.to(els, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.09, overwrite: true }),
      });

      // Headings tip up out of depth
      gsap.utils.toArray("[data-heading]").forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          rotateX: -42,
          y: 36,
          transformOrigin: "50% 100%",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // Underlines draw in
      gsap.utils.toArray("[data-underline]").forEach((el) => {
        gsap.to(el, {
          scaleX: 1,
          duration: 0.9,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      // Hero parallax: text and portrait drift at different depths as you leave
      if (!coarse) {
        gsap.to("[data-hero-text]", {
          yPercent: -10,
          ease: "none",
          scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 0.6 },
        });
        gsap.to("[data-hero-frame]", {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: "#home", start: "top top", end: "bottom top", scrub: 0.6 },
        });
      }

      // Timeline spine fills with scroll
      gsap.utils.toArray("[data-spine]").forEach((el) => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            transformOrigin: "top",
            scrollTrigger: { trigger: el.parentElement, start: "top 70%", end: "bottom 60%", scrub: 0.5 },
          },
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts?.ready.then(refresh);

    return () => {
      ctx.revert();
      progressTrigger.kill();
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("load", refresh);
    };
  }, [ready]);
}
