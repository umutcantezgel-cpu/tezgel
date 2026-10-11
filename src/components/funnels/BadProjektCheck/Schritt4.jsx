import Icon from '@/components/icons/Icon';
import { labelKlassen, wahlKlassen } from '@/components/kern/stile';
import { EXTRA_OPTIONS } from '@/lib/formulare/useProjektCheck';

// 4. Wunschausstattung und Extras (E-011: aus BadProjektCheck.jsx verschoben). E3-BAU-19: Darstellung nach dem KERN-Formularmuster;
// Haken-Icon bei Auswahl statt lucide Check. Texte, IDs, aria-pressed, Reihenfolge und Nutzlast unverändert.
export default function Schritt4({ selectedOptions, toggleOption }) {
    return (
        <fieldset className="min-w-0">
            <legend className={labelKlassen}>
                4. Wunschausstattung &amp; Extras:
            </legend>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {EXTRA_OPTIONS.map((opt) => {
                    const isSelected = selectedOptions.includes(opt.id);
                    return (
                        <button
                            key={opt.id}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => toggleOption(opt.id)}
                            className={wahlKlassen}
                            data-motion="zustand"
                        >
                            <span className="flex w-full items-center justify-between gap-2 text-left">
                                <span>{opt.label}</span>
                                {isSelected && <Icon name="haken" groesse={4} />}
                            </span>
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}
