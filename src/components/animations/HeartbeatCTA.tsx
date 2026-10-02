"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

interface HeartbeatCTAProps {
  children: ReactNode;
  className?: string;
}

export default function HeartbeatCTA({ children, className = "" }: HeartbeatCTAProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div className={`transition-transform duration-200 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={`inline-block ${className}`}
      whileHover={{
        scale: 1.03,
        transition: { duration: 0.2 },
      }}
      whileTap={{
        scale: 0.96,
        transition: { type: "spring", stiffness: 400, damping: 20 },
      }}
    >
      {children}
    </motion.div>
  );
}
