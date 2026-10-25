import Icon from '@/components/icons/Icon';
import { FORMAT_OPTIONS, MATERIAL_OPTIONS, PATTERN_OPTIONS, STAIR_COVERING_OPTIONS, STAIR_TYPE_OPTIONS, YES_NO, parseNumber } from '@/lib/formulare/useFliesenKonfigurator';
import { absatzHintClass, labelClass, legendClass, merkClass, zahlClass, zusatzClass } from './stile';
import OptionGroup from './OptionGroup';

// Verbandszeichen je Muster (A, E4-NACH-13, Befund 17): dekorativ, neben dem Namen; „Noch offen“ ohne Zeichen.
// Stufenfelder (F-06 Nachbesserung): je Gruppe einspaltig; ab 42 rem Werkzeugbreite drei nebeneinander, nie 2 + 1. In der
// Dreierreihe Wert und Platzhalter eine Stufe kleiner und px-3, damit „14 (automatisch)“ auch mit erhöhtem Textabstand
// (WCAG 1.4.12) ins Feld passt; Labels dürfen zweizeilig werden, die Felder stehen unten bündig und gleich hoch.
const STUFEN_RASTER = 'grid grid-cols-1 gap-6 @2xl:grid-cols-3 @2xl:items-end @2xl:gap-4';
const stufenClass = `${zahlClass} @2xl:px-3 @2xl:text-fs-2`;

const VERBAND_ZEICHEN = {
    kreuzfuge: 'verband-kreuz',
    verband: 'verband-halb',
    wild: 'verband-wild',
    diagonal: 'verband-diagonal',
    fischgraet: 'verband-fischgraet'
};

// Schritt 3: Format, Material und Menge (F-06, Fusion E-039): Takt von B (Luft zwischen den Gruppen, Material und
// Verlegemuster nebeneinander, Zahlenfelder und Skala in Mono, „(optional)“ abgesetzt, Merkhinweis auf Kalk mit Abstand),
// Auswahl als Fugenraster mit Haken und Verbandszeichen von A; Abstand zwischen Regler und Skala (A), damit der Fokusring
// die Skala nicht berührt. Spalten nach der Breite des Werkzeugs (@container in index.jsx) bzw. der Gruppe.
// Texte, IDs, Labels, Rechenwege, Bedingungen, Reihenfolge und Verhalten unverändert.
export default function Schritt3({ data, update, hasAreaRooms, hasStairs, rises }) {
    return (
        <div className="flex flex-col gap-12">
            {hasAreaRooms && (
                <div className="flex flex-col gap-8">
                    <OptionGroup
                        legend="Größe der Fliesen:"
                        options={FORMAT_OPTIONS}
                        value={data.format}
                        muster="format"
                        onChange={(id) => update({ format: id })}
                    />

                    <div className="grid grid-cols-1 gap-8 @2xl:grid-cols-2 @2xl:items-start">
                        <OptionGroup
                            legend="Material bzw. Optik:"
                            options={MATERIAL_OPTIONS}
                            value={data.material}
                            onChange={(id) => update({ material: id })}
                        />

                        <OptionGroup
                            legend="Verlegemuster:"
                            options={PATTERN_OPTIONS}
                            value={data.pattern}
                            zeichen={VERBAND_ZEICHEN}
                            onChange={(id) => update({ pattern: id })}
                        />
                    </div>

                    <fieldset className="m-0 flex min-w-0 flex-col gap-4 border-0 p-0">
                        <legend className={legendClass}>Menge (Fläche):</legend>
                        <div className="mt-4 grid grid-cols-1 gap-6 @xl:grid-cols-2 @xl:items-end @xl:gap-4">
                            <div>
                                <label htmlFor="fk-area" className={labelClass}>
                                    Zu belegende Fläche in m² (Boden und/oder Wand, netto)
                                </label>
                                <input
                                    id="fk-area"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="z. B. 24,5"
                                    value={data.area}
                                    onChange={(e) => update({ area: e.target.value })}
                                    className={zahlClass}
                                    aria-describedby="fk-area-help"
                                />
                            </div>
                            <div>
                                <label htmlFor="fk-skirting" className={labelClass}>
                                    Sockel in Metern <span className={zusatzClass}>(optional)</span>
                                </label>
                                <input
                                    id="fk-skirting"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="z. B. 18"
                                    value={data.skirting}
                                    onChange={(e) => update({ skirting: e.target.value })}
                                    className={zahlClass}
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
                                className="block min-h-11 w-full cursor-pointer accent-tinte"
                            />
                            {/* Abstand zur Skala (A): der Fokusring (2 px mit 2 px Abstand) liegt nie auf „1 m² · 75 m² · 150 m²“ */}
                            <div className="mt-2 flex justify-between font-mono text-fs-1 text-tinte-2 tabular-nums" aria-hidden="true">
                                <span>1 m²</span>
                                <span>75 m²</span>
                                <span>150 m²</span>
                            </div>
                        </div>
                        <p id="fk-area-help" className={absatzHintClass}>
                            Länge × Breite je Raum addieren; größere Flächen einfach eintippen. Treppen werden unten separat erfasst.
                        </p>
                    </fieldset>
                </div>
            )}

            {hasStairs && (
                <div className={`flex flex-col gap-8 ${hasAreaRooms ? 'border-t border-fuge pt-12' : ''}`}>
                    <h4 className="text-fs-4 text-tinte">Treppe</h4>

                    <div className="grid grid-cols-1 gap-8 @xl:grid-cols-2 @xl:gap-6">
                        <OptionGroup
                            legend="Wo liegt die Treppe?"
                            options={[{ id: 'innen', label: 'Innentreppe' }, { id: 'aussen', label: 'Außentreppe' }]}
                            value={data.stairLocation}
                            muster="paar"
                            onChange={(id) => update({ stairLocation: id })}
                        />
                        <OptionGroup
                            legend="Treppenform:"
                            options={[{ id: 'gerade', label: 'Gerade' }, { id: 'gewendelt', label: 'Gewendelt' }]}
                            value={data.stairShape}
                            muster="paar"
                            onChange={(id) => update({ stairShape: id })}
                        />
                    </div>

                    <OptionGroup
                        legend="Bauart der Treppe:"
                        options={STAIR_TYPE_OPTIONS}
                        value={data.stairType}
                        onChange={(id) => update({ stairType: id })}
                    />

                    {data.stairType !== 'blockstufen' && (
                        <div className="grid grid-cols-1 gap-8 @xl:grid-cols-2 @xl:items-start @xl:gap-6">
                            <OptionGroup
                                legend="Belag:"
                                options={STAIR_COVERING_OPTIONS}
                                value={data.stairCovering}
                                onChange={(id) => update({ stairCovering: id })}
                            />
                            <OptionGroup
                                legend="Sollen auch die senkrechten Flächen der Stufen belegt werden?"
                                options={YES_NO}
                                value={data.risersOn}
                                muster="paar"
                                onChange={(id) => update({ risersOn: id })}
                            />
                        </div>
                    )}

                    <fieldset className="m-0 flex min-w-0 flex-col gap-4 border-0 p-0">
                        <legend className={legendClass}>Stufen und Maße:</legend>
                        <div className={`mt-4 ${STUFEN_RASTER}`}>
                            <div>
                                <label htmlFor="fk-rises" className={labelClass}>Anzahl Steigungen</label>
                                <input
                                    id="fk-rises"
                                    type="number"
                                    min="1"
                                    step="1"
                                    inputMode="numeric"
                                    placeholder="z. B. 14"
                                    value={data.stairRises}
                                    onChange={(e) => update({ stairRises: e.target.value })}
                                    className={stufenClass}
                                    aria-describedby="fk-stairs-help"
                                />
                            </div>
                            {data.stairType !== 'blockstufen' && data.risersOn === 'ja' && (
                                <div>
                                    <label htmlFor="fk-risers" className={labelClass}>Setzstufen zu belegen</label>
                                    <input
                                        id="fk-risers"
                                        type="number"
                                        min="0"
                                        step="1"
                                        inputMode="numeric"
                                        placeholder={Number.isFinite(rises) ? `${rises} (automatisch)` : 'automatisch'}
                                        value={data.risersCount}
                                        onChange={(e) => update({ risersCount: e.target.value })}
                                        className={stufenClass}
                                    />
                                </div>
                            )}
                            <div>
                                <label htmlFor="fk-treads" className={labelClass}>Trittstufen zu belegen</label>
                                <input
                                    id="fk-treads"
                                    type="number"
                                    min="0"
                                    step="1"
                                    inputMode="numeric"
                                    placeholder={Number.isFinite(rises) ? `${Math.max(rises - 1, 0)} (automatisch)` : 'automatisch'}
                                    value={data.treadsCount}
                                    onChange={(e) => update({ treadsCount: e.target.value })}
                                    className={stufenClass}
                                />
                            </div>
                        </div>
                        <div className={STUFEN_RASTER}>
                            <div>
                                <label htmlFor="fk-width" className={labelClass}>Laufbreite (cm)</label>
                                <input
                                    id="fk-width"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="z. B. 100"
                                    value={data.stairWidth}
                                    onChange={(e) => update({ stairWidth: e.target.value })}
                                    className={stufenClass}
                                />
                            </div>
                            <div>
                                <label htmlFor="fk-depth" className={labelClass}>Auftrittstiefe inkl. Überstand (cm)</label>
                                <input
                                    id="fk-depth"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="z. B. 30"
                                    value={data.treadDepth}
                                    onChange={(e) => update({ treadDepth: e.target.value })}
                                    className={stufenClass}
                                />
                            </div>
                            {data.stairType !== 'blockstufen' && data.risersOn === 'ja' && (
                                <div>
                                    <label htmlFor="fk-height" className={labelClass}>Steigungshöhe (cm)</label>
                                    <input
                                        id="fk-height"
                                        type="text"
                                        inputMode="decimal"
                                        placeholder="z. B. 18"
                                        value={data.riserHeight}
                                        onChange={(e) => update({ riserHeight: e.target.value })}
                                        className={stufenClass}
                                    />
                                </div>
                            )}
                        </div>
                        <p id="fk-stairs-help" className={absatzHintClass}>
                            Eine Treppe mit n Steigungen hat n Setzstufen und meist n − 1 Trittstufen. Der oberste Tritt ist meist
                            schon der Boden des Obergeschosses. Soll dieser Boden mit belegt werden, tragen Sie die Zahl der
                            Trittstufen selbst ein.
                        </p>
                    </fieldset>

                    {data.stairType === 'blockstufen' && (
                        <p className={merkClass}>
                            <Icon name="info" groesse={5} className="mt-px" />
                            <span>
                                <span className="sr-only">Hinweis: </span>
                                Blockstufen sind eine massive Bauart, meist aus Naturstein oder Betonwerkstein. Sie werden auf ein
                                Fundament gesetzt. Sie sind kein Belag für eine bestehende Treppe. Stückzahl und Maße klären wir
                                beim Termin vor Ort.
                            </span>
                        </p>
                    )}

                    <div className="grid grid-cols-1 @xl:grid-cols-2">
                        <OptionGroup
                            legend="Treppensockel mit ausführen?"
                            options={YES_NO}
                            value={data.stairSkirting}
                            muster="paar"
                            onChange={(id) => update({ stairSkirting: id })}
                        />
                    </div>
                </div>
            )}

            {!hasAreaRooms && !hasStairs && (
                <p className={absatzHintClass}>Bitte wählen Sie in Schritt 1 zuerst einen Bereich aus.</p>
            )}
        </div>
    );
}
