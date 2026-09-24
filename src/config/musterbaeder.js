// MUSTERBÄDER & BADINSPIRATION DATA
// HINWEIS: Ausstattungslisten und Preise wurden vom vorherigen Seitenbetreiber
// übernommen und müssen vor der Veröffentlichung von Fliesenverlegung Tezgel
// geprüft bzw. durch eigene Kalkulationen ersetzt werden.
// Complete 12-variant catalogue across 4 room sizes (4.6, 7.0, 8.2, 15.9 m²) and 3 tiers (Basic, Premium, Luxus)

export const MUSTERBAEDER = [
    // -------------------------------------------------------------
    // BASIC LINE (Solide Qualität & Einstiegspreise)
    // -------------------------------------------------------------
    {
        id: "basic-4-6",
        slug: "basic-bad-4_6",
        size: "4,6 ㎡",
        sqm: 4.6,
        tier: "Basic",
        title: "Basic-Bad 4,6 ㎡",
        headline: "Kompakter Komfort mit durchdachter Raumausnutzung",
        priceFormatted: "ca. 5.854,00 €",
        priceNumber: 5854,
        vatNote: "inkl. gesetzl. MwSt.",
        image: "/images/uploads/03.webp",
        highlights: [
            "Design-Badheizkörper 177 × 60 cm (RAL 9016)",
            "Keramik-Waschtisch mit 4-seitig hinterleuchtetem LED-Lichtspiegel (4.000 K)",
            "Stahl-Duschwanne 90 × 90 cm mit Eckeinstieg aus Sicherheitsglas",
            "Wand-Tiefspül-WC mit pflegeleichter Glasur und Vorwandelement mit Unterputz-Spülkasten",
            "Accessoires-Set in Chrom"
        ],
        components: [
            {
                category: "Dusch-Anlage",
                items: [
                    "Stahl-Duschwanne 90 × 90 × 3,2 cm mit Wannenträger, weiß, inkl. Ablaufgarnitur mit Siphon und Abdeckung",
                    "Eckeinstieg aus 2 Schiebetür-Hälften 87–89 × 200 cm, Einscheibensicherheitsglas (ESG) mit Abperl-Beschichtung, Profile chrom",
                    "Einhand-Aufputz-Brausearmatur mit Verbrühschutz (kühles Armaturengehäuse), verchromt, inkl. Brausegarnitur mit Stange 90 cm, Schlauch und 3-fach verstellbarer Handbrause"
                ],
                price: "ca. 2.705,00 €"
            },
            {
                category: "Waschtisch-Anlage",
                items: [
                    "Keramik-Waschtisch 65 × 48 cm, weiß mit pflegeleichter Glasur, Halbsäule weiß sowie Röhrensiphon und Eckventil",
                    "Einhand-Waschtischarmatur mit Ablaufgarnitur, verchromt",
                    "LED-Lichtspiegel 65 × 80 cm, 4-seitig umlaufende Beleuchtung (3 cm) und hinterleuchtet, 4.000 Kelvin"
                ],
                price: "ca. 1.138,00 €"
            },
            {
                category: "WC-Anlage",
                items: [
                    "Wand-Tiefspül-WC, weiß mit pflegeleichter Glasur, WC-Sitz mit Deckel und Absenkautomatik inkl. Schallschutzset",
                    "Vorwandelement mit Unterputz-Spülkasten (112 cm) und Betätigungsplatte seidenmatt für 2-Mengen-Spülung"
                ],
                price: "ca. 873,00 €"
            },
            {
                category: "Badheizkörper",
                items: [
                    "Design-Badheizkörper 177 × 60 cm (RAL 9016)"
                ],
                price: "ca. 751,00 €"
            },
            {
                category: "Accessoires",
                items: [
                    "WC-Bürstengarnitur und Papierhalter mit Deckel, verchromt",
                    "Handtuchhalter 45 cm, starr, und Flüssigseifenspender mit Glasbehälter, verchromt"
                ],
                price: "ca. 387,00 €"
            }
        ]
    },
    {
        id: "basic-7-0",
        slug: "basic-bad-7",
        size: "7,0 ㎡",
        sqm: 7.0,
        tier: "Basic",
        title: "Basic-Bad 7,0 ㎡",
        headline: "Familienfreundliche Vollausstattung mit Badewanne & Dusche",
        priceFormatted: "ca. 7.025,00 €",
        priceNumber: 7025,
        vatNote: "inkl. gesetzl. MwSt.",
        image: "/images/uploads/04.webp",
        highlights: [
            "Stahl-Körperform-Badewanne 170 × 75 cm",
            "Stahl-Duschwanne 120 × 90 cm mit Glas-Duschabtrennung",
            "Waschtisch-Set mit Spiegelschrank & Unterschrank in Weiß Hochglanz",
            "Spülrandloses Wand-Tiefspül-WC mit pflegeleichter Glasur",
            "Design-Badheizkörper 140 × 60 cm"
        ],
        components: [
            {
                category: "Badewannen-Anlage",
                items: [
                    "Stahl-Körperform-Badewanne 170 × 75 cm, weiß, inkl. Wannenträger sowie Ab- und Überlaufgarnitur",
                    "Einhand-Aufputz-Wannenarmatur mit Wannenset (Wandhalter, Brauseschlauch, Handbrause), verchromt"
                ],
                price: "ca. 830,00 €"
            },
            {
                category: "Dusch-Anlage",
                items: [
                    "Stahl-Duschwanne 120 × 90 × 3,5 cm, Ablauf mittig an der kurzen Seite, weiß, inkl. Wannenträger und Ablaufgarnitur",
                    "Aufputz-Brausethermostat mit Sicherheitsablage, inkl. Brausegarnitur mit Stange 90 cm, Schlauch und 3-fach verstellbarer Handbrause, verchromt",
                    "Duschabtrennung aus zweiteiliger Seitenwand 90 × 195 cm und Pendeltür mit Festfeld links, Profile silber matt, ESG klar mit Abperl-Beschichtung"
                ],
                price: "ca. 3.123,00 €"
            },
            {
                category: "Waschtisch-Anlage",
                items: [
                    "Waschtisch-Set mit Spiegelschrank, Mineralguss-Waschtisch in Alpinweiß und Waschtischunterschrank 82 × 51,5 cm in Weiß Hochglanz inkl. Eckventil",
                    "Einhand-Waschtischarmatur mit Ablaufgarnitur, verchromt, und Raumspar-Möbelsiphon"
                ],
                price: "ca. 1.529,00 €"
            },
            {
                category: "WC-Anlage",
                items: [
                    "Spülrandloses Wand-Tiefspül-WC, weiß mit pflegeleichter Glasur, abnehmbarer WC-Sitz mit Absenkautomatik und Edelstahlscharnieren sowie Schallschutzset",
                    "Vorwandelement für den Trockenbau mit Unterputz-Spülkasten (112 cm) und Betätigungsplatte seidenmatt für 2-Mengen-Spülung"
                ],
                price: "ca. 969,00 €"
            },
            {
                category: "Badheizkörper",
                items: [
                    "Design-Badheizkörper 140 × 60 cm (RAL 9016)"
                ],
                price: "ca. 574,00 €"
            }
        ]
    },
    {
        id: "basic-8-2",
        slug: "basic-bad-8_2",
        size: "8,2 ㎡",
        sqm: 8.2,
        tier: "Basic",
        title: "Basic-Bad 8,2 ㎡",
        headline: "Funktionaler Komfort mit zeitlosem Design",
        priceFormatted: "ca. 6.942,00 €",
        priceNumber: 6942,
        vatNote: "inkl. gesetzl. MwSt.",
        image: "/images/uploads/01.webp",
        highlights: [
            "Mineralguss-Waschtisch in Alpinweiß mit Spiegelschrank",
            "2 Hochschränke in Anthrazit Hochglanz",
            "Duschbereich mit ESG-Glasseitenwand 120 × 200 cm",
            "Spülrandloses Wand-Tiefspül-WC",
            "Design-Badheizkörper (RAL 9016)"
        ],
        components: [
            {
                category: "Dusch-Anlage",
                items: [
                    "Stahl-Duschwanne 120 × 90 × 3,5 cm, weiß, mit Ablaufgarnitur und verchromter Abdeckung",
                    "Renovierungsset mit Aufputz-Brausethermostat und Brausegarnitur (Stange 90 cm, 3-fach verstellbare Handbrause)",
                    "Glas-Seitenwand 120 × 200 cm, Profile silber Hochglanz, ESG klar"
                ],
                price: "ca. 2.458,00 €"
            },
            {
                category: "Waschtisch-Anlage",
                items: [
                    "Waschtisch-Set aus Spiegelschrank, Mineralguss-Waschtisch in Alpinweiß und Waschtischunterschrank 82 × 51,5 cm in Anthrazit Hochglanz mit Siphon und Eckventil",
                    "Einhand-Waschtischarmatur mit Ablaufgarnitur, verchromt",
                    "2 Hochschränke in Anthrazit Hochglanz, 30 × 32 × 160 cm"
                ],
                price: "ca. 2.329,00 €"
            },
            {
                category: "WC-Anlage",
                items: [
                    "Spülrandloses Wand-Tiefspül-WC, weiß, mit WC-Sitz und Deckel (Edelstahlscharniere, Schallschutzset)",
                    "Vorwandelement mit Unterputz-Spülkasten, Bauhöhe 112 cm",
                    "Betätigungsplatte für 2-Mengen-Spülung (Glas weiß / Kunststoff weiß)"
                ],
                price: "ca. 1.261,00 €"
            },
            {
                category: "Badheizkörper",
                items: [
                    "Design-Badheizkörper 176,4 × 60 cm (RAL 9016)"
                ],
                price: "ca. 201,00 €"
            },
            {
                category: "Accessoires",
                items: [
                    "WC-Bürstengarnitur, Papierhalter und Flüssigseifenspender mit Glasbehälter, verchromt"
                ],
                price: "ca. 693,00 €"
            }
        ]
    },
    {
        id: "basic-15-9",
        slug: "basic-bad-15_9",
        size: "15,9 ㎡",
        sqm: 15.9,
        tier: "Basic",
        title: "Basic-Bad 15,9 ㎡",
        headline: "Großzügiges Raumbad mit separatem WC & breitem Möbelwaschtisch",
        priceFormatted: "ca. 12.034,00 €",
        priceNumber: 12034,
        vatNote: "inkl. gesetzl. MwSt.",
        image: "/images/uploads/05.webp",
        highlights: [
            "Stahl-Mittelablauf-Badewanne 180 × 80 cm mit Design-Wannenarmatur",
            "Rutschhemmende Mineralguss-Duschwanne 120 × 100 cm mit Nischen-Schwenktür",
            "Möbelwaschtisch-Set 140 cm in Metallic-Braun mit großem Wandspiegel",
            "Spülrandloses Wand-Tiefspül-WC in runder Form mit Vorwandelement",
            "Badheizkörper 180 × 60 cm (RAL 9016)"
        ],
        components: [
            {
                category: "Badewannen-Anlage",
                items: [
                    "Stahl-Mittelablauf-Badewanne 180 × 80 cm, weiß, mit Wannenträger sowie Ab- und Überlaufgarnitur mit verchromter Abdeckung",
                    "Design-Aufputz-Wannenarmatur (Einhebel) mit Umsteller, chrom",
                    "Wand-Brausehalter, Handbrause mit Anti-Kalk-Düsen und Design-Brauseschlauch"
                ],
                price: "ca. 1.930,00 €"
            },
            {
                category: "Dusch-Anlage",
                items: [
                    "Mineralguss-Duschwanne mit rutschhemmender Oberfläche, 120 × 100 × 3,2 cm, weiß, mit Ablaufgarnitur und Abdeckung",
                    "Schwenktür für Nischeneinbau, Anschlag rechts, 100 × 195 cm, Profile chrom/Alu Hochglanz, ESG klar",
                    "Design-Aufputz-Brausearmatur (Einhebel) mit Brausestangen-Set 60 cm, chrom"
                ],
                price: "ca. 2.732,00 €"
            },
            {
                category: "Waschtisch-Anlage",
                items: [
                    "Möbelwaschtisch-Set aus Waschtisch und Unterschrank 140 cm in Metallic-Braun, mit Röhrensiphon und Eckventil",
                    "Design-Waschtischarmatur (Einhebel) mit Ablaufgarnitur, chrom",
                    "Wandspiegel 140 × 72,5 cm mit Rahmen passend in Metallic-Braun"
                ],
                price: "ca. 5.076,00 €"
            },
            {
                category: "WC-Anlage",
                items: [
                    "Spülrandloses Wand-Tiefspül-WC in runder Form mit verdeckter Befestigung, weiß mit pflegeleichter Glasur, Softclose-Sitz und Schallschutzset",
                    "Vorwandelement mit Unterputz-Spülkasten (112 cm) und Betätigungsplatte seidenmatt"
                ],
                price: "ca. 1.038,00 €"
            },
            {
                category: "Badheizkörper",
                items: [
                    "Badheizkörper 180 × 60 cm, weiß (RAL 9016)"
                ],
                price: "ca. 688,00 €"
            },
            {
                category: "Accessoires",
                items: [
                    "Wand-Papierrollenhalter, Stand-Seifenspender aus satiniertem Glas und WC-Bürstengarnitur, chrom"
                ],
                price: "ca. 570,00 €"
            }
        ]
    },

    // -------------------------------------------------------------
    // PREMIUM LINE (Gehobener Komfort & Edle Materialien)
    // -------------------------------------------------------------
    {
        id: "premium-4-6",
        slug: "premium-bad-4_6",
        size: "4,6 ㎡",
        sqm: 4.6,
        tier: "Premium",
        title: "Komfort-Bad 4,6 ㎡",
        headline: "Barrierefreier Luxus und Edelstahl-Akzente auf kompaktem Raum",
        priceFormatted: "ca. 10.009,00 €",
        priceNumber: 10009,
        vatNote: "inkl. gesetzl. MwSt.",
        image: "/images/uploads/03.webp",
        highlights: [
            "Barrierefreies Fünfeck-Duschelement 90 cm mit teilgerahmter Glasabtrennung",
            "Asymmetrischer Waschtisch 100 cm mit Edelstahl-Armatur (gebürstet)",
            "4-seitig hinterleuchteter LED-Lichtspiegel 100 × 80 cm",
            "Kompakt-Wand-WC mit platzsparendem Eck-Vorwandelement",
            "Design-Badheizkörper 175,4 × 50 cm (RAL 9016)"
        ],
        components: [
            {
                category: "Dusch-Anlage",
                items: [
                    "Fünfeck-Duschelement 90 cm, rollstuhlbefahrbar, Ablauf waagerecht",
                    "Duschsystem mit Thermostat und Sicherheitsablage, 3-fach verstellbarer Handbrause und Schlauch, verchromt",
                    "Teilgerahmte Fünfeck-Duschabtrennung 90 × 200 cm, 2-teilig mit Festfeld, Profile silber Hochglanz, ESG mit Abperl-Beschichtung"
                ],
                price: "ca. 2.724,00 €"
            },
            {
                category: "Waschtisch-Anlage",
                items: [
                    "Asymmetrischer Mineralguss-Waschtisch mit Waschtischunterschrank 57 × 48 × 100 cm in Weiß Hochglanz, mit Eckventil und Siphon",
                    "Einhand-Waschtischarmatur aus Edelstahl, matt gebürstet, mit Ablaufgarnitur",
                    "LED-Lichtspiegel 100 × 80 cm, 4-seitig hinterleuchtet"
                ],
                price: "ca. 3.820,00 €"
            },
            {
                category: "WC-Anlage",
                items: [
                    "Kompakt-Wand-Tiefspül-WC (Ausladung 48 cm), weiß mit pflegeleichter Glasur, WC-Sitz mit Absenkautomatik und Edelstahlscharnieren",
                    "Eck-Vorwandelement für Wand-WC inkl. Verkleidung und Betätigungsplatte weiß"
                ],
                price: "ca. 1.657,00 €"
            },
            {
                category: "Badheizkörper",
                items: [
                    "Design-Badheizkörper 175,4 × 50 cm (RAL 9016)"
                ],
                price: "ca. 1.532,00 €"
            },
            {
                category: "Accessoires",
                items: [
                    "Papierhalter mit Deckel, WC-Bürstengarnitur, Flüssigseifenspender und Zahnputzglashalter in Glas/Chrom"
                ],
                price: "ca. 276,00 €"
            }
        ]
    },
    {
        id: "premium-7-0",
        slug: "premium-bad-7",
        size: "7,0 ㎡",
        sqm: 7.0,
        tier: "Premium",
        title: "Premium-Bad 7,0 ㎡",
        headline: "Elegante Balance aus Funktion, Ästhetik und bodengleicher Duschzone",
        priceFormatted: "ca. 11.450,00 €",
        priceNumber: 11450,
        vatNote: "inkl. gesetzl. MwSt.",
        image: "/images/uploads/04.webp",
        highlights: [
            "Waschtischanlage 100 cm mit LED-Lichtspiegel und Touch-Bedienung",
            "Bodengleiche Walk-In-Duschzone mit Edelstahl-Duschrinne",
            "Rahmenlose Festglaswand mit Abperl-Beschichtung",
            "Design-Badheizkörper mit Handtuchwärmefunktion",
            "Spülrandloses Wand-WC mit Unterputz-Vorwandelement"
        ],
        components: [
            {
                category: "Dusch-Anlage",
                items: [
                    "Bodengleiche Walk-In-Dusche mit Edelstahl-Designrinne und Festglaswand 100 × 200 cm",
                    "Regendusch-System mit Thermostat und Anti-Kalk-Düsen"
                ],
                price: "ca. 3.650,00 €"
            },
            {
                category: "Möbel & Keramik",
                items: [
                    "Möbelwaschtisch 100 cm mit Softclose-Schubladen, Front samtweiß lackiert",
                    "LED-Lichtspiegel mit Touch-Sensor und einstellbarer Lichtfarbe (2.700–6.500 K)",
                    "Spülrandloses Design-Wand-WC mit Vorwandelement"
                ],
                price: "ca. 5.950,00 €"
            },
            {
                category: "Heizung & Details",
                items: [
                    "Design-Badheizkörper in Anthrazit oder Weiß",
                    "Accessoires-Set, verchromt"
                ],
                price: "ca. 1.850,00 €"
            }
        ]
    },
    {
        id: "premium-8-2",
        slug: "premium-bad-8_2",
        size: "8,2 ㎡",
        sqm: 8.2,
        tier: "Premium",
        title: "Premium-Bad 8,2 ㎡",
        headline: "Stilvolles Ambiente mit großzügigem Waschtisch & Walk-In Dusche",
        priceFormatted: "ca. 13.800,00 €",
        priceNumber: 13800,
        vatNote: "inkl. gesetzl. MwSt.",
        image: "/images/uploads/01.webp",
        highlights: [
            "Möbelwaschtisch 120 cm mit samtweißer Front",
            "LED-Lichtspiegel 120 × 75 cm mit Lichtband und Dimmfunktion",
            "Walk-In-Dusche mit Edelstahl-Duschrinne und Echtglaswand",
            "Spülrandloses Wand-WC mit verdeckter Befestigung",
            "Drehbarer Design-Badheizkörper"
        ],
        components: [
            {
                category: "Dusch-Anlage",
                items: [
                    "Edelstahl-Duschrinne mit Walk-In-Glaswand 120 × 200 cm",
                    "Duschthermostat mit Regen-Kopfbrause (Ø 25 cm) und 2-strahliger Handbrause"
                ],
                price: "ca. 4.200,00 €"
            },
            {
                category: "Waschtisch-Anlage",
                items: [
                    "Waschtischanlage 120 cm mit Doppel-Schublade und Mineralguss-Becken",
                    "Einhand-Waschtischarmatur, chrom",
                    "LED-Lichtspiegel 120 cm mit stufenlos einstellbarer Lichtfarbe"
                ],
                price: "ca. 5.600,00 €"
            },
            {
                category: "WC-Anlage",
                items: [
                    "Spülrandloses Wand-Tiefspül-WC mit Softclose-Sitz",
                    "Vorwandelement 112 cm mit Unterputz-Spülkasten und Glas-Betätigungsplatte"
                ],
                price: "ca. 1.650,00 €"
            },
            {
                category: "Heizung & Zubehör",
                items: [
                    "Drehbarer Design-Badheizkörper 175,4 × 60 cm",
                    "Design-Accessoires-Set"
                ],
                price: "ca. 2.350,00 €"
            }
        ]
    },
    {
        id: "premium-15-9",
        slug: "premium-bad-15_9",
        size: "15,9 ㎡",
        sqm: 15.9,
        tier: "Premium / Komfort",
        title: "Komfort-Bad 15,9 ㎡",
        headline: "Großzügige Wellness-Oase für höchste Komfort- und Designansprüche",
        priceFormatted: "ca. 17.231,00 €",
        priceNumber: 17231,
        vatNote: "inkl. gesetzl. MwSt.",
        image: "/images/uploads/02.webp",
        highlights: [
            "Möbel-Doppelwaschtisch 140 cm mit pflegeleichter Oberfläche & LED-Lichtspiegel (2.700–6.500 K)",
            "Große Stahl-Badewanne 190 × 90 cm mit Wannenfüllung über den Überlauf",
            "Bodengleiche Walk-In-Dusche mit Edelstahl-Duschrinne 100 cm",
            "LED-Kopfbrause Ø 30 cm mit Nachtropf-Stopp",
            "Drehbarer Design-Badheizkörper 175,4 × 75 cm"
        ],
        components: [
            {
                category: "Badewannen-Anlage",
                items: [
                    "Stahl-Badewanne 190 × 90 cm, Mittelablauf, weiß, mit Wannenträger und Ab- und Überlaufgarnitur mit integriertem Wasserzulauf",
                    "Unterputz-Wannenarmatur mit Wandanschlussbogen, 1-strahlige Stabhandbrause und Design-Brauseschlauch, verchromt"
                ],
                price: "ca. 2.799,00 €"
            },
            {
                category: "Dusch-Anlage",
                items: [
                    "Edelstahl-Duschrinne 100 cm mit Designrost",
                    "Thermostat-Duschsystem mit LED-Kopfbrause Ø 30 cm (Nachtropf-Stopp), Design-Brauseschlauch verchromt und 2-strahliger Handbrause Ø 12 cm",
                    "Eckiger Wandbrausehalter, verchromt",
                    "Pendeltür mit Design-Scharnieren für Nischeneinbau, ESG klar mit Abperl-Beschichtung, chrom, inkl. Aufmaß und Montage"
                ],
                price: "ca. 5.117,00 €"
            },
            {
                category: "Waschtisch-Anlage",
                items: [
                    "Mineralguss-Möbel-Doppelwaschtisch 140 × 49 cm, weiß mit pflegeleichter Oberfläche, inkl. Eckventilen",
                    "Waschtischunterschrank 56,6 × 50 × 140 cm, samtweiß matt",
                    "Einhand-Waschtischarmatur mit Ablaufgarnitur, verchromt",
                    "LED-Lichtspiegel 140 × 75 cm mit Lichtband oben und einstellbarer Lichtfarbe 2.700–6.500 K (warm/kalt)"
                ],
                price: "ca. 5.386,00 €"
            },
            {
                category: "WC-Anlage",
                items: [
                    "Spülrandloses Wand-Tiefspül-WC mit verdeckter Befestigung, weiß mit pflegeleichter Glasur, WC-Sitz mit Absenkautomatik und Edelstahlscharnieren sowie Schallschutzset",
                    "Vorwandelement mit Unterputz-Spülkasten (112 cm)",
                    "Betätigungsplatte für 2-Mengen-Spülung (Glas weiß / Kunststoff weiß)"
                ],
                price: "ca. 1.512,00 €"
            },
            {
                category: "Badheizkörper",
                items: [
                    "Drehbarer Design-Badheizkörper 175,4 × 75 cm (RAL 9016)"
                ],
                price: "ca. 1.668,00 €"
            },
            {
                category: "Accessoires",
                items: [
                    "Papierhalter ohne Deckel und Wand-WC-Bürstengarnitur, verchromt, mit Behälter aus weißer Keramik",
                    "Handtuchhalter 1-armig, starr (48 cm), und Wand-Seifenspender mit weißer Keramik, verchromt"
                ],
                price: "ca. 749,00 €"
            }
        ]
    },

    // -------------------------------------------------------------
    // LUXUS LINE (High-End Spa, Dusch-WC & Maßanfertigungen)
    // -------------------------------------------------------------
    {
        id: "luxus-4-6",
        slug: "luxus-bad-4_6",
        size: "4,6 ㎡",
        sqm: 4.6,
        tier: "Luxus",
        title: "Luxus-Bad 4,6 ㎡",
        headline: "High-End Mini-Spa mit Dusch-WC und dimmbarer Lichtarchitektur",
        priceFormatted: "ca. 14.500,00 €",
        priceNumber: 14500,
        vatNote: "inkl. gesetzl. MwSt.",
        image: "/images/uploads/03.webp",
        highlights: [
            "Dusch-WC mit Gesäßdusche, Geruchsabsaugung und Warmluftföhn",
            "Bodengleiche Walk-In-Regendusche mit Decken-LED & rahmenloser Glasfront",
            "Maßgefertigter Mineralwerkstoff-Waschtisch mit Echtholz-Unterschrank",
            "LED-Lichtspiegel mit Touch-Steuerung und Spiegelheizung gegen Beschlag",
            "Elektrische Fußbodentemperierung und Design-Heizpaneel"
        ],
        components: [
            {
                category: "Dusch-Anlage & Spa",
                items: [
                    "Bodengleiche Walk-In-Dusche mit integriertem Decken-Regenpaneel und farbiger LED-Beleuchtung",
                    "Rahmenlose Glasfront aus Einscheibensicherheitsglas (100 × 210 cm) mit Abperl-Beschichtung",
                    "Unterputz-Thermostat mit digitaler Temperatureinstellung"
                ],
                price: "ca. 4.800,00 €"
            },
            {
                category: "Waschtisch & Möbel",
                items: [
                    "Maßgefertigter Waschtisch aus Mineralwerkstoff mit Echtholz-Unterbau (Eiche natur oder Räuchereiche)",
                    "Design-Waschtischarmatur in Gunmetal oder gebürstetem Messing",
                    "LED-Spiegel mit integrierter Uhr, Bluetooth-Lautsprecher und Spiegelheizung"
                ],
                price: "ca. 4.900,00 €"
            },
            {
                category: "Dusch-WC der Spitzenklasse",
                items: [
                    "Dusch-WC mit Funkfernbedienung, oszillierender Komfortdusche, Sitzheizung und Selbstreinigung",
                    "Unterputz-Vorwandelement mit Geruchsabsaugung und Glas-Betätigungsplatte"
                ],
                price: "ca. 3.200,00 €"
            },
            {
                category: "Heizung & Licht",
                items: [
                    "Flacher Design-Heizkörper und elektrische Fußbodentemperierung",
                    "Indirekte LED-Beleuchtung in Schattenfugen"
                ],
                price: "ca. 1.600,00 €"
            }
        ]
    },
    {
        id: "luxus-7-0",
        slug: "luxus-bad-7",
        size: "7,0 ㎡",
        sqm: 7.0,
        tier: "Luxus",
        title: "Luxus-Bad 7,0 ㎡",
        headline: "Exklusive Spa-Atmosphäre mit Mineralguss-Wanne & Dusch-WC",
        priceFormatted: "ca. 18.900,00 €",
        priceNumber: 18900,
        vatNote: "inkl. gesetzl. MwSt.",
        image: "/images/uploads/04.webp",
        highlights: [
            "Ergonomische Mineralguss-Badewanne mit Unterputz-Schwallauslauf",
            "Walk-In-Regendusche mit Deckenbrause & rahmenloser Glasabtrennung",
            "Doppelwaschtischanlage 120 cm samtweiß mit LED-Ambientebeleuchtung",
            "Dusch-WC mit Fernbedienung & Nachtlicht",
            "Design-Heizpaneel mit programmierbarem Raumthermostat"
        ],
        components: [
            {
                category: "Badewannen & Spa",
                items: [
                    "Mineralguss-Designwanne mit samtig-warmer Oberfläche und Schwallauslauf aus der Wand",
                    "Unterputz-Thermostatarmatur mit Stabhandbrause"
                ],
                price: "ca. 4.600,00 €"
            },
            {
                category: "Dusch-Anlage",
                items: [
                    "Bodengleiche Walk-In-Dusche mit Decken-Regenkopfbrause",
                    "Rahmenlose Glasabtrennung 120 × 205 cm"
                ],
                price: "ca. 5.100,00 €"
            },
            {
                category: "Doppelwaschtisch & Möbel",
                items: [
                    "Doppelbecken-Möbelanlage 120 cm mit Softclose-Auszügen und matter Oberfläche",
                    "2 Unterputz-Waschtischarmaturen im Design-Look",
                    "Großflächiger LED-Lichtspiegel, dimmbar, mit einstellbarer Lichtfarbe (warm/kalt)"
                ],
                price: "ca. 4.900,00 €"
            },
            {
                category: "Dusch-WC & Heizung",
                items: [
                    "Dusch-WC mit verdeckten Anschlüssen und Unterputz-Vorwandelement",
                    "Design-Heizpaneel und Fußbodenheizung"
                ],
                price: "ca. 4.300,00 €"
            }
        ]
    },
    {
        id: "luxus-8-2",
        slug: "luxus-bad-8_2",
        size: "8,2 ㎡",
        sqm: 8.2,
        tier: "Luxus",
        title: "Luxus-Bad 8,2 ㎡",
        headline: "High-End Wellness mit freistehender Wanne & Decken-Regenhimmel",
        priceFormatted: "ca. 21.400,00 €",
        priceNumber: 21400,
        vatNote: "inkl. gesetzl. MwSt.",
        image: "/images/uploads/01.webp",
        highlights: [
            "Freistehende Mineralguss-Badewanne mit Standarmatur",
            "Großzügige Walk-In-Dusche mit Decken-Regenhimmel",
            "Design-Waschtisch 140 cm in Mattlack mit LED-Schattenfuge",
            "Dusch-WC mit Warmluftföhn & Selbstreinigung",
            "Design-Badheizkörper mit integriertem Handtuchwärmer"
        ],
        components: [
            {
                category: "Freistehende Wanne",
                items: [
                    "Freistehende Badewanne aus mattem Mineralguss mit Standarmatur in Mattschwarz oder Chrom"
                ],
                price: "ca. 5.800,00 €"
            },
            {
                category: "Dusch-Anlage",
                items: [
                    "Bodengleiche Walk-In-Duschzone mit Decken-Regenhimmel 40 × 40 cm",
                    "Rahmenlose Echtglaswand 140 cm mit Abperl-Beschichtung"
                ],
                price: "ca. 6.200,00 €"
            },
            {
                category: "Waschtisch & Möbel",
                items: [
                    "Design-Doppelwaschtisch 140 cm in samtmatten Lackfarben mit Push-to-Open-Auszügen",
                    "2 Unterputz-Waschtischmischer und doppelter LED-Lichtspiegel mit Gestensteuerung"
                ],
                price: "ca. 5.400,00 €"
            },
            {
                category: "Dusch-WC & Raumwärme",
                items: [
                    "Dusch-WC mit beheizbarem Sitz, Fernbedienung und Nachtlicht",
                    "Design-Wandheizkörper & elektrische Fußbodenheizung"
                ],
                price: "ca. 4.000,00 €"
            }
        ]
    },
    {
        id: "luxus-15-9",
        slug: "luxus-bad-15_9",
        size: "15,9 ㎡",
        sqm: 15.9,
        tier: "Luxus",
        title: "Luxus-Bad 15,9 ㎡",
        headline: "Kompromisslose High-End Architektur & Private-Spa Atmosphäre",
        priceFormatted: "ca. 24.800,00 €",
        priceNumber: 24800,
        vatNote: "inkl. gesetzl. MwSt.",
        image: "/images/uploads/05.webp",
        highlights: [
            "Freistehende Mineralguss-Badewanne mit Standarmatur",
            "Großformatige Walk-In-Dusche mit Decken-Regenpaneel & farbiger LED-Beleuchtung",
            "Möbel-Doppelwaschtisch in Echtholz- oder Mattlack-Ausführung mit Doppel-LED-Spiegel",
            "Dusch-WC mit Gesäßdusche, Geruchsabsaugung & Warmluftföhn",
            "Individuelle Lichtzonen und Smart-Home-Steuerung"
        ],
        components: [
            {
                category: "Spa & Badewanne",
                items: [
                    "Freistehende Badewanne aus mattem Mineralwerkstoff mit Standarmatur"
                ],
                price: "ca. 6.200,00 €"
            },
            {
                category: "Erlebnis-Dusche",
                items: [
                    "Walk-In-Duschanlage mit Decken-Regenbrause und elektronischer Thermostatsteuerung",
                    "Rahmenlose Echtglas-Abtrennung 140 × 210 cm"
                ],
                price: "ca. 7.900,00 €"
            },
            {
                category: "Doppelwaschtisch & Dusch-WC",
                items: [
                    "Maßgefertigter Doppelwaschtisch mit samtig-matter Oberfläche",
                    "Dusch-WC mit Fernbedienung und Selbstreinigungsfunktion"
                ],
                price: "ca. 8.400,00 €"
            },
            {
                category: "Heizung & Licht",
                items: [
                    "Design-Wandheizkörper & Fußbodentemperierung",
                    "Integrierte LED-Beleuchtung in Schattenfugen"
                ],
                price: "ca. 2.300,00 €"
            }
        ]
    }
];

export const ROOM_SIZES = [
    { label: "4,6 ㎡ (Kompaktbad / Gäste-WC)", value: "4.6", sqm: 4.6 },
    { label: "7,0 ㎡ (Standard-Familienbad)", value: "7.0", sqm: 7.0 },
    { label: "8,2 ㎡ (Komfort-Badezimmer)", value: "8.2", sqm: 8.2 },
    { label: "15,9 ㎡ (Großzügiges Spa-Bad)", value: "15.9", sqm: 15.9 }
];

export const QUALITY_TIERS = [
    {
        name: "Basic",
        subtitle: "Solide Qualität zu fairen Einstiegspreisen",
        priceRange: "4.500 € – 8.000 €",
        description: "Solide Sanitärausstattung mit Stahl-Duschwannen, Wand-WCs mit Vorwandelement und Design-Badheizkörpern. Robust, pflegeleicht und langlebig."
    },
    {
        name: "Premium",
        subtitle: "Gehobener Komfort mit edlen Oberflächen",
        priceRange: "9.000 € – 18.000 €",
        description: "Bodengleiche Walk-In-Duschen mit Edelstahlrinne, Möbelwaschtische mit LED-Lichtspiegel, Echtglaswände und drehbare Design-Badheizkörper."
    },
    {
        name: "Luxus",
        subtitle: "High-End Spa & Maßanfertigungen ohne Kompromisse",
        priceRange: "ab 20.000 €",
        description: "Freistehende Wannen, Dusch-WCs mit Komfortfunktionen, Decken-Regenpaneele und smarte LED-Lichtarchitektur."
    }
];

export default MUSTERBAEDER;
