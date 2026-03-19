"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type AnimationVariant = "fade-up" | "fade" | "fade-slow";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: AnimationVariant;
}

const variantConfig = {
  "fade-up": {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    duration: 0.6,
  },
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    duration: 0.6,
  },
  "fade-slow": {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    duration: 0.8,
  },
};

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  variant = "fade-up",
}: AnimatedSectionProps) {
  const config = variantConfig[variant];

  return (
    <motion.section
      initial={config.initial}
      whileInView={config.animate}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: config.duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
