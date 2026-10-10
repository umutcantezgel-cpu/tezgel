// Ebene 4 · Bewegung (Kriterium Z-09, Regeln KERN K-009 und AUFTRAG Abschnitt 7 „Bewegung“).
// Zweck: misst je Seite und Ansicht, welche Bewegungen laufen, und prüft sie gegen das Bewegungsregister.
//   1 Register-Abgleich  – document.getAnimations() alle 50 ms + animationstart/-iteration/transitionrun/-start
//                          + Skript-Bewegung (MutationObserver auf style/SVG-Geometrie, Zähler per characterData)
//                          + rAF-Schleifen im Ruhefenster (Canvas/WebGL; sichtbare Canvas zählt als animiertes Element)
//                          → je Element Selektor, Eigenschaften, Dauer, Kurve, data-motion; Kennzahl „registriert“.
//   2 Technik            – animierte Eigenschaften außerhalb transform/opacity (Ausnahme grid-template-rows bei aufklappen).
//   3 Framezeiten        – eigener Lauf, CDP Emulation.setCPUThrottlingRate (mobil 4×, Desktop 1×), rAF-Zeitstempel,
//                          Durchscrollen in festen Schritten je Bild (rAF-gekoppelt); Auswertung in vsync-Einheiten.
//   4 LoAF               – PerformanceObserver long-animation-frame im Framelauf; Skripte mit Bewegungsbezug markiert.
//   5 Reduzierte Bewegung – zweiter Sammellauf mit reducedMotion 'reduce' → Orts-/Größenänderung > 0 ms, Autoplay.
//   6 Bildfolge (--bildfolge) – Einstieg 0–2 s, Bildschirmfoto alle 100 ms (CDP) nach cache/bewegung/<satz>/bildfolge/.
// Nutzung: node bewegung.mjs --satz <name> [--seiten /,/bad] [--ansichten m375,d1440] [--bildfolge]
//          [--laeufe normal,reduziert,frames] [--drossel <n>] [--px 40] [--worker 2] [--wdh 1] [--gegenprobe] [--aus <datei.json>]
//   --gegenprobe: fügt per page.addStyleTag eine unregistrierte Endlos-Animation mit `left` an der h1 ein, dazu eine
//   WAAPI-Endlosverschiebung, die reduce ignoriert, und im Framelauf (addScriptTag) 30 ms Last je 10. rAF-Rückruf;
//   Ergebnis nur nach cache/bewegung/<satz>/gegenprobe/ (kein Beleg). Erwartung: zusammenfassung.gegenprobe.erkannt = true.
// Feste Zeiten (begründet): Verweilen 120 ms je Scrollschritt (IO-Schwellen greifen, wie lib.durchscrollen), Ruhefenster
//   1500 ms (Beobachtung, kein Zustandswarten), Bildfolge-Takt 100 ms. Sonst nur Zustandsabfragen (abklingen, bereit).
// Messbedingungen: lokaler Server (assertLocal), Anfragesperre (installSperre), Einwilligung „abgelehnt“, DPR 1,
//   ohne page.clock, de-DE, Europe/Berlin, hell; Sammelläufe ohne Drosselung; höchstens 2 Kontexte gleichzeitig,
//   Framelauf exklusiv (belegt beide Plätze). Stehen vollständig im Kopf der Ausgabe (bedingungen).
// Ausgabe: _relaunch/belege/<satz>/bewegung.json (Zusammenfassung) · Rohdaten _relaunch/cache/bewegung/<satz>/roh/.
import { chromium } from '@playwright/test';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { BASE, assertLocal, ANSICHTEN, installSperre, setzeEinwilligung, bereit, grundmenge, slug, ensureDir, RELAUNCH } from './lib.mjs';

const arg = (k, d) => { const i = process.argv.indexOf(`--${k}`); return i > -1 ? process.argv[i + 1] : d; };
const flag = (k) => process.argv.includes(`--${k}`);
assertLocal();

const G = grundmenge();
const satz = arg('satz', 'adhoc');
const seiten = arg('seiten') ? arg('seiten').split(',') : G.hauptseiten;
const ansichten = (arg('ansichten') || 'm375,d1440').split(',');
const gegenprobe = flag('gegenprobe');
const laeufe = (arg('laeufe') || 'normal,reduziert,frames').split(',').concat(flag('bildfolge') ? ['bildfolge'] : []);
const worker = Math.min(2, Number(arg('worker', '2'))); // Last-Grenze: höchstens 2 Browser-Kontexte
const pxJeBild = Number(arg('px', '40'));
const wdh = Math.max(1, Number(arg('wdh', '1')));
const drosselFest = arg('drossel') ? Number(arg('drossel')) : null;
const SCHRITT_VH = 0.5;       // Sammelläufe: Schrittweite in Bildschirmhöhen
const VERWEIL_MS = 120;       // Verweilzeit je Schritt (wie durchscrollen() in lib.mjs): IO-Schwellen 20–50 % greifen sicher
const RAF_SCHLEIFE_JE_BILD = 0.5; // Seiten-rAF-Aufrufe je Bild im Ruhefenster, ab denen eine Skript-Schleife läuft (Schleife ≈ 1/Bild, unabhängig von der Bildrate)
const RUHE_MS = 1500;         // Beobachtungsfenster nach dem Abklingen: was hier noch läuft, läuft von selbst (Autoplay)
const ABKLINGEN_MAX_MS = 4000; // Obergrenze beim Warten auf das Ende aller endlichen Bewegungen

for (const a of ansichten) if (!ANSICHTEN[a]) throw new Error(`unbekannte Ansicht ${a}`);
const cacheDir = ensureDir(path.join(RELAUNCH, 'cache', 'bewegung', satz, ...(gegenprobe ? ['gegenprobe'] : [])));

// ---------------------------------------------------------------- Register aus KERN.md (K-009, Spalte „Kennung“)
function leseRegister() {
  const kern = fs.readFileSync(path.join(RELAUNCH, 'KERN.md'), 'utf8');
  const version = (kern.match(/Version\s+([\d.]+)/) || [])[1] || null;
  const abschnitt = kern.split(/^## /m).find((s) => s.startsWith('K-009'));
  if (!abschnitt) throw new Error('KERN.md: Abschnitt K-009 nicht gefunden');
  const zeilen = abschnitt.split('\n').map((l) => l.trim()).filter((l) => l.startsWith('|'));
  const zellen = (l) => l.replace(/^\||\|$/g, '').split('|').map((z) => z.trim());
  const kopf = zeilen.findIndex((l) => zellen(l).includes('Kennung'));
  if (kopf < 0) throw new Error('KERN.md K-009: Registertabelle mit Spalte „Kennung“ fehlt');
  const spalte = zellen(zeilen[kopf]).indexOf('Kennung');
  const kennungen = zeilen.slice(kopf + 1).filter((l) => !/^\|[\s:|-]+\|$/.test(l))
    .map((l) => zellen(l)[spalte].replace(/`/g, '').trim()).filter(Boolean);
  return { quelle: 'KERN.md K-009 Bewegungsregister, Spalte „Kennung“', kern_version: version, kennungen };
}
const REGISTER = leseRegister();

// ---------------------------------------------------------------- Seitenkontext: Sammler (Läufe normal/reduziert)
function sammler() {
  if (window.__bw) return;
  const B = window.__bw = { phase: 'laden', elemente: new Map(), refs: new Map(), polls: 0, ereignisse: 0, mutationen: 0, letzteMutation: 0 };
  const jetzt = () => Math.round(performance.now());
  const gesehen = new WeakSet();
  const ids = new WeakMap(); let naechste = 1;
  const kebab = (p) => (p.startsWith('--') ? p : p.replace(/[A-Z]/g, (m) => '-' + m.toLowerCase()));
  const OHNE = new Set(['offset', 'computedOffset', 'easing', 'composite']);
  const LAGE = new Set(['top', 'left', 'right', 'bottom', 'inset', 'inset-block', 'inset-inline', 'inset-block-start', 'inset-block-end', 'inset-inline-start', 'inset-inline-end',
    'margin', 'margin-top', 'margin-left', 'margin-right', 'margin-bottom', 'offset-distance', 'background-position', 'background-position-x', 'background-position-y', 'object-position', 'x', 'y', 'cx', 'cy']);
  const GROESSE = new Set(['width', 'height', 'min-width', 'min-height', 'max-width', 'max-height', 'grid-template-rows', 'grid-template-columns', 'flex-basis', 'font-size', 'r', 'rx', 'ry']);

  function sel(el) {
    if (!el || el.nodeType !== 1) return String(el);
    const teile = []; let e = el;
    for (let tiefe = 0; e && e.nodeType === 1 && tiefe < 4; tiefe++) {
      let s = e.localName;
      if (e.id) { teile.unshift(s + '#' + CSS.escape(e.id)); return teile.join(' > '); }
      const dm = e.getAttribute('data-motion'); if (dm) s += `[data-motion="${dm}"]`;
      const cls = [...(e.classList || [])].filter((c) => c.length < 32).slice(0, 2);
      if (cls.length) s += '.' + cls.map((c) => CSS.escape(c)).join('.');
      const p = e.parentElement;
      if (p) { const gl = [...p.children].filter((c) => c.localName === e.localName); if (gl.length > 1) s += `:nth-of-type(${gl.indexOf(e) + 1})`; }
      teile.unshift(s);
      if (!p || p === document.body || p === document.documentElement) { if (p) teile.unshift(p.localName); break; }
      e = p;
    }
    return teile.join(' > ');
  }
  function motion(el) {
    const eigen = el.getAttribute ? el.getAttribute('data-motion') : null;
    let vorfahr = null; let p = el.parentElement;
    for (let d = 0; p && d < 3 && !eigen && !vorfahr; d++) { vorfahr = p.getAttribute('data-motion'); p = p.parentElement; }
    return { eigen, vorfahr };
  }
  function eintrag(el, pseudo) {
    let id = ids.get(el); if (!id) { id = naechste++; ids.set(el, id); }
    const key = id + (pseudo || '');
    let r = B.elemente.get(key);
    if (!r) {
      const m = motion(el);
      r = { sel: sel(el), tag: el.localName, pseudo: pseudo || null, motion: m.eigen, motion_vorfahr: m.vorfahr, phase: B.phase, t: jetzt(), anim: {} };
      B.elemente.set(key, r); B.refs.set(key, el);
    }
    return r;
  }
  const M = (v) => { if (v == null || v === 'none' || v === '') return new DOMMatrixReadOnly(); try { return new DOMMatrixReadOnly(String(v)); } catch { return null; } };
  function ort(werteJe) { // werteJe: { eigenschaft: [werte…] } → Arten der Orts-/Größenänderung
    const arten = new Set();
    const reihe = (v) => (v.length === 1 ? ['none', v[0]] : v);
    for (const [p, v0] of Object.entries(werteJe)) {
      if (!v0.length) continue;
      const v = reihe(v0.map(String));
      if (p === 'transform') {
        const ms = v.map(M);
        if (ms.some((m) => !m)) { if (new Set(v).size > 1) arten.add('transform (nicht auflösbar)'); continue; }
        for (let i = 1; i < ms.length; i++) {
          const a = ms[0], b = ms[i];
          if (Math.abs(a.m41 - b.m41) > 0.5 || Math.abs(a.m42 - b.m42) > 0.5 || Math.abs(a.m43 - b.m43) > 0.5) arten.add('verschiebung');
          if (Math.abs(Math.hypot(a.m11, a.m12) - Math.hypot(b.m11, b.m12)) > 0.005 || Math.abs(Math.hypot(a.m21, a.m22) - Math.hypot(b.m21, b.m22)) > 0.005) arten.add('skalierung');
          if (Math.abs(Math.atan2(a.m12, a.m11) - Math.atan2(b.m12, b.m11)) > 0.01) arten.add('drehung');
        }
      } else if (new Set(v).size > 1) {
        if (p === 'translate') arten.add('verschiebung');
        else if (p === 'scale') arten.add('skalierung');
        else if (p === 'rotate') arten.add('drehung');
        else if (LAGE.has(p)) arten.add('lage');
        else if (GROESSE.has(p)) arten.add('groesse');
      }
    }
    return [...arten];
  }
  function erfasse(a) {
    if (gesehen.has(a)) return;
    gesehen.add(a);
    const eff = a.effect; const el = eff && eff.target;
    if (!el || el.nodeType !== 1) return;
    const art = (typeof CSSTransition !== 'undefined' && a instanceof CSSTransition) ? 'css-transition'
      : (typeof CSSAnimation !== 'undefined' && a instanceof CSSAnimation) ? 'css-animation' : 'waapi';
    const name = art === 'css-transition' ? a.transitionProperty : art === 'css-animation' ? a.animationName : (a.id || 'waapi');
    let kf = []; try { kf = eff.getKeyframes(); } catch {}
    const werteJe = {};
    for (const k of kf) for (const [p, w] of Object.entries(k)) if (!OHNE.has(p) && w != null) (werteJe[kebab(p)] ||= []).push(w);
    if (art === 'css-transition' && !werteJe[a.transitionProperty]) werteJe[a.transitionProperty] = [];
    const tm = eff.getTiming(); const ct = eff.getComputedTiming();
    const kurven = [...new Set([tm.easing, ...kf.map((k) => k.easing)].filter(Boolean))];
    const tl = a.timeline ? a.timeline.constructor.name : null;
    const r = eintrag(el, eff.pseudoElement);
    const k = art + ':' + name;
    const z = r.anim[k] ||= { art, name, eigenschaften: [], dauer_ms: [], verzoegerung_ms: [], kurve: [], iterationen: null, timeline: tl, ort: [], phasen: [], anzahl: 0, ereignis: false, laeuft_in_ruhe: false };
    z.anzahl++;
    for (const p of Object.keys(werteJe)) if (!z.eigenschaften.includes(p)) z.eigenschaften.push(p);
    const d = typeof ct.duration === 'number' ? Math.round(ct.duration) : String(ct.duration);
    if (!z.dauer_ms.includes(d) && z.dauer_ms.length < 6) z.dauer_ms.push(d);
    const v = Math.round(tm.delay || 0); if (!z.verzoegerung_ms.includes(v) && z.verzoegerung_ms.length < 8) z.verzoegerung_ms.push(v);
    for (const ku of (kurven.length > 1 ? kurven.filter((x) => x !== 'linear') : kurven)) if (!z.kurve.includes(ku)) z.kurve.push(ku);
    z.iterationen = tm.iterations === Infinity ? 'unendlich' : tm.iterations;
    for (const o of ort(werteJe)) if (!z.ort.includes(o)) z.ort.push(o);
    if (!z.phasen.includes(B.phase)) z.phasen.push(B.phase);
  }
  function abfrage() {
    B.polls++;
    let liste = []; try { liste = document.getAnimations(); } catch {}
    for (const a of liste) {
      try {
        erfasse(a);
        if (B.phase === 'ruhe' && a.playState === 'running' && a.effect && a.effect.target) {
          const el = a.effect.target; const id = ids.get(el); const r = id && B.elemente.get(id + (a.effect.pseudoElement || ''));
          if (r) for (const z of Object.values(r.anim)) if (z.name === (a.animationName || a.transitionProperty || a.id || 'waapi')) z.laeuft_in_ruhe = true;
        }
      } catch {}
    }
  }
  B.timer = setInterval(abfrage, 50);
  for (const typ of ['animationstart', 'animationiteration', 'transitionrun', 'transitionstart']) {
    addEventListener(typ, (e) => {
      B.ereignisse++;
      const el = e.target; if (!el || el.nodeType !== 1) return;
      try { for (const a of el.getAnimations({ subtree: true })) erfasse(a); } catch {}
      const name = e.animationName || e.propertyName;
      const art = typ.startsWith('anim') ? 'css-animation' : 'css-transition';
      const r = eintrag(el, e.pseudoElement || null);
      const z = r.anim[art + ':' + name] ||= { art, name, eigenschaften: art === 'css-transition' ? [name] : [], dauer_ms: [], verzoegerung_ms: [], kurve: [], iterationen: null, timeline: null, ort: [], phasen: [], anzahl: 0, ereignis: true, laeuft_in_ruhe: false };
      z.ereignis = true;
      if (!z.phasen.includes(B.phase)) z.phasen.push(B.phase);
      if (B.phase === 'ruhe') z.laeuft_in_ruhe = true;
    }, { capture: true, passive: true });
  }
  // Skript-Bewegung: Inline-Stil und SVG-Geometrie, die sich wiederholt ändern (rAF-Bibliotheken, eigene Schleifen)
  const parseStil = (s) => { const o = {}; for (const t of String(s || '').split(';')) { const i = t.indexOf(':'); if (i > 0) o[t.slice(0, i).trim().toLowerCase()] = t.slice(i + 1).trim(); } return o; };
  const ATTR = ['style', 'transform', 'x', 'y', 'cx', 'cy', 'r', 'd', 'points', 'width', 'height', 'opacity', 'stroke-dashoffset', 'offset'];
  B.skript = new Map();
  const notiereSkript = (el, p, wert) => {
    let id = ids.get(el); if (!id) { id = naechste++; ids.set(el, id); }
    let s = B.skript.get(id); if (!s) { s = { el, props: {} }; B.skript.set(id, s); }
    const q = s.props[p] ||= { n: 0, werte: [], t0: jetzt(), t1: 0, phasen: [], in_ruhe: false };
    q.n++; q.t1 = jetzt(); if (!q.werte.includes(wert) && q.werte.length < 12) q.werte.push(wert);
    if (!q.phasen.includes(B.phase)) q.phasen.push(B.phase);
    if (B.phase === 'ruhe') q.in_ruhe = true;
  };
  const mo = new MutationObserver((recs) => {
    B.mutationen += recs.length; B.letzteMutation = performance.now();
    for (const m of recs) {
      const el = m.target;
      if (m.type === 'characterData') { const t = String(el.data || ''); if (/\d/.test(t) && el.parentElement) notiereSkript(el.parentElement, '#text', t.trim().slice(0, 24)); continue; }
      if (el.nodeType !== 1) continue;
      if (m.attributeName === 'style') {
        const alt = parseStil(m.oldValue), neu = parseStil(el.getAttribute('style'));
        for (const p of new Set([...Object.keys(alt), ...Object.keys(neu)])) if (alt[p] !== neu[p]) notiereSkript(el, p, neu[p] ?? '');
      } else notiereSkript(el, '@' + m.attributeName, el.getAttribute(m.attributeName) ?? '');
    }
  });
  mo.observe(document, { subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ATTR, characterData: true });
  // rAF-Schleifen (Canvas/WebGL, Skript-Laufbänder) – unsichtbar für getAnimations; gezählt nur im Ruhefenster.
  // Erste Aufrufer je Quelle aus dem Stack (Chunk-Datei), höchstens 5.
  B.raf = { ruhe: 0, quellen: [], bilder: 0 };
  const rafOrig = window.requestAnimationFrame.bind(window);
  // Ruhefenster: eigener Bildzähler (über das Original, zählt nicht als Seiten-rAF) → Aufrufe je Bild unabhängig von der Bildrate
  B.starteRuhe = () => { B.phase = 'ruhe'; B.ruheStart = performance.now(); const z = () => { B.raf.bilder++; if (!B.ruheEnde) rafOrig(z); }; rafOrig(z); };
  window.requestAnimationFrame = function (cb) {
    if (B.phase === 'ruhe') {
      B.raf.ruhe++;
      if (B.raf.quellen.length < 5) {
        const zeile = String(new Error().stack || '').split('\n').slice(2).find((l) => /https?:\/\//.test(l)) || '(ohne Quelle)';
        const q = (zeile.match(/https?:\/\/[^\s)]+/) || [zeile.trim()])[0].replace(/:\d+:\d+$/, '');
        if (!B.raf.quellen.includes(q)) B.raf.quellen.push(q);
      }
    }
    return rafOrig(cb);
  };

  B.bericht = () => {
    abfrage();
    const elemente = [];
    for (const [key, r] of B.elemente) {
      const el = B.refs.get(key);
      if (el && el.isConnected) { const m = motion(el); r.motion = m.eigen; r.motion_vorfahr = m.vorfahr; }
      elemente.push({ ...r, anim: Object.values(r.anim) });
    }
    // Skript-Bewegung: mindestens 3 verschiedene Werte derselben Eigenschaft = Bewegung (Umschalten an/aus zählt nicht)
    for (const s of B.skript.values()) {
      const props = Object.entries(s.props).filter(([, q]) => q.werte.length >= 3);
      if (!props.length) continue;
      const el = s.el; const m = motion(el);
      const zaehler = props.every(([p]) => p === '#text');
      const werteJe = {};
      for (const [p, q] of props) { const k = p.startsWith('@') ? p.slice(1) : p; if (k !== '#text') werteJe[k] = q.werte.filter((w) => w !== ''); }
      elemente.push({ sel: sel(el), tag: el.localName, pseudo: null, motion: m.eigen, motion_vorfahr: m.vorfahr, phase: props[0][1].phasen[0], t: props[0][1].t0,
        anim: [{ art: zaehler ? 'skript-zaehler' : 'skript', name: props.map(([p]) => p).join(','), eigenschaften: props.map(([p]) => (p.startsWith('@') ? p.slice(1) : p)).filter((p) => p !== '#text'),
          dauer_ms: [Math.max(...props.map(([, q]) => q.t1 - q.t0))], verzoegerung_ms: [], kurve: ['skript'], iterationen: null, timeline: 'skript', ort: ort(werteJe),
          phasen: [...new Set(props.flatMap(([, q]) => q.phasen))], anzahl: Math.max(...props.map(([, q]) => q.n)), ereignis: false, laeuft_in_ruhe: props.some(([, q]) => q.in_ruhe) }] });
    }
    // SMIL und Video (laufen ohne getAnimations)
    const smil = [...document.querySelectorAll('animate, animateTransform, animateMotion, set')].map((e) => ({ sel: sel(e), tag: e.localName, attribut: e.getAttribute('attributeName'), wiederholung: e.getAttribute('repeatCount'), motion: motion(e).eigen || motion(e).vorfahr }));
    const videos = [...document.querySelectorAll('video')].map((v) => ({ sel: sel(v), autoplay: v.autoplay, loop: v.loop, laeuft: !v.paused && !v.ended && v.readyState > 2, motion: motion(v).eigen || motion(v).vorfahr }));
    // Deklarierte Übergänge (ruhend; Hover/Fokus/Klick werden im Lauf nicht ausgelöst) – Zensus, keine Kennzahl
    const dekl = { elemente: 0, mit_data_motion: 0, nach_eigenschaft: {} };
    for (const e of document.querySelectorAll('body *')) {
      const cs = getComputedStyle(e);
      if (!cs.transitionDuration.split(',').some((d) => parseFloat(d) > 0)) continue;
      dekl.elemente++; if (e.hasAttribute('data-motion')) dekl.mit_data_motion++;
      const p = cs.transitionProperty; dekl.nach_eigenschaft[p] = (dekl.nach_eigenschaft[p] || 0) + 1;
    }
    const canvas = [...document.querySelectorAll('canvas')].filter((c) => { const cs = getComputedStyle(c); const r = c.getBoundingClientRect(); return cs.display !== 'none' && cs.visibility !== 'hidden' && +cs.opacity > 0 && r.width > 0 && r.height > 0 && !c.closest('[hidden]'); })
      .map((c) => ({ sel: sel(c), breite: c.width, hoehe: c.height, motion: motion(c).eigen, motion_vorfahr: motion(c).vorfahr }));
    const ruheS = Math.max(0.001, ((B.ruheEnde || performance.now()) - (B.ruheStart || performance.now())) / 1000);
    const raf = { aufrufe_in_ruhe: B.raf.ruhe, bilder_in_ruhe: B.raf.bilder, je_bild: B.raf.bilder ? +(B.raf.ruhe / B.raf.bilder).toFixed(2) : 0, je_s: +(B.raf.ruhe / ruheS).toFixed(1), quellen: B.raf.quellen.map((q) => { try { return new URL(q).pathname; } catch { return q; } }) };
    return { elemente, smil, videos, canvas_sichtbar: canvas, raf, deklariert: dekl, polls: B.polls, ereignisse: B.ereignisse, mutationen: B.mutationen, klasse_html: document.documentElement.className.slice(0, 200), seitenhoehe: document.documentElement.scrollHeight };
  };
}

// ---------------------------------------------------------------- Seitenkontext: rAF- und LoAF-Rekorder (Framelauf)
function rekorder() {
  if (window.__bwr) return;
  const R = window.__bwr = { ts: [], marken: [], loaf: [], marke(p) { R.marken.push([p, performance.now()]); } };
  const f = (t) => { R.ts.push(t); if (R.ts.length < 100000) requestAnimationFrame(f); };
  requestAnimationFrame(f);
  try {
    new PerformanceObserver((l) => {
      for (const e of l.getEntries()) R.loaf.push({ start: e.startTime, dauer: e.duration, blockierend: e.blockingDuration, renderStart: e.renderStart, styleLayoutStart: e.styleAndLayoutStart,
        skripte: (e.scripts || []).map((s) => ({ invoker: s.invoker, typ: s.invokerType, url: s.sourceURL, funktion: s.sourceFunctionName, pos: s.sourceCharPosition, dauer: s.duration, erzwungen: s.forcedStyleAndLayoutDuration })) });
    }).observe({ type: 'long-animation-frame', buffered: true });
  } catch (e) { R.loafFehler = String(e); }
}

// Gegenprobe (absichtlich schlechte Fälle, nur im Testlauf, nichts unter src/):
//  CSS  – unregistrierte Endlos-Animation mit Layout-Eigenschaft `left` an der h1 (Paketvorgabe, page.addStyleTag)
//  JS   – WAAPI-Endlosverschiebung an der h1, die prefers-reduced-motion ignoriert (wie eine Skript-Bibliothek ohne Weiche)
//  LAST – 30 ms Last in jedem 10. rAF-Rückruf (Framelauf: verworfene Frames + LoAF aus Bewegungscode)
const GEGENPROBE_CSS = '@keyframes bw-gegenprobe { from { left: 0px; } to { left: 24px; } } h1 { position: relative; animation: bw-gegenprobe 1500ms linear infinite; }';
const GEGENPROBE_JS = "void document.querySelector('h1')?.animate([{ transform: 'translateX(0px)' }, { transform: 'translateX(8px)' }], { duration: 1200, iterations: Infinity, id: 'bw-gegenprobe-js' })";
// Das Lastskript bekommt eine eigene (abgefangene, nie ans Netz gehende) URL, damit LoAF es als Seitenskript mit Quelle sieht –
// Werkzeug-Code (page.evaluate/addInitScript) hat in LoAF keine Quelle und wird getrennt gezählt.
const GEGENPROBE_URL = BASE + '/__bw-gegenprobe-last.js';
const GEGENPROBE_LAST = '(() => { let n = 0; const f = () => { if (++n % 10 === 0) { const t = performance.now(); while (performance.now() - t < 30) {} } requestAnimationFrame(f); }; requestAnimationFrame(f); })();';

// ---------------------------------------------------------------- Knoten-Seite: Hilfen
class Plaetze { // FIFO-Semaphore: höchstens 2 Kontexte; Framelauf belegt beide (keine Eigenlast neben der Messung)
  constructor(n) { this.frei = n; this.q = []; }
  nimm(k) { return new Promise((r) => { this.q.push({ k, r }); this.pumpe(); }); }
  gib(k) { this.frei += k; this.pumpe(); }
  pumpe() { while (this.q.length && this.q[0].k <= this.frei) { const { k, r } = this.q.shift(); this.frei -= k; r(); } }
}
const plaetze = new Plaetze(2);

const browser = await chromium.launch();
async function kontext(a, reducedMotion) {
  const v = ANSICHTEN[a];
  const context = await browser.newContext({ viewport: { width: v.width, height: v.height }, deviceScaleFactor: 1, isMobile: v.isMobile, hasTouch: v.hasTouch,
    reducedMotion, locale: 'de-DE', timezoneId: 'Europe/Berlin', colorScheme: 'light' });
  const protokoll = [];
  await installSperre(context, { protokoll });
  await setzeEinwilligung(context, 'abgelehnt');
  return { context, protokoll };
}
const warteBilder = (page, n = 2) => page.evaluate((n) => new Promise((r) => { let i = 0; const f = () => (++i >= n ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }), n);

// Sammellauf (normal / reduziert): Laden → Abklingen → Durchscrollen in Schritten → Abklingen → Ruhefenster
async function sammellauf(s, a, modus) {
  const { context, protokoll } = await kontext(a, modus === 'reduziert' ? 'reduce' : 'no-preference');
  await context.addInitScript(sammler);
  const page = await context.newPage();
  const konsole = [];
  page.on('pageerror', (e) => konsole.push(String(e.message).slice(0, 200)));
  const t0 = Date.now();
  try {
    const resp = await page.goto(BASE + s, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await bereit(page);
    if (gegenprobe) {
      await page.addStyleTag({ content: GEGENPROBE_CSS });
      await page.evaluate(GEGENPROBE_JS);
    }
    await abklingen(page);
    await page.evaluate(() => { window.__bw.phase = 'scroll'; });
    const schritte = await page.evaluate(async ({ vh, verweil }) => {
      const schritt = Math.round(innerHeight * vh); let y = 0, n = 0;
      const bild = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      while (y < document.documentElement.scrollHeight - innerHeight && n < 400) {
        y += schritt; n++; window.scrollTo({ top: y, behavior: 'instant' });
        await bild(); await new Promise((r) => setTimeout(r, verweil));
      }
      return n;
    }, { vh: SCHRITT_VH, verweil: VERWEIL_MS });
    await abklingen(page);
    await page.evaluate(() => window.__bw.starteRuhe());
    await page.evaluate((ms) => new Promise((r) => setTimeout(r, ms)), RUHE_MS); // Beobachtungsfenster, keine Wartezeit auf einen Zustand
    const bericht = await page.evaluate(() => { window.__bw.ruheEnde = performance.now(); return window.__bw.bericht(); });
    return { status: resp?.status() ?? null, schritte, dauer_ms: Date.now() - t0, konsole, fremd: protokoll.filter((p) => p.art === 'fremd').length, ...bericht };
  } finally { await context.close(); }
}
// Zustandsabfrage: bis keine endliche Animation mehr läuft und 300 ms keine Stil-Mutation kam (Obergrenze 4 s)
async function abklingen(page) {
  try {
    await page.waitForFunction(() => {
      const laufend = document.getAnimations().filter((a) => a.playState === 'running' && a.effect && a.effect.getComputedTiming().endTime !== Infinity).length;
      return laufend === 0 && performance.now() - (window.__bw?.letzteMutation || 0) > 300;
    }, null, { timeout: ABKLINGEN_MAX_MS, polling: 'raf' });
    return true;
  } catch { return false; }
}

// Framelauf: CPU-Drosselung, rAF-Zeitstempel ab Dokumentbeginn, Einstieg bis „bereit“, dann rAF-gekoppeltes Scrollen
let basisLeistung = null;
let glRenderer = null; // WebGL-Renderer im Framelauf (headless: SwiftShader = Software-GL → WebGL-lastige Seiten auf Desktop deutlich langsamer)
async function framelauf(s, a) {
  const v = ANSICHTEN[a];
  const rate = drosselFest ?? (v.isMobile ? 4 : 1);
  const { context } = await kontext(a, 'no-preference');
  await context.addInitScript(rekorder);
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('Emulation.setCPUThrottlingRate', { rate });
  const last = [os.loadavg()[0]];
  try {
    await page.goto(BASE + s, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await bereit(page);
    if (gegenprobe) {
      await page.addStyleTag({ content: GEGENPROBE_CSS });
      // als Seitenskript mit Quelle (page.route hat Vorrang vor der Sperre im Kontext; die Anfrage erreicht den Server nicht)
      await page.route(GEGENPROBE_URL, (route) => route.fulfill({ status: 200, contentType: 'text/javascript', body: GEGENPROBE_LAST }));
      await page.addScriptTag({ url: GEGENPROBE_URL });
    }
    const leistung = await page.evaluate(() => { const t = performance.now(); let x = 0; for (let i = 0; i < 3e6; i++) x += i % 7; return performance.now() - t + (x < 0 ? 1 : 0); });
    await page.evaluate(async (px) => {
      const R = window.__bwr; R.marke('scroll');
      let y = scrollY, n = 0;
      await new Promise((res) => { const f = () => { const max = document.documentElement.scrollHeight - innerHeight; y = Math.min(max, y + px); window.scrollTo({ top: y, behavior: 'instant' }); if (y >= max || ++n > 4000) res(); else requestAnimationFrame(f); }; requestAnimationFrame(f); });
      await new Promise((r) => { let i = 0; const f = () => (++i >= 30 ? r() : requestAnimationFrame(f)); requestAnimationFrame(f); }); // 30 Bilder Nachlauf (Auftritte am Seitenende)
      R.marke('ende');
    }, pxJeBild);
    if (!glRenderer) glRenderer = await page.evaluate(() => { try { const c = document.createElement('canvas').getContext('webgl'); const e = c && c.getExtension('WEBGL_debug_renderer_info'); return e ? c.getParameter(e.UNMASKED_RENDERER_WEBGL) : 'unbekannt'; } catch { return 'unbekannt'; } });
    const roh = await page.evaluate(() => ({ ts: window.__bwr.ts, marken: window.__bwr.marken, loaf: window.__bwr.loaf, loafFehler: window.__bwr.loafFehler || null }));
    last.push(os.loadavg()[0]);
    return { rate, leistung_ms: Math.round(leistung), drossel_ist: basisLeistung ? +(leistung / basisLeistung).toFixed(2) : null, last_1min: last, ...roh };
  } finally { await context.close(); }
}

async function bildfolge(s, a) {
  const { context } = await kontext(a, 'no-preference');
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  const dir = ensureDir(path.join(cacheDir, 'bildfolge', a, slug(s)));
  const ist = [];
  try {
    await page.goto(BASE + s, { waitUntil: 'commit', timeout: 45000 });
    const t0 = Date.now();
    for (let k = 0; k <= 20; k++) {
      const warte = t0 + k * 100 - Date.now();
      if (warte > 0) await new Promise((r) => setTimeout(r, warte)); // Taktplan 100 ms (Aufnahmezeitpunkt, kein Zustandswarten)
      const { data } = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 60, optimizeForSpeed: true });
      const ms = Date.now() - t0; ist.push(ms);
      fs.writeFileSync(path.join(dir, `${String(k).padStart(2, '0')}-${String(ms).padStart(4, '0')}ms.jpg`), Buffer.from(data, 'base64'));
    }
    return { bilder: ist.length, ist_ms: ist, ordner: path.relative(RELAUNCH, dir) };
  } finally { await context.close(); }
}

// ---------------------------------------------------------------- Auswertung
const ERLAUBT = new Set(['transform', 'opacity', 'translate', 'scale', 'rotate']);
const LAYOUT = /^(top|left|right|bottom|inset.*|margin.*|padding.*|width|height|min-width|min-height|max-width|max-height|grid-template-.*|grid-(row|column).*|flex.*|gap|row-gap|column-gap|font-size|line-height|letter-spacing|word-spacing|border(-.*)?-width|border-width|position|display|aspect-ratio|x|y|cx|cy|r|rx|ry|d|points)$/;
const SPARSAM = /^(filter|backdrop-filter|clip-path|mask.*)$/;
const KATEGORIE_TEXT = { layout: 'Layout-Eigenschaft', paint: 'Paint-Eigenschaft', sparsam: 'filter/clip-path/mask (sparsam, gemessen)', variable: 'CSS-Variable' };
function kategorie(p) { if (ERLAUBT.has(p)) return null; if (LAYOUT.test(p)) return 'layout'; if (SPARSAM.test(p)) return 'sparsam'; if (p.startsWith('--')) return 'variable'; return 'paint'; }

function werteSammlung(roh, modus) {
  const reg = new Set(REGISTER.kennungen);
  // rAF-Schleife im Ruhefenster + sichtbare Canvas → die Canvas zählt als animiertes Element (Register-Abgleich, bei reduce Autoplay)
  const rafSchleife = !!(roh.raf && roh.raf.bilder_in_ruhe >= 5 && roh.raf.je_bild >= RAF_SCHLEIFE_JE_BILD);
  const canvasAnim = rafSchleife ? (roh.canvas_sichtbar || []).map((c) => ({ sel: c.sel, tag: 'canvas', pseudo: null, motion: c.motion, motion_vorfahr: c.motion_vorfahr, phase: 'ruhe', t: null,
    anim: [{ art: 'raf-schleife', name: 'raf-schleife', eigenschaften: [], dauer_ms: ['endlos'], verzoegerung_ms: [], kurve: ['skript'], iterationen: 'unendlich', timeline: 'skript', ort: [], phasen: ['ruhe'],
      anzahl: roh.raf.aufrufe_in_ruhe, ereignis: false, laeuft_in_ruhe: true, quellen: roh.raf.quellen }] })) : [];
  const elemente = roh.elemente.concat(canvasAnim).map((e) => {
    const eig = [...new Set(e.anim.flatMap((z) => z.eigenschaften))];
    const technik = [];
    for (const p of eig) {
      const k = kategorie(p);
      if (!k) continue;
      if (p === 'grid-template-rows' && (e.motion === 'aufklappen' || e.motion_vorfahr === 'aufklappen')) continue; // Registerausnahme
      technik.push({ eigenschaft: p, kategorie: k, text: KATEGORIE_TEXT[k], layout: k === 'layout' });
    }
    return { sel: e.sel, pseudo: e.pseudo, motion: e.motion, motion_vorfahr: e.motion_vorfahr, registriert: !!e.motion && reg.has(e.motion),
      registriert_mit_vorfahr: (!!e.motion && reg.has(e.motion)) || (!!e.motion_vorfahr && reg.has(e.motion_vorfahr)),
      arten: [...new Set(e.anim.map((z) => z.art))], namen: e.anim.map((z) => z.name).slice(0, 6), eigenschaften: eig,
      dauer_ms: [...new Set(e.anim.flatMap((z) => z.dauer_ms))].slice(0, 6), kurve: [...new Set(e.anim.flatMap((z) => z.kurve))].slice(0, 4),
      iterationen: e.anim.some((z) => z.iterationen === 'unendlich') ? 'unendlich' : (e.anim[0]?.iterationen ?? null),
      ort: [...new Set(e.anim.flatMap((z) => z.ort))], laeuft_in_ruhe: e.anim.some((z) => z.laeuft_in_ruhe), phasen: [...new Set(e.anim.flatMap((z) => z.phasen))], technik };
  });
  const n = elemente.length;
  const mitMotion = elemente.filter((e) => e.motion).length;
  const imRegister = elemente.filter((e) => e.registriert).length;
  const zusatz = { smil: roh.smil.length, videos_laufend: roh.videos.filter((v) => v.laeuft).length, canvas_sichtbar: (roh.canvas_sichtbar || []).length, raf_ruhe: roh.raf || null };
  const out = { modus, status: roh.status, dauer_ms: roh.dauer_ms, seitenhoehe: roh.seitenhoehe, schritte: roh.schritte, html_klasse: roh.klasse_html, konsole: roh.konsole, fremd: roh.fremd,
    elemente_animiert: n, mit_data_motion: mitMotion, im_register: imRegister, anteil_registriert: n ? +(imRegister / n).toFixed(3) : 1,
    im_register_mit_vorfahr: elemente.filter((e) => e.registriert_mit_vorfahr).length, ...zusatz, polls: roh.polls, ereignisse: roh.ereignisse, mutationen: roh.mutationen };
  // rAF-Schleife ohne sichtbare Canvas: keine sichtbare Bewegung nachweisbar → nur Hinweis (mit Canvas oben als Element erfasst)
  out.hinweise = rafSchleife && !canvasAnim.length ? [{ grund: 'raf-schleife ohne sichtbare Canvas', je_bild: roh.raf.je_bild, je_s: roh.raf.je_s, quellen: roh.raf.quellen }] : [];
  if (modus === 'normal') {
    out.unregistriert = elemente.filter((e) => !e.registriert);
    out.technik = elemente.filter((e) => e.technik.length).map((e) => ({ sel: e.sel, pseudo: e.pseudo, motion: e.motion, namen: e.namen, eigenschaften: e.technik }));
    out.technik_layout = out.technik.filter((t) => t.eigenschaften.some((x) => x.layout)).length;
    out.deklariert = { elemente: roh.deklariert.elemente, mit_data_motion: roh.deklariert.mit_data_motion,
      haeufigste: Object.entries(roh.deklariert.nach_eigenschaft).sort((x, y) => y[1] - x[1]).slice(0, 8).map(([p, k]) => ({ transition_property: p, elemente: k })) };
  } else {
    const verstoesse = [];
    for (const e of elemente) {
      // nicht-numerische Dauer (scroll-/view-gebunden) zählt als > 0 ms
      const dauer = e.dauer_ms.some((d) => typeof d !== 'number') ? Infinity : Math.max(0, ...e.dauer_ms);
      if (e.ort.length && (dauer > 0 || e.arten.includes('skript'))) verstoesse.push({ grund: 'ortsaenderung', arten: e.ort, sel: e.sel, pseudo: e.pseudo, motion: e.motion, namen: e.namen, dauer_ms: e.dauer_ms, typ: e.arten });
      if (e.iterationen === 'unendlich' || (e.laeuft_in_ruhe && !e.arten.includes('skript-zaehler'))) verstoesse.push({ grund: 'autoplay/endlos', sel: e.sel, pseudo: e.pseudo, motion: e.motion, namen: e.namen, eigenschaften: e.eigenschaften, typ: e.arten, laeuft_in_ruhe: e.laeuft_in_ruhe });
    }
    for (const v of roh.videos.filter((x) => x.laeuft)) verstoesse.push({ grund: 'autoplay-video', sel: v.sel, motion: v.motion });
    for (const m of roh.smil.filter((x) => ['animateTransform', 'animateMotion'].includes(x.tag) || ['x', 'y', 'cx', 'cy', 'transform', 'width', 'height', 'r'].includes(x.attribut))) verstoesse.push({ grund: 'ortsaenderung-smil', sel: m.sel, attribut: m.attribut, motion: m.motion });
    out.verstoesse = verstoesse;
    out.elemente = elemente.map((e) => ({ sel: e.sel, motion: e.motion, namen: e.namen, eigenschaften: e.eigenschaften, dauer_ms: e.dauer_ms, ort: e.ort })).slice(0, 40);
  }
  return { zusammenfassung: out, elemente };
}

function intervalle(ts, von, bis) {
  const t = ts.filter((x) => x >= von && x <= bis);
  return t.slice(1).map((x, i) => x - t[i]);
}
function framestat(d, vsync) {
  if (!d.length) return { intervalle: 0 };
  const k = d.map((x) => Math.max(1, Math.round(x / vsync)));
  const s = [...d].sort((x, y) => x - y);
  const hist = { '1': 0, '2': 0, '3': 0, '4+': 0 };
  for (const q of k) hist[q >= 4 ? '4+' : String(q)]++;
  const summeK = k.reduce((x, y) => x + y, 0);
  return { intervalle: d.length, anteil_verworfen: +(k.filter((q) => q >= 2).length / d.length).toFixed(4), anteil_ueber_50ms: +(k.filter((q) => q >= 4).length / d.length).toFixed(4),
    anteil_ausgelassene_vsyncs: +((summeK - d.length) / summeK).toFixed(4), anteil_roh_ueber_16_7ms: +(d.filter((x) => x > 16.7).length / d.length).toFixed(4),
    p50_ms: +s[Math.floor(s.length * 0.5)].toFixed(1), p95_ms: +s[Math.floor(s.length * 0.95)].toFixed(1), max_ms: +s[s.length - 1].toFixed(1), vsync_einheiten: hist };
}
const chunkCache = new Map([[GEGENPROBE_URL, { html: false, text: GEGENPROBE_LAST }]]);
// Inhalts-Signaturen je Skriptquelle. `data-motion` nur als ganzes Attribut (nicht `data-motion-hydrated` o. ä.).
const SIGNATUREN = [['framer-motion', /framerAppearId|blockInitialAnimation|reducedMotionConfig|skipAnimations/], ['gsap', /GreenSock|ScrollTrigger/], ['lenis', /\blenis\b/i],
  ['lottie', /bodymovin|lottie/i], ['bewegungsmodul', /\bk-(?:bewegung|bereit)\b|data-motion(?![\w-])/], ['reduced-motion-abfrage', /prefers-reduced-motion/]];
// Dokument als Quelle (Inline-Skripte): nur echte Inline-Skripte prüfen, nicht RSC-Nutzlast (self.__next_f) oder JSON(-LD);
// liegt sourceCharPosition in einem Inline-Skript, nur dieses.
async function chunkBezug(url, pos) {
  if (!url) return null;
  let quelle = chunkCache.get(url);
  if (quelle === undefined) {
    try {
      assertLocal(url);
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const txt = await res.text();
      if (/text\/html/.test(res.headers.get('content-type') || '')) {
        const inline = [];
        for (const m of txt.matchAll(/<script(?![^>]*\bsrc=)([^>]*)>([\s\S]*?)<\/script>/g)) {
          if (/type=["']?application\/(ld\+)?json/.test(m[1]) || /^\s*\(?self\.__next_f/.test(m[2])) continue;
          const start = m.index + m[0].indexOf('>') + 1;
          inline.push({ start, ende: start + m[2].length, text: m[2] });
        }
        quelle = { html: true, inline };
      } else quelle = { html: false, text: txt };
    } catch { quelle = null; }
    chunkCache.set(url, quelle);
  }
  if (!quelle) return null;
  const pruefe = (t) => SIGNATUREN.filter(([, re]) => re.test(t)).map(([n]) => n);
  if (!quelle.html) return pruefe(quelle.text);
  const treffer = typeof pos === 'number' && pos >= 0 ? quelle.inline.find((x) => pos >= x.start && pos <= x.ende) : null;
  return pruefe(treffer ? treffer.text : quelle.inline.map((x) => x.text).join('\n'));
}
async function werteFrames(roh) {
  const marke = (p) => (roh.marken.find((m) => m[0] === p) || [null, null])[1];
  const tScroll = marke('scroll'), tEnde = marke('ende');
  const alle = intervalle(roh.ts, 0, Infinity);
  const ruhig = alle.filter((x) => x > 12 && x < 22).sort((x, y) => x - y);
  const vsync = ruhig.length ? ruhig[Math.floor(ruhig.length / 2)] : 1000 / 60;
  const loaf = [];
  for (const e of roh.loaf) {
    const skripte = [];
    for (const s of e.skripte) {
      const bezug = [];
      // Werkzeug-Code (page.evaluate/addInitScript: Rekorder, Scroll-Treiber) hat keine Quelle → eigene Klasse, nicht Bewegungscode der Seite
      const werkzeug = !s.url && /FrameRequestCallback/i.test(s.invoker || '');
      if (!werkzeug) {
        if (/FrameRequestCallback/i.test(s.invoker || '')) bezug.push('rAF-Rückruf');
        if (/anim|motion|tween|spring|scroll/i.test(s.funktion || '')) bezug.push('funktionsname');
        const ch = await chunkBezug(s.url, s.pos); if (ch && ch.length) bezug.push(...ch.map((c) => 'chunk:' + c));
      }
      let kurz = s.url; try { kurz = new URL(s.url).pathname; } catch {}
      skripte.push({ invoker: String(s.invoker || '').slice(0, 80), typ: s.typ, quelle: werkzeug ? '(werkzeug)' : (kurz || '(inline/eval)'), funktion: s.funktion || null, pos: s.pos ?? null,
        dauer_ms: Math.round(s.dauer), erzwungen_ms: Math.round(s.erzwungen || 0), bewegungsbezug: bezug, werkzeug });
    }
    const phase = tScroll == null || e.start < tScroll ? 'einstieg' : 'scroll';
    loaf.push({ phase, start_ms: Math.round(e.start), dauer_ms: Math.round(e.dauer), blockierend_ms: Math.round(e.blockierend), render_ms: e.renderStart ? Math.round(e.start + e.dauer - e.renderStart) : 0, skripte });
  }
  const skripteAlle = loaf.flatMap((l) => l.skripte.map((s) => ({ ...s, phase: l.phase })));
  const bew = skripteAlle.filter((s) => s.bewegungsbezug.length);
  const wz = skripteAlle.filter((s) => s.werkzeug);
  return {
    drossel: roh.rate, drossel_ist: roh.drossel_ist, leistung_ms: roh.leistung_ms, last_1min: roh.last_1min, vsync_ms: +vsync.toFixed(2),
    einstieg: framestat(intervalle(roh.ts, 0, tScroll ?? Infinity), vsync), scroll: framestat(intervalle(roh.ts, tScroll ?? 0, tEnde ?? Infinity), vsync),
    loaf: { anzahl: loaf.length, einstieg: loaf.filter((l) => l.phase === 'einstieg').length, scroll: loaf.filter((l) => l.phase === 'scroll').length,
      laengster_ms: Math.max(0, ...loaf.map((l) => l.dauer_ms)), laengste_skriptdauer_ms: Math.max(0, ...skripteAlle.map((s) => s.dauer_ms)),
      bewegung: { skripte: bew.length, ueber_20ms: bew.filter((s) => s.dauer_ms > 20).length, laengste_ms: Math.max(0, ...bew.map((s) => s.dauer_ms)),
        top: bew.sort((x, y) => y.dauer_ms - x.dauer_ms).slice(0, 5) },
      werkzeug: { skripte: wz.length, laengste_ms: Math.max(0, ...wz.map((s) => s.dauer_ms)), erzwungen_ms_max: Math.max(0, ...wz.map((s) => s.erzwungen_ms)) },
      top: skripteAlle.sort((x, y) => y.dauer_ms - x.dauer_ms).slice(0, 5), fehler: roh.loafFehler },
    _loafRoh: loaf,
  };
}
const median = (xs) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.floor((s.length - 1) / 2)] : null; };

// ---------------------------------------------------------------- Ablauf
const tStart = Date.now();
{ // Leistungsbasis ohne Drosselung (für den Nachweis der Drosselung: drossel_ist = Zeit gedrosselt / Zeit ungedrosselt)
  await plaetze.nimm(1);
  const { context } = await kontext('d1440', 'no-preference');
  const page = await context.newPage();
  await page.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  const w = [];
  for (let i = 0; i < 3; i++) w.push(await page.evaluate(() => { const t = performance.now(); let x = 0; for (let i = 0; i < 3e6; i++) x += i % 7; return performance.now() - t + (x < 0 ? 1 : 0); }));
  basisLeistung = median(w);
  await context.close(); plaetze.gib(1);
}
const auftraege = [];
for (const s of seiten) for (const a of ansichten) auftraege.push({ s, a });
const ergebnisse = [];
async function bearbeite({ s, a }) {
  const r = { seite: s, ansicht: a, fehler: [] };
  const roh = { seite: s, ansicht: a };
  for (const lauf of laeufe) {
    const k = lauf === 'frames' ? 2 : 1;
    await plaetze.nimm(k);
    try {
      if (lauf === 'normal' || lauf === 'reduziert') {
        const x = await sammellauf(s, a, lauf);
        const w = werteSammlung(x, lauf);
        r[lauf] = w.zusammenfassung; roh[lauf] = { ...x, elemente: w.elemente };
      } else if (lauf === 'frames') {
        const reps = [];
        for (let i = 0; i < wdh; i++) reps.push(await werteFrames(await framelauf(s, a)));
        roh.frames = reps;
        const best = reps.sort((x, y) => (x.scroll.anteil_verworfen ?? 0) - (y.scroll.anteil_verworfen ?? 0))[Math.floor((reps.length - 1) / 2)]; // Median-Lauf
        const { _loafRoh, ...rest } = best; void _loafRoh;
        r.frames = { ...rest, wiederholungen: reps.length, scroll_anteil_verworfen_alle: reps.map((x) => x.scroll.anteil_verworfen) };
      } else if (lauf === 'bildfolge') r.bildfolge = await bildfolge(s, a);
    } catch (e) { r.fehler.push(`${lauf}: ${String(e.message).slice(0, 200)}`); }
    finally { plaetze.gib(k); }
  }
  ensureDir(path.join(cacheDir, 'roh'));
  fs.writeFileSync(path.join(cacheDir, 'roh', `${a}__${slug(s)}.json`), JSON.stringify(roh));
  ergebnisse.push(r);
  process.stdout.write(r.fehler.length ? 'F' : '.');
}
let naechster = 0;
await Promise.all(Array.from({ length: worker }, async () => { while (naechster < auftraege.length) await bearbeite(auftraege[naechster++]); }));
await browser.close();
ergebnisse.sort((x, y) => (seiten.indexOf(x.seite) - seiten.indexOf(y.seite)) || x.ansicht.localeCompare(y.ansicht));

// ---------------------------------------------------------------- Zusammenfassung
function muster(liste) { // gleiche Bewegung über Seiten hinweg zusammenfassen
  const m = new Map();
  for (const { r, e } of liste) {
    const kurzSel = e.sel.split(' > ').slice(-2).join(' > ').replace(/:nth-of-type\(\d+\)/g, '');
    const key = [kurzSel, e.pseudo, (e.namen || []).join('|'), e.motion].join('¦');
    const x = m.get(key) || { sel: kurzSel, pseudo: e.pseudo, motion: e.motion || null, namen: e.namen, eigenschaften: e.eigenschaften, arten: e.arten, dauer_ms: e.dauer_ms, kurve: e.kurve, vorkommen: 0, seiten: [] };
    x.vorkommen++; const sa = `${r.seite} [${r.ansicht}]`; if (!x.seiten.includes(sa) && x.seiten.length < 14) x.seiten.push(sa);
    m.set(key, x);
  }
  return [...m.values()].sort((a, b) => b.vorkommen - a.vorkommen);
}
const N = ergebnisse.filter((r) => r.normal);
const summe = (f) => N.reduce((n, r) => n + f(r), 0);
const unreg = N.flatMap((r) => r.normal.unregistriert.map((e) => ({ r, e })));
const tech = N.flatMap((r) => r.normal.technik.map((t) => ({ r, e: { ...t, eigenschaften: t.eigenschaften.map((x) => `${x.eigenschaft} (${KATEGORIE_TEXT[x.kategorie] || x.kategorie})`) } })));
const R = ergebnisse.filter((r) => r.reduziert);
const F = ergebnisse.filter((r) => r.frames);
const fsum = (ans) => {
  const fs2 = F.filter((r) => !ans || (ans === 'mobil' ? ANSICHTEN[r.ansicht].isMobile : r.ansicht === ans));
  const ges = fs2.reduce((o, r) => { o.n += r.frames.scroll.intervalle || 0; o.v += Math.round((r.frames.scroll.anteil_verworfen || 0) * (r.frames.scroll.intervalle || 0)); o.s += Math.round((r.frames.scroll.anteil_ueber_50ms || 0) * (r.frames.scroll.intervalle || 0)); return o; }, { n: 0, v: 0, s: 0 });
  return { laeufe: fs2.length, intervalle: ges.n, anteil_verworfen: ges.n ? +(ges.v / ges.n).toFixed(4) : null, anteil_ueber_50ms: ges.n ? +(ges.s / ges.n).toFixed(4) : null,
    schlechteste_seite: fs2.map((r) => ({ seite: r.seite, ansicht: r.ansicht, anteil_verworfen: r.frames.scroll.anteil_verworfen })).sort((a, b) => b.anteil_verworfen - a.anteil_verworfen)[0] || null,
    einstieg_anteil_verworfen_max: Math.max(0, ...fs2.map((r) => r.frames.einstieg.anteil_verworfen || 0)) };
};
const loafBew = F.flatMap((r) => r.frames.loaf.bewegung.top.map((s) => ({ ...s, seite: r.seite, ansicht: r.ansicht })));
const zus = {
  laeufe: ergebnisse.length, fehler: ergebnisse.filter((r) => r.fehler.length).map((r) => `${r.seite} [${r.ansicht}] ${r.fehler.join(' · ')}`),
  registriert: { elemente_animiert: summe((r) => r.normal.elemente_animiert), mit_data_motion: summe((r) => r.normal.mit_data_motion), im_register: summe((r) => r.normal.im_register),
    anteil: summe((r) => r.normal.elemente_animiert) ? +(summe((r) => r.normal.im_register) / summe((r) => r.normal.elemente_animiert)).toFixed(3) : 1,
    im_register_mit_vorfahr: summe((r) => r.normal.im_register_mit_vorfahr), unregistriert_muster: muster(unreg).slice(0, 40) },
  technik: { elemente_ausserhalb_transform_opacity: tech.length, davon_layout: summe((r) => r.normal.technik_layout), muster: muster(tech).slice(0, 30) },
  // Z-09-Soll gilt für den gedrosselten Mobillauf (4× CPU); Desktop (1×) informativ
  frames_scroll: { gesamt: fsum(null), mobil: fsum('mobil'), ...Object.fromEntries(ansichten.map((a) => [a, fsum(a)])) },
  loaf: { anzahl: F.reduce((n, r) => n + r.frames.loaf.anzahl, 0), laengster_ms: Math.max(0, ...F.map((r) => r.frames.loaf.laengster_ms)), laengste_skriptdauer_ms: Math.max(0, ...F.map((r) => r.frames.loaf.laengste_skriptdauer_ms)),
    bewegung_skripte: F.reduce((n, r) => n + r.frames.loaf.bewegung.skripte, 0), bewegung_ueber_20ms: F.reduce((n, r) => n + r.frames.loaf.bewegung.ueber_20ms, 0),
    bewegung_laengste_ms: Math.max(0, ...F.map((r) => r.frames.loaf.bewegung.laengste_ms)), bewegung_top: loafBew.sort((a, b) => b.dauer_ms - a.dauer_ms).slice(0, 8) },
  reduziert: { verstoesse: R.reduce((n, r) => n + r.reduziert.verstoesse.length, 0), elemente_animiert: R.reduce((n, r) => n + r.reduziert.elemente_animiert, 0),
    muster: muster(R.flatMap((r) => r.reduziert.verstoesse.map((v) => ({ r, e: { sel: v.sel, pseudo: v.pseudo, motion: v.motion, namen: [v.grund, ...(v.namen || [])], eigenschaften: v.arten || v.eigenschaften || [], arten: v.typ } })))).slice(0, 30) },
  deklariert: { elemente_mit_transition: summe((r) => r.normal.deklariert.elemente), mit_data_motion: summe((r) => r.normal.deklariert.mit_data_motion) },
  raf_schleifen: ergebnisse.flatMap((r) => ['normal', 'reduziert'].filter((m) => r[m]?.raf_ruhe && r[m].raf_ruhe.bilder_in_ruhe >= 5 && r[m].raf_ruhe.je_bild >= RAF_SCHLEIFE_JE_BILD)
    .map((m) => ({ seite: r.seite, ansicht: r.ansicht, modus: m, je_bild: r[m].raf_ruhe.je_bild, je_s: r[m].raf_ruhe.je_s, canvas_sichtbar: r[m].canvas_sichtbar, quellen: r[m].raf_ruhe.quellen }))),
};
zus.z09 = { // Soll aus ABNAHME.md Z-09
  registriert_100: zus.registriert.anteil === 1,
  verworfene_frames_max_5_prozent: zus.frames_scroll.mobil.anteil_verworfen != null ? zus.frames_scroll.mobil.anteil_verworfen <= 0.05 : null, // mobil, 4× gedrosselt
  verworfene_frames_max_5_prozent_je_seite_mobil: F.some((r) => ANSICHTEN[r.ansicht].isMobile) ? F.filter((r) => ANSICHTEN[r.ansicht].isMobile).every((r) => r.frames.scroll.anteil_verworfen <= 0.05) : null,
  kein_loaf_bewegung_ueber_20ms: F.length ? zus.loaf.bewegung_ueber_20ms === 0 : null,
  reduziert_ohne_orts_groessenaenderung: R.length ? R.every((r) => !r.reduziert.verstoesse.some((v) => v.grund.startsWith('ortsaenderung'))) : null,
  reduziert_ohne_autoplay: R.length ? R.every((r) => !r.reduziert.verstoesse.some((v) => v.grund.startsWith('autoplay'))) : null,
};
if (gegenprobe) {
  const treffer = (r) => {
    const gr = r.reduziert ? r.reduziert.verstoesse.filter((v) => (v.namen || []).includes('bw-gegenprobe-js')).map((v) => v.grund) : null;
    const t = {
      seite: r.seite, ansicht: r.ansicht,
      unregistriert: !!r.normal?.unregistriert.some((e) => e.namen.includes('bw-gegenprobe') && !e.registriert),
      layout_eigenschaft: !!r.normal?.technik.some((x) => x.namen.includes('bw-gegenprobe') && x.eigenschaften.some((y) => y.eigenschaft === 'left' && y.layout)),
      reduziert_js_gemeldet: gr,
      loaf_bewegung_ueber_20ms: r.frames ? r.frames.loaf.bewegung.ueber_20ms : null, scroll_anteil_verworfen: r.frames ? r.frames.scroll.anteil_verworfen : null,
    };
    t.erkannt = t.unregistriert && t.layout_eigenschaft
      && (gr == null || (gr.includes('ortsaenderung') && gr.includes('autoplay/endlos')))
      && (t.loaf_bewegung_ueber_20ms == null || (t.loaf_bewegung_ueber_20ms > 0 && t.scroll_anteil_verworfen > 0.05));
    return t;
  };
  zus.gegenprobe = { eingriff: { css: GEGENPROBE_CSS, js: GEGENPROBE_JS, framelauf: GEGENPROBE_LAST + ` (per addScriptTag als ${new URL(GEGENPROBE_URL).pathname}, per page.route bedient)` },
    erwartung: 'normal: h1 unregistriert + left als Layout-Eigenschaft · reduziert: WAAPI-Verschiebung als ortsaenderung + autoplay/endlos (CSS-Variante darf vom Reset der Seite neutralisiert sein) · frames: LoAF aus Bewegungscode > 20 ms und > 5 % verworfene Frames',
    je_lauf: ergebnisse.map(treffer) };
  zus.gegenprobe.erkannt = zus.gegenprobe.je_lauf.every((t) => t.erkannt);
}

const kopf = {
  satz, base: BASE, erstellt: new Date().toISOString(),
  bedingungen: {
    einwilligung: 'abgelehnt', dpr: 1, page_clock: false, locale: 'de-DE', zeitzone: 'Europe/Berlin', farbschema: 'light', browser: `chromium ${browser.version()} (Playwright 1.56.1, headless)`,
    ansichten: Object.fromEntries(ansichten.map((a) => [a, ANSICHTEN[a]])), seiten, laeufe, gegenprobe,
    sammellauf: { reduced_motion: { normal: 'no-preference', reduziert: 'reduce' }, drosselung: 'keine', abfrage_ms: 50, ereignisse: ['animationstart', 'animationiteration', 'transitionrun', 'transitionstart'],
      skriptbewegung: 'MutationObserver style + SVG-Geometrie, ≥ 3 verschiedene Werte je Eigenschaft', raf_schleife: `≥ ${RAF_SCHLEIFE_JE_BILD} Seiten-rAF-Aufrufe je Bild im Ruhefenster (≥ 5 Bilder); mit sichtbarer Canvas = animiertes Element`, scroll: `Schritte ${SCHRITT_VH} Bildschirmhöhe, je Schritt 2 Bilder + ${VERWEIL_MS} ms`, abklingen: `Zustandsabfrage, max ${ABKLINGEN_MAX_MS} ms`, ruhefenster_ms: RUHE_MS },
    framelauf: { reduced_motion: 'no-preference', drosselung: drosselFest ? `${drosselFest}× fest` : 'mobil 4×, Desktop 1× (CDP Emulation.setCPUThrottlingRate)', scroll: `${pxJeBild} px je Bild (rAF-gekoppelt, behavior instant) + 30 Bilder Nachlauf`,
      einstieg: 'rAF ab Dokumentbeginn bis Scrollbeginn (nach load, fonts.ready, networkidle ≤ 5 s)', exklusiv: true, wiederholungen: wdh,
      verworfen: 'Intervall ≥ 2 vsync (= „> 16,7 ms“ ohne Rundungsrauschen; rAF-Zeitstempel sind auf 0,1 ms gerundet)', ueber_50ms: 'Intervall ≥ 4 vsync (> 50 ms)', z09_soll: 'mobil (4×) – Desktop 1× informativ', gl_renderer: glRenderer, leistungsbasis_ms: basisLeistung ? Math.round(basisLeistung) : null },
    loaf: { quelle: 'PerformanceObserver long-animation-frame (buffered) im Framelauf', bewegungsbezug: 'rAF-Rückruf (invoker FrameRequestCallback) · Funktionsname /anim|motion|tween|spring|scroll/ · Chunk-Inhalt: ' + SIGNATUREN.map(([n]) => n).join(', ') },
    register: REGISTER, maschine: { cpus: os.cpus().length, last_1min_start: os.loadavg()[0] }, laufzeit_s: Math.round((Date.now() - tStart) / 1000), worker,
  },
};
const ausgabe = { ...kopf, zusammenfassung: zus, ergebnisse };
const ziel = arg('aus') ? path.resolve(arg('aus')) : gegenprobe ? path.join(cacheDir, 'gegenprobe.json') : path.join(ensureDir(path.join(RELAUNCH, 'belege', satz)), 'bewegung.json');
ensureDir(path.dirname(ziel));
fs.writeFileSync(ziel, JSON.stringify(ausgabe, null, 1));
console.log(`\nbewegung: ${ergebnisse.length} Seiten×Ansichten · ${Math.round((Date.now() - tStart) / 1000)} s → ${path.relative(RELAUNCH, ziel)}`);
console.log(JSON.stringify({ registriert: `${zus.registriert.im_register}/${zus.registriert.elemente_animiert}`, technik_ausserhalb: zus.technik.elemente_ausserhalb_transform_opacity, layout: zus.technik.davon_layout,
  verworfen_scroll_mobil: zus.frames_scroll.mobil.anteil_verworfen, verworfen_scroll_gesamt: zus.frames_scroll.gesamt.anteil_verworfen, ueber_50: zus.frames_scroll.gesamt.anteil_ueber_50ms, loaf: zus.loaf.anzahl, loaf_bewegung_ueber_20: zus.loaf.bewegung_ueber_20ms,
  reduziert_verstoesse: zus.reduziert.verstoesse, fehler: zus.fehler.length, ...(gegenprobe ? { gegenprobe_erkannt: zus.gegenprobe.erkannt } : {}) }));
