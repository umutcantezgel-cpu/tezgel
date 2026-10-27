// Gemeinsame Prüf-Bausteine für den Relaunch (Playwright).
// G5: Jeder Browserlauf geht über installSperre() – schreibende Anfragen und Dritt-Hosts bekommen Attrappen.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const WERKZEUGE = path.dirname(fileURLToPath(import.meta.url));
export const RELAUNCH = path.resolve(WERKZEUGE, '..');
export const REPO = path.resolve(RELAUNCH, '..');
export const BASE = process.env.RELAUNCH_BASE || 'http://127.0.0.1:4310';

// Sitzungs-Scratchpad: RELAUNCH_SCRATCH, sonst SCRATCH, sonst der zuletzt geänderte Ordner
// /tmp/claude-0/-home-user-tezgel/*/scratchpad. Fehlt alles, Abbruch mit Meldung (wie scratch.sh).
export const SCRATCH = (() => {
  const kandidat = process.env.RELAUNCH_SCRATCH || process.env.SCRATCH;
  if (kandidat) return kandidat;
  const basis = '/tmp/claude-0/-home-user-tezgel';
  let ordner = [];
  try {
    ordner = fs.readdirSync(basis)
      .map((d) => path.join(basis, d, 'scratchpad'))
      .filter((p) => fs.existsSync(p) && fs.statSync(p).isDirectory())
      .sort((a, b) => fs.statSync(b).mtimeMs - fs.statSync(a).mtimeMs);
  } catch { /* Basisordner fehlt */ }
  if (!ordner.length) throw new Error('ABBRUCH: kein Scratchpad gefunden. RELAUNCH_SCRATCH oder SCRATCH setzen.');
  return ordner[0];
})();

// Chrome für Playwright und Lighthouse: CHROME_PATH, sonst das neueste /opt/pw-browsers/chromium-*/chrome-linux*/chrome.
// Playwright 1.56.1 erwartet chromium-1194, der Host hat nur neuere Fassungen (EINRICHTUNG.md). Gesetzt wird nur, was fehlt.
export const CHROME = (() => {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const wurzel = '/opt/pw-browsers';
  let treffer;
  try {
    treffer = fs.readdirSync(wurzel)
      .filter((d) => /^chromium-\d+$/.test(d))
      .sort((a, b) => Number(b.split('-')[1]) - Number(a.split('-')[1]))
      .flatMap((d) => ['chrome-linux64', 'chrome-linux'].map((u) => path.join(wurzel, d, u, 'chrome')))
      .find((p) => fs.existsSync(p));
  } catch { /* kein Browserordner */ }
  if (treffer) process.env.CHROME_PATH = treffer;
  return treffer;
})();

// Harte Sicherung: Prüfläufe nur gegen lokale Server (Live-Rauchtest hat ein eigenes, rein lesendes Skript).
export function assertLocal(base = BASE) {
  const u = new URL(base);
  if (!['127.0.0.1', 'localhost'].includes(u.hostname)) {
    throw new Error(`ABBRUCH: baseURL ${base} ist nicht lokal (G5).`);
  }
}

// E0 · K-013: die 10 Gerätegrößen aus HAUPTANSICHTEN.json (Schlüssel und Maße wie dort).
// m*, q*, t* sind mobil mit Touch, d* nicht. Alte Schlüssel (m375 usw.) bleiben erhalten.
export const GERAETE_ALLE = ['m360', 'm390', 'm430', 'q844', 't768', 't1024', 'd1280', 'd1440', 'd1920', 'd2560'];
const GERAETE_JSON = JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'HAUPTANSICHTEN.json'), 'utf8')).geraete;
const geraeteAnsichten = Object.fromEntries(GERAETE_ALLE.map((k) => {
  const [width, height] = GERAETE_JSON[k];
  const mobil = /^[mqt]/.test(k);
  return [k, { width, height, isMobile: mobil, hasTouch: mobil }];
}));

export const ANSICHTEN = {
  m375: { width: 375, height: 812, isMobile: true, hasTouch: true },
  ...geraeteAnsichten,
};

/** --geraete alle oder Kommaliste aus ANSICHTEN-Schlüsseln; unbekannte Namen → null. */
export function geraeteWahl(wert) {
  if (wert === 'alle') return [...GERAETE_ALLE];
  const liste = String(wert).split(',').map((s) => s.trim()).filter(Boolean);
  return liste.length && liste.every((g) => ANSICHTEN[g]) ? liste : null;
}
// Lauf 2 ergänzt 390 × 844 und 430 × 932.
export const ANSICHTEN_AUSBAU = {
  ...ANSICHTEN,
  m390: { width: 390, height: 844, isMobile: true, hasTouch: true },
  m430: { width: 430, height: 932, isMobile: true, hasTouch: true },
};

// Eingefrorenes Fotoprotokoll (P0): feste Uhrzeit (Montag 10:00 Europe/Berlin), DPR 1.
export const FESTE_ZEIT = new Date('2026-10-12T10:00:00+02:00');

export const GESPERRTE_HOSTS = [
  /google-analytics\.com$/, /googletagmanager\.com$/, /(^|\.)facebook\.(com|net)$/, /connect\.facebook\.net$/,
  /vercel-insights\.com$/, /va\.vercel-scripts\.com$/, /maps\.googleapis\.com$/, /maps\.gstatic\.com$/,
  /(^|\.)google\.com$/, /(^|\.)googleapis\.com$/, /tile\.openstreetmap\.org$/, /(^|\.)openstreetmap\.org$/,
  /api\.whatsapp\.com$/, /(^|\.)wa\.me$/, /api\.indexnow\.org$/, /images\.unsplash\.com$/,
];

export const ATTRAPPE_ANFRAGE = {
  success: true,
  referenceId: 'TEZ-26-TEST',
  message: 'Attrappe (Prüflauf) – nichts wurde versendet.',
  mocked: true,
};

/**
 * Anfragesperre nach G5.
 * - Fremd-Hosts: immer abgefangen (204), protokolliert.
 * - Lokal: GET/HEAD durch; POST /api/anfrage → Attrappe (außer option echteRoute); alle anderen schreibenden → abgebrochen.
 * - Intro B-02 (E-018): Prüfläufe sind standardmäßig wiederkehrende Besuche (Speicher `tezgel-intro` gesetzt, wie bei
 *   jedem Menschen nach dem ersten Besuch), damit Bilder, Funktionen und Texte den Seitenstand zeigen. Erstbesuch mit Intro:
 *   option intro: 'erstbesuch' (Probeläufe, Intro-Prüfungen); Lighthouse nutzt ohnehin ein frisches Profil.
 *   Die Seite selbst erkennt keine Prüfwerkzeuge (G7); gesetzt wird nur der Zustand, den der Browser nach einem Besuch hat.
 */
export async function installSperre(context, { protokoll = [], echteRoute = false, intro = 'gesehen' } = {}) {
  if (intro === 'gesehen') {
    await context.addInitScript(() => {
      try { localStorage.setItem('tezgel-intro', '1'); } catch {}
    });
  }
  await context.route('**/*', async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const lokal = ['127.0.0.1', 'localhost'].includes(url.hostname);
    const methode = req.method();
    if (url.protocol === 'data:' || url.protocol === 'blob:') return route.continue();
    // Lokale Prüfseiten (Sichtprüfung von SVG-Dateien) dürfen Dateien lesen; schreibend gibt es file: nicht.
    if (url.protocol === 'file:' && methode === 'GET') return route.continue();
    if (!lokal) {
      protokoll.push({ art: 'fremd', methode, url: url.origin + url.pathname });
      // Navigationen weg von der Seite (WhatsApp, externe Links): Abbruch als „aborted“ (net::ERR_ABORTED). Die Seite bleibt
      // stehen wie beim Menschen, dessen Gerät WhatsApp öffnet, und Playwright schließt die Navigation ab. Bis 1.63 tat das eine
      // Antwort 204; ab 1.64.0 bleibt eine 204-Navigation in Playwright offen (E-076). „blockedbyclient“ zeigt die Fehlerseite.
      if (req.isNavigationRequest()) return route.abort('aborted');
      return route.fulfill({ status: 204, body: '' });
    }
    if (methode === 'GET' || methode === 'HEAD' || methode === 'OPTIONS') return route.continue();
    if (url.pathname === '/api/anfrage') {
      protokoll.push({ art: 'anfrage', methode, url: url.pathname, echteRoute });
      if (echteRoute) return route.continue();
      return route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(ATTRAPPE_ANFRAGE) });
    }
    protokoll.push({ art: 'blockiert', methode, url: url.pathname });
    return route.abort('blockedbyclient');
  });
  // window.open / sendBeacon abfangen (WhatsApp-Links, Analyse)
  await context.addInitScript(() => {
    window.__relaunchOpened = [];
    window.open = (u) => { window.__relaunchOpened.push(String(u)); return null; };
    if (navigator.sendBeacon) navigator.sendBeacon = () => true;
  });
}

/** Einwilligungszustand setzen: 'erstbesuch' (kein Cookie) oder 'abgelehnt'. */
export async function setzeEinwilligung(context, zustand = 'erstbesuch', base = BASE) {
  if (zustand === 'erstbesuch') return;
  const wert = {
    essential: true,
    analytics: zustand === 'alle',
    marketing: zustand === 'alle',
    timestamp: '2026-10-10T08:00:00.000Z',
    version: '2.1.0',
  };
  await context.addCookies([{ name: 'tezgel_consent_status', value: encodeURIComponent(JSON.stringify(wert)), url: base }]);
  await context.addInitScript((w) => {
    try { localStorage.setItem('tezgel_consent_settings', JSON.stringify({ settings: w, version: w.version, timestamp: w.timestamp })); } catch {}
  }, wert);
}

/** Seite schrittweise durchscrollen (löst Lazy-Inhalte und Auftritte aus), dann nach oben. */
export async function durchscrollen(page, { schritt = 0.8, pauseMs = 120 } = {}) {
  await page.evaluate(async ({ schritt, pauseMs }) => {
    const h = () => document.documentElement.scrollHeight;
    const vh = window.innerHeight;
    let y = 0;
    while (y < h() - vh) {
      y += Math.round(vh * schritt);
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, pauseMs));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, pauseMs));
  }, { schritt, pauseMs });
}

/** Wartet, bis Schriften geladen sind und das Netz ruht (ohne feste Wartezeiten, mit Obergrenze). */
export async function bereit(page) {
  await page.waitForLoadState('load');
  await page.evaluate(() => document.fonts && document.fonts.ready);
  try { await page.waitForLoadState('networkidle', { timeout: 5000 }); } catch {}
}

export function grundmenge() {
  return JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'GRUNDMENGE.json'), 'utf8'));
}

export function slug(p) {
  return p === '/' ? 'start' : p.replace(/^\//, '').replace(/\//g, '__');
}

export function ensureDir(d) { fs.mkdirSync(d, { recursive: true }); return d; }

/** Überlauf- und Abschneide-Prüfung im Seitenkontext. */
export async function ueberlauf(page) {
  return page.evaluate(() => {
    const doc = document.documentElement;
    const befunde = [];
    if (doc.scrollWidth > doc.clientWidth + 1) befunde.push({ art: 'horizontal', scrollWidth: doc.scrollWidth, clientWidth: doc.clientWidth });
    const vw = doc.clientWidth;
    for (const el of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(el);
      if (cs.display === 'none' || cs.visibility === 'hidden' || el.closest('[aria-hidden="true"]')) continue;
      const r = el.getBoundingClientRect();
      if (r.width <= 2 || r.height <= 2) continue; // visuell versteckt (sr-only) zählt nicht
      if (cs.clipPath && cs.clipPath.startsWith('inset(50%')) continue;
      if (cs.clip && cs.clip.startsWith('rect(0')) continue;
      // Element ragt über den Viewport hinaus (ohne eigenen Scroll-Container). Die Flächen im Fluss direkt unter <body>
      // (main, footer) beschneiden seit N-01b statt <body> den Viewport-Überstand: wie <body> nicht als Beschneider zählen,
      // sonst würde ein Überstand unsichtbar, den das Werkzeug vorher meldete (Vergleichbarkeit mit live).
      if ((r.right > vw + 1 || r.left < -1) && cs.position !== 'fixed' && !el.closest('[data-relaunch-scroller], [style*="overflow-x"], .overflow-x-auto, .overflow-x-scroll')) {
        let p = el.parentElement, clipped = false;
        while (p && p !== document.body && !(p.parentElement === document.body && ['MAIN', 'FOOTER'].includes(p.tagName))) { const pcs = getComputedStyle(p); if (['hidden', 'clip', 'auto', 'scroll'].includes(pcs.overflowX)) { clipped = true; break; } p = p.parentElement; }
        if (!clipped) befunde.push({ art: 'ragt-heraus', tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 80), left: Math.round(r.left), right: Math.round(r.right) });
      }
      // Text abgeschnitten (Text-Element mit verstecktem Überlauf)
      const hatText = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 2);
      if (hatText && ['hidden', 'clip'].includes(cs.overflowX) && el.scrollWidth > el.clientWidth + 2 && cs.textOverflow !== 'ellipsis') {
        befunde.push({ art: 'text-abgeschnitten', tag: el.tagName.toLowerCase(), text: el.textContent.trim().slice(0, 60), sw: el.scrollWidth, cw: el.clientWidth });
      }
    }
    return befunde.slice(0, 50);
  });
}

// E0 · Prüfstufe A: Gerätegrößen für Einzelbild, Bildsatz und Überlappung (wie HAUPTANSICHTEN.json).
export const GERAETE = ['m390', 't768', 'd1440'];

/** Entwicklungs-Oberfläche von Next.js ausblenden, damit sie nicht als Überdeckung zählt (nur Prüfläufe). */
export async function versteckeDevOverlay(page) {
  await page.addStyleTag({ content: 'nextjs-portal, [data-nextjs-toast], [data-next-badge-root], [data-nextjs-dev-tools-button] { display: none !important; }' });
}

/**
 * Ersatzpfad (Z-09, UMGEBUNGSAUSNAHME in ABNAHME.md): emuliert einen Browser ohne Scroll-Animationen
 * (animation-timeline) und ohne View Transitions – Chromium 141 lässt sich dafür nicht per Startschalter umstellen.
 * CSS-Antworten verlieren ihre animation-timeline-Deklarationen, @supports (animation-timeline …) wird unerfüllbar,
 * CSS.supports meldet beides als nicht unterstützt und document.startViewTransition fehlt.
 * Nach installSperre aufrufen (spätere Routen haben Vorrang).
 */
export async function installErsatzpfad(context) {
  await context.addInitScript(() => {
    try { delete Document.prototype.startViewTransition; } catch { /* nicht vorhanden */ }
    const original = CSS.supports.bind(CSS);
    CSS.supports = (...a) => (/animation-timeline|scroll-timeline|view-timeline|view-transition/.test(a.join(' ')) ? false : original(...a));
  });
  await context.route(/\.css(\?|$)/, async (route) => {
    const antwort = await route.fetch();
    let text = await antwort.text();
    text = text
      .replace(/@supports\s*\(\s*animation-timeline/g, '@supports (ersatzpfad-aus')
      .replace(/@supports\s+not\s*\(\s*animation-timeline/g, '@supports not (ersatzpfad-aus')
      .replace(/animation-timeline\s*:[^;}]*;?/g, '');
    const kopf = Object.fromEntries(Object.entries(antwort.headers()).filter(([k]) => !/^(content-encoding|content-length|transfer-encoding)$/i.test(k)));
    await route.fulfill({ status: antwort.status(), headers: kopf, body: text });
  });
}
