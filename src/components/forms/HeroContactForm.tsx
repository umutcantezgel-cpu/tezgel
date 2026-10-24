"use client";

// Anfrage „Termin vor Ort anfragen“ (E2-ORCH-08, KERN v3 E-012): Formular als Feld an der Fuge, Klassen aus kern/stile.ts.
// Logik, Nutzlast, IDs, Labels, Pflichtfelder und Empfänger unverändert (G8, Test funktion-hero-kontakt). Texte nach den
// Schreibregeln (E2-ORCH-06): „Termin vor Ort“ statt „Aufmaß“, Knopf mit der Hauptaktion; die eigenen Zusagen des
// Formulars (Rückruf in 24 Stunden, unverbindlich) bleiben wörtlich (K-015, M-07). `titel={false}`: ohne eigene
// Überschrift, wenn der Abschnitt sie schon trägt (Startseite #termin).
// Zustände, Prüfung, Absenden und WhatsApp-Weg kommen aus useHeroKontakt (P3-00l, eine Logik für Bestand und Kern).

import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen, feldKlassen, fehlerKlassen, labelKlassen, linkKlassen, pflichtKlassen, wahlKlassen } from '@/components/kern/stile';
import { zusammen } from '@/components/kern/zusammen';
import { PROJECT_OPTIONS, useHeroKontakt } from '@/lib/formulare/useHeroKontakt';

export default function HeroContactForm({ titel = true }: { titel?: boolean } = {}) {
    const {
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
    } = useHeroKontakt();

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
                        Herr Tezgel prüft Ihre Angaben persönlich und ruft Sie innerhalb von <strong className="font-semibold text-tinte">24 Stunden</strong> unter {phone} an, um den kostenfreien Termin bei Ihnen vor Ort abzustimmen.
                    </p>
                </div>

                <div className="mt-6">
                    <Knopf
                        variante="text"
                        onClick={handleNewRequest}
                    >
                        Weitere Anfrage stellen
                    </Knopf>
                </div>
            </div>
        );
    }

    return (
        // Container-Abfrage: Bei großer Systemschrift (Rahmen schmaler als 20 rem) weniger Innenabstand in Rahmen und Feldern,
        // damit die Platzhalter lesbar bleiben (Sichtprüfung E2 Runde 3)
        <div className="@container">
        <div className="border border-strich bg-fliese p-3 text-left @xs:p-4 sm:p-6 lg:p-8">
            {/* Kopf des Formulars: Schriftfeld-Zeile; Zeichen im Textfluss, damit umbrechende Zeilen ohne hängenden Einzug
                unter dem Zeichen weiterlaufen */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-fuge pb-4">
                <span className="font-text text-fs-2 text-tinte-2">
                    <Fugenkreuz className="mr-2 inline-block size-3 text-strich" />
                    Anfrage direkt an Deniz Tezgel
                </span>
                {/* eigene Zusage des Formulars, sinngleich ausgeschrieben (K-015, M-07) */}
                <span className="font-text text-fs-2 text-tinte">
                    <Icon name="uhr" groesse={4} className="mr-2 align-text-bottom" />
                    Rückruf innerhalb von 24 Stunden
                </span>
            </div>
            {titel && (
                <>
                    <p className="mt-6 font-anzeige text-fs-5 font-semibold text-balance text-tinte">
                        {zusammen('Kostenfreien Termin vor Ort anfragen')}
                    </p>
                    <p className="mt-2 text-fs-2 text-tinte-2">
                        Sagen Sie uns kurz, worum es geht. Deniz Tezgel meldet sich persönlich bei Ihnen.
                    </p>
                </>
            )}

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
                    {/* zweispaltig nur, wenn der Platz in der Schriftgröße reicht (Containerabfrage in rem: bei 200 %
                        Systemschrift einspaltig, Sichtprüfung E2 Runde 2) */}
                    <div className="@container mt-2"><div className="grid grid-cols-1 gap-2 @3xs:grid-cols-2">
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
                    </div></div>
                </div>

                {/* 2. Kontaktdaten */}
                <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
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
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label htmlFor="hero-email" className={labelKlassen}>
                            E-Mail <span className="font-text text-fs-1 font-normal text-tinte-2">(für Bestätigung)</span>
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
                        placeholder="z. B. Dusche ohne Stufe"
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
                    <Knopf type="submit" laedt={status === 'submitting'} ladeText="Wird gesendet …" icon="pfeil-rechts" className="w-full">
                        {zusammen('Termin vor Ort anfragen')}
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
                            onClick={handleWhatsAppClick}
                            className={`${linkKlassen} inline-flex min-h-11 items-center gap-2 font-semibold`}
                        >
                            <WhatsAppLogo className="size-4 shrink-0" />
                            <span>Oder per WhatsApp</span>
                        </a>
                    </div>
                </div>
            </form>
        </div>
        </div>
    );
}
