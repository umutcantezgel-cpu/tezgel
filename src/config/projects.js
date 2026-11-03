// REFERENZPROJEKTE – FLIESENVERLEGUNG TEZGEL
//
// Reservierte Referenzplätze: Jeder Eintrag beschreibt einen typischen
// Projekttyp und seinen Leistungsumfang. Konkrete Projektdaten (Ort, Jahr,
// Dauer, Fotos, Kundenstimme) werden erst ergänzt, wenn Fliesenverlegung
// Tezgel sie mit Einverständnis der Kunden bereitstellt – dann
// `placeholder: false` setzen und die Felder `location`, `year`, `duration`,
// `images` (und optional `testimonial`) befüllen.

export const PORTFOLIO_PROJECTS = [
    {
        id: "badsanierung-grossformat",
        placeholder: true,
        // SEO-Runde T11 (03.11.2026): echte Fotos ähnlicher Arbeiten aus src/config/arbeiten.ts, ohne Ort und ohne Bezug
        // auf ein bestimmtes Projekt; der Satz sagt nur, was die Fotos zeigen
        beispielFotos: ["nb-083", "nb-084", "nb-086"],
        fotoSatz: "Die Fotos zeigen ein fertiges Bad mit großen beigen Fliesen aus unserer Arbeit.",
        title: "Komplette Badsanierung mit Großformatfliesen",
        category: "bad",
        serviceLink: "/bad/badsanierung",
        description: "Ein solches Projekt umfasst den staubarmen Rückbau des alten Bades, die Vorbereitung von Wand- und Bodenflächen, die Verbundabdichtung nach DIN 18534 und die fugenarme Verlegung großformatiger Fliesen. Weitere Gewerke werden im Rahmen „Bad aus einer Hand“ koordiniert.",
        scopeItems: [
            "Staubarmer Rückbau der Altbeläge",
            "Untergrund ausgleichen und grundieren",
            "Verbundabdichtung nach DIN 18534",
            "Großformatverlegung mit vollflächiger Bettung",
            "Silikon- und Anschlussfugen",
            "Koordination der beteiligten Gewerke"
        ]
    },
    {
        id: "einfamilienhaus-komplett",
        placeholder: true,
        // SEO-Runde T11 (03.11.2026): echte Fotos ähnlicher Arbeiten aus src/config/arbeiten.ts, ohne Ort und ohne Bezug
        // auf ein bestimmtes Projekt; der Satz sagt nur, was die Fotos zeigen
        beispielFotos: ["nb-058", "nb-056", "nb-064"],
        fotoSatz: "Die Fotos zeigen Wohnräume, eine Dusche und ein Gäste-WC im Ausbau aus unserer Arbeit.",
        title: "Fliesenarbeiten im kompletten Einfamilienhaus",
        category: "wohnen",
        serviceLink: "/fliesen",
        description: "Ein solches Projekt umfasst alle Fliesenflächen eines Hauses in Neubau oder Kernsanierung: Wohnbereich, Küche, Flur, Bäder und Treppe – mit durchgehenden Fugenachsen und einem Bauzeitenplan, der mit den übrigen Gewerken abgestimmt ist.",
        scopeItems: [
            "Belegreife-Prüfung des Estrichs (CM-Messung)",
            "Wohnbereich, Küche und Flur mit durchgehenden Fugenachsen",
            "Bäder und Gäste-WC inkl. Verbundabdichtung nach DIN 18534",
            "Treppenbelag mit sauberer Kantenausbildung",
            "Abgestimmter Bauzeitenplan mit den übrigen Gewerken"
        ]
    },
    {
        id: "treppenanlage-wohnhaus",
        placeholder: true,
        // SEO-Runde T11 (03.11.2026): echte Fotos ähnlicher Arbeiten aus src/config/arbeiten.ts, ohne Ort und ohne Bezug
        // auf ein bestimmtes Projekt; der Satz sagt nur, was die Fotos zeigen
        beispielFotos: ["nb-076", "nb-077", "nb-004"],
        fotoSatz: "Die Fotos zeigen eine Außentreppe und ein Treppenhaus aus unserer Arbeit.",
        title: "Treppenanlage mit Fliesen- oder Natursteinbelag",
        category: "treppen",
        serviceLink: "/treppen/innentreppe",
        description: "Ein solches Projekt umfasst das Aufmaß jeder Stufe, den passgenauen Zuschnitt von Tritt- und Setzstufen aus Feinsteinzeug oder Naturstein, eine saubere Kantenausbildung mit Gehrung oder Stufenprofil sowie gestufte Treppensockel.",
        scopeItems: [
            "Aufmaß jeder einzelnen Stufe",
            "Zuschnitt von Tritt- und Setzstufen",
            "Kantenausbildung mit Gehrung oder Edelstahl-Stufenprofil",
            "Gestufte Treppensockel",
            "Rutschhemmende Oberflächen"
        ]
    },
    {
        id: "wohnbereich-fussbodenheizung",
        placeholder: true,
        // SEO-Runde T11 (03.11.2026): echte Fotos ähnlicher Arbeiten aus src/config/arbeiten.ts, ohne Ort und ohne Bezug
        // auf ein bestimmtes Projekt; der Satz sagt nur, was die Fotos zeigen
        beispielFotos: ["nb-054", "nb-062", "nb-044"],
        fotoSatz: "Die Fotos zeigen Fliesenböden in Wohnräumen aus unserer Arbeit.",
        title: "Fliesenboden auf Fußbodenheizung im Wohnbereich",
        category: "wohnen",
        serviceLink: "/fliesen/auf-fussbodenheizung",
        description: "Ein solches Projekt umfasst die Prüfung von Aufheizprotokoll und Restfeuchte des Heizestrichs, die Planung durchgehender Fugenachsen über mehrere Räume und die Verlegung von Feinsteinzeug mit verformbarem Kleber sowie fachgerechten Rand- und Bewegungsfugen.",
        scopeItems: [
            "Prüfung von Aufheizprotokoll und Restfeuchte (CM-Messung)",
            "Fugenachsen- und Übergangsplanung",
            "Verlegung mit verformbarem Kleber (S1)",
            "Rand- und Bewegungsfugen",
            "Sockel und Türübergänge"
        ]
    },
    {
        id: "barrierefreies-duschbad",
        placeholder: true,
        // SEO-Runde T11 (03.11.2026): echte Fotos ähnlicher Arbeiten aus src/config/arbeiten.ts, ohne Ort und ohne Bezug
        // auf ein bestimmtes Projekt; der Satz sagt nur, was die Fotos zeigen
        beispielFotos: ["nb-085", "nb-019", "nb-060"],
        fotoSatz: "Die Fotos zeigen Duschen ohne Stufe aus unserer Arbeit.",
        title: "Barrierefreies Duschbad mit bodengleicher Walk-In-Dusche",
        seoTitle: "Barrierefreies Duschbad mit bodengleicher Dusche · Tezgel", // SEO-Runde P2
        category: "bad",
        serviceLink: "/bad/barrierefreies-bad",
        description: "Ein solches Projekt umfasst den Umbau von der Wanne zur bodengleichen Dusche, die Gefälleausbildung zum Ablauf oder zur Rinne, die Verbundabdichtung nach DIN 18534 und die Verlegung rutschhemmender Fliesen im Duschbereich.",
        scopeItems: [
            "Rückbau der Badewanne",
            "Gefälle zu Bodenablauf oder Duschrinne",
            "Verbundabdichtung nach DIN 18534",
            "Rutschhemmende Bodenfliesen im Duschbereich",
            "Anschluss- und Wartungsfugen",
            "Koordination der Sanitärarbeiten im Rahmen „Bad aus einer Hand“"
        ]
    },
    {
        id: "balkon-stelzlager",
        placeholder: true,
        // SEO-Runde T11 (03.11.2026): echte Fotos ähnlicher Arbeiten aus src/config/arbeiten.ts, ohne Ort und ohne Bezug
        // auf ein bestimmtes Projekt; der Satz sagt nur, was die Fotos zeigen
        beispielFotos: ["nb-074", "nb-088", "nb-089"],
        fotoSatz: "Die Fotos zeigen einen Balkon und eine Terrasse aus unserer Arbeit.",
        title: "Balkonsanierung mit Terrassenplatten auf Stelzlagern",
        seoTitle: "Balkonsanierung mit Platten auf Stelzlagern · Tezgel", // SEO-Runde P2
        category: "aussen",
        serviceLink: "/balkon-terrasse/stelzlager",
        description: "Ein solches Projekt umfasst den Rückbau des schadhaften Altbelags, die Prüfung von Abdichtung und Gefälle sowie die Verlegung von 2-cm-Feinsteinzeugplatten auf höhenverstellbaren Stelzlagern mit sauberen Randabschlüssen.",
        scopeItems: [
            "Rückbau des Altbelags",
            "Prüfung von Abdichtung und Gefälle",
            "Höhenverstellbare Stelzlager setzen",
            "Verlegung von 2-cm-Feinsteinzeugplatten mit offener Fuge",
            "Randabschlüsse mit Tropfprofilen"
        ]
    }
];

export const isPlaceholderProject = (project) => project?.placeholder !== false;

export const categories = [
    { id: 'all', name: 'Alle' },
    { id: 'bad', name: 'Bad & Dusche' },
    { id: 'wohnen', name: 'Wohnen & Neubau' },
    { id: 'treppen', name: 'Treppen' },
    { id: 'aussen', name: 'Balkon & Terrasse' }
];

export const projects = PORTFOLIO_PROJECTS;

export default PORTFOLIO_PROJECTS;
