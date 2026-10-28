"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { etikettKlassen } from '@/components/kern/stile';
import { naechstesBild } from '@/lib/motion/takt';

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
        let abmelden = null;

        // Aktiv ist der Abschnitt, dessen Überschrift zuletzt die Kopfunterkante passiert hat. Die Kante liegt bei
        // scroll-padding-top (globals.css); dorthin springt auch der Klick aus dem Verzeichnis.
        const aktualisieren = () => {
            abmelden = null;
            const kante = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
            let aktiv = '';
            headings.forEach(({ id }) => {
                const element = document.getElementById(id);
                if (element && element.getBoundingClientRect().top <= kante + 1) aktiv = id;
            });
            setActiveId(aktiv);
        };

        const planen = () => {
            if (!abmelden) abmelden = naechstesBild(aktualisieren);
        };

        planen();
        window.addEventListener('scroll', planen, { passive: true });
        window.addEventListener('resize', planen);

        return () => {
            window.removeEventListener('scroll', planen);
            window.removeEventListener('resize', planen);
            abmelden?.();
        };
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <div>
            <p className={`${etikettKlassen} mb-4`}>Inhalt</p>
            <nav aria-label="Inhaltsverzeichnis" className="border-t border-fuge">
                {headings.map(({ id, text, level }) => (
                    <a
                        key={id}
                        href={`#${id}`}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
                            setActiveId(id);
                        }}
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
