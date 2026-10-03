import React from 'react';

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
  className?: string;
  from?: string;
  to?: string;
  via?: string;
}

/**
 * LCP-optimized GradientText component.
 * Uses pure CSS background-clip to ensure instantaneous SSR rendering without layout shift.
 */
export function GradientText({
  children,
  className = '',
  from = 'from-orange-600',
  to = 'to-amber-500',
  via = 'via-orange-500',
  ...props
}: GradientTextProps) {
  return (
    <span
      className={`inline-block bg-gradient-to-r ${from} ${via} ${to} bg-clip-text text-transparent font-inherit ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}

export default GradientText;
