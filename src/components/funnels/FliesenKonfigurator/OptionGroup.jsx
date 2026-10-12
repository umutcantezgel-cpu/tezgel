import { chipOptionClass, hintClass, legendClass } from './stile';

// Auswahlgruppe (Q-05, KERN v2): Legende als Beschriftung über der Gruppe, Auswahlknöpfe mit wahlKlassen
// (aria-pressed = Tinte-Fläche, Farbwechsel ohne Überblendung). Rollen, Namen und Verhalten unverändert.
// Spalten nach Behälterbreite (@container im Konfigurator); Vorgabe: einspaltig, ab 28 rem zwei, ab 36 rem drei Spalten.
export default function OptionGroup({ legend, options, value, onChange, multi = false, columns = 'grid-cols-1 @md:grid-cols-2 @xl:grid-cols-3', hint }) {
    return (
        <fieldset className="min-w-0">
            <legend className={legendClass}>{legend}</legend>
            {hint && <p className={hintClass}>{hint}</p>}
            <div className={`mt-2 grid ${columns} gap-2`}>
                {options.map((o) => {
                    const selected = multi ? value.includes(o.id) : value === o.id;
                    return (
                        <button
                            key={o.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => onChange(o.id)}
                            className={chipOptionClass}
                        >
                            {o.label ?? o.title}
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}
