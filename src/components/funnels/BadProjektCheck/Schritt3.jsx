import { labelKlassen } from '@/components/kern/stile';
import { TIER_OPTIONS } from '@/lib/formulare/useProjektCheck';
import { einfachClass, nummerClass } from './stile';

// 3. Ausstattungsniveau (E-011: aus BadProjektCheck.jsx verschoben). Darstellung KERN v2 (Q-02): Auswahl mit wahlKlassen
// (gewählt = Tinte-Fläche über aria-pressed), Farbwechsel über data-motion="zustand"; Knöpfe, Texte und Handler unverändert.
// F-05: drei nebeneinander erst ab 32 rem Schrittspalte (@container), Knopftexte brechen in der Spalte um statt überzustehen.
export default function Schritt3({ tier, setTier }) {
    return (
        <fieldset className="min-w-0">
            <legend className={labelKlassen}>
                <span className={nummerClass}>3.</span> Ausstattungsniveau:
            </legend>
            <div className="mt-3 grid grid-cols-1 gap-2 @lg:grid-cols-3">
                {TIER_OPTIONS.map((t) => {
                    const isSelected = tier === t.id;
                    return (
                        <button
                            key={t.id}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => setTier(t.id)}
                            className={einfachClass}
                            data-motion="zustand"
                        >
                            <span className="flex min-w-0 flex-col gap-1 break-words">
                                <span className="block font-semibold">{t.label}</span>
                                <span className="block text-fs-1">{t.desc}</span>
                            </span>
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}
