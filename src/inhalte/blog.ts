// Inhalt `/blog` (Wissensseite, E3-BAU-11) aus `_werkstatt/texte/blog.md`: Texte wörtlich mit ihren Textmarken, Bauhinweise in
// Klammern und `{{COMPANY_DATA…}}` nicht übernommen. Nach dem Zusatz E3-BAU-K016: der Satz „Seit 2008 …“ (Handwerkskammer)
// entfällt (Regel 3), der Satz zur DIN 18534 bleibt. Die Artikelliste mit Suche und Themenfilter ist das Werkzeug der Seite
// (BlogFilter, Kennung `artikel`, F-16); die Anrisse der Textdatei (`ANRISSE`, je Artikel) zeigt sie statt der Auszüge aus
// den Beitragsdaten (Abnahme E3-BAU-11). Die Kennzeile unter der Stimme setzt der Baustein Stimmen aus den Daten.
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
    titel: 'Wir erklären Bad, Fliesen und Abdichtung.',
    ort: 'Fliesenverlegung Tezgel aus Aßlar',
    vorspann: VORSPANN,
  },
  lage: {
    titel: 'Vieles rund ums Bad ist schwer zu verstehen.',
    absaetze: [
      'Sie möchten Ihre Wanne gegen eine [[bodengleiche-dusche|bodengleiche Dusche]] tauschen? Dann stellen sich viele Fragen.',
      // Abnahme E3-BAU-11: die erste Nennung von „Untergrund“ steht hier im Fließtext mit Erklärung (die Liste mit dem Thema
      // „Untergrund und Abdichtung“ folgt direkt darunter; E-027: keine Marke im Linknamen)
      'Wie muss der [[untergrund|Untergrund]] sein? Was muss abgedichtet werden, und was kostet das? Hier finden Sie Antworten.',
    ],
  },
  // Abnahme E3-BAU-11 (Orchestrator, weicht vom Zusatz ab): die Artikelliste (BlogFilter) steht direkt unter dem Satz, der sie
  // erklärt (Schlitz `zeichnungen.artikel`), statt als Werkzeug nach dem nächsten Schritt am Seitenende
  wissen: [
    {
      titel: 'Alle Artikel auf einen Blick.',
      absatz: 'Jeder Artikel gehört zu einem Thema. Sie wählen ein Thema oder geben einen Begriff in die Suche ein.',
      zeichnung: 'artikel',
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
    // Überschrift wie auf /leistungen und /fliesen (Abnahme, Texthoheit: die Textdatei hatte keine)
    titel: 'Aus unserer Praxis.',
    // Unterschrift: Wörter aus dem Alt-Text der Textdatei, auf höchstens sechs Wörter gekürzt (Regel 4)
    fotos: [{ bild: 'start-galerie-1', unterschrift: 'Dusche ohne Stufe mit Sitzbank', href: '/bad/barrierefreies-bad' }],
    // Satz der Textdatei ohne den Satz zur Handwerkskammer (Regel 3)
    satz: 'Seit 2019 ist die Abdichtung nach [[din-18534|DIN 18534]] bei uns Standard.',
    // Stimme der Textdatei (G8: Wortlaut unverändert); die Kennzeile mit Stand setzt der Baustein Stimmen aus RATING_SUMMARY
    stimmen: ['c-wolf'],
  },
  schritt: {
    titel: 'Haben Sie eine Frage zu Ihrem Bad?',
    satz: 'Rufen Sie uns an oder senden Sie Ihre Anfrage. Deniz Tezgel ruft Sie zurück.',
    // „Häufige Fragen“ ist der Knopf neben dem Hauptknopf der Textdatei; ohne Satz (Zusatz K016, Regel 6.3)
    hilfen: [{ name: 'Häufige Fragen', href: '/faq' }],
    verwandte: [
      { name: 'Bad und Dusche', href: '/bad' },
      { name: 'Fliesen und Verlegung', href: '/fliesen' },
      { name: 'Untergrund und Abdichtung', href: '/untergrund-abdichtung' },
    ],
  },
};

/** Anrisse der Artikelliste je Beitrag (Textdatei Abschnitt 3, wörtlich mit Textmarken); BlogFilter zeigt sie statt der Auszüge */
export const ANRISSE: Record<string, string> = {
  'handwerkerbonus-fliesenarbeiten':
    'Wer im eigenen Zuhause renoviert, kann einen Teil der Handwerkerkosten von der Steuer absetzen. Wir erklären, was bei Fliesenarbeiten zählt und worauf es bei der Rechnung ankommt.',
  'undichte-dusche-warnzeichen':
    'Woran erkennen Sie Feuchtigkeit hinter den Fliesen? Wir zeigen Warnzeichen wie dunkle Fugen, lose Fliesen oder einen muffigen Geruch und sagen, wie Sie richtig reagieren.',
  'feinsteinzeug-oder-naturstein-vergleich':
    'Welcher Belag passt besser, [[feinsteinzeug|Feinsteinzeug]] oder Naturstein? Wir vergleichen Optik, Pflege und Verlegung für Boden, Bad, Treppe und Terrasse.',
  'fliesen-reinigen-pflegen':
    'Welcher Reiniger passt zu Fliesen und Fugen? Wir zeigen, was Sie besser meiden sollten und wann eine Grundreinigung sinnvoll ist.',
  'barrierefreier-balkonaustritt':
    'Wie hoch darf die Schwelle an der Balkontür sein? Wir erklären, welche Regeln gelten und wie sich niedrige Übergänge sauber planen lassen.',
  'wandnischen-dusche-planen':
    'Eine geflieste Nische kann das Duschregal ersetzen. Wir zeigen, worauf es bei Lage, Abdichtung, Kanten und Licht ankommt.',
  'duschrinne-oder-punktablauf':
    'Welcher Ablauf passt in Ihre bodengleiche Dusche? Wir vergleichen die [[duschrinne|Duschrinne]] mit dem [[punktablauf|Punktablauf]]. Dazu zeigen wir, worauf es bei Fliesen, Abdichtung und Reinigung ankommt.',
  'schimmel-fliesenfugen-vermeiden':
    'Was steckt hinter schwarzen Punkten in Fugen und Silikon? Wir zeigen, wie Schimmel entsteht, wie Sie vorbeugen und wann eine Fuge erneuert werden sollte.',
  'fliesen-fuer-allergiker':
    'Können harte Böden Allergikern helfen? Wir erklären, warum sie für Haushalte mit Allergikern in Frage kommen und worauf Sie bei Fugen und Pflege achten sollten.',
  'rutschfeste-fliesen-r-klassen':
    'Wie rutschfest muss eine Fliese sein? Wir erklären die [[rutschhemmung|Rutschhemmung]]. Dazu zeigen wir, für welche Räume welche Klasse passt.',
  'fliesen-mythen-faktencheck':
    'Sind Fliesen kalt und die Fugen immer schmutzig? Wir prüfen gängige Vorurteile über Fliesenböden und zeigen, was moderne Beläge wirklich leisten.',
  'gaeste-wc-fliesen':
    'Wie wirkt ein kleiner Raum größer? Wir zeigen passende Fliesengrößen und Fugen fürs Gäste-WC. Dazu erklären wir, wie die [[vorwand|Vorwand]] und das Handwaschbecken sauber gefliest werden.',
  'fliesenleger-gesucht-geselle-meister':
    'Fliesenverlegung Tezgel in Aßlar sucht eine Fliesenlegerin oder einen Fliesenleger als Geselle (m/w/d). Hier steht, was Sie erwartet und wie Sie sich melden.',
};
