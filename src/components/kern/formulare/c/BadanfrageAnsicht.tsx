'use client';

// Ansicht der Badanfrage (F-04, P4-05a, KERN v1.2) ohne eigene Logik: bekommt das Ergebnis von `useBadanfrage`
// (Bestand und Kern nutzen denselben Hook, G9). So kann die Vorschau Schritt und Zustand setzen, ohne zu senden.
// Arbeitsseiten-Formular (K-003 Prinzip 6): ein Feld (Fliese, 1-px-Fuge) mit Kopf (Etiketten, Überschrift,
// Fortschrittsleiste), Schrittfrage, Inhalt des Schritts und Fußleiste mit Zurück/Weiter.
// Objektart, Umfang und Qualitätsstufe als Auswahlknöpfe im Raster (Radios, Pfeiltasten), Wunschausstattung als Ankreuzfelder.
// Fokus: beim Schrittwechsel auf die Schrittfrage, nach dem Absenden auf die Erfolgs- bzw. WhatsApp-Meldung.
// Wortlaut, IDs, name, type und autocomplete wie `src/components/funnels/BadanfrageFunnel.jsx`; für /bad/* gibt es
// keine Zeile in MIKROTEXTE.md, darum bleiben auch Ladetext, Erfolgstext und das Brief-Emoji wörtlich (Vorschläge
// in der Rückgabe P4-05a). Die Zustandsfelder `formData` werden wie im Bestand mit `setFormData({ ...formData, … })` gesetzt.
import { useId, useRef } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { FEATURES, OBJECT_TYPES, PERSON_OPTIONS, SCOPES, TIERS, TOTAL_STEPS, type useBadanfrage } from '@/lib/formulare/useBadanfrage';
import Ankreuzfeld from '@/components/kern/basis/Ankreuzfeld';
import Auswahl from '@/components/kern/basis/Auswahl';
import Auswahlknopf from '@/components/kern/basis/Auswahlknopf';
import Etikett from '@/components/kern/basis/Etikett';
import Feld from '@/components/kern/basis/Feld';
import Feldgruppe from '@/components/kern/basis/Feldgruppe';
import Hinweis from '@/components/kern/basis/Hinweis';
import Knopf from '@/components/kern/basis/Knopf';
import Mehrzeilig from '@/components/kern/basis/Mehrzeilig';
import SendeKnopf from '@/components/kern/basis/SendeKnopf';
import Textlink from '@/components/kern/basis/Textlink';
import { Fugenkreuz } from '@/components/kern/basis/Zeichen';
import { fokus, verbinde } from '@/components/kern/basis/klassen';
import Icon from '@/components/kern/icons/Icon';
import { useFokusBeiWechsel } from '@/components/kern/formulare/b/useFokusBeiWechsel';

export type BadanfrageDaten = ReturnType<typeof useBadanfrage>;

// Nebentext in einer Auswahl-Kachel: gesetzt steht die Kachel auf Tinte, der Nebentext dann in Nacht-Text (8,45 : 1).
const KACHEL_NEBEN = 'font-normal text-k-tinte-2 group-has-checked:text-k-nacht-2';
const KACHEL_TEXT = 'min-w-0 wrap-break-word hyphens-auto';

const FELD = 'border border-k-fuge bg-k-fliese';
const FUSSLEISTE = 'flex flex-col-reverse gap-k-3 border-t border-k-fuge pt-k-5 md:flex-row md:items-center md:justify-between';
const MELDUNG = verbinde(FELD, 'flex flex-col gap-k-5 p-k-5 lg:p-k-7', fokus('hell'));

export default function BadanfrageAnsicht({ anfrage }: { anfrage: BadanfrageDaten }) {
  const {
    step,
    setStep,
    status,
    errorMessage,
    referenceId,
    formData,
    setFormData,
    toggleFeature,
    calculatedSqm,
    objectTitle,
    scopeTitle,
    tierTitle,
    featureLabels,
    addressText,
    handleWhatsApp,
    handleOnlineSubmit,
    handleNewRequest,
    handleBackFromWhatsApp,
  } = anfrage;
  const { contact, owner } = COMPANY_DATA;

  // Radiogruppen außerhalb eines Formulars: eindeutige Gruppennamen je Instanz (die Vorschau zeigt mehrere Funnel).
  const gruppe = useId();
  const frageId = `${gruppe}-frage`;
  const ansicht = status === 'success' ? 'erfolg' : status === 'whatsapp_opened' ? 'whatsapp' : `schritt-${step}`;
  const fokusZiel = useRef<HTMLElement | null>(null);
  const setzeZiel = (el: HTMLElement | null) => {
    fokusZiel.current = el;
  };
  useFokusBeiWechsel(ansicht, fokusZiel);

  const anrufen = (
    <Knopf href={`tel:${contact.phoneLink}`} vorne={<Icon name="telefon" groesse={20} />}>
      Direkt anrufen: <span className="k-mono">{contact.phone}</span>
    </Knopf>
  );

  // ERFOLG (direkte Bestätigung)
  if (status === 'success') {
    return (
      <div ref={setzeZiel} tabIndex={-1} role="status" className={MELDUNG}>
        <span data-motion="notiert" className="flex text-k-abnahme">
          <Icon name="haken" groesse={32} inline />
        </span>
        <div className="flex flex-wrap items-baseline gap-x-k-4 gap-y-k-2">
          <Etikett ton="tinte">Badanfrage erfolgreich übermittelt</Etikett>
          {referenceId && <Etikett rahmen ton="tinte">Vorgangs-Nr.: {referenceId}</Etikett>}
        </div>
        <p className="k-anzeige text-k-5 text-k-tinte">Vielen Dank, {formData.name}!</p>
        <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte">
          Ihre detaillierte Badanfrage (<span className="k-mono">{calculatedSqm} m²</span> &middot; {scopeTitle}) ist erfolgreich bei Fliesenverlegung Tezgel eingegangen.
          {formData.email && (
            <span className="mt-k-3 block border border-k-fuge p-k-3 text-k-2 text-k-tinte-2">
              ✉️ Eine ausführliche Bestätigung mit allen Angaben wurde an <em className="wrap-break-word">{formData.email}</em> gesendet.
            </span>
          )}
        </p>

        <div className="flex flex-col gap-k-2 border border-k-fuge p-k-4 k-text text-k-2 text-k-tinte-2">
          <p className="flex items-center gap-k-2 font-semibold text-k-tinte">
            <Fugenkreuz className="size-k-3" />
            Zusammenfassung Ihres Badkonzepts:
          </p>
          <p><strong className="text-k-tinte">Kontakt:</strong> {formData.name} &middot; <span className="k-mono">{formData.phone}</span></p>
          <p><strong className="text-k-tinte">Ort:</strong> {addressText}</p>
          <p><strong className="text-k-tinte">Projekt:</strong> {objectTitle} &middot; Stufe: {tierTitle} &middot; <span className="k-mono">{calculatedSqm} m²</span></p>
          {featureLabels.length > 0 && (
            <p><strong className="text-k-tinte">Ausstattung:</strong> {featureLabels.join(', ')}</p>
          )}
        </div>

        <div className="flex flex-col gap-k-3 md:flex-row">
          {anrufen}
          <Knopf art="neben" onClick={handleNewRequest}>
            Neue Badanfrage starten
          </Knopf>
        </div>
      </div>
    );
  }

  // WHATSAPP GEÖFFNET
  if (status === 'whatsapp_opened') {
    return (
      <div ref={setzeZiel} tabIndex={-1} role="status" className={MELDUNG}>
        <span className="flex text-k-tinte">
          <Icon name="whatsapp" groesse={32} />
        </span>
        <Etikett ton="tinte">WhatsApp geöffnet</Etikett>
        <h3 className="k-anzeige text-k-5 text-k-tinte">Fast geschafft – Nachricht jetzt absenden</h3>
        <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte">
          Ihre Badanfrage (<span className="k-mono">{calculatedSqm} m²</span> &middot; {scopeTitle}) ist in WhatsApp vorbereitet. Senden Sie die Nachricht einfach ab – {owner.fullName} meldet sich umgehend bei Ihnen.
        </p>
        <div className="flex flex-col gap-k-3 md:flex-row">
          {anrufen}
          <Knopf art="neben" onClick={handleBackFromWhatsApp}>
            Zurück
          </Knopf>
        </div>
      </div>
    );
  }

  // Schrittfrage: Text wie im Bestand (dort ein Absatz, keine Überschrift), Ziel des Fokus beim Schrittwechsel.
  const frage = (text: string) => (
    <p id={frageId} ref={setzeZiel} tabIndex={-1} className={verbinde('k-text text-k-4 font-semibold text-k-tinte', fokus('hell'))}>
      {text}
    </p>
  );

  // Auswahl-Kachel mit Titel und Beschreibung (Objektart, Umfang, Qualitätsstufe).
  const kachelInhalt = (titel: string, beschreibung: string) => (
    <span className="flex flex-col gap-k-1">
      <span className={KACHEL_TEXT}>{titel}</span>
      <span className={verbinde('text-k-2', KACHEL_NEBEN, KACHEL_TEXT)}>{beschreibung}</span>
    </span>
  );

  return (
    <div className={verbinde(FELD, 'flex flex-col')}>
      {/* Kopf: Etiketten, Überschrift, Fortschritt (dekorativ wie im Bestand; der Stand steht im Etikett) */}
      <div className="flex flex-col gap-k-4 border-b border-k-fuge px-k-5 py-k-5 lg:px-k-7">
        <div className="flex flex-wrap items-start justify-between gap-x-k-4 gap-y-k-2">
          <Etikett kreuz ton="tinte">
            Interaktive Badanfrage &middot; Schritt {step} von {TOTAL_STEPS}
          </Etikett>
          <Etikett rahmen>Kostenlos &amp; unverbindlich</Etikett>
        </div>
        <h2 className="k-anzeige text-k-5 text-k-tinte">Planen Sie Ihr Traumbad mit dem Fachbetrieb aus Aßlar</h2>
        <div aria-hidden="true" className="grid grid-cols-5 border-l border-t border-k-strich">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
            <div
              key={s}
              data-motion="zustand"
              className={verbinde('h-k-2 border-r border-b border-k-strich', s <= step ? 'bg-k-tinte' : 'bg-k-fliese')}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-k-6 p-k-5 lg:p-k-7">
        {/* SCHRITT 1: OBJEKTTYP */}
        {step === 1 && (
          <div className="flex flex-col gap-k-5">
            {frage('1. Um welche Art von Immobilie handelt es sich?')}
            <div role="radiogroup" aria-labelledby={frageId} className="grid grid-cols-1 border-l border-t border-k-strich md:grid-cols-2">
              {OBJECT_TYPES.map((obj) => (
                <Auswahlknopf
                  key={obj.id}
                  art="kachel"
                  name={`${gruppe}-objekt`}
                  value={obj.id}
                  checked={formData.objectType === obj.id}
                  onChange={() => setFormData({ ...formData, objectType: obj.id })}
                >
                  {kachelInhalt(obj.title, obj.desc)}
                </Auswahlknopf>
              ))}
            </div>
          </div>
        )}

        {/* SCHRITT 2: SANIERUNGSUMFANG */}
        {step === 2 && (
          <div className="flex flex-col gap-k-5">
            {frage('2. Welcher Sanierungsumfang ist geplant?')}
            <div role="radiogroup" aria-labelledby={frageId} className="grid grid-cols-1 border-l border-t border-k-strich md:grid-cols-2">
              {SCOPES.map((sc) => (
                <Auswahlknopf
                  key={sc.id}
                  art="kachel"
                  name={`${gruppe}-umfang`}
                  value={sc.id}
                  checked={formData.scope === sc.id}
                  onChange={() => setFormData({ ...formData, scope: sc.id })}
                >
                  {kachelInhalt(sc.title, sc.desc)}
                </Auswahlknopf>
              ))}
            </div>
          </div>
        )}

        {/* SCHRITT 3: RAUMMASSE */}
        {step === 3 && (
          <div className="flex flex-col gap-k-5">
            {frage('3. Ungefähre Raummaße Ihres Badezimmers')}
            <div className="grid grid-cols-1 gap-k-5 md:grid-cols-3">
              <Feld
                id="badanfrage-length"
                art="number"
                mono
                step="0.1"
                min="1"
                max="15"
                beschriftung="Länge (m)"
                value={formData.length}
                onChange={(e) => setFormData({ ...formData, length: e.target.value })}
              />
              <Feld
                id="badanfrage-width"
                art="number"
                mono
                step="0.1"
                min="1"
                max="15"
                beschriftung="Breite (m)"
                value={formData.width}
                onChange={(e) => setFormData({ ...formData, width: e.target.value })}
              />
              <Auswahl
                id="badanfrage-persons"
                beschriftung="Personen im Haushalt"
                value={formData.persons}
                onChange={(e) => setFormData({ ...formData, persons: e.target.value })}
              >
                {PERSON_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Auswahl>
            </div>

            <div className="flex flex-wrap items-baseline justify-between gap-x-k-4 gap-y-k-1 border border-k-fuge bg-k-kalk px-k-4 py-k-3">
              <span className="k-text text-k-2 font-semibold text-k-tinte">Berechnete Grundfläche:</span>
              <span className="k-mono text-k-4 text-k-tinte" aria-live="polite">
                {calculatedSqm} m²
              </span>
            </div>
          </div>
        )}

        {/* SCHRITT 4: AUSSTATTUNG & QUALITÄTSSTUFE */}
        {step === 4 && (
          <div className="flex flex-col gap-k-5">
            {frage('4. Qualitätskategorie & gewünschte Elemente')}
            <div role="radiogroup" aria-labelledby={frageId} className="grid grid-cols-1 border-l border-t border-k-strich md:grid-cols-3">
              {TIERS.map((t) => (
                <Auswahlknopf
                  key={t.id}
                  art="kachel"
                  name={`${gruppe}-stufe`}
                  value={t.id}
                  checked={formData.tier === t.id}
                  onChange={() => setFormData({ ...formData, tier: t.id })}
                >
                  {kachelInhalt(t.title, t.desc)}
                </Auswahlknopf>
              ))}
            </div>

            <Feldgruppe legende="Wunschausstattung auswählen">
              <div className="grid grid-cols-1 border-l border-t border-k-strich md:grid-cols-2 lg:grid-cols-3">
                {FEATURES.map((item) => (
                  <div key={item.id} className="min-w-0 border-r border-b border-k-strich bg-k-fliese px-k-4">
                    <Ankreuzfeld checked={formData.features.includes(item.id)} onChange={() => toggleFeature(item.id)}>
                      <span className={verbinde('font-semibold', KACHEL_TEXT)}>{item.label}</span>
                    </Ankreuzfeld>
                  </div>
                ))}
              </div>
            </Feldgruppe>
          </div>
        )}

        {/* SCHRITT 5: KONTAKTDATEN & ABSENDEN */}
        {step === 5 && (
          <form onSubmit={handleOnlineSubmit} aria-labelledby={frageId} className="flex flex-col gap-k-6">
            <div className="flex flex-col gap-k-2">
              {frage('5. Kontaktdaten & Versand Ihrer Anfrage')}
              <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte-2">
                Senden Sie Ihre Badanfrage direkt online an {owner.fullName} oder nutzen Sie WhatsApp. Keine
                Weitergabe an Dritte.
              </p>
            </div>

            {/* Honeypot gegen Spam-Bots (verborgen, nicht fokussierbar), wie im Bestand */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="badanfrage-hp">Nicht ausfüllen</label>
              <input
                type="text"
                id="badanfrage-hp"
                name="badanfrage-hp"
                value={formData.honeypot}
                onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 gap-k-5 md:grid-cols-2">
              <Feld
                id="badanfrage-name"
                required
                autoComplete="name"
                beschriftung="Vor- & Nachname"
                zusatz="*"
                placeholder="Vor- und Nachname"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <Feld
                id="badanfrage-phone"
                art="tel"
                required
                minLength={6}
                autoComplete="tel"
                beschriftung="Telefonnummer für Rückfragen"
                zusatz="*"
                placeholder="Für die Rücksprache zum Aufmaß"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <Feld
                id="badanfrage-email"
                art="email"
                autoComplete="email"
                beschriftung="E-Mail-Adresse"
                zusatz="(optional)"
                placeholder="ihre-adresse@beispiel.de"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Feld
                id="badanfrage-street"
                autoComplete="street-address"
                beschriftung="Straße & Hausnummer"
                zusatz="(optional)"
                placeholder="Straße und Hausnummer"
                value={formData.street}
                onChange={(e) => setFormData({ ...formData, street: e.target.value })}
              />
              <Feld
                id="badanfrage-zip"
                autoComplete="postal-code"
                beschriftung="PLZ & Ort des Bauvorhabens"
                placeholder="z. B. 35614 Aßlar"
                value={formData.zipCity}
                onChange={(e) => setFormData({ ...formData, zipCity: e.target.value })}
                className="md:col-span-2"
              />
              <Mehrzeilig
                id="badanfrage-notes"
                rows={3}
                beschriftung="Anmerkungen oder besondere Wünsche"
                zusatz="(optional)"
                placeholder="z. B. Pflegegrad vorhanden, Nischenlösung gewünscht, Altbau-Besonderheiten …"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                className="md:col-span-2"
              />
            </div>

            {/* Fehler direkt über den Knöpfen (auch der WhatsApp-Hinweis entsteht dort): Versatz-Zeichen + Text, role="alert" */}
            {errorMessage && <Hinweis art="fehler">{errorMessage}</Hinweis>}

            <div className="flex flex-col gap-k-4 border-t border-k-fuge pt-k-5">
              <div className="flex flex-col gap-k-3 md:flex-row">
                <SendeKnopf
                  sendet={status === 'submitting'}
                  ladetext="Übermittle Anfrage an Fachbetrieb …"
                  groesse="gross"
                  className="md:flex-1"
                  hinten={<Icon name="pfeil" groesse={20} />}
                >
                  Badanfrage jetzt absenden (Online)
                </SendeKnopf>
                <Knopf
                  art="neben"
                  groesse="gross"
                  onClick={handleWhatsApp}
                  beschaeftigt={status === 'submitting'}
                  vorne={<Icon name="whatsapp" groesse={20} />}
                >
                  Per WhatsApp
                </Knopf>
              </div>
              <p className="max-w-(--k-mass) k-text text-k-2 text-k-tinte-2">
                Ihre Angaben werden vertraulich zur Angebotserstellung genutzt. Beim optionalen Versand per WhatsApp gelten
                zusätzlich die Richtlinien von WhatsApp. Mehr in unserer{' '}
                <Textlink href="/datenschutz">Datenschutzerklärung</Textlink>.
              </p>
            </div>

            <div className="flex">
              <Knopf art="text" onClick={() => setStep(4)} vorne={<Icon name="pfeil" richtung="links" groesse={20} />}>
                Zurück zu Schritt 4
              </Knopf>
            </div>
          </form>
        )}

        {/* Navigation für die Schritte 1–4 */}
        {step < TOTAL_STEPS && (
          <div className={verbinde(FUSSLEISTE, step === 1 && 'md:justify-end')}>
            {step > 1 && (
              <Knopf art="text" onClick={() => setStep(step - 1)} vorne={<Icon name="pfeil" richtung="links" groesse={20} />}>
                Zurück
              </Knopf>
            )}
            <Knopf onClick={() => setStep(step + 1)} hinten={<Icon name="pfeil" groesse={20} />}>
              Weiter zu Schritt {step + 1}
            </Knopf>
          </div>
        )}
      </div>
    </div>
  );
}
