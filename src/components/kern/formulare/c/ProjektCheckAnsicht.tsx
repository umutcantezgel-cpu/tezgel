'use client';

// Ansicht des Bad-Projektchecks (F-05, P4-05a, KERN v1.2) ohne eigene Logik: bekommt das Ergebnis von `useProjektCheck`
// (Bestand und Kern nutzen denselben Hook, G9). So kann die Vorschau einen Zustand setzen, ohne zu senden.
// Struktur (K-003 „Fuge statt Karte“): ein Feld mit Kopf; darunter die vier Angaben (Größe als Regler, Umfang und
// Ausstattungsniveau als Auswahlknöpfe im Raster, Extras als Ankreuzfelder), darunter Zusammenfassung und Anfrage.
// Untereinander statt Bestands-Spalten links/rechts, damit die Tab-Folge der Lesefolge folgt (Lehren P3 Nr. 7);
// ab md stehen Zusammenfassung und Anfrage nebeneinander (kurze Spalten, kein Rücksprung über eine Bildschirmhöhe).
// Der WhatsApp-Weg ist wie im Bestand ein zweiter Absende-Knopf (name="channel" value="whatsapp"): Der Hook liest den
// auslösenden Knopf (submitter), und die Pflichtfelder sperren beide Wege über die Formularprüfung des Browsers.
// Fokus: nach „Angebot mit Festpreis anfordern“ auf das Namensfeld, nach dem Absenden auf die Meldung.
// Wortlaut, IDs, name, type und autocomplete wie `src/components/funnels/BadProjektCheck.jsx`; für /bad/* gibt es keine
// Zeile in MIKROTEXTE.md, darum bleiben Ladetext, Erfolgstext und das Brief-Emoji wörtlich (Vorschläge in der Rückgabe).
// Die bisher nur für Screenreader sichtbaren Beschriftungen stehen sichtbar über den Feldern (K-011), Wortlaut gleich.
import { useId, useRef } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { EXTRA_OPTIONS, SCOPE_OPTIONS, TIER_OPTIONS, type useProjektCheck } from '@/lib/formulare/useProjektCheck';
import Ankreuzfeld from '@/components/kern/basis/Ankreuzfeld';
import Auswahlknopf from '@/components/kern/basis/Auswahlknopf';
import Etikett from '@/components/kern/basis/Etikett';
import Feld from '@/components/kern/basis/Feld';
import Feldgruppe from '@/components/kern/basis/Feldgruppe';
import Hinweis from '@/components/kern/basis/Hinweis';
import Knopf from '@/components/kern/basis/Knopf';
import SendeKnopf from '@/components/kern/basis/SendeKnopf';
import Textlink from '@/components/kern/basis/Textlink';
import { Fugenkreuz } from '@/components/kern/basis/Zeichen';
import { fokus, verbinde } from '@/components/kern/basis/klassen';
import Icon from '@/components/kern/icons/Icon';
import { useFokusBeiWechsel } from '@/components/kern/formulare/b/useFokusBeiWechsel';
import Regler from '@/components/kern/formulare/c/Regler';
import { BEHAELTER, INNEN, KACHELN_KURZ, KACHELN_MITTEL, KOPF_INNEN, PLATZHALTER_TEXT, ZELLE_RAND } from '@/components/kern/formulare/c/raster';

export type ProjektCheckDaten = ReturnType<typeof useProjektCheck>;

// Nebentext in einer Auswahl-Kachel: gesetzt steht die Kachel auf Tinte, der Nebentext dann in Nacht-Text (8,45 : 1).
const KACHEL_NEBEN = 'font-normal text-k-tinte-2 group-has-checked:text-k-nacht-2';
const KACHEL_TEXT = 'min-w-0 wrap-break-word hyphens-auto';
const RASTER = 'grid grid-cols-1 border-l border-t border-k-strich';
// Zusammenfassung und Anfrage nebeneinander erst ab 64 rem: Der E-Mail-Platzhalter „Ihre E-Mail-Adresse (optional für
// Bestätigung)“ braucht in der Anfrage-Spalte ≈ 24 rem Feldbreite.
const ZWEI_SPALTEN = '@5xl:grid-cols-2';
const MELDUNG = verbinde('flex flex-col gap-k-4 border border-k-fuge bg-k-fliese p-k-4 k-text text-k-2 text-k-tinte', fokus('hell'));

export default function ProjektCheckAnsicht({ check }: { check: ProjektCheckDaten }) {
  const {
    sqm,
    changeSqm,
    tier,
    setTier,
    sanitaryScope,
    setSanitaryScope,
    selectedOptions,
    toggleOption,
    contactOpen,
    setContactOpen,
    leadData,
    setLeadData,
    sentVia,
    setSentVia,
    referenceId,
    isSubmitting,
    errorMessage,
    sqmLabel,
    scopeLabel,
    tierLabel,
    extras,
    matchingBath,
    handleLeadSubmit,
    handleNewRequest,
  } = check;
  const { contact } = COMPANY_DATA;

  // Radiogruppen außerhalb eines Formulars: eindeutige Gruppennamen je Instanz (die Vorschau zeigt mehrere Projektchecks).
  const gruppe = useId();
  const ansicht = !contactOpen ? 'start' : sentVia === 'online' ? 'online' : sentVia === 'whatsapp' ? 'whatsapp' : 'formular';
  const fokusZiel = useRef<HTMLElement | null>(null);
  const setzeZiel = (el: HTMLElement | null) => {
    fokusZiel.current = el;
  };
  useFokusBeiWechsel(ansicht, fokusZiel);

  return (
    <div className={BEHAELTER}>
      <div className="flex flex-col border border-k-fuge bg-k-fliese">
        {/* Kopf */}
        <div className={verbinde('flex flex-col gap-k-4 border-b border-k-fuge', KOPF_INNEN)}>
          <div className="flex flex-wrap items-start justify-between gap-x-k-4 gap-y-k-2">
            <Etikett kreuz ton="tinte">
              Bad-Projektcheck
            </Etikett>
            <Etikett rahmen>Festpreis nach Vor-Ort-Aufmaß</Etikett>
          </div>
          <h2 className="k-anzeige text-k-5 text-k-tinte">Ihr Badprojekt in vier Schritten beschreiben</h2>
          <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte-2">
            Wählen Sie Größe, Umfang, Ausstattungsniveau und Wünsche – wir erhalten eine strukturierte Anfrage und
            melden uns für einen kostenfreien Aufmaßtermin in Aßlar, Wetzlar und Mittelhessen.
          </p>
        </div>

        {/* Angaben 1–4 */}
        <div className={verbinde('flex min-w-0 flex-col gap-k-7 border-b border-k-fuge', INNEN)}>
          {/* 1. Badgröße (Regler) */}
          <div className="flex flex-col gap-k-2">
            <div className="flex flex-wrap items-baseline justify-between gap-x-k-3 gap-y-k-1">
              <label htmlFor="budget-sqm" className="k-text text-k-2 font-semibold text-k-tinte">
                1. Badezimmer-Größe in Quadratmetern:
              </label>
              <span className="border border-k-strich px-k-3 py-k-1 k-mono text-k-3 whitespace-nowrap text-k-tinte">{sqmLabel} m²</span>
            </div>
            <Regler id="budget-sqm" min="3.5" max="25" step="0.5" value={sqm} onChange={(e) => changeSqm(e.target.value)} />
            <div className="grid grid-cols-2 gap-x-k-3 gap-y-k-1 k-mono text-k-1 text-k-tinte-2 @2xl:flex @2xl:justify-between">
              <span>3,5 m² (Gäste-WC)</span>
              <span className="text-right @2xl:text-left">8,2 m² (Standard)</span>
              <span>15,9 m² (Komfort)</span>
              <span className="text-right">25 m² (Spa)</span>
            </div>
          </div>

          {/* 2. Sanierungsumfang */}
          <Feldgruppe legende="2. Sanierungsumfang:">
            <div className={verbinde(RASTER, KACHELN_KURZ)}>
              {SCOPE_OPTIONS.map((scope) => (
                <Auswahlknopf
                  key={scope.id}
                  art="kachel"
                  className={ZELLE_RAND}
                  name={`${gruppe}-umfang`}
                  value={scope.id}
                  checked={sanitaryScope === scope.id}
                  onChange={() => setSanitaryScope(scope.id)}
                >
                  <span className="flex flex-col gap-k-1">
                    <span className={KACHEL_TEXT}>{scope.label}</span>
                    <span className={verbinde('text-k-2', KACHEL_NEBEN, KACHEL_TEXT)}>{scope.desc}</span>
                  </span>
                </Auswahlknopf>
              ))}
            </div>
          </Feldgruppe>

          {/* 3. Ausstattungsniveau */}
          <Feldgruppe legende="3. Ausstattungsniveau:">
            <div className={verbinde(RASTER, KACHELN_KURZ)}>
              {TIER_OPTIONS.map((t) => (
                <Auswahlknopf
                  key={t.id}
                  art="kachel"
                  className={ZELLE_RAND}
                  name={`${gruppe}-niveau`}
                  value={t.id}
                  checked={tier === t.id}
                  onChange={() => setTier(t.id)}
                >
                  <span className="flex flex-col gap-k-1">
                    <span className={KACHEL_TEXT}>{t.label}</span>
                    <span className={verbinde('text-k-2', KACHEL_NEBEN, KACHEL_TEXT)}>{t.desc}</span>
                  </span>
                </Auswahlknopf>
              ))}
            </div>
          </Feldgruppe>

          {/* 4. Wunschausstattung & Extras */}
          <Feldgruppe legende="4. Wunschausstattung & Extras:">
            <div className={verbinde(RASTER, KACHELN_MITTEL)}>
              {EXTRA_OPTIONS.map((opt) => (
                <div key={opt.id} className={verbinde('min-w-0 border-r border-b border-k-strich bg-k-fliese', ZELLE_RAND)}>
                  <Ankreuzfeld checked={selectedOptions.includes(opt.id)} onChange={() => toggleOption(opt.id)}>
                    <span className={verbinde('font-semibold', KACHEL_TEXT)}>{opt.label}</span>
                  </Ankreuzfeld>
                </div>
              ))}
            </div>
          </Feldgruppe>
        </div>

        {/* Zusammenfassung & Anfrage */}
        <div className={verbinde('grid grid-cols-1', ZWEI_SPALTEN)}>
          <div className={verbinde('flex min-w-0 flex-col gap-k-5 border-b border-k-fuge @5xl:border-b-0 @5xl:border-r', INNEN)}>
            <Etikett kreuz>Ihre Zusammenfassung</Etikett>

            <dl aria-live="polite" className="m-0 border-l border-t border-k-fuge k-text text-k-2">
              {[
                ['Badgröße', `ca. ${sqmLabel} m²`],
                ['Umfang', scopeLabel],
                ['Ausstattung', tierLabel],
                ['Wünsche', extras.join(', ') || 'Keine Extras gewählt'],
              ].map(([term, value]) => (
                <div key={term} className="flex flex-wrap items-baseline justify-between gap-x-k-3 border-r border-b border-k-fuge px-k-3 py-k-2">
                  <dt className="shrink-0 text-k-tinte-2">{term}</dt>
                  <dd className={verbinde('m-0 min-w-0 font-semibold text-k-tinte @md:text-right', term === 'Badgröße' && 'k-mono')}>{value}</dd>
                </div>
              ))}
            </dl>
            <p className="k-text text-k-2 text-k-tinte-2">
              Jedes Bad ist anders: Untergrund, Leitungswege und Materialwahl entscheiden über den Aufwand. Den
              verbindlichen Festpreis erhalten Sie deshalb nach dem kostenfreien Vor-Ort-Aufmaß.
            </p>

            {/* Verweis auf das passende Musterbad */}
            <div className="flex flex-col gap-k-1 border border-k-fuge p-k-4 k-text text-k-2 text-k-tinte">
              <p className="flex flex-wrap items-baseline justify-between gap-x-k-3 font-semibold">
                <span>Musterbad-Vergleich:</span>
                <Textlink href="/bad/musterbaeder">Katalog</Textlink>
              </p>
              <p>
                Passend:{' '}
                <Textlink href={`/bad/musterbaeder/${matchingBath.slug}`} className="font-semibold">
                  {matchingBath.label}
                </Textlink>
              </p>
            </div>

            {/* Zuschuss-Hinweis */}
            <div className="flex flex-col gap-k-1 border border-k-fuge p-k-4 k-text text-k-2 text-k-tinte">
              <p className="flex items-center gap-k-2 font-semibold">
                <Fugenkreuz className="size-k-3 shrink-0" />
                Bis zu 4.180 € Pflegekassen-Zuschuss
              </p>
              <p className="text-k-tinte-2">
                Bei Pflegegrad für barrierefreie Bäder nach DIN 18040-2.{' '}
                <Textlink href="/bad/barrierefreies-bad">Details zum barrierefreien Bad &amp; Zuschüssen</Textlink>
              </p>
            </div>
          </div>

          {/* Anfrage */}
          <div className={verbinde('flex min-w-0 flex-col gap-k-4', INNEN)}>
            {!contactOpen ? (
              <Knopf breit onClick={() => setContactOpen(true)} hinten={<Icon name="pfeil" groesse={20} />}>
                Angebot mit Festpreis anfordern
              </Knopf>
            ) : sentVia === 'online' ? (
              <div ref={setzeZiel} tabIndex={-1} role="status" className={MELDUNG}>
                <span data-motion="notiert" className="flex text-k-abnahme">
                  <Icon name="haken" groesse={32} inline />
                </span>
                <div className="flex flex-wrap items-baseline justify-between gap-x-k-3 gap-y-k-2">
                  <p className="k-text text-k-4 font-semibold text-k-tinte">Projektcheck übermittelt</p>
                  {referenceId && <Etikett rahmen ton="tinte">{referenceId}</Etikett>}
                </div>
                <p className="k-text text-k-3">
                  Vielen Dank, <strong>{leadData.name}</strong>! Ihre Projektangaben für ca. <span className="k-mono">{sqmLabel} m²</span> ({scopeLabel}) sind direkt bei Herrn Deniz Tezgel eingegangen.
                  {leadData.email && (
                    <span className="mt-k-2 block text-k-2 text-k-tinte-2">
                      ✉️ Eine Bestätigung wurde an <em className="wrap-break-word">{leadData.email}</em> gesendet.
                    </span>
                  )}
                </p>
                <div className="flex flex-col gap-k-1 border border-k-fuge p-k-3 text-k-tinte-2">
                  <strong className="flex items-center gap-k-2 text-k-tinte">
                    <Fugenkreuz className="size-k-3 shrink-0" />
                    Nächste Schritte:
                  </strong>
                  <p>1. Herr Tezgel prüft Ihre Angaben &amp; Materialbedarf.</p>
                  <p>
                    2. Rückruf binnen <span className="whitespace-nowrap">24–48</span> Std. zur Vor-Ort-Aufmaß-Abstimmung.
                  </p>
                </div>
                <div className="flex">
                  <Knopf art="text" onClick={handleNewRequest}>
                    Erneut anfragen oder anpassen
                  </Knopf>
                </div>
              </div>
            ) : sentVia === 'whatsapp' ? (
              <div ref={setzeZiel} tabIndex={-1} role="status" className={MELDUNG}>
                <p className="flex items-center gap-k-2 k-text text-k-4 font-semibold text-k-tinte">
                  <span className="flex shrink-0">
                    <Icon name="whatsapp" groesse={24} />
                  </span>
                  WhatsApp wurde geöffnet
                </p>
                <p className="k-text text-k-3">
                  Bitte senden Sie die vorbereitete Nachricht mit Ihren Angaben dort ab – erst dann erreicht sie uns.
                </p>
                <div className="flex">
                  <Knopf art="text" onClick={() => setSentVia(null)}>
                    Erneut senden oder Kanal wechseln
                  </Knopf>
                </div>
              </div>
            ) : (
              <form onSubmit={handleLeadSubmit} className="flex flex-col gap-k-4">
                <Feld
                  ref={setzeZiel}
                  id="budget-lead-name"
                  required
                  autoComplete="name"
                  beschriftung="Ihr Name"
                  placeholder="Ihr Name *"
                  value={leadData.name}
                  onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                />
                <Feld
                  id="budget-lead-phone"
                  art="tel"
                  required
                  minLength={6}
                  autoComplete="tel"
                  beschriftung="Ihre Telefonnummer"
                  className={PLATZHALTER_TEXT}
                  placeholder="Ihre Telefonnummer *"
                  value={leadData.phone}
                  onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                />
                <Feld
                  id="budget-lead-email"
                  art="email"
                  autoComplete="email"
                  beschriftung="Ihre E-Mail-Adresse (optional)"
                  placeholder="Ihre E-Mail-Adresse (optional für Bestätigung)"
                  value={leadData.email}
                  onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                />

                {/* Fehler direkt über den Knöpfen: Versatz-Zeichen + Text, role="alert" */}
                {errorMessage && <Hinweis art="fehler">{errorMessage}</Hinweis>}

                <div className="flex flex-col gap-k-3 border-t border-k-fuge pt-k-4">
                  <SendeKnopf
                    name="channel"
                    value="online"
                    sendet={isSubmitting}
                    ladetext="Wird übertragen …"
                    breit
                    hinten={<Icon name="pfeil" groesse={20} />}
                  >
                    Online anfragen (mit E-Mail-Bestätigung)
                  </SendeKnopf>
                  <Knopf
                    type="submit"
                    name="channel"
                    value="whatsapp"
                    art="neben"
                    breit
                    beschaeftigt={isSubmitting}
                    vorne={<Icon name="whatsapp" groesse={20} />}
                  >
                    Anfrage per WhatsApp senden
                  </Knopf>
                </div>
                <p className="k-text text-k-2 text-k-tinte-2">
                  Ihre Angaben werden nur zur Bearbeitung Ihrer Anfrage verwendet.{' '}
                  <Textlink href="/datenschutz">Datenschutz</Textlink>
                </p>
              </form>
            )}

            <Knopf art="neben" breit href={`tel:${contact.phoneLink}`} vorne={<Icon name="telefon" groesse={20} />}>
              Sofort anrufen: <span className="k-mono">{contact.phone}</span>
            </Knopf>
          </div>
        </div>
      </div>
    </div>
  );
}
