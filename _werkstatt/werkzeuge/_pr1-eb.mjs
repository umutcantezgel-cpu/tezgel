// Prüfung „Erstes Bild“ (AUFTRAG Abschnitt 6, K-002/K-009/K-013): misst je Seite, Gerät und Durchgang, ob die fünf
// Pflichtelemente (Logo, Überschrift, Ort, Hauptknopf, Telefon oder WhatsApp) im ersten Bildschirm (Scroll 0) vollständig
// sichtbar sind, und meldet bei Fehlen die Ursache: fehlt | unter-dem-falz | abgeschnitten | verdeckt-durch <Selektor>.
// Querformat (Höhe < Breite und Höhe ≤ 500): Summe der Höhen fester oder klebender Elemente am oberen und unteren Rand ≤ 25 % der Höhe.
// Je Seite und Gerät ein frischer Kontext (Viewport, isMobile, hasTouch, DPR 1, reducedMotion no-preference, de-DE, Europe/Berlin).
// Durchgänge im selben Kontext: erstbesuch (kein Einwilligungs-Cookie) und danach nach-einwilligung (Einwilligung „abgelehnt“
// per setzeEinwilligung, Seite neu geladen). Keine Scrollbewegung, keine Zeitmessung: Lagen sind deterministisch.
// Nutzung: node erstesbild.mjs --satz NAME (--hauptansichten | --seiten /a,/b) [--geraete alle|liste] [--ziel DIR] [--bilder]
//          node erstesbild.mjs --probe [--ziel DIR]   (Positivprobe: tests-logik/erstesbild-probe.html per setContent, m390, ohne Server)
// Ausgabe: <ziel>/erstes-bild.json und Kurztabellen auf stdout. Standard-Ziel _werkstatt/belege/<satz>, bei --probe $SCRATCH/erstesbild-probe.
// --bilder: JPEG des ersten Bildschirms je Fall nach <ziel>/bilder/.
// Exit 0: Lauf vollständig (bei --probe nur, wenn genau die erwarteten Ursachen herauskommen).
// Exit 1: Fehler, HTTP-Status ≠ 200 oder abweichende Probe. Exit 2: falscher Aufruf.
// Voraussetzung: PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers (wie bei den übrigen Werkzeugen).
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { BASE, SCRATCH, RELAUNCH, WERKZEUGE, assertLocal, ANSICHTEN, GERAETE_ALLE, geraeteWahl, installSperre, setzeEinwilligung, bereit, slug, ensureDir, versteckeDevOverlay } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const flag = (k) => process.argv.includes(`--${k}`);
const NUTZUNG = 'Nutzung: node erstesbild.mjs --satz NAME (--hauptansichten | --seiten /a,/b) [--geraete alle|liste] [--ziel DIR] [--bilder]\n         node erstesbild.mjs --probe [--ziel DIR]';

const PRUEFPUNKTE = ['logo', 'ueberschrift', 'ort', 'hauptknopf', 'kontakt'];
const DURCHGAENGE = ['erstbesuch', 'nach-einwilligung'];
const ORT_RE = 'Aßlar|Wetzlar|Gießen|Mittelhessen|Lahn-Dill|Hessen';
const HAUPT_RE = 'anfragen|Termin|Aufmaß';
// Ersatzregeln (zuerst greift [data-erstes-bild="<name>"]); „sonst“ = der erste Selektor mit Treffer
const KETTEN = {
  logo: ['header a[href="/"] img', 'header img[alt*="Tezgel"]'],
  ueberschrift: ['h1'],
  kontakt: ['a[href^="tel:"]', 'a[href*="wa.me"]', 'a[href*="whatsapp"]'],
};
const ERWARTET_PROBE = { logo: 'ok', ueberschrift: 'ok', ort: 'ok', hauptknopf: 'unter-dem-falz', kontakt: 'verdeckt-durch' };
const cfg = { namen: PRUEFPUNKTE, ortRe: ORT_RE, hauptRe: HAUPT_RE, ketten: KETTEN };

/**
 * Im Seitenkontext (page.evaluate, deshalb ohne Bezug auf Namen aus dieser Datei): misst die fünf Pflichtelemente
 * im ersten Bildschirm und das Querformat-Band. Alle Koordinaten sind Ansichtskoordinaten bei Scroll 0.
 */
function messeErstesBild(cfg) {
  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const ortRe = new RegExp(cfg.ortRe, 'u');
  const hauptRe = new RegExp(cfg.hauptRe, 'i');
  const runde = (n) => Math.round(n * 10) / 10;
  const alle = (sel) => Array.from(document.querySelectorAll(sel));
  const OHNE_TEXT = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'TEMPLATE']);
  // Kurzer CSS-Pfad für den Bericht (bis zu vier Ebenen, bei id früh abbrechen)
  const sel = (el) => {
    const teile = [];
    for (let e = el; e && e.nodeType === 1 && e !== document.body && teile.length < 4; e = e.parentElement) {
      const tag = e.tagName.toLowerCase();
      if (e.id) { teile.unshift(`${tag}#${e.id}`); break; }
      const klassen = (typeof e.className === 'string' ? e.className : '').trim().split(/\s+/).filter(Boolean);
      teile.unshift(klassen.length ? `${tag}.${klassen.slice(0, 2).join('.')}` : tag);
    }
    return teile.join(' > ').slice(0, 160);
  };
  // Grund, warum ein Element nicht berechnet sichtbar ist (null = sichtbar): visibility, display, opacity, geschlossenes details
  const verborgen = (el) => {
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || cs.visibility === 'collapse') return 'visibility';
    for (let p = el; p && p.nodeType === 1; p = p.parentElement) {
      const c = getComputedStyle(p);
      if (c.display === 'none') return 'display';
      if (Number(c.opacity) === 0) return 'opacity';
      if (p.tagName === 'DETAILS' && !p.open) {
        const s = p.querySelector(':scope > summary');
        if (!s || !s.contains(el)) return 'details';
      }
    }
    return null;
  };
  const sichtbar = (el) => {
    if (verborgen(el)) return false;
    const r = el.getBoundingClientRect();
    return r.width > 2 && r.height > 2; // sr-only-Elemente zählen nicht
  };
  const imAusschnitt = (el) => {
    const r = el.getBoundingClientRect();
    return r.right > 0 && r.bottom > 0 && r.left < vw && r.top < vh;
  };
  // Vorrang: sichtbar und im Ausschnitt (q844: die untere Leiste vor dem Einstieg unter dem Falz, Runde 4), dann sichtbar
  const ersterSichtbar = (liste) => liste.find((e) => sichtbar(e) && imAusschnitt(e)) || liste.find(sichtbar) || liste[0] || null;
  const ownText = (el) => Array.from(el.childNodes).filter((n) => n.nodeType === 3).map((n) => n.textContent).join(' ').replace(/\s+/g, ' ').trim();

  // Auffinden: Datenattribut zuerst, sonst Ersatzregel
  const finde = (name) => {
    const daten = alle(`[data-erstes-bild="${name}"]`);
    if (daten.length) return { el: ersterSichtbar(daten), regel: `[data-erstes-bild="${name}"]` };
    if (name === 'ort') {
      const liste = Array.from(document.body.querySelectorAll('*')).filter((el) => !OHNE_TEXT.has(el.tagName) && ortRe.test(ownText(el)));
      if (!liste.length) return { el: null };
      const el = liste.find((e) => sichtbar(e) && imAusschnitt(e)) || ersterSichtbar(liste);
      return { el, regel: `Textsuche /${cfg.ortRe}/`, text: ownText(el).slice(0, 60) };
    }
    if (name === 'hauptknopf') {
      const liste = alle('a, button').filter((el) => hauptRe.test(el.textContent));
      if (!liste.length) return { el: null };
      return { el: ersterSichtbar(liste), regel: `a/button mit Text /${cfg.hauptRe}/i` };
    }
    for (const s of cfg.ketten[name]) {
      const liste = alle(s);
      if (liste.length) return { el: ersterSichtbar(liste), regel: s };
    }
    return { el: null };
  };

  // Bewertung: fehlt, unter-dem-falz, abgeschnitten, verdeckt-durch oder ok (vollständig sichtbar)
  const bewerte = (name) => {
    const f = finde(name);
    const el = f.el;
    const e = { gefunden: !!el, sichtbar: false, ursache: 'fehlt', regel: f.regel, selektor: el ? sel(el) : null, rechteck: null };
    if (f.text !== undefined) e.text = f.text;
    if (!el) { e.grund = 'kein Treffer'; return e; }
    const r = el.getBoundingClientRect();
    e.rechteck = { x: runde(r.left), y: runde(r.top), w: runde(r.width), h: runde(r.height) };
    const grund = verborgen(el);
    if (grund || !(r.width > 0 && r.height > 0)) { e.grund = grund ? `unsichtbar (${grund})` : 'leere Box'; return e; }
    if (r.top >= vh || r.bottom > vh) { e.ursache = 'unter-dem-falz'; return e; }
    if (r.left < 0 || r.top < 0 || r.right > vw) { e.ursache = 'abgeschnitten'; return e; }
    // Fünf Trefferpunkte: Mitte und vier Ecken, 2 px nach innen. Das Element selbst oder ein Kind muss dort liegen.
    const punkte = [
      [r.left + r.width / 2, r.top + r.height / 2],
      [r.left + 2, r.top + 2], [r.right - 2, r.top + 2],
      [r.left + 2, r.bottom - 2], [r.right - 2, r.bottom - 2],
    ];
    for (const [x, y] of punkte) {
      const treffer = document.elementFromPoint(x, y);
      if (!(treffer && (treffer === el || el.contains(treffer)))) {
        e.ursache = 'verdeckt-durch';
        e.durch = treffer ? sel(treffer) : 'außerhalb des Ausschnitts';
        return e;
      }
    }
    e.ursache = 'ok';
    e.sichtbar = true;
    return e;
  };

  // Querformat: feste oder klebende Leisten am oberen und unteren Rand, ineinander verschachtelte nur einmal
  const querformat = (() => {
    if (!(vh < vw && vh <= 500)) return null;
    const gezaehlt = [];
    const liste = [];
    let summe = 0;
    for (const el of document.body.querySelectorAll('*')) {
      const pos = getComputedStyle(el).position;
      if (pos !== 'fixed' && pos !== 'sticky') continue;
      if (!sichtbar(el)) continue;
      const r = el.getBoundingClientRect();
      if (!(r.right > 0 && r.left < vw && r.bottom > 0 && r.top < vh)) continue;
      const oben = r.top <= 1 && r.bottom < vh / 2;
      const unten = r.bottom >= vh - 1 && r.top > vh / 2;
      if (!oben && !unten) continue;
      if (gezaehlt.some((g) => g.contains(el))) continue;
      gezaehlt.push(el);
      summe += r.height;
      liste.push(`${unten ? 'unten' : 'oben'} ${sel(el)} (${runde(r.height)} px)`);
    }
    return { hoehe: vh, summe: runde(summe), anteil_prozent: Math.round((summe / vh) * 1000) / 10, ok: summe <= vh * 0.25, elemente: liste };
  })();

  const elemente = {};
  for (const n of cfg.namen) elemente[n] = bewerte(n);
  return { elemente, querformat, vw, vh };
}

// ---------- Aufruf ----------
const probe = flag('probe');
const satzName = arg('satz');
const geraete = geraeteWahl(arg('geraete', 'alle'));
if (!geraete) { console.error(`${NUTZUNG}\n--geraete: alle oder Kommaliste aus ${GERAETE_ALLE.join(', ')}`); process.exit(2); }
const base = arg('base', BASE);
assertLocal(base);
let seiten = [];
if (!probe) {
  if (flag('hauptansichten') && arg('seiten')) { console.error(`${NUTZUNG}\n--hauptansichten und --seiten schließen sich aus`); process.exit(2); }
  if (flag('hauptansichten')) seiten = JSON.parse(fs.readFileSync(path.join(RELAUNCH, 'HAUPTANSICHTEN.json'), 'utf8')).hauptansichten.map((h) => h.pfad);
  else if (arg('seiten')) seiten = arg('seiten').split(',');
  if (!satzName || !seiten.length) { console.error(NUTZUNG); process.exit(2); }
  for (const s of seiten) if (!s.startsWith('/')) { console.error(`Seite muss mit / beginnen: ${s}`); process.exit(2); }
}
const satz = probe ? 'probe' : satzName;
const ziel = ensureDir(arg('ziel') ? path.resolve(arg('ziel')) : probe ? path.join(SCRATCH, 'erstesbild-probe') : path.join(RELAUNCH, 'belege', satz));
const bilder = flag('bilder');
const protokoll = [];

const kontext = (v) => ({
  viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, isMobile: v.isMobile, hasTouch: v.hasTouch,
  reducedMotion: 'no-preference', locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light',
});
const kurz = (m) => PRUEFPUNKTE.map((n) => `${n} ${m.elemente[n].ursache}${m.elemente[n].durch ? ` (durch ${m.elemente[n].durch})` : ''}`).join(' · ');
const bestanden = (m) => (m ? PRUEFPUNKTE.filter((n) => m.elemente[n].ursache === 'ok').length : 0);

// Host-Hinweis (EINRICHTUNG.md): Playwright 1.56.1 erwartet chromium-1194, vorhanden ist chromium-1243 → CHROME_PATH setzen.
const browser = await chromium.launch({ args: ['--font-render-hinting=none'], executablePath: process.env.CHROME_PATH || undefined });
const ergebnisse = [];

if (probe) {
  // Positivprobe: bekannte Lage aus tests-logik/erstesbild-probe.html, ohne Server. Muss genau die erwarteten Ursachen melden.
  const context = await browser.newContext(kontext(ANSICHTEN.m390));
  await installSperre(context, { protokoll });
  const page = await context.newPage();
  const html = fs.readFileSync(path.join(WERKZEUGE, 'tests-logik', 'erstesbild-probe.html'), 'utf8');
  await page.setContent(html, { waitUntil: 'load' });
  const messung = await page.evaluate(messeErstesBild, cfg);
  await context.close();
  const genau = PRUEFPUNKTE.every((n) => messung.elemente[n].ursache === ERWARTET_PROBE[n]);
  ergebnisse.push({ seite: 'probe', geraet: 'm390', durchgang: 'probe', status: null, messung, bestanden: bestanden(messung), fehler: null });
  console.log(`Probe m390 · ${kurz(messung)}`);
  console.log(genau ? 'PROBE OK: genau die erwarteten Ursachen.' : `PROBE ABWEICHEND: erwartet ${PRUEFPUNKTE.map((n) => `${n} ${ERWARTET_PROBE[n]}`).join(' · ')}`);
  fs.writeFileSync(path.join(ziel, 'erstes-bild.json'), JSON.stringify({ satz, base: 'setContent (ohne Server)', ziel, erwartet: ERWARTET_PROBE, genau, ergebnisse }, null, 1));
  console.log(`Belege: ${path.join(ziel, 'erstes-bild.json')}`);
  await browser.close();
  process.exitCode = genau ? 0 : 1;
} else {
  for (const s of seiten) {
    for (const g of geraete) {
      const context = await browser.newContext(kontext(ANSICHTEN[g]));
      // SF-C2-Kopie: Systemschrift wie einzelbild.mjs --schrift (C2_SCHRIFT in Prozent)
      if (process.env.C2_SCHRIFT) await context.addInitScript((pct) => {
        const add = () => { const st = document.createElement('style'); st.textContent = `html { font-size: ${pct}% !important; }`; (document.head || document.documentElement).appendChild(st); };
        if (document.documentElement) add();
        else new MutationObserver((_, o) => { if (document.documentElement) { o.disconnect(); add(); } }).observe(document, { childList: true });
      }, Number(process.env.C2_SCHRIFT));
      await installSperre(context, { protokoll });
      const page = await context.newPage();
      for (const d of DURCHGAENGE) {
        const r = { seite: s, geraet: g, durchgang: d, status: null, messung: null, bestanden: 0, bild: null, fehler: null };
        try {
          if (d === 'nach-einwilligung') await setzeEinwilligung(context, 'abgelehnt', base);
          const resp = await page.goto(base + s, { waitUntil: 'domcontentloaded', timeout: 45000 });
          r.status = resp?.status() ?? null;
          await bereit(page);
          await versteckeDevOverlay(page);
          r.messung = await page.evaluate(messeErstesBild, cfg);
          r.bestanden = bestanden(r.messung);
          if (bilder) {
            ensureDir(path.join(ziel, 'bilder'));
            const datei = path.join(ziel, 'bilder', `${slug(s)}__${g}__${d}.jpg`);
            await page.screenshot({ path: datei, type: 'jpeg', quality: 70 });
            r.bild = path.relative(ziel, datei);
          }
        } catch (e) {
          r.fehler = String(e.message).slice(0, 300);
        }
        ergebnisse.push(r);
        process.stdout.write('.');
      }
      await context.close();
    }
  }
  await browser.close();

  const fehler = ergebnisse.filter((r) => r.fehler).map((r) => `${r.seite} [${r.geraet}] ${r.durchgang}: ${r.fehler}`);
  const nicht200 = ergebnisse.filter((r) => r.status !== 200).map((r) => `${r.seite} [${r.geraet}] ${r.durchgang}: HTTP ${r.status}`);
  const fremd = protokoll.filter((p) => p.art === 'fremd').length;
  const blockiert = protokoll.filter((p) => p.art !== 'fremd');
  const zusammenfassung = { faelle: ergebnisse.length, fehler: fehler.length, nicht200: nicht200.length, fremd, blockiert: blockiert.length, alleBestanden: ergebnisse.filter((r) => r.bestanden === PRUEFPUNKTE.length).length };
  const bericht = {
    satz, base, ziel,
    protokoll: { durchgaenge: DURCHGAENGE, geraete, seiten, pruefpunkte: PRUEFPUNKTE, bewegung: 'no-preference', dpr: 1, locale: 'de-DE', zeitzone: 'Europe/Berlin', scroll: 0, ort_regex: ORT_RE, hauptknopf_regex: HAUPT_RE, ketten: KETTEN },
    zusammenfassung,
    ergebnisse,
  };
  fs.writeFileSync(path.join(ziel, 'erstes-bild.json'), JSON.stringify(bericht, null, 1));

  // Kurztabelle: Seite × Gerät, Zahl der bestandenen Elemente von 5, je Durchgang
  const spalte = 9;
  console.log(`\n\nSatz ${satz} · Fälle ${zusammenfassung.faelle} · alle 5 bestanden ${zusammenfassung.alleBestanden} · Fehler ${zusammenfassung.fehler} · nicht 200 ${zusammenfassung.nicht200} · fremd ${fremd} · blockiert ${blockiert.length}`);
  for (const d of DURCHGAENGE) {
    console.log(`\nDurchgang ${d} (bestandene Elemente von 5)`);
    console.log('Seite'.padEnd(26) + geraete.map((g) => g.padStart(spalte)).join(''));
    for (const s of seiten) {
      const zeile = geraete.map((g) => {
        const r = ergebnisse.find((x) => x.seite === s && x.geraet === g && x.durchgang === d);
        if (!r) return '—';
        if (r.fehler) return 'Fehler';
        if (r.status !== 200) return `HTTP ${r.status}`;
        return `${r.bestanden}/5`;
      });
      console.log(s.padEnd(26) + zeile.map((z) => z.padStart(spalte)).join(''));
    }
  }
  const quer = ergebnisse.filter((r) => r.messung && r.messung.querformat);
  if (quer.length) {
    console.log('\nQuerformat (Höhe < Breite, Höhe ≤ 500): Anteil der Leisten oben und unten, Grenze 25 %');
    for (const r of quer) console.log(`  ${r.seite} [${r.geraet}] ${r.durchgang}: ${r.messung.querformat.anteil_prozent} % ${r.messung.querformat.ok ? 'ok' : 'über 25 %'}`);
  }
  const luecken = ergebnisse.flatMap((r) => (r.messung
    ? PRUEFPUNKTE.filter((n) => r.messung.elemente[n].ursache !== 'ok').map((n) => `${r.seite} [${r.geraet}] ${r.durchgang}: ${n} ${r.messung.elemente[n].ursache}${r.messung.elemente[n].durch ? ` durch ${r.messung.elemente[n].durch}` : ''}${r.messung.elemente[n].grund ? ` (${r.messung.elemente[n].grund})` : ''}`)
    : []));
  if (luecken.length) {
    console.log(`\nAbweichungen (${luecken.length}):`);
    for (const l of luecken.slice(0, 60)) console.log(`  ${l}`);
    if (luecken.length > 60) console.log(`  … ${luecken.length - 60} weitere, siehe erstes-bild.json`);
  }
  if (fehler.length) console.log(`\nFehler: ${fehler.slice(0, 10).join(' | ')}`);
  if (nicht200.length) console.log(`nicht 200: ${nicht200.slice(0, 10).join(' | ')}`);
  console.log(`Belege: ${path.join(ziel, 'erstes-bild.json')}`);
  process.exitCode = fehler.length || nicht200.length ? 1 : 0;
}
