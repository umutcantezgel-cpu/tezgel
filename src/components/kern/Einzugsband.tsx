// Einzugsband (KERN K-007 einzugsband): das Einzugsgebiet als Fugenband in drei Zonen (≤ 10 / ≤ 25 / ≤ 50 km,
// Breiten 3 : 3 : 4 ab 42 rem Breite des Platzes (K-007: 2 : 3 : 5 – dort wurden Ortsnamen der Zone ≤ 10 km gekürzt,
// E3-NACH-05; nach der Breite des Platzes statt des Bildschirms, damit bei großer Systemschrift die Zonen untereinander
// stehen und Ortsnamen nicht mitten im Wort brechen, Tor E3),
// am linken Rand das rote Lot des Firmensitzes Aßlar; Entfernungen ab Aßlar (E3-ORCH-03). Je Zone die Orte – als Linkliste die
// Hauptform; das Band ordnet nur (kein Maßstab: die Entfernungen der Konfiguration sind gerundete Angaben).
// `kompakt`: ruhige Vorschau ohne Links und ohne Bewegung (z. B. im Kartenplatzhalter vor der Einwilligung).
// Sonst legt sich das Band Zone für Zone frei, sobald es zu 40 % im Fenster steht (Sichtbarkeit über das Bewegungsmodul,
// UM-E4-SICHT-FIX M-C6 Nr. 2, E-104 Nr. 9; vorher beim Laden, E4-NACH-02); reduziert, ruhig, ohne JavaScript, im Druck, bei
// Zurück und Vor und nach dem Notaus steht es fertig.
// Ortsmoment (Ortsseiten, in der Lage; M-C6 Nr. 2): Mit `weitere` stehen offen die Zonen von ≤ 10 km bis zur Zone des Ortes
// mit „Sie sind hier“, lückenlos nach Entfernung (Nacharbeit SF-C1: offen „≤ 10 km“ und „≤ 50 km“, „≤ 25 km“ verborgen brach
// bei 6 von 13 Orten die Folge); nur die ferneren Zonen gibt das Band als eigene Liste an `weitere`, das sie in einen
// Aufklapper legt („Weitere Orte bis 50 km“, vorlagen/teile/Aufklapper; der Inhalt bleibt im DOM). Liegt der Ort in der
// fernsten Zone, stehen alle offen und der Aufklapper entfällt. Im Aufklapper ziehen sich die Kanten nicht auf.
// „Sie sind hier“ steht ab lg in eigener Zeile unter dem Ortsnamen (vorher brach die Zeile bei t1024); die Entfernung bleibt
// auf jeder Breite in der ersten Zeile neben dem Namen (Grundlinie), auch bei langen Namen wie „Limburg an der Lahn“.
// Ortsmaß (nur mit `aktuell`, nicht kompakt, Form band; UM-E4-SICHT-FIX-2 M2-B7, Sicht Anlauf 2: „nichts ortseigen,
// Abstandstabelle im 600-px-Kasten, rechts leer“): Das Band steht breit (Lage `zusatzBreit`). Ab 42 rem Breite stehen die
// offenen Zonen nebeneinander und füllen die Zeile (drei im Verhältnis 3 : 3 : 4, zwei zu gleichen Teilen, eine allein über die
// volle Breite; ebenso die Zonen im Aufklapper), die Orte einer Zone ab 36 rem Zonenbreite in zwei, ab 56 rem in vier Spalten.
// Vom Lot des Firmensitzes läuft entlang der oberen Fuge eine rote Laserlinie (2 px) bis zum Ort: Die Kante jeder Zone vor der
// Zone des Ortes ist ganz rot, in der eigenen Zone reicht das Rot bis zum Ende der Spalte des Ortes, dahinter läuft die Kante in
// Tinte weiter (K-003 Nr. 5: Rot markiert den aktuellen Ort; Nacharbeit SF2-B, Prüfung Wirkung: bis zum Ende der Zone war die Linie
// auf jeder Ortsseite gleich lang, ein roter Kastenrand). Die Orte einer Zone stehen nach Entfernung, die Spalte ist also ihr Rang
// in der Zone: Wetzlar endet ab vier Spalten nach der zweiten von vier, Braunfels über der ganzen Zone; in einer Spalte (schmale
// Zone, mobil) reicht das Rot bis zum Ende der Spalte. Das Rot zieht mit dem vorhandenen Auftritt einzugsband auf (eine Kante je
// Zone); im Aufklapper (Zonen hinter dem Ort) bleibt die Kante in Tinte. Das Lot selbst bleibt in der Lage in Tinte wie bisher
// (ein Rot je Bildschirm neben dem Leitfaden, E3-SICHT-ERZ Befund 26; breit steht es 16 px neben der Leitachse). Am eigenen Ort
// steht die Entfernung als Kennzahl in Mono fs-5 (K-006), darunter „Sie sind hier“. Das Band ordnet weiter nur: Die Linie zeigt
// Zone und Rang, keinen Maßstab in Kilometern. Keine neuen Daten, kein neuer Text, keine neue Bewegung; die Formen kompakt und
// stapel bleiben unverändert.
// Serverkomponente.
import type { ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Fugenkreuz from './Fugenkreuz';
import { etikettKlassen } from './stile';
import { CITIES } from '@/config/cities';
import { CITY_HUB_DATA } from '@/lib/maps/getMapEmbedUrl';
import { gruppiereNachZone, mitEntfernungAbSitz } from '@/lib/einzugszonen';

const BREITE: Record<string, string> = { nah: '@2xl:col-span-3', mittel: '@2xl:col-span-3', weit: '@2xl:col-span-4' };
/** Ortsmaß: weniger als drei Zonen in einer Zeile füllen sie (zwei zu gleichen Teilen, eine allein) */
const FUELLEN: Record<number, string> = { 1: '@2xl:col-span-10', 2: '@2xl:col-span-5' };
/** Ortsmaß: das Rot der eigenen Zone reicht bis zum Ende der Spalte des Ortes (Spalten wie die Ortsliste: eine, ab @xl zwei,
 *  ab @4xl vier; Index ist die Stelle des Ortes in der Zone) */
const BIS_SPALTE_ZWEI = ['@xl:col-span-1', '@xl:col-span-2'];
const BIS_SPALTE_VIER = ['@4xl:col-span-1', '@4xl:col-span-2', '@4xl:col-span-3', '@4xl:col-span-4'];

// Entfernung ab dem Firmensitz (wie die Ortsliste der Karte): der Sitz selbst heißt „Firmensitz“ (Bestandswortlaut)
const entfernung = (km: number) => (km === 0 ? 'Firmensitz' : `ca. ${km} km`);

export interface EinzugsbandProps {
  /** Slug der aktuellen Stadtseite: der Ort bekommt das Fugenkreuz und aria-current */
  aktuell?: string;
  kompakt?: boolean;
  /** stapel: Zonen untereinander, auch ab md (schmale Randspalte, Planblatt des Einstiegs; E4-NACH-01) */
  form?: 'band' | 'stapel';
  /** Ortsmoment: legt die Zonen hinter der Zone von `aktuell` in einen Aufklapper (übergibt die Liste) */
  weitere?: (zonen: ReactNode) => ReactNode;
  className?: string;
}

export default function Einzugsband({ aktuell, kompakt = false, form = 'band', weitere, className }: EinzugsbandProps) {
  const stapel = form === 'stapel';
  // Ortsmaß am eigenen Ort (M2-B7): nur mit aktuell, nicht kompakt, Form band
  const ortsmass = Boolean(aktuell) && !kompakt && !stapel;
  const gruppen = gruppiereNachZone(mitEntfernungAbSitz(CITIES, CITY_HUB_DATA));
  // Ortsmoment: offen alle Zonen bis einschließlich der Zone des Ortes (Folge nach Entfernung), die ferneren im Aufklapper
  const eigene = gruppen.findIndex((g) => g.orte.some((o) => o.slug === aktuell));
  const offen = weitere ? gruppen.slice(0, eigene === -1 ? 1 : eigene + 1) : gruppen;
  const rest = gruppen.filter((g) => !offen.includes(g));
  const listenKlassen = clsx('grid grid-cols-1 border-l-2', stapel || ortsmass ? 'border-tinte' : 'border-laser', !stapel && '@2xl:grid-cols-10');
  // Ortsmaß: rote Kante über die Zonen vor der Zone des Ortes, in ihr bis zur Spalte des Ortes
  const vorDemOrt = (i: number) => ortsmass && eigene !== -1 && i < eigene;
  const platz = eigene === -1 ? -1 : gruppen[eigene].orte.findIndex((o) => o.slug === aktuell);
  const zonen = (liste: typeof gruppen) =>
    liste.map(({ zone, orte }) => (
      <li
        key={zone.id}
        className={clsx(
          'einzugsband-zone relative border-b border-r border-fuge bg-fliese',
          !stapel && (ortsmass ? (FUELLEN[liste.length] ?? BREITE[zone.id]) : BREITE[zone.id]),
          ortsmass && '@container',
        )}
      >
        {/* Kante der Zone: zieht sich im Fenster von links auf, Zone für Zone (bewegung.css); der Text steht ab dem ersten
            Bild (E3-SICHT-2-ERZ Befund 18 – vorher deckte eine Fläche die Orte bis zu 1,2 s ab). Ortsmaß: vor der Zone des Ortes
            als rote Laserlinie (2 px), sie reicht über die Fuge rechts bis an die nächste Zone; in der Zone des Ortes liegt über
            der Kante in Tinte ein Raster wie die Ortsliste (gleicher Innenabstand, gleiche Spalten und Fugen), darin reicht das
            Rot von der linken Kante der Zone bis zum Ende der Spalte des Ortes (in einer Spalte, also schmal und mobil, bis an
            die rechte Kante der Zone wie die Kanten davor) */}
        {ortsmass && zone.id === gruppen[eigene]?.zone.id && platz !== -1 ? (
          <span className="einzugsband-kante absolute inset-x-0 top-0 grid border-t border-tinte px-4 lg:px-6 @xl:grid-cols-2 @xl:gap-x-6 @4xl:grid-cols-4" aria-hidden="true">
            <span className={clsx('-mx-4 -mt-px border-t-2 border-laser lg:-mx-6 @xl:mr-0', BIS_SPALTE_ZWEI[platz % 2], BIS_SPALTE_VIER[platz % 4])} />
          </span>
        ) : (
          <span
            className={clsx('einzugsband-kante absolute inset-x-0 top-0', vorDemOrt(gruppen.findIndex((g) => g.zone.id === zone.id)) ? '-right-px border-t-2 border-laser' : 'h-px bg-tinte')}
            aria-hidden="true"
          />
        )}
        <div className={kompakt ? 'px-3 pt-1 pb-px' : 'p-4 lg:p-6'}>
          <p className={etikettKlassen}>
            <span className="text-tinte">{zone.etikett}</span>
          </p>
          <ul className={clsx('flex flex-col', !kompakt && 'mt-4', stapel && 'sm:grid sm:grid-cols-2 sm:gap-x-6', ortsmass && '@xl:grid @xl:grid-cols-2 @xl:gap-x-6 @4xl:grid-cols-4')}>
            {orte.map((o) => {
              const ist = o.slug === aktuell;
              // Ortsmaß am eigenen Ort: Name, Entfernung als Kennzahl (am Firmensitz das Wort in seiner Größe), „Sie sind hier“
              const kennzahl = ist && ortsmass;
              const inhalt = kennzahl ? (
                <>
                  <span className="flex min-w-0 flex-wrap items-center gap-x-2">
                    {o.distanceKm === 0 && <Fugenkreuz className="size-3 text-laser" />}
                    <span className="min-w-0 wrap-break-word font-semibold">{o.name}</span>
                  </span>
                  <span className={clsx('font-mono whitespace-nowrap', o.distanceKm === 0 ? 'text-fs-1 text-tinte-2' : 'text-fs-5 text-tinte')}>{entfernung(o.distanceKm)}</span>
                  {/* eine Stufe Luft unter der Kennzahl: ihr Zeilenkasten reicht sonst 1 bis 2 px in die Zeile darunter */}
                  <span className="mt-1 font-mono text-fs-1 text-tinte-2">Sie sind hier</span>
                </>
              ) : (
                <>
                  {/* Das Fugenkreuz heißt nur „Firmensitz“ (wie in der Kopfzeile); die aktuelle Stadt steht fett mit „Sie sind
                      hier“. Die übrigen Orte sind als Links unterstrichen, auch ohne Maus (Browserprüfung E4-W1, Runde 2) */}
                  <span className="flex min-w-0 flex-wrap items-center gap-x-2">
                    {o.distanceKm === 0 && <Fugenkreuz className="size-3 text-laser" />}
                    <span
                      className={clsx(
                        'min-w-0 wrap-break-word',
                        ist ? 'font-semibold' : !kompakt && 'underline decoration-fuge decoration-1 underline-offset-4 group-hover:decoration-tinte',
                      )}
                    >
                      {o.name}
                    </span>
                    {ist && !kompakt && <span className="font-mono text-fs-1 text-tinte-2 lg:basis-full">Sie sind hier</span>}
                  </span>
                  <span className="ml-auto shrink-0 font-mono text-fs-1 text-tinte-2 @max-3xs:ml-0">{entfernung(o.distanceKm)}</span>
                </>
              );
              // bei großer Schrift steht die Entfernung in jeder Zeile unter dem Ort, nicht je nach Namenslänge mal daneben
              // (wie in der Ortsliste der Einsatzkarte, Browserprüfung E4-W1, Runde 3)
              return (
                <li
                  key={o.slug}
                  className={clsx(
                    !kompakt && 'border-t border-fuge first:border-t-0',
                    stapel && !kompakt && 'sm:nth-2:border-t-0',
                    // Ortsmaß in Spalten: die erste Reihe ohne Fuge oben (zwei bzw. vier Orte)
                    ortsmass && '@xl:nth-2:border-t-0 @4xl:nth-3:border-t-0 @4xl:nth-4:border-t-0',
                  )}
                >
                  {kompakt ? (
                    <span className="flex flex-wrap items-center justify-between gap-x-3 font-text text-fs-1 text-tinte @max-3xs:flex-col @max-3xs:items-start">{inhalt}</span>
                  ) : (
                    <Link
                      href={`/standorte/${o.slug}`}
                      aria-current={ist ? 'page' : undefined}
                      // eigener Ort: Name und „Sie sind hier“ brechen in ihrer Spalte um, die Entfernung bleibt rechts in der
                      // ersten Zeile (vorher eigene dritte Zeile bei langen Namen)
                      className={clsx(
                        'group flex min-h-11 justify-between gap-x-3 py-2 font-text text-fs-2 text-tinte @max-3xs:flex-col @max-3xs:items-start',
                        kennzahl ? 'flex-col items-start' : ist ? 'flex-nowrap items-baseline' : 'flex-wrap items-center',
                      )}
                    >
                      {inhalt}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </li>
    ));
  return (
    <div className={clsx('einzugsband relative @container', className)} data-motion={kompakt ? undefined : 'einzugsband'}>
      <p className={clsx(etikettKlassen, kompakt ? 'mb-1' : 'mb-4')}>
        <Fugenkreuz className="size-3 text-laser" />
        <span className="text-tinte">Firmensitz Aßlar</span>
      </p>
      {/* Lot des Firmensitzes: rot nur, wo es der einzige rote Blickfang ist; im Planblatt neben der Laserachse des
          Einstiegs und in der Lage neben dem Leitfaden in Tinte (ein Rot je Bildschirm, E3-SICHT-ERZ Befund 26) – die
          Firmensitz-Marke bleibt rot */}
      <ol className={listenKlassen}>{zonen(offen)}</ol>
      {weitere && rest.length > 0 && weitere(<ol className={listenKlassen}>{zonen(rest)}</ol>)}
    </div>
  );
}
