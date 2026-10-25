"use client";

// Projektanfrage (E2-ORCH-08; K-016 „Ruhe“): oben die Angaben als Felder an der Fuge, darunter Zusammenfassung und
// Kontakt als Schriftfeld auf Tinte, auf jeder Breite untereinander in der Lesebreite (kein zweiter Strang daneben). Logik, Nutzlast, IDs, Knopfnamen und Texte unverändert (Test funktion-preisrechner);
// das pulsierende Absende-Element (HeartbeatCTA) entfällt – Bewegung nur nach Register.
// Zustände, Prüfung und Absenden kommen aus usePreisrechner (P3-00l, eine Logik für Bestand und Kern); dort startet die
// Einwilligung leer (Fairness, E-014).
import {
  CRAFT_SERVICES,
  ROOM_SIZES,
  SITUATION_OPTIONS,
  TIMING_OPTIONS,
  type CraftServiceType,
} from "./pricing.constants";
import Icon from "@/components/icons/Icon";
import Verlegeplan from "@/components/kern/Verlegeplan";
import type { PlanName } from "@/lib/plaene/vorgaben";
import Fugenkreuz from "@/components/kern/Fugenkreuz";
import Knopf from "@/components/kern/Knopf";
import { etikettForm, etikettKlassen, feldKlassen, labelKlassen } from "@/components/kern/stile";
import PflichtHinweis from "@/components/kern/PflichtHinweis";
import Rufnummer from "@/components/kern/Rufnummer";
import { siteConfig } from "@/lib/config";
import { usePreisrechner } from "@/lib/formulare/usePreisrechner";
import { anzeige } from "@/lib/formulare/anzeige";

const SERVICE_PLAENE: Record<CraftServiceType, PlanName> = {
  bad: "bad",
  grossformat: "grossformat",
  wohnbereich: "wohnen",
  balkon: "balkon",
  abdichtung: "abdichtung",
  reparatur: "reparatur",
};

/** Beschriftung auf der Tinte-Fläche */
const labelHell = "block font-text text-fs-2 font-semibold text-kalk";
/** Auswahlfeld mit Titel und Unterzeile (aria-pressed) */
const optionKlassen =
  "flex w-full items-start gap-3 border border-strich bg-fliese p-4 text-left text-tinte hover:border-tinte aria-pressed:border-tinte aria-pressed:bg-tinte aria-pressed:text-kalk @max-3xs:flex-col @max-3xs:items-stretch";
/** Flächenstufe (aria-pressed), zentriert */
const stufeKlassen =
  "flex w-full flex-col items-center gap-1 border border-strich bg-fliese p-4 @max-3xs:px-3 text-center text-tinte hover:border-tinte aria-pressed:border-tinte aria-pressed:bg-tinte aria-pressed:text-kalk";
/** kleines Zahlenfeld neben dem Label */
const zahlFeldKlassen =
  "block w-24 min-h-11 rounded-r1 border border-strich bg-fliese px-4 py-3 font-text text-fs-3 text-tinte placeholder:text-tinte-2 hover:border-tinte focus-visible:border-tinte";

export default function PricingCalculator() {
  const {
    serviceType,
    roomSize,
    customArea,
    setCustomArea,
    selectedFeatures,
    timing,
    setTiming,
    notes,
    setNotes,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    location,
    setLocation,
    privacyAccepted,
    setPrivacyAccepted,
    honeypot,
    setHoneypot,
    status,
    errorMessage,
    referenceId,
    selectedService,
    selectedSize,
    toggleFeature,
    handleSubmit,
    handleReset,
    selectService,
    selectRoomSize,
  } = usePreisrechner();

  return (
    <div className="mx-auto grid w-full max-w-mass grid-cols-1 border border-strich">
      {/* ── Oben: Angaben zu Vorhaben und Situation ── */}
      <div className="flex flex-col gap-12 bg-fliese p-6 sm:p-8 lg:p-12">
        {/* Phasen */}
        {/* Tor S-01/03: Die Phasen ragten schon bei 375 px 15 px in den Innenrand (320 px: 70 px). Unter sm entfallen die
            Trennlinien (eine Zeile bis 375 px); Umbruch nur noch bei 320 px und erhöhtem Textabstand. */}
        <ol className="flex flex-wrap items-center gap-3 font-mono text-fs-1 text-tinte" aria-label="Schritte der Anfrage">
          <li className="flex items-center gap-2">
            <span className="inline-flex size-6 items-center justify-center bg-tinte text-kalk">1</span>
            <span>Projekt</span>
          </li>
          <li aria-hidden="true" className="hidden h-px flex-1 bg-fuge sm:block" />
          <li className="flex items-center gap-2">
            <span className="inline-flex size-6 items-center justify-center bg-tinte text-kalk">2</span>
            <span>Fläche</span>
          </li>
          <li aria-hidden="true" className="hidden h-px flex-1 bg-fuge sm:block" />
          <li className="flex items-center gap-2">
            <span className="inline-flex size-6 items-center justify-center bg-tinte text-kalk">3</span>
            <span>Situation</span>
          </li>
        </ol>

        {/* 1. Gewerk */}
        <div role="group" aria-labelledby="calc-gewerk" className="@container">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p id="calc-gewerk" className={labelKlassen}>
              1. Welches Projekt planen Sie?
            </p>
            <span className={etikettKlassen}>Auswahl erforderlich</span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {Object.values(CRAFT_SERVICES).map((srv) => {
              const isSelected = serviceType === srv.id;
              return (
                <button
                  key={srv.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => selectService(srv.id)}
                  className={optionKlassen}
                  data-motion="zustand"
                >
                  {/* Planmarke statt Piktogramm: das Gewerk als kleiner Verlegeplan (Formsystem K-008), auf Kalk in beiden Zuständen lesbar */}
                  <span className="w-12 shrink-0 border border-fuge bg-kalk p-1">
                    <Verlegeplan plan={SERVICE_PLAENE[srv.id]} bemassung={false} ohneAchse />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-start justify-between gap-x-2 gap-y-1">
                      <span className="block min-w-0 text-fs-2 font-semibold @max-3xs:hyphens-auto wrap-break-word">{anzeige(srv.title)}</span>
                      {srv.badge && (
                        <span className="hidden whitespace-nowrap font-text text-fs-1 sm:inline-block">{anzeige(srv.badge)}</span>
                      )}
                    </span>
                    <span className="mt-1 block text-fs-1 @max-3xs:hyphens-auto wrap-break-word">{anzeige(srv.subtitle)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. Fläche */}
        <div role="group" aria-labelledby="calc-flaeche" className="@container">
          <p id="calc-flaeche" className={labelKlassen}>
            2. Wie groß ist die Fläche ungefähr?
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2 @3xs:grid-cols-2">
            {Object.values(ROOM_SIZES).map((size) => {
              const isSelected = roomSize === size.id && !customArea;
              return (
                <button
                  key={size.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => selectRoomSize(size.id)}
                  className={stufeKlassen}
                  data-motion="zustand"
                >
                  <span className="block w-full text-fs-2 font-semibold @max-3xs:hyphens-auto wrap-break-word">{anzeige(size.label)}</span>
                  <span className="block w-full font-mono text-fs-1">{anzeige(size.areaText)}</span>
                </button>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-3">
            <label htmlFor="calc-custom-area" className="text-fs-2 text-tinte-2">
              Oder Sie kennen die Quadratmeter genau:
            </label>
            <span className="flex items-center gap-2">
              <input
                id="calc-custom-area"
                name="customArea"
                type="text"
                autoComplete="off"
                placeholder="z. B. 18"
                aria-label="Quadratmeter eingeben"
                value={customArea}
                onChange={(e) => setCustomArea(e.target.value)}
                className={zahlFeldKlassen}
              />
              <span className="font-mono text-fs-2 text-tinte" aria-hidden="true">
                m²
              </span>
            </span>
          </div>
        </div>

        {/* 3. Rahmenbedingungen */}
        <div role="group" aria-labelledby="calc-rahmen" className="@container">
          <p id="calc-rahmen" className={labelKlassen}>
            3. Was trifft bei Ihnen zu?
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {SITUATION_OPTIONS.map((opt) => {
              const isChecked = selectedFeatures.includes(opt.id);
              return (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={isChecked}
                  onClick={() => toggleFeature(opt.id)}
                  className="flex items-start gap-3 border border-strich bg-fliese p-3 text-left text-tinte hover:border-tinte aria-pressed:border-tinte @max-3xs:flex-col @max-3xs:items-stretch"
                  data-motion="zustand"
                >
                  <span
                    className={`mt-1 inline-flex size-4 shrink-0 items-center justify-center border ${
                      isChecked ? "border-tinte bg-tinte text-kalk" : "border-strich bg-fliese"
                    }`}
                  >
                    {isChecked && <Icon name="haken" groesse={4} />}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-fs-2 font-semibold @max-3xs:hyphens-auto wrap-break-word">{anzeige(opt.label)}</span>
                    <span className="mt-1 block text-fs-1 text-tinte-2 @max-3xs:hyphens-auto wrap-break-word">{anzeige(opt.description)}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 4. Situation (Freitext) */}
        <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <label htmlFor="situation-notes" className={labelKlassen}>
              4. Beschreiben Sie kurz Ihre Lage und Ihr Vorhaben:
            </label>
            <span className={etikettKlassen}>Sehr hilfreich für Rückfragen</span>
          </div>
          <textarea
            id="situation-notes"
            name="notes"
            autoComplete="off"
            rows={4}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Zum Beispiel: Sind noch alte Fliesen da? Wie ist der Untergrund? Ist es ein Neubau, oder wird dort schon gewohnt? Gibt es Wünsche, etwa Nischen oder eine Dusche ohne Stufe? Und wann soll es losgehen?"
            className={`${feldKlassen} resize-y`}
          />
        </div>
      </div>

      {/* ── Darunter: Zusammenfassung und Kontakt (Schriftfeld auf Tinte; der Absenden-Knopf steht direkt unter der
          Einwilligung) ── */}
      <div className="@container flaeche-tinte flex flex-col bg-tinte p-6 text-kalk sm:p-8 lg:p-12">
        {status === "success" ? (
          /* Erfolgsansicht nach Absenden */
          <div className="my-auto flex flex-col gap-6" role="status">
            <span className={`${etikettForm} text-nacht-2`}>
              <Icon name="haken" groesse={4} className="text-kalk" />
              <span className="text-kalk">Referenz: {referenceId || "TEZ-ANFRAGE"}</span>
            </span>

            <p className="font-anzeige text-fs-5 font-semibold text-kalk">
              Anfrage erfolgreich übermittelt!
            </p>

            <p className="text-fs-2 text-nacht-2">
              Vielen Dank, <strong className="font-semibold text-kalk">{name}</strong>! Ihre Angaben und Kontaktdaten
              sind direkt bei Herrn Deniz Tezgel eingegangen.
            </p>

            <div className="border-t border-nacht-fuge pt-6 text-fs-2 text-nacht-2">
              <p className="font-semibold text-kalk">So geht es weiter:</p>
              <p className="mt-2">1. Deniz Tezgel prüft Ihre Angaben persönlich.</p>
              <p className="mt-1">2. Sie erhalten zeitnah einen Anruf oder eine Nachricht zur Abstimmung.</p>
              <p className="mt-1">3. Kostenfreier Termin bei Ihnen vor Ort und danach ein verbindliches Festpreisangebot.</p>
            </div>

            <Knopf variante="hell" onClick={handleReset} className="w-full">
              Weitere Anfrage senden
            </Knopf>
          </div>
        ) : (
          /* Formular-Ansicht */
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div>
              <span className={`${etikettForm} text-nacht-2`}>
                <Fugenkreuz className="size-3 text-nacht-2" />
                <span>Preise individuell auf Anfrage</span>
              </span>

              <p className="mt-6 font-anzeige text-fs-5 font-semibold text-kalk">
                Unverbindliche Projektanfrage
              </p>

              <p className="mt-3 text-fs-2 text-nacht-2">
                Wir zeigen keine pauschalen Scheinpreise im Netz. Jedes Vorhaben ist anders.
                Beschreiben Sie Ihr Vorhaben kurz. Wir melden uns für einen kostenfreien Termin
                bei Ihnen vor Ort. Danach bekommen Sie ein verbindliches Festpreisangebot.
              </p>

              {/* Projekt-Zusammenfassung */}
              <dl className="mt-6 border-t border-nacht-fuge text-fs-2">
                <div className="flex items-center justify-between gap-4 border-b border-nacht-fuge py-3 @max-3xs:flex-wrap">
                  <dt className="text-nacht-2">Projekt:</dt>
                  <dd className="text-right font-semibold text-kalk @max-3xs:hyphens-auto wrap-break-word">{anzeige(selectedService.title)}</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-nacht-fuge py-3 @max-3xs:flex-wrap">
                  <dt className="text-nacht-2">Fläche:</dt>
                  <dd className="text-right font-mono text-kalk wrap-break-word">
                    {customArea.trim() ? `${customArea.trim()} m²` : anzeige(selectedSize.areaText)}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-nacht-fuge py-3 @max-3xs:flex-wrap">
                  <dt className="text-nacht-2">Termin bei Ihnen vor Ort:</dt>
                  <dd className="text-right font-mono text-kalk">0 € (Kostenfrei)</dd>
                </div>
                <div className="flex items-center justify-between gap-4 border-b border-nacht-fuge py-3 @max-3xs:flex-wrap">
                  <dt className="text-nacht-2">Angebot:</dt>
                  <dd className="text-right font-semibold text-kalk @max-3xs:hyphens-auto wrap-break-word">Verbindlicher Festpreis</dd>
                </div>
              </dl>

              {/* Fehleranzeige */}
              {errorMessage && (
                <p className="mt-6 flex items-start gap-2 border-l-2 border-laser bg-fliese p-3 text-fs-2 text-laser-tief" role="alert">
                  <Icon name="fehler" groesse={4} className="mt-1 shrink-0" />
                  <span>{errorMessage}</span>
                </p>
              )}

              {/* Honeypot Feld für Bot-Schutz */}
              <label htmlFor="calc-organization-fax" className="sr-only">
                Faxnummer
              </label>
              <input
                type="text"
                name="organization_fax"
                id="calc-organization-fax"
                aria-label="Faxnummer (Spamschutz)"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                aria-hidden="true"
                className="hidden"
                autoComplete="off"
              />

              {/* Kontaktdaten */}
              <div className="mt-6 flex flex-col gap-4">
                <PflichtHinweis dunkel />
                <div>
                  <label htmlFor="calc-name" className={labelHell}>
                    Ihr Name <span className="ml-1 font-mono text-fs-1 text-nacht-2">*</span>
                  </label>
                  <input
                    id="calc-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Vor- und Nachname"
                    className={feldKlassen}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="calc-phone" className={labelHell}>
                      Telefonnummer <span className="ml-1 font-mono text-fs-1 text-nacht-2">*</span>
                    </label>
                    <input
                      id="calc-phone"
                      name="phone"
                      type="tel"
                      required
                      autoComplete="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="z. B. 0170 1234567"
                      className={feldKlassen}
                    />
                  </div>

                  <div>
                    <label htmlFor="calc-email" className={labelHell}>
                      E-Mail-Adresse
                    </label>
                    <input
                      id="calc-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="ihre@email.de"
                      className={feldKlassen}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label htmlFor="calc-location" className={labelHell}>
                      Ort oder Postleitzahl
                    </label>
                    <input
                      id="calc-location"
                      name="location"
                      type="text"
                      autoComplete="address-level2"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="z. B. Aßlar oder Wetzlar"
                      className={feldKlassen}
                    />
                  </div>

                  <div>
                    <label htmlFor="calc-timing" className={labelHell}>
                      Gewünschter Zeitraum
                    </label>
                    <div className="relative">
                      <select
                        id="calc-timing"
                        name="timing"
                        aria-label="Gewünschter Zeitraum"
                        value={timing}
                        onChange={(e) => setTiming(e.target.value)}
                        className={`${feldKlassen} appearance-none pr-12`}
                      >
                        {TIMING_OPTIONS.map((t) => (
                          <option key={t} value={t}>
                            {anzeige(t)}
                          </option>
                        ))}
                      </select>
                      <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
                        <Icon name="winkel-unten" groesse={5} className="text-tinte" />
                      </span>
                    </div>
                  </div>
                </div>

                {/* Datenschutz */}
                <label className="flex cursor-pointer items-start gap-3 text-fs-2 text-nacht-2">
                  <input
                    type="checkbox"
                    id="calc-privacy"
                    name="privacyAccepted"
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-1 size-5 shrink-0 rounded-r1 accent-kalk"
                  />
                  <span className="min-w-0 @max-3xs:hyphens-auto wrap-break-word">
                    Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Beantwortung meiner
                    Anfrage verarbeitet werden.
                  </span>
                </label>
              </div>
            </div>

            {/* Absenden und Anruf */}
            <div className="flex flex-col gap-4 border-t border-nacht-fuge pt-6">
              <Knopf type="submit" variante="hell" laedt={status === "submitting"} ladeText="Wird gesendet …" icon="pfeil-rechts" className="w-full @max-3xs:hyphens-auto wrap-break-word @max-3xs:px-4 @max-3xs:flex-wrap">
                Unverbindliche Anfrage senden
              </Knopf>

              <div>
                <span className="block font-mono text-fs-1 text-nacht-2">Oder bei dringenden Fragen direkt anrufen:</span>
                <Knopf href={siteConfig.contact.phone.link} variante="neben" iconLinks="telefon" className="mt-2 w-full wrap-anywhere @max-3xs:px-4">
                  <Rufnummer nummer={siteConfig.contact.phone.formatted} />
                </Knopf>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export { PricingCalculator };
