import Icon from '@/components/icons/Icon';
import { knopfKlassen } from '@/components/kern/stile';
import { PROJECT_TYPES } from '@/lib/formulare/useAnfrageFunnel';
import { projektClass } from './stile';
import { kachelTitel } from '@/components/kern/zusammen';

// Schritt 1: Projekt (E2-ORCH-08: Darstellung nach KERN; Texte, Namen und Verhalten unverändert).
// Je Gewerk ein Fachzeichen der Icon-Familie (E3-NACH-05, Befund 18); dekorativ, ohne Beschriftung.
// E4-NACH-05: Feldraster mit 1-px-Fugen statt Zwischenraum und ohne Loch; keine wertenden Eckmarken
// (pt.badge bleibt in useAnfrageFunnel erhalten); mobil dichte Auswahlzeilen, ab sm Kachelform.
const PROJEKT_ICONS = { bad: 'bad', wohnen: 'fliese', balkon: 'balkon', treppe: 'treppe', untergrund: 'untergrund' };

// Spannen je Option (Reihenfolge wie PROJECT_TYPES): lg zwei Reihen zu 3 + 2 Feldern (Halbverband),
// ab sm das fünfte Feld über beide Spalten.
const PROJEKT_SPANNE = ['lg:col-span-2', 'lg:col-span-2', 'lg:col-span-2', 'lg:col-span-3', 'sm:col-span-2 lg:col-span-3'];

export default function Schritt1({ setStep, projectType, setProjectType }) {
    // @container auf der ganzen Spalte: die Knopfzeile unten liegt sonst außerhalb jeder Containerabfrage (E4-W1, F4)
    return (
        <div className="@container flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-px border border-fuge bg-fuge sm:grid-cols-2 lg:grid-cols-6">
            {PROJECT_TYPES.map((pt, idx) => {
              const isSelected = projectType === pt.id;
              return (
                <button
                  type="button"
                  key={pt.id}
                  onClick={() => setProjectType(pt.id)}
                  aria-pressed={isSelected}
                  className={`${projektClass} min-h-11 py-3 sm:py-4 ${PROJEKT_SPANNE[idx] ?? ''}`}
                  data-motion="zustand"
                >
                  {/* Mobil eine Zeile: Fachzeichen links, Text rechts. Ab sm Kachel: Fachzeichen oben, Text unten. */}
                  <span className="flex min-w-0 flex-1 items-center gap-4 @max-3xs:flex-col @max-3xs:items-stretch sm:flex-col sm:items-start sm:justify-between sm:gap-6">
                    <Icon name={PROJEKT_ICONS[pt.id] || 'fliese'} groesse={5} className="sm:size-6" />
                    <span className="min-w-0">
                      <span className="block text-fs-3 font-semibold @max-3xs:hyphens-auto wrap-break-word">{kachelTitel(pt.title)}</span>
                      <span className="mt-1 block text-fs-1 @max-3xs:hyphens-auto wrap-break-word">{pt.subtitle}</span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Bei großer Schrift reicht die Knopfzeile bis an den Kartenrand (-mx-4 = Innenabstand der Karte): der Weiter-Knopf
              behält so Platz für drei Zeilen Text und den Pfeil am letzten Wort (E4-W1, F4) */}
          <div className="flex justify-end border-t border-fuge pt-6 @max-3xs:-mx-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className={knopfKlassen('haupt', 'w-full sm:w-auto')}
              data-motion="druck"
            >
              {/* Text und Pfeil in einem Block: der Pfeil sitzt hinter dem letzten Wort, nicht mittig zur ganzen Textspalte */}
              <span className="hyphens-auto wrap-break-word">
                Weiter zu Schritt&nbsp;2: Fläche und Ort&nbsp;<Icon name="pfeil-rechts" groesse={5} className="inline-block align-[-0.2em]" />
              </span>
            </button>
          </div>
        </div>
    );
}
