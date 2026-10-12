import Icon from '@/components/icons/Icon';
import { FORMAT_OPTIONS, MATERIAL_OPTIONS, PATTERN_OPTIONS, STAIR_COVERING_OPTIONS, STAIR_TYPE_OPTIONS, YES_NO, parseNumber } from '@/lib/formulare/useFliesenKonfigurator';
import { cardOptionClass, labelClass, legendClass, merkClass, nebenClass, zahlClass, zusatzClass } from './stile';
import OptionGroup from './OptionGroup';

// Schritt 3: Format, Material und Menge (Q-05, KERN v2): Kacheln und Auswahlknöpfe mit aria-pressed (Tinte-Fläche),
// Zahlenfelder und Skala in Mono, Merkhinweis mit Info-Zeichen. Texte, IDs, Labels, Rechenwege und Verhalten unverändert.
// Spalten nach Behälterbreite (@container in index.jsx): Stufenfelder zu dritt erst ab 56 rem (Platzhalter
// „14 (automatisch)“ in Mono braucht die Breite).
export default function Schritt3({ data, update, hasAreaRooms, hasStairs, rises }) {
    return (
        <div className="flex flex-col gap-12">
            {hasAreaRooms && (
                <div className="flex flex-col gap-8">
                    <fieldset className="min-w-0">
                        <legend className={legendClass}>Fliesenformat:</legend>
                        <div className="mt-2 grid grid-cols-1 gap-2 @xl:grid-cols-3 @4xl:grid-cols-5">
                            {FORMAT_OPTIONS.map((f) => {
                                const selected = data.format === f.id;
                                return (
                                    <button
                                        key={f.id}
                                        type="button"
                                        aria-pressed={selected}
                                        onClick={() => update({ format: f.id })}
                                        className={cardOptionClass}
                                    >
                                        <span className="block text-fs-2 font-semibold">{f.title}</span>
                                        <span className={`block text-fs-1 ${nebenClass(selected)}`}>{f.desc}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </fieldset>

                    <div className="grid grid-cols-1 gap-8 @4xl:grid-cols-2">
                        <OptionGroup
                            legend="Material bzw. Optik:"
                            options={MATERIAL_OPTIONS}
                            value={data.material}
                            columns="grid-cols-1 @xs:grid-cols-2"
                            onChange={(id) => update({ material: id })}
                        />

                        <OptionGroup
                            legend="Verlegemuster:"
                            options={PATTERN_OPTIONS}
                            value={data.pattern}
                            columns="grid-cols-1 @xs:grid-cols-2"
                            onChange={(id) => update({ pattern: id })}
                        />
                    </div>

                    <fieldset className="flex min-w-0 flex-col gap-4">
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
                                    Sockel in laufenden Metern <span className={zusatzClass}>(optional)</span>
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
                            <div className="flex justify-between font-mono text-fs-1 text-tinte-2" aria-hidden="true">
                                <span>1 m²</span>
                                <span>75 m²</span>
                                <span>150 m²</span>
                            </div>
                        </div>
                        <p id="fk-area-help" className="font-text text-fs-2 text-tinte-2">
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

                    <fieldset className="min-w-0">
                        <legend className={legendClass}>Bauart der Treppe:</legend>
                        <div className="mt-2 grid grid-cols-1 gap-2 @xl:grid-cols-3">
                            {STAIR_TYPE_OPTIONS.map((t) => {
                                const selected = data.stairType === t.id;
                                return (
                                    <button
                                        key={t.id}
                                        type="button"
                                        aria-pressed={selected}
                                        onClick={() => update({ stairType: t.id })}
                                        className={cardOptionClass}
                                    >
                                        <span className="block text-fs-2 font-semibold">{t.label}</span>
                                        <span className={`block text-fs-1 ${nebenClass(selected)}`}>{t.desc}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </fieldset>

                    {data.stairType !== 'blockstufen' && (
                        <div className="grid grid-cols-1 gap-8 @xl:grid-cols-2 @xl:items-end @xl:gap-6">
                            <OptionGroup
                                legend="Belag:"
                                options={STAIR_COVERING_OPTIONS}
                                value={data.stairCovering}
                                columns="grid-cols-1 @5xl:grid-cols-3"
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

                    <fieldset className="flex min-w-0 flex-col gap-4">
                        <legend className={legendClass}>Stufen und Maße:</legend>
                        <div className="mt-4 grid grid-cols-1 gap-6 @lg:grid-cols-2 @lg:items-end @lg:gap-4 @4xl:grid-cols-3">
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
                                    className={zahlClass}
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
                                        className={zahlClass}
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
                                    className={zahlClass}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 gap-6 @lg:grid-cols-2 @lg:items-end @lg:gap-4 @4xl:grid-cols-3">
                            <div>
                                <label htmlFor="fk-width" className={labelClass}>Laufbreite (cm)</label>
                                <input
                                    id="fk-width"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="z. B. 100"
                                    value={data.stairWidth}
                                    onChange={(e) => update({ stairWidth: e.target.value })}
                                    className={zahlClass}
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
                                    className={zahlClass}
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
                                        className={zahlClass}
                                    />
                                </div>
                            )}
                        </div>
                        <p id="fk-stairs-help" className="max-w-mass font-text text-fs-2 text-tinte-2">
                            Eine Treppe mit n Steigungen hat n Setzstufen und in der Regel n − 1 Trittstufen – der oberste
                            Auftritt ist meist der Boden des Obergeschosses. Soll dieser Austritt mit belegt werden, tragen Sie
                            die Zahl der Trittstufen einfach selbst ein.
                        </p>
                    </fieldset>

                    {data.stairType === 'blockstufen' && (
                        <p className={merkClass}>
                            <Icon name="info" groesse={5} className="mt-px" />
                            <span>
                                Blockstufen sind eine massive Bauart (meist Naturstein oder Betonwerkstein), die auf Fundament
                                bzw. Mörtelbett versetzt wird – kein Belag auf eine bestehende Treppe. Stückzahl und Maße klären wir
                                beim Aufmaß.
                            </span>
                        </p>
                    )}

                    <div className="grid grid-cols-1 @xl:grid-cols-2">
                        <OptionGroup
                            legend="Treppensockel mit ausführen?"
                            options={YES_NO}
                            value={data.stairSkirting}
                            columns="grid-cols-2"
                            onChange={(id) => update({ stairSkirting: id })}
                        />
                    </div>
                </div>
            )}

            {!hasAreaRooms && !hasStairs && (
                <p className="font-text text-fs-2 text-tinte-2">Bitte wählen Sie in Schritt 1 zuerst einen Bereich aus.</p>
            )}
        </div>
    );
}
