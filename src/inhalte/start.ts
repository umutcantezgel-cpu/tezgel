// Inhalt der Startseite (KERN v3 K-009, Seitenformel; Text _werkstatt/texte/REF-start.md, E2-ORCH-06; E-044): wörtlich aus
// den bisherigen Bausteinen der Startseite (src/components/start/*) übernommen, gesetzt von der Vorlage ErzaehlSeite. Seit
// E-047 ruhig nach K-016: Einstieg mittig mit dem Satz des Auftraggebers, Bilder vollständig, Stimmen als Karussell, die
// Belege stehen als Laufband im Fuß.
// Preisrechner und Express-Anfrage stehen nicht hier, sondern auf ihren übrigen Seiten (E-012, LAGEBILD F-02, F-03); alle
// Hauptknöpfe dieser Seite führen zum Formular #termin (hauptziel in navigation.js).
import type { ErzaehlInhalt } from '@/components/vorlagen/inhalt';

export const START: ErzaehlInhalt = {
  pfad: '/',
  // Leitfaden mit Präsenz (UM-E4-START, Sicht Anlauf 3): mobil steht das Lot auf der Satzkante statt im Rand
  lotAnDerSatzkante: true,
  meta: {
    titel: 'Fliesenleger Aßlar und Wetzlar | Fliesenverlegung Tezgel',
    beschreibung: 'Fliesenverlegung Tezgel aus Aßlar: Badsanierung, Böden, Balkon und Terrasse für Wetzlar und Umgebung. Der Termin bei Ihnen vor Ort ist kostenfrei.',
  },
  worum: {
    brotkrumen: [],
    // Wortlaut des Auftraggebers (E-047): mittig und kleiner als vorher, darunter was und wo
    einstieg: 'mitte',
    titel: 'Perfektion auf jedem Quadratmeter.',
    titelZeilen: ['Perfektion auf', 'jedem Quadratmeter.'],
    titelGross: true,
    // Strichzeichnung eines Quadratmeters mit Bemaßung an der Schnur: belegt die H1 (UM-E3-FIX2 N5)
    quadratmeter: true,
    // H1 mit der Grundlinie auf der Schnur, Maß an „Quadratmeter.“, Lot bis zum Foto, mobil Foto vor dem Vorspann (UM-E4-START)
    schnurFigur: true,
    // Startfoto als echtes Querformat aus dem Bestand, Boden und Wand ganz im Bild (UM-E4-START, E-047): unter lg 3 : 2
    // (Startbild), ab lg dieser Zuschnitt 16 : 9 (Bildauswahl je Breite)
    bildQuer: 'start-bad-gross',
    ort:'Fliesenverlegung und Badsanierung aus Aßlar',
    vorspann: 'Deniz Tezgel kommt selbst zu Ihnen, schaut sich alles an und sagt Ihnen, was zu tun ist. Danach verlegt er mit seinem Team Fliese für Fliese.',
    bewertung: true,
  },
  lage: {
    // auf Fliese: sichtbare Grenze nach dem Einstieg, die Flächen wechseln ab hier (UM-E3-FIX2 N8)
    aufFliese: true,
    titel: 'Was möchten Sie ändern?',
    einleitung: 'Wählen Sie, was am besten passt. Sie kommen direkt zu den Bildern und Antworten für Ihre Lage.',
    // Fotos anders als in der Galerie „So sieht unsere Arbeit aus.“, damit kein Bild doppelt erscheint (Sichtprüfung E2); nur
    // der Schaden ist gezeichnet, dafür gibt es kein Foto (E-040). Eine Auswahlebene (UM-E4-START, Sicht Anlauf 3): Die
    // Plan-Zeichnungen aus „Was wir tun“ stehen je Lage links in ihrer Zeile (Dusche, Schnitt am Wandanschluss, Raum im
    // Verband, Reparatur, Terrasse, Treppe); die Ziele bleiben
    fliesen: [
      { satz: 'Die Badewanne soll raus. Ich möchte eine Dusche ohne Stufe.', href: '/bad/barrierefreies-bad', bild: 'start-lage-dusche', vignette: 'bad' },
      { satz: 'Das ganze Bad ist alt und soll neu werden.', href: '/bad/badsanierung', bild: 'start-lage-bad', vignette: 'untergrund' },
      { satz: 'Im Neubau sollen Böden und Wände gefliest werden.', href: '/fliesen/neubau', bild: 'start-lage-neubau', vignette: 'wohnen' },
      { satz: 'Eine Fliese ist gesprungen, oder die Fugen sind alt.', href: '/fliesenreparatur', motiv: 'riss', vignette: 'reparatur' },
      { satz: 'Auf dem Balkon bleibt nach dem Regen Wasser stehen.', href: '/balkon-terrasse', bild: 'start-lage-balkon', vignette: 'aussen' },
      { satz: 'Die Treppe vor dem Haus ist kaputt.', href: '/treppen/aussentreppe', bild: 'start-lage-treppe', vignette: 'treppe' },
    ],
  },
  tun: {
    titel: 'Wir kümmern uns um alles, was mit Fliesen zu tun hat.',
    // Kopf mittig (K-016; UM-E4-START, Sicht Anlauf 3: vorher linksbündig an der Laserlinie)
    // ein Satz statt Theorie neben den Zeichnungen (E-047); der Satz stand vorher als H1
    einleitung: 'Wir verlegen Fliesen in Bad, Küche, Flur und auf dem Balkon.',
    // die vier Bereiche als ruhige Zeile mit Links (UM-E4-START): Ihre Plan-Zeichnungen stehen jetzt in den Zeilen der Lage,
    // eine Auswahl statt zwei; Namen und Ziele wie vorher
    leistungen: [
      { name: 'Badsanierung und neue Dusche', href: '/bad' },
      { name: 'Böden und Wände in Haus und Wohnung', href: '/leistungen/wohnen' },
      { name: 'Balkon, Terrasse und Treppen', href: '/balkon-terrasse' },
      { name: 'Reparatur von Fliesen und Fugen', href: '/fliesenreparatur' },
    ],
  },
  ablauf: {
    titel: 'So kommen Sie zu Ihrem neuen Boden.',
    // ein Moment mit Gewicht in der Mitte (UM-E4-START): Die rote Stufenlinie reißt beim Eintritt Stufe für Stufe an
    anriss: true,
    schritte: [
      {
        titel: 'Termin bei Ihnen vor Ort',
        text: 'Deniz Tezgel kommt zu Ihnen. Er schaut sich den Raum genau an und prüft den [[untergrund|Untergrund]]. Dieser Termin ist für Sie kostenfrei.',
      },
      {
        titel: 'Planen und auswählen',
        text: 'Sie suchen mit uns Fliesen, ihre Größe und die Farbe der Fugen aus. Danach bekommen Sie ein Angebot mit festem Preis.',
      },
      {
        titel: 'Verlegen und übergeben',
        text: 'Wir verlegen sauber und übergeben den Raum besenrein. Zum Schluss gehen wir alles gemeinsam durch.',
      },
    ],
    // die Belege aus dem Faktenblatt stehen seit E-047 als Laufband im Fuß (auf jeder Seite)
  },
  beleg: {
    titel: 'So sieht unsere Arbeit aus.',
    // fünf echte Fotos fertiger Arbeiten, vollständig, keines auf einer anderen Hauptansicht (E4-W0-BILDER); der Name steht
    // auf der Glasfläche, sagt nur, was zu sehen ist, und führt zur passenden Leistung (E-047)
    fotos: [
      { bild: 'start-galerie-1', unterschrift: 'Dusche mit Sitzbank und Mosaik', href: '/bad/barrierefreies-bad' },
      { bild: 'start-beleg-bad', unterschrift: 'Badewanne mit dunklem Mosaik', href: '/bad/badsanierung' },
      { bild: 'start-beleg-dusche', unterschrift: 'Dusche mit Glastür und Mosaik', href: '/bad' },
      { bild: 'start-beleg-terrasse', unterschrift: 'Terrasse mit blaugrauen Fliesen', href: '/balkon-terrasse' },
      { bild: 'start-beleg-treppe', unterschrift: 'Außentreppe in Anthrazit', href: '/treppen/aussentreppe' },
    ],
    // im Drittelverband: je Bildschirm der Reihe steht ein Foto um ein Drittel tiefer (UM-E3-FIX F4)
    fotosVersatz: true,
    // ohne Maus (Tablet) der Name auf dem kurzen Verlauf wie mobil, der Boden bleibt sichtbar (UM-E4-START)
    fotosVerlauf: true,
    verweis: { name: 'Alle Arbeiten ansehen', href: '/referenzen' },
    // Wortlaut aller Stimmen unverändert aus REVIEWS (G8)
    // als langsames Karussell (E-047), seit UM-E3-FIX F4 mit einer großen Stimme je Schritt statt drei Karten nebeneinander
    stimmen: ['c-wolf', 'rabia-oe', 'elke-s', 'hasan-oe', 'ute-t', 'peter-p', 'christian-d', 'sara-j'],
    stimmenGross: true,
    stimmenEinzeln: true,
    // Karte um ein Drittel versetzt, Kennzeile im freien Drittel (UM-E4-START); der Wortlaut steht ganz (E-097)
    stimmenVersatz: true,
    orte: {
      titel: 'Hier sind wir für Sie unterwegs.',
      einleitung: 'Unser Betrieb sitzt in Aßlar. Wir arbeiten in Wetzlar, Gießen, Herborn und den Orten rundherum.',
    },
  },
  schritt: {
    titel: 'Termin vor Ort anfragen',
    satz: 'Schreiben Sie uns Ihren Namen und Ihre Telefonnummer. Deniz Tezgel ruft Sie zurück und macht einen Termin mit Ihnen aus.',
  },
};
