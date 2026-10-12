import { FORMAT_OPTIONS, MATERIAL_OPTIONS, PATTERN_OPTIONS, STAIR_COVERING_OPTIONS, STAIR_TYPE_OPTIONS, YES_NO, parseNumber } from '@/lib/formulare/useFliesenKonfigurator';
import { cardOptionClass, inputClass, labelClass, legendClass } from './stile';
import OptionGroup from './OptionGroup';

// Schritt 3: Format, Material und Menge (E-011: aus FliesenKonfigurator.jsx verschoben, Markup unverändert).
export default function Schritt3({ data, update, hasAreaRooms, hasStairs, rises }) {
    return (
        <div className="space-y-8">
            {hasAreaRooms && (
                <div className="space-y-6">
                    <fieldset>
                        <legend className={legendClass}>Fliesenformat:</legend>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {FORMAT_OPTIONS.map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    aria-pressed={data.format === f.id}
                                    onClick={() => update({ format: f.id })}
                                    className={cardOptionClass(data.format === f.id)}
                                >
                                    <span className="block font-black text-slate-900 text-xs sm:text-sm">{f.title}</span>
                                    <span className="block text-[11px] text-slate-600">{f.desc}</span>
                                </button>
                            ))}
                        </div>
                    </fieldset>

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
                        onChange={(id) => update({ pattern: id })}
                    />

                    <fieldset className="space-y-3">
                        <legend className={legendClass}>Menge (Fläche):</legend>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                                    className={inputClass}
                                    aria-describedby="fk-area-help"
                                />
                            </div>
                            <div>
                                <label htmlFor="fk-skirting" className={labelClass}>
                                    Sockel in laufenden Metern (optional)
                                </label>
                                <input
                                    id="fk-skirting"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="z. B. 18"
                                    value={data.skirting}
                                    onChange={(e) => update({ skirting: e.target.value })}
                                    className={inputClass}
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
                                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                            />
                            <div className="flex justify-between text-[10px] text-slate-600 font-semibold mt-1 tabular-nums" aria-hidden="true">
                                <span>1 m²</span>
                                <span>75 m²</span>
                                <span>150 m²</span>
                            </div>
                        </div>
                        <p id="fk-area-help" className="text-xs text-slate-600">
                            Länge × Breite je Raum addieren; größere Flächen einfach eintippen. Treppen werden unten separat erfasst.
                        </p>
                    </fieldset>
                </div>
            )}

            {hasStairs && (
                <div className={`space-y-6 ${hasAreaRooms ? 'pt-6 border-t border-slate-200' : ''}`}>
                    <h4 className="text-sm font-black text-slate-900">Treppe</h4>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <OptionGroup
                            legend="Lage:"
                            options={[{ id: 'innen', label: 'Innentreppe' }, { id: 'aussen', label: 'Außentreppe' }]}
                            value={data.stairLocation}
                            columns="grid-cols-2"
                            onChange={(id) => update({ stairLocation: id })}
                        />
                        <OptionGroup
                            legend="Treppenform:"
                            options={[{ id: 'gerade', label: 'Gerade' }, { id: 'gewendelt', label: 'Gewendelt' }]}
                            value={data.stairShape}
                            columns="grid-cols-2"
                            onChange={(id) => update({ stairShape: id })}
                        />
                    </div>

                    <fieldset>
                        <legend className={legendClass}>Bauart der Treppe:</legend>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {STAIR_TYPE_OPTIONS.map((t) => (
                                <button
                                    key={t.id}
                                    type="button"
                                    aria-pressed={data.stairType === t.id}
                                    onClick={() => update({ stairType: t.id })}
                                    className={cardOptionClass(data.stairType === t.id)}
                                >
                                    <span className="block font-black text-slate-900 text-xs sm:text-sm">{t.label}</span>
                                    <span className="block text-[11px] text-slate-600">{t.desc}</span>
                                </button>
                            ))}
                        </div>
                    </fieldset>

                    {data.stairType !== 'blockstufen' && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <OptionGroup
                                legend="Belag:"
                                options={STAIR_COVERING_OPTIONS}
                                value={data.stairCovering}
                                columns="grid-cols-1 sm:grid-cols-3"
                                onChange={(id) => update({ stairCovering: id })}
                            />
                            <OptionGroup
                                legend="Setzstufen (senkrechte Flächen) belegen?"
                                options={YES_NO}
                                value={data.risersOn}
                                columns="grid-cols-2"
                                onChange={(id) => update({ risersOn: id })}
                            />
                        </div>
                    )}

                    <fieldset className="space-y-4">
                        <legend className={legendClass}>Stufen und Maße:</legend>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                                    className={inputClass}
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
                                        className={inputClass}
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
                                    className={inputClass}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="fk-width" className={labelClass}>Laufbreite (cm)</label>
                                <input
                                    id="fk-width"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="z. B. 100"
                                    value={data.stairWidth}
                                    onChange={(e) => update({ stairWidth: e.target.value })}
                                    className={inputClass}
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
                                    className={inputClass}
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
                                        className={inputClass}
                                    />
                                </div>
                            )}
                        </div>
                        <p id="fk-stairs-help" className="text-xs text-slate-600 leading-relaxed">
                            Eine Treppe mit n Steigungen hat n Setzstufen und in der Regel n − 1 Trittstufen – der oberste
                            Auftritt ist meist der Boden des Obergeschosses. Soll dieser Austritt mit belegt werden, tragen Sie
                            die Zahl der Trittstufen einfach selbst ein.
                        </p>
                    </fieldset>

                    {data.stairType === 'blockstufen' && (
                        <p className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-sm text-slate-700">
                            Blockstufen sind eine massive Bauart (meist Naturstein oder Betonwerkstein), die auf Fundament
                            bzw. Mörtelbett versetzt wird – kein Belag auf eine bestehende Treppe. Stückzahl und Maße klären wir
                            beim Aufmaß.
                        </p>
                    )}

                    <OptionGroup
                        legend="Treppensockel mit ausführen?"
                        options={YES_NO}
                        value={data.stairSkirting}
                        columns="grid-cols-2"
                        onChange={(id) => update({ stairSkirting: id })}
                    />
                </div>
            )}

            {!hasAreaRooms && !hasStairs && (
                <p className="text-sm text-slate-700">Bitte wählen Sie in Schritt 1 zuerst einen Bereich aus.</p>
            )}
        </div>
    );
}
