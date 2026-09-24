// NAVIGATION CONFIGURATION - FLIESENVERLEGUNG TEZGEL
// Hierarchische Struktur: Header-Mega-Menü, Mobile-Drawer und Footer-Katalog.
// Jeder Pfad verweist auf eine real generierte Route.

import { CITIES } from '@/config/cities';
import { TOPIC_HUBS } from '@/config/topics';

export const navigationLinks = [
    {
        name: 'Badsanierung',
        path: '/bad',
        description: 'Schlüsselfertige Bäder, Walk-In-Duschen & Fliesen',
        submenu: [
            {
                category: 'Bäder & Sanierung',
                items: [
                    { name: 'Badsanierung im Überblick', path: '/bad', desc: 'Alle Leistungen rund ums neue Bad' },
                    { name: 'Badsanierung komplett', path: '/bad/badsanierung', desc: 'Von der Demontage bis zur fertigen Fuge' },
                    { name: 'Fliesen & XXL-Großformate', path: '/bad/fliesen', desc: 'Fugenarme Großkeramik im Bad' },
                    { name: 'Barrierefreies Bad', path: '/bad/barrierefreies-bad', desc: 'Bodengleiche Walk-In-Duschen nach DIN 18040' },
                    { name: 'Bad aus einer Hand', path: '/bad/bad-aus-einer-hand', desc: 'Gewerke koordiniert, ein Ansprechpartner' }
                ]
            },
            {
                category: 'Planung & Inspiration',
                items: [
                    { name: 'Badplaner', path: '/bad/badplaner', desc: 'Schritt für Schritt zum geplanten Bad' },
                    { name: 'Bad-Projektcheck', path: '/bad/projekt-check', desc: 'Badprojekt in 2 Minuten beschreiben' },
                    { name: 'Musterbäder', path: '/bad/musterbaeder', desc: 'Konzepte von Basic bis Luxus' },
                    { name: 'Badanfrage', path: '/bad/badanfrage', desc: 'Unverbindliche Anfrage für Ihr Bad' }
                ]
            }
        ],
        featured: {
            eyebrow: 'DIN 18534',
            title: 'Dicht. Sauber. Termintreu.',
            text: 'Verbundabdichtung nach Norm, Staubschutz im bewohnten Bestand und ein verbindlicher Festpreis.',
            cta: { label: 'Projektcheck starten', path: '/bad/projekt-check' }
        }
    },
    {
        name: 'Fachgewerke',
        path: '/leistungen',
        description: 'Fliesenverlegung innen & außen, Untergrund & Abdichtung',
        submenu: [
            {
                category: 'Meister-Fachgewerke',
                items: [
                    { name: 'Alle Fachgewerke', path: '/leistungen', desc: 'Leistungsübersicht des Meisterbetriebs' },
                    { name: 'Bäder & Wellness', path: '/leistungen/bad', desc: 'Walk-In-Duschen, Gehrungen & Nischen' },
                    { name: 'Wohnbereiche & Neubau', path: '/leistungen/wohnen', desc: 'Feinsteinzeug, Naturstein, Flure & Treppen' },
                    { name: 'Balkon & Terrasse', path: '/leistungen/aussen', desc: 'Frostsichere Keramik auf Stelzlagern' },
                    { name: 'Untergrund & DIN 18534', path: '/leistungen/untergrund', desc: 'Estrichspachtelung & Verbundabdichtung' }
                ]
            },
            {
                category: 'Fachthemen & Service',
                items: [
                    ...TOPIC_HUBS.filter((hub) => hub.id !== 'service').map((hub) => ({
                        name: hub.name,
                        path: hub.path,
                        desc: hub.description
                    })),
                    { name: 'Fliesenreparatur', path: '/fliesenreparatur', desc: 'Einzelne Fliesen, Fugen, Sockel' },
                    { name: 'Schadensanalyse', path: '/schadensanalyse', desc: 'Ursachen vor Ort klären' }
                ]
            }
        ],
        featured: {
            eyebrow: 'Konfigurator',
            title: 'Ihr Projekt in 4 Schritten',
            text: 'Raum, Untergrund, Format und Fläche wählen – Deniz Tezgel meldet sich mit einem Termin für das kostenfreie Vor-Ort-Aufmaß.',
            cta: { label: 'Zum Konfigurator', path: '/fliesen/konfigurator' }
        }
    },
    {
        name: 'Standorte',
        path: '/standorte',
        description: 'Aßlar, Wetzlar, Gießen, Marburg und ganz Hessen',
        submenu: [
            {
                category: 'Einsatzgebiet Hessen',
                items: [
                    { name: 'Fliesenleger Wetzlar', path: '/standorte/wetzlar', desc: 'Direkt neben unserem Firmensitz Aßlar' },
                    { name: 'Fliesenleger Gießen', path: '/standorte/giessen', desc: 'Stadt und Landkreis Gießen' },
                    { name: 'Fliesenleger Marburg', path: '/standorte/marburg', desc: 'Landkreis Marburg-Biedenkopf' },
                    { name: `Alle ${CITIES.length} Standorte`, path: '/standorte', desc: 'Lahn-Dill-Kreis, Wetterau & Umland' }
                ]
            },
            {
                category: 'Beratung & Fliesenauswahl',
                items: [
                    { name: 'Fliesenberatung Wetzlar', path: '/ausstellung/wetzlar', desc: 'Materialauswahl nach Terminvereinbarung' },
                    { name: 'Fliesenberatung Gießen', path: '/ausstellung/giessen', desc: 'Beratung für den Raum Gießen' }
                ]
            }
        ]
    },
    {
        name: 'Ratgeber',
        path: '/blog',
        description: 'Wissen, Förderung, Referenzen & Service',
        submenu: [
            {
                category: 'Wissen & Service',
                items: [
                    { name: 'Ratgeber & Blog', path: '/blog', desc: 'Tipps rund um Bad und Fliesen' },
                    { name: 'Häufige Fragen', path: '/faq', desc: 'Antworten zu Ablauf, Kosten & Pflege' },
                    { name: 'Vor-Ort-Beratung', path: '/beratung', desc: 'Aufmaß und Materialberatung' },
                    { name: 'Förderung', path: '/foerderung', desc: 'Zuschüsse für barrierefreie Bäder' },
                    { name: 'Referenzen & Bewertungen', path: '/referenzen', desc: '5,0 Sterne aus 27 Google-Rezensionen' }
                ]
            }
        ]
    },
    {
        name: 'Über uns',
        path: '/ueber-uns',
        description: 'Meisterbetrieb Deniz Tezgel in Aßlar',
        submenu: [
            {
                category: 'Das Unternehmen',
                items: [
                    { name: 'Über Deniz Tezgel', path: '/ueber-uns', desc: 'Philosophie & Meisterbetrieb' },
                    { name: 'Qualitätsversprechen', path: '/unternehmen', desc: 'Staubschutz, Termintreue & DIN-Normen' },
                    { name: 'Team', path: '/team', desc: 'Ihre Ansprechpartner' },
                    { name: 'Karriere & Jobs', path: '/karriere', desc: 'Verstärkung für unser Team' },
                    { name: 'Kontakt', path: '/kontakt', desc: 'Hohwardstraße 14, 35614 Aßlar' }
                ]
            }
        ]
    }
];

/** Primary header call-to-action. */
export const primaryCta = { name: 'Aufmaß buchen', path: '/kontakt' };

export const footerBathLinks = [
    { name: 'Badsanierung im Überblick', path: '/bad' },
    { name: 'Badsanierung komplett', path: '/bad/badsanierung' },
    { name: 'Fliesen & XXL-Großformate', path: '/bad/fliesen' },
    { name: 'Barrierefreies Bad', path: '/bad/barrierefreies-bad' },
    { name: 'Bad aus einer Hand', path: '/bad/bad-aus-einer-hand' },
    { name: 'Badplaner', path: '/bad/badplaner' },
    { name: 'Bad-Projektcheck', path: '/bad/projekt-check' },
    { name: 'Musterbäder', path: '/bad/musterbaeder' },
    { name: 'Badanfrage', path: '/bad/badanfrage' }
];

export const footerServiceLinks = [
    { name: 'Alle Fachgewerke', path: '/leistungen' },
    ...TOPIC_HUBS.filter((hub) => hub.id !== 'service').map((hub) => ({ name: hub.name, path: hub.path })),
    { name: 'Fliesen-Konfigurator', path: '/fliesen/konfigurator' },
    { name: 'Schadensanalyse', path: '/schadensanalyse' },
    { name: 'Fliesenreparatur', path: '/fliesenreparatur' }
];

export const footerLocationLinks = [
    ...CITIES.map((city) => ({ name: city.name, path: `/standorte/${city.slug}` })),
    { name: 'Fliesenberatung Wetzlar', path: '/ausstellung/wetzlar' },
    { name: 'Fliesenberatung Gießen', path: '/ausstellung/giessen' }
];

export const footerCompanyLinks = [
    { name: 'Über Deniz Tezgel', path: '/ueber-uns' },
    { name: 'Qualitätsversprechen', path: '/unternehmen' },
    { name: 'Team', path: '/team' },
    { name: 'Referenzen & Bewertungen', path: '/referenzen' },
    { name: 'Ratgeber & Blog', path: '/blog' },
    { name: 'Häufige Fragen', path: '/faq' },
    { name: 'Vor-Ort-Beratung', path: '/beratung' },
    { name: 'Förderung', path: '/foerderung' },
    { name: 'Downloads', path: '/downloads' },
    { name: 'Partner', path: '/partner' },
    { name: 'Karriere', path: '/karriere' },
    { name: 'Kontakt', path: '/kontakt' }
];

export const footerLegalLinks = [
    { name: 'Impressum', path: '/impressum' },
    { name: 'Datenschutz', path: '/datenschutz' },
    { name: 'AGB', path: '/agb' },
    { name: 'Widerruf', path: '/widerruf' },
    { name: 'Cookie-Richtlinie', path: '/cookie-richtlinie' },
    { name: 'Barrierefreiheit', path: '/barrierefreiheit' }
];

export default navigationLinks;
