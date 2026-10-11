// Einstieg der Fachseite (P4-01, KERN v1.2 K-001, K-007, K-011 Erzählseite): ein Planblatt mit ruhender Achse.
// H1 links bündig, nie zentriert mit zwei Knöpfen vor abstraktem Hintergrund. Kein Signaturmoment (K-009: SIG-1 nur `/`,
// SIG-2 nur `/bad`, SIG-3 nur Leistungen) – die Achse steht still, ohne `data-motion`, ohne Startzustand.
//
// Raster ab lg (12 Spalten ohne Zwischenraum), drei Zeilen:
//   1  Kennzeile (Etikett, Sp. 1–7) | Fuge läuft bis zum Rand weiter (Sp. 8–12)
//   2  H1 mit Unterzeile (Sp. 1–7, unten bündig) | Motiv (Sp. 9–12, unten bündig) – Platz für den ruhenden Verlegeplan
//      (SIG-3 ruhend, P4-03 liefert die Pläne; Prop `motiv`)
//   3  Vorspann, Knöpfe, Nachsatz (Sp. 1–7) | Schriftfeld (Sp. 9–12, Prop `schriftfeld`)
// Die Achse ist eine Waage in Laser (2 px) am Anfang von Zeile 3 über alle 12 Spalten: Die H1 steht auf ihr, kein Text wird
// geschnitten. Wo Motiv oder Schriftfeld stehen, setzt ein Fugenkreuz in Laser den Kreuzpunkt auf die Spaltengrenze 8 | 9.
// Unter lg (eigenes Blatt, K-003 Nr. 7): eine Spalte – Kennzeile, H1, Vorspann, Knöpfe (Hauptknopf zuerst), Nachsatz,
// Motiv verkleinert, Schriftfeld; Achse nur als Lot am linken Rand (`--k-rand` − 1 px), Text 16 px eingerückt.
// Rot: nur die Achse (K-003 Nr. 2, ein roter Blickfang im ersten Bildschirm). H1 und Vorspann stehen ab dem ersten Bild (LCP).
// `data-hauptaktion`: der WhatsApp-Kanal weicht dem Einstieg aus (Lehre 9). Wortlaut kommt vollständig von der Seite.
import { useId, type ReactNode } from 'react';
import { Etikett, Fugenkreuz, verbinde } from '@/components/kern/basis';
import Knopfreihe from '@/components/kern/vorlagen/fachseite/Knopfreihe';
import { UMBRUCH, istText, type KnopfAngabe } from '@/components/kern/vorlagen/fachseite/typen';

export type EinstiegProps = {
  /** ID der H1 aus dem Bestand (z. B. „badsanierung-heading“) */
  titelId?: string;
  /** Eyebrow des Bestands als Kennzeile (Etikett, Wortlaut gleich; Trenner „·“ als `<span aria-hidden>`) */
  etikett?: ReactNode;
  /** erster Teil der H1 */
  titel: ReactNode;
  /** zweiter Teil der H1 (im Bestand die Verlaufsschrift oder nach `<br />`) – eigene Zeile, ungestaucht */
  unterzeile?: ReactNode;
  /** Absatz unter der H1 */
  vorspann?: ReactNode;
  /** Knöpfe in Bestandsreihenfolge; der erste ist Hauptknopf, wenn er keine `art` trägt */
  knoepfe?: readonly KnopfAngabe[];
  /** kleiner Satz unter den Knöpfen (Bestand z. B. Innentreppe: Voraussetzung mit Verweis) */
  nachsatz?: ReactNode;
  /** ruhender Verlegeplan (P4-03, Prop `ruhend`) oder Vignette; dekorativ, falls er keine Bedeutung trägt */
  motiv?: ReactNode;
  /** Schriftfeld (Komponente `Schriftfeld`) */
  schriftfeld?: ReactNode;
};

export default function Einstieg({ titelId, etikett, titel, unterzeile, vorspann, knoepfe = [], nachsatz, motiv, schriftfeld }: EinstiegProps) {
  const eigeneId = `k-einstieg${useId()}`;
  const tid = titelId ?? eigeneId;
  const seite = Boolean(motiv || schriftfeld);

  return (
    <section aria-labelledby={tid} data-hauptaktion="" className="relative pt-k-6 pb-k-9 lg:pt-k-7">
      <div className="mx-auto max-w-(--k-seite) px-(--k-rand)">
        <div className="relative grid grid-cols-1 pl-k-4 lg:grid-cols-12 lg:pl-0">
          {/* Zeile 1 · Kennzeile; die Fuge darunter läuft über die volle Breite */}
          {etikett ? (
            <Etikett als="p" kreuz ton="tinte" className="lg:col-span-7 lg:row-start-1 lg:w-auto lg:border-b lg:border-k-fuge lg:pr-k-6 lg:pb-k-3">
              {etikett}
            </Etikett>
          ) : null}
          <div aria-hidden="true" className="hidden lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:block lg:border-b lg:border-k-fuge" />

          {/* Zeile 2 links · H1 auf der Waage */}
          <h1
            id={tid}
            className={verbinde(
              'k-anzeige text-k-7 text-k-tinte lg:col-span-7 lg:row-start-2 lg:self-end lg:pr-k-6 lg:pb-k-5',
              etikett ? 'mt-k-5 lg:mt-k-7' : undefined,
              UMBRUCH,
            )}
          >
            <span className="block">{titel}</span>
            {unterzeile ? (
              <>
                {' '}
                <span className="mt-k-3 block k-text text-k-5 font-semibold tracking-normal text-k-tinte-2">{unterzeile}</span>
              </>
            ) : null}
          </h1>

          {/* Zeile 3 links · Vorspann, Knöpfe, Nachsatz */}
          <div className="mt-k-5 min-w-0 lg:col-span-7 lg:row-start-3 lg:mt-0 lg:pt-k-6 lg:pr-k-6">
            {vorspann ? (
              <div className="flex max-w-(--k-mass) flex-col gap-k-4 k-text text-k-4 text-k-tinte">
                {istText(vorspann) ? <p>{vorspann}</p> : vorspann}
              </div>
            ) : null}
            <Knopfreihe knoepfe={knoepfe} className="mt-k-6" />
            {nachsatz ? (
              <div className="mt-k-5 max-w-(--k-mass) k-text text-k-2 text-k-tinte-2">{istText(nachsatz) ? <p>{nachsatz}</p> : nachsatz}</div>
            ) : null}
          </div>

          {/* Zeile 2 rechts · Motiv (mobil nach dem Text, verkleinert) */}
          {motiv ? (
            <div className="mt-k-7 w-3/4 min-w-0 text-k-tinte md:w-1/2 lg:col-span-4 lg:col-start-9 lg:row-start-2 lg:mt-k-7 lg:w-auto lg:self-end lg:pb-k-5">
              {motiv}
            </div>
          ) : null}

          {/* Zeile 3 rechts · Schriftfeld, Oberkante auf der Waage */}
          {schriftfeld ? (
            <div className="mt-k-7 min-w-0 lg:col-span-4 lg:col-start-9 lg:row-start-3 lg:mt-0 lg:pt-k-6">{schriftfeld}</div>
          ) : null}

          {/* Waage (ab lg): ruhende Achse am Anfang von Zeile 3 über alle Spalten */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-(--k-linie-2) -translate-y-1/2 bg-k-laser lg:col-span-full lg:row-start-3 lg:block"
          />
          {/* Kreuzpunkt auf der Spaltengrenze 8 | 9, nur wenn rechts etwas an der Achse fluchtet */}
          {seite ? (
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-0 hidden -translate-x-1/2 -translate-y-1/2 text-k-laser lg:col-start-9 lg:row-start-3 lg:flex"
            >
              <Fugenkreuz className="size-k-4" />
            </span>
          ) : null}
        </div>
      </div>

      {/* Lot unter lg: am linken Rand (rechte Kante bei --k-rand), über die volle Höhe des Einstiegs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-(--k-rand) w-(--k-linie-2) -translate-x-full bg-k-laser lg:hidden" />
    </section>
  );
}
