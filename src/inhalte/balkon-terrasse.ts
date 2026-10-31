// Inhalt `/balkon-terrasse` (Erzählseite) aus dem Seitentext `_werkstatt/texte/balkon-terrasse.md` (wörtlich, Textmarken
// unverändert; Bauhinweise in Klammern und die Zeile „Muster“ nicht übernommen). Vorlage: ErzaehlSeite. Einstieg mittig
// (K-016, E-047, Regel 1 des Zusatzes); der Vorspann steht als Einleitung von „Was wir tun“ (Regel 2). Fotos mit Kennungen
// aus `src/config/arbeiten.ts`; die Textdatei nennt für vier Fotos keine Unterschrift, dort ist der Alt-Text gekürzt
// (Regel 4). Stimmen: `hasan-oe` aus der Textdatei zuerst, dazu aus `src/config/reviews.js` (Wortlaut unverändert, G8).
import type { ErzaehlInhalt } from '@/components/vorlagen/inhalt';

const VORSPANN =
  'Draußen kommt es auf mehr an als auf die Fliese. Wir verlegen Platten auf Balkon und Terrasse, auch auf Stelzlagern. Wir erklären Ihnen in einfachen Worten, welcher Aufbau zu Ihrer Fläche passt.';

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
    // Plan-Vignette „außen“ am rechten Ende der Schnur ab lg (UM-E4-SICHT-FIX M-A1 Nr. 3)
    schnurZeichen: { vignette: 'aussen', ab: 'lg' },
  },
  lage: {
    // auf Fliese wie auf /: sichtbare Grenze nach dem Einstieg, die Flächen wechseln ab hier (UM-E3-FIX2 N8, UM-E4-CHOR-FIX)
    aufFliese: true,
    titel: 'Draußen leidet der Belag unter Regen und Frost.',
    absaetze: [
      'Vielleicht stehen nach einem Regen Pfützen auf Ihrem Balkon, oder Platten wackeln. Sie wissen nicht, ob der Belag noch hält.',
      'Am besten sehen wir uns das gemeinsam an. Dann wissen Sie, woran es liegt und was zu tun ist.',
    ],
    wege: [
      // Name und Satz getrennt (Abnahme E3-BAU-06); „Stelzen“ im Namen, das Fachwort mit Erklärung im Satz (Glossar: erste
      // Nennung erklärt, K-011); der Vorspann darunter nennt das Wort ohne zweite Erklärung (Browserprüfung E4-W1, Runde 3)
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
      'Das Wasser läuft ab. Der Belag bekommt ein [[gefaelle|Gefälle]] von mindestens 1,5 bis 2\u00A0%.',
      'Platten auf Stelzlagern. Ob Stelzlager zu Ihrer Fläche passen, prüfen wir vor Ort, bevor wir einen Belag planen.',
      'Die richtige Oberfläche. Wir verlegen Platten mit [[rutschhemmung|Rutschhemmung R10 oder R11]], je nach Raum.',
      // „Abdichtung“ erklärt seit M-B7 (momentZuerst) die Legende der Gefälle-Zeichnung davor (GefaelleBalkon `fachwort`)
      'Der Aufbau darunter. Auch der [[untergrund|Untergrund]] gehört zu unseren Leistungen. Ebenso die Abdichtung.',
    ],
    // großer Moment zuerst (K-009, M-B7): die Gefälle-Zeichnung direkt nach Kopf und Satz, die Prüfliste danach (Sicht
    // Anlauf 1, b3: die Zeichnung stand klein unter der Prüfliste)
    momentZuerst: true,
  },
  // Vergleich der Aufbauten (UM-E4-EP1, Rückführung nach UM-5): Wortlaut aus der Seite vor dem Relaunch, Abschnitt „Aufbauten im
  // Vergleich: Stelzlager, Splittbett, gebunden“ mit CONSTRUCTIONS, den Zeilen der Tabelle und dem Hinweis zur Plattenstärke
  // (eingeführt in 693ff2d6, unverändert in 5a7a7b06 vor relaunch(P0-ORCH-01) und in E0 c53faf4,
  // `src/app/(bestand)/balkon-terrasse/page.jsx`). Angepasst nur nach K-011: Überschrift ohne „Begriff: Erklärung“ (das
  // Stichwort der Unterseiten „Aufbauten im Vergleich“ bleibt), Komma statt Gedankenstrich, „2 cm starke Platten“ statt
  // „2-cm-Platten“ (Ersetzung im Bestand), Punkt statt Gedankenstrich im Hinweis. Fachwörter mit Glossarerklärung beim ersten
  // Vorkommen auf der Seite, und das liegt in den Zellen (K-011, Nacharbeit): Feinsteinzeug in „Stelzlager, Platten“ (dafür
  // „aus Feinsteinzeug oder geeignetem Naturstein“ statt der Klammer, sonst stünde die Erklärung in einer zweiten Klammer),
  // Mörtelbett in „Gebundene Verlegung, Aufbauhöhe“; Spalte „gebunden“ und Hinweis nennen Feinsteinzeug danach ohne Erklärung.
  // Die Brotkrumen und Links „Aufbauten im Vergleich“ der Unterseiten zeigen wieder auf einen Vergleich.
  vergleich: {
    titel: 'Drei Aufbauten im Vergleich.',
    // offen neben Schnitt und Name (M-B4): „Geeignet für“ entscheidet die Wahl; die übrigen Merkmale im Aufklapper
    offen: 'geeignet',
    einleitung:
      'Alle drei Bauweisen funktionieren, wenn sie zur Fläche passen. Entscheidend sind verfügbare Aufbauhöhe, Untergrund und der Weg, den das Wasser nehmen soll.',
    kriterien: [
      { id: 'hoehe', name: 'Aufbauhöhe' },
      { id: 'wasser', name: 'Entwässerung' },
      { id: 'platten', name: 'Platten' },
      { id: 'geeignet', name: 'Geeignet für' },
      { id: 'revision', name: 'Revision' },
    ],
    spalten: [
      {
        name: 'Stelzlager',
        schnitt: 'stelzlager',
        werte: {
          hoehe: 'Mittel bis hoch, über die Lager stufenlos einstellbar',
          wasser: 'Wasser läuft durch offene Fugen auf die Abdichtungsebene und dort im Gefälle ab',
          platten: '2\u00A0cm starke Platten aus [[feinsteinzeug|Feinsteinzeug]] oder geeignetem Naturstein',
          geeignet: 'Balkon, Loggia, Dachterrasse auf tragfähiger, abgedichteter Fläche',
          revision: 'Platten einzeln abnehmbar, Abdichtung und Abläufe bleiben zugänglich',
        },
      },
      {
        name: 'Splittbett (ungebunden)',
        schnitt: 'splittbett',
        werte: {
          hoehe: 'Mittel, abhängig von Bettungsdicke und Unterbau',
          wasser: 'Wasser versickert über Fugen und Bettung in einen wasserdurchlässigen Unterbau',
          platten: '2\u00A0cm starke Platten oder dickere Terrassenplatten',
          geeignet: 'Vor allem Terrassen auf Erdreich mit tragfähigem, frostsicherem Unterbau',
          revision: 'Platten aufnehmbar, Bettung lässt sich nachrichten',
        },
      },
      {
        name: 'Gebundene Verlegung',
        schnitt: 'gebunden',
        werte: {
          hoehe: 'Gering, Belag im Kleber- bzw. [[duennbett|Mörtelbett]] auf der Abdichtung',
          wasser: 'Wasser fließt auf der Belagsoberfläche im Gefälle ab, Fugen sind geschlossen',
          platten: 'Frostbeständiges Feinsteinzeug in üblicher Stärke möglich',
          geeignet: 'Flächen mit knapper Aufbauhöhe, wenn Gefälle und Abdichtung darunter stimmen',
          revision: 'Kein zerstörungsfreier Zugang zur Abdichtung',
        },
      },
    ],
    hinweis: {
      stichwort: 'Plattenstärke',
      text: '2\u00A0cm starke Platten sind für Stelzlager und Splittbett nötig, weil sie dort frei spannen bzw. punktuell aufliegen. Bei gebundener Verlegung trägt das Bett die Platte vollflächig. Dann genügt frostbeständiges Feinsteinzeug in üblicher Stärke.',
    },
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
    // Drittelverband in der Reihe wie auf / (K-003 Nr. 4, UM-E4-CHOR-FIX): je Bildschirm der Reihe ein Versatz
    fotosVersatz: true,
    // Stimme der Textdatei zuerst, dann vier weitere aus src/config/reviews.js (Thema Balkon, Fliesen verlegen, Boden, Haus)
    stimmen: ['hasan-oe', 'rabia-oe', 'erik-s', 'kathrin-w', 'sara-j'],
    // öffnet die Galerie auf /referenzen mit der Auswahl „Balkon und Terrasse“ (GalerieWahl liest ?raum=)
    verweis: { name: 'Alle Arbeiten ansehen', href: '/referenzen?raum=balkon-und-terrasse#unsere-arbeiten' },
  },
  // Qualitätsversprechen (UM-E4-EP3) vor dem nächsten Schritt; Wortlaut aus COMPANY_DATA.qualityPromises. Die Abdichtung erklärt
  // die Legende der Gefälle-Zeichnung (außerhalb des Inhalts)
  versprechen: { erklaert: ['abdichtung'] },
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
  // Folge (K-009, M-B7): Fotos und Stimmen direkt nach der Lage, die echten Arbeiten kamen vorher erst nach drei Vierteln der
  // Seite (Sicht Anlauf 1, a4)
  belegVorn: true,
};
