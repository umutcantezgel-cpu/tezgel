import { labelKlassen } from '@/components/kern/stile';
import { NBSP, nummerClass } from './stile';

// 1. Badgröße (Schieberegler) (E-011: aus BadProjektCheck.jsx verschoben). Darstellung KERN v2 (Q-02): Schrittnummer und
// Wert in Mono, nativer Regler in Tinte (accent-color, Trefferfläche 44 px), Marken in Mono. id, Grenzen, Schritt und
// Handler unverändert; aria-valuetext nennt den Wert wie sichtbar („8,2 m²“ statt „8.2“).
// F-05: geschütztes Leerzeichen vor „m²“; die Marken richten sich nach der Breite der Schrittspalte (@container in index.jsx).
export default function Schritt1({ sqm, changeSqm, sqmLabel }) {
    return (
        <div className="min-w-0">
            <div className="flex flex-wrap items-center justify-between gap-3">
                <label htmlFor="budget-sqm" className={labelKlassen}>
                    <span className={nummerClass}>1.</span> Badezimmer-Größe in Quadratmetern:
                </label>
                <span className="whitespace-nowrap border border-fuge bg-kalk px-3 py-1 font-mono text-fs-4 tabular-nums text-tinte">
                    {sqmLabel}{NBSP}m²
                </span>
            </div>
            <input
                id="budget-sqm"
                type="range"
                min="3.5"
                max="25"
                step="0.5"
                value={sqm}
                aria-valuetext={`${sqmLabel} m²`}
                onChange={(e) => changeSqm(e.target.value)}
                className="mt-4 block h-11 w-full cursor-pointer accent-tinte"
            />
            {/* Marken: zwei Spalten, vier nebeneinander ab 36 rem Schrittspalte; wird es eng, steht die Bezeichnung als Ganzes in
                der zweiten Zeile (nie „(Gäste-“ / „WC)“) */}
            <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-fs-1 tabular-nums text-tinte-2 @xl:grid-cols-4">
                <span>3,5{NBSP}m² <span className="whitespace-nowrap">(Gäste-WC)</span></span>
                <span className="text-right @xl:text-center">8,2{NBSP}m² <span className="whitespace-nowrap">(Standard)</span></span>
                <span className="@xl:text-center">15,9{NBSP}m² <span className="whitespace-nowrap">(Komfort)</span></span>
                <span className="text-right">25{NBSP}m² <span className="whitespace-nowrap">(Spa)</span></span>
            </div>
        </div>
    );
}
