import { labelKlassen } from '@/components/kern/stile';
import { NBSP, nummerClass } from './stile';

// 1. Badgröße (Schieberegler) (E-011: aus BadProjektCheck.jsx verschoben). Darstellung KERN v2 (Q-02): Schrittnummer und
// Wert in Mono, nativer Regler in Tinte (accent-color, Trefferfläche 44 px). id, Grenzen, Schritt und Handler unverändert.
// F-05: geschütztes Leerzeichen vor „m²“.
// E4-W1 (F2, E-065): ohne Vorauswahl. Vor dem ersten Bewegen steht „noch keine Angabe“ (Anzeige und aria-valuetext); der
// Startwert steht nur auf dem Regler. Die Marken sind eine Liste in der Reihenfolge des Reglers, von links nach rechts
// (ab einer Schrittbreite von 32 rem) oder von oben nach unten. Sie tun nicht so, als lägen die Werte an der Reglerstelle.
export default function Schritt1({ sqm, sqmGewaehlt, changeSqm, sqmLabel }) {
    return (
        <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <label htmlFor="budget-sqm" className={labelKlassen}>
                    <span className={nummerClass}>1.</span> Größe des Badezimmers in Quadratmetern:
                </label>
                {sqmGewaehlt ? (
                    <span className="whitespace-nowrap border border-fuge bg-kalk px-3 py-1 font-mono text-fs-4 tabular-nums text-tinte">
                        {sqmLabel}{NBSP}m²
                    </span>
                ) : (
                    <span className="border border-fuge bg-kalk px-3 py-1 font-text text-fs-2 text-tinte-2 hyphens-auto">
                        noch keine Angabe
                    </span>
                )}
            </div>
            <input
                id="budget-sqm"
                type="range"
                min="3.5"
                max="25"
                step="0.5"
                value={sqm}
                aria-valuetext={sqmGewaehlt ? `${sqmLabel} m²` : 'noch keine Angabe'}
                onChange={(e) => changeSqm(e.target.value)}
                // ohne Wahl in Strich statt Tinte: Griff und Füllung stehen nur, weil ein Regler einen Wert braucht, und sollen
                // sichtbar „noch nicht gesetzt“ wirken (Browserprüfung E4-W1 Runde 2, Runde 5 Nr. 4: tinte-2 war kaum heller als
                // Tinte). Strich (tinte-62) bleibt über 3 : 1 gegen Kalk und Fliese (WCAG 1.4.11); Fuge wäre mit 1,3 : 1 zu hell.
                // Gewählt wie bisher in Tinte.
                className={`mt-4 block h-11 w-full cursor-pointer ${sqmGewaehlt ? 'accent-tinte' : 'accent-strich'}`}
            />
            <ul className="mt-2 flex flex-col gap-1 font-mono text-fs-1 tabular-nums text-tinte-2 @lg:flex-row @lg:flex-wrap @lg:gap-x-6">
                <li>3,5{NBSP}m² <span className="whitespace-nowrap">(Gäste-WC)</span></li>
                <li>8,2{NBSP}m² <span className="whitespace-nowrap">(Standard)</span></li>
                <li>15,9{NBSP}m² <span className="whitespace-nowrap">(Komfort)</span></li>
                <li>25{NBSP}m² <span className="whitespace-nowrap">(Spa)</span></li>
            </ul>
        </div>
    );
}
