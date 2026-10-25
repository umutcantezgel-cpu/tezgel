// Inhalt der Startseite (KERN v3 K-009, Seitenformel; Text _werkstatt/texte/REF-start.md, E2-ORCH-06; E-044): wörtlich aus
// den bisherigen Bausteinen der Startseite (src/components/start/*) übernommen, gesetzt von der Vorlage ErzaehlSeite. Seit
// E-047 ruhig nach K-016: Einstieg mittig mit dem Satz des Auftraggebers, Bilder vollständig, Stimmen als Karussell, die
// Belege stehen als Laufband im Fuß.
// Preisrechner und Express-Anfrage stehen nicht hier, sondern auf ihren übrigen Seiten (E-012, LAGEBILD F-02, F-03); alle
// Hauptknöpfe dieser Seite führen zum Formular #termin (hauptziel in navigation.js).
import type { ErzaehlInhalt } from '@/components/vorlagen/inhalt';

export const START: ErzaehlInhalt = {
  pfad: '/',
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
    ort: 'Fliesenverlegung und Badsanierung aus Aßlar',
    vorspann: 'Deniz Tezgel kommt selbst zu Ihnen, schaut sich alles an und sagt Ihnen, was zu tun ist. Danach verlegt er mit seinem Team Fliese für Fliese.',
    bewertung: true,
  },
  lage: {
    titel: 'Was möchten Sie ändern?',
    einleitung: 'Wählen Sie, was am besten passt. Sie kommen direkt zu den Bildern und Antworten für Ihre Lage.',
    // Fotos anders als in der Galerie „So sieht unsere Arbeit aus.“, damit kein Bild doppelt erscheint (Sichtprüfung E2); nur
    // der Schaden ist gezeichnet, dafür gibt es kein Foto (E-040)
    fliesen: [
      { satz: 'Die Badewanne soll raus. Ich möchte eine Dusche ohne Stufe.', href: '/bad/barrierefreies-bad', bild: 'bereich-dusche-streifen-sitzbank' },
      { satz: 'Das ganze Bad ist alt und soll neu werden.', href: '/bad/badsanierung', bild: 'bad-einstieg' },
      { satz: 'Im Neubau sollen Böden und Wände gefliest werden.', href: '/fliesen/neubau', bild: 'lage-neubau' },
      { satz: 'Eine Fliese ist gesprungen, oder die Fugen sind alt.', href: '/fliesenreparatur', motiv: 'riss' },
      { satz: 'Auf dem Balkon bleibt nach dem Regen Wasser stehen.', href: '/balkon-terrasse', bild: 'lage-balkon' },
      { satz: 'Die Treppe vor dem Haus ist kaputt.', href: '/treppen/aussentreppe', bild: 'kontakt-eingang' },
    ],
  },
  tun: {
    titel: 'Wir kümmern uns um alles, was mit Fliesen zu tun hat.',
    // ein Satz statt Theorie neben den Zeichnungen (E-047); der Satz stand vorher als H1
    einleitung: 'Wir verlegen Fliesen in Bad, Küche, Flur und auf dem Balkon.',
    // vier Bereiche als Fliesen mit den Plan-Vignetten des alten Stands (Bad, Wohnen, Außen; Reparatur neu in derselben
    // Zeichensprache, E-037)
    bereichsfliesen: [
      { name: 'Badsanierung und neue Dusche', href: '/bad', vignette: 'bad' },
      { name: 'Böden und Wände in Haus und Wohnung', href: '/leistungen/wohnen', vignette: 'wohnen' },
      { name: 'Balkon, Terrasse und Treppen', href: '/balkon-terrasse', vignette: 'aussen' },
      { name: 'Reparatur von Fliesen und Fugen', href: '/fliesenreparatur', vignette: 'reparatur' },
    ],
  },
  ablauf: {
    titel: 'So kommen Sie zu Ihrem neuen Boden.',
    schritte: [
      {
        titel: 'Termin bei Ihnen vor Ort',
        text: 'Deniz Tezgel kommt zu Ihnen. Er schaut sich den Raum genau an und prüft den Untergrund. Dieser Termin ist für Sie kostenfrei.',
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
    // sechs echte Fotos, je Raum eins, vollständig; der Name steht auf der Glasfläche und führt zur passenden Leistung (E-047)
    fotos: [
      { bild: 'start-galerie-1', unterschrift: 'Dusche ohne Stufe', href: '/bad/barrierefreies-bad' },
      { bild: 'start-galerie-2', unterschrift: 'Neues Bad mit Badewanne', href: '/bad/badsanierung' },
      { bild: 'start-galerie-3', unterschrift: 'Balkon mit neuen Fliesen', href: '/balkon-terrasse' },
      { bild: 'start-galerie-4', unterschrift: 'Terrasse mit großen Platten', href: '/balkon-terrasse' },
      { bild: 'start-galerie-5', unterschrift: 'Außentreppe', href: '/treppen/aussentreppe' },
      { bild: 'start-galerie-6', unterschrift: 'Balkon abdichten', href: '/balkon-terrasse' },
    ],
    verweis: { name: 'Alle Arbeiten ansehen', href: '/referenzen' },
    // Wortlaut aller Stimmen unverändert aus REVIEWS (G8)
    // als Karussell mit gleich großen Karten (E-047)
    stimmen: ['c-wolf', 'rabia-oe', 'elke-s', 'hasan-oe', 'ute-t', 'peter-p', 'christian-d', 'sara-j'],
    stimmenGross: true,
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
