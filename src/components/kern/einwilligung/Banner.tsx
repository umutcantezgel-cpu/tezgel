'use client';

// Einwilligungsbanner der Kern-Schale (P3-08, KERN v1.2 K-011, E-013): Schriftfeld statt schwebender Karte.
// Logik ausschließlich über `useEinwilligungsBanner` (P3-00p, G9): Speicherung, Kategorien, Zeitpunkt, `#cookie-settings`
// und `openCookieSettings` liegen dort. Hier stehen nur Darstellung, Lage und Fokusführung.
// - Wortlaut (Rechtstext) wörtlich und in Bestandsreihenfolge aus `src/components/common/CookieConsent.tsx`.
// - „Alle akzeptieren“ und „Alle ablehnen“ gleich groß, gleich geformt, gleiche Farbstufe (beide Nebenknopf).
// - Rolle dialog, aria-modal="false": nicht blockierend, kein Fokuszwang, keine Wurfphysik.
// - Lage: mobil volle Breite direkt über der unteren Leiste samt Sicherheitsrand (`--k-leiste-platz`, P3-07, Rückfall 0), ab 768 px links unten
//   mit höchstens 28rem und Abstand `--k-rand`. Ab lg (P4-13, P4-GEG H2) eine Leiste am unteren Rand über die Seitenbreite
//   (Inhalt auf der Flucht wie der Kopf): links der Text samt „Datenschutz · Impressum“ über die ganze Höhe, rechts wie das
//   Schriftfeld eines Plans der Feldkopf und darunter die Knöpfe in einer Reihe. So bleiben H1 und Einleitung frei, wo die
//   Geometrie es zulässt (Rückgabe P4-13). Raster und Flucht: `.k-banner-leiste` in `src/styles/kern.css`.
// - Nie das LCP-Element (Bauregel 8): kleiner gesetzt als jede Einstiegsüberschrift (Text k-1/k-2) und als Komposition
//   aus Satzblöcken (je ganzer Satz ein Block, fließend umbrechend) – jeder Block ist für die LCP-Messung ein eigenes
//   Textelement; der Wortlaut bleibt Zeichen für Zeichen gleich (textContent). Kein Zeitverzug hier.
// - Kein schwebendes Schild (P3-08b, K-003 Prinzip 7: feste Ebenen nur Kopf und untere Leiste). Widerruf jederzeit über den
//   Fußlink „Cookie-Einstellungen“ (`#cookie-settings`, P3-07); `handleShieldClick` des Hooks bleibt unverdrahtet.
// - Fokus nie verdeckt (WCAG 2.4.11), ohne Stiländerung am <html> beim Laden (P4-13, E-033 Weg C): Den Zustand
//   `data-k-banner="offen"` setzt das Kopfskript (`src/lib/motion/kopfskript.ts`) schon vor dem ersten Bild, wenn keine
//   Entscheidung gespeichert ist. scroll-padding und Platz am Ende kommen aus festen Werten je Breite (`--k-banner-unten`
//   in `src/styles/kern.css`); der Banner ist höchstens so hoch (`--k-banner-hoehe` bzw. `--k-banner-einstellungen`).
//   Hier wechselt der Wert nur nach einer Handlung im Banner („einstellungen“, zurück „offen“) und fällt nach der Wahl weg.
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useEinwilligungsBanner } from '@/lib/formulare/useEinwilligungsBanner';
import { CONSENT_CATEGORY_INFO, COOKIE_INVENTORY, type ConsentCategory } from '@/lib/cookie-inventory';
import { AkkordeonEintrag, Ankreuzfeld, Etikett, Knopf, Textlink, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';

declare global {
  // Banner eingehängt: Das Kopfskript nimmt den reservierten Platz danach nicht mehr bei einem Skript-Ladefehler zurück.
  interface Window { __kBanner?: boolean }
}

type Einwilligung = ReturnType<typeof useEinwilligungsBanner>;

export type BannerAnsichtProps = Pick<
  Einwilligung,
  | 'consent'
  | 'showBanner'
  | 'showSettings'
  | 'setShowSettings'
  | 'analyticsChecked'
  | 'setAnalyticsChecked'
  | 'marketingChecked'
  | 'setMarketingChecked'
  | 'handleSaveSettings'
  | 'handleClose'
  | 'handleOpenSettings'
  | 'handleDeclineAll'
  | 'handleAcceptAll'
> & {
  /** fest = echte Lage am Bildschirmrand (Standard) · vorschau = im Fluss, für die Entwurfsseite */
  lage?: 'fest' | 'vorschau';
};

// Zustand am <html> (Werte „offen“, „einstellungen“); die Regeln dazu stehen in `src/styles/kern.css`.
const ZUSTAND = 'data-k-banner';

// Lage am Rand: mobil volle Breite über der Leiste; ab md links unten (≤ 28rem) über der Leiste; ab lg Leiste über die
// ganze Breite am unteren Rand (keine untere Leiste mehr), nur mit Fuge oben.
const FEST_BANNER =
  'fixed inset-x-0 bottom-(--k-leiste-platz) z-50 md:right-auto md:left-(--k-rand) md:mb-(--k-rand) md:w-full md:max-w-md lg:right-0 lg:left-0 lg:mb-0 lg:max-w-none lg:grid lg:border-x-0 lg:border-b-0 k-banner-leiste';
// Felder der Leiste ab lg (nur fest): Feldkopf und Knöpfe rechts, Text links über beide Zeilen.
const LEISTE_KOPF = 'lg:col-start-2 lg:row-start-1';
const LEISTE_TEXT = 'lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:border-r lg:border-k-fuge lg:pr-k-5 lg:pb-k-3';
const LEISTE_KNOEPFE = 'lg:col-start-2 lg:row-start-2 lg:border-t-0 lg:pr-0 lg:py-k-3';

const SATZ = 'block';

// Text aus dem Inventar satzweise setzen (je Satz ein Block, Leerzeichen dazwischen bleiben): textContent unverändert.
function Saetze({ text }: { text: string }) {
  const teile = text.split(/(?<=\.) /);
  return (
    <span className="flex flex-col">
      {teile.map((satz, i) => (
        <span key={i} className={SATZ}>
          {i > 0 ? ' ' : null}
          {satz}
        </span>
      ))}
    </span>
  );
}
// Fokus im Feldkopf nach innen (K-006: 2 px, auf Tinte Kalk): außen schnitte ihn der Rand des Banners (overflow) ab.
const FOKUS_INNEN = 'focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-k-kalk';
const KNOPFREIHE = 'grid grid-cols-2 gap-k-2';
// Erste Ansicht ab lg: eine Reihe; „Alle akzeptieren“ und „Alle ablehnen“ bleiben als eigenes Paar gleich breit (Raster mit
// zwei gleichen Spalten), „Einstellungen“ als Textknopf daneben. Unter lg löst sich das Paar auf (contents): Raster wie bisher.
const KNOPFREIHE_LEISTE = 'lg:flex lg:items-center';
const KNOPFPAAR_LEISTE = 'contents lg:grid lg:grid-cols-2 lg:gap-k-2';
// Aufbau: Feldkopf · Mitte (scrollt, wenn der Platz nicht reicht) · Knopffeld (steht immer, die Wahl bleibt sichtbar).
const MITTE = 'flex min-h-0 flex-1 flex-col gap-k-3 overflow-y-auto overscroll-contain px-k-4 pt-k-3 pb-k-2';
const FUSS = 'shrink-0 border-t border-k-fuge px-k-4 py-k-2';

export function BannerAnsicht({
  consent,
  showBanner,
  showSettings,
  setShowSettings,
  analyticsChecked,
  setAnalyticsChecked,
  marketingChecked,
  setMarketingChecked,
  handleSaveSettings,
  handleClose,
  handleOpenSettings,
  handleDeclineAll,
  handleAcceptAll,
  lage = 'fest',
}: BannerAnsichtProps) {
  const fest = lage === 'fest';
  const dialogRef = useRef<HTMLDivElement>(null);
  const kopfRef = useRef<HTMLParagraphElement>(null);
  // Letztes fokussiertes Element außerhalb des Banners (z. B. der Fußlink „Cookie-Einstellungen“): Ziel nach der Wahl.
  const vorherRef = useRef<HTMLElement | null>(null);
  // Fokusführung: Wechselt die Ansicht durch eine Handlung im Banner, verschwindet das fokussierte Element.
  // Dann rückt der Fokus auf den Feldkopf der neuen Ansicht bzw. nach der Wahl dorthin, wo er vor dem Banner war,
  // sonst auf <main> (Kern-Layout: tabIndex=-1) – nie beim ersten Erscheinen.
  const fokusNach = useRef<'ansicht' | 'zurueck' | null>(null);
  const mitFokus = (ziel: 'ansicht' | 'zurueck', handlung: () => void) => {
    fokusNach.current = ziel;
    handlung();
  };

  useEffect(() => {
    if (!showBanner) return;
    const merken = (el: Element | null) => {
      if (el instanceof HTMLElement && el !== document.body && !dialogRef.current?.contains(el)) vorherRef.current = el;
    };
    merken(document.activeElement);
    const beiFokus = (e: FocusEvent) => merken(e.target as Element | null);
    document.addEventListener('focusin', beiFokus);
    return () => document.removeEventListener('focusin', beiFokus);
  }, [showBanner]);

  useEffect(() => {
    const ziel = fokusNach.current;
    if (!ziel) return;
    fokusNach.current = null;
    if (ziel === 'ansicht' && showBanner) kopfRef.current?.focus();
    if (ziel === 'zurueck' && !showBanner) {
      const vorher = vorherRef.current;
      vorherRef.current = null;
      if (vorher?.isConnected) vorher.focus({ preventScroll: true });
      if (!vorher?.isConnected || document.activeElement !== vorher) {
        document.querySelector<HTMLElement>('main')?.focus({ preventScroll: true });
      }
    }
  }, [showBanner, showSettings]);

  // Fokus nie verdeckt: Zustand am <html> nachführen (feste Werte in kern.css). Beim Erstbesuch steht „offen“ schon aus dem
  // Kopfskript; solange noch keine Entscheidung gespeichert ist (Banner erscheint erst nach dem Mount), bleibt es stehen.
  // Gesetzt bzw. entfernt wird nur bei einem Wechsel, also nach einem Klick – vor dem Zeichnen, damit Banner und Platz im
  // selben Bild wechseln.
  useLayoutEffect(() => {
    if (!fest) return;
    window.__kBanner = true;
    const root = document.documentElement;
    const soll = showBanner ? (showSettings ? 'einstellungen' : 'offen') : null;
    if (soll) {
      if (root.getAttribute(ZUSTAND) !== soll) root.setAttribute(ZUSTAND, soll);
    } else if (consent && root.hasAttribute(ZUSTAND)) {
      root.removeAttribute(ZUSTAND);
    }
  }, [fest, showBanner, showSettings, consent]);

  return (
    <>
      {showBanner && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="false"
          aria-label="Cookie-Einwilligungsbanner gemäß DSGVO und TTDSG"
          aria-describedby="cookie-consent-description"
          // Der WhatsApp-Kanal (ab lg rechts unten) weicht der Leiste aus, statt unsichtbar unter ihr fokussierbar zu bleiben.
          data-kanal-frei={fest ? '' : undefined}
          className={verbinde(
            'flex flex-col overflow-hidden border-t border-k-strich bg-k-kalk text-k-tinte md:border',
            fest ? FEST_BANNER : 'w-full max-w-md border',
            fest && (showSettings ? 'max-h-(--k-banner-einstellungen)' : 'max-h-(--k-banner-hoehe)'),
          )}
        >
          {!showSettings ? (
            /* ── Erste Ebene ── */
            <>
              {/* Schließen steht wie im Bestand vor der Überschrift (Text- und Fokusfolge); sichtbar rechts (flex-row-reverse) */}
              <div
                className={verbinde(
                  'flex shrink-0 flex-row-reverse items-center justify-between gap-k-3 bg-k-tinte text-k-kalk',
                  fest && LEISTE_KOPF,
                )}
              >
                {/* Schließen = Nur Essentiell */}
                <button
                  type="button"
                  onClick={() => mitFokus('zurueck', handleClose)}
                  data-motion="zustand"
                  className={verbinde(
                    'flex size-k-7 shrink-0 cursor-pointer items-center justify-center text-k-kalk pointer-fine:hover:bg-k-nacht-fuge active:bg-k-nacht-fuge',
                    FOKUS_INNEN,
                  )}
                  aria-label="Cookie-Banner schließen – nur essentielle Cookies werden gesetzt"
                  title="Schließen = Nur essentielle Cookies"
                >
                  <Icon name="schliessen" groesse={20} />
                </button>
                <p ref={kopfRef} tabIndex={-1} className={verbinde('k-mono text-k-1 px-k-4 py-k-3', FOKUS_INNEN)}>
                  <span>Privatsphäre & Cookie-Einstellungen</span>
                </p>
              </div>

              <div className={verbinde(MITTE, fest && LEISTE_TEXT)}>
                <p
                  id="cookie-consent-description"
                  className={verbinde('k-text flex flex-col text-k-1 text-k-tinte md:text-k-2', fest && 'lg:text-k-1')}
                >
                  <span className={SATZ}>Wir nutzen Cookies auf unserer Website.</span>{' '}
                  <span className={SATZ}>
                    Einige sind <strong className="font-semibold">technisch notwendig</strong> für den Betrieb, während andere
                    uns helfen, unser Online-Angebot zu verbessern und interaktive Karten bereitzustellen.
                  </span>{' '}
                  <span className={SATZ}>
                    Nicht-essentielle Cookies setzen wir nur mit Ihrer Einwilligung (§25 TTDSG, Art. 6 Abs. 1 lit. a DSGVO).
                  </span>{' '}
                  <span className={verbinde(SATZ, 'mt-k-2 text-k-2')}>
                    <Textlink href="/datenschutz" aria-label="Datenschutzerklärung von Fliesenverlegung Tezgel lesen">
                      Datenschutz
                    </Textlink>
                    {' · '}
                    <Textlink href="/impressum">Impressum</Textlink>
                  </span>
                </p>

                {/* Aktueller Status (beim Wiederaufruf) als Mono-Zeile */}
                {consent && consent.timestamp && (
                  <p className="k-mono border-y border-k-fuge py-k-2 text-k-1 text-k-tinte">
                    <strong className="font-normal text-k-tinte-2">Aktueller Status:</strong>{' '}
                    {consent.analytics && consent.marketing
                      ? 'Alle Cookies akzeptiert'
                      : consent.analytics
                        ? 'Analyse erlaubt · Marketing abgelehnt'
                        : consent.marketing
                          ? 'Marketing erlaubt · Analyse abgelehnt'
                          : 'Nur technisch notwendige Cookies'}
                    {' '}(seit {new Date(consent.timestamp).toLocaleDateString('de-DE')})
                  </p>
                )}

              </div>
              <div className={verbinde(FUSS, fest && LEISTE_KNOEPFE)}>
                {/* Knöpfe: „Alle ablehnen“ gleichwertig zu „Alle akzeptieren“ (gleiche Art, Größe, Breite) */}
                <div className={verbinde(KNOPFREIHE, fest && KNOPFREIHE_LEISTE)}>
                  <div className={fest ? KNOPFPAAR_LEISTE : 'contents'}>
                    <Knopf art="neben" breit onClick={() => mitFokus('zurueck', handleAcceptAll)}>
                      Alle akzeptieren
                    </Knopf>
                    <Knopf art="neben" breit onClick={() => mitFokus('zurueck', handleDeclineAll)}>
                      Alle ablehnen
                    </Knopf>
                  </div>
                  <Knopf
                    art="text"
                    groesse="klein"
                    breit
                    className={verbinde('col-span-2', fest && 'lg:w-auto lg:px-k-3')}
                    onClick={() => mitFokus('ansicht', handleOpenSettings)}
                  >
                    Einstellungen
                  </Knopf>
                </div>
              </div>
            </>
          ) : (
            /* ── Einstellungen (granular) ── */
            <>
              <div className={verbinde('shrink-0 bg-k-tinte text-k-kalk', fest && LEISTE_KOPF)}>
                <p ref={kopfRef} tabIndex={-1} className={verbinde('k-mono text-k-1 px-k-4 py-k-3', FOKUS_INNEN)}>
                  Cookie-Einstellungen individuell anpassen
                </p>
              </div>

              <div className={verbinde(MITTE, fest && LEISTE_TEXT)}>
                <p className="k-text flex flex-col text-k-1 text-k-tinte-2 md:text-k-2">
                  <span className={SATZ}>Bestimmen Sie selbst, welche Kategorien Sie zulassen möchten.</span>{' '}
                  <span className={SATZ}>
                    Technisch notwendige Cookies sind für den reibungslosen Betrieb erforderlich und können nicht abgewählt
                    werden (§25 Abs. 2 TTDSG).
                  </span>
                </p>

                <ul className="flex flex-col border-t border-k-fuge">
                  {(Object.entries(CONSENT_CATEGORY_INFO) as [ConsentCategory, (typeof CONSENT_CATEGORY_INFO)[ConsentCategory]][]).map(
                    ([key, info]) => {
                      const relatedCookies = COOKIE_INVENTORY.filter((c) => c.category === key);
                      const isChecked = key === 'essential' ? true : key === 'analytics' ? analyticsChecked : marketingChecked;

                      return (
                        <li key={key} className="flex flex-col border-b border-k-fuge">
                          <Ankreuzfeld
                            checked={isChecked}
                            disabled={info.required}
                            readOnly={info.required}
                            onChange={
                              !info.required
                                ? () => {
                                    if (key === 'analytics') setAnalyticsChecked(!analyticsChecked);
                                    if (key === 'marketing') setMarketingChecked(!marketingChecked);
                                  }
                                : undefined
                            }
                            hilfe={<Saetze text={info.description} />}
                          >
                            <span className="flex flex-wrap items-baseline gap-x-k-2 gap-y-k-1">
                              <span className="font-semibold">{info.label}</span>
                              {info.required ? (
                                <Etikett rahmen>Erforderlich</Etikett>
                              ) : isChecked ? (
                                <Etikett rahmen ton="tinte">
                                  Aktiviert
                                </Etikett>
                              ) : null}
                            </span>
                          </Ankreuzfeld>

                          {/* Cookie-Details: Basis-Akkordeon, höchstens eines offen (name-Gruppe) */}
                          {relatedCookies.length > 0 && (
                            <AkkordeonEintrag
                              name="k-cookie-details"
                              className="border-t border-k-fuge last:border-b-0"
                              titel={
                                <span className="text-k-2">
                                  {relatedCookies.length} Cookie(s) & Details einsehen
                                </span>
                              }
                            >
                              <ul className="flex flex-col border-t border-k-fuge">
                                {relatedCookies.map((cookie) => (
                                  <li key={cookie.name} className="flex flex-col gap-k-1 border-b border-k-fuge py-k-2">
                                    <span className="flex flex-wrap items-baseline justify-between gap-x-k-3">
                                      <code className="k-mono text-k-1 text-k-tinte">{cookie.name}</code>
                                      <span className="k-mono text-k-1 text-k-tinte-2">{cookie.duration}</span>
                                    </span>
                                    <span className="k-text text-k-1 text-k-tinte">{cookie.purpose}</span>
                                    <span className="k-mono text-k-1 text-k-tinte-2">Anbieter: {cookie.provider}</span>
                                  </li>
                                ))}
                              </ul>
                            </AkkordeonEintrag>
                          )}
                        </li>
                      );
                    },
                  )}
                </ul>

              </div>
              <div className={verbinde(FUSS, fest && LEISTE_KNOEPFE)}>
                {/* Knöpfe der Einstellungen: alle drei Wahlknöpfe gleichwertig */}
                <div className={KNOPFREIHE}>
                  <Knopf art="neben" breit className="col-span-2" onClick={() => mitFokus('zurueck', handleSaveSettings)}>
                    Auswahl speichern
                  </Knopf>
                  <Knopf art="neben" breit onClick={() => mitFokus('zurueck', handleAcceptAll)}>
                    Alle akzeptieren
                  </Knopf>
                  <Knopf art="neben" breit onClick={() => mitFokus('zurueck', handleDeclineAll)}>
                    Alle ablehnen
                  </Knopf>
                  <Knopf art="text" groesse="klein" breit className="col-span-2" onClick={() => mitFokus('ansicht', () => setShowSettings(false))}>
                    Zurück
                  </Knopf>
                </div>
              </div>
            </>
          )}
        </div>
      )}

    </>
  );
}

/** Banner mit Logik (F-11). Nur auf dem Client rendern – Einbindung über `BannerInsel` (next/dynamic, ssr:false). */
export default function Banner() {
  const einwilligung = useEinwilligungsBanner();
  return <BannerAnsicht {...einwilligung} />;
}
