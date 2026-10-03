'use client';

import React, { useState, useEffect } from 'react';

export interface RotatingTextProps {
  texts: string[];
  intervalMs?: number;
  className?: string;
  wrapperClassName?: string;
}

/**
 * Accessible rotating text with zero-CLS CSS translateY/opacity transition.
 */
export function RotatingText({
  texts,
  intervalMs = 3200,
  className = '',
  wrapperClassName = '',
}: RotatingTextProps) {
  const [index, setIndex] = useState(0);
  const [fadeState, setFadeState] = useState<'enter' | 'exit'>('enter');

  useEffect(() => {
    if (texts.length <= 1) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const timer = setInterval(() => {
      setFadeState('exit');
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % texts.length);
        setFadeState('enter');
      }, 250);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [texts.length, intervalMs]);

  const currentText = texts[index] || '';

  return (
    <span
      className={`relative inline-flex overflow-hidden align-baseline ${wrapperClassName}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <span
        className={`inline-block transition-all duration-300 ease-out transform ${
          fadeState === 'enter'
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2'
        } ${className}`}
      >
        {currentText}
      </span>
    </span>
  );
}

export default RotatingText;
