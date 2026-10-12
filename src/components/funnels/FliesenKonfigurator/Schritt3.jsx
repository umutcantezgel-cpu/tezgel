import Icon from '@/components/icons/Icon';
import Hinweis from '@/components/kern/Hinweis';
import { hilfeKlassen, labelKlassen } from '@/components/kern/stile';
import { FORMAT_OPTIONS, MATERIAL_OPTIONS, PATTERN_OPTIONS, STAIR_COVERING_OPTIONS, STAIR_TYPE_OPTIONS, YES_NO, parseNumber } from '@/lib/formulare/useFliesenKonfigurator';
import { inputClass, legendClass } from './stile';

// Verbandszeichen je Muster (E4-NACH-13, Befund 17): dekorativ, neben dem Namen; „Noch offen“ ohne Zeichen.
const VERBAND_ZEICHEN = {
    kreuzfuge: 'verband-kreuz',
    verband: 'verband-halb',
    wild: 'verband-wild',
    diagonal: 'verband-diagonal',
    fischgraet: 'verband-fischgraet'
};
const MUSTER_MIT_ZEICHEN = PATTERN_OPTIONS.map((o) =>
    VERBAND_ZEICHEN[o.id]
        ? {
            ...o,
            label: (
                <span className="inline-flex items-center gap-2">
                    <Icon name={VERBAND_ZEICHEN[o.id]} groesse={6} />
                    {o.label}
                </span>
            )
        }
        : o
);

// Auswahl als Feldraster (E4-NACH-13, Befunde 13, 14; wie Schritt 1): Felder an der Fuge (gap-px auf Fuge), Fliese,
// gewählt Tinte mit Haken. Legende, Optionen, aria-pressed, Labels, Nebentexte und Reihenfolge wie bisher; ein einzelnes
// letztes Feld spannt die Spalten, damit kein leerer Rasterplatz bleibt. spalten: auto (1 mobil, 2 ab sm), zwei, eins.
function Feldwahl({ legend, options, value, onChange, spalten = 'auto' }) {
    const raster = spalten === 'eins' ? 'grid-cols-1' : spalten === 'zwei' ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-2';
    const einzeln = options.length % 2 === 1 ? options.length - 1 : -1;
    const spanne = spalten === 'auto' ? 'sm:col-span-2' : spalten === 'zwei' ? 'col-span-2' : '';
    return (
        <fieldset className="m-0 min-w-0 border-0 p-0">
            <legend className={labelKlassen}>{legend}</legend>
            <div className={`mt-2 grid gap-px border border-fuge bg-fuge ${raster}`}>
                {options.map((o, i) => {
                    const selected = value === o.id;
                    return (
                        <button
                            key={o.id}
                            type="button"
                            aria-pressed={selected}
                            onClick={() => onChange(o.id)}
                            className={`flex min-h-11 w-full items-center gap-4 p-4 text-left font-text ${i === einzeln ? spanne : ''} ${
                                selected ? 'bg-tinte text-kalk hover:bg-tinte-2' : 'bg-fliese text-tinte hover:bg-kalk'
                            }`}
                        >
                            <span className="flex min-w-0 flex-1 flex-col">
                                <span className="block text-fs-3 font-semibold">{o.label ?? o.title}</span>
                                {o.desc && <span className={`mt-1 block text-fs-2 ${selected ? 'text-nacht-2' : 'text-tinte-2'}`}>{o.desc}</span>}
                            </span>
                            {selected && <Icon name="haken" groesse={4} />}
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}

// Schritt 3: Format, Material und Menge (E-011: aus FliesenKonfigurator.jsx verschoben; E3-BAU-13: Darstellung nach KERN
// wie Schritt1/2, Zahlenfelder wie E3-BAU-17; Texte, IDs, ARIA, Bedingungen, Reihenfolge und Nutzlast unverändert).
export default function Schritt3({ data, update, hasAreaRooms, hasStairs, rises }) {
    return (
        <div className="space-y-8">
            {hasAreaRooms && (
                <div className="space-y-6">
                    <Feldwahl
                        legend="Fliesenformat:"
                        options={FORMAT_OPTIONS}
                        value={data.format}
                        onChange={(id) => update({ format: id })}
                    />

                    <Feldwahl
                        legend="Material bzw. Optik:"
                        options={MATERIAL_OPTIONS}
                        value={data.material}
                        onChange={(id) => update({ material: id })}
                    />

                    <Feldwahl
                        legend="Verlegemuster:"
                        options={MUSTER_MIT_ZEICHEN}
                        value={data.pattern}
                        onChange={(id) => update({ pattern: id })}
                    />

                    <fieldset className="m-0 min-w-0 space-y-3 border-0 p-0">
                        <legend className={legendClass}>Menge (Fläche):</legend>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="fk-area" className={labelKlassen}>
                                    Zu belegende Fläche in m² (Boden und/oder Wand, netto)
                                </label>
                                <input
                                    id="fk-area"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="z. B. 24,5"
                                    value={data.area}
                        onChange={(e) => update({ area: e.target.value })}
                                    className={`${inputClass} tabular-nums`}
                                    aria-describedby="fk-area-help"
                                />
                            </div>
                            <div>
                                <label htmlFor="fk-skirting" className={labelKlassen}>
                                    Sockel in laufenden Metern (optional)
                                </label>
                                <input
                                    id="fk-skirting"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="z. B. 18"
                                    value={data.skirting}
                        onChange={(e) => update({ skirting: e.target.value })}
                                    className={`${inputClass} tabular-nums`}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="fk-area-range" className="sr-only">Fläche in m² per Schieberegler</label>
                            <input
                                id="fk-area-range"
                                type="range"
                                min="1"
                                max="150"
                                step="1"
                                value={Math.min(Math.max(Math.round(parseNumber(data.area)) || 1, 1), 150)}
                        onChange={(e) => update({ area: e.target.value })}
                                className="w-full min-h-11 cursor-pointer accent-tinte"
                            />
                            <div className="mt-1 flex justify-between font-mono text-fs-1 text-tinte-2 tabular-nums" aria-hidden="true">
                                <span>1 m²</span>
                                <span>75 m²</span>
                                <span>150 m²</span>
                            </div>
                        </div>
                        <p id="fk-area-help" className={hilfeKlassen}>
                            Länge × Breite je Raum addieren; größere Flächen einfach eintippen. Treppen werden unten separat erfasst.
                        </p>
                    </fieldset>
                </div>
            )}

            {hasStairs && (
                <div className={`space-y-6 ${hasAreaRooms ? 'pt-6 border-t border-fuge' : ''}`}>
                    <h4 className="text-fs-3 font-semibold text-tinte">Treppe</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <Feldwahl
                            legend="Lage:"
                            options={[{ id: 'innen', label: 'Innentreppe' }, { id: 'aussen', label: 'Außentreppe' }]}
                            value={data.stairLocation}
                            spalten="zwei"
                            onChange={(id) => update({ stairLocation: id })}
                        />
                        <Feldwahl
                            legend="Treppenform:"
                            options={[{ id: 'gerade', label: 'Gerade' }, { id: 'gewendelt', label: 'Gewendelt' }]}
                            value={data.stairShape}
                            spalten="zwei"
                            onChange={(id) => update({ stairShape: id })}
                        />
                    </div>

                    <Feldwahl
                        legend="Bauart der Treppe:"
                        options={STAIR_TYPE_OPTIONS}
                        value={data.stairType}
                        onChange={(id) => update({ stairType: id })}
                    />

                    {data.stairType !== 'blockstufen' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Feldwahl
                                legend="Belag:"
                                options={STAIR_COVERING_OPTIONS}
                                value={data.stairCovering}
                                spalten="eins"
                        onChange={(id) => update({ stairCovering: id })}
                            />
                            <Feldwahl
                                legend="Setzstufen (senkrechte Flächen) belegen?"
                                options={YES_NO}
                                value={data.risersOn}
                                spalten="zwei"
                        onChange={(id) => update({ risersOn: id })}
                            />
                        </div>
                    )}

                    <fieldset className="m-0 min-w-0 space-y-4 border-0 p-0">
                        <legend className={legendClass}>Stufen und Maße:</legend>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="fk-rises" className={labelKlassen}>Anzahl Steigungen</label>
                                <input
                                    id="fk-rises"
                                    type="number"
                                    min="1"
                                    step="1"
                                    inputMode="numeric"
                                    placeholder="z. B. 14"
                                    value={data.stairRises}
                        onChange={(e) => update({ stairRises: e.target.value })}
                                    className={`${inputClass} tabular-nums`}
                                    aria-describedby="fk-stairs-help"
                                />
                            </div>
                            {data.stairType !== 'blockstufen' && data.risersOn === 'ja' && (
                                <div>
                                    <label htmlFor="fk-risers" className={labelKlassen}>Setzstufen zu belegen</label>
                                    <input
                                        id="fk-risers"
                                        type="number"
                                        min="0"
                                        step="1"
                                        inputMode="numeric"
                                        placeholder={Number.isFinite(rises) ? `${rises} (automatisch)` : 'automatisch'}
                                        value={data.risersCount}
                        onChange={(e) => update({ risersCount: e.target.value })}
                                        className={`${inputClass} tabular-nums`}
                                    />
                                </div>
                            )}
                            <div>
                                <label htmlFor="fk-treads" className={labelKlassen}>Trittstufen zu belegen</label>
                                <input
                                    id="fk-treads"
                                    type="number"
                                    min="0"
                                    step="1"
                                    inputMode="numeric"
                                    placeholder={Number.isFinite(rises) ? `${Math.max(rises - 1, 0)} (automatisch)` : 'automatisch'}
                                    value={data.treadsCount}
                        onChange={(e) => update({ treadsCount: e.target.value })}
                                    className={`${inputClass} tabular-nums`}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="fk-width" className={labelKlassen}>Laufbreite (cm)</label>
                                <input
                                    id="fk-width"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="z. B. 100"
                                    value={data.stairWidth}
                        onChange={(e) => update({ stairWidth: e.target.value })}
                                    className={`${inputClass} tabular-nums`}
                                />
                            </div>
                            <div>
                                <label htmlFor="fk-depth" className={labelKlassen}>Auftrittstiefe inkl. Überstand (cm)</label>
                                <input
                                    id="fk-depth"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="z. B. 30"
                                    value={data.treadDepth}
                        onChange={(e) => update({ treadDepth: e.target.value })}
                                    className={`${inputClass} tabular-nums`}
                                />
                            </div>
                            {data.stairType !== 'blockstufen' && data.risersOn === 'ja' && (
                                <div>
                                    <label htmlFor="fk-height" className={labelKlassen}>Steigungshöhe (cm)</label>
                                    <input
                                        id="fk-height"
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="z. B. 18"
                                        value={data.riserHeight}
                        onChange={(e) => update({ riserHeight: e.target.value })}
                                        className={`${inputClass} tabular-nums`}
                                    />
                                </div>
                            )}
                        </div>
                        <p id="fk-stairs-help" className={hilfeKlassen}>
                            Eine Treppe mit n Steigungen hat n Setzstufen und in der Regel n − 1 Trittstufen – der oberste
                            Auftritt ist meist der Boden des Obergeschosses. Soll dieser Austritt mit belegt werden, tragen Sie
                            die Zahl der Trittstufen einfach selbst ein.
                        </p>
                    </fieldset>

                    {data.stairType === 'blockstufen' && (
                        <Hinweis art="merk">
                            <p>
                                Blockstufen sind eine massive Bauart (meist Naturstein oder Betonwerkstein), die auf Fundament
                                bzw. Mörtelbett versetzt wird – kein Belag auf eine bestehende Treppe. Stückzahl und Maße klären wir
                                beim Aufmaß.
                            </p>
                        </Hinweis>
                    )}

                    <Feldwahl
                        legend="Treppensockel mit ausführen?"
                        options={YES_NO}
                        value={data.stairSkirting}
                        spalten="zwei"
                        onChange={(id) => update({ stairSkirting: id })}
                    />
                </div>
            )}

            {!hasAreaRooms && !hasStairs && (
                <p className={hilfeKlassen}>Bitte wählen Sie in Schritt 1 zuerst einen Bereich aus.</p>
            )}
        </div>
    );
}
