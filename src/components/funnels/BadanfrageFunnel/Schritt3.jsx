import { PERSON_OPTIONS } from '@/lib/formulare/useBadanfrage';
import { inputClass } from './stile';

// Schritt 3: Raummaße (E-011: aus BadanfrageFunnel.jsx verschoben, Markup unverändert).
export default function Schritt3({ formData, setFormData, calculatedSqm }) {
    return (
        <div className="space-y-6">
            <p className="text-base sm:text-lg font-black text-slate-900">
                3. Ungefähre Raummaße Ihres Badezimmers
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                    <label htmlFor="badanfrage-length" className="block text-xs font-black text-slate-800 mb-1.5">Länge (m)</label>
                    <input
                        id="badanfrage-length"
                        type="number"
                        step="0.1"
                        min="1"
                        max="15"
                        value={formData.length}
                        onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                        className={`${inputClass} font-bold tabular-nums`}
                    />
                </div>
                <div>
                    <label htmlFor="badanfrage-width" className="block text-xs font-black text-slate-800 mb-1.5">Breite (m)</label>
                    <input
                        id="badanfrage-width"
                        type="number"
                        step="0.1"
                        min="1"
                        max="15"
                        value={formData.width}
                        onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                        className={`${inputClass} font-bold tabular-nums`}
                    />
                </div>
                <div>
                    <label htmlFor="badanfrage-persons" className="block text-xs font-black text-slate-800 mb-1.5">Personen im Haushalt</label>
                    <select
                        id="badanfrage-persons"
                        value={formData.persons}
                        onChange={(e) => setFormData({ ...formData, persons: e.target.value })}
                        className={`${inputClass} font-bold`}
                    >
                        {PERSON_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-700">Berechnete Grundfläche:</span>
                <span className="font-display text-lg font-black text-slate-900 tabular-nums" aria-live="polite">{calculatedSqm} m²</span>
            </div>
        </div>
    );
}
