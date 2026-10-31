import Icon from '@/components/icons/Icon';
import { knopfKlassen } from '@/components/kern/stile';
import { PROJECT_TYPES } from '@/lib/formulare/useAnfrageFunnel';
import { projektClass } from './stile';
import { kachelTitel } from '@/components/kern/zusammen';

// Schritt 1: Projekt (E2-ORCH-08: Darstellung nach KERN; Texte, Namen und Verhalten unverändert).
// Je Gewerk ein Fachzeichen der Icon-Familie (E3-NACH-05, Befund 18); dekorativ, ohne Beschriftung.
// E4-NACH-05: Feldraster mit 1-px-Fugen statt Zwischenraum und ohne Loch; keine wertenden Eckmarken
// (pt.badge bleibt in useAnfrageFunnel erhalten); mobil dichte Auswahlzeilen, ab sm Kachelform.
// UM-E4-SICHT-FIX M-C2 Nr. 6 (nur Darstellung; Werte, Namen, Felder und Verhalten gleich, G8): gleiche Spaltenbreiten (ab sm zwei,
// ab lg drei Spalten), die zweite Reihe in denselben Spalten; die freie letzte Zelle ist ruhige Fläche (bg-fliese, ohne Rolle),
// sonst zeigte das Feldraster dort seine Fugenfarbe. In jeder Kachel Symbol, Titel und Satz oben bündig, damit alle Titel
// einer Reihe auf einer Linie stehen (vorher unten bündig: Titel auf vier Höhen, Sichtabnahme E4 /kontakt a3, /leistungen b5).
// Symbol auf allen Breiten Stufe 6 (24 px). Spalten nach der Breite des Formularkastens, nicht des Fensters (Nacharbeit SF-C2):
// ab 28rem zwei, ab 48rem drei Spalten; darunter die dichten Auswahlzeilen. Im schmalen Kasten von /kontakt standen ab lg drei
// Spalten mit rund 116 px, „Untergrund und Abdichtung“ brach in drei, der Satz darunter in vier Zeilen.
const PROJEKT_ICONS = { bad: 'bad', wohnen: 'fliese', balkon: 'balkon', treppe: 'treppe', untergrund: 'untergrund' };

export default function Schritt1({ setStep, projectType, setProjectType }) {
    // @container auf der ganzen Spalte: die Knopfzeile unten liegt sonst außerhalb jeder Containerabfrage (E4-W1, F4)
    return (
        <div className="@container flex flex-col gap-8">
          <div className="grid grid-cols-1 gap-px border border-fuge bg-fuge @md:grid-cols-2 @3xl:grid-cols-3">
            {PROJECT_TYPES.map((pt) => {
              const isSelected = projectType === pt.id;
              return (
                <button
                  type="button"
                  key={pt.id}
                  onClick={() => setProjectType(pt.id)}
                  aria-pressed={isSelected}
                  className={`${projektClass} min-h-11 py-3 @md:py-4`}
                  data-motion="zustand"
                >
                  {/* Schmal eine Zeile: Fachzeichen links, Text rechts. Ab 28rem Kasten Kachel: Fachzeichen, Titel und Satz oben bündig. */}
                  <span className="flex min-w-0 flex-1 items-center gap-4 @max-3xs:flex-col @max-3xs:items-stretch @md:flex-col @md:items-start @md:justify-start @md:gap-3">
                    <Icon name={PROJEKT_ICONS[pt.id] || 'fliese'} groesse={6} className="shrink-0" />
                    <span className="min-w-0">
                      <span className="block text-fs-3 font-semibold @max-3xs:hyphens-auto wrap-break-word">{kachelTitel(pt.title)}</span>
                      <span className="mt-1 block text-fs-1 @max-3xs:hyphens-auto wrap-break-word">{pt.subtitle}</span>
                    </span>
                  </span>
                </button>
              );
            })}
            {/* freie Zelle der letzten Reihe (5 Felder in 2 bzw. 3 Spalten): Fläche statt Fugenfarbe */}
            {PROJECT_TYPES.length % 2 === 1 && <span aria-hidden="true" className="hidden bg-fliese @md:block" />}
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
