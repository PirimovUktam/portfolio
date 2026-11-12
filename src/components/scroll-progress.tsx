"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    let rafId: number | null = null;

    const updateVars = () => {
      rafId = null;
      const scrollY = window.scrollY;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pageProgress = Math.min(1, Math.max(0, scrollY / maxScroll));
      const heroScroll = Math.min(1, Math.max(0, scrollY / 620));

      document.documentElement.style.setProperty("--scroll-progress", pageProgress.toFixed(4));
      document.documentElement.style.setProperty("--hero-scroll", heroScroll.toFixed(4));
    };

    const onScroll = () => {
      if (rafId === null) {
        rafId = window.requestAnimationFrame(updateVars);
      }
    };

    updateVars();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <motion.div
      aria-hidden="true"
      className="scroll-progress-bar"
      style={{ scaleX }}
    />
  );
}
