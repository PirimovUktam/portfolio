"use client";

import type { CSSProperties, ReactNode } from "react";
import { motion } from "motion/react";

type RevealTag = "div" | "article" | "li" | "section";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  scale?: number;
  as?: RevealTag;
  style?: CSSProperties;
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  scale = 0.985,
  as = "div",
  style,
}: RevealProps) {
  const motionProps = {
    className,
    style,
    initial: { opacity: 0, y, scale },
    whileInView: { opacity: 1, y: 0, scale: 1 },
    viewport: { once: true, margin: "-36px" },
    transition: {
      duration: 0.58,
      delay,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  };

  switch (as) {
    case "article":
      return <motion.article {...motionProps}>{children}</motion.article>;
    case "li":
      return <motion.li {...motionProps}>{children}</motion.li>;
    case "section":
      return <motion.section {...motionProps}>{children}</motion.section>;
    case "div":
    default:
      return <motion.div {...motionProps}>{children}</motion.div>;
  }
}
