import { labelKlassen, wahlKlassen } from '@/components/kern/stile';
import { SCOPE_OPTIONS } from '@/lib/formulare/useProjektCheck';

// 2. Sanierungsumfang (E-011: aus BadProjektCheck.jsx verschoben). E3-BAU-19: Darstellung nach dem KERN-Formularmuster
// (Auswahlknopf wahlKlassen, Nebentext nach Zustand); Texte, IDs, aria-pressed, Reihenfolge und Nutzlast unverändert.
export default function Schritt2({ sanitaryScope, setSanitaryScope }) {
    return (
        <fieldset className="min-w-0">
            <legend className={labelKlassen}>
                2. Sanierungsumfang:
            </legend>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {SCOPE_OPTIONS.map((scope) => {
                    const isSelected = sanitaryScope === scope.id;
                    return (
                        <button
                            key={scope.id}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setSanitaryScope(scope.id)}
                            className={wahlKlassen}
                            data-motion="zustand"
                        >
                            <span className="block w-full text-left">
                                <span className="block font-semibold">{scope.label}</span>
                                <span className={`block text-fs-1 ${isSelected ? 'text-nacht-2' : 'text-tinte-2'}`}>{scope.desc}</span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}
