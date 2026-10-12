import Icon from '@/components/icons/Icon';
import { labelKlassen } from '@/components/kern/stile';
import { TIERS, FEATURES } from '@/lib/formulare/useBadanfrage';
import { ausstattungClass, ausstattungInhaltClass, frageClass, kachelClass, kachelInhaltClass, nummerClass } from './stile';

// Schritt 4: Ausstattung und Qualitätsstufe (Q-01: Darstellung nach KERN v2; Texte, Namen und Verhalten unverändert).
// Qualitätsstufen als Kacheln (Gruppe über die Schrittfrage benannt, neu), Wunschausstattung als Auswahlknöpfe mit
// Haken bzw. Plus; die Zeichen sind dekorativ, der Name bleibt der Text (z. B. „Badewanne“).
export default function Schritt4({ formData, setFormData, toggleFeature }) {
    return (
        <div className="flex flex-col gap-6">
            <p id="badanfrage-frage-4" className={frageClass}>
                <span className={nummerClass}>4.</span> Qualitätskategorie &amp; gewünschte Elemente
            </p>

            <div role="group" aria-labelledby="badanfrage-frage-4" className="grid grid-cols-1 gap-2 @2xl:grid-cols-3">
                {TIERS.map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        aria-pressed={formData.tier === t.id}
                        onClick={() => setFormData({ ...formData, tier: t.id })}
                        className={kachelClass}
                        data-motion="zustand"
                    >
                        <span className={kachelInhaltClass}>
                            <span className="block text-fs-3 font-semibold">{t.title}</span>
                            <span className="block text-fs-1">{t.desc}</span>
                        </span>
                    </button>
                ))}
            </div>

            <fieldset className="pt-2">
                <legend className={labelKlassen}>Wunschausstattung auswählen</legend>
                <div className="mt-2 grid grid-cols-1 gap-2 @md:grid-cols-2 @3xl:grid-cols-3">
                    {FEATURES.map((item) => {
                        const isSelected = formData.features.includes(item.id);
                        return (
                            <button
                                key={item.id}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => toggleFeature(item.id)}
                                className={ausstattungClass}
                                data-motion="zustand"
                            >
                                <span className={ausstattungInhaltClass}>
                                    <Icon name={isSelected ? 'haken' : 'plus'} groesse={4} />
                                    {item.label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </fieldset>
        </div>
    );
}
