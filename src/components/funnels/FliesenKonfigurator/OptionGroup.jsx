import { chipOptionClass, legendClass } from './stile';

// Auswahlgruppe (Chips) (E-011: aus FliesenKonfigurator.jsx verschoben; E3-Vorlauf: Hinweis im System).
export default function OptionGroup({ legend, options, value, onChange, multi = false, columns = 'grid-cols-2 sm:grid-cols-3', hint }) {
    return (
        <fieldset>
            <legend className={legendClass}>{legend}</legend>
            {hint && <p className="mb-2 font-text text-fs-2 text-tinte-2">{hint}</p>}
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
