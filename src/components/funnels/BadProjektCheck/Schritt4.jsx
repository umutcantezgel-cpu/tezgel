import Icon from '@/components/icons/Icon';
import { labelKlassen } from '@/components/kern/stile';
import { EXTRA_OPTIONS } from '@/lib/formulare/useProjektCheck';
import { extraClass, markeClass, nummerClass } from './stile';

// 4. Wunschausstattung und Extras (E-011: aus BadProjektCheck.jsx verschoben). Darstellung KERN v2 (Q-02): Mehrfachauswahl
// mit Ankreuzmarke (Muster „Rahmenbedingungen“ im Preisrechner der Startseite), gewählt = Marke Tinte mit Haken und Rahmen
// Tinte. Der Haken ist dekorativ (aria-hidden): Der Name des Knopfs bleibt genau die Beschriftung, der Zustand steht in aria-pressed.
export default function Schritt4({ selectedOptions, toggleOption }) {
    return (
        <fieldset>
            <legend className={labelKlassen}>
                <span className={nummerClass}>4.</span> Wunschausstattung &amp; Extras:
            </legend>
            <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                {EXTRA_OPTIONS.map((opt) => {
                    const isSelected = selectedOptions.includes(opt.id);
                    return (
                        <button
                            key={opt.id}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() => toggleOption(opt.id)}
                            className={extraClass}
                            data-motion="zustand"
                        >
                            <span className={markeClass(isSelected)}>
                                {isSelected && <Icon name="haken" groesse={4} />}
                            </span>
                            <span>{opt.label}</span>
                        </button>
                    );
                })}
            </div>
        </fieldset>
    );
}
