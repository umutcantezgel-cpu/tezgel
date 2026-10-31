// Inhalt `/kontakt` (Arbeitsseite, E3-BAU-09) aus `_werkstatt/texte/kontakt.md`: Texte wörtlich mit ihren Textmarken,
// Bauhinweise in Klammern und „→“ nicht übernommen. Vorlage: ArbeitsSeite (E-025). Nach dem Zusatz E3-BAU-K016: Firmendaten
// erlaubt (Regel 3 gilt hier nicht), Abschnitte in der Folge der Textdatei, Werkzeuge des Bestands (Formular, Kalender, Karte,
// Anfrage) mit ihren Kennungen und Ankern. E4-W0-KONTAKT (E-062): drei Gedanken und der Ablauf: Anfrage, Kontaktwege,
// Einsatzkarte (statt Google-Karte mit Ortssuche), was nach der Anfrage passiert; der Kalender steht nur noch auf `/termin`. Die Props der Vorlage stehen hier als Daten; die Inhalte der Abschnitte (Funktionen
// des Bestands) setzt die Seite `src/app/(bestand)/kontakt/page.jsx`. Öffnungszeiten und Rufnummern kommen aus den Daten
// (COMPANY_DATA, M-03), nicht aus dem Text.
// Abnahme (Orchestrator, Zusatz E3-BAU-K016 Abschnitt 4): Der Hauptweg ist die Anfrage des Bestands (TezgelAnfrageFunnel,
// Anker #express-anfrage) unter der Überschrift „Termin vor Ort anfragen“; ein zweites Formular (HeroContactForm) gab es
// hier im Bestand nicht. Die Hilfen entfallen damit (die Anfrage ist der Hauptweg, der Kalender hat seinen Abschnitt).
import type { Krume } from '@/components/kern/Brotkrumen';
import type { Markentext } from '@/components/vorlagen/inhalt';
import type { Arbeitsabschnitt } from '@/components/vorlagen/ArbeitsSeite';

/** Abschnitt als Daten: die Funktion des Bestands (`inhalt`) setzt die Seite je `id` */
export type KontaktAbschnitt = Omit<Arbeitsabschnitt, 'inhalt' | 'unterKopf'>;

export interface KontaktInhalt {
  pfad: string;
  meta: { titel: string; beschreibung: string };
  brotkrumen: Krume[];
  /** H1 (wörtlich aus der Textdatei) */
  titel: string;
  /** H1 in zwei Satzzeilen, zusammen der Titel (UM-E4-SICHT-FIX M-C5 Nr. 1, Prop aus M-A3) */
  titelZeilen: string[];
  /** Satz zum Ort (Pflichtelement des ersten Bildschirms, K-009) */
  ort: string;
  /** Vorspann; steht seit M-C5 unter dem Formular im Abschnitt express-anfrage (Text gleich, nach der Einleitung des Abschnitts),
   *  nicht mehr im Einstieg */
  vorspann: Markentext;
  /** Ziel aller Hauptknöpfe: der Abschnitt „Termin vor Ort anfragen“ auf dieser Seite (#express-anfrage, wie `hauptziel`) */
  hauptziel: string;
  /** Abschnitte in der Folge der Textdatei */
  abschnitte: KontaktAbschnitt[];
  ablauf: {
    schritte: { titel: string; text: Markentext }[];
    absatz: Markentext;
  };
}

export const KONTAKT: KontaktInhalt = {
  pfad: '/kontakt',
  meta: {
    titel: 'Kontakt und Termin vor Ort | Fliesenleger Tezgel Aßlar',
    beschreibung:
      'Fliesenleger Tezgel in Aßlar: Anruf, WhatsApp oder Anfrage. Der Termin vor Ort ist kostenfrei. Persönliche Beratung und Festpreis für Wetzlar und Hessen.',
  },
  brotkrumen: [{ name: 'Start', href: '/' }, { name: 'Kontakt' }],
  titel: 'Nehmen Sie Kontakt auf. Wir kommen für einen Termin zu Ihnen.',
  titelZeilen: ['Nehmen Sie Kontakt auf.', 'Wir kommen für einen Termin zu Ihnen.'],
  ort: 'Fliesenleger Deniz Tezgel aus Aßlar in Hessen, für Wetzlar und die Orte rundherum.',
  vorspann:
    'Wollen Sie Ihre Badewanne gegen eine Dusche ohne Stufe tauschen oder einen Boden neu verlegen lassen? Dann genügt ein Anruf oder eine kurze Nachricht. Der Termin bei Ihnen vor Ort ist für Sie kostenfrei, und wir beraten Sie dabei persönlich.',
  hauptziel: '#express-anfrage',
  abschnitte: [
    {
      id: 'express-anfrage',
      titelId: 'express-anfrage-heading',
      titel: 'Termin vor Ort anfragen',
      einleitung:
        'Wählen Sie Ihr Vorhaben und sagen Sie uns, wo und wann. Dann tragen Sie Ihren Namen und Ihre Telefonnummer ein. Deniz Tezgel meldet sich bei Ihnen und macht einen Termin mit Ihnen aus.',
      flaeche: 'fliese',
      // Formular im ersten Bildschirm (M-C5 Nr. 1, Nacharbeit SF-C2): eine Stufe weniger Raum über dem Abschnitt, kein sichtbarer
      // Kopf (die H2 wiederholte den Hauptknopf direkt darüber; sie bleibt für Hilfsmittel), die Einleitung steht unter dem Formular
      dicht: true,
      kopfVerborgen: true,
    },
    {
      id: 'andere-wege',
      titel: 'Lieber anrufen oder schreiben?',
      // Firmendaten erlaubt (Zusatz Regel 3 gilt auf dieser Seite nicht); Satz zur Handwerkskammer und Einsatzgebiet der Textdatei
      einleitung:
        'Seit 2008 sind wir als Handwerksbetrieb bei der Handwerkskammer Wiesbaden eingetragen. Wir arbeiten in Aßlar, Wetzlar, Gießen, Herborn und Dillenburg.',
      flaeche: 'kalk',
    },
    {
      id: 'standort-anfahrt',
      titelId: 'standort-anfahrt-heading',
      // ohne Überschrift im Text: die heutige Überschrift ohne Werbewort (Briefing, Abschnitt 5)
      titel: 'Unser Einsatzgebiet in Mittelhessen',
      // Einsatzkarte als Zeichnung (keine Anfrage an fremde Server, keine Einwilligung nötig); die Google-Karte mit
      // Einwilligung bleibt auf /standorte (F-12)
      einleitung: 'Von Aßlar aus kommen wir zu Ihnen nach Hause.',
      flaeche: 'fliese',
    },
    {
      id: 'was-nach-anfrage',
      titel: 'Was nach Ihrer Anfrage passiert.',
      einleitung: 'So läuft es in drei Schritten ab.',
      flaeche: 'kalk',
    },
  ],
  ablauf: {
    schritte: [
      {
        titel: 'Termin bei Ihnen vor Ort',
        text: 'Deniz Tezgel kommt zu Ihnen. Er schaut sich den Raum genau an und prüft den [[untergrund|Untergrund]].',
      },
      {
        titel: 'Planen und auswählen',
        text: 'Sie suchen mit uns die Fliesen aus, dazu die Größe und die Farbe der Fugen. Danach bekommen Sie ein Angebot mit festem Preis.',
      },
      {
        titel: 'Verlegen und übergeben',
        text: 'Wir verlegen die Fliesen und übergeben Ihnen den Raum sauber gefegt. Zum Schluss gehen wir alles gemeinsam durch.',
      },
    ],
    absatz:
      'Wohnen Sie während der Arbeiten im Haus, schützen wir Ihre Räume vor Staub. Deniz Tezgel bleibt in allen drei Schritten Ihr fester Ansprechpartner.',
  },
};
