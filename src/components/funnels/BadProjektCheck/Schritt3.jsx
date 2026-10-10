import { TIER_OPTIONS } from './logik';

// 3. Ausstattungsniveau (E-011: aus BadProjektCheck.jsx verschoben, Markup unverändert).
export default function Schritt3({ tier, setTier }) {
    return (
        <fieldset>
            <legend className="block text-sm font-black text-slate-900 mb-2">
                3. Ausstattungsniveau:
            </legend>
            <div className="grid grid-cols-3 gap-2">
                {TIER_OPTIONS.map((t) => {
                    const isSelected = tier === t.id;
                    return (
                        <button
                            key={t.id}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setTier(t.id)}
                            className={`p-3 rounded-tile-md border text-left transition-all duration-300 ${
                                isSelected
                                    ? 'border-orange-600 bg-orange-50 ring-2 ring-orange-600/20'
                                    : 'border-slate-200 bg-white hover:border-orange-500 hover:-translate-y-0.5'
                            }`}
                        >
                            <span className="block text-xs font-black text-slate-900">{t.label}</span>
                            <span className="block text-[11px] text-slate-600 leading-snug">{t.desc}</span>
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}
