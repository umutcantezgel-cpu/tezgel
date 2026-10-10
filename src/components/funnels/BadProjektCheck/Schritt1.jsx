// 1. Badgröße (Schieberegler) (E-011: aus BadProjektCheck.jsx verschoben, Markup unverändert).
export default function Schritt1({ sqm, setSqm, sqmLabel }) {
    return (
        <div>
            <div className="flex items-center justify-between gap-3 mb-2">
                <label htmlFor="budget-sqm" className="text-sm font-black text-slate-900">
                    1. Badezimmer-Größe in Quadratmetern:
                </label>
                <span className="font-display text-base sm:text-lg font-black text-orange-950 bg-orange-50 px-3.5 py-1 rounded-tile-sm border border-orange-200 tabular-nums whitespace-nowrap">
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
                onChange={(e) => setSqm(parseFloat(e.target.value))}
                className="w-full h-2.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
            />
            <div className="flex justify-between text-[10px] sm:text-[11px] text-slate-600 font-semibold mt-1 tabular-nums">
                <span>3,5 m² (Gäste-WC)</span>
                <span>8,2 m² (Standard)</span>
                <span>15,9 m² (Komfort)</span>
                <span>25 m² (Spa)</span>
            </div>
        </div>
    );
}
