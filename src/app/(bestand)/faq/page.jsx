"use client";
// FAQ (S-26, KERN v2, Arbeitsansicht nach /kontakt): kompakter Einstieg (Etikett, H1 text-fs-6, Vorspann), danach die
// Fragenliste im ersten Bildschirm. Links (ab lg klebend) Suche mit sichtbarer Beschriftung und die Kategorien als Zeilen
// an der Fuge (Muster Sprungindex: Zeichen, Name, Marke), rechts die Fragen als Zeilen an der Fuge in der Erscheinung von
// FAQAccordion (Plus/Minus), darunter „Ihre Frage war nicht dabei?“ als Feld. Danach Projektanfrage (Rechner, nachgeladen
// mit Platzhalter), Qualitätsversprechen und Abschluss ohne Achse. Kein großer Moment, kein Rot.
// Verhalten wie im Bestand (Test F-14): Kategorien sind Umschalter mit aria-pressed und zeigen nur ihre Fragen (sie
// filtern, statt zu springen); Antworten stehen nur geöffnet im DOM; die Suche durchsucht Frage und Antwort und blendet
// die Kategorien aus. Fragen und Antworten wortgleich mit dem FAQPage-JSON-LD in ./layout.tsx.
// Die Seite bleibt Client-Komponente: Suche und Filter halten Zustand, eine eigene Insel läge außerhalb der Schreibrechte.
import { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import clsx from 'clsx';
import QualityPromise from '@/components/sections/QualityPromise';
import { COMPANY_DATA } from '@/config/company';
import FormularPlatzhalter from '@/components/funnels/TezgelAnfrageFunnel/Platzhalter';
import { FinalCTA } from '@/components/ui/FinalCTA';
import Icon from '@/components/icons/Icon';
import Einstieg from '@/components/kern/Einstieg';
import Abschnitt from '@/components/kern/Abschnitt';
import Knopf from '@/components/kern/Knopf';
import Fugenkreuz from '@/components/kern/Fugenkreuz';
import { feldKlassen, labelKlassen } from '@/components/kern/stile';

// Rechner nachgeladen wie auf der Startseite (Tempo, E4-NACH-17); ohne JavaScript bleibt der Platzhalter mit Anruf,
// WhatsApp und E-Mail stehen (R-01b)
const PricingCalculator = dynamic(() => import('@/components/pricing/PricingCalculator'), {
    loading: () => <FormularPlatzhalter />,
});

// Keep in sync with the FAQPage JSON-LD in ./layout.tsx (same questions & answers).
// Zeichen je Kategorie aus der eigenen Icon-Familie (statt lucide Layers, Droplets, Sun, ClipboardCheck)
const faqData = {
    fliesen: {
        icon: 'grossformat',
        title: 'Fliesen & Großformate',
        questions: [
            { q: 'Welche Fliesenkleber und Fugenmassen verwenden Sie?', a: 'Wir verwenden ausschließlich flexible C2-TE-S1/S2 Fliesenkleber und verfärbungsfreie Premium-Fugenmassen – für einen dauerhaft festen Verbund und ein sauberes Fugenbild.' },
            { q: 'Wann lohnen sich großformatige Fliesen (XXL)?', a: 'Großformate sorgen für fugenarme, planebene Flächen mit ruhigem, monolithischem Raumgefühl – im Bad ebenso wie im Wohnbereich. Mit Nivelliersystem und Vakuumhebetechnik verlegen wir sie millimetergenau und ohne Überzähne.' },
            { q: 'Was kostet die Fliesenverlegung pro Quadratmeter?', a: 'Das hängt von Format, Material und Zustand des Untergrunds ab. Nach dem kostenfreien Vor-Ort-Aufmaß erhalten Sie eine transparente Kostenaufstellung nach Quadratmetern und Arbeitsaufwand – als verbindliches Festpreisangebot.' },
            { q: 'Können neue Fliesen auf einen vorhandenen Belag verlegt werden?', a: 'Das hängt vom Zustand des Altbelags ab. Beim Vor-Ort-Aufmaß prüfen wir Ebenheit, Restfeuchte und Tragfähigkeit des Untergrunds und empfehlen Ihnen die fachgerechte Lösung.' }
        ]
    },
    bad: {
        icon: 'bad',
        title: 'Bad & Walk-In-Dusche',
        questions: [
            { q: 'Was kostet eine Komplettbadsanierung aus einer Hand?', a: 'Die Kosten hängen von Raumgröße, Ausstattung und Zustand des Untergrunds ab. Wir erstellen Ihnen nach einem kostenlosen Aufmaß vor Ort ein verbindliches Festpreisangebot.' },
            { q: 'Wie lange dauert ein kompletter Badumbau?', a: 'Die Dauer hängt vom Umfang der Arbeiten ab. Vor Baustart erhalten Sie einen verbindlichen Bauzeitenplan mit festen Zusagen für Baustart und Fertigstellung – damit Ihr Alltag planbar bleibt.' },
            { q: 'Gibt es Zuschüsse für barrierefreie Bäder?', a: 'Ja! Bei Vorliegen eines Pflegegrads (Pflegegrad 1–5) bezuschusst die Pflegekasse den altersgerechten Badumbau mit bis zu 4.180 € pro Person.' },
            { q: 'Wie wird eine bodengleiche Dusche dauerhaft dicht?', a: 'Durch eine normgerechte Verbundabdichtung nach DIN 18534: Lückenlose Abdichtungsbahnen und Dichtmanschetten in Nassräumen sorgen für dauerhafte Dichtigkeit und Schimmelschutz.' }
        ]
    },
    aussen: {
        icon: 'balkon',
        title: 'Balkon, Terrasse & Wohnen',
        questions: [
            { q: 'Welche Beläge eignen sich für Balkon und Terrasse?', a: 'Wir verlegen frostsichere 2-cm-Keramikplatten auf Stelzlagern – mit durchdachter Entwässerung für Balkon und Terrasse.' },
            { q: 'Welche Rutschhemmung brauche ich?', a: 'Das hängt vom Einsatzbereich ab. Bei der Material- und Fugenbildplanung beraten wir Sie zu normgerechter Rutschhemmung (R10/R11) – passend zu Ihrem Raum und Belag.' }
        ]
    },
    ablauf: {
        icon: 'dokument',
        title: 'Angebot & Einsatzgebiet',
        questions: [
            { q: 'Unterstützen Sie bei der Beantragung von Zuschüssen?', a: 'Ja. Für den Zuschuss der Pflegekasse zum barrierefreien Bad erstellen wir den prüffähigen Kostenvoranschlag und begleiten Ihren Antrag von Anfang an.' },
            { q: 'Gibt es bei Ihnen eine Festpreisgarantie?', a: 'Ja! Nach dem kostenfreien Vor-Ort-Aufmaß erhalten Sie ein verbindliches Festpreisangebot ohne versteckte Zusatzkosten.' },
            { q: 'In welchem Gebiet sind Sie tätig?', a: `Vom Firmensitz in ${COMPANY_DATA.headquarters.city} aus sind wir in ${COMPANY_DATA.business.serviceArea.slice(0, -1).join(', ')} sowie für Großprojekte in ganz Hessen für Sie im Einsatz.` }
        ]
    }
};

const categories = Object.entries(faqData);

// Kategorie-Zeile (Muster Sprungindex, Zustand wie die Kategorien der Ratgeber-Liste): Zeilen an der Fuge, gedrückt Tinte
// mit Kalk-Text und Haken als Marke (nicht das Fugenkreuz: neben den Plus-Zeichen der Fragen läse es sich als
// „aufklappen“). Der Fokusring liegt innen (wie in der Ratgeber-Liste), auf der gedrückten Zeile in Kalk – sonst stünde er
// über der gedrückten Nachbarzeile Tinte auf Tinte; die fokussierte Zeile liegt zudem über den Nachbarn (focus-visible:z-10).
// Farbwechsel nur bei feinem Zeiger bzw. beim Antippen.
const ZEILE = 'relative flex min-h-12 w-full items-center gap-4 px-4 py-3 text-left font-text text-fs-2 font-semibold transition-colors dauer-1 ease-setzen focus-visible:z-10 focus-visible:-outline-offset-4';

export default function FAQPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [openCategory, setOpenCategory] = useState('fliesen');
    const [openQuestions, setOpenQuestions] = useState({});

    const filteredCategories = useMemo(() => {
        if (!searchQuery.trim()) return categories;

        return categories.map(([key, category]) => {
            const filteredQuestions = category.questions.filter(
                q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    q.a.toLowerCase().includes(searchQuery.toLowerCase())
            );
            return [key, { ...category, questions: filteredQuestions }];
        }).filter(([, category]) => category.questions.length > 0);
    }, [searchQuery]);

    const toggleQuestion = (categoryKey, questionIndex) => {
        const key = `${categoryKey}-${questionIndex}`;
        setOpenQuestions(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <>
            {/* 1. EINSTIEG: Etikett in Mono, H1 (fs-6), Vorspann (Norm in Mono) */}
            <Einstieg
                art="arbeit"
                etikett={
                    <span className="inline-flex items-center gap-2">
                        <Fugenkreuz className="size-3 shrink-0 text-strich" />
                        Schnelle Fach-Antworten
                    </span>
                }
                titel={<>FAQ: Häufige Fragen zu Fliesen &amp; Bad bei Tezgel</>}
                vorspann={
                    <p>
                        FAQ: Häufige Fragen zu Fliesen &amp; Bad beantwortet vom Fliesenleger-Fachbetrieb Tezgel in Aßlar &amp; Wetzlar: Hier finden Sie fundierte Antworten rund um Badsanierung, XXL-Großformate,{' '}
                        <span className="whitespace-nowrap font-mono text-fs-2">DIN 18534</span> Abdichtung, Kosten und Festpreisangebote von Inhaber {COMPANY_DATA.owner.fullName}.
                    </p>
                }
            />

            {/* 2. FRAGEN: links Suche und Kategorien (ab lg klebend), rechts Fragen und Rückfrage-Feld */}
            <Abschnitt art="arbeit">
                <div className="grid grid-cols-4 gap-y-12 md:grid-cols-8 lg:grid-cols-12 lg:gap-x-12">
                    <div className="col-span-4 md:col-span-8 lg:col-span-4">
                        <div className="flex flex-col gap-6 lg:sticky lg:top-24">
                            {/* Suche: sichtbare Beschriftung über dem Feld (bisher nur für Screenreader), Lupe als Schmuck */}
                            <div role="search">
                                <label htmlFor="faq-search" className={labelKlassen}>Frage oder Stichwort suchen</label>
                                <div className="relative">
                                    <span className="pointer-events-none absolute top-2 bottom-0 left-4 flex items-center text-tinte-2">
                                        <Icon name="suche" groesse={5} />
                                    </span>
                                    <input
                                        id="faq-search"
                                        type="search"
                                        placeholder="Frage oder Stichwort suchen..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoComplete="off"
                                        enterKeyHint="search"
                                        className={clsx(feldKlassen, 'pl-12')}
                                    />
                                </div>
                            </div>

                            {/* Kategorien (ohne Suche): Umschalter mit aria-pressed, Zeilen an der Fuge */}
                            {!searchQuery && (
                                <div role="group" aria-label="Kategorien" className="grid min-w-0 grid-cols-1 gap-px border border-fuge bg-fuge">
                                    {categories.map(([key, category]) => {
                                        const isActive = openCategory === key;
                                        return (
                                            <button
                                                key={key}
                                                type="button"
                                                onClick={() => setOpenCategory(key)}
                                                aria-pressed={isActive}
                                                data-motion="zustand"
                                                className={clsx(
                                                    ZEILE,
                                                    isActive ? 'bg-tinte text-kalk focus-visible:outline-kalk' : 'bg-fliese text-tinte pointer-fine:hover:bg-kalk active:bg-kalk'
                                                )}
                                            >
                                                <Icon name={category.icon} groesse={5} className={isActive ? 'text-kalk' : 'text-tinte-2'} />
                                                <span className="min-w-0 flex-1 wrap-break-word">{category.title}</span>
                                                {isActive && <Icon name="haken" groesse={5} />}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="col-span-4 min-w-0 md:col-span-8 lg:col-span-8">
                        {/* Fragen als Zeilen an der Fuge (Erscheinung wie FAQAccordion); bei Suche je Kategorie mit Überschrift */}
                        <div className="flex flex-col gap-12">
                            {(searchQuery ? filteredCategories : categories.filter(([key]) => key === openCategory)).map(([key, category]) => (
                                <div key={key}>
                                    {searchQuery && (
                                        <h2 className="mb-4 flex items-center gap-3 text-fs-5 text-tinte">
                                            <Icon name={category.icon} groesse={6} className="text-tinte-2" />
                                            {category.title}
                                        </h2>
                                    )}
                                    <ul className="border-t border-fuge">
                                        {category.questions.map((faq, idx) => {
                                            const isOpen = Boolean(openQuestions[`${key}-${idx}`]);
                                            const antwortId = `faq-antwort-${key}-${idx}`;
                                            return (
                                                <li key={idx} className="border-b border-fuge">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleQuestion(key, idx)}
                                                        aria-expanded={isOpen}
                                                        aria-controls={isOpen ? antwortId : undefined}
                                                        data-motion="zustand"
                                                        className="flex min-h-12 w-full items-center justify-between gap-6 py-4 text-left font-text text-fs-3 font-semibold text-tinte transition-colors dauer-1 ease-setzen hover:text-tinte-2"
                                                    >
                                                        <span className="min-w-0">{faq.q}</span>
                                                        <span className="flex shrink-0 items-center text-tinte" aria-hidden="true">
                                                            <Icon name={isOpen ? 'minus' : 'plus'} groesse={6} />
                                                        </span>
                                                    </button>
                                                    {isOpen && (
                                                        <div id={antwortId} className="max-w-mass pb-6 font-text text-fs-2 text-tinte-2">
                                                            {faq.a}
                                                        </div>
                                                    )}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        {/* Leerzustand der Suche: wird angesagt (Statusregion, im Ruhezustand leer) */}
                        <div role="status">
                            {searchQuery && filteredCategories.length === 0 && (
                                <div className="flex items-start gap-4 border border-l-2 border-strich bg-fliese p-6">
                                    <Icon name="suche" groesse={6} className="text-tinte" />
                                    <div className="min-w-0">
                                        <h3 className="text-fs-4 text-tinte">Keine passenden Fragen gefunden</h3>
                                        <p className="mt-2 text-fs-2 text-tinte-2">
                                            Für &bdquo;{searchQuery}&ldquo; konnten wir keinen Treffer finden. Kontaktieren Sie uns gerne direkt!
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Rückfrage: Feld an der Fuge mit Hauptknopf und Telefon in Mono */}
                        <div className="mt-12 border border-fuge bg-fliese p-6 sm:p-8">
                            <h3 className="text-fs-5 text-tinte">Ihre Frage war nicht dabei?</h3>
                            <p className="mt-2 max-w-mass text-fs-3 text-tinte-2">
                                {COMPANY_DATA.owner.fullName} beantwortet Ihre individuellen Anliegen gerne persönlich – am Telefon, per WhatsApp oder beim kostenfreien Vor-Ort-Aufmaß.
                            </p>
                            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                                <Knopf href="/kontakt" icon="pfeil-rechts">
                                    Jetzt Kontakt aufnehmen
                                </Knopf>
                                <Knopf href={`tel:${COMPANY_DATA.contact.phoneLink}`} variante="neben" iconLinks="telefon">
                                    <span className="font-mono font-normal">{COMPANY_DATA.contact.phone}</span>
                                </Knopf>
                            </div>
                        </div>
                    </div>
                </div>
            </Abschnitt>

            {/* 3. PROJEKTANFRAGE (Bestand: umfassendes Projektanfrage-Formular), Rechner unverändert; ohne spaet (Formular) */}
            <Abschnitt art="arbeit" flaeche="fliese">
                <PricingCalculator />
            </Abschnitt>

            <QualityPromise art="arbeit" />
            <FinalCTA achse={false} />
        </>
    );
}
