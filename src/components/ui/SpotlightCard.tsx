'use client';

import React, { useRef, useState, useCallback } from 'react';

export interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  spotlightRadius?: number;
}

/**
 * High-performance SpotlightCard with mouse-following radial glow.
 * Uses direct CSS custom properties to avoid React re-rendering on mousemove.
 */
export function SpotlightCard({
  children,
  className = '',
  spotlightColor = 'rgba(234, 88, 12, 0.14)', // Tezgel warm ceramic orange glow
  spotlightRadius = 350,
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    divRef.current.style.setProperty('--spotlight-x', `${x}px`);
    divRef.current.style.setProperty('--spotlight-y', `${y}px`);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setOpacity(0);
  }, []);

  const handleFocus = useCallback(() => {
    setOpacity(1);
  }, []);

  const handleBlur = useCallback(() => {
    setOpacity(0);
  }, []);

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={`relative overflow-hidden rounded-2xl border border-neutral-200/90 bg-white p-6 sm:p-8 transition-shadow duration-300 hover:shadow-xl ${className}`}
      {...props}
    >
      {/* Mouse Spotlight Layer */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl transition-opacity duration-300 ease-out"
        style={{
          opacity,
          background: `radial-gradient(${spotlightRadius}px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), ${spotlightColor}, transparent 70%)`,
        }}
        aria-hidden="true"
      />
      
      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}

export default SpotlightCard;
