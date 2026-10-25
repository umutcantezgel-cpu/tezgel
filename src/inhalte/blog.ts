// Inhalt `/blog` (Wissensseite, E3-BAU-11) aus `_werkstatt/texte/blog.md`: Texte wörtlich mit ihren Textmarken, Bauhinweise in
// Klammern und `{{COMPANY_DATA…}}` nicht übernommen. Nach dem Zusatz E3-BAU-K016: der Satz „Seit 2008 …“ (Handwerkskammer)
// entfällt (Regel 3), der Satz zur DIN 18534 bleibt. Die Artikelliste mit Suche und Themenfilter ist das Werkzeug der Seite
// (BlogFilter, Kennung `artikel`, F-16); ihre Anrisse aus dem Text nimmt die Komponente nicht an (OFFENE FRAGE, Bericht).
// Vorlage: WissensSeite (E-025).
import type { WissenInhalt } from '@/components/vorlagen/inhalt';

const VORSPANN =
  'Hier erklären wir Badsanierung und Fliesenverlegung in einfachen Worten, aus der Praxis unseres Fachbetriebs in Aßlar. Dazu gehört die [[abdichtung|Abdichtung]] im Bad.';

export const BLOG: WissenInhalt = {
  pfad: '/blog',
  meta: {
    titel: 'Fliesenratgeber für Badsanierung und Abdichtung | Tezgel',
    beschreibung:
      'Ratgeber und Praxiswissen vom Fliesenlegerfachbetrieb Tezgel aus Aßlar: Badsanierung, Fliesenverlegung und Abdichtung gegen Wasser nach DIN 18534.',
  },
  worum: {
    brotkrumen: [{ name: 'Start', href: '/' }, { name: 'Ratgeber' }],
    titel: 'Fliesenratgeber für Badsanierung, Fliesenverlegung und Abdichtung',
    ort: 'Fliesenverlegung Tezgel aus Aßlar',
    vorspann: VORSPANN,
  },
  lage: {
    titel: 'Vieles rund ums Bad ist schwer zu verstehen.',
    absaetze: [
      'Sie möchten Ihre Wanne gegen eine [[bodengleiche-dusche|bodengleiche Dusche]] tauschen? Dann stellen sich viele Fragen. Was muss abgedichtet werden, und was kostet das? Hier finden Sie Antworten.',
    ],
  },
  // Die Artikelliste (BlogFilter) steht als Werkzeug nach dem nächsten Schritt, nicht als Zeichnung (Zusatz K016, Abschnitt 4)
  wissen: [
    {
      titel: 'Wir erklären jedes Thema einzeln.',
      absatz: 'Jeder Artikel gehört zu einem Thema. Sie wählen ein Thema oder geben einen Begriff in die Suche ein.',
    },
  ],
  ablauf: {
    titel: 'So läuft es bei uns ab.',
    einleitung: 'Deniz Tezgel betreut Sie von der ersten Skizze bis zum Ende der Arbeiten. Der Ablauf hat drei Schritte.',
    schritte: [
      {
        titel: 'Termin bei Ihnen vor Ort',
        text: 'Deniz Tezgel kommt zu Ihnen und schaut sich alles genau an. Dieser Termin ist kostenfrei.',
      },
      {
        titel: 'Planen und auswählen',
        text: 'Wir wählen mit Ihnen Material und Fugen aus.',
      },
      {
        titel: 'Verlegen und übergeben',
        text: 'Wir verlegen sauber und gehen am Ende alles gemeinsam mit Ihnen durch.',
      },
    ],
  },
  beleg: {
    // die Textdatei hat für den Beleg keine Überschrift; ohne Überschrift, ohne erfundenen Text (wie /fliesen)
    titel: '',
    // Unterschrift: Wörter aus dem Alt-Text der Textdatei, auf höchstens sechs Wörter gekürzt (Regel 4)
    fotos: [{ bild: 'start-galerie-1', unterschrift: 'Dusche ohne Stufe mit Sitzbank', href: '/bad/barrierefreies-bad' }],
    // Satz der Textdatei ohne den Satz zur Handwerkskammer (Regel 3)
    satz: 'Seit 2019 ist die Abdichtung nach [[din-18534|DIN 18534]] bei uns Standard.',
    // Stimme der Textdatei (G8: Wortlaut unverändert); Kennzeile wie auf /fliesen unter der Überschrift
    stimmen: ['c-wolf'],
    stimmenEinleitung: '5,0 von 5 Sternen · 27 Bewertungen bei Google · Stand September 2026',
  },
  schritt: {
    titel: 'Haben Sie eine Frage zu Ihrem Bad?',
    satz: 'Rufen Sie uns an oder senden Sie Ihre Anfrage. Deniz Tezgel ruft Sie zurück.',
    // „Häufige Fragen“ ist der Knopf neben dem Hauptknopf der Textdatei; ohne Satz (Zusatz K016, Regel 6.3)
    hilfen: [{ name: 'Häufige Fragen', href: '/faq' }],
    verwandte: [
      { name: 'Bad und Dusche', href: '/bad' },
      { name: 'Fliesen und Verlegung', href: '/fliesen' },
      // erste Nennung des Glossarbegriffs auf der Seite trägt die Marke (Zusatz K016, Regel 6.2); die Wörter bleiben
      { name: '[[untergrund|Untergrund]] und Abdichtung', href: '/untergrund-abdichtung' },
    ],
  },
};
