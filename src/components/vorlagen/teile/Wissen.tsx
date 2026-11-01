// Vorlagen · 3 Was wir tun auf Wissensseiten (KERN v3 K-009, K-011; E-025; K-016 „Ruhe“): ruhig erklärend, Block für
// Block. Je Block eine Überschrift (H2, eigener Abschnitt an der Laserlinie, Kopf mittig über dem Inhalt statt seitlich:
// sonst stünden Text links und Zeichnung rechts zugleich, Abnahme E3-BAU-05) und wahlweise ein Absatz, Karten (Arten oder
// Möglichkeiten nebeneinander an der Fuge), eine Liste als Fliesen, eine Tabelle (Baustein Tabelle), eine ruhige Zeichnung,
// die die Seite liefert, und Zeilen mit Link (`wege`). Alle Blöcke gehören zum Teil „Was wir tun“ der Seitenformel
// (data-formel="tun"). Jeder Block ist ein Abschnitt auf Kalk mit eigenem Kopf: Im Leitfaden (UM-E4-VORL) steht der Kopf der
// Leitachse neben seinem Inhalt, neben Karten tritt er zurück.
// Listen an der Fuge (UM-E4-SICHT-FIX M-B2): Punkte als Liste an der Fuge wie in „Was wir tun“ (Punktliste, seit UM-E4-SICHT-FIX-2
// M2-A7 ohne Mono-Nummern), Wege als ruhige Zeilen. Satzspiegel v2 (UM-E4-SICHT-FIX-2 M2-A1, K-003 „Fläche“; vorher links an der Laserlinie, M-B1): je Block `satz` aus
// dem Inhalt, Standard `achse`: Liste (Punkte) und Tabelle einspaltig im Block auf der Kopfachse (zwei Drittel ab lg), die lange
// Einleitung im selben Block darüber, Wege ab drei Einträgen voll breit in Spalten (`satzSpalten`). Ein Block mit großem Moment
// der Seite (`zeichnung`, z. B. Verband-Wähler, Artikelliste) steht breit wie bisher. Kein Wechsel nach Index: Ein Wechsel
// gehört nur dorthin, wo ein Block mindestens eine Bildschirmhöhe trägt, und steht dann im Inhalt.
// Wege als Fugenfeld (`wegeForm: 'reihe'`, UM-E4-SICHT-FIX-2 M2-A6, für /fliesen M2-C4): ab lg drei Wege je Reihe, nur durch
// 1-px-Fugen getrennt, ohne Füllung, ohne Rahmen je Zelle (keine Textkarten); eine unvollständige letzte Reihe steht mittig im
// Halbverband (fünf Wege: 3 + 2), je Zelle Name, Satz und Pfeil; darunter Zeilen wie die Wege. Ohne Angabe unverändert.
// Serverkomponente.
import type { ReactNode } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import Abschnitt, { Satzblock, satzBlock, type Satz } from '@/components/kern/Abschnitt';
import { langeEinleitung } from '@/components/kern/einleitung';
import Tabelle from '@/components/kern/Tabelle';
import Textmarken from '@/components/kern/Textmarken';
import type { Wissensblock, Zeile } from '../inhalt';
import { Bereichszeilen, Punktliste } from './Tun';

// Karten auf Fliese mit H3: Daneben tritt der Kopf des Leitfadens auf ihrer ganzen Höhe zurück (data-kopf-pause="ganz",
// bewegung.css „Leitfaden mit Abschnittsmarke“, wie das Kartenraster der Leistungen; UM-E4-VORL): nie ein Kreuz neben einer H3.
// Höchstens eine Pause „ganz“ je Abschnitt: Ein Block mit Karten trägt keine Zeichnung mit eigener Pause (z. B. BlogFilter).
// Zurzeit nutzt kein Inhalt Karten; geprüft mit einem vorübergehenden Schaufenster (Notiz UM-E4-VORL).
function Karten({ karten }: { karten: NonNullable<Wissensblock['karten']> }) {
  return (
    <ul data-kopf-pause="ganz" className="@container grid gap-px border border-fuge bg-fuge md:grid-cols-3">
      {karten.map((k) => (
        <li key={k.kopf} className="bg-fliese p-4 @xs:p-6">
          <h3 className="font-anzeige text-fs-5 font-extrabold text-tinte hyphens-none">{k.kopf}</h3>
          <p className="mt-3 font-text text-fs-3 text-tinte-2">
            <Textmarken text={k.satz} />
          </p>
        </li>
      ))}
    </ul>
  );
}

/** Wege als Fugenfeld (M2-A6): unter lg Zeilen an der Fuge (Liste mit Fuge oben, jede Zeile mit Fuge unten), ab lg und 32 rem
 *  Breite (Container-Abfrage) ein Raster aus sechs Spalten mit drei Zellen je Reihe. Senkrechte Fugen nur zwischen Nachbarn,
 *  keine äußeren; jede Zelle trägt ihre Fuge unten. Die Zellen einer unvollständigen letzten Reihe rücken um eine halbe Zelle ein
 *  (Halbverband: zwei ab Spalte 2, eine ab Spalte 3), ihre Fuge unten reicht nur unter ihnen. Zeilenweise: DOM-Folge =
 *  Lesefolge. Ohne Bild je Zelle (Name, Satz und Pfeil); ab lg steht der Text oben in der Zelle (gleiche Oberkante je Reihe). */
function Wegefeld({ wege }: { wege: Zeile[] }) {
  const rest = wege.length % 3;
  const ersterRest = rest ? wege.length - rest : -1;
  return (
    <div className="@container">
      <ul className="border-t border-fuge lg:@lg:grid lg:@lg:grid-cols-6">
        {wege.map((w, i) => (
          <li
            key={w.href}
            className={clsx(
              'border-b border-fuge lg:@lg:col-span-2',
              // senkrechte Fuge links an jeder Zelle, die einen linken Nachbarn hat
              (ersterRest > -1 && i >= ersterRest ? i > ersterRest : i % 3 > 0) && 'lg:@lg:border-l',
              i === ersterRest && (rest === 2 ? 'lg:@lg:col-start-2' : 'lg:@lg:col-start-3'),
            )}
          >
            <Link href={w.href} data-motion="zustand" className="group flex h-full min-h-16 items-center gap-4 py-4 text-tinte lg:@lg:items-start lg:@lg:gap-6 lg:@lg:p-6">
              <span className="min-w-0 flex-1">
                <span className="block font-text text-fs-4 font-semibold text-pretty hyphens-none underline decoration-transparent decoration-2 underline-offset-8 transition-colors dauer-1 group-hover:decoration-laser">
                  {w.name}
                </span>
                {w.satz && (
                  <span className="mt-2 block font-text text-fs-3 text-tinte-2">
                    <Textmarken text={w.satz} />
                  </span>
                )}
              </span>
              {/* ab lg oben in der Zelle, auf der Höhe des Namens: die Zellen einer Reihe sind gleich hoch, ihre Texte verschieden lang */}
              <Icon name="pfeil-rechts" groesse={6} className="shrink-0 text-tinte-2 transition-colors dauer-1 group-hover:text-tinte lg:@lg:mt-1" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** `aufFliese`: der Block steht direkt nach dem Einstieg an der Stelle der Lage auf Fliese, mit derselben kleineren Stufe
 *  darüber wie sie (`wissenVorLage`, M-B7) */
export function Block({ block, nummer, zeichnung, aufFliese = false }: { block: Wissensblock; nummer: number; zeichnung?: ReactNode; aufFliese?: boolean }) {
  const satz: Satz = block.satz ?? (zeichnung ? 'breit' : 'achse');
  // Satzspiegel v2 (M2-A1): Der Abschnitt steht breit, jeder Teil trägt seinen Satz (Liste und Tabelle auf der Achse, Wege voll
  // breit); die lange Einleitung im Block auf der Achse über dem Inhalt
  const achse = satz === 'achse';
  const wege = block.wege ?? [];
  const wegeTeil =
    wege.length === 0 ? null : block.wegeForm === 'reihe' ? (
      <Wegefeld wege={wege} />
    ) : achse && wege.length >= 3 ? (
      <Bereichszeilen bereiche={wege} spalten />
    ) : achse ? (
      <Satzblock satz="achse">
        <Bereichszeilen bereiche={wege} className={satzBlock('achse')} />
      </Satzblock>
    ) : (
      <Bereichszeilen bereiche={wege} className={`w-full ${satzBlock(satz)}`} />
    );
  const liste = block.liste && block.liste.length > 0 && <Punktliste punkte={block.liste.map((p) => <Textmarken key={p} text={p} />)} className={`w-full ${satzBlock(satz)}`} />;
  const tabelle = block.tabelle && <Tabelle name={block.tabelle.name} kopf={block.tabelle.kopf} zeilen={block.tabelle.zeilen} />;
  return (
    <Abschnitt
      id={`wissen-${nummer}`}
      formel="tun"
      leitachse
      spaet
      mitte
      flaeche={aufFliese ? 'fliese' : 'kalk'}
      satz={achse ? 'breit' : satz}
      einleitungSatz={achse ? 'achse' : undefined}
      className={aufFliese ? 'lg:pt-16' : undefined}
      titel={block.titel}
      einleitung={block.absatz ? <p><Textmarken text={block.absatz} /></p> : undefined}
      einleitungLang={langeEinleitung(block.absatz)}
    >
      <div className="flex flex-col gap-12">
        {block.karten && block.karten.length > 0 && <Karten karten={block.karten} />}
        {liste && (achse ? <Satzblock satz="achse">{liste}</Satzblock> : liste)}
        {tabelle && (achse ? <Satzblock satz="achse">{tabelle}</Satzblock> : tabelle)}
        {zeichnung}
        {wegeTeil}
      </div>
    </Abschnitt>
  );
}

/** `ersterAufFliese`: der erste Block trägt die Fliese der Lage (WissensSeite mit `wissenVorLage`, M-B7) */
export default function Wissen({ bloecke, zeichnungen, ersterAufFliese = false }: { bloecke: Wissensblock[]; zeichnungen?: Record<string, ReactNode>; ersterAufFliese?: boolean }) {
  return (
    <>
      {bloecke.map((b, i) => (
        <Block key={b.titel} block={b} nummer={i + 1} zeichnung={b.zeichnung ? zeichnungen?.[b.zeichnung] : undefined} aufFliese={ersterAufFliese && i === 0} />
      ))}
    </>
  );
}
