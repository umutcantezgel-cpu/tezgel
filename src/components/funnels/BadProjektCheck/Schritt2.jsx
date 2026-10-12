import { SCOPE_OPTIONS } from '@/lib/formulare/useProjektCheck';

// 2. Sanierungsumfang (E-011: aus BadProjektCheck.jsx verschoben, Markup unverändert).
export default function Schritt2({ sanitaryScope, setSanitaryScope }) {
    return (
        <fieldset>
            <legend className="block text-sm font-black text-slate-900 mb-2">
                2. Sanierungsumfang:
            </legend>
            <div className="grid grid-cols-3 gap-2">
                {SCOPE_OPTIONS.map((scope) => {
                    const isSelected = sanitaryScope === scope.id;
                    return (
                        <button
                            key={scope.id}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setSanitaryScope(scope.id)}
                            className={`p-3 rounded-tile-md border text-left transition-all duration-300 ${
                                isSelected
                                    ? 'border-orange-600 bg-orange-50 ring-2 ring-orange-600/20'
                                    : 'border-slate-200 bg-white hover:border-orange-500 hover:-translate-y-0.5'
                            }`}
                        >
                            <span className={`block text-xs font-black ${isSelected ? 'text-orange-950' : 'text-slate-900'}`}>{scope.label}</span>
                            <span className="block text-[11px] text-slate-600">{scope.desc}</span>
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}
