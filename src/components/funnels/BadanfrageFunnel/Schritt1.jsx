import { OBJECT_TYPES } from '@/lib/formulare/useBadanfrage';
import { optionClass } from './stile';

// Schritt 1: Objekttyp (E-011: aus BadanfrageFunnel.jsx verschoben, Markup unverändert).
export default function Schritt1({ formData, setFormData }) {
    return (
        <div className="space-y-6">
            <p className="text-base sm:text-lg font-black text-slate-900">
                1. Um welche Art von Immobilie handelt es sich?
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {OBJECT_TYPES.map((obj) => (
                    <button
                        key={obj.id}
                        type="button"
                        aria-pressed={formData.objectType === obj.id}
                        onClick={() => setFormData({ ...formData, objectType: obj.id })}
                        className={optionClass(formData.objectType === obj.id)}
                    >
                        <span className="block font-black text-slate-900 text-sm sm:text-base mb-1 group-hover:text-orange-600 transition-colors">{obj.title}</span>
                        <span className="block text-xs text-slate-600">{obj.desc}</span>
                    </button>
                ))}
            </div>
        </div>
    );
}
