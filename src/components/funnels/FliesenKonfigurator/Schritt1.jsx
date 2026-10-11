import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import Hinweis from '@/components/kern/Hinweis';
import { hilfeKlassen } from '@/components/kern/stile';
import { ROOM_OPTIONS, toggleInList } from '@/lib/formulare/useFliesenKonfigurator';
import { cardOptionClass, linkClass } from './stile';

// Schritt 1: Bereiche (E-011: aus FliesenKonfigurator.jsx verschoben; E3-BAU-11: Darstellung nach KERN,
// Texte, IDs, ARIA und Verhalten unverändert).
export default function Schritt1({ data, update }) {
    return (
        <div className="flex flex-col gap-4">
            <fieldset className="m-0 min-w-0 border-0 p-0">
                <legend className="sr-only">Raum und Einsatzbereich (Mehrfachauswahl)</legend>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {ROOM_OPTIONS.map((r) => {
                        const selected = data.rooms.includes(r.id);
                        return (
                            <button
                                key={r.id}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => update({ rooms: toggleInList(data.rooms, r.id) })}
                                className={cardOptionClass(selected)}
                            >
                                <span className="flex items-center justify-between gap-2">
                                    <span className="block text-fs-3 font-semibold">{r.title}</span>
                                    {selected && <Icon name="haken" groesse={4} />}
                                </span>
                                <span className={`block text-fs-2 ${selected ? 'text-nacht-2' : 'text-tinte-2'}`}>{r.desc}</span>
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
