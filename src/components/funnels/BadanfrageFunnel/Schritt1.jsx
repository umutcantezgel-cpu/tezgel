import { OBJECT_TYPES } from '@/lib/formulare/useBadanfrage';
import { labelKlassen } from '@/components/kern/stile';
import { optionClass } from './stile';

// Schritt 1: Objekttyp (E-011: aus BadanfrageFunnel.jsx verschoben). E3-BAU-16: Darstellung nach dem KERN-Formularmuster;
// Texte, IDs, aria-pressed, Reihenfolge und Nutzlast unverändert.
export default function Schritt1({ formData, setFormData }) {
    return (
        <div className="space-y-6">
            <p className={labelKlassen}>
                1. Um welche Art von Immobilie handelt es sich?
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {OBJECT_TYPES.map((obj) => {
                    const gewaehlt = formData.objectType === obj.id;
                    return (
                        <button
                            key={obj.id}
                            type="button"
                            aria-pressed={gewaehlt}
                            onClick={() => setFormData({ ...formData, objectType: obj.id })}
                            className={optionClass(gewaehlt)}
                            data-motion="zustand"
                        >
                            <span className="mb-1 block font-semibold">{obj.title}</span>
                            <span className={`block text-fs-1 ${gewaehlt ? 'text-nacht-2' : 'text-tinte-2'}`}>{obj.desc}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
