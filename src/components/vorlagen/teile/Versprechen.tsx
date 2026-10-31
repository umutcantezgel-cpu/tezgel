// Vorlagen · Qualitätsversprechen vor dem nächsten Schritt (UM-E4-EP3, KERN v4 K-003 Nr. 4, K-011, Anhang F; Rückführung aus E0
// nach UM-5): die acht Punkte aus `COMPANY_DATA.qualityPromises` (src/config/company.js, nur gelesen) als nummerierte Liste an
// der Fuge im Halbverband: ab md zwei Spalten, jeder zweite Punkt eine halbe Zeile tiefer (der Versatz dieses Bildschirms), die
// Nummer in Mono als Marke, kein Kasten. So steht das Versprechen anders da als die Fliesen in „Was wir tun“ und die Karten der
// Kundenstimmen davor. Fläche Kalk zwischen den Stimmen und dem nächsten Schritt (beide auf Fliese); Kopf mittig. Ohne Bewegung.
// Wortlaut: Titel und Satz der Quelle. Angepasst nur, wo der Kern es verlangt (Tabelle ANPASSUNG, je mit Grund):
// - Versprechen mit rechtlicher Bindung nur sinngleich und ohne Garantie, solange M-07 offen ist (Anhang F): kein „Garantierter
//   Staubschutz“, kein „verbindlich“, keine Zusage ohne Zusatzkosten oder mit festen Terminen;
// - K-011: „Termin vor Ort“ statt „Vor-Ort-Aufmaß“, „und“ statt „&“, kein Gedankenstrich, keine Bindestrichwörter, „(XXL)“
//   entfällt; Fachwörter im Satz mit Glossarerklärung beim ersten Vorkommen der Seite (die Titel sind Überschriften und erklären
//   nicht), kein Satz über 25 Wörter mit den Erklärungen.
// Ändert sich die Quelle, bricht der Bau ab (Abgleich der Titel), damit niemand eine Garantie ungeprüft übernimmt.
// Fachwörter: Was der Inhalt davor schon erklärt (Textmarken in `vorher`), steht hier ohne Erklärung; `erklaert` ergänzt, was ein
// Abschnitt außerhalb des Inhalts erklärt.
// Aufklapper (UM-E4-SICHT-FIX M-B4, E-104 Nr. 3): Die H2 bleibt sichtbar, die Liste steht in einem nativen details mit der Zeile
// „Alle {n} Punkte zeigen“ (Zahl aus den Daten). Geöffnet steht sie wie bisher in zwei Spalten, aber in einer Flucht: Der Versatz
// der rechten Spalte um 48 px las sich als Fehler (Sicht Anlauf 1, /standorte/wetzlar a5, b5). Wortlaut, ANPASSUNG und
// Garantie-Prüfung unverändert; der Inhalt steht vollständig im DOM (EP3), lesbarkeit.mjs öffnet vor dem Lesen. Serverkomponente.
import type { ReactNode } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { istGlossarId, type GlossarId } from '@/config/glossar';
import { zerlege } from '@/lib/textmarken';
import Abschnitt from '@/components/kern/Abschnitt';
import Fachwort from '@/components/kern/Fachwort';
import { zusammen } from '@/components/kern/zusammen';
import type { Markentext } from '../inhalt';
import Aufklapper from './Aufklapper';

/** Titel (Überschrift, ohne Textmarken: Überschriften erklären nicht) und Satz (Fließtext mit Textmarken) */
type Punkt = { titel: string; text: Markentext };

/** Anpassungen am Wortlaut der Quelle, in ihrer Reihenfolge: `quelle` ist ihr Titel (Abgleich), `titel` und `text` ersetzen
 *  Titel und Satz der Quelle (ohne Angabe bleibt ihr Wortlaut), `grund` steht in der Notiz UM-E4-INHALT-A */
const ANPASSUNG: ({ quelle: string; grund?: string } & Partial<Punkt>)[] = [
  {
    quelle: 'Kostenfreies Vor-Ort-Aufmaß & Schadensanalyse',
    titel: 'Kostenfreier Termin vor Ort und Schadensanalyse',
    text: 'Persönliche Begutachtung des [[untergrund|Untergrunds]], Restfeuchtemessung und fundierte technische Beratung direkt bei Ihnen.',
    grund: 'K-011: Termin vor Ort statt Vor-Ort-Aufmaß, und statt &; Glossar Untergrund',
  },
  {
    quelle: 'Millimetergenaue Großformatverlegung (XXL)',
    titel: 'Millimetergenaue Großformatverlegung',
    text: 'Spezialwerkzeuge, moderne Vakuumheber und exaktes [[nivelliersystem|Nivelliersystem]]. Für planebene Oberflächen ohne [[ueberzaehne|Überzähne]].',
    grund: 'K-011: (XXL) entfällt, Vakuumheber ohne Bindestrich; Glossar Nivelliersystem und Überzähne, dafür ein Punkt statt eines Satzes über 25 Wörter',
  },
  {
    quelle: 'Normgerechte Verbundabdichtung nach DIN 18534',
    text: 'Lückenlose Abdichtungsbahnen und [[dichtband|Dichtmanschetten]] in Nassräumen für dauerhafte Dichtigkeit und Schimmelschutz.',
    grund: 'Glossar Dichtmanschette (Wortlaut sonst unverändert)',
  },
  {
    quelle: 'Verbindliche Festpreis-Kalkulation',
    titel: 'Kalkulation mit festem Preis',
    text: 'Transparente Kostenaufstellung nach Quadratmetern und Arbeitsaufwand.',
    grund: 'M-07: ohne „verbindlich“ und ohne die Zusage „ohne unvorhergesehene Zusatzkosten“ (AGB § 2 Abs. 3); K-011 ohne Bindestrich',
  },
  {
    quelle: 'Verlässliche Termintreue & Bauzeitenplan',
    titel: 'Verlässliche Termintreue und Bauzeitenplan',
    text: 'Wir stimmen Baustart und Fertigstellung mit Ihnen ab, damit Ihr Alltag planbar bleibt.',
    grund: 'M-07: abgestimmt statt „Feste Zusagen für Baustart und Fertigstellung“; K-011 und statt &, ohne Gedankenstrich',
  },
  {
    quelle: 'Garantierter Staubschutz bei Sanierungen',
    titel: 'Staubschutz bei Sanierungen',
    grund: 'M-07: ohne „Garantierter“',
  },
  {
    quelle: 'Hochwertige Verlegewerkstoffe & Markenkleber',
    titel: 'Hochwertige Verlegewerkstoffe und Markenkleber',
    text: 'Ausschließliche Verwendung flexibler Fliesenkleber der Klasse [[c2te-s1|C2TE\u00a0S1]] oder S2 und verfärbungsfreier Premiumfugenmassen.',
    grund: 'K-011: und statt &, Kleberklasse in der Schreibweise des Glossars mit Erklärung, Premiumfugenmassen ohne Bindestrich',
  },
  { quelle: 'Persönliche Betreuung durch Inhaber Deniz Tezgel' },
];

/** Wörter, die ohne Antwort auf M-07 nicht erscheinen dürfen (Prüfung beim Bau, auch für die Werte auf /ueber-uns): Garantie,
 *  „verbindlich“, Festpreis als Zusage, Zusagen ohne Zusatzkosten oder Aufschläge, feste Zusagen. Sinngleich bleibt „mit festem
 *  Preis“ (E-027) */
export const GARANTIE = /garant|verbindlich|festpreis|zusatzkosten|aufschl[aä]g|feste zusage/i;

/** die acht Punkte in der Fassung der Seite (Abgleich mit der Quelle beim Bau) */
export const PUNKTE: Punkt[] = COMPANY_DATA.qualityPromises.map((quelle: { title: string; description: string }, i: number) => {
  const a = ANPASSUNG[i];
  if (!a || a.quelle !== quelle.title || COMPANY_DATA.qualityPromises.length !== ANPASSUNG.length) {
    throw new Error(`Qualitätsversprechen: Quelle geändert bei Punkt ${i + 1} („${quelle.title}“). Anpassung und M-07 prüfen.`);
  }
  const punkt = { titel: a.titel ?? quelle.title, text: a.text ?? quelle.description };
  if (GARANTIE.test(`${punkt.titel} ${punkt.text}`)) throw new Error(`Qualitätsversprechen: Garantie-Wort in Punkt ${i + 1} (M-07 offen).`);
  return punkt;
});

// Trennfugen der langen Wörter in den Titeln (nur Anzeige, wie FUGEN in kern/zusammen): Die H3 trennen nur an der Fuge, nie
// mitten im Wortteil („Verbundab-dichtung“ mit hyphens-auto, Nacharbeit); bei 200 % Schrift liefen sie ohne Trennung über den Rand
const TITEL_FUGEN: Record<string, string> = {
  Schadensanalyse: 'Schadens\u00adanalyse',
  Millimetergenaue: 'Millimeter\u00adgenaue',
  Großformatverlegung: 'Großformat\u00adverlegung',
  Normgerechte: 'Norm\u00adgerechte',
  Verbundabdichtung: 'Verbund\u00adabdichtung',
  Bauzeitenplan: 'Bauzeiten\u00adplan',
  Verlegewerkstoffe: 'Verlege\u00adwerkstoffe',
  Markenkleber: 'Marken\u00adkleber',
};
const mitTitelFugen = (titel: string) => titel.replace(/\p{L}+/gu, (wort) => TITEL_FUGEN[wort] ?? wort);

const MARKE = /\[\[([^|\]]+)\|/g;

/** Glossarkennungen, die in den Texten (beliebig tief verschachtelt) als Textmarke vorkommen */
export function fachwoerterIn(quellen: unknown[]): Set<GlossarId> {
  const ids = new Set<GlossarId>();
  for (const m of JSON.stringify(quellen).matchAll(MARKE)) {
    const id = m[1].trim();
    if (istGlossarId(id)) ids.add(id);
  }
  return ids;
}

/** Text mit Textmarken als Knoten; schon erklärte Fachwörter stehen ohne Erklärung, ein neues wird beim ersten Vorkommen
 *  erklärt und gilt danach als bekannt. Als Funktion im Rumpf der Komponente aufgerufen (nicht als eigene Komponente), damit
 *  die Reihenfolge der Punkte die Reihenfolge der Erklärungen festlegt */
function marken(text: Markentext, bekannt: Set<GlossarId>): ReactNode[] {
  return zerlege(text).map((s, i) => {
    if (s.art === 'text') return s.text;
    const neu = !bekannt.has(s.id);
    bekannt.add(s.id);
    return (
      <Fachwort key={i} id={s.id} erklaert={neu}>
        {s.wort}
      </Fachwort>
    );
  });
}

export interface VersprechenProps {
  /** Inhalt der Seite vor diesem Abschnitt (Texte mit Textmarken), daraus die schon erklärten Fachwörter */
  vorher: unknown[];
  /** dazu Fachwörter, die ein Abschnitt außerhalb des Inhalts erklärt */
  erklaert?: GlossarId[];
}

export default function Versprechen({ vorher, erklaert = [] }: VersprechenProps) {
  const bekannt = new Set<GlossarId>([...fachwoerterIn(vorher), ...erklaert]);
  const punkte = PUNKTE.map((p) => ({ titel: p.titel, text: marken(p.text, bekannt) }));
  return (
    // Kennungen wie im Bestand (E0 `QualityPromise`: Abschnitt `qualitaet`, Überschrift `quality-promise-heading`). Trennfuge im
    // langen Wort der Überschrift (Überschriften trennen nur dort; bei 200 % Schrift lief es sonst über den Rand)
    <Abschnitt
      id="qualitaet"
      titelId="quality-promise-heading"
      formel="beleg"
      leitachse
      spaet
      mitte
      titel={'Unser Qualitäts\u00adversprechen in acht Punkten.'}
      // geschlossen trägt das Band nur Kopf und Zeile: eine Stufe weniger über und unter ihm (wie „Was wir tun“ mit
      // Leistungszeilen), sonst stand unter der Zeile eine leere halbe Bandhöhe (Prüfung SF-B, Nacharbeit)
      className="pt-12 pb-12 lg:pt-16 lg:pb-16"
    >
      {/* Punkte mit H3: Daneben tritt der Kopf des Leitfadens auf der ganzen Höhe der Liste zurück (data-kopf-pause="ganz",
          bewegung.css „Leitfaden mit Abschnittsmarke“: nie ein Kreuz neben einer H3) */}
      <Aufklapper zeile={`Alle ${punkte.length} Punkte zeigen`} zeileKlassen="mx-auto max-w-mass border-y border-fuge">
      <ol data-kopf-pause="ganz" className="mt-8 grid grid-cols-1 md:grid-cols-2 md:gap-x-12 lg:gap-x-24">
        {punkte.map((p, i) => (
          <li
            key={i}
            className="flex gap-4 border-t border-fuge py-6 last:border-b md:gap-6 md:nth-last-2:border-b"
          >
            <span aria-hidden="true" className="w-8 shrink-0 font-mono text-fs-2 text-tinte-2">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div className="min-w-0 flex-1">
              {/* Titel trennen nur an den Fugen aus TITEL_FUGEN (lange Wörter wie „Großformatverlegung“ liefen bei 200 % Schrift
                  über den Rand) */}
              <h3 className="font-text text-fs-3 font-semibold text-tinte">{zusammen(mitTitelFugen(p.titel))}</h3>
              <p className="mt-2 font-text text-fs-2 text-pretty text-tinte-2">
                {p.text}
              </p>
            </div>
          </li>
        ))}
      </ol>
      </Aufklapper>
    </Abschnitt>
  );
}
