import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { verlegeRaster, fliesenmass, zeitplan, ziehStrecke, stueckplan, wechselDauer } from '../src/lib/verlegen/raster.ts';
import { pruefeKlick } from '../src/lib/verlegen/linkfilter.ts';
import { schritt, RUHE, LASER_NACH, WARTEN_HOECHSTENS } from '../src/lib/verlegen/automat.ts';

// Logik des Seitenwechsels B-01 „Verlegen“ gegen die Spezifikation (KERN K-007, Abschnitt B-01; E-017, E-043;
// Auftrag Abschnitt 9; Ablauf nach Wunsch des Auftraggebers: die ganze Seite Fliese für Fliese von rechts nach links
// belegen, dann die Fliesen in derselben Richtung einzeln wieder abnehmen). Die Erwartungen stammen aus dem Wortlaut der Spezifikation, nicht aus der Umsetzung.

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

test('Raster 7: etwa 3 Fliesen je Reihe bei 390 px, etwa 8 bei 1440 px (Breite durch Fliesenlänge)', () => {
  const schmal = verlegeRaster(390, 844).mass;
  const breit = verlegeRaster(1440, 900).mass;
  const jeReiheSchmal = 390 / schmal.laenge;
  const jeReiheBreit = 1440 / breit.laenge;
  assert.ok(jeReiheSchmal >= 2.5 && jeReiheSchmal <= 3.5, `390 px: ${jeReiheSchmal.toFixed(2)} Fliesen je Reihe`);
  assert.ok(jeReiheBreit >= 6.5 && jeReiheBreit <= 8.5, `1440 px: ${jeReiheBreit.toFixed(2)} Fliesen je Reihe`);
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
// verschwinden im Hintergrund; komplett neutral. Gewählte Dauer: 1,8 s, danach 1,4 s (Belegen plus Abnehmen).

/** Alle Kombinationen aus Gerät, Gesamtdauer (ms) und Richtung: vor (Klick) und zurueck (Zurück und Vor). */
function alleFaelle(fn) {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const { mass, fliesen } = verlegeRaster(breite, hoehe);
    for (const gesamt of [1800, 1400, 1260, 980]) {
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

test('Stückplan 8: Dauer des Wechsels (Belegen plus Abnehmen, E-043): 1800 ms beim ersten, 1400 ms ab dem zweiten, Zurück 70 % davon, so auch in den Tokens', () => {
  assert.equal(wechselDauer(1800, 1400, false, 'vor'), 1800);
  assert.equal(wechselDauer(1800, 1400, true, 'vor'), 1400);
  assert.equal(wechselDauer(1800, 1400, false, 'zurueck'), 1260);
  assert.equal(wechselDauer(1800, 1400, true, 'zurueck'), 980);
  const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
  assert.match(css, /--verlegen-gesamt:\s*1800ms;/);
  assert.match(css, /--verlegen-gesamt-folge:\s*1400ms;/);
});

/** Buntheit (OKLCH-Chroma) einer Hex-Farbe. */
function buntheit(hex) {
  const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  const [r, g, b] = [1, 3, 5].map((i) => lin(Number.parseInt(hex.slice(i, i + 2), 16) / 255));
  const [l, m, s] = [
    0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b,
    0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b,
    0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b,
  ].map(Math.cbrt);
  return Math.hypot(1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s);
}

test('Stückplan 9: neutral: Kalk unbunt (Buntheit unter 0,003), Fliese und Fuge unter 0,01, themeColor gleich Kalk, Wartelinie im Seitenwechsel in strich statt Laserrot', () => {
  const css = readFileSync(new URL('../src/app/globals.css', import.meta.url), 'utf8');
  const farbe = (name) => css.match(new RegExp(`--color-${name}:\\s*(#[0-9A-Fa-f]{6});`))?.[1];
  const kalk = farbe('kalk');
  assert.ok(kalk, 'Kalk in globals.css');
  assert.ok(buntheit(kalk) < 0.003, `Kalk ${kalk}: Buntheit ${buntheit(kalk).toFixed(4)}`);
  for (const name of ['fliese', 'fuge']) assert.ok(buntheit(farbe(name)) < 0.01, `${name} ${farbe(name)}: Buntheit ${buntheit(farbe(name)).toFixed(4)}`);
  const dokument = readFileSync(new URL('../src/app/(bestand)/_dokument.tsx', import.meta.url), 'utf8');
  assert.equal(dokument.match(/themeColor:\s*'(#[0-9A-Fa-f]{6})'/)?.[1].toUpperCase(), kalk.toUpperCase());
  const bewegung = readFileSync(new URL('../src/app/bewegung.css', import.meta.url), 'utf8');
  const linie = bewegung.match(/\.verlegen-laser\s*\{[^}]*\}/)?.[0] ?? '';
  assert.match(linie, /background-color:\s*var\(--color-strich\)/);
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

test('Automat 1: normaler Ablauf: legen, navigieren unter der Fläche, abnehmen, freigeben', () => {
  const { lage, aktionen, zustaende } = laufe([START, { typ: 'gelegt' }, { typ: 'bereit' }, { typ: 'abgenommen' }]);
  assert.deepEqual(zustaende, ['ruhe', 'legen', 'bedeckt', 'abnehmen', 'ruhe']);
  assert.deepEqual(aktionen, ['lege', 'navigiere', 'nimm-ab', 'freigeben']);
  assert.equal(lage.zustand, 'ruhe');
  assert.equal(lage.ziel, null);
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
    bedeckt: [START, { typ: 'gelegt' }],
    warten: [START, { typ: 'gelegt' }, { typ: 'zeit-laser' }],
    abnehmen: [START, { typ: 'gelegt' }, { typ: 'bereit' }],
    abbruch: [START, { typ: 'gelegt' }, { typ: 'zeit-laser' }, { typ: 'zeit-ende' }],
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
  const { aktionen, zustaende } = laufe([START, { typ: 'bereit' }, { typ: 'gelegt' }, { typ: 'bereit' }, { typ: 'abgenommen' }]);
  assert.deepEqual(zustaende, ['ruhe', 'legen', 'legen', 'bedeckt', 'abnehmen', 'ruhe']);
  assert.deepEqual(aktionen, ['lege', 'navigiere', 'nimm-ab', 'freigeben']);
});

test('Automat 5: Wartephase: Laserlinie erscheint, verschwindet vor dem Abnehmen, danach abnehmen', () => {
  const { aktionen, zustaende } = laufe([START, { typ: 'gelegt' }, { typ: 'zeit-laser' }, { typ: 'bereit' }, { typ: 'abgenommen' }]);
  assert.deepEqual(zustaende, ['ruhe', 'legen', 'bedeckt', 'warten', 'abnehmen', 'ruhe']);
  assert.deepEqual(aktionen, ['lege', 'navigiere', 'zeige-laser', 'verberge-laser', 'nimm-ab', 'freigeben']);
});

test('Automat 6: Abbruch nach zeit-ende nimmt keine Fliesen ab und kehrt nach ausgeblendet in ruhe zurück', () => {
  const { lage, aktionen, zustaende } = laufe([START, { typ: 'gelegt' }, { typ: 'zeit-laser' }, { typ: 'zeit-ende' }, { typ: 'ausgeblendet' }]);
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

test('Automat 8: Laserlinie, sobald der Boden liegt (E-036), Wartezeit höchstens 3000 ms', () => {
  assert.equal(LASER_NACH, 0);
  assert.equal(WARTEN_HOECHSTENS, 3000);
});

test('Automat 9: Zurück aus ruhe (Ziel leer): nach dem Legen wird das angehaltene popstate nachgereicht, nicht navigiert', () => {
  const { aktionen, zustaende } = laufe([{ typ: 'start', ziel: '', richtung: 'zurueck' }, { typ: 'gelegt' }, { typ: 'bereit' }, { typ: 'abgenommen' }]);
  assert.deepEqual(zustaende, ['ruhe', 'legen', 'bedeckt', 'abnehmen', 'ruhe']);
  assert.deepEqual(aktionen, ['lege', 'reiche-nach', 'nimm-ab', 'freigeben']);
});

test('Automat 10: Zurück im Browser während des Legens eines Klicks (umkehr): statt router.push wird das popstate nachgereicht, der Verlauf bleibt ganz (Prüfung E-043)', () => {
  const { lage, aktionen } = laufe([START, { typ: 'umkehr' }]);
  assert.equal(lage.zustand, 'legen');
  assert.equal(lage.ziel, '');
  assert.deepEqual(aktionen, ['lege']);
  const weiter = schritt(lage, { typ: 'gelegt' });
  assert.deepEqual(weiter.aktionen, ['reiche-nach']);
  assert.ok(!weiter.aktionen.includes('navigiere'), 'kein router.push zum alten Ziel');
});

test('Automat 11: umkehr wirkt nur beim Legen; in bedeckt, warten und abnehmen ändert es nichts (dort übernimmt Next das Ereignis)', () => {
  const wege = {
    bedeckt: [START, { typ: 'gelegt' }],
    warten: [START, { typ: 'gelegt' }, { typ: 'zeit-laser' }],
    abnehmen: [START, { typ: 'gelegt' }, { typ: 'bereit' }],
  };
  for (const [zustand, ereignisse] of Object.entries(wege)) {
    const { lage } = laufe(ereignisse);
    const r = schritt(lage, { typ: 'umkehr' });
    assert.deepEqual(r.aktionen, [], zustand);
    assert.deepEqual(r.lage, lage, zustand);
  }
});
