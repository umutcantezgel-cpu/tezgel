// portfolio.config.js

/**
 * Project IDs that document real Fliesenverlegung Tezgel work. The entries in
 * PORTFOLIO_PROJECTS below were inherited from a previous site owner (heating,
 * air conditioning, solar): their detail URLs keep working, but they are
 * noindexed, excluded from the sitemap and not listed as Tezgel references.
 * Add a project's id here once it is replaced with a genuine Tezgel project.
 */
export const TEZGEL_PROJECT_IDS = [];

export const isLegacyProject = (project) => !TEZGEL_PROJECT_IDS.includes(project?.id);

export const PORTFOLIO_PROJECTS = [
    {
        id: "project-001",
        title: "Luxus-Badezimmer Renovierung",
        category: "sanitaer",
        location: "Wetzlar",
        year: 2024,
        duration: "3 Wochen",

        description: "Komplette Renovierung eines 12m² Badezimmers mit modernem Design und hochwertigen Materialien.",

        challenge: "Altbau mit veralteter Sanitärtechnik sollte in modernen Stil umgewandelt werden.",

        solution: "Komplette Rohrleitungssanierung, neue Fliesen, moderne Armaturen, behindertengerechte Ausführung.",

        images: [
            { type: "before", url: "/images/uploads/Gemini_Generated_Image_8gmzbd8gmzbd8gmz.webp", alt: "Vorher-Zustand" },
            { type: "after", url: "/images/uploads/Gemini_Generated_Image_a6q5fsa6q5fsa6q5.webp", alt: "Nachher 1" },
            { type: "after", url: "/images/uploads/Gemini_Generated_Image_aerazzaerazzaera.webp", alt: "Nachher 2" }
        ],

        testimonial: {
            text: "Sehr professionelle Arbeit, alles wie versprochen! Pünktlich fertig geworden.",
            author: "Max Müller",
            rating: 5
        },

        tags: ["Badezimmer", "Renovierung", "Modern", "Behinderteng."]
    },
    {
        id: "project-002",
        title: "Modernisierung Heizungsanlage EFH",
        category: "heizung",
        location: "Gießen",
        year: 2024,
        duration: "2 Wochen",

        description: "Austausch einer alten Ölheizung gegen eine moderne Wärmepumpe mit Fußbodenheizung.",

        challenge: "Dämmung des Gebäudes musste berücksichtigt werden.",

        solution: "Installation einer Panasonic Aquarea Wärmepumpe und Fräsen der Fußbodenheizung in den Bestandestrich.",

        images: [
            { type: "before", url: "/images/uploads/Gemini_Generated_Image_bcyl4bcyl4bcyl4b.webp", alt: "Vorher-Zustand" },
            { type: "after", url: "/images/uploads/Gemini_Generated_Image_e9ovtxe9ovtxe9ov.webp", alt: "Nachher 1" },
            { type: "after", url: "/images/uploads/Gemini_Generated_Image_isa3wgisa3wgisa3.webp", alt: "Nachher 2" }
        ],

        testimonial: {
            text: "Endlich warme Füße und niedrige Heizkosten. Danke an das Team!",
            author: "Familie Schmidt",
            rating: 5
        },

        tags: ["Heizung", "Wärmepumpe", "Modernisierung"]
    },
    {
        id: "project-003",
        title: "Klimatisierung Bürokomplex",
        category: "klima",
        location: "Wetzlar",
        year: 2023,
        duration: "4 Wochen",

        description: "Installation einer VRF-Klimaanlage für 10 Büroräume.",

        challenge: "Laufender Betrieb durfte nicht gestört werden.",

        solution: "Arbeiten am Wochenende und in den Abendstunden. Deckenkassetten für unauffällige Optik.",

        images: [
            { type: "before", url: "/images/uploads/Gemini_Generated_Image_iyxljmiyxljmiyxl.webp", alt: "Vorher-Zustand" },
            { type: "after", url: "/images/uploads/Gemini_Generated_Image_puiwe4puiwe4puiw.webp", alt: "Nachher 1" },
            { type: "after", url: "/images/uploads/Gemini_Generated_Image_rka2d0rka2d0rka2.webp", alt: "Nachher 2" }
        ],

        tags: ["Klima", "Büro", "VRF"]
    },
    {
        id: "project-004",
        title: "Fußbodenheizung Nachrüstung",
        category: "heizung",
        location: "Solms",
        year: 2023,
        duration: "1 Woche",

        description: "Nachträglicher Einbau einer Fußbodenheizung im Trockenbausystem.",

        challenge: "Geringe Aufbauhöhe von nur 5cm verfügbar.",

        solution: "Verwendung eines speziellen Dünnschichtsystems für optimale Wärmeverteilung bei minimaler Höhe.",

        images: [
            { type: "after", url: "/images/uploads/Gemini_Generated_Image_tfft4dtfft4dtfft.webp", alt: "Heizung" }
        ],

        testimonial: {
            text: "Endlich warme Füße auch im Altbau. Super Arbeit!",
            author: "Familie Weber",
            rating: 5
        },

        tags: ["Heizung", "Sanierung", "Komfort"]
    },
    {
        id: "project-005",
        title: "Barrierefreies Duschbad",
        category: "sanitaer",
        location: "Gießen",
        year: 2024,
        duration: "10 Tage",

        description: "Umbau eines Standardbades zu einem barrierefreien Wellness-Bad.",

        challenge: "Badewanne musste weichen, Bodeneinlauf war schwierig zu integrieren.",

        solution: "Installation einer bodengleichen Dusche mit wegklappbaren Glaswänden für maximalen Platz.",

        images: [
            { type: "after", url: "/images/uploads/Gemini_Generated_Image_tx5naxtx5naxtx5n.webp", alt: "Bad" }
        ],

        tags: ["Sanitär", "Barrierefrei", "Bad"]
    },
    {
        id: "project-006",
        title: "Solarthermie für Warmwasser",
        category: "klima", // Using 'klima' or fitting category if solar exists, but sticking to existing categories 'sanitaer', 'heizung', 'klima' from config
        location: "Aßlar",
        year: 2023,
        duration: "3 Tage",

        description: "Installation einer Solaranlage zur Unterstützung der Warmwasserbereitung.",

        challenge: "Dachausrichtung nach Süd-West.",

        solution: "Optimale Ausrichtung der Kollektoren für maximalen Ertrag auch am Nachmittag.",

        images: [
            { type: "after", url: "/images/uploads/Gemini_Generated_Image_vg99vgvg99vgvg99.webp", alt: "Solar" }
        ],

        tags: ["Solar", "Energie", "Nachhaltigkeit"]
    }
    // Weitere Projekte hinzufügen...
];

export const categories = [
    { id: 'all', name: 'Alle' },
    { id: 'sanitaer', name: 'Sanitär' },
    { id: 'heizung', name: 'Heizung' },
    { id: 'klima', name: 'Klima' }
];

export const projects = PORTFOLIO_PROJECTS;

export default PORTFOLIO_PROJECTS;
