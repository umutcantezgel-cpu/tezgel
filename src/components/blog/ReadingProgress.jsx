"use client";
import React, { useState, useEffect } from 'react';

/**
 * Reading Progress Bar Component
 * Zeigt den Scrollfortschritt als 2-px-Linie in Laser am oberen Rand. Der Anteil (0–1) steht in der CSS-Variablen
 * --lesefortschritt; die Klasse lesefortschritt-linie zieht die Linie über scale auf (ohne Übergang). Kennung `leitachse`
 * (K-007: die rote Linie wird beim Scrollen gezogen); bei reduzierter Bewegung und im Druck entfällt sie – die Markierung
 * im Inhaltsverzeichnis zeigt die Stelle (E3-SICHT-2-ARB Befund 27).
 * Ohne Prozentfeld (E4-NACH-15 Nachtrag, E3-SICHT-ARB Befunde 33/35): die Linie zeigt den Fortschritt; ein schwebendes Feld
 * lag als feste Ebene über Kopf bzw. Text.
 */
const ReadingProgress = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const updateProgress = () => {
            // Get scroll position
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // Get total scrollable height
            const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

            // Calculate percentage (Seiten ohne Scrollweg zeigen 0)
            const scrollPercentage = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;

            setProgress(Math.min(scrollPercentage, 100));
        };

        // Update on scroll
        window.addEventListener('scroll', updateProgress);

        // Initial calculation
        updateProgress();

        return () => window.removeEventListener('scroll', updateProgress);
    }, []);

    return (
        <>
            <div className="fixed inset-x-0 top-0 z-40 h-0 motion-reduce:hidden print:hidden">
                <div
                    aria-hidden="true"
                    data-motion="leitachse"
                    className="lesefortschritt-linie h-0 origin-left scale-x-0 border-t-2 border-laser"
                    style={{ '--lesefortschritt': progress / 100 }}
                />
            </div>

        </>
    );
};

export default ReadingProgress;
