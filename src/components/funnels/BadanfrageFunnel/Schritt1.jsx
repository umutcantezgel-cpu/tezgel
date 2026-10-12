import { OBJECT_TYPES } from '@/lib/formulare/useBadanfrage';
import { frageClass, kachelClass, kachelInhaltClass, nummerClass } from './stile';

// Schritt 1: Objekttyp (Q-01: Darstellung nach KERN v2 wie die Express-Anfrage; Texte, Namen und Verhalten unverändert).
// Die Schrittfrage benennt die Gruppe der Auswahlknöpfe (role="group" + aria-labelledby, neu).
export default function Schritt1({ formData, setFormData }) {
    return (
        <div className="flex flex-col gap-6">
            <p id="badanfrage-frage-1" className={frageClass}>
                <span className={nummerClass}>1.</span> Um welche Art von Immobilie handelt es sich?
            </p>
            <div role="group" aria-labelledby="badanfrage-frage-1" className="grid grid-cols-1 gap-2 @xl:grid-cols-2 @6xl:grid-cols-4">
                {OBJECT_TYPES.map((obj) => (
                    <button
                        key={obj.id}
                        type="button"
                        aria-pressed={formData.objectType === obj.id}
                        onClick={() => setFormData({ ...formData, objectType: obj.id })}
                        className={kachelClass}
                        data-motion="zustand"
                    >
                        <span className={kachelInhaltClass}>
                            <span className="block text-fs-3 font-semibold">{obj.title}</span>
                            <span className="block text-fs-1">{obj.desc}</span>
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}
