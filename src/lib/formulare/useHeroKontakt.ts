// Logik der Direktanfrage im Hero (F-01, HeroContactForm) – wörtlich aus der Komponente verschoben (P3-00l).
// Ohne Markup; Bestand und Kern-Ansicht nutzen denselben Hook.
import React, { useState } from 'react';
import { COMPANY_DATA } from '@/config/company';
import { buildWhatsAppUrl, openWhatsApp, isMobileDevice } from '@/lib/whatsapp';

export const PROJECT_OPTIONS = [
    { id: 'bad', label: 'Badsanierung' },
    { id: 'fliesen', label: 'Fliesenverlegung' },
    { id: 'aussen', label: 'Balkon & Terrasse' },
    { id: 'reparatur', label: 'Reparatur & Fugen' }
];

export function useHeroKontakt() {
    // Keine Vorauswahl beim Laden (E4-W1, F4): gewählt wird nur, was die Besucherin antippt.
    const [projectType, setProjectType] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [notes, setNotes] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [formInitTime] = useState<number>(() => Date.now());
    const [referenceId, setReferenceId] = useState('');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const selectedOption = PROJECT_OPTIONS.find((opt) => opt.id === projectType);
    // ohne Wahl kein Vorhaben: Erfolg und Nachricht nennen keins (Abnahme E4-W1, F4)
    const projectTitle = selectedOption ? selectedOption.label : '';

    const getWhatsAppText = () => {
        return (
            `Hallo Herr Tezgel,\n` +
            (selectedOption ? `ich interessiere mich für: ${projectTitle}.\n` : '') +
            (location ? `Ort / Region: ${location}\n` : '') +
            (name ? `Mein Name: ${name}\n` : '') +
            (phone ? `Telefon: ${phone}\n` : '') +
            (notes ? `Hinweise: ${notes}\n` : '') +
            `\nBitte melden Sie sich bezüglich eines kostenfreien Termins zum Aufmaß vor Ort. Vielen Dank!`
        );
    };

    const getWhatsAppUrl = () => {
        return buildWhatsAppUrl(COMPANY_DATA.contact.whatsappNumber, getWhatsAppText());
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrorMessage('');

        if (!name.trim() || !phone.trim()) {
            setErrorMessage('Bitte geben Sie Ihren Namen und Ihre Telefonnummer für den Rückruf an.');
            return;
        }

        setStatus('submitting');

        try {
            const res = await fetch('/api/anfrage', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inquiryType: 'general',
                    // ungewähltes Vorhaben fehlt in der Nutzlast (undefined entfällt beim Versand)
                    projectType: projectType || undefined,
                    projectTitle: selectedOption ? projectTitle : undefined,
                    contact: {
                        name: name.trim(),
                        phone: phone.trim(),
                        email: email.trim() || undefined,
                        location: location.trim() || undefined
                    },
                    // Fläche und Zeitraum fragt dieses Formular nicht ab; es schickt keine Werte, die niemand gewählt hat (Abnahme E4-W1)
                    notes: notes.trim() || undefined,
                    honeypot: honeypot || undefined,
                    _t: formInitTime
                })
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || 'Übertragung fehlgeschlagen.');
            }

            if (data.referenceId) {
                setReferenceId(data.referenceId);
            }

            setStatus('success');
        } catch (err: unknown) {
            console.error('Hero contact form error:', err);
            const msg = err instanceof Error ? err.message : 'Es gab ein Problem bei der Übertragung.';
            setErrorMessage(msg);
            setStatus('error');
        }
    };

    const handleNewRequest = () => {
        setStatus('idle');
        setName('');
        setPhone('');
        setEmail('');
        setLocation('');
        setNotes('');
        setReferenceId('');
    };

    const handleWhatsAppClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        if (isMobileDevice()) {
            e.preventDefault();
            openWhatsApp({ phone: COMPANY_DATA.contact.whatsappNumber, text: getWhatsAppText() });
        }
    };

    return {
        projectType,
        setProjectType,
        name,
        setName,
        phone,
        setPhone,
        email,
        setEmail,
        location,
        setLocation,
        notes,
        setNotes,
        honeypot,
        setHoneypot,
        referenceId,
        status,
        errorMessage,
        projectTitle,
        getWhatsAppUrl,
        handleSubmit,
        handleNewRequest,
        handleWhatsAppClick
    };
}
