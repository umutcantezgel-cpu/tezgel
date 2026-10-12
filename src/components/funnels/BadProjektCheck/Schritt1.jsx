import { labelKlassen } from '@/components/kern/stile';
import { nummerClass } from './stile';

// 1. Badgröße (Schieberegler) (E-011: aus BadProjektCheck.jsx verschoben). Darstellung KERN v2 (Q-02): Schrittnummer und
// Wert in Mono, nativer Regler in Tinte (accent-color, Trefferfläche 44 px), Marken in Mono. id, Grenzen, Schritt und
// Handler unverändert; aria-valuetext nennt den Wert wie sichtbar („8,2 m²“ statt „8.2“).
export default function Schritt1({ sqm, changeSqm, sqmLabel }) {
    return (
        <div>
            <div className="flex flex-wrap items-center justify-between gap-3">
                <label htmlFor="budget-sqm" className={labelKlassen}>
                    <span className={nummerClass}>1.</span> Badezimmer-Größe in Quadratmetern:
                </label>
                <span className="whitespace-nowrap border border-fuge bg-kalk px-3 py-1 font-mono text-fs-4 tabular-nums text-tinte">
                    {sqmLabel} m²
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
            {/* Marken: zwei Spalten, vier nebeneinander nur, wo jede Marke in eine Zeile passt (md einspaltig, ab xl zweispaltig) */}
            <div className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 font-mono text-fs-1 tabular-nums text-tinte-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
                <span>3,5 m² (Gäste-WC)</span>
                <span className="text-right md:text-center lg:text-right xl:text-center">8,2 m² (Standard)</span>
                <span className="md:text-center lg:text-left xl:text-center">15,9 m² (Komfort)</span>
                <span className="text-right">25 m² (Spa)</span>
            </div>
        </div>
    );
}
