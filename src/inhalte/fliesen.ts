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
    // H1 als Aussage des Betriebs in Hauptansichtsgröße, kurz genug für den ersten Bildschirm bei 200 % (E3-SICHT, E-061)
    titel: 'So verlegen wir Fliesen, einfach erklärt.',
    ort: 'Fliesenverlegung Tezgel aus Aßlar',
    vorspann: VORSPANN,
    // Verlegeplan im Einstieg (E-037, E-044: Wissensseiten mit Plan „zeigen“). Seit UM-E4-SICHT-FIX-2 M2-C4 (E-113 Nr. 6) rückt
    // er beim Laden einmal in die Flucht (Registerbewegung sig-plan „laden“, reduziert in der Flucht). Abbruchkriterium: Liegt
    // Lighthouse mobil /fliesen im Median aus sechs Läufen unter 91, fällt diese Zeile (zurück auf „zeigen“), dazu Register und K-008
    plan: 'wohnen',
    planFlucht: 'laden',
  },
  lage: {
    // auf Fliese wie auf / (UM-E4-CHOR-FIX): Einstieg, Lage und der Wissensblock lagen sonst als drei Abschnitte auf Kalk in Folge
    aufFliese: true,
    titel: 'Jeder Raum braucht einen anderen Boden.',
    absaetze: [
      'Ein Bad, eine Küche und ein Flur haben unterschiedliche Aufgaben. Ob Sie neu bauen, im bewohnten Haus renovieren oder nur die Fugen erneuern lassen, hängt vom Raum ab.',
    ],
    // Zeilen mit Link (Abschnitt 2 der Textdatei). Plan-Vignetten (UM-E4-SICHT-FIX-2 M2-C4 Nr. 3, Sicht E4 Anlauf 2 3a hoch:
    // Raumliste mit passender Plan-Vignette), keine zweimal in der Liste, nur wo eine vorhandene das Thema zeigt: die zwei Räume
    // (Raum in Großformat mit Tür, Eingang mit Stufen) und die zwei Lagen (Estrich im Schnitt, eingesetztes neues Stück) in den
    // ersten beiden Reihen. Die letzte Reihe (Fugen, Fußbodenheizung) bleibt ohne Zeichnung: Keine vorhandene zeigt ihr Thema
    // (Dusche und Terrasse zeigten etwas anderes), und die Verlegemuster stehen auf Fliese blass wie leere Felder (M-B2 Nr. 2);
    // verlegekante trüge dazu ein zweites Rot neben der Leitachse. Entscheidungsvermerk in der Notiz SF2-C
    wege: [
      { name: 'Küche fliesen', satz: 'Hier zählen Fett, Flecken und Fugen, die lange halten.', href: '/fliesen/kueche', vignette: 'wohnen' },
      {
        name: 'Flur und Diele fliesen',
        satz: 'Hier zählt ein robuster Boden, auf dem man bei nassen Schuhen nicht ausrutscht.',
        href: '/fliesen/flur-diele',
        vignette: 'treppe',
      },
      { name: 'Fliesen im Neubau', satz: 'Wir fliesen, wenn der [[estrich|Estrich]] fertig ist.', href: '/fliesen/neubau', vignette: 'untergrund' },
      { name: 'Renovierung im bestehenden Haus', satz: 'Wir erneuern den Boden und sorgen für Staubschutz.', href: '/fliesen/renovierung', vignette: 'reparatur' },
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
      // Formate und Technik (Textdatei Abschnitt 3), je ein Satz mit Link; als Fugenfeld 3 + 2 im Halbverband, anders gebaut als
      // die Raumliste der Lage (UM-E4-SICHT-FIX-2 M2-C4 Nr. 4, Sicht E4 Anlauf 2: drei gleich gebaute Linkblöcke)
      wegeForm: 'reihe',
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
    titel: 'Vom ersten Anruf bis zur letzten Fuge.',
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
    titel: 'Fliesen, die wir verlegt haben.',
    // Unterschrift: Wörter aus dem Alt-Text der Textdatei, auf sechs Wörter gekürzt (Regel 4)
    // fertige Dusche statt Rohbau (Browserprüfung E4-W1, Runde 2: das frühere Foto zeigte offene Anschlüsse und Ablauf)
    // drei vorhandene Fotos nach Raum als Reihe statt eines Fotos (UM-E4-SICHT-FIX M-C7 Nr. 3): Bad, Treppe, Balkon; ohne
    // start-dusche (seit M-A2 Aufmacher von /referenzen). Zuerst große Fliesen, wie der Satz darunter sagt (Nacharbeit SF-C2: die
    // erste Wahl zeigte keine großen Fliesen). Außerhalb der Galerie steht jedes damit zweimal (/ und /fliesen, M-A2). Alle drei
    // quadratisch (Nacharbeit 2: ein Hochformat in der Mitte ließ die Reihe mobil beim Blättern um 90 px springen). Namen auf
    // der Glasfläche aus Wörtern des Alt-Texts (Mikrotext, höchstens sechs Wörter)
    // UM-E4-SICHT-FIX-2 M2-C4 Nr. 5 (Sicht E4 Anlauf 2: Fotoreihe weich): das scharfe Großformat zuerst (start-lage-balkon), dann
    // die Eckbadewanne (start-lage-bad, Name aus dem Alt-Text), dann der Hauseingang; die weiche Dusche (start-lage-dusche) verlässt
    // /fliesen. Alle drei weiter quadratisch, außerhalb der Galerie jedes höchstens zweimal
    fotos: [
      { bild: 'start-lage-balkon', unterschrift: 'Balkon mit hellgrauen Großformatfliesen', href: '/balkon-terrasse' },
      { bild: 'start-lage-bad', unterschrift: 'Eckbadewanne mit grauer Verkleidung', href: '/bad' },
      { bild: 'start-lage-treppe', unterschrift: 'Hauseingang mit beigen Fliesen auf Stufen', href: '/treppen' },
    ],
    // Drittelverband in der Reihe wie auf /leistungen (K-003 Nr. 4)
    fotosVersatz: true,
    satz: 'Seit 2014 ist das Verlegen großer Fliesen ein Schwerpunkt bei uns.',
    // Stimme der Textdatei (G8: Wortlaut unverändert); die Kennzeile mit Stand setzt der Baustein Stimmen darunter
    stimmen: ['rabia-oe'],
  },
  // Qualitätsversprechen (UM-E4-EP3) vor dem nächsten Schritt; Wortlaut aus COMPANY_DATA.qualityPromises. `erklaert`: Abdichtung
  // und Randfuge erklärt die Bildunterschrift der Schichtzeichnung (fliesen/page.jsx, außerhalb des Inhalts; M2-C4 Nr. 2). Offen
  // drei Punkte (UM-E4-SICHT-FIX-2 M2-A3, Darstellung SF2-A): 3 Abdichtung nach DIN 18534 (die Zeichnung zeigt die Abdichtung, die
  // Norm nennt die Seite sonst nicht), 5 Termintreue (sonst nirgends), 7 Werkstoffe und Markenkleber (die Raumliste nennt nur „den
  // richtigen Kleber“). Nicht 2 (Großformat im Satz des Belegs und in den Wegen), 6 (Staubschutz in der Raumliste), 1 und 4
  // (Ablauf 01 und 02), 8 (Inhaber nur auf /ueber-uns)
  versprechen: { erklaert: ['abdichtung', 'randfuge'], offen: [3, 5, 7] },
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
