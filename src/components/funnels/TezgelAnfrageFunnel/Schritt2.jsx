import Icon from '@/components/icons/Icon';
import { hilfeKlassen, knopfKlassen, labelKlassen } from '@/components/kern/stile';
import { AREA_OPTIONS, TIMING_OPTIONS } from './logik';
import { inputClass, optionClass } from './stile';

// Schritt 2: Fläche, Zeitraum und Ort (E2-ORCH-08: Darstellung nach KERN; Texte, Namen und Verhalten unverändert).
export default function Schritt2({ setStep, selectedArea, setSelectedArea, customArea, setCustomArea, timing, setTiming, location, setLocation }) {
    return (
        <div className="flex flex-col gap-8">
          <div>
            <span id="funnel-area-heading" className={labelKlassen}>
              Ungefähre Fläche in Quadratmetern
            </span>
            <div role="group" aria-labelledby="funnel-area-heading" className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {AREA_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => {
                    setSelectedArea(opt);
                    setCustomArea('');
                  }}
                  aria-pressed={selectedArea === opt && !customArea}
                  className={optionClass}
                  data-motion="zustand"
                >
                  {opt}
                </button>
              ))}
            </div>
            <label htmlFor="funnel-custom-area" className="sr-only">
              Genaue Quadratmeterzahl eingeben
            </label>
            <input
              id="funnel-custom-area"
              type="text"
              placeholder="Oder genaue m²-Zahl eingeben (z. B. 24 m²)"
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
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="funnel-location" className={labelKlassen}>
              Einsatzort / Postleitzahl
            </label>
            <input
              id="funnel-location"
              type="text"
              placeholder="z. B. 35614 Aßlar, 35578 Wetzlar oder Nachbarort"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className={inputClass}
            />
            <p className={hilfeKlassen}>Wir arbeiten im Lahn-Dill-Kreis, Raum Gießen und ganz Hessen.</p>
          </div>

          <div className="flex flex-col-reverse items-stretch justify-between gap-4 border-t border-fuge pt-6 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={knopfKlassen('text')}
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
