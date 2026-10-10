// Logik des Bad-Projektchecks (E-011: aus BadProjektCheck.jsx verschoben, Verhalten unverändert – gesperrt).
// Auswahllisten, abgeleitete Beschriftungen, WhatsApp-Nachricht und Nutzlast für /api/anfrage.
export const SCOPE_OPTIONS = [
    { id: 'komplett', label: 'Komplettbad', desc: 'Schlüsselfertig' },
    { id: 'teil', label: 'Teilsanierung', desc: 'Sanitär & Keramik' },
    { id: 'dusche-nur', label: 'Wanne zu Dusche', desc: 'Nur Duschbereich' }
];

export const TIER_OPTIONS = [
    { id: 'basic', label: 'Solide', desc: 'Funktional & zeitlos' },
    { id: 'premium', label: 'Gehoben', desc: 'Edle Oberflächen' },
    { id: 'luxus', label: 'Exklusiv', desc: 'Spa-Charakter, Dusch-WC' }
];

export const EXTRA_OPTIONS = [
    { id: 'walkin', label: 'Bodengleiche Walk-In-Dusche' },
    { id: 'badewanne', label: 'Badewanne / Komfortwanne' },
    { id: 'dusch-wc', label: 'Dusch-WC mit Hygiene-Spülung' },
    { id: 'doppelwaschtisch', label: 'Möbel-Doppelwaschtisch' },
    { id: 'fussbodenheizung', label: 'Fußbodenheizung' },
    { id: 'design-heizkoerper', label: 'Design-Heizkörper' },
    { id: 'led-spiegel', label: 'LED-Lichtspiegel' },
    { id: 'fliesen', label: 'Großformat-Fliesenverlegung' }
];

export function beschriftungen({ sqm, sanitaryScope, tier, selectedOptions }) {
    const sqmLabel = sqm.toLocaleString('de-DE');
    const scopeLabel = SCOPE_OPTIONS.find((s) => s.id === sanitaryScope)?.label ?? sanitaryScope;
    const tierLabel = TIER_OPTIONS.find((t) => t.id === tier)?.label ?? tier;
    const extras = EXTRA_OPTIONS.filter((o) => selectedOptions.includes(o.id)).map((o) => o.label);
    const matchingBath = sqm <= 9
        ? { label: 'Kompaktbad 8,2 m²', slug: 'basic-bad-8_2' }
        : { label: 'Komfort-Bad 15,9 m²', slug: 'premium-bad-15_9' };
    return { sqmLabel, scopeLabel, tierLabel, extras, matchingBath };
}

export function leadNachricht({ ownerLastName, sqmLabel, scopeLabel, tierLabel, extras, leadData }) {
    return (
        `Hallo Herr ${ownerLastName},\nich habe den Bad-Projektcheck genutzt und bitte um ein Festpreisangebot:\n\n` +
        `Badgröße: ca. ${sqmLabel} m²\n` +
        `Sanierungsumfang: ${scopeLabel}\n` +
        `Ausstattungsniveau: ${tierLabel}\n` +
        `Wunschausstattung: ${extras.join(', ') || 'Keine Extras gewählt'}\n\n` +
        `Name: ${leadData.name}\n` +
        `Telefon: ${leadData.phone}\n` +
        `E-Mail: ${leadData.email || 'Nicht angegeben'}\n\n` +
        `Bitte melden Sie sich bezüglich eines unverbindlichen Vor-Ort-Aufmaßes. Vielen Dank!`
    );
}

export function anfrageNutzlast({ sqmLabel, sanitaryScope, scopeLabel, tier, tierLabel, extras, leadData }) {
    return {
        inquiryType: 'projekt_check',
        projectType: 'bad',
        projectTitle: `Bad-Projektcheck (ca. ${sqmLabel} m²)`,
        contact: {
            name: leadData.name,
            phone: leadData.phone,
            email: leadData.email || undefined
        },
        projektCheckDetails: {
            sqm: sqmLabel,
            scope: sanitaryScope,
            scopeLabel,
            tier,
            tierLabel,
            extras
        },
        area: `ca. ${sqmLabel} m²`,
        timing: 'Nach Aufmaß'
    };
}
