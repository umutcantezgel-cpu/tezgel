import type { IconName, Richtung } from '@/components/kern/icons/geometrie';

// Kern-Abbildung der Icon-Namen (K-010, E-010, Paket P3-04 · Kern v1.2).
// Der Bestand löst Namen über `src/utils/iconMapper.jsx` auf: String → PascalCase → lucide-Export, sonst HelpCircle.
// Hier wird jeder Name aus `src/config/*` (und die lucide-Namen aus Schale und Startseite) auf ein Kern-Icon abgebildet
// oder ausdrücklich markiert: „entfällt (Icon-Kachel, S-11)“ oder „folgt im Vollsatz P4-04“.
// Konfig-Strings bleiben unverändert (E-010: Abbildung statt Umbenennung). Ohne Treffer gibt es kein Ersatzzeichen.

export const ENTFAELLT = 'entfällt (Icon-Kachel, S-11)';
export const VOLLSATZ = 'folgt im Vollsatz P4-04';

/** Passt direkt auf die Props der Komponente: `<Icon {...kernIcon('ArrowRight')} />`. */
export type KernIconZiel = { readonly name: IconName; readonly richtung?: Richtung };

export type IconAbbildung =
  | { readonly status: 'icon'; readonly ziel: KernIconZiel; readonly fundorte: readonly string[]; readonly hinweis?: string }
  | { readonly status: 'entfaellt'; readonly grund: string; readonly fundorte: readonly string[]; readonly hinweis?: string }
  | { readonly status: 'vollsatz'; readonly grund: typeof VOLLSATZ; readonly fachzeichen: string; readonly fundorte: readonly string[]; readonly hinweis?: string };

type Zusatz = { richtung?: Richtung; hinweis?: string };

const icon = (name: IconName, fundorte: readonly string[], z: Zusatz = {}): IconAbbildung => ({
  status: 'icon',
  ziel: z.richtung ? { name, richtung: z.richtung } : { name },
  fundorte,
  ...(z.hinweis ? { hinweis: z.hinweis } : {}),
});
const entfaellt = (fundorte: readonly string[], grund: string = ENTFAELLT, hinweis?: string): IconAbbildung => ({
  status: 'entfaellt',
  grund,
  fundorte,
  ...(hinweis ? { hinweis } : {}),
});
const vollsatz = (fachzeichen: string, fundorte: readonly string[], hinweis?: string): IconAbbildung => ({
  status: 'vollsatz',
  grund: VOLLSATZ,
  fachzeichen,
  fundorte,
  ...(hinweis ? { hinweis } : {}),
});

/** Schlüssel: Kleinbuchstaben ohne Trennzeichen („ShieldCheck“, „shield-check“ → „shieldcheck“). */
export const normalisiereIconName = (name: string) => name.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

/** Icon-Namen, wie sie in `src/config/*` stehen (Strings in services.js, lucide-Importe in blog.js und company.js). */
export const KONFIG_ICON_NAMEN = [
  'Droplets', 'bath', 'layers', 'sparkles', 'grid', 'Sparkles', 'home', 'box', 'Sun', 'arrow-down-right', 'shield',
  'ShieldCheck', 'hammer', 'ruler', 'zap', 'LayoutGrid', 'Grid3x3', 'BookOpen', 'Newspaper', 'Award', 'Clock', 'Heart',
] as const;

const S = 'config/services.js';
const B = 'config/blog.js';
const C = 'config/company.js';

const ABBILDUNG: Readonly<Record<string, IconAbbildung>> = {
  // ---- A · Namen aus src/config/* ----
  droplets: icon('bad', [`${S}: Leistung „Bäder & Wellness“`, `${B}: Kategorie „Bad & Dusche“`]),
  bath: icon('bad', [`${S}: „Bodengleiche Walk-In-Duschen“`, 'PricingCalculator: „bad“'], {
    hinweis: `Dusche/Rinne ${VOLLSATZ}`,
  }),
  layers: icon('grossformat', [`${S}: „XXL-Großformatfliesen“`, `${S}: „Treppen neu belegen“`, `${S}: „20 mm Platten auf Stelzlagern“`], {
    hinweis: `Treppe und Balkon (Stelzlager) ${VOLLSATZ}`,
  }),
  sparkles: entfaellt(
    [`${S}: Leistung „Wohnen“`, `${S}: „Beleuchtete Wandnischen“`, `${B}: „Pflege & Werterhalt“`, `${C}: Staubschutz (trustPillars, values)`],
    ENTFAELLT,
    'Funkeln-Zeichen (S-09)',
  ),
  grid: entfaellt([`${S}: „Trockenbau & Vorwandelemente“`, `${S}: „Feinsteinzeug & Fliesen“`]),
  grid3x3: entfaellt([`${B}: „Fliesen & Material“`]),
  layoutgrid: entfaellt([`${B}: „Alle Artikel“`]),
  home: entfaellt([`${S}: „Küchen, Dielen & Flure“`, 'PricingCalculator: „wohnbereich“']),
  house: entfaellt(['lucide-Anzeigename von Home']),
  box: vollsatz('Naturstein', [`${S}: „Granit & Natursteinbeläge“`]),
  sun: vollsatz('Balkon', [`${S}: Leistung „Balkon & Terrasse“`, `${B}: „Balkon & Terrasse“`, 'PricingCalculator']),
  arrowdownright: vollsatz('Untergrund', [`${S}: „Gefälleausbildung & Entwässerung“`], 'Bestand löst den Namen nicht auf (iconMapper fällt auf HelpCircle zurück)'),
  shield: icon('abdichtung', [`${S}: „Witterungsbeständige Abdichtung“`, `${S}: „Abdichtung nach DIN 18534“`]),
  shieldcheck: icon('abdichtung', [`${S}: Leistung „Untergrund & Abdichtung“`, `${B}: „Untergrund & Abdichtung“`, `${C}: DIN 18534 (trustPillars, values)`, 'Kopf, Fuß, Startseite']),
  hammer: vollsatz('Untergrund', [`${S}: „Rückbau & Entkernung alter Beläge“`]),
  ruler: vollsatz('Untergrund', [`${S}: „Estrich- & Nivellierarbeiten“`, `${C}: values „Großformat-Präzision“`, 'Leiste und Abschluss: „Aufmaß“'], 'Zeichen für „Aufmaß“ offen (Rückgabe P3-04)'),
  zap: vollsatz('Untergrund', [`${S}: „Rissverharzung & Haftbrücken“`]),
  bookopen: entfaellt([`${B}: „Ratgeber & Kosten“`, 'Startseite: Portal-Kacheln']),
  newspaper: entfaellt([`${B}: „Neuigkeiten“`]),
  award: entfaellt([`${C}: HWK (trustPillars, values)`], ENTFAELLT, 'HWK seit 2008 steht als Text im Schriftfeld (K-008)'),
  clock: icon('uhr', [`${C}: values „Termintreue & Festpreis“`, 'Fuß: Öffnungszeiten', 'HeroContactForm']),
  heart: entfaellt([`${C}: values „Kundenbegeisterung“`]),

  // ---- B · lucide-Namen aus Schale und Startseite (Bestand), Ersatz im Grundsatz ----
  phone: icon('telefon', ['Kopf, Fuß, Leiste, Startseite']),
  messagecircle: icon('sprechblase', ['Kopf, Fuß, Leiste, Startseite'], { hinweis: 'als WhatsApp-Knopf: Marke whatsapp' }),
  mail: icon('mail', ['Fuß']),
  mappin: icon('ort', ['Fuß, Startseite, TrustStrip']),
  calendar: icon('kalender', ['Termin, Beratung']),
  arrowright: icon('pfeil', ['Kopf, Fuß, Startseite, Formulare']),
  arrowleft: icon('pfeil', ['–'], { richtung: 'links' }),
  arrowup: icon('pfeil', ['–'], { richtung: 'oben' }),
  arrowdown: icon('pfeil', ['–'], { richtung: 'unten' }),
  chevronright: icon('winkel', ['ReviewCarousel']),
  chevronleft: icon('winkel', ['ReviewCarousel'], { richtung: 'links' }),
  chevrondown: icon('winkel', ['Kopf (Untermenü)'], { richtung: 'unten' }),
  chevronup: icon('winkel', ['–'], { richtung: 'oben' }),
  x: icon('schliessen', ['Menü, Dialoge']),
  menu: icon('menue', ['Kopf unter lg']),
  check: icon('haken', ['Startseite, Abschluss']),
  checkcircle2: icon('haken', ['Startseite, Formulare, TrustStrip'], { hinweis: 'Kreis entfällt; Erfolg = Haken + Text (K-006)' }),
  circlecheck: icon('haken', ['lucide-Anzeigename von CheckCircle2']),
  info: icon('hinweis', ['–']),
  alertcircle: icon('fehler', ['Formulare'], { hinweis: 'Versatz-Zeichen + Text + role="alert" (K-006)' }),
  circlealert: icon('fehler', ['lucide-Anzeigename von AlertCircle']),
  alerttriangle: icon('fehler', ['–']),
  trianglealert: icon('fehler', ['lucide-Anzeigename von AlertTriangle']),
  plus: icon('plus', ['FAQAccordion']),
  minus: icon('minus', ['–']),
  star: icon('stern', ['Startseite, Bewertungen, Abschluss'], { hinweis: 'vergebene Sterne: stern-voll' }),
  download: icon('download', ['Downloads']),
  search: icon('suche', ['–']),
  share: icon('teilen', ['–']),
  share2: icon('teilen', ['Blog']),
  maximize2: icon('grossformat', ['PricingCalculator: „grossformat“']),
  send: icon('pfeil', ['PricingCalculator: Absenden'], { hinweis: 'Knopf sagt im Text, was passiert (K-011)' }),
  wrench: vollsatz('Reparatur', ['PricingCalculator: „reparatur“']),
  loader2: entfaellt(['Formulare'], 'entfällt (Ladeanzeige über data-motion="laden", K-009)'),
  loadercircle: entfaellt(['lucide-Anzeigename von Loader2'], 'entfällt (Ladeanzeige über data-motion="laden", K-009)'),
  helpcircle: entfaellt(['iconMapper-Ersatzzeichen', 'FAQAccordion'], 'entfällt (Ersatzzeichen ohne Bedeutung; ohne Treffer kein Icon)'),
  circlequestionmark: entfaellt(['lucide-Anzeigename von HelpCircle'], 'entfällt (Ersatzzeichen ohne Bedeutung; ohne Treffer kein Icon)'),
  calculator: entfaellt(['Startseite: Portal-Kacheln']),
  printer: entfaellt(['Fuß'], 'entfällt (Zierzeichen vor Text; Fuß als Schriftfeld, K-008)'),
  landmark: entfaellt(['Fuß'], 'entfällt (Zierzeichen vor Text; Fuß als Schriftfeld, K-008)'),
  receipt: entfaellt(['Fuß'], 'entfällt (Zierzeichen vor Text; Fuß als Schriftfeld, K-008)'),
};

export const KERN_ICON_ABBILDUNG = ABBILDUNG;

/** Eingabe wie beim Bestand: String aus der Konfiguration oder lucide-Komponente (über ihren Anzeigenamen). */
export type IconQuelle = string | { readonly displayName?: string } | null | undefined;

const schluessel = (quelle: IconQuelle): string | null => {
  if (!quelle) return null;
  const roh = typeof quelle === 'string' ? quelle : quelle.displayName;
  return roh ? normalisiereIconName(roh) : null;
};

/** Volle Auskunft zu einem Namen; null, wenn der Name nicht verzeichnet ist. */
export function iconAbbildung(quelle: IconQuelle): IconAbbildung | null {
  const k = schluessel(quelle);
  return k && Object.hasOwn(ABBILDUNG, k) ? ABBILDUNG[k] : null;
}

/** Kern-Icon für einen Namen oder null (entfällt, folgt im Vollsatz oder unbekannt – dann wird kein Icon gezeigt). */
export function kernIcon(quelle: IconQuelle): KernIconZiel | null {
  const a = iconAbbildung(quelle);
  return a && a.status === 'icon' ? a.ziel : null;
}
