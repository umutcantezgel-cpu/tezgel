import Icon from '@/components/icons/Icon';
import { labelKlassen, wahlKlassen } from '@/components/kern/stile';
import { TIERS, FEATURES } from '@/lib/formulare/useBadanfrage';
import { optionClass } from './stile';

// Schritt 4: Ausstattung und Qualitätsstufe (E-011: aus BadanfrageFunnel.jsx verschoben). E3-BAU-17: Darstellung nach dem
// KERN-Formularmuster; Texte, IDs, aria-pressed, Reihenfolge und Nutzlast unverändert.
export default function Schritt4({ formData, setFormData, toggleFeature }) {
    return (
        <div className="space-y-6">
            <p className={labelKlassen}>
                4. Qualitätskategorie &amp; gewünschte Elemente
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {TIERS.map((t) => {
                    const gewaehlt = formData.tier === t.id;
                    return (
                        <button
                            key={t.id}
                            type="button"
                            aria-pressed={gewaehlt}
                            onClick={() => setFormData({ ...formData, tier: t.id })}
                            className={optionClass(gewaehlt, 'p-4')}
                            data-motion="zustand"
                        >
                            <span className="mb-1 block font-semibold">{t.title}</span>
                            <span className={`block text-fs-1 ${gewaehlt ? 'text-nacht-2' : 'text-tinte-2'}`}>{t.desc}</span>
                        </button>
                    );
                })}
            </div>

            <fieldset className="pt-3">
                <legend className={labelKlassen}>Wunschausstattung auswählen</legend>
                <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {FEATURES.map((item) => {
                        const isSelected = formData.features.includes(item.id);
                        return (
                            <button
                                key={item.id}
                                type="button"
                                aria-pressed={isSelected}
                                onClick={() => toggleFeature(item.id)}
                                className={`${wahlKlassen} gap-2`}
                                data-motion="zustand"
                            >
                                <Icon name={isSelected ? 'haken' : 'plus'} groesse={4} />
                                {item.label}
                            </button>
                        );
                    })}
                </div>
            </fieldset>
        </div>
    );
}
