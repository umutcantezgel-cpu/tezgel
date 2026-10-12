import Link from 'next/link';
import Icon from '@/components/icons/Icon';
import { ROOM_OPTIONS, toggleInList } from '@/lib/formulare/useFliesenKonfigurator';
import OptionGroup from './OptionGroup';
import { absatzHintClass, linkClass, merkClass } from './stile';

// Fachzeichen je Bereich (A, E4-NACH-13, Befund 13): dekorativ neben dem Namen, aus der Icon-Familie (icons/namen.ts)
const RAUM_ZEICHEN = {
    wohnen: 'grossformat',
    kueche: 'fliese',
    flur: 'fliese',
    treppe: 'treppe',
    balkon: 'balkon',
    untergrund: 'untergrund',
    bad: 'bad'
};

// Schritt 1: Bereiche (F-06, Fusion E-039): Fugenraster mit Fachzeichen und Haken (A), mobil einspaltig, ab 36 rem zwei
// Spalten, der siebte Bereich über beide; Merkhinweis auf Kalk (B) mit verstecktem Vorsatz „Hinweis:“ (A) im Zeilenmaß.
// Texte, Namen, IDs und Verhalten unverändert.
export default function Schritt1({ data, update }) {
    return (
        <div className="flex flex-col gap-6">
            <OptionGroup
                legend="Raum und Einsatzbereich (Mehrfachauswahl)"
                legendClassName="sr-only"
                options={ROOM_OPTIONS}
                value={data.rooms}
                multi
                muster="bereiche"
                zeichen={RAUM_ZEICHEN}
                onChange={(id) => update({ rooms: toggleInList(data.rooms, id) })}
            />

            {data.rooms.includes('bad') && (
                <div className={merkClass}>
                    <Icon name="info" groesse={5} className="mt-px" />
                    <p>
                        <span className="sr-only">Hinweis: </span>
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
