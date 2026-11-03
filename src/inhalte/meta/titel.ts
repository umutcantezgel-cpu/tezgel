// SEO-Runde, Snippet-Runde (03.11.2026, docs/seo/KONTEXT.md Abschnitt 10 und 13): eigene Titel je Adresse. Ein Eintrag hier
// geht vor den Titel, den die Seite an createMetadata übergibt (src/lib/metadata.ts), wie META_BESCHREIBUNGEN bei den
// Descriptions. Regeln: 50 bis 58 Zeichen, höchstens 561 px (Arial 20 px), Markenzusatz „ | Fliesenverlegung Tezgel“ oder
// „ · Tezgel“ (test/meta.test.mjs, Meta 6). Die Seiten Leistung × Ort und die Ortsseiten ohne eigenen Inhalt setzen ihre
// Titel aus Vorlagen (src/lib/seo/titel.ts, src/inhalte/orte.ts) und stehen deshalb nicht hier.
export const META_TITEL: Readonly<Record<string, string>> = {};
