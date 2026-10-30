// Glossar (KERN v3 K-011): Fachwörter mit Alltagserklärung (höchstens 15 Wörter). Quelle für den Baustein `Fachwort`.
// Erzeugt aus `_werkstatt/regeln/glossar.json` (Prüfliste von `lesbarkeit.mjs`); beide Fassungen bleiben gleich (E2-ORCH-02a).
// `klammer` ist dieselbe Erklärung für die Klammer hinter dem Wort: ohne Schlusspunkt, Satzteile mit Semikolon, kleiner Anfang
// außer bei Substantiven.

export interface Glossareintrag {
  begriffe: string[];
  erklaerung: string;
  klammer: string;
}

export const GLOSSAR = {
  "abdichtung": {
    begriffe: ["Abdichtung", "Verbundabdichtung", "AIV"],
    erklaerung: "Eine wasserdichte Schicht direkt unter den Fliesen, damit kein Wasser in Wand und Boden dringt.",
    klammer: "eine wasserdichte Schicht direkt unter den Fliesen, damit kein Wasser in Wand und Boden dringt",
  },
  "din-18534": {
    begriffe: ["DIN 18534"],
    erklaerung: "Die Regel für Abdichtungen in Bad und Dusche.",
    klammer: "die Regel für Abdichtungen in Bad und Dusche",
  },
  "din-18040": {
    begriffe: ["DIN 18040"],
    erklaerung: "Die Regel für barrierefreies Bauen: ohne Stufen, mit genug Platz zum Bewegen.",
    klammer: "die Regel für barrierefreies Bauen: ohne Stufen, mit genug Platz zum Bewegen",
  },
  "din-18157": {
    begriffe: ["DIN 18157"],
    erklaerung: "Die Regel, wie Fliesen im Kleberbett fest und dauerhaft verlegt werden.",
    klammer: "die Regel, wie Fliesen im Kleberbett fest und dauerhaft verlegt werden",
  },
  "barrierefrei": {
    begriffe: ["barrierefrei", "barrierearm"],
    erklaerung: "So gebaut, dass man es auch mit Rollator oder Rollstuhl gut nutzen kann.",
    klammer: "so gebaut, dass man es auch mit Rollator oder Rollstuhl gut nutzen kann",
  },
  "bodengleiche-dusche": {
    begriffe: ["bodengleiche Dusche", "Walk-in-Dusche"],
    erklaerung: "Eine Dusche ohne Stufe, auf gleicher Höhe wie der Boden im Bad.",
    klammer: "eine Dusche ohne Stufe, auf gleicher Höhe wie der Boden im Bad",
  },
  "c2te-s1": {
    begriffe: ["C2TE S1", "Kleberklasse"],
    erklaerung: "Gibt an, wie fest ein Fliesenkleber hält und wie gut er nachgibt.",
    klammer: "gibt an, wie fest ein Fliesenkleber hält und wie gut er nachgibt",
  },
  "stelzlager": {
    begriffe: ["Stelzlager"],
    erklaerung: "Kleine Füße, auf denen Terrassenplatten liegen. Regen läuft darunter ab.",
    klammer: "kleine Füße, auf denen Terrassenplatten liegen; Regen läuft darunter ab",
  },
  "rutschhemmung": {
    begriffe: ["Rutschhemmung", "R9", "R10", "R11"],
    erklaerung: "Wie rutschfest eine Fliese ist. Je höher die Zahl nach dem R, desto sicherer.",
    klammer: "wie rutschfest eine Fliese ist; je höher die Zahl nach dem R, desto sicherer",
  },
  "en-16165": {
    begriffe: ["EN 16165"],
    erklaerung: "Ein Prüfverfahren dafür, wie rutschfest ein Bodenbelag ist.",
    klammer: "ein Prüfverfahren dafür, wie rutschfest ein Bodenbelag ist",
  },
  "nivelliersystem": {
    begriffe: ["Nivelliersystem"],
    erklaerung: "Kleine Klemmen, die große Fliesen beim Verlegen genau auf eine Höhe bringen.",
    klammer: "kleine Klemmen, die große Fliesen beim Verlegen genau auf eine Höhe bringen",
  },
  "vakuumhebetechnik": {
    begriffe: ["Vakuumhebetechnik"],
    erklaerung: "Saugheber, mit denen wir sehr große Fliesen sicher anheben und ablegen.",
    klammer: "Saugheber, mit denen wir sehr große Fliesen sicher anheben und ablegen",
  },
  "untergrund": {
    begriffe: ["Untergrund"],
    erklaerung: "Alles, was unter der Fliese liegt, zum Beispiel Estrich, Putz oder alte Fliesen.",
    klammer: "alles, was unter der Fliese liegt, zum Beispiel Estrich, Putz oder alte Fliesen",
  },
  "estrich": {
    begriffe: ["Estrich", "Heizestrich", "Calciumsulfatestrich"],
    erklaerung: "Die glatte Schicht auf dem Rohboden, auf die später die Fliesen kommen.",
    klammer: "die glatte Schicht auf dem Rohboden, auf die später die Fliesen kommen",
  },
  "belegreife": {
    begriffe: ["Belegreife", "Restfeuchte", "CM-Messung"],
    erklaerung: "Wir messen, ob der Estrich trocken genug ist, damit die Fliesen sicher halten.",
    klammer: "wir messen, ob der Estrich trocken genug ist, damit die Fliesen sicher halten",
  },
  "ausgleichsmasse": {
    begriffe: ["Ausgleichsmasse"],
    erklaerung: "Eine flüssige Masse, die Unebenheiten im Boden glättet, bevor wir fliesen.",
    klammer: "eine flüssige Masse, die Unebenheiten im Boden glättet, bevor wir fliesen",
  },
  "entkopplung": {
    begriffe: ["Entkopplung"],
    erklaerung: "Eine Matte unter den Fliesen, die kleine Risse im Untergrund abfängt.",
    klammer: "eine Matte unter den Fliesen, die kleine Risse im Untergrund abfängt",
  },
  "drainage": {
    begriffe: ["Drainage"],
    erklaerung: "Eine Schicht, durch die Wasser unter dem Belag abfließen kann.",
    klammer: "eine Schicht, durch die Wasser unter dem Belag abfließen kann",
  },
  "gefaelle": {
    begriffe: ["Gefälle"],
    erklaerung: "Der Boden neigt sich leicht, damit Wasser von selbst zum Ablauf fließt.",
    klammer: "der Boden neigt sich leicht, damit Wasser von selbst zum Ablauf fließt",
  },
  "feinsteinzeug": {
    begriffe: ["Feinsteinzeug"],
    erklaerung: "Sehr harte, dichte Fliesen, die kaum Wasser aufnehmen und lange halten.",
    klammer: "sehr harte, dichte Fliesen, die kaum Wasser aufnehmen und lange halten",
  },
  "grossformat": {
    begriffe: ["Großformat"],
    erklaerung: "Große Fliesen, zum Beispiel 120 × 260\u00a0cm. Es gibt dann weniger Fugen.",
    klammer: "große Fliesen, zum Beispiel 120 × 260\u00a0cm; es gibt dann weniger Fugen",
  },
  "kuvertschnitt": {
    begriffe: ["Kuvertschnitt"],
    erklaerung: "Die Fliesen sind schräg zum Ablauf geschnitten, damit das Wasser gut abläuft.",
    klammer: "die Fliesen sind schräg zum Ablauf geschnitten, damit das Wasser gut abläuft",
  },
  "gehrung": {
    begriffe: ["Gehrung"],
    erklaerung: "Zwei Fliesenkanten sind schräg geschnitten und bilden an der Ecke eine saubere Kante.",
    klammer: "zwei Fliesenkanten sind schräg geschnitten und bilden an der Ecke eine saubere Kante",
  },
  "silikonfuge": {
    begriffe: ["Silikonfuge"],
    erklaerung: "Die weiche Fuge in Ecken und an Wanne oder Dusche.",
    klammer: "die weiche Fuge in Ecken und an Wanne oder Dusche",
  },
  "epoxidharz": {
    begriffe: ["Epoxidharz"],
    erklaerung: "Ein sehr fester Kunststoff für Fugen, die viel aushalten müssen.",
    klammer: "ein sehr fester Kunststoff für Fugen, die viel aushalten müssen",
  },
  "haftbruecke": {
    begriffe: ["Haftbrücke", "Grundierung"],
    erklaerung: "Ein Anstrich auf dem Untergrund, damit Kleber oder Spachtel gut halten.",
    klammer: "ein Anstrich auf dem Untergrund, damit Kleber oder Spachtel gut halten",
  },
  "dichtband": {
    begriffe: ["Dichtband", "Dichtmanschette"],
    erklaerung: "Bänder und Stücke, die Ecken, Rohre und Abläufe in der Abdichtung dicht machen.",
    klammer: "Bänder und Stücke, die Ecken, Rohre und Abläufe in der Abdichtung dicht machen",
  },
  "duschrinne": {
    begriffe: ["Duschrinne"],
    erklaerung: "Ein schmaler, langer Ablauf im Boden der Dusche.",
    klammer: "ein schmaler, langer Ablauf im Boden der Dusche",
  },
  "punktablauf": {
    begriffe: ["Punktablauf"],
    erklaerung: "Ein kleiner, quadratischer Ablauf im Boden der Dusche.",
    klammer: "ein kleiner, quadratischer Ablauf im Boden der Dusche",
  },
  "vorwand": {
    begriffe: ["Vorwand"],
    erklaerung: "Eine vorgesetzte Wand, in der Rohre und der Spülkasten verschwinden.",
    klammer: "eine vorgesetzte Wand, in der Rohre und der Spülkasten verschwinden",
  },
  "trockenbau": {
    begriffe: ["Trockenbau"],
    erklaerung: "Wände aus Platten statt aus Stein, zum Beispiel für Vorwände und Nischen.",
    klammer: "Wände aus Platten statt aus Stein, zum Beispiel für Vorwände und Nischen",
  },
  "impraegnierung": {
    begriffe: ["Imprägnierung"],
    erklaerung: "Ein Schutzmittel, das Naturstein vor Flecken und Wasser schützt.",
    klammer: "ein Schutzmittel, das Naturstein vor Flecken und Wasser schützt",
  },
  "ausbluehung": {
    begriffe: ["Ausblühung"],
    erklaerung: "Weiße Flecken auf Platten oder Fugen, die durch Wasser im Untergrund entstehen.",
    klammer: "weiße Flecken auf Platten oder Fugen, die durch Wasser im Untergrund entstehen",
  },
  "duennbett": {
    begriffe: ["Dünnbett", "Mittelbett", "Mörtelbett"],
    erklaerung: "Wie dick die Kleberschicht unter der Fliese ist: dünn, mittel oder dick.",
    klammer: "wie dick die Kleberschicht unter der Fliese ist: dünn, mittel oder dick",
  },
  "buttering": {
    begriffe: ["Buttering"],
    erklaerung: "Wir streichen Kleber zusätzlich auf die Rückseite der Fliese, damit sie voll aufliegt.",
    klammer: "wir streichen Kleber zusätzlich auf die Rückseite der Fliese, damit sie voll aufliegt",
  },
  "passstueck": {
    begriffe: ["Passstück"],
    erklaerung: "Eine zugeschnittene Fliese am Rand einer Fläche.",
    klammer: "eine zugeschnittene Fliese am Rand einer Fläche",
  },
  "fugenachse": {
    begriffe: ["Fugenachse", "Fugenraster"],
    erklaerung: "Die Linien, die die Fugen über die ganze Fläche bilden.",
    klammer: "die Linien, die die Fugen über die ganze Fläche bilden",
  },
  "ueberzaehne": {
    begriffe: ["Überzähne"],
    erklaerung: "Fliesenkanten, die höher stehen als die Nachbarfliese.",
    klammer: "Fliesenkanten, die höher stehen als die Nachbarfliese",
  },
  "blockstufe": {
    begriffe: ["Blockstufe"],
    erklaerung: "Eine Treppenstufe aus einem massiven Stück.",
    klammer: "eine Treppenstufe aus einem massiven Stück",
  },
  "rissverharzung": {
    begriffe: ["Rissverharzung"],
    erklaerung: "Risse im Estrich werden mit Harz gefüllt und dauerhaft verschlossen.",
    klammer: "Risse im Estrich werden mit Harz gefüllt und dauerhaft verschlossen",
  },
  "randfuge": {
    begriffe: ["Randfuge"],
    erklaerung: "Ein schmaler Spalt am Rand, damit sich der Boden bewegen kann.",
    klammer: "ein schmaler Spalt am Rand, damit sich der Boden bewegen kann",
  },
  "sinterschicht": {
    begriffe: ["Sinterschicht"],
    erklaerung: "Eine dünne, feste Haut auf neuem Estrich, die wir vor dem Fliesen abschleifen.",
    klammer: "eine dünne, feste Haut auf neuem Estrich, die wir vor dem Fliesen abschleifen",
  },
  "klopfprobe": {
    begriffe: ["Klopfprobe"],
    erklaerung: "Wir klopfen auf die Fliesen. Klingt es hohl, hält die Fliese nicht mehr.",
    klammer: "wir klopfen auf die Fliesen; klingt es hohl, hält die Fliese nicht mehr",
  },
  "bodenrost": {
    begriffe: ["Bodenrost"],
    erklaerung: "Ein Gitter vor der Tür, unter dem Regenwasser abläuft.",
    klammer: "ein Gitter vor der Tür, unter dem Regenwasser abläuft",
  },
  "schadensanalyse": {
    begriffe: ["Schadensanalyse"],
    erklaerung: "Wir suchen vor Ort die Ursache eines Schadens, bevor wir etwas reparieren.",
    klammer: "wir suchen vor Ort die Ursache eines Schadens, bevor wir etwas reparieren",
  },
  "wassereinwirkungsklasse": {
    begriffe: ["Wassereinwirkungsklasse", "Wassereinwirkungsklassen", "W0-I", "W1-I", "W2-I", "W3-I"],
    erklaerung: "Gruppe einer Fläche danach, wie viel Wasser auf sie trifft, von wenig bis sehr viel.",
    klammer: "Gruppe einer Fläche danach, wie viel Wasser auf sie trifft, von wenig bis sehr viel",
  },
} as const satisfies Record<string, Glossareintrag>;

export type GlossarId = keyof typeof GLOSSAR;

export function istGlossarId(id: string): id is GlossarId {
  return Object.prototype.hasOwnProperty.call(GLOSSAR, id);
}
