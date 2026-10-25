import { SCOPES } from '@/lib/formulare/useBadanfrage';
import { frageClass, kachelClass, kachelInhaltClass, nummerClass } from './stile';

// Schritt 2: Sanierungsumfang (Q-01: Darstellung nach KERN v2 wie die Express-Anfrage; Texte, Namen und Verhalten unverändert).
// Die Schrittfrage benennt die Gruppe der Auswahlknöpfe (role="group" + aria-labelledby, neu) und nimmt nach einem
// Zustandswechsel den Fokus auf, wenn das bediente Element verschwunden ist (F-04, tabIndex -1, siehe index).
export default function Schritt2({ formData, setFormData }) {
    return (
        <div className="flex flex-col gap-6">
            <p id="badanfrage-frage-2" className={frageClass} tabIndex={-1} data-fokusziel>
                <span className={nummerClass}>2.</span> Was soll im Bad gemacht werden?
            </p>
            <div role="group" aria-labelledby="badanfrage-frage-2" className="grid grid-cols-1 gap-2 @xl:grid-cols-2 @6xl:grid-cols-4">
                {SCOPES.map((sc) => (
                    <button
                        key={sc.id}
                        type="button"
                        aria-pressed={formData.scope === sc.id}
                        onClick={() => setFormData({ ...formData, scope: sc.id })}
                        className={kachelClass}
                        data-motion="zustand"
                    >
                        <span className={kachelInhaltClass}>
                            <span className="block text-fs-3 font-semibold">{sc.title}</span>
                            <span className="block text-fs-1">{sc.desc}</span>
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
