// SEO-Runde T08 (03.11.2026, docs/seo/KONTEXT.md Abschnitt 5 und 13): Teilen-Bild jeder Seite aus echten Fotos des
// Betriebs statt Logo und Generatorbildern. Sieben Zuschnitte 1200 × 630 (bilder.mjs, Format 40:21, ohne Metadaten) unter
// public/images/arbeiten/teilen/. Gewählt nach dem Anfang der Adresse (ganze Abschnitte, „/fliesen“ trifft nicht
// „/fliesenreparatur“); die längste passende Regel gewinnt, sonst das Bad aus dem Einstieg der Startseite.

export interface Teilenbild {
  url: string;
  width: number;
  height: number;
  alt: string;
}

const BILDER = {
  bad: {
    pfad: '/images/arbeiten/teilen/bad-dusche-glaswand-beige.jpg',
    alt: 'Bad im Dachgeschoss mit Dusche hinter einer Glaswand und großen beigen Fliesen an Wand und Boden',
  },
  // Dusche ohne Stufe (nb-085) für die Seiten über bodengleiche Duschen; das Bad oben zeigt eine flache Duschwanne
  dusche: {
    pfad: '/images/arbeiten/teilen/dusche-ohne-stufe-punktablauf-beige.jpg',
    alt: 'Dusche ohne Stufe mit Punktablauf und Diagonalschnitten im Boden, rechts eine Badewanne, große Fliesen in Beige',
  },
  balkon: {
    pfad: '/images/arbeiten/teilen/balkon-beige-fliesen-steinoptik.jpg',
    alt: 'Balkon von oben mit beigen Fliesen in Steinoptik, Sockel aus Fliese und Brüstung aus Holz',
  },
  treppe: {
    pfad: '/images/arbeiten/teilen/aussentreppe-beige-fliesen-kantenprofile.jpg',
    alt: 'Außentreppe mit beigen Fliesen, schwarzen Kantenprofilen und Sockel aus Fliese',
  },
  boden: {
    pfad: '/images/arbeiten/teilen/wohnraum-grosse-helle-bodenfliesen.jpg',
    alt: 'Heller Raum im Ausbau mit großformatigen Bodenfliesen in Steinoptik',
  },
  // nb-112: Fliesen in Travertinoptik wie in der Galerie (Material nicht bestätigt, KONTEXT §13); deshalb nicht für die
  // Natursteinseiten, nur für den Ratgeber „Feinsteinzeug oder Naturstein“
  travertinoptik: {
    pfad: '/images/arbeiten/teilen/flur-travertinoptik-roemischer-verband.jpg',
    alt: 'Flur mit Fliesen in Travertinoptik im Römischen Verband und passendem Sockel, frisch verfugt und noch ungereinigt',
  },
  untergrund: {
    pfad: '/images/arbeiten/teilen/untergrund-glasfasergewebe-randstreifen.jpg',
    alt: 'Leerer Raum mit Bahnen aus Glasfasergewebe auf dem Boden und blauen Randstreifen an den Wänden',
  },
} as const;

export type TeilenbildId = keyof typeof BILDER;

/** Adressanfang → Bild; ohne Treffer gilt das Bad */
const REGELN: ReadonlyArray<readonly [string, TeilenbildId]> = [
  ['/balkon-terrasse', 'balkon'],
  ['/leistungen/aussen', 'balkon'],
  ['/referenzen/balkon-stelzlager', 'balkon'],
  ['/blog/barrierefreier-balkonaustritt', 'balkon'],
  ['/treppen', 'treppe'],
  ['/referenzen/treppenanlage-wohnhaus', 'treppe'],
  ['/blog/rutschfeste-fliesen-r-klassen', 'treppe'],
  ['/blog/feinsteinzeug-oder-naturstein-vergleich', 'travertinoptik'],
  ['/bad/barrierefreies-bad', 'dusche'],
  ['/foerderung', 'dusche'],
  ['/referenzen/barrierefreies-duschbad', 'dusche'],
  ['/blog/duschrinne-oder-punktablauf', 'dusche'],
  ['/untergrund-abdichtung', 'untergrund'],
  ['/leistungen/untergrund', 'untergrund'],
  ['/schadensanalyse', 'untergrund'],
  ['/fliesen/verlegetechnik', 'untergrund'],
  ['/karriere', 'untergrund'],
  ['/blog/fliesenleger-gesucht-geselle-meister', 'untergrund'],
  ['/fliesen', 'boden'],
  ['/fliesen/fugensanierung', 'bad'],
  ['/leistungen/wohnen', 'boden'],
  ['/referenzen/einfamilienhaus-komplett', 'boden'],
  ['/referenzen/wohnbereich-fussbodenheizung', 'boden'],
  ['/blog/fliesen-fuer-allergiker', 'boden'],
  ['/blog/fliesen-mythen-faktencheck', 'boden'],
  ['/blog/fliesen-reinigen-pflegen', 'boden'],
];

const passt = (pfad: string, anfang: string): boolean => pfad === anfang || pfad.startsWith(`${anfang}/`);

/** Kennung des Teilen-Bilds für eine Adresse (Pfad ohne Domain, „/“ für die Startseite) */
export function teilenbildId(pfad: string): TeilenbildId {
  let treffer: readonly [string, TeilenbildId] | undefined;
  for (const regel of REGELN) {
    if (passt(pfad, regel[0]) && (!treffer || regel[0].length > treffer[0].length)) treffer = regel;
  }
  return treffer ? treffer[1] : 'bad';
}

/** Teilen-Bild für eine Adresse, mit voller URL, Maßen und Alt-Text */
export function teilenbild(pfad: string, basis: string): Teilenbild {
  const bild = BILDER[teilenbildId(pfad)];
  return { url: `${basis}${bild.pfad}`, width: 1200, height: 630, alt: bild.alt };
}

/** Pfad (ohne Domain) des Teilen-Bilds; test/teilenbild.test.mjs vergleicht damit `image` der Ratgeber (Teilen 4) */
export function teilenbildPfad(id: TeilenbildId): string {
  return BILDER[id].pfad;
}

/** Alle Teilen-Bilder (für Tests) */
export const TEILENBILDER: ReadonlyArray<{ id: TeilenbildId; pfad: string; alt: string }> = (
  Object.keys(BILDER) as TeilenbildId[]
).map((id) => ({ id, pfad: BILDER[id].pfad, alt: BILDER[id].alt }));
