// Inhalt der Seite /leistungen (KERN v3.6 K-009 Seitenformel, K-016 „Ruhe“; Text _werkstatt/texte/leistungen.md, E3-BAU-04,
// E-048): wörtlich aus dem Seitentext, gesetzt von der Vorlage ErzaehlSeite. Abweichungen nach K-016 (Orchestrator,
// Texthoheit): Einstieg mittig, der Vorspann steht als Einleitung der Lage; die vier Bereiche zeigen statt der Fotos ihren
// Verlegeplan (Plan-Morph zur Leistungsseite, E-037; `LEISTUNGSPLAENE`), die drei Fotos stehen dafür als Reihe im Beleg
// (Überschrift wie auf der Startseite); der Satz zur Handwerkskammer entfällt (Firmendaten nur auf /kontakt, /ueber-uns und
// im Fuß); weitere Kundenstimmen zum Thema der Seite (Wortlaut unverändert, G8). Rechner und Express-Anfrage setzt die Seite.
import type { ErzaehlInhalt } from '@/components/vorlagen/inhalt';
import type { Leistungsplan } from '@/components/leistungen/Leistungsplaene';

export const LEISTUNGEN: ErzaehlInhalt = {
  pfad: '/leistungen',
  meta: {
    titel: 'Fliesenleger Leistungen Wetzlar | Fliesenverlegung Tezgel',
    beschreibung: 'Fliesenleger Leistungen in Aßlar und Wetzlar: Badsanierung, Böden, Balkon, Terrasse, Naturstein und Abdichtung. Der Termin vor Ort ist kostenfrei.',
  },
  worum: {
    brotkrumen: [{ name: 'Start', href: '/' }, { name: 'Leistungen' }],
    einstieg: 'mitte',
    titel: 'Alle Leistungen vom Fliesenleger aus Aßlar, Fliese für Fliese.',
    titelZeilen: ['Alle Leistungen vom Fliesenleger', 'aus Aßlar, Fliese für Fliese.'],
    ort: 'Für Aßlar, Wetzlar und Umgebung.',
    vorspann: 'Sie haben ein Bad, einen Boden oder einen Balkon, der nicht mehr passt. Hier sehen Sie, was wir tun: von der Badsanierung bis zur Terrasse, dazu Böden und Naturstein.',
    // große Fliesen ohne Kante unter der Glaswand: zeigt, worum es auf der Seite geht (Formatregler weiter unten)
    bild: 'start-dusche-boden',
    bewertung: true,
  },
  lage: {
    titel: 'Vielleicht ist Ihr Bad oder Ihr Boden zu alt geworden.',
    einleitung: 'Sie haben ein Bad, einen Boden oder einen Balkon, der nicht mehr passt. Hier sehen Sie, was wir tun: von der Badsanierung bis zur Terrasse, dazu Böden und Naturstein.',
    absaetze: [
      'Eine Fliese ist gesprungen. Die Fugen sind alt und dunkel. Auf dem Balkon bleibt nach dem Regen Wasser stehen.',
      'Sie wissen vielleicht nicht, wo Sie anfangen sollen. Das ist normal. Den ersten Schritt gehen wir gemeinsam.',
    ],
  },
  tun: {
    titel: 'Vier Bereiche, vom Bad bis unter die Fliesen.',
    einleitung: 'Deniz Tezgel betreut Sie persönlich. Er ist Ihr fester Ansprechpartner von der ersten Skizze bis zur fertigen Arbeit.',
  },
  ablauf: {
    titel: 'So läuft jede Arbeit bei uns ab.',
    schritte: [
      { titel: 'Termin bei Ihnen vor Ort', text: 'Deniz Tezgel kommt zu Ihnen. Er schaut sich den Raum genau an und prüft den Untergrund. Dieser Termin ist für Sie kostenfrei.' },
      { titel: 'Planen und auswählen', text: 'Sie wählen mit uns die Fliesen aus, dazu die Größe und die Farbe der Fugen. Danach bekommen Sie ein Angebot mit festem Preis.' },
      { titel: 'Verlegen und übergeben', text: 'Wir verlegen sauber und übergeben Ihnen die Räume gefegt. Wohnen Sie weiter im Haus, schützen wir Ihre Räume vor Staub. Zum Schluss gehen wir alles gemeinsam durch.' },
    ],
  },
  beleg: {
    titel: 'So sieht unsere Arbeit aus.',
    fotos: [
      { bild: 'leistungen-bad', unterschrift: 'Bad mit neuer Badewanne', href: '/bad/badsanierung' },
      { bild: 'leistungen-balkon', unterschrift: 'Balkon mit neuen Fliesen', href: '/balkon-terrasse' },
      { bild: 'leistungen-untergrund', unterschrift: 'Abdichtung auf dem Balkon', href: '/untergrund-abdichtung' },
    ],
    // c-wolf aus dem Seitentext zuerst, dazu Stimmen zu Bad, Böden und Balkon
    stimmen: ['c-wolf', 'rabia-oe', 'hasan-oe', 'elke-s', 'peter-p'],
    verweis: { name: 'Alle Arbeiten ansehen', href: '/referenzen' },
  },
  schritt: {
    titel: 'Sprechen Sie mit uns über Ihr Vorhaben.',
    satz: 'Nennen Sie uns Ihren Namen und Ihre Telefonnummer. Deniz Tezgel ruft Sie zurück und macht einen Termin mit Ihnen aus.',
  },
};

/** Die vier Bereiche aus „Was wir tun“ (Name, Satz und Link wörtlich), je mit dem Verlegeplan ihrer Leistungsseite */
export const LEISTUNGSPLAENE: Leistungsplan[] = [
  { id: 'bad', name: 'Bad', satz: 'Wir bauen Ihr Bad um. Statt der Wanne kommt eine [[bodengleiche-dusche|bodengleiche Dusche]].', link: 'Mehr zum Bad' },
  {
    id: 'wohnen',
    name: 'Böden und Wände',
    satz: 'Wir verlegen Fliesen auf Böden und an Wänden, dazu große Fliesen und Naturstein. Das gilt für Wohnräume, Küchen, Treppen und den Neubau. Auch Reparaturen an Fliesen gehören dazu.',
    link: 'Mehr zu Böden und Wänden',
  },
  { id: 'aussen', name: 'Balkon und Terrasse', satz: 'Wir sanieren Balkone und Terrassen, auch auf [[stelzlager|Stelzlagern]].', link: 'Mehr zu Balkon und Terrasse' },
  {
    id: 'untergrund',
    name: 'Untergrund und Abdichtung',
    satz: 'Das ist die Arbeit unter dem Belag, die man später nicht mehr sieht. Wir gleichen den [[untergrund|Untergrund]] aus. Darauf kommt eine [[abdichtung|Abdichtung]]. Sie richtet sich nach der [[din-18534|DIN 18534]].',
    link: 'Mehr zu Untergrund und Abdichtung',
  },
];

/** Satz zum Preisrechner aus dem nächsten Schritt; er steht als Einleitung über dem Rechner (#kosten-rechner) */
export const RECHNER_SATZ = 'Als Hilfe gibt es den Preisrechner. Er nennt einen Richtpreis, also einen ungefähren Preis. Ein festes Angebot ist das noch nicht.';
