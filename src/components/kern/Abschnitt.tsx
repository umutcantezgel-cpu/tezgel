// Abschnitt (KERN K-006, K-009): Kopf mit Mono-Etikett (vormals Badge, Wortlaut bleibt) und H2,
// wahlweise gestapelt oder seitlich (Kopf links, Inhalt rechts). Flächen: Kalk, Fliese, Tinte.
// Satzspiegel (UM-E4-SICHT-FIX M-B1, K-003 Nr. 4 „je Bildschirmhöhe genau ein Versatz“): Der Kopf bleibt mittig (Ruhe-Regel,
// E-047), der Inhalt steht nach `satz` im Raster aus drei Spalten: `links` Spalten 1 bis 2 an der Laserlinie (geteilt 16 px am
// Lot, M-A4 Nr. 4), `rechts` Spalten 2 bis 3, `breit` die volle Rasterbreite, `mitte` wie bisher mittig in der Lesebreite.
// Geteilt wird ab lg und nur, solange der Inhaltsblock mindestens 20 rem breit bleibt (Container-Abfrage @lg = 32 rem auf der
// Inhaltsbreite: zwei Drittel davon sind 21,3 rem; bei großer Systemschrift sonst eine Spalte). Die Hülle `abschnitt-inhalt`
// mit der Leitfaden-Bahn bleibt volle Breite, Marke und Kopf-Pausen wandern nicht mit. Eine lange Einleitung (über
// EINLEITUNG_LANG Zeichen, kern/einleitung) steht linksbündig: mittig gesetzt im Lesemaß unter dem Kopf, geteilt im
// Inhaltsblock über dem Inhalt (außerhalb der Bahn: die Marke steht nie neben Kopf und Satz), breit im Lesemaß unter dem Kopf
// wie mittig. Die Schwelle rechnen die Aufrufer (Serverkomponenten) aus; Abschnitt selbst bekommt nur `einleitungLang` und
// zieht so weder Textmarken noch Glossar in die Client-Bündel der Seiten, die ihn als Client-Komponente nutzen (Prüfung SF-B2).
import type { ReactNode } from 'react';
import clsx from 'clsx';
import Fugenkreuz from './Fugenkreuz';
import { ACHSE_LAGE, ACHSE_VOR_SATZ, KREUZ_GROESSE } from './Leitachse';
import { etikettForm, seitenKlassen } from './stile';
import type { Formelteil } from './Seitenformel';

/** Satzspiegel eines Abschnitts oder Blocks (M-B1): `mitte` (Standard, mittig in der Lesebreite), `links` (Spalten 1 bis 2 an
 *  der Laserlinie), `rechts` (Spalten 2 bis 3), `breit` (volle Rasterbreite, große Momente) */
export type Satz = 'mitte' | 'links' | 'rechts' | 'breit';

// Spalten im Raster aus drei Spalten, ab lg und ab 32 rem Inhaltsbreite (zwei Drittel ≥ 20 rem); darunter eine Spalte
const SPALTE: Record<'links' | 'rechts', string> = {
  links: 'lg:@lg:col-span-2',
  rechts: 'lg:@lg:col-span-2 lg:@lg:col-start-2',
};

/** Block im Satzspiegel (M-B1): `links` und `rechts` als Spalten im Raster aus drei Spalten (eigene Container-Abfrage auf der
 *  Breite des Blocks), `mitte` und `breit` unverändert (ohne Hülle, außer mit `className`). Für Bausteine mit Teilen in
 *  verschiedenem Satz, z. B. „Was wir tun“: großer Moment breit, Zeilen und Punkte rechts. */
export function Satzblock({ satz, className, children }: { satz: Satz; className?: string; children: ReactNode }) {
  if (satz !== 'links' && satz !== 'rechts') return className ? <div className={className}>{children}</div> : <>{children}</>;
  return (
    <div className={clsx('@container', className)}>
      <div className="grid grid-cols-1 lg:@lg:grid-cols-3">
        <div className={SPALTE[satz]}>{children}</div>
      </div>
    </div>
  );
}

/** Lesebreite eines Textblocks im Satz: mittig (mitte, breit, und ungeteilt auch links und rechts, wie die Nachbarabschnitte);
 *  ab der Teilung links an der Inhaltskante (16 px am Lot), rechts an der Kante der zweiten Spalte. Die Container-Abfrage greift
 *  auf den Satzblock darüber. Zwischen md und lg (t768, q844) stand die Lage mit `md:mx-0` allein am linken Rand, alle
 *  Nachbarn mittig (Prüfung SF-B2): Der Versatz gilt erst, wo das Raster geteilt ist. */
export function satzMass(satz: Satz) {
  if (satz === 'links' || satz === 'rechts') return 'mx-auto max-w-mass lg:@lg:mx-0';
  return 'mx-auto max-w-mass';
}

/** Breite eines Blocks mit Zeilen an der Fuge (Listen, Zeile eines Aufklappers) im Satz: wie `satzMass`, geteilt aber über die
 *  ganze Spalte (die Zeilen tragen den Versatz bis an die Kante; der Satz darin bleibt im Lesemaß) */
export function satzBlock(satz: Satz) {
  if (satz === 'links' || satz === 'rechts') return 'mx-auto max-w-mass lg:@lg:mx-0 lg:@lg:max-w-none';
  return 'mx-auto max-w-mass';
}

export interface AbschnittProps {
  id?: string;
  /** id der H2 für aria-labelledby; Standard: `${id}-titel` */
  titelId?: string;
  etikett?: ReactNode;
  /** laufende Nummer im Mono-Etikett, z. B. „02“ */
  nummer?: string;
  titel?: ReactNode;
  einleitung?: ReactNode;
  /** Einleitung über EINLEITUNG_LANG Zeichen (`langeEinleitung(text)` aus kern/einleitung): steht linksbündig statt mittig (M-B1 Nr. 3); mittig und
   *  breit im Lesemaß unter dem Kopf, links und rechts im Inhaltsblock */
  einleitungLang?: boolean;
  /** Satzspiegel des Inhalts (M-B1), Standard `mitte`; nur gestapelt */
  satz?: Satz;
  /** Satz der langen Einleitung, wenn er vom Inhalt abweicht (nur gestapelt; Standard: `satz`). „Was wir tun“ mit großem Moment in
   *  voller Breite (`satz` breit) und Zeilen und Punkten rechts (`tun.satz`, UM-E4-SICHT-FIX M-C9): Die Einleitung steht mit
   *  ihnen im Satzblock rechts statt mittig im Lesemaß (Prüfung SF-C3: sonst drei linke Kanten in einer Bildschirmhöhe) */
  einleitungSatz?: Satz;
  /** nur mit kopf="seitlich": Block unter dem Kopf (ab lg in der Kopfspalte direkt unter der Einleitung, mobil nach dem
   *  Inhalt), z. B. Anruf neben einem Formular, das mobil direkt auf die Überschrift folgen soll */
  unterKopf?: ReactNode;
  art?: 'erzaehl' | 'arbeit';
  flaeche?: 'kalk' | 'fliese' | 'tinte';
  kopf?: 'gestapelt' | 'seitlich';
  /** nur gestapelt: Kopf mittig über dem Inhalt (K-016 „Ruhe“, E-047) */
  mitte?: boolean;
  breite?: 'seite' | 'mass';
  /** data-motion="auftritt" für den Inhalt (nur Erzählansichten, höchstens jeder zweite Abschnitt) */
  auftritt?: boolean;
  /** Fugenkreuz auf der Leitachse an der Oberkante (innerhalb von <Leitachse>); im Leitfaden dazu der Kopf der Achse neben
   *  dem Inhalt (nur Kalk, gestapelt, Satzspiegel und mit eigenem Titel oder Etikett; UM-E3-FIX2 N1) */
  leitachse?: boolean;
  /** Inhalt erst in Sichtnähe zeichnen (content-visibility, nur unterhalb des ersten Bildschirms; E3-NACH-07) */
  spaet?: boolean;
  /** Laserlinie links an der H2: das Ziel der Hauptknöpfe (K-004), damit die Linie, die führt, nicht vor dem Ziel endet */
  ziel?: boolean;
  /** Teil der Seitenformel (KERN v3 K-009), als data-formel für die Prüfung */
  formel?: Formelteil;
  className?: string;
  children?: ReactNode;
  'aria-label'?: string;
}

export default function Abschnitt({ id, titelId, etikett, nummer, titel, einleitung, einleitungLang = false, satz = 'mitte', einleitungSatz, unterKopf, art = 'erzaehl', flaeche = 'kalk', kopf = 'gestapelt', mitte = false, breite = 'seite', auftritt = false, leitachse = false, spaet = false, ziel = false, formel, className, children, ...rest }: AbschnittProps) {
  const hId = titelId ?? (id ? `${id}-titel` : undefined);
  const tinte = flaeche === 'tinte';
  // Satzspiegel (M-B1): geteilt nur gestapelt; die lange Einleitung wandert dann in den Inhaltsblock (über der Bahn), mit
  // `einleitungSatz` in dessen Satz (M-C9)
  const geteilt = kopf !== 'seitlich' && (satz === 'links' || satz === 'rechts');
  const satzEinleitung = einleitungSatz ?? satz;
  const einleitungGeteilt = kopf !== 'seitlich' && (satzEinleitung === 'links' || satzEinleitung === 'rechts');
  const einleitungImBlock = Boolean(einleitung && einleitungLang && einleitungGeteilt);
  const einleitungBuendig = Boolean(einleitungLang && !einleitungGeteilt);
  const einleitungKlassen = clsx('text-fs-3', tinte ? 'text-nacht-2' : 'text-tinte-2', (einleitungImBlock || einleitungBuendig) && 'text-left text-pretty');
  const kopfInhalt = (titel || etikett) && (
    <div className={clsx(kopf === 'seitlich' ? 'col-span-4 md:col-span-8 lg:col-span-4' : 'max-w-mass', kopf !== 'seitlich' && mitte && 'mx-auto text-center text-balance')}>
      {(etikett || nummer) && (
        <p className={clsx(etikettForm, 'mb-4', tinte ? 'text-nacht-2' : 'text-tinte-2')}>
          {!nummer && <Fugenkreuz className={clsx('size-3 shrink-0', tinte ? 'text-nacht-2' : 'text-strich')} />}
          {nummer && <span className={tinte ? 'text-kalk' : 'text-tinte'}>{nummer}</span>}
          {nummer && etikett && <span aria-hidden="true">·</span>}
          {etikett}
        </p>
      )}
      {/* Arbeitsansicht: H1 steht in text-fs-6, die H2 eine Stufe darunter (E3-SICHT-2-ARB Befunde 4, 15, 25) */}
      {titel && <h2 id={hId} className={clsx(art === 'arbeit' ? 'text-fs-5' : 'text-fs-6', tinte ? 'text-kalk' : 'text-tinte', ziel && 'border-l-2 border-laser pl-4')}>{titel}</h2>}
      {einleitung && !einleitungImBlock && <div className={clsx('mt-6', einleitungKlassen)}>{einleitung}</div>}
    </div>
  );
  const einleitungBlock = einleitungImBlock && (
    // Lesemaß wie der Kopf (max-w-mass misst in ch der Grundschrift, die Stufe fs-3 steht innen, E-065): so fluchtet die
    // Einleitung mit den Zeilen und Absätzen darunter
    <Satzblock satz={satzEinleitung} className="mt-6">
      <div className={satzMass(satzEinleitung)}>
        <div className={einleitungKlassen}>{einleitung}</div>
      </div>
    </Satzblock>
  );
  const inhalt = geteilt ? <Satzblock satz={satz}>{children}</Satzblock> : children;
  // Kopf der Leitachse (Abschnittsmarke, UM-E3-FIX2 N1) nur dort, wo das Lot gezeichnet ist: auf Kalk (Fliese und Tinte
  // decken es), und nur neben dem Inhalt, nie neben Kopf und Satz; seitlich stünde der Inhalt neben der H2. Nur mit eigenem
  // Kopf: Ein Abschnitt ohne Titel und Etikett trägt einen Inhalt, der seine Überschrift selbst mitbringt (z. B. ein
  // verschachtelter Abschnitt im Werkzeug-Slot, die Firmengeschichte auf /ueber-uns); dort begänne die Bahn über dessen H2
  // (Nacharbeit UM-E3-FIX2: Kopf neben „So sind wir gewachsen.“)
  const marke = Boolean(kopfInhalt) && leitachse && flaeche === 'kalk' && kopf === 'gestapelt' && breite === 'seite';
  return (
    <section
      id={id}
      data-formel={formel}
      // Fliese und Tinte stoßen mit einer Kante an ihre Nachbarn: dort kreuzt das Lot eine Trennlinie (Fugenkreuz im
      // Leitfaden nur dort, globals.css „abschnitt-kreuz“, UM-E3-FIX F3)
      data-kante={flaeche !== 'kalk' || undefined}
      aria-labelledby={titel ? hId : undefined}
      aria-label={!titel ? rest['aria-label'] : undefined}
      className={clsx(
        // Sprungziel ohne eigenen Versatz: allein scroll-padding-top (Kopfhöhe + 16 px) an <html> setzt es auf 96 px (R-01a)
        'relative',
        // Zeitstrahl der Kante (Einrasten des Kopfs im Leitfaden, bewegung.css)
        leitachse && 'abschnitt-lot',
        art === 'erzaehl' ? 'py-16 lg:py-24' : 'py-12 lg:py-16',
        flaeche === 'fliese' && 'border-y border-fuge bg-fliese',
        tinte && 'flaeche-tinte bg-tinte text-kalk',
        className,
      )}
    >
      {leitachse && (
        // Fugenkreuz auf dem Lot (Ebene z-10, K-005): über der Zierebene der Leitachse und über einer Nachbarfläche mit z-10.
        // abschnitt-kreuz: im Leitfaden nur auf einer Trennlinie (globals.css); mobil 8 px groß (KREUZ_GROESSE, 4 px zum Text).
        // Darüber dasselbe Kreuz in Laser: Im Leitfaden rastet der Kopf hier ein, solange die Leselinie die Kante auf 24 px
        // trifft (kreuz-rot, bewegung.css); sonst unsichtbar. Das Einrasten gehört zur Kennung leitachse (Register v4), darum
        // data-motion="leitachse" (ohne eigene Regel daran; bewegung.mjs ordnet die Kreuz-Animationen so zu, UM-E4-VORL)
        <div aria-hidden="true" data-motion="leitachse" className="abschnitt-kreuz pointer-events-none absolute inset-x-0 top-0 z-10">
          <div className={clsx(seitenKlassen, 'relative')}>
            <Fugenkreuz className={clsx('kreuz-grund absolute top-0 -translate-x-1/2 -translate-y-1/2', KREUZ_GROESSE, ACHSE_LAGE, tinte ? 'text-nacht-2' : 'text-tinte')} />
            <Fugenkreuz className={clsx('kreuz-rot absolute top-0 -translate-x-1/2 -translate-y-1/2 text-laser', KREUZ_GROESSE, ACHSE_LAGE)} />
          </div>
        </div>
      )}
      <div className={clsx(seitenKlassen, breite === 'mass' && 'max-w-mass', spaet && 'spaet-zeichnen')}>
        {kopf === 'seitlich' ? (
          <div className="grid grid-cols-4 gap-y-12 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12">
            {unterKopf ? (
              // Mit Block unter dem Kopf: ab lg stehen Kopf und Block in einer Spalte untereinander (der Block folgt direkt
              // auf die Einleitung, auch wenn der Inhalt rechts viel höher ist); mobil löst sich die Spalte auf
              // (display: contents), und die Reihenfolge Kopf, Inhalt, Block entsteht über `order`.
              <>
                <div className="contents lg:col-span-4 lg:block">
                  {kopfInhalt}
                  <div className="order-3 col-span-4 md:col-span-8 lg:mt-12">{unterKopf}</div>
                </div>
                <div className="order-2 col-span-4 md:col-span-8 lg:order-none" data-motion={auftritt ? 'auftritt' : undefined}>{children}</div>
              </>
            ) : (
              <>
                {kopfInhalt}
                <div className="col-span-4 md:col-span-8" data-motion={auftritt ? 'auftritt' : undefined}>{children}</div>
              </>
            )}
          </div>
        ) : (
          <>
            {kopfInhalt}
            {einleitungBlock}
            {marke ? (
              // Bahn des Kopfs (UM-E3-FIX2 N1): so hoch wie der Inhalt, auf dem Lot (8 bzw. 16 px vor der Inhaltskante). Ihr
              // Zeitstrahl beginnt erst unter Kopf und Satz und endet vor der Unterkante: Der Kopf steht nie neben der H2 und
              // nie nah an einem Kantenkreuz (Abstand mindestens der Innenabstand des Abschnitts). Die Marke ist ein Streifen
              // in voller Höhe der Bahn mit dem Fugenkreuz an der Unterkante (bewegung.css „Leitfaden mit Abschnittsmarke“);
              // außerhalb des Leitfadens ohne Wirkung. Mobil keine Marke: Sie stünde auf der Leselinie neben einer Textzeile.
              // Die Marke gehört zur Kennung leitachse (Register v4, K-008): data-motion am Behälter, nicht an der Marke selbst
              // (sie ist im Grundzustand unsichtbar; ohne eigene Regel daran, wie am Kantenkreuz oben; UM-E4-CHOR-FIX)
              <div className={clsx('abschnitt-inhalt relative', kopfInhalt && 'mt-12')}>
                <div aria-hidden="true" data-motion="leitachse" className={clsx('leitfaden-bahn z-10', ACHSE_VOR_SATZ)}>
                  <span className="leitfaden-marke max-md:hidden">
                    <span data-leitachse="" className="absolute bottom-0 left-0 size-3 translate-y-1/2">
                      <Fugenkreuz className="absolute inset-0 size-full" />
                    </span>
                  </span>
                </div>
                <div data-motion={auftritt ? 'auftritt' : undefined}>{inhalt}</div>
              </div>
            ) : (
              <div className={clsx(kopfInhalt && 'mt-12')} data-motion={auftritt ? 'auftritt' : undefined}>{inhalt}</div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
