import { labelKlassen, wahlKlassen } from '@/components/kern/stile';
import { TIER_OPTIONS } from '@/lib/formulare/useProjektCheck';

// 3. Ausstattungsniveau (E-011: aus BadProjektCheck.jsx verschoben). E3-BAU-19: Darstellung nach dem KERN-Formularmuster
// (Auswahlknopf wahlKlassen, Nebentext nach Zustand); Texte, IDs, aria-pressed, Reihenfolge und Nutzlast unverändert.
export default function Schritt3({ tier, setTier }) {
    return (
        <fieldset className="min-w-0">
            <legend className={labelKlassen}>
                3. Ausstattungsniveau:
            </legend>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
                {TIER_OPTIONS.map((t) => {
                    const isSelected = tier === t.id;
                    return (
                        <button
                            key={t.id}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setTier(t.id)}
                            className={wahlKlassen}
                            data-motion="zustand"
                        >
                            <span className="block w-full text-left">
                                <span className="block font-semibold">{t.label}</span>
                                <span className={`block text-fs-1 ${isSelected ? 'text-nacht-2' : 'text-tinte-2'}`}>{t.desc}</span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}
