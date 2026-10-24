// Inhalt der Startseite (KERN v3 K-009, Seitenformel; Text _werkstatt/texte/REF-start.md, E2-ORCH-06; E-044): wörtlich aus
// den bisherigen Bausteinen der Startseite (src/components/start/*) übernommen, gesetzt von der Vorlage ErzaehlSeite.
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
    titel: 'Wir verlegen Fliesen in Bad, Küche, Flur und auf dem Balkon.',
    // höchstens 15 Zeichen je Zeile, damit keine Zeile in fs-7 ab lg umbricht (E3-START-01)
    titelZeilen: ['Wir verlegen', 'Fliesen in Bad,', 'Küche, Flur und', 'auf dem Balkon.'],
    firmensitz: 'Firmensitz Aßlar',
    ort: 'Fliesenleger Deniz Tezgel aus Aßlar, für Wetzlar und die Orte rundherum.',
    vorspann: 'Deniz Tezgel kommt selbst zu Ihnen, schaut sich alles an und sagt Ihnen, was zu tun ist. Danach verlegt er mit seinem Team Fliese für Fliese.',
    plan: 'bad',
    bildGross: 'start-dusche-boden',
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
    einleitung:
      'Wir nehmen alte Fliesen heraus und bereiten den [[untergrund|Untergrund]] vor. Dann verlegen wir neue Fliesen, auch große Fliesen mit wenigen Fugen. Am Ende ist alles sauber, und Sie können Ihren Raum wieder nutzen.',
    // vier Bereiche als Fliesen mit den Plan-Vignetten des alten Stands (Bad, Wohnen, Außen; Reparatur neu in derselben
    // Zeichensprache, E-037)
    bereichsfliesen: [
      { name: 'Badsanierung und neue Dusche', href: '/bad', vignette: 'bad' },
      { name: 'Böden und Wände in Haus und Wohnung', href: '/leistungen/wohnen', vignette: 'wohnen' },
      { name: 'Balkon, Terrasse und Treppen', href: '/balkon-terrasse', vignette: 'aussen' },
      { name: 'Reparatur von Fliesen und Fugen', href: '/fliesenreparatur', vignette: 'reparatur' },
    ],
    // eine erklärende Zeichnung: der Schnitt am Wandanschluss mit der Erklärung der Abdichtung (Sichtabnahme E2, Befund 13)
    unterKopf: {
      vignette: 'untergrund',
      unterschrift: 'So ist der Boden im Bad am Rand zur Wand aufgebaut. Unter den Fliesen liegt die [[abdichtung|Abdichtung]]. Sie geht ein Stück an der Wand hoch.',
    },
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
    // die drei Belege aus dem Faktenblatt (K-015, Sichtabnahme E2, Befund 8); zwei Sätze, jedes Fachwort mit seiner Erklärung
    // am Satzende (höchstens 25 Wörter je Satz, K-010); die Abdichtung ist schon an der Zeichnung in „Was wir tun“ erklärt
    belege: [
      'Seit 2008 sind wir bei der Handwerkskammer Wiesbaden eingetragen.',
      'Im Bad kommt vor dem Verlegen eine Abdichtung. Dabei halten wir uns an [[din-18534|DIN 18534]].',
      'Wohnen Sie während der Arbeiten im Haus, schützen wir Ihre Räume vor Staub.',
    ],
  },
  beleg: {
    titel: 'So sieht unsere Arbeit aus.',
    // sechs echte Fotos, je Raum eins
    fotos: [
      { bild: 'start-galerie-1', unterschrift: 'Dusche ohne Stufe mit Sitzbank und Mosaik' },
      { bild: 'start-galerie-2', unterschrift: 'Badewanne mit dunklen Mosaikfliesen' },
      { bild: 'start-galerie-3', unterschrift: 'Balkon mit dunklen Fliesen, jede Reihe um ein Stück versetzt' },
      { bild: 'start-galerie-4', unterschrift: 'Terrasse mit großen hellgrauen Platten' },
      { bild: 'start-galerie-5', unterschrift: 'Außentreppe mit Fliesen in Terrakotta' },
      { bild: 'start-galerie-6', unterschrift: 'Balkonboden vor dem Verlegen: ein blaues Band dichtet die Ränder ab' },
    ],
    verweis: { name: 'Alle Arbeiten ansehen', href: '/referenzen' },
    // die große Stimme ist die von C. W. (vollständige Sätze); Wortlaut aller Stimmen unverändert aus REVIEWS (G8)
    stimmen: ['c-wolf', 'rabia-oe', 'elke-s'],
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
