// Inhalt `/fliesen` (Wissensseite, E3-BAU-05) aus `_werkstatt/texte/fliesen.md`: Texte wörtlich mit ihren Textmarken,
// Bauhinweise in Klammern und `{{COMPANY_DATA…}}` nicht übernommen. Nach dem Zusatz E3-BAU-K016: der Satz zur Handwerkskammer
// entfällt (Regel 3, „Seit 2008 …“), die Stimme der Textdatei steht im Beleg. Einstieg mit dem Verlegeplan der Bestandsseite
// (Planblatt, E-037, „wohnen“ wie das Verband-Schema der Bestandsseite). Der große Moment `verband` steht im Wissensblock
// „Alles beginnt mit dem Boden.“ (Schlitz `zeichnungen`); die beiden Absätze dieses Blocks stehen in einem Absatz, weil
// der Block nur einen Text trägt. Die fünf Zeilen „Formate und Technik“ stehen nach der Zeichnung im selben Block (`wege`,
// Abnahme E3-BAU-05: Platz wie in der Textdatei, nach der ersten markierten Nennung von „Untergrund“). Die Kennzeile unter
// der Stimme setzt der Baustein Stimmen aus den Daten; der Beleg trägt die Überschrift wie auf /leistungen.
// Vorlage: WissensSeite (E-025).
import type { WissenInhalt } from '@/components/vorlagen/inhalt';

const VORSPANN =
  'Sie möchten Fliesen verlegen lassen und wissen nicht, worauf es ankommt? Wir erklären das Fachwissen in einfachen Worten: Material und Größe, etwa [[feinsteinzeug|Feinsteinzeug]]. Oder [[grossformat|Großformate]], dazu Holzoptik und Verlegetechniken. Der Fachbetrieb Tezgel aus Aßlar in Hessen zeigt Ihnen, wie Fliesen richtig verlegt werden.';

export const FLIESEN: WissenInhalt = {
  pfad: '/fliesen',
  meta: {
    titel: 'Fliesenverlegung einfach erklärt | Fliesenleger Tezgel',
    beschreibung:
      'Ratgeber und Fachwissen zur Fliesenverlegung: Feinsteinzeug, Großformate, Holzoptik, Verlegetechniken. Fliesenleger Tezgel aus Aßlar in Hessen erklärt es.',
  },
  worum: {
    brotkrumen: [{ name: 'Start', href: '/' }, { name: 'Fliesen und Verlegung' }],
    // H1 aus Abschnitt 1 der Textdatei (der Meta-Eintrag nennt eine andere Fassung, siehe OFFENE FRAGE)
    titel: 'Ratgeber zur Fliesenverlegung, einfach erklärt',
    ort: 'Fliesenverlegung Tezgel aus Aßlar',
    vorspann: VORSPANN,
    // Verlegeplan im Einstieg (E-037, E-044: Wissensseiten mit Plan „zeigen“)
    plan: 'wohnen',
  },
  lage: {
    titel: 'Jeder Raum braucht einen anderen Boden.',
    absaetze: [
      'Ein Bad, eine Küche und ein Flur haben unterschiedliche Aufgaben. Ob Sie neu bauen, im bewohnten Haus renovieren oder nur die Fugen erneuern lassen, hängt vom Raum ab.',
    ],
    // Zeilen mit Link (Abschnitt 2 der Textdatei)
    wege: [
      { name: 'Küche fliesen', satz: 'Hier zählen Fett, Flecken und Fugen, die lange halten.', href: '/fliesen/kueche' },
      {
        name: 'Flur und Diele fliesen',
        satz: 'Hier zählt ein robuster Boden, auf dem man bei nassen Schuhen nicht ausrutscht.',
        href: '/fliesen/flur-diele',
      },
      { name: 'Fliesen im Neubau', satz: 'Wir fliesen, wenn der [[estrich|Estrich]] fertig ist.', href: '/fliesen/neubau' },
      { name: 'Renovierung im bestehenden Haus', satz: 'Wir erneuern den Boden und sorgen für Staubschutz.', href: '/fliesen/renovierung' },
      { name: 'Fugensanierung', satz: 'Schimmelige oder bröselnde Fugen erneuern wir fachgerecht.', href: '/fliesen/fugensanierung' },
      {
        name: 'Fliesen auf Fußbodenheizung',
        satz: 'Hier kommt es auf den richtigen Kleber und die richtigen Fugen an.',
        href: '/fliesen/auf-fussbodenheizung',
      },
    ],
  },
  wissen: [
    {
      titel: 'Alles beginnt mit dem Boden.',
      absatz:
        'Zuerst prüfen wir den [[untergrund|Untergrund]]. Ist er eben und trocken genug, verlegen wir die Fliesen sauber, mit passenden Fugen und Übergängen. Wie die Fliesen angeordnet sind, bestimmt, wie eine Fläche wirkt. Hier sind vier Muster zum Ausprobieren.',
      // großer Moment: die vier Verlegemuster mit ihren Sätzen und den zwei Fotos (Schlitz `zeichnungen.verband`)
      zeichnung: 'verband',
      // Formate und Technik (Textdatei Abschnitt 3), je ein Satz mit Link
      wege: [
        { name: 'Großformate verlegen', href: '/fliesen/grossformat', satz: 'Je größer die Fliese, desto ebener muss der Untergrund sein.' },
        { name: 'Fliesen in Holzoptik', href: '/fliesen/holzoptik', satz: 'Sie sehen aus wie Holzdielen, sind aber Fliesen.' },
        { name: 'Fliesenarten im Vergleich', href: '/fliesen/fliesenarten', satz: 'Wir zeigen, welche Fliese für welchen Raum taugt.' },
        {
          name: 'Verlegetechnik',
          href: '/fliesen/verlegetechnik',
          satz: 'Ein dauerhafter Boden entsteht, wenn Kleber und Fugen zusammenpassen.',
        },
        {
          name: 'Muster, Fugen und Kanten',
          href: '/fliesen/verlegemuster',
          satz: 'Dort zeigen wir, wie die Fugen verlaufen und wie Ecken und Kanten sauber enden.',
        },
      ],
    },
  ],
  ablauf: {
    titel: 'So läuft es bei uns ab.',
    einleitung:
      'Deniz Tezgel ist von der ersten Skizze bis zum Schluss Ihr fester Ansprechpartner. Der Ablauf hat drei Schritte.',
    schritte: [
      {
        titel: 'Termin bei Ihnen vor Ort',
        text: 'Wir messen Ihren Raum aus und sehen uns den Boden an. Dieser Termin ist kostenfrei.',
      },
      {
        titel: 'Material und Fugen wählen',
        text: 'Wir wählen mit Ihnen Fliesen, Kleber und Fugen aus. Danach erhalten Sie ein Angebot mit festem Preis.',
      },
      {
        titel: 'Verlegen und zum Schluss prüfen',
        text: 'Wir verlegen die Fliesen und gehen am Ende gemeinsam alles mit Ihnen durch.',
      },
    ],
    // Link aus der Textdatei: „Gute Fliesenarbeit prüfen“ als Verweis, der Satz davor (Abnahme: Satz steht für sich)
    hinweis: {
      text: 'Woran Sie gute Fliesenarbeit erkennen, erfahren Sie hier.',
      verweis: { name: 'Gute Fliesenarbeit prüfen', href: '/fliesen/abnahme' },
    },
  },
  beleg: {
    // Überschrift wie auf /leistungen (Abnahme, Texthoheit: die Textdatei hatte keine)
    titel: 'So sieht unsere Arbeit aus.',
    // Unterschrift: Wörter aus dem Alt-Text der Textdatei, auf sechs Wörter gekürzt (Regel 4)
    fotos: [{ bild: 'start-galerie-1', unterschrift: 'Dusche mit Sitzbank und Mosaikfliesen', href: '/bad/barrierefreies-bad' }],
    satz: 'Seit 2014 ist das Verlegen großer Fliesen ein Schwerpunkt bei uns.',
    // Stimme der Textdatei (G8: Wortlaut unverändert); die Kennzeile mit Stand setzt der Baustein Stimmen darunter
    stimmen: ['rabia-oe'],
  },
  schritt: {
    titel: 'Haben Sie Fragen zu Ihrem Raum?',
    satz: 'Nennen Sie uns Ihren Namen und Ihre Telefonnummer. Deniz Tezgel ruft Sie zurück und macht einen Termin mit Ihnen aus.',
    // Hilfe: der Konfigurator (Abschnitt 6 der Textdatei); die Zeilen „Formate und Technik“ stehen im Wissensblock
    hilfen: [
      {
        name: 'Projekt im Konfigurator vorbereiten',
        href: '/fliesen/konfigurator',
        satz: 'Hier wählen Sie Raum, Untergrund, Fliesengröße und Fläche.',
      },
    ],
    verwandte: [
      { name: 'Bad und Dusche', href: '/bad' },
      { name: 'Estrich und Untergrund', href: '/untergrund-abdichtung/estrich-belegreife' },
    ],
  },
};
