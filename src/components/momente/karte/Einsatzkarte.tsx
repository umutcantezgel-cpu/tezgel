// Großer Moment `karte` (KERN v3.4 K-007, K-008, K-012; E3-GRAF-09): gezeichnete Einsatzkarte, Aßlar in der Mitte, Ringe bei
// 10 und 25 km, die Orte aus CITIES in ihrer Himmelsrichtung, Abstand nach der Entfernung ab Aßlar (geometrie.ts, kein
// Kartenmaßstab). Zeichnung statt Foto, keine Kartenkacheln, keine Anfrage an fremde Server, kein Skript. Daneben die Orte als
// Liste mit Link und Entfernung: Sie trägt den Inhalt der Zeichnung als Text (Aufgabe A6) und bleibt bei großer Schrift lesbar.
// Bewegung (bewegung.css, Block „karte“): beim Eintritt (Sicht 0,4) legen sich die Ringe von innen nach außen an ihren Platz, die
// Punkte jeder Zone erscheinen mit ihrem Ring. Aßlar, Achsen, Raster und alle Beschriftungen stehen ab dem ersten Bild;
// reduziert, ohne JavaScript und im Druck steht die Karte fertig. Beschriftungen in HTML (wachsen mit der Systemschrift), Lage
// über --x und --y (Klasse karte-marke, globals.css); unter 16rem Flächenbreite (große Schrift) bleiben nur Aßlar und die
// Zeichnung, Namen, Führungslinien und Ringmaße entfallen (sie verdeckten dort Punkte). Die Legende unter der Zeichnung erklärt Firmensitz,
// Punkte und Ringe mit eigenen Zeichen, auch ohne Ortsliste (/kontakt, Browserprüfung E4-W0, E-065). Im Leitfaden einer
// Erzählseite (/ueber-uns) tritt der Kopf der Leitachse neben der ganzen Karte zurück (data-kopf-pause="ganz", bewegung.css
// „Leitfaden mit Abschnittsmarke“): Er stand sonst neben den Gruppenköpfen (H3) der Ortsliste (Nacharbeit UM-E3-FIX2 N1);
// anderswo ohne Wirkung. Serverkomponente.
// Lesbar im Wurzelmaßstab (UM-E4-SICHT-FIX M-C4 Nr. 4 und M-C5 Nr. 4, ein Bauteil für /ueber-uns und /kontakt): In der Zeichnung
// stehen nur Orte mit Namen (Standard Wetzlar, Gießen, Herborn wie im Satz der Seite); unbenannte Streupunkte entfallen, alle Orte
// nennt die Liste bzw. /standorte. Die Namen stehen außerhalb der Ringe auf Papierfläche, eine 1-px-Linie führt vom Punkt zum
// Namen in einer freien Ecke der Fläche (FUEHRUNG in geometrie.ts; er bleibt bei jeder Schriftgröße, die Namen zeigt, ganz in der
// Fläche); die Linie gehört zur Zone ihres Punkts und erscheint mit ihm. Die Ringmaße stehen außen am
// Ringrand unten links (ringmass), nicht mehr auf der Mittelachse. Die Legende sagt „Abstände nicht maßstäblich.“ (Mikrotext;
// der Wurzelmaßstab bleibt, test/karte.test.mjs). Ohne Liste (/kontakt) füllt die Zeichnung die ganze Breite des Kastens.
// Mit Liste (/ueber-uns) stehen die Orte mobil im nativen Aufklapper „Alle {n} Orte zeigen“ (n aus CITIES), ab lg offen in zwei
// Spalten auf der ganzen Breite des Kastens (bis 25 km | mehr als 25 km; globals.css „Einsatzkarte · Ortsliste“). Die Karte
// bleibt ein einziges role="img".
import type { CSSProperties } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import WeiterLink from '@/components/kern/WeiterLink';
import Aufklapper from '@/components/vorlagen/teile/Aufklapper';
import { linkKlassen } from '@/components/kern/stile';
import { zusammen } from '@/components/kern/zusammen';
import { Linie, Planrahmen, Punkt } from '@/components/kern/vignetten/zeichnen';
import { CITIES } from '@/config/cities';
import { CITY_COORDINATES, CITY_HUB_DATA, TEZGEL_HQ_COORDS } from '@/lib/maps/getMapEmbedUrl';
import { gruppiereNachZone, mitEntfernungAbSitz, type Zone } from '@/lib/einzugszonen';
import { FUEHRUNG, HALB, LAGE, RINGE_KM, fugenraster, kartenorte, prozent, radius, ringmass, type Ecke, type Lage } from './geometrie';

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
/** Lage am Anker einer Führungslinie: Der Name wächst vom Anker in seine Ecke (geometrie.ts FUEHRUNG), bündig zur Außenkante */
const ECKE_KLASSEN: Record<Ecke, string> = {
  'oben-links': '-translate-x-full -translate-y-full text-right',
  'oben-rechts': '-translate-y-full text-left',
  'unten-rechts': 'text-left',
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
    <div>
      <ul className="flex flex-col gap-2 font-text text-fs-2 text-tinte">
        <li className="flex items-center gap-3">
          <Fugenkreuz className="size-4 shrink-0 text-laser" />
          <span>Firmensitz Aßlar</span>
        </li>
        <li className="flex items-center gap-3">
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" className="size-4 shrink-0 text-tinte" stroke="currentColor" strokeWidth="1.5">
            {/* nur noch gefüllte Punkte: Orte ohne Namen stehen nicht mehr in der Zeichnung (M-C4 Nr. 4) */}
            <circle cx="8" cy="8" r="3" className="fill-current" vectorEffect="non-scaling-stroke" />
          </svg>
          {/* Mikrotext (Nacharbeit 2): Die Zeichnung zeigt nur die benannten Orte; „jeder Punkt“ las sich wie das ganze Gebiet */}
          <span>Die Punkte sind eine Auswahl der Orte, in denen wir arbeiten.</span>
        </li>
        <li className="flex items-center gap-3">
          <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false" className="size-4 shrink-0 text-tinte-2" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="8" cy="8" r="7" vectorEffect="non-scaling-stroke" />
            <circle cx="8" cy="8" r="3.5" vectorEffect="non-scaling-stroke" />
          </svg>
          <span>Die Ringe zeigen 10 und 25 km ab Aßlar.</span>
        </li>
      </ul>
      {/* Wurzelmaßstab (geometrie.ts): innen ist mehr Platz als außen; das sagt die Legende, statt es offen zu lassen */}
      <p className="mt-3 font-text text-fs-2 text-tinte-2">Abstände nicht maßstäblich.</p>
    </div>
  );
}

export default function Einsatzkarte({ unterschrift, beschriftet, aktuell, liste = true, verweis, className }: EinsatzkarteProps) {
  const namen = new Set<string>([...(beschriftet ?? (aktuell ? [] : STANDARD_BESCHRIFTET)), ...(aktuell ? [aktuell] : [])]);
  const benannt = PUNKTE.filter((p) => p.km > 0 && namen.has(p.slug));
  const zeichnung = (
    <div role="img" aria-label={BILDNAME} data-motion="karte" className={clsx('@container relative aspect-square w-full overflow-hidden', liste && 'max-md:max-w-md')}>
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
              {/* Führungslinie (1 px) vom Punkt bis unter den Namen in seiner Ecke; erscheint mit dem Punkt ihrer Zone. Unter 16rem
                  Flächenbreite entfällt sie mit den Namen (gleiche Schwelle), sonst stünden Linien ohne Beschriftung (Nacharbeit 2) */}
              <g className="@max-3xs:hidden">
                {benannt.filter((p) => p.zone === zone && FUEHRUNG[p.slug] && p.slug !== aktuell).map((p) => (
                  <Linie key={`f-${p.slug}`} d={`M${p.x} ${p.y}${FUEHRUNG[p.slug].linie.map(([x, y]) => `L${x} ${y}`).join('')}`} strokeWidth={1} className="text-tinte-2" />
                ))}
              </g>
              {benannt.filter((p) => p.zone === zone).map((p) => (
                <Punkt key={p.slug} cx={p.x} cy={p.y} r={5} className="fill-current" />
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
      {/* Ringmaß außen am Ringrand unten links (die Ecke der Beschriftung sitzt auf dem Ring) */}
      {RINGE_KM.map((km) => {
        const m = ringmass(km);
        return (
          <span key={km} aria-hidden="true" className="karte-marke -translate-x-full pt-1 pr-1 @max-3xs:hidden" style={lage(m.x, m.y)}>
            <span className="block bg-fliese px-1 font-mono text-fs-1 whitespace-nowrap text-tinte-2">{`${km} km`}</span>
          </span>
        );
      })}
      {benannt.map((p) => {
        const f = p.slug !== aktuell ? FUEHRUNG[p.slug] : undefined;
        return (
          <span
            key={p.slug}
            aria-hidden="true"
            className={clsx('karte-marke @max-3xs:hidden', f ? ECKE_KLASSEN[f.ecke] : LAGE_KLASSEN[LAGE[p.slug] ?? 'oben'])}
            style={f ? lage(f.x, f.y) : lage(p.x, p.y)}
          >
            <span className="block bg-fliese px-1 whitespace-nowrap">
              <span className="block font-text text-fs-2 font-semibold text-tinte">{p.name}</span>
              <span className="block font-mono text-fs-1 text-tinte-2">{entfernung(p.km)}</span>
            </span>
          </span>
        );
      })}
    </div>
  );
  /** Gruppe der Ortsliste (Kopf und Orte einer Zone) */
  const gruppe = ({ zone, orte }: (typeof GRUPPEN)[number]) => (
    <div key={zone.id}>
      <h3 className="font-text text-fs-2 font-semibold text-tinte-2">{zusammen(GRUPPE_NAME[zone.id])}</h3>
      <ul className="@container mt-2 flex flex-col border-t border-fuge">
        {orte.map((o) => {
          const ist = o.slug === aktuell;
          // bei großer Schrift steht die Entfernung immer unter dem Ort, nicht mal daneben, mal darunter (Browserprüfung E4-W1, Runde 3);
          // dort ohne Mindesthöhe mit Abstand oben, damit ein- und zweizeilige Namen gleich weit unter der Linie stehen (Runde 4;
          // eine Zeile ist bei großer Schrift ohnehin höher als 44 px)
          return (
            <li key={o.slug} className="flex flex-wrap items-center justify-between gap-x-3 border-b border-fuge @max-3xs:flex-col @max-3xs:items-start @max-3xs:pb-2">
              <Link
                href={`/standorte/${o.slug}`}
                aria-current={ist ? 'page' : undefined}
                data-motion="zustand"
                className={clsx(linkKlassen, 'flex min-h-11 flex-1 items-center gap-2 font-text text-fs-3 hyphens-none @max-3xs:min-h-0 @max-3xs:pt-2', ist && 'font-semibold')}
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
  );
  const vorhanden = GRUPPEN.filter((g) => g.orte.length > 0);
  return (
    <figure data-kopf-pause="ganz" className={clsx('border border-fuge bg-fliese', className)}>
      {unterschrift && <figcaption className="border-b border-fuge p-4 text-center font-text text-fs-4 text-pretty text-tinte lg:px-8 lg:py-6">{unterschrift}</figcaption>}
      {liste ? (
        // K-016 (Abnahme E3-BAU-08): Zeichnung mittig, die Liste der Orte darunter statt daneben
        <div>
          <div className="border-b border-fuge">
            <div className="mx-auto w-full max-w-md lg:w-1/2 lg:max-w-full">{zeichnung}</div>
          </div>
          {/* ab lg auf der ganzen Breite des Kastens: zwei Spalten mit je rund 550 px, jede Zeile bleibt eine Zeile (Name links,
              Entfernung rechts); im Satzmaß waren es zwei Spalten mit je 247 px, und die Entfernung rutschte unter den Namen */}
          <div className="mx-auto flex max-w-mass flex-col gap-6 p-4 lg:max-w-full lg:p-8">
            <Legende />
            {/* mobil geschlossen (eine Zeile statt dreizehn), ab lg offen in zwei Spalten: bis 25 km | mehr als 25 km */}
            <Aufklapper zeile={`Alle ${CITIES.length} Orte zeigen`} className="orte-zu border-y border-fuge lg:border-y-0">
              <div className="grid gap-6 pt-2 pb-6 lg:grid-cols-2 lg:gap-x-12 lg:pt-0 lg:pb-0">
                <div className="flex flex-col gap-6">{vorhanden.filter((g) => g.zone.id !== 'weit').map(gruppe)}</div>
                <div className="flex flex-col gap-6">{vorhanden.filter((g) => g.zone.id === 'weit').map(gruppe)}</div>
              </div>
              <p className="pb-6 font-text text-fs-2 text-tinte-2 lg:pt-6 lg:pb-0">Entfernungen sind ungefähre Angaben ab Aßlar.</p>
            </Aufklapper>
            {verweis && (
              <p>
                <WeiterLink href={verweis.href}>{verweis.name}</WeiterLink>
              </p>
            )}
          </div>
        </div>
      ) : (
        // ohne Liste (/kontakt): die Zeichnung auf der ganzen Breite des Kastens
        <div>
          <div className="border-b border-fuge">{zeichnung}</div>
          <div className="mx-auto max-w-mass p-4 lg:p-8">
            <Legende />
          </div>
        </div>
      )}
    </figure>
  );
}
