import Icon from '@/components/icons/Icon';
import { etikettKlassen, knopfKlassen } from '@/components/kern/stile';
import { PROJECT_TYPES } from '@/lib/formulare/useAnfrageFunnel';
import { projektClass } from './stile';

// Schritt 1: Projekt (E2-ORCH-08: Darstellung nach KERN; Texte, Namen und Verhalten unverändert).
// Je Gewerk ein Fachzeichen der Icon-Familie (E3-NACH-05, Befund 18); dekorativ, ohne Beschriftung.
const PROJEKT_ICONS = { bad: 'bad', wohnen: 'fliese', balkon: 'balkon', treppe: 'naturstein', untergrund: 'untergrund' };

export default function Schritt1({ setStep, projectType, setProjectType }) {
    return (
        <div className="flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {PROJECT_TYPES.map((pt) => {
              const isSelected = projectType === pt.id;
              return (
                <button
                  type="button"
                  key={pt.id}
                  onClick={() => setProjectType(pt.id)}
                  aria-pressed={isSelected}
                  className={`${projektClass} group`}
                  data-motion="zustand"
                >
                  <span className="flex items-start justify-between gap-2">
                    <Icon name={PROJEKT_ICONS[pt.id] || 'fliese'} groesse={6} />
                    <span className={`${etikettKlassen} group-aria-pressed:text-nacht-2`}>{pt.badge}</span>
                  </span>
                  <span>
                    <span className="block text-fs-3 font-semibold">{pt.title}</span>
                    <span className="mt-1 block text-fs-1">{pt.subtitle}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex justify-end border-t border-fuge pt-6">
            <button
              type="button"
              onClick={() => setStep(2)}
              className={knopfKlassen('haupt', 'w-full sm:w-auto')}
              data-motion="druck"
            >
              Weiter zu Schritt 2: Fläche &amp; Ort
              <Icon name="pfeil-rechts" groesse={5} />
            </button>
          </div>
        </div>
    );
}
