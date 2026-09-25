// FACHTHEMEN – FLIESENVERLEGUNG TEZGEL
// Wissens- und Leistungsbereiche rund um Fliesen, Untergrund, Außenbeläge,
// Naturstein, Treppen und Service. Einzige Quelle für Navigation, Footer,
// Startseiten-Portal und Sitemap.

export const TOPIC_HUBS = [
    {
        id: 'fliesen',
        name: 'Fliesen & Verlegung',
        path: '/fliesen',
        description: 'Formate, Materialien, Verlegemuster und Verlegetechnik',
        pages: [
            { name: 'Fliesen-Ratgeber', path: '/fliesen', desc: 'Überblick über Formate, Räume und Technik' },
            { name: 'XXL-Großformate', path: '/fliesen/grossformat', desc: 'Fugenarm, planeben, präzise verlegt' },
            { name: 'Fliesen auf Fußbodenheizung', path: '/fliesen/auf-fussbodenheizung', desc: 'Aufbau, Fugen und Kleberwahl' },
            { name: 'Fliesen in Holzoptik', path: '/fliesen/holzoptik', desc: 'Dielenlook mit keramischer Robustheit' },
            { name: 'Fliesenarten im Vergleich', path: '/fliesen/fliesenarten', desc: 'Feinsteinzeug, Steinzeug, Steingut' },
            { name: 'Küche fliesen', path: '/fliesen/kueche', desc: 'Küchenboden und Küchenrückwand' },
            { name: 'Flur & Diele fliesen', path: '/fliesen/flur-diele', desc: 'Robust vom Eingang bis ins Wohnen' },
            { name: 'Verlegemuster & Abschlüsse', path: '/fliesen/verlegemuster', desc: 'Fugenbild, Verband, Kanten und Sockel' },
            { name: 'Verlegetechnik & Werkstoffe', path: '/fliesen/verlegetechnik', desc: 'Kleber, Bettung und Fugenmörtel' },
            { name: 'Renovierung im Bestand', path: '/fliesen/renovierung', desc: 'Neuer Boden im bewohnten Haus' },
            { name: 'Fliesen im Neubau', path: '/fliesen/neubau', desc: 'Sauber eingeplant im Bauablauf' },
            { name: 'Fugensanierung', path: '/fliesen/fugensanierung', desc: 'Silikon- und Zementfugen erneuern' },
            { name: 'Abnahme & Qualität', path: '/fliesen/abnahme', desc: 'Woran Sie gute Fliesenarbeit erkennen' },
            { name: 'Festpreisangebot', path: '/fliesen/festpreisangebot', desc: 'Was den Aufwand bestimmt' },
            { name: 'Fliesen-Konfigurator', path: '/fliesen/konfigurator', desc: 'Projekt in 4 Schritten vorbereiten' }
        ]
    },
    {
        id: 'untergrund-abdichtung',
        name: 'Untergrund & Abdichtung',
        path: '/untergrund-abdichtung',
        description: 'Das Fundament jedes dauerhaften Fliesenbelags',
        pages: [
            { name: 'Untergrund & Abdichtung', path: '/untergrund-abdichtung', desc: 'Tragfähig, eben, trocken, dicht' },
            { name: 'Abdichtung nach DIN 18534', path: '/untergrund-abdichtung/din-18534', desc: 'Verbundabdichtung in Nassräumen' },
            { name: 'Estrich & Belegreife', path: '/untergrund-abdichtung/estrich-belegreife', desc: 'Restfeuchte prüfen vor dem Fliesen' },
            { name: 'Fliesen auf Fliesen', path: '/untergrund-abdichtung/fliesen-auf-fliesen', desc: 'Überfliesen oder Rückbau?' },
            { name: 'Entkopplung & Holzuntergründe', path: '/untergrund-abdichtung/entkopplung', desc: 'Kritische Untergründe sicher belegen' },
            { name: 'Ausgleich & Gefälle', path: '/untergrund-abdichtung/ausgleich-gefaelle', desc: 'Eben verlegen, Wasser gezielt ableiten' }
        ]
    },
    {
        id: 'balkon-terrasse',
        name: 'Balkon & Terrasse',
        path: '/balkon-terrasse',
        description: 'Außenbeläge, die Frost und Regen standhalten',
        pages: [
            { name: 'Balkon & Terrasse', path: '/balkon-terrasse', desc: 'Aufbauten und Beläge im Überblick' },
            { name: 'Platten auf Stelzlagern', path: '/balkon-terrasse/stelzlager', desc: 'Frostsicher, eben, reparaturfreundlich' },
            { name: 'Balkonsanierung', path: '/balkon-terrasse/balkonsanierung', desc: 'Vom undichten Altbelag zur Lösung' },
            { name: 'Terrassenplatten', path: '/balkon-terrasse/terrassenplatten', desc: 'Material, Stärke und Oberfläche' }
        ]
    },
    {
        id: 'naturstein',
        name: 'Naturstein & Granit',
        path: '/naturstein',
        description: 'Natursteinböden und Wandbeläge fachgerecht verlegt',
        pages: [
            { name: 'Naturstein & Granit', path: '/naturstein', desc: 'Natursteinverlegung vom Fachbetrieb' },
            { name: 'Granit, Schiefer & Quarzit', path: '/naturstein/granit', desc: 'Silikatische Natursteine' },
            { name: 'Marmor, Travertin & Kalkstein', path: '/naturstein/marmor-kalkstein', desc: 'Edle, säureempfindliche Steine' }
        ]
    },
    {
        id: 'treppen',
        name: 'Treppen',
        path: '/treppen',
        description: 'Treppen neu belegen – innen, im Treppenhaus und außen',
        pages: [
            { name: 'Treppen neu belegen', path: '/treppen', desc: 'Welche Lösung passt zu Ihrer Treppe?' },
            { name: 'Innentreppe fliesen', path: '/treppen/innentreppe', desc: 'Stufen, Setzstufen und Sockel' },
            { name: 'Treppenhaus sanieren', path: '/treppen/treppenhaus', desc: 'Neue Beläge im Mehrfamilienhaus' },
            { name: 'Außentreppe & Eingang', path: '/treppen/aussentreppe', desc: 'Frost- und trittsicher belegt' }
        ]
    },
    {
        id: 'service',
        name: 'Service & Reparatur',
        path: '/fliesenreparatur',
        description: 'Schäden erkennen und fachgerecht beheben',
        pages: [
            { name: 'Schadensanalyse', path: '/schadensanalyse', desc: 'Ursachen vor Ort klären' },
            { name: 'Fliesenreparatur', path: '/fliesenreparatur', desc: 'Einzelne Fliesen, Fugen, Sockel' }
        ]
    }
];

export const TOPIC_PAGES = TOPIC_HUBS.flatMap((hub) => hub.pages);

export default TOPIC_HUBS;
