// Vorlagen · 5 Beleg, Teil Einsatzorte (KERN v3 K-009, K-015; E-044, vormals Startseite): der Satz zum Einsatzgebiet und
// alle Orte aus CITIES nach Entfernung ab Aßlar in drei Gruppen, je Ort ein Link, mit einer Maßkette als Formsystem des
// Verlegeplans. Eigene Form, darum eigener Teil (Umkehrprobe E-025); auch für Orts- und Über-uns-Seiten. Serverkomponente.
import Link from 'next/link';
import clsx from 'clsx';
import Abschnitt from '@/components/kern/Abschnitt';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Textmarken from '@/components/kern/Textmarken';
import { linkKlassen } from '@/components/kern/stile';
import WeiterLink from '@/components/kern/WeiterLink';
import { zusammen } from '@/components/kern/zusammen';
import { CITIES } from '@/config/cities';
import { CITY_HUB_DATA } from '@/lib/maps/getMapEmbedUrl';
import { gruppiereNachZone, mitEntfernungAbSitz } from '@/lib/einzugszonen';
import type { Markentext } from '../inhalt';

const GRUPPEN = gruppiereNachZone(mitEntfernungAbSitz(CITIES, CITY_HUB_DATA));
// Gruppennamen ohne eigene Obergrenze für die letzte Zone (K-015 nennt das Einsatzgebiet, keine 50 km; Rückgabe E2-LEKT-404)
const GRUPPE_NAME: Record<string, string> = { nah: 'Bis 10 km ab Aßlar', mittel: 'Bis 25 km ab Aßlar', weit: 'Mehr als 25 km ab Aßlar' };

// Maßkette (Formsystem Verlegeplan): die drei Entfernungsbereiche als Abschnitte einer Bemaßungslinie ab Aßlar, der
// Bereich der Gruppe in Laser-Rot, die anderen in Strich; der letzte Abschnitt bleibt rechts offen (keine Obergrenze,
// K-015). Längen ungefähr nach den Kilometern (10, 15, offen). Dekorativ, der Name der Gruppe steht als Text darüber.
const KETTE = ['basis-1/4', 'basis-1/3', 'flex-1'];
// ab xl stehen die drei Gruppen nebeneinander unter einer gemeinsamen Maßkette, Spaltenbreiten wie die Kette (3, 4 und 5
// von 12 Spalten), die Striche der Kette laufen als Hilfslinien an den Gruppen hinunter (Sichtabnahme E2, Befund 6: die
// zwei Kästen waren ungleich lang)
const SPALTE = ['xl:col-span-3', 'xl:col-span-4', 'xl:col-span-5'];
const MARKE = ['Aßlar', '10 km', '25 km'];
// Zeilen des Rasters der weiten Gruppe von md bis xl, je Zahl der Orte in der ersten Spalte (ausgeschrieben, damit Tailwind
// die Klassen findet; Tokens statt Beliebigwert)
const ZEILEN = ['', 'md:grid-rows-1', 'md:grid-rows-2', 'md:grid-rows-3', 'md:grid-rows-4', 'md:grid-rows-5', 'md:grid-rows-6', 'md:grid-rows-7', 'md:grid-rows-8', 'md:grid-rows-9', 'md:grid-rows-10', 'md:grid-rows-11', 'md:grid-rows-12'];

// Die Marken stehen über der Linie an ihren Teilstrichen (Aßlar am Ursprung, 10 und 25 km an den Grenzen der Spalten), wie
// an einer Maßkette; vorher stand „10 km“ in der Spalte über „Bis 25 km ab Aßlar“ und las sich doppelt (E2-SICHT-2 Befund 9).
// Die Linie beginnt auf der Leitachse: Ihr rotes Ursprungskreuz sitzt auf dem Lot (ab xl 16 px vor der Inhaltskante:
// ACHSE_LAGE lg:left-8 im Rand lg:px-12), so markiert ein Kreuz Achse und Ursprung; vorher standen Achsen- und
// Ursprungskreuz 16 px nebeneinander (UM-E3-FIX F3, Sichtabnahme E3 Anlauf 1)
function GemeinsameKette() {
  return (
    <div aria-hidden="true" className="hidden pt-8 xl:col-span-12 xl:grid xl:grid-cols-12">
      {MARKE.map((marke, k) => (
        <span key={marke} className={clsx('relative h-4 border-l border-strich', SPALTE[k])}>
          <span className={clsx('absolute top-0 right-0 border-t border-strich', k === 0 ? '-left-4' : 'left-0')} />
          {k === 0 && <Fugenkreuz className="absolute top-0 -left-4 size-3 -translate-1/2 text-laser" />}
          <span className={clsx('absolute bottom-full mb-2 font-mono text-fs-1 whitespace-nowrap text-tinte-2', k === 0 ? 'left-3' : 'left-0 -translate-x-1/2')}>{marke}</span>
        </span>
      ))}
    </div>
  );
}

// `breit`: die Gruppe steht von md bis xl allein über die ganze Breite; ihre Kette bleibt so lang wie die der Gruppen darüber
// (eine Spalte, Innenabstand abgezogen), damit alle drei Ketten denselben Maßstab haben
function Masskette({ bereich, breit = false }: { bereich: number; breit?: boolean }) {
  return (
    <span aria-hidden="true" className={clsx('mt-3 flex h-3 items-stretch xl:hidden', breit && 'md:w-1/2 md:pr-6')}>
      {KETTE.map((breite, k) => (
        <span key={breite} className={clsx('relative border-l', breite, k === bereich ? 'border-laser' : 'border-strich')}>
          <span className={clsx('absolute inset-x-0 top-1/2 -translate-y-1/2', k === bereich ? 'border-t-2 border-laser' : 'border-t border-strich')} />
        </span>
      ))}
    </span>
  );
}

function Ortsgruppe({ g, bereich, mehr = false }: { g: (typeof GRUPPEN)[number]; bereich: number; mehr?: boolean }) {
  // die weiteste Gruppe steht von md bis xl in einer eigenen Zeile unter den beiden nahen, ihre Orte dort in zwei Spalten
  // genau unter den Spalten darüber (Abstand 12 Stufen = zweimal der Innenabstand). Gefüllt Spalte für Spalte wie die Zeile
  // darüber (Raster mit so vielen Zeilen wie die erste Spalte Orte hat): links die nähere, rechts die weitere Hälfte, so
  // gelten Lese- und Tabfolge nach der Entfernung auch von oben nach unten (vorher zeilenweise, die Folge sprang im Zickzack
  // zwischen den Spalten; Prüfung Teil B, t1024). Zeilen gleich hoch, die Fugen beider Spalten fluchten.
  const breit = bereich === SPALTE.length - 1;
  const zeilen = Math.ceil(g.orte.length / 2);
  if (breit && !ZEILEN[zeilen]) throw new Error(`Einsatzorte: ${g.orte.length} Orte in „${GRUPPE_NAME[g.zone.id]}“, ZEILEN reicht bis ${(ZEILEN.length - 1) * 2}`);
  return (
    // in einer Zeile des Rasters gleich hoch (gestreckt), so bleibt unter der kürzeren Gruppe keine Fugenfläche;
    // schmal (große Systemschrift; Schwelle 18rem, damit die erste von drei Spalten ab xl noch nebeneinander passt) steht die Entfernung unter dem Ort, Ortsnamen werden nie getrennt (Runde 3)
    <div className={clsx('@container bg-fliese xl:border-l xl:border-strich xl:bg-transparent', breit && 'md:col-span-2', SPALTE[bereich])}>
      <div className="p-4 @2xs:p-6 xl:pt-6 xl:pb-0">
        <h3 className="font-text text-fs-2 font-semibold text-tinte-2">{zusammen(GRUPPE_NAME[g.zone.id])}</h3>
        <Masskette bereich={bereich} breit={breit} />
        <ul className={clsx('mt-4 flex flex-col', breit && ['md:grid md:grid-flow-col md:grid-cols-2 md:gap-x-12 xl:flex', ZEILEN[zeilen]])}>
          {g.orte.map((o, i) => (
            // zweispaltig endet jede Spalte ohne Fuge: ohne Strich bleiben der letzte Ort und der letzte der ersten Spalte
            <li key={o.slug} className={clsx('flex flex-col items-start border-b border-fuge pb-2 last:border-b-0 @2xs:flex-row @2xs:items-center @2xs:justify-between @2xs:gap-3 @2xs:pb-0', breit && i === zeilen - 1 && 'md:max-xl:border-b-0')}>
              {/* der Link nimmt die ganze Zeile bis zur Entfernung ein (Trefffläche ≥ 44 px auch bei kurzen Namen) */}
              {/* schmal: gleicher Abstand über und unter jeder Zeile, auch bei zweizeiligen Namen (Runde 4) */}
              <Link href={`/standorte/${o.slug}`} data-motion="zustand" className={clsx(linkKlassen, 'flex min-h-11 w-full items-center font-text text-fs-3 hyphens-none @max-2xs:pt-2 @2xs:w-auto @2xs:flex-1')}>
                <span>{o.name}</span>
              </Link>
              {o.distanceKm === 0 ? (
                <span className="shrink-0 font-mono text-fs-1 text-tinte-2">Firmensitz</span>
              ) : (
                <span className="shrink-0 font-mono text-fs-1 text-tinte-2">{zusammen(`ca. ${o.distanceKm} km`)}</span>
              )}
            </li>
          ))}
        </ul>
        {/* der Verweis füllt ab md die kürzere rechte Spalte (vorher Fugenfläche darunter) und steht mobil am Ende */}
        {mehr && (
          <p className="mt-6">
            <WeiterLink href="/standorte">Alle Orte ansehen</WeiterLink>
          </p>
        )}
      </div>
    </div>
  );
}

// Kopf gestapelt, darunter in der Folge der Entfernung: mobil untereinander von nah nach weit; ab md oben „bis 10 km“ und
// „bis 25 km“ nebeneinander, darunter über die ganze Breite „mehr als 25 km“ mit dem Verweis auf alle Orte; ab xl drei
// Spalten unter einer Maßkette. Vorher standen ab md links die nahen und mittleren Orte untereinander und rechts die
// weiteren: Zeilenweise las sich das als 10 km, mehr als 25 km, 25 km, und der rote Abschnitt der Ketten sprang hin und
// zurück (Sichtabnahme E3 Anlauf 1, t768 und t1024; UM-E3-FIX F9). Jetzt wandert er von links nach rechts.
export default function Einsatzorte({ titel, einleitung }: { titel: string; einleitung: Markentext }) {
  return (
    <Abschnitt
      id="einsatzgebiet"
      formel="beleg"
      leitachse
      spaet
      titel={titel}
      einleitung={
        <p>
          <Textmarken text={einleitung} />
        </p>
      }
    >
      <div className="grid gap-px border border-fuge bg-fuge md:grid-cols-2 xl:grid-cols-12 xl:gap-0 xl:border-0 xl:bg-transparent">
        <GemeinsameKette />
        {GRUPPEN.map((g, i) => (
          <Ortsgruppe key={g.zone.id} g={g} bereich={i} mehr={i === GRUPPEN.length - 1} />
        ))}
      </div>
    </Abschnitt>
  );
}
