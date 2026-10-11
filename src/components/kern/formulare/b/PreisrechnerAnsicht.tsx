'use client';

// Ansicht des Preisrechners (F-02, P3-13b, KERN v1.2) ohne eigene Logik: bekommt das Ergebnis von `usePreisrechner`
// (Bestand und Kern nutzen denselben Hook, G9). So kann die Vorschau einen Zustand setzen, ohne zu senden.
// Struktur (K-003 „Fuge statt Karte“): Feldraster aus zwei Feldern ohne Zwischenraum, getrennt durch 1-px-Fugen –
// zuerst die Situation (Gewerk, Fläche, Vorarbeiten, Freitext; wie im Bestand außerhalb des Formulars),
// darunter Zusammenfassung und Kontaktformular bzw. die Erfolgsmeldung. Auf jeder Breite untereinander (P3-16a):
// Nebeneinander sprang die Tab-Folge vom Freitext unten links zurück nach oben rechts (WCAG 2.4.3, E-018).
// Ab md stehen Kontaktfelder und Zusammenfassung zweispaltig, damit das Formular in voller Breite ruhig bleibt.
// Projektart und Fläche als Auswahlknöpfe im Raster (Radios, Pfeiltasten), Vorarbeiten als Ankreuzfelder.
// Wortlaut, IDs, name, type und autocomplete wie `src/components/pricing/PricingCalculator.tsx`;
// geändert nur nach MIKROTEXTE.md: Ladetext „Wird gesendet …“ (SendeKnopf), Erfolg mit vorangestelltem „Notiert.“.
import { useId, useRef } from 'react';
import { CRAFT_SERVICES, ROOM_SIZES, SITUATION_OPTIONS, TIMING_OPTIONS } from '@/components/pricing/pricing.constants';
import { siteConfig } from '@/lib/config';
import type { usePreisrechner } from '@/lib/formulare/usePreisrechner';
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
import { fokus, verbinde } from '@/components/kern/basis/klassen';
import Icon from '@/components/kern/icons/Icon';
import FeldMitEinheit from '@/components/kern/formulare/b/FeldMitEinheit';
import { useFokusBeiWechsel } from '@/components/kern/formulare/b/useFokusBeiWechsel';

export type PreisrechnerDaten = ReturnType<typeof usePreisrechner>;

const PHASEN = [
  { nr: '1', text: 'Gewerk' },
  { nr: '2', text: 'Fläche' },
  { nr: '3', text: 'Situation' },
] as const;

// Nebentext in einer Auswahl-Kachel: gesetzt steht die Kachel auf Tinte, der Nebentext dann in Nacht-Text (8,45 : 1).
const KACHEL_NEBEN = 'font-normal text-k-tinte-2 group-has-checked:text-k-nacht-2';

export default function PreisrechnerAnsicht({ rechner }: { rechner: PreisrechnerDaten }) {
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
  } = rechner;

  // Radiogruppen liegen (wie im Bestand) außerhalb des Formulars: eindeutige Gruppennamen je Instanz, damit zwei Rechner
  // auf einer Seite (Vorschau) sich nicht gegenseitig abwählen. Die Nutzlast kommt aus dem Hook, nicht aus name.
  const gruppe = useId();
  const kopfId = `${gruppe}-kopf`;
  const ansicht = status === 'success' ? 'erfolg' : 'formular';
  const fokusZiel = useRef<HTMLElement | null>(null);
  useFokusBeiWechsel(ansicht, fokusZiel);

  return (
    <div className="grid grid-cols-1 border-l border-t border-k-fuge">
      {/* ── Situation: Gewerk, Fläche, Vorarbeiten, Freitext ── */}
      <div className="flex min-w-0 flex-col gap-k-7 border-r border-b border-k-fuge p-k-5 lg:p-k-6">
        <ol className="grid grid-cols-3 border-l border-t border-k-fuge">
          {PHASEN.map((phase) => (
            <li key={phase.nr} className="flex min-w-0 items-baseline gap-k-2 border-r border-b border-k-fuge px-k-3 py-k-2">
              <span className="k-mono text-k-1 text-k-tinte-2">{phase.nr}</span>
              <span className="k-text text-k-2 font-semibold text-k-tinte">{phase.text}</span>
            </li>
          ))}
        </ol>

        <Feldgruppe legende="1. Welches Projekt planen Sie?" zusatz="Auswahl erforderlich" anordnung="kacheln" spalten={2}>
          {Object.values(CRAFT_SERVICES).map((srv) => (
            <Auswahlknopf
              key={srv.id}
              art="kachel"
              name={`${gruppe}-gewerk`}
              value={srv.id}
              checked={serviceType === srv.id}
              onChange={() => selectService(srv.id)}
            >
              <span className="flex flex-col gap-k-1">
                <span className="flex flex-wrap items-baseline justify-between gap-x-k-3">
                  <span>{srv.title}</span>
                  {srv.badge ? <span className={verbinde('k-mono text-k-1', KACHEL_NEBEN)}>{srv.badge}</span> : null}
                </span>
                <span className={verbinde('text-k-2', KACHEL_NEBEN)}>{srv.subtitle}</span>
              </span>
            </Auswahlknopf>
          ))}
        </Feldgruppe>

        <div className="flex flex-col gap-k-5">
          <Feldgruppe legende="2. Geschätzte Grundfläche:" anordnung="kacheln" spalten={4}>
            {Object.values(ROOM_SIZES).map((size) => (
              <Auswahlknopf
                key={size.id}
                art="kachel"
                name={`${gruppe}-flaeche`}
                value={size.id}
                checked={roomSize === size.id && !customArea}
                onChange={() => selectRoomSize(size.id)}
              >
                <span className="flex flex-col gap-k-1">
                  <span className="text-k-2">{size.label}</span>
                  <span className={verbinde('k-mono text-k-1', KACHEL_NEBEN)}>{size.areaText}</span>
                </span>
              </Auswahlknopf>
            ))}
          </Feldgruppe>

          <FeldMitEinheit
            id="calc-custom-area"
            name="customArea"
            autoComplete="off"
            beschriftung="Oder genaue Quadratmeterzahl bekannt:"
            einheit="m²"
            placeholder="z. B. 18"
            aria-label="Quadratmeterzahl manuell eingeben"
            value={customArea}
            onChange={(e) => setCustomArea(e.target.value)}
            className="md:max-w-1/2"
          />
        </div>

        <Feldgruppe legende="3. Rahmenbedingungen & Vorarbeiten:">
          <div className="grid grid-cols-1 border-l border-t border-k-strich md:grid-cols-2">
            {SITUATION_OPTIONS.map((opt) => (
              <div key={opt.id} className="min-w-0 border-r border-b border-k-strich bg-k-fliese px-k-4 pb-k-3">
                <Ankreuzfeld checked={selectedFeatures.includes(opt.id)} onChange={() => toggleFeature(opt.id)} hilfe={opt.description}>
                  <span className="font-semibold">{opt.label}</span>
                </Ankreuzfeld>
              </div>
            ))}
          </div>
        </Feldgruppe>

        <Mehrzeilig
          id="situation-notes"
          name="notes"
          autoComplete="off"
          rows={4}
          beschriftung="4. Schildern Sie kurz Ihre Situation & Ihr Vorhaben:"
          hilfe="Sehr hilfreich für Rückfragen"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Beschreiben Sie hier Ihre Ausgangslage: z. B. Zustand des Untergrunds, alte Fliesen vorhanden, Neubau oder bewohnter Bestand, besondere Vorstellungen wie Nischen oder barrierefreie Dusche, zeitliche Wünsche..."
        />
      </div>

      {/* ── Zusammenfassung & Kontakt ── */}
      <div className="flex min-w-0 flex-col border-r border-b border-k-fuge bg-k-fliese p-k-5 lg:p-k-6">
        {status === 'success' ? (
          <div
            ref={(el) => {
              fokusZiel.current = el;
            }}
            tabIndex={-1}
            className={verbinde('flex flex-col gap-k-5', fokus('hell'))}
          >
            <span data-motion="notiert" className="flex text-k-abnahme">
              <Icon name="haken" groesse={32} inline />
            </span>
            <p className="k-mono text-k-1 text-k-tinte">Referenz: {referenceId || 'TEZ-ANFRAGE'}</p>
            <p className="k-anzeige text-k-5 text-k-tinte">Anfrage erfolgreich übermittelt!</p>
            <p className="k-text text-k-3 text-k-tinte">
              Vielen Dank, <strong>{name}</strong>! <strong>Notiert.</strong> Ihre Situationsbeschreibung und Kontaktdaten
              sind direkt bei Herrn Deniz Tezgel eingegangen.
            </p>
            <div className="flex flex-col gap-k-2 border border-k-fuge p-k-4 k-text text-k-2 text-k-tinte-2">
              <p className="font-semibold text-k-tinte">So geht es weiter:</p>
              <p>1. Deniz Tezgel prüft Ihre Angaben persönlich.</p>
              <p>2. Sie erhalten zeitnah einen Anruf oder eine Nachricht zur Abstimmung.</p>
              <p>3. Kostenfreies Vor-Ort-Aufmaß &amp; verbindliches Festpreisangebot.</p>
            </div>
            <Knopf art="neben" breit onClick={handleReset}>
              Weitere Projektanfrage senden
            </Knopf>
          </div>
        ) : (
          <form onSubmit={handleSubmit} aria-labelledby={kopfId} className="flex flex-col gap-k-6">
            <div className="flex flex-col gap-k-4">
              <Etikett rahmen kreuz>
                Preise individuell auf Anfrage
              </Etikett>
              <p
                id={kopfId}
                ref={(el) => {
                  fokusZiel.current = el;
                }}
                tabIndex={-1}
                className={verbinde('k-anzeige text-k-5 text-k-tinte', fokus('hell'))}
              >
                Unverbindliche Projektanfrage
              </p>
              <p className="max-w-(--k-mass) k-text text-k-2 text-k-tinte-2">
                Wir zeigen keine pauschalen Scheinpreise im Netz. Jedes Bauvorhaben ist einzigartig.
                Beschreiben Sie Ihr Vorhaben – wir melden uns für ein kostenfreies Vor-Ort-Aufmaß
                und Ihr verlässliches Festpreisangebot.
              </p>
            </div>

            {/* Projekt-Zusammenfassung: Tabelle mit Fugen */}
            <dl className="border-l border-t border-k-fuge k-text text-k-2 md:grid md:grid-cols-2">
              {[
                { begriff: 'Gewerk:', wert: selectedService.title, mono: false },
                { begriff: 'Fläche:', wert: customArea.trim() ? `${customArea.trim()} m²` : selectedSize.areaText, mono: true },
                { begriff: 'Vor-Ort-Aufmaß:', wert: '0 € (Kostenfrei)', mono: false },
                { begriff: 'Angebot:', wert: 'Verbindlicher Festpreis', mono: false },
              ].map((zeile) => (
                <div key={zeile.begriff} className="flex flex-wrap items-baseline justify-between gap-x-k-3 border-r border-b border-k-fuge px-k-3 py-k-2">
                  <dt className="text-k-tinte-2">{zeile.begriff}</dt>
                  <dd className={verbinde('m-0 font-semibold text-k-tinte', zeile.mono && 'k-mono')}>{zeile.wert}</dd>
                </div>
              ))}
            </dl>

            {/* Honeypot für Bot-Schutz (verborgen, nicht fokussierbar) */}
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

            <div className="grid grid-cols-1 gap-k-5 md:grid-cols-2">
              <Feld
                id="calc-name"
                name="name"
                required
                autoComplete="name"
                beschriftung="Ihr Name"
                zusatz="*"
                placeholder="Vor- und Nachname"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="md:col-span-2"
              />
              <Feld
                id="calc-phone"
                name="phone"
                art="tel"
                required
                autoComplete="tel"
                beschriftung="Telefonnummer"
                zusatz="*"
                placeholder="z. B. 0170 1234567"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Feld
                id="calc-email"
                name="email"
                art="email"
                autoComplete="email"
                beschriftung="E-Mail-Adresse"
                placeholder="ihre@email.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Feld
                id="calc-location"
                name="location"
                autoComplete="address-level2"
                beschriftung="Einsatzort / PLZ"
                placeholder="z. B. Aßlar, Wetzlar..."
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <Auswahl
                id="calc-timing"
                name="timing"
                aria-label="Gewünschter Zeitraum"
                beschriftung="Gewünschter Zeitraum"
                value={timing}
                onChange={(e) => setTiming(e.target.value)}
              >
                {TIMING_OPTIONS.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </Auswahl>
            </div>

            {/* Datenschutz-Einwilligung: startet leer (E-014), Wortlaut unverändert */}
            <Ankreuzfeld id="calc-privacy" name="privacyAccepted" checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)} className="max-w-(--k-mass)">
              <span className="text-k-2">
                Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und Beantwortung meiner
                Anfrage verarbeitet werden.
              </span>
            </Ankreuzfeld>

            {/* Fehler direkt über dem Knopf: Versatz-Zeichen + Text, role="alert" */}
            {errorMessage ? <Hinweis art="fehler">{errorMessage}</Hinweis> : null}

            <div className="flex flex-col gap-k-4 border-t border-k-fuge pt-k-5 md:grid md:grid-cols-2 md:items-end md:gap-k-5">
              <SendeKnopf sendet={status === 'submitting'} breit groesse="gross" hinten={<Icon name="pfeil" groesse={20} />}>
                Unverbindliche Anfrage absenden
              </SendeKnopf>
              <div className="flex flex-col gap-k-2">
                <span className="k-text text-k-2 text-k-tinte-2">Oder bei dringenden Fragen direkt anrufen:</span>
                <Knopf art="neben" breit href={siteConfig.contact.phone.link} vorne={<Icon name="telefon" groesse={20} />}>
                  <span className="k-mono">{siteConfig.contact.phone.formatted}</span>
                </Knopf>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

