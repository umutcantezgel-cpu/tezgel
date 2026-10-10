import { Check } from 'lucide-react';
import { EXTRA_OPTIONS } from './logik';

// 4. Wunschausstattung und Extras (E-011: aus BadProjektCheck.jsx verschoben, Markup unverändert).
export default function Schritt4({ selectedOptions, toggleOption }) {
    return (
        <fieldset>
            <legend className="block text-sm font-black text-slate-900 mb-2">
                4. Wunschausstattung &amp; Extras:
            </legend>
            <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2">
                {EXTRA_OPTIONS.map((opt) => {
                    const isSelected = selectedOptions.includes(opt.id);
                    return (
                        <button
                            key={opt.id}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => toggleOption(opt.id)}
                            className={`px-3 py-2 rounded-tile-sm border text-xs font-bold text-left transition-all duration-300 flex items-center justify-between gap-2 ${
                                isSelected
                                    ? 'bg-orange-50 border-orange-600 text-orange-950'
                                    : 'bg-white border-slate-200 text-slate-700 hover:border-orange-500'
                            }`}
                        >
                            <span>{opt.label}</span>
                            {isSelected && (
                                <Check className="w-3.5 h-3.5 text-orange-600 shrink-0" />
                            )}
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}
