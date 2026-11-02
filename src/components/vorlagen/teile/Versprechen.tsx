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
// Garantie-Prüfung unverändert; der Inhalt steht vollständig im DOM (EP3), lesbarkeit.mjs öffnet vor dem Lesen.
// Satzspiegel (UM-E4-SICHT-FIX M-B1): Das Band bleibt mittig (Satz `mitte`, abweichend vom Plan „Versprechen rechts“, V-17):
// Geschlossen trägt es nur Kopf und eine Zeile; rechts gesetzt folgte im selben Bildschirm der Schritt mit mittigem Kopf und
// dem Formularblock links (drei Achsen an einem Übergang), und geöffnet stünden zwei Spalten in zwei Dritteln der Breite zu schmal
// (t1024: 205 px Text; Prüfung SF-B2).
// Drei Punkte offen (UM-E4-SICHT-FIX-2 M2-A3, E-113; Sicht Anlauf 2 auf sechs Ansichten: großer Kopf über einer zugeklappten Zeile,
// der Abschnitt wirkte wie ein Platzhalter): Mit `offen` (Nummern der Punkte in der Quellfolge, je Ansicht gewählt: nichts, was die
// Seite sichtbar schon sagt; höchstens drei) stehen diese Punkte offen als Fugenreihe, ab lg drei Spalten über die volle Breite
// ohne Kasten und ohne Fläche, getrennt durch senkrechte 1-px-Fugen, mit Fuge oben und unten; darunter Fugenzeilen untereinander.
// Titel als H3 in fs-4 halbfett, Satz in fs-3, ohne Nummer. So steht die Reihe anders gebaut da als die Nachbarabschnitte auf der
// Achse. Direkt
// darunter der Aufklapper „Weitere {n} Punkte zeigen“ (Zahl aus den Daten, Mikrotext) über die volle Breite, die Fuge unter der
// Reihe ist seine obere Kante; darin die übrigen Punkte in Quellfolge ohne Mono-Nummern (sie zählten sonst 01 bis 05 neu), ab lg in
// zwei Spalten (`satzSpalten`, ein ungerader letzter über beide). Reihe und Aufklapper stehen in einer Hülle mit genau einer Pause
// „ganz“ für die Abschnittsmarke (bewegung.css erlaubt höchstens eine je Abschnitt). Fachwörter werden in der Anzeigefolge
// erklärt (offene zuerst), jedes beim ersten sichtbaren Vorkommen. PUNKTE, ANPASSUNG, Garantie-Prüfung und Wortlaut bleiben; nur
// die Anzeigefolge ändert sich. Ohne `offen` wie bisher. Serverkomponente.
import type { ReactNode } from 'react';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { istGlossarId, type GlossarId } from '@/config/glossar';
import { zerlege } from '@/lib/textmarken';
import Abschnitt, { satzSpalten } from '@/components/kern/Abschnitt';
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
    titel: 'Abgestimmter Bauzeitenplan',
    text: 'Wir stimmen Baustart und Fertigstellung mit Ihnen ab, damit Ihr Alltag planbar bleibt.',
    grund: 'M-07: abgestimmt statt „Feste Zusagen für Baustart und Fertigstellung“, Titel ohne „Termintreue“ (SEO-Runde, Gegenprüfung); K-011 ohne Gedankenstrich',
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

/** höchstens so viele Punkte offen, wie die Reihe Spalten hat (M2-A3: drei; Prüfung SF2-A2: mit vier und mehr stand die Reihe in
 *  zwei Spalten mit Fuge und Einzug am äußeren Rand der zweiten Zeile und ohne Fuge zwischen den Zeilen) */
const OFFEN_HOECHSTENS = 3;

/** Prüft die Auswahl `offen` (ein bis drei Nummern 1 bis 8 der Quellfolge, ohne Doppel) beim Bau, statt still Punkte wegzulassen
 *  oder eine Reihe zu bauen, für die es keine Form gibt */
function auswahl(offen: number[]): number[] {
  const ok = offen.length <= OFFEN_HOECHSTENS && new Set(offen).size === offen.length && offen.every((n) => Number.isInteger(n) && n >= 1 && n <= PUNKTE.length);
  if (!ok) throw new Error(`Qualitätsversprechen: Auswahl offen [${offen.join(', ')}] ungültig (höchstens ${OFFEN_HOECHSTENS} Nummern 1 bis ${PUNKTE.length}, ohne Doppel).`);
  return offen.map((n) => n - 1);
}

/** Punkt in der Anzeige: Titel und Satz als Knoten (Fachwörter schon nach der Anzeigefolge erklärt) */
type Angezeigt = { titel: string; text: ReactNode[] };

/** Titel und Satz eines Punkts ohne Nummer (Reihe und Zeilen im Aufklapper, M2-A3) */
function Punktinhalt({ p }: { p: Angezeigt }) {
  return (
    <>
      <h3 className="font-text text-fs-4 font-semibold text-tinte">{zusammen(mitTitelFugen(p.titel))}</h3>
      <p className="mt-2 font-text text-fs-3 text-pretty text-tinte-2">{p.text}</p>
    </>
  );
}

export interface VersprechenProps {
  /** Inhalt der Seite vor diesem Abschnitt (Texte mit Textmarken), daraus die schon erklärten Fachwörter */
  vorher: unknown[];
  /** dazu Fachwörter, die ein Abschnitt außerhalb des Inhalts erklärt */
  erklaert?: GlossarId[];
  /** Nummern der Punkte (1 bis 8, Quellfolge), die offen als Fugenreihe stehen (`VersprechenInhalt.offen`, M2-A3); ohne Angabe
   *  alle im Aufklapper wie bisher. Höchstens drei (eine Zeile der Reihe), sonst bricht der Bau ab */
  offen?: number[];
}

/** Drei (allgemein: ein bis drei gewählte, `auswahl`) Punkte offen als Fugenreihe, die übrigen im Aufklapper (M2-A3). Reihe: ab lg
 *  eine Zeile aus so vielen Spalten, wie Punkte offen sind (einer über die volle Breite), mit senkrechten Fugen (je Zelle links,
 *  außer der ersten), Fuge oben und unten; darunter Fugenzeilen (je Zelle oben, außer der ersten). Eine Pause „ganz“ für Reihe und
 *  Aufklapper: nie ein Kreuz neben einer H3 */
function OffenUndMehr({ reihe, rest }: { reihe: Angezeigt[]; rest: Angezeigt[] }) {
  const spalten = satzSpalten(rest.length);
  return (
    <div data-kopf-pause="ganz">
      <ul className={clsx('grid border-y border-fuge', reihe.length === 3 ? 'lg:grid-cols-3' : reihe.length > 1 && 'lg:grid-cols-2')}>
        {reihe.map((p, i) => (
          <li key={p.titel} className={clsx('py-6 lg:py-8', i > 0 && 'border-t border-fuge lg:border-t-0 lg:border-l lg:pl-12', i < reihe.length - 1 && 'lg:pr-12')}>
            <Punktinhalt p={p} />
          </li>
        ))}
      </ul>
      {/* die Fuge unter der Reihe ist die obere Kante der Zeile; die übrigen Punkte ab lg in zwei Spalten, je mit Fuge unten */}
      <Aufklapper zeile={`Weitere ${rest.length} Punkte zeigen`} zeileKlassen="border-b border-fuge">
        <div className="@container">
          <ul className={spalten.liste}>
            {rest.map((p, i) => (
              <li key={p.titel} className={clsx('border-b border-fuge py-6', i === rest.length - 1 && spalten.letzte)}>
                <Punktinhalt p={p} />
              </li>
            ))}
          </ul>
        </div>
      </Aufklapper>
    </div>
  );
}

/** alle Punkte nummeriert im Aufklapper „Alle {n} Punkte zeigen“ (M-B4, ohne Auswahl `offen`) */
function AlleImAufklapper({ punkte }: { punkte: Angezeigt[] }) {
  return (
    // Punkte mit H3: Daneben tritt der Kopf des Leitfadens auf der ganzen Höhe der Liste zurück (data-kopf-pause="ganz",
    // bewegung.css „Leitfaden mit Abschnittsmarke“: nie ein Kreuz neben einer H3)
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
  );
}

export default function Versprechen({ vorher, erklaert = [], offen }: VersprechenProps) {
  const bekannt = new Set<GlossarId>([...fachwoerterIn(vorher), ...erklaert]);
  // Anzeigefolge: mit Auswahl die offenen in der Folge der Auswahl, dann die übrigen in Quellfolge, sonst die Quellfolge. Die
  // Fachwörter werden in dieser Folge erklärt (marken im Rumpf, nicht in einer eigenen Komponente)
  const vorn = offen?.length ? auswahl(offen) : [];
  const folge = [...vorn, ...PUNKTE.map((_, i) => i).filter((i) => !vorn.includes(i))];
  const punkte: Angezeigt[] = folge.map((i) => ({ titel: PUNKTE[i].titel, text: marken(PUNKTE[i].text, bekannt) }));
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
      // dicht (M2-A9; vorher dieselben Stufen als Klassen): geschlossen trägt das Band nur Kopf und Zeile, sonst stand unter der
      // Zeile eine leere halbe Bandhöhe (Prüfung SF-B, Nacharbeit); mit offener Reihe ein dichter Rahmen vor dem Schritt
      dichte="dicht"
    >
      {vorn.length ? <OffenUndMehr reihe={punkte.slice(0, vorn.length)} rest={punkte.slice(vorn.length)} /> : <AlleImAufklapper punkte={punkte} />}
    </Abschnitt>
  );
}
