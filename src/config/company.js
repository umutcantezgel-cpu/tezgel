// OFFICIAL COMPANY DATA - FLIESENVERLEGUNG TEZGEL
// Master Data Hub for Aßlar, Wetzlar, Mittelhessen & Hessen

import { Award, Users, Target, Heart, Clock, Shield, CheckCircle, Sparkles, CheckCircle2, ShieldCheck, Ruler, Droplets } from 'lucide-react';

export const COMPANY_DATA = {
    // Legal Information
    legalName: "Fliesenverlegung Tezgel",
    tradeName: "Fliesenverlegung Tezgel Aßlar & Wetzlar",
    owner: {
        firstName: "Deniz",
        lastName: "Tezgel",
        title: "Inhaber & Fachbetriebsleiter",
        fullName: "Deniz Tezgel"
    },

    // Headquarters & Branch Address
    headquarters: {
        street: "Hohwardstraße 14",
        postalCode: "35614",
        city: "Aßlar",
        state: "Hessen",
        country: "Deutschland",
        fullAddress: "Hohwardstraße 14, 35614 Aßlar, Deutschland",
        phone: "06441 / 44 83 567",
        phoneLink: "064414483567",
        mobile: "0172 / 67 28 504",
        mobileLink: "01726728504",
        whatsapp: "491726728504",
        whatsappLink: "https://wa.me/491726728504",
        fax: "06441 / 44 83 548",
        email: "info@tezgel.de",
        mapsUrl: "https://maps.google.com/?q=Hohwardstra%C3%9Fe+14,+35614+A%C3%9Flar"
    },

    // Address & Contact (Compatibility Alias)
    address: {
        street: "Hohwardstraße 14",
        postalCode: "35614",
        city: "Aßlar",
        state: "Hessen",
        country: "Deutschland",
        countryCode: "DE",
        fullAddress: "Hohwardstraße 14, 35614 Aßlar, Deutschland"
    },

    // Tax & Registration
    tax: {
        ustId: "DE 259249094", // Umsatzsteuer-Identifikationsnummer
        taxNumber: "FA Wetzlar",
        court: "Amtsgericht Wetzlar",
        registerStatus: "Eingetragener Handwerksbetrieb bei der Handwerkskammer Wiesbaden"
    },

    // Authority & Compliance
    authority: {
        name: "Handwerkskammer Wiesbaden",
        shortName: "HWK Wiesbaden",
        type: "Handwerkskammer",
        responsibility: "Fliesen-, Platten- und Mosaiklegerbetrieb",
        certification: "Eingetragener Fachbetrieb der HWK Wiesbaden"
    },

    // Leitmotiv / Mission Statement
    motto: "Die Zufriedenheit unserer Kunden ist die beste Reklame für uns.",

    // Business Information
    business: {
        industryType: "Fliesen-, Platten- und Mosaikverlegung, Naturstein & Badsanierung",
        businessType: "Eingetragener Fachbetrieb der HWK Wiesbaden",
        primaryServices: [
            "Badsanierung & Barrierefreie Walk-In-Duschen",
            "Fugenarme Großformatverlegung (XXL-Fliesen)",
            "Wohnbereiche, Neubau, Küchen & Treppenanlagen",
            "Balkon- & Terrassensanierung auf Stelzlagern",
            "Untergrundvorbereitung & DIN 18534 Verbundabdichtung",
            "Naturstein- und Granitverlegung"
        ],
        serviceArea: [
            "Aßlar",
            "Wetzlar",
            "Lahn-Dill-Kreis",
            "Gießen",
            "Mittelhessen",
            "Braunfels",
            "Solms",
            "Herborn",
            "Dillenburg",
            "Haiger",
            "Ehringshausen",
            "Hüttenberg",
            "Lahnau",
            "Hessen (landesweit für Großprojekte)"
        ],
        establishmentYear: 2008
    },

    // Contact
    contact: {
        phone: "06441 / 44 83 567",
        phoneFormatted: "06441 / 44 83 567",
        phoneLink: "064414483567",
        mobile: "0172 / 67 28 504",
        mobileFormatted: "0172 / 67 28 504",
        mobileLink: "01726728504",
        whatsapp: "0172 / 67 28 504",
        whatsappNumber: "491726728504",
        whatsappLink: "https://wa.me/491726728504",
        fax: "06441 / 44 83 548",
        email: "info@tezgel.de",
        website: "https://tezgel.de"
    },

    // Social Profiles
    social: {
        instagram: "https://www.instagram.com/fliesenverlegung_tezgel/"
    },

    // Business Hours
    hours: {
        monday: { open: "07:30", close: "18:00", type: "normal" },
        tuesday: { open: "07:30", close: "18:00", type: "normal" },
        wednesday: { open: "07:30", close: "18:00", type: "normal" },
        thursday: { open: "07:30", close: "18:00", type: "normal" },
        friday: { open: "07:30", close: "17:00", type: "normal" },
        saturday: { open: "08:00", close: "14:00", type: "appointment_only", note: "Nach Vereinbarung / Aufmaßtermine" },
        sunday: { open: "00:00", close: "00:00", type: "closed" },
        formattedWeekdays: "Mo - Fr: 07:30 – 18:00 Uhr",
        formattedSaturday: "Sa: 08:00 – 14:00 Uhr (Vor-Ort-Termine)"
    },

    // 3 Vertrauens-Säulen
    trustPillars: [
        {
            title: "Normgerechte Verbundabdichtung (DIN 18534)",
            description: "Normgerechte Abdichtung im Verbund für Walk-In-Duschen, Nassbereiche und Terrassen. Lückenloser Schutz vor Feuchtigkeitsschäden.",
            icon: ShieldCheck
        },
        {
            title: "Eingetragener HWK-Wiesbaden Fachbetrieb",
            description: "Handwerkliche Perfektion, geprüfte Standards und fachgerechte Präzision bei Großformaten, Schnittbildern und Fugenachsen.",
            icon: Award
        },
        {
            title: "Staubschutz & Sauberkeitsversprechen",
            description: "Einsatz moderner Staubschutztüren, Luftreiniger und Schutzabdeckungen. Wir hinterlassen Ihr Objekt besenrein.",
            icon: Sparkles
        }
    ],

    // 8-Punkte Qualitätsversprechen
    qualityPromises: [
        {
            title: "Kostenfreies Vor-Ort-Aufmaß & Schadensanalyse",
            description: "Persönliche Begutachtung des Untergrunds, Restfeuchtemessung und fundierte technische Beratung direkt bei Ihnen."
        },
        {
            title: "Millimetergenaue Großformatverlegung (XXL)",
            description: "Spezialwerkzeuge, moderne Vakuum-Heber und exaktes Nivelliersystem für planebene Oberflächen ohne Überzähne."
        },
        {
            title: "Normgerechte Verbundabdichtung nach DIN 18534",
            description: "Lückenlose Abdichtungsbahnen und Dichtmanschetten in Nassräumen für dauerhafte Dichtigkeit und Schimmelschutz."
        },
        {
            title: "Verbindliche Festpreis-Kalkulation",
            description: "Transparente Kostenaufstellung nach Quadratmetern und Arbeitsaufwand ohne unvorhergesehene Zusatzkosten."
        },
        {
            title: "Verlässliche Termintreue & Bauzeitenplan",
            description: "Feste Zusagen für Baustart und Fertigstellung – damit Ihr Alltag planbar bleibt."
        },
        {
            title: "Garantierter Staubschutz bei Sanierungen",
            description: "Schonendes Arbeiten im bewohnten Bestand mit Staubschutzwänden und Luftreinigern."
        },
        {
            title: "Hochwertige Verlegewerkstoffe & Markenkleber",
            description: "Ausschließliche Verwendung flexibler C2-TE-S1/S2 Fliesenkleber und verfärbungsfreier Premium-Fugenmassen."
        },
        {
            title: "Persönliche Betreuung durch Inhaber Deniz Tezgel",
            description: "Ein fester Ansprechpartner von der ersten Skizze bis zur finalen Abnahme Ihres Projekts."
        }
    ]
};

export const values = [
    { icon: Award, title: "HWK Wiesbaden Mitglied", description: "Offiziell eingetragener Fachbetrieb für Fliesen-, Platten- und Mosaikverlegung." },
    { icon: ShieldCheck, title: "DIN 18534 Abdichtung", description: "Normgerechte Verbundabdichtung für dauerhaft dichte Nassbereiche." },
    { icon: Sparkles, title: "Staubschutz-Garantie", description: "Saubere Baustellenführung mit Schutzvliesen und moderner Staubabsaugung." },
    { icon: Clock, title: "Termintreue & Festpreis", description: "Verbindliche Zeitpläne und klare Kosten ohne versteckte Aufschläge." },
    { icon: Ruler, title: "Großformat-Präzision", description: "Nivelliersystem für absolut planebene XXL-Fliesen und harmonische Fugenbilder." },
    { icon: Heart, title: "Kundenbegeisterung", description: "„Die Zufriedenheit unserer Kunden ist die beste Reklame für uns.“" }
];

export const processSteps = [
    {
        step: "01",
        title: "Planung & Aufmaß vor Ort",
        subtitle: "Begutachtung & Untergrundanalyse",
        description: "Deniz Tezgel begutachtet Ihre Räumlichkeiten in Aßlar, Wetzlar oder Hessen persönlich. Wir prüfen die Ebenheit, Restfeuchte und statische Tragfähigkeit des Untergrunds."
    },
    {
        step: "02",
        title: "Material & Fugenbild",
        subtitle: "Beratung zu Formaten & Rutschhemmung",
        description: "Auswahl von XXL-Großformaten, Feinsteinzeug oder Naturstein. Detaillierte Planung von Fugenachsen, Edelstahlschienen und normgerechter Rutschhemmung (R10/R11)."
    },
    {
        step: "03",
        title: "Ausführung & Abnahme",
        subtitle: "Staubgeschützt, termintreu & DIN-gerecht",
        description: "Fachgerechte Verlegung mit modernstem Nivelliersystem und normgerechter Abdichtung. Besenreine Endreinigung und gemeinsame Abnahme."
    }
];

export const team = [
    { name: "Deniz Tezgel", role: "Inhaber & Fachbetriebsleiter", experience: "Langjährige Handwerkskompetenz", image: "" },
    { name: "Fachverlegeteam", role: "Fliesen-, Platten- & Mosaikleger", experience: "Spezialisiert auf Großformate & Bäder", image: "" }
];

export const historyTimeline = [
    {
        year: "2008",
        title: "Betriebsgründung in Aßlar",
        description: "Gründung der Fliesenverlegung Tezgel und Eintragung bei der Handwerkskammer Wiesbaden durch Deniz Tezgel."
    },
    {
        year: "2014",
        title: "Fokus auf fugenarme Großformate",
        description: "Investition in spezialisierte Schneid- und Vakuumhebetechnik für millimetergenaue XXL-Fliesenformate."
    },
    {
        year: "2019",
        title: "Verbundabdichtung nach DIN 18534 als Standard",
        description: "Normgerechte Abdichtungssysteme für bodengleiche Walk-In-Duschen und Feuchträume."
    },
    {
        year: "Heute",
        title: "Ihr Fliesen-Fachbetrieb in Mittelhessen",
        description: "Fester Partner für private Bauherren und anspruchsvolle Sanierungsobjekte in Aßlar, Wetzlar und ganz Hessen."
    }
];

// Material- und Systemhersteller, mit denen gearbeitet wird (ohne Partnerstatus –
// bitte vom Inhaber bestätigen lassen).
export const partnerBrands = [
    { name: "Schlüter-Systems", category: "Abdichtungs- & Profilsysteme" },
    { name: "Ardex", category: "Fliesenkleber & Fugen" },
    { name: "Sopro", category: "Bauchemie & Verbundabdichtung" },
    { name: "PCI", category: "Verlegewerkstoffe & Estrichsysteme" },
    { name: "Marazzi", category: "Feinsteinzeug & Großformate" },
    { name: "Villeroy & Boch", category: "Designfliesen & Badkeramik" }
];

export const meinTeam = team;

export default COMPANY_DATA;

