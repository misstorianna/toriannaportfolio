import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

/** Decorative depth only: content, links, and scroll anchors stay in normal flow. */
export function ParallaxBackdrop({ hero = false }: { hero?: boolean }) {
  const target = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start end", "end start"],
  });
  const slow = useTransform(scrollYProgress, [0, 1], [-36, 36]);
  const fast = useTransform(scrollYProgress, [0, 1], [64, -64]);

  return (
    <div ref={target} aria-hidden="true" className={`portfolio-parallax ${hero ? "portfolio-parallax-hero" : ""}`}>
      <motion.div className="portfolio-parallax-glow" style={{ y: reducedMotion ? 0 : slow }} />
      <motion.div className="portfolio-parallax-grid" style={{ y: reducedMotion ? 0 : fast }} />
    </div>
  );
}