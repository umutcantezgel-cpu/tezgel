import Icon from '@/components/icons/Icon';
import { hilfeKlassen, knopfKlassen, labelKlassen } from '@/components/kern/stile';
import { AREA_OPTIONS, TIMING_OPTIONS } from '@/lib/formulare/useAnfrageFunnel';
import { anzeige } from '@/lib/formulare/anzeige';
import { inputClass, optionClass } from './stile';

// Schritt 2: Fläche, Zeitraum und Ort (E2-ORCH-08: Darstellung nach KERN; Texte, Namen und Verhalten unverändert).
export default function Schritt2({ setStep, selectedArea, selectArea, customArea, setCustomArea, timing, setTiming, location, setLocation }) {
    return (
        <div className="flex flex-col gap-8">
          <div>
            <span id="funnel-area-heading" className={labelKlassen}>
              Ungefähre Fläche in Quadratmetern
            </span>
            <div role="group" aria-labelledby="funnel-area-heading" className="@container mt-2 grid grid-cols-1 gap-2 @3xs:grid-cols-2 sm:grid-cols-4">
              {AREA_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => selectArea(opt)}
                  aria-pressed={selectedArea === opt && !customArea}
                  className={optionClass}
                  data-motion="zustand"
                >
                  {anzeige(opt)}
                </button>
              ))}
            </div>
            <label htmlFor="funnel-custom-area" className="sr-only">
              Genaue Quadratmeterzahl eingeben
            </label>
            <input
              id="funnel-custom-area"
              type="text"
              placeholder="Oder genaue Zahl eingeben, z. B. 24 m²"
              value={customArea}
              onChange={(e) => setCustomArea(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <span id="funnel-timing-heading" className={labelKlassen}>
              Gewünschter Ausführungszeitraum
            </span>
            <div role="group" aria-labelledby="funnel-timing-heading" className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-3">
              {TIMING_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setTiming(opt)}
                  aria-pressed={timing === opt}
                  className={optionClass}
                  data-motion="zustand"
                >
                  {anzeige(opt)}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="funnel-location" className={labelKlassen}>
              Ort oder Postleitzahl
            </label>
            <input
              id="funnel-location"
              type="text"
              placeholder="z. B. 35614 Aßlar, 35578 Wetzlar oder ein Nachbarort"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputClass}
            />
            <p className={hilfeKlassen}>Wir arbeiten im Lahn-Dill-Kreis, Raum Gießen und ganz Hessen.</p>
          </div>

          {/* Knopffolge (R-01b nach Gutachten u4, Rezept 2; WCAG 1.3.2/2.4.3): sichtbar = DOM- und Tab-Folge, kein
              flex-col-reverse. Ab sm eine Zeile: „Zurück“ links, „Weiter“ rechts; darunter gestapelt in DOM-Folge
              („Zurück“ über „Weiter“ in voller Breite). */}
          <div className="flex flex-col items-stretch gap-4 border-t border-fuge pt-6 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={knopfKlassen('text', 'self-start sm:self-auto')}
              data-motion="druck"
            >
              <Icon name="pfeil-links" groesse={5} />
              Zurück
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className={knopfKlassen('haupt', 'w-full sm:w-auto')}
              data-motion="druck"
            >
              Weiter zu Schritt 3: Kontaktdaten
              <Icon name="pfeil-rechts" groesse={5} />
            </button>
          </div>
        </div>
    );
}
