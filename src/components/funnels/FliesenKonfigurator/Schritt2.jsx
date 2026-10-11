import Icon from '@/components/icons/Icon';
import { hilfeKlassen, labelKlassen } from '@/components/kern/stile';
import { SUBSTRATE_OPTIONS, YES_NO, YES_NO_UNSURE, toggleInList } from '@/lib/formulare/useFliesenKonfigurator';
import { cardOptionClass } from './stile';

// Auswahlgruppe im Kartenraster wie in Schritt1 (E3-BAU-11): Legende, Hilfetext, Karten mit aria-pressed.
// Ersetzt die OptionGroup-Chips; Legende, Hinweis, Beschriftung, Reihenfolge und Auswahllogik bleiben gleich.
function Auswahlgruppe({ legend, hint, options, value, multi = false, columns, onChange }) {
    return (
        <fieldset className="m-0 min-w-0 border-0 p-0">
            <legend className={labelKlassen}>{legend}</legend>
            {hint && <p className={hilfeKlassen}>{hint}</p>}
            <div className={`mt-2 grid gap-2 ${columns}`}>
                {options.map((o) => {
                    const selected = multi ? value.includes(o.id) : value === o.id;
                    return (
                        <button
                            key={o.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => onChange(o.id)}
                            className={cardOptionClass(selected)}
                        >
                            <span className="flex items-center justify-between gap-2">
                                <span className="block text-fs-3 font-semibold">{o.label ?? o.title}</span>
                                {selected && <Icon name="haken" groesse={4} />}
                            </span>
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}

// Schritt 2: Untergrund (E-011: aus FliesenKonfigurator.jsx verschoben; E3-BAU-12: Darstellung nach KERN wie Schritt1,
// Texte, IDs, ARIA und Verhalten unverändert).
export default function Schritt2({ data, update }) {
    return (
        <div className="flex flex-col gap-8">
            <Auswahlgruppe
                legend="Untergrund bzw. Bestand (Mehrfachauswahl):"
                hint="Bei mehreren Räumen alles auswählen, was vorkommt."
                options={SUBSTRATE_OPTIONS}
                value={data.substrates}
                multi
                columns="grid-cols-1 sm:grid-cols-2"
                onChange={(id) => {
                    const substrates = toggleInList(data.substrates, id);
                    const patch = { substrates };
                    if (id === 'heizestrich' && substrates.includes('heizestrich')) patch.floorHeating = 'ja';
                    update(patch);
                }}
            />
            <Auswahlgruppe
                legend="Ist eine Fußbodenheizung vorhanden oder geplant?"
                options={YES_NO_UNSURE}
                value={data.floorHeating}
                columns="grid-cols-1 sm:grid-cols-3"
                onChange={(id) => update({ floorHeating: id })}
            />
            <Auswahlgruppe
                legend="Muss ein Altbelag zurückgebaut werden?"
                options={YES_NO_UNSURE}
                value={data.removal}
                columns="grid-cols-1 sm:grid-cols-3"
                onChange={(id) => update({ removal: id })}
            />
            <Auswahlgruppe
                legend="Liegt die Fläche in einem Nassbereich (z. B. Duschbereich, Hauswirtschaftsraum mit Bodenablauf)?"
                options={YES_NO}
                value={data.wetArea}
                columns="grid-cols-2"
                onChange={(id) => update({ wetArea: id })}
            />
        </div>
    );
}
