// SEO-Runde: Titel und Descriptions der Vorlagenseiten an einer Stelle, damit test/titleLength.test.mjs (Test 7) alle Leistungen
// und Orte schon vor dem Bau prüfen kann. Snippet-Runde (03.11.2026, docs/seo/KONTEXT.md Abschnitt 10 und 13): Suchbegriff vorn,
// Titel 50 bis 58 Zeichen und höchstens 561 px, Description 140 bis 155 Zeichen und höchstens 985 px, kurze Marke „ · Tezgel“,
// damit der Platz für Suchbegriff und Mehrwert bleibt. Lange Ortsnamen stehen in der kurzen Form (CityData.kurzname).
// Platzhalter: {ort} = Kurzname, sonst Name. Keine km-Angaben (Faktenblatt F-09 offen). Die Ortsseiten Wetzlar und Aßlar haben
// eigene Titel und Descriptions in src/inhalte/meta/ (gewinnen vor der Vorlage).
import type { CityData } from '@/config/cities';
import { RATING_SUMMARY } from '@/config/reviews';

interface LeistungVorlage {
  /** Anzeigename auf der Seite Leistung × Ort (H1 „{Anzeige} in {Ortsname}“, Strukturdaten, Zeile über dem Abschlussformular) */
  anzeige: string;
  /** Zusatz im Titel nach „{Anzeige} in {Ort}“ */
  titelZusatz: string;
  /** Description mit Platzhalter {ort} */
  beschreibung: string;
  /** Abweichende Fassung je Ort (slug), wo der Suchbegriff der Vorlage einer anderen Zielseite gehört (KONTEXT §6) */
  orte?: Readonly<Record<string, Omit<LeistungVorlage, 'orte'>>>;
}

const LEISTUNG_ORT_VORLAGEN: Readonly<Record<string, LeistungVorlage>> = {
  bad: {
    anzeige: 'Badsanierung',
    titelZusatz: ', bodengleiche Dusche',
    beschreibung: 'Badsanierung in {ort} mit Abdichtung nach DIN 18534, auch barrierefrei. Deniz Tezgel misst kostenfrei bei Ihnen auf, dann folgt Ihr Festpreisangebot.',
  },
  wohnen: {
    anzeige: 'Fliesen verlegen',
    titelZusatz: ', auch Großformate',
    beschreibung: 'Fliesen verlegen in {ort} für Küche, Flur, Wohnraum und Treppe. Der Termin vor Ort ist kostenfrei, danach erhalten Sie ein Festpreisangebot.',
    // „Fliesen verlegen Wetzlar“ gehört der Wetzlar-Seite, „Fliesenverlegung Aßlar“ und „Fliesen Aßlar“ der Startseite
    // (KONTEXT §6, freigegebener Plan); dort zielt die Seite auf ihren Inhalt, Böden und Wände
    orte: {
      wetzlar: {
        anzeige: 'Böden und Wände fliesen',
        titelZusatz: ', große Fliesen',
        beschreibung: 'Wir fliesen Böden und Wände in {ort}: Wohnraum, Küche, Flur und Treppe. Der Termin vor Ort ist kostenfrei, danach folgt Ihr Festpreisangebot.',
      },
      asslar: {
        anzeige: 'Böden und Wände fliesen',
        titelZusatz: ', große Fliesen',
        beschreibung: 'Wir fliesen Böden und Wände in {ort}: Wohnraum, Küche, Flur und Treppe. Der Termin vor Ort ist kostenfrei, danach folgt Ihr Festpreisangebot.',
      },
    },
  },
  aussen: {
    anzeige: 'Balkonsanierung',
    titelZusatz: ', Terrasse fliesen',
    beschreibung: 'Balkonsanierung in {ort} mit mindestens 1,5 bis 2 % Gefälle und Abdichtung. Kostenfreier Termin vor Ort, danach erhalten Sie ein Festpreisangebot.',
  },
  untergrund: {
    anzeige: 'Untergrund & Abdichtung',
    titelZusatz: ', DIN 18534',
    beschreibung: 'Untergrund und Abdichtung in {ort}: Beim kostenfreien Termin prüfen wir den Boden. Wir gleichen Estrich aus, füllen Risse und dichten im Bad ab.',
  },
};

type Ort = Pick<CityData, 'name' | 'kurzname' | 'slug'>;
const vorlage = (serviceId: string, city: Ort): Omit<LeistungVorlage, 'orte'> | undefined => {
  const v = LEISTUNG_ORT_VORLAGEN[serviceId];
  return v ? (v.orte?.[city.slug] ?? v) : undefined;
};

/** Anzeigename der Leistung auf der Seite Leistung × Ort (H1, Strukturdaten, Zeile über dem Abschlussformular) */
export function leistungAnzeige(service: { id: string; name: string }, city: Ort): string {
  return vorlage(service.id, city)?.anzeige ?? service.name;
}

const ortImTitel = (city: Pick<CityData, 'name' | 'kurzname'>): string => city.kurzname ?? city.name;
const einsetzen = (text: string, ort: string): string => text.replaceAll('{ort}', ort);

export function leistungOrtTitel(service: { id: string; name: string }, city: Ort): string {
  const v = vorlage(service.id, city);
  return `${v?.anzeige ?? service.name} in ${ortImTitel(city)}${v?.titelZusatz ?? ''} · Tezgel`;
}

export function leistungOrtBeschreibung(service: { id: string; name: string }, city: Ort): string {
  const v = vorlage(service.id, city);
  return einsetzen(v?.beschreibung ?? `${service.name} in {ort}. Der Termin bei Ihnen vor Ort ist kostenfrei, danach erhalten Sie ein Festpreisangebot.`, ortImTitel(city));
}

/** Titel der Ortsseite /standorte/<ort>; die Bewertung mit ihrer Quelle wie in der Bewertungszeile der Seite
 *  („5,0 von 5 Sternen · 27 Bewertungen bei Google“), aus RATING_SUMMARY, damit beide nie auseinanderlaufen */
export function ortsseiteTitel(city: Pick<CityData, 'name' | 'kurzname'>): string {
  const g = RATING_SUMMARY.google;
  return `Fliesenleger in ${ortImTitel(city)}, ${g.displayRating} von ${g.maxRating} bei ${g.source} · Tezgel`;
}

/** Description der Ortsseite /standorte/<ort> */
export function ortsseiteBeschreibung(city: Pick<CityData, 'name' | 'kurzname'>): string {
  return `Fliesenleger für ${ortImTitel(city)}: Bäder und Duschen, Böden, Balkone und Terrassen. Deniz Tezgel kommt kostenfrei zu Ihnen, dann folgt Ihr Festpreisangebot.`;
}
