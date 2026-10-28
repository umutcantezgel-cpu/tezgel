"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { etikettKlassen } from '@/components/kern/stile';
import { naechstesBild } from '@/lib/motion/takt';

// Aktiv ist der Abschnitt, dessen Überschrift zuletzt die Kopfunterkante passiert hat. Die Kante liegt bei scroll-padding-top
// (globals.css); dorthin springt auch der Anker aus dem Verzeichnis. Ohne Scroll-Ereignis (UM-E3-SCROLL, K-008): Ein
// IntersectionObserver meldet jedes Kreuzen der Kante. Seine Wurzel ist der Bildschirm bis zur Kante, nach oben weit offen;
// darin liegt genau jede Überschrift, die die Kante erreicht oder passiert hat, auch nach einem weiten Sprung (Anker, Zurück,
// Seitensuche). Neu aufgebaut wird er nur, wenn sich die Fensterhöhe ändert. Offen um 10⁶ px, weit mehr als jede Seite hoch ist.
const NACH_OBEN_OFFEN = 1000000;
const PASSIV = { passive: true };

const TableOfContents = ({ content }) => {
    const [activeId, setActiveId] = useState('');

    const headings = useMemo(() => {
        const lines = (content ?? '').split('\n');
        return lines
            .filter(line => line.trim().startsWith('## ') || line.trim().startsWith('### '))
            .map(line => {
                const trimmedLine = line.trim();
                const level = trimmedLine.match(/^#+/)[0].length;
                const text = trimmedLine.replace(/^#+\s+/, '');
                const plainText = text.replace(/[*_\[\]()]+/g, '');
                const id = plainText.toLowerCase().replace(/[^a-z0-9äöüß]+/g, '-').replace(/(^-|-$)+/g, '');
                return { id, text, level };
            });
    }, [content]);

    useEffect(() => {
        if (headings.length === 0 || typeof IntersectionObserver === 'undefined') return undefined;
        const html = document.documentElement;
        const vorbei = new Map();
        let beobachter = null;
        let geplant = null;

        const melden = (eintraege) => {
            for (const e of eintraege) vorbei.set(e.target.id, e.isIntersecting);
            let aktiv = '';
            headings.forEach(({ id }) => {
                if (vorbei.get(id)) aktiv = id;
            });
            setActiveId(aktiv);
        };

        const beobachten = () => {
            geplant = null;
            beobachter?.disconnect();
            vorbei.clear();
            const kante = parseFloat(getComputedStyle(html).scrollPaddingTop) || 0;
            // Unterkante der Wurzel auf der Kante (+1 px wie zuvor: eine Überschrift genau an der Kante zählt schon)
            const unten = Math.max(0, window.innerHeight - kante - 1);
            beobachter = new IntersectionObserver(melden, { rootMargin: `${NACH_OBEN_OFFEN}px 0px ${-unten}px 0px` });
            headings.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element) beobachter.observe(element);
            });
        };

        const planen = () => {
            if (!geplant) geplant = naechstesBild(beobachten);
        };

        beobachten();
        window.addEventListener('resize', planen, PASSIV);

        return () => {
            window.removeEventListener('resize', planen, PASSIV);
            geplant?.();
            beobachter?.disconnect();
        };
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div>
            <p className={`${etikettKlassen} mb-4`}>Inhalt</p>
            <nav aria-label="Inhaltsverzeichnis" className="border-t border-fuge">
                {headings.map(({ id, text, level }) => (
                    // Anker wie überall auf der Seite (UM-E3-SCROLL): Der Browser springt bis zu scroll-padding-top, weich nur mit
                    // Bewegung (html scroll-behavior, reduziert und „ruhig“ sofort), mit Adresse, Zurück-Taste und Tab-Startpunkt
                    // an der Überschrift; B-01 stempelt den Eintrag, der Sprunghalter hält das Ziel. Die Markierung folgt sofort.
                    <a
                        key={id}
                        href={`#${id}`}
                        onClick={() => setActiveId(id)}
                        aria-current={activeId === id ? 'location' : undefined}
                        data-motion="zustand"
                        className={`flex min-h-11 items-center border-b border-l-2 border-fuge py-2 pl-4 pr-2 text-fs-2 ${level === 3 ? 'ml-4' : 'ml-0'} ${activeId === id
                            ? 'border-l-tinte font-semibold text-tinte'
                            : 'border-l-transparent text-tinte-2 hover:border-l-strich hover:text-tinte'
                            }`}
                    >
                        {text}
                    </a>
                ))}
            </nav>
        </div>
    );
};

export default TableOfContents;
