// SEO-Runde, Snippet-Runde (03.11.2026, docs/seo/KONTEXT.md Abschnitt 10 und 13): eigene Titel je Adresse. Ein Eintrag hier
// geht vor den Titel, den die Seite an createMetadata übergibt (src/lib/metadata.ts), wie META_BESCHREIBUNGEN bei den
// Descriptions. Regeln: 50 bis 58 Zeichen, höchstens 561 px (Arial 20 px), Markenzusatz „ | Fliesenverlegung Tezgel“ oder
// „ · Tezgel“ (test/meta.test.mjs, Meta 6). Die Seiten Leistung × Ort und die Ortsseiten ohne eigenen Inhalt setzen ihre
// Titel aus Vorlagen (src/lib/seo/titel.ts, src/inhalte/orte.ts) und stehen deshalb nicht hier.
export const META_TITEL: Readonly<Record<string, string>> = {
  '/ausstellung/giessen': 'Fliesenberatung und Materialauswahl in Gießen · Tezgel',
  '/ausstellung/wetzlar': 'Fliesenberatung und Materialauswahl in Wetzlar · Tezgel',
  '/beratung': 'Kostenlose Fliesenberatung bei Ihnen vor Ort · Tezgel',
  '/downloads': 'Infomaterial und Checkliste | Fliesenverlegung Tezgel',
  '/faq': 'FAQ zu Fliesen, Bad und Balkon | Fliesenverlegung Tezgel',
  '/foerderung': 'Förderung fürs barrierefreie Bad, bis zu 4.180 € · Tezgel',
  '/karriere/ausbildung': 'Ausbildung zum Fliesenleger in Aßlar bei Wetzlar · Tezgel',
  '/kontakt': 'Kontakt per Telefon und WhatsApp | Fliesenverlegung Tezgel',
  '/leistungen': 'Leistungen vom Fliesenleger, von Bad bis Balkon · Tezgel',
  '/leistungen/aussen': 'Fliesen im Außenbereich verlegen | Fliesenverlegung Tezgel',
  '/leistungen/bad': 'Fliesenarbeiten rund ums Bad | Fliesenverlegung Tezgel',
  '/leistungen/untergrund': 'Untergrund vorbereiten vor dem Fliesenlegen · Tezgel',
  '/leistungen/wohnen': 'Fliesen im Wohnbereich verlegen | Fliesenverlegung Tezgel',
  '/preise': 'Fliesenleger Preise und Kosten | Fliesenverlegung Tezgel',
  '/standorte': 'Fliesenleger in Mittelhessen und der Wetterau · Tezgel',
  '/standorte/asslar': 'Fliesenleger in Aßlar seit 2008 | Fliesenverlegung Tezgel',
  '/standorte/wetzlar': 'Fliesenleger Wetzlar & Umgebung | Fliesenverlegung Tezgel',
  '/team': 'Unser Team aus Fliesenlegern | Fliesenverlegung Tezgel',
  '/termin': 'Termin vor Ort vereinbaren, Wunschtag wählen · Tezgel',
  '/ueber-uns': 'Über uns, Inhaber Deniz Tezgel | Fliesenverlegung Tezgel',
  '/unternehmen': 'Unternehmensgeschichte seit 2008 | Fliesenverlegung Tezgel',
};
