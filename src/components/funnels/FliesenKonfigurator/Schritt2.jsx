import { SUBSTRATE_OPTIONS, YES_NO, YES_NO_UNSURE, toggleInList } from '@/lib/formulare/useFliesenKonfigurator';
import OptionGroup from './OptionGroup';

// Schritt 2: Untergrund (Q-05, KERN v2): Auswahlgruppen mit wahlKlassen; Texte, Namen und Verhalten unverändert.
// Spalten nach Behälterbreite: Ja/Nein/Weiß nicht stehen immer nebeneinander (kurze Beschriftungen).
export default function Schritt2({ data, update }) {
    return (
        <div className="flex flex-col gap-8">
            <OptionGroup
                legend="Untergrund bzw. Bestand (Mehrfachauswahl):"
                hint="Bei mehreren Räumen alles auswählen, was vorkommt."
                options={SUBSTRATE_OPTIONS}
                value={data.substrates}
                multi
                columns="grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3"
                onChange={(id) => {
                    const substrates = toggleInList(data.substrates, id);
                    const patch = { substrates };
                    if (id === 'heizestrich' && substrates.includes('heizestrich')) patch.floorHeating = 'ja';
                    update(patch);
                }}
            />
            {/* Drei Ja/Nein-Fragen ab 56 rem nebeneinander; die Knöpfe stehen auf einer Linie (unten bündig) */}
            <div className="grid grid-cols-1 gap-8 @4xl:grid-cols-3 @4xl:items-end">
                <OptionGroup
                    legend="Ist eine Fußbodenheizung vorhanden oder geplant?"
                    options={YES_NO_UNSURE}
                    value={data.floorHeating}
                    columns="grid-cols-3"
                    onChange={(id) => update({ floorHeating: id })}
                />
                <OptionGroup
                    legend="Muss ein Altbelag zurückgebaut werden?"
                    options={YES_NO_UNSURE}
                    value={data.removal}
                    columns="grid-cols-3"
                    onChange={(id) => update({ removal: id })}
                />
                <OptionGroup
                    legend="Liegt die Fläche in einem Nassbereich (z. B. Duschbereich, Hauswirtschaftsraum mit Bodenablauf)?"
                    options={YES_NO}
                    value={data.wetArea}
                    columns="grid-cols-2"
                    onChange={(id) => update({ wetArea: id })}
                />
            </div>
        </div>
    );
}
