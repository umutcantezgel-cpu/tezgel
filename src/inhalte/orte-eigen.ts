// SEO-Runde P3 (docs/seo/arbeit/p3-entwurf-wetzlar.md): eigene Inhalte der Wetzlar-Seite, nur aus dem Faktenblatt
// (_werkstatt/KERN.md, Anhang F: F-03 Sitz, F-08 Leistungen, F-09 Entfernung, F-25 Pflegekasse, F-26 Landkreis), dem
// Auftrag („Aßlar, direkt neben Wetzlar“) und KONTEXT.md Abschnitt 13 (Lager im Dillfeld, Umut 02.11.2026). Baustellen, Stadtteile und Stimmen aus Wetzlar kommen erst mit der Bestätigung
// von Deniz dazu (Leitplanke Wahrheit). Fachwörter beim ersten Vorkommen auf der Seite mit Erklärung (K-011): Linknamen
// der Zeilen zählen zum Fließtext, deshalb stehen dort keine Fachwörter. Zusagen nur sinngleich wie im Bestand.
import type { ArbeitId } from '@/config/arbeiten';
import type { Markentext, Zeile } from '@/components/vorlagen/inhalt';

export interface EigenerOrtsinhalt {
  vorspann: Markentext;
  /** erster Absatz nennt den Landkreis und die Entfernung wie die Daten (test/orte.test.mjs, Orte 5 und 11) */
  lage: { titel: string; absaetze: Markentext[] };
  /** Wege auf die Seiten Leistung × Wetzlar und auf die Fachseiten ohne eigene Ortsseite (Entscheidung Umut: alle Seiten im Index) */
  tun: { titel: string; bereiche: Zeile[] };
  /** eigene Fotoreihe statt der drei Plätze aus GALERIE_START (SEO-Runde P5): Fotos, die keine andere Ortsseite zeigt, Namen nur
   *  über das, was zu sehen ist, ohne Ort (Leitplanke Wahrheit: der Ort keiner Baustelle ist bestätigt); hellste zuerst; jedes mit
   *  Weg zur Leistungsseite (Regel 4, K-016) */
  fotos?: { bild: ArbeitId; unterschrift: string; href: string }[];
}

const WETZLAR: EigenerOrtsinhalt = {
  // die Ortszeile darüber sagt schon „aus Aßlar, direkt neben Wetzlar“ (orte.ts); der Vorspann nennt die Leistungen (F-08)
  vorspann: 'Wir erneuern Bäder, bauen Duschen ohne Stufe, verlegen Böden und Treppen und machen Balkone dicht.',
  lage: {
    titel: 'Sie suchen einen Fliesenleger in Wetzlar?',
    // Termin vor Ort und Angebot stehen im Ablauf derselben Seite; hier nur, was die anderen Orte nicht sagen
    absaetze: ['Ja, wir arbeiten in Wetzlar und im Lahn-Dill-Kreis. Unser Betrieb sitzt in Aßlar, bis in die Stadtmitte von Wetzlar sind es etwa 5 km. Unser Lager liegt im Dillfeld in Wetzlar.'],
  },
  tun: {
    titel: 'Das machen wir in Wetzlar.',
    bereiche: [
      { name: 'Bad und Dusche ohne Stufe', satz: 'Wir erneuern Ihr Bad und bauen eine Dusche ohne Stufe ein.', href: '/leistungen/bad/wetzlar', vignette: 'bad' },
      // Wortlaut der Förderung wie auf /bad (src/inhalte/bad.ts): „kann … dazugeben“ (F-23, F-25 nur sinngleich); kurze Sätze,
      // weil Linkname und Erklärung des Fachworts mitzählen (K-010: kein Satz über 25 Wörter)
      { name: 'Bad ohne Barrieren', satz: 'Haben Sie einen Pflegegrad? Dann kann die Pflegekasse bis zu 4.180 € je Person dazugeben. Das gilt für einen [[barrierefrei|barrierefreien]] Umbau.', href: '/bad/barrierefreies-bad', vignette: 'bad' },
      { name: 'Böden und Wände', satz: 'Wir verlegen große Fliesen, [[feinsteinzeug|Feinsteinzeug]] und Naturstein. Das geht in Wohnräumen, Küchen und im Neubau.', href: '/leistungen/wohnen/wetzlar', vignette: 'wohnen' },
      { name: 'Balkon und Terrasse', satz: '[[gefaelle|Gefälle]] vom Haus weg, Abdichtung und neuer Belag. Wir verlegen Platten auch auf [[stelzlager|Stelzlagern]].', href: '/leistungen/aussen/wetzlar', vignette: 'aussen' },
      { name: 'Untergrund und Abdichtung', satz: 'Wir prüfen den [[estrich|Estrich]] und gleichen Unebenheiten aus. Dann dichten wir ab, bevor die Fliesen kommen.', href: '/leistungen/untergrund/wetzlar', vignette: 'untergrund' },
      { name: 'Treppe', satz: 'Innentreppe, Treppenhaus oder Außentreppe mit Fliesen oder Naturstein.', href: '/treppen', vignette: 'treppe' },
      { name: 'Reparatur und Fugen', satz: 'Einzelne Fliesen tauschen, Fugen erneuern. Fotos per WhatsApp helfen bei der ersten Einschätzung.', href: '/fliesenreparatur', vignette: 'reparatur' },
    ],
  },
  // Auswahl docs/seo/arbeit/p5-bildauswahl.md (Abschnitt 2); Reihenfolge nach mittlerer Helligkeit der Webfassung (0,54, 0,48, 0,47)
  fotos: [
    { bild: 'nb-118', unterschrift: 'Dusche mit Glastür und Wandnische', href: '/bad' },
    { bild: 'nb-083', unterschrift: 'Beiges Bad mit Dusche ohne Stufe', href: '/bad/badsanierung' },
    { bild: 'nb-077', unterschrift: 'Außentreppe mit beigen Fliesen', href: '/treppen/aussentreppe' },
  ],
};

/** Orte mit eigenem Inhalt (heute nur Wetzlar, die Zielseite des Auftrags); alle anderen nutzen die gemeinsame Fassung */
export const EIGENE_ORTSINHALTE: Readonly<Partial<Record<string, EigenerOrtsinhalt>>> = { wetzlar: WETZLAR };
