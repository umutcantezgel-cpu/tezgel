// Navigation (KERN v3 K-009, Baumtest E1-PROBE-IA / E-015): fünf Hauptpunkte in Alltagswörtern, je höchstens eine
// Aufklappebene, kein Thema doppelt. Fachthemen, Hilfen und Rechtliches stehen nicht im Kopf, aber vollständig im Fuß.
// Jeder Pfad verweist auf eine echte Route (Adressen bleiben, Z-14).

import { CITIES } from '@/config/cities';

/** Hauptnavigation: Kopf (ab xl) und Mobilmenü. `kurz` erklärt den Bereich in einem Satz. */
export const navigationLinks = [
    {
        name: 'Bad',
        path: '/bad',
        kurz: 'Neues Bad, Dusche ohne Stufe und große Fliesen',
        items: [
            { name: 'Bad komplett erneuern', path: '/bad/badsanierung', desc: 'Vom Ausbau bis zur letzten Fuge' },
            { name: 'Dusche statt Wanne', path: '/bad/barrierefreies-bad', desc: 'Sicher duschen ohne Stufe' },
            { name: 'Große Fliesen im Bad', path: '/bad/fliesen', desc: 'Wenige Fugen, ruhige Flächen' },
            { name: 'Alles aus einer Hand', path: '/bad/bad-aus-einer-hand', desc: 'Ein Ansprechpartner für alle Arbeiten' },
            { name: 'Ideen nach Badgröße', path: '/bad/musterbaeder', desc: 'Vom kleinen Gäste-WC bis zum großen Bad' },
        ],
    },
    {
        name: 'Böden und Wände',
        path: '/leistungen/wohnen',
        kurz: 'Fliesen für Küche, Flur, Neubau und Treppen',
        items: [
            { name: 'Küche', path: '/fliesen/kueche', desc: 'Boden und Wand hinter der Arbeitsfläche' },
            { name: 'Flur und Diele', path: '/fliesen/flur-diele', desc: 'Robust für jeden Tag' },
            { name: 'Neubau', path: '/fliesen/neubau', desc: 'Böden und Wände im ganzen Haus' },
            { name: 'Treppen', path: '/treppen', desc: 'Innen, außen und im Treppenhaus' },
            { name: 'Naturstein', path: '/naturstein', desc: 'Granit, Marmor und Kalkstein' },
            { name: 'Reparatur und Fugen', path: '/fliesenreparatur', desc: 'Einzelne Fliesen und alte Fugen erneuern' },
        ],
    },
    {
        name: 'Balkon und Terrasse',
        path: '/balkon-terrasse',
        kurz: 'Dicht und sicher draußen',
        items: [
            { name: 'Balkon erneuern', path: '/balkon-terrasse/balkonsanierung', desc: 'Wenn Wasser stehen bleibt' },
            { name: 'Terrassenplatten', path: '/balkon-terrasse/terrassenplatten', desc: 'Platten aus Keramik für draußen' },
            { name: 'Platten auf Stelzen', path: '/balkon-terrasse/stelzlager', desc: 'Regen läuft unter den Platten ab' },
        ],
    },
    {
        name: 'Unsere Arbeiten',
        path: '/referenzen',
        kurz: 'Fotos fertiger Bäder, Böden und Balkone',
        items: [],
    },
    {
        name: 'Über uns',
        path: '/ueber-uns',
        kurz: 'Wer wir sind und wie wir arbeiten',
        items: [
            { name: 'Deniz Tezgel und Team', path: '/ueber-uns', desc: 'Fachbetrieb in Aßlar seit 2008' },
            { name: 'Wo wir arbeiten', path: '/standorte', desc: 'Wetzlar, Gießen und die Orte rundherum' },
            { name: 'Ablauf und Kosten', path: '/preise', desc: 'Was ein Termin vor Ort und ein Angebot bringen' },
            { name: 'Ratgeber', path: '/blog', desc: 'Antworten auf typische Fragen am Bau' },
            { name: 'Fragen und Antworten', path: '/faq', desc: 'Kurz und verständlich erklärt' },
            { name: 'Kontakt', path: '/kontakt', desc: 'Anrufen, schreiben oder Termin anfragen' },
        ],
    },
];

/** Die eine Hauptaktion jeder Seite (K-004): Beschriftung und Ziel überall gleich. */
export const primaryCta = { name: 'Termin vor Ort anfragen', path: '/kontakt' };

/** Ziel der Hauptaktion auf einer Seite: auf der Startseite ihr eigenes Formular (#termin), sonst /kontakt. So tragen
 *  alle Hauptknöpfe einer Seite (Kopf, Menü, Leiste, Inhalt) dasselbe Ziel (K-004, Z-11). */
export function hauptziel(pathname) {
    return pathname === '/' ? '#termin' : primaryCta.path;
}

/** Abläufe, auf denen die untere Leiste ausgeblendet ist (sie verdeckte sonst Schritte); dort behält der Kopf Telefon
 *  und Hauptknopf auch unter lg. Eine Liste für Leiste und Kopf. */
export function ohneLeiste(pathname) {
    return ['/badanfrage', '/projekt-check', '/badplaner', '/konfigurator'].some((teil) => pathname.includes(teil));
}

/** Fuß: vollständige, geordnete Übersicht aller Bereiche (Auftrag Abschnitt 6, K-009). */
export const footerGruppen = [
    {
        title: 'Bad',
        links: [
            { name: 'Bad im Überblick', path: '/bad' },
            { name: 'Bad komplett erneuern', path: '/bad/badsanierung' },
            { name: 'Dusche statt Wanne', path: '/bad/barrierefreies-bad' },
            { name: 'Große Fliesen im Bad', path: '/bad/fliesen' },
            { name: 'Alles aus einer Hand', path: '/bad/bad-aus-einer-hand' },
            { name: 'Ideen nach Badgröße', path: '/bad/musterbaeder' },
            { name: 'Leistungen fürs Bad', path: '/leistungen/bad' },
        ],
    },
    {
        title: 'Böden und Wände',
        links: [
            { name: 'Böden und Wände im Überblick', path: '/leistungen/wohnen' },
            { name: 'Küche', path: '/fliesen/kueche' },
            { name: 'Flur und Diele', path: '/fliesen/flur-diele' },
            { name: 'Neubau', path: '/fliesen/neubau' },
            { name: 'Renovierung', path: '/fliesen/renovierung' },
            { name: 'Große Fliesen', path: '/fliesen/grossformat' },
            { name: 'Fliesen in Holzoptik', path: '/fliesen/holzoptik' },
            { name: 'Fliesen auf Fußbodenheizung', path: '/fliesen/auf-fussbodenheizung' },
            { name: 'Treppen', path: '/treppen' },
            { name: 'Treppe innen', path: '/treppen/innentreppe' },
            { name: 'Treppe außen', path: '/treppen/aussentreppe' },
            { name: 'Treppenhaus', path: '/treppen/treppenhaus' },
            { name: 'Naturstein', path: '/naturstein' },
            { name: 'Granit', path: '/naturstein/granit' },
            { name: 'Marmor und Kalkstein', path: '/naturstein/marmor-kalkstein' },
            { name: 'Reparatur von Fliesen', path: '/fliesenreparatur' },
            { name: 'Fugen erneuern', path: '/fliesen/fugensanierung' },
            { name: 'Schäden ansehen lassen', path: '/schadensanalyse' },
        ],
    },
    {
        title: 'Balkon und Terrasse',
        links: [
            { name: 'Balkon und Terrasse im Überblick', path: '/balkon-terrasse' },
            { name: 'Balkon erneuern', path: '/balkon-terrasse/balkonsanierung' },
            { name: 'Terrassenplatten', path: '/balkon-terrasse/terrassenplatten' },
            { name: 'Platten auf Stelzen', path: '/balkon-terrasse/stelzlager' },
            { name: 'Leistungen für draußen', path: '/leistungen/aussen' },
        ],
    },
    {
        title: 'Wissen',
        links: [
            { name: 'Alle Leistungen', path: '/leistungen' },
            { name: 'Fliesen verstehen', path: '/fliesen' },
            { name: 'Welche Fliese wofür', path: '/fliesen/fliesenarten' },
            { name: 'Verlegemuster', path: '/fliesen/verlegemuster' },
            { name: 'So verlegen wir', path: '/fliesen/verlegetechnik' },
            { name: 'Abnahme der Arbeit', path: '/fliesen/abnahme' },
            { name: 'Untergrund und Abdichtung', path: '/untergrund-abdichtung' },
            { name: 'Abdichtung nach DIN 18534', path: '/untergrund-abdichtung/din-18534' },
            { name: 'Gefälle und Ausgleich', path: '/untergrund-abdichtung/ausgleich-gefaelle' },
            { name: 'Entkopplung', path: '/untergrund-abdichtung/entkopplung' },
            { name: 'Wann der Estrich bereit ist', path: '/untergrund-abdichtung/estrich-belegreife' },
            { name: 'Fliesen auf Fliesen', path: '/untergrund-abdichtung/fliesen-auf-fliesen' },
            { name: 'Leistungen für den Untergrund', path: '/leistungen/untergrund' },
            { name: 'Ratgeber', path: '/blog' },
            { name: 'Fragen und Antworten', path: '/faq' },
            { name: 'Zuschüsse', path: '/foerderung' },
        ],
    },
    {
        title: 'Hilfen für Ihre Anfrage',
        links: [
            { name: 'Kontakt', path: '/kontakt' },
            { name: 'Termin wählen', path: '/termin' },
            { name: 'Beratung bei Ihnen vor Ort', path: '/beratung' },
            { name: 'Ablauf und Kosten', path: '/preise' },
            { name: 'Anfrage fürs Bad', path: '/bad/badanfrage' },
            { name: 'Badplaner', path: '/bad/badplaner' },
            { name: 'Bad in 2 Minuten beschreiben', path: '/bad/projekt-check' },
            { name: 'Fliesen zusammenstellen', path: '/fliesen/konfigurator' },
            { name: 'Angebot mit festem Preis', path: '/fliesen/festpreisangebot' },
            { name: 'Unterlagen zum Herunterladen', path: '/downloads' },
        ],
    },
    {
        title: 'Wo wir arbeiten',
        links: [
            { name: 'Alle Orte', path: '/standorte' },
            ...CITIES.map((city) => ({ name: city.name, path: `/standorte/${city.slug}` })),
            { name: 'Fliesenberatung Wetzlar', path: '/ausstellung/wetzlar' },
            { name: 'Fliesenberatung Gießen', path: '/ausstellung/giessen' },
        ],
    },
    {
        title: 'Über uns',
        links: [
            { name: 'Deniz Tezgel und Team', path: '/ueber-uns' },
            { name: 'Team', path: '/team' },
            { name: 'So arbeiten wir', path: '/unternehmen' },
            { name: 'Unsere Arbeiten', path: '/referenzen' },
            { name: 'Arbeiten bei uns', path: '/karriere' },
            { name: 'Ausbildung', path: '/karriere/ausbildung' },
            { name: 'Partner', path: '/partner' },
        ],
    },
];

export const footerLegalLinks = [
    { name: 'Impressum', path: '/impressum' },
    { name: 'Datenschutz', path: '/datenschutz' },
    { name: 'AGB', path: '/agb' },
    { name: 'Widerruf', path: '/widerruf' },
    { name: 'Cookie-Richtlinie', path: '/cookie-richtlinie' },
    { name: 'Cookie-Einstellungen', path: '#cookie-settings' },
    { name: 'Barrierefreiheit', path: '/barrierefreiheit' }
];

export default navigationLinks;
