"use client";
import React, { useEffect, useRef } from 'react';
import { abonniereBewegung, bewegungRuhig } from '@/lib/motion/schalter';

/**
 * Reading Progress Bar Component
 * Zeigt den Scrollfortschritt als 2-px-Linie in Laser am oberen Rand. Der Anteil (0–1) zieht die Linie über scale auf
 * (Klasse lesefortschritt-linie, ohne Übergang). Kennung `leitachse` (K-007: die rote Linie wird beim Scrollen gezogen);
 * bei reduzierter Bewegung, bei „ruhig“ und im Druck entfällt sie – die Markierung im Inhaltsverzeichnis zeigt die Stelle
 * (E3-SICHT-2-ARB Befund 27).
 * Ohne Prozentfeld (E4-NACH-15 Nachtrag, E3-SICHT-ARB Befunde 33/35): die Linie zeigt den Fortschritt; ein schwebendes Feld
 * lag als feste Ebene über Kopf bzw. Text.
 * Ohne Scroll-Ereignis (UM-E3-SCROLL, K-008): Wo der Browser Scroll-Zeitstrahlen kennt, zieht globals.css die Linie
 * (animation-timeline: scroll()), hier läuft dann nichts. Sonst setzt ein IntersectionObserver die Variable
 * --lesefortschritt (Rückfall), ohne React-Zustand und ohne Layout zu lesen.
 */

// Rückfall: Beobachtet wird <body>. Die Wurzel ist der Bildschirm, nach oben weit offen; sie endet am unteren Bildrand. In ihr
// liegt der Teil von <body> über dem unteren Bildrand, also Bildhöhe plus Scrollstand: Sein Anteil wächst linear mit dem
// Scrollen, und der Beobachter meldet jede Hundertstelstufe. Offen um 10⁶ px, weit mehr als jede Seite hoch ist.
const NACH_OBEN_OFFEN = '1000000px 0px 0px 0px';
const STUFEN = Array.from({ length: 101 }, (_, i) => i / 100);

/** Anteil des Scrollwegs (0–1) aus einem Eintrag des Beobachters; Seiten ohne Scrollweg zeigen 0. */
function anteil({ boundingClientRect: seite, rootBounds }) {
    const sicht = rootBounds ? rootBounds.bottom : window.innerHeight;
    const weg = seite.height - sicht;
    return weg > 0 ? Math.min(1, Math.max(0, -seite.top / weg)) : 0;
}

const ReadingProgress = () => {
    const linieRef = useRef(null);

    useEffect(() => {
        const linie = linieRef.current;
        if (!linie || typeof IntersectionObserver === 'undefined') return undefined;
        if (typeof CSS !== 'undefined' && CSS.supports?.('animation-timeline: scroll()')) return undefined;

        const html = document.documentElement;
        let beobachter = null;
        // Wie die CSS-Fassung nur mit Startklasse und ohne Notaus (E-080); bei reduzierter Bewegung und „ruhig“ ist die
        // Linie ausgeblendet. Das Notaus setzt das Kopfskript ohne Ereignis: Darum prüft auch jede Meldung die Klassen und
        // stellt die Linie dann still (zurück auf 0 wie in der CSS-Fassung).
        const frei = () => html.classList.contains('k-bewegung') && !html.classList.contains('k-notaus');
        const stellen = () => {
            const an = frei() && !bewegungRuhig();
            if (an && !beobachter) {
                beobachter = new IntersectionObserver((eintraege) => {
                    if (!frei()) {
                        stellen();
                        return;
                    }
                    linie.style.setProperty('--lesefortschritt', String(anteil(eintraege[eintraege.length - 1])));
                }, { rootMargin: NACH_OBEN_OFFEN, threshold: STUFEN });
                beobachter.observe(document.body);
            } else if (!an && beobachter) {
                beobachter.disconnect();
                beobachter = null;
                linie.style.removeProperty('--lesefortschritt');
            }
        };

        stellen();
        const abmelden = abonniereBewegung(stellen);
        return () => {
            abmelden();
            beobachter?.disconnect();
        };
    }, []);

    return (
        <>
            <div className="fixed inset-x-0 top-0 z-40 h-0 motion-reduce:hidden ruhig:hidden print:hidden">
                <div
                    ref={linieRef}
                    aria-hidden="true"
                    data-motion="leitachse"
                    className="lesefortschritt-linie h-0 origin-left scale-x-0 border-t-2 border-laser"
                />
            </div>

        </>
    );
};

export default ReadingProgress;
