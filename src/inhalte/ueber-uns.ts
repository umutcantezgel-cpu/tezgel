// Inhalt `/ueber-uns` (Erzählseite) aus dem Referenztext `_werkstatt/texte/ueber-uns.md` (wörtlich, Textmarken unverändert).
// Einstieg mittig (K-016 „Ruhe“, E-047); H1 in zwei Zeilen, deren Teile zusammen mit einem Leerzeichen die H1 ergeben.
// Vorspann der Textdatei als `tun.einleitung` (Zusatz Regel 2). Firmendaten dürfen auf dieser Seite stehen (Regel 3 gilt hier
// nicht). Bild des Einstiegs: `ueber-einstieg`. Karte (großer Moment `karte`) und Kundenstimmen kommen über Vorlage und Seite.
// Vorlage: ErzaehlSeite. Fakten: K-015 F-01, F-02, F-05, F-06, F-09, F-19, F-14.
import type { ErzaehlInhalt } from '@/components/vorlagen/inhalt';
import { COMPANY_DATA } from '@/config/company';

const VORSPANN =
  'Wir sind Fliesenverlegung Tezgel aus Aßlar. Deniz Tezgel, der Inhaber, kommt selbst zu Ihnen, schaut sich alles an und sagt Ihnen, was zu tun ist. Danach verlegt er mit seinem Team Fliese für Fliese.';

export const UEBER_UNS: ErzaehlInhalt = {
  pfad: '/ueber-uns',
  meta: {
    titel: 'Über uns | Fliesenlegerbetrieb Tezgel in Aßlar',
    beschreibung:
      'Fliesenverlegung Tezgel in Aßlar seit 2008, eingetragen bei der Handwerkskammer Wiesbaden. Inhaber Deniz Tezgel kommt selbst zu Ihnen, auch nach Wetzlar.',
  },
  worum: {
    brotkrumen: [{ name: 'Start', href: '/' }, { name: 'Über uns' }],
    titel: 'Ihr Fliesenleger aus Aßlar kommt persönlich zu Ihnen.',
    ort: 'Aus Aßlar in Hessen, für Wetzlar und Umgebung.',
    vorspann: VORSPANN,
    bild: 'ueber-einstieg',
    einstieg: 'mitte',
    titelZeilen: ['Ihr Fliesenleger aus Aßlar', 'kommt persönlich zu Ihnen.'],
    bewertung: true,
  },
  lage: {
    titel: 'Wer kommt in Ihr Haus?',
    absaetze: [
      'Vielleicht stehen Sie vor einer Frage. Das Bad ist alt, eine Fliese ist gesprungen oder der Balkon hält kein Wasser mehr. Ein neues Bad ist eine große Sache. Dann wollen Sie wissen, wer kommt und was er tut.',
      'Deniz Tezgel ist Ihr fester Ansprechpartner. Er bleibt von der ersten Skizze bis zur Übergabe bei Ihrem Auftrag. Er kennt Ihren Raum, bevor er anfängt. Sie müssen kein Fachmann sein, um mit uns zu sprechen.',
    ],
  },
  tun: {
    titel: 'Wir verlegen Fliesen im Bad, im Haus und auf dem Balkon.',
    // Vorspann der Textdatei (Regel 2): so bleibt er für Suchmaschinen auf der Seite
    einleitung: VORSPANN,
    bereiche: [
      { name: 'Badsanierung', satz: 'und [[bodengleiche-dusche|bodengleiche Duschen]] statt Wanne', href: '/bad' },
      { name: 'Böden und Wände in Küche und Wohnräumen', href: '/leistungen/wohnen' },
      { name: 'Balkon und Terrasse', href: '/balkon-terrasse' },
      { name: 'Treppen und Naturstein', href: '/treppen' },
      { name: 'Reparatur von Fliesen und Fugen', href: '/fliesenreparatur' },
    ],
    // Eine Aussage je Fliese: je Absatz der Textdatei ein Feld
    punkte: [
      'Seit 2008 gibt es unseren Betrieb in Aßlar. Eingetragen sind wir bei der Handwerkskammer Wiesbaden. Wir verlegen Fliesen, Platten und Mosaik, im Neubau und in bewohnten Räumen.',
      'Seit 2014 liegt unser Schwerpunkt auf großen Fliesen, denn sie haben weniger Fugen. Seit 2019 ist die [[abdichtung|Abdichtung]] bei uns Standard. Wir arbeiten dabei nach [[din-18534|DIN 18534]].',
      'Für Ihre Sicherheit verlegen wir rutschfeste Fliesen. Je nach Raum haben sie die [[rutschhemmung|Rutschhemmung R10 und R11]].',
    ],
    absatz:
      'Möchten Sie vorher in Ruhe über Fliesen sprechen? Dafür gibt es Fliesenberatung in Wetzlar und Gießen, nach Terminvereinbarung.',
  },
  ablauf: {
    titel: 'So läuft Ihr Auftrag ab.',
    einleitung: 'Ein Auftrag läuft bei uns in drei Schritten ab. Jeden Schritt erklären wir Ihnen vorher.',
    schritte: [
      { titel: 'Termin bei Ihnen vor Ort', text: 'Deniz Tezgel prüft Boden und Wände genau. Dieser Termin ist für Sie kostenfrei.' },
      {
        titel: 'Planen und auswählen',
        text: 'Wir besprechen mit Ihnen die Fliesen und die Farbe der Fugen. Danach bekommen Sie ein Angebot mit festem Preis.',
      },
      {
        titel: 'Verlegen und übergeben',
        text: 'Wir verlegen die Fliesen und schützen bewohnte Räume vor Staub. Am Ende übergeben wir die Räume sauber gefegt und gehen alles gemeinsam durch.',
      },
    ],
  },
  beleg: {
    // Abnahme E3-BAU-08: die Karte steht im ersten Abschnitt der Vorlage unter eigener Überschrift (wie auf der Startseite),
    // die Stimmen mit Überschrift, Satz und Motto der Textdatei im zweiten; so steht „Das sagen unsere Kunden.“ nur einmal
    titel: 'Hier sind wir für Sie unterwegs.',
    fotos: [],
    stimmenTitel: 'Das sagen unsere Kunden.',
    stimmenEinleitung:
      'Was Kunden über unsere Arbeit schreiben, lesen Sie hier. Die Sätze stehen so, wie sie geschrieben wurden. Unser Motto: „Die Zufriedenheit unserer Kunden ist die beste Reklame für uns.“',
    // die beiden Stimmen der Textdatei zuerst, dann drei weitere aus REVIEWS, deren Wortlaut zum Betrieb passt (Regel 5)
    stimmen: ['christian-s', 'ute-t', 'thorsten-a', 'christian-d', 'k-d'],
    stimmenGross: true,
    verweis: { name: 'Alle Arbeiten ansehen', href: '/referenzen' },
  },
  schritt: {
    titel: 'Bitten Sie um einen Termin vor Ort.',
    satz:
      'Schreiben Sie uns Ihren Namen und Ihre Telefonnummer. Deniz Tezgel ruft Sie zurück und macht einen Termin mit Ihnen aus. Sie wissen noch nicht, was Sie ändern möchten? Dann rufen Sie einfach an.',
    // Anfahrt zur Werkstatt wie im Bestand (Kartenlink, Abnahme E3-BAU-08; Firmendaten sind auf dieser Seite erlaubt)
    hilfen: [{ name: `Anfahrt: ${COMPANY_DATA.headquarters.street}, ${COMPANY_DATA.headquarters.city}`, href: COMPANY_DATA.headquarters.mapsUrl }],
    verwandte: [
      { name: 'Fliesenberatung in Wetzlar', href: '/ausstellung/wetzlar' },
      { name: 'Fliesenberatung in Gießen', href: '/ausstellung/giessen' },
    ],
  },
};
