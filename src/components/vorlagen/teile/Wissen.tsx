// Vorlagen · 3 Was wir tun auf Wissensseiten (KERN v3 K-009, K-011; E-025; K-016 „Ruhe“): ruhig erklärend, Block für
// Block. Je Block eine Überschrift (H2, eigener Abschnitt an der Laserlinie, Kopf mittig über dem Inhalt statt seitlich:
// sonst stünden Text links und Zeichnung rechts zugleich, Abnahme E3-BAU-05) und wahlweise ein Absatz, Karten (Arten oder
// Möglichkeiten nebeneinander an der Fuge), eine Liste als Fliesen, eine Tabelle (Baustein Tabelle), eine ruhige Zeichnung,
// die die Seite liefert, und Zeilen mit Link (`wege`). Alle Blöcke gehören zum Teil „Was wir tun“ der Seitenformel
// (data-formel="tun"). Jeder Block ist ein Abschnitt auf Kalk mit eigenem Kopf: Im Leitfaden (UM-E4-VORL) steht der Kopf der
// Leitachse neben seinem Inhalt, neben Karten tritt er zurück. Serverkomponente.
import type { ReactNode } from 'react';
import Abschnitt from '@/components/kern/Abschnitt';
import Tabelle from '@/components/kern/Tabelle';
import Textmarken from '@/components/kern/Textmarken';
import type { Wissensblock } from '../inhalt';
import { Bereichszeilen, Punktfliesen } from './Tun';

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

export function Block({ block, nummer, zeichnung }: { block: Wissensblock; nummer: number; zeichnung?: ReactNode }) {
  return (
    <Abschnitt id={`wissen-${nummer}`} formel="tun" leitachse spaet mitte titel={block.titel} einleitung={block.absatz ? <p><Textmarken text={block.absatz} /></p> : undefined}>
      <div className="flex flex-col gap-12">
        {block.karten && block.karten.length > 0 && <Karten karten={block.karten} />}
        {block.liste && block.liste.length > 0 && <Punktfliesen punkte={block.liste.map((p) => <Textmarken key={p} text={p} />)} />}
        {block.tabelle && <Tabelle name={block.tabelle.name} kopf={block.tabelle.kopf} zeilen={block.tabelle.zeilen} />}
        {zeichnung}
        {block.wege && block.wege.length > 0 && (
          <div className="mx-auto w-full max-w-mass">
            <Bereichszeilen bereiche={block.wege} />
          </div>
        )}
      </div>
    </Abschnitt>
  );
}

export default function Wissen({ bloecke, zeichnungen }: { bloecke: Wissensblock[]; zeichnungen?: Record<string, ReactNode> }) {
  return (
    <>
      {bloecke.map((b, i) => (
        <Block key={b.titel} block={b} nummer={i + 1} zeichnung={b.zeichnung ? zeichnungen?.[b.zeichnung] : undefined} />
      ))}
    </>
  );
}
