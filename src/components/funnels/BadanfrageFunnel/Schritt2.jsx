import { SCOPES } from '@/lib/formulare/useBadanfrage';
import { optionClass } from './stile';

// Schritt 2: Sanierungsumfang (E-011: aus BadanfrageFunnel.jsx verschoben, Markup unverändert).
export default function Schritt2({ formData, setFormData }) {
    return (
        <div className="space-y-6">
            <p className="text-base sm:text-lg font-black text-slate-900">
                2. Welcher Sanierungsumfang ist geplant?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {SCOPES.map((sc) => (
                    <button
                        key={sc.id}
                        type="button"
                        aria-pressed={formData.scope === sc.id}
                        onClick={() => setFormData({ ...formData, scope: sc.id })}
                        className={optionClass(formData.scope === sc.id)}
                    >
                        <span className="block font-black text-slate-900 text-sm sm:text-base mb-1 group-hover:text-orange-600 transition-colors">{sc.title}</span>
                        <span className="block text-xs text-slate-600">{sc.desc}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
