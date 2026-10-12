import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import { ROOM_OPTIONS, toggleInList } from '@/lib/formulare/useFliesenKonfigurator';
import { absatzHintClass, cardOptionClass, linkClass, merkClass, nebenClass } from './stile';

// Schritt 1: Bereiche (Q-05, KERN v2): Kacheln wie die Projektwahl der Express-Anfrage (aria-pressed = Tinte-Fläche,
// Haken bei gewählt). Texte, Namen, IDs und Verhalten unverändert.
export default function Schritt1({ data, update }) {
    return (
        <div className="flex flex-col gap-6">
            <fieldset className="min-w-0">
                <legend className="sr-only">Raum und Einsatzbereich (Mehrfachauswahl)</legend>
                <div className="grid grid-cols-1 gap-2 @xl:grid-cols-2 @4xl:grid-cols-4">
                    {ROOM_OPTIONS.map((r) => {
                        const selected = data.rooms.includes(r.id);
                        return (
                            <button
                                key={r.id}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => update({ rooms: toggleInList(data.rooms, r.id) })}
                                className={cardOptionClass}
                            >
                                <span className="flex items-start justify-between gap-2">
                                    <span className="block text-fs-3 font-semibold">{r.title}</span>
                                    {selected && <Icon name="haken" groesse={5} className="mt-px" />}
                                </span>
                                <span className={`block text-fs-2 ${nebenClass(selected)}`}>{r.desc}</span>
                            </button>
                        );
                    })}
                </div>
            </fieldset>

            {data.rooms.includes('bad') && (
                <div className={merkClass}>
                    <Icon name="info" groesse={5} className="mt-px" />
                    <p>
                        Für Bad, Dusche und Gäste-WC gibt es eigene Werkzeuge: den{' '}
                        <Link href="/bad/badplaner" className={linkClass}>Badplaner</Link> und den{' '}
                        <Link href="/bad/projekt-check" className={linkClass}>Bad-Projektcheck</Link>. Sie können das Bad
                        hier trotzdem mit angeben, etwa wenn es Teil eines größeren Projekts ist.
                    </p>
                </div>
            )}

            {data.rooms.length === 0 && (
                <p id="konfigurator-step1-hint" className={absatzHintClass}>
                    Bitte wählen Sie mindestens einen Bereich aus.
                </p>
            )}
        </div>
    );
}
