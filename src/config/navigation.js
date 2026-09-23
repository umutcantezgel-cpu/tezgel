// NAVIGATION CONFIGURATION - FLIESENVERLEGUNG TEZGEL
// Vollständige hierarchische Struktur über alle 174 Seiten

export const navigationLinks = [
    {
        name: 'Badsanierung',
        path: '/bad',
        badge: 'Top-Gewerk',
        description: 'Schlüsselfertige Bäder, Walk-In Duschen & Fliesen',
        submenu: [
            {
                category: 'Bäder & Sanierung',
                items: [
                    { name: 'Badsanierung Komplett', path: '/bad/badsanierung', desc: 'Von der Demontage bis zur fertigen Fuge' },
                    { name: 'Fliesen & XXL-Großformate', path: '/bad/fliesen', desc: 'Fugenarme Großkeramik bis 120x278 cm' },
                    { name: 'Barrierefreie Bäder', path: '/bad/barrierefreies-bad', desc: 'Bodengleiche Walk-In Duschen nach DIN 18040' },
                    { name: 'Bad aus einer Hand', path: '/bad/bad-aus-einer-hand', desc: 'Gewerkekoordination ohne Schnittstellen' }
                ]
            },
            {
                category: 'Planung & Inspiration',
                items: [
                    { name: '3D-Badplaner', path: '/bad/badplaner', desc: 'Interaktive Raum- und Fliesenplanung' },
                    { name: 'Bad-Budgetkalkulator', path: '/bad/budgetkalkulator', desc: 'Kostenrahmen sofort transparent berechnen' },
                    { name: 'Musterbäder Galerie', path: '/bad/musterbaeder', desc: 'Designkonzepte von Basic bis Luxus' },
                    { name: 'Badanfrage Express', path: '/bad/badanfrage', desc: 'Gezielte Anfrage für Ihr Badezimmer' }
                ]
            }
        ]
    },
    {
        name: 'Leistungen',
        path: '/leistungen',
        badge: 'Meisterqualität',
        description: 'Exklusive Fliesenverlegung & Bauvorbereitung',
        submenu: [
            {
                category: 'Fachgewerke',
                items: [
                    { name: 'Bäder & Wellness', path: '/leistungen/bad', desc: 'Walk-In Duschen, Gehrungen & beleuchtete Nischen' },
                    { name: 'Wohnbereiche & Neubau', path: '/leistungen/wohnen', desc: 'Feinsteinzeug, Naturstein, Flure & Treppen' },
                    { name: 'Balkon & Terrasse', path: '/leistungen/aussen', desc: 'Frostsichere 2-cm-Keramik auf Stelzlagern' },
                    { name: 'Untergrund & DIN 18534', path: '/leistungen/untergrund', desc: 'Estrichspachtelung & Verbundabdichtung' }
                ]
            },
            {
                category: 'Service & Beratung',
                items: [
                    { name: 'Vor-Ort-Fachberatung', path: '/beratung', desc: 'Kostenloses Aufmaß und Materialberatung' },
                    { name: 'KfW & Förderberatung', path: '/foerderung', desc: 'Zuschüsse für barrierefreie Badumbauten' },
                    { name: 'Häufige Fragen (FAQ)', path: '/faq', desc: 'Wichtige Antworten zu Ablauf & Pflege' }
                ]
            }
        ]
    },
    {
        name: 'Projekte',
        path: '/referenzen',
        description: 'Echte Baustellenarbeiten & Vorher-Nachher Referenzen'
    },
    {
        name: 'Standorte',
        path: '/standorte',
        description: 'Aßlar, Wetzlar, Gießen, Marburg und ganz Hessen',
        submenu: [
            {
                category: 'Einsatzgebiet Hessen',
                items: [
                    { name: 'Fliesenleger Wetzlar', path: '/standorte/wetzlar', desc: 'Unser direkter Kernbereich' },
                    { name: 'Fliesenleger Gießen', path: '/standorte/giessen', desc: 'Universitätsstadt & Umland' },
                    { name: 'Fliesenleger Marburg', path: '/standorte/marburg', desc: 'Mittelhessen Nord' },
                    { name: 'Alle Standorte', path: '/standorte', desc: 'Übersicht aller 10+ Regionen' }
                ]
            },
            {
                category: 'Ausstellungen vor Ort',
                items: [
                    { name: 'Ausstellung Wetzlar', path: '/ausstellung/wetzlar', desc: 'Fliesen und Sanitärmuster live erleben' },
                    { name: 'Ausstellung Gießen', path: '/ausstellung/giessen', desc: 'Moderne Bäder und Oberflächen' }
                ]
            }
        ]
    },
    {
        name: 'Ratgeber',
        path: '/blog',
        description: 'Tipps zu Fliesen, Schimmelprävention & Sanierung'
    },
    {
        name: 'Über uns',
        path: '/ueber-uns',
        description: 'Meisterbetrieb Deniz Tezgel · Handwerkstradition',
        submenu: [
            {
                category: 'Das Unternehmen',
                items: [
                    { name: 'Über Deniz Tezgel', path: '/ueber-uns', desc: 'Philosophie, Meisterbrief & Historie' },
                    { name: 'Qualitätsversprechen', path: '/unternehmen', desc: 'Staubschutz, Pünktlichkeit & DIN-Normen' },
                    { name: 'Karriere & Jobs', path: '/karriere', desc: 'Verstärkung für unser Meisterteam gesucht' }
                ]
            }
        ]
    },
    {
        name: 'Kontakt & Aufmaß',
        path: '/kontakt',
        badge: 'Termin',
        description: 'Hohwardstraße 14, 35614 Aßlar · Tel: 06441 / 44 83 567'
    }
];

export const quickLinks = [
    { name: 'Badsanierung Komplett', path: '/bad/badsanierung' },
    { name: 'Fliesen & Großformate', path: '/bad/fliesen' },
    { name: '3D-Badplaner Tool', path: '/bad/badplaner' },
    { name: 'Bad-Budgetkalkulator', path: '/bad/budgetkalkulator' },
    { name: 'Musterbäder Galerie', path: '/bad/musterbaeder' },
    { name: 'Barrierefreie Bäder', path: '/bad/barrierefreies-bad' },
    { name: 'Alle Fachgewerke', path: '/leistungen' },
    { name: 'Projekt-Referenzen', path: '/referenzen' },
    { name: 'Standort Wetzlar', path: '/standorte/wetzlar' },
    { name: 'Standort Gießen', path: '/standorte/giessen' },
    { name: 'Ratgeber & Blog', path: '/blog' },
    { name: 'Über Meisterbetrieb Tezgel', path: '/ueber-uns' },
    { name: 'Vor-Ort-Termin vereinbaren', path: '/termin' },
    { name: 'Impressum', path: '/impressum' },
    { name: 'Datenschutzerklärung', path: '/datenschutz' },
    { name: 'AGB', path: '/agb' }
];

export const footerServiceLinks = [
    { name: 'Schlüsselfertige Badsanierung', path: '/bad/badsanierung' },
    { name: 'Fugenlose XXL-Großformatfliesen', path: '/bad/fliesen' },
    { name: 'Bodengleiche Walk-In Duschen', path: '/bad/barrierefreies-bad' },
    { name: 'Musterbäder & Badausstellung', path: '/bad/musterbaeder' },
    { name: 'Feinsteinzeug im Wohnbereich', path: '/leistungen/wohnen' },
    { name: 'Maßgefertigte Treppenanlagen', path: '/leistungen/wohnen' },
    { name: 'Balkon- & Terrassenbeläge (Stelzlager)', path: '/leistungen/aussen' },
    { name: 'DIN 18534 Verbundabdichtung', path: '/leistungen/untergrund' },
    { name: 'Untergrundausgleich & Estrichspachtelung', path: '/leistungen/untergrund' },
    { name: '3D-Badplanung & Visualisierung', path: '/bad/badplaner' },
    { name: 'Bad-Budgetkalkulator online', path: '/bad/budgetkalkulator' },
    { name: 'Fliesenleger Wetzlar & Aßlar', path: '/standorte/wetzlar' },
    { name: 'Fliesenleger Gießen & Mittelhessen', path: '/standorte/giessen' }
];

export default navigationLinks;
