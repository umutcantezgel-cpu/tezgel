"use client";
import * as React from "react"
import { cn } from "@/utils"

const Button = React.forwardRef(({ className, variant = "default", size = "default", ...props }, ref) => {
  // Base styles using design tokens
  const baseStyles = "inline-flex items-center justify-center font-bold transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"

  const variants = {
    // Primary: Solid Emerald (white text, WCAG AA)
    default: "bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] hover:bg-[var(--color-button-primary-hover)] shadow-sm hover:shadow-md",

    // Secondary: Neutral/Ghost-like but with background
    secondary: "bg-[var(--color-button-secondary-bg)] text-[var(--color-button-secondary-text)] border border-[var(--color-button-secondary-border)] hover:bg-[var(--color-button-secondary-hover)]",

    // Outline: Bordered
    outline: "border border-[var(--color-border-default)] bg-transparent text-[var(--color-text-primary)] hover:border-[var(--color-border-interactive)] hover:text-[var(--color-text-interactive)]",

    // Ghost: Text only
    ghost: "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-background-surface-secondary)]",

    // Link: Underlined
    link: "text-[var(--color-text-interactive)] underline-offset-4 hover:underline",

    // Destructive: Error color
    destructive: "bg-[var(--color-feedback-error)] text-white hover:bg-red-700 shadow-sm",
  }

  const sizes = {
    default: "h-[var(--spacing-12)] px-[var(--spacing-6)] rounded-full text-[var(--font-size-base)]", // 48px height
    sm: "h-[var(--spacing-10)] px-[var(--spacing-4)] rounded-full text-[var(--font-size-sm)]", // 40px height
    lg: "h-[var(--spacing-16)] px-[var(--spacing-8)] rounded-full text-[var(--font-size-lg)]", // 64px height (Large CTAs)
    icon: "h-[var(--spacing-12)] w-[var(--spacing-12)] rounded-full",
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    />
  )
})

Button.displayName = "Button"

export { Button }
