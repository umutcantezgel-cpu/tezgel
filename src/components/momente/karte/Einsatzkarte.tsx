// Großer Moment `karte` (KERN v3.4 K-007, K-008, K-012; E3-GRAF-09): gezeichnete Einsatzkarte, Aßlar in der Mitte, Ringe bei
// 10 und 25 km, die Orte aus CITIES in ihrer Himmelsrichtung, Abstand nach der Entfernung ab Aßlar (geometrie.ts, kein
// Kartenmaßstab). Zeichnung statt Foto, keine Kartenkacheln, keine Anfrage an fremde Server, kein Skript. Daneben die Orte als
// Liste mit Link und Entfernung: Sie trägt den Inhalt der Zeichnung als Text (Aufgabe A6) und bleibt bei großer Schrift lesbar.
// Bewegung (bewegung.css, Block „karte“): beim Eintritt (Sicht 0,4) legen sich die Ringe von innen nach außen an ihren Platz, die
// Punkte jeder Zone erscheinen mit ihrem Ring. Aßlar, Achsen, Raster und alle Beschriftungen stehen ab dem ersten Bild;
// reduziert, ohne JavaScript und im Druck steht die Karte fertig. Beschriftungen in HTML (wachsen mit der Systemschrift), Lage
// über --x und --y (Klasse karte-marke, globals.css); unter 16rem Flächenbreite (große Schrift) bleiben nur Aßlar und die
// Zeichnung, Namen und Ringmaße entfallen (sie verdeckten dort Punkte). Die Legende unter der Zeichnung erklärt Firmensitz,
// Punkte und Ringe mit eigenen Zeichen, auch ohne Ortsliste (/kontakt, Browserprüfung E4-W0, E-065). Serverkomponente.
import type { CSSProperties } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import WeiterLink from '@/components/kern/WeiterLink';
import { linkKlassen } from '@/components/kern/stile';
import { zusammen } from '@/components/kern/zusammen';
import { Linie, Planrahmen, Punkt } from '@/components/kern/vignetten/zeichnen';
import { CITIES } from '@/config/cities';
import { CITY_COORDINATES, CITY_HUB_DATA, TEZGEL_HQ_COORDS } from '@/lib/maps/getMapEmbedUrl';
import { gruppiereNachZone, mitEntfernungAbSitz, type Zone } from '@/lib/einzugszonen';
import { HALB, LAGE, RINGE_KM, fugenraster, kartenorte, prozent, radius, type Lage } from './geometrie';

const ORTE = mitEntfernungAbSitz(CITIES, CITY_HUB_DATA);
const PUNKTE = kartenorte(ORTE, CITY_COORDINATES, TEZGEL_HQ_COORDS);
const GRUPPEN = gruppiereNachZone(ORTE);
const RASTER = fugenraster();
const ACHSEN = `M${-HALB} 0H${HALB}M0 ${-HALB}V${HALB}`;
const ASSLAR = 'M-1.25 -7.5h2.5v6.25h6.25v2.5h-6.25v6.25h-2.5v-6.25h-6.25v-2.5h6.25z';
const ZONEN: readonly Zone['id'][] = ['nah', 'mittel', 'weit'];
const RING_ZONE: readonly Zone['id'][] = ['nah', 'mittel'];
const GRUPPE_NAME: Record<Zone['id'], string> = { nah: 'Bis 10 km ab Aßlar', mittel: 'Bis 25 km ab Aßlar', weit: 'Mehr als 25 km ab Aßlar' };
const STANDARD_BESCHRIFTET: readonly string[] = ['wetzlar', 'giessen', 'herborn'];
const LAGE_KLASSEN: Record<Lage, string> = {
  oben: '-translate-x-1/2 -translate-y-full pb-4 text-center',
  unten: '-translate-x-1/2 pt-4 text-center',
  links: '-translate-x-full -translate-y-1/2 pr-4 text-right',
  rechts: '-translate-y-1/2 pl-4 text-left',
};
const BILDNAME = 'Gezeichnete Karte des Einsatzgebiets. Aßlar liegt in der Mitte. Zwei Ringe zeigen 10 und 25 Kilometer Entfernung.';

const entfernung = (km: number) => (km === 0 ? 'Firmensitz' : `ca. ${km} km`);
const lage = (x: number, y: number) => ({ '--x': prozent(x), '--y': prozent(y) }) as CSSProperties;

export interface EinsatzkarteProps {
  /** Satz zur Karte, wörtlich aus dem Seitentext (figcaption) */
  unterschrift?: string;
  /** Orte mit Namen in der Zeichnung (Slugs aus CITIES); Standard: Wetzlar, Gießen, Herborn (ohne `aktuell`) */
  beschriftet?: readonly string[];
  /** Ort der aktuellen Stadtseite: Punkt gefüllt und beschriftet, in der Liste mit Fugenkreuz und aria-current */
  aktuell?: string;
  /** Liste der Orte unter der Zeichnung (Standard: an; K-016: nicht daneben) */
  liste?: boolean;
  /** Weg unter der Liste, z. B. „Alle Orte ansehen“ nach /standorte */
  verweis?: { name: string; href: string };
  className?: string;
}

/** Legende mit je eigenem Zeichen: das Ringzeichen (zwei Kreise) ist ein anderes als die Ortspunkte, sonst hielt man die
 *  kleinen leeren Kreise der Zeichnung für die „Ringe“ (Browserprüfung E4-W0, E-065) */
function Legende() {
  return (
    <ul className="flex flex-col gap-2 font-text text-fs-2 text-tinte">
      <li className="flex items-center gap-3">
        <Fugenkreuz className="size-4 shrink-0 text-laser" />
        <span>Firmensitz Aßlar</span>
      </li>
      <li className="flex items-center gap-3">
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" className="size-4 shrink-0 text-tinte" stroke="currentColor" strokeWidth="1.5">
          <circle cx="4.5" cy="8" r="3" className="fill-current" vectorEffect="non-scaling-stroke" />
          <circle cx="12" cy="8" r="2.5" className="fill-fliese" vectorEffect="non-scaling-stroke" />
        </svg>
        <span>Jeder Punkt ist ein Ort, in dem wir arbeiten.</span>
      </li>
      <li className="flex items-center gap-3">
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" className="size-4 shrink-0 text-tinte-2" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="8" r="7" vectorEffect="non-scaling-stroke" />
          <circle cx="8" cy="8" r="3.5" vectorEffect="non-scaling-stroke" />
        </svg>
        <span>Die Ringe zeigen 10 und 25 km ab Aßlar.</span>
      </li>
    </ul>
  );
}

export default function Einsatzkarte({ unterschrift, beschriftet, aktuell, liste = true, verweis, className }: EinsatzkarteProps) {
  const namen = new Set<string>([...(beschriftet ?? (aktuell ? [] : STANDARD_BESCHRIFTET)), ...(aktuell ? [aktuell] : [])]);
  const zeichnung = (
    <div role="img" aria-label={BILDNAME} data-motion="karte" className="@container relative aspect-square w-full overflow-hidden max-md:max-w-md">
      <Planrahmen viewBox={`${-HALB} ${-HALB} ${2 * HALB} ${2 * HALB}`} fuellen className="absolute inset-0">
        <g className="text-fuge">
          <Linie d={RASTER} />
        </g>
        <g className="text-strich">
          <Linie d={ACHSEN} />
        </g>
        <g className="text-tinte-2">
          {RINGE_KM.map((km, i) => (
            <Punkt key={km} className="karte-ring" data-zone={RING_ZONE[i]} cx={0} cy={0} r={radius(km)} />
          ))}
        </g>
        <g className="text-tinte">
          {ZONEN.map((zone) => (
            <g key={zone} className="karte-orte" data-zone={zone}>
              {PUNKTE.filter((p) => p.zone === zone && p.km > 0).map((p) => (
                <Punkt key={p.slug} cx={p.x} cy={p.y} r={namen.has(p.slug) ? 5 : 3.5} className={namen.has(p.slug) ? 'fill-current' : 'fill-fliese'} />
              ))}
            </g>
          ))}
        </g>
        {/* Firmensitz: Fugenkreuz im Kreuzpunkt der Achsen, das einzige Rot der Zeichnung */}
        <path d={ASSLAR} stroke="none" className="fill-current text-laser" />
      </Planrahmen>
      {/* bei großer Schrift ohne Namen: er lag dort auf dem inneren Ring; die Legende nennt den Firmensitz (Browserprüfung E4-W1, Runde 2) */}
      <span aria-hidden="true" className="karte-marke -translate-x-1/2 -translate-y-full pb-4 text-center lg:pb-6 @max-3xs:hidden" style={lage(0, 0)}>
        <span className="block bg-fliese px-1 font-text text-fs-2 font-semibold whitespace-nowrap text-tinte">Aßlar</span>
      </span>
      {RINGE_KM.map((km) => (
        <span key={km} aria-hidden="true" className="karte-marke -translate-1/2 @max-3xs:hidden" style={lage(0, radius(km))}>
          <span className="block bg-fliese px-1 font-mono text-fs-1 whitespace-nowrap text-tinte-2">{`${km} km`}</span>
        </span>
      ))}
      {PUNKTE.filter((p) => p.km > 0 && namen.has(p.slug)).map((p) => (
        <span key={p.slug} aria-hidden="true" className={clsx('karte-marke @max-3xs:hidden', LAGE_KLASSEN[LAGE[p.slug] ?? 'oben'])} style={lage(p.x, p.y)}>
          <span className="block bg-fliese px-1 whitespace-nowrap">
            <span className="block font-text text-fs-2 font-semibold text-tinte">{p.name}</span>
            <span className="block font-mono text-fs-1 text-tinte-2">{entfernung(p.km)}</span>
          </span>
        </span>
      ))}
    </div>
  );
  return (
    <figure className={clsx('border border-fuge bg-fliese', className)}>
      {unterschrift && <figcaption className="border-b border-fuge p-4 text-center font-text text-fs-4 text-pretty text-tinte lg:px-8 lg:py-6">{unterschrift}</figcaption>}
      {liste ? (
        // K-016 (Abnahme E3-BAU-08): Zeichnung mittig, die Liste der Orte darunter in einer schmalen Spalte statt daneben
        <div>
          <div className="border-b border-fuge">
            <div className="mx-auto w-full max-w-md lg:w-1/2 lg:max-w-full">{zeichnung}</div>
          </div>
          <div className="mx-auto flex max-w-mass flex-col gap-6 p-4 lg:p-8">
            <Legende />
            {GRUPPEN.filter((g) => g.orte.length > 0).map(({ zone, orte }) => (
              <div key={zone.id}>
                <h3 className="font-text text-fs-2 font-semibold text-tinte-2">{zusammen(GRUPPE_NAME[zone.id])}</h3>
                <ul className="mt-2 flex flex-col border-t border-fuge">
                  {orte.map((o) => {
                    const ist = o.slug === aktuell;
                    return (
                      <li key={o.slug} className="flex flex-wrap items-center justify-between gap-x-3 border-b border-fuge">
                        <Link
                          href={`/standorte/${o.slug}`}
                          aria-current={ist ? 'page' : undefined}
                          data-motion="zustand"
                          className={clsx(linkKlassen, 'flex min-h-11 flex-1 items-center gap-2 font-text text-fs-3 hyphens-none', ist && 'font-semibold')}
                        >
                          {ist && <Fugenkreuz className="size-3 text-tinte" />}
                          <span>{o.name}</span>
                        </Link>
                        <span className="shrink-0 font-mono text-fs-1 text-tinte-2">{zusammen(entfernung(o.distanceKm))}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
            <p className="font-text text-fs-2 text-tinte-2">Entfernungen sind ungefähre Angaben ab Aßlar.</p>
            {verweis && (
              <p>
                <WeiterLink href={verweis.href}>{verweis.name}</WeiterLink>
              </p>
            )}
          </div>
        </div>
      ) : (
        <div>
          <div className="border-b border-fuge">
            <div className="mx-auto w-full max-w-md lg:w-1/2 lg:max-w-full">{zeichnung}</div>
          </div>
          <div className="mx-auto max-w-mass p-4 lg:p-8">
            <Legende />
          </div>
        </div>
      )}
    </figure>
  );
}
