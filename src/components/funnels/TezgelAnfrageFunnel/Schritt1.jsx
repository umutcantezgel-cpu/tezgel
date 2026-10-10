import { ArrowRight } from 'lucide-react';
import { PROJECT_TYPES } from './logik';

// Schritt 1: Projekt (E-011: aus TezgelAnfrageFunnel.tsx verschoben, Markup unverändert).
export default function Schritt1({ setStep, projectType, setProjectType }) {
    return (
        <div className="space-y-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {PROJECT_TYPES.map((pt) => {
              const IconComp = pt.icon;
              const isSelected = projectType === pt.id;
              return (
                <button
                  type="button"
                  key={pt.id}
                  onClick={() => setProjectType(pt.id)}
                  aria-pressed={isSelected}
                  className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all duration-200 ${
                    isSelected
                      ? 'bg-orange-50/80 border-orange-600 ring-2 ring-orange-600/20 shadow-md'
                      : 'bg-white border-neutral-200 hover:border-orange-500/80 hover:-translate-y-0.5'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <span className="icon-chip w-11 h-11">
                      <IconComp className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 text-neutral-600">
                      {pt.badge}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-neutral-900 text-base mb-1">{pt.title}</p>
                    <p className="text-xs text-neutral-600 leading-relaxed">{pt.subtitle}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-neutral-200 flex justify-end">
            <button
              type="button"
              onClick={() => setStep(2)}
              className="btn-primary w-full sm:w-auto"
            >
              Weiter zu Schritt 2: Fläche &amp; Ort
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
    );
}
