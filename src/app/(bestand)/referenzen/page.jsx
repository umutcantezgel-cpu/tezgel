// /referenzen (S-23, Werkstatt-Planzeile E6-BAU-04; KERN v2, Erzählansicht nach dem Vorbild der Startseite und der
// Familienreferenzen /blog und /leistungen/[id]). Server-Komponente; Zustand hat nur der Themenfilter der Bewertungen.
// Abschnittsfolge und Flächen (Lesefolge wie im Bestand):
// 1. Einstieg (Kalk): Etikett „5,0 · 27 Google-Rezensionen“ mit Stern, H1 an der Laserachse, Vorspann, zwei Wege; Randspalte =
//    Planblatt mit dem Plan „fugen“ (Kreuzfuge ohne Bemaßung; das Blatt trägt das eine Rot des ersten Bildschirms)
// 2. Bewertungen #bewertungen (Kalk, geteilter Abschnitt ReviewsSection): Kopf mit Maß in Mono, Themenfilter, Stimmen als
//    Feldraster mit einem Anriss · 3. Leistungsbeispiele (Fliese): Register an der Fuge, je Zeile Planmarke (gezeichnet, kein
//    Foto), Kategorie und Platzhalter-Kennzeichnung als Mono-Etikett, Titel, drei Leistungen, zwei Verweise
// 4. „Überzeugen Sie sich selbst“ (Kalk): Kopf, Leitsatz an der Fuge und drei Wege · 5. Abschluss (FinalCTA).
// Leitachse über 2–4 mit Fugenkreuz je Abschnitt; kein großer Moment, kein Auftritt. `spaet` nur auf 4 (nicht auf dem
// Sprungziel #bewertungen; zu 3 siehe dort). Die Platzhalter-Referenzen bleiben als solche gekennzeichnet: „Projektdokumentationen folgen“ und
// „Referenzprojekt – Projektdokumentation in Vorbereitung“ wörtlich; die Planmarke ist eine Zeichnung, kein Foto.
// Wortlaut, Links, IDs (projekte-heading, referenzen-cta) wie im Bestand; Metadaten und JSON-LD im layout.tsx der Route.
import Link from 'next/link';
import { COMPANY_DATA } from '@/config/company';
import { PORTFOLIO_PROJECTS, categories, isPlaceholderProject } from '@/config/projects';
import { RATING_SUMMARY } from '@/config/reviews';
import ReviewsSection from '@/components/sections/ReviewsSection';
import { FinalCTA } from '@/components/ui/FinalCTA';
import WhatsAppLogo from '@/components/ui/WhatsAppLogo';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Leitachse from '@/components/kern/Leitachse';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Verlegeplan from '@/components/kern/Verlegeplan';
import { etikettKlassen, linkKlassen } from '@/components/kern/stile';

const { google } = RATING_SUMMARY;

// Planmarke je Leistungsbeispiel (ersetzt das Keramik-Panel mit Icon): der Themenplan, dessen Beschreibung zum Projekttyp
// passt; sonst der Plan der Kategorie. Gleiche Zuordnung auf /referenzen/[id].
const PROJEKT_PLAENE = {
    'badsanierung-grossformat': 'badsanierung',
    'einfamilienhaus-komplett': 'wohnen',
    'treppenanlage-wohnhaus': 'treppe',
    'wohnbereich-fussbodenheizung': 'fussbodenheizung',
    'barrierefreies-duschbad': 'abdichtung',
    'balkon-stelzlager': 'aussen'
};
const KATEGORIE_PLAENE = { bad: 'bad', wohnen: 'wohnen', treppen: 'treppe', aussen: 'aussen' };
const planFuer = (project) => PROJEKT_PLAENE[project.id] || KATEGORIE_PLAENE[project.category] || 'fugen';

const getCategoryName = (categoryId) =>
    categories.find((category) => category.id === categoryId)?.name || categoryId;

export default function ReferenzenPage() {
    const { contact, owner, motto } = COMPANY_DATA;

    return (
        <>
            {/* 1. EINSTIEG: Etikett, H1 an der Laserachse, Vorspann, zwei Wege; rechts das Planblatt */}
            <Einstieg
                art="erzaehl"
                etikett={
                    <span className="inline-flex items-center gap-2">
                        <Icon name="stern-voll" groesse={4} className="text-tinte" />
                        {google.displayRating} &middot; {google.count} {google.label}
                    </span>
                }
                titel={
                    <>
                        Referenzen &amp; <span>Bewertungen Fliesenleger Tezgel</span>
                    </>
                }
                vorspann={
                    <p>
                        Echte Referenzen &amp; Bewertungen für Fliesenleger Tezgel: Erfahren Sie, was unsere Kunden in Aßlar, Wetzlar und Mittelhessen über Bäder, Balkone, Treppen und Großformatfliesen sagen – mit 5,0 Sternen transparent und wörtlich aus verifizierten Google-Rezensionen.
                    </p>
                }
                aktionen={
                    <>
                        <Knopf href="#bewertungen" icon="pfeil-rechts">
                            Bewertungen lesen
                        </Knopf>
                        <Knopf href="/kontakt" variante="neben">
                            Vor-Ort-Aufmaß anfragen
                        </Knopf>
                    </>
                }
                rand={
                    <Planblatt felder={planfelder('Referenzen & Bewertungen', 'fugen')}>
                        <Verlegeplan plan="fugen" ohneAchse bemassung={false} interaktiv />
                    </Planblatt>
                }
            />

            <Leitachse>
                {/* 2. BEWERTUNGEN (Sprungziel #bewertungen): geteilter Abschnitt mit Themenfilter */}
                <ReviewsSection leitachse />

                {/* 3. LEISTUNGSBEISPIELE (reservierte Referenzplätze): Register an der Fuge, je Eintrag eine Zeile. Ohne `spaet`:
                    mobil ist das Register rund 4000 px hoch, die Platzhalterhöhe von `spaet` 800 px – axe legte die letzte Zeile
                    dann auf den Fuß (Tinte) und meldete einen Kontrastfehler, den es im Bild nicht gibt (m375) */}
                {PORTFOLIO_PROJECTS.length > 0 && (
                    <Abschnitt
                        titelId="projekte-heading"
                        flaeche="fliese"
                        leitachse
                        etikett="Projektdokumentationen folgen"
                        titel="Leistungsbeispiele"
                        einleitung={
                            <p>
                                Diese Beispiele zeigen, was zu typischen Projekten gehört. Fotos und Details realer Projekte
                                veröffentlichen wir erst, wenn unsere Kunden zugestimmt haben.
                            </p>
                        }
                    >
                        <ul className="border-t border-tinte">
                            {PORTFOLIO_PROJECTS.map((project) => {
                                const placeholder = isPlaceholderProject(project);

                                return (
                                    <li key={project.id} className="border-b border-fuge">
                                        <article className="grid grid-cols-4 gap-y-6 py-8 md:grid-cols-8 md:gap-x-8 lg:grid-cols-12 lg:gap-x-12">
                                            {/* Planmarke statt Foto: gezeichneter Themenplan ohne Achse und ohne Maße (dekorativ) */}
                                            <div
                                                className="col-span-4 flex items-center justify-center border border-fuge bg-kalk p-4 md:col-span-3 lg:col-span-3"
                                                aria-hidden="true"
                                            >
                                                <Verlegeplan plan={planFuer(project)} ohneAchse bemassung={false} className="max-h-32" />
                                            </div>

                                            <div className="col-span-4 md:col-span-5 lg:col-span-4">
                                                <p className={etikettKlassen}>
                                                    <Fugenkreuz className="size-3 shrink-0 text-strich" />
                                                    {getCategoryName(project.category)}
                                                </p>
                                                {/* Kennzeichnung der Platzhalter-Referenz: sichtbar und wörtlich wie im Bestand */}
                                                <p className="mt-2 font-mono text-fs-1 text-tinte">
                                                    {placeholder ? 'Referenzprojekt – Projektdokumentation in Vorbereitung' : 'Referenzprojekt'}
                                                </p>
                                                <h3 className="mt-4 text-fs-4 text-tinte">
                                                    <Link
                                                        href={`/referenzen/${project.id}`}
                                                        className="decoration-1 underline-offset-4 hover:underline"
                                                    >
                                                        {project.title}
                                                    </Link>
                                                </h3>
                                            </div>

                                            <div className="col-span-4 md:col-span-8 lg:col-span-5">
                                                {Array.isArray(project.scopeItems) && project.scopeItems.length > 0 && (
                                                    <ul className="border-t border-fuge">
                                                        {project.scopeItems.slice(0, 3).map((item) => (
                                                            <li key={item} className="flex gap-3 border-b border-fuge py-2 font-text text-fs-2 text-tinte">
                                                                <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                                                    <Fugenkreuz className="size-3" />
                                                                </span>
                                                                <span className="min-w-0">{item}</span>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                )}

                                                <div className="mt-4 flex flex-col items-start gap-1">
                                                    <Knopf href={`/referenzen/${project.id}`} variante="text" icon="pfeil-rechts">
                                                        Leistungsumfang: {project.title}
                                                    </Knopf>
                                                    {project.serviceLink && (
                                                        <Link
                                                            href={project.serviceLink}
                                                            className={`${linkKlassen} inline-flex min-h-11 items-center font-text text-fs-2`}
                                                        >
                                                            Leistungsdetails zu {project.title}
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>
                                        </article>
                                    </li>
                                );
                            })}
                        </ul>
                    </Abschnitt>
                )}

                {/* 4. ÜBERZEUGEN SIE SICH SELBST: Kopf, darunter der Leitsatz an der Fuge und drei Wege */}
                <Abschnitt
                    titelId="referenzen-cta"
                    leitachse
                    spaet
                    etikett="Kostenfrei & unverbindlich"
                    titel="Überzeugen Sie sich selbst von unserer Fachqualität"
                    einleitung={
                        <p>
                            Kostenfreies Vor-Ort-Aufmaß durch {owner.fullName} – in Aßlar, Wetzlar, Gießen und Umgebung.
                        </p>
                    }
                >
                    <p className="max-w-mass border-l-2 border-strich pl-6 font-anzeige text-fs-5 text-tinte">„{motto}“</p>
                    {/* pb-1: Fokusring der Knöpfe an der Unterkante bleibt im gezeichneten Bereich (content-visibility, `spaet`) */}
                    <div className="mt-12 flex flex-col gap-3 pb-1 sm:flex-row sm:flex-wrap">
                        <Knopf href="/kontakt" icon="pfeil-rechts">
                            Aufmaß anfragen
                        </Knopf>
                        <Knopf href={contact.whatsappLink} extern variante="neben" vorne={<WhatsAppLogo className="size-5 shrink-0" />}>
                            WhatsApp
                        </Knopf>
                        <Knopf href={`tel:${contact.phoneLink}`} variante="neben" iconLinks="telefon">
                            <span className="font-mono font-normal">{contact.phone}</span>
                        </Knopf>
                    </div>
                </Abschnitt>
            </Leitachse>

            <FinalCTA />
        </>
    );
}
