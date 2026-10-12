import { SCOPES } from '@/lib/formulare/useBadanfrage';
import { labelKlassen } from '@/components/kern/stile';
import { optionClass } from './stile';

// Schritt 2: Sanierungsumfang (E-011: aus BadanfrageFunnel.jsx verschoben). E3-BAU-16: Darstellung nach dem KERN-Formularmuster;
// Texte, IDs, aria-pressed, Reihenfolge und Nutzlast unverändert.
export default function Schritt2({ formData, setFormData }) {
    return (
        <div className="space-y-6">
            <p className={labelKlassen}>
                2. Welcher Sanierungsumfang ist geplant?
            </p>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {SCOPES.map((sc) => {
                    const gewaehlt = formData.scope === sc.id;
                    return (
                        <button
                            key={sc.id}
                            type="button"
                            aria-pressed={gewaehlt}
                            onClick={() => setFormData({ ...formData, scope: sc.id })}
                            className={optionClass(gewaehlt)}
                            data-motion="zustand"
                        >
                            <span className="mb-1 block font-semibold">{sc.title}</span>
                            <span className={`block text-fs-1 ${gewaehlt ? 'text-nacht-2' : 'text-tinte-2'}`}>{sc.desc}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );
}
