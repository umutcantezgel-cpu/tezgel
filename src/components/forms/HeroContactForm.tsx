"use client";

// Direktanfrage im Einstieg der Startseite (E2-ORCH-08): Formular als Feld an der Fuge, Klassen aus kern/stile.ts.
// Logik, Nutzlast, IDs, Labels und Texte unverändert (Test funktion-hero-kontakt).

import React, { useState } from 'react';
import Icon from '@/components/icons/Icon';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen, feldKlassen, fehlerKlassen, labelKlassen, linkKlassen, pflichtKlassen, wahlKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import { buildWhatsAppUrl, openWhatsApp, isMobileDevice } from '@/lib/whatsapp';

const PROJECT_OPTIONS = [
    { id: 'bad', label: 'Badsanierung' },
    { id: 'fliesen', label: 'Fliesenverlegung' },
    { id: 'aussen', label: 'Balkon & Terrasse' },
    { id: 'reparatur', label: 'Reparatur & Fugen' }
];

export default function HeroContactForm() {
    const [projectType, setProjectType] = useState('bad');
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
    const projectTitle = selectedOption ? selectedOption.label : 'Fliesenarbeiten';

    const getWhatsAppText = () => {
        return (
            `Hallo Herr Tezgel,\n` +
            `ich interessiere mich für: ${projectTitle}.\n` +
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
                    projectType,
                    projectTitle,
                    contact: {
                        name: name.trim(),
                        phone: phone.trim(),
                        email: email.trim() || undefined,
                        location: location.trim() || 'Aßlar / Wetzlar / Hessen'
                    },
                    area: 'Wird vor Ort ermittelt',
                    timing: 'Schnellstmöglich',
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

    // ERFOLG
    if (status === 'success') {
        return (
            <div className="border border-strich bg-fliese p-6 lg:p-8" role="status">
                <div className="flex flex-wrap items-center gap-3">
                    <span className={etikettKlassen}>
                        <Icon name="haken" groesse={4} className="text-abnahme" />
                        Anfrage übermittelt
                    </span>
                    {referenceId && (
                        <span className="border border-fuge bg-kalk px-2 py-1 font-mono text-fs-1 text-tinte">
                            {referenceId}
                        </span>
                    )}
                </div>
                <p className="mt-6 font-anzeige text-fs-5 font-semibold text-tinte">
                    Vielen Dank, {name}!
                </p>
                <p className="mt-3 text-fs-2 text-tinte-2">
                    Ihre Anfrage für <strong className="font-semibold text-tinte">{projectTitle}</strong> ist direkt bei Herrn Deniz Tezgel eingegangen.
                </p>
                {email && (
                    <p className="mt-3 border-l-2 border-tinte pl-4 text-fs-2 text-tinte">
                        Eine schriftliche Zusammenfassung wurde an <strong className="font-semibold">{email}</strong> gesendet.
                    </p>
                )}

                <div className="mt-6 border-t border-fuge pt-6">
                    <p className="flex items-center gap-2 text-fs-2 font-semibold text-tinte">
                        <Icon name="uhr" groesse={4} />
                        <span>Nächste Schritte:</span>
                    </p>
                    <p className="mt-2 text-fs-2 text-tinte-2">
                        Herr Tezgel prüft Ihre Angaben persönlich und ruft Sie innerhalb von <strong className="font-semibold text-tinte">24 Stunden</strong> unter {phone} an, um den Termin für das kostenfreie Aufmaß vor Ort abzustimmen.
                    </p>
                </div>

                <div className="mt-6">
                    <Knopf
                        variante="text"
                        onClick={() => {
                            setStatus('idle');
                            setName('');
                            setPhone('');
                            setEmail('');
                            setLocation('');
                            setNotes('');
                            setReferenceId('');
                        }}
                    >
                        Weitere Anfrage stellen
                    </Knopf>
                </div>
            </div>
        );
    }

    return (
        <div className="border border-strich bg-fliese p-6 text-left lg:p-8">
            {/* Kopf des Formulars: Schriftfeld-Zeile */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-fuge pb-4">
                <span className={etikettKlassen}>
                    <Fugenkreuz className="size-3 text-strich" />
                    Direktanfrage an Deniz Tezgel
                </span>
                <span className="flex items-center gap-2 font-mono text-fs-1 text-tinte">
                    <Icon name="uhr" groesse={4} />
                    Rückruf &lt; 24h
                </span>
            </div>
            <p className="mt-6 font-anzeige text-fs-5 font-semibold text-tinte">
                Kostenloses Aufmaß vor Ort anfragen
            </p>
            <p className="mt-2 text-fs-2 text-tinte-2">
                Beschreiben Sie Ihr Projekt in 30 Sekunden – Herr Tezgel meldet sich direkt persönlich bei Ihnen.
            </p>

            {/* Fehlermeldung */}
            {errorMessage && (
                <p className={fehlerKlassen} role="alert">
                    <Icon name="fehler" groesse={4} className="mt-1" />
                    <span>{errorMessage}</span>
                </p>
            )}

            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-6">
                {/* 1. Vorhaben-Auswahl */}
                <div role="group" aria-labelledby="hero-vorhaben">
                    <p id="hero-vorhaben" className={labelKlassen}>
                        1. Ihr Vorhaben wählen
                    </p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                        {PROJECT_OPTIONS.map((opt) => {
                            const isSelected = projectType === opt.id;
                            return (
                                <button
                                    key={opt.id}
                                    type="button"
                                    onClick={() => setProjectType(opt.id)}
                                    aria-pressed={isSelected}
                                    className={wahlKlassen}
                                    data-motion="zustand"
                                >
                                    {opt.label}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 2. Kontaktdaten */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
                    <div>
                        <label htmlFor="hero-name" className={labelKlassen}>
                            Name <span className={pflichtKlassen}>*</span>
                        </label>
                        <input
                            id="hero-name"
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            placeholder="Vor- und Nachname"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className={feldKlassen}
                        />
                    </div>

                    <div>
                        <label htmlFor="hero-phone" className={labelKlassen}>
                            Telefonnummer <span className={pflichtKlassen}>*</span>
                        </label>
                        <input
                            id="hero-phone"
                            name="phone"
                            type="tel"
                            required
                            autoComplete="tel"
                            placeholder="Für den Rückruf"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className={feldKlassen}
                        />
                    </div>
                </div>

                {/* 3. Ort & E-Mail */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-4">
                    <div>
                        <label htmlFor="hero-email" className={labelKlassen}>
                            E-Mail <span className="font-mono text-fs-1 font-normal text-tinte-2">(für Bestätigung)</span>
                        </label>
                        <input
                            id="hero-email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            placeholder="ihre.adresse@beispiel.de"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={feldKlassen}
                        />
                    </div>

                    <div>
                        <label htmlFor="hero-location" className={labelKlassen}>
                            Ort / PLZ
                        </label>
                        <input
                            id="hero-location"
                            name="location"
                            type="text"
                            autoComplete="address-level2"
                            placeholder="z. B. Aßlar, Wetzlar, Gießen"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className={feldKlassen}
                        />
                    </div>
                </div>

                {/* 4. Kurzbeschreibung */}
                <div>
                    <label htmlFor="hero-notes" className={labelKlassen}>
                        Projektnotiz (optional)
                    </label>
                    <input
                        id="hero-notes"
                        name="notes"
                        type="text"
                        autoComplete="off"
                        placeholder="z. B. ca. 15 m² Fliesen, Altbau, Walk-In Dusche"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        className={feldKlassen}
                    />
                </div>

                {/* Anti-spam honeypot (hidden from human visitors) */}
                <div className="hidden" aria-hidden="true">
                    <label htmlFor="website_url_hp">Bitte dieses Feld freilassen</label>
                    <input
                        id="website_url_hp"
                        type="text"
                        name="website_url_hp"
                        tabIndex={-1}
                        autoComplete="off"
                        value={honeypot}
                        onChange={(e) => setHoneypot(e.target.value)}
                    />
                </div>

                {/* Absenden */}
                <div className="flex flex-col gap-4">
                    <Knopf type="submit" laedt={status === 'submitting'} ladeText="Wird übertragen..." icon="pfeil-rechts" className="w-full">
                        Kostenfreies Aufmaß anfragen
                    </Knopf>

                    <div className="flex flex-wrap items-center justify-between gap-2 text-fs-2 text-tinte-2">
                        <span className="flex items-center gap-2">
                            <Fugenkreuz className="size-3 text-tinte" />
                            100 % unverbindlich
                        </span>
                        <a
                            href={getWhatsAppUrl()}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => {
                                if (isMobileDevice()) {
                                    e.preventDefault();
                                    openWhatsApp({ phone: COMPANY_DATA.contact.whatsappNumber, text: getWhatsAppText() });
                                }
                            }}
                            className={`${linkKlassen} inline-flex min-h-11 items-center gap-2 font-semibold`}
                        >
                            <Icon name="sprechblase" groesse={4} />
                            <span>Oder via WhatsApp</span>
                        </a>
                    </div>
                </div>
            </form>
        </div>
    );
}
