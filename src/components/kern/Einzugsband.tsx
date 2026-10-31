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
  const gruppen = gruppiereNachZone(mitEntfernungAbSitz(CITIES, CITY_HUB_DATA));
  // Ortsmoment: offen alle Zonen bis einschließlich der Zone des Ortes (Folge nach Entfernung), die ferneren im Aufklapper
  const eigene = gruppen.findIndex((g) => g.orte.some((o) => o.slug === aktuell));
  const offen = weitere ? gruppen.slice(0, eigene === -1 ? 1 : eigene + 1) : gruppen;
  const rest = gruppen.filter((g) => !offen.includes(g));
  const listenKlassen = clsx('grid grid-cols-1 border-l-2', stapel ? 'border-tinte' : 'border-laser @2xl:grid-cols-10');
  const zonen = (liste: typeof gruppen) =>
    liste.map(({ zone, orte }) => (
      <li key={zone.id} className={clsx('einzugsband-zone relative border-b border-r border-fuge bg-fliese', !stapel && BREITE[zone.id])}>
        {/* Kante der Zone: zieht sich im Fenster von links auf, Zone für Zone (bewegung.css); der Text steht ab dem ersten
            Bild (E3-SICHT-2-ERZ Befund 18 – vorher deckte eine Fläche die Orte bis zu 1,2 s ab) */}
        <span className="einzugsband-kante absolute inset-x-0 top-0 h-px bg-tinte" aria-hidden="true" />
        <div className={kompakt ? 'px-3 pt-1 pb-px' : 'p-4 lg:p-6'}>
          <p className={etikettKlassen}>
            <span className="text-tinte">{zone.etikett}</span>
          </p>
          <ul className={clsx('flex flex-col', !kompakt && 'mt-4', stapel && 'sm:grid sm:grid-cols-2 sm:gap-x-6')}>
            {orte.map((o) => {
              const ist = o.slug === aktuell;
              const inhalt = (
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
                <li key={o.slug} className={clsx(!kompakt && 'border-t border-fuge first:border-t-0', stapel && !kompakt && 'sm:nth-2:border-t-0')}>
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
                        ist ? 'flex-nowrap items-baseline' : 'flex-wrap items-center',
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
