"use client";
import { useId } from 'react';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import { feldKlassen, labelKlassen } from '@/components/kern/stile';

// Suchfeld der Ratgeber-Liste (F-03, Fusion E-039), je Ansicht einmal: sichtbare Beschriftung über dem Feld (htmlFor/id,
// K-009) und die Lupe als Schmuck im Feld (B). Das Feld bleibt type="text" (Rolle textbox, Test F-16); Enter sendet
// nichts ab (kein Formular), enterkeyhint und autocomplete="off" passen Tastatur und Vorschläge an die Suche an.

/** Name der Such-Landmarke (role="search") in beiden Ansichten; je Breite ist genau eine im Barrierebaum */
export const SUCHBEREICH_NAME = 'Ratgeber durchsuchen';

export default function Suchfeld({ id, beschriftung, platzhalter, wert, setzen, feldRef, className }) {
    const eigeneId = useId();
    const feldId = id || eigeneId;
    return (
        <div className={className}>
            <label htmlFor={feldId} className={labelKlassen}>{beschriftung}</label>
            <div className="relative">
                <input
                    ref={feldRef}
                    id={feldId}
                    type="text"
                    placeholder={platzhalter}
                    value={wert}
                    onChange={(e) => setzen(e.target.value)}
                    enterKeyHint="search"
                    autoComplete="off"
                    className={clsx(feldKlassen, 'pr-12')}
                />
                <span className="pointer-events-none absolute top-2 right-4 bottom-0 flex items-center text-tinte-2">
                    <Icon name="suche" groesse={5} />
                </span>
            </div>
        </div>
    );
}
