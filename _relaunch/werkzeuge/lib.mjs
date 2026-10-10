// Gemeinsame Prüf-Bausteine für den Relaunch (Playwright).
// G5: Jeder Browserlauf geht über installSperre() – schreibende Anfragen und Dritt-Hosts bekommen Attrappen.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const WERKZEUGE = path.dirname(fileURLToPath(import.meta.url));
export const RELAUNCH = path.resolve(WERKZEUGE, '..');
export const REPO = path.resolve(RELAUNCH, '..');
export const BASE = process.env.RELAUNCH_BASE || 'http://127.0.0.1:4310';

// Harte Sicherung: Prüfläufe nur gegen lokale Server (Live-Rauchtest hat ein eigenes, rein lesendes Skript).
export function assertLocal(base = BASE) {
  const u = new URL(base);
  if (!['127.0.0.1', 'localhost'].includes(u.hostname)) {
    throw new Error(`ABBRUCH: baseURL ${base} ist nicht lokal (G5).`);
  }
}

export const ANSICHTEN = {
  m375: { width: 375, height: 812, isMobile: true, hasTouch: true },
  t768: { width: 768, height: 1024, isMobile: true, hasTouch: true },
  d1440: { width: 1440, height: 900, isMobile: false, hasTouch: false },
  d1920: { width: 1920, height: 1080, isMobile: false, hasTouch: false },
};
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
 */
export async function installSperre(context, { protokoll = [], echteRoute = false } = {}) {
  await context.route('**/*', async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const lokal = ['127.0.0.1', 'localhost'].includes(url.hostname);
    const methode = req.method();
    if (url.protocol === 'data:' || url.protocol === 'blob:') return route.continue();
    if (!lokal) {
      protokoll.push({ art: 'fremd', methode, url: url.origin + url.pathname });
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
      // Element ragt über den Viewport hinaus (ohne eigenen Scroll-Container)
      if ((r.right > vw + 1 || r.left < -1) && cs.position !== 'fixed' && !el.closest('[data-relaunch-scroller], [style*="overflow-x"], .overflow-x-auto, .overflow-x-scroll')) {
        let p = el.parentElement, clipped = false;
        while (p && p !== document.body) { const pcs = getComputedStyle(p); if (['hidden', 'clip', 'auto', 'scroll'].includes(pcs.overflowX)) { clipped = true; break; } p = p.parentElement; }
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
