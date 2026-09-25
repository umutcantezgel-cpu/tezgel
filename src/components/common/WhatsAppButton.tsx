"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { COMPANY_DATA } from '@/config/company';

interface StoredPosition {
    side: 'left' | 'right';
    yRatio: number;
}

const getButtonSize = () => {
    if (typeof window === 'undefined') return 58;
    return window.innerWidth < 640 ? 54 : 58;
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
    const squashScaleRef = useRef({ sx: 1, sy: 1, angle: 0 });

    const [isHovered, setIsHovered] = useState(false);
    const [isDraggingState, setIsDraggingState] = useState(false);

    const message = "Hallo Herr Tezgel, ich interessiere mich für Ihre Fliesen- und Sanierungsarbeiten. Bitte melden Sie sich bei mir.";
    const whatsappUrl = `${COMPANY_DATA.contact.whatsappLink}?text=${encodeURIComponent(message)}`;

    const updateDOM = useCallback((x: number, y: number, sx = 1, sy = 1, angle = 0) => {
        if (!buttonRef.current) return;
        posRef.current = { x, y };
        squashScaleRef.current = { sx, sy, angle };
        buttonRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate(${angle}deg) scale(${sx}, ${sy})`;
    }, []);

    // Save docked position in sessionStorage
    const savePosition = useCallback((x: number, y: number) => {
        try {
            const bounds = getBounds();
            const side: 'left' | 'right' = x < (bounds.minX + bounds.maxX) / 2 ? 'left' : 'right';
            const rangeY = bounds.maxY - bounds.minY || 1;
            const yRatio = Math.max(0, Math.min(1, (y - bounds.minY) / rangeY));
            const data: StoredPosition = { side, yRatio };
            sessionStorage.setItem('tezgel_wa_button_pos', JSON.stringify(data));
        } catch {
            // Ignore storage quota/security restrictions
        }
    }, []);

    // Spring snap to nearest lateral edge
    const snapToEdge = useCallback((startX: number, startY: number) => {
        const bounds = getBounds();
        const targetX = startX < (bounds.minX + bounds.maxX) / 2 ? bounds.minX : bounds.maxX;
        const targetY = Math.max(bounds.minY, Math.min(bounds.maxY, startY));

        let currentX = startX;
        let currentY = startY;
        let currentSx = squashScaleRef.current.sx;
        let currentSy = squashScaleRef.current.sy;

        const animateSnap = () => {
            const dx = targetX - currentX;
            const dy = targetY - currentY;
            const dsx = 1 - currentSx;
            const dsy = 1 - currentSy;

            currentX += dx * 0.22;
            currentY += dy * 0.22;
            currentSx += dsx * 0.25;
            currentSy += dsy * 0.25;

            if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5 && Math.abs(dsx) < 0.01 && Math.abs(dsy) < 0.01) {
                updateDOM(targetX, targetY, 1, 1, 0);
                savePosition(targetX, targetY);
                animFrameRef.current = null;
                return;
            }

            updateDOM(currentX, currentY, currentSx, currentSy, 0);
            animFrameRef.current = requestAnimationFrame(animateSnap);
        };

        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = requestAnimationFrame(animateSnap);
    }, [updateDOM, savePosition]);

    // Fling physics with edge bouncing and squash deformation
    const flingPhysicsLoop = useCallback((initialVx: number, initialVy: number) => {
        let vx = Math.max(-42, Math.min(42, initialVx));
        let vy = Math.max(-42, Math.min(42, initialVy));
        let x = posRef.current.x;
        let y = posRef.current.y;
        let squashX = 1;
        let squashY = 1;
        const friction = 0.962;
        const bounceRestitution = 0.70;

        const loop = () => {
            const bounds = getBounds();
            x += vx;
            y += vy;
            vx *= friction;
            vy *= friction;

            // Bounce horizontal
            if (x <= bounds.minX) {
                x = bounds.minX;
                vx = -vx * bounceRestitution;
                squashX = 0.76;
                squashY = 1.28;
                if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
                    try { navigator.vibrate(8); } catch {}
                }
            } else if (x >= bounds.maxX) {
                x = bounds.maxX;
                vx = -vx * bounceRestitution;
                squashX = 0.76;
                squashY = 1.28;
                if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
                    try { navigator.vibrate(8); } catch {}
                }
            }

            // Bounce vertical
            if (y <= bounds.minY) {
                y = bounds.minY;
                vy = -vy * bounceRestitution;
                squashY = 0.76;
                squashX = 1.28;
                if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
                    try { navigator.vibrate(8); } catch {}
                }
            } else if (y >= bounds.maxY) {
                y = bounds.maxY;
                vy = -vy * bounceRestitution;
                squashY = 0.76;
                squashX = 1.28;
                if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
                    try { navigator.vibrate(8); } catch {}
                }
            }

            // Recover squash towards 1.0
            squashX += (1 - squashX) * 0.18;
            squashY += (1 - squashY) * 0.18;

            const speed = Math.sqrt(vx * vx + vy * vy);

            // In flight: subtle stretch along velocity vector
            let angle = 0;
            let finalSx = squashX;
            let finalSy = squashY;

            if (speed > 2.5 && Math.abs(squashX - 1) < 0.1) {
                angle = (Math.atan2(vy, vx) * 180) / Math.PI;
                const stretch = 1 + Math.min(0.22, speed * 0.007);
                finalSx = stretch;
                finalSy = 1 / stretch;
            }

            updateDOM(x, y, finalSx, finalSy, angle);

            // When speed is low enough, snap into edge smoothly
            if (speed < 1.3) {
                snapToEdge(x, y);
                return;
            }

            animFrameRef.current = requestAnimationFrame(loop);
        };

        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = requestAnimationFrame(loop);
    }, [updateDOM, snapToEdge]);

    // Handle mount and screen resize safely
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
            // pointer capture not supported on older browsers
        }
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
        if (!isDraggingRef.current) return;

        const dx = e.clientX - pointerStartRef.current.x;
        const dy = e.clientY - pointerStartRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 4) {
            hasMovedRef.current = true;
        }

        const bounds = getBounds();
        let targetX = buttonStartRef.current.x + dx;
        let targetY = buttonStartRef.current.y + dy;

        // Elastic overshoot resistance outside viewport bounds
        if (targetX < bounds.minX) {
            targetX = bounds.minX - Math.pow(bounds.minX - targetX, 0.78);
        } else if (targetX > bounds.maxX) {
            targetX = bounds.maxX + Math.pow(targetX - bounds.maxX, 0.78);
        }

        if (targetY < bounds.minY) {
            targetY = bounds.minY - Math.pow(bounds.minY - targetY, 0.78);
        } else if (targetY > bounds.maxY) {
            targetY = bounds.maxY + Math.pow(targetY - bounds.maxY, 0.78);
        }

        const now = performance.now();
        dragHistoryRef.current.push({ x: e.clientX, y: e.clientY, time: now });
        if (dragHistoryRef.current.length > 6) {
            dragHistoryRef.current.shift();
        }

        // Dynamic slight drag squash & orientation angle
        const angle = dist > 6 ? (Math.atan2(dy, dx) * 180) / Math.PI : 0;
        const stretch = dist > 6 ? Math.min(1.12, 1 + dist * 0.0006) : 1;
        updateDOM(targetX, targetY, stretch, 1 / stretch, angle);
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

        // If pure click without movement: open WhatsApp URL
        if (!hasMovedRef.current) {
            updateDOM(posRef.current.x, posRef.current.y, 0.9, 0.9, 0);
            setTimeout(() => {
                updateDOM(posRef.current.x, posRef.current.y, 1, 1, 0);
            }, 120);
            window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
            return;
        }

        // Calculate fling release velocity from drag history
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

        const speed = Math.sqrt(vx * vx + vy * vy);

        if (speed > 2.8) {
            flingPhysicsLoop(vx, vy);
        } else {
            snapToEdge(posRef.current.x, posRef.current.y);
        }
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
            aria-label="WhatsApp-Chat mit Deniz Tezgel starten (Mit Maus oder Touch ziehbar und werfbar)"
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
                className={`relative w-[54px] h-[54px] sm:w-[58px] sm:h-[58px] rounded-full flex items-center justify-center transition-shadow duration-300 ${
                    isDraggingState
                        ? 'shadow-[0_20px_35px_-4px_rgba(18,140,126,0.7),0_8px_16px_rgba(0,0,0,0.3)] scale-105'
                        : 'shadow-[0_12px_28px_-4px_rgba(37,211,102,0.55),0_6px_14px_rgba(0,0,0,0.18)] hover:shadow-[0_16px_34px_-4px_rgba(37,211,102,0.7),0_8px_18px_rgba(0,0,0,0.22)]'
                }`}
                style={{
                    background: 'linear-gradient(135deg, #25D366 0%, #20BA5A 50%, #128C7E 100%)'
                }}
            >
                {/* 3D Top Gloss Highlight */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full bg-gradient-to-b from-white/35 via-white/10 to-transparent pointer-events-none"
                />

                {/* Subtle Inner Ring */}
                <div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-full ring-1 ring-white/40 ring-inset pointer-events-none"
                />

                {/* Authentic WhatsApp Icon Vector */}
                <svg
                    viewBox="0 0 32 32"
                    aria-hidden="true"
                    className="w-7 h-7 sm:w-8 sm:h-8 fill-white drop-shadow-sm pointer-events-none select-none"
                >
                    <path d="M16 2a13.9 13.9 0 0 0-12 21L2 30l7.2-1.9A13.9 13.9 0 1 0 16 2zm0 25.5a11.5 11.5 0 0 1-5.9-1.6l-.4-.3-4.4 1.2 1.2-4.3-.3-.4A11.6 11.6 0 1 1 16 27.5zm6.4-8.6c-.3-.2-2-.1-2.3-1.1s-.6-.3-.8.3-.8 1-1 1.2c-.2.2-.4.2-.7.1a9.2 9.2 0 0 1-2.7-1.7 10.2 10.2 0 0 1-1.9-2.3c-.2-.3 0-.5.1-.7s.3-.4.5-.6c.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.8-2-1.1-2.7c-.3-.7-.6-.6-.8-.6h-.7a1.4 1.4 0 0 0-1 .5 4.3 4.3 0 0 0-1.3 3.2 7.6 7.6 0 0 0 1.6 4 17.5 17.5 0 0 0 6.7 5.9c4 1.6 4 1.1 4.7 1a4 4 0 0 0 2.7-1.9 3.3 3.3 0 0 0 .2-1.9c-.2-.1-.5-.2-.8-.4z" />
                </svg>

                {/* Desktop Hover Tooltip */}
                {!isDraggingState && isHovered && (
                    <div
                        className="hidden md:flex absolute top-1/2 -translate-y-1/2 right-full mr-3.5 px-3 py-1.5 rounded-xl bg-neutral-900/95 backdrop-blur-sm text-white text-[11px] font-bold whitespace-nowrap shadow-xl border border-white/10 pointer-events-none items-center gap-1.5 animate-in fade-in zoom-in-95 duration-150"
                    >
                        <span>WhatsApp an Deniz Tezgel</span>
                        <span className="text-[10px] text-green-400 font-mono">24/7</span>
                    </div>
                )}
            </div>
        </div>
    );
}
