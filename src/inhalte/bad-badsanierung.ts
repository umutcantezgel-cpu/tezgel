// Inhalt `/bad/badsanierung` (Erzählseite, E3-BAU-02, KERN v3.6 K-009, K-016 „Ruhe“, E-025). Texte wörtlich aus
// `_werkstatt/texte/bad-badsanierung.md` mit ihren Textmarken; Abweichungen nur nach dem Zusatz E3-BAU-K016:
// H1 `Ihr neues Traumbad zum Festpreis.` (Wunsch des Auftraggebers, Teilung in zwei Zeilen), mittiger Einstieg, Vorspann als
// `tun.einleitung`, Fotounterschriften als Namen auf der Glasfläche (höchstens sechs Wörter), Kundenstimmen als Karussell,
// `kein großer Moment` im Ablauf. Die Bausteine setzt die Vorlage `ErzaehlSeite`; Hauptknöpfe, Anruf und WhatsApp kommen aus
// der Vorlage. Bilder über Kennungen aus `ARBEITEN` (`src/config/arbeiten.ts`), Stimmen über Kennungen aus `REVIEWS`.
import type { ErzaehlInhalt } from '@/components/vorlagen/inhalt';

/** Vorspann der Textdatei (Abschnitt 1): im mittigen Einstieg nicht gezeigt, steht als `tun.einleitung` auf der Seite */
const VORSPANN =
  'Badsanierung in Aßlar und Wetzlar: Wir bauen Ihr Bad Stück für Stück zum Komplettbad um. Deniz Tezgel erklärt Ihnen in einfachen Worten, was zu tun ist.';

export const BADSANIERUNG: ErzaehlInhalt = {
  pfad: '/bad/badsanierung',
  meta: {
    titel: 'Badsanierung in Aßlar & Wetzlar | Fliesenverlegung Tezgel',
    beschreibung:
      'Komplette Badsanierung in Aßlar und Wetzlar mit Walk-in-Dusche. Festpreisangebot von Fliesenverlegung Tezgel, Termin vor Ort kostenfrei.',
  },
  worum: {
    brotkrumen: [{ name: 'Start', href: '/' }, { name: 'Bad', href: '/bad' }, { name: 'Badsanierung' }],
    einstieg: 'mitte',
    titel: 'Ihr neues Traumbad zum Festpreis.',
    titelZeilen: ['Ihr neues Traumbad', 'zum Festpreis.'],
    ort: 'Für Aßlar, Wetzlar und Umgebung.',
    vorspann: VORSPANN,
    bild: 'badsanierung-einstieg',
    bewertung: true,
  },
  lage: {
    titel: 'Ihr Bad passt nicht mehr, und Sie wissen nicht, wo Sie anfangen sollen.',
    absaetze: [
      'Vielleicht steigen Sie nicht mehr gern in die Wanne. Vielleicht ist der Boden glatt geworden, oder das Bad sieht einfach alt aus.',
      'Das ist ganz normal. Wir hören Ihnen zu und sagen Ihnen offen, was sich lohnt.',
    ],
  },
  tun: {
    titel: 'So wird aus Ihrer Wanne eine sichere Dusche.',
    einleitung: VORSPANN,
    punkte: [
      'Die Wanne geht raus, und an ihre Stelle kommt eine [[bodengleiche-dusche|bodengleiche Dusche]]. Man nennt sie auch Walk-in-Dusche.',
      'Der Boden bekommt ein leichtes [[gefaelle|Gefälle]]. Der Einstieg bleibt dabei eben, ohne Stufe.',
      'Wir bauen eine [[abdichtung|Verbundabdichtung]] ein. Sie richtet sich nach der [[din-18534|DIN 18534]]. Das ist bei uns seit 2019 Standard.',
      'Wir verlegen Fliesen mit [[rutschhemmung|Rutschhemmung R10 oder R11]], je nach Raum.',
    ],
    absatz:
      'Wir bauen [[barrierefrei|barrierefreie]] Bäder mit bodengleichen Duschen. Wir verlegen auch [[grossformat|Großformate]]. Wenn Sie ein Bad ohne Stufen wünschen, planen wir nach [[din-18040|DIN 18040]]. So bleibt Ihr Bad auch später gut nutzbar.',
  },
  ablauf: {
    titel: 'So kommen Sie zu Ihrem neuen Bad.',
    einleitung: 'Deniz Tezgel ist Ihr fester Ansprechpartner, von der ersten Skizze bis zum Schluss.',
    schritte: [
      { titel: 'Anruf und Rückruf', text: 'Sie rufen an oder schicken uns Ihre Anfrage. Deniz Tezgel ruft Sie zurück.' },
      { titel: 'Termin bei Ihnen', text: 'Deniz Tezgel kommt zu Ihnen, sieht sich Ihr Bad genau an, und dieser Termin ist kostenfrei.' },
      {
        titel: 'Planen und auswählen',
        text: 'Gemeinsam wählen Sie Fliesen und Dusche aus, danach bekommen Sie ein Festpreisangebot, also ein Angebot mit festem Preis.',
      },
      {
        titel: 'Ausbau mit Staubschutz',
        text: 'Wenn Sie während des Umbaus zu Hause wohnen, schützen wir Ihre Räume mit Staubschutzwänden und Luftreinigern.',
      },
      { titel: 'Fliesen verlegen', text: 'Wir verlegen den neuen Boden und die Wände, bis die letzte Fuge fertig ist.' },
      { titel: 'Übergabe an Sie', text: 'Zum Schluss ist der Raum gefegt und sauber, und wir gehen alles gemeinsam mit Ihnen durch.' },
    ],
  },
  beleg: {
    titel: 'So sehen fertige Bäder aus, und so sprechen unsere Kunden darüber.',
    // Fotos mit Name auf der Glasfläche (Zusatz Regel 4); die drei Fotos der Arbeit beim Weg (Textdatei Abschnitt 4) stehen
    // hinter den fertigen Bädern (Abschnitt 5). Die Namen sind je höchstens sechs Wörter aus Textdatei oder Alt-Text.
    fotos: [
      { bild: 'badsanierung-beleg-1', unterschrift: 'Badewanne mit gestreifter Verkleidung', href: '/bad/badsanierung' },
      { bild: 'badsanierung-beleg-2', unterschrift: 'Badewanne und Dusche mit Mosaikboden', href: '/bad/badsanierung' },
      { bild: 'sanierung-weg-1', unterschrift: 'Beige Wandfliesen bis halbhoch', href: '/bad/badsanierung' },
      { bild: 'sanierung-weg-2', unterschrift: 'Offene Decke und dunkle Holzoptik', href: '/bad/badsanierung' },
      { bild: 'sanierung-weg-3', unterschrift: 'Brauner Boden im Duschbereich', href: '/bad/badsanierung' },
    ],
    zweierbild: {
      titel: 'So sieht ein Bad im Bau aus',
      bilder: [
        { bild: 'badsanierung-zweier-1', unterschrift: 'Wandfliesen in Metalloptik, Nische in der Mitte' },
        { bild: 'badsanierung-zweier-2', unterschrift: 'Boden in Schieferoptik, die Nische ist noch offen' },
      ],
    },
    // Wortlaut unverändert aus REVIEWS (G8): die Stimme der Textdatei zuerst, dann vier weitere zum Thema Bad
    stimmen: ['c-wolf', 'ute-t', 'peter-p', 'elke-s', 'k-d'],
    verweis: { name: 'Alle Bewertungen', href: '/referenzen' },
  },
  schritt: {
    titel: 'Sprechen wir über Ihre Badsanierung.',
    satz: 'Sagen Sie uns, welches Bad Sie sich wünschen. Den Rest besprechen wir gemeinsam.',
    // Hilfen ohne Satz in der Textdatei; das Feld `satz` ist im Typ Pflicht, daher leer (OFFENE FRAGE)
    hilfen: [
      { name: 'Angebot anfordern', href: '/bad/badanfrage' },
      { name: 'Projektcheck starten', href: '/bad/projekt-check' },
    ],
  },
};
