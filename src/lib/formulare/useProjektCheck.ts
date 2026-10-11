// Logik des Bad-Projektchecks (F-05, BadProjektCheck) – wörtlich aus der Komponente verschoben (P4-05a, Vorbild P3-00l).
// Ohne Markup; Bestand und Kern-Ansicht nutzen denselben Hook. Keine Logikänderung (G9): auch die bekannten Lücken
// (kein Honeypot, kein `_t`, Startwert 8,2 m² außerhalb des Reglerrasters; intern I-18) bleiben, wie sie sind.
import React, { useState } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { openWhatsApp } from '@/lib/whatsapp';

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

type SentVia = 'whatsapp' | 'online' | null;

export function useProjektCheck() {
    const [sqm, setSqm] = useState(8.2);
    const [tier, setTier] = useState('premium');
    const [sanitaryScope, setSanitaryScope] = useState('komplett');
    const [selectedOptions, setSelectedOptions] = useState([
        'walkin',
        'led-spiegel',
        'design-heizkoerper',
        'fliesen'
    ]);
    const [contactOpen, setContactOpen] = useState(false);
    const [leadData, setLeadData] = useState({ name: '', phone: '', email: '' });
    const [sentVia, setSentVia] = useState<SentVia>(null); // 'whatsapp' | 'online'
    const [referenceId, setReferenceId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const toggleOption = (id: string) => {
        setSelectedOptions(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const sqmLabel = sqm.toLocaleString('de-DE');
    const scopeLabel = SCOPE_OPTIONS.find((s) => s.id === sanitaryScope)?.label ?? sanitaryScope;
    const tierLabel = TIER_OPTIONS.find((t) => t.id === tier)?.label ?? tier;
    const extras = EXTRA_OPTIONS.filter((o) => selectedOptions.includes(o.id)).map((o) => o.label);
    const matchingBath = sqm <= 9
        ? { label: 'Kompaktbad 8,2 m²', slug: 'basic-bad-8_2' }
        : { label: 'Komfort-Bad 15,9 m²', slug: 'premium-bad-15_9' };

    const getLeadMessage = () => {
        return (
            `Hallo Herr ${COMPANY_DATA.owner.lastName},\nich habe den Bad-Projektcheck genutzt und bitte um ein Festpreisangebot:\n\n` +
            `Badgröße: ca. ${sqmLabel} m²\n` +
            `Sanierungsumfang: ${scopeLabel}\n` +
            `Ausstattungsniveau: ${tierLabel}\n` +
            `Wunschausstattung: ${extras.join(', ') || 'Keine Extras gewählt'}\n\n` +
            `Name: ${leadData.name}\n` +
            `Telefon: ${leadData.phone}\n` +
            `E-Mail: ${leadData.email || 'Nicht angegeben'}\n\n` +
            `Bitte melden Sie sich bezüglich eines unverbindlichen Vor-Ort-Aufmaßes. Vielen Dank!`
        );
    };

    const handleLeadSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Typangaben nur für den Typprüfer (SubmitEvent.submitter, HTMLButtonElement.value); Laufzeit unverändert.
        const submitter = (e.nativeEvent as SubmitEvent | undefined)?.submitter;
        const channel = submitter && (submitter as HTMLButtonElement).value === 'whatsapp' ? 'whatsapp' : 'online';
        const message = getLeadMessage();

        if (channel === 'whatsapp') {
            openWhatsApp({
                phone: COMPANY_DATA.contact.whatsappNumber,
                text: message,
            });
            setSentVia('whatsapp');
            return;
        }

        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const response = await fetch('/api/anfrage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
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
                })
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Übertragung fehlgeschlagen.');
            }

            if (data.referenceId) {
                setReferenceId(data.referenceId);
            }
            setSentVia('online');
        } catch (err) {
            console.error('BadProjektCheck submission error:', err);
            // `as Error` nur für den Typprüfer (catch-Variable ist unknown); Laufzeit wie im Bestand `err.message`.
            setErrorMessage((err as Error).message || 'Verbindungsfehler beim Absenden.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Bisher inline am Regler (onChange): Wert als Zahl übernehmen.
    const changeSqm = (value: string) => {
        setSqm(parseFloat(value));
    };

    // Bisher inline am Knopf „Erneut anfragen oder anpassen“ (Erfolgsansicht online).
    const handleNewRequest = () => {
        setSentVia(null);
        setReferenceId('');
    };

    return {
        sqm,
        changeSqm,
        tier,
        setTier,
        sanitaryScope,
        setSanitaryScope,
        selectedOptions,
        toggleOption,
        contactOpen,
        setContactOpen,
        leadData,
        setLeadData,
        sentVia,
        setSentVia,
        referenceId,
        isSubmitting,
        errorMessage,
        sqmLabel,
        scopeLabel,
        tierLabel,
        extras,
        matchingBath,
        handleLeadSubmit,
        handleNewRequest
    };
}
