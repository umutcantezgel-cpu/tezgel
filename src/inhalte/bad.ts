// Inhalt `/bad` (Erzählseite, Bereich Bad, E3-BAU-01) aus `_werkstatt/texte/bad.md`: Texte wörtlich mit ihren Textmarken,
// Bauhinweise in Klammern und „→“ nicht übernommen. Nach dem Zusatz E3-BAU-K016 (Regeln 1 bis 6, Abschnitt 4): mittiger
// Einstieg, Vorspann als `tun.einleitung`, Firmendaten-Satz zur Handwerkskammer entfällt, Bildunterschriften gekürzt aus
// dem Text, Stimmen mit der Stimme der Textdatei zuerst. Vorlage: ErzaehlSeite (E-025).
import type { ErzaehlInhalt } from '@/components/vorlagen/inhalt';

const VORSPANN =
  'Vielleicht ist Ihr Bad in die Jahre gekommen, und Sie wissen nicht, wo Sie anfangen sollen. Wir bauen es für Sie um, Schritt für Schritt. Passen große Fliesen oder eine [[bodengleiche-dusche|bodengleiche Dusche]] zu Ihrem Bad? Das besprechen wir mit Ihnen.';

export const BAD: ErzaehlInhalt = {
  pfad: '/bad',
  meta: {
    titel: 'Ihr neues Bad in Aßlar & Wetzlar | Fliesenverlegung Tezgel',
    beschreibung:
      'Badsanierung in Aßlar und Wetzlar: altes Bad umbauen, große Fliesen verlegen, Abdichtung nach DIN 18534. Festpreisangebot, Termin vor Ort kostenfrei.',
  },
  worum: {
    brotkrumen: [{ name: 'Start', href: '/' }, { name: 'Bad' }],
    // mittig (K-016): die H1 steht in zwei Zeilen; ihre Teile ergeben zusammen die H1 aus dem Text
    einstieg: 'mitte',
    titelZeilen: ['Aus Ihrem alten Bad wird ein neues,', 'das Sie gern nutzen.'],
    titel: 'Aus Ihrem alten Bad wird ein neues, das Sie gern nutzen.',
    ort: 'Für Aßlar, Wetzlar und Umgebung.',
    // im mittigen Einstieg nicht gezeigt; der Vorspann steht als `tun.einleitung` auf der Seite (Regel 2)
    vorspann: VORSPANN,
    // Wanne und Ornamentboden ab rund 45 % der Höhe: das fertige Bad im ersten Bildschirm (UM-E4-SICHT-FIX M-A2; vorher
    // bad-einstieg mit Decke und Fenster oben, jetzt Einstieg von /leistungen)
    bild: 'bad-beleg-1',
    bewertung: true,
    // Plan-Vignette des Bads am rechten Ende der Schnur, erst ab xl (bei t1024 hielte die H1 mit Zeichen nur 1,12 × H2; M-A1 Nr. 3)
    schnurZeichen: { vignette: 'bad', ab: 'xl' },
  },
  lage: {
    // auf Fliese wie auf /: sichtbare Grenze nach dem Einstieg, die Flächen wechseln ab hier (UM-E3-FIX2 N8, UM-E4-CHOR-FIX);
    // sonst lagen Einstieg, Lage und „Was wir tun“ als drei Abschnitte auf Kalk in Folge
    aufFliese: true,
    titel: 'Was soll in Ihrem Bad anders werden?',
    absaetze: [
      'Vielleicht fällt Ihnen der Einstieg in die Wanne schwer. Vielleicht sind die Fliesen alt und die Fugen schwarz geworden. Wählen Sie, was am besten passt.',
    ],
    wege: [
      { name: 'Bad komplett erneuern', satz: 'Wir bauen das alte Bad aus und richten es ganz neu ein.', href: '/bad/badsanierung' },
      { name: 'Dusche statt Wanne', satz: 'Die Wanne geht raus, eine Dusche ohne Stufe kommt hinein.', href: '/bad/barrierefreies-bad' },
      { name: 'Große Fliesen im Bad', satz: 'Große Fliesen mit wenigen Fugen, die wir gerade und sauber verlegen.', href: '/bad/fliesen' },
      {
        name: 'Alles aus einer Hand',
        satz: 'Deniz Tezgel bleibt Ihr fester Ansprechpartner, von der ersten Skizze bis zum fertigen Bad.',
        href: '/bad/bad-aus-einer-hand',
      },
      { name: 'Ideen nach Badgröße', satz: 'Hier sehen Sie, wie Bäder verschiedener Größe aussehen können.', href: '/bad/musterbaeder' },
    ],
  },
  tun: {
    titel: 'Wir arbeiten Schicht für Schicht.',
    // Vorspann der Textdatei (Regel 2): so bleibt er für Suchmaschinen auf der Seite
    einleitung: VORSPANN,
    // Zeichnung zuerst (UM-E4-SICHT-FIX M-C1 Nr. 3, M-B7): die Szene „schichten“ direkt nach Kopf und Einleitung, die Punkte
    // und der DIN-Satz danach. „Untergrund“ und „Abdichtung“ stehen so zuerst in der Legende der Szene und tragen dort die
    // Marke mit der Erklärung (Schichten `fachwort`); hier stehen sie danach ohne Marke (Wortlaut gleich, K-011)
    momentZuerst: true,
    punkte: [
      'Zuerst prüfen wir den Untergrund. Dann machen wir ihn bereit für die neuen Schichten.',
      'Der Duschboden bekommt ein leichtes [[gefaelle|Gefälle]].',
      'Auf dem Untergrund kommt eine Abdichtung.',
      'Im Bad verlegen wir rutschfeste Fliesen. Je nach Raum haben sie die [[rutschhemmung|Rutschhemmung R10 oder R11]].',
    ],
    // ohne den Satz zur Handwerkskammer (Regel 3)
    absatz: 'Seit 2019 arbeiten wir bei der Abdichtung standardmäßig nach [[din-18534|DIN 18534]].',
  },
  ablauf: {
    titel: 'So läuft Ihre Badsanierung ab.',
    schritte: [
      {
        titel: 'Termin bei Ihnen vor Ort',
        text: 'Deniz Tezgel schaut sich Ihr Bad genau an und prüft Boden und Wände. Der Termin ist kostenfrei.',
      },
      {
        titel: 'Planen und auswählen',
        text: 'Sie wählen mit uns Fliesen und Ausstattung aus. Danach bekommen Sie ein Festpreisangebot. Das heißt: Der Preis steht fest.',
      },
      {
        titel: 'Umbauen und übergeben',
        text: 'Wir schützen Ihre Wohnung vor Staub und übergeben Ihnen das Bad sauber gefegt. Am Ende gehen wir es gemeinsam mit Ihnen durch.',
      },
    ],
    hinweis: {
      text: 'Haben Sie einen Pflegegrad? Dann kann die Pflegekasse bis zu 4.180\u00A0€ je Person dazugeben. Das gilt für einen [[barrierefrei|barrierefreien]] Umbau.',
      verweis: { name: 'Mehr zum Zuschuss', href: '/foerderung' },
    },
  },
  beleg: {
    titel: 'Bäder, die wir gebaut haben.',
    // Unterschriften: Wörter aus dem Text, höchstens sechs, ohne Punkt (Regel 4); Wege nach Leistung
    fotos: [
      // bad-beleg-1 ist der Einstieg der Seite (M-A2); an seine Stelle tritt das bisherige Einstiegsbild, nicht als erstes
      { bild: 'bad-beleg-2', unterschrift: 'Wanne unter weißen Fliesen', href: '/bad/badsanierung' },
      { bild: 'bad-einstieg', unterschrift: 'Helles Bad mit Glasdusche', href: '/bad/badsanierung' },
      { bild: 'bad-beleg-3', unterschrift: 'Doppelwaschtisch aus dunklem Holz', href: '/bad/badsanierung' },
    ],
    // Stimme der Textdatei zuerst, dann Stimmen aus REVIEWS zum Thema Bad (Regel 5, G8: Wortlaut unverändert)
    stimmen: ['peter-p', 'elke-s', 'c-wolf', 'ute-t', 'k-d'],
    // Stimmen auf Kalk (UM-E4-CHOR-FIX, nur die Fläche): sonst stünden Stimmen, nächster Schritt und Anfragewege als drei
    // Abschnitte auf Fliese in Folge; die Anfragewege mit Projektcheck und Badanfrage bleiben auf Fliese (Formulare nie auf Kalk)
    stimmenAufKalk: true,
    verweis: { name: 'Alle Arbeiten ansehen', href: '/referenzen' },
  },
  schritt: {
    titel: 'Sprechen Sie mit uns über Ihr neues Bad.',
    satz: 'Rufen Sie an oder fragen Sie einen Termin an. Dann besprechen wir den nächsten Schritt gemeinsam.',
    hilfen: [
      { name: 'Badanfrage', href: '/bad/badanfrage', satz: 'Schreiben Sie uns, was Sie sich für Ihr Bad wünschen.' },
      { name: 'Projektcheck', href: '/bad/projekt-check', satz: 'Mit wenigen Fragen sehen Sie online, was bei Ihrem Bad möglich ist.' },
      // bleibt verlinkt wie im Bestand (Abnahme E3-BAU-01; die Seite steht auch im Menü)
      { name: 'Badplaner', href: '/bad/badplaner' },
    ],
  },
};
