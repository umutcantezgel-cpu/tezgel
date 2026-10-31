// Inhalt der Ortsseiten `/standorte/[stadt]` (Muster `_werkstatt/texte/REF-ort-wetzlar.md`, E-024): Die 13 Ortsseiten
// unterscheiden sich nur durch echte Angaben aus `src/config/cities.ts` (Name, Landkreis) und die Entfernung ab dem
// Firmensitz Aßlar (`CITY_HUB_DATA`, dieselbe Quelle wie Startseite und Karte, M-17). Keine erfundenen Projekte im Ort,
// keine Projektorte an Fotos (K-015). Reine Funktion; Längen von Titel und Beschreibung prüft `test/orte.test.mjs`.
// Einstieg mit Foto (UM-E4-SICHT-FIX M-C6 Nr. 1): ein Aufmacher aus der kurzen hellen Auswahl (Helligkeit ≥ 0,45 und
// Schärfe ≥ 0,10 laut _werkstatt/bildinventar.csv), nicht Aufmacher oder erstes Galeriefoto einer Hauptansicht (verglichen
// nach Originalnummer), nicht in der Fotoreihe derselben Seite, ohne Ortsetikett (Alt-Text aus ARBEITEN).
// Fotoreihe hellste zuerst (M-C6 Nr. 4), „Das machen wir in …“ mittig mit Plan-Vignetten statt Verlegemustern (Nr. 3).
import type { CityData } from '@/config/cities';
import type { ArbeitId } from '@/config/arbeiten';
import type { ErzaehlInhalt, Zeile } from '@/components/vorlagen/inhalt';
import { GALERIE_START } from './galerie';

/** Aufmacher aller 13 Ortsseiten: die Dusche (IMG_2553, auf / nur weiter hinten im Beleg). Er wird nach der sichtbaren Arbeit
 *  gewählt, nicht nur nach Helligkeit und Schärfe (Nacharbeit SF-C1): Die Terrasse in Erdtönen (balkon-beleg-3) zeigt im ersten
 *  Bildschirm Ablaufrost und Laub, die blaugraue Terrasse (start-beleg-terrasse) Hauswand und Dachunterseite, ihre Fliesen
 *  liegen unter der Falz. Im Feld 4 : 5 zeigt nur die Dusche die Fliesenarbeit über die ganze Höhe. */
const AUFMACHER: ArbeitId = 'start-beleg-dusche';

/** Fotos der Reihe nach Helligkeit (bildinventar.csv, hellste zuerst): das dunkle Gäste-WC und die dunkle Wanne stehen nie vorn */
const NACH_HELLIGKEIT: ArbeitId[] = ['start-galerie-5', 'ort-terrasse-erdtoene', 'start-galerie-3', 'start-galerie-1', 'ort-gaeste-wc', 'start-beleg-bad'];
const helligkeitsRang = (bild: ArbeitId) => {
  const rang = NACH_HELLIGKEIT.indexOf(bild);
  return rang === -1 ? NACH_HELLIGKEIT.length : rang;
};

/** Stimmen allgemeinen Inhalts (ohne Ortsbezug), je Ort eine, fest nach Reihenfolge der Orte */
const STIMMEN = ['c-wolf', 'rabia-oe', 'ute-t', 'peter-p', 'sara-j', 'k-d', 'thorsten-a', 'christian-s', 'elke-s', 'hasan-oe'];

/** Titel höchstens 58 Zeichen (Test titleLength): lange Ortsnamen in der kurzen Form */
const KURZNAME: Record<string, string> = { limburg: 'Limburg', friedberg: 'Friedberg' };

export interface Ortsinhalt extends ErzaehlInhalt {
  stadt: string;
}

export function ortsInhalt(stadt: CityData, kmAbSitz: number, index: number): Ortsinhalt {
  const name = stadt.name;
  const kurz = KURZNAME[stadt.slug] ?? name;
  const ort =
    kmAbSitz === 0
      ? 'Fliesenverlegung Tezgel hat seinen Sitz in Aßlar.'
      : stadt.slug === 'wetzlar'
        ? 'Fliesenverlegung Tezgel aus Aßlar, direkt neben Wetzlar.'
        : `Fliesenverlegung Tezgel aus Aßlar, etwa ${kmAbSitz}\u00a0km bis ${name}.`;
  const leistungen: Zeile[] = [
    { name: 'Badsanierung und Dusche', href: `/leistungen/bad/${stadt.slug}`, vignette: 'bad' },
    { name: 'Böden und Wände', href: `/leistungen/wohnen/${stadt.slug}`, vignette: 'wohnen' },
    { name: 'Balkon und Terrasse', href: `/leistungen/aussen/${stadt.slug}`, vignette: 'aussen' },
    { name: 'Untergrund und Abdichtung', href: `/leistungen/untergrund/${stadt.slug}`, vignette: 'untergrund' },
  ];
  // gerader Index: Plätze 0, 2, 4 der Galerie; ungerader Index: 1, 3, 5. Danach hellste zuerst
  const fotos = [0, 1, 2]
    .map((k) => GALERIE_START[(index * 2 + k * 2 + (index % 2)) % GALERIE_START.length])
    .sort((a, b) => helligkeitsRang(a.bild) - helligkeitsRang(b.bild));
  return {
    pfad: `/standorte/${stadt.slug}`,
    stadt: name,
    meta: {
      titel: `Fliesenleger in ${kurz} | Fliesenverlegung Tezgel`,
      beschreibung: `Fliesenleger für ${name}: Wir erneuern Bäder, verlegen Böden und machen Balkone dicht. Der Termin bei Ihnen vor Ort ist kostenfrei.`,
    },
    worum: {
      brotkrumen: [{ name: 'Start', href: '/' }, { name: 'Wo wir arbeiten', href: '/standorte' }, { name }],
      titel: `Fliesenleger in ${name}`,
      ort,
      vorspann: `Wir machen Badsanierung und Fliesenverlegung in ${name}. Balkone machen wir dicht.`,
      bild: AUFMACHER,
    },
    lage: {
      // wie auf / (UM-E4-CHOR-FIX): Lage auf Fliese; so wechseln die Flächen ab dem Einstieg. Darin das Einzugsband als
      // Ortsmoment (OrtsSeite, M-C6 Nr. 2)
      aufFliese: true,
      titel: `Sie suchen einen Fliesenleger in ${name}?`,
      absaetze: [
        `Ja, wir arbeiten in ${name} und im ${stadt.region}.`,
        `Haben Sie ein altes Bad, einen neuen Boden oder einen Balkon, der nicht mehr dicht ist? Dann kommen wir zu Ihnen nach ${name} und sehen uns alles an.`,
      ],
    },
    tun: {
      // Kopf mittig, Zeilen breit (M-C6 Nr. 3; vorher an der Linie: Kopf links, Zeilen rechts, zwei Stränge)
      titel: `Das machen wir in ${name}.`,
      // Fachwörter in der Einleitung (erstes Vorkommen im Fließtext), die Linknamen der Zeilen bleiben schlicht
      einleitung:
        'Wir prüfen zuerst den [[untergrund|Untergrund]]. Im Bad und auf dem Balkon kommt eine [[abdichtung|Abdichtung]] nach [[din-18534|DIN 18534]] unter die Fliesen.',
      bereiche: leistungen,
    },
    ablauf: {
      titel: `So kommen Sie in ${name} zu Ihrem neuen Boden.`,
      schritte: [
        { titel: 'Termin bei Ihnen vor Ort', text: 'Deniz Tezgel kommt zu Ihnen. Er schaut sich den Raum genau an und prüft den Untergrund. Dieser Termin ist für Sie kostenfrei.' },
        { titel: 'Planen und auswählen', text: 'Sie suchen mit uns Fliesen, ihre Größe und die Farbe der Fugen aus. Danach bekommen Sie ein Angebot mit festem Preis.' },
        { titel: 'Verlegen und übergeben', text: 'Wir verlegen sauber und übergeben den Raum besenrein. Zum Schluss gehen wir alles gemeinsam durch.' },
      ],
    },
    beleg: {
      titel: `So arbeiten wir in ${name} und Umgebung.`,
      fotos,
      stimmen: [STIMMEN[index % STIMMEN.length]],
      verweis: { name: 'Alle Arbeiten ansehen', href: '/referenzen' },
    },
    // Qualitätsversprechen (UM-E4-EP3) vor dem nächsten Schritt; Wortlaut aus COMPANY_DATA.qualityPromises
    versprechen: {},
    schritt: {
      titel: `Termin in ${name} anfragen`,
      satz: `Schreiben Sie uns oder rufen Sie an. Wir sprechen einen Termin bei Ihnen in ${name} ab.`,
    },
  };
}
