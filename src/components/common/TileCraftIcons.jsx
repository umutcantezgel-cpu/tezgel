"use client";

import React from 'react';

/**
 * Morphing Hamburger to Fugenkreuz (Tile Leveling Cross)
 * Transitions cleanly between 3 horizontal grout bars and a 45-degree tile spacer cross.
 */
export function FugenkreuzToggle({ isOpen, className = "w-6 h-6" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`${className} transition-transform duration-300 ${isOpen ? 'rotate-90 text-orange-500' : 'text-neutral-900'}`}
            aria-hidden="true"
        >
            {/* Top Bar -> 45deg diagonal cross bar */}
            <line
                x1="4"
                y1="7"
                x2="20"
                y2="7"
                className="transition-all duration-300 origin-center"
                style={{
                    transform: isOpen ? 'translateY(5px) rotate(45deg)' : 'none',
                    transformOrigin: '12px 12px'
                }}
            />
            {/* Middle Bar -> shrinks to center point or disappears */}
            <line
                x1="4"
                y1="12"
                x2="20"
                y2="12"
                className="transition-all duration-200"
                style={{
                    opacity: isOpen ? 0 : 1,
                    transform: isOpen ? 'scaleX(0)' : 'scaleX(1)',
                    transformOrigin: '12px 12px'
                }}
            />
            {/* Bottom Bar -> -45deg diagonal cross bar */}
            <line
                x1="4"
                y1="17"
                x2="20"
                y2="17"
                className="transition-all duration-300 origin-center"
                style={{
                    transform: isOpen ? 'translateY(-5px) rotate(-45deg)' : 'none',
                    transformOrigin: '12px 12px'
                }}
            />
        </svg>
    );
}

/**
 * Animated SVG Laser Level Line (Kreuzlinienlaser)
 * Simulates a professional 360-degree laser level projecting a datum line.
 */
export function LaserLevelLine({ active = false }) {
    if (!active) return null;

    return (
        <div className="relative w-full h-3 overflow-hidden pointer-events-none select-none my-1">
            <svg
                className="w-full h-full"
                viewBox="0 0 400 12"
                preserveAspectRatio="none"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id="laserGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#EA580C" stopOpacity="0" />
                        <stop offset="25%" stopColor="#EA580C" stopOpacity="0.8" />
                        <stop offset="50%" stopColor="#FB923C" stopOpacity="1" />
                        <stop offset="75%" stopColor="#EA580C" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#EA580C" stopOpacity="0" />
                    </linearGradient>
                    <filter id="laserGlow" x="-20%" y="-50%" width="140%" height="200%">
                        <feGaussianBlur stdDeviation="1.5" result="glow" />
                        <feMerge>
                            <feMergeNode in="glow" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>
                {/* Horizontal Datum Beam */}
                <line
                    x1="0"
                    y1="6"
                    x2="400"
                    y2="6"
                    stroke="url(#laserGrad)"
                    strokeWidth="1.5"
                    filter="url(#laserGlow)"
                    strokeDasharray="400"
                    strokeDashoffset="0"
                    className="animate-pulse"
                />
                {/* Millimeter hash marks */}
                {[40, 80, 120, 160, 200, 240, 280, 320, 360].map((x) => (
                    <line
                        key={x}
                        x1={x}
                        y1="4"
                        x2={x}
                        y2="8"
                        stroke="#EA580C"
                        strokeWidth="0.8"
                        strokeOpacity="0.5"
                    />
                ))}
                {/* Laser focal dot */}
                <circle
                    cx="200"
                    cy="6"
                    r="2"
                    fill="#FFFFFF"
                    stroke="#EA580C"
                    strokeWidth="1"
                    filter="url(#laserGlow)"
                />
            </svg>
            <div className="absolute top-0 right-2 text-[9px] font-mono font-bold text-orange-600 tracking-wider uppercase opacity-75">
                0.0° LASER-NIVELLIERUNG
            </div>
        </div>
    );
}

/**
 * Tile Spacer (Fugenkreuz) graphic marker
 */
export function GroutCrossMarker({ className = "w-3 h-3 text-orange-500" }) {
    return (
        <svg viewBox="0 0 12 12" fill="none" className={className} aria-hidden="true">
            <line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
    );
}

/**
 * Handcrafted animated SVG Icons for Ceramic & Tile craft categories
 */
export function TileCategoryIcon({ id, className = "w-5 h-5 text-orange-600" }) {
    switch (id) {
        case 'bad':
            // Modern Walk-In shower & water droplets
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
                    <path d="M4 12h16c0 4.4-3.6 8-8 8s-8-3.6-8-8z" />
                    <path d="M4 12V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
                    <line x1="8" y1="16" x2="8.01" y2="16" strokeWidth="2.5" />
                    <line x1="12" y1="16" x2="12.01" y2="16" strokeWidth="2.5" />
                    <line x1="16" y1="16" x2="16.01" y2="16" strokeWidth="2.5" />
                </svg>
            );

        case 'leistungen':
        case 'fliesen':
            // Precision notched trowel (Zahnkelle) spreading mortar bedding
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <path d="M3 9h18" />
                    <path d="M9 21V9" />
                    <path d="M15 9v12" />
                    <circle cx="6" cy="6" r="1" fill="currentColor" />
                    <circle cx="12" cy="6" r="1" fill="currentColor" />
                    <circle cx="18" cy="6" r="1" fill="currentColor" />
                </svg>
            );

        case 'standorte':
            // Compass with ceramic tile coordinates
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
                    <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                    <circle cx="12" cy="10" r="3" />
                </svg>
            );

        case 'blog':
        case 'ratgeber':
            // Blueprint document with measurement compass
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
                    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                    <path d="M8 7h8" />
                    <path d="M8 11h8" />
                    <path d="M8 15h5" />
                </svg>
            );

        case 'ueber-uns':
            // Craftsman guild seal / Handwerkskammer level
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="m9 12 2 2 4-4" />
                </svg>
            );

        case 'balkon-terrasse':
            // Outdoor drainage pedestal (Stelzlager) & slab
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
                    <rect x="2" y="4" width="20" height="4" rx="1" />
                    <path d="M7 8v8" />
                    <path d="M17 8v8" />
                    <path d="M4 20h16" />
                    <path d="M5 16h4" />
                    <path d="M15 16h4" />
                </svg>
            );

        case 'naturstein':
            // Chiseled crystal facet / granite block
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
                    <path d="M6 3h12l4 7-10 11L2 10l4-7z" />
                    <path d="M2 10h20" />
                    <path d="m12 21 4-11-4-7-4 7 4 11z" />
                </svg>
            );

        case 'untergrund-abdichtung':
            // Multi-tier DIN 18534 membrane sandwich
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
                    <path d="M2 6h20" />
                    <path d="M2 12h20" />
                    <path d="M2 18h20" />
                    <circle cx="6" cy="9" r="1" fill="currentColor" />
                    <circle cx="12" cy="9" r="1" fill="currentColor" />
                    <circle cx="18" cy="9" r="1" fill="currentColor" />
                </svg>
            );

        case 'fliesenreparatur':
            // Diamond cutting wheel & mortar joint restoration
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
                    <path d="m14 7 3-3 4 4-3 3" />
                    <path d="m14 7-8 8a2 2 0 0 0 0 2.83l.17.17a2 2 0 0 0 2.83 0l8-8" />
                    <path d="m3 21 3.5-3.5" />
                </svg>
            );

        default:
            return (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
                    <rect x="3" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="3" width="7" height="7" rx="1" />
                    <rect x="14" y="14" width="7" height="7" rx="1" />
                    <rect x="3" y="14" width="7" height="7" rx="1" />
                </svg>
            );
    }
}
