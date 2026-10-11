import Hinweis from '@/components/kern/Hinweis';
import { labelKlassen } from '@/components/kern/stile';
import { PERSON_OPTIONS } from '@/lib/formulare/useBadanfrage';
import { inputClass } from './stile';

// Schritt 3: Raummaße (E-011: aus BadanfrageFunnel.jsx verschoben). E3-BAU-17: Darstellung nach dem KERN-Formularmuster;
// Texte, IDs, Labels, aria-live, Reihenfolge und Nutzlast unverändert.
export default function Schritt3({ formData, setFormData, calculatedSqm }) {
    return (
        <div className="space-y-6">
            <p className={labelKlassen}>
                3. Ungefähre Raummaße Ihres Badezimmers
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                        className={`${inputClass} tabular-nums`}
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
                        className={`${inputClass} tabular-nums`}
                    />
                </div>
                <div>
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

            <Hinweis titel="Berechnete Grundfläche:">
                <span className="block font-anzeige text-fs-4 font-semibold tabular-nums text-tinte" aria-live="polite">{calculatedSqm} m²</span>
            </Hinweis>
        </div>
    );
}
