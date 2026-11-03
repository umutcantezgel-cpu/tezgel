// SEO-Runde, Snippet-Runde (03.11.2026, docs/seo/KONTEXT.md Abschnitt 10 und 13): Google kürzt Titel und Descriptions im
// Suchergebnis nach Breite, nicht nach Zeichen. Gemessen wird wie in gängigen Werkzeugen mit Arial: Titel 20 px, Description
// 14 px. Die Breiten stammen aus Liberation Sans, deren Zeichen gleich breit sind wie in Arial (Einheiten je Geviert 2048,
// ohne Unterschneidung, also eher etwas zu breit). Unbekannte Zeichen zählen wie „M“.
// Grenzen: Screaming Frog meldet Titel über 561 px und Descriptions über 985 px (Prüfungen „Over 561 Pixels“ und
// „Over 985 Pixels“, abgerufen am 03.11.2026); SISTRIX nennt für Descriptions am Desktop 990 px. Google selbst nennt keine Zahl.

const EINHEITEN_JE_GEVIERT = 2048;
const BREITE_M = 1706;

/** Vorschubbreite je Zeichen in Einheiten von 2048 je Geviert (Liberation Sans Regular, metrisch gleich mit Arial) */
const BREITE: Readonly<Record<string, number>> = { " ": 569, "!": 569, "\"": 727, "#": 1139, "$": 1139, "%": 1821, "&": 1366, "'": 391, "(": 682, ")": 682, "*": 797, "+": 1196, ",": 569, "-": 682, ".": 569, "/": 569, "0": 1139, "1": 1139, "2": 1139, "3": 1139, "4": 1139, "5": 1139, "6": 1139, "7": 1139, "8": 1139, "9": 1139, ":": 569, ";": 569, "<": 1196, "=": 1196, ">": 1196, "?": 1139, "@": 2079, "A": 1366, "B": 1366, "C": 1479, "D": 1479, "E": 1366, "F": 1251, "G": 1593, "H": 1479, "I": 569, "J": 1024, "K": 1366, "L": 1139, "M": 1706, "N": 1479, "O": 1593, "P": 1366, "Q": 1593, "R": 1479, "S": 1366, "T": 1251, "U": 1479, "V": 1366, "W": 1933, "X": 1366, "Y": 1366, "Z": 1251, "[": 569, "\\": 569, "]": 569, "^": 961, "_": 1139, "`": 682, "a": 1139, "b": 1139, "c": 1024, "d": 1139, "e": 1139, "f": 569, "g": 1139, "h": 1139, "i": 455, "j": 455, "k": 1024, "l": 455, "m": 1706, "n": 1139, "o": 1139, "p": 1139, "q": 1139, "r": 682, "s": 1024, "t": 569, "u": 1139, "v": 1024, "w": 1479, "x": 1024, "y": 1024, "z": 1024, "{": 684, "|": 532, "}": 684, "~": 1196, "\u00a0": 569, "¡": 682, "¢": 1139, "£": 1139, "¤": 1139, "¥": 1139, "¦": 532, "§": 1139, "¨": 682, "©": 1509, "ª": 758, "«": 1139, "¬": 1196, "\u00ad": 682, "®": 1509, "¯": 1131, "°": 819, "±": 1124, "²": 682, "³": 682, "´": 682, "µ": 1180, "¶": 1100, "·": 682, "¸": 682, "¹": 682, "º": 748, "»": 1139, "¼": 1708, "½": 1708, "¾": 1708, "¿": 1251, "À": 1366, "Á": 1366, "Â": 1366, "Ã": 1366, "Ä": 1366, "Å": 1366, "Æ": 2048, "Ç": 1479, "È": 1366, "É": 1366, "Ê": 1366, "Ë": 1366, "Ì": 569, "Í": 569, "Î": 569, "Ï": 569, "Ð": 1479, "Ñ": 1479, "Ò": 1593, "Ó": 1593, "Ô": 1593, "Õ": 1593, "Ö": 1593, "×": 1196, "Ø": 1593, "Ù": 1479, "Ú": 1479, "Û": 1479, "Ü": 1479, "Ý": 1366, "Þ": 1366, "ß": 1251, "à": 1139, "á": 1139, "â": 1139, "ã": 1139, "ä": 1139, "å": 1139, "æ": 1821, "ç": 1024, "è": 1139, "é": 1139, "ê": 1139, "ë": 1139, "ì": 569, "í": 569, "î": 569, "ï": 569, "ð": 1139, "ñ": 1139, "ò": 1139, "ó": 1139, "ô": 1139, "õ": 1139, "ö": 1139, "÷": 1124, "ø": 1251, "ù": 1139, "ú": 1139, "û": 1139, "ü": 1139, "ý": 1024, "þ": 1139, "ÿ": 1024, "–": 1139, "—": 2048, "‘": 455, "’": 455, "‚": 455, "“": 682, "”": 682, "„": 682, "…": 2048, "•": 717, "€": 1139, "′": 384, "″": 725, "\u2009": 410, "\u202f": 410 };

/** Höchstbreite eines Titels in Pixeln (Arial 20 px) */
export const TITEL_PX_HOECHSTENS = 561;
/** Höchstbreite einer Description in Pixeln (Arial 14 px) */
export const DESCRIPTION_PX_HOECHSTENS = 985;
/** Schriftgrößen im Suchergebnis am Desktop */
export const TITEL_PX_SCHRIFT = 20;
export const DESCRIPTION_PX_SCHRIFT = 14;

/** Breite von `text` in Pixeln bei `schriftgroesse` px, auf eine Nachkommastelle */
export function pixelbreite(text: string, schriftgroesse: number): number {
  let einheiten = 0;
  for (const zeichen of text) einheiten += BREITE[zeichen] ?? BREITE_M;
  return Math.round((einheiten * schriftgroesse * 10) / EINHEITEN_JE_GEVIERT) / 10;
}

export const titelBreite = (titel: string): number => pixelbreite(titel, TITEL_PX_SCHRIFT);
export const beschreibungBreite = (beschreibung: string): number => pixelbreite(beschreibung, DESCRIPTION_PX_SCHRIFT);
