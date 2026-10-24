// Inhalt `/bad/barrierefreies-bad` (Erzählseite) aus dem Referenztext `_werkstatt/texte/REF-bereich-barrierefreies-bad.md`
// (wörtlich, Textmarken unverändert). Bildunterschriften nach den Alt-Texten in `src/config/arbeiten.ts`. Fakten: K-015
// F-21, F-22, F-23, F-25. Vorlage: ErzaehlSeite.
import type { ErzaehlInhalt } from '@/components/vorlagen/inhalt';

export const BARRIEREFREIES_BAD: ErzaehlInhalt = {
  pfad: '/bad/barrierefreies-bad',
  meta: {
    titel: 'Barrierefreies Bad nach DIN 18040 | Tezgel Aßlar',
    beschreibung:
      'Badewanne raus, Dusche ohne Stufe rein: Wir bauen Ihr Bad in Aßlar und Wetzlar barrierefrei um, mit rutschfesten Fliesen und Zuschuss der Pflegekasse.',
  },
  worum: {
    brotkrumen: [{ name: 'Start', href: '/' }, { name: 'Bad', href: '/bad' }, { name: 'Dusche statt Wanne' }],
    titel: 'Ein barrierefreies Bad mit Dusche ohne Stufe',
    ort: 'Für Aßlar, Wetzlar und Umgebung.',
    vorspann:
      'Wir bauen Ihre Badewanne aus und eine [[bodengleiche-dusche|bodengleiche Dusche]] ein. So steigen Sie sicher hinein, heute und auch später.',
    bild: 'bereich-dusche-sitzbank',
  },
  lage: {
    titel: 'Der Schritt über den Wannenrand wird schwer.',
    absaetze: [
      'Viele Menschen merken es irgendwann: Das Einsteigen in die Wanne kostet Kraft. Sie möchten sicher duschen, ohne zu stolpern. Vielleicht denken Sie auch schon an einen Rollator.',
      'Wir zeigen Ihnen, wie Ihr Bad ohne Stufe aussehen kann. Dafür kommen wir zu Ihnen und sehen uns alles in Ruhe an.',
    ],
  },
  tun: {
    titel: 'So wird aus der Wanne eine sichere Dusche.',
    punkte: [
      'Wir bauen die alte Wanne aus und bereiten den Boden vor.',
      'Der Duschboden bekommt ein leichtes [[gefaelle|Gefälle]] zum Ablauf.',
      'Unter die Fliesen kommt eine [[abdichtung|Abdichtung]] nach [[din-18534|DIN 18534]].',
      'Wir verlegen Fliesen mit [[rutschhemmung|Rutschhemmung R10 oder R11]], je nach Raum.',
    ],
    absatz: 'Wir planen nach [[din-18040|DIN 18040]]. So bleibt Ihr Bad auch später gut nutzbar.',
  },
  ablauf: {
    titel: 'So läuft Ihr Umbau ab.',
    schritte: [
      { titel: 'Termin bei Ihnen vor Ort', text: 'Deniz Tezgel schaut sich Ihr Bad genau an und prüft Boden und Wände. Der Termin ist kostenfrei.' },
      { titel: 'Planen und auswählen', text: 'Sie wählen Fliesen und Dusche aus. Sie bekommen ein Angebot mit festem Preis.' },
      { titel: 'Umbauen und übergeben', text: 'Wir bauen um und schützen Ihre Wohnung dabei vor Staub. Zum Schluss gehen wir alles gemeinsam durch.' },
    ],
    hinweis: {
      text: 'Haben Sie einen Pflegegrad? Dann kann die Pflegekasse bis zu 4.180 € je Person dazugeben.',
      verweis: { name: 'Mehr zum Zuschuss', href: '/foerderung' },
    },
  },
  beleg: {
    titel: 'Duschen ohne Stufe, die wir gebaut haben.',
    fotos: [
      { bild: 'start-dusche', unterschrift: 'Dusche ohne Stufe mit großen grauen Fliesen und Glaswand' },
      { bild: 'bereich-dusche-streifen-sitzbank', unterschrift: 'Dusche ohne Stufe mit dunklem Streifen und gefliester Sitzbank' },
      { bild: 'bereich-wanne-mit-tuer', unterschrift: 'Wanne mit Tür am Rand, daneben eine Dusche' },
    ],
    zweierbild: {
      titel: 'So entsteht eine Dusche ohne Stufe',
      bilder: [
        { bild: 'entstehung-dusche-1', unterschrift: 'Die großen Fliesen liegen, das Gefälle ist geschnitten.' },
        { bild: 'entstehung-dusche-2', unterschrift: 'Die Fugen sind fertig. Das Wasser läuft zum Ablauf in der Mitte.' },
      ],
    },
    stimmen: ['ute-t'],
    verweis: { name: 'Alle Arbeiten ansehen', href: '/referenzen' },
  },
  schritt: {
    titel: 'Sprechen Sie mit uns über Ihr neues Bad.',
    satz: 'Rufen Sie an oder fragen Sie einen Termin an. Deniz Tezgel kommt zu Ihnen und berät Sie.',
  },
};
