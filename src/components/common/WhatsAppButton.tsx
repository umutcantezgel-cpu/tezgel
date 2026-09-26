"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { COMPANY_DATA } from '@/config/company';

interface StoredPosition {
    side: 'left' | 'right';
    yRatio: number;
}

const getButtonSize = () => {
    if (typeof window === 'undefined') return 60;
    return window.innerWidth < 640 ? 56 : 62;
};

const getBounds = () => {
    if (typeof window === 'undefined') {
        return { minX: 16, maxX: 400, minY: 72, maxY: 600 };
    }
    const size = getButtonSize();
    const winW = window.innerWidth || document.documentElement.clientWidth || 1280;
    const winH = window.innerHeight || document.documentElement.clientHeight || 800;
    const isMobile = winW < 768;
    const marginX = isMobile ? 14 : 24;
    const safeTop = 72; // Below navigation header
    const safeBottom = isMobile ? 86 : 24; // Above mobile dock on small screens

    return {
        minX: marginX,
        maxX: Math.max(marginX, winW - size - marginX),
        minY: safeTop,
        maxY: Math.max(safeTop, winH - size - safeBottom)
    };
};

const getInitialPos = () => {
    const bounds = getBounds();
    let initialX = bounds.maxX;
    let initialY = bounds.maxY;

    try {
        const raw = typeof sessionStorage !== 'undefined' ? sessionStorage.getItem('tezgel_wa_button_pos') : null;
        if (raw) {
            const parsed: StoredPosition = JSON.parse(raw);
            initialX = parsed.side === 'left' ? bounds.minX : bounds.maxX;
            initialY = bounds.minY + parsed.yRatio * (bounds.maxY - bounds.minY);
        }
    } catch {
        // Fallback to default bottom-right
    }

    return { x: initialX, y: initialY };
};

// Authentic WhatsApp vector paths (speech bubble and centered telephone receiver)
const BUBBLE_PATH = "M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326z";
const SECONDARY_SKETCH_CONTOUR = "M13.5 2.4A7.8 7.8 0 0 0 8 0.1C3.7 0.1 0.2 3.6 0.2 7.9c0 1.4.4 2.7 1 3.9L0.1 15.9l4.2-1.1a7.8 7.8 0 0 0 3.7.9h.1c4.3 0 7.8-3.5 7.8-7.8a7.8 7.8 0 0 0-2.4-5.5z";
const HANDSET_PATH = "M11.609 9.587c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z";

export default function WhatsAppButton() {
    const initialPos = getInitialPos();
    const buttonRef = useRef<HTMLDivElement>(null);
    const posRef = useRef(initialPos);
    const animFrameRef = useRef<number | null>(null);
    const dragHistoryRef = useRef<Array<{ x: number; y: number; time: number }>>([]);
    const isDraggingRef = useRef(false);
    const hasMovedRef = useRef(false);
    const pointerStartRef = useRef({ x: 0, y: 0 });
    const buttonStartRef = useRef({ x: 0, y: 0 });

    const [isHovered, setIsHovered] = useState(false);
    const [isDraggingState, setIsDraggingState] = useState(false);
    const [currentSide, setCurrentSide] = useState<'left' | 'right'>(() => {
        try {
            if (typeof sessionStorage !== 'undefined') {
                const raw = sessionStorage.getItem('tezgel_wa_button_pos');
                if (raw) {
                    const parsed: StoredPosition = JSON.parse(raw);
                    return parsed.side;
                }
            }
        } catch {
            // fallback
        }
        return 'right';
    });

    const message = "Hallo Herr Tezgel, ich interessiere mich für Ihre Fliesen- und Sanierungsarbeiten. Bitte melden Sie sich bei mir.";
    const whatsappUrl = `${COMPANY_DATA.contact.whatsappLink}?text=${encodeURIComponent(message)}`;

    const updateDOM = useCallback((x: number, y: number) => {
        if (!buttonRef.current) return;
        posRef.current = { x, y };
        buttonRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px)`;
    }, []);

    // Save docked position in sessionStorage
    const savePosition = useCallback((x: number, y: number) => {
        try {
            const bounds = getBounds();
            const side: 'left' | 'right' = x < (bounds.minX + bounds.maxX) / 2 ? 'left' : 'right';
            setCurrentSide(side);
            const rangeY = bounds.maxY - bounds.minY || 1;
            const yRatio = Math.max(0, Math.min(1, (y - bounds.minY) / rangeY));
            const data: StoredPosition = { side, yRatio };
            sessionStorage.setItem('tezgel_wa_button_pos', JSON.stringify(data));
        } catch {
            // Ignore storage restrictions
        }
    }, []);

    // Smooth, damped magnetic docking to nearest edge without arcade bouncing
    const snapToEdge = useCallback((startX: number, startY: number, vx = 0, vy = 0) => {
        const bounds = getBounds();
        // Determine edge target with subtle velocity influence
        const projectedX = startX + vx * 6;
        const targetX = projectedX < (bounds.minX + bounds.maxX) / 2 ? bounds.minX : bounds.maxX;
        const projectedY = startY + vy * 5;
        const targetY = Math.max(bounds.minY, Math.min(bounds.maxY, projectedY));

        let currentX = startX;
        let currentY = startY;

        const animateSnap = () => {
            const dx = targetX - currentX;
            const dy = targetY - currentY;

            // Critically-damped smooth glide
            currentX += dx * 0.22;
            currentY += dy * 0.22;

            if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
                updateDOM(targetX, targetY);
                savePosition(targetX, targetY);
                animFrameRef.current = null;
                return;
            }

            updateDOM(currentX, currentY);
            animFrameRef.current = requestAnimationFrame(animateSnap);
        };

        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = requestAnimationFrame(animateSnap);
    }, [updateDOM, savePosition]);

    // Handle screen resize safely
    useEffect(() => {
        const bounds = getBounds();
        let targetX = bounds.maxX;
        let targetY = bounds.maxY;

        try {
            const raw = sessionStorage.getItem('tezgel_wa_button_pos');
            if (raw) {
                const parsed: StoredPosition = JSON.parse(raw);
                targetX = parsed.side === 'left' ? bounds.minX : bounds.maxX;
                targetY = bounds.minY + parsed.yRatio * (bounds.maxY - bounds.minY);
            }
        } catch {
            // fallback
        }

        updateDOM(targetX, targetY);

        const handleResize = () => {
            const currentBounds = getBounds();
            const currX = posRef.current.x;
            const currY = posRef.current.y;
            const newX = currX < (currentBounds.minX + currentBounds.maxX) / 2 ? currentBounds.minX : currentBounds.maxX;
            const newY = Math.max(currentBounds.minY, Math.min(currentBounds.maxY, currY));
            updateDOM(newX, newY);
            setCurrentSide(newX < (currentBounds.minX + currentBounds.maxX) / 2 ? 'left' : 'right');
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
            if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        };
    }, [updateDOM]);

    // Pointer event handlers (Mouse, Trackpad & Touch)
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
        // Only primary mouse button or touch
        if (e.button !== 0 && e.pointerType === 'mouse') return;

        if (animFrameRef.current) {
            cancelAnimationFrame(animFrameRef.current);
            animFrameRef.current = null;
        }

        isDraggingRef.current = true;
        hasMovedRef.current = false;
        setIsDraggingState(true);

        pointerStartRef.current = { x: e.clientX, y: e.clientY };
        buttonStartRef.current = { x: posRef.current.x, y: posRef.current.y };
        dragHistoryRef.current = [{ x: e.clientX, y: e.clientY, time: performance.now() }];

        try {
            e.currentTarget.setPointerCapture(e.pointerId);
        } catch {
            // pointer capture fallback
        }
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current) return;

        const dx = e.clientX - pointerStartRef.current.x;
        const dy = e.clientY - pointerStartRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 5) {
            hasMovedRef.current = true;
        }

        const bounds = getBounds();
        let targetX = buttonStartRef.current.x + dx;
        let targetY = buttonStartRef.current.y + dy;

        // Soft elastic clamp at screen edges
        if (targetX < bounds.minX) {
            targetX = bounds.minX - Math.pow(bounds.minX - targetX, 0.75);
        } else if (targetX > bounds.maxX) {
            targetX = bounds.maxX + Math.pow(targetX - bounds.maxX, 0.75);
        }

        if (targetY < bounds.minY) {
            targetY = bounds.minY - Math.pow(bounds.minY - targetY, 0.75);
        } else if (targetY > bounds.maxY) {
            targetY = bounds.maxY + Math.pow(targetY - bounds.maxY, 0.75);
        }

        const now = performance.now();
        dragHistoryRef.current.push({ x: e.clientX, y: e.clientY, time: now });
        if (dragHistoryRef.current.length > 5) {
            dragHistoryRef.current.shift();
        }

        // Direct 1:1 tactile movement without cartoon squash/stretch deformation
        updateDOM(targetX, targetY);
    };

    const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current) return;
        isDraggingRef.current = false;
        setIsDraggingState(false);

        try {
            e.currentTarget.releasePointerCapture(e.pointerId);
        } catch {
            // ignore
        }

        // Pure click/tap: Open WhatsApp directly
        if (!hasMovedRef.current) {
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            return;
        }

        // Subtle inertial release calculation
        const history = dragHistoryRef.current;
        let vx = 0;
        let vy = 0;

        if (history.length >= 2) {
            const latest = history[history.length - 1];
            const older = history[0];
            const dt = Math.max(16, latest.time - older.time);
            vx = ((latest.x - older.x) / dt) * 16.67;
            vy = ((latest.y - older.y) / dt) * 16.67;
        }

        snapToEdge(posRef.current.x, posRef.current.y, vx, vy);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <div
            ref={buttonRef}
            role="button"
            tabIndex={0}
            aria-label="WhatsApp-Chat mit Deniz Tezgel starten (Mit Finger oder Maus frei an die Bildschirmkante ziehbar)"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onKeyDown={handleKeyDown}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                transform: `translate3d(${initialPos.x}px, ${initialPos.y}px, 0px)`,
                zIndex: 50,
                touchAction: 'none',
                userSelect: 'none',
                WebkitUserSelect: 'none',
                cursor: isDraggingState ? 'grabbing' : 'grab',
                willChange: 'transform'
            }}
            className="group outline-none"
        >
            <div
                className={`relative w-[56px] h-[56px] sm:w-[62px] sm:h-[62px] transition-transform duration-200 ${
                    isDraggingState ? 'scale-105' : 'hover:scale-[1.03]'
                }`}
            >
                {/* Hyperrealistic Handcrafted/Sketch WhatsApp Icon */}
                <svg
                    viewBox="-1.5 -1.5 19 19"
                    aria-hidden="true"
                    className="w-full h-full select-none pointer-events-none drop-shadow-[0_8px_16px_rgba(4,32,15,0.38)]"
                >
                    <defs>
                        {/* Organic hand-drawn pen/pencil roughness filter */}
                        <filter id="wa-sketch-roughness" x="-30%" y="-30%" width="160%" height="160%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.38" xChannelSelector="R" yChannelSelector="G" result="displaced" />
                        </filter>

                        {/* Craftsman Green Marker Gradient */}
                        <linearGradient id="wa-marker-fill" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#28E26F" />
                            <stop offset="45%" stopColor="#20BD5A" />
                            <stop offset="80%" stopColor="#159346" />
                            <stop offset="100%" stopColor="#0D6A32" />
                        </linearGradient>

                        {/* Hand-drawn pencil hatching pattern (Schraffur) */}
                        <pattern id="wa-sketch-hatch" width="1.4" height="1.4" patternTransform="rotate(42 0 0)" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="0" x2="0" y2="1.4" stroke="#063B19" strokeWidth="0.16" strokeOpacity="0.35" strokeDasharray="1.4 0.2" />
                        </pattern>

                        {/* Cross hatching for deep craftsman volume */}
                        <pattern id="wa-sketch-crosshatch" width="1.8" height="1.8" patternTransform="rotate(-35 0 0)" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="0" x2="0" y2="1.8" stroke="#042810" strokeWidth="0.14" strokeOpacity="0.22" />
                        </pattern>
                    </defs>

                    {/* 1. Underlying Graphite Contact Shadow */}
                    <path
                        d={BUBBLE_PATH}
                        fill="#021609"
                        opacity="0.25"
                        filter="url(#wa-sketch-roughness)"
                        transform="translate(0.35, 0.55)"
                    />

                    {/* Main Handcrafted Sketch Group */}
                    <g filter="url(#wa-sketch-roughness)">
                        {/* 2. Preliminary Bleistift-Vorzeichnung (construction pencil lines) */}
                        <path
                            d={BUBBLE_PATH}
                            fill="none"
                            stroke="#1F2937"
                            strokeWidth="0.35"
                            strokeOpacity="0.4"
                            transform="translate(-0.1, -0.08)"
                        />
                        <path
                            d={BUBBLE_PATH}
                            fill="none"
                            stroke="#374151"
                            strokeWidth="0.2"
                            strokeOpacity="0.35"
                            transform="translate(0.18, 0.15)"
                        />

                        {/* 3. Rich Green Marker/Colored-Pencil Fill */}
                        <path d={BUBBLE_PATH} fill="url(#wa-marker-fill)" />

                        {/* 4. Diagonal Hand-drawn Hatching (Schraffur) */}
                        <path d={BUBBLE_PATH} fill="url(#wa-sketch-hatch)" />

                        {/* 5. Cross-Hatching for 3D Volume */}
                        <path d={BUBBLE_PATH} fill="url(#wa-sketch-crosshatch)" />

                        {/* 6. Dark Fineliner Primary Contour */}
                        <path
                            d={BUBBLE_PATH}
                            fill="none"
                            stroke="#062D15"
                            strokeWidth="0.52"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />

                        {/* 7. Secondary Hand-sketched Contour (Überzeichnung) */}
                        <path
                            d={SECONDARY_SKETCH_CONTOUR}
                            fill="none"
                            stroke="#03180B"
                            strokeWidth="0.22"
                            strokeOpacity="0.7"
                            strokeDasharray="5, 0.8, 2.5, 0.6"
                        />

                        {/* 8. White Chalk / Gel Pen Highlight Strokes */}
                        <path
                            d="M3.2 4.4 A 6.6 6.6 0 0 1 10.8 1.4"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="0.55"
                            strokeLinecap="round"
                            strokeOpacity="0.75"
                        />
                        <path
                            d="M4.5 3.2 A 6.0 6.0 0 0 1 8.8 1.8"
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="0.25"
                            strokeLinecap="round"
                            strokeOpacity="0.9"
                        />

                        {/* 9. Handset Charcoal Contact Shadow */}
                        <path
                            d={HANDSET_PATH}
                            fill="#03220F"
                            opacity="0.4"
                            transform="translate(0.18, 0.25)"
                        />

                        {/* 10. Handset Body - Opaque Drafting White with Dark Fineliner Outline */}
                        <path
                            d={HANDSET_PATH}
                            fill="#FAFAF9"
                            stroke="#092A16"
                            strokeWidth="0.32"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />

                        {/* 11. Handset Secondary Sketch Contour Accent */}
                        <path
                            d={HANDSET_PATH}
                            fill="none"
                            stroke="#1E293B"
                            strokeWidth="0.18"
                            strokeOpacity="0.6"
                            transform="translate(-0.06, -0.06)"
                        />

                        {/* 12. Handset Inner Ergonomic Volume Line */}
                        <path
                            d="M4.8 6.4 C6.2 8.6 7.6 10.0 9.8 11.4"
                            fill="none"
                            stroke="#CBD5E1"
                            strokeWidth="0.35"
                            strokeLinecap="round"
                            strokeOpacity="0.6"
                        />
                    </g>
                </svg>

                {/* Desktop Hover Tooltip (adapts based on left/right docking) */}
                {!isDraggingState && isHovered && (
                    <div
                        className={`hidden md:flex absolute top-1/2 -translate-y-1/2 ${
                            currentSide === 'left' ? 'left-full ml-3.5' : 'right-full mr-3.5'
                        } px-3 py-1.5 rounded-xl bg-neutral-900/95 backdrop-blur-md text-white text-[11px] font-medium whitespace-nowrap shadow-xl border border-white/10 pointer-events-none items-center gap-2 animate-in fade-in duration-150`}
                    >
                        <span>WhatsApp an Deniz Tezgel</span>
                        <span className="text-[10px] text-emerald-400 font-mono font-semibold bg-emerald-950/80 px-1.5 py-0.5 rounded border border-emerald-500/30">
                            Direktkontakt
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
