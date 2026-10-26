"use client";
// Termin (S-24 · E6-BAU-05, KERN v2): Arbeitsansicht nach dem Muster von (bestand)/kontakt und (bestand)/bad/badanfrage.
// Kompakter Einstieg (Kennzeile, H1 in text-fs-6, Vorspann), danach im ersten Bildschirm die Terminwahl: Umschalter
// Kalender/Formular, darunter der Terminkalender (BookingCalendar, unverändert eingebunden) bzw. das individuelle Formular;
// daneben ab xl die Rückfrage (Ansprechpartner und direkte Wege). Nach dem Absenden steht die Meldung (online bzw. WhatsApp)
// an derselben Stelle. Zum Schluss der Abschluss ohne Laserachse (Arbeitsansicht). Kein großer Moment, keine Auftritte.
// Client-Komponente bleibt: die Seite trägt den Zustand der Terminanfrage (useTerminAnfrage, Logik unverändert).
// Texte, Überschriften, Links, IDs, name/value der Absende-Knöpfe und die Lesefolge wie im Bestand.
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { COMPANY_DATA } from '@/config/company';
import { FinalCTA } from '@/components/ui/FinalCTA';
import BookingCalendar from '@/components/contact/BookingCalendar';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Knopf from '@/components/kern/Knopf';
import Rueckfrage from '@/components/kern/Rueckfrage';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import { etikettKlassen, feldKlassen, knopfKlassen, kontrollKlassen, labelKlassen, linkKlassen, pflichtKlassen } from '@/components/kern/stile';
import { useTerminAnfrage, TOPICS, TIME_SLOTS, labelOf, formatDate } from '@/lib/formulare/useTerminAnfrage';

// Feld der Terminwahl: wie der Terminkalender (Strich-Rahmen auf Fliese), damit Kalender, Formular und Meldung gleich stehen
const FELD = 'border border-strich bg-fliese p-6 sm:p-8 lg:p-12';
// Umschalter Kalender/Formular: Auswahlknöpfe mit aria-pressed (gewählt: Tinte-Fläche); mobil nebeneinander, das Zeichen
// entfällt dort, damit „Schnellauswahl“ ohne Trennung in die halbe Breite passt
const UMSCHALTER =
    'inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-none border border-strich bg-fliese px-4 py-3 text-center font-text text-fs-2 font-semibold text-tinte hover:border-tinte aria-pressed:border-tinte aria-pressed:bg-tinte aria-pressed:text-kalk';
// Auswahl mit eigenem Winkel (Kern-Icon statt Browserpfeil); top-2 gleicht den Abstand mt-2 des Felds aus
const AUSWAHL = clsx(feldKlassen, 'appearance-none pr-12');
const AUSWAHL_WINKEL = 'pointer-events-none absolute top-2 right-4 bottom-0 flex items-center text-tinte';

export default function TerminPage() {
    const {
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
    } = useTerminAnfrage();

    // Fokus (WCAG 2.4.3): nach dem Absenden auf die Meldung, nach „Weiteren Termin anfragen“ bzw. „Anfrage bearbeiten“ auf
    // den gewählten Umschalter – sonst fiele er mit dem ersetzten Knopf an den Seitenanfang. Beim ersten Rendern nichts.
    const meldungRef = useRef(null);
    const umschalterRef = useRef(null);
    const vorherRef = useRef(sentVia);
    useEffect(() => {
        if (vorherRef.current === sentVia) return;
        vorherRef.current = sentVia;
        if (sentVia) meldungRef.current?.focus();
        else umschalterRef.current?.querySelector('[aria-pressed="true"]')?.focus();
    }, [sentVia]);

    const anrufen = (
        <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} iconLinks="telefon" className="w-full sm:w-auto">
            Direkt anrufen: <span className="whitespace-nowrap font-mono">{COMPANY_DATA.contact.phone}</span>
        </Knopf>
    );

    return (
        <>
            {/* 1. EINSTIEG: Kennzeile (vormals Badge), H1, Vorspann */}
            <Einstieg
                art="arbeit"
                etikett={
                    <>
                        <Icon name="kalender" groesse={4} />
                        Direkte Fachberatung
                    </>
                }
                titel={<>Termin vereinbaren bei Fliesenleger Tezgel</>}
                vorspann={
                    <p>
                        Jetzt Ihren Vor-Ort-Termin vereinbaren: Wählen Sie Ihr Wunschthema für eine persönliche Fachberatung durch Fliesenleger Tezgel in {COMPANY_DATA.headquarters.city}, Wetzlar &amp; Umgebung. Ihre Anfrage senden Sie direkt online mit E-Mail-Bestätigung oder per WhatsApp an {COMPANY_DATA.owner.fullName}.
                    </p>
                }
            />

            {/* 2. TERMINWAHL im ersten Bildschirm: Umschalter, Kalender bzw. Formular bzw. Meldung; ab xl 8 + 4 Spalten mit der
                Rückfrage daneben (darunter in voller Breite, damit Uhrzeiten und Formularfelder nicht eng werden) */}
            <Abschnitt art="arbeit">
                <div className="grid gap-y-12 xl:grid-cols-12 xl:gap-x-12">
                    <div className="min-w-0 xl:col-span-8">
                        {sentVia === 'online' ? (
                            <div ref={meldungRef} tabIndex={-1} className={FELD} role="status">
                                <div className="flex flex-wrap items-center gap-3">
                                    <span className={etikettKlassen}>
                                        <span className="inline-flex text-abnahme" data-motion="notiert">
                                            <Icon name="haken" groesse={4} />
                                        </span>
                                        Terminanfrage erfolgreich übermittelt
                                    </span>
                                    {referenceId && (
                                        <span className="border border-fuge bg-kalk px-2 py-1 font-mono text-fs-1 text-tinte">
                                            Vorgangsnummer: {referenceId}
                                        </span>
                                    )}
                                </div>
                                <h2 className="mt-6 text-fs-5 text-tinte">
                                    Vielen Dank, {formData.name}!
                                </h2>
                                <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">
                                    Ihre Terminanfrage für <strong className="font-semibold text-tinte">{labelOf(TOPICS, formData.topic)}</strong> am <strong className="font-semibold text-tinte">{formatDate(formData.date)}</strong> ({labelOf(TIME_SLOTS, formData.timeSlot)}) ist erfolgreich eingegangen.
                                    {formData.email && (
                                        <span className="mt-3 flex items-start gap-2 border-l-2 border-tinte pl-4 text-fs-2 text-tinte">
                                            <Icon name="mail" groesse={4} className="mt-1" />
                                            <span className="min-w-0">
                                                Eine Bestätigung mit allen Termindaten wurde an <em className="wrap-break-word">{formData.email}</em> gesendet.
                                            </span>
                                        </span>
                                    )}
                                </p>

                                <div className="mt-8 border-t border-fuge pt-6 text-fs-2 text-tinte-2">
                                    <div className="flex items-center gap-2 font-semibold text-tinte">
                                        <Fugenkreuz className="size-3 text-strich" />
                                        Nächste Schritte:
                                    </div>
                                    <p className="mt-2">
                                        1. Inhaber Deniz Tezgel gleicht Ihren Wunschtermin mit dem aktuellen Einsatzplan ab.<br />
                                        2. Wir bestätigen Ihnen das Zeitfenster telefonisch unter <strong className="font-mono font-normal text-tinte">{formData.phone}</strong>.<br />
                                        3. Pünktlicher Termin bei Ihnen vor Ort für das kostenfreie Aufmaß und die persönliche Beratung.
                                    </p>
                                </div>

                                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                                    {anrufen}
                                    <Knopf variante="neben" onClick={handleNewRequest} className="w-full sm:w-auto">
                                        Weiteren Termin anfragen
                                    </Knopf>
                                </div>
                            </div>
                        ) : sentVia === 'whatsapp' ? (
                            <div ref={meldungRef} tabIndex={-1} className={FELD} role="status">
                                <span className={etikettKlassen}>
                                    <WhatsAppLogo className="size-4 shrink-0" />
                                    WhatsApp wurde geöffnet
                                </span>
                                <h2 className="mt-6 text-fs-5 text-tinte">
                                    Fast geschafft – bitte jetzt absenden
                                </h2>
                                <p className="mt-4 max-w-mass text-fs-3 text-tinte-2">
                                    Vielen Dank, {formData.name}. Ihre Terminanfrage (<span className="font-mono">{formatDate(formData.date)}</span> &middot; {labelOf(TIME_SLOTS, formData.timeSlot)}) ist vorbereitet. Senden Sie die Nachricht in WhatsApp ab – {COMPANY_DATA.owner.fullName} meldet sich dann persönlich bei Ihnen, um den Termin abzustimmen.
                                </p>
                                <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                                    {anrufen}
                                    <Knopf variante="neben" onClick={() => setSentVia(null)} className="w-full sm:w-auto">
                                        Anfrage bearbeiten
                                    </Knopf>
                                </div>
                            </div>
                        ) : (
                            <div>
                                {/* Umschalter Kalender / Formular */}
                                <div ref={umschalterRef} className="grid grid-cols-2 gap-2 sm:max-w-mass">
                                    <button
                                        type="button"
                                        aria-pressed={bookingMode === 'calendar'}
                                        onClick={() => setBookingMode('calendar')}
                                        className={UMSCHALTER}
                                        data-motion="zustand"
                                    >
                                        <Icon name="kalender" groesse={5} className="max-sm:hidden" />
                                        <span>2-Schritt Schnellauswahl</span>
                                    </button>
                                    <button
                                        type="button"
                                        aria-pressed={bookingMode === 'form'}
                                        onClick={() => setBookingMode('form')}
                                        className={UMSCHALTER}
                                        data-motion="zustand"
                                    >
                                        <Icon name="dokument" groesse={5} className="max-sm:hidden" />
                                        <span>Individuelles Formular</span>
                                    </button>
                                </div>

                                <div className="mt-6">
                                    {bookingMode === 'calendar' ? (
                                        <BookingCalendar initialServiceType="Kostenfreies Vor-Ort-Aufmaß & Beratung" />
                                    ) : (
                                        <form onSubmit={handleSubmit} className={clsx(FELD, 'flex flex-col gap-6')}>
                                            <div>
                                                <label htmlFor="termin-topic" className={labelKlassen}>
                                                    1. Welches Thema möchten Sie besprechen?<span className={pflichtKlassen}>{'\u00a0'}*</span>
                                                </label>
                                                <div className="relative">
                                                    <select
                                                        id="termin-topic"
                                                        required
                                                        value={formData.topic}
                                                        onChange={update('topic')}
                                                        className={AUSWAHL}
                                                        data-motion="zustand"
                                                    >
                                                        {TOPICS.map((topic) => (
                                                            <option key={topic.value} value={topic.value}>{topic.label}</option>
                                                        ))}
                                                    </select>
                                                    <span className={AUSWAHL_WINKEL}>
                                                        <Icon name="winkel-unten" groesse={5} />
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Datum schmal, Zeitfenster breit: „Flexibel nach telefonischer Vereinbarung“ passt ganz in die Auswahl */}
                                            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
                                                <div>
                                                    <label htmlFor="termin-date" className={labelKlassen}>
                                                        2. Wunschdatum
                                                    </label>
                                                    <input
                                                        id="termin-date"
                                                        type="date"
                                                        value={formData.date}
                                                        onChange={update('date')}
                                                        className={feldKlassen}
                                                        data-motion="zustand"
                                                    />
                                                </div>
                                                <div className="md:col-span-2">
                                                    <label htmlFor="termin-slot" className={labelKlassen}>
                                                        Bevorzugtes Zeitfenster
                                                    </label>
                                                    <div className="relative">
                                                        <select
                                                            id="termin-slot"
                                                            value={formData.timeSlot}
                                                            onChange={update('timeSlot')}
                                                            className={AUSWAHL}
                                                            data-motion="zustand"
                                                        >
                                                            {TIME_SLOTS.map((slot) => (
                                                                <option key={slot.value} value={slot.value}>{slot.label}</option>
                                                            ))}
                                                        </select>
                                                        <span className={AUSWAHL_WINKEL}>
                                                            <Icon name="winkel-unten" groesse={5} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 gap-6 border-t border-fuge pt-6 md:grid-cols-2 md:gap-4">
                                                <div>
                                                    <label htmlFor="termin-name" className={labelKlassen}>
                                                        Name, Vorname<span className={pflichtKlassen}>{'\u00a0'}*</span>
                                                    </label>
                                                    <input
                                                        id="termin-name"
                                                        type="text"
                                                        required
                                                        autoComplete="name"
                                                        placeholder="Max Mustermann"
                                                        value={formData.name}
                                                        onChange={update('name')}
                                                        className={feldKlassen}
                                                        data-motion="zustand"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="termin-phone" className={labelKlassen}>
                                                        Telefonnummer<span className={pflichtKlassen}>{'\u00a0'}*</span>
                                                    </label>
                                                    <input
                                                        id="termin-phone"
                                                        type="tel"
                                                        required
                                                        minLength={6}
                                                        autoComplete="tel"
                                                        placeholder="Für die Rücksprache zum Termin"
                                                        value={formData.phone}
                                                        onChange={update('phone')}
                                                        className={feldKlassen}
                                                        data-motion="zustand"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="termin-email" className={labelKlassen}>
                                                        E-Mail-Adresse <span className="font-normal text-tinte-2">(optional)</span>
                                                    </label>
                                                    <input
                                                        id="termin-email"
                                                        type="email"
                                                        autoComplete="email"
                                                        placeholder="ihre-adresse@beispiel.de"
                                                        value={formData.email}
                                                        onChange={update('email')}
                                                        className={feldKlassen}
                                                        data-motion="zustand"
                                                    />
                                                </div>
                                                <div>
                                                    <label htmlFor="termin-zip" className={labelKlassen}>
                                                        PLZ &amp; Ort
                                                    </label>
                                                    <input
                                                        id="termin-zip"
                                                        type="text"
                                                        autoComplete="postal-code"
                                                        placeholder="z. B. 35614 Aßlar"
                                                        value={formData.zipCity}
                                                        onChange={update('zipCity')}
                                                        className={feldKlassen}
                                                        data-motion="zustand"
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label htmlFor="termin-notes" className={labelKlassen}>
                                                    Ihre Notizen / Anliegen
                                                </label>
                                                <textarea
                                                    id="termin-notes"
                                                    rows={3}
                                                    placeholder="z. B. Bad-Grundriss vorhanden, bodengleiche Dusche gewünscht, Fliesenformat ca. 60 x 120 cm …"
                                                    value={formData.notes}
                                                    onChange={update('notes')}
                                                    className={clsx(feldKlassen, 'resize-none')}
                                                    data-motion="zustand"
                                                />
                                            </div>

                                            <div>
                                                <label className="flex cursor-pointer items-start gap-3 text-fs-2 text-tinte-2">
                                                    <input
                                                        type="checkbox"
                                                        required
                                                        checked={formData.privacyConsent}
                                                        onChange={update('privacyConsent')}
                                                        className={clsx(kontrollKlassen, 'cursor-pointer')}
                                                    />
                                                    <span>
                                                        Ich stimme zu, dass meine Angaben zur Bearbeitung der Terminanfrage gemäß der{' '}
                                                        <Link href="/datenschutz" target="_blank" className={linkKlassen}>
                                                            Datenschutzerklärung
                                                        </Link>{' '}
                                                        verarbeitet werden. Beim Versand per WhatsApp gelten zusätzlich die Datenschutzbestimmungen von WhatsApp.
                                                    </span>
                                                </label>
                                            </div>

                                            {/* Fehler: Versatz-Zeichen + Text, role="alert" (wie im Terminkalender) */}
                                            {errorMessage && (
                                                <p className="flex items-start gap-2 border-l-2 border-laser bg-kalk p-3 text-fs-2 text-laser-tief" role="alert">
                                                    <Icon name="fehler" groesse={4} className="mt-1 shrink-0" />
                                                    <span>{errorMessage}</span>
                                                </p>
                                            )}

                                            {/* Absenden: online (Hauptknopf) oder per WhatsApp; beide Knöpfe in voller Breite wie im Terminkalender.
                                                name/value bleiben: der Hook liest den auslösenden Knopf. */}
                                            <div className="flex flex-col gap-3 border-t border-fuge pt-6">
                                                <button
                                                    type="submit"
                                                    name="channel"
                                                    value="online"
                                                    disabled={isSubmitting}
                                                    aria-busy={isSubmitting || undefined}
                                                    className={knopfKlassen('haupt', 'w-full')}
                                                    data-motion="druck"
                                                >
                                                    {isSubmitting ? (
                                                        <span className="flex flex-col items-center gap-2">
                                                            <span>Wird übertragen …</span>
                                                            <span className="laden-fuge w-16" data-motion="laden" aria-hidden="true" />
                                                        </span>
                                                    ) : (
                                                        <>
                                                            <span>Termin online anfragen (mit E-Mail-Bestätigung)</span>
                                                            <Icon name="pfeil-rechts" groesse={5} />
                                                        </>
                                                    )}
                                                </button>
                                                <button
                                                    type="submit"
                                                    name="channel"
                                                    value="whatsapp"
                                                    disabled={isSubmitting}
                                                    className={knopfKlassen('neben', 'w-full')}
                                                    data-motion="druck"
                                                >
                                                    <WhatsAppLogo className="size-5 shrink-0" />
                                                    <span>Per WhatsApp senden</span>
                                                </button>
                                                <p className="mt-1 flex items-start gap-2 text-fs-2 text-tinte-2">
                                                    <Icon name="schloss" groesse={4} className="mt-1" />
                                                    <span>
                                                        Bei Online-Absendung erhalten Sie unmittelbar eine schriftliche Bestätigung per E-Mail. Bei WhatsApp öffnet sich WhatsApp mit Ihren vorbereiteten Angaben. Der Termin gilt nach persönlicher Abstimmung als fest vereinbart.
                                                    </span>
                                                </p>
                                            </div>
                                        </form>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="xl:col-span-4">
                        <Rueckfrage />
                    </div>
                </div>
            </Abschnitt>

            {/* 3. ABSCHLUSS: unverändert eingebunden, ohne Laserachse (Arbeitsansicht wie /kontakt) */}
            <FinalCTA achse={false} />
        </>
    );
}
