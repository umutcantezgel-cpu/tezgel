import type { IconName, Richtung } from '@/components/kern/icons/geometrie';

// Kern-Abbildung der Icon-Namen (K-010, E-010, Pakete P3-04 und P4-04 · Kern v1.2).
// Der Bestand löst Namen über `src/utils/iconMapper.jsx` auf: String → PascalCase → lucide-Export, sonst HelpCircle.
// Hier wird jeder Name aus `src/config/*` und jeder lucide- und Phosphor-Import aus `src/app/(bestand)`, `src/components`
// (ohne `kern`) und `src/config` auf ein Kern-Icon abgebildet oder ausdrücklich markiert: entfällt (mit Grund) oder Marke.
// Konfig-Strings bleiben unverändert (E-010: Abbildung statt Umbenennung). Ohne Treffer gibt es kein Ersatzzeichen.
// Vollsatz P4-04: alle früheren Einträge „folgt im Vollsatz P4-04“ zeigen jetzt auf ein Fachzeichen.

export const ENTFAELLT = 'entfällt (Icon-Kachel, S-11)';
/** Status aus P3-04; seit P4-04 ohne Eintrag (alle Fachzeichen gezeichnet). Bleibt für bestehende Leser des Typs. */
export const VOLLSATZ = 'folgt im Vollsatz P4-04';
/** Funkeln-Zeichen (Sparkles): kein Ersatz im Kern. */
export const FUNKELN =
  'entfällt (Funkeln, S-09; im Bestand vier Bedeutungen – Wohnen, Wandnischen, Pflege, Staubschutz –, ein fester Ersatz würde eine davon erfinden)';
const ZIER = 'entfällt (Zierzeichen vor Text; der Text trägt die Bedeutung)';
const ZITAT = 'entfällt (Kundenstimme als wörtliches Zitat mit typografischen Anführungszeichen, K-011)';
const FELD = 'entfällt (Feldsymbol; Formulare mit sichtbarer Beschriftung über dem Feld, K-011)';
const BELEG = 'entfällt (Auszeichnungs-Zeichen ohne Beleg; Wahrheit Rang 1)';
const MARKE = 'Markenlogo: eigene Ausnahme, unverändert, zählt nicht zur Familie (K-010)';

/** Passt direkt auf die Props der Komponente: `<Icon {...kernIcon('ArrowRight')} />`. */
export type KernIconZiel = { readonly name: IconName; readonly richtung?: Richtung };

export type IconAbbildung =
  | { readonly status: 'icon'; readonly ziel: KernIconZiel; readonly fundorte: readonly string[]; readonly hinweis?: string }
  | { readonly status: 'entfaellt'; readonly grund: string; readonly fundorte: readonly string[]; readonly hinweis?: string }
  | { readonly status: 'marke'; readonly marke: string; readonly grund: typeof MARKE; readonly fundorte: readonly string[]; readonly hinweis?: string }
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
const marke = (name: string, fundorte: readonly string[]): IconAbbildung => ({ status: 'marke', marke: name, grund: MARKE, fundorte });
/** Fundstellen im Bestand: Zahl der Dateien mit Import (Erhebung P4-04). */
const bestand = (dateien: number) => `Bestand: ${dateien} ${dateien === 1 ? 'Datei' : 'Dateien'}`;

/** Schlüssel: Kleinbuchstaben ohne Trennzeichen („ShieldCheck“, „shield-check“ → „shieldcheck“). */
export const normalisiereIconName = (name: string) => name.replace(/[^A-Za-z0-9]/g, '').toLowerCase();

/** Icon-Namen, wie sie in `src/config/*` stehen (Strings in services.js, lucide-Importe in blog.js und company.js). */
export const KONFIG_ICON_NAMEN = [
  'Droplets', 'bath', 'layers', 'sparkles', 'grid', 'Sparkles', 'home', 'box', 'Sun', 'arrow-down-right', 'shield',
  'ShieldCheck', 'hammer', 'ruler', 'zap', 'LayoutGrid', 'Grid3x3', 'BookOpen', 'Newspaper', 'Award', 'Clock', 'Heart',
  'Ruler',
] as const;

/**
 * Alle lucide- und Phosphor-Importe aus `src/app/(bestand)`, `src/components` (ohne `kern`) und `src/config`
 * (Erhebung P4-04, 202 Dateien, 136 Namen ohne den Typ `LucideIcon`), nach Zahl der Dateien absteigend.
 */
export const BESTAND_ICON_NAMEN = [
  'ArrowRight', 'Phone', 'CheckCircle2', 'MessageCircle', 'ShieldCheck', 'Sparkles', 'Ruler', 'Layers', 'Droplets', 'Clock',
  'MapPin', 'Star', 'Award', 'Info', 'Mail', 'BookOpen', 'AlertCircle', 'Check', 'ArrowLeft', 'Footprints', 'Hammer',
  'LayoutGrid', 'Quote', 'Send', 'Sun', 'CalendarCheck', 'ChevronDown', 'Loader2', 'Search', 'Trees', 'Wrench', 'FileText',
  'Gauge', 'HelpCircle', 'Home', 'Lock', 'TriangleAlert', 'AlertTriangle', 'CircleCheck', 'ClipboardCheck', 'ClipboardList',
  'Grid', 'Maximize2', 'Navigation', 'Snowflake', 'Users', 'DoorOpen', 'ExternalLink', 'Grid3x3', 'Mountain', 'Palette',
  'BadgePercent', 'Bath', 'Building2', 'Calendar', 'MessageSquare', 'Scissors', 'Thermometer', 'Timer', 'Calculator',
  'Camera', 'ChefHat', 'Gem', 'House', 'Printer', 'Scale', 'ScanSearch', 'ShowerHead', 'Square', 'SquareStack',
  'Accessibility', 'ArrowDownRight', 'Blend', 'Boxes', 'Brush', 'ChevronRight', 'ChevronUp', 'CloudRain', 'Eye',
  'FacebookLogo', 'FlaskConical', 'GraduationCap', 'HeartHandshake', 'LinkedinLogo', 'PaintRoller', 'Plus', 'Receipt',
  'Split', 'Tag', 'TwitterLogo', 'User', 'UserCheck', 'Weight', 'X', 'ArrowUpRight', 'Ban', 'Briefcase', 'CalendarClock',
  'CheckCircle', 'ChevronLeft', 'CircleDot', 'Compass', 'Cookie', 'Download', 'Ear', 'FileCheck', 'Fingerprint',
  'FolderOpen', 'HardHat', 'Heart', 'Hexagon', 'Landmark', 'Lightbulb', 'Link', 'List', 'ListChecks', 'Microscope', 'Move',
  'MoveHorizontal', 'Newspaper', 'Package', 'PhoneCall', 'Plug', 'RotateCcw', 'Settings2', 'Share2', 'Shield', 'Sliders',
  'SplitSquareHorizontal', 'SprayCan', 'SquareSplitVertical', 'ThermometerSun', 'ThumbsUp', 'Trophy', 'Waves', 'Wind',
] as const;

const S = 'config/services.js';
const B = 'config/blog.js';
const C = 'config/company.js';
const LUCIDE = 'lucide-Anzeigename von';

const ABBILDUNG: Readonly<Record<string, IconAbbildung>> = {
  // ---- A · Namen aus src/config/* ----
  droplets: icon('bad', [`${S}: Leistung „Bäder & Wellness“`, `${B}: Kategorie „Bad & Dusche“`]),
  bath: icon('bad', [`${S}: „Bodengleiche Walk-In-Duschen“`, 'PricingCalculator: „bad“', bestand(4)], {
    hinweis: 'Walk-In-Duschen über Kontext leistung:walk-in-duschen → dusche',
  }),
  layers: icon('grossformat', [`${S}: „XXL-Großformatfliesen“`, `${S}: „Treppen neu belegen“`, `${S}: „20 mm Platten auf Stelzlagern“`], {
    hinweis: 'Treppe und Stelzlager über Kontext (leistung:treppen → treppe, leistung:stelzlager → balkon)',
  }),
  sparkles: entfaellt(
    [`${S}: Leistung „Wohnbereiche & Neubau“`, `${S}: „Beleuchtete Wandnischen“`, `${B}: „Pflege & Werterhalt“`, `${C}: Staubschutz (trustPillars, values)`, bestand(38)],
    FUNKELN,
    'Leistung „Wohnbereiche & Neubau“ über Kontext leistung:wohnen → grossformat (ruhiges Fachzeichen)',
  ),
  grid: entfaellt([`${S}: „Trockenbau & Vorwandelemente“`, `${S}: „Feinsteinzeug & Fliesen“`, bestand(6)]),
  grid3x3: entfaellt([`${B}: „Fliesen & Material“`, `${LUCIDE} Grid`]),
  layoutgrid: entfaellt([`${B}: „Alle Artikel“`]),
  home: entfaellt([`${S}: „Küchen, Dielen & Flure“`, 'PricingCalculator: „wohnbereich“', bestand(7)]),
  house: entfaellt([`${LUCIDE} Home`]),
  box: icon('naturstein', [`${S}: „Granit & Natursteinbeläge“`]),
  sun: icon('balkon', [`${S}: Leistung „Balkon- & Terrassensanierung“`, `${B}: „Balkon & Terrasse“`, 'PricingCalculator', bestand(10)]),
  arrowdownright: icon('untergrund', [`${S}: „Gefälleausbildung & Entwässerung“`, bestand(2)], {
    hinweis: 'Gefälle; Bestand löst den Konfig-String nicht auf (iconMapper fällt auf HelpCircle zurück)',
  }),
  shield: icon('abdichtung', [`${S}: „Witterungsbeständige Abdichtung“`, `${S}: „Abdichtung nach DIN 18534“`]),
  shieldcheck: icon('abdichtung', [`${S}: Leistung „Untergrund & Abdichtung“`, `${B}: „Untergrund & Abdichtung“`, `${C}: DIN 18534 (trustPillars, values)`, 'Kopf, Fuß, Startseite']),
  hammer: icon('untergrund', [`${S}: „Rückbau & Entkernung alter Beläge“`, bestand(10)], { hinweis: 'Rückbau gehört zum Untergrund' }),
  ruler: icon('aufmass', [`${S}: „Estrich- & Nivellierarbeiten“`, `${C}: values „Großformat-Präzision“`, 'Leiste und Abschluss: „Aufmaß“', bestand(35)], {
    hinweis: 'Estrich & Nivellierung über Kontext leistung:ausgleich → untergrund',
  }),
  zap: icon('untergrund', [`${S}: „Rissverharzung & Haftbrücken“`]),
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
  wrench: icon('reparatur', ['PricingCalculator: „reparatur“', bestand(9)]),
  loader2: entfaellt(['Formulare'], 'entfällt (Ladeanzeige über data-motion="laden", K-009)'),
  loadercircle: entfaellt(['lucide-Anzeigename von Loader2'], 'entfällt (Ladeanzeige über data-motion="laden", K-009)'),
  helpcircle: entfaellt(['iconMapper-Ersatzzeichen', 'FAQAccordion'], 'entfällt (Ersatzzeichen ohne Bedeutung; ohne Treffer kein Icon)'),
  circlequestionmark: entfaellt(['lucide-Anzeigename von HelpCircle'], 'entfällt (Ersatzzeichen ohne Bedeutung; ohne Treffer kein Icon)'),
  calculator: entfaellt(['Startseite: Portal-Kacheln']),
  printer: entfaellt(['Fuß'], 'entfällt (Zierzeichen vor Text; Fuß als Schriftfeld, K-008)'),
  landmark: entfaellt(['Fuß'], 'entfällt (Zierzeichen vor Text; Fuß als Schriftfeld, K-008)'),
  receipt: entfaellt(['Fuß'], 'entfällt (Zierzeichen vor Text; Fuß als Schriftfeld, K-008)'),

  // ---- C · übrige lucide- und Phosphor-Importe der Bestandsseiten (Vollsatz P4-04) ----
  footprints: entfaellt([bestand(10)]),
  quote: entfaellt([bestand(10)], ZITAT),
  calendarcheck: icon('kalender', [bestand(9)]),
  trees: entfaellt([bestand(9)]),
  filetext: icon('dokument', [bestand(8)]),
  gauge: entfaellt([bestand(7)]),
  lock: icon('schloss', [bestand(7)], { hinweis: 'Feldsymbol im Login entfällt (Beschriftung über dem Feld, K-011)' }),
  clipboardcheck: icon('dokument', [bestand(6)]),
  clipboardlist: icon('dokument', [bestand(6)]),
  navigation: icon('ort', [bestand(6)], { hinweis: 'Route und Anfahrt' }),
  snowflake: entfaellt([bestand(6)]),
  users: entfaellt([bestand(6)]),
  dooropen: entfaellt([bestand(5)]),
  externallink: icon('extern', [bestand(5)]),
  mountain: icon('naturstein', [bestand(5)]),
  palette: entfaellt([bestand(5)]),
  badgepercent: entfaellt([bestand(4)]),
  building2: entfaellt([bestand(4)]),
  messagesquare: icon('sprechblase', [bestand(4)]),
  scissors: entfaellt([bestand(4)]),
  thermometer: icon('fussbodenheizung', [bestand(4)], { hinweis: 'auf „Estrich-Belegreife“ steht es für eine Messung: dort ohne Icon' }),
  timer: icon('uhr', [bestand(4)]),
  camera: entfaellt([bestand(3)], ZIER),
  chefhat: entfaellt([bestand(3)]),
  gem: icon('naturstein', [bestand(3)]),
  scale: entfaellt([bestand(3)]),
  scansearch: icon('suche', [bestand(3)]),
  showerhead: icon('dusche', [bestand(3)]),
  square: entfaellt([bestand(3)]),
  squarestack: icon('untergrund', [bestand(3)], { hinweis: 'Schichtaufbau (Entkopplung, DIN 18534)' }),
  accessibility: entfaellt([bestand(2)]),
  blend: entfaellt([bestand(2)]),
  boxes: entfaellt([bestand(2)]),
  brush: entfaellt([bestand(2)]),
  cloudrain: entfaellt([bestand(2)]),
  eye: entfaellt([bestand(2)], ZIER),
  facebooklogo: marke('Facebook', [bestand(2)]),
  flaskconical: entfaellt([bestand(2)]),
  graduationcap: entfaellt([bestand(2)]),
  hearthandshake: entfaellt([bestand(2)]),
  linkedinlogo: marke('LinkedIn', [bestand(2)]),
  paintroller: entfaellt([bestand(2)]),
  split: entfaellt([bestand(2)]),
  tag: entfaellt([bestand(2)]),
  twitterlogo: marke('X (Twitter)', [bestand(2)]),
  user: entfaellt([bestand(2)], FELD),
  usercheck: entfaellt([bestand(2)]),
  weight: entfaellt([bestand(2)]),
  arrowupright: icon('extern', [bestand(1)]),
  ban: icon('schliessen', [bestand(1)], { hinweis: 'Nein-Zeichen in Listen; Warnungen als Hinweis-Feld' }),
  briefcase: entfaellt([bestand(1)]),
  calendarclock: icon('kalender', [bestand(1)]),
  checkcircle: icon('haken', [bestand(1)], { hinweis: 'Kreis entfällt' }),
  circlecheckbig: icon('haken', [`${LUCIDE} CheckCircle`]),
  circledot: entfaellt([bestand(1)]),
  compass: entfaellt([bestand(1)]),
  cookie: entfaellt([bestand(1)], ZIER),
  ear: entfaellt([bestand(1)]),
  filecheck: icon('dokument', [bestand(1)]),
  fingerprint: entfaellt([bestand(1)]),
  fingerprintpattern: entfaellt([`${LUCIDE} Fingerprint`]),
  folderopen: entfaellt([bestand(1)]),
  hardhat: entfaellt([bestand(1)]),
  hexagon: entfaellt([bestand(1)]),
  lightbulb: entfaellt([bestand(1)]),
  link: icon('teilen', [bestand(1)], { hinweis: 'Link kopieren' }),
  list: entfaellt([bestand(1)]),
  listchecks: entfaellt([bestand(1)]),
  microscope: entfaellt([bestand(1)]),
  move: entfaellt([bestand(1)]),
  movehorizontal: entfaellt([bestand(1)]),
  package: entfaellt([bestand(1)]),
  phonecall: icon('telefon', [bestand(1)]),
  plug: entfaellt([bestand(1)]),
  rotateccw: entfaellt([bestand(1)], ZIER),
  settings2: entfaellt([bestand(1)]),
  sliders: entfaellt([bestand(1)]),
  slidersvertical: entfaellt([`${LUCIDE} Sliders`]),
  splitsquarehorizontal: entfaellt([bestand(1)]),
  squaresplithorizontal: entfaellt([`${LUCIDE} SplitSquareHorizontal`]),
  spraycan: entfaellt([bestand(1)]),
  squaresplitvertical: entfaellt([bestand(1)]),
  thermometersun: entfaellt([bestand(1)]),
  thumbsup: entfaellt([bestand(1)]),
  trophy: entfaellt([bestand(1)], BELEG),
  waves: entfaellt([bestand(1)]),
  waveshorizontal: entfaellt([`${LUCIDE} Waves`]),
  wind: entfaellt([bestand(1)]),
};

export const KERN_ICON_ABBILDUNG = ABBILDUNG;

/**
 * Kontext vor Name: dieselbe Zeichenkette steht in services.js für verschiedene Leistungen (`layers` = Großformat, Treppe,
 * Stelzlager; offene Frage 5 aus P3-04). Schlüssel `leistung:<id>` (id aus services.js). Nur Einträge, die vom Namen abweichen.
 */
export const KONTEXT_ABBILDUNG: Readonly<Record<string, IconAbbildung>> = {
  'leistung:wohnen': icon('grossformat', [`${S}: Leistung „Wohnbereiche & Neubau“ (Sparkles)`], {
    hinweis: 'ruhiges Fachzeichen statt Funkeln (S-09): Kurzbeschreibung nennt Großformate und durchgängige Fugenachsen',
  }),
  'leistung:walk-in-duschen': icon('dusche', [`${S}: „Bodengleiche Walk-In-Duschen“ (bath)`]),
  'leistung:treppen': icon('treppe', [`${S}: „Treppen neu belegen“ (layers)`]),
  'leistung:stelzlager': icon('balkon', [`${S}: „20 mm Platten auf Stelzlagern“ (layers)`]),
  'leistung:ausgleich': icon('untergrund', [`${S}: „Estrich- & Nivellierarbeiten“ (ruler)`]),
};

/** Eingabe wie beim Bestand: String aus der Konfiguration oder lucide-Komponente (über ihren Anzeigenamen). */
export type IconQuelle = string | { readonly displayName?: string } | null | undefined;

const schluessel = (quelle: IconQuelle): string | null => {
  if (!quelle) return null;
  const roh = typeof quelle === 'string' ? quelle : quelle.displayName;
  return roh ? normalisiereIconName(roh) : null;
};

/**
 * Volle Auskunft zu einem Namen; null, wenn der Name nicht verzeichnet ist.
 * `kontext` (z. B. `leistung:treppen`) geht dem Namen vor, wenn er in KONTEXT_ABBILDUNG steht.
 */
export function iconAbbildung(quelle: IconQuelle, kontext?: string): IconAbbildung | null {
  if (kontext && Object.hasOwn(KONTEXT_ABBILDUNG, kontext)) return KONTEXT_ABBILDUNG[kontext];
  const k = schluessel(quelle);
  return k && Object.hasOwn(ABBILDUNG, k) ? ABBILDUNG[k] : null;
}

/** Kern-Icon für einen Namen oder null (entfällt, Marke oder unbekannt – dann wird kein Icon gezeigt). */
export function kernIcon(quelle: IconQuelle, kontext?: string): KernIconZiel | null {
  const a = iconAbbildung(quelle, kontext);
  return a && a.status === 'icon' ? a.ziel : null;
}
