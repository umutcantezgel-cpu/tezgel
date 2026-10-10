import Link from 'next/link';
import { Check } from 'lucide-react';
import { ROOM_OPTIONS, toggleInList } from './logik';
import { cardOptionClass, linkClass } from './stile';

// Schritt 1: Bereiche (E-011: aus FliesenKonfigurator.jsx verschoben, Markup unverändert).
export default function Schritt1({ data, update }) {
    return (
        <div className="space-y-5">
            <fieldset>
                <legend className="sr-only">Raum und Einsatzbereich (Mehrfachauswahl)</legend>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                                    <span className="block font-black text-slate-900 text-sm">{r.title}</span>
                                    {selected && <Check className="w-4 h-4 text-orange-600" aria-hidden="true" />}
                                </span>
                                <span className="block text-xs text-slate-600 mt-0.5">{r.desc}</span>
                            </button>
                        );
                    })}
                </div>
            </fieldset>

            {data.rooms.includes('bad') && (
                <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sm text-slate-700">
                    <p>
                        Für Bad, Dusche und Gäste-WC gibt es eigene Werkzeuge: den{' '}
                        <Link href="/bad/badplaner" className={linkClass}>Badplaner</Link> und den{' '}
                        <Link href="/bad/projekt-check" className={linkClass}>Bad-Projektcheck</Link>. Sie können das Bad
                        hier trotzdem mit angeben, etwa wenn es Teil eines größeren Projekts ist.
                    </p>
                </div>
            )}

            {data.rooms.length === 0 && (
                <p id="konfigurator-step1-hint" className="text-xs text-slate-700">
                    Bitte wählen Sie mindestens einen Bereich aus.
                </p>
            )}
        </div>
    );
}
