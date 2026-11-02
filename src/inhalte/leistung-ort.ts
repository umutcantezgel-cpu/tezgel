// SEO-Runde b4 (02.11.2026, Umut: „alle Seiten im Index und mit sinnvollem Inhalt füllen“): Texte der 52 Seiten Leistung × Ort
// (src/app/(bestand)/leistungen/[id]/[stadt]/page.tsx). Quelle nur das Faktenblatt (_werkstatt/KERN.md, Anhang F: F-08 Leistungen,
// F-11 Ablauf, F-12 Termin kostenfrei, F-13 Deniz Tezgel persönlich, F-15 große Fliesen seit 2014 und DIN 18534 seit 2019,
// F-17 Staubschutz und besenreine Übergabe, F-21 Gefälle, F-22 Rutschhemmung, F-25 barrierefreies Bad und Pflegekasse) und
// sinngleich der Bestand (Leistungsseiten, /balkon-terrasse, /untergrund-abdichtung). Die Seiten unterscheiden sich nur durch
// echte Angaben (Ort, Landkreis, Entfernung), nicht durch erfundene Schwerpunkte je Ort (Leitplanke Wahrheit). Fachwörter beim
// ersten Vorkommen auf der Seite mit [[id|Wort]] (K-011): Reihenfolge auf der Seite ist Absätze, Liste, Ablauf. Kein Satz über
// 25 Wörter, die Erklärung in Klammern zählt mit (K-010). Zusagen nur „Festpreisangebot“ und „Termin kostenfrei“ (Punkt 6).
import type { Markentext } from '@/components/vorlagen/inhalt';

export interface LeistungOrtText {
  /** Überschrift des ersten Abschnitts, mit Ort */
  titel: (ort: string) => string;
  /** zweiter Satz im Einstieg nach „… ist Ihr Fachbetrieb für … in {Ort} und im {Landkreis}.“; ohne Fachwort */
  vorspann: string;
  /** Absätze im ersten Abschnitt, je höchstens vier Sätze (K-010) */
  absaetze: (ort: string) => Markentext[];
  /** Liste „Das machen wir in {Ort}“; auch die Angebote im Knoten Service der strukturierten Daten (ohne Marken) */
  liste: Markentext[];
  /** drei Schritte nach F-11 (Planung und Aufmaß vor Ort, Material und Fugenbild, Ausführung und Abnahme) */
  schritte: (ort: string) => { untertitel: string; titel: string; text: string }[];
  /** zweite Kennzahl unter den Absätzen */
  kennzahl: { wert: string; name: string };
  /** Leistung im Satz „… ist Ihr Fachbetrieb für {imSatz} in {Ort}“ (ohne „&“ und ohne Fachwort, weil der Satz vor den Absätzen steht) */
  imSatz: string;
  /** Name im Planblatt und im Abschnitt „Weitere Leistungen“ der anderen Seiten (zählt zum Fließtext, deshalb ohne Fachwort) */
  link: string;
  /** Überschrift des Abschlusses (vorher „{Leistung} in {Ort}: Jetzt …“, Muster „Begriff: Erklärung“ der Floskelliste) */
  abschluss: (ort: string) => string;
}

const ABNAHME = 'Zum Schluss gehen wir alles gemeinsam mit Ihnen durch.';

export const LEISTUNG_ORT: Readonly<Record<string, LeistungOrtText>> = {
  bad: {
    titel: (ort) => `Ihr neues Bad in ${ort}`,
    imSatz: 'Badsanierung',
    link: 'Bad und Dusche',
    abschluss: (ort) => `Sprechen wir über Ihr Bad in ${ort}.`,
    vorspann: 'Wir erneuern Bäder und bauen Duschen ohne Stufe.',
    absaetze: (ort) => [
      `Wir erneuern Ihr Bad in ${ort}. Unter die Fliesen kommt eine [[abdichtung|Abdichtung]]. Seit 2019 ist die Abdichtung nach [[din-18534|DIN 18534]] bei uns Standard.`,
      'Statt der Wanne bauen wir auf Wunsch eine [[bodengleiche-dusche|bodengleiche Dusche]]. Der Boden bekommt dann [[gefaelle|Gefälle]].',
      'Planen Sie ein [[barrierefrei|barrierefreies]] Bad? Dann planen wir nach [[din-18040|DIN 18040]]. Haben Sie einen Pflegegrad, kann die Pflegekasse bis zu 4.180 € je Person dazugeben. Wohnen Sie während der Arbeit im Haus, schützen wir die Räume vor Staub.',
    ],
    liste: [
      'Alte Fliesen entfernen und den [[untergrund|Untergrund]] prüfen',
      'Abdichtung nach DIN 18534 in Bad und Dusche',
      'Duschen ohne Stufe, mit Rinne oder Ablauf im Boden',
      'Große Fliesen an Wand und Boden',
      'Wandnischen in der Dusche',
      'Staubschutz, wenn Sie im Haus wohnen, und besenreine Übergabe',
    ],
    schritte: (ort) => [
      { untertitel: 'Termin vor Ort', titel: 'Planung und Aufmaß', text: `Deniz Tezgel sieht sich Ihr Bad in ${ort} an und misst alles auf. Der Termin ist kostenfrei.` },
      { untertitel: 'Auswahl', titel: 'Material und Fugenbild', text: 'Sie wählen mit uns Fliesen, ihr Format und die Farbe der Fugen. Danach bekommen Sie ein Festpreisangebot.' },
      { untertitel: 'Umsetzung', titel: 'Ausführung und Abnahme', text: `Wir dichten ab, verlegen die Fliesen und übergeben das Bad besenrein. ${ABNAHME}` },
    ],
    kennzahl: { wert: 'DIN 18534', name: 'Abdichtung im Bad' },
  },
  wohnen: {
    titel: (ort) => `Böden und Wände in ${ort}`,
    imSatz: 'Böden und Wände',
    link: 'Böden und Wände',
    abschluss: (ort) => `Sprechen wir über Ihre Böden und Wände in ${ort}.`,
    vorspann: 'Wir verlegen Fliesen in Wohnräumen, Küchen, Fluren und auf Treppen.',
    absaetze: (ort) => [
      `Wir verlegen Fliesen auf Böden und an Wänden in ${ort}, auch im Neubau. Seit 2014 sind große Fliesen ein Schwerpunkt bei uns. Neben Fliesen aus [[feinsteinzeug|Feinsteinzeug]] verlegen wir auch Naturstein. Für sehr große Platten nutzen wir [[vakuumhebetechnik|Vakuumhebetechnik]].`,
      'Vor dem Verlegen prüfen wir den [[untergrund|Untergrund]]. Bei einem neuen [[estrich|Estrich]] messen wir, ob er trocken genug ist. Haben Sie eine Fußbodenheizung, stimmen wir den Aufbau darauf ab.',
      'Große Fliesen haben weniger Fugen. Je nach Raum beraten wir Sie zur [[rutschhemmung|Rutschhemmung]]. Nach dem Termin planen wir Fugen und Verlegemuster.',
    ],
    liste: [
      'Böden und Wände in Wohnräumen, Küchen und Fluren',
      'Große Fliesen mit wenigen Fugen',
      'Fugen, die von Raum zu Raum durchlaufen',
      'Treppen mit Fliesen oder Naturstein',
      'Fliesen auf Fußbodenheizung',
      'Fliesen im Neubau',
    ],
    schritte: (ort) => [
      { untertitel: 'Termin vor Ort', titel: 'Planung und Aufmaß', text: `Wir messen Ihre Räume in ${ort} auf und prüfen den Boden. Der Termin ist kostenfrei.` },
      { untertitel: 'Auswahl', titel: 'Material und Fugenbild', text: 'Sie wählen Fliesen und Format. Wir planen, wie die Fugen durch die Räume laufen. Danach bekommen Sie ein Festpreisangebot.' },
      { untertitel: 'Umsetzung', titel: 'Ausführung und Abnahme', text: `Wir verlegen, setzen die Sockel und übergeben die Räume besenrein. ${ABNAHME}` },
    ],
    kennzahl: { wert: 'Seit 2014', name: 'Schwerpunkt große Fliesen' },
  },
  aussen: {
    titel: (ort) => `Balkon und Terrasse in ${ort}`,
    imSatz: 'Balkon und Terrasse',
    link: 'Balkon und Terrasse',
    abschluss: (ort) => `Sprechen wir über Ihren Balkon oder Ihre Terrasse in ${ort}.`,
    vorspann: 'Wir machen Balkone und Terrassen dicht und verlegen einen neuen Belag.',
    absaetze: (ort) => [
      'Ein Balkon braucht [[gefaelle|Gefälle]] vom Haus weg. Wir planen mindestens 1,5 bis 2 % Gefälle. Unter den Belag kommt eine [[abdichtung|Abdichtung]].',
      `Platten für die Terrasse legen wir auch auf [[stelzlager|Stelzlager]]. Beim Termin in ${ort} prüfen wir den [[untergrund|Untergrund]]. Wir sehen auch nach, wohin das Wasser abläuft. Danach bekommen Sie ein Festpreisangebot.`,
    ],
    liste: [
      'Gefälle vom Haus weg, mindestens 1,5 bis 2 %',
      'Abdichtung unter dem neuen Belag',
      'Frostsichere Platten und Fliesen',
      'Platten auf Stelzlagern',
      'Saubere Kanten mit Profilen aus Aluminium',
      'Außentreppen und Eingänge',
    ],
    schritte: (ort) => [
      { untertitel: 'Termin vor Ort', titel: 'Planung und Aufmaß', text: `Wir sehen uns Ihren Balkon oder Ihre Terrasse in ${ort} an. Der Termin ist kostenfrei.` },
      { untertitel: 'Auswahl', titel: 'Material und Aufbau', text: 'Sie wählen die Platten. Wir legen fest, ob sie auf Stelzlagern oder im Splittbett liegen. Danach bekommen Sie ein Festpreisangebot.' },
      { untertitel: 'Umsetzung', titel: 'Ausführung und Abnahme', text: `Wir stellen das Gefälle her, dichten ab und verlegen. ${ABNAHME}` },
    ],
    kennzahl: { wert: '1,5 bis 2 %', name: 'Gefälle vom Haus weg' },
  },
  untergrund: {
    titel: (ort) => `Untergrund und Abdichtung in ${ort}`,
    imSatz: 'Vorarbeiten vor dem Fliesen',
    link: 'Vorarbeiten vor dem Fliesen',
    abschluss: (ort) => `Sprechen wir über Ihr Vorhaben in ${ort}.`,
    vorspann: 'Wir bereiten Böden und Wände vor, bevor die Fliesen kommen.',
    absaetze: (ort) => [
      `Vor dem Verlegen prüfen wir den [[untergrund|Untergrund]]. Dafür kommen wir zu Ihnen nach ${ort}. Liegen dort alte Fliesen, machen wir eine [[klopfprobe|Klopfprobe]]. Ist der [[estrich|Estrich]] neu, messen wir, ob er trocken genug ist.`,
      'Für einen ebenen Boden nehmen wir [[ausgleichsmasse|Ausgleichsmasse]]. Risse im Estrich schließen wir mit Harz. Bei Bedarf legen wir eine [[entkopplung|Entkopplung]].',
      'Im Bad kommt danach eine [[abdichtung|Abdichtung]]. Wir machen sie nach [[din-18534|DIN 18534]].',
    ],
    liste: [
      'Alte Fliesen und alte Beläge entfernen',
      'Estrich prüfen und Unebenheiten ausgleichen',
      'Risse im Estrich mit Harz schließen',
      'Entkopplung gegen kleine Risse',
      'Abdichtung nach DIN 18534 in Bad und Dusche',
      '[[dichtband|Dichtbänder]] an Ecken und Rohren',
    ],
    schritte: (ort) => [
      { untertitel: 'Prüfen', titel: 'Planung und Aufmaß', text: `Wir prüfen den Boden in ${ort} vor Ort: Ebenheit, Feuchte und Risse. Der Termin ist kostenfrei. Danach bekommen Sie ein Festpreisangebot.` },
      { untertitel: 'Vorbereiten', titel: 'Ausgleich und Entkopplung', text: 'Wir gleichen aus, schließen Risse und legen bei Bedarf eine Matte gegen Risse.' },
      { untertitel: 'Abdichten', titel: 'Abdichtung und Verlegung', text: `Im Bad dichten wir nach DIN 18534 ab. Dann kommen die Fliesen. ${ABNAHME}` },
    ],
    kennzahl: { wert: 'DIN 18534', name: 'Abdichtung im Bad' },
  },
};

/** Text ohne Marken (für strukturierte Daten): [[id|Wort]] wird zu Wort */
export function ohneMarken(text: string): string {
  return text.replace(/\[\[[a-z0-9-]+\|([^\]]+)\]\]/g, '$1');
}
