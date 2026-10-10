import { Check, Plus } from 'lucide-react';
import { TIERS, FEATURES } from './logik';
import { optionClass } from './stile';

// Schritt 4: Ausstattung und Qualitätsstufe (E-011: aus BadanfrageFunnel.jsx verschoben, Markup unverändert).
export default function Schritt4({ formData, setFormData, toggleFeature }) {
    return (
        <div className="space-y-6">
            <p className="text-base sm:text-lg font-black text-slate-900">
                4. Qualitätskategorie &amp; gewünschte Elemente
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TIERS.map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        aria-pressed={formData.tier === t.id}
                        onClick={() => setFormData({ ...formData, tier: t.id })}
                        className={optionClass(formData.tier === t.id, 'p-4')}
                    >
                        <span className="block font-black text-slate-900 text-xs sm:text-sm mb-1 group-hover:text-orange-600 transition-colors">{t.title}</span>
                        <span className="block text-[11px] text-slate-600 leading-snug">{t.desc}</span>
                    </button>
                ))}
            </div>

            <fieldset className="pt-3">
                <legend className="block text-xs font-black uppercase tracking-widest text-slate-800 mb-2.5">Wunschausstattung auswählen</legend>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {FEATURES.map((item) => {
                        const isSelected = formData.features.includes(item.id);
                        return (
                            <button
                                key={item.id}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => toggleFeature(item.id)}
                                className={`px-3 py-2.5 rounded-tile-sm border text-xs font-bold text-left transition-all duration-300 flex items-center gap-2 ${
                                    isSelected
                                        ? 'bg-orange-50 text-orange-950 border-orange-600'
                                        : 'bg-white text-slate-700 border-slate-200 hover:border-orange-500'
                                }`}
                            >
                                {isSelected ? (
                                    <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                                ) : (
                                    <Plus className="w-3.5 h-3.5 text-slate-600 shrink-0" />
                                )}
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </fieldset>
        </div>
    );
}
