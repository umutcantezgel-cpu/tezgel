import test from 'node:test';
import assert from 'node:assert/strict';
import { verlegeRaster, fliesenmass, zeitplan, ziehStrecke, wechselDauer } from '../src/lib/verlegen/raster.ts';
import { pruefeKlick } from '../src/lib/verlegen/linkfilter.ts';
import { schritt, RUHE, LASER_NACH, WARTEN_HOECHSTENS } from '../src/lib/verlegen/automat.ts';

// Logik des Seitenwechsels B-01 „Verlegen“ gegen die Spezifikation (KERN K-007, Abschnitt B-01; E-017;
// Auftrag Abschnitt 9). Die Erwartungen stammen aus dem Wortlaut der Spezifikation, nicht aus der Umsetzung.

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

/** Alle Kombinationen aus Gerät, Gesamtdauer (ms) und Richtung: vor (Klick) und zurueck (Zurück und Vor). */
function alleFaelle(fn) {
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

test('Zeitplan 1: Verlegen beginnt nicht vor dem Phasenstart und endet spätestens bei 45 % der Gesamtdauer', () => {
  alleFaelle(({ name, takte, gesamt, richtung }) => {
    for (const t of takte) {
      const fall = `${name}, ${richtung}, ${gesamt} ms`;
      assert.ok(t.legenBeginn >= 0, `${fall}: Verlegen beginnt vor 0`);
      assert.ok(t.legenBeginn + t.legenDauer <= 0.45 * gesamt + 1e-9, `${fall}: Verlegen endet bei ${t.legenBeginn + t.legenDauer} ms`);
    }
  });
});

test('Zeitplan 2: Weiterziehen beginnt nicht vor dem Phasenstart und endet spätestens bei 40 % der Gesamtdauer', () => {
  alleFaelle(({ name, takte, gesamt, richtung }) => {
    for (const t of takte) {
      const fall = `${name}, ${richtung}, ${gesamt} ms`;
      assert.ok(t.ziehenBeginn >= 0, `${fall}: Weiterziehen beginnt vor 0`);
      assert.ok(t.ziehenBeginn + t.ziehenDauer <= 0.4 * gesamt + 1e-9, `${fall}: Weiterziehen endet bei ${t.ziehenBeginn + t.ziehenDauer} ms`);
    }
  });
});

test('Zeitplan 3: beim Verlegen beginnt eine Fliese mit größerem rechten Rand (vor) bzw. kleinerem linken Rand (zurueck, gespiegelt) nie später als eine in derselben Reihe', () => {
  alleFaelle(({ name, fliesen, takte, gesamt, richtung }) => {
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

test('Zeitplan 4: früher gelegte Fliesen liegen in der Stapelreihenfolge höher', () => {
  alleFaelle(({ name, takte, gesamt, richtung }) => {
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

test('Zeitplan 5: beim Weiterziehen haben alle Fliesen einer Reihe denselben Beginn und dieselbe Dauer (kein Überholen)', () => {
  alleFaelle(({ name, fliesen, takte, gesamt, richtung }) => {
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

test('Zeitplan 6: beim Weiterziehen verlässt jede Fliese das Bild nach links', () => {
  for (const [name, [breite, hoehe]] of Object.entries(GERAETE)) {
    const { mass, fliesen } = verlegeRaster(breite, hoehe);
    const strecke = ziehStrecke(mass, breite);
    for (const f of fliesen) {
      assert.ok(f.x + f.breite - strecke <= 0, `${name}: Fliese bei x=${f.x} bleibt nach dem Weiterziehen im Bild`);
    }
  }
});

test('Zeitplan 7: Reihen setzen nach ihrer Versatzstufe ein, je Stufe gleicher Beginn, Spanne 15 % der Weiterziehen-Phase (40 %)', () => {
  alleFaelle(({ name, fliesen, takte, gesamt, richtung }) => {
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

test('Zeitplan 8: Dauer des Wechsels: 1200 ms beim ersten, 900 ms ab dem zweiten, Zurück 70 % davon', () => {
  assert.equal(wechselDauer(1200, 900, false, 'vor'), 1200);
  assert.equal(wechselDauer(1200, 900, true, 'vor'), 900);
  assert.equal(wechselDauer(1200, 900, false, 'zurueck'), 840);
  assert.equal(wechselDauer(1200, 900, true, 'zurueck'), 630);
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

test('Automat 1: normaler Ablauf: legen, navigieren unter der Fläche, ziehen, freigeben', () => {
  const { lage, aktionen, zustaende } = laufe([START, { typ: 'gelegt' }, { typ: 'bereit' }, { typ: 'gezogen' }]);
  assert.deepEqual(zustaende, ['ruhe', 'legen', 'bedeckt', 'ziehen', 'ruhe']);
  assert.deepEqual(aktionen, ['lege', 'navigiere', 'ziehe', 'freigeben']);
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
    ziehen: [START, { typ: 'gelegt' }, { typ: 'bereit' }],
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

test('Automat 4: bereit während legen führt nach gelegt direkt zu ziehen, ohne Stopp in bedeckt', () => {
  const { aktionen, zustaende } = laufe([START, { typ: 'bereit' }, { typ: 'gelegt' }, { typ: 'gezogen' }]);
  assert.deepEqual(zustaende, ['ruhe', 'legen', 'legen', 'ziehen', 'ruhe']);
  assert.ok(aktionen.includes('ziehe'), 'Fliesen werden weitergezogen');
  assert.ok(!aktionen.includes('zeige-laser'), 'keine Laserlinie, die Seite war schon bereit');
});

test('Automat 5: Wartephase: Laserlinie erscheint, verschwindet vor dem Weiterziehen, danach ziehen', () => {
  const { aktionen, zustaende } = laufe([START, { typ: 'gelegt' }, { typ: 'zeit-laser' }, { typ: 'bereit' }, { typ: 'gezogen' }]);
  assert.deepEqual(zustaende, ['ruhe', 'legen', 'bedeckt', 'warten', 'ziehen', 'ruhe']);
  assert.deepEqual(aktionen, ['lege', 'navigiere', 'zeige-laser', 'verberge-laser', 'ziehe', 'freigeben']);
});

test('Automat 6: Abbruch nach zeit-ende zieht keine Fliesen und kehrt nach ausgeblendet in ruhe zurück', () => {
  const { lage, aktionen, zustaende } = laufe([START, { typ: 'gelegt' }, { typ: 'zeit-laser' }, { typ: 'zeit-ende' }, { typ: 'ausgeblendet' }]);
  assert.deepEqual(zustaende, ['ruhe', 'legen', 'bedeckt', 'warten', 'abbruch', 'ruhe']);
  assert.ok(!aktionen.includes('ziehe'), 'Abbruch darf keine Fliesen ziehen');
  assert.ok(aktionen.includes('blende-aus'));
  assert.equal(lage.zustand, 'ruhe');
});

test('Automat 7: Zurück und Vor beginnen liegend aus ruhe mit start-liegend', () => {
  const erster = schritt(RUHE, { typ: 'start-liegend', richtung: 'zurueck' });
  assert.equal(erster.lage.zustand, 'bedeckt');
  assert.deepEqual(erster.aktionen, ['liege']);
  const { aktionen, zustaende } = laufe([{ typ: 'start-liegend', richtung: 'zurueck' }, { typ: 'bereit' }, { typ: 'gezogen' }]);
  assert.deepEqual(zustaende, ['ruhe', 'bedeckt', 'ziehen', 'ruhe']);
  assert.deepEqual(aktionen, ['liege', 'ziehe', 'freigeben']);
});

test('Automat 8: Laserlinie, sobald der Boden liegt (E-036), Wartezeit höchstens 3000 ms', () => {
  assert.equal(LASER_NACH, 0);
  assert.equal(WARTEN_HOECHSTENS, 3000);
});
