// Startseite · 5 Beleg (KERN v3 K-003 Nr. 3, K-009, K-012; Text REF-start): drei Teile in eigener Form.
// Arbeiten: sechs echte Fotos (je Raum eins) mit kurzer Unterschrift, die mittlere Spalte ab lg um ein Drittel versetzt
// (der Versatz dieses Bildschirms), darunter der Weg zur Galerie. Kunden: drei Stimmen wörtlich aus REVIEWS (nur mit „…“
// gekürzt, wie in der Quelle), Quelle Google, darunter die Kennzeile mit Stand. Orte: der Satz zum Einsatzgebiet und alle
// Orte aus CITIES nach Entfernung ab Aßlar in drei Gruppen, je Ort ein Link. Serverkomponenten.
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Bildfeld from '@/components/kern/Bildfeld';
import { linkKlassen } from '@/components/kern/stile';
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
    <Abschnitt id="unsere-arbeiten" formel="beleg" leitachse titel="So sieht unsere Arbeit aus." className="lg:pb-32">
      <ul className="grid grid-cols-2 gap-x-4 gap-y-8 md:gap-x-6 lg:grid-cols-3 lg:gap-x-8">
        {FOTOS.map((f, i) => (
          <li key={f.id} className={clsx(i % 3 === 1 && 'lg:translate-y-16')}>
            <Bildfeld arbeit={f.id} sizes="(min-width: 1024px) 30vw, 50vw" beschriftung={f.unterschrift} />
          </li>
        ))}
      </ul>
      <p className="mt-12 lg:mt-24">
        <Link href="/referenzen" data-motion="zustand" className={clsx(linkKlassen, 'inline-flex min-h-11 items-center gap-2 font-semibold text-fs-3')}>
          Alle Arbeiten ansehen
          <Icon name="pfeil-rechts" groesse={5} />
        </Link>
      </p>
    </Abschnitt>
  );
}

// Die große Stimme ist die von C. W. (vollständige Sätze); Wortlaut aller Stimmen unverändert aus REVIEWS
const STIMMEN = ['c-wolf', 'rabia-oe', 'elke-s'];

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
      <blockquote className={clsx('mt-4 min-w-0 font-text text-pretty wrap-break-word text-tinte hyphens-none', gross ? 'text-fs-4 font-semibold' : 'text-fs-3')}>
        <p>{s.text}</p>
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
    <Abschnitt id="kundenstimmen" formel="beleg" leitachse flaeche="fliese" titel="Das sagen unsere Kunden.">
      <div className="grid gap-12 border-t border-fuge pt-12 lg:grid-cols-12 lg:gap-x-12">
        <div className="min-w-0 lg:col-span-7 lg:self-center">
          <Stimme s={erste} gross />
        </div>
        <ul className="flex min-w-0 flex-col gap-12 border-t border-fuge pt-12 lg:col-span-5 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
          {weitere.map((s, i) => (
            <li key={s.id} className={clsx(i > 0 && 'border-t border-fuge pt-12')}>
              <Stimme s={s} gross={false} />
            </li>
          ))}
        </ul>
      </div>
      <Bewertungszeile stand className="mt-12 font-text text-fs-2 text-tinte-2 hyphens-none" />
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

function Masskette({ bereich }: { bereich: number }) {
  return (
    <span aria-hidden="true" className="mt-3 flex h-3 items-stretch">
      {KETTE.map((breite, k) => (
        <span key={breite} className={clsx('relative border-l', breite, k === bereich ? 'border-laser' : 'border-strich')}>
          <span className={clsx('absolute inset-x-0 top-1/2 -translate-y-1/2', k === bereich ? 'border-t-2 border-laser' : 'border-t border-strich')} />
        </span>
      ))}
    </span>
  );
}

function Ortsgruppe({ g, bereich }: { g: (typeof GRUPPEN)[number]; bereich: number }) {
  return (
    // die letzte Gruppe einer Spalte füllt die Spalte bis unten (sonst bliebe unter der kürzeren Spalte Fugenfläche)
    <div className="bg-fliese p-6 last:grow">
      <h3 className="font-text text-fs-2 font-semibold text-tinte-2">{GRUPPE_NAME[g.zone.id]}</h3>
      <Masskette bereich={bereich} />
      <ul className="mt-4 flex flex-col">
        {g.orte.map((o) => (
          <li key={o.slug} className="flex items-center justify-between gap-3 border-b border-fuge last:border-b-0">
            {/* der Link nimmt die ganze Zeile bis zur Entfernung ein (Trefffläche ≥ 44 px auch bei kurzen Namen) */}
            <Link href={`/standorte/${o.slug}`} data-motion="zustand" className={clsx(linkKlassen, 'flex min-h-11 flex-1 items-center font-text text-fs-3')}>
              <span>{o.name}</span>
            </Link>
            {o.distanceKm === 0 ? (
              <span className="shrink-0 font-text text-fs-1 text-tinte-2">Firmensitz</span>
            ) : (
              <span className="shrink-0 font-mono text-fs-1 text-tinte-2">ca. {o.distanceKm} km</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

// Kopf gestapelt, darunter ab md zwei Spalten: links die nahen und mittleren Orte untereinander, rechts die weiteren
// (etwa gleich lang; Sichtprüfung E2 Runde 2). Mobil untereinander, von nah nach weit.
export function Einsatzorte() {
  const [nah, mittel, ...weitere] = GRUPPEN;
  return (
    <Abschnitt
      id="einsatzgebiet"
      formel="beleg"
      leitachse
      titel="Hier sind wir für Sie unterwegs."
      einleitung={<p>Unser Betrieb sitzt in Aßlar. Wir arbeiten in Wetzlar, Gießen, Herborn und den Orten rundherum.</p>}
    >
      <div className="grid gap-px border border-fuge bg-fuge md:grid-cols-2">
        <div className="flex flex-col gap-px">
          <Ortsgruppe g={nah} bereich={0} />
          <Ortsgruppe g={mittel} bereich={1} />
        </div>
        <div className="flex flex-col gap-px">
          {weitere.map((g, i) => (
            <Ortsgruppe key={g.zone.id} g={g} bereich={2 + i} />
          ))}
        </div>
      </div>
      <p className="mt-8">
        <Link href="/standorte" data-motion="zustand" className={clsx(linkKlassen, 'inline-flex min-h-11 items-center gap-2 font-semibold text-fs-3')}>
          Alle Orte ansehen
          <Icon name="pfeil-rechts" groesse={5} />
        </Link>
      </p>
    </Abschnitt>
  );
}
