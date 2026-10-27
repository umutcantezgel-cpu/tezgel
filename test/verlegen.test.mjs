import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import {
  verlegeRaster,
  fliesenmass,
  zeitplan,
  ziehStrecke,
  stueckplan,
  wechselDauer,
  deckung,
  GESAMT_ERSTER,
  GESAMT_FOLGE,
  logoMass,
  logoHalt,
  logoHaltVerlauf,
  LOGO_GROESSE_START,
  LOGO_AUFKLATSCHEN,
  LOGO_STEHEN,
  LOGO_WEG, LOGO_INHALT_MITTE } from '../src/lib/verlegen/raster.ts';
import { pruefeKlick } from '../src/lib/verlegen/linkfilter.ts';
import { schritt, RUHE, LASER_NACH, WARTEN_HOECHSTENS } from '../src/lib/verlegen/automat.ts';

// Logik des Seitenwechsels B-01 „Verlegen“ gegen die Spezifikation (KERN K-007, Abschnitt B-01; E-017, E-043, E-047;
// Auftrag Abschnitt 9; Ablauf nach Wunsch des Auftraggebers: die ganze Seite Fliese für Fliese von rechts nach links
// belegen, dann die Fliesen in derselben Richtung einzeln wieder abnehmen). Fassung v3 (E-047, Auftraggeber: „nicht so
// verpixelt“, Logo auf die Wand geklatscht, „wirklich Stück für Stück“, „muss nicht so schnell gehen“): größere Fliesen,
// 2,4 s und 1,8 s, jede Fliese beginnt allein, Logo-Phase mit Mindestzeit. Die Erwartungen stammen aus dem Wortlaut der
// Spezifikation, nicht aus der Umsetzung.

// Gerätegrößen [Breite, Höhe] aus _werkstatt/HAUPTANSICHTEN.json (Abschnitt „geraete“), hier fest eingetragen.
const GERAETE = {
  m360: [360, 740],
  m390: [390, 844],
  m430: [430, 932],
  q844: [844, 390],
  t768: [768, 1024],
  t1024: [1024, 768],
  d1280: [1280, 800],
  d1440: [1440, 900],
  d1920: [1920, 1080],
  d2560: [2560, 1440],
};

// Raster ---------------------------------------------------------------------

test('Raster 1: höchstens 80 Fliesen gleichzeitig auf allen zehn Gerätegrößen', () => {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const { fliesen } = verlegeRaster(breite, hoehe);
    assert.ok(fliesen.length >= 1, `${name}: keine Fliese`);
    assert.ok(fliesen.length <= 80, `${name}: ${fliesen.length} Fliesen, höchstens 80 erlaubt`);
  }
});

test('Raster 2: Fliese 2:1 quer, Länge und Höhe in ganzen Pixeln, Länge = 2 × Höhe, Positionen ganzzahlig', () => {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const { mass, fliesen } = verlegeRaster(breite, hoehe);
    assert.ok(Number.isInteger(mass.laenge) && Number.isInteger(mass.hoehe), `${name}: Maß nicht ganzzahlig`);
    assert.equal(mass.laenge, 2 * mass.hoehe, `${name}: Länge ist nicht das Doppelte der Höhe`);
    for (const f of fliesen) {
      assert.ok(Number.isInteger(f.x) && Number.isInteger(f.y), `${name}: Position ${f.x}/${f.y} nicht ganzzahlig`);
    }
  }
});

test('Raster 3: Fuge ist 1 % der kurzen Seite und mindestens 2 px', () => {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const { mass } = verlegeRaster(breite, hoehe);
    assert.ok(mass.fuge >= 2, `${name}: Fuge ${mass.fuge} px unter 2 px`);
    assert.ok(mass.fuge >= mass.hoehe * 0.01, `${name}: Fuge unter 1 % der kurzen Seite`);
  }
});

test('Raster 4: sobald 1 % der kurzen Seite über 2 px liegt, ist die Fuge genau 1 % (breite Ansicht als Formelprobe)', () => {
  // Außerhalb der Gerätegrößen: nur die Formel für die Fuge wird geprüft.
  const m = fliesenmass(4000, 300);
  assert.ok(m.hoehe * 0.01 > 2, 'Formelprobe muss über 2 px liegen');
  assert.equal(m.fuge, m.hoehe * 0.01);
});

test('Raster 5: die Fliesen decken jede Ansicht lückenlos (die Fuge gehört zum Raster)', () => {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const { mass, fliesen } = verlegeRaster(breite, hoehe);
    const fehlend = [];
    for (const py of gitterpunkte(hoehe)) {
      for (const px of gitterpunkte(breite)) {
        const gedeckt = fliesen.some(
          (f) => px >= f.x && px < f.x + mass.laenge && py >= f.y && py < f.y + mass.hoehe,
        );
        if (!gedeckt) fehlend.push([px, py]);
      }
    }
    assert.equal(fehlend.length, 0, `${name}: nicht gedeckte Punkte, erster: ${JSON.stringify(fehlend[0])}`);
  }
});

/** Gitterpunkte etwa alle 7 px über eine Achse, dazu der letzte Pixel. */
function gitterpunkte(maß) {
  const liste = [];
  for (let v = 0; v < maß; v += 7) liste.push(v);
  liste.push(maß - 1);
  return liste;
}

test('Raster 6: Drittelverband: Reihen r, r+1, r+2 versetzt um 0, ⅓, ⅔ der Länge (gerundet), Muster alle drei Reihen', () => {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const { mass, fliesen } = verlegeRaster(breite, hoehe);
    const reihen = [...new Set(fliesen.map((f) => f.reihe))];
    for (const r of reihen) {
      const xs = fliesen.filter((f) => f.reihe === r).map((f) => f.x).sort((a, b) => a - b);
      const soll = Math.round((mass.laenge * (r % 3)) / 3);
      assert.equal(0 - xs[0], soll, `${name}, Reihe ${r}: Versatz`);
      for (let i = 1; i < xs.length; i++) {
        assert.equal(xs[i] - xs[i - 1], mass.laenge, `${name}, Reihe ${r}: Lücke in der Reihe`);
      }
    }
  }
});

/** Fliesen, die in einer Reihe der Ansicht zu sehen sind (ganz oder angeschnitten), je Reihe. */
function sichtbarJeReihe(breite, hoehe) {
  const { mass, fliesen } = verlegeRaster(breite, hoehe);
  const reihen = new Map();
  for (const f of fliesen) {
    if (f.x < breite && f.x + mass.laenge > 0 && f.y < hoehe) reihen.set(f.reihe, (reihen.get(f.reihe) ?? 0) + 1);
  }
  return [...reihen.values()];
}
const mittel = (a) => a.reduce((s, x) => s + x, 0) / a.length;

test('Raster 7: große Fliesen (E-047): sichtbar etwa 3 je Reihe bei 390 px und 6 bis 7 bei 1440 px', () => {
  const schmal = sichtbarJeReihe(390, 844);
  const breit = sichtbarJeReihe(1440, 900);
  assert.ok(mittel(schmal) >= 2.5 && mittel(schmal) <= 3.5 && Math.max(...schmal) <= 4, `390 px: ${schmal.join(', ')} je Reihe`);
  assert.ok(mittel(breit) >= 6 && mittel(breit) <= 7 && Math.min(...breit) >= 6 && Math.max(...breit) <= 7, `1440 px: ${breit.join(', ')} je Reihe`);
});

test('Raster 8: deutlich weniger Fliesen als in E-043 (3 Fliesenlängen je Reihe bei 390 px, 8 bei 1440 px; 48 und 72 Fliesen)', () => {
  const schmal = verlegeRaster(390, 844);
  const breit = verlegeRaster(1440, 900);
  assert.ok(390 / schmal.mass.laenge <= 2.5, `390 px: ${(390 / schmal.mass.laenge).toFixed(2)} Fliesenlängen je Reihe`);
  assert.ok(1440 / breit.mass.laenge <= 6.5, `1440 px: ${(1440 / breit.mass.laenge).toFixed(2)} Fliesenlängen je Reihe`);
  assert.ok(schmal.fliesen.length <= 0.75 * 48, `390 px: ${schmal.fliesen.length} Fliesen`);
  assert.ok(breit.fliesen.length <= 0.8 * 72, `1440 px: ${breit.fliesen.length} Fliesen`);
});

test('Raster 9: Fuge schmal: auf allen Geräten höchstens 2,5 px (bei großen Fliesen bleibt sie fein)', () => {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const { mass } = verlegeRaster(breite, hoehe);
    assert.ok(mass.fuge <= 2.5, `${name}: Fuge ${mass.fuge} px`);
  }
});

// Deckung (Gegenprüfung E3-B01-FIX): Wächst die Ansicht beim Legen, wird nur neu verlegt, wenn sie über die Fläche hinauswächst,
// die die Fliesen decken. Im Drittelverband ragen die Reihen über Rand und Unterkante hinaus.

test('Raster 10: deckung: der Drittelverband ragt über den Rand, die Deckung reicht auf allen zehn Gerätegrößen mindestens bis zur Ansicht; ohne Fliesen 0 × 0', () => {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const { mass, fliesen } = verlegeRaster(breite, hoehe);
    const d = deckung(fliesen, mass.fuge);
    assert.ok(d.breite >= breite, `${name}: Deckung ${d.breite} px schmaler als die Ansicht (${breite} px)`);
    assert.ok(d.hoehe >= hoehe, `${name}: Deckung ${d.hoehe} px niedriger als die Ansicht (${hoehe} px)`);
  }
  assert.deepEqual(deckung([], 0), { breite: 0, hoehe: 0 });
});

// Befund E3-B01-FIX-2 (F1, behoben): deckung() nahm als Breite das Ende der längsten Reihe; im Drittelverband endet jede
// dritte Reihe früher (1440 × 900: Reihe 0 bei 1440 px, deckung meldete 1598 px). Wurde das Fenster beim Legen auf 1500 px
// verbreitert, wurde nicht neu verlegt, und in jeder dritten Reihe blieb rechts ein Streifen von 60 px offen.
test('Raster 11: deckung meint die Fläche, die wirklich gedeckt ist: jeder Punkt innerhalb liegt auf einer Fliese (Fuge eingeschlossen)', () => {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const { mass, fliesen } = verlegeRaster(breite, hoehe);
    const d = deckung(fliesen, mass.fuge);
    const fehlend = [];
    for (const py of gitterpunkte(Math.floor(d.hoehe))) {
      for (const px of gitterpunkte(Math.floor(d.breite))) {
        if (!fliesen.some((f) => px >= f.x && px < f.x + mass.laenge && py >= f.y && py < f.y + mass.hoehe)) fehlend.push([px, py]);
      }
    }
    assert.equal(fehlend.length, 0, `${name}: Deckung ${d.breite} × ${d.hoehe}, nicht gedeckt z. B. ${JSON.stringify(fehlend[0])}`);
  }
});

// Zeitplan -------------------------------------------------------------------

// Zeitplan (E-017): Verlegen und reihenweises Weiterziehen; seit E-043 die Grundlage von Intro (B-02) und Startbild, B-01
// nutzt den Stückplan (unten). Die Tests sichern den gemeinsamen Zeitplan weiter ab.

/** Alle Kombinationen aus Gerät, Gesamtdauer (ms) und Richtung. */
function alleFaelleZeitplan(fn) {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const { mass, fliesen } = verlegeRaster(breite, hoehe);
    for (const gesamt of [1200, 900]) {
      for (const richtung of ['vor', 'zurueck']) {
        const takte = zeitplan(fliesen, mass, breite, gesamt, richtung);
        fn({ name, breite, mass, fliesen, takte, gesamt, richtung });
      }
    }
  }
}

test('Zeitplan 1 (Intro, Startbild): Verlegen beginnt nicht vor dem Phasenstart und endet spätestens bei 45 % der Gesamtdauer', () => {
  alleFaelleZeitplan(({ name, takte, gesamt, richtung }) => {
    for (const t of takte) {
      const fall = `${name}, ${richtung}, ${gesamt} ms`;
      assert.ok(t.legenBeginn >= 0, `${fall}: Verlegen beginnt vor 0`);
      assert.ok(t.legenBeginn + t.legenDauer <= 0.45 * gesamt + 1e-9, `${fall}: Verlegen endet bei ${t.legenBeginn + t.legenDauer} ms`);
    }
  });
});

test('Zeitplan 2 (Intro, Startbild): Weiterziehen beginnt nicht vor dem Phasenstart und endet spätestens bei 40 % der Gesamtdauer', () => {
  alleFaelleZeitplan(({ name, takte, gesamt, richtung }) => {
    for (const t of takte) {
      const fall = `${name}, ${richtung}, ${gesamt} ms`;
      assert.ok(t.ziehenBeginn >= 0, `${fall}: Weiterziehen beginnt vor 0`);
      assert.ok(t.ziehenBeginn + t.ziehenDauer <= 0.4 * gesamt + 1e-9, `${fall}: Weiterziehen endet bei ${t.ziehenBeginn + t.ziehenDauer} ms`);
    }
  });
});

test('Zeitplan 3 (Intro, Startbild): beim Verlegen beginnt eine Fliese mit größerem rechten Rand (vor) bzw. kleinerem linken Rand (zurueck, gespiegelt) nie später als eine in derselben Reihe', () => {
  alleFaelleZeitplan(({ name, fliesen, takte, gesamt, richtung }) => {
    for (let i = 0; i < fliesen.length; i++) {
      for (let j = 0; j < fliesen.length; j++) {
        const a = fliesen[i];
        const b = fliesen[j];
        if (a.reihe !== b.reihe) continue;
        const naeher = richtung === 'vor' ? a.x + a.breite > b.x + b.breite : a.x < b.x;
        if (!naeher) continue;
        assert.ok(
          takte[i].legenBeginn <= takte[j].legenBeginn,
          `${name}, ${richtung}, ${gesamt} ms: Fliese bei x=${a.x} beginnt nach x=${b.x} derselben Reihe`,
        );
      }
    }
  });
});

test('Zeitplan 4 (Intro, Startbild): früher gelegte Fliesen liegen in der Stapelreihenfolge höher', () => {
  alleFaelleZeitplan(({ name, takte, gesamt, richtung }) => {
    for (let i = 0; i < takte.length; i++) {
      for (let j = 0; j < takte.length; j++) {
        if (takte[i].legenBeginn < takte[j].legenBeginn) {
          assert.ok(
            takte[i].ebene > takte[j].ebene,
            `${name}, ${richtung}, ${gesamt} ms: früher gelegte Fliese ${i} liegt nicht höher`,
          );
        }
      }
    }
  });
});

test('Zeitplan 5 (Intro, Startbild): beim Weiterziehen haben alle Fliesen einer Reihe denselben Beginn und dieselbe Dauer (kein Überholen)', () => {
  alleFaelleZeitplan(({ name, fliesen, takte, gesamt, richtung }) => {
    const erste = new Map();
    fliesen.forEach((f, i) => {
      if (!erste.has(f.reihe)) {
        erste.set(f.reihe, takte[i]);
        return;
      }
      const soll = erste.get(f.reihe);
      const fall = `${name}, ${richtung}, ${gesamt} ms, Reihe ${f.reihe}`;
      assert.equal(takte[i].ziehenBeginn, soll.ziehenBeginn, `${fall}: unterschiedlicher Beginn`);
      assert.equal(takte[i].ziehenDauer, soll.ziehenDauer, `${fall}: unterschiedliche Dauer`);
    });
  });
});

test('Zeitplan 6 (Intro, Startbild): beim Weiterziehen verlässt jede Fliese das Bild nach links', () => {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const { mass, fliesen } = verlegeRaster(breite, hoehe);
    const strecke = ziehStrecke(mass, breite);
    for (const f of fliesen) {
      assert.ok(f.x + f.breite - strecke <= 0, `${name}: Fliese bei x=${f.x} bleibt nach dem Weiterziehen im Bild`);
    }
  }
});

test('Zeitplan 7 (Intro, Startbild): Reihen setzen nach ihrer Versatzstufe ein, je Stufe gleicher Beginn, Spanne 15 % der Weiterziehen-Phase (40 %)', () => {
  alleFaelleZeitplan(({ name, fliesen, takte, gesamt, richtung }) => {
    const beginn = new Map();
    fliesen.forEach((f, i) => {
      const stufe = f.reihe % 3;
      if (!beginn.has(stufe)) {
        beginn.set(stufe, takte[i].ziehenBeginn);
        return;
      }
      assert.equal(takte[i].ziehenBeginn, beginn.get(stufe), `${name}, ${richtung}, ${gesamt} ms: Reihen gleicher Stufe ${stufe} setzen versetzt ein`);
    });
    assert.equal(beginn.size, 3, `${name}: ${beginn.size} Versatzstufen statt 3`);
    const werte = [...beginn.values()];
    const spanne = Math.max(...werte) - Math.min(...werte);
    assert.ok(Math.abs(spanne - 0.15 * 0.4 * gesamt) < 1e-9, `${name}, ${richtung}, ${gesamt} ms: Spanne ${spanne} ms`);
  });
});

// Stückplan (B-01, E-043) ------------------------------------------------------------------------------------------------
// Wunsch des Auftraggebers: Die ganze Seite wird Stück für Stück gefliest, von rechts nach links, jede Fliese einzeln
// animiert (tak, tak, tak); am Ende werden die Fliesen von rechts nach links Stück für Stück wieder abgenommen und
// verschwinden im Hintergrund; komplett neutral. Gewählte Dauer seit E-047: 2,4 s, danach 1,8 s (Belegen plus Abnehmen;
// vorher 1,8 s und 1,4 s), Zurück und Vor 70 %.

/** Alle Kombinationen aus Gerät, Gesamtdauer (ms) und Richtung: vor (Klick) und zurueck (Zurück und Vor). */
function alleFaelle(fn) {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const { mass, fliesen } = verlegeRaster(breite, hoehe);
    for (const gesamt of [2400, 1800, 1680, 1260]) {
      for (const richtung of ['vor', 'zurueck']) {
        const takte = stueckplan(fliesen, mass, breite, gesamt, richtung);
        fn({ name, breite, mass, fliesen, takte, gesamt, richtung, spalten: spaltenVon(fliesen, mass, breite, richtung), fall: `${name}, ${richtung}, ${gesamt} ms` });
      }
    }
  }
}

/** Spalte ab der Startkante (vor: rechts, zurueck: links), hier unabhängig von der Umsetzung aus der Lage der Fliese:
 *  Abstand der Startkante zur nahen Kante der Fliese, in ganzen Fliesenlängen ab der nächstgelegenen Fliese. */
function spaltenVon(fliesen, mass, breite, richtung) {
  const abstand = fliesen.map((f) => (richtung === 'vor' ? breite - (f.x + mass.laenge) : f.x));
  const min = Math.min(...abstand);
  return abstand.map((a) => Math.floor((a - min) / mass.laenge + 1e-6));
}

/** Die Fliese liegt an der Kante, an der das Legen beginnt (vor: rechts, zurueck: links), bzw. an der gegenüberliegenden. */
const anStartkante = (f, mass, breite, richtung) => (richtung === 'vor' ? f.x + mass.laenge >= breite : f.x <= 0);
const anEndkante = (f, mass, breite, richtung) => anStartkante(f, mass, breite, richtung === 'vor' ? 'zurueck' : 'vor');
const ende = (t, feld) => t[`${feld}Beginn`] + t[`${feld}Dauer`];

test('Stückplan 1: Belegen liegt in der ersten Hälfte der Gesamtdauer und füllt sie (letzte Fliese landet nach mindestens 45 %)', () => {
  alleFaelle(({ fall, takte, gesamt }) => {
    for (const t of takte) {
      assert.ok(t.legenBeginn >= 0, `${fall}: Belegen beginnt vor 0`);
      assert.ok(ende(t, 'legen') <= 0.5 * gesamt + 1e-9, `${fall}: Belegen endet bei ${ende(t, 'legen')} ms`);
    }
    const letzte = Math.max(...takte.map((t) => ende(t, 'legen')));
    assert.ok(letzte >= 0.45 * gesamt, `${fall}: Belegen schon nach ${letzte} ms fertig`);
  });
});

test('Stückplan 2: Abnehmen liegt in der zweiten Hälfte der Gesamtdauer und füllt sie (letzte Fliese weg nach mindestens 45 %)', () => {
  alleFaelle(({ fall, takte, gesamt }) => {
    for (const t of takte) {
      assert.ok(t.abnehmenBeginn >= 0, `${fall}: Abnehmen beginnt vor 0`);
      assert.ok(ende(t, 'abnehmen') <= 0.5 * gesamt + 1e-9, `${fall}: Abnehmen endet bei ${ende(t, 'abnehmen')} ms`);
    }
    const letzte = Math.max(...takte.map((t) => ende(t, 'abnehmen')));
    assert.ok(letzte >= 0.45 * gesamt, `${fall}: Abnehmen schon nach ${letzte} ms fertig`);
  });
});

test('Stückplan 3: von rechts nach links (vor) bzw. gespiegelt (zurueck) Spalte für Spalte: jede Fliese einer Spalte beginnt vor jeder Fliese der nächsten, beim Legen wie beim Abnehmen', () => {
  alleFaelle(({ fall, takte, spalten }) => {
    for (const feld of ['legenBeginn', 'abnehmenBeginn']) {
      for (let i = 0; i < takte.length; i++) {
        for (let j = 0; j < takte.length; j++) {
          if (spalten[i] < spalten[j]) {
            assert.ok(takte[i][feld] < takte[j][feld], `${fall}: ${feld} Spalte ${spalten[i]} nicht vor Spalte ${spalten[j]}`);
          }
        }
      }
    }
  });
});

test('Stückplan 4: tak, tak, tak: zwischen den Anfängen zweier Spalten liegen mindestens 50 ms (höchstens 20 Schläge je Sekunde)', () => {
  alleFaelle(({ fall, takte, spalten }) => {
    const anfang = new Map();
    takte.forEach((t, i) => anfang.set(spalten[i], Math.min(anfang.get(spalten[i]) ?? Infinity, t.legenBeginn)));
    const werte = [...anfang.entries()].sort((a, b) => a[0] - b[0]).map(([, w]) => w);
    for (let k = 1; k < werte.length; k++) {
      assert.ok(werte[k] - werte[k - 1] >= 50, `${fall}: Spalte ${k} beginnt ${werte[k] - werte[k - 1]} ms nach Spalte ${k - 1}`);
    }
  });
});

test('Stückplan 5: jede Fliese einzeln: in einer Spalte von oben nach unten nacheinander, und wenn die übernächste Spalte beginnt, ist jede Fliese gelandet (kein Wischen)', () => {
  alleFaelle(({ fall, fliesen, takte, spalten }) => {
    const anfang = new Map();
    takte.forEach((t, i) => anfang.set(spalten[i], Math.min(anfang.get(spalten[i]) ?? Infinity, t.legenBeginn)));
    for (let i = 0; i < takte.length; i++) {
      for (let j = 0; j < takte.length; j++) {
        if (spalten[i] === spalten[j] && fliesen[i].reihe < fliesen[j].reihe) {
          assert.ok(takte[i].legenBeginn < takte[j].legenBeginn, `${fall}: Spalte ${spalten[i]}: Reihe ${fliesen[i].reihe} nicht vor Reihe ${fliesen[j].reihe}`);
        }
      }
      const uebernaechste = anfang.get(spalten[i] + 2);
      if (uebernaechste !== undefined) {
        assert.ok(ende(takte[i], 'legen') <= uebernaechste + 1e-9, `${fall}: Fliese in Spalte ${spalten[i]} fliegt noch, wenn Spalte ${spalten[i] + 2} beginnt`);
      }
      // auch das Abnehmen einzeln: jede Fliese ist weg, bevor Spalte k + 3 abgenommen wird
      const ab3 = takte.filter((_, j) => spalten[j] === spalten[i] + 3).map((t) => t.abnehmenBeginn);
      if (ab3.length) {
        assert.ok(ende(takte[i], 'abnehmen') <= Math.min(...ab3) + 1e-9, `${fall}: Fliese in Spalte ${spalten[i]} weicht noch, wenn Spalte ${spalten[i] + 3} abgenommen wird`);
      }
    }
  });
});

test('Stückplan 6: die ganze Ansicht wird von der Startkante her belegt: zuerst eine Fliese an der Startkante, zuletzt eine an der gegenüberliegenden Kante', () => {
  alleFaelle(({ fall, fliesen, takte, mass, breite, richtung }) => {
    const beginn = takte.map((t) => t.legenBeginn);
    const erste = fliesen[beginn.indexOf(Math.min(...beginn))];
    const letzte = fliesen[beginn.indexOf(Math.max(...beginn))];
    assert.ok(anStartkante(erste, mass, breite, richtung), `${fall}: erste Fliese bei x=${erste.x} liegt nicht an der Startkante`);
    assert.ok(anEndkante(letzte, mass, breite, richtung), `${fall}: letzte Fliese bei x=${letzte.x} liegt nicht an der Endkante`);
  });
});

test('Stückplan 7: später gelegte Fliesen liegen höher (Flugschatten auf den gelegten), abgenommen wird in derselben Reihenfolge', () => {
  alleFaelle(({ fall, takte }) => {
    for (let i = 0; i < takte.length; i++) {
      for (let j = 0; j < takte.length; j++) {
        if (takte[i].legenBeginn > takte[j].legenBeginn) {
          assert.ok(takte[i].ebene > takte[j].ebene, `${fall}: später gelegte Fliese ${i} liegt nicht höher als ${j}`);
          assert.ok(takte[i].abnehmenBeginn > takte[j].abnehmenBeginn, `${fall}: Fliese ${i} wird später gelegt, aber nicht später abgenommen als ${j}`);
        }
      }
    }
  });
});

test('Stückplan 8: Dauer des Wechsels (Belegen plus Abnehmen, E-047): 2400 ms beim ersten, 1800 ms ab dem zweiten, Zurück 70 % davon, so auch in Konstanten und Tokens', () => {
  assert.equal(GESAMT_ERSTER, 2400);
  assert.equal(GESAMT_FOLGE, 1800);
  assert.equal(wechselDauer(GESAMT_ERSTER, GESAMT_FOLGE, false, 'vor'), 2400);
  assert.equal(wechselDauer(GESAMT_ERSTER, GESAMT_FOLGE, true, 'vor'), 1800);
  assert.equal(wechselDauer(GESAMT_ERSTER, GESAMT_FOLGE, false, 'zurueck'), 1680);
  assert.equal(wechselDauer(GESAMT_ERSTER, GESAMT_FOLGE, true, 'zurueck'), 1260);
  const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
  assert.match(css, new RegExp(`--verlegen-gesamt:\\s*${GESAMT_ERSTER}ms;`));
  assert.match(css, new RegExp(`--verlegen-gesamt-folge:\\s*${GESAMT_FOLGE}ms;`));
});

/** sRGB-Hex einer OKLCH-Farbe (L in Prozent, C, h in Grad), auf 8 Bit gerundet wie im Browser. */
function oklchZuHex([l, c, h]) {
  const [L, a, b] = [l / 100, c * Math.cos((h * Math.PI) / 180), c * Math.sin((h * Math.PI) / 180)];
  const [x, y, z] = [L + 0.3963377774 * a + 0.2158037573 * b, L - 0.1055613458 * a - 0.0638541728 * b, L - 0.0894841775 * a - 1.291485548 * b].map((v) => v ** 3);
  const rgb = [
    4.0767416621 * x - 3.3077115913 * y + 0.2309699292 * z,
    -1.2684380046 * x + 2.6097574011 * y - 0.3413193965 * z,
    -0.0041960863 * x - 0.7034186147 * y + 1.707614701 * z,
  ].map((v) => (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055));
  return `#${rgb.map((v) => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, '0')).join('')}`.toUpperCase();
}

test('Stückplan 9: neutral: Kalk unbunt (Buntheit unter 0,003), Fliese und Fuge unter 0,01, themeColor gleich Kalk, Wartelinie im Seitenwechsel in strich statt Laserrot', () => {
  const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
  // DS v4: Rollen sind Verweise auf OKLCH-Stufen (K-005); der Verweis wird bis zur Stufe aufgelöst
  const farbe = (name) => {
    const wert = css.match(new RegExp(`--color-${name}:\\s*([^;]+);`))?.[1].trim();
    const verweis = wert?.match(/^var\(--color-([\w-]+)\)$/)?.[1];
    if (verweis) return farbe(verweis);
    return wert?.match(/^oklch\(([\d.]+)%\s+([\d.]+)\s+([\d.]+)\)$/)?.slice(1).map(Number);
  };
  const kalk = farbe('kalk');
  assert.ok(kalk, 'Kalk in globals.css');
  assert.ok(kalk[1] < 0.003, `Kalk: Buntheit ${kalk[1]}`);
  for (const name of ['fliese', 'fuge']) assert.ok(farbe(name)[1] < 0.01, `${name}: Buntheit ${farbe(name)[1]}`);
  const dokument = readFileSync(new URL('../src/app/(bestand)/_dokument.tsx', import.meta.url), 'utf8');
  assert.equal(dokument.match(/themeColor:\s*'(#[0-9A-Fa-f]{6})'/)?.[1].toUpperCase(), oklchZuHex(kalk));
  const bewegung = readFileSync(new URL('../src/app/bewegung.css', import.meta.url), 'utf8');
  const linie = bewegung.match(/\.verlegen-laser\s*\{[^}]*\}/)?.[0] ?? '';
  assert.match(linie, /background-color:\s*var\(--color-strich\)/);
});

test('Stückplan 10: wirklich Stück für Stück (E-047): jede Fliese beginnt allein, mindestens 10 ms nach der vorigen, in gleichem Takt; höchstens 6 Fliesen zugleich in der Luft (keine Welle)', () => {
  alleFaelle(({ fall, takte, spalten }) => {
    const anfaenge = takte.map((t) => t.legenBeginn).sort((a, b) => a - b);
    const abstaende = anfaenge.slice(1).map((a, i) => a - anfaenge[i]);
    const kleinster = Math.min(...abstaende);
    assert.ok(kleinster >= 10, `${fall}: zwei Fliesen beginnen ${kleinster.toFixed(1)} ms nacheinander`);
    // gleicher Takt: jeder Abstand ist ein ganzes Vielfaches des kleinsten (Lücken nur, wo am Rand einer Spalte Reihen fehlen)
    for (const a of abstaende) {
      const vielfaches = a / kleinster;
      assert.ok(Math.abs(vielfaches - Math.round(vielfaches)) < 1e-6, `${fall}: Abstand ${a.toFixed(2)} ms ist kein Vielfaches von ${kleinster.toFixed(2)} ms`);
    }
    // in einer vollen Spalte (eine Fliese je Reihe) liegen die Fliesen im kleinsten Abstand, auch von Spalte zu Spalte
    assert.ok(abstaende.filter((a) => Math.abs(a - kleinster) < 1e-6).length >= 0.6 * abstaende.length, `${fall}: Takt ungleichmäßig`);
    let luft = 0;
    for (const s of anfaenge) luft = Math.max(luft, takte.filter((t) => t.legenBeginn <= s && t.legenBeginn + t.legenDauer > s).length);
    assert.ok(luft <= 6, `${fall}: ${luft} Fliesen zugleich in der Luft`);
    assert.ok(new Set(spalten).size >= 3, `${fall}: weniger als drei Spalten`);
  });
});

// Linkfilter -----------------------------------------------------------------

const HIER = 'https://tezgel.de/bad';

/** Klick auf einen internen Link mit Vorgabe, sonst ein normaler Klick, der verlegt. */
function klick(ueberschreibe = {}) {
  return {
    taste: 0,
    zusatztaste: false,
    bereitsVerhindert: false,
    ziel: 'https://tezgel.de/bad/badsanierung',
    hier: HIER,
    target: null,
    download: false,
    keinVerlegen: false,
    ...ueberschreibe,
  };
}

test('Linkfilter 1: Zusatztaste (Strg, Umschalt, Befehl) öffnet ohne Fliesen → zusatztaste', () => {
  assert.equal(pruefeKlick(klick({ zusatztaste: true })), 'zusatztaste');
});

test('Linkfilter 2: andere Maustaste (Mitte, rechts) → taste', () => {
  assert.equal(pruefeKlick(klick({ taste: 1 })), 'taste');
  assert.equal(pruefeKlick(klick({ taste: 2 })), 'taste');
});

test('Linkfilter 3: target außer _self → target; target _self verlegt', () => {
  assert.equal(pruefeKlick(klick({ target: '_blank' })), 'target');
  assert.equal(pruefeKlick(klick({ target: '_self' })), 'verlegen');
});

test('Linkfilter 4: download → download', () => {
  assert.equal(pruefeKlick(klick({ download: true })), 'download');
});

test('Linkfilter 5: data-kein-verlegen → kein-verlegen', () => {
  assert.equal(pruefeKlick(klick({ keinVerlegen: true })), 'kein-verlegen');
});

test('Linkfilter 6: tel: und mailto: → protokoll', () => {
  assert.equal(pruefeKlick(klick({ ziel: 'tel:+4900000000' })), 'protokoll');
  assert.equal(pruefeKlick(klick({ ziel: 'mailto:kontakt@example.org' })), 'protokoll');
});

test('Linkfilter 7: WhatsApp und andere fremde Hosts → extern', () => {
  assert.equal(pruefeKlick(klick({ ziel: 'https://wa.me/4900000000?text=Hallo' })), 'extern');
  assert.equal(pruefeKlick(klick({ ziel: 'https://example.org/bad' })), 'extern');
});

test('Linkfilter 8: gleicher Pfad (Anker, Suchparameter) → gleiche-seite', () => {
  assert.equal(pruefeKlick(klick({ ziel: 'https://tezgel.de/bad#kosten' })), 'gleiche-seite');
  assert.equal(pruefeKlick(klick({ ziel: 'https://tezgel.de/bad?filter=dusche' })), 'gleiche-seite');
});

test('Linkfilter 9: Dateien wie PDF → datei', () => {
  assert.equal(pruefeKlick(klick({ ziel: 'https://tezgel.de/downloads/merkblatt.pdf' })), 'datei');
});

test('Linkfilter 10: bereits verhinderter Klick → verhindert', () => {
  assert.equal(pruefeKlick(klick({ bereitsVerhindert: true })), 'verhindert');
});

test('Linkfilter 11: zwei gültige interne Links auf einen anderen Pfad, mit und ohne Suchparameter und Anker → verlegen', () => {
  assert.equal(pruefeKlick(klick({ ziel: 'https://tezgel.de/bad/badsanierung' })), 'verlegen');
  assert.equal(pruefeKlick(klick({ ziel: 'https://tezgel.de/bad/badsanierung?quelle=menue#kosten' })), 'verlegen');
});

test('Linkfilter 12: ungültige Adresse → ungueltig', () => {
  assert.equal(pruefeKlick(klick({ ziel: 'http://[' })), 'ungueltig');
});

test('Linkfilter 13: eigener Übergang (Plan-Morph, data-uebergang) und möglich → eigener-uebergang (E-037)', () => {
  assert.equal(pruefeKlick(klick({ ziel: 'https://tezgel.de/leistungen/bad', hier: 'https://tezgel.de/leistungen', eigenerUebergang: true })), 'eigener-uebergang');
});

test('Linkfilter 14: alle anderen Gründe gehen dem eigenen Übergang vor', () => {
  const mit = (u) => pruefeKlick(klick({ eigenerUebergang: true, ...u }));
  assert.equal(mit({ zusatztaste: true }), 'zusatztaste');
  assert.equal(mit({ taste: 1 }), 'taste');
  assert.equal(mit({ target: '_blank' }), 'target');
  assert.equal(mit({ download: true }), 'download');
  assert.equal(mit({ keinVerlegen: true }), 'kein-verlegen');
  assert.equal(mit({ ziel: 'https://wa.me/49123' }), 'extern');
  assert.equal(mit({ ziel: HIER + '#termin' }), 'gleiche-seite');
  assert.equal(mit({ ziel: 'https://tezgel.de/downloads/preise.pdf' }), 'datei');
});

test('Linkfilter 15: eigener Übergang jetzt nicht möglich (mobil, reduziert, ohne Browserunterstützung) → verlegen (B-01)', () => {
  assert.equal(pruefeKlick(klick({ ziel: 'https://tezgel.de/leistungen/bad', hier: 'https://tezgel.de/leistungen', eigenerUebergang: false })), 'verlegen');
});

// Zustandsautomat ------------------------------------------------------------

/** Führt Ereignisse nacheinander aus; liefert Endlage, alle Aktionen und die Folge der Zustände. */
function laufe(ereignisse, lage = RUHE) {
  const aktionen = [];
  const zustaende = [lage.zustand];
  for (const e of ereignisse) {
    const r = schritt(lage, e);
    lage = r.lage;
    aktionen.push(...r.aktionen);
    zustaende.push(lage.zustand);
  }
  return { lage, aktionen, zustaende };
}

const START = { typ: 'start', ziel: '/bad', richtung: 'vor' };

const GELEGT = { typ: 'gelegt' };
const BEREIT = { typ: 'bereit' };
const GESTANDEN = { typ: 'logo-gestanden' };

test('Automat 1: normaler Ablauf: legen, Logo klatscht auf, navigieren unter der Fläche, Logo steht, abnehmen, freigeben', () => {
  const { lage, aktionen, zustaende } = laufe([START, GELEGT, BEREIT, GESTANDEN, { typ: 'abgenommen' }]);
  assert.deepEqual(zustaende, ['ruhe', 'legen', 'bedeckt', 'bedeckt', 'abnehmen', 'ruhe']);
  assert.deepEqual(aktionen, ['lege', 'zeige-logo', 'navigiere', 'halte-logo', 'nimm-ab', 'freigeben']);
  assert.equal(lage.zustand, 'ruhe');
  assert.equal(lage.ziel, null);
  assert.equal(lage.halt, 'aus');
});

test('Automat 2: Doppelklick (zweites start in legen) wird ohne Aktion verworfen und behält das erste Ziel', () => {
  const { lage } = laufe([START]);
  const zweit = schritt(lage, { typ: 'start', ziel: '/kontakt', richtung: 'vor' });
  assert.deepEqual(zweit.aktionen, []);
  assert.equal(zweit.lage.zustand, 'legen');
  assert.equal(zweit.lage.ziel, '/bad');
});

test('Automat 3: ein zweiter Start wird in jedem Zustand eines laufenden Wechsels verworfen', () => {
  const wege = {
    bedeckt: [START, GELEGT],
    warten: [START, GELEGT, GESTANDEN],
    abnehmen: [START, GELEGT, BEREIT, GESTANDEN],
    abbruch: [START, GELEGT, GESTANDEN, { typ: 'zeit-ende' }],
  };
  for (const [zustand, ereignisse] of Object.entries(wege)) {
    const { lage } = laufe(ereignisse);
    assert.equal(lage.zustand, zustand, `Ausgangszustand ${zustand}`);
    const r = schritt(lage, { typ: 'start', ziel: '/kontakt', richtung: 'vor' });
    assert.deepEqual(r.aktionen, [], `${zustand}: zweiter Start hat eine Aktion ausgelöst`);
    assert.equal(r.lage.zustand, zustand, `${zustand}: Zustand hat sich geändert`);
    assert.equal(r.lage.ziel, lage.ziel, `${zustand}: Ziel wurde überschrieben`);
  }
});

test('Automat 4: ein bereit während legen stammt von einem früheren Wechsel und wird verworfen; navigiert wird erst, wenn der Boden liegt (Prüfung E-043)', () => {
  const { aktionen, zustaende } = laufe([START, BEREIT, GELEGT, BEREIT, GESTANDEN, { typ: 'abgenommen' }]);
  assert.deepEqual(zustaende, ['ruhe', 'legen', 'legen', 'bedeckt', 'bedeckt', 'abnehmen', 'ruhe']);
  assert.deepEqual(aktionen, ['lege', 'zeige-logo', 'navigiere', 'halte-logo', 'nimm-ab', 'freigeben']);
});

test('Automat 5: Wartephase: fehlt die Seite noch, wenn das Logo gestanden hat, erscheint die Laserlinie, verschwindet vor dem Abnehmen, danach abnehmen', () => {
  const { aktionen, zustaende } = laufe([START, GELEGT, { typ: 'zeit-laser' }, GESTANDEN, BEREIT, { typ: 'abgenommen' }]);
  assert.deepEqual(zustaende, ['ruhe', 'legen', 'bedeckt', 'bedeckt', 'warten', 'abnehmen', 'ruhe']);
  assert.deepEqual(aktionen, ['lege', 'zeige-logo', 'navigiere', 'halte-logo', 'zeige-laser', 'verberge-laser', 'nimm-ab', 'freigeben']);
});

test('Automat 6: Abbruch nach zeit-ende nimmt keine Fliesen ab und kehrt nach ausgeblendet in ruhe zurück', () => {
  const { lage, aktionen, zustaende } = laufe([START, GELEGT, GESTANDEN, { typ: 'zeit-ende' }, { typ: 'ausgeblendet' }]);
  assert.deepEqual(zustaende, ['ruhe', 'legen', 'bedeckt', 'warten', 'abbruch', 'ruhe']);
  assert.ok(!aktionen.includes('nimm-ab'), 'Abbruch darf keine Fliesen abnehmen');
  assert.ok(aktionen.includes('blende-aus'));
  assert.equal(lage.zustand, 'ruhe');
});

test('Automat 7: Zurück und Vor beginnen liegend aus ruhe mit start-liegend', () => {
  const erster = schritt(RUHE, { typ: 'start-liegend', richtung: 'zurueck' });
  assert.equal(erster.lage.zustand, 'bedeckt');
  assert.deepEqual(erster.aktionen, ['liege']);
  const { aktionen, zustaende } = laufe([{ typ: 'start-liegend', richtung: 'zurueck' }, { typ: 'bereit' }, { typ: 'abgenommen' }]);
  assert.deepEqual(zustaende, ['ruhe', 'bedeckt', 'abnehmen', 'ruhe']);
  assert.deepEqual(aktionen, ['liege', 'nimm-ab', 'freigeben']);
});

test('Automat 8: Laserlinie, sobald der Boden liegt und kein Logo-Halt läuft (E-036), Wartezeit höchstens 3000 ms', () => {
  assert.equal(LASER_NACH, 0);
  assert.equal(WARTEN_HOECHSTENS, 3000);
});

test('Automat 9: Zurück aus ruhe (Ziel leer): nach dem Legen wird das angehaltene popstate nachgereicht, nicht navigiert', () => {
  const { aktionen, zustaende } = laufe([{ typ: 'start', ziel: '', richtung: 'zurueck' }, GELEGT, BEREIT, GESTANDEN, { typ: 'abgenommen' }]);
  assert.deepEqual(zustaende, ['ruhe', 'legen', 'bedeckt', 'bedeckt', 'abnehmen', 'ruhe']);
  assert.deepEqual(aktionen, ['lege', 'zeige-logo', 'reiche-nach', 'halte-logo', 'nimm-ab', 'freigeben']);
});

test('Automat 10: Zurück im Browser während des Legens eines Klicks (umkehr): statt router.push wird das popstate nachgereicht, der Verlauf bleibt ganz (Prüfung E-043)', () => {
  const { lage, aktionen } = laufe([START, { typ: 'umkehr' }]);
  assert.equal(lage.zustand, 'legen');
  assert.equal(lage.ziel, '');
  assert.deepEqual(aktionen, ['lege']);
  const weiter = schritt(lage, GELEGT);
  assert.deepEqual(weiter.aktionen, ['zeige-logo', 'reiche-nach', 'halte-logo']);
  assert.ok(!weiter.aktionen.includes('navigiere'), 'kein router.push zum alten Ziel');
});

test('Automat 11: umkehr wirkt nur beim Legen; in bedeckt, warten und abnehmen ändert es nichts (dort übernimmt Next das Ereignis)', () => {
  const wege = {
    bedeckt: [START, GELEGT],
    warten: [START, GELEGT, GESTANDEN],
    abnehmen: [START, GELEGT, BEREIT, GESTANDEN],
  };
  for (const [zustand, ereignisse] of Object.entries(wege)) {
    const { lage } = laufe(ereignisse);
    const r = schritt(lage, { typ: 'umkehr' });
    assert.deepEqual(r.aktionen, [], zustand);
    assert.deepEqual(r.lage, lage, zustand);
  }
});

// Logo auf der Wand (E-047) ------------------------------------------------------------------------------------------
// Wunsch des Auftraggebers: „Beim Übergang soll Fliesenleger Tezgel mit dem Logo (dem Maskottchen) auf die Wand geklatscht
// werden.“ Auftrag: sobald der Boden liegt, mittig, Form, Farbe und Proportion unverändert (nur skaliert); aufklatschen von
// etwa 1,15 und durchsichtig auf 1 und deckend in etwa 220 ms, ohne Nachfedern; steht mindestens 450 ms, auch wenn die neue
// Seite früher bereit ist; Zurück und Vor ohne Mindestzeit; geht mit den ersten abgenommenen Fliesen (200 ms). Gegenprüfung
// E3-B01 (Befund 1): Auch bei Zurück und Vor klatscht das Logo ganz auf, bevor abgenommen wird (sonst verblasste es nach
// 0,2 s halb aufgeklatscht, ein Aufblitzen).

test('Logo 1: mittig in jeder Ansicht, ganze Pixel, Seitenverhältnis genau wie die Datei (640 × 200), nie über Dateibreite, ganz im Bild', () => {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const m = logoMass(breite, hoehe);
    for (const k of ['x', 'y', 'breite', 'hoehe']) assert.ok(Number.isInteger(m[k]), `${name}: ${k} = ${m[k]} nicht ganzzahlig`);
    assert.equal(m.breite * 200, m.hoehe * 640, `${name}: ${m.breite} × ${m.hoehe} verzerrt`);
    // für das Auge mittig: die Mitte des sichtbaren Inhalts (12 bis 587 von 640 px) liegt auf der Mitte der Ansicht
    assert.ok(Math.abs(m.x + m.breite * LOGO_INHALT_MITTE - breite / 2) <= 0.5, `${name}: waagrecht nicht mittig`);
    assert.ok(Math.abs(m.y + m.hoehe / 2 - hoehe / 2) <= 0.5, `${name}: senkrecht nicht mittig`);
    assert.ok(m.x >= 0 && m.y >= 0 && m.breite <= 640, `${name}: ragt aus dem Bild oder über die Dateibreite`);
    assert.ok(m.hoehe <= 0.3 * hoehe + 1e-9, `${name}: höher als 30 % der Ansicht`);
  }
});

test('Logo 2: groß genug zum Lesen: mobil mindestens 60 % der Breite, sonst mindestens 352 px breit', () => {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const m = logoMass(breite, hoehe);
    if (breite < 600) assert.ok(m.breite >= 0.6 * breite, `${name}: ${m.breite} px bei ${breite} px Breite`);
    else assert.ok(m.breite >= 352, `${name}: ${m.breite} px`);
  }
});

test('Logo 3: Bewegung und Zeiten: von 1,15 auf 1 in rund 220 ms, Mindestzeit 450 ms danach, weg in 200 ms; reduziert nur stehen', () => {
  assert.ok(LOGO_GROESSE_START >= 1.1 && LOGO_GROESSE_START <= 1.2, `Startgröße ${LOGO_GROESSE_START}`);
  assert.ok(LOGO_AUFKLATSCHEN >= 180 && LOGO_AUFKLATSCHEN <= 260, `Aufklatschen ${LOGO_AUFKLATSCHEN} ms`);
  assert.ok(LOGO_STEHEN >= 450, `Stehen ${LOGO_STEHEN} ms`);
  assert.equal(LOGO_WEG, 200);
  assert.equal(logoHalt(false), LOGO_AUFKLATSCHEN + LOGO_STEHEN);
  assert.equal(logoHalt(true), LOGO_STEHEN);
  // Zurück und Vor: keine Mindestzeit, nur das Aufklatschen läuft zu Ende; reduziert kam das Logo mit der Blende
  assert.equal(logoHaltVerlauf(false), LOGO_AUFKLATSCHEN);
  assert.equal(logoHaltVerlauf(true), 0);
});

test('Logo 4: sobald der Boden nach einem Klick liegt, klatscht das Logo auf und der Halt beginnt; ein frühes bereit wird gemerkt und erst nach dem Stehen eingelöst', () => {
  const nachGelegt = laufe([START, GELEGT]);
  assert.equal(nachGelegt.lage.zustand, 'bedeckt');
  assert.equal(nachGelegt.lage.halt, 'steht');
  assert.deepEqual(nachGelegt.aktionen, ['lege', 'zeige-logo', 'navigiere', 'halte-logo']);
  const frueh = schritt(nachGelegt.lage, BEREIT);
  assert.deepEqual(frueh.aktionen, [], 'kein Abnehmen, solange das Logo stehen muss');
  assert.equal(frueh.lage.zustand, 'bedeckt');
  assert.equal(frueh.lage.halt, 'bereit');
  const danach = schritt(frueh.lage, GESTANDEN);
  assert.equal(danach.lage.zustand, 'abnehmen');
  assert.deepEqual(danach.aktionen, ['nimm-ab']);
  assert.equal(danach.lage.halt, 'aus');
});

test('Logo 5: während das Logo steht, keine Wartelinie (das Stehen ist kein Warten); fehlt danach die Seite, kommt sie', () => {
  const { lage } = laufe([START, GELEGT]);
  const laser = schritt(lage, { typ: 'zeit-laser' });
  assert.deepEqual(laser.aktionen, []);
  assert.equal(laser.lage.zustand, 'bedeckt');
  const gestanden = schritt(laser.lage, GESTANDEN);
  assert.equal(gestanden.lage.zustand, 'warten');
  assert.deepEqual(gestanden.aktionen, ['zeige-laser']);
});

test('Logo 6: Zurück und Vor ohne Mindestzeit, aber ganz aufgeklatscht: aus dem Verlauf (Ziel leer) und nach umkehr hält das Logo bis zum Ende des Aufklatschens; ein frühes bereit wartet darauf, danach sofort abnehmen', () => {
  for (const [name, ereignisse] of Object.entries({
    verlauf: [{ typ: 'start', ziel: '', richtung: 'zurueck' }, GELEGT],
    umkehr: [START, { typ: 'umkehr' }, GELEGT],
  })) {
    const { lage, aktionen } = laufe(ereignisse);
    assert.equal(lage.zustand, 'bedeckt', name);
    assert.equal(lage.halt, 'steht', `${name}: Halt bis zum Ende des Aufklatschens`);
    assert.deepEqual(aktionen.slice(-3), ['zeige-logo', 'reiche-nach', 'halte-logo'], name);
    assert.ok(!aktionen.includes('navigiere'), `${name}: kein router.push`);
    const frueh = schritt(lage, BEREIT);
    assert.deepEqual(frueh.aktionen, [], `${name}: kein Abnehmen mitten im Aufklatschen`);
    assert.equal(frueh.lage.halt, 'bereit', name);
    const fertig = schritt(frueh.lage, GESTANDEN);
    assert.equal(fertig.lage.zustand, 'abnehmen', name);
    assert.deepEqual(fertig.aktionen, ['nimm-ab'], name);
    // fehlt die Seite, wenn das Logo aufgeklatscht ist, kommt die Wartelinie; abgenommen wird beim bereit
    const spaet = schritt(lage, GESTANDEN);
    assert.equal(spaet.lage.zustand, 'warten', name);
    assert.deepEqual(spaet.aktionen, ['zeige-laser'], name);
    assert.deepEqual(schritt(spaet.lage, BEREIT).aktionen, ['verberge-laser', 'nimm-ab'], name);
  }
});

test('Logo 7: Zurück oder Vor, während das Logo steht (neuer-auftrag): der Halt endet, ein gemerktes bereit verfällt, abgenommen wird erst beim bereit der neuen Navigation', () => {
  const { lage } = laufe([START, GELEGT, BEREIT]);
  assert.equal(lage.halt, 'bereit');
  const neu = schritt(lage, { typ: 'neuer-auftrag' });
  assert.equal(neu.lage.zustand, 'warten');
  assert.equal(neu.lage.halt, 'aus');
  assert.deepEqual(neu.aktionen, ['zeige-laser']);
  const spaet = schritt(neu.lage, GESTANDEN);
  assert.deepEqual(spaet.aktionen, [], 'die Uhr des alten Halts nimmt nichts ab');
  assert.equal(spaet.lage.zustand, 'warten');
  const bereit = schritt(spaet.lage, BEREIT);
  assert.equal(bereit.lage.zustand, 'abnehmen');
  assert.deepEqual(bereit.aktionen, ['verberge-laser', 'nimm-ab']);
});

test('Logo 8: logo-gestanden und neuer-auftrag ändern außerhalb des Halts nichts (ruhe, legen, warten, abnehmen, abbruch, bedeckt liegend)', () => {
  const wege = {
    ruhe: [],
    legen: [START],
    warten: [START, GELEGT, GESTANDEN],
    abnehmen: [START, GELEGT, BEREIT, GESTANDEN],
    abbruch: [START, GELEGT, GESTANDEN, { typ: 'zeit-ende' }],
    'bedeckt liegend (start-liegend)': [{ typ: 'start-liegend', richtung: 'zurueck' }],
  };
  for (const [name, ereignisse] of Object.entries(wege)) {
    const { lage } = laufe(ereignisse);
    for (const e of [GESTANDEN, { typ: 'neuer-auftrag' }]) {
      const r = schritt(lage, e);
      assert.deepEqual(r.aktionen, [], `${name}: ${e.typ} löst eine Aktion aus`);
      assert.deepEqual(r.lage, lage, `${name}: ${e.typ} ändert die Lage`);
    }
  }
});

test('Logo 9: Abbruch nach 3 s auch während des Halts (die Schicht blendet mit dem Logo aus)', () => {
  const { lage, aktionen, zustaende } = laufe([START, GELEGT, { typ: 'zeit-ende' }, { typ: 'ausgeblendet' }]);
  assert.deepEqual(zustaende, ['ruhe', 'legen', 'bedeckt', 'abbruch', 'ruhe']);
  assert.ok(aktionen.includes('blende-aus') && !aktionen.includes('nimm-ab'));
  assert.equal(lage.halt, 'aus');
});

test('Logo 10: die Farbe kommt allein aus dem Logo: der B-01-Block in bewegung.css nutzt nur die neutralen Farben (kalk, fliese, fliese-glanz, fuge, strich, Schatten in tinte), keine festen Farbwerte', () => {
  const css = readFileSync(new URL('../src/app/bewegung.css', import.meta.url), 'utf8');
  const anfang = css.indexOf('/* verlegen (B-01');
  const ende = css.indexOf('/* seitenwechsel', anfang);
  assert.ok(anfang >= 0 && ende > anfang, 'B-01-Block in bewegung.css');
  const block = css.slice(anfang, ende).replace(/\/\*[\s\S]*?\*\//g, '');
  const farben = new Set([...block.matchAll(/--color-([a-z0-9-]+)/g)].map((m) => m[1]));
  for (const f of farben) assert.ok(['kalk', 'fliese', 'fliese-glanz', 'fuge', 'strich', 'tinte'].includes(f), `Farbe ${f} im Seitenwechsel`);
  assert.doesNotMatch(block, /#[0-9a-f]{3,8}\b|rgb\(|hsl\(|oklch\(/i, 'feste Farbwerte im Seitenwechsel');
  assert.match(block, /\.verlegen-logo\s*\{/, 'Logo-Behälter in der Schicht');
});
