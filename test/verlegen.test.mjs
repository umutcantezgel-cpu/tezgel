import test from 'node:test';
import assert from 'node:assert/strict';
import { verlegeRaster, fliesenmass, zeitplan, ziehStrecke, wechselDauer } from '../src/lib/verlegen/raster.ts';
import { pruefeKlick } from '../src/lib/verlegen/linkfilter.ts';
import { BAND_FLIESEN, FLATTERN_ANTEIL, WARTEN_HOECHSTENS, windBand, windKern, windMass, windWeg } from '../src/lib/verlegen/wind.ts';

// Logik des Seitenwechsels B-01 gegen die Spezifikation (KERN K-007, Abschnitt B-01; E-017; E-042 „Wind“; Auftrag Abschnitt 9).
// Raster und Zeitplan nutzt weiter das Intro (B-02); der Wind hat sein eigenes Band (wind.ts). Die Erwartungen stammen aus
// dem Wortlaut der Spezifikation, nicht aus der Umsetzung.

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

// Wind (B-01, E-042) ------------------------------------------------------------

test('Wind 1: Fliese 2:1 quer in ganzen Pixeln, Länge zwischen 64 und 176 px, Fuge 1 % der kurzen Seite und mindestens 2 px', () => {
  for (const [name, [b]] of Object.entries(GERAETE)) {
    const m = windMass(b);
    assert.ok(Number.isInteger(m.laenge) && Number.isInteger(m.hoehe), name);
    assert.equal(m.laenge, 2 * m.hoehe, name);
    assert.ok(m.laenge >= 64 && m.laenge <= 176, `${name}: ${m.laenge}`);
    assert.equal(m.fuge, Math.max(2, m.hoehe * 0.01), name);
  }
});

test('Wind 2: das Band bedeckt nie den ganzen Bildschirm (höchstens 60 % der Breite) und reicht über die ganze Höhe', () => {
  for (const [name, [b, h]] of Object.entries(GERAETE)) {
    const band = windBand(b, h);
    assert.ok(band.breite <= 0.6 * b, `${name}: Band ${band.breite} px bei ${b} px`);
    assert.ok(band.hoehe >= h, `${name}: Höhe ${band.hoehe} < ${h}`);
    assert.equal(band.reihen.length, Math.ceil(h / band.mass.hoehe), name);
  }
});

test('Wind 3: Reihen im Drittelverband (Versatz 0, ⅓, ⅔ der Länge), je zwei Fliesen: das Zickzack', () => {
  const band = windBand(1440, 900);
  const L = band.mass.laenge;
  for (const r of band.reihen) assert.equal(r.x - band.rand, Math.round(((r.reihe % 3) * L) / 3), `Reihe ${r.reihe}`);
  assert.equal(BAND_FLIESEN, 2);
  assert.equal(band.breite, 2 * band.rand + Math.round((2 * L) / 3) + 2 * L);
});

test('Wind 4: das Flattern bleibt in seinen Grenzen (höchstens ⅛ der Länge), benachbarte Reihen lenken verschieden aus', () => {
  const band = windBand(390, 844);
  for (const r of band.reihen) assert.ok(Math.abs(r.auslenkung) <= band.rand, `Reihe ${r.reihe}`);
  assert.equal(band.rand, Math.round(band.mass.laenge * FLATTERN_ANTEIL));
  assert.ok(new Set(band.reihen.slice(0, 4).map((r) => r.auslenkung)).size >= 3);
});

test('Wind 5: die Naht liegt im Kern, den jede Reihe in jeder Auslenkung bedeckt (alte und neue Seite stoßen nie offen aneinander)', () => {
  for (const [name, [b, h]] of Object.entries(GERAETE)) {
    const band = windBand(b, h);
    const kern = windKern(band);
    assert.ok(kern.von < band.naht && band.naht < kern.bis, `${name}: Kern ${kern.von}–${kern.bis}, Naht ${band.naht}`);
  }
});

test('Wind 6: vor: Band kommt ganz von rechts und geht ganz nach links; neue Seite anfangs unsichtbar, am Ende ganz sichtbar', () => {
  for (const [name, [b, h]] of Object.entries(GERAETE)) {
    const band = windBand(b, h);
    const w = windWeg(band, b, 'vor');
    assert.equal(w.band.von, b, name);
    assert.equal(w.band.bis, -band.breite, name);
    assert.equal(w.naht.seite, 'links', name);
    assert.ok(w.naht.von >= b, `${name}: inset links am Anfang ${w.naht.von}`);
    assert.ok(w.naht.bis <= 0, `${name}: inset links am Ende ${w.naht.bis}`);
    // Naht und Band laufen gleich: Abstand konstant (gleiche Dauer und Kurve)
    assert.equal(w.naht.von - w.band.von, w.naht.bis - w.band.bis, name);
  }
});

test('Wind 7: zurück gespiegelt: Band von links nach rechts, neue Seite links der Naht, anfangs unsichtbar, am Ende ganz', () => {
  for (const [name, [b, h]] of Object.entries(GERAETE)) {
    const band = windBand(b, h);
    const w = windWeg(band, b, 'zurueck');
    assert.equal(w.band.von, -band.breite, name);
    assert.equal(w.band.bis, b, name);
    assert.equal(w.naht.seite, 'rechts', name);
    assert.ok(w.naht.von >= b, `${name}: inset rechts am Anfang ${w.naht.von}`);
    assert.ok(w.naht.bis <= 0, `${name}: inset rechts am Ende ${w.naht.bis}`);
    // Lage der Naht von links = Breite − inset rechts = Band + Naht im Band
    assert.equal(b - w.naht.von, w.band.von + band.naht, name);
    assert.equal(b - w.naht.bis, w.band.bis + band.naht, name);
  }
});

test('Wind 8: Dauer wie bisher aus den Tokens (1200, 900, Zurück 70 %), Warten auf die neue Seite höchstens 2500 ms', () => {
  assert.equal(wechselDauer(1200, 900, false, 'vor'), 1200);
  assert.equal(wechselDauer(1200, 900, true, 'vor'), 900);
  assert.equal(wechselDauer(1200, 900, true, 'zurueck'), 630);
  assert.equal(WARTEN_HOECHSTENS, 2500);
});
