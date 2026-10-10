// Zuordnung aller bisher genutzten lucide-Icons zur eigenen Familie (KERN K-008, E-006).
// Wert = Name in src/components/icons/svg (bzw. Markenlogo „marke-*“) oder null = entfällt.
// „entfällt“ heißt: Icon-Kachel ersatzlos streichen (Fuge statt Karte) bzw. in Aufzählungen das
// Fugenkreuz (Merkliste) nutzen. Kontextregeln stehen in den Kommentaren; sie gehen der Tabelle vor.
export const LUCIDE_ZUORDNUNG: Record<string, string | null> = {
  // Richtung und Navigation
  ArrowRight: 'pfeil-rechts', ArrowUpRight: 'pfeil-rechts', ArrowDownRight: 'pfeil-rechts', Send: 'pfeil-rechts',
  ArrowLeft: 'pfeil-links', RotateCcw: 'pfeil-links',
  ChevronDown: 'winkel-unten', ChevronUp: 'winkel-unten', // ChevronUp: mit rotate-180
  ChevronRight: 'winkel-rechts', ChevronLeft: 'winkel-rechts', // ChevronLeft: mit -scale-x-100
  ExternalLink: 'link-extern', Link: 'link-extern', Share2: 'teilen',
  Navigation: 'ort', Compass: 'ort', MapPin: 'ort',
  // Kontakt – MessageCircle/MessageSquare in WhatsApp-Zusammenhang: 'marke-whatsapp', sonst 'sprechblase'
  Phone: 'telefon', PhoneCall: 'telefon', Mail: 'mail', MessageCircle: 'sprechblase', MessageSquare: 'sprechblase',
  // Zustand – in Aufzählungen statt Haken das Fugenkreuz (Merkliste); im Fehlerzustand 'fehler'
  Check: 'haken', CheckCircle: 'haken', CheckCircle2: 'haken', CircleCheck: 'haken', ClipboardCheck: 'haken',
  ListChecks: 'haken', FileCheck: 'haken', UserCheck: 'haken',
  Info: 'info', HelpCircle: 'info', Lightbulb: 'hinweis',
  AlertCircle: 'hinweis', AlertTriangle: 'hinweis', TriangleAlert: 'hinweis', Ban: 'fehler',
  X: 'schliessen', Plus: 'plus',
  // Zeit und Termin
  Clock: 'uhr', Timer: 'uhr', CalendarClock: 'kalender', Calendar: 'kalender', CalendarCheck: 'kalender',
  // Inhalte
  BookOpen: 'dokument', Newspaper: 'dokument', FileText: 'dokument', Receipt: 'dokument', FolderOpen: 'dokument',
  ClipboardList: 'dokument', Printer: 'dokument', Download: 'download', Search: 'suche', Eye: 'suche', ScanSearch: 'suche',
  Lock: 'schloss', Fingerprint: 'schloss', Star: 'stern',
  // Gebäude
  Home: 'haus', House: 'haus', Building2: 'haus', Landmark: 'haus', DoorOpen: 'haus', ChefHat: 'haus',
  // Fachzeichen
  Bath: 'bad', ShowerHead: 'dusche-rinne', Accessibility: 'bad',
  Droplets: 'abdichtung', ShieldCheck: 'abdichtung', Shield: 'abdichtung', Waves: 'abdichtung', CloudRain: 'abdichtung', // ShieldCheck nur bei Abdichtung/DIN 18534, sonst entfällt
  Layers: 'untergrund', SquareStack: 'untergrund',
  Grid: 'fliese', Grid3x3: 'fliese', LayoutGrid: 'fliese', Square: 'fliese', Palette: 'fliese', Blend: 'fliese', Boxes: 'fliese', Package: 'fliese',
  Maximize2: 'grossformat', Move: 'grossformat', MoveHorizontal: 'grossformat', Split: 'grossformat', SplitSquareHorizontal: 'grossformat', SquareSplitVertical: 'grossformat',
  Footprints: 'treppe',
  Sun: 'balkon', Trees: 'balkon', Snowflake: 'balkon', Wind: 'balkon', ThermometerSun: 'balkon',
  Mountain: 'naturstein', Hexagon: 'naturstein', Gem: null,
  Hammer: 'reparatur', Wrench: 'reparatur', Brush: 'reparatur', PaintRoller: 'reparatur', SprayCan: 'reparatur', Scissors: 'reparatur',
  Thermometer: 'fussbodenheizung', Plug: 'fussbodenheizung',
  Ruler: 'aufmass', Gauge: 'aufmass', Scale: 'aufmass', Weight: 'aufmass', Microscope: 'aufmass', FlaskConical: 'aufmass',
  Calculator: 'aufmass', Sliders: 'aufmass', Settings2: 'aufmass', CircleDot: 'aufmass', HardHat: 'reparatur',
  // Entfällt (Funkeln, Auszeichnungen, Personen-Piktogramme, Zierrat – Katalog „Generisches“)
  Sparkles: null, Award: null, Trophy: null, BadgePercent: null, Tag: null, Quote: null, List: null,
  Users: null, User: null, HeartHandshake: null, Heart: null, ThumbsUp: null, GraduationCap: null, Briefcase: null,
  Camera: null, Cookie: null, Ear: null, Loader2: null, // Loader2 → Ladezustand „laden“ (Fuge läuft), kein Icon
};
