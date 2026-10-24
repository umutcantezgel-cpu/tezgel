import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { introAblauf, INTRO_GRENZE, INTRO_LOGO, PHASEN, REIHEN, REIHEN_AUSSEN, SPALTEN, SPEICHER_INTRO } from '../src/lib/intro/ablauf.ts';
import { INTRO_ZIEL, KOPFSKRIPT } from '../src/lib/motion/kopfskript.ts';
import { REIHEN as SB_REIHEN, startbildReihen } from '../src/lib/motion/startbild.ts';

// Intro B-02 als Ersatz „Der erste Boden“ (KERN K-007, E-018): Ablauf als Anteile der Gesamtdauer, Schalter im Kopfskript,
// Zielmessung für das Gleiten. Zeiten in ms beziehen sich auf --intro-gesamt aus globals.css.
const GESAMT = Number(/--intro-gesamt:\s*(\d+)ms/.exec(readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8'))[1]);
const ende = (p) => p.beginn + p.dauer;

test('Intro 1: Gesamtdauer 1.600 ms als Ziel, Obergrenze 2.200 ms', () => {
  assert.equal(GESAMT, 1600);
  assert.equal(INTRO_GRENZE, 2200);
  assert.ok(GESAMT <= INTRO_GRENZE);
});

test('Intro 2: Fläche 3 × 3 im Drittelverband deckt ihre Breite in jeder Reihe ohne Lücke', () => {
  const { fliesen } = introAblauf();
  assert.equal(fliesen.length, 11);
  for (let r = 0; r < REIHEN; r++) {
    const reihe = fliesen.filter((f) => f.reihe === r).sort((a, b) => a.links - b.links);
    assert.ok(reihe[0].links <= 0, `Reihe ${r} beginnt an der linken Kante`);
    assert.ok(reihe.at(-1).links + 1 >= SPALTEN, `Reihe ${r} reicht bis zur rechten Kante`);
    for (let i = 1; i < reihe.length; i++) assert.ok(Math.abs(reihe[i].links - reihe[i - 1].links - 1) < 1e-9, 'Fliesen stoßen an der Fuge');
    assert.ok(Math.abs(reihe[0].links + (r % 3) / 3) < 1e-9, `Reihe ${r} um ${r}/3 versetzt`);
  }
});

test('Intro 3: deckende Phase höchstens 800 ms, alle Phasen innerhalb der Gesamtdauer', () => {
  const a = introAblauf();
  assert.ok(a.decken * GESAMT <= 800, `deckend ${a.decken * GESAMT} ms`);
  for (const f of a.fliesen) assert.ok(f.beginn >= 0 && ende(f) <= a.decken + 1e-9, 'Fliesen liegen, bevor die Seite frei wird');
  assert.ok(ende(a.logo) <= a.decken + 1e-9, 'Logo sitzt, bevor die Seite frei wird');
  assert.ok(a.logo.beginn > Math.min(...a.fliesen.map((f) => f.beginn)), 'Logo erst auf der entstehenden Fläche');
  for (const r of a.reihen) assert.ok(ende(r) <= 1, 'Reihen sind vor dem Ende abgezogen');
  assert.ok(ende(a.gleiten) <= 1);
  assert.ok(Math.abs(a.gleiten.dauer * GESAMT - 600) <= 1, 'Gleiten rund 600 ms');
});

test('Intro 4: Verlegen von rechts nach links, jede neue Fliese unter den gelegten (wie B-01)', () => {
  const { fliesen } = introAblauf();
  for (const a of fliesen) {
    for (const b of fliesen) {
      if (a.reihe === b.reihe && a.links > b.links) {
        assert.ok(a.beginn < b.beginn, 'rechte Fliese zuerst');
        assert.ok(a.ebene > b.ebene, 'früher gelegt liegt oben');
      }
    }
  }
  assert.equal(new Set(fliesen.map((f) => f.ebene)).size, fliesen.length, 'eindeutige Ebenen');
});

test('Intro 5: Blatt deckt über und unter der Fläche, Reihen ziehen starr nach Versatzstufe gestaffelt ab', () => {
  const { reihen, decken } = introAblauf();
  assert.equal(reihen.length, REIHEN + 2 * REIHEN_AUSSEN);
  assert.deepEqual(reihen.map((r) => r.k), Array.from({ length: reihen.length }, (_, i) => i - REIHEN_AUSSEN));
  const nachStufe = new Map();
  for (const r of reihen) {
    const s = Math.round(r.versatz * 3);
    assert.equal(s, ((r.k % 3) + 3) % 3, `Versatz der Reihe ${r.k}`);
    if (nachStufe.has(s)) assert.deepEqual(nachStufe.get(s), [r.beginn, r.dauer], 'gleiche Stufe, gleicher Takt');
    nachStufe.set(s, [r.beginn, r.dauer]);
  }
  const beginne = [0, 1, 2].map((s) => nachStufe.get(s)[0]);
  assert.ok(beginne[0] < beginne[1] && beginne[1] < beginne[2], 'Stufen setzen nacheinander ein');
  assert.equal(beginne[0], decken);
  assert.ok(Math.abs(beginne[0] - PHASEN.ziehen.beginn) < 1e-9);
});

test('Intro 6: Halbverband als Alternative bleibt gültig', () => {
  const a = introAblauf('halb');
  assert.ok(a.fliesen.length > 0);
  assert.ok(a.reihen.every((r) => r.versatz === 0 || r.versatz === 0.5));
  assert.ok(a.decken * GESAMT <= 800);
});

/** Kopfskript in einer nachgebauten Umgebung ausführen (ohne Browser). */
function umgebung({ gespeichert = null, speicherFehler = null, reduziert = false, pfad = '/' } = {}) {
  const klassen = new Set();
  const stil = new Map([['--intro-x', '1px']]);
  const lauscher = [];
  const zeitgeber = [];
  const bilder = [];
  const speicher = new Map(gespeichert ? [[SPEICHER_INTRO, gespeichert]] : []);
  const localStorage = {
    getItem: (k) => {
      if (speicherFehler === 'lesen') throw new Error('gesperrt');
      return speicher.has(k) ? speicher.get(k) : null;
    },
    setItem: (k, v) => {
      if (speicherFehler === 'schreiben') throw new Error('voll');
      speicher.set(k, v);
    },
  };
  const html = {
    classList: { add: (k) => klassen.add(k), remove: (k) => klassen.delete(k), contains: (k) => klassen.has(k) },
    style: { removeProperty: (n) => stil.delete(n), setProperty: (n, v) => stil.set(n, v) },
  };
  const fenster = {
    localStorage,
    matchMedia: () => ({ matches: !reduziert }),
    addEventListener: (name, fn, opt) => lauscher.push({ name, fn, opt }),
  };
  const geholt = [];
  class Bild {
    set src(v) {
      geholt.push(v);
    }
  }
  new Function('window', 'document', 'setTimeout', 'requestAnimationFrame', 'Image', 'location', KOPFSKRIPT)(
    fenster,
    { documentElement: html },
    (fn, ms) => zeitgeber.push({ fn, ms }),
    (fn) => bilder.push(fn),
    Bild,
    { pathname: pfad },
  );
  return { klassen, stil, lauscher, zeitgeber, bilder, speicher, geholt };
}

test('Intro 7: erster Besuch setzt k-intro und merkt sich das sofort, zweiter Besuch nicht', () => {
  const erst = umgebung();
  assert.ok(erst.klassen.has('k-intro'));
  assert.equal(erst.speicher.get(SPEICHER_INTRO), '1');
  assert.deepEqual(erst.geholt, [INTRO_LOGO], 'Logo wird sofort geholt');
  assert.ok(erst.klassen.has('k-bewegung'), 'Startklasse der Bewegung bleibt unberührt');
  assert.ok(!erst.klassen.has('k-startbild'), 'mit Intro legt das Intro die Seite frei, kein zweiter Moment');
  const wieder = umgebung({ gespeichert: '1' });
  assert.ok(!wieder.klassen.has('k-intro'));
  assert.equal(wieder.lauscher.length, 0);
  assert.equal(wieder.geholt.length, 0, 'ohne Intro kein Abruf');
  assert.ok(wieder.klassen.has('k-startbild'), 'ohne Intro legt sich das Startbild frei');
  assert.ok(!umgebung({ gespeichert: '1', reduziert: true }).klassen.has('k-startbild'), 'reduziert: Startbild sofort frei');
  // Raster an der H1 nur auf der Startseite und nur mit Intro (Sichtabnahme E2, Befund 6)
  assert.ok(erst.klassen.has('k-intro-start'));
  assert.ok(!umgebung({ pfad: '/bad' }).klassen.has('k-intro-start'));
  assert.ok(!wieder.klassen.has('k-intro-start'));
});

test('Intro 8: Fehler im Speicher heißt kein Intro, ohne den Rest des Kopfskripts aufzuhalten', () => {
  for (const speicherFehler of ['lesen', 'schreiben']) {
    const u = umgebung({ speicherFehler });
    assert.ok(!u.klassen.has('k-intro'), speicherFehler);
    assert.ok(u.klassen.has('k-bewegung'), speicherFehler);
  }
});

test('Intro 9: jede Eingabe beendet sofort (passiv, once), Ende der Schlussanimation und Obergrenze ebenso', () => {
  const u = umgebung();
  const namen = u.lauscher.filter((l) => l.name !== 'animationend');
  assert.deepEqual(namen.map((l) => l.name).sort(), ['keydown', 'pointerdown', 'scroll', 'touchstart', 'wheel']);
  for (const l of namen) assert.deepEqual(l.opt, { passive: true, once: true, capture: true });
  namen.find((l) => l.name === 'pointerdown').fn();
  assert.ok(!u.klassen.has('k-intro'), 'Tippen beendet');
  // Die Zielwerte liegen an der Logo-Fläche, nicht an html (E-034): das Ende fasst den Stil von html nicht an
  assert.equal(u.stil.get('--intro-x'), '1px', 'html-Stil unberührt');
  assert.equal(u.bilder.length, 0, 'kein Aufräumen im nächsten Bild nötig');

  const v = umgebung();
  const animEnde = v.lauscher.find((l) => l.name === 'animationend').fn;
  animEnde({ animationName: 'intro-legen' });
  assert.ok(v.klassen.has('k-intro'), 'eine Fliese allein beendet nicht');
  animEnde({ animationName: 'intro-ende' });
  assert.ok(!v.klassen.has('k-intro'));

  const w = umgebung({ reduziert: true });
  assert.ok(w.klassen.has('k-intro'), 'reduziert: Klasse für das Einblenden des Logos');
  w.lauscher.find((l) => l.name === 'animationend').fn({ animationName: 'intro-einblenden' });
  assert.ok(!w.klassen.has('k-intro'));

  const x = umgebung();
  const grenze = x.zeitgeber.find((z) => z.ms === INTRO_GRENZE);
  assert.ok(grenze, 'Obergrenze gesetzt');
  grenze.fn();
  assert.ok(!x.klassen.has('k-intro'));
});

/** Zielmessung mit nachgebauten Rechtecken; liefert die Werte an der Logo-Fläche, html darf nichts bekommen. */
function miss(kIntro, schild, kopf) {
  const stil = new Map();
  const htmlStil = new Map();
  const doc = {
    documentElement: { classList: { contains: () => kIntro }, style: { setProperty: (n, v) => htmlStil.set(n, v) } },
    querySelector: (sel) => {
      const r = sel.includes('header') ? kopf : schild;
      if (!r) return null;
      return sel.includes('header') ? { getBoundingClientRect: () => r } : { getBoundingClientRect: () => r, style: { setProperty: (n, v) => stil.set(n, v) } };
    },
  };
  new Function('document', INTRO_ZIEL)(doc);
  assert.equal(htmlStil.size, 0, 'nichts an html (E-034)');
  return stil;
}

test('Intro 10: Zielmessung legt Versatz der Mitten und Maßstab an die Logo-Fläche, ohne Intro oder Maß nichts', () => {
  const stil = miss(true, { left: 80, top: 400, width: 230, height: 72 }, { left: 16, top: 8, width: 153.6, height: 48 });
  assert.equal(stil.get('--intro-x'), `${16 + 76.8 - (80 + 115)}px`);
  assert.equal(stil.get('--intro-y'), `${8 + 24 - (400 + 36)}px`);
  assert.equal(Number(stil.get('--intro-s')), 153.6 / 230);
  assert.equal(miss(false, { left: 0, top: 0, width: 1, height: 1 }, { left: 0, top: 0, width: 1, height: 1 }).size, 0);
  assert.equal(miss(true, { left: 0, top: 0, width: 0, height: 0 }, { left: 0, top: 0, width: 1, height: 1 }).size, 0, 'verborgene Schicht');
  assert.equal(miss(true, null, { left: 0, top: 0, width: 1, height: 1 }).size, 0);
});

test('Intro 11: Zeigerwechsel in bewegung.css liegt am Ende der deckenden Phase, Abläufe nutzen nur das Token', () => {
  const css = readFileSync(new URL('../src/app/bewegung.css', import.meta.url), 'utf8');
  const ende = /@keyframes intro-ende \{([\s\S]*?)\n\}/.exec(css)[1];
  const wechsel = /(\d+)% \{\s*pointer-events: none;/.exec(ende);
  assert.ok(wechsel, 'Zeigerwechsel vorhanden');
  assert.equal(Number(wechsel[1]) / 100, introAblauf().decken);
  const regeln = css.slice(css.indexOf('/* intro (B-02'), css.indexOf('/* Reduzierte Bewegung: keine Schicht'));
  for (const m of regeln.matchAll(/animation: intro-[a-z]+ ([^;]+);/g)) {
    assert.ok(!/\d+m?s\b/.test(m[1]), `keine festen Zeiten: ${m[1]}`);
    assert.ok(m[1].includes('var(--intro-gesamt)'), `Takt aus --intro-gesamt: ${m[1]}`);
  }
});

test('Startbild 1: Belag deckt das Bild 4 : 5 und zieht in dauer-4 Reihe für Reihe ab, gestaffelt nach Versatzstufe', () => {
  const reihen = startbildReihen();
  assert.equal(reihen.length, SB_REIHEN);
  assert.ok((SB_REIHEN * 1) / 6 >= 5 / 4, 'acht Reihen zu je einem Sechstel der Breite reichen unter die Unterkante (4 : 5)');
  for (const r of reihen) {
    assert.ok(r.beginn >= 0 && r.beginn + r.dauer <= 1 + 1e-9, `Reihe ${r.k} innerhalb von dauer-4`);
    assert.equal(Math.round(r.versatz * 3), r.k % 3);
  }
  const b = [0, 1, 2].map((s) => reihen.find((r) => r.k % 3 === s).beginn);
  assert.ok(b[0] === 0 && b[0] < b[1] && b[1] < b[2], 'Stufen setzen nacheinander ein, die erste sofort');
  assert.ok(new Set(reihen.map((r) => r.dauer)).size === 1, 'alle Reihen gleich schnell (starr, kein Überholen)');
});
