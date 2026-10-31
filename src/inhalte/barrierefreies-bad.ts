// Inhalt `/bad/barrierefreies-bad` (Erzählseite) aus dem Referenztext `_werkstatt/texte/REF-bereich-barrierefreies-bad.md`
// (wörtlich, Textmarken unverändert). Bildunterschriften nach den Alt-Texten in `src/config/arbeiten.ts`, auf höchstens sechs
// Wörter gekürzt (K-016, Regel 4). Einstieg mittig mit H1 in zwei Zeilen (K-016, Regel 1). Fakten: K-015 F-21, F-22, F-23, F-25.
// Vorlage: ErzaehlSeite.
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
    // stufenloser Boden bis in die Dusche ab rund 40 % der Höhe, Schärfe 0,088 statt 0,023 (UM-E4-SICHT-FIX M-A2; das
    // bisherige Bild lag unter den Untergrenzen und wird ersetzt)
    bild: 'bereich-dusche-streifen-sitzbank',
    einstieg: 'mitte',
    titelZeilen: ['Ein barrierefreies Bad', 'mit Dusche ohne Stufe'],
    bewertung: true,
  },
  lage: {
    // auf Fliese wie auf /: sichtbare Grenze nach dem Einstieg, die Flächen wechseln ab hier (UM-E3-FIX2 N8, UM-E4-CHOR-FIX)
    aufFliese: true,
    titel: 'Der Schritt über den Wannenrand wird schwer.',
    absaetze: [
      'Viele Menschen merken es irgendwann: Das Einsteigen in die Wanne kostet Kraft. Sie möchten sicher duschen, ohne zu stolpern. Vielleicht denken Sie auch schon an einen Rollator.',
      'Wir zeigen Ihnen, wie Ihr Bad ohne Stufe aussehen kann. Dafür kommen wir zu Ihnen und sehen uns alles in Ruhe an.',
    ],
  },
  tun: {
    titel: 'So wird aus der Wanne eine sichere Dusche.',
    // Folge (K-009, UM-E4-SICHT-FIX M-B7): die Gefälle-Zeichnung direkt nach Kopf und Satz, die Punkte danach
    momentZuerst: true,
    einleitung:
      'Wir bauen Ihre Badewanne aus und eine [[bodengleiche-dusche|bodengleiche Dusche]] ein. So steigen Sie sicher hinein, heute und auch später.',
    punkte: [
      'Wir bauen die alte Wanne aus und bereiten den Boden vor.',
      'Der Duschboden bekommt ein leichtes [[gefaelle|Gefälle]].',
      'Unter die Fliesen kommt eine [[abdichtung|Abdichtung]]. Sie richtet sich nach der [[din-18534|DIN 18534]].',
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
      // zweiter Satz aus dem alten Zuschuss-Abschnitt (F-25, sinngleich; Abnahme E3-BAU-03)
      text: 'Haben Sie einen Pflegegrad? Dann kann die Pflegekasse bis zu 4.180\u00A0€ je Person dazugeben. Haben zwei Personen im Haushalt einen Pflegegrad, sind es bis zu 8.360\u00A0€.',
      verweis: { name: 'Mehr zum Zuschuss', href: '/foerderung' },
    },
  },
  beleg: {
    // Überschrift nach den Fotos (E4-W0-BILDER, E-065): zwei fertige Duschen; „ohne Stufe“ behauptet nur die Unterschrift des
    // Fotos, das es zeigt. Die Wanne mit Tür trug noch Herstelleraufkleber und Klebeband und ist entfallen; die bodengleiche
    // Dusche kommt von /bad hierher, kein Foto steht auf einer anderen Hauptansicht
    titel: 'Duschen, die wir gebaut haben.',
    fotos: [
      { bild: 'barrierefrei-beleg-1', unterschrift: 'Dusche mit Mosaikboden und Eckbank' },
      { bild: 'bad-beleg-4', unterschrift: 'Bodengleiche Dusche mit Mosaik' },
    ],
    zweierbild: {
      titel: 'So entsteht eine Dusche ohne Stufe',
      bilder: [
        { bild: 'entstehung-dusche-1', unterschrift: 'Die großen Fliesen liegen, das Gefälle ist geschnitten.' },
        { bild: 'entstehung-dusche-2', unterschrift: 'Die Fugen sind fertig. Das Wasser läuft zum Ablauf in der Mitte.' },
      ],
    },
    stimmen: ['ute-t', 'elke-s', 'peter-p', 'k-d'],
    // Stimmen auf Kalk (UM-E4-CHOR-FIX, nur die Fläche): sonst stünden Stimmen, nächster Schritt und Badanfrage als drei
    // Abschnitte auf Fliese in Folge; die Badanfrage bleibt auf Fliese (auf Kalk stünde die Abschnittsmarke neben dem Formular)
    stimmenAufKalk: true,
    // öffnet die Galerie auf /referenzen mit der Auswahl „Dusche“ (GalerieWahl liest ?raum=)
    verweis: { name: 'Alle Arbeiten ansehen', href: '/referenzen?raum=dusche#unsere-arbeiten' },
  },
  schritt: {
    titel: 'Sprechen Sie mit uns über Ihre Dusche ohne Stufe.',
    satz: 'Rufen Sie an oder fragen Sie einen Termin an. Deniz Tezgel kommt zu Ihnen und berät Sie.',
  },
};
