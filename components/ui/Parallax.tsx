"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

/**
 * Drifts its children as the section passes through the viewport.
 *
 * `distance` is the total travel in pixels across the whole pass: positive
 * lags behind the scroll (reads as further away), negative runs ahead of it.
 * Layering a couple of these at different distances is what separates the
 * paint from the product.
 */
export function Parallax({
  distance = 60,
  className = "",
  style,
  children,
}: {
  distance?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const raw = useTransform(scrollYProgress, [0, 1], [distance, -distance]);
  const y = useSpring(raw, { stiffness: 90, damping: 24, mass: 0.4 });

  return (
    <motion.div ref={ref} className={className} style={{ ...style, y: reduce ? 0 : y }}>
      {children}
    </motion.div>
  );
}
