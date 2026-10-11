'use client';

// Ansicht der Express-Anfrage (F-03, P3-13b, KERN v1.2) ohne eigene Logik: bekommt das Ergebnis von `useAnfrageFunnel`
// (Bestand und Kern nutzen denselben Hook, G9). So kann die Vorschau Schritt und Zustand setzen, ohne zu senden.
// Struktur: ein Feld (Fliese, 1-px-Fuge) mit Schrittanzeige in Mono („1 von 3“ + Fortschrittsleiste), Schrittüberschrift,
// Inhalt des Schritts und Fußleiste mit Zurück/Weiter. Projektart, Fläche und Zeitraum als Auswahlknöpfe im Raster.
// Fokus: beim Schrittwechsel auf die Schrittüberschrift, nach dem Absenden auf die Erfolgs- bzw. WhatsApp-Meldung.
// Wortlaut, IDs, name, type und autocomplete wie `src/components/funnels/TezgelAnfrageFunnel.tsx`;
// geändert nur nach MIKROTEXTE.md: „Anfrage senden“, Ladetext „Wird gesendet …“, Erfolg mit vorangestelltem „Notiert.“.
import { useId, useRef } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { AREA_OPTIONS, PROJECT_TYPES, TIMING_OPTIONS, type useAnfrageFunnel } from '@/lib/formulare/useAnfrageFunnel';
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
import TextKnopf from '@/components/kern/formulare/b/TextKnopf';
import { useFokusBeiWechsel } from '@/components/kern/formulare/b/useFokusBeiWechsel';

export type AnfrageFunnelDaten = ReturnType<typeof useAnfrageFunnel>;

const STEPS = [
  { title: 'Welches Projekt planen Sie?', text: 'Wählen Sie Ihr Fachgewerk für eine passende Planung.' },
  { title: 'Fläche, Zeitraum & Ort', text: 'Eine grobe Orientierung genügt – Details klären wir beim Aufmaß.' },
  { title: 'Kontaktdaten & Absenden', text: 'Direkt online absenden oder alternativ per WhatsApp anfragen.' },
];

// Nebentext in einer Auswahl-Kachel: gesetzt steht die Kachel auf Tinte, der Nebentext dann in Nacht-Text (8,45 : 1).
const KACHEL_NEBEN = 'font-normal text-k-tinte-2 group-has-checked:text-k-nacht-2';

const FELD = 'border border-k-fuge bg-k-fliese';
const FUSSLEISTE = 'flex flex-col-reverse gap-k-3 border-t border-k-fuge pt-k-5 md:flex-row md:items-center md:justify-between';

export default function AnfrageFunnelAnsicht({ funnel }: { funnel: AnfrageFunnelDaten }) {
  const {
    step,
    setStep,
    projectType,
    setProjectType,
    selectedArea,
    customArea,
    setCustomArea,
    timing,
    setTiming,
    location,
    setLocation,
    name,
    setName,
    phone,
    setPhone,
    email,
    setEmail,
    notes,
    setNotes,
    honeypot,
    setHoneypot,
    status,
    errorMessage,
    referenceId,
    projectTitle,
    finalArea,
    locationText,
    handleWhatsAppDirect,
    handleOnlineSubmit,
    handleNewRequest,
    handleBackToOverview,
    selectArea,
  } = funnel;
  const { contact, motto, owner } = COMPANY_DATA;

  // Radiogruppen außerhalb eines Formulars: eindeutige Gruppennamen je Instanz (Vorschau zeigt mehrere Funnel).
  const gruppe = useId();
  const kopfId = `${gruppe}-schritt`;
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
      <div ref={setzeZiel} tabIndex={-1} role="status" className={verbinde(FELD, 'flex flex-col gap-k-5 p-k-5 lg:p-k-7', fokus('hell'))}>
        <span data-motion="notiert" className="flex text-k-abnahme">
          <Icon name="haken" groesse={32} inline />
        </span>
        <div className="flex flex-wrap items-baseline gap-x-k-4 gap-y-k-2">
          <Etikett ton="tinte">Anfrage erfolgreich übermittelt</Etikett>
          {referenceId ? <Etikett rahmen ton="tinte">Vorgangs-Nr.: {referenceId}</Etikett> : null}
        </div>
        <p className="k-anzeige text-k-5 text-k-tinte">Vielen Dank, {name}!</p>
        <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte">
          <strong>Notiert.</strong> Ihre Anfrage für <strong>{projectTitle}</strong> ({finalArea}) in <strong>{locationText}</strong> ist erfolgreich bei Fliesenverlegung Tezgel eingegangen.
          {email && (
            <span className="mt-k-3 flex items-start gap-k-2 border border-k-fuge p-k-3 text-k-2 text-k-tinte-2">
              <span className="flex h-lh shrink-0 items-center text-k-tinte">
                <Icon name="mail" groesse={20} />
              </span>
              <span className="min-w-0">
                Eine ausführliche Bestätigung mit allen Angaben wurde an <em>{email}</em> gesendet.
              </span>
            </span>
          )}
        </p>

        <div className="flex flex-col gap-k-2 border border-k-fuge p-k-4 k-text text-k-2 text-k-tinte-2">
          <p className="flex items-center gap-k-2 font-semibold text-k-tinte">
            <Fugenkreuz className="size-k-3" />
            Nächste Schritte:
          </p>
          <p>
            1. Unser Team prüft Ihre Angaben und den geschätzten Material- &amp; Zeitaufwand.<br />
            2. Herr Tezgel meldet sich binnen <strong className="text-k-tinte">24 bis 48 Stunden</strong> telefonisch zur Terminabstimmung des kostenfreien Aufmaßes.
          </p>
        </div>

        <figure className="m-0 border-l border-k-strich pl-k-4 k-text text-k-2 text-k-tinte">
          <blockquote className="m-0">&bdquo;{motto}&ldquo;</blockquote>
          <figcaption className="mt-k-1 k-mono text-k-1 text-k-tinte-2">— {owner.fullName}, Fachbetrieb Aßlar</figcaption>
        </figure>

        <div className="flex flex-col gap-k-3 md:flex-row">
          {anrufen}
          <Knopf art="neben" onClick={handleNewRequest}>
            Weitere Anfrage starten
          </Knopf>
        </div>
      </div>
    );
  }

  // WHATSAPP GEÖFFNET
  if (status === 'whatsapp_opened') {
    return (
      <div ref={setzeZiel} tabIndex={-1} role="status" className={verbinde(FELD, 'flex flex-col gap-k-5 p-k-5 lg:p-k-7', fokus('hell'))}>
        <span className="flex text-k-tinte">
          <Icon name="whatsapp" groesse={32} />
        </span>
        <Etikett ton="tinte">WhatsApp geöffnet</Etikett>
        <p className="k-anzeige text-k-5 text-k-tinte">Fast geschafft – Nachricht absenden</p>
        <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte">
          Ihre Anfrage ist in WhatsApp vorbereitet. Senden Sie die Nachricht einfach ab – Herr Tezgel antwortet Ihnen schnellstmöglich.
        </p>
        <div className="flex flex-col gap-k-3 md:flex-row">
          {anrufen}
          <Knopf art="neben" onClick={handleBackToOverview}>
            Zurück zur Übersicht
          </Knopf>
        </div>
      </div>
    );
  }

  const aktuell = STEPS[step - 1];

  return (
    <div className={verbinde(FELD, 'flex flex-col')}>
      {/* Kopf: Etikett und Schrittanzeige */}
      <div className="flex flex-wrap items-center justify-between gap-k-4 border-b border-k-fuge px-k-5 py-k-4 lg:px-k-7">
        <Etikett kreuz>Express-Anfrage in 60 Sekunden</Etikett>
        <div className="flex items-center gap-k-4">
          <p className="k-mono text-k-1 text-k-tinte-2">
            {step} von {STEPS.length}
          </p>
          <ol aria-label="Fortschritt" className="flex border-l border-t border-k-strich">
            {STEPS.map((item, idx) => {
              const s = idx + 1;
              return (
                <li
                  key={item.title}
                  aria-current={step === s ? 'step' : undefined}
                  data-motion="zustand"
                  className={verbinde(
                    'flex size-k-7 items-center justify-center border-r border-b border-k-strich k-mono text-k-2',
                    step === s ? 'bg-k-tinte text-k-kalk' : step > s ? 'bg-k-kalk text-k-tinte' : 'bg-k-fliese text-k-tinte-2',
                  )}
                >
                  {step > s ? <Icon name="haken" groesse={20} titel={`Schritt ${s} erledigt`} /> : s}
                </li>
              );
            })}
          </ol>
        </div>
      </div>

      <div className="flex flex-col gap-k-6 p-k-5 lg:p-k-7">
        <div className="flex flex-col gap-k-2">
          {/* Kein Überschriften-Element: im Bestand ist der Schritttitel Text, keine Überschrift (Text v2: keine neuen Überschriften). */}
          <p id={kopfId} ref={setzeZiel} tabIndex={-1} className={verbinde('k-anzeige text-k-5 text-k-tinte', fokus('hell'))}>
            Schritt {step}: {aktuell.title}
          </p>
          <p className="k-text text-k-3 text-k-tinte-2">{aktuell.text}</p>
        </div>

        {/* SCHRITT 1: PROJEKT */}
        {step === 1 && (
          <>
            <div role="radiogroup" aria-labelledby={kopfId} className="grid grid-cols-1 border-l border-t border-k-strich md:grid-cols-2 lg:grid-cols-3">
              {PROJECT_TYPES.map((pt) => (
                <Auswahlknopf
                  key={pt.id}
                  art="kachel"
                  name={`${gruppe}-projekt`}
                  value={pt.id}
                  checked={projectType === pt.id}
                  onChange={() => setProjectType(pt.id)}
                >
                  <span className="flex flex-col gap-k-1">
                    <span className={verbinde('k-mono text-k-1', KACHEL_NEBEN)}>{pt.badge}</span>
                    <span>{pt.title}</span>
                    <span className={verbinde('text-k-2', KACHEL_NEBEN)}>{pt.subtitle}</span>
                  </span>
                </Auswahlknopf>
              ))}
            </div>

            <div className={verbinde(FUSSLEISTE, 'md:justify-end')}>
              <Knopf onClick={() => setStep(2)} hinten={<Icon name="pfeil" groesse={20} />}>
                Weiter zu Schritt 2: Fläche &amp; Ort
              </Knopf>
            </div>
          </>
        )}

        {/* SCHRITT 2: DETAILS */}
        {step === 2 && (
          <>
            <div className="flex flex-col gap-k-4">
              <Feldgruppe legende="Ungefähre Fläche in Quadratmetern" anordnung="kacheln" spalten={4}>
                {AREA_OPTIONS.map((opt) => (
                  <Auswahlknopf
                    key={opt}
                    art="kachel"
                    name={`${gruppe}-flaeche`}
                    value={opt}
                    checked={selectedArea === opt && !customArea}
                    onChange={() => selectArea(opt)}
                  >
                    <span className="k-mono text-k-2">{opt}</span>
                  </Auswahlknopf>
                ))}
              </Feldgruppe>
              <Feld
                id="funnel-custom-area"
                beschriftung="Genaue Quadratmeterzahl eingeben"
                placeholder="Oder genaue m²-Zahl eingeben (z. B. 24 m²)"
                value={customArea}
                onChange={(e) => setCustomArea(e.target.value)}
                className="md:max-w-1/2"
              />
            </div>

            <Feldgruppe legende="Gewünschter Ausführungszeitraum" anordnung="kacheln" spalten={3}>
              {TIMING_OPTIONS.map((opt) => (
                <Auswahlknopf key={opt} art="kachel" name={`${gruppe}-zeitraum`} value={opt} checked={timing === opt} onChange={() => setTiming(opt)}>
                  <span className="text-k-2">{opt}</span>
                </Auswahlknopf>
              ))}
            </Feldgruppe>

            <Feld
              id="funnel-location"
              beschriftung="Einsatzort / Postleitzahl"
              hilfe="Wir arbeiten im Lahn-Dill-Kreis, Raum Gießen und ganz Hessen."
              placeholder="z. B. 35614 Aßlar, 35578 Wetzlar oder Nachbarort"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />

            <div className={FUSSLEISTE}>
              <Knopf art="text" onClick={() => setStep(1)} vorne={<Icon name="pfeil" richtung="links" groesse={20} />}>
                Zurück
              </Knopf>
              <Knopf onClick={() => setStep(3)} hinten={<Icon name="pfeil" groesse={20} />}>
                Weiter zu Schritt 3: Kontaktdaten
              </Knopf>
            </div>
          </>
        )}

        {/* SCHRITT 3: KONTAKT & ABSENDEN */}
        {step === 3 && (
          <form onSubmit={handleOnlineSubmit} aria-labelledby={kopfId} className="flex flex-col gap-k-6">
            {/* Honeypot gegen Spam-Bots (verborgen, nicht fokussierbar) */}
            <input
              type="text"
              name="website_url_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden="true"
            />

            <p className="flex flex-wrap items-center justify-between gap-x-k-4 gap-y-k-1 border border-k-fuge bg-k-kalk px-k-4 py-k-2 k-text text-k-2 text-k-tinte">
              <span>
                <strong>Projekt:</strong> {projectTitle} &middot; <strong>Umfang:</strong> {finalArea} &middot;{' '}
                <strong>Ort:</strong> {locationText}
              </span>
              <Knopf art="text" groesse="klein" onClick={() => setStep(2)}>
                Ändern
              </Knopf>
            </p>

            <div className="grid grid-cols-1 gap-k-5 md:grid-cols-2">
              <Feld
                id="funnel-name"
                required
                autoComplete="name"
                beschriftung="Ihr Name"
                zusatz="*"
                placeholder="Vor- und Nachname"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Feld
                id="funnel-phone"
                art="tel"
                required
                autoComplete="tel"
                minLength={6}
                beschriftung="Telefon- oder Mobilnummer"
                zusatz="*"
                placeholder="Für die Rücksprache zum Aufmaß"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <Feld
                id="funnel-email"
                art="email"
                autoComplete="email"
                beschriftung="E-Mail-Adresse"
                zusatz="(für die Eingangsbestätigung)"
                placeholder="ihre-adresse@beispiel.de"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="md:col-span-2"
              />
              <Mehrzeilig
                id="funnel-notes"
                rows={3}
                beschriftung="Projekt-Details / Wünsche (optional)"
                placeholder="z. B. Altbelag vorhanden, bodengleiche Dusche gewünscht, Fliesenformat ca. 60 x 120 cm …"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="md:col-span-2"
              />
            </div>

            {/* Fehler direkt über den Knöpfen: Versatz-Zeichen + Text, role="alert", mit WhatsApp-Weg */}
            {errorMessage ? (
              <Hinweis art="fehler" titel="Fehler beim Absenden:">
                <p>{errorMessage}</p>
                <p className="mt-k-1">
                  Sie können die Anfrage alternativ direkt per <TextKnopf onClick={handleWhatsAppDirect}>WhatsApp senden</TextKnopf> oder anrufen.
                </p>
              </Hinweis>
            ) : null}

            <div className="flex flex-col gap-k-4 border-t border-k-fuge pt-k-5">
              <div className="flex flex-col gap-k-3 md:flex-row">
                <SendeKnopf sendet={status === 'submitting'} groesse="gross" className="md:flex-1" hinten={<Icon name="pfeil" groesse={20} />}>
                  Anfrage senden
                </SendeKnopf>
                <Knopf art="neben" groesse="gross" onClick={handleWhatsAppDirect} vorne={<Icon name="whatsapp" groesse={20} />}>
                  Direkt per WhatsApp
                </Knopf>
              </div>
              <p className="k-text text-k-2 text-k-tinte-2">
                Ihre Angaben werden vertraulich behandelt und verschlüsselt übertragen. Keine Weitergabe an Dritte. Details in unserer{' '}
                <Textlink href="/datenschutz">Datenschutzerklärung</Textlink>.
              </p>
            </div>

            <div className="flex">
              <Knopf art="text" onClick={() => setStep(2)} vorne={<Icon name="pfeil" richtung="links" groesse={20} />}>
                Zurück zu Schritt 2
              </Knopf>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
