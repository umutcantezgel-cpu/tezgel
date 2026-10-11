// Logik der Badanfrage (F-04, BadanfrageFunnel) – wörtlich aus der Komponente verschoben (P4-05a, Vorbild P3-00l).
// Ohne Markup; Bestand und Kern-Ansicht nutzen denselben Hook. Keine Logikänderung (G9): auch die bekannten Lücken
// (kein `_t`, leere/0-Maße möglich; intern I-18) bleiben, wie sie sind.
import React, { useState } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { openWhatsApp } from '@/lib/whatsapp';

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

type BadanfrageStatus = 'idle' | 'submitting' | 'success' | 'error' | 'whatsapp_opened';

export function useBadanfrage() {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState<BadanfrageStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [referenceId, setReferenceId] = useState('');
    const [formData, setFormData] = useState({
        objectType: 'efh',
        scope: 'komplett',
        length: '3.0',
        width: '2.5',
        persons: '2',
        tier: 'premium',
        features: ['walkin', 'led-spiegel'],
        name: '',
        phone: '',
        email: '',
        street: '',
        zipCity: '',
        notes: '',
        honeypot: ''
    });

    const toggleFeature = (feat: string) => {
        setFormData(prev => {
            const exists = prev.features.includes(feat);
            return {
                ...prev,
                features: exists ? prev.features.filter(f => f !== feat) : [...prev.features, feat]
            };
        });
    };

    // `as string` nur für den Typprüfer: parseFloat(0) und parseFloat('0') sind gleich (Laufzeit unverändert).
    const calculatedSqm = (parseFloat((formData.length || 0) as string) * parseFloat((formData.width || 0) as string)).toFixed(1);

    const objectTitle = OBJECT_TYPES.find((o) => o.id === formData.objectType)?.title ?? formData.objectType;
    const scopeTitle = SCOPES.find((s) => s.id === formData.scope)?.title ?? formData.scope;
    const tierTitle = TIERS.find((t) => t.id === formData.tier)?.title ?? formData.tier;
    const personsLabel = PERSON_OPTIONS.find((p) => p.value === formData.persons)?.label ?? formData.persons;
    const featureLabels = FEATURES.filter((f) => formData.features.includes(f.id)).map((f) => f.label);
    const addressText = [formData.street, formData.zipCity].filter(Boolean).join(', ') || 'Nicht angegeben';

    const getMessage = () =>
        `Hallo Herr ${COMPANY_DATA.owner.lastName},\nich interessiere mich für eine Badsanierung:\n\n` +
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
        `Bitte melden Sie sich bezüglich eines unverbindlichen Vor-Ort-Aufmaßes. Vielen Dank!`;

    const handleWhatsApp = () => {
        if (!formData.name || !formData.phone) {
            setErrorMessage('Bitte tragen Sie zumindest Name und Telefonnummer ein.');
            return;
        }
        openWhatsApp({
            phone: COMPANY_DATA.contact.whatsappNumber,
            text: getMessage(),
        });
        setStatus('whatsapp_opened');
    };

    const handleOnlineSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');
        setStatus('submitting');

        try {
            const response = await fetch('/api/anfrage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
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
                })
            });

            const data = await response.json();
            if (!response.ok || !data.success) {
                throw new Error(data.error || 'Übertragung fehlgeschlagen.');
            }

            if (data.referenceId) {
                setReferenceId(data.referenceId);
            }

            setStatus('success');
        } catch (err) {
            console.error('Submission error:', err);
            // `as Error` nur für den Typprüfer (catch-Variable ist unknown); Laufzeit wie im Bestand `err.message`.
            setErrorMessage((err as Error).message || 'Verbindungsfehler beim Absenden.');
            setStatus('error');
        }
    };

    // Bisher inline am Knopf „Neue Badanfrage starten“ (Erfolgsansicht).
    const handleNewRequest = () => {
        setStatus('idle');
        setStep(1);
        setReferenceId('');
    };

    // Bisher inline am Knopf „Zurück“ (Ansicht „WhatsApp geöffnet“).
    const handleBackFromWhatsApp = () => {
        setStatus('idle');
        setStep(1);
    };

    return {
        step,
        setStep,
        status,
        errorMessage,
        referenceId,
        formData,
        setFormData,
        toggleFeature,
        calculatedSqm,
        objectTitle,
        scopeTitle,
        tierTitle,
        personsLabel,
        featureLabels,
        addressText,
        handleWhatsApp,
        handleOnlineSubmit,
        handleNewRequest,
        handleBackFromWhatsApp
    };
}
