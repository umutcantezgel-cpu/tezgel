import Icon from '@/components/icons/Icon';
import { feldClass, hakenClass, hintClass, legendClass, nebenClass, rasterClass } from './stile';

// Auswahlgruppe (F-06, Fusion E-039): Legende als Beschriftung über der Gruppe (B), Optionen als Fugenraster mit gemeinsamen
// 1-px-Kanten, linksbündig, Haken an jeder gewählten Option und optional ein Fachzeichen je Option (A, E4-NACH-13).
// aria-pressed, Namen, Rollen und Verhalten unverändert; Einfach- oder Mehrfachauswahl (multi: value ist eine Liste).
// Spalten nach der Breite der Gruppe selbst (die Hülle ist @container): Stehen zwei Gruppen nebeneinander, wird jede
// einspaltig; eine ungerade letzte Option spannt die Spalten, damit im Raster kein Loch bleibt.
const MUSTER = {
    // lange Texte (Untergrund, Material, Verlegemuster, Belag): einspaltig, ab 28 rem zweispaltig
    liste: { raster: 'grid-cols-1 @md:grid-cols-2', letztes: '@md:col-span-2' },
    // Bereiche (Schritt 1): einspaltig, ab 36 rem zweispaltig, der siebte Bereich über beide Spalten
    bereiche: { raster: 'grid-cols-1 @xl:grid-cols-2', letztes: '@xl:col-span-2' },
    // Formate: wie liste, bei voller Breite (ab 56 rem) fünf nebeneinander
    format: { raster: 'grid-cols-1 @md:grid-cols-2 @4xl:grid-cols-5', letztes: '@md:col-span-2 @4xl:col-span-1' },
    // drei längere Optionen (Zeitraum): einspaltig, ab 36 rem nebeneinander
    drei: { raster: 'grid-cols-1 @xl:grid-cols-3', letztes: '' },
    // kurze Paare und Dreier (Ja/Nein, Innen/Außen, Ja/Nein/Weiß nicht): immer nebeneinander (B)
    paar: { raster: 'grid-cols-2', letztes: '', kompakt: true },
    dreier: { raster: 'grid-cols-3', letztes: '', kompakt: true }
};

export default function OptionGroup({ legend, legendClassName = legendClass, options, value, onChange, multi = false, muster = 'liste', zeichen, hint }) {
    const m = MUSTER[muster];
    const letztes = options.length % 2 === 1 ? options.length - 1 : -1;
    return (
        <div className="@container min-w-0">
            <fieldset className="m-0 min-w-0 border-0 p-0">
                <legend className={legendClassName}>{legend}</legend>
                {hint && <p className={hintClass}>{hint}</p>}
                <div className={`mt-2 ${rasterClass} ${m.raster}`}>
                    {options.map((o, i) => {
                        const selected = multi ? value.includes(o.id) : value === o.id;
                        const fach = zeichen?.[o.id];
                        return (
                            <button
                                key={o.id}
                                type="button"
                                aria-pressed={selected}
                                onClick={() => onChange(o.id)}
                                className={`${feldClass(selected, m.kompakt)} ${i === letztes ? m.letztes : ''}`}
                            >
                                {fach && <Icon name={fach} groesse={6} className="mt-1" />}
                                <span className="flex min-w-0 flex-1 flex-col">
                                    <span className="block text-fs-3 font-semibold">{o.label ?? o.title}</span>
                                    {o.desc && <span className={`mt-1 block text-fs-2 ${nebenClass(selected)}`}>{o.desc}</span>}
                                </span>
                                <Icon name="haken" groesse={4} className={`${m.kompakt ? '' : 'mt-2'} ${hakenClass(selected)}`} />
                            </button>
                        );
                    })}
                </div>
            </fieldset>
        </div>
    );
}
