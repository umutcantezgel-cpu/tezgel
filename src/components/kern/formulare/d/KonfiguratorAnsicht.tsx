'use client';

// Ansicht des Fliesen-Konfigurators (F-06, P4-05b, KERN v1.2) ohne eigene Logik: bekommt das Ergebnis von
// `useFliesenKonfigurator` (Bestand und Kern nutzen denselben Hook, G9). So kann die Vorschau Schritt und Zustand setzen,
// ohne zu senden. Arbeitsseiten-Formular (K-003 Prinzip 6): ein Feld (Fliese, 1-px-Fuge) mit Kopf (Etikett, Fortschritt,
// Überschrift, Richtwert live), Schrittfrage, Inhalt des Schritts und Fußleiste mit Zurück/Weiter.
// Einfachauswahl als Auswahlknöpfe (Radios, Pfeiltasten), Mehrfachauswahl (Bereiche, Untergrund) als Ankreuzfelder.
// Fokus: beim Schrittwechsel auf die Schrittfrage, nach dem Absenden auf die Erfolgs- bzw. WhatsApp-Meldung
// (useFokusBeiWechsel). Der Bestand führt den Fokus über `goToStep`/`headingRef`; hier steht `setStep` mit dem
// Fokusmuster der Kern-Formulare (P3-13b), die Schrittlogik ist dieselbe.
// Wortlaut, IDs, name, type, inputMode und autocomplete wie `src/components/funnels/FliesenKonfigurator.jsx`; für
// /fliesen/* gibt es keine Zeile in MIKROTEXTE.md, darum bleiben Ladetext, Erfolgstext und das Brief-Emoji wörtlich
// (Vorschläge in der Rückgabe P4-05b). Der WhatsApp-Weg ist wie im Bestand ein zweiter Absende-Knopf
// (name="channel" value="whatsapp"): Der Hook liest den auslösenden Knopf, die Pflichtfelder sperren beide Wege.
import { useId, useRef, type ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import {
  FORMAT_OPTIONS,
  MATERIAL_OPTIONS,
  PATTERN_OPTIONS,
  ROOM_OPTIONS,
  STAIR_COVERING_OPTIONS,
  STAIR_TYPE_OPTIONS,
  STEPS,
  SUBSTRATE_OPTIONS,
  TIMING_OPTIONS,
  YES_NO,
  YES_NO_UNSURE,
  fmt,
  type useFliesenKonfigurator,
} from '@/lib/formulare/useFliesenKonfigurator';
import Ankreuzfeld from '@/components/kern/basis/Ankreuzfeld';
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
import Regler from '@/components/kern/formulare/c/Regler';
import KonfiguratorErgebnis from '@/components/kern/formulare/d/KonfiguratorErgebnis';
import {
  ANKREUZ_LANG,
  BEHAELTER,
  FUSSLEISTE,
  INNEN,
  KACHELN_MITTEL,
  KNOPFREIHE,
  KONTAKT,
  KOPF_INNEN,
  PAAR_LANG,
  PLATZHALTER_TEXT,
  ZELLE_RAND,
} from '@/components/kern/formulare/c/raster';

export type KonfiguratorDaten = ReturnType<typeof useFliesenKonfigurator>;

type Option = { id: string; label?: string; title?: string; desc?: string };

// Nebentext in einer Auswahl-Kachel: gesetzt steht die Kachel auf Tinte, der Nebentext dann in Nacht-Text (8,45 : 1).
const KACHEL_NEBEN = 'font-normal text-k-tinte-2 group-has-checked:text-k-nacht-2';
const TEXT = 'min-w-0 wrap-break-word hyphens-auto';

const FELD = 'border border-k-fuge bg-k-fliese';
const MELDUNG = verbinde(FELD, 'flex flex-col gap-k-5', INNEN, fokus('hell'));
const HILFE = 'max-w-(--k-mass) k-text text-k-2 text-k-tinte-2';
const RASTER = 'grid grid-cols-1 border-l border-t border-k-strich';
const ZELLE = verbinde('min-w-0 border-r border-b border-k-strich bg-k-fliese', ZELLE_RAND);
// Felder nebeneinander (Behälterbreite): Zahlenfelder mit kurzen Platzhaltern ab 32 rem; die Stufenfelder („14 (automatisch)“
// in Mono, 182 px) zu dritt erst ab 56 rem.
const FELDER_2 = 'grid grid-cols-1 gap-k-5 @lg:grid-cols-2';
const FELDER_3 = 'grid grid-cols-1 gap-k-5 @lg:grid-cols-2 @4xl:grid-cols-3';
// Zwei Einzelwahlen (Zeilen) nebeneinander ab 36 rem.
const WAHL_2 = 'grid grid-cols-1 gap-k-6 @xl:grid-cols-2';

/** Titel und Beschreibung in einer Auswahl; in der Kachel wechselt der Nebentext gesetzt auf Nacht-Text (Tinte-Fläche). */
function Inhalt({ titel, beschreibung, kachel = false }: { titel: ReactNode; beschreibung?: ReactNode; kachel?: boolean }) {
  return (
    <span className="flex flex-col gap-k-1">
      <span className={TEXT}>{titel}</span>
      {beschreibung ? (
        <span className={verbinde('text-k-2', kachel ? KACHEL_NEBEN : 'font-normal text-k-tinte-2', TEXT)}>{beschreibung}</span>
      ) : null}
    </span>
  );
}

/** Einfachauswahl (im Bestand `OptionGroup` mit aria-pressed-Knöpfen): Radios einer Feldgruppe, Beschriftung `label ?? title`. */
function Einzelwahl({
  legende,
  hilfe,
  name,
  optionen,
  wert,
  setze,
  kacheln = false,
}: {
  legende: string;
  hilfe?: string;
  name: string;
  optionen: Option[];
  wert: string;
  setze: (id: string) => void;
  /** Kacheln im Raster (längere Beschriftungen) statt Zeilen nebeneinander (Ja/Nein); Spalten nach Behälterbreite
   *  (KACHELN_MITTEL: längstes Wort „Schnellstmöglich“, „Drittelverband“, „Standardformat“ in 19 px) */
  kacheln?: boolean;
}) {
  const auswahl = optionen.map((o) => (
    <Auswahlknopf
      key={o.id}
      art={kacheln ? 'kachel' : 'zeile'}
      className={kacheln ? ZELLE_RAND : undefined}
      name={name}
      value={o.id}
      checked={wert === o.id}
      onChange={() => setze(o.id)}
    >
      <Inhalt titel={o.label ?? o.title} beschreibung={o.desc} kachel={kacheln} />
    </Auswahlknopf>
  ));
  return kacheln ? (
    <Feldgruppe legende={legende} hilfe={hilfe}>
      <div className={verbinde(RASTER, KACHELN_MITTEL)}>{auswahl}</div>
    </Feldgruppe>
  ) : (
    <Feldgruppe legende={legende} hilfe={hilfe} anordnung="nebeneinander">
      {auswahl}
    </Feldgruppe>
  );
}

export default function KonfiguratorAnsicht({ konfigurator }: { konfigurator: KonfiguratorDaten }) {
  const {
    step,
    setStep,
    sentVia,
    setSentVia,
    referenceId,
    isSubmitting,
    errorMessage,
    data,
    update,
    hasAreaRooms,
    hasStairs,
    areaCalc,
    stairCalc,
    rises,
    handleSubmit,
    toggleRoom,
    toggleSubstrate,
    areaRangeValue,
    roomsText,
    handleNewRequest,
  } = konfigurator;
  const { contact, owner } = COMPANY_DATA;

  // Radiogruppen: eindeutige Gruppennamen je Instanz (die Vorschau zeigt mehrere Konfiguratoren).
  const gruppe = useId();
  const n = (teil: string) => `${gruppe}-${teil}`;
  const ansicht = sentVia === 'online' ? 'erfolg' : sentVia === 'whatsapp' ? 'whatsapp' : `schritt-${step}`;
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

  // -----------------------------------------------------------------------
  // Erfolg (online)
  // -----------------------------------------------------------------------
  if (sentVia === 'online') {
    return (
      <div className={BEHAELTER}>
        <div ref={setzeZiel} tabIndex={-1} role="status" className={MELDUNG}>
          <span data-motion="notiert" className="flex text-k-abnahme">
            <Icon name="haken" groesse={32} inline />
          </span>
          <div className="flex flex-wrap items-baseline gap-x-k-4 gap-y-k-2">
            <Etikett ton="tinte">Konfiguration erfolgreich übermittelt</Etikett>
            {referenceId && <Etikett rahmen ton="tinte">Vorgangs-Nr.: {referenceId}</Etikett>}
          </div>
          <p className="k-anzeige text-k-5 text-k-tinte">Vielen Dank, {data.name}!</p>
          <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte">
            Ihre Konfiguration für <strong>{roomsText}</strong> ist erfolgreich bei Fliesenverlegung Tezgel eingegangen.
            {data.email && (
              <span className="mt-k-3 block border border-k-fuge p-k-3 text-k-2 text-k-tinte-2">
                ✉️ Eine ausführliche Bestätigung mit allen Angaben und Materialschätzungen wurde an <em className="wrap-break-word">{data.email}</em> gesendet.
              </span>
            )}
          </p>

          <div className="flex flex-col gap-k-2 border border-k-fuge p-k-4 k-text text-k-2 text-k-tinte-2">
            <p className="flex items-center gap-k-2 font-semibold text-k-tinte">
              <Fugenkreuz className="size-k-3 shrink-0" />
              Nächste Schritte:
            </p>
            <p>1. Inhaber Deniz Tezgel prüft Ihre Raum- und Materialangaben sowie Machbarkeit und Vorarbeiten.</p>
            <p>
              2. Wir melden uns binnen <strong className="text-k-tinte">24 bis 48 Stunden</strong> telefonisch zur Vorab-Klärung und Terminabsprache.
            </p>
            <p>3. Kostenfreies Aufmaß vor Ort für Ihr verbindliches Festpreisangebot.</p>
          </div>

          <KonfiguratorErgebnis data={data} />

          <div className={KNOPFREIHE}>
            {anrufen}
            <Knopf art="neben" onClick={handleNewRequest}>
              Neue Konfiguration starten
            </Knopf>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // WhatsApp geöffnet
  // -----------------------------------------------------------------------
  if (sentVia === 'whatsapp') {
    return (
      <div className={BEHAELTER}>
        <div ref={setzeZiel} tabIndex={-1} role="status" className={MELDUNG}>
          <span className="flex text-k-tinte">
            <Icon name="whatsapp" groesse={32} />
          </span>
          <Etikett ton="tinte">WhatsApp wurde geöffnet</Etikett>
          <p className="k-anzeige text-k-5 text-k-tinte">WhatsApp wurde geöffnet – bitte absenden</p>
          <p className="max-w-(--k-mass) k-text text-k-3 text-k-tinte">
            Ihre Anfrage ist vorbereitet, aber noch nicht verschickt. Senden Sie die Nachricht in WhatsApp ab. Fotos von Raum,
            Untergrund oder Treppe können Sie gern per WhatsApp nachsenden. Auf dieser Website wird nichts gespeichert.
          </p>

          <KonfiguratorErgebnis data={data} />

          <p className="max-w-(--k-mass) k-text text-k-3 font-semibold text-k-tinte">
            Das verbindliche Festpreisangebot folgt nach dem kostenfreien Vor-Ort-Aufmaß durch {owner.fullName}.
          </p>

          <div className={KNOPFREIHE}>
            {anrufen}
            <Knopf art="neben" onClick={() => setSentVia(null)} vorne={<Icon name="pfeil" richtung="links" groesse={20} />}>
              Zurück zur Anfrage
            </Knopf>
          </div>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------------
  // Schritte
  // -----------------------------------------------------------------------
  const keinBereich = data.rooms.length === 0;
  const mitSetzstufen = data.stairType !== 'blockstufen' && data.risersOn === 'ja';

  return (
    <div className={BEHAELTER}>
      <div className={verbinde(FELD, 'flex flex-col')}>
        {/* Kopf: Etikett, Fortschritt (Liste wie im Bestand), Stand, Überschrift, Richtwert live */}
        <div className={verbinde('flex flex-col gap-k-4 border-b border-k-fuge', KOPF_INNEN)}>
          <div className="flex flex-wrap items-center justify-between gap-x-k-4 gap-y-k-3">
            <Etikett kreuz ton="tinte">
              Fliesen-Konfigurator
            </Etikett>
            <ol aria-label="Fortschritt" className="m-0 flex list-none border-l border-t border-k-strich p-0">
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
                    {step > s ? (
                      <>
                        <Icon name="haken" groesse={20} />
                        <span className="sr-only">Schritt {s}: {item.title} (erledigt)</span>
                      </>
                    ) : (
                      <>
                        <span aria-hidden="true">{s}</span>
                        <span className="sr-only">Schritt {s}: {item.title}</span>
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="flex flex-col gap-k-1">
            <p className="k-mono text-k-1 text-k-tinte-2">Schritt {step} von 4</p>
            <h2 className="k-anzeige text-k-5 text-k-tinte">Fliesenprojekt vorbereiten</h2>
          </div>

          {/* Richtwert live: Zahl und Netto-Fläche je als eigene Texteinheit (Lehren P3 Nr. 2) */}
          <div aria-live="polite" className="flex flex-col gap-k-1 border border-k-fuge bg-k-kalk px-k-4 py-k-3 k-text text-k-2 text-k-tinte-2">
            <p className="font-semibold text-k-tinte">Materialbedarf inkl. Verschnitt (Richtwert):</p>
            {!hasAreaRooms && !hasStairs && <p>Wählen Sie zuerst einen Bereich.</p>}
            {areaCalc && areaCalc.valid && (
              <div className="flex flex-wrap items-baseline gap-x-k-3 gap-y-k-1">
                {/* Spanne ohne Umbruch am Halbgeviertstrich; umbrechen darf die Zeile nur an den Leerzeichen */}
                <p className="k-mono text-k-4 text-k-tinte">
                  ca. <span className="whitespace-nowrap">{fmt(areaCalc.low)}–{fmt(areaCalc.high)}</span> m²
                </p>
                <p className="k-mono text-k-2">aus {fmt(areaCalc.net)} m² netto</p>
              </div>
            )}
            {areaCalc && !areaCalc.valid && <p>Fläche in Schritt 3 eingeben.</p>}
            {stairCalc && (
              <p className={TEXT}>
                <strong className="text-k-tinte">Treppe:</strong>{' '}
                <span className={stairCalc.valid ? 'k-mono' : undefined}>
                  {stairCalc.valid ? `${fmt(stairCalc.total, 2)} m² netto (ohne Verschnitt)` : 'Menge nach Stufenmaßen bzw. beim Aufmaß'}
                </span>
              </p>
            )}
          </div>
        </div>

        <div className={verbinde('flex flex-col gap-k-6', INNEN)}>
          {/* Schrittfrage: Text wie im Bestand (Absatz, keine Überschrift), Ziel des Fokus beim Schrittwechsel */}
          <div className="flex flex-col gap-k-1">
            <p ref={setzeZiel} tabIndex={-1} className={verbinde('k-text text-k-4 font-semibold text-k-tinte', fokus('hell'))}>
              {step}. {STEPS[step - 1].title}
            </p>
            <p className={HILFE}>{STEPS[step - 1].text}</p>
          </div>

          {/* Schritt 1: Bereiche (Mehrfachauswahl) */}
          {step === 1 && (
            <div className="flex flex-col gap-k-5">
              <fieldset className="m-0 min-w-0 border-0 p-0">
                <legend className="sr-only">Raum und Einsatzbereich (Mehrfachauswahl)</legend>
                <div className={verbinde(RASTER, ANKREUZ_LANG)}>
                  {ROOM_OPTIONS.map((r) => (
                    <div key={r.id} className={ZELLE}>
                      <Ankreuzfeld checked={data.rooms.includes(r.id)} onChange={() => toggleRoom(r.id)}>
                        <span className="font-semibold">
                          <Inhalt titel={r.title} beschreibung={r.desc} />
                        </span>
                      </Ankreuzfeld>
                    </div>
                  ))}
                </div>
              </fieldset>

              {data.rooms.includes('bad') && (
                <Hinweis>
                  <p>
                    Für Bad, Dusche und Gäste-WC gibt es eigene Werkzeuge: den <Textlink href="/bad/badplaner">Badplaner</Textlink> und
                    den <Textlink href="/bad/projekt-check">Bad-Projektcheck</Textlink>. Sie können das Bad hier trotzdem mit angeben,
                    etwa wenn es Teil eines größeren Projekts ist.
                  </p>
                </Hinweis>
              )}

              {keinBereich && (
                <p id="konfigurator-step1-hint" className={HILFE}>
                  Bitte wählen Sie mindestens einen Bereich aus.
                </p>
              )}
            </div>
          )}

          {/* Schritt 2: Untergrund und Bestand */}
          {step === 2 && (
            <div className="flex flex-col gap-k-6">
              <Feldgruppe legende="Untergrund bzw. Bestand (Mehrfachauswahl):" hilfe="Bei mehreren Räumen alles auswählen, was vorkommt.">
                <div className={verbinde(RASTER, ANKREUZ_LANG)}>
                  {SUBSTRATE_OPTIONS.map((o) => (
                    <div key={o.id} className={ZELLE}>
                      <Ankreuzfeld checked={data.substrates.includes(o.id)} onChange={() => toggleSubstrate(o.id)}>
                        <span className={verbinde('font-semibold', TEXT)}>{o.label}</span>
                      </Ankreuzfeld>
                    </div>
                  ))}
                </div>
              </Feldgruppe>
              <Einzelwahl
                legende="Ist eine Fußbodenheizung vorhanden oder geplant?"
                name={n('fbh')}
                optionen={YES_NO_UNSURE}
                wert={data.floorHeating}
                setze={(id) => update({ floorHeating: id })}
              />
              <Einzelwahl
                legende="Muss ein Altbelag zurückgebaut werden?"
                name={n('rueckbau')}
                optionen={YES_NO_UNSURE}
                wert={data.removal}
                setze={(id) => update({ removal: id })}
              />
              <Einzelwahl
                legende="Liegt die Fläche in einem Nassbereich (z. B. Duschbereich, Hauswirtschaftsraum mit Bodenablauf)?"
                name={n('nass')}
                optionen={YES_NO}
                wert={data.wetArea}
                setze={(id) => update({ wetArea: id })}
              />
            </div>
          )}

          {/* Schritt 3: Format, Material, Menge */}
          {step === 3 && (
            <div className="flex flex-col gap-k-7">
              {hasAreaRooms && (
                <div className="flex flex-col gap-k-6">
                  <Einzelwahl
                    legende="Fliesenformat:"
                    name={n('format')}
                    optionen={FORMAT_OPTIONS}
                    wert={data.format}
                    setze={(id) => update({ format: id })}
                    kacheln
                  />
                  <Einzelwahl
                    legende="Material bzw. Optik:"
                    name={n('material')}
                    optionen={MATERIAL_OPTIONS}
                    wert={data.material}
                    setze={(id) => update({ material: id })}
                    kacheln
                  />
                  <Einzelwahl
                    legende="Verlegemuster:"
                    name={n('muster')}
                    optionen={PATTERN_OPTIONS}
                    wert={data.pattern}
                    setze={(id) => update({ pattern: id })}
                    kacheln
                  />

                  <Feldgruppe legende="Menge (Fläche):" anordnung="felder">
                    <div className={FELDER_2}>
                      <Feld
                        id="fk-area"
                        mono
                        inputMode="decimal"
                        beschriftung="Zu belegende Fläche in m² (Boden und/oder Wand, netto)"
                        placeholder="z. B. 24,5"
                        value={data.area}
                        onChange={(e) => update({ area: e.target.value })}
                        aria-describedby="fk-area-help"
                      />
                      <Feld
                        id="fk-skirting"
                        mono
                        inputMode="decimal"
                        beschriftung="Sockel in laufenden Metern"
                        zusatz="(optional)"
                        placeholder="z. B. 18"
                        value={data.skirting}
                        onChange={(e) => update({ skirting: e.target.value })}
                      />
                    </div>
                    <div className="flex flex-col gap-k-1">
                      <label htmlFor="fk-area-range" className="sr-only">
                        Fläche in m² per Schieberegler
                      </label>
                      <Regler id="fk-area-range" min="1" max="150" step="1" value={areaRangeValue} onChange={(e) => update({ area: e.target.value })} />
                      <div aria-hidden="true" className="flex justify-between k-mono text-k-1 text-k-tinte-2">
                        <span>1 m²</span>
                        <span>75 m²</span>
                        <span>150 m²</span>
                      </div>
                    </div>
                    <p id="fk-area-help" className={HILFE}>
                      Länge × Breite je Raum addieren; größere Flächen einfach eintippen. Treppen werden unten separat erfasst.
                    </p>
                  </Feldgruppe>
                </div>
              )}

              {hasStairs && (
                <div className={verbinde('flex flex-col gap-k-6', hasAreaRooms && 'border-t border-k-fuge pt-k-6')}>
                  <h4 className="k-text text-k-3 font-semibold text-k-tinte">Treppe</h4>

                  <div className={WAHL_2}>
                    <Einzelwahl
                      legende="Lage:"
                      name={n('lage')}
                      optionen={[{ id: 'innen', label: 'Innentreppe' }, { id: 'aussen', label: 'Außentreppe' }]}
                      wert={data.stairLocation}
                      setze={(id) => update({ stairLocation: id })}
                    />
                    <Einzelwahl
                      legende="Treppenform:"
                      name={n('form')}
                      optionen={[{ id: 'gerade', label: 'Gerade' }, { id: 'gewendelt', label: 'Gewendelt' }]}
                      wert={data.stairShape}
                      setze={(id) => update({ stairShape: id })}
                    />
                  </div>

                  <Einzelwahl
                    legende="Bauart der Treppe:"
                    name={n('bauart')}
                    optionen={STAIR_TYPE_OPTIONS}
                    wert={data.stairType}
                    setze={(id) => update({ stairType: id })}
                    kacheln
                  />

                  {data.stairType !== 'blockstufen' && (
                    <div className={WAHL_2}>
                      <Einzelwahl
                        legende="Belag:"
                        name={n('belag')}
                        optionen={STAIR_COVERING_OPTIONS}
                        wert={data.stairCovering}
                        setze={(id) => update({ stairCovering: id })}
                      />
                      <Einzelwahl
                        legende="Setzstufen (senkrechte Flächen) belegen?"
                        name={n('setzstufen')}
                        optionen={YES_NO}
                        wert={data.risersOn}
                        setze={(id) => update({ risersOn: id })}
                      />
                    </div>
                  )}

                  <Feldgruppe legende="Stufen und Maße:" anordnung="felder">
                    <div className={FELDER_3}>
                      <Feld
                        id="fk-rises"
                        art="number"
                        mono
                        min="1"
                        step="1"
                        inputMode="numeric"
                        beschriftung="Anzahl Steigungen"
                        placeholder="z. B. 14"
                        value={data.stairRises}
                        onChange={(e) => update({ stairRises: e.target.value })}
                        aria-describedby="fk-stairs-help"
                      />
                      {mitSetzstufen && (
                        <Feld
                          id="fk-risers"
                          art="number"
                          mono
                          min="0"
                          step="1"
                          inputMode="numeric"
                          beschriftung="Setzstufen zu belegen"
                          placeholder={Number.isFinite(rises) ? `${rises} (automatisch)` : 'automatisch'}
                          value={data.risersCount}
                          onChange={(e) => update({ risersCount: e.target.value })}
                        />
                      )}
                      <Feld
                        id="fk-treads"
                        art="number"
                        mono
                        min="0"
                        step="1"
                        inputMode="numeric"
                        beschriftung="Trittstufen zu belegen"
                        placeholder={Number.isFinite(rises) ? `${Math.max(rises - 1, 0)} (automatisch)` : 'automatisch'}
                        value={data.treadsCount}
                        onChange={(e) => update({ treadsCount: e.target.value })}
                      />
                    </div>
                    <div className={FELDER_3}>
                      <Feld
                        id="fk-width"
                        mono
                        inputMode="decimal"
                        beschriftung="Laufbreite (cm)"
                        placeholder="z. B. 100"
                        value={data.stairWidth}
                        onChange={(e) => update({ stairWidth: e.target.value })}
                      />
                      <Feld
                        id="fk-depth"
                        mono
                        inputMode="decimal"
                        beschriftung="Auftrittstiefe inkl. Überstand (cm)"
                        placeholder="z. B. 30"
                        value={data.treadDepth}
                        onChange={(e) => update({ treadDepth: e.target.value })}
                      />
                      {mitSetzstufen && (
                        <Feld
                          id="fk-height"
                          mono
                          inputMode="decimal"
                          beschriftung="Steigungshöhe (cm)"
                          placeholder="z. B. 18"
                          value={data.riserHeight}
                          onChange={(e) => update({ riserHeight: e.target.value })}
                        />
                      )}
                    </div>
                    <p id="fk-stairs-help" className={HILFE}>
                      Eine Treppe mit n Steigungen hat n Setzstufen und in der Regel n − 1 Trittstufen – der oberste Auftritt ist
                      meist der Boden des Obergeschosses. Soll dieser Austritt mit belegt werden, tragen Sie die Zahl der
                      Trittstufen einfach selbst ein.
                    </p>
                  </Feldgruppe>

                  {data.stairType === 'blockstufen' && (
                    <Hinweis>
                      <p>
                        Blockstufen sind eine massive Bauart (meist Naturstein oder Betonwerkstein), die auf Fundament bzw.
                        Mörtelbett versetzt wird – kein Belag auf eine bestehende Treppe. Stückzahl und Maße klären wir beim Aufmaß.
                      </p>
                    </Hinweis>
                  )}

                  <Einzelwahl
                    legende="Treppensockel mit ausführen?"
                    name={n('treppensockel')}
                    optionen={YES_NO}
                    wert={data.stairSkirting}
                    setze={(id) => update({ stairSkirting: id })}
                  />
                </div>
              )}

              {!hasAreaRooms && !hasStairs && <p className={HILFE}>Bitte wählen Sie in Schritt 1 zuerst einen Bereich aus.</p>}
            </div>
          )}

          {/* Schritt 4: Zusammenfassung und Kontakt */}
          {step === 4 && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-k-6">
              <KonfiguratorErgebnis data={data} />

              <div className={KONTAKT}>
                <Feld
                  id="fk-name"
                  className={PAAR_LANG}
                  required
                  autoComplete="name"
                  beschriftung="Name"
                  zusatz="*"
                  placeholder="Vor- und Nachname"
                  value={data.name}
                  onChange={(e) => update({ name: e.target.value })}
                />
                <Feld
                  id="fk-phone"
                  className={verbinde(PAAR_LANG, PLATZHALTER_TEXT)}
                  art="tel"
                  required
                  minLength={6}
                  autoComplete="tel"
                  beschriftung="Telefon- oder Mobilnummer"
                  zusatz="*"
                  placeholder="Für die Rücksprache zum Aufmaß"
                  value={data.phone}
                  onChange={(e) => update({ phone: e.target.value })}
                />
                <Feld
                  id="fk-email"
                  art="email"
                  autoComplete="email"
                  beschriftung="E-Mail-Adresse"
                  zusatz="(optional)"
                  placeholder="ihre-adresse@beispiel.de"
                  value={data.email}
                  onChange={(e) => update({ email: e.target.value })}
                />
                <Feld
                  id="fk-zip"
                  autoComplete="postal-code"
                  beschriftung="PLZ & Ort des Projekts"
                  placeholder="PLZ und Ort"
                  value={data.zipCity}
                  onChange={(e) => update({ zipCity: e.target.value })}
                />
              </div>

              <Einzelwahl
                legende="Gewünschter Zeitraum:"
                name={n('zeitraum')}
                optionen={TIMING_OPTIONS.map((t) => ({ id: t, label: t }))}
                wert={data.timing}
                setze={(id) => update({ timing: id })}
                kacheln
              />

              <Mehrzeilig
                id="fk-notes"
                rows={3}
                beschriftung="Notiz"
                zusatz="(optional)"
                hilfe="Fotos senden Sie gern im Anschluss per WhatsApp nach."
                placeholder="z. B. Raummaße, Wunschfliese, Besonderheiten am Untergrund …"
                value={data.notes}
                onChange={(e) => update({ notes: e.target.value })}
              />

              <Ankreuzfeld required checked={data.privacyConsent} onChange={(e) => update({ privacyConsent: e.target.checked })}>
                <span className="text-k-2">
                  Ich bin einverstanden, dass meine Angaben zur Bearbeitung der Anfrage verwendet werden. Details in der{' '}
                  <Textlink href="/datenschutz">Datenschutzerklärung</Textlink>. <span className="k-mono">*</span>
                </span>
              </Ankreuzfeld>

              {/* Fehler direkt über den Knöpfen: Versatz-Zeichen + Text, role="alert" */}
              {errorMessage && <Hinweis art="fehler">{errorMessage}</Hinweis>}

              <div className="flex flex-col gap-k-4 border-t border-k-fuge pt-k-5">
                <div className={KNOPFREIHE}>
                  <SendeKnopf
                    name="channel"
                    value="online"
                    sendet={isSubmitting}
                    ladetext="Wird übertragen …"
                    className="@3xl:flex-1"
                    hinten={<Icon name="pfeil" groesse={20} />}
                  >
                    Online absenden (mit E-Mail-Bestätigung)
                  </SendeKnopf>
                  <Knopf type="submit" name="channel" value="whatsapp" art="neben" beschaeftigt={isSubmitting} vorne={<Icon name="whatsapp" groesse={20} />}>
                    Per WhatsApp senden
                  </Knopf>
                </div>
                <p className={verbinde(HILFE, 'flex items-start gap-k-2')}>
                  <span className="flex h-lh shrink-0 items-center text-k-tinte">
                    <Icon name="schloss" groesse={16} />
                  </span>
                  <span className="min-w-0">
                    Bei Online-Absendung erhalten Sie unmittelbar eine schriftliche Zusammenfassung per E-Mail. Bei Auswahl von
                    WhatsApp öffnet sich WhatsApp mit Ihren vorbereiteten Angaben.
                  </span>
                </p>
              </div>

              <div className="flex">
                <Knopf art="text" onClick={() => setStep(3)} vorne={<Icon name="pfeil" richtung="links" groesse={20} />}>
                  Zurück zu Schritt 3
                </Knopf>
              </div>
            </form>
          )}

          {/* Navigation für die Schritte 1–3 */}
          {step < 4 && (
            <div className={verbinde(FUSSLEISTE, step === 1 && '@md:justify-end')}>
              {step > 1 && (
                <Knopf art="neben" onClick={() => setStep(step - 1)} vorne={<Icon name="pfeil" richtung="links" groesse={20} />}>
                  Zurück
                </Knopf>
              )}
              <Knopf
                onClick={() => setStep(step + 1)}
                deaktiviert={keinBereich}
                aria-describedby={keinBereich && step === 1 ? 'konfigurator-step1-hint' : undefined}
                hinten={<Icon name="pfeil" groesse={20} />}
              >
                {step === 3 ? 'Zur Zusammenfassung' : `Weiter zu Schritt ${step + 1}`}
              </Knopf>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
