import { labelKlassen } from '@/components/kern/stile';
import { PERSON_OPTIONS } from '@/lib/formulare/useBadanfrage';
import { frageClass, inputClass, nummerClass, zahlClass } from './stile';

// Schritt 3: Raummaße (Q-01: Darstellung nach KERN v2; Texte, IDs und Verhalten unverändert).
// Länge und Breite nebeneinander, Personen darunter (ab breitem Behälter in einer Zeile); Grundfläche als Mono-Kennwert.
export default function Schritt3({ formData, setFormData, calculatedSqm }) {
    return (
        <div className="flex flex-col gap-6">
            <p className={frageClass}>
                <span className={nummerClass}>3.</span> Ungefähre Raummaße Ihres Badezimmers
            </p>
            <div className="grid grid-cols-2 gap-4 @3xl:grid-cols-4">
                <div>
                    <label htmlFor="badanfrage-length" className={labelKlassen}>Länge (m)</label>
                    <input
                        id="badanfrage-length"
                        type="number"
                        step="0.1"
                        min="1"
                        max="15"
                        value={formData.length}
                        onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                        className={zahlClass}
                    />
                </div>
                <div>
                    <label htmlFor="badanfrage-width" className={labelKlassen}>Breite (m)</label>
                    <input
                        id="badanfrage-width"
                        type="number"
                        step="0.1"
                        min="1"
                        max="15"
                        value={formData.width}
                        onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                        className={zahlClass}
                    />
                </div>
                <div className="col-span-2">
                    <label htmlFor="badanfrage-persons" className={labelKlassen}>Personen im Haushalt</label>
                    <select
                        id="badanfrage-persons"
                        value={formData.persons}
                        onChange={(e) => setFormData({ ...formData, persons: e.target.value })}
                        className={inputClass}
                    >
                        {PERSON_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border border-fuge bg-kalk px-4 py-3">
                <span className="text-fs-2 font-semibold text-tinte">Berechnete Grundfläche:</span>
                <span className="font-mono text-fs-4 text-tinte tabular-nums" aria-live="polite">{calculatedSqm} m²</span>
            </div>
        </div>
    );
}
