'use client';

// Einwilligungsbanner der Kern-Schale (P3-08, KERN v1.2 K-011, E-013): Schriftfeld statt schwebender Karte.
// Logik ausschließlich über `useEinwilligungsBanner` (P3-00p, G9): Speicherung, Kategorien, Zeitpunkt, `#cookie-settings`
// und `openCookieSettings` liegen dort. Hier stehen nur Darstellung, Lage und Fokusführung.
// - Wortlaut (Rechtstext) wörtlich und in Bestandsreihenfolge aus `src/components/common/CookieConsent.tsx`.
// - „Alle akzeptieren“ und „Alle ablehnen“ gleich groß, gleich geformt, gleiche Farbstufe (beide Nebenknopf).
// - Rolle dialog, aria-modal="false": nicht blockierend, kein Fokuszwang, keine Wurfphysik.
// - Lage: mobil volle Breite direkt über der unteren Leiste samt Sicherheitsrand (`--k-leiste-platz`, P3-07, Rückfall 0), ab 768 px links unten
//   mit höchstens 28rem und Abstand `--k-rand`.
// - Nie das LCP-Element (Bauregel 8): kleiner gesetzt als jede Einstiegsüberschrift (Text k-1/k-2) und als Komposition
//   aus kurzen Satzblöcken (Satz bzw. Satzteil je Zeile) – jeder Block ist für die LCP-Messung ein eigenes, kleines
//   Textelement; der Wortlaut bleibt Zeichen für Zeichen gleich (textContent). Kein Zeitverzug hier.
// - Schild erst, wenn eine Wahl gespeichert ist (consent): kein 400-ms-Aufblitzen vor dem Banner beim Erstbesuch.
// - Fokus nie verdeckt (WCAG 2.4.11): Solange Banner oder Schild stehen, misst die Ansicht die belegte Höhe vom unteren Rand
//   (`--k-banner-unten` am <html>) und gibt dem Dokument genau so viel scroll-padding und Platz am Ende.
import { useEffect, useRef } from 'react';
import { useEinwilligungsBanner } from '@/lib/formulare/useEinwilligungsBanner';
import { CONSENT_CATEGORY_INFO, COOKIE_INVENTORY, type ConsentCategory } from '@/lib/cookie-inventory';
import { AkkordeonEintrag, Ankreuzfeld, Etikett, Knopf, Textlink, fokus, verbinde } from '@/components/kern/basis';
import Icon from '@/components/kern/icons/Icon';

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
  | 'handleShieldClick'
> & {
  /** fest = echte Lage am Bildschirmrand (Standard) · vorschau = im Fluss, für die Entwurfsseite */
  lage?: 'fest' | 'vorschau';
};

// Belegte Höhe vom unteren Rand (Banner bzw. Schild samt Leiste darunter); Tailwind liest die Klassen wörtlich aus dieser Datei.
const UNTEN = '--k-banner-unten';
const HTML_KLASSEN = ['scroll-pb-(--k-banner-unten)', 'pb-(--k-banner-unten)'] as const;

// Lage am Rand: mobil volle Breite über der Leiste; ab md links unten (≤ 28rem) über der Leiste; ab lg ohne Leiste.
const FEST_BANNER =
  'fixed inset-x-0 bottom-(--k-leiste-platz) z-50 md:right-auto md:left-(--k-rand) md:mb-(--k-rand) md:w-full md:max-w-md lg:bottom-(--k-rand) lg:mb-0';
const FEST_SCHILD =
  'fixed bottom-(--k-leiste-platz) left-(--k-rand) z-50 mb-k-3 md:mb-(--k-rand) lg:bottom-(--k-rand) lg:mb-0';

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
  handleShieldClick,
  lage = 'fest',
}: BannerAnsichtProps) {
  const fest = lage === 'fest';
  const dialogRef = useRef<HTMLDivElement>(null);
  const kopfRef = useRef<HTMLParagraphElement>(null);
  const schildRef = useRef<HTMLButtonElement>(null);
  // Fokusführung: Wechselt die Ansicht durch eine Handlung im Banner, verschwindet das fokussierte Element.
  // Dann rückt der Fokus auf den Feldkopf der neuen Ansicht bzw. nach der Wahl auf das Schild – nie beim ersten Erscheinen.
  const fokusNach = useRef<'ansicht' | 'schild' | null>(null);
  const mitFokus = (ziel: 'ansicht' | 'schild', handlung: () => void) => {
    fokusNach.current = ziel;
    handlung();
  };

  useEffect(() => {
    const ziel = fokusNach.current;
    if (!ziel) return;
    fokusNach.current = null;
    if (ziel === 'ansicht' && showBanner) kopfRef.current?.focus();
    if (ziel === 'schild' && !showBanner) schildRef.current?.focus();
  }, [showBanner, showSettings]);

  // Fokus nie verdeckt: belegte Höhe messen, solange die feste Ebene steht (Banner oder Schild).
  useEffect(() => {
    if (!fest) return;
    const el = showBanner ? dialogRef.current : schildRef.current;
    if (!el) return;
    const root = document.documentElement;
    const messen = () => {
      const unten = Math.max(0, Math.ceil(window.innerHeight - el.getBoundingClientRect().top));
      root.style.setProperty(UNTEN, `${unten}px`);
    };
    messen();
    const beobachter = new ResizeObserver(messen);
    beobachter.observe(el);
    window.addEventListener('resize', messen);
    root.classList.add(...HTML_KLASSEN);
    return () => {
      beobachter.disconnect();
      window.removeEventListener('resize', messen);
      root.classList.remove(...HTML_KLASSEN);
      root.style.removeProperty(UNTEN);
    };
  }, [fest, showBanner, consent]);

  return (
    <>
      {showBanner && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="false"
          aria-label="Cookie-Einwilligungsbanner gemäß DSGVO und TTDSG"
          aria-describedby="cookie-consent-description"
          className={verbinde(
            'flex flex-col overflow-hidden border-t border-k-strich bg-k-kalk text-k-tinte md:border',
            fest ? FEST_BANNER : 'w-full max-w-md border',
            fest && (showSettings ? 'max-h-3/4' : 'max-h-1/2 lg:max-h-3/4'),
          )}
        >
          {!showSettings ? (
            /* ── Erste Ebene ── */
            <>
              {/* Schließen steht wie im Bestand vor der Überschrift (Text- und Fokusfolge); sichtbar rechts (flex-row-reverse) */}
              <div className="flex shrink-0 flex-row-reverse items-center justify-between gap-k-3 bg-k-tinte text-k-kalk">
                {/* Schließen = Nur Essentiell */}
                <button
                  type="button"
                  onClick={() => mitFokus('schild', handleClose)}
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

              <div className={MITTE}>
                <p id="cookie-consent-description" className="k-text flex flex-col text-k-1 text-k-tinte md:text-k-2">
                  <span className={SATZ}>Wir nutzen Cookies auf unserer Website.</span>{' '}
                  <span className={SATZ}>
                    Einige sind <strong className="font-semibold">technisch notwendig</strong> für den Betrieb,
                  </span>{' '}
                  <span className={SATZ}>während andere uns helfen, unser Online-Angebot zu verbessern</span>{' '}
                  <span className={SATZ}>und interaktive Karten bereitzustellen.</span>{' '}
                  <span className={SATZ}>Nicht-essentielle Cookies setzen wir nur mit Ihrer Einwilligung</span>{' '}
                  <span className={SATZ}>(§25 TTDSG, Art. 6 Abs. 1 lit. a DSGVO).</span>{' '}
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
              <div className={FUSS}>
                {/* Knöpfe: „Alle ablehnen“ gleichwertig zu „Alle akzeptieren“ (gleiche Art, Größe, Breite) */}
                <div className={KNOPFREIHE}>
                  <Knopf art="neben" breit onClick={() => mitFokus('schild', handleAcceptAll)}>
                    Alle akzeptieren
                  </Knopf>
                  <Knopf art="neben" breit onClick={() => mitFokus('schild', handleDeclineAll)}>
                    Alle ablehnen
                  </Knopf>
                  <Knopf art="text" groesse="klein" breit className="col-span-2" onClick={() => mitFokus('ansicht', handleOpenSettings)}>
                    Einstellungen
                  </Knopf>
                </div>
              </div>
            </>
          ) : (
            /* ── Einstellungen (granular) ── */
            <>
              <div className="shrink-0 bg-k-tinte text-k-kalk">
                <p ref={kopfRef} tabIndex={-1} className={verbinde('k-mono text-k-1 px-k-4 py-k-3', FOKUS_INNEN)}>
                  Cookie-Einstellungen individuell anpassen
                </p>
              </div>

              <div className={MITTE}>
                <p className="k-text flex flex-col text-k-1 text-k-tinte-2 md:text-k-2">
                  <span className={SATZ}>Bestimmen Sie selbst, welche Kategorien Sie zulassen möchten.</span>{' '}
                  <span className={SATZ}>Technisch notwendige Cookies sind für den reibungslosen Betrieb erforderlich</span>{' '}
                  <span className={SATZ}>und können nicht abgewählt werden (§25 Abs. 2 TTDSG).</span>
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
              <div className={FUSS}>
                {/* Knöpfe der Einstellungen: alle drei Wahlknöpfe gleichwertig */}
                <div className={KNOPFREIHE}>
                  <Knopf art="neben" breit className="col-span-2" onClick={() => mitFokus('schild', handleSaveSettings)}>
                    Auswahl speichern
                  </Knopf>
                  <Knopf art="neben" breit onClick={() => mitFokus('schild', handleAcceptAll)}>
                    Alle akzeptieren
                  </Knopf>
                  <Knopf art="neben" breit onClick={() => mitFokus('schild', handleDeclineAll)}>
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

      {/* Schild: Widerruf jederzeit möglich (Bestand: schwebendes Schild) – hier ein flacher Feldknopf */}
      {!showBanner && consent && (
        <button
          ref={schildRef}
          type="button"
          onClick={() => mitFokus('ansicht', handleShieldClick)}
          data-motion="zustand"
          className={verbinde(
            'flex w-fit min-h-k-7 cursor-pointer items-center gap-k-2 border border-k-strich bg-k-kalk px-k-3 k-mono text-k-1 text-k-tinte',
            'pointer-fine:hover:border-k-tinte pointer-fine:hover:bg-k-fliese active:border-k-tinte active:bg-k-fuge',
            fokus('hell'),
            fest && FEST_SCHILD,
          )}
          aria-label="Cookie-Einstellungen verwalten"
          title="Cookie-Einstellungen öffnen"
        >
          Cookie-Einstellungen
        </button>
      )}
    </>
  );
}

/** Banner mit Logik (F-11). Nur auf dem Client rendern – Einbindung über `BannerInsel` (next/dynamic, ssr:false). */
export default function Banner() {
  const einwilligung = useEinwilligungsBanner();
  return <BannerAnsicht {...einwilligung} />;
}
