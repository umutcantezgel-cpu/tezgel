"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { COMPANY_DATA } from '@/config/company';

interface StoredPosition {
    side: 'left' | 'right';
    yRatio: number;
}

const getButtonSize = () => {
    if (typeof window === 'undefined') return 60;
    return window.innerWidth < 640 ? 56 : 60;
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

// WhatsApp vector paths (speech bubble and telephone receiver)
const BUBBLE_OUTLINE = "M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326z";
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
        const projectedX = startX + vx * 6;
        const targetX = projectedX < (bounds.minX + bounds.maxX) / 2 ? bounds.minX : bounds.maxX;
        const projectedY = startY + vy * 5;
        const targetY = Math.max(bounds.minY, Math.min(bounds.maxY, projectedY));

        let currentX = startX;
        let currentY = startY;

        const animateSnap = () => {
            const dx = targetX - currentX;
            const dy = targetY - currentY;

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
                className={`relative w-[56px] h-[56px] sm:w-[60px] sm:h-[60px] rounded-full transition-transform duration-200 ${
                    isDraggingState ? 'scale-105' : 'hover:scale-[1.03]'
                }`}
            >
                {/* Normaler runder WhatsApp-Button wie mit grünem und weißem Bleistift gezeichnet */}
                <svg
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                    className="w-full h-full select-none pointer-events-none drop-shadow-[0_8px_18px_rgba(4,32,15,0.36)]"
                >
                    <defs>
                        {/* Organischer Buntstift-Filter (Papierabrieb und natürliche Linien-Rauheit) */}
                        <filter id="pencil-rough-edge" x="-15%" y="-15%" width="130%" height="130%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="3" result="roughness" />
                            <feDisplacementMap in="SourceGraphic" in2="roughness" scale="0.65" xChannelSelector="R" yChannelSelector="G" />
                        </filter>

                        {/* Grüner Buntstift-Strichverlauf (parallele Stiftstriche im 38° Winkel) */}
                        <pattern id="green-pencil-hatch" width="1.6" height="1.6" patternTransform="rotate(38 0 0)" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="0" x2="0" y2="1.6" stroke="#15803D" strokeWidth="0.35" strokeOpacity="0.45" />
                            <line x1="0.8" y1="0" x2="0.8" y2="1.6" stroke="#0B5327" strokeWidth="0.2" strokeOpacity="0.3" />
                        </pattern>

                        {/* Kreuzschraffur für plastische Buntstift-Schattierung unten-rechts */}
                        <pattern id="green-cross-hatch" width="2.2" height="2.2" patternTransform="rotate(-35 0 0)" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="0" x2="0" y2="2.2" stroke="#064E24" strokeWidth="0.25" strokeOpacity="0.35" />
                        </pattern>

                        {/* Grüner Buntstift-Kern-Verlauf */}
                        <radialGradient id="green-pencil-base" cx="38%" cy="35%" r="65%">
                            <stop offset="0%" stopColor="#22C55E" />
                            <stop offset="50%" stopColor="#16A34A" />
                            <stop offset="85%" stopColor="#15803D" />
                            <stop offset="100%" stopColor="#0E5A29" />
                        </radialGradient>
                    </defs>

                    {/* 1. Weicher Graphit-Papierschatten */}
                    <circle cx="32.5" cy="33.5" r="28" fill="#031A0B" opacity="0.22" filter="url(#pencil-rough-edge)" />

                    {/* 2. Runder Button-Grundkörper mit grünem Buntstift koloriert */}
                    <g filter="url(#pencil-rough-edge)">
                        {/* Grüner Buntstift Farbauftrag */}
                        <circle cx="32" cy="32" r="28" fill="url(#green-pencil-base)" />

                        {/* Buntstift-Schraffur Strichstrukturen */}
                        <circle cx="32" cy="32" r="28" fill="url(#green-pencil-hatch)" />
                        <circle cx="32" cy="32" r="28" fill="url(#green-cross-hatch)" />

                        {/* Handgezeichnete runde Kreisbegrenzung (dunkelgrüner/Graphit-Buntstift) */}
                        <circle cx="32" cy="32" r="27.8" fill="none" stroke="#073C19" strokeWidth="0.9" strokeLinecap="round" />
                        {/* Feiner skizzierter Zweitstrich */}
                        <circle cx="32.1" cy="31.9" r="27.5" fill="none" stroke="#042610" strokeWidth="0.4" strokeOpacity="0.6" strokeDasharray="20, 2, 8, 3" />

                        {/* Weißer Buntstift-Lichtbogen am oberen linken Rand des runden Buttons */}
                        <path d="M12 24 A26 26 0 0 1 32 6" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeLinecap="round" strokeOpacity="0.65" />
                    </g>

                    {/* 3. WhatsApp-Symbol im Zentrum MIT WEISSEM BUNTSTIFT GEZEICHNET */}
                    <g transform="translate(14, 14) scale(2.25)" filter="url(#pencil-rough-edge)">
                        {/* Dezent schattierter Graphit-Strich unter dem weißen Buntstift */}
                        <path
                            d={BUBBLE_OUTLINE}
                            fill="none"
                            stroke="#063116"
                            strokeWidth="1.4"
                            strokeOpacity="0.35"
                            transform="translate(0.2, 0.3)"
                        />

                        {/* Weißer Buntstift: Hauptkontur der WhatsApp-Sprechblase */}
                        <path
                            d={BUBBLE_OUTLINE}
                            fill="none"
                            stroke="#FFFFFF"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeOpacity="0.95"
                        />
                        {/* Feiner handgezeichneter Zweitstrich der Sprechblase */}
                        <path
                            d={SECONDARY_SKETCH_CONTOUR}
                            fill="none"
                            stroke="#F8FAFC"
                            strokeWidth="0.35"
                            strokeOpacity="0.65"
                            strokeDasharray="4, 0.8, 2, 0.6"
                        />

                        {/* Telefonhörer-Schatten */}
                        <path
                            d={HANDSET_PATH}
                            fill="#052812"
                            opacity="0.4"
                            transform="translate(0.18, 0.25)"
                        />

                        {/* Weißer Buntstift: Telefonhörer-Körper */}
                        <path
                            d={HANDSET_PATH}
                            fill="#FFFFFF"
                            stroke="#FFFFFF"
                            strokeWidth="0.3"
                            strokeLinejoin="round"
                            strokeLinecap="round"
                        />

                        {/* Zarter Graphit-Akzent auf dem Hörer */}
                        <path
                            d={HANDSET_PATH}
                            fill="none"
                            stroke="#1E3A29"
                            strokeWidth="0.15"
                            strokeOpacity="0.4"
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
