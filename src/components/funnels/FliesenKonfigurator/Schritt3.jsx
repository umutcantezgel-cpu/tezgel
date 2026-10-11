import Icon from '@/components/icons/Icon';
import Hinweis from '@/components/kern/Hinweis';
import { hilfeKlassen, labelKlassen } from '@/components/kern/stile';
import { FORMAT_OPTIONS, MATERIAL_OPTIONS, PATTERN_OPTIONS, STAIR_COVERING_OPTIONS, STAIR_TYPE_OPTIONS, YES_NO, parseNumber } from '@/lib/formulare/useFliesenKonfigurator';
import { cardOptionClass, inputClass, legendClass } from './stile';

// Auswahlgruppe im Kartenraster wie in Schritt1 und Schritt2 (E3-BAU-11/-12): Legende, Karten mit aria-pressed,
// Haken bei gewählter Karte. Nebentext (desc) wie in Schritt1 mit Farbe je Zustand.
function Auswahlgruppe({ legend, options, value, columns, onChange }) {
    return (
        <fieldset className="m-0 min-w-0 border-0 p-0">
            <legend className={labelKlassen}>{legend}</legend>
            <div className={`mt-2 grid gap-2 ${columns}`}>
                {options.map((o) => {
                    const selected = value === o.id;
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

// Schritt 3: Format, Material und Menge (E-011: aus FliesenKonfigurator.jsx verschoben; E3-BAU-13: Darstellung nach KERN
// wie Schritt1/2, Zahlenfelder wie E3-BAU-17; Texte, IDs, ARIA, Bedingungen, Reihenfolge und Nutzlast unverändert).
export default function Schritt3({ data, update, hasAreaRooms, hasStairs, rises }) {
    return (
        <div className="space-y-8">
            {hasAreaRooms && (
                <div className="space-y-6">
                    <Auswahlgruppe
                        legend="Fliesenformat:"
                        options={FORMAT_OPTIONS}
                        value={data.format}
                        columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        onChange={(id) => update({ format: id })}
                    />

                    <Auswahlgruppe
                        legend="Material bzw. Optik:"
                        options={MATERIAL_OPTIONS}
                        value={data.material}
                        columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                        onChange={(id) => update({ material: id })}
                    />

                    <Auswahlgruppe
                        legend="Verlegemuster:"
                        options={PATTERN_OPTIONS}
                        value={data.pattern}
                        columns="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
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
                        <Auswahlgruppe
                            legend="Lage:"
                            options={[{ id: 'innen', label: 'Innentreppe' }, { id: 'aussen', label: 'Außentreppe' }]}
                            value={data.stairLocation}
                            columns="grid-cols-1 lg:grid-cols-2"
                            onChange={(id) => update({ stairLocation: id })}
                        />
                        <Auswahlgruppe
                            legend="Treppenform:"
                            options={[{ id: 'gerade', label: 'Gerade' }, { id: 'gewendelt', label: 'Gewendelt' }]}
                            value={data.stairShape}
                            columns="grid-cols-1 lg:grid-cols-2"
                            onChange={(id) => update({ stairShape: id })}
                        />
                    </div>

                    <Auswahlgruppe
                        legend="Bauart der Treppe:"
                        options={STAIR_TYPE_OPTIONS}
                        value={data.stairType}
                        columns="grid-cols-1 lg:grid-cols-3"
                        onChange={(id) => update({ stairType: id })}
                    />

                    {data.stairType !== 'blockstufen' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <Auswahlgruppe
                                legend="Belag:"
                                options={STAIR_COVERING_OPTIONS}
                                value={data.stairCovering}
                                columns="grid-cols-1"
                                onChange={(id) => update({ stairCovering: id })}
                            />
                            <Auswahlgruppe
                                legend="Setzstufen (senkrechte Flächen) belegen?"
                                options={YES_NO}
                                value={data.risersOn}
                                columns="grid-cols-2"
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

                    <Auswahlgruppe
                        legend="Treppensockel mit ausführen?"
                        options={YES_NO}
                        value={data.stairSkirting}
                        columns="grid-cols-2"
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
