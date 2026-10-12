import { SUBSTRATE_OPTIONS, YES_NO, YES_NO_UNSURE, toggleInList } from '@/lib/formulare/useFliesenKonfigurator';
import OptionGroup from './OptionGroup';

// Schritt 2: Untergrund (F-06, Fusion E-039): eine Frage je Zeile, linksbündig, Fugenraster mit Haken (A); Untergrund
// mobil einspaltig, Ja/Nein/Weiß nicht immer in drei Spalten (B), großzügiger Abstand zwischen den Fragegruppen (B).
// Texte, Namen und Verhalten unverändert.
export default function Schritt2({ data, update }) {
    return (
        <div className="flex flex-col gap-12">
            <OptionGroup
                legend="Untergrund bzw. Bestand (Mehrfachauswahl):"
                hint="Bei mehreren Räumen alles auswählen, was vorkommt."
                options={SUBSTRATE_OPTIONS}
                value={data.substrates}
                multi
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
                muster="dreier"
                onChange={(id) => update({ floorHeating: id })}
            />
            <OptionGroup
                legend="Muss ein Altbelag zurückgebaut werden?"
                options={YES_NO_UNSURE}
                value={data.removal}
                muster="dreier"
                onChange={(id) => update({ removal: id })}
            />
            <OptionGroup
                legend="Liegt die Fläche in einem Nassbereich (z. B. Duschbereich, Hauswirtschaftsraum mit Bodenablauf)?"
                options={YES_NO}
                value={data.wetArea}
                muster="paar"
                onChange={(id) => update({ wetArea: id })}
            />
        </div>
    );
}
