import { ArrowRight, ArrowLeft } from 'lucide-react';
import { AREA_OPTIONS, TIMING_OPTIONS } from './logik';
import { inputClass, optionClass } from './stile';

// Schritt 2: Fläche, Zeitraum und Ort (E-011: aus TezgelAnfrageFunnel.tsx verschoben, Markup unverändert).
export default function Schritt2({ setStep, selectedArea, setSelectedArea, customArea, setCustomArea, timing, setTiming, location, setLocation }) {
    return (
        <div className="space-y-6 relative z-10">
          <div>
            <span id="funnel-area-heading" className="block text-sm font-bold text-neutral-800 mb-2">
              Ungefähre Fläche in Quadratmetern
            </span>
            <div role="group" aria-labelledby="funnel-area-heading" className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
              {AREA_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => {
                    setSelectedArea(opt);
                    setCustomArea('');
                  }}
                  className={optionClass(selectedArea === opt && !customArea)}
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
            <span id="funnel-timing-heading" className="block text-sm font-bold text-neutral-800 mb-2">
              Gewünschter Ausführungszeitraum
            </span>
            <div role="group" aria-labelledby="funnel-timing-heading" className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {TIMING_OPTIONS.map((opt) => (
                <button
                  type="button"
                  key={opt}
                  onClick={() => setTiming(opt)}
                  className={optionClass(timing === opt)}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label htmlFor="funnel-location" className="block text-sm font-bold text-neutral-800 mb-1.5">
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
            <p className="text-xs text-neutral-700 font-medium mt-1">Wir arbeiten im Lahn-Dill-Kreis, Raum Gießen und ganz Hessen.</p>
          </div>

          <div className="pt-4 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-neutral-700 hover:text-orange-800"
            >
              <ArrowLeft className="w-4 h-4" />
              Zurück
            </button>
            <button
              type="button"
              onClick={() => setStep(3)}
              className="btn-primary w-full sm:w-auto"
            >
              Weiter zu Schritt 3: Kontaktdaten
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
    );
}
