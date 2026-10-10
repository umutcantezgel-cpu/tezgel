import { SUBSTRATE_OPTIONS, YES_NO, YES_NO_UNSURE, toggleInList } from './logik';
import OptionGroup from './OptionGroup';

// Schritt 2: Untergrund (E-011: aus FliesenKonfigurator.jsx verschoben, Markup unverändert).
export default function Schritt2({ data, update }) {
    return (
        <div className="space-y-6">
            <OptionGroup
                legend="Untergrund bzw. Bestand (Mehrfachauswahl):"
                hint="Bei mehreren Räumen alles auswählen, was vorkommt."
                options={SUBSTRATE_OPTIONS}
                value={data.substrates}
                multi
                columns="grid-cols-1 sm:grid-cols-2"
                onChange={(id) => {
                    const substrates = toggleInList(data.substrates, id);
                    const patch = { substrates };
                    if (id === 'heizestrich' && substrates.includes('heizestrich')) patch.floorHeating = 'ja';
                    update(patch);
                }}
            />
            <OptionGroup
                legend="Ist eine Fußbodenheizung vorhanden oder geplant?"
                options={YES_NO_UNSURE}
                value={data.floorHeating}
                onChange={(id) => update({ floorHeating: id })}
            />
            <OptionGroup
                legend="Muss ein Altbelag zurückgebaut werden?"
                options={YES_NO_UNSURE}
                value={data.removal}
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
    );
}
