// Seitenwechsel B-01: Welche Klicks verlegen Fliesen? Reine Logik, prüfbar ohne DOM (KERN K-007).
// Nie bei Ankern derselben Seite, externen Links, tel:, mailto:, WhatsApp, Downloads, neuem Tab, Formularen
// und Links mit data-kein-verlegen; ebenso nicht, wenn ein anderer Handler den Klick schon übernommen hat, und nicht bei
// Links mit eigenem Übergang (data-uebergang), wenn dieser jetzt möglich ist (Plan-Morph, E-037).

export interface Klick {
  /** Maustaste laut MouseEvent.button (0 = Haupttaste) */
  taste: number;
  zusatztaste: boolean;
  bereitsVerhindert: boolean;
  /** href des Links, wie im DOM aufgelöst (absolute URL) */
  ziel: string;
  /** aktuelle Adresse (location.href) */
  hier: string;
  target: string | null;
  download: boolean;
  keinVerlegen: boolean;
  /** Link trägt einen eigenen Übergang (data-uebergang) UND er ist jetzt möglich (Breite, Bewegung, Browser) */
  eigenerUebergang?: boolean;
}

export type Grund =
  | 'verlegen'
  | 'taste'
  | 'zusatztaste'
  | 'verhindert'
  | 'target'
  | 'download'
  | 'kein-verlegen'
  | 'ungueltig'
  | 'protokoll'
  | 'extern'
  | 'gleiche-seite'
  | 'datei'
  | 'eigener-uebergang';

/** Endungen, die keine Seite sind (PDF, Bilder, Feeds, Textdateien): normaler Abruf ohne Fliesen. */
const DATEI = /\.(pdf|jpe?g|png|webp|avif|gif|svg|xml|txt|json|zip|ics|vcf|mp4)$/i;

export function pruefeKlick(k: Klick): Grund {
  if (k.taste !== 0) return 'taste';
  if (k.zusatztaste) return 'zusatztaste';
  if (k.bereitsVerhindert) return 'verhindert';
  if (k.target && k.target !== '_self') return 'target';
  if (k.download) return 'download';
  if (k.keinVerlegen) return 'kein-verlegen';
  let ziel: URL;
  let hier: URL;
  try {
    ziel = new URL(k.ziel, k.hier);
    hier = new URL(k.hier);
  } catch {
    return 'ungueltig';
  }
  if (ziel.protocol !== 'http:' && ziel.protocol !== 'https:') return 'protokoll';
  if (ziel.origin !== hier.origin) return 'extern';
  // Gleicher Pfad (Anker, Filter per Suchparameter, dieselbe Adresse): keine neue Seite, also kein Belag.
  if (ziel.pathname.replace(/\/+$/, '') === hier.pathname.replace(/\/+$/, '')) return 'gleiche-seite';
  if (DATEI.test(ziel.pathname)) return 'datei';
  if (k.eigenerUebergang) return 'eigener-uebergang';
  return 'verlegen';
}
