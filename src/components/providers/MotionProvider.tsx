"use client";

import { MotionConfig } from "framer-motion";
import React from "react";

export function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  );
}

export default MotionProvider;
