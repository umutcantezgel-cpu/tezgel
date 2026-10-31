// Vorlagen · 3 Was wir tun auf Wissensseiten (KERN v3 K-009, K-011; E-025; K-016 „Ruhe“): ruhig erklärend, Block für
// Block. Je Block eine Überschrift (H2, eigener Abschnitt an der Laserlinie, Kopf mittig über dem Inhalt statt seitlich:
// sonst stünden Text links und Zeichnung rechts zugleich, Abnahme E3-BAU-05) und wahlweise ein Absatz, Karten (Arten oder
// Möglichkeiten nebeneinander an der Fuge), eine Liste als Fliesen, eine Tabelle (Baustein Tabelle), eine ruhige Zeichnung,
// die die Seite liefert, und Zeilen mit Link (`wege`). Alle Blöcke gehören zum Teil „Was wir tun“ der Seitenformel
// (data-formel="tun"). Jeder Block ist ein Abschnitt auf Kalk mit eigenem Kopf: Im Leitfaden (UM-E4-VORL) steht der Kopf der
// Leitachse neben seinem Inhalt, neben Karten tritt er zurück.
// Listen an der Fuge (UM-E4-SICHT-FIX M-B2): Punkte als nummerierte Liste wie in „Was wir tun“ (Punktliste), Wege als ruhige
// Zeilen. Satzspiegel (M-B1): je Block `satz` aus dem Inhalt, Standard links (Spalten 1 bis 2 an der Laserlinie); ein Block mit
// großem Moment der Seite (`zeichnung`, z. B. Verband-Wähler, Artikelliste) steht breit. Kein Wechsel nach Index: Ein Wechsel
// gehört nur dorthin, wo ein Block mindestens eine Bildschirmhöhe trägt, und steht dann im Inhalt. Serverkomponente.
import type { ReactNode } from 'react';
import Abschnitt, { satzBlock, type Satz } from '@/components/kern/Abschnitt';
import { langeEinleitung } from '@/components/kern/einleitung';
import Tabelle from '@/components/kern/Tabelle';
import Textmarken from '@/components/kern/Textmarken';
import type { Wissensblock } from '../inhalt';
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

/** `aufFliese`: der Block steht direkt nach dem Einstieg an der Stelle der Lage auf Fliese, mit derselben kleineren Stufe
 *  darüber wie sie (`wissenVorLage`, M-B7) */
export function Block({ block, nummer, zeichnung, aufFliese = false }: { block: Wissensblock; nummer: number; zeichnung?: ReactNode; aufFliese?: boolean }) {
  const satz: Satz = block.satz ?? (zeichnung ? 'breit' : 'links');
  return (
    <Abschnitt
      id={`wissen-${nummer}`}
      formel="tun"
      leitachse
      spaet
      mitte
      flaeche={aufFliese ? 'fliese' : 'kalk'}
      satz={satz}
      className={aufFliese ? 'lg:pt-16' : undefined}
      titel={block.titel}
      einleitung={block.absatz ? <p><Textmarken text={block.absatz} /></p> : undefined}
      einleitungLang={langeEinleitung(block.absatz)}
    >
      <div className="flex flex-col gap-12">
        {block.karten && block.karten.length > 0 && <Karten karten={block.karten} />}
        {block.liste && block.liste.length > 0 && <Punktliste punkte={block.liste.map((p) => <Textmarken key={p} text={p} />)} className={`w-full ${satzBlock(satz)}`} />}
        {block.tabelle && <Tabelle name={block.tabelle.name} kopf={block.tabelle.kopf} zeilen={block.tabelle.zeilen} />}
        {zeichnung}
        {block.wege && block.wege.length > 0 && <Bereichszeilen bereiche={block.wege} className={`w-full ${satzBlock(satz)}`} />}
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
