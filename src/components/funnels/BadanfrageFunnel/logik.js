// Logik der Badanfrage (E-011: aus BadanfrageFunnel.jsx verschoben, Verhalten unverändert – gesperrt).
// Auswahllisten, abgeleitete Beschriftungen, WhatsApp-Nachricht und Nutzlast für /api/anfrage.
export const OBJECT_TYPES = [
    { id: 'efh', title: 'Einfamilienhaus', desc: 'Freistehend oder Reihenhaus' },
    { id: 'etw', title: 'Eigentumswohnung', desc: 'Im Mehrparteienhaus' },
    { id: 'mfh', title: 'Mehrfamilienhaus', desc: 'Vermieter / Hausverwaltung' },
    { id: 'gewerbe', title: 'Gewerbeobjekt', desc: 'Büro, Praxis, Betrieb' }
];

export const SCOPES = [
    { id: 'komplett', title: 'Komplettbadsanierung', desc: 'Alles neu inkl. Fliesen, Sanitär & Elektrik' },
    { id: 'barrierefrei', title: 'Barrierefreies Bad', desc: 'DIN 18040-2 mit bis zu 4.180 € Pflegekassen-Zuschuss' },
    { id: 'dusche', title: 'Wanne zu Dusche', desc: 'Umbau auf bodengleiche Walk-In-Dusche' },
    { id: 'gaeste', title: 'Gäste-WC / Kleinbad', desc: 'Kompakte Modernisierung auf kleinem Raum' }
];

export const TIERS = [
    { id: 'basic', title: 'Basic', desc: 'Solide Markenqualität, funktional und zeitlos' },
    { id: 'premium', title: 'Premium', desc: 'Gehobener Komfort mit edlen Oberflächen & Echtglas' },
    { id: 'luxus', title: 'Luxus', desc: 'Freistehende Wanne, Dusch-WC & maßgefertigtes Design' }
];

export const PERSON_OPTIONS = [
    { value: '1', label: '1 Person' },
    { value: '2', label: '2 Personen' },
    { value: '3-4', label: '3 - 4 Personen (Familie)' },
    { value: '5+', label: '5+ Personen' }
];

export const FEATURES = [
    { id: 'walkin', label: 'Bodengleiche Walk-In-Dusche' },
    { id: 'wanne', label: 'Badewanne' },
    { id: 'doppel', label: 'Doppelwaschtisch' },
    { id: 'duschwc', label: 'Komfort Dusch-WC' },
    { id: 'fussboden', label: 'Fußbodenheizung' },
    { id: 'led-spiegel', label: 'LED-Lichtspiegel' }
];

export const TOTAL_STEPS = 5;

export function beschriftungen(formData) {
    const calculatedSqm = (parseFloat(formData.length || 0) * parseFloat(formData.width || 0)).toFixed(1);

    const objectTitle = OBJECT_TYPES.find((o) => o.id === formData.objectType)?.title ?? formData.objectType;
    const scopeTitle = SCOPES.find((s) => s.id === formData.scope)?.title ?? formData.scope;
    const tierTitle = TIERS.find((t) => t.id === formData.tier)?.title ?? formData.tier;
    const personsLabel = PERSON_OPTIONS.find((p) => p.value === formData.persons)?.label ?? formData.persons;
    const featureLabels = FEATURES.filter((f) => formData.features.includes(f.id)).map((f) => f.label);
    const addressText = [formData.street, formData.zipCity].filter(Boolean).join(', ') || 'Nicht angegeben';
    return { calculatedSqm, objectTitle, scopeTitle, tierTitle, personsLabel, featureLabels, addressText };
}

export function nachricht({ ownerLastName, formData, calculatedSqm, objectTitle, scopeTitle, tierTitle, personsLabel, featureLabels, addressText }) {
    return (
        `Hallo Herr ${ownerLastName},\nich interessiere mich für eine Badsanierung:\n\n` +
        `Immobilie: ${objectTitle}\n` +
        `Sanierungsumfang: ${scopeTitle}\n` +
        `Raummaße: ca. ${formData.length} x ${formData.width} m (${calculatedSqm} m²)\n` +
        `Personen im Haushalt: ${personsLabel}\n` +
        `Qualitätsstufe: ${tierTitle}\n` +
        `Wunschausstattung: ${featureLabels.join(', ') || 'Noch offen'}\n\n` +
        `Name: ${formData.name}\n` +
        `Telefon: ${formData.phone}\n` +
        `E-Mail: ${formData.email || 'Nicht angegeben'}\n` +
        `Adresse: ${addressText}\n` +
        (formData.notes ? `Anmerkungen: ${formData.notes}\n\n` : '\n') +
        `Bitte melden Sie sich bezüglich eines unverbindlichen Vor-Ort-Aufmaßes. Vielen Dank!`
    );
}

export function nutzlast({ formData, calculatedSqm, objectTitle, scopeTitle, tierTitle, personsLabel, featureLabels, addressText }) {
    return {
        inquiryType: 'bad',
        projectType: 'bad',
        projectTitle: `Badsanierung (${scopeTitle} · ${tierTitle})`,
        contact: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email || undefined,
            street: formData.street || undefined,
            zipCity: formData.zipCity || undefined,
            location: addressText
        },
        badDetails: {
            scope: formData.scope,
            scopeLabel: scopeTitle,
            tier: formData.tier,
            tierLabel: tierTitle,
            sqm: calculatedSqm,
            length: formData.length,
            width: formData.width,
            persons: formData.persons,
            personsLabel: personsLabel,
            propertyType: formData.objectType,
            propertyTypeLabel: objectTitle,
            features: formData.features,
            featureLabels: featureLabels
        },
        timing: `Personen im Haushalt: ${personsLabel}`,
        area: `${calculatedSqm} m² (${formData.length} x ${formData.width} m)`,
        notes: formData.notes ? formData.notes.trim() : undefined,
        honeypot: formData.honeypot || undefined
    };
}
