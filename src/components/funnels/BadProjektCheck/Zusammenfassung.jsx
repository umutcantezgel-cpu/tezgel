import { useEffect, useRef } from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Hinweis from '@/components/kern/Hinweis';
import Knopf from '@/components/kern/Knopf';
import PflichtHinweis from '@/components/kern/PflichtHinweis';
import Rufnummer from '@/components/kern/Rufnummer';
import { etikettKlassen, knopfKlassen, labelKlassen, linkKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import { anzeige } from '@/lib/formulare/anzeige';
import { NBSP, inputClass, pflichtClass } from './stile';

// Badgröße über beide Spalten (der Messwert, in Mono), Umfang und Ausstattung nebeneinander, Wünsche über beide Spalten.
const BREIT = { Badgröße: '@sm:col-span-2', Wünsche: '@sm:col-span-2' };

// Zahl und Einheit zusammenhalten („Kompaktbad 8,2 m²“ aus dem Hook): nur die Anzeige, Wortlaut gleich.
const mitEinheit = (text) => text.replace(/ m²/g, `${NBSP}m²`);

// Zusammenfassung, Musterbad, Zuschuss und Anfrage (Formular, Erfolg, Fehler) (E-011: aus BadProjektCheck.jsx verschoben).
// Darstellung KERN v2 (Q-02): Spalte auf Kalk an der Fuge; Zusammenfassung als Schriftfeld (Mono-Etikett über dem Wert,
// Felder an 1-px-Fugen), Zuschuss als Hinweis, Knöpfe aus knopfKlassen/Knopf (ein Hauptknopf je Zustand), sichtbare
// Beschriftungen über den Feldern (bisher nur für Screenreader, Wortlaut gleich), Erfolg mit Haken. Props, Handler, IDs,
// name/value der Absende-Knöpfe, Texte und aria-live unverändert.
// F-05 (Fusion II, E-039; Grundgerüst B, Übernahmen aus A nach Gutachten u5):
// - sichtbares Pflichtsternchen hinter „Ihr Name“ und „Ihre Telefonnummer“ (aria-hidden, Tinte-2; der Name bleibt das Label)
// - Serverfehler als Hinweis art="fehler" (Rahmen laser-tief, Versatz-Zeichen, Text, role="alert", Vorsatz „Fehler:“ nur für
//   Screenreader) über den Feldern
// - Vorsätze nur für Screenreader: „Erledigt:“ (Erfolg), „Hinweis:“ (WhatsApp, Musterbad, Pflegekasse); Erfolgsbox mit
//   Rahmen in Abnahme (nur Linie)
// - Fokus nach Zustandswechsel: „Angebot … anfordern“ und beide Rückwege → erstes Feld; Erfolg und WhatsApp → Statusbox;
//   Serverfehler → Fehlermeldung (tabIndex -1). Bisher fiel der Fokus auf body (auslösender Knopf entfernt bzw. gesperrt).
// - geschütztes Leerzeichen vor „m²“ und in „DIN 18040-2“
// E4-W1 (F2, E-065): ohne Vorauswahl. Ungewählte Angaben stehen als „noch keine Angabe“; das passende Musterbad erscheint erst
// mit der gewählten Größe, davor steht ein Satz, was fehlt. Schmal weniger Innenabstand; Knopftexte stehen nicht mehr Wort für
// Wort untereinander (der Pfeil oder das Symbol steht dann darüber).
export default function Zusammenfassung({ sqmLabel, sqmGewaehlt, scopeLabel, tierLabel, extras, matchingBath, contactOpen, setContactOpen, sentVia, setSentVia, referenceId, handleNewRequest, leadData, setLeadData, isSubmitting, errorMessage, handleLeadSubmit }) {
    const nameRef = useRef(null);
    const statusRef = useRef(null);
    const fehlerRef = useRef(null);
    const vorher = useRef({ contactOpen, sentVia, errorMessage });

    // Fokusführung nur bei einem Wechsel, nie beim ersten Zeichnen
    useEffect(() => {
        const alt = vorher.current;
        vorher.current = { contactOpen, sentVia, errorMessage };
        if (sentVia && sentVia !== alt.sentVia) statusRef.current?.focus();
        else if (errorMessage && errorMessage !== alt.errorMessage) fehlerRef.current?.focus();
        else if (contactOpen && !sentVia && (!alt.contactOpen || alt.sentVia)) nameRef.current?.focus();
    }, [contactOpen, sentVia, errorMessage]);

    // Werte der Zusammenfassung: null heißt ungewählt (dann „noch keine Angabe“)
    const werte = [
        ['Badgröße', sqmGewaehlt ? `ca. ${sqmLabel}${NBSP}m²` : null],
        ['Umfang', scopeLabel],
        ['Ausstattung', tierLabel],
        ['Wünsche', extras.length > 0 ? extras.map(anzeige).join(', ') : null]
    ];

    return (
        <div className="@container flex min-w-0 flex-col justify-between gap-8 border-t border-fuge bg-kalk p-6 @lg:p-8 @5xl:col-span-5 @5xl:border-l @5xl:border-t-0 @5xl:p-12 @max-3xs/projekt:p-4">
            <div className="flex flex-col gap-6">
                <span className={`${etikettKlassen} min-w-0 hyphens-auto wrap-break-word`}>
                    <Fugenkreuz className="size-3 shrink-0 text-strich" />
                    Ihre Zusammenfassung
                </span>

                <dl aria-live="polite" className="grid grid-cols-1 gap-px border border-fuge bg-fuge @sm:grid-cols-2">
                    {werte.map(([term, value]) => {
                        const leer = value === null;
                        return (
                            <div key={term} className={clsx('min-w-0 bg-fliese p-4 @max-3xs:p-3', BREIT[term])}>
                                <dt className="font-mono text-fs-1 text-tinte-2 hyphens-auto">{term}</dt>
                                <dd
                                    className={clsx(
                                        'mt-1 break-words',
                                        leer ? 'text-fs-2 text-tinte-2' : clsx('text-tinte', term === 'Badgröße' ? 'font-mono text-fs-3' : 'text-fs-2 font-semibold')
                                    )}
                                >
                                    {leer ? 'noch keine Angabe' : value}
                                </dd>
                            </div>
                        );
                    })}
                </dl>
                <p className="text-fs-2 text-tinte-2">
                    Jedes Bad ist anders. Der Aufwand hängt davon ab, was unter den Fliesen liegt, wo die Leitungen verlaufen und welches Material Sie wählen. Den
                    verbindlichen Festpreis erhalten Sie deshalb nach dem kostenfreien Termin bei Ihnen vor Ort.
                </p>

                {/* Verweis auf das passende Musterbad; das passende erscheint erst mit der gewählten Größe */}
                <div className="border border-fuge bg-fliese p-4 text-fs-2 text-tinte">
                    <p className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 font-semibold">
                        <span className="hyphens-auto wrap-break-word">
                            <span className="sr-only">Hinweis: </span>
                            Musterbäder zum Vergleich:
                        </span>
                        {/* Pfeil am letzten Wort: bricht der Link bei großer Schrift um, steht er nicht allein am Rand (Runde 4) */}
                        <Link href="/bad/musterbaeder" className={`${linkKlassen} inline-block min-h-11 py-2`}>
                            Alle{' '}
                            <span className="whitespace-nowrap">
                                ansehen
                                <Icon name="pfeil-rechts" groesse={4} className="ml-1 inline-block align-text-bottom" />
                            </span>
                        </Link>
                    </p>
                    {matchingBath ? (
                        <p className="text-tinte-2 hyphens-auto wrap-break-word">
                            Passend:{' '}
                            <Link href={`/bad/musterbaeder/${matchingBath.slug}`} className={`${linkKlassen} font-semibold`}>
                                {mitEinheit(matchingBath.label)}
                            </Link>
                        </p>
                    ) : (
                        <p className="text-tinte-2 hyphens-auto wrap-break-word">Für das passende Musterbad fehlt noch die Größe des Bads.</p>
                    )}
                </div>

                {/* Zuschuss-Hinweis. Bei großer Systemschrift steht das Symbol über dem Text (Zeile umbrechen, Innenabstand kleiner),
                    lange Wörter brechen in der Spalte um; „DIN 18040-2“ bleibt in einer Zeile */}
                <Hinweis
                    className="wrap-break-word @max-3xs:flex-wrap @max-3xs:gap-2 @max-3xs:p-3"
                    titel={<><span className="sr-only">Hinweis: </span>Bis zu 4.180 € Zuschuss der Pflegekasse</>}
                >
                    Bei Pflegegrad für barrierefreie Bäder nach <span className="whitespace-nowrap font-mono">DIN{NBSP}18040-2</span>.{' '}
                    <Link href="/bad/barrierefreies-bad" className={linkKlassen}>
                        Details zum barrierefreien Bad und zu Zuschüssen
                    </Link>
                </Hinweis>
            </div>

            {/* Anfrage */}
            <div className="flex flex-col gap-3 border-t border-fuge pt-6">
                {!contactOpen ? (
                    <Knopf
                        onClick={() => setContactOpen(true)}
                        icon="pfeil-rechts"
                        className="w-full"
                    >
                        Angebot mit Festpreis anfordern
                    </Knopf>
                ) : sentVia === 'online' ? (
                    <div ref={statusRef} tabIndex={-1} className="border border-l-2 border-abnahme bg-fliese p-6 text-fs-2 text-tinte-2" role="status">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="flex items-center gap-2 text-fs-3 font-semibold text-tinte">
                                <span className="inline-flex text-abnahme" data-motion="notiert">
                                    <Icon name="haken" groesse={5} />
                                </span>
                                <span className="sr-only">Erledigt: </span>
                                Projektcheck übermittelt
                            </p>
                            {referenceId && (
                                <span className="border border-fuge bg-kalk px-2 py-1 font-mono text-fs-1 text-tinte">
                                    {referenceId}
                                </span>
                            )}
                        </div>
                        <p className="mt-4">
                            Vielen Dank, <strong className="font-semibold text-tinte">{leadData.name}</strong>! Ihre Angaben{sqmGewaehlt && (
                                <> für ca. <span className="whitespace-nowrap font-mono text-tinte">{sqmLabel}{NBSP}m²</span></>
                            )}{scopeLabel && <> ({scopeLabel})</>} sind direkt bei Herrn Deniz Tezgel eingegangen.
                            {leadData.email && (
                                <span className="mt-3 flex items-start gap-2 border-l-2 border-tinte pl-4 text-tinte">
                                    <Icon name="mail" groesse={4} className="mt-1" />
                                    <span className="min-w-0 break-words">
                                        Eine Bestätigung wurde an <em>{leadData.email}</em> gesendet.
                                    </span>
                                </span>
                            )}
                        </p>
                        <div className="mt-4 border-t border-fuge pt-4">
                            <strong className="flex items-center gap-2 font-semibold text-tinte">
                                <Icon name="uhr" groesse={4} />
                                Nächste Schritte:
                            </strong>
                            <p className="mt-2">1. Herr Tezgel prüft Ihre Angaben und welches Material Sie brauchen.</p>
                            <p className="mt-1">2. Rückruf binnen 24 bis 48 Stunden, um den Termin bei Ihnen vor Ort abzustimmen.</p>
                        </div>
                        <div className="mt-4">
                            <Knopf variante="text" onClick={handleNewRequest}>
                                Erneut anfragen oder anpassen
                            </Knopf>
                        </div>
                    </div>
                ) : sentVia === 'whatsapp' ? (
                    <div ref={statusRef} tabIndex={-1} className="border border-strich bg-fliese p-6 text-fs-2 text-tinte-2" role="status">
                        <p className="flex items-center gap-2 text-fs-3 font-semibold text-tinte">
                            <Icon name="sprechblase" groesse={5} />
                            <span className="sr-only">Hinweis: </span>
                            WhatsApp wurde geöffnet
                        </p>
                        <p className="mt-3">
                            Bitte senden Sie die vorbereitete Nachricht mit Ihren Angaben dort ab. Erst dann erreicht sie uns.
                        </p>
                        <div className="mt-4">
                            <Knopf variante="text" onClick={() => setSentVia(null)}>
                                Noch einmal senden oder anders anfragen
                            </Knopf>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                        {errorMessage && (
                            <div ref={fehlerRef} tabIndex={-1}>
                                <Hinweis art="fehler" rolle="alert">
                                    {errorMessage}
                                </Hinweis>
                            </div>
                        )}

                        <PflichtHinweis />
                        <div>
                            <div className="flex flex-wrap items-baseline">
                                <label htmlFor="budget-lead-name" className={`${labelKlassen} min-w-0 wrap-break-word`}>Ihr Name</label>
                                <span aria-hidden="true" className={pflichtClass}>*</span>
                            </div>
                            <input
                                ref={nameRef}
                                id="budget-lead-name"
                                type="text"
                                required
                                autoComplete="name"
                                placeholder="Ihr Name *"
                                value={leadData.name}
                                onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <div className="flex flex-wrap items-baseline">
                                <label htmlFor="budget-lead-phone" className={`${labelKlassen} min-w-0 wrap-break-word`}>Ihre Telefonnummer</label>
                                <span aria-hidden="true" className={pflichtClass}>*</span>
                            </div>
                            <input
                                id="budget-lead-phone"
                                type="tel"
                                required
                                minLength={6}
                                autoComplete="tel"
                                placeholder="Ihre Telefonnummer *"
                                value={leadData.phone}
                                onChange={(e) => setLeadData({ ...leadData, phone: e.target.value })}
                                className={inputClass}
                            />
                        </div>
                        <div>
                            <label htmlFor="budget-lead-email" className={labelKlassen}>Ihre E-Mail-Adresse (optional)</label>
                            <input
                                id="budget-lead-email"
                                type="email"
                                autoComplete="email"
                                placeholder="ihre-adresse@beispiel.de"
                                value={leadData.email}
                                onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
                                className={inputClass}
                            />
                        </div>

                        <div className="flex flex-col gap-3 pt-2">
                            <button
                                type="submit"
                                name="channel"
                                value="online"
                                disabled={isSubmitting}
                                aria-busy={isSubmitting || undefined}
                                className={knopfKlassen('haupt', 'w-full @max-3xs:flex-col-reverse')}
                                data-motion="druck"
                            >
                                {isSubmitting ? (
                                    <span className="flex flex-col items-center gap-2">
                                        <span>Wird gesendet …</span>
                                        <span className="laden-fuge w-16" data-motion="laden" aria-hidden="true" />
                                    </span>
                                ) : (
                                    <>
                                        <span>Online anfragen (mit E-Mail-Bestätigung)</span>
                                        <Icon name="pfeil-rechts" groesse={5} />
                                    </>
                                )}
                            </button>
                            <button
                                type="submit"
                                name="channel"
                                value="whatsapp"
                                disabled={isSubmitting}
                                className={knopfKlassen('neben', 'w-full @max-3xs:flex-col')}
                                data-motion="druck"
                            >
                                <WhatsAppLogo className="size-5 shrink-0" />
                                <span>Anfrage per WhatsApp senden</span>
                            </button>
                        </div>
                        <p className="flex items-start gap-2 text-fs-1 text-tinte-2">
                            <Icon name="schloss" groesse={4} className="mt-px" />
                            <span>
                                Ihre Angaben werden nur zur Bearbeitung Ihrer Anfrage verwendet.{' '}
                                <Link href="/datenschutz" className={linkKlassen}>
                                    Datenschutz
                                </Link>
                            </span>
                        </p>
                    </form>
                )}

                <Knopf
                    href={`tel:${COMPANY_DATA.contact.phoneLink}`}
                    variante="neben"
                    iconLinks="telefon"
                    className="w-full text-center @max-2xs:flex-wrap"
                >
                    {/* Nummer im Baustein Rufnummer: bricht nur nach dem Schrägstrich um, bei großer Systemschrift in zwei Zeilen;
                        dort steht das Symbol über dem Text (flex-wrap, Spalte unter 18 rem wie beim Baustein) */}
                    Anrufen: <Rufnummer className="font-normal" />
                </Knopf>
            </div>
        </div>
    );
}
