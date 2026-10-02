"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  className?: string;
}

export default function AnimatedNumber({ value, className = "" }: AnimatedNumberProps) {
  const [mounted, setMounted] = useState(false);
  const springValue = useSpring(value, {
    mass: 0.8,
    stiffness: 75,
    damping: 15,
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  const displayValue = useTransform(springValue, (current) =>
    Math.round(current).toString()
  );

  return (
    <motion.span className={className} suppressHydrationWarning>
      {mounted ? displayValue : value}
    </motion.span>
  );
}
