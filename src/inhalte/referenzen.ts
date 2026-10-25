// Inhalt `/referenzen` (Erzählseite) aus dem Referenztext `_werkstatt/texte/referenzen.md` (wörtlich, Textmarken unverändert).
// Einstieg mittig (K-016 „Ruhe“, E-047); H1 in zwei Zeilen, deren Teile zusammen mit einem Leerzeichen die H1 ergeben.
// Vorspann der Textdatei als `tun.einleitung` (Zusatz Regel 2). Die Sätze „Seit 2008 …“ mit der Handwerkskammer entfallen
// (Regel 3). Der Satz nach den Schritten („Deniz Tezgel ist Ihr fester Ansprechpartner …“) steht als `ablauf.einleitung`
// vor den Schritten, wie `inhalt.ts` ihn für den festen Ansprechpartner vorsieht. Die Galerie mit Filter (`momente.beleg`)
// und der Vorher-Nachher-Regler (`momente.belegZwei`) kommen in der Seite, nicht hier; `beleg.fotos` bleibt leer.
// Die Bewertungen mit Themenfilter (ReviewsSection) stehen unter der Vorlage in der Seite, nicht in `beleg.stimmen`.
// Vorlage: ErzaehlSeite.
import type { ErzaehlInhalt } from '@/components/vorlagen/inhalt';

const VORSPANN =
  'Diese Referenzen, also fertige Arbeiten, zeigen Bäder, Terrassen, Treppen und [[grossformat|Großformate]]. Dazu kommen die Bewertungen unserer Kunden mit 5,0 Sternen bei Google.';

export const REFERENZEN: ErzaehlInhalt = {
  pfad: '/referenzen',
  meta: {
    titel: 'Referenzen und Bewertungen | Fliesenleger Tezgel Aßlar',
    beschreibung:
      'Was unsere Kunden über Fliesenleger Tezgel aus Aßlar sagen, mit 5,0 Sternen bei Google. Dazu Fotos von Bädern, Terrassen und Treppen.',
  },
  worum: {
    brotkrumen: [{ name: 'Start', href: '/' }, { name: 'Referenzen' }],
    // mittig (K-016): die H1 steht in zwei Zeilen; ihre Teile ergeben zusammen die H1 aus dem Text
    einstieg: 'mitte',
    titelZeilen: ['Das sagen unsere Kunden,', 'und so sieht unsere Arbeit aus.'],
    titel: 'Das sagen unsere Kunden, und so sieht unsere Arbeit aus.',
    ort: 'Fliesenleger Deniz Tezgel aus Aßlar, für Wetzlar und Mittelhessen.',
    // im mittigen Einstieg nicht gezeigt; der Vorspann steht als `tun.einleitung` auf der Seite (Regel 2)
    vorspann: VORSPANN,
    bild: 'bad-einstieg',
    bewertung: true,
  },
  lage: {
    titel: 'Bevor Sie einen Handwerker holen, möchten Sie wissen, wie er arbeitet.',
    absaetze: ['Ein neues Bad oder ein neuer Balkon bleiben viele Jahre. Da wollen Sie sicher sein, dass die Arbeit stimmt.'],
  },
  tun: {
    titel: 'Das alles gehört zu unserer Arbeit.',
    // Vorspann der Textdatei (Regel 2): so bleibt er für Suchmaschinen auf der Seite
    einleitung: VORSPANN,
    // Bereiche als Zeilen mit Link (Textfolge: Aussagen, dann Bereiche; die Vorlage setzt die Zeilen vor die Aussagen)
    bereiche: [
      { name: 'Badsanierung und neue Dusche', href: '/bad' },
      { name: 'Böden und Wände in Haus und Wohnung', href: '/leistungen/wohnen' },
      { name: 'Balkon und Terrasse', href: '/balkon-terrasse' },
      { name: 'Reparatur von Fliesen und Fugen', href: '/fliesenreparatur' },
    ],
    // Aussagen als Fliesen an der Fuge: der Absatz über unsere Arbeit und die drei Belege aus dem Faktenblatt (je ein Satz)
    punkte: [
      'Wir nehmen die alten Fliesen heraus und bereiten den [[untergrund|Untergrund]] vor. Dann verlegen wir neue Fliesen, auch Großformate.',
      'Seit 2019 ist die [[abdichtung|Abdichtung]] bei uns Standard. Wir arbeiten nach [[din-18534|DIN 18534]].',
      'Wohnen Sie während der Arbeiten im Haus, schützen wir Ihre Räume vor Staub.',
    ],
    // ohne den Beleg zur Handwerkskammer (Regel 3)
    absatz: 'Dazu gehören auch [[barrierefrei|barrierefreie]] Bäder, zum Beispiel mit einer Dusche ohne Stufe.',
  },
  ablauf: {
    titel: 'So läuft Ihr Auftrag ab.',
    // Satz nach den Schritten im Text, hier als Einleitung vor den Schritten (siehe Kopf der Datei)
    einleitung: 'Deniz Tezgel ist Ihr fester Ansprechpartner, von der ersten Skizze bis zum fertigen Raum.',
    schritte: [
      {
        titel: 'Termin bei Ihnen vor Ort',
        text: 'Deniz Tezgel kommt zu Ihnen. Er schaut sich den Raum genau an und prüft den Untergrund. Der Termin ist kostenfrei.',
      },
      {
        titel: 'Planen und auswählen',
        text: 'Sie wählen mit uns Fliesen und die Farbe der Fugen aus. Danach bekommen Sie ein Angebot mit festem Preis.',
      },
      {
        titel: 'Verlegen und übergeben',
        text: 'Wir verlegen Fliese für Fliese und übergeben Ihnen den Raum sauber gefegt. Zum Schluss gehen wir alles gemeinsam durch.',
      },
    ],
  },
  beleg: {
    // Galerie und Vorher-Nachher stehen als große Momente in der Seite (E3-GRAF-07, -08; Zusatz E3-BAU-07)
    titel: 'Unsere Arbeiten in Bildern.',
    fotos: [],
  },
  schritt: {
    titel: 'Sprechen Sie mit uns über Ihr Vorhaben.',
    satz:
      'Schreiben Sie uns Ihren Namen und Ihre Telefonnummer. Deniz Tezgel ruft Sie zurück und macht einen Termin mit Ihnen aus.',
  },
};
