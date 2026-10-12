import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Hinweis from '@/components/kern/Hinweis';
import { hilfeKlassen } from '@/components/kern/stile';
import { ROOM_OPTIONS, toggleInList } from '@/lib/formulare/useFliesenKonfigurator';
import { linkClass } from './stile';

// Fachzeichen je Bereich (E4-NACH-13, Befund 13): dekorativ neben dem Namen, aus der Icon-Familie (icons/namen.ts)
const RAUM_ZEICHEN = {
    wohnen: 'grossformat',
    kueche: 'fliese',
    flur: 'fliese',
    treppe: 'treppe',
    balkon: 'balkon',
    untergrund: 'untergrund',
    bad: 'bad'
};

// Schritt 1: Bereiche (E-011: aus FliesenKonfigurator.jsx verschoben; E3-BAU-11: Darstellung nach KERN,
// Texte, IDs, ARIA und Verhalten unverändert). E4-NACH-13 (Befunde 13, 14): Auswahl als Feldraster an der Fuge
// (gap-px auf Fuge, Felder Fliese, gewählt Tinte wie die Express-Auswahl), je Feld ein Zeichen; ein einzelnes
// letztes Feld spannt beide Spalten.
export default function Schritt1({ data, update }) {
    const einzeln = ROOM_OPTIONS.length % 2 === 1 ? ROOM_OPTIONS.length - 1 : -1;
    return (
        <div className="flex flex-col gap-4">
            <fieldset className="m-0 min-w-0 border-0 p-0">
                <legend className="sr-only">Raum und Einsatzbereich (Mehrfachauswahl)</legend>
                <div className="grid grid-cols-1 gap-px border border-fuge bg-fuge sm:grid-cols-2">
                    {ROOM_OPTIONS.map((r, i) => {
                        const selected = data.rooms.includes(r.id);
                        return (
                            <button
                                key={r.id}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => update({ rooms: toggleInList(data.rooms, r.id) })}
                                className={`flex min-h-11 w-full items-start gap-4 p-4 text-left font-text ${i === einzeln ? 'sm:col-span-2' : ''} ${
                                    selected ? 'bg-tinte text-kalk hover:bg-tinte-2' : 'bg-fliese text-tinte hover:bg-kalk'
                                }`}
                            >
                                <Icon name={RAUM_ZEICHEN[r.id]} groesse={6} />
                                <span className="flex min-w-0 flex-1 flex-col">
                                    <span className="block text-fs-3 font-semibold">{r.title}</span>
                                    <span className={`mt-1 block text-fs-2 ${selected ? 'text-nacht-2' : 'text-tinte-2'}`}>{r.desc}</span>
                                </span>
                                {selected && <Icon name="haken" groesse={4} />}
                            </button>
                        );
                    })}
                </div>
            </fieldset>

            {data.rooms.includes('bad') && (
                <Hinweis art="merk">
                    <p>
                        Für Bad, Dusche und Gäste-WC gibt es eigene Werkzeuge: den{' '}
                        <Link href="/bad/badplaner" className={linkClass}>Badplaner</Link> und den{' '}
                        <Link href="/bad/projekt-check" className={linkClass}>Bad-Projektcheck</Link>. Sie können das Bad
                        hier trotzdem mit angeben, etwa wenn es Teil eines größeren Projekts ist.
                    </p>
                </Hinweis>
            )}

            {data.rooms.length === 0 && (
                <p id="konfigurator-step1-hint" className={hilfeKlassen}>
                    Bitte wählen Sie mindestens einen Bereich aus.
                </p>
            )}
        </div>
    );
}
