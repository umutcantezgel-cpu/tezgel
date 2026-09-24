// MASTER SERVICES DATA - FLIESENVERLEGUNG TEZGEL
// Complete trade and service structure

export const SERVICES = [
    {
        id: "bad",
        name: "Bäder & Wellness",
        shortDescription: "Barrierefreie Walk-In-Duschen, fugenarme Großformate & schlüsselfertige Badsanierung",
        icon: "Droplets",
        color: "primary",
        priority: 1,
        link: "/bad",

        subcategories: [
            { id: "walk-in-duschen", name: "Bodengleiche Walk-In-Duschen", path: "/bad/barrierefreies-bad", icon: "bath" },
            { id: "grossformate-bad", name: "XXL-Großformatfliesen", path: "/bad/fliesen", icon: "layers" },
            { id: "nischen", name: "Beleuchtete Wandnischen", path: "/bad/badsanierung", icon: "sparkles" },
            { id: "trockenbau", name: "Trockenbau & Vorwandelemente", path: "/bad/bad-aus-einer-hand", icon: "grid" }
        ],

        features: [
            "Barrierefreie Walk-In-Duschen mit millimetergenauem Gefälleschnitt",
            "Fugenarme XXL-Fliesen (bis 120 x 278 cm) für edle, monolithische Optik",
            "Indirekt illuminierte Wandnischen & Ablagen mit Edelstahl- oder Gehrungskanten",
            "Fachgerechte Verkleidung von Vorwandelementen und Installationsschächten",
            "Staubarme Sanierung mit Schonvlies und modernen Staubschutzwänden",
            "Normgerechte Verbundabdichtung nach DIN 18534 für dauerhaft dichte Nassbereiche"
        ],

        detailText: "Vom ersten Vor-Ort-Aufmaß bis zur fugenarmen Luxusoase: Fliesenverlegung Tezgel verwandelt veraltete Badezimmer in moderne Wellnessräume. Mit innovativen XXL-Großformaten reduzieren wir Fugen auf ein Minimum – für maximale Ästhetik und spielend leichte Pflege.",
        ctaText: "Badprojekt anfragen",
        heroImage: "/images/bad/bad-beleuchtete-nischen.webp",
        gallery: [
            "/images/bad/bad-beleuchtete-nischen.webp",
            "/images/bad/walk-in-dusche.webp",
            "/images/bad/bad-freistehende-wanne.webp"
        ]
    },

    {
        id: "wohnen",
        name: "Wohnbereiche & Neubau",
        shortDescription: "Edles Feinsteinzeug, durchgängige Fugenachsen, Großformate & Treppenanlagen",
        icon: "Sparkles",
        color: "secondary",
        priority: 2,
        link: "/leistungen/wohnen",

        subcategories: [
            { id: "feinsteinzeug", name: "Feinsteinzeug & Fliesen", path: "/fliesen/fliesenarten", icon: "grid" },
            { id: "treppen", name: "Treppen neu belegen", path: "/treppen", icon: "layers" },
            { id: "kuechen-dielen", name: "Küchen, Dielen & Flure", path: "/fliesen/kueche", icon: "home" },
            { id: "naturstein", name: "Granit & Natursteinbeläge", path: "/naturstein", icon: "box" }
        ],

        features: [
            "Verlegung großformatiger Feinsteinzeugfliesen in Wohnzimmern & Dielen",
            "Harmonisch durchlaufende Fugenbilder von Küche bis Eingangsbereich",
            "Ideale Wärmeleitfähigkeit für moderne Fußbodenheizungen",
            "Passgenaue Treppenverkleidungen mit Gehrungsschnitt oder Edelstahl-Stufenprofilen",
            "Verlegung von Naturstein (Granit, Marmor, Schiefer) mit Spezialmörteln",
            "Perfekte Nivellierung ohne Überzähne für spürbar homogene Flächen"
        ],

        detailText: "Moderne Fliesenbeläge verbinden elegante Architektur mit unübertroffener Robustheit. Wir verlegen hochwertige Feinsteinzeug- und Natursteinbeläge in Neubauten und Bestandsimmobilien – mit präzisem Fugenraster und perfekter Anpassung an Türen, Kamine und bodentiefe Fenster.",
        ctaText: "Wohnbereich anfragen",
        heroImage: "/images/bad/wandfliesen-gruen.webp",
        gallery: [
            "/images/bad/wandfliesen-gruen.webp"
        ]
    },

    {
        id: "aussen",
        name: "Balkon- & Terrassensanierung",
        shortDescription: "Frostsichere 2-cm-Keramik auf Stelzlagern, normgerechtes Gefälle & Entwässerung",
        icon: "Sun",
        color: "warning",
        priority: 3,
        link: "/balkon-terrasse",

        subcategories: [
            { id: "stelzlager", name: "20 mm Platten auf Stelzlagern", path: "/balkon-terrasse/stelzlager", icon: "layers" },
            { id: "gefaelle", name: "Gefälleausbildung & Entwässerung", path: "/untergrund-abdichtung/ausgleich-gefaelle", icon: "arrow-down-right" },
            { id: "abdichtung-aussen", name: "Witterungsbeständige Abdichtung", path: "/balkon-terrasse/balkonsanierung", icon: "shield" }
        ],

        features: [
            "Verlegung robuster 2-cm-Außenkeramik auf Stelzlagern oder Splittbett",
            "Frei ablaufendes Regenwasser durch offene Fugen – dauerhafter Frostschutz",
            "Normgerechte Gefälleherstellung (mind. 1,5 bis 2 %) vom Gebäude weg",
            "Architektonisch saubere Randabschlüsse mit Tropfprofilen aus pulverbeschichtetem Aluminium",
            "Keine unschönen Kalkausblühungen oder aufplatzenden Zementfugen mehr",
            "Sanierung von Bestandsbalkonen inklusive Entkernung des Altbelags"
        ],

        detailText: "Balkone und Terrassen sind extremen Wetterbedingungen ausgesetzt. Fliesenverlegung Tezgel setzt auf innovative Trockenverlegung auf Stelzlagern: Wasser fließt unter dem Belag ab, Spannungen durch Temperaturwechsel werden weitgehend vermieden und einzelne Platten bleiben für Wartung zugänglich.",
        ctaText: "Terrassensanierung anfragen",
        heroImage: null,
        gallery: [
        ]
    },

    {
        id: "untergrund",
        name: "Untergrund & DIN 18534 Abdichtung",
        shortDescription: "Fachgerechter Abbruch, Estrichausgleich, Risssanierung & normgerechte Verbundabdichtung",
        icon: "ShieldCheck",
        color: "primary",
        priority: 4,
        link: "/untergrund-abdichtung",

        subcategories: [
            { id: "din-18534", name: "Abdichtung nach DIN 18534", path: "/untergrund-abdichtung/din-18534", icon: "shield" },
            { id: "abbruch", name: "Rückbau & Entkernung alter Beläge", path: "/untergrund-abdichtung/fliesen-auf-fliesen", icon: "hammer" },
            { id: "ausgleich", name: "Estrich- & Nivellierarbeiten", path: "/untergrund-abdichtung/ausgleich-gefaelle", icon: "ruler" },
            { id: "rissverharzung", name: "Rissverharzung & Haftbrücken", path: "/untergrund-abdichtung/entkopplung", icon: "zap" }
        ],

        features: [
            "Normgerechte Verbundabdichtung (AIV) nach DIN 18534 in Feucht- und Nassräumen",
            "Einbindung elastischer Dichtmanschetten an allen Rohrdurchdringungen",
            "Eckdichtbänder mit Dehnzone zur dauerhaften Entkopplung von Wand und Boden",
            "Staubarme Entkernung alter Fliesen- und Dickbettbeläge",
            "Präziser Untergrundausgleich mit faserverstärkten Spachtelmassen",
            "Restfeuchtemessung (CM-Messung) vor Beginn der Verlegearbeiten"
        ],

        detailText: "Ein hochwertiger Fliesenbelag ist nur so langlebig wie der Untergrund, auf dem er ruht. Wir bereiten Böden und Wände kompromisslos fachgerecht vor. Insbesondere die normgerechte Verbundabdichtung nach DIN 18534 schützt Ihre Bausubstanz verlässlich vor kostspieligen Feuchteschäden.",
        ctaText: "Abdichtungs-Check anfordern",
        heroImage: null,
        gallery: [
        ]
    }
];

export default SERVICES;
