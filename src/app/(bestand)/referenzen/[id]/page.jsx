// /referenzen/[id] (S-23, Werkstatt-Planzeile E6-BAU-04; KERN v2, Erzählansicht nach dem Muster der Familienreferenz
// /leistungen/[id]). Server-Komponente (async, params als Promise nach Next 16), ohne Client-Insel.
// Abschnittsfolge und Flächen (Lesefolge wie im Bestand):
// 1. Einstieg (Kalk): Rückweg als Pfad über der Mono-Kennzeile mit den Etiketten (Platzhalter-Kennzeichnung, Kategorie,
//    Jahr, Ort; so bricht die Kennzeile ab lg nicht um), H1, Vorspann, zwei Wege; Randspalte = Planblatt mit dem Themenplan
//    des Projekttyps (ohne Bemaßung; das Blatt trägt das eine Rot des ersten Bildschirms). Die H1 steht in text-fs-6 wie
//    alle langen Titel (alle Projekttitel haben ≥ 44 Zeichen; „Großformatfliesen“ liefe in text-fs-7 über die Spalte).
// 2. Umfang (Fliese): H2 und Satz als Kopf; links Leistungsumfang und Qualitätsstandard als Listen an der Fuge, bei
//    dokumentierten Projekten Herausforderung/Lösung als Feldpaar, Fotos als Feldraster, der Platzhalter-Vermerk
//    „Fotos und Details folgen“ (Rahmen Strich, Kante links) bzw. die Kundenstimme; rechts „Auf einen Blick“ als Randfeld
//    (Schriftfeld + zwei Wege, ab lg klebend) · 3. Qualitätsversprechen (geteilter Baustein, Kalk).
// Keine Leitachse und kein Abschluss wie im Bestand bzw. in der Referenz; kein großer Moment, kein Auftritt, kein `spaet`
// (der Umfang beginnt im ersten Bildschirm, das Randfeld klebt).
// Platzhalter-Referenzen zeigen nur, was `src/config/projects.js` belegt: keine Orte, Jahre, Bauzeiten, Fotos oder Stimmen;
// die Kennzeichnung „Projektdokumentation in Vorbereitung“ bleibt sichtbar und wörtlich. Das Keramik-Panel des Randfelds
// (dekorativ) entfällt, der Plan steht im Einstieg.
// Wortlaut, Links, generateStaticParams, generateMetadata und notFound wie im Bestand; JSON-LD im layout.jsx der Route.
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { PORTFOLIO_PROJECTS, categories, isPlaceholderProject } from '@/config/projects';
import { COMPANY_DATA } from '@/config/company';
import QualityPromise from '@/components/sections/QualityPromise';
import { createMetadata } from '@/lib/metadata';
import Icon from '@/components/icons/Icon';
import Abschnitt from '@/components/kern/Abschnitt';
import Einstieg from '@/components/kern/Einstieg';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import Knopf from '@/components/kern/Knopf';
import Planblatt, { planfelder } from '@/components/kern/Planblatt';
import Schriftfeld from '@/components/kern/Schriftfeld';
import Verlegeplan from '@/components/kern/Verlegeplan';

// Themenplan je Leistungsbeispiel (wie auf /referenzen): der Plan, dessen Beschreibung zum Projekttyp passt; sonst der
// Plan der Kategorie
const PROJEKT_PLAENE = {
    'badsanierung-grossformat': 'badsanierung',
    'einfamilienhaus-komplett': 'wohnen',
    'treppenanlage-wohnhaus': 'treppe',
    'wohnbereich-fussbodenheizung': 'fussbodenheizung',
    'barrierefreies-duschbad': 'abdichtung',
    'balkon-stelzlager': 'aussen'
};
const KATEGORIE_PLAENE = { bad: 'bad', wohnen: 'wohnen', treppen: 'treppe', aussen: 'aussen' };

// Unterstrich am Rückweg: Linie in Strich, bei feinem Zeiger und beim Antippen in Tinte (Register `zustand` am Link)
const UNTERSTRICH =
    'underline decoration-strich decoration-1 underline-offset-4 pointer-fine:group-hover:decoration-tinte group-active:decoration-tinte';
// Zwischentitel (H3) im Umfang
const H3 = 'text-fs-4 text-tinte';
// Listenzeile an der Fuge
const ZEILE = 'flex gap-3 border-b border-fuge py-3 font-text text-fs-2 text-tinte';

export function generateStaticParams() {
    return PORTFOLIO_PROJECTS.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }) {
    const { id } = await params;
    const project = PORTFOLIO_PROJECTS.find((p) => p.id === id);
    if (!project) return { title: 'Referenzprojekt' };

    return createMetadata({
        title: project.title,
        description: project.description,
        path: `/referenzen/${id}`,
        image: project.image
    });
}

export default async function ProjectDetailPage({ params }) {
    const { id } = await params;
    const project = PORTFOLIO_PROJECTS.find((p) => p.id === id);

    if (!project) {
        notFound();
    }

    const placeholder = isPlaceholderProject(project);
    const categoryName = categories.find(c => c.id === project.category)?.name || project.category;
    const plan = PROJEKT_PLAENE[project.id] || KATEGORIE_PLAENE[project.category] || 'fugen';
    const scopeItems = Array.isArray(project.scopeItems) ? project.scopeItems : [];
    // Project facts are only shown for documented (non-placeholder) projects.
    const location = !placeholder ? project.location : null;
    const year = !placeholder ? project.year : null;
    const duration = !placeholder ? project.duration : null;
    const testimonial = !placeholder ? project.testimonial : null;
    const images = !placeholder && Array.isArray(project.images) ? project.images.filter((img) => img?.url) : [];

    return (
        <>
            {/* 1. EINSTIEG: Rückweg als Pfad, Etiketten in der Mono-Kennzeile, H1, Vorspann, zwei Wege; rechts das Planblatt */}
            <Einstieg
                art="erzaehl"
                pfad={
                    <Link href="/referenzen" data-motion="zustand" className="group inline-flex min-h-11 items-center gap-2 font-mono text-fs-1 text-tinte">
                        <Icon name="pfeil-links" groesse={4} />
                        <span className={UNTERSTRICH}>Zurück zur Referenzen-Übersicht</span>
                    </Link>
                }
                etikett={
                    <>
                        {placeholder && (
                            <>
                                <span className="text-tinte">Projektdokumentation in Vorbereitung</span>
                                <Fugenkreuz className="size-3 shrink-0 text-strich" />
                            </>
                        )}
                        <span>{categoryName}</span>
                        {year && (
                            <>
                                <Fugenkreuz className="size-3 shrink-0 text-strich" />
                                <span className="inline-flex items-center gap-2">
                                    <Icon name="kalender" groesse={4} />
                                    <span>{year}</span>
                                </span>
                            </>
                        )}
                        {location && (
                            <>
                                <Fugenkreuz className="size-3 shrink-0 text-strich" />
                                <span className="inline-flex items-center gap-2">
                                    <Icon name="ort" groesse={4} />
                                    {location}
                                </span>
                            </>
                        )}
                    </>
                }
                titel={<span className="block text-fs-6">{project.title}</span>}
                vorspann={<p>{project.description}</p>}
                aktionen={
                    <>
                        {project.serviceLink && (
                            <Knopf href={project.serviceLink} icon="pfeil-rechts">
                                Leistungsdetails: {project.title}
                            </Knopf>
                        )}
                        <Knopf href="/kontakt" variante={project.serviceLink ? 'neben' : 'haupt'}>
                            Vor-Ort-Aufmaß anfragen
                        </Knopf>
                    </>
                }
                rand={
                    <Planblatt felder={planfelder(project.title, plan)}>
                        <Verlegeplan plan={plan} ohneAchse bemassung={false} interaktiv />
                    </Planblatt>
                }
            />

            {/* 2. UMFANG: Kopf (H2, Satz), links die Inhalte an der Fuge, rechts das Randfeld „Auf einen Blick“ */}
            <Abschnitt
                titelId="projekt-umfang-heading"
                flaeche="fliese"
                titel={placeholder ? 'Was ein solches Projekt umfasst' : `Projekt-Überblick: ${project.title}`}
                einleitung={
                    placeholder ? (
                        <p>
                            Dieses Leistungsbeispiel beschreibt einen typischen Projekttyp aus dem Bereich {categoryName}.
                            Der genaue Umfang richtet sich nach Ihrem Objekt und wird beim Vor-Ort-Aufmaß festgelegt.
                        </p>
                    ) : (
                        (location || duration) && (
                            <p>
                                Projekt im Bereich {categoryName}
                                {location ? ` in ${location}` : ''}
                                {duration ? ` mit einer Bauzeit von ${duration}` : ''}.
                            </p>
                        )
                    )
                }
            >
                <div className="grid grid-cols-4 gap-y-12 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12">
                    {/* Hauptspalte */}
                    <div className="col-span-4 md:col-span-8">
                        {scopeItems.length > 0 && (
                            <div>
                                <h3 className={H3}>Typischer Leistungsumfang</h3>
                                <ul className="mt-4 grid border-t border-fuge sm:grid-cols-2 sm:gap-x-8">
                                    {scopeItems.map((item) => (
                                        <li key={item} className={ZEILE}>
                                            <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                                <Fugenkreuz className="size-3" />
                                            </span>
                                            <span className="min-w-0">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Challenge & Solution (only for documented projects) */}
                        {!placeholder && (project.challenge || project.solution) && (
                            <div className="mt-12 grid grid-cols-1 gap-px border border-fuge bg-fuge sm:grid-cols-2">
                                {project.challenge && (
                                    <div className="bg-kalk p-6 lg:p-8">
                                        <h3 className="font-text text-fs-3 font-semibold text-tinte">Herausforderung vor Ort</h3>
                                        <p className="mt-2 font-text text-fs-2 text-tinte-2">{project.challenge}</p>
                                    </div>
                                )}
                                {project.solution && (
                                    <div className="bg-kalk p-6 lg:p-8">
                                        <h3 className="font-text text-fs-3 font-semibold text-tinte">Lösung</h3>
                                        <p className="mt-2 font-text text-fs-2 text-tinte-2">{project.solution}</p>
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Quality standard */}
                        <div className="mt-12">
                            <h3 className={H3}>Unser Qualitätsstandard</h3>
                            <ul className="mt-4 grid border-t border-fuge sm:grid-cols-2 sm:gap-x-8">
                                {COMPANY_DATA.qualityPromises.slice(0, 4).map((promise) => (
                                    <li key={promise.title} className={ZEILE}>
                                        <span aria-hidden="true" className="flex h-6 shrink-0 items-center text-strich">
                                            <Icon name="haken" groesse={5} />
                                        </span>
                                        <span className="min-w-0 font-semibold">{promise.title}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Project photos (only for documented projects) */}
                        {images.length > 0 && (
                            <section aria-labelledby="projekt-fotos" className="mt-16">
                                <h2 id="projekt-fotos" className="text-fs-5 text-tinte">Projektfotos</h2>
                                <ul className="mt-6 grid grid-cols-1 gap-px border border-fuge bg-fuge sm:grid-cols-2">
                                    {images.map((img, index) => (
                                        <li key={img.url} className="relative aspect-4/3 overflow-hidden bg-kalk">
                                            <Image
                                                src={img.url}
                                                alt={img.alt || `${project.title} – Foto ${index + 1}`}
                                                fill
                                                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                                className="object-cover"
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </section>
                        )}

                        {/* Placeholder note: Vermerk in der Form des Hinweises (Rahmen Strich, Kante links, Info-Zeichen) */}
                        {placeholder && (
                            <div className="mt-16 flex items-start gap-4 border border-l-2 border-strich bg-kalk p-6 lg:p-8">
                                <Icon name="info" groesse={5} className="mt-2 text-tinte" />
                                <div className="min-w-0">
                                    <h2 className="text-fs-5 text-tinte">Fotos und Details folgen</h2>
                                    <p className="mt-3 max-w-mass font-text text-fs-2 text-tinte-2">
                                        Detaillierte Baustellenfotos und Kundendokumentationen für {project.title} veröffentlichen wir aus Diskretionsgründen ausschließlich mit ausdrücklicher Freigabe der Bauherren. Authentische Erfahrungsberichte finden Sie in unseren verifizierten Google-Bewertungen.
                                    </p>
                                    <Knopf href="/referenzen#bewertungen" variante="text" iconLinks="stern-voll" className="mt-2">
                                        Echte Kundenbewertungen lesen
                                    </Knopf>
                                </div>
                            </div>
                        )}

                        {/* Testimonial (only for documented projects): Kundenstimme, Quelle in Mono */}
                        {testimonial && (
                            <figure className="mt-16 border-l-2 border-laser-tief pl-6 sm:pl-8">
                                <blockquote className="max-w-mass font-text text-fs-4 text-tinte">
                                    &bdquo;{testimonial.text}&ldquo;
                                </blockquote>
                                <figcaption className="mt-4 font-text text-fs-2 font-semibold text-tinte">
                                    — {testimonial.author}
                                    {testimonial.role && <span className="font-mono text-fs-1 font-normal text-tinte-2">, {testimonial.role}</span>}
                                </figcaption>
                            </figure>
                        )}
                    </div>

                    {/* Randfeld: Auf einen Blick (ab lg klebend unter dem Kopf) */}
                    <div className="col-span-4 md:col-span-8 lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
                        <div className="border border-fuge bg-kalk p-6 lg:p-8">
                            <h2 className="text-fs-5 text-tinte">
                                {placeholder ? 'Auf einen Blick' : 'Projektdaten im Detail'}
                            </h2>

                            <Schriftfeld
                                spalten={1}
                                className="mt-6"
                                felder={[
                                    { etikett: 'Kategorie', wert: categoryName },
                                    ...(placeholder ? [{ etikett: 'Status', wert: 'Dokumentation in Vorbereitung' }] : []),
                                    ...(duration ? [{ etikett: 'Bauzeit', wert: duration }] : []),
                                    ...(location ? [{ etikett: 'Ort', wert: location }] : [])
                                ]}
                            />

                            <p className="mt-8 font-text text-fs-2 font-semibold text-tinte">
                                Planen Sie ein ähnliches Projekt?
                            </p>
                            <div className="mt-4 flex flex-col gap-3">
                                <Knopf href="/kontakt" icon="pfeil-rechts" className="w-full">
                                    Jetzt Beratung anfragen
                                </Knopf>
                                {project.serviceLink && (
                                    <Knopf href={project.serviceLink} variante="neben" className="w-full text-center">
                                        Fachbereich zu {project.title} ansehen
                                    </Knopf>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Abschnitt>

            <QualityPromise />
        </>
    );
}
