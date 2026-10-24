// Startseite · 5 Beleg (KERN v3 K-003 Nr. 3, K-009, K-012; Text REF-start): drei Teile in eigener Form.
// Arbeiten: sechs echte Fotos (je Raum eins) mit kurzer Unterschrift als gerade verlegte Fläche mit 1-px-Fugen (kein
// Versatz: den tragen Lage und Ablauf; Runde 3), schmal einspaltig, darunter der Weg zur Galerie. Kunden: drei Stimmen wörtlich aus REVIEWS (nur mit „…“
// gekürzt, wie in der Quelle), Quelle Google, darunter die Kennzeile mit Stand. Orte: der Satz zum Einsatzgebiet und alle
// Orte aus CITIES nach Entfernung ab Aßlar in drei Gruppen, je Ort ein Link. Serverkomponenten.
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Bildfeld from '@/components/kern/Bildfeld';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { linkKlassen } from '@/components/kern/stile';
import WeiterLink from '@/components/kern/WeiterLink';
import { zusammen } from '@/components/kern/zusammen';
import type { ArbeitId } from '@/config/arbeiten';
import { CITIES } from '@/config/cities';
import { REVIEWS } from '@/config/reviews';
import { CITY_HUB_DATA } from '@/lib/maps/getMapEmbedUrl';
import { gruppiereNachZone, mitEntfernungAbSitz } from '@/lib/einzugszonen';
import { Bewertungszeile } from './StartEinstieg';

const FOTOS: { id: ArbeitId; unterschrift: string }[] = [
  { id: 'start-galerie-1', unterschrift: 'Dusche ohne Stufe mit Sitzbank und Mosaik' },
  { id: 'start-galerie-2', unterschrift: 'Badewanne mit dunklen Mosaikfliesen' },
  { id: 'start-galerie-3', unterschrift: 'Balkon mit dunklen Fliesen, jede Reihe um ein Stück versetzt' },
  { id: 'start-galerie-4', unterschrift: 'Terrasse mit großen hellgrauen Platten' },
  { id: 'start-galerie-5', unterschrift: 'Außentreppe mit Fliesen in Terrakotta' },
  { id: 'start-galerie-6', unterschrift: 'Balkonboden vor dem Verlegen: ein blaues Band dichtet die Ränder ab' },
];

export function Arbeiten() {
  return (
    <Abschnitt id="unsere-arbeiten" formel="beleg" leitachse spaet titel="So sieht unsere Arbeit aus.">
      {/* zweispaltig erst, wenn eine Spalte mindestens 20 rem hat (große Systemschrift: ein Foto über die volle Breite) */}
      <div className="@container">
        {/* zweispaltig ab 20 rem (Telefon bei normaler Schrift), einspaltig nur bei großer Systemschrift (Runde 4) */}
        <ul className="grid grid-cols-1 gap-px border border-fuge bg-fuge @xs:grid-cols-2 @5xl:grid-cols-3">
          {FOTOS.map((f) => (
            <li key={f.id} className="bg-kalk">
              <Bildfeld arbeit={f.id} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" beschriftung={f.unterschrift} flaeche />
            </li>
          ))}
        </ul>
      </div>
      <p className="mt-12">
        <WeiterLink href="/referenzen">Alle Arbeiten ansehen</WeiterLink>
      </p>
    </Abschnitt>
  );
}

// Die große Stimme ist die von C. W. (vollständige Sätze); Wortlaut aller Stimmen unverändert aus REVIEWS
const STIMMEN = ['c-wolf', 'rabia-oe', 'elke-s'];
// In der großen Stimme unterstreicht die Laserlinie die Worte, auf die es dem Kunden ankommt (Wortlaut unverändert, G8;
// fehlt die Stelle im Wortlaut, bleibt die Stimme ohne Markierung)
const MARKIERUNG: Record<string, string> = { 'c-wolf': 'ordnungsgemäß, sauber und pünktlich' };

function markiert(text: string, stelle?: string) {
  const i = stelle ? text.indexOf(stelle) : -1;
  if (!stelle || i < 0) return text;
  return (
    <>
      {text.slice(0, i)}
      <span className="underline decoration-laser decoration-2 underline-offset-4">{stelle}</span>
      {text.slice(i + stelle.length)}
    </>
  );
}

/** Eine Stimme: Sterne nur als Bild (der Name nennt die Bewertung), Wortlaut unverändert aus REVIEWS. */
function Stimme({ s, gross }: { s: (typeof REVIEWS)[number]; gross: boolean }) {
  return (
    <figure className="flex h-full flex-col">
      <span aria-hidden="true" className="flex gap-1 text-tinte">
        {Array.from({ length: s.rating }, (_, i) => (
          <Icon key={i} name="stern-voll" groesse={gross ? 5 : 4} />
        ))}
      </span>
      {/* wrap-break-word: der Wortlaut enthält Stellen ohne Leerzeichen („empfehlen.Handwerklich“), die bei großer
          Systemschrift sonst über den Rand laufen; keine Silbentrennung im Zitat */}
      <blockquote className={clsx('mt-4 min-w-0 font-text text-pretty wrap-break-word text-tinte hyphens-none', gross ? 'text-fs-4 font-semibold lg:text-fs-5' : 'text-fs-3')}>
        <p>{gross ? markiert(s.text, MARKIERUNG[s.id]) : s.text}</p>
      </blockquote>
      <figcaption className="mt-6 font-text text-fs-2 text-tinte-2">
        <span className="font-semibold text-tinte">{s.author}</span> bei {s.source}
        <span className="sr-only">, {s.rating} von 5 Sternen</span>
      </figcaption>
    </figure>
  );
}

// Ab lg eine große Stimme links (sieben Spalten) und zwei kleinere rechts untereinander, getrennt durch Fugen statt
// Kästen; mobil untereinander. So hat der Abschnitt eine eigene Form (K-003 Nr. 4, Sichtprüfung E2).
export function Kundenstimmen() {
  // Fehlt eine Stimme in REVIEWS, bricht der Bau ab, statt sie still wegzulassen
  const stimmen = STIMMEN.map((id) => {
    const r = REVIEWS.find((x) => x.id === id);
    if (!r) throw new Error(`Kundenstimme ${id} fehlt in src/config/reviews.js`);
    return r;
  });
  const [erste, ...weitere] = stimmen;
  return (
    <Abschnitt id="kundenstimmen" formel="beleg" leitachse spaet flaeche="fliese" titel="Das sagen unsere Kunden.">
      {/* ab lg steht die Kennzeile direkt unter der großen Stimme und beide mittig neben den zwei kleineren (vorher stand die
          Kennzeile am Fuß der Spalte, dazwischen ein Loch; Sichtabnahme E2, Befund 6), mobil am Ende (Runde 4) */}
      <div className="grid gap-12 border-t border-fuge pt-12 lg:grid-cols-12 lg:gap-x-12">
        {/* mobil löst sich die Hülle auf (contents), die Kennzeile rückt per order ans Ende; die Kennzeile steht nur einmal im DOM */}
        <div className="contents lg:col-span-7 lg:block lg:min-w-0 lg:self-center">
          <div className="min-w-0">
            <Stimme s={erste} gross />
          </div>
          <Bewertungszeile stand className="font-text text-fs-2 text-tinte-2 hyphens-none max-lg:order-last lg:mt-12 lg:border-t lg:border-fuge lg:pt-6" />
        </div>
        <ul className="flex min-w-0 flex-col gap-12 border-t border-fuge pt-12 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
          {weitere.map((s, i) => (
            <li key={s.id} className={clsx(i > 0 && 'border-t border-fuge pt-12')}>
              <Stimme s={s} gross={false} />
            </li>
          ))}
        </ul>
      </div>
    </Abschnitt>
  );
}

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

// Die Marken stehen über der Linie an ihren Teilstrichen (Aßlar am Ursprung, 10 und 25 km an den Grenzen der Spalten), wie
// an einer Maßkette; vorher stand „10 km“ in der Spalte über „Bis 25 km ab Aßlar“ und las sich doppelt (E2-SICHT-2 Befund 9)
function GemeinsameKette() {
  return (
    <div aria-hidden="true" className="hidden pt-8 xl:col-span-12 xl:grid xl:grid-cols-12">
      {MARKE.map((marke, k) => (
        <span key={marke} className={clsx('relative h-4 border-l border-strich', SPALTE[k])}>
          <span className="absolute inset-x-0 top-0 border-t border-strich" />
          {k === 0 && <Fugenkreuz className="absolute top-0 left-0 size-3 -translate-1/2 text-laser" />}
          <span className={clsx('absolute bottom-full mb-2 font-mono text-fs-1 whitespace-nowrap text-tinte-2', k === 0 ? 'left-3' : 'left-0 -translate-x-1/2')}>{marke}</span>
        </span>
      ))}
    </div>
  );
}

function Masskette({ bereich }: { bereich: number }) {
  return (
    <span aria-hidden="true" className="mt-3 flex h-3 items-stretch xl:hidden">
      {KETTE.map((breite, k) => (
        <span key={breite} className={clsx('relative border-l', breite, k === bereich ? 'border-laser' : 'border-strich')}>
          <span className={clsx('absolute inset-x-0 top-1/2 -translate-y-1/2', k === bereich ? 'border-t-2 border-laser' : 'border-t border-strich')} />
        </span>
      ))}
    </span>
  );
}

function Ortsgruppe({ g, bereich, mehr = false }: { g: (typeof GRUPPEN)[number]; bereich: number; mehr?: boolean }) {
  return (
    // die letzte Gruppe einer Spalte füllt die Spalte bis unten (sonst bliebe unter der kürzeren Spalte Fugenfläche);
    // schmal (große Systemschrift; Schwelle 18rem, damit die erste von drei Spalten ab xl noch nebeneinander passt) steht die Entfernung unter dem Ort, Ortsnamen werden nie getrennt (Runde 3)
    <div className={clsx('@container bg-fliese last:grow xl:border-l xl:border-strich xl:bg-transparent', SPALTE[bereich])}>
      <div className="p-4 @2xs:p-6 xl:pt-6 xl:pb-0">
        <h3 className="font-text text-fs-2 font-semibold text-tinte-2">{zusammen(GRUPPE_NAME[g.zone.id])}</h3>
        <Masskette bereich={bereich} />
        <ul className="mt-4 flex flex-col">
          {g.orte.map((o) => (
            <li key={o.slug} className="flex flex-col items-start border-b border-fuge pb-2 last:border-b-0 @2xs:flex-row @2xs:items-center @2xs:justify-between @2xs:gap-3 @2xs:pb-0">
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

// Kopf gestapelt, darunter ab md zwei Spalten: links die nahen und mittleren Orte untereinander, rechts die weiteren mit
// dem Verweis auf alle Orte (etwa gleich lang; Sichtprüfung E2 Runde 2); ab xl drei Spalten unter einer Maßkette.
// Mobil untereinander, von nah nach weit.
export function Einsatzorte() {
  const [nah, mittel, ...weitere] = GRUPPEN;
  return (
    <Abschnitt
      id="einsatzgebiet"
      formel="beleg"
      leitachse
      spaet
      titel="Hier sind wir für Sie unterwegs."
      einleitung={<p>Unser Betrieb sitzt in Aßlar. Wir arbeiten in Wetzlar, Gießen, Herborn und den Orten rundherum.</p>}
    >
      <div className="grid gap-px border border-fuge bg-fuge md:grid-cols-2 xl:grid-cols-12 xl:gap-0 xl:border-0 xl:bg-transparent">
        <GemeinsameKette />
        <div className="flex flex-col gap-px xl:contents">
          <Ortsgruppe g={nah} bereich={0} />
          <Ortsgruppe g={mittel} bereich={1} />
        </div>
        <div className="flex flex-col gap-px xl:contents">
          {weitere.map((g, i) => (
            <Ortsgruppe key={g.zone.id} g={g} bereich={2 + i} mehr={i === weitere.length - 1} />
          ))}
        </div>
      </div>
    </Abschnitt>
  );
}
