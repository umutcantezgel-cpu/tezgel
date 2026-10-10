import { chipOptionClass, legendClass } from './stile';

// Auswahlgruppe (Karten oder Chips) (E-011: aus FliesenKonfigurator.jsx verschoben, unverändert).
export default function OptionGroup({ legend, options, value, onChange, multi = false, columns = 'grid-cols-2 sm:grid-cols-3', hint }) {
    return (
        <fieldset>
            <legend className={legendClass}>{legend}</legend>
            {hint && <p className="text-xs text-slate-600 -mt-1 mb-2">{hint}</p>}
            <div className={`grid ${columns} gap-2`}>
                {options.map((o) => {
                    const selected = multi ? value.includes(o.id) : value === o.id;
                    return (
                        <button
                            key={o.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => onChange(o.id)}
                            className={chipOptionClass(selected)}
                        >
                            {o.label ?? o.title}
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}
