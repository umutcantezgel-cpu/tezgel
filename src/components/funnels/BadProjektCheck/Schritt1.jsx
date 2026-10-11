import { labelKlassen } from '@/components/kern/stile';

// 1. Badgröße (Schieberegler) (E-011: aus BadProjektCheck.jsx verschoben). E3-BAU-19: Darstellung nach dem KERN-Formularmuster;
// Label, IDs, Grenzen, Schrittweite, Anzeige und Skalenbeschriftung unverändert.
export default function Schritt1({ sqm, changeSqm, sqmLabel }) {
    return (
        <div className="min-w-0">
            <div className="mb-2 flex items-center justify-between gap-4">
                <label htmlFor="budget-sqm" className={labelKlassen}>
                    1. Badezimmer-Größe in Quadratmetern:
                </label>
                <span className="whitespace-nowrap border border-strich bg-fliese px-4 py-1 font-anzeige text-fs-4 font-semibold tabular-nums text-tinte">
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
                onChange={(e) => changeSqm(e.target.value)}
                className="block h-2 w-full cursor-pointer appearance-none bg-strich accent-tinte"
            />
            <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-fs-1 tabular-nums text-tinte-2 sm:flex sm:justify-between">
                <span>3,5 m² (Gäste-WC)</span>
                <span className="text-right">8,2 m² (Standard)</span>
                <span>15,9 m² (Komfort)</span>
                <span className="text-right">25 m² (Spa)</span>
            </div>
        </div>
    );
}
