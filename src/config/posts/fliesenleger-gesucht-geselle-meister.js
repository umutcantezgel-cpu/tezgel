// Blog-Artikel: Wir suchen Verstärkung: Fliesenleger/in, Geselle oder Meister (m/w/d)
// Kurze Ankündigung – die vollständige Stellenausschreibung steht auf /karriere.

import { COMPANY_DATA } from '@/config/company';

const { owner, contact, headquarters, authority, business } = COMPANY_DATA;

const post = {
    "id": "13",
    "slug": "fliesenleger-gesucht-geselle-meister",
    "title": "Wir suchen Verstärkung: Fliesenleger/in, Geselle oder Meister (m/w/d)",
    "excerpt": "Fliesenverlegung Tezgel in Aßlar sucht eine Fliesenlegerin oder einen Fliesenleger als Geselle oder Meister (m/w/d). Hier erfahren Sie kurz, was Sie erwartet und wie Sie sich bei uns melden.",
    "category": "news",
    "author": "Fliesenverlegung Tezgel",
    "date": "24. September 2026",
    "publishedAt": "2026-09-24T08:00:00+02:00",
    "readTime": "2 Min.",
    "image": "/images/blog/post-13.png",
    "featured": false,
    "tags": [
        "Karriere",
        "Stellenangebot",
        "Fliesenleger",
        "Aßlar",
        "Handwerk"
    ],
    "content": `Unser Team braucht Verstärkung: Wir suchen eine **Fliesenlegerin oder einen Fliesenleger (m/w/d) als Geselle oder Meister**. Wenn Sie Ihr Handwerk beherrschen und Freude an sauberer, präziser Arbeit haben, freuen wir uns, von Ihnen zu hören.

## Wer wir sind

Fliesenverlegung Tezgel ist ein Fliesen-, Platten- und Mosaikleger-Meisterbetrieb mit Sitz in ${headquarters.city}, eingetragen bei der ${authority.name}. Inhaber ist Fliesenlegermeister ${owner.fullName}; den Betrieb gibt es seit ${business.establishmentYear}. Unsere Baustellen liegen in ${headquarters.city}, Wetzlar und Mittelhessen.

## Wen wir suchen

Fliesenleger/in (m/w/d) mit abgeschlossener Ausbildung, gern auch mit Meistertitel. Sie arbeiten selbstständig und sorgfältig, gehen respektvoll mit Kunden in bewohnten Häusern um und legen Wert auf ein sauberes Ergebnis.

## Woran Sie mitarbeiten

- Badsanierungen und bodengleiche Duschen, einschließlich Abdichtung nach DIN 18534
- großformatige Fliesen in Bädern und Wohnbereichen
- Böden in Küche, Flur und Wohnräumen
- Treppen innen und außen
- Balkone und Terrassen
- Naturstein

## So melden Sie sich

Die ausführliche Stellenbeschreibung und alle Informationen zur Bewerbung finden Sie auf unserer Seite [Karriere](/karriere). Sie können sich auch direkt bei uns melden:

- **Telefon:** [${contact.phone}](tel:${contact.phoneLink})
- **WhatsApp:** [${contact.whatsapp}](${contact.whatsappLink})
- **E-Mail:** [${contact.email}](mailto:${contact.email})

Der erste Kontakt ist unkompliziert: Ein Anruf, eine WhatsApp-Nachricht oder eine kurze E-Mail genügt.

Sie möchten das Handwerk erst erlernen? Informationen zur Ausbildung finden Sie unter [Ausbildung zum Fliesenleger](/karriere/ausbildung). Mehr über unseren Betrieb lesen Sie auf der Seite [Über uns](/ueber-uns).

## Fazit

Sie sind Fliesenleger/in als Geselle oder Meister und suchen einen Meisterbetrieb in der Region ${headquarters.city} und Wetzlar? Dann melden Sie sich bei uns – über die [Karriereseite](/karriere) oder über unsere [Kontaktseite](/kontakt).`
};

export default post;
