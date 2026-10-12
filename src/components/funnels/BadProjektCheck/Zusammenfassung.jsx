import Link from 'next/link';
import clsx from 'clsx';
import Icon from '@/components/icons/Icon';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Hinweis from '@/components/kern/Hinweis';
import Knopf from '@/components/kern/Knopf';
import { etikettKlassen, knopfKlassen, labelKlassen, linkKlassen } from '@/components/kern/stile';
import { COMPANY_DATA } from '@/config/company';
import { inputClass } from './stile';

// Badgröße über beide Spalten (der Messwert, in Mono), Umfang und Ausstattung nebeneinander, Wünsche über beide Spalten.
const BREIT = { Badgröße: 'sm:col-span-2', Wünsche: 'sm:col-span-2' };

// Zusammenfassung, Musterbad, Zuschuss und Anfrage (Formular, Erfolg, Fehler) (E-011: aus BadProjektCheck.jsx verschoben).
// Darstellung KERN v2 (Q-02): Spalte auf Kalk an der Fuge; Zusammenfassung als Schriftfeld (Mono-Etikett über dem Wert,
// Felder an 1-px-Fugen), Zuschuss als Hinweis, Knöpfe aus knopfKlassen/Knopf (ein Hauptknopf je Zustand), sichtbare
// Beschriftungen über den Feldern (bisher nur für Screenreader, Wortlaut gleich), Fehler mit Versatz-Zeichen und
// role="alert", Erfolg mit Haken. Props, Handler, IDs, name/value der Absende-Knöpfe, Texte und aria-live unverändert.
export default function Zusammenfassung({ sqmLabel, scopeLabel, tierLabel, extras, matchingBath, contactOpen, setContactOpen, sentVia, setSentVia, referenceId, handleNewRequest, leadData, setLeadData, isSubmitting, errorMessage, handleLeadSubmit }) {
    return (
        <div className="flex min-w-0 flex-col justify-between gap-8 border-t border-fuge bg-kalk p-6 sm:p-8 lg:col-span-5 lg:border-l lg:border-t-0 lg:p-12">
            <div className="flex flex-col gap-6">
                <span className={etikettKlassen}>
                    <Fugenkreuz className="size-3 text-strich" />
                    Ihre Zusammenfassung
                </span>

                <dl aria-live="polite" className="grid grid-cols-1 gap-px border border-fuge bg-fuge sm:grid-cols-2">
                    {[
                        ['Badgröße', `ca. ${sqmLabel} m²`],
                        ['Umfang', scopeLabel],
                        ['Ausstattung', tierLabel],
                        ['Wünsche', extras.join(', ') || 'Keine Extras gewählt']
                    ].map(([term, value]) => (
                        <div key={term} className={clsx('bg-fliese p-4', BREIT[term])}>
                            <dt className="font-mono text-fs-1 text-tinte-2">{term}</dt>
                            <dd className={clsx('mt-1 text-tinte', term === 'Badgröße' ? 'font-mono text-fs-3' : 'text-fs-2 font-semibold')}>{value}</dd>
                        </div>
                    ))}
                </dl>
                <p className="text-fs-2 text-tinte-2">
                    Jedes Bad ist anders: Untergrund, Leitungswege und Materialwahl entscheiden über den Aufwand. Den
                    verbindlichen Festpreis erhalten Sie deshalb nach dem kostenfreien Vor-Ort-Aufmaß.
                </p>

                {/* Verweis auf das passende Musterbad */}
                <div className="border border-fuge bg-fliese p-4 text-fs-2 text-tinte">
                    <p className="flex flex-wrap items-center justify-between gap-x-3 font-semibold">
                        <span>Musterbad-Vergleich:</span>
                        <Link href="/bad/musterbaeder" className={`${linkKlassen} inline-flex min-h-11 items-center gap-1`}>
                            Katalog
                            <Icon name="pfeil-rechts" groesse={4} />
                        </Link>
                    </p>
                    <p className="text-tinte-2">
                        Passend:{' '}
                        <Link
                             href={`/bad/musterbaeder/${matchingBath.slug}`}
                             className={`${linkKlassen} font-semibold`}
                         >
                             {matchingBath.label}
                         </Link>
                     </p>
                </div>

                {/* Zuschuss-Hinweis */}
                <Hinweis titel="Bis zu 4.180 € Pflegekassen-Zuschuss">
                    Bei Pflegegrad für barrierefreie Bäder nach <span className="font-mono">DIN 18040-2</span>.{' '}
                    <Link href="/bad/barrierefreies-bad" className={linkKlassen}>
                        Details zum barrierefreien Bad &amp; Zuschüssen
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
                    <div className="border border-strich bg-fliese p-6 text-fs-2 text-tinte-2" role="status">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                            <p className="flex items-center gap-2 text-fs-3 font-semibold text-tinte">
                                <span className="inline-flex text-abnahme" data-motion="notiert">
                                    <Icon name="haken" groesse={5} />
                                </span>
                                Projektcheck übermittelt
                            </p>
                            {referenceId && (
                                <span className="border border-fuge bg-kalk px-2 py-1 font-mono text-fs-1 text-tinte">
                                    {referenceId}
                                </span>
                            )}
                        </div>
                        <p className="mt-4">
                            Vielen Dank, <strong className="font-semibold text-tinte">{leadData.name}</strong>! Ihre Projektangaben für ca. <span className="font-mono text-tinte">{sqmLabel} m²</span> ({scopeLabel}) sind direkt bei Herrn Deniz Tezgel eingegangen.
                            {leadData.email && (
                                <span className="mt-3 flex items-start gap-2 border-l-2 border-tinte pl-4 text-tinte">
                                    <Icon name="mail" groesse={4} className="mt-1" />
                                    <span>
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
                            <p className="mt-2">1. Herr Tezgel prüft Ihre Angaben &amp; Materialbedarf.</p>
                            <p className="mt-1">2. Rückruf binnen 24–48 Std. zur Vor-Ort-Aufmaß-Abstimmung.</p>
                        </div>
                        <div className="mt-4">
                            <Knopf variante="text" onClick={handleNewRequest}>
                                Erneut anfragen oder anpassen
                            </Knopf>
                        </div>
                    </div>
                ) : sentVia === 'whatsapp' ? (
                    <div className="border border-strich bg-fliese p-6 text-fs-2 text-tinte-2" role="status">
                        <p className="flex items-center gap-2 text-fs-3 font-semibold text-tinte">
                            <Icon name="sprechblase" groesse={5} />
                            WhatsApp wurde geöffnet
                        </p>
                        <p className="mt-3">
                            Bitte senden Sie die vorbereitete Nachricht mit Ihren Angaben dort ab – erst dann erreicht sie uns.
                        </p>
                        <div className="mt-4">
                            <Knopf variante="text" onClick={() => setSentVia(null)}>
                                Erneut senden oder Kanal wechseln
                            </Knopf>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleLeadSubmit} className="flex flex-col gap-4">
                        {errorMessage && (
                            <p className="flex items-start gap-2 border-l-2 border-laser bg-fliese p-3 text-fs-2 text-laser-tief" role="alert">
                                <Icon name="fehler" groesse={4} className="mt-1" />
                                <span>{errorMessage}</span>
                            </p>
                        )}

                        <div>
                            <label htmlFor="budget-lead-name" className={labelKlassen}>Ihr Name</label>
                            <input
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
                            <label htmlFor="budget-lead-phone" className={labelKlassen}>Ihre Telefonnummer</label>
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
                                placeholder="Ihre E-Mail-Adresse (optional für Bestätigung)"
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
                                className={knopfKlassen('neben', 'w-full')}
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
                    className="w-full text-center"
                >
                    {/* Nummer bricht nur als Ganzes um (mobil zweite Zeile), nie mitten in den Ziffern */}
                    Sofort anrufen: <span className="whitespace-nowrap font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                </Knopf>
            </div>
        </div>
    );
}
