// Logik der Badanfrage (F-04, BadanfrageFunnel) – wörtlich aus der Komponente verschoben (P4-05a, Vorbild P3-00l).
// Ohne Markup; Bestand und Kern-Ansicht nutzen denselben Hook. Keine Logikänderung (G9): auch die bekannten Lücken
// (kein `_t`, intern I-18) bleiben, wie sie sind.
// E4-W1 (F1): keine Vorauswahl mehr. Ungewählte Angaben heißen „keine Angabe“ und fehlen in der Übertragung; keines
// dieser Felder ist Pflicht (kein neues Pflichtfeld, M-24).
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

/** Anzeige für eine Angabe, die die Besucherin nicht gemacht hat (E4-W1) */
const OHNE_ANGABE = 'keine Angabe';

type BadanfrageStatus = 'idle' | 'submitting' | 'success' | 'error' | 'whatsapp_opened';

type BadanfrageForm = {
    objectType: string;
    scope: string;
    length: string;
    width: string;
    persons: string;
    tier: string;
    features: string[];
    name: string;
    phone: string;
    email: string;
    street: string;
    zipCity: string;
    notes: string;
    honeypot: string;
};

export function useBadanfrage() {
    const [step, setStep] = useState(1);
    const [status, setStatus] = useState<BadanfrageStatus>('idle');
    const [errorMessage, setErrorMessage] = useState('');
    const [referenceId, setReferenceId] = useState('');
    // Ohne Vorauswahl (E4-W1, F1): nichts ist beim Laden gewählt, die Maße sind leer.
    const [formData, setFormData] = useState<BadanfrageForm>({
        objectType: '',
        scope: '',
        length: '',
        width: '',
        persons: '',
        tier: '',
        features: [],
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

    // Grundfläche nur, wenn Länge und Breite als Zahl vorliegen; sonst leer und in der Anzeige „keine Angabe“.
    const laenge = parseFloat(formData.length);
    const breite = parseFloat(formData.width);
    const calculatedSqm = Number.isFinite(laenge) && Number.isFinite(breite) ? (laenge * breite).toFixed(1) : '';
    const flaecheText = calculatedSqm ? `${calculatedSqm} m²` : OHNE_ANGABE;

    const objekt = OBJECT_TYPES.find((o) => o.id === formData.objectType);
    const umfang = SCOPES.find((s) => s.id === formData.scope);
    const stufe = TIERS.find((t) => t.id === formData.tier);
    const personen = PERSON_OPTIONS.find((p) => p.value === formData.persons);
    const objectTitle = objekt?.title ?? OHNE_ANGABE;
    const scopeTitle = umfang?.title ?? OHNE_ANGABE;
    const tierTitle = stufe?.title ?? OHNE_ANGABE;
    const personsLabel = personen?.label ?? OHNE_ANGABE;
    const featureLabels = FEATURES.filter((f) => formData.features.includes(f.id)).map((f) => f.label);
    const featureText = featureLabels.length > 0 ? featureLabels.join(', ') : OHNE_ANGABE;
    const adressTeile = [formData.street, formData.zipCity].filter(Boolean);
    const hatAdresse = adressTeile.length > 0;
    const addressText = hatAdresse ? adressTeile.join(', ') : OHNE_ANGABE;
    const raumText = calculatedSqm
        ? `ca. ${formData.length} x ${formData.width} m (${calculatedSqm} m²)`
        : `Länge ${formData.length ? `${formData.length} m` : OHNE_ANGABE}, Breite ${formData.width ? `${formData.width} m` : OHNE_ANGABE}`;

    const getMessage = () =>
        `Hallo Herr ${COMPANY_DATA.owner.lastName},\nich interessiere mich für eine Badsanierung:\n\n` +
        `Immobilie: ${objectTitle}\n` +
        `Sanierungsumfang: ${scopeTitle}\n` +
        `Raummaße: ${raumText}\n` +
        `Personen im Haushalt: ${personsLabel}\n` +
        `Qualitätsstufe: ${tierTitle}\n` +
        `Wunschausstattung: ${featureText}\n\n` +
        `Name: ${formData.name}\n` +
        `Telefon: ${formData.phone}\n` +
        `E-Mail: ${formData.email || OHNE_ANGABE}\n` +
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

        // Nur gewählte Angaben gehen in die Übertragung (E4-W1): ungewählte Felder fehlen, der Server lässt sie weg.
        const gewaehlt = [umfang?.title, stufe?.title].filter(Boolean);
        const titelZusatz = gewaehlt.length > 0 ? ` (${gewaehlt.join(' · ')})` : '';

        try {
            const response = await fetch('/api/anfrage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inquiryType: 'bad',
                    projectType: 'bad',
                    projectTitle: `Badsanierung${titelZusatz}`,
                    contact: {
                        name: formData.name,
                        phone: formData.phone,
                        email: formData.email || undefined,
                        street: formData.street || undefined,
                        zipCity: formData.zipCity || undefined,
                        location: hatAdresse ? addressText : undefined
                    },
                    badDetails: {
                        scope: umfang?.id,
                        scopeLabel: umfang?.title,
                        tier: stufe?.id,
                        tierLabel: stufe?.title,
                        sqm: calculatedSqm || undefined,
                        length: formData.length || undefined,
                        width: formData.width || undefined,
                        persons: personen?.value,
                        personsLabel: personen?.label,
                        propertyType: objekt?.id,
                        propertyTypeLabel: objekt?.title,
                        features: formData.features,
                        featureLabels: featureLabels
                    },
                    timing: personen ? `Personen im Haushalt: ${personen.label}` : undefined,
                    area: calculatedSqm ? `${calculatedSqm} m² (${formData.length} x ${formData.width} m)` : undefined,
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
        flaecheText,
        objectTitle,
        scopeTitle,
        tierTitle,
        personsLabel,
        featureLabels,
        featureText,
        addressText,
        handleWhatsApp,
        handleOnlineSubmit,
        handleNewRequest,
        handleBackFromWhatsApp
    };
}
