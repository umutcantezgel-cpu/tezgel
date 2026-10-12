import Icon from '@/components/icons/Icon';
import { hilfeKlassen, labelKlassen } from '@/components/kern/stile';
import { cardOptionClass } from './stile';

// Auswahlgruppe im Kartenraster der Schritte 2–4 (aus Schritt2/Schritt3 zusammengeführt, E3-BAU-12/-13): sichtbare
// Legende, optionaler Hilfetext, Karten mit aria-pressed und Haken bei gewählter Karte, Nebentext (desc) je Zustand.
// Einfach- oder Mehrfachwahl (multi: value ist eine Liste). Verhalten und Nutzlast liegen beim Aufrufer (onChange).
export default function Auswahlgruppe({ legend, hint, options, value, multi = false, columns, onChange }) {
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
                            {o.desc && (
                                <span className={`block text-fs-2 ${selected ? 'text-nacht-2' : 'text-tinte-2'}`}>{o.desc}</span>
                            )}
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}
