// Inhalt `/balkon-terrasse` (Erzählseite) aus dem Seitentext `_werkstatt/texte/balkon-terrasse.md` (wörtlich, Textmarken
// unverändert; Bauhinweise in Klammern und die Zeile „Muster“ nicht übernommen). Vorlage: ErzaehlSeite. Einstieg mittig
// (K-016, E-047, Regel 1 des Zusatzes); der Vorspann steht als Einleitung von „Was wir tun“ (Regel 2). Fotos mit Kennungen
// aus `src/config/arbeiten.ts`; die Textdatei nennt für vier Fotos keine Unterschrift, dort ist der Alt-Text gekürzt
// (Regel 4). Stimmen: `hasan-oe` aus der Textdatei zuerst, dazu aus `src/config/reviews.js` (Wortlaut unverändert, G8).
import type { ErzaehlInhalt } from '@/components/vorlagen/inhalt';

const VORSPANN =
  'Draußen kommt es auf mehr an als auf die Fliese. Wir verlegen Platten auf Balkon und Terrasse, auch auf [[stelzlager|Stelzlagern]]. Wir erklären Ihnen in einfachen Worten, welcher Aufbau zu Ihrer Fläche passt.';

export const BALKON_TERRASSE: ErzaehlInhalt = {
  pfad: '/balkon-terrasse',
  meta: {
    titel: 'Balkon und Terrasse fliesen in Wetzlar und Aßlar | Tezgel',
    beschreibung:
      'Balkon und Terrasse fliesen lassen in Wetzlar und Aßlar: Wir verlegen Platten, auch auf Stelzlagern. Der Termin bei Ihnen vor Ort ist kostenfrei.',
  },
  worum: {
    brotkrumen: [{ name: 'Start', href: '/' }, { name: 'Balkon und Terrasse' }],
    einstieg: 'mitte',
    // H1 in zwei gleich langen Zeilen (19 und 19 Zeichen); zusammen mit einem Leerzeichen genau die H1 der Textdatei
    titel: 'Ein neuer Belag für Balkon und Terrasse',
    titelZeilen: ['Ein neuer Belag für', 'Balkon und Terrasse'],
    ort: 'Für Aßlar, Wetzlar und Umgebung.',
    vorspann: VORSPANN,
    bild: 'balkon-einstieg-hell',
    bewertung: true,
  },
  lage: {
    titel: 'Draußen leidet der Belag unter Regen und Frost.',
    absaetze: [
      'Vielleicht stehen nach einem Regen Pfützen auf Ihrem Balkon, oder Platten wackeln. Sie wissen nicht, ob der Belag noch hält.',
      'Am besten sehen wir uns das gemeinsam an. Dann wissen Sie, woran es liegt und was zu tun ist.',
    ],
    wege: [
      // Name und Satz getrennt (Abnahme E3-BAU-06); „Stelzen“ im Namen, das Fachwort mit Erklärung im Satz (Glossar: erste
      // Nennung erklärt, K-011)
      { name: 'Balkon erneuern', satz: 'Was wir tun, wenn der alte Belag undicht ist.', href: '/balkon-terrasse/balkonsanierung' },
      { name: 'Terrassenplatten', satz: 'Welches Material und welche Stärke zu Ihrer Terrasse passen.', href: '/balkon-terrasse/terrassenplatten' },
      { name: 'Platten auf Stelzen', satz: 'So verlegen wir Platten auf [[stelzlager|Stelzlagern]], Schritt für Schritt.', href: '/balkon-terrasse/stelzlager' },
    ],
  },
  tun: {
    titel: 'Erst die Fläche prüfen, dann die Platten verlegen.',
    einleitung: VORSPANN,
    // Eine Aussage je Fliese: Überschrift der Textdatei und Satz, getrennt durch einen Punkt (die Fliese hat nur Sätze)
    punkte: [
      'Das Wasser läuft ab. Der Belag bekommt ein [[gefaelle|Gefälle]] von mindestens 1,5 bis 2 %.',
      'Platten auf Stelzlagern. Ob Stelzlager zu Ihrer Fläche passen, prüfen wir vor Ort, bevor wir einen Belag planen.',
      'Die richtige Oberfläche. Wir verlegen Platten mit [[rutschhemmung|Rutschhemmung R10 oder R11]], je nach Raum.',
      'Der Aufbau darunter. Auch der [[untergrund|Untergrund]] gehört zu unseren Leistungen. Ebenso die [[abdichtung|Abdichtung]].',
    ],
  },
  ablauf: {
    titel: 'So kommen Sie zu Ihrem neuen Belag.',
    einleitung: 'Deniz Tezgel bleibt Ihr fester Ansprechpartner, von der ersten Skizze bis zur Abnahme.',
    schritte: [
      {
        titel: 'Termin bei Ihnen vor Ort',
        text: 'Deniz Tezgel kommt zu Ihnen. Er schaut sich die Fläche genau an und prüft den Untergrund. Dieser Termin ist für Sie kostenfrei.',
      },
      {
        titel: 'Planen und auswählen',
        text: 'Sie suchen mit uns die Platten und die Farbe der Fugen aus. Danach bekommen Sie ein Angebot mit festem Preis.',
      },
      {
        titel: 'Verlegen und übergeben',
        text: 'Wir verlegen sauber und übergeben die Fläche besenrein, also gefegt. Zum Schluss gehen wir alles gemeinsam durch.',
      },
    ],
  },
  beleg: {
    titel: 'Balkone und Terrassen, die wir verlegt haben.',
    fotos: [
      { bild: 'balkon-beleg-anthrazit', unterschrift: 'Balkon mit anthrazitfarbenen Fliesen', href: '/balkon-terrasse' },
      { bild: 'balkon-beleg-2', unterschrift: 'Balkon mit rosébraunen Fliesen', href: '/balkon-terrasse' },
      { bild: 'balkon-beleg-aluprofil', unterschrift: 'Terrassenkante mit hellem Aluprofil', href: '/balkon-terrasse' },
      // die Überschrift des Einzelbilds aus der Textdatei ist sein Name auf der Glasfläche (Abnahme E3-BAU-06)
      { bild: 'balkon-stelzlager', unterschrift: 'So legen wir Platten auf Stelzlagern', href: '/balkon-terrasse/stelzlager' },
    ],
    // Stimme der Textdatei zuerst, dann vier weitere aus src/config/reviews.js (Thema Balkon, Fliesen verlegen, Boden, Haus)
    stimmen: ['hasan-oe', 'rabia-oe', 'erik-s', 'kathrin-w', 'sara-j'],
    // öffnet die Galerie auf /referenzen mit der Auswahl „Balkon und Terrasse“ (GalerieWahl liest ?raum=)
    verweis: { name: 'Alle Arbeiten ansehen', href: '/referenzen?raum=balkon-und-terrasse#unsere-arbeiten' },
  },
  schritt: {
    titel: 'Sprechen Sie mit uns über Ihren Balkon oder Ihre Terrasse.',
    satz: 'Rufen Sie an oder fragen Sie einen Termin an. Deniz Tezgel ruft Sie zurück.',
    verwandte: [
      { name: 'Leistung Außenbereiche', href: '/leistungen/aussen' },
      { name: 'Leistung Untergrund und Abdichtung', href: '/leistungen/untergrund' },
      { name: 'Balkonaustritt ohne Stufe', href: '/blog/barrierefreier-balkonaustritt' },
      { name: 'Häufige Fragen', href: '/faq' },
    ],
  },
};
