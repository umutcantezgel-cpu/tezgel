// Logik der Terminanfrage auf /termin (F-08, Termin-Formular samt Umschalter Kalender/Formular und WhatsApp-Weg) –
// wörtlich aus `src/app/(bestand)/termin/page.jsx` verschoben (P4-05c, Vorbild P4-05a). Ohne Markup; Bestand und
// Kern-Ansicht nutzen denselben Hook. Keine Logikänderung (G9): auch die bekannten Lücken (kein Honeypot, kein `_t`,
// Name und Telefon ohne `trim`; intern I-18) bleiben, wie sie sind. Typangaben nur für den Typprüfer, Laufzeit unverändert.
import React, { useState } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { openWhatsApp } from '@/lib/whatsapp';

export const TOPICS = [
    { value: 'badsanierung', label: 'Badsanierung / Komplettbad aus einer Hand' },
    { value: 'barrierefrei', label: 'Barrierefreie Badmodernisierung (Pflegekassenzuschuss)' },
    { value: 'grossformate', label: 'Fliesen & fugenarme XXL-Großformate' },
    { value: 'wohnen', label: 'Wohnbereiche, Küche, Flure & Treppen' },
    { value: 'aussen', label: 'Balkon & Terrasse auf Stelzlagern' },
    { value: 'untergrund', label: 'Untergrund & DIN 18534 Verbundabdichtung' },
    { value: 'naturstein', label: 'Naturstein- und Granitverlegung' }
];

export const TIME_SLOTS = [
    { value: 'vormittags', label: 'Vormittags (08:00 – 12:00 Uhr)' },
    { value: 'nachmittags', label: 'Nachmittags (13:00 – 17:00 Uhr)' },
    { value: 'flexibel', label: 'Flexibel nach telefonischer Vereinbarung' }
];

export const labelOf = (list: Array<{ value: string; label: string }>, value: string) => list.find((item) => item.value === value)?.label ?? value;

export const formatDate = (isoDate: string) => {
    if (!isoDate) return 'nach Absprache';
    const [year, month, day] = isoDate.split('-');
    return `${day}.${month}.${year}`;
};

type BookingMode = 'calendar' | 'form';
type SentVia = 'whatsapp' | 'online' | null;

export function useTerminAnfrage() {
    const [bookingMode, setBookingMode] = useState<BookingMode>('calendar'); // 'calendar' | 'form'
    const [sentVia, setSentVia] = useState<SentVia>(null); // 'whatsapp' | 'online'
    const [referenceId, setReferenceId] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [formData, setFormData] = useState({
        topic: 'badsanierung',
        date: '',
        timeSlot: 'vormittags',
        name: '',
        phone: '',
        email: '',
        zipCity: '',
        notes: '',
        privacyConsent: false
    });

    // `as HTMLInputElement` nur für den Typprüfer (select/textarea haben kein `checked`); Laufzeit wie im Bestand.
    const update = (field: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const buildMessage = () =>
        `Hallo Herr Tezgel,\nich möchte einen Termin für eine Beratung / ein Vor-Ort-Aufmaß vereinbaren:\n\n` +
        `Thema: ${labelOf(TOPICS, formData.topic)}\n` +
        `Wunschdatum: ${formatDate(formData.date)}\n` +
        `Zeitfenster: ${labelOf(TIME_SLOTS, formData.timeSlot)}\n` +
        `Ort: ${formData.zipCity || 'Nicht angegeben'}\n\n` +
        `Name: ${formData.name}\n` +
        `Telefon: ${formData.phone}\n` +
        `E-Mail: ${formData.email || 'Nicht angegeben'}\n` +
        (formData.notes ? `Anmerkungen: ${formData.notes}\n\n` : '\n') +
        `Bitte bestätigen Sie mir den Termin oder schlagen Sie einen Alternativtermin vor. Vielen Dank!`;

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Typangaben nur für den Typprüfer (SubmitEvent.submitter, HTMLButtonElement.value); Laufzeit unverändert.
        const submitter = (e.nativeEvent as SubmitEvent | undefined)?.submitter;
        const channel = (submitter as HTMLButtonElement | null | undefined)?.value === 'whatsapp' ? 'whatsapp' : 'online';
        const message = buildMessage();

        if (channel === 'whatsapp') {
            openWhatsApp({
                phone: COMPANY_DATA.contact.whatsappNumber,
                text: message,
            });
            setSentVia('whatsapp');
            return;
        }

        // Online API Submission
        setIsSubmitting(true);
        setErrorMessage('');

        try {
            const topicLabel = labelOf(TOPICS, formData.topic);
            const timeSlotLabel = labelOf(TIME_SLOTS, formData.timeSlot);
            const formattedDate = formatDate(formData.date);

            const res = await fetch('/api/anfrage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inquiryType: 'termin',
                    projectType: 'termin',
                    projectTitle: `Termin: ${topicLabel}`,
                    contact: {
                        name: formData.name,
                        phone: formData.phone,
                        email: formData.email || undefined,
                        zipCity: formData.zipCity || undefined,
                        location: formData.zipCity || 'Aßlar / Wetzlar'
                    },
                    terminDetails: {
                        topic: formData.topic,
                        topicLabel,
                        date: formData.date,
                        formattedDate,
                        timeSlot: formData.timeSlot,
                        timeSlotLabel
                    },
                    timing: `${formattedDate} (${timeSlotLabel})`,
                    notes: formData.notes ? formData.notes.trim() : undefined
                })
            });

            const data = await res.json();
            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Übertragung fehlgeschlagen.');
            }

            if (data.referenceId) {
                setReferenceId(data.referenceId);
            }
            setSentVia('online');
        } catch (err) {
            console.error('Termin submission error:', err);
            // `as Error` nur für den Typprüfer (catch-Variable ist unknown); Laufzeit wie im Bestand `err.message`.
            setErrorMessage((err as Error).message || 'Verbindungsfehler beim Absenden.');
        } finally {
            setIsSubmitting(false);
        }
    };

    // Bisher inline am Knopf „Weiteren Termin anfragen“ (Erfolgsansicht online).
    const handleNewRequest = () => {
        setSentVia(null);
        setReferenceId('');
    };

    return {
        bookingMode,
        setBookingMode,
        sentVia,
        setSentVia,
        referenceId,
        isSubmitting,
        errorMessage,
        formData,
        update,
        handleSubmit,
        handleNewRequest
    };
}
