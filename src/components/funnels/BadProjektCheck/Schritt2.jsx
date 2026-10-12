import { labelKlassen, wahlKlassen } from '@/components/kern/stile';
import { SCOPE_OPTIONS } from '@/lib/formulare/useProjektCheck';
import { nummerClass } from './stile';

// 2. Sanierungsumfang (E-011: aus BadProjektCheck.jsx verschoben). Darstellung KERN v2 (Q-02): Auswahl mit wahlKlassen
// (gewählt = Tinte-Fläche über aria-pressed), Farbwechsel über data-motion="zustand"; Knöpfe, Texte und Handler unverändert.
export default function Schritt2({ sanitaryScope, setSanitaryScope }) {
    return (
        <fieldset>
            <legend className={labelKlassen}>
                <span className={nummerClass}>2.</span> Sanierungsumfang:
            </legend>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-3">
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
                            <span className="flex flex-col gap-1">
                                <span className="block font-semibold">{scope.label}</span>
                                <span className="block text-fs-1">{scope.desc}</span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}
