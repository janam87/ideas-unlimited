"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

interface CurtainRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function CurtainReveal({ children, className, delay = 0 }: CurtainRevealProps) {
  return (
    <div className={`relative overflow-hidden ${className ?? ""}`}>
      {children}
      <motion.div
        className="absolute inset-0 z-10 bg-background"
        style={{ originX: 0 }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1, delay, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-0 z-10 bg-background"
        style={{ originX: 1 }}
        initial={{ scaleX: 1 }}
        animate={{ scaleX: 0 }}
        transition={{ duration: 1, delay: delay + 0.1, ease: [0.76, 0, 0.24, 1] }}
      />
    </div>
  );
}
