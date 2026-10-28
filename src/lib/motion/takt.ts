// Gemeinsamer Takt (KERN v4, UM-E3-MOD): eine requestAnimationFrame-Schleife für alle Skript-Animationen und für Arbeit
// „im nächsten Bild“. naechstesBild läuft einmal im nächsten Bild, in der Reihenfolge der Anmeldung; imTakt läuft in jedem
// Bild, bis es abgemeldet ist. Ohne Aufgaben ruht die Schleife; verborgene Tabs hält der Browser selbst an. Was eine Aufgabe
// im Lauf anmeldet, kommt im folgenden Bild dran; was abgemeldet ist, läuft nicht mehr, auch nicht im laufenden Bild (wie
// cancelAnimationFrame). Ein Fehler in einer Aufgabe hält die übrigen nicht auf und wird gemeldet wie bei eigenen
// rAF-Aufrufen. wiederhole ist der Zeitgeber für Selbstläufe im Sekundenmaß (Karussell) und setzt bei verborgenem Tab aus.
// B-01 behält seine eigenen Aufrufe (eingefroren, E-078).

type Aufgabe = (zeit: number) => void;
interface Eintrag {
  fn: Aufgabe;
}

const einmal = new Set<Eintrag>();
const dauernd = new Set<Eintrag>();
let geplant = false;

function melde(fehler: unknown) {
  if (typeof reportError === 'function') reportError(fehler);
  else
    setTimeout(() => {
      throw fehler;
    });
}

function ausfuehren(eintrag: Eintrag, zeit: number) {
  try {
    eintrag.fn(zeit);
  } catch (fehler) {
    melde(fehler);
  }
}

function schlag(zeit: number) {
  geplant = false;
  for (const eintrag of [...einmal]) if (einmal.delete(eintrag)) ausfuehren(eintrag, zeit);
  for (const eintrag of [...dauernd]) if (dauernd.has(eintrag)) ausfuehren(eintrag, zeit);
  planen();
}

function planen() {
  if (geplant || (einmal.size === 0 && dauernd.size === 0)) return;
  geplant = true;
  requestAnimationFrame(schlag);
}

/** Einmal im nächsten Bild; gibt die Abmeldung zurück. */
export function naechstesBild(fn: Aufgabe): () => void {
  const eintrag = { fn };
  einmal.add(eintrag);
  planen();
  return () => {
    einmal.delete(eintrag);
  };
}

/** In jedem Bild bis zur Abmeldung (Skript-Animationen); gibt die Abmeldung zurück. */
export function imTakt(fn: Aufgabe): () => void {
  const eintrag = { fn };
  dauernd.add(eintrag);
  planen();
  return () => {
    dauernd.delete(eintrag);
  };
}

/** Alle `ms` Millisekunden, solange der Tab sichtbar ist; gibt das Anhalten zurück. */
export function wiederhole(ms: number, fn: () => void): () => void {
  const id = setInterval(() => {
    if (document.visibilityState === 'visible') fn();
  }, ms);
  return () => clearInterval(id);
}
